class MdRipple extends HTMLElement {
    static get observedAttributes() {
        return ["for"];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    margin: auto;
                    pointer-events: none;
                }
                :host([disabled]) {
                    display: none;
                }
                @media (forced-colors: active) {
                    :host { display: none; }
                }
                :host, .surface {
                    border-radius: inherit;
                    position: absolute;
                    inset: 0;
                    overflow: hidden;
                }
                .surface {
                    -webkit-tap-highlight-color: rgba(0,0,0,0);
                }
                .surface::before {
                    content: "";
                    opacity: 0;
                    position: absolute;
                    background-color: var(--md-sys-ripple-hover-color, var(--button-ripple, currentColor));
                    inset: 0;
                    transition: opacity 15ms linear, background-color 15ms linear;
                }
                .surface.hovered::before {
                    opacity: var(--md-sys-ripple-hover-opacity, 0.08);
                }
                
                .ripple {
                    position: absolute;
                    inset: 0;
                    background-image: radial-gradient(closest-side, var(--md-sys-ripple-pressed-color, var(--button-ripple, currentColor)) max(100% - 70px, 65%), transparent 100%);
                    background-repeat: no-repeat;
                    opacity: 0;
                    transition: opacity 375ms linear;
                }
                .ripple.pressed {
                    opacity: var(--md-sys-ripple-pressed-opacity, 0.12);
                    transition-duration: 105ms;
                }
            </style>
            <div class="surface" id="surface"></div>
        `;

        this.surface = this.shadowRoot.getElementById("surface");
        const forId = this.getAttribute("for");
        const root = this.getRootNode();
        this.target = forId
            ? document.getElementById(forId)
            : (this.parentElement || (root && root.host instanceof Element ? root.host : null));

        if (this.target && this.target instanceof Element) {
            const style = getComputedStyle(this.target);
            if (style.position === 'static') {
                this.target.style.position = 'relative';
            }

            this.handlePointerDown = this.handlePointerDown.bind(this);
            this.handlePointerEnter = this.handlePointerEnter.bind(this);
            this.handlePointerLeave = this.handlePointerLeave.bind(this);

            this.target.addEventListener("pointerdown", this.handlePointerDown);
            this.target.addEventListener("pointerenter", this.handlePointerEnter);
            this.target.addEventListener("pointerleave", this.handlePointerLeave);
        }
    }

    disconnectedCallback() {
        if (this.target && typeof this.target.removeEventListener === "function") {
            this.target.removeEventListener("pointerdown", this.handlePointerDown);
            this.target.removeEventListener("pointerenter", this.handlePointerEnter);
            this.target.removeEventListener("pointerleave", this.handlePointerLeave);
        }
    }

    handlePointerEnter() {
        if (!this.target || (this.target.hasAttribute && this.target.hasAttribute("disabled"))) return;
        this.surface.classList.add("hovered");
    }

    handlePointerLeave() {
        this.surface.classList.remove("hovered");
    }

    handlePointerDown(event) {
        if (!this.target || (this.target.hasAttribute && this.target.hasAttribute("disabled"))) return;

        const rect = this.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const corners = [
            { x: 0, y: 0 },
            { x: rect.width, y: 0 },
            { x: 0, y: rect.height },
            { x: rect.width, y: rect.height }
        ];
        let maxDist = 0;
        for (const corner of corners) {
            const dist = Math.sqrt((x - corner.x) ** 2 + (y - corner.y) ** 2);
            if (dist > maxDist) maxDist = dist;
        }

        const size = maxDist * 3;
        const initialSize = size * 0.2;

        const ripple = document.createElement("div");
        ripple.classList.add("ripple");

        this.surface.appendChild(ripple);

        ripple.animate([
            {
                backgroundSize: `${initialSize}px ${initialSize}px`,
                backgroundPosition: `${x - initialSize / 2}px ${y - initialSize / 2}px`
            },
            {
                backgroundSize: `${size}px ${size}px`,
                backgroundPosition: `${x - size / 2}px ${y - size / 2}px`
            }
        ], {
            duration: 450,
            easing: 'cubic-bezier(0.2, 0, 0, 1)',
            fill: 'forwards'
        });

        requestAnimationFrame(() => {
            ripple.classList.add("pressed");
        });

        const startTime = Date.now();
        const minDuration = 200;

        const removeRipple = () => {
            const elapsed = Date.now() - startTime;
            const delay = Math.max(0, minDuration - elapsed);

            setTimeout(() => {
                ripple.classList.remove("pressed");
                setTimeout(() => ripple.remove(), 375);
            }, delay);

            window.removeEventListener("pointerup", removeRipple);
            if (this.target && typeof this.target.removeEventListener === "function") {
                this.target.removeEventListener("pointerleave", removeRipple);
            }
        };

        window.addEventListener("pointerup", removeRipple);
        if (this.target && typeof this.target.addEventListener === "function") {
            this.target.addEventListener("pointerleave", removeRipple);
        }
    }
}

customElements.define("md-ripple", MdRipple);