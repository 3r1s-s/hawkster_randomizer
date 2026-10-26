class MdButton extends HTMLElement {
    static formAssociated = true;

    static get observedAttributes() {
        return ["disabled", "selected", "type", "variant", "href", "target", "submit", "border-radius", "width", "height"];
    }

    constructor() {
        super();
        this._internals = this.attachInternals?.() ?? null;
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        const tag = this.getAttribute("href") ? "a" : "button";
        const current = this.shadowRoot.querySelector("button, a");
        if (!current || current.tagName.toLowerCase() !== tag) {
            this._render();
        }
        this._sync();
    }

    attributeChangedCallback() {
        if (!this.shadowRoot) return;
        const tag = this.getAttribute("href") ? "a" : "button";
        const current = this.shadowRoot.querySelector("button, a");
        if (!current || current.tagName.toLowerCase() !== tag) {
            this._render();
        }
        this._sync();
    }

    _render() {
        const href = this.getAttribute("href");
        const target = this.getAttribute("target");
        const tag = href ? "a" : "button";

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                    vertical-align: middle;

                    --button-bg: var(--md-sys-color-surface-container, #45326F);
                    --button-bg-selected: var(--md-sys-color-surface-container, #45326F);
                    --button-border: transparent;
                    --button-border-selected: var(--md-sys-color-surface-container, #45326F);
                    --button-text: var(--md-sys-color-on-surface, #DBC9FF);
                    --button-text-selected: var(--md-sys-color-on-surface, #DBC9FF);
                    --button-accent: var(--md-sys-color-surface, #DBC9FF);

                    --button-ripple: var(--md-sys-color-on-surface);
                }

                .outline {
                    --button-bg: transparent;
                    --button-bg-selected: var(--md-sys-color-primary-container, #45326F);
                    --button-border: var(--md-sys-color-outline, #CCC3D7);
                    --button-border-selected: var(--md-sys-color-primary-container, #45326F);
                    --button-text: var(--md-sys-color-primary, #CCC3D7);
                    --button-text-selected: var(--md-sys-color-on-primary-container, #DBC9FF);
                    --button-accent: var(--md-sys-color-primary, #DBC9FF);

                    --button-ripple: var(--md-sys-color-on-surface);
                }

                .filled {
                    --button-bg: var(--md-sys-color-primary, #DBC9FF);
                    --button-bg-selected: var(--md-sys-color-primary, #DBC9FF);
                    --button-border: transparent;
                    --button-border-selected: var(--md-sys-color-primary-container, #45326F);
                    --button-text: var(--md-sys-color-on-primary, #45326F);
                    --button-text-selected: var(--md-sys-color-on-primary, #45326F);
                    --button-accent: var(--md-sys-color-primary, #DBC9FF);

                    --button-ripple: var(--md-sys-color-on-primary);
                }

                .tonal {
                    --button-bg: var(--md-sys-color-primary-container, #45326F);
                    --button-bg-selected: var(--md-sys-color-primary-container, #45326F);
                    --button-border: transparent;
                    --button-border-selected: var(--md-sys-color-primary-container, #45326F);
                    --button-text: var(--md-sys-color-on-primary-container, #DBC9FF);
                    --button-text-selected: var(--md-sys-color-on-primary-container, #DBC9FF);
                    --button-accent: var(--md-sys-color-primary, #DBC9FF);

                    --button-ripple: var(--md-sys-color-on-primary-container);
                }

                .text {
                    --button-bg: transparent;
                    --button-bg-selected: var(--md-sys-color-secondary-container, #45326F);
                    --button-border: transparent;
                    --button-border-selected: var(--md-sys-color-secondary-container, #45326F);
                    --button-text: var(--md-sys-color-secondary, #DBC9FF);
                    --button-text-selected: var(--md-sys-color-on-secondary-container, #DBC9FF);
                    --button-accent: var(--md-sys-color-secondary, #DBC9FF);

                    --button-ripple: var(--md-sys-color-on-surface);
                }

                .elevated {
                    --button-bg: var(--md-sys-color-surface-container-highest, #E1D9EF);
                    --button-bg-selected: var(--md-sys-color-surface-container-highest, #E1D9EF);
                    --button-border: transparent;
                    --button-border-selected: var(--md-sys-color-surface, #DBC9FF);
                    --button-text: var(--md-sys-color-on-surface, #45326F);
                    --button-text-selected: var(--md-sys-color-on-surface, #45326F);
                    --button-accent: var(--md-sys-color-surface, #DBC9FF);

                    --button-ripple: var(--md-sys-color-on-surface);
                }

                button, a {
                    appearance: none;
                    -webkit-tap-highlight-color: transparent;
                    border: none;
                    box-shadow: inset 0 0 0 1.5px var(--button-border);
                    background: var(--button-bg);
                    color: var(--button-text);
                    border-radius: 999px;

                    height: 40px;
                    padding: 0 14px;
                    box-sizing: border-box;

                    font: inherit;
                    line-height: 1;
                    font-weight: 500;
                    font-size: 14px;

                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    user-select: none;
                    -webkit-user-select: none;
                    text-decoration: none;
                    outline: none;
                    position: relative;
                    overflow: hidden;
                    width: 100%;
                }

                button:focus-visible, a:focus-visible {
                    outline: 2px solid color-mix(in srgb, var(--button-accent) 85%, transparent);
                    outline-offset: 2px;
                }

                button[data-selected="true"], a[data-selected="true"] {
                    box-shadow: inset 0 0 0 1.5px var(--button-border-selected);
                    background: var(--button-bg-selected);
                    color: var(--button-text-selected);
                }

                :host([disabled]) button,
                :host([disabled]) a {
                    opacity: 0.55;
                    cursor: not-allowed;
                    transform: none;
                    pointer-events: none;
                }


            </style>

            <${tag} part="button" ${href ? "" : 'type="button"'}>
                <slot></slot>
                <md-ripple></md-ripple>
            </${tag}>
        `;

        this.btn = this.shadowRoot.querySelector(tag);

        if (href) {
            this.btn.setAttribute("href", href);
            if (target) {
                this.btn.setAttribute("target", target);
            }
        }

        this.btn.addEventListener("click", (e) => {
            if (this.disabled) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }

            if (this.submit && this._internals?.form) {
                this._internals.form.requestSubmit();
            }
        });
    }

    _sync() {
        if (!this.btn) return;

        const type = this.getAttribute("type");
        const variant = this.getAttribute("variant");
        const target = this.getAttribute("target");

        if (this.btn.tagName.toLowerCase() === "button") {
            const isSubmit = this.hasAttribute("submit") || type === "submit";
            this.btn.type = isSubmit ? "submit" : (type === "reset" ? "reset" : "button");
            this.btn.disabled = this.disabled;
        } else if (this.btn.tagName.toLowerCase() === "a") {
            if (target) this.btn.setAttribute("target", target);
            else this.btn.removeAttribute("target");
        }

        this.btn.classList.toggle("filled", variant === "filled");
        this.btn.classList.toggle("outline", variant === "outline");
        this.btn.classList.toggle("tonal", variant === "tonal");
        this.btn.classList.toggle("text", variant === "text");
        this.btn.classList.toggle("elevated", variant === "elevated");

        this.btn.dataset.selected = this.selected ? "true" : "false";

        const width = this.getAttribute("width");
        const height = this.getAttribute("height");
        const borderRadius = this.getAttribute("border-radius");

        if (width) this.btn.style.minWidth = width;
        if (height) this.btn.style.height = height;
        if (borderRadius) this.btn.style.borderRadius = borderRadius;
    }

    get disabled() {
        return this.hasAttribute("disabled");
    }
    set disabled(v) {
        if (v) this.setAttribute("disabled", "");
        else this.removeAttribute("disabled");
    }

    get selected() {
        return this.hasAttribute("selected");
    }
    set selected(v) {
        if (v) this.setAttribute("selected", "");
        else this.removeAttribute("selected");
    }

    get submit() {
        return this.hasAttribute("submit");
    }
    set submit(v) {
        if (v) this.setAttribute("submit", "");
        else this.removeAttribute("submit");
    }
}

customElements.define("md-button", MdButton);

