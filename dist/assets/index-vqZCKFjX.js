(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class extends HTMLElement{static formAssociated=!0;static get observedAttributes(){return[`disabled`,`selected`,`type`,`variant`,`href`,`target`,`submit`,`border-radius`,`width`,`height`]}constructor(){super(),this._internals=this.attachInternals?.()??null,this.attachShadow({mode:`open`})}connectedCallback(){let e=this.getAttribute(`href`)?`a`:`button`,t=this.shadowRoot.querySelector(`button, a`);t&&t.tagName.toLowerCase()===e||this._render(),this._sync()}attributeChangedCallback(){if(!this.shadowRoot)return;let e=this.getAttribute(`href`)?`a`:`button`,t=this.shadowRoot.querySelector(`button, a`);t&&t.tagName.toLowerCase()===e||this._render(),this._sync()}_render(){let e=this.getAttribute(`href`),t=this.getAttribute(`target`),n=e?`a`:`button`;this.shadowRoot.innerHTML=`
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

            <${n} part="button" ${e?``:`type="button"`}>
                <slot></slot>
                <md-ripple></md-ripple>
            </${n}>
        `,this.btn=this.shadowRoot.querySelector(n),e&&(this.btn.setAttribute(`href`,e),t&&this.btn.setAttribute(`target`,t)),this.btn.addEventListener(`click`,e=>{this.disabled?(e.preventDefault(),e.stopPropagation()):this.submit&&this._internals?.form&&this._internals.form.requestSubmit()})}_sync(){if(!this.btn)return;let e=this.getAttribute(`type`),t=this.getAttribute(`variant`),n=this.getAttribute(`target`);if(this.btn.tagName.toLowerCase()===`button`){let t=this.hasAttribute(`submit`)||e===`submit`;this.btn.type=t?`submit`:e===`reset`?`reset`:`button`,this.btn.disabled=this.disabled}else this.btn.tagName.toLowerCase()===`a`&&(n?this.btn.setAttribute(`target`,n):this.btn.removeAttribute(`target`));this.btn.classList.toggle(`filled`,t===`filled`),this.btn.classList.toggle(`outline`,t===`outline`),this.btn.classList.toggle(`tonal`,t===`tonal`),this.btn.classList.toggle(`text`,t===`text`),this.btn.classList.toggle(`elevated`,t===`elevated`),this.btn.dataset.selected=this.selected?`true`:`false`;let r=this.getAttribute(`width`),i=this.getAttribute(`height`),a=this.getAttribute(`border-radius`);r&&(this.btn.style.minWidth=r),i&&(this.btn.style.height=i),a&&(this.btn.style.borderRadius=a)}get disabled(){return this.hasAttribute(`disabled`)}set disabled(e){e?this.setAttribute(`disabled`,``):this.removeAttribute(`disabled`)}get selected(){return this.hasAttribute(`selected`)}set selected(e){e?this.setAttribute(`selected`,``):this.removeAttribute(`selected`)}get submit(){return this.hasAttribute(`submit`)}set submit(e){e?this.setAttribute(`submit`,``):this.removeAttribute(`submit`)}};customElements.define(`md-button`,e);var t=class extends HTMLElement{static get observedAttributes(){return[`for`]}constructor(){super(),this.attachShadow({mode:`open`})}connectedCallback(){this.shadowRoot.innerHTML=`
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
        `,this.surface=this.shadowRoot.getElementById(`surface`);let e=this.getAttribute(`for`),t=this.getRootNode();this.target=e?document.getElementById(e):this.parentElement||(t&&t.host instanceof Element?t.host:null),this.target&&this.target instanceof Element&&(getComputedStyle(this.target).position===`static`&&(this.target.style.position=`relative`),this.handlePointerDown=this.handlePointerDown.bind(this),this.handlePointerEnter=this.handlePointerEnter.bind(this),this.handlePointerLeave=this.handlePointerLeave.bind(this),this.target.addEventListener(`pointerdown`,this.handlePointerDown),this.target.addEventListener(`pointerenter`,this.handlePointerEnter),this.target.addEventListener(`pointerleave`,this.handlePointerLeave))}disconnectedCallback(){this.target&&typeof this.target.removeEventListener==`function`&&(this.target.removeEventListener(`pointerdown`,this.handlePointerDown),this.target.removeEventListener(`pointerenter`,this.handlePointerEnter),this.target.removeEventListener(`pointerleave`,this.handlePointerLeave))}handlePointerEnter(){!this.target||this.target.hasAttribute&&this.target.hasAttribute(`disabled`)||this.surface.classList.add(`hovered`)}handlePointerLeave(){this.surface.classList.remove(`hovered`)}handlePointerDown(e){if(!this.target||this.target.hasAttribute&&this.target.hasAttribute(`disabled`))return;let t=this.getBoundingClientRect(),n=e.clientX-t.left,r=e.clientY-t.top,i=[{x:0,y:0},{x:t.width,y:0},{x:0,y:t.height},{x:t.width,y:t.height}],a=0;for(let e of i){let t=Math.sqrt((n-e.x)**2+(r-e.y)**2);t>a&&(a=t)}let o=a*3,s=o*.2,c=document.createElement(`div`);c.classList.add(`ripple`),this.surface.appendChild(c),c.animate([{backgroundSize:`${s}px ${s}px`,backgroundPosition:`${n-s/2}px ${r-s/2}px`},{backgroundSize:`${o}px ${o}px`,backgroundPosition:`${n-o/2}px ${r-o/2}px`}],{duration:450,easing:`cubic-bezier(0.2, 0, 0, 1)`,fill:`forwards`}),requestAnimationFrame(()=>{c.classList.add(`pressed`)});let l=Date.now(),u=()=>{let e=Date.now()-l,t=Math.max(0,200-e);setTimeout(()=>{c.classList.remove(`pressed`),setTimeout(()=>c.remove(),375)},t),window.removeEventListener(`pointerup`,u),this.target&&typeof this.target.removeEventListener==`function`&&this.target.removeEventListener(`pointerleave`,u)};window.addEventListener(`pointerup`,u),this.target&&typeof this.target.addEventListener==`function`&&this.target.addEventListener(`pointerleave`,u)}};customElements.define(`md-ripple`,t);var n=`AIzaSyAL_r_JdSWtdShYVaRUsJf9145-Dua8vKs`,r=`https://www.googleapis.com/youtube/v3/playlistItems`,i=`UC-aF9X9tQMuWPM__L4X5NuQ`;async function a(e,t){let i=new URLSearchParams({part:`snippet`,playlistId:e,maxResults:`50`,key:n});t&&i.set(`pageToken`,t);let a=await(await fetch(`${r}?${i}`)).json();if(a.error)throw Error(a.error.message);return a}async function o(e){try{if(!e.startsWith(`UC`))throw Error(`invalid channel ID format, it must start with 'UC'.`);let t=`UU`+e.substring(2),n=await a(t),r=n.pageInfo.totalResults;if(r===0)throw Error(`This channel has no public uploads.`);let i=Math.floor(Math.random()*r),o=Math.floor(i/50),s=i%50;for(let e=0;e<o&&n.nextPageToken;e++)n=await a(t,n.nextPageToken);let c=n.items[s]??n.items[n.items.length-1];return{id:c.snippet.resourceId.videoId,title:c.snippet.title}}catch(e){return console.error(`error fetching video:`,e),null}}async function s(e,t){let n=new Set,r=[],i=0;for(;r.length<t&&i<t*3;){i++;let t=await o(e);t&&!n.has(t.id)&&(n.add(t.id),r.push(t))}return r}var c=document.getElementById(`player-r`);function l(e,t){let n=new URLSearchParams({autoplay:`1`,controls:`0`,modestbranding:`1`,rel:`0`,iv_load_policy:`3`,playsinline:`1`,disabletb:`1`}),r=document.createElement(`iframe`);r.src=`https://www.youtube.com/embed/${t}?${n}`,r.width=`100%`,r.height=`100%`,r.allow=`autoplay; encrypted-media; picture-in-picture; fullscreen`,r.allowFullscreen=!0,r.title=`YouTube video player`,r.frameBorder=`0`,e.replaceChildren(r)}document.getElementById(`random-vid-button`).addEventListener(`click`,async()=>{let e=await o(i);e&&l(c,e.id)});var u=document.getElementById(`guessing`),d=document.getElementById(`player-g`),f=document.getElementById(`guess-options`),p=document.getElementById(`guess-result`),m=document.getElementById(`goon`),h=document.getElementById(`guess-score`),g={score:0,total:0},_=null,v=!1;function y(){if(window.YT&&window.YT.Player){v=!0;return}let e=document.createElement(`script`);e.src=`https://www.youtube.com/iframe_api`,document.head.appendChild(e)}window.onYouTubeIframeAPIReady=()=>{v=!0},y();function b(){return new Promise(e=>{if(v)return e();let t=setInterval(()=>{v&&(clearInterval(t),e())},100)})}function x(e){for(let t=e.length-1;t>0;t--){let n=Math.floor(Math.random()*(t+1));[e[t],e[n]]=[e[n],e[t]]}return e}function S(){h.textContent=g.total>0?`${g.score} / ${g.total}`:``}async function C(){u.classList.remove(`has-options`,`revealed`),m.setAttribute(`disabled`,``),setTimeout(()=>{u.classList.contains(`has-options`)||(p.textContent=``,p.className=`guess-result`,f.replaceChildren())},300);let e=await s(i,5);if(e.length<5){p.textContent=`Could not fetch enough videos. Try again.`,m.removeAttribute(`disabled`);return}let t=e[Math.floor(Math.random()*5)];await b();let n=document.createElement(`div`);n.id=`yt-guess-player`,d.replaceChildren(n);let r=Math.floor(Math.random()*120)+10,a=!1;_&&=(_.destroy(),null),_=new YT.Player(`yt-guess-player`,{videoId:t.id,width:`100%`,height:`100%`,playerVars:{autoplay:1,controls:0,modestbranding:1,rel:0,iv_load_policy:3,playsinline:1,disablekb:1,start:r,fs:0},events:{onReady:e=>{e.target.setVolume(100),e.target.playVideo()},onStateChange:n=>{n.data===YT.PlayerState.PLAYING&&!a?(a=!0,setTimeout(()=>{n.target.pauseVideo(),w(e,t)},1e3)):n.data===YT.PlayerState.ENDED&&!a&&(a=!0,w(e,t))}}})}function w(e,t){f.replaceChildren();let n=x([...e]);for(let e of n){let n=document.createElement(`md-button`);n.setAttribute(`variant`,`outline`),n.textContent=e.title,n.dataset.videoId=e.id,n.addEventListener(`click`,()=>{T(e.id===t.id,t,n)}),f.appendChild(n)}u.classList.add(`has-options`)}function T(e,t,n){g.total++,u.classList.add(`revealed`),f.querySelectorAll(`md-button`).forEach(e=>{e.setAttribute(`disabled`,``),e.dataset.videoId===t.id&&e.setAttribute(`variant`,`filled`)}),e?(g.score++,p.textContent=`Correct!`,p.className=`guess-result correct`):(p.textContent=`Wrong!`,p.className=`guess-result wrong`,n.setAttribute(`variant`,`tonal`),n.style.setProperty(`--md-sys-color-primary-container`,`var(--md-sys-color-error-container)`),n.style.setProperty(`--md-sys-color-on-primary-container`,`var(--md-sys-color-on-error-container)`)),_&&_.playVideo&&_.playVideo(),S(),m.removeAttribute(`disabled`),m.querySelector(`span`)?.remove(),m.textContent=`NEXT`}m.addEventListener(`click`,C);var E=document.querySelectorAll(`.tab`);E.forEach(e=>{e.addEventListener(`click`,()=>{E.forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`);let t=e.dataset.tab;document.querySelectorAll(`.page`).forEach(e=>e.classList.remove(`visible`)),document.getElementById(t).classList.add(`visible`),t!==`guessing`&&_&&_.pauseVideo(),t!==`random-vid`&&c.replaceChildren()})});