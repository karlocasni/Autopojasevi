function ln(r,e){for(var t=0;t<e.length;t++){const s=e[t];if(typeof s!="string"&&!Array.isArray(s)){for(const n in s)if(n!=="default"&&!(n in r)){const a=Object.getOwnPropertyDescriptor(s,n);a&&Object.defineProperty(r,n,a.get?a:{enumerable:!0,get:()=>s[n]})}}}return Object.freeze(Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function t(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(n){if(n.ep)return;n.ep=!0;const a=t(n);fetch(n.href,a)}})();class fr{constructor(){this.routes={},this.protectedRoutes=new Set,this.currentRoute=null,this.authCheck=null}register(e,t,s={}){this.routes[e]=t,s.protected&&this.protectedRoutes.add(e)}setAuthCheck(e){this.authCheck=e}async navigate(e,t={}){if(this.protectedRoutes.has(e)){if(!this.authCheck){console.error("Auth check function not set");return}if(!await this.authCheck()){sessionStorage.setItem("intendedRoute",e),this.navigate("/admin/login");return}}this.currentRoute=e;const s=this.routes[e];if(s){const n=document.getElementById("app");n.innerHTML="",n.appendChild(s(t)),window.scrollTo(0,0),window.history.pushState({path:e,data:t},"",e)}}navigateToIntended(){const e=sessionStorage.getItem("intendedRoute");e?(sessionStorage.removeItem("intendedRoute"),this.navigate(e)):this.navigate("/admin")}init(){window.addEventListener("popstate",s=>{s.state&&s.state.path&&this.navigate(s.state.path,s.state.data||{})});const e=window.location.pathname,t=this.routes[e]?e:"/";this.navigate(t)}}const U=new fr;fr.navigate=(r,e)=>U.navigate(r,e);function gr(){const r=document.createElement("header");return r.className="header",r.id="main-header",r.innerHTML=`
    <div class="header-container">
      <nav class="header-nav">
        <a href="#" class="nav-link" data-route="/">O NAMA</a>
        <a href="#" class="nav-link" data-route="/">FAQ</a>
      </nav>
      
      <div class="header-logo">
        <img src="/images/logo.jpg" alt="Autopojasevi.hr" class="logo-img">
      </div>
      
      <nav class="header-nav">
        <a href="#" class="nav-link" data-route="/">KONTAKT</a>
        <button class="btn btn-cta" id="header-cta">REZERVIRAJ</button>
      </nav>
    </div>
  `,window.addEventListener("scroll",()=>{window.pageYOffset>100?r.classList.add("scrolled"):r.classList.remove("scrolled")}),r.querySelectorAll(".nav-link").forEach(e=>{e.addEventListener("click",t=>{var n,a,i;t.preventDefault();const s=t.target.textContent.toLowerCase();s==="o nama"?(n=document.getElementById("about-section"))==null||n.scrollIntoView({behavior:"smooth"}):s==="faq"?(a=document.getElementById("faq-section"))==null||a.scrollIntoView({behavior:"smooth"}):s==="kontakt"&&((i=document.getElementById("contact-section"))==null||i.scrollIntoView({behavior:"smooth"}))})}),r.querySelector("#header-cta").addEventListener("click",()=>{U.navigate("/booking")}),r}const vr=document.createElement("style");vr.textContent=`
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    transition: all var(--transition-base);
    padding: var(--spacing-md) 0;
  }

  .header.scrolled {
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border-bottom: 1px solid var(--glass-border);
    padding: var(--spacing-sm) 0;
  }

  .header-container {
    max-width: var(--container-max);
    margin: 0 auto;
    padding: 0 var(--spacing-lg);
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: var(--spacing-xl);
  }

  .header-nav {
    display: flex;
    align-items: center;
    gap: var(--spacing-xl);
  }
  
  .header-nav:first-child {
    justify-self: start;
  }
  
  .header-nav:last-child {
    justify-self: end;
  }

  .nav-link {
    font-family: var(--font-body);
    font-weight: 400;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-text);
    transition: color var(--transition-fast);
    cursor: pointer;
  }

  .nav-link:hover {
    color: var(--color-accent);
  }

  .header-logo {
    justify-self: center;
  }

  .logo-img {
    height: 60px;
    width: auto;
    object-fit: contain;
    transition: transform var(--transition-base);
  }

  .header.scrolled .logo-img {
    height: 50px;
  }

  .logo-img:hover {
    transform: scale(1.05);
  }
  
  #header-cta {
    padding: var(--spacing-sm) var(--spacing-lg);
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    .header-container {
      display: flex;
      flex-direction: row; /* Horizontal layout */
      justify-content: space-between;
      align-items: center;
      gap: var(--spacing-sm);
    }

    .header-logo {
      height: auto;
      margin-bottom: 0;
      flex: 0 0 auto;
      text-align: left;
      order: 1;
    }

    .logo-img {
      height: 35px; /* Smaller */
    }

    /* Wrap both nav groups into a container if possible, or simulate it */
    /* Since we can't easily change HTML structure here, we'll try to visually stack them on the right */
    
    .header-nav {
      font-size: 0.75rem;
      gap: var(--spacing-sm);
      display: flex;
      justify-content: flex-end;
    }

    /* We need to group the nav items on the right. 
       The HTML structure has: nav (O nama...), logo, nav (Kontakt...).
       We need to pull them out of flow or use flex ordering carefully.
    */
    
    .header-nav:first-child {
        order: 2;
        display: none; /* Temporarily hide "O nama/FAQ" to simplify if needed, OR stack them */
    }
    
    /* Re-thinking: To stack them on the right, we'd ideally need a wrapper. 
       Without wrapper, we can try absolute positioning or grid. 
       Let's use Grid for the container.
    */
    
    .header-container {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-areas: 
            "logo top-nav"
            "logo bottom-nav";
        align-items: center;
    }
    
    .header-logo {
        grid-area: logo;
        order: unset;
        width: auto;
    }
    
    .header-nav:first-child {
        grid-area: top-nav;
        display: flex;
        justify-content: flex-end;
        order: unset;
        margin-bottom: 2px;
    }
    
    .header-nav:last-child {
        grid-area: bottom-nav;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        order: unset;
    }

    #header-cta {
        padding: 0.3rem 0.6rem;
        font-size: 0.75rem;
    }
  }
`;document.head.appendChild(vr);function mr(){const r=document.createElement("footer");return r.className="footer",r.innerHTML=`
    <div class="footer-container">
      <div class="footer-column footer-left">
        <h4 class="footer-heading">Navigacija</h4>
        <ul class="footer-links">
          <li><a href="#" class="footer-link" id="footer-rezervacija">Rezervacija</a></li>
          <li><a href="#" class="footer-link" id="footer-kontakt">Kontakt</a></li>
          <li><a href="#" class="footer-link" id="footer-admin">Admin panel</a></li>
        </ul>
        <p class="footer-disclaimer">
          Svi podaci su zaštićeni u skladu s GDPR propisima.
        </p>
      </div>

      <div class="footer-column footer-center">
        <div class="footer-logo">
          <h3 class="footer-logo-text">AUTOPOJASEVI.HR</h3>
        </div>
        <div class="footer-info">
          <p class="footer-address">
            <strong>Vranplaninska ulica 1</strong><br>
            10000 Zagreb, Hrvatska
          </p>
          <p class="footer-hours">
            <strong>Radno vrijeme:</strong><br>
            Pon - Pet: 09:00 - 17:00
          </p>
        </div>
        <p class="footer-copyright">
          © 2025 by Autopojasevi.hr<br>
          Powered by <span class="text-accent">Egzosfera</span>
        </p>
      </div>

      <div class="footer-column footer-right">
        <h4 class="footer-heading">Pratite nas</h4>
        <div class="footer-socials">
          <a href="https://instagram.com" target="_blank" class="social-link" aria-label="Instagram">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="https://facebook.com" target="_blank" class="social-link" aria-label="Facebook">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="https://linkedin.com" target="_blank" class="social-link" aria-label="LinkedIn">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  `,r.querySelector("#footer-rezervacija").addEventListener("click",e=>{e.preventDefault(),U.navigate("/booking")}),r.querySelector("#footer-kontakt").addEventListener("click",e=>{var t;e.preventDefault(),(t=document.getElementById("contact-section"))==null||t.scrollIntoView({behavior:"smooth"})}),r.querySelector("#footer-admin").addEventListener("click",e=>{e.preventDefault(),U.navigate("/admin")}),r}const yr=document.createElement("style");yr.textContent=`
  .footer {
    background: var(--color-secondary);
    border-top: 1px solid var(--glass-border);
    padding: var(--spacing-3xl) 0 var(--spacing-xl);
    margin-top: 0;
  }

  .footer-container {
    max-width: var(--container-max);
    margin: 0 auto;
    padding: 0 var(--spacing-lg);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: var(--spacing-xl);
    align-items: start;
  }

  .footer-logo-text {
    font-family: var(--font-heading-bottom);
    font-size: 2rem;
    color: var(--color-text);
    margin-bottom: var(--spacing-md);
    letter-spacing: 0.05em;
  }

  .footer-column {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .footer-left {
    align-items: flex-start;
  }

  .footer-center {
    align-items: center;
    text-align: center;
  }

  .footer-right {
    align-items: flex-end; /* Keep it right aligned horizontally */
    justify-content: flex-start; /* Align to top vertically like left column if that's what they mean by "same height" */
    text-align: right;
  }
  /* ... existing styles ... */
  .footer-socials {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .social-link {
    color: var(--color-text);
    transition: all var(--transition-fast);
    display: inline-flex;
  }
  
  .social-link .icon {
    width: 32px;
    height: 32px;
  }

  .social-link:hover {
    color: var(--color-accent);
    transform: scale(1.1);
  }

  @media (max-width: 1024px) {
    .footer-container {
      grid-template-columns: 1fr;
      text-align: center;
    }

    .footer-left,
    .footer-right {
      align-items: center;
      text-align: center;
    }

    .footer-socials {
      flex-direction: row;
      justify-content: center;
    }
    
    .footer-logo-text {
        font-size: 1.2rem;
    }
    
    .footer-heading {
        font-size: 1rem;
    }
    
    .footer-link, .footer-address, .footer-hours, .footer-copyright, .footer-disclaimer {
        font-size: 0.85rem;
    }
  }
`;document.head.appendChild(yr);const cn="modulepreload",dn=function(r){return"/"+r},Ft={},G=function(e,t,s){let n=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),o=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));n=Promise.allSettled(t.map(l=>{if(l=dn(l),l in Ft)return;Ft[l]=!0;const c=l.endsWith(".css"),u=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const f=document.createElement("link");if(f.rel=c?"stylesheet":cn,c||(f.as="script"),f.crossOrigin="",f.href=l,o&&f.setAttribute("nonce",o),document.head.appendChild(f),c)return new Promise((d,h)=>{f.addEventListener("load",d),f.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${l}`)))})}))}function a(i){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=i,window.dispatchEvent(o),!o.defaultPrevented)throw i}return n.then(i=>{for(const o of i||[])o.status==="rejected"&&a(o.reason);return e().catch(a)})};var ge=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function un(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}function $e(r){if(r.__esModule)return r;var e=r.default;if(typeof e=="function"){var t=function s(){return this instanceof s?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};t.prototype=e.prototype}else t={};return Object.defineProperty(t,"__esModule",{value:!0}),Object.keys(r).forEach(function(s){var n=Object.getOwnPropertyDescriptor(r,s);Object.defineProperty(t,s,n.get?n:{enumerable:!0,get:function(){return r[s]}})}),t}var Lt={},Je={},yt=function(r,e){return yt=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,s){t.__proto__=s}||function(t,s){for(var n in s)Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n])},yt(r,e)};function br(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");yt(r,e);function t(){this.constructor=r}r.prototype=e===null?Object.create(e):(t.prototype=e.prototype,new t)}var Ye=function(){return Ye=Object.assign||function(e){for(var t,s=1,n=arguments.length;s<n;s++){t=arguments[s];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e},Ye.apply(this,arguments)};function je(r,e){var t={};for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&e.indexOf(s)<0&&(t[s]=r[s]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,s=Object.getOwnPropertySymbols(r);n<s.length;n++)e.indexOf(s[n])<0&&Object.prototype.propertyIsEnumerable.call(r,s[n])&&(t[s[n]]=r[s[n]]);return t}function wr(r,e,t,s){var n=arguments.length,a=n<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,t):s,i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(r,e,t,s);else for(var o=r.length-1;o>=0;o--)(i=r[o])&&(a=(n<3?i(a):n>3?i(e,t,a):i(e,t))||a);return n>3&&a&&Object.defineProperty(e,t,a),a}function _r(r,e){return function(t,s){e(t,s,r)}}function xr(r,e,t,s,n,a){function i(m){if(m!==void 0&&typeof m!="function")throw new TypeError("Function expected");return m}for(var o=s.kind,l=o==="getter"?"get":o==="setter"?"set":"value",c=!e&&r?s.static?r:r.prototype:null,u=e||(c?Object.getOwnPropertyDescriptor(c,s.name):{}),f,d=!1,h=t.length-1;h>=0;h--){var p={};for(var g in s)p[g]=g==="access"?{}:s[g];for(var g in s.access)p.access[g]=s.access[g];p.addInitializer=function(m){if(d)throw new TypeError("Cannot add initializers after decoration has completed");a.push(i(m||null))};var v=(0,t[h])(o==="accessor"?{get:u.get,set:u.set}:u[l],p);if(o==="accessor"){if(v===void 0)continue;if(v===null||typeof v!="object")throw new TypeError("Object expected");(f=i(v.get))&&(u.get=f),(f=i(v.set))&&(u.set=f),(f=i(v.init))&&n.unshift(f)}else(f=i(v))&&(o==="field"?n.unshift(f):u[l]=f)}c&&Object.defineProperty(c,s.name,u),d=!0}function kr(r,e,t){for(var s=arguments.length>2,n=0;n<e.length;n++)t=s?e[n].call(r,t):e[n].call(r);return s?t:void 0}function Er(r){return typeof r=="symbol"?r:"".concat(r)}function Sr(r,e,t){return typeof e=="symbol"&&(e=e.description?"[".concat(e.description,"]"):""),Object.defineProperty(r,"name",{configurable:!0,value:t?"".concat(t," ",e):e})}function jr(r,e){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(r,e)}function E(r,e,t,s){function n(a){return a instanceof t?a:new t(function(i){i(a)})}return new(t||(t=Promise))(function(a,i){function o(u){try{c(s.next(u))}catch(f){i(f)}}function l(u){try{c(s.throw(u))}catch(f){i(f)}}function c(u){u.done?a(u.value):n(u.value).then(o,l)}c((s=s.apply(r,e||[])).next())})}function Tr(r,e){var t={label:0,sent:function(){if(a[0]&1)throw a[1];return a[1]},trys:[],ops:[]},s,n,a,i=Object.create((typeof Iterator=="function"?Iterator:Object).prototype);return i.next=o(0),i.throw=o(1),i.return=o(2),typeof Symbol=="function"&&(i[Symbol.iterator]=function(){return this}),i;function o(c){return function(u){return l([c,u])}}function l(c){if(s)throw new TypeError("Generator is already executing.");for(;i&&(i=0,c[0]&&(t=0)),t;)try{if(s=1,n&&(a=c[0]&2?n.return:c[0]?n.throw||((a=n.return)&&a.call(n),0):n.next)&&!(a=a.call(n,c[1])).done)return a;switch(n=0,a&&(c=[c[0]&2,a.value]),c[0]){case 0:case 1:a=c;break;case 4:return t.label++,{value:c[1],done:!1};case 5:t.label++,n=c[1],c=[0];continue;case 7:c=t.ops.pop(),t.trys.pop();continue;default:if(a=t.trys,!(a=a.length>0&&a[a.length-1])&&(c[0]===6||c[0]===2)){t=0;continue}if(c[0]===3&&(!a||c[1]>a[0]&&c[1]<a[3])){t.label=c[1];break}if(c[0]===6&&t.label<a[1]){t.label=a[1],a=c;break}if(a&&t.label<a[2]){t.label=a[2],t.ops.push(c);break}a[2]&&t.ops.pop(),t.trys.pop();continue}c=e.call(r,t)}catch(u){c=[6,u],n=0}finally{s=a=0}if(c[0]&5)throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}}var it=Object.create?function(r,e,t,s){s===void 0&&(s=t);var n=Object.getOwnPropertyDescriptor(e,t);(!n||("get"in n?!e.__esModule:n.writable||n.configurable))&&(n={enumerable:!0,get:function(){return e[t]}}),Object.defineProperty(r,s,n)}:function(r,e,t,s){s===void 0&&(s=t),r[s]=e[t]};function Or(r,e){for(var t in r)t!=="default"&&!Object.prototype.hasOwnProperty.call(e,t)&&it(e,r,t)}function Qe(r){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&r[e],s=0;if(t)return t.call(r);if(r&&typeof r.length=="number")return{next:function(){return r&&s>=r.length&&(r=void 0),{value:r&&r[s++],done:!r}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function zt(r,e){var t=typeof Symbol=="function"&&r[Symbol.iterator];if(!t)return r;var s=t.call(r),n,a=[],i;try{for(;(e===void 0||e-- >0)&&!(n=s.next()).done;)a.push(n.value)}catch(o){i={error:o}}finally{try{n&&!n.done&&(t=s.return)&&t.call(s)}finally{if(i)throw i.error}}return a}function Cr(){for(var r=[],e=0;e<arguments.length;e++)r=r.concat(zt(arguments[e]));return r}function Ar(){for(var r=0,e=0,t=arguments.length;e<t;e++)r+=arguments[e].length;for(var s=Array(r),n=0,e=0;e<t;e++)for(var a=arguments[e],i=0,o=a.length;i<o;i++,n++)s[n]=a[i];return s}function Rr(r,e,t){if(t||arguments.length===2)for(var s=0,n=e.length,a;s<n;s++)(a||!(s in e))&&(a||(a=Array.prototype.slice.call(e,0,s)),a[s]=e[s]);return r.concat(a||Array.prototype.slice.call(e))}function Ee(r){return this instanceof Ee?(this.v=r,this):new Ee(r)}function Pr(r,e,t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var s=t.apply(r,e||[]),n,a=[];return n=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),o("next"),o("throw"),o("return",i),n[Symbol.asyncIterator]=function(){return this},n;function i(h){return function(p){return Promise.resolve(p).then(h,f)}}function o(h,p){s[h]&&(n[h]=function(g){return new Promise(function(v,m){a.push([h,g,v,m])>1||l(h,g)})},p&&(n[h]=p(n[h])))}function l(h,p){try{c(s[h](p))}catch(g){d(a[0][3],g)}}function c(h){h.value instanceof Ee?Promise.resolve(h.value.v).then(u,f):d(a[0][2],h)}function u(h){l("next",h)}function f(h){l("throw",h)}function d(h,p){h(p),a.shift(),a.length&&l(a[0][0],a[0][1])}}function $r(r){var e,t;return e={},s("next"),s("throw",function(n){throw n}),s("return"),e[Symbol.iterator]=function(){return this},e;function s(n,a){e[n]=r[n]?function(i){return(t=!t)?{value:Ee(r[n](i)),done:!1}:a?a(i):i}:a}}function Ir(r){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e=r[Symbol.asyncIterator],t;return e?e.call(r):(r=typeof Qe=="function"?Qe(r):r[Symbol.iterator](),t={},s("next"),s("throw"),s("return"),t[Symbol.asyncIterator]=function(){return this},t);function s(a){t[a]=r[a]&&function(i){return new Promise(function(o,l){i=r[a](i),n(o,l,i.done,i.value)})}}function n(a,i,o,l){Promise.resolve(l).then(function(c){a({value:c,done:o})},i)}}function Lr(r,e){return Object.defineProperty?Object.defineProperty(r,"raw",{value:e}):r.raw=e,r}var hn=Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e},bt=function(r){return bt=Object.getOwnPropertyNames||function(e){var t=[];for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&(t[t.length]=s);return t},bt(r)};function zr(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var t=bt(r),s=0;s<t.length;s++)t[s]!=="default"&&it(e,r,t[s]);return hn(e,r),e}function Nr(r){return r&&r.__esModule?r:{default:r}}function Mr(r,e,t,s){if(t==="a"&&!s)throw new TypeError("Private accessor was defined without a getter");if(typeof e=="function"?r!==e||!s:!e.has(r))throw new TypeError("Cannot read private member from an object whose class did not declare it");return t==="m"?s:t==="a"?s.call(r):s?s.value:e.get(r)}function Br(r,e,t,s,n){if(s==="m")throw new TypeError("Private method is not writable");if(s==="a"&&!n)throw new TypeError("Private accessor was defined without a setter");if(typeof e=="function"?r!==e||!n:!e.has(r))throw new TypeError("Cannot write private member to an object whose class did not declare it");return s==="a"?n.call(r,t):n?n.value=t:e.set(r,t),t}function Ur(r,e){if(e===null||typeof e!="object"&&typeof e!="function")throw new TypeError("Cannot use 'in' operator on non-object");return typeof r=="function"?e===r:r.has(e)}function qr(r,e,t){if(e!=null){if(typeof e!="object"&&typeof e!="function")throw new TypeError("Object expected.");var s,n;if(t){if(!Symbol.asyncDispose)throw new TypeError("Symbol.asyncDispose is not defined.");s=e[Symbol.asyncDispose]}if(s===void 0){if(!Symbol.dispose)throw new TypeError("Symbol.dispose is not defined.");s=e[Symbol.dispose],t&&(n=s)}if(typeof s!="function")throw new TypeError("Object not disposable.");n&&(s=function(){try{n.call(this)}catch(a){return Promise.reject(a)}}),r.stack.push({value:e,dispose:s,async:t})}else t&&r.stack.push({async:!0});return e}var pn=typeof SuppressedError=="function"?SuppressedError:function(r,e,t){var s=new Error(t);return s.name="SuppressedError",s.error=r,s.suppressed=e,s};function Dr(r){function e(a){r.error=r.hasError?new pn(a,r.error,"An error was suppressed during disposal."):a,r.hasError=!0}var t,s=0;function n(){for(;t=r.stack.pop();)try{if(!t.async&&s===1)return s=0,r.stack.push(t),Promise.resolve().then(n);if(t.dispose){var a=t.dispose.call(t.value);if(t.async)return s|=2,Promise.resolve(a).then(n,function(i){return e(i),n()})}else s|=1}catch(i){e(i)}if(s===1)return r.hasError?Promise.reject(r.error):Promise.resolve();if(r.hasError)throw r.error}return n()}function Hr(r,e){return typeof r=="string"&&/^\.\.?\//.test(r)?r.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i,function(t,s,n,a,i){return s?e?".jsx":".js":n&&(!a||!i)?t:n+a+"."+i.toLowerCase()+"js"}):r}const fn={__extends:br,__assign:Ye,__rest:je,__decorate:wr,__param:_r,__esDecorate:xr,__runInitializers:kr,__propKey:Er,__setFunctionName:Sr,__metadata:jr,__awaiter:E,__generator:Tr,__createBinding:it,__exportStar:Or,__values:Qe,__read:zt,__spread:Cr,__spreadArrays:Ar,__spreadArray:Rr,__await:Ee,__asyncGenerator:Pr,__asyncDelegator:$r,__asyncValues:Ir,__makeTemplateObject:Lr,__importStar:zr,__importDefault:Nr,__classPrivateFieldGet:Mr,__classPrivateFieldSet:Br,__classPrivateFieldIn:Ur,__addDisposableResource:qr,__disposeResources:Dr,__rewriteRelativeImportExtension:Hr},gn=Object.freeze(Object.defineProperty({__proto__:null,__addDisposableResource:qr,get __assign(){return Ye},__asyncDelegator:$r,__asyncGenerator:Pr,__asyncValues:Ir,__await:Ee,__awaiter:E,__classPrivateFieldGet:Mr,__classPrivateFieldIn:Ur,__classPrivateFieldSet:Br,__createBinding:it,__decorate:wr,__disposeResources:Dr,__esDecorate:xr,__exportStar:Or,__extends:br,__generator:Tr,__importDefault:Nr,__importStar:zr,__makeTemplateObject:Lr,__metadata:jr,__param:_r,__propKey:Er,__read:zt,__rest:je,__rewriteRelativeImportExtension:Hr,__runInitializers:kr,__setFunctionName:Sr,__spread:Cr,__spreadArray:Rr,__spreadArrays:Ar,__values:Qe,default:fn},Symbol.toStringTag,{value:"Module"})),vn=r=>r?(...e)=>r(...e):(...e)=>fetch(...e);let ot=class extends Error{constructor(e,t="FunctionsError",s){super(e),this.name=t,this.context=s}},Vr=class extends ot{constructor(e){super("Failed to send a request to the Edge Function","FunctionsFetchError",e)}},wt=class extends ot{constructor(e){super("Relay Error invoking the Edge Function","FunctionsRelayError",e)}},_t=class extends ot{constructor(e){super("Edge Function returned a non-2xx status code","FunctionsHttpError",e)}};var Xe;(function(r){r.Any="any",r.ApNortheast1="ap-northeast-1",r.ApNortheast2="ap-northeast-2",r.ApSouth1="ap-south-1",r.ApSoutheast1="ap-southeast-1",r.ApSoutheast2="ap-southeast-2",r.CaCentral1="ca-central-1",r.EuCentral1="eu-central-1",r.EuWest1="eu-west-1",r.EuWest2="eu-west-2",r.EuWest3="eu-west-3",r.SaEast1="sa-east-1",r.UsEast1="us-east-1",r.UsWest1="us-west-1",r.UsWest2="us-west-2"})(Xe||(Xe={}));class mn{constructor(e,{headers:t={},customFetch:s,region:n=Xe.Any}={}){this.url=e,this.headers=t,this.region=n,this.fetch=vn(s)}setAuth(e){this.headers.Authorization=`Bearer ${e}`}invoke(e){return E(this,arguments,void 0,function*(t,s={}){var n;let a,i;try{const{headers:o,method:l,body:c,signal:u,timeout:f}=s;let d={},{region:h}=s;h||(h=this.region);const p=new URL(`${this.url}/${t}`);h&&h!=="any"&&(d["x-region"]=h,p.searchParams.set("forceFunctionRegion",h));let g;c&&(o&&!Object.prototype.hasOwnProperty.call(o,"Content-Type")||!o)?typeof Blob<"u"&&c instanceof Blob||c instanceof ArrayBuffer?(d["Content-Type"]="application/octet-stream",g=c):typeof c=="string"?(d["Content-Type"]="text/plain",g=c):typeof FormData<"u"&&c instanceof FormData?g=c:(d["Content-Type"]="application/json",g=JSON.stringify(c)):g=c;let v=u;f&&(i=new AbortController,a=setTimeout(()=>i.abort(),f),u?(v=i.signal,u.addEventListener("abort",()=>i.abort())):v=i.signal);const m=yield this.fetch(p.toString(),{method:l||"POST",headers:Object.assign(Object.assign(Object.assign({},d),this.headers),o),body:g,signal:v}).catch(_=>{throw new Vr(_)}),b=m.headers.get("x-relay-error");if(b&&b==="true")throw new wt(m);if(!m.ok)throw new _t(m);let y=((n=m.headers.get("Content-Type"))!==null&&n!==void 0?n:"text/plain").split(";")[0].trim(),x;return y==="application/json"?x=yield m.json():y==="application/octet-stream"||y==="application/pdf"?x=yield m.blob():y==="text/event-stream"?x=m:y==="multipart/form-data"?x=yield m.formData():x=yield m.text(),{data:x,error:null,response:m}}catch(o){return{data:null,error:o,response:o instanceof _t||o instanceof wt?o.context:void 0}}finally{a&&clearTimeout(a)}})}}const yn=Object.freeze(Object.defineProperty({__proto__:null,get FunctionRegion(){return Xe},FunctionsClient:mn,FunctionsError:ot,FunctionsFetchError:Vr,FunctionsHttpError:_t,FunctionsRelayError:wt},Symbol.toStringTag,{value:"Module"})),Fr=$e(yn);var B={};const Te=$e(gn);var ze={},Ne={},Me={},Be={},Ue={},qe={},Kt;function Kr(){if(Kt)return qe;Kt=1,Object.defineProperty(qe,"__esModule",{value:!0});class r extends Error{constructor(t){super(t.message),this.name="PostgrestError",this.details=t.details,this.hint=t.hint,this.code=t.code}}return qe.default=r,qe}var Gt;function Gr(){if(Gt)return Ue;Gt=1,Object.defineProperty(Ue,"__esModule",{value:!0});const e=Te.__importDefault(Kr());let t=class{constructor(n){var a,i;this.shouldThrowOnError=!1,this.method=n.method,this.url=n.url,this.headers=new Headers(n.headers),this.schema=n.schema,this.body=n.body,this.shouldThrowOnError=(a=n.shouldThrowOnError)!==null&&a!==void 0?a:!1,this.signal=n.signal,this.isMaybeSingle=(i=n.isMaybeSingle)!==null&&i!==void 0?i:!1,n.fetch?this.fetch=n.fetch:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(n,a){return this.headers=new Headers(this.headers),this.headers.set(n,a),this}then(n,a){this.schema===void 0||(["GET","HEAD"].includes(this.method)?this.headers.set("Accept-Profile",this.schema):this.headers.set("Content-Profile",this.schema)),this.method!=="GET"&&this.method!=="HEAD"&&this.headers.set("Content-Type","application/json");const i=this.fetch;let o=i(this.url.toString(),{method:this.method,headers:this.headers,body:JSON.stringify(this.body),signal:this.signal}).then(async l=>{var c,u,f,d;let h=null,p=null,g=null,v=l.status,m=l.statusText;if(l.ok){if(this.method!=="HEAD"){const _=await l.text();_===""||(this.headers.get("Accept")==="text/csv"||this.headers.get("Accept")&&(!((c=this.headers.get("Accept"))===null||c===void 0)&&c.includes("application/vnd.pgrst.plan+text"))?p=_:p=JSON.parse(_))}const y=(u=this.headers.get("Prefer"))===null||u===void 0?void 0:u.match(/count=(exact|planned|estimated)/),x=(f=l.headers.get("content-range"))===null||f===void 0?void 0:f.split("/");y&&x&&x.length>1&&(g=parseInt(x[1])),this.isMaybeSingle&&this.method==="GET"&&Array.isArray(p)&&(p.length>1?(h={code:"PGRST116",details:`Results contain ${p.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:"JSON object requested, multiple (or no) rows returned"},p=null,g=null,v=406,m="Not Acceptable"):p.length===1?p=p[0]:p=null)}else{const y=await l.text();try{h=JSON.parse(y),Array.isArray(h)&&l.status===404&&(p=[],h=null,v=200,m="OK")}catch{l.status===404&&y===""?(v=204,m="No Content"):h={message:y}}if(h&&this.isMaybeSingle&&(!((d=h==null?void 0:h.details)===null||d===void 0)&&d.includes("0 rows"))&&(h=null,v=200,m="OK"),h&&this.shouldThrowOnError)throw new e.default(h)}return{error:h,data:p,count:g,status:v,statusText:m}});return this.shouldThrowOnError||(o=o.catch(l=>{var c,u,f,d,h,p;let g="";const v=l==null?void 0:l.cause;if(v){const m=(c=v==null?void 0:v.message)!==null&&c!==void 0?c:"",b=(u=v==null?void 0:v.code)!==null&&u!==void 0?u:"";g=`${(f=l==null?void 0:l.name)!==null&&f!==void 0?f:"FetchError"}: ${l==null?void 0:l.message}`,g+=`

Caused by: ${(d=v==null?void 0:v.name)!==null&&d!==void 0?d:"Error"}: ${m}`,b&&(g+=` (${b})`),v!=null&&v.stack&&(g+=`
${v.stack}`)}else g=(h=l==null?void 0:l.stack)!==null&&h!==void 0?h:"";return{error:{message:`${(p=l==null?void 0:l.name)!==null&&p!==void 0?p:"FetchError"}: ${l==null?void 0:l.message}`,details:g,hint:"",code:""},data:null,count:null,status:0,statusText:""}})),o.then(n,a)}returns(){return this}overrideTypes(){return this}};return Ue.default=t,Ue}var Wt;function Wr(){if(Wt)return Be;Wt=1,Object.defineProperty(Be,"__esModule",{value:!0});const e=Te.__importDefault(Gr());let t=class extends e.default{select(n){let a=!1;const i=(n??"*").split("").map(o=>/\s/.test(o)&&!a?"":(o==='"'&&(a=!a),o)).join("");return this.url.searchParams.set("select",i),this.headers.append("Prefer","return=representation"),this}order(n,{ascending:a=!0,nullsFirst:i,foreignTable:o,referencedTable:l=o}={}){const c=l?`${l}.order`:"order",u=this.url.searchParams.get(c);return this.url.searchParams.set(c,`${u?`${u},`:""}${n}.${a?"asc":"desc"}${i===void 0?"":i?".nullsfirst":".nullslast"}`),this}limit(n,{foreignTable:a,referencedTable:i=a}={}){const o=typeof i>"u"?"limit":`${i}.limit`;return this.url.searchParams.set(o,`${n}`),this}range(n,a,{foreignTable:i,referencedTable:o=i}={}){const l=typeof o>"u"?"offset":`${o}.offset`,c=typeof o>"u"?"limit":`${o}.limit`;return this.url.searchParams.set(l,`${n}`),this.url.searchParams.set(c,`${a-n+1}`),this}abortSignal(n){return this.signal=n,this}single(){return this.headers.set("Accept","application/vnd.pgrst.object+json"),this}maybeSingle(){return this.method==="GET"?this.headers.set("Accept","application/json"):this.headers.set("Accept","application/vnd.pgrst.object+json"),this.isMaybeSingle=!0,this}csv(){return this.headers.set("Accept","text/csv"),this}geojson(){return this.headers.set("Accept","application/geo+json"),this}explain({analyze:n=!1,verbose:a=!1,settings:i=!1,buffers:o=!1,wal:l=!1,format:c="text"}={}){var u;const f=[n?"analyze":null,a?"verbose":null,i?"settings":null,o?"buffers":null,l?"wal":null].filter(Boolean).join("|"),d=(u=this.headers.get("Accept"))!==null&&u!==void 0?u:"application/json";return this.headers.set("Accept",`application/vnd.pgrst.plan+${c}; for="${d}"; options=${f};`),c==="json"?this:this}rollback(){return this.headers.append("Prefer","tx=rollback"),this}returns(){return this}maxAffected(n){return this.headers.append("Prefer","handling=strict"),this.headers.append("Prefer",`max-affected=${n}`),this}};return Be.default=t,Be}var Jt;function Nt(){if(Jt)return Me;Jt=1,Object.defineProperty(Me,"__esModule",{value:!0});const e=Te.__importDefault(Wr()),t=new RegExp("[,()]");let s=class extends e.default{eq(a,i){return this.url.searchParams.append(a,`eq.${i}`),this}neq(a,i){return this.url.searchParams.append(a,`neq.${i}`),this}gt(a,i){return this.url.searchParams.append(a,`gt.${i}`),this}gte(a,i){return this.url.searchParams.append(a,`gte.${i}`),this}lt(a,i){return this.url.searchParams.append(a,`lt.${i}`),this}lte(a,i){return this.url.searchParams.append(a,`lte.${i}`),this}like(a,i){return this.url.searchParams.append(a,`like.${i}`),this}likeAllOf(a,i){return this.url.searchParams.append(a,`like(all).{${i.join(",")}}`),this}likeAnyOf(a,i){return this.url.searchParams.append(a,`like(any).{${i.join(",")}}`),this}ilike(a,i){return this.url.searchParams.append(a,`ilike.${i}`),this}ilikeAllOf(a,i){return this.url.searchParams.append(a,`ilike(all).{${i.join(",")}}`),this}ilikeAnyOf(a,i){return this.url.searchParams.append(a,`ilike(any).{${i.join(",")}}`),this}regexMatch(a,i){return this.url.searchParams.append(a,`match.${i}`),this}regexIMatch(a,i){return this.url.searchParams.append(a,`imatch.${i}`),this}is(a,i){return this.url.searchParams.append(a,`is.${i}`),this}isDistinct(a,i){return this.url.searchParams.append(a,`isdistinct.${i}`),this}in(a,i){const o=Array.from(new Set(i)).map(l=>typeof l=="string"&&t.test(l)?`"${l}"`:`${l}`).join(",");return this.url.searchParams.append(a,`in.(${o})`),this}contains(a,i){return typeof i=="string"?this.url.searchParams.append(a,`cs.${i}`):Array.isArray(i)?this.url.searchParams.append(a,`cs.{${i.join(",")}}`):this.url.searchParams.append(a,`cs.${JSON.stringify(i)}`),this}containedBy(a,i){return typeof i=="string"?this.url.searchParams.append(a,`cd.${i}`):Array.isArray(i)?this.url.searchParams.append(a,`cd.{${i.join(",")}}`):this.url.searchParams.append(a,`cd.${JSON.stringify(i)}`),this}rangeGt(a,i){return this.url.searchParams.append(a,`sr.${i}`),this}rangeGte(a,i){return this.url.searchParams.append(a,`nxl.${i}`),this}rangeLt(a,i){return this.url.searchParams.append(a,`sl.${i}`),this}rangeLte(a,i){return this.url.searchParams.append(a,`nxr.${i}`),this}rangeAdjacent(a,i){return this.url.searchParams.append(a,`adj.${i}`),this}overlaps(a,i){return typeof i=="string"?this.url.searchParams.append(a,`ov.${i}`):this.url.searchParams.append(a,`ov.{${i.join(",")}}`),this}textSearch(a,i,{config:o,type:l}={}){let c="";l==="plain"?c="pl":l==="phrase"?c="ph":l==="websearch"&&(c="w");const u=o===void 0?"":`(${o})`;return this.url.searchParams.append(a,`${c}fts${u}.${i}`),this}match(a){return Object.entries(a).forEach(([i,o])=>{this.url.searchParams.append(i,`eq.${o}`)}),this}not(a,i,o){return this.url.searchParams.append(a,`not.${i}.${o}`),this}or(a,{foreignTable:i,referencedTable:o=i}={}){const l=o?`${o}.or`:"or";return this.url.searchParams.append(l,`(${a})`),this}filter(a,i,o){return this.url.searchParams.append(a,`${i}.${o}`),this}};return Me.default=s,Me}var Yt;function Jr(){if(Yt)return Ne;Yt=1,Object.defineProperty(Ne,"__esModule",{value:!0});const e=Te.__importDefault(Nt());let t=class{constructor(n,{headers:a={},schema:i,fetch:o}){this.url=n,this.headers=new Headers(a),this.schema=i,this.fetch=o}select(n,a){const{head:i=!1,count:o}=a??{},l=i?"HEAD":"GET";let c=!1;const u=(n??"*").split("").map(f=>/\s/.test(f)&&!c?"":(f==='"'&&(c=!c),f)).join("");return this.url.searchParams.set("select",u),o&&this.headers.append("Prefer",`count=${o}`),new e.default({method:l,url:this.url,headers:this.headers,schema:this.schema,fetch:this.fetch})}insert(n,{count:a,defaultToNull:i=!0}={}){var o;const l="POST";if(a&&this.headers.append("Prefer",`count=${a}`),i||this.headers.append("Prefer","missing=default"),Array.isArray(n)){const c=n.reduce((u,f)=>u.concat(Object.keys(f)),[]);if(c.length>0){const u=[...new Set(c)].map(f=>`"${f}"`);this.url.searchParams.set("columns",u.join(","))}}return new e.default({method:l,url:this.url,headers:this.headers,schema:this.schema,body:n,fetch:(o=this.fetch)!==null&&o!==void 0?o:fetch})}upsert(n,{onConflict:a,ignoreDuplicates:i=!1,count:o,defaultToNull:l=!0}={}){var c;const u="POST";if(this.headers.append("Prefer",`resolution=${i?"ignore":"merge"}-duplicates`),a!==void 0&&this.url.searchParams.set("on_conflict",a),o&&this.headers.append("Prefer",`count=${o}`),l||this.headers.append("Prefer","missing=default"),Array.isArray(n)){const f=n.reduce((d,h)=>d.concat(Object.keys(h)),[]);if(f.length>0){const d=[...new Set(f)].map(h=>`"${h}"`);this.url.searchParams.set("columns",d.join(","))}}return new e.default({method:u,url:this.url,headers:this.headers,schema:this.schema,body:n,fetch:(c=this.fetch)!==null&&c!==void 0?c:fetch})}update(n,{count:a}={}){var i;const o="PATCH";return a&&this.headers.append("Prefer",`count=${a}`),new e.default({method:o,url:this.url,headers:this.headers,schema:this.schema,body:n,fetch:(i=this.fetch)!==null&&i!==void 0?i:fetch})}delete({count:n}={}){var a;const i="DELETE";return n&&this.headers.append("Prefer",`count=${n}`),new e.default({method:i,url:this.url,headers:this.headers,schema:this.schema,fetch:(a=this.fetch)!==null&&a!==void 0?a:fetch})}};return Ne.default=t,Ne}var Qt;function bn(){if(Qt)return ze;Qt=1,Object.defineProperty(ze,"__esModule",{value:!0});const r=Te,e=r.__importDefault(Jr()),t=r.__importDefault(Nt());let s=class Yr{constructor(a,{headers:i={},schema:o,fetch:l}={}){this.url=a,this.headers=new Headers(i),this.schemaName=o,this.fetch=l}from(a){if(!a||typeof a!="string"||a.trim()==="")throw new Error("Invalid relation name: relation must be a non-empty string.");const i=new URL(`${this.url}/${a}`);return new e.default(i,{headers:new Headers(this.headers),schema:this.schemaName,fetch:this.fetch})}schema(a){return new Yr(this.url,{headers:this.headers,schema:a,fetch:this.fetch})}rpc(a,i={},{head:o=!1,get:l=!1,count:c}={}){var u;let f;const d=new URL(`${this.url}/rpc/${a}`);let h;o||l?(f=o?"HEAD":"GET",Object.entries(i).filter(([g,v])=>v!==void 0).map(([g,v])=>[g,Array.isArray(v)?`{${v.join(",")}}`:`${v}`]).forEach(([g,v])=>{d.searchParams.append(g,v)})):(f="POST",h=i);const p=new Headers(this.headers);return c&&p.set("Prefer",`count=${c}`),new t.default({method:f,url:d,headers:p,schema:this.schemaName,body:h,fetch:(u=this.fetch)!==null&&u!==void 0?u:fetch})}};return ze.default=s,ze}Object.defineProperty(B,"__esModule",{value:!0});B.PostgrestError=B.PostgrestBuilder=B.PostgrestTransformBuilder=B.PostgrestFilterBuilder=B.PostgrestQueryBuilder=B.PostgrestClient=void 0;const Oe=Te,Qr=Oe.__importDefault(bn());B.PostgrestClient=Qr.default;const Xr=Oe.__importDefault(Jr());B.PostgrestQueryBuilder=Xr.default;const Zr=Oe.__importDefault(Nt());B.PostgrestFilterBuilder=Zr.default;const es=Oe.__importDefault(Wr());B.PostgrestTransformBuilder=es.default;const ts=Oe.__importDefault(Gr());B.PostgrestBuilder=ts.default;const rs=Oe.__importDefault(Kr());B.PostgrestError=rs.default;B.default={PostgrestClient:Qr.default,PostgrestQueryBuilder:Xr.default,PostgrestFilterBuilder:Zr.default,PostgrestTransformBuilder:es.default,PostgrestBuilder:ts.default,PostgrestError:rs.default};class ss{constructor(){}static detectEnvironment(){var e;if(typeof WebSocket<"u")return{type:"native",constructor:WebSocket};if(typeof globalThis<"u"&&typeof globalThis.WebSocket<"u")return{type:"native",constructor:globalThis.WebSocket};if(typeof global<"u"&&typeof global.WebSocket<"u")return{type:"native",constructor:global.WebSocket};if(typeof globalThis<"u"&&typeof globalThis.WebSocketPair<"u"&&typeof globalThis.WebSocket>"u")return{type:"cloudflare",error:"Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",workaround:"Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."};if(typeof globalThis<"u"&&globalThis.EdgeRuntime||typeof navigator<"u"&&(!((e=navigator.userAgent)===null||e===void 0)&&e.includes("Vercel-Edge")))return{type:"unsupported",error:"Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",workaround:"Use serverless functions or a different deployment target for WebSocket functionality."};if(typeof process<"u"){const t=process.versions;if(t&&t.node){const s=t.node,n=parseInt(s.replace(/^v/,"").split(".")[0]);return n>=22?typeof globalThis.WebSocket<"u"?{type:"native",constructor:globalThis.WebSocket}:{type:"unsupported",error:`Node.js ${n} detected but native WebSocket not found.`,workaround:"Provide a WebSocket implementation via the transport option."}:{type:"unsupported",error:`Node.js ${n} detected without native WebSocket support.`,workaround:`For Node.js < 22, install "ws" package and provide it via the transport option:
import ws from "ws"
new RealtimeClient(url, { transport: ws })`}}}return{type:"unsupported",error:"Unknown JavaScript runtime without WebSocket support.",workaround:"Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."}}static getWebSocketConstructor(){const e=this.detectEnvironment();if(e.constructor)return e.constructor;let t=e.error||"WebSocket not supported in this environment.";throw e.workaround&&(t+=`

Suggested solution: ${e.workaround}`),new Error(t)}static createWebSocket(e,t){const s=this.getWebSocketConstructor();return new s(e,t)}static isWebSocketSupported(){try{const e=this.detectEnvironment();return e.type==="native"||e.type==="ws"}catch{return!1}}}const wn="2.86.2",_n=`realtime-js/${wn}`,ns="1.0.0",xn="2.0.0",Xt=ns,xt=1e4,kn=1e3,En=100;var he;(function(r){r[r.connecting=0]="connecting",r[r.open=1]="open",r[r.closing=2]="closing",r[r.closed=3]="closed"})(he||(he={}));var I;(function(r){r.closed="closed",r.errored="errored",r.joined="joined",r.joining="joining",r.leaving="leaving"})(I||(I={}));var X;(function(r){r.close="phx_close",r.error="phx_error",r.join="phx_join",r.reply="phx_reply",r.leave="phx_leave",r.access_token="access_token"})(X||(X={}));var kt;(function(r){r.websocket="websocket"})(kt||(kt={}));var pe;(function(r){r.Connecting="connecting",r.Open="open",r.Closing="closing",r.Closed="closed"})(pe||(pe={}));class Sn{constructor(e){this.HEADER_LENGTH=1,this.USER_BROADCAST_PUSH_META_LENGTH=6,this.KINDS={userBroadcastPush:3,userBroadcast:4},this.BINARY_ENCODING=0,this.JSON_ENCODING=1,this.BROADCAST_EVENT="broadcast",this.allowedMetadataKeys=[],this.allowedMetadataKeys=e??[]}encode(e,t){if(e.event===this.BROADCAST_EVENT&&!(e.payload instanceof ArrayBuffer)&&typeof e.payload.event=="string")return t(this._binaryEncodeUserBroadcastPush(e));let s=[e.join_ref,e.ref,e.topic,e.event,e.payload];return t(JSON.stringify(s))}_binaryEncodeUserBroadcastPush(e){var t;return this._isArrayBuffer((t=e.payload)===null||t===void 0?void 0:t.payload)?this._encodeBinaryUserBroadcastPush(e):this._encodeJsonUserBroadcastPush(e)}_encodeBinaryUserBroadcastPush(e){var t,s;const n=(s=(t=e.payload)===null||t===void 0?void 0:t.payload)!==null&&s!==void 0?s:new ArrayBuffer(0);return this._encodeUserBroadcastPush(e,this.BINARY_ENCODING,n)}_encodeJsonUserBroadcastPush(e){var t,s;const n=(s=(t=e.payload)===null||t===void 0?void 0:t.payload)!==null&&s!==void 0?s:{},i=new TextEncoder().encode(JSON.stringify(n)).buffer;return this._encodeUserBroadcastPush(e,this.JSON_ENCODING,i)}_encodeUserBroadcastPush(e,t,s){var n,a;const i=e.topic,o=(n=e.ref)!==null&&n!==void 0?n:"",l=(a=e.join_ref)!==null&&a!==void 0?a:"",c=e.payload.event,u=this.allowedMetadataKeys?this._pick(e.payload,this.allowedMetadataKeys):{},f=Object.keys(u).length===0?"":JSON.stringify(u);if(l.length>255)throw new Error(`joinRef length ${l.length} exceeds maximum of 255`);if(o.length>255)throw new Error(`ref length ${o.length} exceeds maximum of 255`);if(i.length>255)throw new Error(`topic length ${i.length} exceeds maximum of 255`);if(c.length>255)throw new Error(`userEvent length ${c.length} exceeds maximum of 255`);if(f.length>255)throw new Error(`metadata length ${f.length} exceeds maximum of 255`);const d=this.USER_BROADCAST_PUSH_META_LENGTH+l.length+o.length+i.length+c.length+f.length,h=new ArrayBuffer(this.HEADER_LENGTH+d);let p=new DataView(h),g=0;p.setUint8(g++,this.KINDS.userBroadcastPush),p.setUint8(g++,l.length),p.setUint8(g++,o.length),p.setUint8(g++,i.length),p.setUint8(g++,c.length),p.setUint8(g++,f.length),p.setUint8(g++,t),Array.from(l,m=>p.setUint8(g++,m.charCodeAt(0))),Array.from(o,m=>p.setUint8(g++,m.charCodeAt(0))),Array.from(i,m=>p.setUint8(g++,m.charCodeAt(0))),Array.from(c,m=>p.setUint8(g++,m.charCodeAt(0))),Array.from(f,m=>p.setUint8(g++,m.charCodeAt(0)));var v=new Uint8Array(h.byteLength+s.byteLength);return v.set(new Uint8Array(h),0),v.set(new Uint8Array(s),h.byteLength),v.buffer}decode(e,t){if(this._isArrayBuffer(e)){let s=this._binaryDecode(e);return t(s)}if(typeof e=="string"){const s=JSON.parse(e),[n,a,i,o,l]=s;return t({join_ref:n,ref:a,topic:i,event:o,payload:l})}return t({})}_binaryDecode(e){const t=new DataView(e),s=t.getUint8(0),n=new TextDecoder;switch(s){case this.KINDS.userBroadcast:return this._decodeUserBroadcast(e,t,n)}}_decodeUserBroadcast(e,t,s){const n=t.getUint8(1),a=t.getUint8(2),i=t.getUint8(3),o=t.getUint8(4);let l=this.HEADER_LENGTH+4;const c=s.decode(e.slice(l,l+n));l=l+n;const u=s.decode(e.slice(l,l+a));l=l+a;const f=s.decode(e.slice(l,l+i));l=l+i;const d=e.slice(l,e.byteLength),h=o===this.JSON_ENCODING?JSON.parse(s.decode(d)):d,p={type:this.BROADCAST_EVENT,event:u,payload:h};return i>0&&(p.meta=JSON.parse(f)),{join_ref:null,ref:null,topic:c,event:this.BROADCAST_EVENT,payload:p}}_isArrayBuffer(e){var t;return e instanceof ArrayBuffer||((t=e==null?void 0:e.constructor)===null||t===void 0?void 0:t.name)==="ArrayBuffer"}_pick(e,t){return!e||typeof e!="object"?{}:Object.fromEntries(Object.entries(e).filter(([s])=>t.includes(s)))}}class as{constructor(e,t){this.callback=e,this.timerCalc=t,this.timer=void 0,this.tries=0,this.callback=e,this.timerCalc=t}reset(){this.tries=0,clearTimeout(this.timer),this.timer=void 0}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries=this.tries+1,this.callback()},this.timerCalc(this.tries+1))}}var R;(function(r){r.abstime="abstime",r.bool="bool",r.date="date",r.daterange="daterange",r.float4="float4",r.float8="float8",r.int2="int2",r.int4="int4",r.int4range="int4range",r.int8="int8",r.int8range="int8range",r.json="json",r.jsonb="jsonb",r.money="money",r.numeric="numeric",r.oid="oid",r.reltime="reltime",r.text="text",r.time="time",r.timestamp="timestamp",r.timestamptz="timestamptz",r.timetz="timetz",r.tsrange="tsrange",r.tstzrange="tstzrange"})(R||(R={}));const Zt=(r,e,t={})=>{var s;const n=(s=t.skipTypes)!==null&&s!==void 0?s:[];return e?Object.keys(e).reduce((a,i)=>(a[i]=jn(i,r,e,n),a),{}):{}},jn=(r,e,t,s)=>{const n=e.find(o=>o.name===r),a=n==null?void 0:n.type,i=t[r];return a&&!s.includes(a)?is(a,i):Et(i)},is=(r,e)=>{if(r.charAt(0)==="_"){const t=r.slice(1,r.length);return An(e,t)}switch(r){case R.bool:return Tn(e);case R.float4:case R.float8:case R.int2:case R.int4:case R.int8:case R.numeric:case R.oid:return On(e);case R.json:case R.jsonb:return Cn(e);case R.timestamp:return Rn(e);case R.abstime:case R.date:case R.daterange:case R.int4range:case R.int8range:case R.money:case R.reltime:case R.text:case R.time:case R.timestamptz:case R.timetz:case R.tsrange:case R.tstzrange:return Et(e);default:return Et(e)}},Et=r=>r,Tn=r=>{switch(r){case"t":return!0;case"f":return!1;default:return r}},On=r=>{if(typeof r=="string"){const e=parseFloat(r);if(!Number.isNaN(e))return e}return r},Cn=r=>{if(typeof r=="string")try{return JSON.parse(r)}catch(e){return console.log(`JSON parse error: ${e}`),r}return r},An=(r,e)=>{if(typeof r!="string")return r;const t=r.length-1,s=r[t];if(r[0]==="{"&&s==="}"){let a;const i=r.slice(1,t);try{a=JSON.parse("["+i+"]")}catch{a=i?i.split(","):[]}return a.map(o=>is(e,o))}return r},Rn=r=>typeof r=="string"?r.replace(" ","T"):r,os=r=>{const e=new URL(r);return e.protocol=e.protocol.replace(/^ws/i,"http"),e.pathname=e.pathname.replace(/\/+$/,"").replace(/\/socket\/websocket$/i,"").replace(/\/socket$/i,"").replace(/\/websocket$/i,""),e.pathname===""||e.pathname==="/"?e.pathname="/api/broadcast":e.pathname=e.pathname+"/api/broadcast",e.href};class ht{constructor(e,t,s={},n=xt){this.channel=e,this.event=t,this.payload=s,this.timeout=n,this.sent=!1,this.timeoutTimer=void 0,this.ref="",this.receivedResp=null,this.recHooks=[],this.refEvent=null}resend(e){this.timeout=e,this._cancelRefEvent(),this.ref="",this.refEvent=null,this.receivedResp=null,this.sent=!1,this.send()}send(){this._hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload,ref:this.ref,join_ref:this.channel._joinRef()}))}updatePayload(e){this.payload=Object.assign(Object.assign({},this.payload),e)}receive(e,t){var s;return this._hasReceived(e)&&t((s=this.receivedResp)===null||s===void 0?void 0:s.response),this.recHooks.push({status:e,callback:t}),this}startTimeout(){if(this.timeoutTimer)return;this.ref=this.channel.socket._makeRef(),this.refEvent=this.channel._replyEventName(this.ref);const e=t=>{this._cancelRefEvent(),this._cancelTimeout(),this.receivedResp=t,this._matchReceive(t)};this.channel._on(this.refEvent,{},e),this.timeoutTimer=setTimeout(()=>{this.trigger("timeout",{})},this.timeout)}trigger(e,t){this.refEvent&&this.channel._trigger(this.refEvent,{status:e,response:t})}destroy(){this._cancelRefEvent(),this._cancelTimeout()}_cancelRefEvent(){this.refEvent&&this.channel._off(this.refEvent,{})}_cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=void 0}_matchReceive({status:e,response:t}){this.recHooks.filter(s=>s.status===e).forEach(s=>s.callback(t))}_hasReceived(e){return this.receivedResp&&this.receivedResp.status===e}}var St;(function(r){r.SYNC="sync",r.JOIN="join",r.LEAVE="leave"})(St||(St={}));let ls=class Fe{constructor(e,t){this.channel=e,this.state={},this.pendingDiffs=[],this.joinRef=null,this.enabled=!1,this.caller={onJoin:()=>{},onLeave:()=>{},onSync:()=>{}};const s=(t==null?void 0:t.events)||{state:"presence_state",diff:"presence_diff"};this.channel._on(s.state,{},n=>{const{onJoin:a,onLeave:i,onSync:o}=this.caller;this.joinRef=this.channel._joinRef(),this.state=Fe.syncState(this.state,n,a,i),this.pendingDiffs.forEach(l=>{this.state=Fe.syncDiff(this.state,l,a,i)}),this.pendingDiffs=[],o()}),this.channel._on(s.diff,{},n=>{const{onJoin:a,onLeave:i,onSync:o}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(n):(this.state=Fe.syncDiff(this.state,n,a,i),o())}),this.onJoin((n,a,i)=>{this.channel._trigger("presence",{event:"join",key:n,currentPresences:a,newPresences:i})}),this.onLeave((n,a,i)=>{this.channel._trigger("presence",{event:"leave",key:n,currentPresences:a,leftPresences:i})}),this.onSync(()=>{this.channel._trigger("presence",{event:"sync"})})}static syncState(e,t,s,n){const a=this.cloneDeep(e),i=this.transformState(t),o={},l={};return this.map(a,(c,u)=>{i[c]||(l[c]=u)}),this.map(i,(c,u)=>{const f=a[c];if(f){const d=u.map(v=>v.presence_ref),h=f.map(v=>v.presence_ref),p=u.filter(v=>h.indexOf(v.presence_ref)<0),g=f.filter(v=>d.indexOf(v.presence_ref)<0);p.length>0&&(o[c]=p),g.length>0&&(l[c]=g)}else o[c]=u}),this.syncDiff(a,{joins:o,leaves:l},s,n)}static syncDiff(e,t,s,n){const{joins:a,leaves:i}={joins:this.transformState(t.joins),leaves:this.transformState(t.leaves)};return s||(s=()=>{}),n||(n=()=>{}),this.map(a,(o,l)=>{var c;const u=(c=e[o])!==null&&c!==void 0?c:[];if(e[o]=this.cloneDeep(l),u.length>0){const f=e[o].map(h=>h.presence_ref),d=u.filter(h=>f.indexOf(h.presence_ref)<0);e[o].unshift(...d)}s(o,u,l)}),this.map(i,(o,l)=>{let c=e[o];if(!c)return;const u=l.map(f=>f.presence_ref);c=c.filter(f=>u.indexOf(f.presence_ref)<0),e[o]=c,n(o,c,l),c.length===0&&delete e[o]}),e}static map(e,t){return Object.getOwnPropertyNames(e).map(s=>t(s,e[s]))}static transformState(e){return e=this.cloneDeep(e),Object.getOwnPropertyNames(e).reduce((t,s)=>{const n=e[s];return"metas"in n?t[s]=n.metas.map(a=>(a.presence_ref=a.phx_ref,delete a.phx_ref,delete a.phx_ref_prev,a)):t[s]=n,t},{})}static cloneDeep(e){return JSON.parse(JSON.stringify(e))}onJoin(e){this.caller.onJoin=e}onLeave(e){this.caller.onLeave=e}onSync(e){this.caller.onSync=e}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel._joinRef()}};var jt;(function(r){r.ALL="*",r.INSERT="INSERT",r.UPDATE="UPDATE",r.DELETE="DELETE"})(jt||(jt={}));var xe;(function(r){r.BROADCAST="broadcast",r.PRESENCE="presence",r.POSTGRES_CHANGES="postgres_changes",r.SYSTEM="system"})(xe||(xe={}));var ee;(function(r){r.SUBSCRIBED="SUBSCRIBED",r.TIMED_OUT="TIMED_OUT",r.CLOSED="CLOSED",r.CHANNEL_ERROR="CHANNEL_ERROR"})(ee||(ee={}));const Pn=I;let cs=class ds{constructor(e,t={config:{}},s){var n,a;if(this.topic=e,this.params=t,this.socket=s,this.bindings={},this.state=I.closed,this.joinedOnce=!1,this.pushBuffer=[],this.subTopic=e.replace(/^realtime:/i,""),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},t.config),this.timeout=this.socket.timeout,this.joinPush=new ht(this,X.join,this.params,this.timeout),this.rejoinTimer=new as(()=>this._rejoinUntilConnected(),this.socket.reconnectAfterMs),this.joinPush.receive("ok",()=>{this.state=I.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(i=>i.send()),this.pushBuffer=[]}),this._onClose(()=>{this.rejoinTimer.reset(),this.socket.log("channel",`close ${this.topic} ${this._joinRef()}`),this.state=I.closed,this.socket._remove(this)}),this._onError(i=>{this._isLeaving()||this._isClosed()||(this.socket.log("channel",`error ${this.topic}`,i),this.state=I.errored,this.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("timeout",()=>{this._isJoining()&&(this.socket.log("channel",`timeout ${this.topic}`,this.joinPush.timeout),this.state=I.errored,this.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("error",i=>{this._isLeaving()||this._isClosed()||(this.socket.log("channel",`error ${this.topic}`,i),this.state=I.errored,this.rejoinTimer.scheduleTimeout())}),this._on(X.reply,{},(i,o)=>{this._trigger(this._replyEventName(o),i)}),this.presence=new ls(this),this.broadcastEndpointURL=os(this.socket.endPoint),this.private=this.params.config.private||!1,!this.private&&(!((a=(n=this.params.config)===null||n===void 0?void 0:n.broadcast)===null||a===void 0)&&a.replay))throw`tried to use replay on public channel '${this.topic}'. It must be a private channel.`}subscribe(e,t=this.timeout){var s,n,a;if(this.socket.isConnected()||this.socket.connect(),this.state==I.closed){const{config:{broadcast:i,presence:o,private:l}}=this.params,c=(n=(s=this.bindings.postgres_changes)===null||s===void 0?void 0:s.map(h=>h.filter))!==null&&n!==void 0?n:[],u=!!this.bindings[xe.PRESENCE]&&this.bindings[xe.PRESENCE].length>0||((a=this.params.config.presence)===null||a===void 0?void 0:a.enabled)===!0,f={},d={broadcast:i,presence:Object.assign(Object.assign({},o),{enabled:u}),postgres_changes:c,private:l};this.socket.accessTokenValue&&(f.access_token=this.socket.accessTokenValue),this._onError(h=>e==null?void 0:e(ee.CHANNEL_ERROR,h)),this._onClose(()=>e==null?void 0:e(ee.CLOSED)),this.updateJoinPayload(Object.assign({config:d},f)),this.joinedOnce=!0,this._rejoin(t),this.joinPush.receive("ok",async({postgres_changes:h})=>{var p;if(this.socket.setAuth(),h===void 0){e==null||e(ee.SUBSCRIBED);return}else{const g=this.bindings.postgres_changes,v=(p=g==null?void 0:g.length)!==null&&p!==void 0?p:0,m=[];for(let b=0;b<v;b++){const y=g[b],{filter:{event:x,schema:_,table:w,filter:k}}=y,S=h&&h[b];if(S&&S.event===x&&S.schema===_&&S.table===w&&S.filter===k)m.push(Object.assign(Object.assign({},y),{id:S.id}));else{this.unsubscribe(),this.state=I.errored,e==null||e(ee.CHANNEL_ERROR,new Error("mismatch between server and client bindings for postgres changes"));return}}this.bindings.postgres_changes=m,e&&e(ee.SUBSCRIBED);return}}).receive("error",h=>{this.state=I.errored,e==null||e(ee.CHANNEL_ERROR,new Error(JSON.stringify(Object.values(h).join(", ")||"error")))}).receive("timeout",()=>{e==null||e(ee.TIMED_OUT)})}return this}presenceState(){return this.presence.state}async track(e,t={}){return await this.send({type:"presence",event:"track",payload:e},t.timeout||this.timeout)}async untrack(e={}){return await this.send({type:"presence",event:"untrack"},e)}on(e,t,s){return this.state===I.joined&&e===xe.PRESENCE&&(this.socket.log("channel",`resubscribe to ${this.topic} due to change in presence callbacks on joined channel`),this.unsubscribe().then(()=>this.subscribe())),this._on(e,t,s)}async httpSend(e,t,s={}){var n;const a=this.socket.accessTokenValue?`Bearer ${this.socket.accessTokenValue}`:"";if(t==null)return Promise.reject("Payload is required for httpSend()");const i={method:"POST",headers:{Authorization:a,apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"},body:JSON.stringify({messages:[{topic:this.subTopic,event:e,payload:t,private:this.private}]})},o=await this._fetchWithTimeout(this.broadcastEndpointURL,i,(n=s.timeout)!==null&&n!==void 0?n:this.timeout);if(o.status===202)return{success:!0};let l=o.statusText;try{const c=await o.json();l=c.error||c.message||l}catch{}return Promise.reject(new Error(l))}async send(e,t={}){var s,n;if(!this._canPush()&&e.type==="broadcast"){console.warn("Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");const{event:a,payload:i}=e,l={method:"POST",headers:{Authorization:this.socket.accessTokenValue?`Bearer ${this.socket.accessTokenValue}`:"",apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"},body:JSON.stringify({messages:[{topic:this.subTopic,event:a,payload:i,private:this.private}]})};try{const c=await this._fetchWithTimeout(this.broadcastEndpointURL,l,(s=t.timeout)!==null&&s!==void 0?s:this.timeout);return await((n=c.body)===null||n===void 0?void 0:n.cancel()),c.ok?"ok":"error"}catch(c){return c.name==="AbortError"?"timed out":"error"}}else return new Promise(a=>{var i,o,l;const c=this._push(e.type,e,t.timeout||this.timeout);e.type==="broadcast"&&!(!((l=(o=(i=this.params)===null||i===void 0?void 0:i.config)===null||o===void 0?void 0:o.broadcast)===null||l===void 0)&&l.ack)&&a("ok"),c.receive("ok",()=>a("ok")),c.receive("error",()=>a("error")),c.receive("timeout",()=>a("timed out"))})}updateJoinPayload(e){this.joinPush.updatePayload(e)}unsubscribe(e=this.timeout){this.state=I.leaving;const t=()=>{this.socket.log("channel",`leave ${this.topic}`),this._trigger(X.close,"leave",this._joinRef())};this.joinPush.destroy();let s=null;return new Promise(n=>{s=new ht(this,X.leave,{},e),s.receive("ok",()=>{t(),n("ok")}).receive("timeout",()=>{t(),n("timed out")}).receive("error",()=>{n("error")}),s.send(),this._canPush()||s.trigger("ok",{})}).finally(()=>{s==null||s.destroy()})}teardown(){this.pushBuffer.forEach(e=>e.destroy()),this.pushBuffer=[],this.rejoinTimer.reset(),this.joinPush.destroy(),this.state=I.closed,this.bindings={}}async _fetchWithTimeout(e,t,s){const n=new AbortController,a=setTimeout(()=>n.abort(),s),i=await this.socket.fetch(e,Object.assign(Object.assign({},t),{signal:n.signal}));return clearTimeout(a),i}_push(e,t,s=this.timeout){if(!this.joinedOnce)throw`tried to push '${e}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;let n=new ht(this,e,t,s);return this._canPush()?n.send():this._addToPushBuffer(n),n}_addToPushBuffer(e){if(e.startTimeout(),this.pushBuffer.push(e),this.pushBuffer.length>En){const t=this.pushBuffer.shift();t&&(t.destroy(),this.socket.log("channel",`discarded push due to buffer overflow: ${t.event}`,t.payload))}}_onMessage(e,t,s){return t}_isMember(e){return this.topic===e}_joinRef(){return this.joinPush.ref}_trigger(e,t,s){var n,a;const i=e.toLocaleLowerCase(),{close:o,error:l,leave:c,join:u}=X;if(s&&[o,l,c,u].indexOf(i)>=0&&s!==this._joinRef())return;let d=this._onMessage(i,t,s);if(t&&!d)throw"channel onMessage callbacks must return the payload, modified or unmodified";["insert","update","delete"].includes(i)?(n=this.bindings.postgres_changes)===null||n===void 0||n.filter(h=>{var p,g,v;return((p=h.filter)===null||p===void 0?void 0:p.event)==="*"||((v=(g=h.filter)===null||g===void 0?void 0:g.event)===null||v===void 0?void 0:v.toLocaleLowerCase())===i}).map(h=>h.callback(d,s)):(a=this.bindings[i])===null||a===void 0||a.filter(h=>{var p,g,v,m,b,y;if(["broadcast","presence","postgres_changes"].includes(i))if("id"in h){const x=h.id,_=(p=h.filter)===null||p===void 0?void 0:p.event;return x&&((g=t.ids)===null||g===void 0?void 0:g.includes(x))&&(_==="*"||(_==null?void 0:_.toLocaleLowerCase())===((v=t.data)===null||v===void 0?void 0:v.type.toLocaleLowerCase()))}else{const x=(b=(m=h==null?void 0:h.filter)===null||m===void 0?void 0:m.event)===null||b===void 0?void 0:b.toLocaleLowerCase();return x==="*"||x===((y=t==null?void 0:t.event)===null||y===void 0?void 0:y.toLocaleLowerCase())}else return h.type.toLocaleLowerCase()===i}).map(h=>{if(typeof d=="object"&&"ids"in d){const p=d.data,{schema:g,table:v,commit_timestamp:m,type:b,errors:y}=p;d=Object.assign(Object.assign({},{schema:g,table:v,commit_timestamp:m,eventType:b,new:{},old:{},errors:y}),this._getPayloadRecords(p))}h.callback(d,s)})}_isClosed(){return this.state===I.closed}_isJoined(){return this.state===I.joined}_isJoining(){return this.state===I.joining}_isLeaving(){return this.state===I.leaving}_replyEventName(e){return`chan_reply_${e}`}_on(e,t,s){const n=e.toLocaleLowerCase(),a={type:n,filter:t,callback:s};return this.bindings[n]?this.bindings[n].push(a):this.bindings[n]=[a],this}_off(e,t){const s=e.toLocaleLowerCase();return this.bindings[s]&&(this.bindings[s]=this.bindings[s].filter(n=>{var a;return!(((a=n.type)===null||a===void 0?void 0:a.toLocaleLowerCase())===s&&ds.isEqual(n.filter,t))})),this}static isEqual(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const s in e)if(e[s]!==t[s])return!1;return!0}_rejoinUntilConnected(){this.rejoinTimer.scheduleTimeout(),this.socket.isConnected()&&this._rejoin()}_onClose(e){this._on(X.close,{},e)}_onError(e){this._on(X.error,{},t=>e(t))}_canPush(){return this.socket.isConnected()&&this._isJoined()}_rejoin(e=this.timeout){this._isLeaving()||(this.socket._leaveOpenTopic(this.topic),this.state=I.joining,this.joinPush.resend(e))}_getPayloadRecords(e){const t={new:{},old:{}};return(e.type==="INSERT"||e.type==="UPDATE")&&(t.new=Zt(e.columns,e.record)),(e.type==="UPDATE"||e.type==="DELETE")&&(t.old=Zt(e.columns,e.old_record)),t}};const pt=()=>{},De={HEARTBEAT_INTERVAL:25e3,RECONNECT_DELAY:10,HEARTBEAT_TIMEOUT_FALLBACK:100},$n=[1e3,2e3,5e3,1e4],In=1e4,Ln=`
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;let zn=class{constructor(e,t){var s;if(this.accessTokenValue=null,this.apiKey=null,this.channels=new Array,this.endPoint="",this.httpEndpoint="",this.headers={},this.params={},this.timeout=xt,this.transport=null,this.heartbeatIntervalMs=De.HEARTBEAT_INTERVAL,this.heartbeatTimer=void 0,this.pendingHeartbeatRef=null,this.heartbeatCallback=pt,this.ref=0,this.reconnectTimer=null,this.vsn=Xt,this.logger=pt,this.conn=null,this.sendBuffer=[],this.serializer=new Sn,this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.accessToken=null,this._connectionState="disconnected",this._wasManualDisconnect=!1,this._authPromise=null,this._resolveFetch=n=>n?(...a)=>n(...a):(...a)=>fetch(...a),!(!((s=t==null?void 0:t.params)===null||s===void 0)&&s.apikey))throw new Error("API key is required to connect to Realtime");this.apiKey=t.params.apikey,this.endPoint=`${e}/${kt.websocket}`,this.httpEndpoint=os(e),this._initializeOptions(t),this._setupReconnectionTimer(),this.fetch=this._resolveFetch(t==null?void 0:t.fetch)}connect(){if(!(this.isConnecting()||this.isDisconnecting()||this.conn!==null&&this.isConnected())){if(this._setConnectionState("connecting"),this.accessToken&&!this._authPromise&&this._setAuthSafely("connect"),this.transport)this.conn=new this.transport(this.endpointURL());else try{this.conn=ss.createWebSocket(this.endpointURL())}catch(e){this._setConnectionState("disconnected");const t=e.message;throw t.includes("Node.js")?new Error(`${t}

To use Realtime in Node.js, you need to provide a WebSocket implementation:

Option 1: Use Node.js 22+ which has native WebSocket support
Option 2: Install and provide the "ws" package:

  npm install ws

  import ws from "ws"
  const client = new RealtimeClient(url, {
    ...options,
    transport: ws
  })`):new Error(`WebSocket not available: ${t}`)}this._setupConnectionHandlers()}}endpointURL(){return this._appendParams(this.endPoint,Object.assign({},this.params,{vsn:this.vsn}))}disconnect(e,t){if(!this.isDisconnecting())if(this._setConnectionState("disconnecting",!0),this.conn){const s=setTimeout(()=>{this._setConnectionState("disconnected")},100);this.conn.onclose=()=>{clearTimeout(s),this._setConnectionState("disconnected")},typeof this.conn.close=="function"&&(e?this.conn.close(e,t??""):this.conn.close()),this._teardownConnection()}else this._setConnectionState("disconnected")}getChannels(){return this.channels}async removeChannel(e){const t=await e.unsubscribe();return this.channels.length===0&&this.disconnect(),t}async removeAllChannels(){const e=await Promise.all(this.channels.map(t=>t.unsubscribe()));return this.channels=[],this.disconnect(),e}log(e,t,s){this.logger(e,t,s)}connectionState(){switch(this.conn&&this.conn.readyState){case he.connecting:return pe.Connecting;case he.open:return pe.Open;case he.closing:return pe.Closing;default:return pe.Closed}}isConnected(){return this.connectionState()===pe.Open}isConnecting(){return this._connectionState==="connecting"}isDisconnecting(){return this._connectionState==="disconnecting"}channel(e,t={config:{}}){const s=`realtime:${e}`,n=this.getChannels().find(a=>a.topic===s);if(n)return n;{const a=new cs(`realtime:${e}`,t,this);return this.channels.push(a),a}}push(e){const{topic:t,event:s,payload:n,ref:a}=e,i=()=>{this.encode(e,o=>{var l;(l=this.conn)===null||l===void 0||l.send(o)})};this.log("push",`${t} ${s} (${a})`,n),this.isConnected()?i():this.sendBuffer.push(i)}async setAuth(e=null){this._authPromise=this._performAuth(e);try{await this._authPromise}finally{this._authPromise=null}}async sendHeartbeat(){var e;if(!this.isConnected()){try{this.heartbeatCallback("disconnected")}catch(t){this.log("error","error in heartbeat callback",t)}return}if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this.log("transport","heartbeat timeout. Attempting to re-establish connection");try{this.heartbeatCallback("timeout")}catch(t){this.log("error","error in heartbeat callback",t)}this._wasManualDisconnect=!1,(e=this.conn)===null||e===void 0||e.close(kn,"heartbeat timeout"),setTimeout(()=>{var t;this.isConnected()||(t=this.reconnectTimer)===null||t===void 0||t.scheduleTimeout()},De.HEARTBEAT_TIMEOUT_FALLBACK);return}this.pendingHeartbeatRef=this._makeRef(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef});try{this.heartbeatCallback("sent")}catch(t){this.log("error","error in heartbeat callback",t)}this._setAuthSafely("heartbeat")}onHeartbeat(e){this.heartbeatCallback=e}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(e=>e()),this.sendBuffer=[])}_makeRef(){let e=this.ref+1;return e===this.ref?this.ref=0:this.ref=e,this.ref.toString()}_leaveOpenTopic(e){let t=this.channels.find(s=>s.topic===e&&(s._isJoined()||s._isJoining()));t&&(this.log("transport",`leaving duplicate topic "${e}"`),t.unsubscribe())}_remove(e){this.channels=this.channels.filter(t=>t.topic!==e.topic)}_onConnMessage(e){this.decode(e.data,t=>{if(t.topic==="phoenix"&&t.event==="phx_reply")try{this.heartbeatCallback(t.payload.status==="ok"?"ok":"error")}catch(c){this.log("error","error in heartbeat callback",c)}t.ref&&t.ref===this.pendingHeartbeatRef&&(this.pendingHeartbeatRef=null);const{topic:s,event:n,payload:a,ref:i}=t,o=i?`(${i})`:"",l=a.status||"";this.log("receive",`${l} ${s} ${n} ${o}`.trim(),a),this.channels.filter(c=>c._isMember(s)).forEach(c=>c._trigger(n,a,i)),this._triggerStateCallbacks("message",t)})}_clearTimer(e){var t;e==="heartbeat"&&this.heartbeatTimer?(clearInterval(this.heartbeatTimer),this.heartbeatTimer=void 0):e==="reconnect"&&((t=this.reconnectTimer)===null||t===void 0||t.reset())}_clearAllTimers(){this._clearTimer("heartbeat"),this._clearTimer("reconnect")}_setupConnectionHandlers(){this.conn&&("binaryType"in this.conn&&(this.conn.binaryType="arraybuffer"),this.conn.onopen=()=>this._onConnOpen(),this.conn.onerror=e=>this._onConnError(e),this.conn.onmessage=e=>this._onConnMessage(e),this.conn.onclose=e=>this._onConnClose(e))}_teardownConnection(){if(this.conn){if(this.conn.readyState===he.open||this.conn.readyState===he.connecting)try{this.conn.close()}catch(e){this.log("error","Error closing connection",e)}this.conn.onopen=null,this.conn.onerror=null,this.conn.onmessage=null,this.conn.onclose=null,this.conn=null}this._clearAllTimers(),this.channels.forEach(e=>e.teardown())}_onConnOpen(){this._setConnectionState("connected"),this.log("transport",`connected to ${this.endpointURL()}`),(this._authPromise||(this.accessToken&&!this.accessTokenValue?this.setAuth():Promise.resolve())).then(()=>{this.flushSendBuffer()}).catch(t=>{this.log("error","error waiting for auth on connect",t),this.flushSendBuffer()}),this._clearTimer("reconnect"),this.worker?this.workerRef||this._startWorkerHeartbeat():this._startHeartbeat(),this._triggerStateCallbacks("open")}_startHeartbeat(){this.heartbeatTimer&&clearInterval(this.heartbeatTimer),this.heartbeatTimer=setInterval(()=>this.sendHeartbeat(),this.heartbeatIntervalMs)}_startWorkerHeartbeat(){this.workerUrl?this.log("worker",`starting worker for from ${this.workerUrl}`):this.log("worker","starting default worker");const e=this._workerObjectUrl(this.workerUrl);this.workerRef=new Worker(e),this.workerRef.onerror=t=>{this.log("worker","worker error",t.message),this.workerRef.terminate()},this.workerRef.onmessage=t=>{t.data.event==="keepAlive"&&this.sendHeartbeat()},this.workerRef.postMessage({event:"start",interval:this.heartbeatIntervalMs})}_onConnClose(e){var t;this._setConnectionState("disconnected"),this.log("transport","close",e),this._triggerChanError(),this._clearTimer("heartbeat"),this._wasManualDisconnect||(t=this.reconnectTimer)===null||t===void 0||t.scheduleTimeout(),this._triggerStateCallbacks("close",e)}_onConnError(e){this._setConnectionState("disconnected"),this.log("transport",`${e}`),this._triggerChanError(),this._triggerStateCallbacks("error",e)}_triggerChanError(){this.channels.forEach(e=>e._trigger(X.error))}_appendParams(e,t){if(Object.keys(t).length===0)return e;const s=e.match(/\?/)?"&":"?",n=new URLSearchParams(t);return`${e}${s}${n}`}_workerObjectUrl(e){let t;if(e)t=e;else{const s=new Blob([Ln],{type:"application/javascript"});t=URL.createObjectURL(s)}return t}_setConnectionState(e,t=!1){this._connectionState=e,e==="connecting"?this._wasManualDisconnect=!1:e==="disconnecting"&&(this._wasManualDisconnect=t)}async _performAuth(e=null){let t;e?t=e:this.accessToken?t=await this.accessToken():t=this.accessTokenValue,this.accessTokenValue!=t&&(this.accessTokenValue=t,this.channels.forEach(s=>{const n={access_token:t,version:_n};t&&s.updateJoinPayload(n),s.joinedOnce&&s._isJoined()&&s._push(X.access_token,{access_token:t})}))}async _waitForAuthIfNeeded(){this._authPromise&&await this._authPromise}_setAuthSafely(e="general"){this.setAuth().catch(t=>{this.log("error",`error setting auth in ${e}`,t)})}_triggerStateCallbacks(e,t){try{this.stateChangeCallbacks[e].forEach(s=>{try{s(t)}catch(n){this.log("error",`error in ${e} callback`,n)}})}catch(s){this.log("error",`error triggering ${e} callbacks`,s)}}_setupReconnectionTimer(){this.reconnectTimer=new as(async()=>{setTimeout(async()=>{await this._waitForAuthIfNeeded(),this.isConnected()||this.connect()},De.RECONNECT_DELAY)},this.reconnectAfterMs)}_initializeOptions(e){var t,s,n,a,i,o,l,c,u,f,d,h;switch(this.transport=(t=e==null?void 0:e.transport)!==null&&t!==void 0?t:null,this.timeout=(s=e==null?void 0:e.timeout)!==null&&s!==void 0?s:xt,this.heartbeatIntervalMs=(n=e==null?void 0:e.heartbeatIntervalMs)!==null&&n!==void 0?n:De.HEARTBEAT_INTERVAL,this.worker=(a=e==null?void 0:e.worker)!==null&&a!==void 0?a:!1,this.accessToken=(i=e==null?void 0:e.accessToken)!==null&&i!==void 0?i:null,this.heartbeatCallback=(o=e==null?void 0:e.heartbeatCallback)!==null&&o!==void 0?o:pt,this.vsn=(l=e==null?void 0:e.vsn)!==null&&l!==void 0?l:Xt,e!=null&&e.params&&(this.params=e.params),e!=null&&e.logger&&(this.logger=e.logger),(e!=null&&e.logLevel||e!=null&&e.log_level)&&(this.logLevel=e.logLevel||e.log_level,this.params=Object.assign(Object.assign({},this.params),{log_level:this.logLevel})),this.reconnectAfterMs=(c=e==null?void 0:e.reconnectAfterMs)!==null&&c!==void 0?c:p=>$n[p-1]||In,this.vsn){case ns:this.encode=(u=e==null?void 0:e.encode)!==null&&u!==void 0?u:(p,g)=>g(JSON.stringify(p)),this.decode=(f=e==null?void 0:e.decode)!==null&&f!==void 0?f:(p,g)=>g(JSON.parse(p));break;case xn:this.encode=(d=e==null?void 0:e.encode)!==null&&d!==void 0?d:this.serializer.encode.bind(this.serializer),this.decode=(h=e==null?void 0:e.decode)!==null&&h!==void 0?h:this.serializer.decode.bind(this.serializer);break;default:throw new Error(`Unsupported serializer version: ${this.vsn}`)}if(this.worker){if(typeof window<"u"&&!window.Worker)throw new Error("Web Worker is not supported");this.workerUrl=e==null?void 0:e.workerUrl}}};const Nn=Object.freeze(Object.defineProperty({__proto__:null,REALTIME_CHANNEL_STATES:Pn,get REALTIME_LISTEN_TYPES(){return xe},get REALTIME_POSTGRES_CHANGES_LISTEN_EVENT(){return jt},get REALTIME_PRESENCE_LISTEN_EVENTS(){return St},get REALTIME_SUBSCRIBE_STATES(){return ee},RealtimeChannel:cs,RealtimeClient:zn,RealtimePresence:ls,WebSocketFactory:ss},Symbol.toStringTag,{value:"Module"})),us=$e(Nn);class Ie extends Error{constructor(e){super(e),this.__isStorageError=!0,this.name="StorageError"}}function $(r){return typeof r=="object"&&r!==null&&"__isStorageError"in r}class hs extends Ie{constructor(e,t,s){super(e),this.name="StorageApiError",this.status=t,this.statusCode=s}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}}class Ze extends Ie{constructor(e,t){super(e),this.name="StorageUnknownError",this.originalError=t}}const Mt=r=>r?(...e)=>r(...e):(...e)=>fetch(...e),Mn=()=>Response,Tt=r=>{if(Array.isArray(r))return r.map(t=>Tt(t));if(typeof r=="function"||r!==Object(r))return r;const e={};return Object.entries(r).forEach(([t,s])=>{const n=t.replace(/([-_][a-z])/gi,a=>a.toUpperCase().replace(/[-_]/g,""));e[n]=Tt(s)}),e},Bn=r=>{if(typeof r!="object"||r===null)return!1;const e=Object.getPrototypeOf(r);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in r)&&!(Symbol.iterator in r)},Un=r=>!r||typeof r!="string"||r.length===0||r.length>100||r.trim()!==r||r.includes("/")||r.includes("\\")?!1:/^[\w!.\*'() &$@=;:+,?-]+$/.test(r),ft=r=>{var e;return r.msg||r.message||r.error_description||(typeof r.error=="string"?r.error:(e=r.error)===null||e===void 0?void 0:e.message)||JSON.stringify(r)},qn=(r,e,t)=>E(void 0,void 0,void 0,function*(){const s=yield Mn();r instanceof s&&!(t!=null&&t.noResolveJson)?r.json().then(n=>{const a=r.status||500,i=(n==null?void 0:n.statusCode)||a+"";e(new hs(ft(n),a,i))}).catch(n=>{e(new Ze(ft(n),n))}):e(new Ze(ft(r),r))}),Dn=(r,e,t,s)=>{const n={method:r,headers:(e==null?void 0:e.headers)||{}};return r==="GET"||!s?n:(Bn(s)?(n.headers=Object.assign({"Content-Type":"application/json"},e==null?void 0:e.headers),n.body=JSON.stringify(s)):n.body=s,e!=null&&e.duplex&&(n.duplex=e.duplex),Object.assign(Object.assign({},n),t))};function Le(r,e,t,s,n,a){return E(this,void 0,void 0,function*(){return new Promise((i,o)=>{r(t,Dn(e,s,n,a)).then(l=>{if(!l.ok)throw l;return s!=null&&s.noResolveJson?l:l.json()}).then(l=>i(l)).catch(l=>qn(l,o,s))})})}function Re(r,e,t,s){return E(this,void 0,void 0,function*(){return Le(r,"GET",e,t,s)})}function Q(r,e,t,s,n){return E(this,void 0,void 0,function*(){return Le(r,"POST",e,s,n,t)})}function Ot(r,e,t,s,n){return E(this,void 0,void 0,function*(){return Le(r,"PUT",e,s,n,t)})}function Hn(r,e,t,s){return E(this,void 0,void 0,function*(){return Le(r,"HEAD",e,Object.assign(Object.assign({},t),{noResolveJson:!0}),s)})}function Bt(r,e,t,s,n){return E(this,void 0,void 0,function*(){return Le(r,"DELETE",e,s,n,t)})}class Vn{constructor(e,t){this.downloadFn=e,this.shouldThrowOnError=t}then(e,t){return this.execute().then(e,t)}execute(){return E(this,void 0,void 0,function*(){try{return{data:(yield this.downloadFn()).body,error:null}}catch(e){if(this.shouldThrowOnError)throw e;if($(e))return{data:null,error:e};throw e}})}}var ps;class Fn{constructor(e,t){this.downloadFn=e,this.shouldThrowOnError=t,this[ps]="BlobDownloadBuilder",this.promise=null}asStream(){return new Vn(this.downloadFn,this.shouldThrowOnError)}then(e,t){return this.getPromise().then(e,t)}catch(e){return this.getPromise().catch(e)}finally(e){return this.getPromise().finally(e)}getPromise(){return this.promise||(this.promise=this.execute()),this.promise}execute(){return E(this,void 0,void 0,function*(){try{return{data:yield(yield this.downloadFn()).blob(),error:null}}catch(e){if(this.shouldThrowOnError)throw e;if($(e))return{data:null,error:e};throw e}})}}ps=Symbol.toStringTag;const Kn={limit:100,offset:0,sortBy:{column:"name",order:"asc"}},er={cacheControl:"3600",contentType:"text/plain;charset=UTF-8",upsert:!1};class Gn{constructor(e,t={},s,n){this.shouldThrowOnError=!1,this.url=e,this.headers=t,this.bucketId=s,this.fetch=Mt(n)}throwOnError(){return this.shouldThrowOnError=!0,this}uploadOrUpdate(e,t,s,n){return E(this,void 0,void 0,function*(){try{let a;const i=Object.assign(Object.assign({},er),n);let o=Object.assign(Object.assign({},this.headers),e==="POST"&&{"x-upsert":String(i.upsert)});const l=i.metadata;typeof Blob<"u"&&s instanceof Blob?(a=new FormData,a.append("cacheControl",i.cacheControl),l&&a.append("metadata",this.encodeMetadata(l)),a.append("",s)):typeof FormData<"u"&&s instanceof FormData?(a=s,a.has("cacheControl")||a.append("cacheControl",i.cacheControl),l&&!a.has("metadata")&&a.append("metadata",this.encodeMetadata(l))):(a=s,o["cache-control"]=`max-age=${i.cacheControl}`,o["content-type"]=i.contentType,l&&(o["x-metadata"]=this.toBase64(this.encodeMetadata(l))),(typeof ReadableStream<"u"&&a instanceof ReadableStream||a&&typeof a=="object"&&"pipe"in a&&typeof a.pipe=="function")&&!i.duplex&&(i.duplex="half")),n!=null&&n.headers&&(o=Object.assign(Object.assign({},o),n.headers));const c=this._removeEmptyFolders(t),u=this._getFinalPath(c),f=yield(e=="PUT"?Ot:Q)(this.fetch,`${this.url}/object/${u}`,a,Object.assign({headers:o},i!=null&&i.duplex?{duplex:i.duplex}:{}));return{data:{path:c,id:f.Id,fullPath:f.Key},error:null}}catch(a){if(this.shouldThrowOnError)throw a;if($(a))return{data:null,error:a};throw a}})}upload(e,t,s){return E(this,void 0,void 0,function*(){return this.uploadOrUpdate("POST",e,t,s)})}uploadToSignedUrl(e,t,s,n){return E(this,void 0,void 0,function*(){const a=this._removeEmptyFolders(e),i=this._getFinalPath(a),o=new URL(this.url+`/object/upload/sign/${i}`);o.searchParams.set("token",t);try{let l;const c=Object.assign({upsert:er.upsert},n),u=Object.assign(Object.assign({},this.headers),{"x-upsert":String(c.upsert)});typeof Blob<"u"&&s instanceof Blob?(l=new FormData,l.append("cacheControl",c.cacheControl),l.append("",s)):typeof FormData<"u"&&s instanceof FormData?(l=s,l.append("cacheControl",c.cacheControl)):(l=s,u["cache-control"]=`max-age=${c.cacheControl}`,u["content-type"]=c.contentType);const f=yield Ot(this.fetch,o.toString(),l,{headers:u});return{data:{path:a,fullPath:f.Key},error:null}}catch(l){if(this.shouldThrowOnError)throw l;if($(l))return{data:null,error:l};throw l}})}createSignedUploadUrl(e,t){return E(this,void 0,void 0,function*(){try{let s=this._getFinalPath(e);const n=Object.assign({},this.headers);t!=null&&t.upsert&&(n["x-upsert"]="true");const a=yield Q(this.fetch,`${this.url}/object/upload/sign/${s}`,{},{headers:n}),i=new URL(this.url+a.url),o=i.searchParams.get("token");if(!o)throw new Ie("No token returned by API");return{data:{signedUrl:i.toString(),path:e,token:o},error:null}}catch(s){if(this.shouldThrowOnError)throw s;if($(s))return{data:null,error:s};throw s}})}update(e,t,s){return E(this,void 0,void 0,function*(){return this.uploadOrUpdate("PUT",e,t,s)})}move(e,t,s){return E(this,void 0,void 0,function*(){try{return{data:yield Q(this.fetch,`${this.url}/object/move`,{bucketId:this.bucketId,sourceKey:e,destinationKey:t,destinationBucket:s==null?void 0:s.destinationBucket},{headers:this.headers}),error:null}}catch(n){if(this.shouldThrowOnError)throw n;if($(n))return{data:null,error:n};throw n}})}copy(e,t,s){return E(this,void 0,void 0,function*(){try{return{data:{path:(yield Q(this.fetch,`${this.url}/object/copy`,{bucketId:this.bucketId,sourceKey:e,destinationKey:t,destinationBucket:s==null?void 0:s.destinationBucket},{headers:this.headers})).Key},error:null}}catch(n){if(this.shouldThrowOnError)throw n;if($(n))return{data:null,error:n};throw n}})}createSignedUrl(e,t,s){return E(this,void 0,void 0,function*(){try{let n=this._getFinalPath(e),a=yield Q(this.fetch,`${this.url}/object/sign/${n}`,Object.assign({expiresIn:t},s!=null&&s.transform?{transform:s.transform}:{}),{headers:this.headers});const i=s!=null&&s.download?`&download=${s.download===!0?"":s.download}`:"";return a={signedUrl:encodeURI(`${this.url}${a.signedURL}${i}`)},{data:a,error:null}}catch(n){if(this.shouldThrowOnError)throw n;if($(n))return{data:null,error:n};throw n}})}createSignedUrls(e,t,s){return E(this,void 0,void 0,function*(){try{const n=yield Q(this.fetch,`${this.url}/object/sign/${this.bucketId}`,{expiresIn:t,paths:e},{headers:this.headers}),a=s!=null&&s.download?`&download=${s.download===!0?"":s.download}`:"";return{data:n.map(i=>Object.assign(Object.assign({},i),{signedUrl:i.signedURL?encodeURI(`${this.url}${i.signedURL}${a}`):null})),error:null}}catch(n){if(this.shouldThrowOnError)throw n;if($(n))return{data:null,error:n};throw n}})}download(e,t){const n=typeof(t==null?void 0:t.transform)<"u"?"render/image/authenticated":"object",a=this.transformOptsToQueryString((t==null?void 0:t.transform)||{}),i=a?`?${a}`:"",o=this._getFinalPath(e),l=()=>Re(this.fetch,`${this.url}/${n}/${o}${i}`,{headers:this.headers,noResolveJson:!0});return new Fn(l,this.shouldThrowOnError)}info(e){return E(this,void 0,void 0,function*(){const t=this._getFinalPath(e);try{const s=yield Re(this.fetch,`${this.url}/object/info/${t}`,{headers:this.headers});return{data:Tt(s),error:null}}catch(s){if(this.shouldThrowOnError)throw s;if($(s))return{data:null,error:s};throw s}})}exists(e){return E(this,void 0,void 0,function*(){const t=this._getFinalPath(e);try{return yield Hn(this.fetch,`${this.url}/object/${t}`,{headers:this.headers}),{data:!0,error:null}}catch(s){if(this.shouldThrowOnError)throw s;if($(s)&&s instanceof Ze){const n=s.originalError;if([400,404].includes(n==null?void 0:n.status))return{data:!1,error:s}}throw s}})}getPublicUrl(e,t){const s=this._getFinalPath(e),n=[],a=t!=null&&t.download?`download=${t.download===!0?"":t.download}`:"";a!==""&&n.push(a);const o=typeof(t==null?void 0:t.transform)<"u"?"render/image":"object",l=this.transformOptsToQueryString((t==null?void 0:t.transform)||{});l!==""&&n.push(l);let c=n.join("&");return c!==""&&(c=`?${c}`),{data:{publicUrl:encodeURI(`${this.url}/${o}/public/${s}${c}`)}}}remove(e){return E(this,void 0,void 0,function*(){try{return{data:yield Bt(this.fetch,`${this.url}/object/${this.bucketId}`,{prefixes:e},{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if($(t))return{data:null,error:t};throw t}})}list(e,t,s){return E(this,void 0,void 0,function*(){try{const n=Object.assign(Object.assign(Object.assign({},Kn),t),{prefix:e||""});return{data:yield Q(this.fetch,`${this.url}/object/list/${this.bucketId}`,n,{headers:this.headers},s),error:null}}catch(n){if(this.shouldThrowOnError)throw n;if($(n))return{data:null,error:n};throw n}})}listV2(e,t){return E(this,void 0,void 0,function*(){try{const s=Object.assign({},e);return{data:yield Q(this.fetch,`${this.url}/object/list-v2/${this.bucketId}`,s,{headers:this.headers},t),error:null}}catch(s){if(this.shouldThrowOnError)throw s;if($(s))return{data:null,error:s};throw s}})}encodeMetadata(e){return JSON.stringify(e)}toBase64(e){return typeof Buffer<"u"?Buffer.from(e).toString("base64"):btoa(e)}_getFinalPath(e){return`${this.bucketId}/${e.replace(/^\/+/,"")}`}_removeEmptyFolders(e){return e.replace(/^\/|\/$/g,"").replace(/\/+/g,"/")}transformOptsToQueryString(e){const t=[];return e.width&&t.push(`width=${e.width}`),e.height&&t.push(`height=${e.height}`),e.resize&&t.push(`resize=${e.resize}`),e.format&&t.push(`format=${e.format}`),e.quality&&t.push(`quality=${e.quality}`),t.join("&")}}const fs="2.86.2",gs={"X-Client-Info":`storage-js/${fs}`};class Wn{constructor(e,t={},s,n){this.shouldThrowOnError=!1;const a=new URL(e);n!=null&&n.useNewHostname&&/supabase\.(co|in|red)$/.test(a.hostname)&&!a.hostname.includes("storage.supabase.")&&(a.hostname=a.hostname.replace("supabase.","storage.supabase.")),this.url=a.href.replace(/\/$/,""),this.headers=Object.assign(Object.assign({},gs),t),this.fetch=Mt(s)}throwOnError(){return this.shouldThrowOnError=!0,this}listBuckets(e){return E(this,void 0,void 0,function*(){try{const t=this.listBucketOptionsToQueryString(e);return{data:yield Re(this.fetch,`${this.url}/bucket${t}`,{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if($(t))return{data:null,error:t};throw t}})}getBucket(e){return E(this,void 0,void 0,function*(){try{return{data:yield Re(this.fetch,`${this.url}/bucket/${e}`,{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if($(t))return{data:null,error:t};throw t}})}createBucket(e){return E(this,arguments,void 0,function*(t,s={public:!1}){try{return{data:yield Q(this.fetch,`${this.url}/bucket`,{id:t,name:t,type:s.type,public:s.public,file_size_limit:s.fileSizeLimit,allowed_mime_types:s.allowedMimeTypes},{headers:this.headers}),error:null}}catch(n){if(this.shouldThrowOnError)throw n;if($(n))return{data:null,error:n};throw n}})}updateBucket(e,t){return E(this,void 0,void 0,function*(){try{return{data:yield Ot(this.fetch,`${this.url}/bucket/${e}`,{id:e,name:e,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:this.headers}),error:null}}catch(s){if(this.shouldThrowOnError)throw s;if($(s))return{data:null,error:s};throw s}})}emptyBucket(e){return E(this,void 0,void 0,function*(){try{return{data:yield Q(this.fetch,`${this.url}/bucket/${e}/empty`,{},{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if($(t))return{data:null,error:t};throw t}})}deleteBucket(e){return E(this,void 0,void 0,function*(){try{return{data:yield Bt(this.fetch,`${this.url}/bucket/${e}`,{},{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if($(t))return{data:null,error:t};throw t}})}listBucketOptionsToQueryString(e){const t={};return e&&("limit"in e&&(t.limit=String(e.limit)),"offset"in e&&(t.offset=String(e.offset)),e.search&&(t.search=e.search),e.sortColumn&&(t.sortColumn=e.sortColumn),e.sortOrder&&(t.sortOrder=e.sortOrder)),Object.keys(t).length>0?"?"+new URLSearchParams(t).toString():""}}var Pe=class extends Error{constructor(r,e){var t;super(r),this.name="IcebergError",this.status=e.status,this.icebergType=e.icebergType,this.icebergCode=e.icebergCode,this.details=e.details,this.isCommitStateUnknown=e.icebergType==="CommitStateUnknownException"||[500,502,504].includes(e.status)&&((t=e.icebergType)==null?void 0:t.includes("CommitState"))===!0}isNotFound(){return this.status===404}isConflict(){return this.status===409}isAuthenticationTimeout(){return this.status===419}};function Jn(r,e,t){const s=new URL(e,r);if(t)for(const[n,a]of Object.entries(t))a!==void 0&&s.searchParams.set(n,a);return s.toString()}async function Yn(r){return!r||r.type==="none"?{}:r.type==="bearer"?{Authorization:`Bearer ${r.token}`}:r.type==="header"?{[r.name]:r.value}:r.type==="custom"?await r.getHeaders():{}}function Qn(r){const e=r.fetchImpl??globalThis.fetch;return{async request({method:t,path:s,query:n,body:a,headers:i}){const o=Jn(r.baseUrl,s,n),l=await Yn(r.auth),c=await e(o,{method:t,headers:{...a?{"Content-Type":"application/json"}:{},...l,...i},body:a?JSON.stringify(a):void 0}),u=await c.text(),f=(c.headers.get("content-type")||"").includes("application/json"),d=f&&u?JSON.parse(u):u;if(!c.ok){const h=f?d:void 0,p=h==null?void 0:h.error;throw new Pe((p==null?void 0:p.message)??`Request failed with status ${c.status}`,{status:c.status,icebergType:p==null?void 0:p.type,icebergCode:p==null?void 0:p.code,details:h})}return{status:c.status,headers:c.headers,data:d}}}}function He(r){return r.join("")}var Xn=class{constructor(r,e=""){this.client=r,this.prefix=e}async listNamespaces(r){const e=r?{parent:He(r.namespace)}:void 0;return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces`,query:e})).data.namespaces.map(s=>({namespace:s}))}async createNamespace(r,e){const t={namespace:r.namespace,properties:e==null?void 0:e.properties};return(await this.client.request({method:"POST",path:`${this.prefix}/namespaces`,body:t})).data}async dropNamespace(r){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${He(r.namespace)}`})}async loadNamespaceMetadata(r){return{properties:(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${He(r.namespace)}`})).data.properties}}async namespaceExists(r){try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${He(r.namespace)}`}),!0}catch(e){if(e instanceof Pe&&e.status===404)return!1;throw e}}async createNamespaceIfNotExists(r,e){try{return await this.createNamespace(r,e)}catch(t){if(t instanceof Pe&&t.status===409)return;throw t}}};function ve(r){return r.join("")}var Zn=class{constructor(r,e="",t){this.client=r,this.prefix=e,this.accessDelegation=t}async listTables(r){return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${ve(r.namespace)}/tables`})).data.identifiers}async createTable(r,e){const t={};return this.accessDelegation&&(t["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${ve(r.namespace)}/tables`,body:e,headers:t})).data.metadata}async updateTable(r,e){const t=await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${ve(r.namespace)}/tables/${r.name}`,body:e});return{"metadata-location":t.data["metadata-location"],metadata:t.data.metadata}}async dropTable(r,e){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${ve(r.namespace)}/tables/${r.name}`,query:{purgeRequested:String((e==null?void 0:e.purge)??!1)}})}async loadTable(r){const e={};return this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${ve(r.namespace)}/tables/${r.name}`,headers:e})).data.metadata}async tableExists(r){const e={};this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation);try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${ve(r.namespace)}/tables/${r.name}`,headers:e}),!0}catch(t){if(t instanceof Pe&&t.status===404)return!1;throw t}}async createTableIfNotExists(r,e){try{return await this.createTable(r,e)}catch(t){if(t instanceof Pe&&t.status===409)return await this.loadTable({namespace:r.namespace,name:e.name});throw t}}},ea=class{constructor(r){var s;let e="v1";r.catalogName&&(e+=`/${r.catalogName}`);const t=r.baseUrl.endsWith("/")?r.baseUrl:`${r.baseUrl}/`;this.client=Qn({baseUrl:t,auth:r.auth,fetchImpl:r.fetch}),this.accessDelegation=(s=r.accessDelegation)==null?void 0:s.join(","),this.namespaceOps=new Xn(this.client,e),this.tableOps=new Zn(this.client,e,this.accessDelegation)}async listNamespaces(r){return this.namespaceOps.listNamespaces(r)}async createNamespace(r,e){return this.namespaceOps.createNamespace(r,e)}async dropNamespace(r){await this.namespaceOps.dropNamespace(r)}async loadNamespaceMetadata(r){return this.namespaceOps.loadNamespaceMetadata(r)}async listTables(r){return this.tableOps.listTables(r)}async createTable(r,e){return this.tableOps.createTable(r,e)}async updateTable(r,e){return this.tableOps.updateTable(r,e)}async dropTable(r,e){await this.tableOps.dropTable(r,e)}async loadTable(r){return this.tableOps.loadTable(r)}async namespaceExists(r){return this.namespaceOps.namespaceExists(r)}async tableExists(r){return this.tableOps.tableExists(r)}async createNamespaceIfNotExists(r,e){return this.namespaceOps.createNamespaceIfNotExists(r,e)}async createTableIfNotExists(r,e){return this.tableOps.createTableIfNotExists(r,e)}};class vs{constructor(e,t={},s){this.shouldThrowOnError=!1,this.url=e.replace(/\/$/,""),this.headers=Object.assign(Object.assign({},gs),t),this.fetch=Mt(s)}throwOnError(){return this.shouldThrowOnError=!0,this}createBucket(e){return E(this,void 0,void 0,function*(){try{return{data:yield Q(this.fetch,`${this.url}/bucket`,{name:e},{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if($(t))return{data:null,error:t};throw t}})}listBuckets(e){return E(this,void 0,void 0,function*(){try{const t=new URLSearchParams;(e==null?void 0:e.limit)!==void 0&&t.set("limit",e.limit.toString()),(e==null?void 0:e.offset)!==void 0&&t.set("offset",e.offset.toString()),e!=null&&e.sortColumn&&t.set("sortColumn",e.sortColumn),e!=null&&e.sortOrder&&t.set("sortOrder",e.sortOrder),e!=null&&e.search&&t.set("search",e.search);const s=t.toString(),n=s?`${this.url}/bucket?${s}`:`${this.url}/bucket`;return{data:yield Re(this.fetch,n,{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if($(t))return{data:null,error:t};throw t}})}deleteBucket(e){return E(this,void 0,void 0,function*(){try{return{data:yield Bt(this.fetch,`${this.url}/bucket/${e}`,{},{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if($(t))return{data:null,error:t};throw t}})}from(e){if(!Un(e))throw new Ie("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");return new ea({baseUrl:this.url,catalogName:e,auth:{type:"custom",getHeaders:()=>E(this,void 0,void 0,function*(){return this.headers})},fetch:this.fetch})}}const Ut={"X-Client-Info":`storage-js/${fs}`,"Content-Type":"application/json"};class qt extends Error{constructor(e){super(e),this.__isStorageVectorsError=!0,this.name="StorageVectorsError"}}function V(r){return typeof r=="object"&&r!==null&&"__isStorageVectorsError"in r}class Ke extends qt{constructor(e,t,s){super(e),this.name="StorageVectorsApiError",this.status=t,this.statusCode=s}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}}class ms extends qt{constructor(e,t){super(e),this.name="StorageVectorsUnknownError",this.originalError=t}}var Ct;(function(r){r.InternalError="InternalError",r.S3VectorConflictException="S3VectorConflictException",r.S3VectorNotFoundException="S3VectorNotFoundException",r.S3VectorBucketNotEmpty="S3VectorBucketNotEmpty",r.S3VectorMaxBucketsExceeded="S3VectorMaxBucketsExceeded",r.S3VectorMaxIndexesExceeded="S3VectorMaxIndexesExceeded"})(Ct||(Ct={}));const lt=r=>r?(...e)=>r(...e):(...e)=>fetch(...e),ta=()=>Response,ys=r=>{if(typeof r!="object"||r===null)return!1;const e=Object.getPrototypeOf(r);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in r)&&!(Symbol.iterator in r)},ra=r=>Array.from(new Float32Array(r)),sa=(r,e)=>{if(e!==void 0&&r.float32.length!==e)throw new Error(`Vector dimension mismatch: expected ${e}, got ${r.float32.length}`)},tr=r=>r.msg||r.message||r.error_description||r.error||JSON.stringify(r),na=(r,e,t)=>E(void 0,void 0,void 0,function*(){if(r&&typeof r=="object"&&"status"in r&&"ok"in r&&typeof r.status=="number"&&!(t!=null&&t.noResolveJson)){const n=r.status||500,a=r;if(typeof a.json=="function")a.json().then(i=>{const o=(i==null?void 0:i.statusCode)||(i==null?void 0:i.code)||n+"";e(new Ke(tr(i),n,o))}).catch(()=>{const i=n+"",o=a.statusText||`HTTP ${n} error`;e(new Ke(o,n,i))});else{const i=n+"",o=a.statusText||`HTTP ${n} error`;e(new Ke(o,n,i))}}else e(new ms(tr(r),r))}),aa=(r,e,t,s)=>{const n={method:r,headers:(e==null?void 0:e.headers)||{}};return s?(ys(s)?(n.headers=Object.assign({"Content-Type":"application/json"},e==null?void 0:e.headers),n.body=JSON.stringify(s)):n.body=s,Object.assign(Object.assign({},n),t)):n};function ia(r,e,t,s,n,a){return E(this,void 0,void 0,function*(){return new Promise((i,o)=>{r(t,aa(e,s,n,a)).then(l=>{if(!l.ok)throw l;if(s!=null&&s.noResolveJson)return l;const c=l.headers.get("content-type");return!c||!c.includes("application/json")?{}:l.json()}).then(l=>i(l)).catch(l=>na(l,o,s))})})}function K(r,e,t,s,n){return E(this,void 0,void 0,function*(){return ia(r,"POST",e,s,n,t)})}class bs{constructor(e,t={},s){this.shouldThrowOnError=!1,this.url=e.replace(/\/$/,""),this.headers=Object.assign(Object.assign({},Ut),t),this.fetch=lt(s)}throwOnError(){return this.shouldThrowOnError=!0,this}createIndex(e){return E(this,void 0,void 0,function*(){try{return{data:(yield K(this.fetch,`${this.url}/CreateIndex`,e,{headers:this.headers}))||{},error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(V(t))return{data:null,error:t};throw t}})}getIndex(e,t){return E(this,void 0,void 0,function*(){try{return{data:yield K(this.fetch,`${this.url}/GetIndex`,{vectorBucketName:e,indexName:t},{headers:this.headers}),error:null}}catch(s){if(this.shouldThrowOnError)throw s;if(V(s))return{data:null,error:s};throw s}})}listIndexes(e){return E(this,void 0,void 0,function*(){try{return{data:yield K(this.fetch,`${this.url}/ListIndexes`,e,{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(V(t))return{data:null,error:t};throw t}})}deleteIndex(e,t){return E(this,void 0,void 0,function*(){try{return{data:(yield K(this.fetch,`${this.url}/DeleteIndex`,{vectorBucketName:e,indexName:t},{headers:this.headers}))||{},error:null}}catch(s){if(this.shouldThrowOnError)throw s;if(V(s))return{data:null,error:s};throw s}})}}class ws{constructor(e,t={},s){this.shouldThrowOnError=!1,this.url=e.replace(/\/$/,""),this.headers=Object.assign(Object.assign({},Ut),t),this.fetch=lt(s)}throwOnError(){return this.shouldThrowOnError=!0,this}putVectors(e){return E(this,void 0,void 0,function*(){try{if(e.vectors.length<1||e.vectors.length>500)throw new Error("Vector batch size must be between 1 and 500 items");return{data:(yield K(this.fetch,`${this.url}/PutVectors`,e,{headers:this.headers}))||{},error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(V(t))return{data:null,error:t};throw t}})}getVectors(e){return E(this,void 0,void 0,function*(){try{return{data:yield K(this.fetch,`${this.url}/GetVectors`,e,{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(V(t))return{data:null,error:t};throw t}})}listVectors(e){return E(this,void 0,void 0,function*(){try{if(e.segmentCount!==void 0){if(e.segmentCount<1||e.segmentCount>16)throw new Error("segmentCount must be between 1 and 16");if(e.segmentIndex!==void 0&&(e.segmentIndex<0||e.segmentIndex>=e.segmentCount))throw new Error(`segmentIndex must be between 0 and ${e.segmentCount-1}`)}return{data:yield K(this.fetch,`${this.url}/ListVectors`,e,{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(V(t))return{data:null,error:t};throw t}})}queryVectors(e){return E(this,void 0,void 0,function*(){try{return{data:yield K(this.fetch,`${this.url}/QueryVectors`,e,{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(V(t))return{data:null,error:t};throw t}})}deleteVectors(e){return E(this,void 0,void 0,function*(){try{if(e.keys.length<1||e.keys.length>500)throw new Error("Keys batch size must be between 1 and 500 items");return{data:(yield K(this.fetch,`${this.url}/DeleteVectors`,e,{headers:this.headers}))||{},error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(V(t))return{data:null,error:t};throw t}})}}class _s{constructor(e,t={},s){this.shouldThrowOnError=!1,this.url=e.replace(/\/$/,""),this.headers=Object.assign(Object.assign({},Ut),t),this.fetch=lt(s)}throwOnError(){return this.shouldThrowOnError=!0,this}createBucket(e){return E(this,void 0,void 0,function*(){try{return{data:(yield K(this.fetch,`${this.url}/CreateVectorBucket`,{vectorBucketName:e},{headers:this.headers}))||{},error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(V(t))return{data:null,error:t};throw t}})}getBucket(e){return E(this,void 0,void 0,function*(){try{return{data:yield K(this.fetch,`${this.url}/GetVectorBucket`,{vectorBucketName:e},{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(V(t))return{data:null,error:t};throw t}})}listBuckets(){return E(this,arguments,void 0,function*(e={}){try{return{data:yield K(this.fetch,`${this.url}/ListVectorBuckets`,e,{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(V(t))return{data:null,error:t};throw t}})}deleteBucket(e){return E(this,void 0,void 0,function*(){try{return{data:(yield K(this.fetch,`${this.url}/DeleteVectorBucket`,{vectorBucketName:e},{headers:this.headers}))||{},error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(V(t))return{data:null,error:t};throw t}})}}class xs extends _s{constructor(e,t={}){super(e,t.headers||{},t.fetch)}from(e){return new ks(this.url,this.headers,e,this.fetch)}createBucket(e){const t=Object.create(null,{createBucket:{get:()=>super.createBucket}});return E(this,void 0,void 0,function*(){return t.createBucket.call(this,e)})}getBucket(e){const t=Object.create(null,{getBucket:{get:()=>super.getBucket}});return E(this,void 0,void 0,function*(){return t.getBucket.call(this,e)})}listBuckets(){const e=Object.create(null,{listBuckets:{get:()=>super.listBuckets}});return E(this,arguments,void 0,function*(t={}){return e.listBuckets.call(this,t)})}deleteBucket(e){const t=Object.create(null,{deleteBucket:{get:()=>super.deleteBucket}});return E(this,void 0,void 0,function*(){return t.deleteBucket.call(this,e)})}}class ks extends bs{constructor(e,t,s,n){super(e,t,n),this.vectorBucketName=s}createIndex(e){const t=Object.create(null,{createIndex:{get:()=>super.createIndex}});return E(this,void 0,void 0,function*(){return t.createIndex.call(this,Object.assign(Object.assign({},e),{vectorBucketName:this.vectorBucketName}))})}listIndexes(){const e=Object.create(null,{listIndexes:{get:()=>super.listIndexes}});return E(this,arguments,void 0,function*(t={}){return e.listIndexes.call(this,Object.assign(Object.assign({},t),{vectorBucketName:this.vectorBucketName}))})}getIndex(e){const t=Object.create(null,{getIndex:{get:()=>super.getIndex}});return E(this,void 0,void 0,function*(){return t.getIndex.call(this,this.vectorBucketName,e)})}deleteIndex(e){const t=Object.create(null,{deleteIndex:{get:()=>super.deleteIndex}});return E(this,void 0,void 0,function*(){return t.deleteIndex.call(this,this.vectorBucketName,e)})}index(e){return new Es(this.url,this.headers,this.vectorBucketName,e,this.fetch)}}class Es extends ws{constructor(e,t,s,n,a){super(e,t,a),this.vectorBucketName=s,this.indexName=n}putVectors(e){const t=Object.create(null,{putVectors:{get:()=>super.putVectors}});return E(this,void 0,void 0,function*(){return t.putVectors.call(this,Object.assign(Object.assign({},e),{vectorBucketName:this.vectorBucketName,indexName:this.indexName}))})}getVectors(e){const t=Object.create(null,{getVectors:{get:()=>super.getVectors}});return E(this,void 0,void 0,function*(){return t.getVectors.call(this,Object.assign(Object.assign({},e),{vectorBucketName:this.vectorBucketName,indexName:this.indexName}))})}listVectors(){const e=Object.create(null,{listVectors:{get:()=>super.listVectors}});return E(this,arguments,void 0,function*(t={}){return e.listVectors.call(this,Object.assign(Object.assign({},t),{vectorBucketName:this.vectorBucketName,indexName:this.indexName}))})}queryVectors(e){const t=Object.create(null,{queryVectors:{get:()=>super.queryVectors}});return E(this,void 0,void 0,function*(){return t.queryVectors.call(this,Object.assign(Object.assign({},e),{vectorBucketName:this.vectorBucketName,indexName:this.indexName}))})}deleteVectors(e){const t=Object.create(null,{deleteVectors:{get:()=>super.deleteVectors}});return E(this,void 0,void 0,function*(){return t.deleteVectors.call(this,Object.assign(Object.assign({},e),{vectorBucketName:this.vectorBucketName,indexName:this.indexName}))})}}class oa extends Wn{constructor(e,t={},s,n){super(e,t,s,n)}from(e){return new Gn(this.url,this.headers,e,this.fetch)}get vectors(){return new xs(this.url+"/vector",{headers:this.headers,fetch:this.fetch})}get analytics(){return new vs(this.url+"/iceberg",this.headers,this.fetch)}}const la=Object.freeze(Object.defineProperty({__proto__:null,StorageAnalyticsClient:vs,StorageApiError:hs,StorageClient:oa,StorageError:Ie,StorageUnknownError:Ze,StorageVectorsApiError:Ke,StorageVectorsClient:xs,StorageVectorsError:qt,get StorageVectorsErrorCode(){return Ct},StorageVectorsUnknownError:ms,VectorBucketApi:_s,VectorBucketScope:ks,VectorDataApi:ws,VectorIndexApi:bs,VectorIndexScope:Es,isPlainObject:ys,isStorageError:$,isStorageVectorsError:V,normalizeToFloat32:ra,resolveFetch:lt,resolveResponse:ta,validateVectorDimension:sa},Symbol.toStringTag,{value:"Module"})),ca=$e(la);var Ss={},ct={};Object.defineProperty(ct,"__esModule",{value:!0});ct.version=void 0;ct.version="2.86.2";(function(r){Object.defineProperty(r,"__esModule",{value:!0}),r.DEFAULT_REALTIME_OPTIONS=r.DEFAULT_AUTH_OPTIONS=r.DEFAULT_DB_OPTIONS=r.DEFAULT_GLOBAL_OPTIONS=r.DEFAULT_HEADERS=void 0;const e=ct;let t="";typeof Deno<"u"?t="deno":typeof document<"u"?t="web":typeof navigator<"u"&&navigator.product==="ReactNative"?t="react-native":t="node",r.DEFAULT_HEADERS={"X-Client-Info":`supabase-js-${t}/${e.version}`},r.DEFAULT_GLOBAL_OPTIONS={headers:r.DEFAULT_HEADERS},r.DEFAULT_DB_OPTIONS={schema:"public"},r.DEFAULT_AUTH_OPTIONS={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"implicit"},r.DEFAULT_REALTIME_OPTIONS={}})(Ss);var js={};(function(r){Object.defineProperty(r,"__esModule",{value:!0}),r.fetchWithAuth=r.resolveHeadersConstructor=r.resolveFetch=void 0;const e=n=>n?(...a)=>n(...a):(...a)=>fetch(...a);r.resolveFetch=e;const t=()=>Headers;r.resolveHeadersConstructor=t;const s=(n,a,i)=>{const o=(0,r.resolveFetch)(i),l=(0,r.resolveHeadersConstructor)();return async(c,u)=>{var f;const d=(f=await a())!==null&&f!==void 0?f:n;let h=new l(u==null?void 0:u.headers);return h.has("apikey")||h.set("apikey",n),h.has("Authorization")||h.set("Authorization",`Bearer ${d}`),o(c,Object.assign(Object.assign({},u),{headers:h}))}};r.fetchWithAuth=s})(js);var ie={};Object.defineProperty(ie,"__esModule",{value:!0});ie.isBrowser=void 0;ie.uuid=da;ie.ensureTrailingSlash=Ts;ie.applySettingDefaults=ha;ie.validateSupabaseUrl=pa;function da(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(r){var e=Math.random()*16|0,t=r=="x"?e:e&3|8;return t.toString(16)})}function Ts(r){return r.endsWith("/")?r:r+"/"}const ua=()=>typeof window<"u";ie.isBrowser=ua;function ha(r,e){var t,s;const{db:n,auth:a,realtime:i,global:o}=r,{db:l,auth:c,realtime:u,global:f}=e,d={db:Object.assign(Object.assign({},l),n),auth:Object.assign(Object.assign({},c),a),realtime:Object.assign(Object.assign({},u),i),storage:{},global:Object.assign(Object.assign(Object.assign({},f),o),{headers:Object.assign(Object.assign({},(t=f==null?void 0:f.headers)!==null&&t!==void 0?t:{}),(s=o==null?void 0:o.headers)!==null&&s!==void 0?s:{})}),accessToken:async()=>""};return r.accessToken?d.accessToken=r.accessToken:delete d.accessToken,d}function pa(r){const e=r==null?void 0:r.trim();if(!e)throw new Error("supabaseUrl is required.");if(!e.match(/^https?:\/\//i))throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");try{return new URL(Ts(e))}catch{throw Error("Invalid supabaseUrl: Provided URL is malformed.")}}var dt={};const Os="2.86.2",we=30*1e3,At=3,gt=At*we,fa="http://localhost:9999",ga="supabase.auth.token",va={"X-Client-Info":`gotrue-js/${Os}`},Rt="X-Supabase-Api-Version",Cs={"2024-01-01":{timestamp:Date.parse("2024-01-01T00:00:00.0Z"),name:"2024-01-01"}},ma=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,ya=10*60*1e3;let Se=class extends Error{constructor(e,t,s){super(e),this.__isAuthError=!0,this.name="AuthError",this.status=t,this.code=s}};function T(r){return typeof r=="object"&&r!==null&&"__isAuthError"in r}let As=class extends Se{constructor(e,t,s){super(e,t,s),this.name="AuthApiError",this.status=t,this.code=s}};function Rs(r){return T(r)&&r.name==="AuthApiError"}let ne=class extends Se{constructor(e,t){super(e),this.name="AuthUnknownError",this.originalError=t}},re=class extends Se{constructor(e,t,s,n){super(e,s,n),this.name=t,this.status=s}},H=class extends re{constructor(){super("Auth session missing!","AuthSessionMissingError",400,void 0)}};function Ps(r){return T(r)&&r.name==="AuthSessionMissingError"}let ce=class extends re{constructor(){super("Auth session or user missing","AuthInvalidTokenResponseError",500,void 0)}},Ce=class extends re{constructor(e){super(e,"AuthInvalidCredentialsError",400,void 0)}},Ae=class extends re{constructor(e,t=null){super(e,"AuthImplicitGrantRedirectError",500,void 0),this.details=null,this.details=t}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}};function $s(r){return T(r)&&r.name==="AuthImplicitGrantRedirectError"}let Pt=class extends re{constructor(e,t=null){super(e,"AuthPKCEGrantCodeExchangeError",500,void 0),this.details=null,this.details=t}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}},et=class extends re{constructor(e,t){super(e,"AuthRetryableFetchError",t,void 0)}};function Ge(r){return T(r)&&r.name==="AuthRetryableFetchError"}let $t=class extends re{constructor(e,t,s){super(e,"AuthWeakPasswordError",t,"weak_password"),this.reasons=s}};function ba(r){return T(r)&&r.name==="AuthWeakPasswordError"}let tt=class extends re{constructor(e){super(e,"AuthInvalidJwtError",400,"invalid_jwt")}};const rt="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),rr=` 	
\r=`.split(""),wa=(()=>{const r=new Array(128);for(let e=0;e<r.length;e+=1)r[e]=-1;for(let e=0;e<rr.length;e+=1)r[rr[e].charCodeAt(0)]=-2;for(let e=0;e<rt.length;e+=1)r[rt[e].charCodeAt(0)]=e;return r})();function sr(r,e,t){if(r!==null)for(e.queue=e.queue<<8|r,e.queuedBits+=8;e.queuedBits>=6;){const s=e.queue>>e.queuedBits-6&63;t(rt[s]),e.queuedBits-=6}else if(e.queuedBits>0)for(e.queue=e.queue<<6-e.queuedBits,e.queuedBits=6;e.queuedBits>=6;){const s=e.queue>>e.queuedBits-6&63;t(rt[s]),e.queuedBits-=6}}function Is(r,e,t){const s=wa[r];if(s>-1)for(e.queue=e.queue<<6|s,e.queuedBits+=6;e.queuedBits>=8;)t(e.queue>>e.queuedBits-8&255),e.queuedBits-=8;else{if(s===-2)return;throw new Error(`Invalid Base64-URL character "${String.fromCharCode(r)}"`)}}function nr(r){const e=[],t=i=>{e.push(String.fromCodePoint(i))},s={utf8seq:0,codepoint:0},n={queue:0,queuedBits:0},a=i=>{ka(i,s,t)};for(let i=0;i<r.length;i+=1)Is(r.charCodeAt(i),n,a);return e.join("")}function _a(r,e){if(r<=127){e(r);return}else if(r<=2047){e(192|r>>6),e(128|r&63);return}else if(r<=65535){e(224|r>>12),e(128|r>>6&63),e(128|r&63);return}else if(r<=1114111){e(240|r>>18),e(128|r>>12&63),e(128|r>>6&63),e(128|r&63);return}throw new Error(`Unrecognized Unicode codepoint: ${r.toString(16)}`)}function xa(r,e){for(let t=0;t<r.length;t+=1){let s=r.charCodeAt(t);if(s>55295&&s<=56319){const n=(s-55296)*1024&65535;s=(r.charCodeAt(t+1)-56320&65535|n)+65536,t+=1}_a(s,e)}}function ka(r,e,t){if(e.utf8seq===0){if(r<=127){t(r);return}for(let s=1;s<6;s+=1)if(!(r>>7-s&1)){e.utf8seq=s;break}if(e.utf8seq===2)e.codepoint=r&31;else if(e.utf8seq===3)e.codepoint=r&15;else if(e.utf8seq===4)e.codepoint=r&7;else throw new Error("Invalid UTF-8 sequence");e.utf8seq-=1}else if(e.utf8seq>0){if(r<=127)throw new Error("Invalid UTF-8 sequence");e.codepoint=e.codepoint<<6|r&63,e.utf8seq-=1,e.utf8seq===0&&t(e.codepoint)}}function ke(r){const e=[],t={queue:0,queuedBits:0},s=n=>{e.push(n)};for(let n=0;n<r.length;n+=1)Is(r.charCodeAt(n),t,s);return new Uint8Array(e)}function Ea(r){const e=[];return xa(r,t=>e.push(t)),new Uint8Array(e)}function fe(r){const e=[],t={queue:0,queuedBits:0},s=n=>{e.push(n)};return r.forEach(n=>sr(n,t,s)),sr(null,t,s),e.join("")}function Sa(r){return Math.round(Date.now()/1e3)+r}function ja(){return Symbol("auth-callback")}const N=()=>typeof window<"u"&&typeof document<"u",oe={tested:!1,writable:!1},Ls=()=>{if(!N())return!1;try{if(typeof globalThis.localStorage!="object")return!1}catch{return!1}if(oe.tested)return oe.writable;const r=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(r,r),globalThis.localStorage.removeItem(r),oe.tested=!0,oe.writable=!0}catch{oe.tested=!0,oe.writable=!1}return oe.writable};function Ta(r){const e={},t=new URL(r);if(t.hash&&t.hash[0]==="#")try{new URLSearchParams(t.hash.substring(1)).forEach((n,a)=>{e[a]=n})}catch{}return t.searchParams.forEach((s,n)=>{e[n]=s}),e}const zs=r=>r?(...e)=>r(...e):(...e)=>fetch(...e),Oa=r=>typeof r=="object"&&r!==null&&"status"in r&&"ok"in r&&"json"in r&&typeof r.json=="function",_e=async(r,e,t)=>{await r.setItem(e,JSON.stringify(t))},le=async(r,e)=>{const t=await r.getItem(e);if(!t)return null;try{return JSON.parse(t)}catch{return t}},z=async(r,e)=>{await r.removeItem(e)};class ut{constructor(){this.promise=new ut.promiseConstructor((e,t)=>{this.resolve=e,this.reject=t})}}ut.promiseConstructor=Promise;function vt(r){const e=r.split(".");if(e.length!==3)throw new tt("Invalid JWT structure");for(let s=0;s<e.length;s++)if(!ma.test(e[s]))throw new tt("JWT not in base64url format");return{header:JSON.parse(nr(e[0])),payload:JSON.parse(nr(e[1])),signature:ke(e[2]),raw:{header:e[0],payload:e[1]}}}async function Ca(r){return await new Promise(e=>{setTimeout(()=>e(null),r)})}function Aa(r,e){return new Promise((s,n)=>{(async()=>{for(let a=0;a<1/0;a++)try{const i=await r(a);if(!e(a,null,i)){s(i);return}}catch(i){if(!e(a,i)){n(i);return}}})()})}function Ra(r){return("0"+r.toString(16)).substr(-2)}function Pa(){const e=new Uint32Array(56);if(typeof crypto>"u"){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",s=t.length;let n="";for(let a=0;a<56;a++)n+=t.charAt(Math.floor(Math.random()*s));return n}return crypto.getRandomValues(e),Array.from(e,Ra).join("")}async function $a(r){const t=new TextEncoder().encode(r),s=await crypto.subtle.digest("SHA-256",t),n=new Uint8Array(s);return Array.from(n).map(a=>String.fromCharCode(a)).join("")}async function Ia(r){if(!(typeof crypto<"u"&&typeof crypto.subtle<"u"&&typeof TextEncoder<"u"))return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."),r;const t=await $a(r);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}async function me(r,e,t=!1){const s=Pa();let n=s;t&&(n+="/PASSWORD_RECOVERY"),await _e(r,`${e}-code-verifier`,n);const a=await Ia(s);return[a,s===a?"plain":"s256"]}const La=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function za(r){const e=r.headers.get(Rt);if(!e||!e.match(La))return null;try{return new Date(`${e}T00:00:00.0Z`)}catch{return null}}function Na(r){if(!r)throw new Error("Missing exp claim");const e=Math.floor(Date.now()/1e3);if(r<=e)throw new Error("JWT has expired")}function Ma(r){switch(r){case"RS256":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}};case"ES256":return{name:"ECDSA",namedCurve:"P-256",hash:{name:"SHA-256"}};default:throw new Error("Invalid alg claim")}}const Ba=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;function ye(r){if(!Ba.test(r))throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not")}function mt(){const r={};return new Proxy(r,{get:(e,t)=>{if(t==="__isUserNotAvailableProxy")return!0;if(typeof t=="symbol"){const s=t.toString();if(s==="Symbol(Symbol.toPrimitive)"||s==="Symbol(Symbol.toStringTag)"||s==="Symbol(util.inspect.custom)")return}throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${t}" property of the session object is not supported. Please use getUser() instead.`)},set:(e,t)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)},deleteProperty:(e,t)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)}})}function Ua(r,e){return new Proxy(r,{get:(t,s,n)=>{if(s==="__isInsecureUserWarningProxy")return!0;if(typeof s=="symbol"){const a=s.toString();if(a==="Symbol(Symbol.toPrimitive)"||a==="Symbol(Symbol.toStringTag)"||a==="Symbol(util.inspect.custom)"||a==="Symbol(nodejs.util.inspect.custom)")return Reflect.get(t,s,n)}return!e.value&&typeof s=="string"&&(console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."),e.value=!0),Reflect.get(t,s,n)}})}function ar(r){return JSON.parse(JSON.stringify(r))}const de=r=>r.msg||r.message||r.error_description||r.error||JSON.stringify(r),qa=[502,503,504];async function ir(r){var e;if(!Oa(r))throw new et(de(r),0);if(qa.includes(r.status))throw new et(de(r),r.status);let t;try{t=await r.json()}catch(a){throw new ne(de(a),a)}let s;const n=za(r);if(n&&n.getTime()>=Cs["2024-01-01"].timestamp&&typeof t=="object"&&t&&typeof t.code=="string"?s=t.code:typeof t=="object"&&t&&typeof t.error_code=="string"&&(s=t.error_code),s){if(s==="weak_password")throw new $t(de(t),r.status,((e=t.weak_password)===null||e===void 0?void 0:e.reasons)||[]);if(s==="session_not_found")throw new H}else if(typeof t=="object"&&t&&typeof t.weak_password=="object"&&t.weak_password&&Array.isArray(t.weak_password.reasons)&&t.weak_password.reasons.length&&t.weak_password.reasons.reduce((a,i)=>a&&typeof i=="string",!0))throw new $t(de(t),r.status,t.weak_password.reasons);throw new As(de(t),r.status||500,s)}const Da=(r,e,t,s)=>{const n={method:r,headers:(e==null?void 0:e.headers)||{}};return r==="GET"?n:(n.headers=Object.assign({"Content-Type":"application/json;charset=UTF-8"},e==null?void 0:e.headers),n.body=JSON.stringify(s),Object.assign(Object.assign({},n),t))};async function O(r,e,t,s){var n;const a=Object.assign({},s==null?void 0:s.headers);a[Rt]||(a[Rt]=Cs["2024-01-01"].name),s!=null&&s.jwt&&(a.Authorization=`Bearer ${s.jwt}`);const i=(n=s==null?void 0:s.query)!==null&&n!==void 0?n:{};s!=null&&s.redirectTo&&(i.redirect_to=s.redirectTo);const o=Object.keys(i).length?"?"+new URLSearchParams(i).toString():"",l=await Ha(r,e,t+o,{headers:a,noResolveJson:s==null?void 0:s.noResolveJson},{},s==null?void 0:s.body);return s!=null&&s.xform?s==null?void 0:s.xform(l):{data:Object.assign({},l),error:null}}async function Ha(r,e,t,s,n,a){const i=Da(e,s,n,a);let o;try{o=await r(t,Object.assign({},i))}catch(l){throw console.error(l),new et(de(l),0)}if(o.ok||await ir(o),s!=null&&s.noResolveJson)return o;try{return await o.json()}catch(l){await ir(l)}}function J(r){var e;let t=null;Ka(r)&&(t=Object.assign({},r),r.expires_at||(t.expires_at=Sa(r.expires_in)));const s=(e=r.user)!==null&&e!==void 0?e:r;return{data:{session:t,user:s},error:null}}function or(r){const e=J(r);return!e.error&&r.weak_password&&typeof r.weak_password=="object"&&Array.isArray(r.weak_password.reasons)&&r.weak_password.reasons.length&&r.weak_password.message&&typeof r.weak_password.message=="string"&&r.weak_password.reasons.reduce((t,s)=>t&&typeof s=="string",!0)&&(e.data.weak_password=r.weak_password),e}function ae(r){var e;return{data:{user:(e=r.user)!==null&&e!==void 0?e:r},error:null}}function Va(r){return{data:r,error:null}}function Fa(r){const{action_link:e,email_otp:t,hashed_token:s,redirect_to:n,verification_type:a}=r,i=je(r,["action_link","email_otp","hashed_token","redirect_to","verification_type"]),o={action_link:e,email_otp:t,hashed_token:s,redirect_to:n,verification_type:a},l=Object.assign({},i);return{data:{properties:o,user:l},error:null}}function lr(r){return r}function Ka(r){return r.access_token&&r.refresh_token&&r.expires_in}const We=["global","local","others"];let Dt=class{constructor({url:e="",headers:t={},fetch:s}){this.url=e,this.headers=t,this.fetch=zs(s),this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)},this.oauth={listClients:this._listOAuthClients.bind(this),createClient:this._createOAuthClient.bind(this),getClient:this._getOAuthClient.bind(this),updateClient:this._updateOAuthClient.bind(this),deleteClient:this._deleteOAuthClient.bind(this),regenerateClientSecret:this._regenerateOAuthClientSecret.bind(this)}}async signOut(e,t=We[0]){if(We.indexOf(t)<0)throw new Error(`@supabase/auth-js: Parameter scope must be one of ${We.join(", ")}`);try{return await O(this.fetch,"POST",`${this.url}/logout?scope=${t}`,{headers:this.headers,jwt:e,noResolveJson:!0}),{data:null,error:null}}catch(s){if(T(s))return{data:null,error:s};throw s}}async inviteUserByEmail(e,t={}){try{return await O(this.fetch,"POST",`${this.url}/invite`,{body:{email:e,data:t.data},headers:this.headers,redirectTo:t.redirectTo,xform:ae})}catch(s){if(T(s))return{data:{user:null},error:s};throw s}}async generateLink(e){try{const{options:t}=e,s=je(e,["options"]),n=Object.assign(Object.assign({},s),t);return"newEmail"in s&&(n.new_email=s==null?void 0:s.newEmail,delete n.newEmail),await O(this.fetch,"POST",`${this.url}/admin/generate_link`,{body:n,headers:this.headers,xform:Fa,redirectTo:t==null?void 0:t.redirectTo})}catch(t){if(T(t))return{data:{properties:null,user:null},error:t};throw t}}async createUser(e){try{return await O(this.fetch,"POST",`${this.url}/admin/users`,{body:e,headers:this.headers,xform:ae})}catch(t){if(T(t))return{data:{user:null},error:t};throw t}}async listUsers(e){var t,s,n,a,i,o,l;try{const c={nextPage:null,lastPage:0,total:0},u=await O(this.fetch,"GET",`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(s=(t=e==null?void 0:e.page)===null||t===void 0?void 0:t.toString())!==null&&s!==void 0?s:"",per_page:(a=(n=e==null?void 0:e.perPage)===null||n===void 0?void 0:n.toString())!==null&&a!==void 0?a:""},xform:lr});if(u.error)throw u.error;const f=await u.json(),d=(i=u.headers.get("x-total-count"))!==null&&i!==void 0?i:0,h=(l=(o=u.headers.get("link"))===null||o===void 0?void 0:o.split(","))!==null&&l!==void 0?l:[];return h.length>0&&(h.forEach(p=>{const g=parseInt(p.split(";")[0].split("=")[1].substring(0,1)),v=JSON.parse(p.split(";")[1].split("=")[1]);c[`${v}Page`]=g}),c.total=parseInt(d)),{data:Object.assign(Object.assign({},f),c),error:null}}catch(c){if(T(c))return{data:{users:[]},error:c};throw c}}async getUserById(e){ye(e);try{return await O(this.fetch,"GET",`${this.url}/admin/users/${e}`,{headers:this.headers,xform:ae})}catch(t){if(T(t))return{data:{user:null},error:t};throw t}}async updateUserById(e,t){ye(e);try{return await O(this.fetch,"PUT",`${this.url}/admin/users/${e}`,{body:t,headers:this.headers,xform:ae})}catch(s){if(T(s))return{data:{user:null},error:s};throw s}}async deleteUser(e,t=!1){ye(e);try{return await O(this.fetch,"DELETE",`${this.url}/admin/users/${e}`,{headers:this.headers,body:{should_soft_delete:t},xform:ae})}catch(s){if(T(s))return{data:{user:null},error:s};throw s}}async _listFactors(e){ye(e.userId);try{const{data:t,error:s}=await O(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/factors`,{headers:this.headers,xform:n=>({data:{factors:n},error:null})});return{data:t,error:s}}catch(t){if(T(t))return{data:null,error:t};throw t}}async _deleteFactor(e){ye(e.userId),ye(e.id);try{return{data:await O(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/factors/${e.id}`,{headers:this.headers}),error:null}}catch(t){if(T(t))return{data:null,error:t};throw t}}async _listOAuthClients(e){var t,s,n,a,i,o,l;try{const c={nextPage:null,lastPage:0,total:0},u=await O(this.fetch,"GET",`${this.url}/admin/oauth/clients`,{headers:this.headers,noResolveJson:!0,query:{page:(s=(t=e==null?void 0:e.page)===null||t===void 0?void 0:t.toString())!==null&&s!==void 0?s:"",per_page:(a=(n=e==null?void 0:e.perPage)===null||n===void 0?void 0:n.toString())!==null&&a!==void 0?a:""},xform:lr});if(u.error)throw u.error;const f=await u.json(),d=(i=u.headers.get("x-total-count"))!==null&&i!==void 0?i:0,h=(l=(o=u.headers.get("link"))===null||o===void 0?void 0:o.split(","))!==null&&l!==void 0?l:[];return h.length>0&&(h.forEach(p=>{const g=parseInt(p.split(";")[0].split("=")[1].substring(0,1)),v=JSON.parse(p.split(";")[1].split("=")[1]);c[`${v}Page`]=g}),c.total=parseInt(d)),{data:Object.assign(Object.assign({},f),c),error:null}}catch(c){if(T(c))return{data:{clients:[]},error:c};throw c}}async _createOAuthClient(e){try{return await O(this.fetch,"POST",`${this.url}/admin/oauth/clients`,{body:e,headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if(T(t))return{data:null,error:t};throw t}}async _getOAuthClient(e){try{return await O(this.fetch,"GET",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if(T(t))return{data:null,error:t};throw t}}async _updateOAuthClient(e,t){try{return await O(this.fetch,"PUT",`${this.url}/admin/oauth/clients/${e}`,{body:t,headers:this.headers,xform:s=>({data:s,error:null})})}catch(s){if(T(s))return{data:null,error:s};throw s}}async _deleteOAuthClient(e){try{return await O(this.fetch,"DELETE",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(t){if(T(t))return{data:null,error:t};throw t}}async _regenerateOAuthClientSecret(e){try{return await O(this.fetch,"POST",`${this.url}/admin/oauth/clients/${e}/regenerate_secret`,{headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if(T(t))return{data:null,error:t};throw t}}};function cr(r={}){return{getItem:e=>r[e]||null,setItem:(e,t)=>{r[e]=t},removeItem:e=>{delete r[e]}}}const ue={debug:!!(globalThis&&Ls()&&globalThis.localStorage&&globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug")==="true")};class Ht extends Error{constructor(e){super(e),this.isAcquireTimeout=!0}}let Ns=class extends Ht{};class Ga extends Ht{}async function Ms(r,e,t){ue.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquire lock",r,e);const s=new globalThis.AbortController;return e>0&&setTimeout(()=>{s.abort(),ue.debug&&console.log("@supabase/gotrue-js: navigatorLock acquire timed out",r)},e),await Promise.resolve().then(()=>globalThis.navigator.locks.request(r,e===0?{mode:"exclusive",ifAvailable:!0}:{mode:"exclusive",signal:s.signal},async n=>{if(n){ue.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquired",r,n.name);try{return await t()}finally{ue.debug&&console.log("@supabase/gotrue-js: navigatorLock: released",r,n.name)}}else{if(e===0)throw ue.debug&&console.log("@supabase/gotrue-js: navigatorLock: not immediately available",r),new Ns(`Acquiring an exclusive Navigator LockManager lock "${r}" immediately failed`);if(ue.debug)try{const a=await globalThis.navigator.locks.query();console.log("@supabase/gotrue-js: Navigator LockManager state",JSON.stringify(a,null,"  "))}catch(a){console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state",a)}return console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"),await t()}}))}const dr={};async function Wa(r,e,t){var s;const n=(s=dr[r])!==null&&s!==void 0?s:Promise.resolve(),a=Promise.race([n.catch(()=>null),e>=0?new Promise((i,o)=>{setTimeout(()=>{o(new Ga(`Acquring process lock with name "${r}" timed out`))},e)}):null].filter(i=>i)).catch(i=>{if(i&&i.isAcquireTimeout)throw i;return null}).then(async()=>await t());return dr[r]=a.catch(async i=>{if(i&&i.isAcquireTimeout)return await n,null;throw i}),await a}function Ja(){if(typeof globalThis!="object")try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<"u"&&(self.globalThis=self)}}function Bs(r){if(!/^0x[a-fA-F0-9]{40}$/.test(r))throw new Error(`@supabase/auth-js: Address "${r}" is invalid.`);return r.toLowerCase()}function Ya(r){return parseInt(r,16)}function Qa(r){const e=new TextEncoder().encode(r);return"0x"+Array.from(e,s=>s.toString(16).padStart(2,"0")).join("")}function Xa(r){var e;const{chainId:t,domain:s,expirationTime:n,issuedAt:a=new Date,nonce:i,notBefore:o,requestId:l,resources:c,scheme:u,uri:f,version:d}=r;{if(!Number.isInteger(t))throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${t}`);if(!s)throw new Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');if(i&&i.length<8)throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${i}`);if(!f)throw new Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');if(d!=="1")throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${d}`);if(!((e=r.statement)===null||e===void 0)&&e.includes(`
`))throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${r.statement}`)}const h=Bs(r.address),p=u?`${u}://${s}`:s,g=r.statement?`${r.statement}
`:"",v=`${p} wants you to sign in with your Ethereum account:
${h}

${g}`;let m=`URI: ${f}
Version: ${d}
Chain ID: ${t}${i?`
Nonce: ${i}`:""}
Issued At: ${a.toISOString()}`;if(n&&(m+=`
Expiration Time: ${n.toISOString()}`),o&&(m+=`
Not Before: ${o.toISOString()}`),l&&(m+=`
Request ID: ${l}`),c){let b=`
Resources:`;for(const y of c){if(!y||typeof y!="string")throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${y}`);b+=`
- ${y}`}m+=b}return`${v}
${m}`}class L extends Error{constructor({message:e,code:t,cause:s,name:n}){var a;super(e,{cause:s}),this.__isWebAuthnError=!0,this.name=(a=n??(s instanceof Error?s.name:void 0))!==null&&a!==void 0?a:"Unknown Error",this.code=t}}class st extends L{constructor(e,t){super({code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t,message:e}),this.name="WebAuthnUnknownError",this.originalError=t}}function Za({error:r,options:e}){var t,s,n;const{publicKey:a}=e;if(!a)throw Error("options was missing required publicKey property");if(r.name==="AbortError"){if(e.signal instanceof AbortSignal)return new L({message:"Registration ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:r})}else if(r.name==="ConstraintError"){if(((t=a.authenticatorSelection)===null||t===void 0?void 0:t.requireResidentKey)===!0)return new L({message:"Discoverable credentials were required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",cause:r});if(e.mediation==="conditional"&&((s=a.authenticatorSelection)===null||s===void 0?void 0:s.userVerification)==="required")return new L({message:"User verification was required during automatic registration but it could not be performed",code:"ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",cause:r});if(((n=a.authenticatorSelection)===null||n===void 0?void 0:n.userVerification)==="required")return new L({message:"User verification was required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",cause:r})}else{if(r.name==="InvalidStateError")return new L({message:"The authenticator was previously registered",code:"ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",cause:r});if(r.name==="NotAllowedError")return new L({message:r.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:r});if(r.name==="NotSupportedError")return a.pubKeyCredParams.filter(o=>o.type==="public-key").length===0?new L({message:'No entry in pubKeyCredParams was of type "public-key"',code:"ERROR_MALFORMED_PUBKEYCREDPARAMS",cause:r}):new L({message:"No available authenticator supported any of the specified pubKeyCredParams algorithms",code:"ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",cause:r});if(r.name==="SecurityError"){const i=window.location.hostname;if(Us(i)){if(a.rp.id!==i)return new L({message:`The RP ID "${a.rp.id}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:r})}else return new L({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:r})}else if(r.name==="TypeError"){if(a.user.id.byteLength<1||a.user.id.byteLength>64)return new L({message:"User ID was not between 1 and 64 characters",code:"ERROR_INVALID_USER_ID_LENGTH",cause:r})}else if(r.name==="UnknownError")return new L({message:"The authenticator was unable to process the specified options, or could not create a new credential",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:r})}return new L({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:r})}function ei({error:r,options:e}){const{publicKey:t}=e;if(!t)throw Error("options was missing required publicKey property");if(r.name==="AbortError"){if(e.signal instanceof AbortSignal)return new L({message:"Authentication ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:r})}else{if(r.name==="NotAllowedError")return new L({message:r.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:r});if(r.name==="SecurityError"){const s=window.location.hostname;if(Us(s)){if(t.rpId!==s)return new L({message:`The RP ID "${t.rpId}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:r})}else return new L({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:r})}else if(r.name==="UnknownError")return new L({message:"The authenticator was unable to process the specified options, or could not create a new assertion signature",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:r})}return new L({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:r})}class ti{createNewAbortSignal(){if(this.controller){const t=new Error("Cancelling existing WebAuthn API call for new one");t.name="AbortError",this.controller.abort(t)}const e=new AbortController;return this.controller=e,e.signal}cancelCeremony(){if(this.controller){const e=new Error("Manually cancelling existing WebAuthn API call");e.name="AbortError",this.controller.abort(e),this.controller=void 0}}}const ri=new ti;function si(r){if(!r)throw new Error("Credential creation options are required");if(typeof PublicKeyCredential<"u"&&"parseCreationOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseCreationOptionsFromJSON=="function")return PublicKeyCredential.parseCreationOptionsFromJSON(r);const{challenge:e,user:t,excludeCredentials:s}=r,n=je(r,["challenge","user","excludeCredentials"]),a=ke(e).buffer,i=Object.assign(Object.assign({},t),{id:ke(t.id).buffer}),o=Object.assign(Object.assign({},n),{challenge:a,user:i});if(s&&s.length>0){o.excludeCredentials=new Array(s.length);for(let l=0;l<s.length;l++){const c=s[l];o.excludeCredentials[l]=Object.assign(Object.assign({},c),{id:ke(c.id).buffer,type:c.type||"public-key",transports:c.transports})}}return o}function ni(r){if(!r)throw new Error("Credential request options are required");if(typeof PublicKeyCredential<"u"&&"parseRequestOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseRequestOptionsFromJSON=="function")return PublicKeyCredential.parseRequestOptionsFromJSON(r);const{challenge:e,allowCredentials:t}=r,s=je(r,["challenge","allowCredentials"]),n=ke(e).buffer,a=Object.assign(Object.assign({},s),{challenge:n});if(t&&t.length>0){a.allowCredentials=new Array(t.length);for(let i=0;i<t.length;i++){const o=t[i];a.allowCredentials[i]=Object.assign(Object.assign({},o),{id:ke(o.id).buffer,type:o.type||"public-key",transports:o.transports})}}return a}function ai(r){var e;if("toJSON"in r&&typeof r.toJSON=="function")return r.toJSON();const t=r;return{id:r.id,rawId:r.id,response:{attestationObject:fe(new Uint8Array(r.response.attestationObject)),clientDataJSON:fe(new Uint8Array(r.response.clientDataJSON))},type:"public-key",clientExtensionResults:r.getClientExtensionResults(),authenticatorAttachment:(e=t.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function ii(r){var e;if("toJSON"in r&&typeof r.toJSON=="function")return r.toJSON();const t=r,s=r.getClientExtensionResults(),n=r.response;return{id:r.id,rawId:r.id,response:{authenticatorData:fe(new Uint8Array(n.authenticatorData)),clientDataJSON:fe(new Uint8Array(n.clientDataJSON)),signature:fe(new Uint8Array(n.signature)),userHandle:n.userHandle?fe(new Uint8Array(n.userHandle)):void 0},type:"public-key",clientExtensionResults:s,authenticatorAttachment:(e=t.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function Us(r){return r==="localhost"||/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(r)}function ur(){var r,e;return!!(N()&&"PublicKeyCredential"in window&&window.PublicKeyCredential&&"credentials"in navigator&&typeof((r=navigator==null?void 0:navigator.credentials)===null||r===void 0?void 0:r.create)=="function"&&typeof((e=navigator==null?void 0:navigator.credentials)===null||e===void 0?void 0:e.get)=="function")}async function oi(r){try{const e=await navigator.credentials.create(r);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new st("Browser returned unexpected credential type",e)}:{data:null,error:new st("Empty credential response",e)}}catch(e){return{data:null,error:Za({error:e,options:r})}}}async function li(r){try{const e=await navigator.credentials.get(r);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new st("Browser returned unexpected credential type",e)}:{data:null,error:new st("Empty credential response",e)}}catch(e){return{data:null,error:ei({error:e,options:r})}}}const ci={hints:["security-key"],authenticatorSelection:{authenticatorAttachment:"cross-platform",requireResidentKey:!1,userVerification:"preferred",residentKey:"discouraged"},attestation:"direct"},di={userVerification:"preferred",hints:["security-key"],attestation:"direct"};function nt(...r){const e=n=>n!==null&&typeof n=="object"&&!Array.isArray(n),t=n=>n instanceof ArrayBuffer||ArrayBuffer.isView(n),s={};for(const n of r)if(n)for(const a in n){const i=n[a];if(i!==void 0)if(Array.isArray(i))s[a]=i;else if(t(i))s[a]=i;else if(e(i)){const o=s[a];e(o)?s[a]=nt(o,i):s[a]=nt(i)}else s[a]=i}return s}function ui(r,e){return nt(ci,r,e||{})}function hi(r,e){return nt(di,r,e||{})}class pi{constructor(e){this.client=e,this.enroll=this._enroll.bind(this),this.challenge=this._challenge.bind(this),this.verify=this._verify.bind(this),this.authenticate=this._authenticate.bind(this),this.register=this._register.bind(this)}async _enroll(e){return this.client.mfa.enroll(Object.assign(Object.assign({},e),{factorType:"webauthn"}))}async _challenge({factorId:e,webauthn:t,friendlyName:s,signal:n},a){try{const{data:i,error:o}=await this.client.mfa.challenge({factorId:e,webauthn:t});if(!i)return{data:null,error:o};const l=n??ri.createNewAbortSignal();if(i.webauthn.type==="create"){const{user:c}=i.webauthn.credential_options.publicKey;c.name||(c.name=`${c.id}:${s}`),c.displayName||(c.displayName=c.name)}switch(i.webauthn.type){case"create":{const c=ui(i.webauthn.credential_options.publicKey,a==null?void 0:a.create),{data:u,error:f}=await oi({publicKey:c,signal:l});return u?{data:{factorId:e,challengeId:i.id,webauthn:{type:i.webauthn.type,credential_response:u}},error:null}:{data:null,error:f}}case"request":{const c=hi(i.webauthn.credential_options.publicKey,a==null?void 0:a.request),{data:u,error:f}=await li(Object.assign(Object.assign({},i.webauthn.credential_options),{publicKey:c,signal:l}));return u?{data:{factorId:e,challengeId:i.id,webauthn:{type:i.webauthn.type,credential_response:u}},error:null}:{data:null,error:f}}}}catch(i){return T(i)?{data:null,error:i}:{data:null,error:new ne("Unexpected error in challenge",i)}}}async _verify({challengeId:e,factorId:t,webauthn:s}){return this.client.mfa.verify({factorId:t,challengeId:e,webauthn:s})}async _authenticate({factorId:e,webauthn:{rpId:t=typeof window<"u"?window.location.hostname:void 0,rpOrigins:s=typeof window<"u"?[window.location.origin]:void 0,signal:n}={}},a){if(!t)return{data:null,error:new Se("rpId is required for WebAuthn authentication")};try{if(!ur())return{data:null,error:new ne("Browser does not support WebAuthn",null)};const{data:i,error:o}=await this.challenge({factorId:e,webauthn:{rpId:t,rpOrigins:s},signal:n},{request:a});if(!i)return{data:null,error:o};const{webauthn:l}=i;return this._verify({factorId:e,challengeId:i.challengeId,webauthn:{type:l.type,rpId:t,rpOrigins:s,credential_response:l.credential_response}})}catch(i){return T(i)?{data:null,error:i}:{data:null,error:new ne("Unexpected error in authenticate",i)}}}async _register({friendlyName:e,webauthn:{rpId:t=typeof window<"u"?window.location.hostname:void 0,rpOrigins:s=typeof window<"u"?[window.location.origin]:void 0,signal:n}={}},a){if(!t)return{data:null,error:new Se("rpId is required for WebAuthn registration")};try{if(!ur())return{data:null,error:new ne("Browser does not support WebAuthn",null)};const{data:i,error:o}=await this._enroll({friendlyName:e});if(!i)return await this.client.mfa.listFactors().then(u=>{var f;return(f=u.data)===null||f===void 0?void 0:f.all.find(d=>d.factor_type==="webauthn"&&d.friendly_name===e&&d.status!=="unverified")}).then(u=>u?this.client.mfa.unenroll({factorId:u==null?void 0:u.id}):void 0),{data:null,error:o};const{data:l,error:c}=await this._challenge({factorId:i.id,friendlyName:i.friendly_name,webauthn:{rpId:t,rpOrigins:s},signal:n},{create:a});return l?this._verify({factorId:i.id,challengeId:l.challengeId,webauthn:{rpId:t,rpOrigins:s,type:l.webauthn.type,credential_response:l.webauthn.credential_response}}):{data:null,error:c}}catch(i){return T(i)?{data:null,error:i}:{data:null,error:new ne("Unexpected error in register",i)}}}}Ja();const fi={url:fa,storageKey:ga,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:va,flowType:"implicit",debug:!1,hasCustomAuthorizationHeader:!1,throwOnError:!1};async function hr(r,e,t){return await t()}const be={};let Vt=class It{get jwks(){var e,t;return(t=(e=be[this.storageKey])===null||e===void 0?void 0:e.jwks)!==null&&t!==void 0?t:{keys:[]}}set jwks(e){be[this.storageKey]=Object.assign(Object.assign({},be[this.storageKey]),{jwks:e})}get jwks_cached_at(){var e,t;return(t=(e=be[this.storageKey])===null||e===void 0?void 0:e.cachedAt)!==null&&t!==void 0?t:Number.MIN_SAFE_INTEGER}set jwks_cached_at(e){be[this.storageKey]=Object.assign(Object.assign({},be[this.storageKey]),{cachedAt:e})}constructor(e){var t,s,n;this.userStorage=null,this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.initializePromise=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log;const a=Object.assign(Object.assign({},fi),e);if(this.storageKey=a.storageKey,this.instanceID=(t=It.nextInstanceID[this.storageKey])!==null&&t!==void 0?t:0,It.nextInstanceID[this.storageKey]=this.instanceID+1,this.logDebugMessages=!!a.debug,typeof a.debug=="function"&&(this.logger=a.debug),this.instanceID>0&&N()){const i=`${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;console.warn(i),this.logDebugMessages&&console.trace(i)}if(this.persistSession=a.persistSession,this.autoRefreshToken=a.autoRefreshToken,this.admin=new Dt({url:a.url,headers:a.headers,fetch:a.fetch}),this.url=a.url,this.headers=a.headers,this.fetch=zs(a.fetch),this.lock=a.lock||hr,this.detectSessionInUrl=a.detectSessionInUrl,this.flowType=a.flowType,this.hasCustomAuthorizationHeader=a.hasCustomAuthorizationHeader,this.throwOnError=a.throwOnError,a.lock?this.lock=a.lock:N()&&(!((s=globalThis==null?void 0:globalThis.navigator)===null||s===void 0)&&s.locks)?this.lock=Ms:this.lock=hr,this.jwks||(this.jwks={keys:[]},this.jwks_cached_at=Number.MIN_SAFE_INTEGER),this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this),webauthn:new pi(this)},this.oauth={getAuthorizationDetails:this._getAuthorizationDetails.bind(this),approveAuthorization:this._approveAuthorization.bind(this),denyAuthorization:this._denyAuthorization.bind(this),listGrants:this._listOAuthGrants.bind(this),revokeGrant:this._revokeOAuthGrant.bind(this)},this.persistSession?(a.storage?this.storage=a.storage:Ls()?this.storage=globalThis.localStorage:(this.memoryStorage={},this.storage=cr(this.memoryStorage)),a.userStorage&&(this.userStorage=a.userStorage)):(this.memoryStorage={},this.storage=cr(this.memoryStorage)),N()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(i){console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available",i)}(n=this.broadcastChannel)===null||n===void 0||n.addEventListener("message",async i=>{this._debug("received broadcast notification from other tab or client",i),await this._notifyAllSubscribers(i.data.event,i.data.session,!1)})}this.initialize()}isThrowOnErrorEnabled(){return this.throwOnError}_returnResult(e){if(this.throwOnError&&e&&e.error)throw e.error;return e}_logPrefix(){return`GoTrueClient@${this.storageKey}:${this.instanceID} (${Os}) ${new Date().toISOString()}`}_debug(...e){return this.logDebugMessages&&this.logger(this._logPrefix(),...e),this}async initialize(){return this.initializePromise?await this.initializePromise:(this.initializePromise=(async()=>await this._acquireLock(-1,async()=>await this._initialize()))(),await this.initializePromise)}async _initialize(){var e;try{let t={},s="none";if(N()&&(t=Ta(window.location.href),this._isImplicitGrantCallback(t)?s="implicit":await this._isPKCECallback(t)&&(s="pkce")),N()&&this.detectSessionInUrl&&s!=="none"){const{data:n,error:a}=await this._getSessionFromURL(t,s);if(a){if(this._debug("#_initialize()","error detecting session from URL",a),$s(a)){const l=(e=a.details)===null||e===void 0?void 0:e.code;if(l==="identity_already_exists"||l==="identity_not_found"||l==="single_identity_not_deletable")return{error:a}}return await this._removeSession(),{error:a}}const{session:i,redirectType:o}=n;return this._debug("#_initialize()","detected session in URL",i,"redirect type",o),await this._saveSession(i),setTimeout(async()=>{o==="recovery"?await this._notifyAllSubscribers("PASSWORD_RECOVERY",i):await this._notifyAllSubscribers("SIGNED_IN",i)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(t){return T(t)?this._returnResult({error:t}):this._returnResult({error:new ne("Unexpected error during initialization",t)})}finally{await this._handleVisibilityChange(),this._debug("#_initialize()","end")}}async signInAnonymously(e){var t,s,n;try{const a=await O(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{data:(s=(t=e==null?void 0:e.options)===null||t===void 0?void 0:t.data)!==null&&s!==void 0?s:{},gotrue_meta_security:{captcha_token:(n=e==null?void 0:e.options)===null||n===void 0?void 0:n.captchaToken}},xform:J}),{data:i,error:o}=a;if(o||!i)return this._returnResult({data:{user:null,session:null},error:o});const l=i.session,c=i.user;return i.session&&(await this._saveSession(i.session),await this._notifyAllSubscribers("SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(a){if(T(a))return this._returnResult({data:{user:null,session:null},error:a});throw a}}async signUp(e){var t,s,n;try{let a;if("email"in e){const{email:u,password:f,options:d}=e;let h=null,p=null;this.flowType==="pkce"&&([h,p]=await me(this.storage,this.storageKey)),a=await O(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,redirectTo:d==null?void 0:d.emailRedirectTo,body:{email:u,password:f,data:(t=d==null?void 0:d.data)!==null&&t!==void 0?t:{},gotrue_meta_security:{captcha_token:d==null?void 0:d.captchaToken},code_challenge:h,code_challenge_method:p},xform:J})}else if("phone"in e){const{phone:u,password:f,options:d}=e;a=await O(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{phone:u,password:f,data:(s=d==null?void 0:d.data)!==null&&s!==void 0?s:{},channel:(n=d==null?void 0:d.channel)!==null&&n!==void 0?n:"sms",gotrue_meta_security:{captcha_token:d==null?void 0:d.captchaToken}},xform:J})}else throw new Ce("You must provide either an email or phone number and a password");const{data:i,error:o}=a;if(o||!i)return await z(this.storage,`${this.storageKey}-code-verifier`),this._returnResult({data:{user:null,session:null},error:o});const l=i.session,c=i.user;return i.session&&(await this._saveSession(i.session),await this._notifyAllSubscribers("SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(a){if(await z(this.storage,`${this.storageKey}-code-verifier`),T(a))return this._returnResult({data:{user:null,session:null},error:a});throw a}}async signInWithPassword(e){try{let t;if("email"in e){const{email:a,password:i,options:o}=e;t=await O(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:a,password:i,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}},xform:or})}else if("phone"in e){const{phone:a,password:i,options:o}=e;t=await O(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:a,password:i,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}},xform:or})}else throw new Ce("You must provide either an email or phone number and a password");const{data:s,error:n}=t;if(n)return this._returnResult({data:{user:null,session:null},error:n});if(!s||!s.session||!s.user){const a=new ce;return this._returnResult({data:{user:null,session:null},error:a})}return s.session&&(await this._saveSession(s.session),await this._notifyAllSubscribers("SIGNED_IN",s.session)),this._returnResult({data:Object.assign({user:s.user,session:s.session},s.weak_password?{weakPassword:s.weak_password}:null),error:n})}catch(t){if(T(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async signInWithOAuth(e){var t,s,n,a;return await this._handleProviderSignIn(e.provider,{redirectTo:(t=e.options)===null||t===void 0?void 0:t.redirectTo,scopes:(s=e.options)===null||s===void 0?void 0:s.scopes,queryParams:(n=e.options)===null||n===void 0?void 0:n.queryParams,skipBrowserRedirect:(a=e.options)===null||a===void 0?void 0:a.skipBrowserRedirect})}async exchangeCodeForSession(e){return await this.initializePromise,this._acquireLock(-1,async()=>this._exchangeCodeForSession(e))}async signInWithWeb3(e){const{chain:t}=e;switch(t){case"ethereum":return await this.signInWithEthereum(e);case"solana":return await this.signInWithSolana(e);default:throw new Error(`@supabase/auth-js: Unsupported chain "${t}"`)}}async signInWithEthereum(e){var t,s,n,a,i,o,l,c,u,f,d;let h,p;if("message"in e)h=e.message,p=e.signature;else{const{chain:g,wallet:v,statement:m,options:b}=e;let y;if(N())if(typeof v=="object")y=v;else{const j=window;if("ethereum"in j&&typeof j.ethereum=="object"&&"request"in j.ethereum&&typeof j.ethereum.request=="function")y=j.ethereum;else throw new Error("@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.")}else{if(typeof v!="object"||!(b!=null&&b.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");y=v}const x=new URL((t=b==null?void 0:b.url)!==null&&t!==void 0?t:window.location.href),_=await y.request({method:"eth_requestAccounts"}).then(j=>j).catch(()=>{throw new Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid")});if(!_||_.length===0)throw new Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");const w=Bs(_[0]);let k=(s=b==null?void 0:b.signInWithEthereum)===null||s===void 0?void 0:s.chainId;if(!k){const j=await y.request({method:"eth_chainId"});k=Ya(j)}const S={domain:x.host,address:w,statement:m,uri:x.href,version:"1",chainId:k,nonce:(n=b==null?void 0:b.signInWithEthereum)===null||n===void 0?void 0:n.nonce,issuedAt:(i=(a=b==null?void 0:b.signInWithEthereum)===null||a===void 0?void 0:a.issuedAt)!==null&&i!==void 0?i:new Date,expirationTime:(o=b==null?void 0:b.signInWithEthereum)===null||o===void 0?void 0:o.expirationTime,notBefore:(l=b==null?void 0:b.signInWithEthereum)===null||l===void 0?void 0:l.notBefore,requestId:(c=b==null?void 0:b.signInWithEthereum)===null||c===void 0?void 0:c.requestId,resources:(u=b==null?void 0:b.signInWithEthereum)===null||u===void 0?void 0:u.resources};h=Xa(S),p=await y.request({method:"personal_sign",params:[Qa(h),w]})}try{const{data:g,error:v}=await O(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"ethereum",message:h,signature:p},!((f=e.options)===null||f===void 0)&&f.captchaToken?{gotrue_meta_security:{captcha_token:(d=e.options)===null||d===void 0?void 0:d.captchaToken}}:null),xform:J});if(v)throw v;if(!g||!g.session||!g.user){const m=new ce;return this._returnResult({data:{user:null,session:null},error:m})}return g.session&&(await this._saveSession(g.session),await this._notifyAllSubscribers("SIGNED_IN",g.session)),this._returnResult({data:Object.assign({},g),error:v})}catch(g){if(T(g))return this._returnResult({data:{user:null,session:null},error:g});throw g}}async signInWithSolana(e){var t,s,n,a,i,o,l,c,u,f,d,h;let p,g;if("message"in e)p=e.message,g=e.signature;else{const{chain:v,wallet:m,statement:b,options:y}=e;let x;if(N())if(typeof m=="object")x=m;else{const w=window;if("solana"in w&&typeof w.solana=="object"&&("signIn"in w.solana&&typeof w.solana.signIn=="function"||"signMessage"in w.solana&&typeof w.solana.signMessage=="function"))x=w.solana;else throw new Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.")}else{if(typeof m!="object"||!(y!=null&&y.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");x=m}const _=new URL((t=y==null?void 0:y.url)!==null&&t!==void 0?t:window.location.href);if("signIn"in x&&x.signIn){const w=await x.signIn(Object.assign(Object.assign(Object.assign({issuedAt:new Date().toISOString()},y==null?void 0:y.signInWithSolana),{version:"1",domain:_.host,uri:_.href}),b?{statement:b}:null));let k;if(Array.isArray(w)&&w[0]&&typeof w[0]=="object")k=w[0];else if(w&&typeof w=="object"&&"signedMessage"in w&&"signature"in w)k=w;else throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");if("signedMessage"in k&&"signature"in k&&(typeof k.signedMessage=="string"||k.signedMessage instanceof Uint8Array)&&k.signature instanceof Uint8Array)p=typeof k.signedMessage=="string"?k.signedMessage:new TextDecoder().decode(k.signedMessage),g=k.signature;else throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields")}else{if(!("signMessage"in x)||typeof x.signMessage!="function"||!("publicKey"in x)||typeof x!="object"||!x.publicKey||!("toBase58"in x.publicKey)||typeof x.publicKey.toBase58!="function")throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");p=[`${_.host} wants you to sign in with your Solana account:`,x.publicKey.toBase58(),...b?["",b,""]:[""],"Version: 1",`URI: ${_.href}`,`Issued At: ${(n=(s=y==null?void 0:y.signInWithSolana)===null||s===void 0?void 0:s.issuedAt)!==null&&n!==void 0?n:new Date().toISOString()}`,...!((a=y==null?void 0:y.signInWithSolana)===null||a===void 0)&&a.notBefore?[`Not Before: ${y.signInWithSolana.notBefore}`]:[],...!((i=y==null?void 0:y.signInWithSolana)===null||i===void 0)&&i.expirationTime?[`Expiration Time: ${y.signInWithSolana.expirationTime}`]:[],...!((o=y==null?void 0:y.signInWithSolana)===null||o===void 0)&&o.chainId?[`Chain ID: ${y.signInWithSolana.chainId}`]:[],...!((l=y==null?void 0:y.signInWithSolana)===null||l===void 0)&&l.nonce?[`Nonce: ${y.signInWithSolana.nonce}`]:[],...!((c=y==null?void 0:y.signInWithSolana)===null||c===void 0)&&c.requestId?[`Request ID: ${y.signInWithSolana.requestId}`]:[],...!((f=(u=y==null?void 0:y.signInWithSolana)===null||u===void 0?void 0:u.resources)===null||f===void 0)&&f.length?["Resources",...y.signInWithSolana.resources.map(k=>`- ${k}`)]:[]].join(`
`);const w=await x.signMessage(new TextEncoder().encode(p),"utf8");if(!w||!(w instanceof Uint8Array))throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");g=w}}try{const{data:v,error:m}=await O(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"solana",message:p,signature:fe(g)},!((d=e.options)===null||d===void 0)&&d.captchaToken?{gotrue_meta_security:{captcha_token:(h=e.options)===null||h===void 0?void 0:h.captchaToken}}:null),xform:J});if(m)throw m;if(!v||!v.session||!v.user){const b=new ce;return this._returnResult({data:{user:null,session:null},error:b})}return v.session&&(await this._saveSession(v.session),await this._notifyAllSubscribers("SIGNED_IN",v.session)),this._returnResult({data:Object.assign({},v),error:m})}catch(v){if(T(v))return this._returnResult({data:{user:null,session:null},error:v});throw v}}async _exchangeCodeForSession(e){const t=await le(this.storage,`${this.storageKey}-code-verifier`),[s,n]=(t??"").split("/");try{const{data:a,error:i}=await O(this.fetch,"POST",`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:e,code_verifier:s},xform:J});if(await z(this.storage,`${this.storageKey}-code-verifier`),i)throw i;if(!a||!a.session||!a.user){const o=new ce;return this._returnResult({data:{user:null,session:null,redirectType:null},error:o})}return a.session&&(await this._saveSession(a.session),await this._notifyAllSubscribers("SIGNED_IN",a.session)),this._returnResult({data:Object.assign(Object.assign({},a),{redirectType:n??null}),error:i})}catch(a){if(await z(this.storage,`${this.storageKey}-code-verifier`),T(a))return this._returnResult({data:{user:null,session:null,redirectType:null},error:a});throw a}}async signInWithIdToken(e){try{const{options:t,provider:s,token:n,access_token:a,nonce:i}=e,o=await O(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:s,id_token:n,access_token:a,nonce:i,gotrue_meta_security:{captcha_token:t==null?void 0:t.captchaToken}},xform:J}),{data:l,error:c}=o;if(c)return this._returnResult({data:{user:null,session:null},error:c});if(!l||!l.session||!l.user){const u=new ce;return this._returnResult({data:{user:null,session:null},error:u})}return l.session&&(await this._saveSession(l.session),await this._notifyAllSubscribers("SIGNED_IN",l.session)),this._returnResult({data:l,error:c})}catch(t){if(T(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async signInWithOtp(e){var t,s,n,a,i;try{if("email"in e){const{email:o,options:l}=e;let c=null,u=null;this.flowType==="pkce"&&([c,u]=await me(this.storage,this.storageKey));const{error:f}=await O(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{email:o,data:(t=l==null?void 0:l.data)!==null&&t!==void 0?t:{},create_user:(s=l==null?void 0:l.shouldCreateUser)!==null&&s!==void 0?s:!0,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken},code_challenge:c,code_challenge_method:u},redirectTo:l==null?void 0:l.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:f})}if("phone"in e){const{phone:o,options:l}=e,{data:c,error:u}=await O(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{phone:o,data:(n=l==null?void 0:l.data)!==null&&n!==void 0?n:{},create_user:(a=l==null?void 0:l.shouldCreateUser)!==null&&a!==void 0?a:!0,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken},channel:(i=l==null?void 0:l.channel)!==null&&i!==void 0?i:"sms"}});return this._returnResult({data:{user:null,session:null,messageId:c==null?void 0:c.message_id},error:u})}throw new Ce("You must provide either an email or phone number.")}catch(o){if(await z(this.storage,`${this.storageKey}-code-verifier`),T(o))return this._returnResult({data:{user:null,session:null},error:o});throw o}}async verifyOtp(e){var t,s;try{let n,a;"options"in e&&(n=(t=e.options)===null||t===void 0?void 0:t.redirectTo,a=(s=e.options)===null||s===void 0?void 0:s.captchaToken);const{data:i,error:o}=await O(this.fetch,"POST",`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},e),{gotrue_meta_security:{captcha_token:a}}),redirectTo:n,xform:J});if(o)throw o;if(!i)throw new Error("An error occurred on token verification.");const l=i.session,c=i.user;return l!=null&&l.access_token&&(await this._saveSession(l),await this._notifyAllSubscribers(e.type=="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(n){if(T(n))return this._returnResult({data:{user:null,session:null},error:n});throw n}}async signInWithSSO(e){var t,s,n,a,i;try{let o=null,l=null;this.flowType==="pkce"&&([o,l]=await me(this.storage,this.storageKey));const c=await O(this.fetch,"POST",`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},"providerId"in e?{provider_id:e.providerId}:null),"domain"in e?{domain:e.domain}:null),{redirect_to:(s=(t=e.options)===null||t===void 0?void 0:t.redirectTo)!==null&&s!==void 0?s:void 0}),!((n=e==null?void 0:e.options)===null||n===void 0)&&n.captchaToken?{gotrue_meta_security:{captcha_token:e.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:o,code_challenge_method:l}),headers:this.headers,xform:Va});return!((a=c.data)===null||a===void 0)&&a.url&&N()&&!(!((i=e.options)===null||i===void 0)&&i.skipBrowserRedirect)&&window.location.assign(c.data.url),this._returnResult(c)}catch(o){if(await z(this.storage,`${this.storageKey}-code-verifier`),T(o))return this._returnResult({data:null,error:o});throw o}}async reauthenticate(){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._reauthenticate())}async _reauthenticate(){try{return await this._useSession(async e=>{const{data:{session:t},error:s}=e;if(s)throw s;if(!t)throw new H;const{error:n}=await O(this.fetch,"GET",`${this.url}/reauthenticate`,{headers:this.headers,jwt:t.access_token});return this._returnResult({data:{user:null,session:null},error:n})})}catch(e){if(T(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async resend(e){try{const t=`${this.url}/resend`;if("email"in e){const{email:s,type:n,options:a}=e,{error:i}=await O(this.fetch,"POST",t,{headers:this.headers,body:{email:s,type:n,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}},redirectTo:a==null?void 0:a.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:i})}else if("phone"in e){const{phone:s,type:n,options:a}=e,{data:i,error:o}=await O(this.fetch,"POST",t,{headers:this.headers,body:{phone:s,type:n,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}}});return this._returnResult({data:{user:null,session:null,messageId:i==null?void 0:i.message_id},error:o})}throw new Ce("You must provide either an email or phone number and a type")}catch(t){if(T(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async getSession(){return await this.initializePromise,await this._acquireLock(-1,async()=>this._useSession(async t=>t))}async _acquireLock(e,t){this._debug("#_acquireLock","begin",e);try{if(this.lockAcquired){const s=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),n=(async()=>(await s,await t()))();return this.pendingInLock.push((async()=>{try{await n}catch{}})()),n}return await this.lock(`lock:${this.storageKey}`,e,async()=>{this._debug("#_acquireLock","lock acquired for storage key",this.storageKey);try{this.lockAcquired=!0;const s=t();for(this.pendingInLock.push((async()=>{try{await s}catch{}})()),await s;this.pendingInLock.length;){const n=[...this.pendingInLock];await Promise.all(n),this.pendingInLock.splice(0,n.length)}return await s}finally{this._debug("#_acquireLock","lock released for storage key",this.storageKey),this.lockAcquired=!1}})}finally{this._debug("#_acquireLock","end")}}async _useSession(e){this._debug("#_useSession","begin");try{const t=await this.__loadSession();return await e(t)}finally{this._debug("#_useSession","end")}}async __loadSession(){this._debug("#__loadSession()","begin"),this.lockAcquired||this._debug("#__loadSession()","used outside of an acquired lock!",new Error().stack);try{let e=null;const t=await le(this.storage,this.storageKey);if(this._debug("#getSession()","session from storage",t),t!==null&&(this._isValidSession(t)?e=t:(this._debug("#getSession()","session from storage is not valid"),await this._removeSession())),!e)return{data:{session:null},error:null};const s=e.expires_at?e.expires_at*1e3-Date.now()<gt:!1;if(this._debug("#__loadSession()",`session has${s?"":" not"} expired`,"expires_at",e.expires_at),!s){if(this.userStorage){const i=await le(this.userStorage,this.storageKey+"-user");i!=null&&i.user?e.user=i.user:e.user=mt()}if(this.storage.isServer&&e.user&&!e.user.__isUserNotAvailableProxy){const i={value:this.suppressGetSessionWarning};e.user=Ua(e.user,i),i.value&&(this.suppressGetSessionWarning=!0)}return{data:{session:e},error:null}}const{data:n,error:a}=await this._callRefreshToken(e.refresh_token);return a?this._returnResult({data:{session:null},error:a}):this._returnResult({data:{session:n},error:null})}finally{this._debug("#__loadSession()","end")}}async getUser(e){if(e)return await this._getUser(e);await this.initializePromise;const t=await this._acquireLock(-1,async()=>await this._getUser());return t.data.user&&(this.suppressGetSessionWarning=!0),t}async _getUser(e){try{return e?await O(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:e,xform:ae}):await this._useSession(async t=>{var s,n,a;const{data:i,error:o}=t;if(o)throw o;return!(!((s=i.session)===null||s===void 0)&&s.access_token)&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new H}:await O(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:(a=(n=i.session)===null||n===void 0?void 0:n.access_token)!==null&&a!==void 0?a:void 0,xform:ae})})}catch(t){if(T(t))return Ps(t)&&(await this._removeSession(),await z(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({data:{user:null},error:t});throw t}}async updateUser(e,t={}){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._updateUser(e,t))}async _updateUser(e,t={}){try{return await this._useSession(async s=>{const{data:n,error:a}=s;if(a)throw a;if(!n.session)throw new H;const i=n.session;let o=null,l=null;this.flowType==="pkce"&&e.email!=null&&([o,l]=await me(this.storage,this.storageKey));const{data:c,error:u}=await O(this.fetch,"PUT",`${this.url}/user`,{headers:this.headers,redirectTo:t==null?void 0:t.emailRedirectTo,body:Object.assign(Object.assign({},e),{code_challenge:o,code_challenge_method:l}),jwt:i.access_token,xform:ae});if(u)throw u;return i.user=c.user,await this._saveSession(i),await this._notifyAllSubscribers("USER_UPDATED",i),this._returnResult({data:{user:i.user},error:null})})}catch(s){if(await z(this.storage,`${this.storageKey}-code-verifier`),T(s))return this._returnResult({data:{user:null},error:s});throw s}}async setSession(e){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._setSession(e))}async _setSession(e){try{if(!e.access_token||!e.refresh_token)throw new H;const t=Date.now()/1e3;let s=t,n=!0,a=null;const{payload:i}=vt(e.access_token);if(i.exp&&(s=i.exp,n=s<=t),n){const{data:o,error:l}=await this._callRefreshToken(e.refresh_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});if(!o)return{data:{user:null,session:null},error:null};a=o}else{const{data:o,error:l}=await this._getUser(e.access_token);if(l)throw l;a={access_token:e.access_token,refresh_token:e.refresh_token,user:o.user,token_type:"bearer",expires_in:s-t,expires_at:s},await this._saveSession(a),await this._notifyAllSubscribers("SIGNED_IN",a)}return this._returnResult({data:{user:a.user,session:a},error:null})}catch(t){if(T(t))return this._returnResult({data:{session:null,user:null},error:t});throw t}}async refreshSession(e){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._refreshSession(e))}async _refreshSession(e){try{return await this._useSession(async t=>{var s;if(!e){const{data:i,error:o}=t;if(o)throw o;e=(s=i.session)!==null&&s!==void 0?s:void 0}if(!(e!=null&&e.refresh_token))throw new H;const{data:n,error:a}=await this._callRefreshToken(e.refresh_token);return a?this._returnResult({data:{user:null,session:null},error:a}):n?this._returnResult({data:{user:n.user,session:n},error:null}):this._returnResult({data:{user:null,session:null},error:null})})}catch(t){if(T(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async _getSessionFromURL(e,t){try{if(!N())throw new Ae("No browser detected.");if(e.error||e.error_description||e.error_code)throw new Ae(e.error_description||"Error in URL with unspecified error_description",{error:e.error||"unspecified_error",code:e.error_code||"unspecified_code"});switch(t){case"implicit":if(this.flowType==="pkce")throw new Pt("Not a valid PKCE flow url.");break;case"pkce":if(this.flowType==="implicit")throw new Ae("Not a valid implicit grant flow url.");break;default:}if(t==="pkce"){if(this._debug("#_initialize()","begin","is PKCE flow",!0),!e.code)throw new Pt("No code detected.");const{data:b,error:y}=await this._exchangeCodeForSession(e.code);if(y)throw y;const x=new URL(window.location.href);return x.searchParams.delete("code"),window.history.replaceState(window.history.state,"",x.toString()),{data:{session:b.session,redirectType:null},error:null}}const{provider_token:s,provider_refresh_token:n,access_token:a,refresh_token:i,expires_in:o,expires_at:l,token_type:c}=e;if(!a||!o||!i||!c)throw new Ae("No session defined in URL");const u=Math.round(Date.now()/1e3),f=parseInt(o);let d=u+f;l&&(d=parseInt(l));const h=d-u;h*1e3<=we&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${h}s, should have been closer to ${f}s`);const p=d-f;u-p>=120?console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",p,d,u):u-p<0&&console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",p,d,u);const{data:g,error:v}=await this._getUser(a);if(v)throw v;const m={provider_token:s,provider_refresh_token:n,access_token:a,expires_in:f,expires_at:d,refresh_token:i,token_type:c,user:g.user};return window.location.hash="",this._debug("#_getSessionFromURL()","clearing window.location.hash"),this._returnResult({data:{session:m,redirectType:e.type},error:null})}catch(s){if(T(s))return this._returnResult({data:{session:null,redirectType:null},error:s});throw s}}_isImplicitGrantCallback(e){return!!(e.access_token||e.error_description)}async _isPKCECallback(e){const t=await le(this.storage,`${this.storageKey}-code-verifier`);return!!(e.code&&t)}async signOut(e={scope:"global"}){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._signOut(e))}async _signOut({scope:e}={scope:"global"}){return await this._useSession(async t=>{var s;const{data:n,error:a}=t;if(a)return this._returnResult({error:a});const i=(s=n.session)===null||s===void 0?void 0:s.access_token;if(i){const{error:o}=await this.admin.signOut(i,e);if(o&&!(Rs(o)&&(o.status===404||o.status===401||o.status===403)))return this._returnResult({error:o})}return e!=="others"&&(await this._removeSession(),await z(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({error:null})})}onAuthStateChange(e){const t=ja(),s={id:t,callback:e,unsubscribe:()=>{this._debug("#unsubscribe()","state change callback with id removed",t),this.stateChangeEmitters.delete(t)}};return this._debug("#onAuthStateChange()","registered callback with id",t),this.stateChangeEmitters.set(t,s),(async()=>(await this.initializePromise,await this._acquireLock(-1,async()=>{this._emitInitialSession(t)})))(),{data:{subscription:s}}}async _emitInitialSession(e){return await this._useSession(async t=>{var s,n;try{const{data:{session:a},error:i}=t;if(i)throw i;await((s=this.stateChangeEmitters.get(e))===null||s===void 0?void 0:s.callback("INITIAL_SESSION",a)),this._debug("INITIAL_SESSION","callback id",e,"session",a)}catch(a){await((n=this.stateChangeEmitters.get(e))===null||n===void 0?void 0:n.callback("INITIAL_SESSION",null)),this._debug("INITIAL_SESSION","callback id",e,"error",a),console.error(a)}})}async resetPasswordForEmail(e,t={}){let s=null,n=null;this.flowType==="pkce"&&([s,n]=await me(this.storage,this.storageKey,!0));try{return await O(this.fetch,"POST",`${this.url}/recover`,{body:{email:e,code_challenge:s,code_challenge_method:n,gotrue_meta_security:{captcha_token:t.captchaToken}},headers:this.headers,redirectTo:t.redirectTo})}catch(a){if(await z(this.storage,`${this.storageKey}-code-verifier`),T(a))return this._returnResult({data:null,error:a});throw a}}async getUserIdentities(){var e;try{const{data:t,error:s}=await this.getUser();if(s)throw s;return this._returnResult({data:{identities:(e=t.user.identities)!==null&&e!==void 0?e:[]},error:null})}catch(t){if(T(t))return this._returnResult({data:null,error:t});throw t}}async linkIdentity(e){return"token"in e?this.linkIdentityIdToken(e):this.linkIdentityOAuth(e)}async linkIdentityOAuth(e){var t;try{const{data:s,error:n}=await this._useSession(async a=>{var i,o,l,c,u;const{data:f,error:d}=a;if(d)throw d;const h=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,e.provider,{redirectTo:(i=e.options)===null||i===void 0?void 0:i.redirectTo,scopes:(o=e.options)===null||o===void 0?void 0:o.scopes,queryParams:(l=e.options)===null||l===void 0?void 0:l.queryParams,skipBrowserRedirect:!0});return await O(this.fetch,"GET",h,{headers:this.headers,jwt:(u=(c=f.session)===null||c===void 0?void 0:c.access_token)!==null&&u!==void 0?u:void 0})});if(n)throw n;return N()&&!(!((t=e.options)===null||t===void 0)&&t.skipBrowserRedirect)&&window.location.assign(s==null?void 0:s.url),this._returnResult({data:{provider:e.provider,url:s==null?void 0:s.url},error:null})}catch(s){if(T(s))return this._returnResult({data:{provider:e.provider,url:null},error:s});throw s}}async linkIdentityIdToken(e){return await this._useSession(async t=>{var s;try{const{error:n,data:{session:a}}=t;if(n)throw n;const{options:i,provider:o,token:l,access_token:c,nonce:u}=e,f=await O(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,jwt:(s=a==null?void 0:a.access_token)!==null&&s!==void 0?s:void 0,body:{provider:o,id_token:l,access_token:c,nonce:u,link_identity:!0,gotrue_meta_security:{captcha_token:i==null?void 0:i.captchaToken}},xform:J}),{data:d,error:h}=f;return h?this._returnResult({data:{user:null,session:null},error:h}):!d||!d.session||!d.user?this._returnResult({data:{user:null,session:null},error:new ce}):(d.session&&(await this._saveSession(d.session),await this._notifyAllSubscribers("USER_UPDATED",d.session)),this._returnResult({data:d,error:h}))}catch(n){if(await z(this.storage,`${this.storageKey}-code-verifier`),T(n))return this._returnResult({data:{user:null,session:null},error:n});throw n}})}async unlinkIdentity(e){try{return await this._useSession(async t=>{var s,n;const{data:a,error:i}=t;if(i)throw i;return await O(this.fetch,"DELETE",`${this.url}/user/identities/${e.identity_id}`,{headers:this.headers,jwt:(n=(s=a.session)===null||s===void 0?void 0:s.access_token)!==null&&n!==void 0?n:void 0})})}catch(t){if(T(t))return this._returnResult({data:null,error:t});throw t}}async _refreshAccessToken(e){const t=`#_refreshAccessToken(${e.substring(0,5)}...)`;this._debug(t,"begin");try{const s=Date.now();return await Aa(async n=>(n>0&&await Ca(200*Math.pow(2,n-1)),this._debug(t,"refreshing attempt",n),await O(this.fetch,"POST",`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:e},headers:this.headers,xform:J})),(n,a)=>{const i=200*Math.pow(2,n);return a&&Ge(a)&&Date.now()+i-s<we})}catch(s){if(this._debug(t,"error",s),T(s))return this._returnResult({data:{session:null,user:null},error:s});throw s}finally{this._debug(t,"end")}}_isValidSession(e){return typeof e=="object"&&e!==null&&"access_token"in e&&"refresh_token"in e&&"expires_at"in e}async _handleProviderSignIn(e,t){const s=await this._getUrlForProvider(`${this.url}/authorize`,e,{redirectTo:t.redirectTo,scopes:t.scopes,queryParams:t.queryParams});return this._debug("#_handleProviderSignIn()","provider",e,"options",t,"url",s),N()&&!t.skipBrowserRedirect&&window.location.assign(s),{data:{provider:e,url:s},error:null}}async _recoverAndRefresh(){var e,t;const s="#_recoverAndRefresh()";this._debug(s,"begin");try{const n=await le(this.storage,this.storageKey);if(n&&this.userStorage){let i=await le(this.userStorage,this.storageKey+"-user");!this.storage.isServer&&Object.is(this.storage,this.userStorage)&&!i&&(i={user:n.user},await _e(this.userStorage,this.storageKey+"-user",i)),n.user=(e=i==null?void 0:i.user)!==null&&e!==void 0?e:mt()}else if(n&&!n.user&&!n.user){const i=await le(this.storage,this.storageKey+"-user");i&&(i!=null&&i.user)?(n.user=i.user,await z(this.storage,this.storageKey+"-user"),await _e(this.storage,this.storageKey,n)):n.user=mt()}if(this._debug(s,"session from storage",n),!this._isValidSession(n)){this._debug(s,"session is not valid"),n!==null&&await this._removeSession();return}const a=((t=n.expires_at)!==null&&t!==void 0?t:1/0)*1e3-Date.now()<gt;if(this._debug(s,`session has${a?"":" not"} expired with margin of ${gt}s`),a){if(this.autoRefreshToken&&n.refresh_token){const{error:i}=await this._callRefreshToken(n.refresh_token);i&&(console.error(i),Ge(i)||(this._debug(s,"refresh failed with a non-retryable error, removing the session",i),await this._removeSession()))}}else if(n.user&&n.user.__isUserNotAvailableProxy===!0)try{const{data:i,error:o}=await this._getUser(n.access_token);!o&&(i!=null&&i.user)?(n.user=i.user,await this._saveSession(n),await this._notifyAllSubscribers("SIGNED_IN",n)):this._debug(s,"could not get user data, skipping SIGNED_IN notification")}catch(i){console.error("Error getting user data:",i),this._debug(s,"error getting user data, skipping SIGNED_IN notification",i)}else await this._notifyAllSubscribers("SIGNED_IN",n)}catch(n){this._debug(s,"error",n),console.error(n);return}finally{this._debug(s,"end")}}async _callRefreshToken(e){var t,s;if(!e)throw new H;if(this.refreshingDeferred)return this.refreshingDeferred.promise;const n=`#_callRefreshToken(${e.substring(0,5)}...)`;this._debug(n,"begin");try{this.refreshingDeferred=new ut;const{data:a,error:i}=await this._refreshAccessToken(e);if(i)throw i;if(!a.session)throw new H;await this._saveSession(a.session),await this._notifyAllSubscribers("TOKEN_REFRESHED",a.session);const o={data:a.session,error:null};return this.refreshingDeferred.resolve(o),o}catch(a){if(this._debug(n,"error",a),T(a)){const i={data:null,error:a};return Ge(a)||await this._removeSession(),(t=this.refreshingDeferred)===null||t===void 0||t.resolve(i),i}throw(s=this.refreshingDeferred)===null||s===void 0||s.reject(a),a}finally{this.refreshingDeferred=null,this._debug(n,"end")}}async _notifyAllSubscribers(e,t,s=!0){const n=`#_notifyAllSubscribers(${e})`;this._debug(n,"begin",t,`broadcast = ${s}`);try{this.broadcastChannel&&s&&this.broadcastChannel.postMessage({event:e,session:t});const a=[],i=Array.from(this.stateChangeEmitters.values()).map(async o=>{try{await o.callback(e,t)}catch(l){a.push(l)}});if(await Promise.all(i),a.length>0){for(let o=0;o<a.length;o+=1)console.error(a[o]);throw a[0]}}finally{this._debug(n,"end")}}async _saveSession(e){this._debug("#_saveSession()",e),this.suppressGetSessionWarning=!0,await z(this.storage,`${this.storageKey}-code-verifier`);const t=Object.assign({},e),s=t.user&&t.user.__isUserNotAvailableProxy===!0;if(this.userStorage){!s&&t.user&&await _e(this.userStorage,this.storageKey+"-user",{user:t.user});const n=Object.assign({},t);delete n.user;const a=ar(n);await _e(this.storage,this.storageKey,a)}else{const n=ar(t);await _e(this.storage,this.storageKey,n)}}async _removeSession(){this._debug("#_removeSession()"),this.suppressGetSessionWarning=!1,await z(this.storage,this.storageKey),await z(this.storage,this.storageKey+"-code-verifier"),await z(this.storage,this.storageKey+"-user"),this.userStorage&&await z(this.userStorage,this.storageKey+"-user"),await this._notifyAllSubscribers("SIGNED_OUT",null)}_removeVisibilityChangedCallback(){this._debug("#_removeVisibilityChangedCallback()");const e=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{e&&N()&&(window!=null&&window.removeEventListener)&&window.removeEventListener("visibilitychange",e)}catch(t){console.error("removing visibilitychange callback failed",t)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug("#_startAutoRefresh()");const e=setInterval(()=>this._autoRefreshTokenTick(),we);this.autoRefreshTicker=e,e&&typeof e=="object"&&typeof e.unref=="function"?e.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(e),setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0)}async _stopAutoRefresh(){this._debug("#_stopAutoRefresh()");const e=this.autoRefreshTicker;this.autoRefreshTicker=null,e&&clearInterval(e)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async _autoRefreshTokenTick(){this._debug("#_autoRefreshTokenTick()","begin");try{await this._acquireLock(0,async()=>{try{const e=Date.now();try{return await this._useSession(async t=>{const{data:{session:s}}=t;if(!s||!s.refresh_token||!s.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const n=Math.floor((s.expires_at*1e3-e)/we);this._debug("#_autoRefreshTokenTick()",`access token expires in ${n} ticks, a tick lasts ${we}ms, refresh threshold is ${At} ticks`),n<=At&&await this._callRefreshToken(s.refresh_token)})}catch(t){console.error("Auto refresh tick failed with error. This is likely a transient error.",t)}}finally{this._debug("#_autoRefreshTokenTick()","end")}})}catch(e){if(e.isAcquireTimeout||e instanceof Ht)this._debug("auto refresh token tick lock not available");else throw e}}async _handleVisibilityChange(){if(this._debug("#_handleVisibilityChange()"),!N()||!(window!=null&&window.addEventListener))return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>await this._onVisibilityChanged(!1),window==null||window.addEventListener("visibilitychange",this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(e){console.error("_handleVisibilityChange",e)}}async _onVisibilityChanged(e){const t=`#_onVisibilityChanged(${e})`;this._debug(t,"visibilityState",document.visibilityState),document.visibilityState==="visible"?(this.autoRefreshToken&&this._startAutoRefresh(),e||(await this.initializePromise,await this._acquireLock(-1,async()=>{if(document.visibilityState!=="visible"){this._debug(t,"acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");return}await this._recoverAndRefresh()}))):document.visibilityState==="hidden"&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(e,t,s){const n=[`provider=${encodeURIComponent(t)}`];if(s!=null&&s.redirectTo&&n.push(`redirect_to=${encodeURIComponent(s.redirectTo)}`),s!=null&&s.scopes&&n.push(`scopes=${encodeURIComponent(s.scopes)}`),this.flowType==="pkce"){const[a,i]=await me(this.storage,this.storageKey),o=new URLSearchParams({code_challenge:`${encodeURIComponent(a)}`,code_challenge_method:`${encodeURIComponent(i)}`});n.push(o.toString())}if(s!=null&&s.queryParams){const a=new URLSearchParams(s.queryParams);n.push(a.toString())}return s!=null&&s.skipBrowserRedirect&&n.push(`skip_http_redirect=${s.skipBrowserRedirect}`),`${e}?${n.join("&")}`}async _unenroll(e){try{return await this._useSession(async t=>{var s;const{data:n,error:a}=t;return a?this._returnResult({data:null,error:a}):await O(this.fetch,"DELETE",`${this.url}/factors/${e.factorId}`,{headers:this.headers,jwt:(s=n==null?void 0:n.session)===null||s===void 0?void 0:s.access_token})})}catch(t){if(T(t))return this._returnResult({data:null,error:t});throw t}}async _enroll(e){try{return await this._useSession(async t=>{var s,n;const{data:a,error:i}=t;if(i)return this._returnResult({data:null,error:i});const o=Object.assign({friendly_name:e.friendlyName,factor_type:e.factorType},e.factorType==="phone"?{phone:e.phone}:e.factorType==="totp"?{issuer:e.issuer}:{}),{data:l,error:c}=await O(this.fetch,"POST",`${this.url}/factors`,{body:o,headers:this.headers,jwt:(s=a==null?void 0:a.session)===null||s===void 0?void 0:s.access_token});return c?this._returnResult({data:null,error:c}):(e.factorType==="totp"&&l.type==="totp"&&(!((n=l==null?void 0:l.totp)===null||n===void 0)&&n.qr_code)&&(l.totp.qr_code=`data:image/svg+xml;utf-8,${l.totp.qr_code}`),this._returnResult({data:l,error:null}))})}catch(t){if(T(t))return this._returnResult({data:null,error:t});throw t}}async _verify(e){return this._acquireLock(-1,async()=>{try{return await this._useSession(async t=>{var s;const{data:n,error:a}=t;if(a)return this._returnResult({data:null,error:a});const i=Object.assign({challenge_id:e.challengeId},"webauthn"in e?{webauthn:Object.assign(Object.assign({},e.webauthn),{credential_response:e.webauthn.type==="create"?ai(e.webauthn.credential_response):ii(e.webauthn.credential_response)})}:{code:e.code}),{data:o,error:l}=await O(this.fetch,"POST",`${this.url}/factors/${e.factorId}/verify`,{body:i,headers:this.headers,jwt:(s=n==null?void 0:n.session)===null||s===void 0?void 0:s.access_token});return l?this._returnResult({data:null,error:l}):(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+o.expires_in},o)),await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED",o),this._returnResult({data:o,error:l}))})}catch(t){if(T(t))return this._returnResult({data:null,error:t});throw t}})}async _challenge(e){return this._acquireLock(-1,async()=>{try{return await this._useSession(async t=>{var s;const{data:n,error:a}=t;if(a)return this._returnResult({data:null,error:a});const i=await O(this.fetch,"POST",`${this.url}/factors/${e.factorId}/challenge`,{body:e,headers:this.headers,jwt:(s=n==null?void 0:n.session)===null||s===void 0?void 0:s.access_token});if(i.error)return i;const{data:o}=i;if(o.type!=="webauthn")return{data:o,error:null};switch(o.webauthn.type){case"create":return{data:Object.assign(Object.assign({},o),{webauthn:Object.assign(Object.assign({},o.webauthn),{credential_options:Object.assign(Object.assign({},o.webauthn.credential_options),{publicKey:si(o.webauthn.credential_options.publicKey)})})}),error:null};case"request":return{data:Object.assign(Object.assign({},o),{webauthn:Object.assign(Object.assign({},o.webauthn),{credential_options:Object.assign(Object.assign({},o.webauthn.credential_options),{publicKey:ni(o.webauthn.credential_options.publicKey)})})}),error:null}}})}catch(t){if(T(t))return this._returnResult({data:null,error:t});throw t}})}async _challengeAndVerify(e){const{data:t,error:s}=await this._challenge({factorId:e.factorId});return s?this._returnResult({data:null,error:s}):await this._verify({factorId:e.factorId,challengeId:t.id,code:e.code})}async _listFactors(){var e;const{data:{user:t},error:s}=await this.getUser();if(s)return{data:null,error:s};const n={all:[],phone:[],totp:[],webauthn:[]};for(const a of(e=t==null?void 0:t.factors)!==null&&e!==void 0?e:[])n.all.push(a),a.status==="verified"&&n[a.factor_type].push(a);return{data:n,error:null}}async _getAuthenticatorAssuranceLevel(){var e,t;const{data:{session:s},error:n}=await this.getSession();if(n)return this._returnResult({data:null,error:n});if(!s)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};const{payload:a}=vt(s.access_token);let i=null;a.aal&&(i=a.aal);let o=i;((t=(e=s.user.factors)===null||e===void 0?void 0:e.filter(u=>u.status==="verified"))!==null&&t!==void 0?t:[]).length>0&&(o="aal2");const c=a.amr||[];return{data:{currentLevel:i,nextLevel:o,currentAuthenticationMethods:c},error:null}}async _getAuthorizationDetails(e){try{return await this._useSession(async t=>{const{data:{session:s},error:n}=t;return n?this._returnResult({data:null,error:n}):s?await O(this.fetch,"GET",`${this.url}/oauth/authorizations/${e}`,{headers:this.headers,jwt:s.access_token,xform:a=>({data:a,error:null})}):this._returnResult({data:null,error:new H})})}catch(t){if(T(t))return this._returnResult({data:null,error:t});throw t}}async _approveAuthorization(e,t){try{return await this._useSession(async s=>{const{data:{session:n},error:a}=s;if(a)return this._returnResult({data:null,error:a});if(!n)return this._returnResult({data:null,error:new H});const i=await O(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:n.access_token,body:{action:"approve"},xform:o=>({data:o,error:null})});return i.data&&i.data.redirect_url&&N()&&!(t!=null&&t.skipBrowserRedirect)&&window.location.assign(i.data.redirect_url),i})}catch(s){if(T(s))return this._returnResult({data:null,error:s});throw s}}async _denyAuthorization(e,t){try{return await this._useSession(async s=>{const{data:{session:n},error:a}=s;if(a)return this._returnResult({data:null,error:a});if(!n)return this._returnResult({data:null,error:new H});const i=await O(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:n.access_token,body:{action:"deny"},xform:o=>({data:o,error:null})});return i.data&&i.data.redirect_url&&N()&&!(t!=null&&t.skipBrowserRedirect)&&window.location.assign(i.data.redirect_url),i})}catch(s){if(T(s))return this._returnResult({data:null,error:s});throw s}}async _listOAuthGrants(){try{return await this._useSession(async e=>{const{data:{session:t},error:s}=e;return s?this._returnResult({data:null,error:s}):t?await O(this.fetch,"GET",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:t.access_token,xform:n=>({data:n,error:null})}):this._returnResult({data:null,error:new H})})}catch(e){if(T(e))return this._returnResult({data:null,error:e});throw e}}async _revokeOAuthGrant(e){try{return await this._useSession(async t=>{const{data:{session:s},error:n}=t;return n?this._returnResult({data:null,error:n}):s?(await O(this.fetch,"DELETE",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:s.access_token,query:{client_id:e.clientId},noResolveJson:!0}),{data:{},error:null}):this._returnResult({data:null,error:new H})})}catch(t){if(T(t))return this._returnResult({data:null,error:t});throw t}}async fetchJwk(e,t={keys:[]}){let s=t.keys.find(o=>o.kid===e);if(s)return s;const n=Date.now();if(s=this.jwks.keys.find(o=>o.kid===e),s&&this.jwks_cached_at+ya>n)return s;const{data:a,error:i}=await O(this.fetch,"GET",`${this.url}/.well-known/jwks.json`,{headers:this.headers});if(i)throw i;return!a.keys||a.keys.length===0||(this.jwks=a,this.jwks_cached_at=n,s=a.keys.find(o=>o.kid===e),!s)?null:s}async getClaims(e,t={}){try{let s=e;if(!s){const{data:h,error:p}=await this.getSession();if(p||!h.session)return this._returnResult({data:null,error:p});s=h.session.access_token}const{header:n,payload:a,signature:i,raw:{header:o,payload:l}}=vt(s);t!=null&&t.allowExpired||Na(a.exp);const c=!n.alg||n.alg.startsWith("HS")||!n.kid||!("crypto"in globalThis&&"subtle"in globalThis.crypto)?null:await this.fetchJwk(n.kid,t!=null&&t.keys?{keys:t.keys}:t==null?void 0:t.jwks);if(!c){const{error:h}=await this.getUser(s);if(h)throw h;return{data:{claims:a,header:n,signature:i},error:null}}const u=Ma(n.alg),f=await crypto.subtle.importKey("jwk",c,u,!0,["verify"]);if(!await crypto.subtle.verify(u,f,i,Ea(`${o}.${l}`)))throw new tt("Invalid JWT signature");return{data:{claims:a,header:n,signature:i},error:null}}catch(s){if(T(s))return this._returnResult({data:null,error:s});throw s}}};Vt.nextInstanceID={};const gi=Dt,vi=Vt,mi=Object.freeze(Object.defineProperty({__proto__:null,AuthAdminApi:gi,AuthApiError:As,AuthClient:vi,AuthError:Se,AuthImplicitGrantRedirectError:Ae,AuthInvalidCredentialsError:Ce,AuthInvalidJwtError:tt,AuthInvalidTokenResponseError:ce,AuthPKCEGrantCodeExchangeError:Pt,AuthRetryableFetchError:et,AuthSessionMissingError:H,AuthUnknownError:ne,AuthWeakPasswordError:$t,CustomAuthError:re,GoTrueAdminApi:Dt,GoTrueClient:Vt,NavigatorLockAcquireTimeoutError:Ns,SIGN_OUT_SCOPES:We,isAuthApiError:Rs,isAuthError:T,isAuthImplicitGrantRedirectError:$s,isAuthRetryableFetchError:Ge,isAuthSessionMissingError:Ps,isAuthWeakPasswordError:ba,lockInternals:ue,navigatorLock:Ms,processLock:Wa},Symbol.toStringTag,{value:"Module"})),qs=$e(mi);Object.defineProperty(dt,"__esModule",{value:!0});dt.SupabaseAuthClient=void 0;const yi=qs;class bi extends yi.AuthClient{constructor(e){super(e)}}dt.SupabaseAuthClient=bi;Object.defineProperty(Je,"__esModule",{value:!0});const wi=Fr,_i=B,xi=us,ki=ca,Ve=Ss,Ei=js,pr=ie,Si=dt;let ji=class{constructor(e,t,s){var n,a,i;this.supabaseUrl=e,this.supabaseKey=t;const o=(0,pr.validateSupabaseUrl)(e);if(!t)throw new Error("supabaseKey is required.");this.realtimeUrl=new URL("realtime/v1",o),this.realtimeUrl.protocol=this.realtimeUrl.protocol.replace("http","ws"),this.authUrl=new URL("auth/v1",o),this.storageUrl=new URL("storage/v1",o),this.functionsUrl=new URL("functions/v1",o);const l=`sb-${o.hostname.split(".")[0]}-auth-token`,c={db:Ve.DEFAULT_DB_OPTIONS,realtime:Ve.DEFAULT_REALTIME_OPTIONS,auth:Object.assign(Object.assign({},Ve.DEFAULT_AUTH_OPTIONS),{storageKey:l}),global:Ve.DEFAULT_GLOBAL_OPTIONS},u=(0,pr.applySettingDefaults)(s??{},c);this.storageKey=(n=u.auth.storageKey)!==null&&n!==void 0?n:"",this.headers=(a=u.global.headers)!==null&&a!==void 0?a:{},u.accessToken?(this.accessToken=u.accessToken,this.auth=new Proxy({},{get:(f,d)=>{throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(d)} is not possible`)}})):this.auth=this._initSupabaseAuthClient((i=u.auth)!==null&&i!==void 0?i:{},this.headers,u.global.fetch),this.fetch=(0,Ei.fetchWithAuth)(t,this._getAccessToken.bind(this),u.global.fetch),this.realtime=this._initRealtimeClient(Object.assign({headers:this.headers,accessToken:this._getAccessToken.bind(this)},u.realtime)),this.accessToken&&this.accessToken().then(f=>this.realtime.setAuth(f)).catch(f=>console.warn("Failed to set initial Realtime auth token:",f)),this.rest=new _i.PostgrestClient(new URL("rest/v1",o).href,{headers:this.headers,schema:u.db.schema,fetch:this.fetch}),this.storage=new ki.StorageClient(this.storageUrl.href,this.headers,this.fetch,s==null?void 0:s.storage),u.accessToken||this._listenForAuthEvents()}get functions(){return new wi.FunctionsClient(this.functionsUrl.href,{headers:this.headers,customFetch:this.fetch})}from(e){return this.rest.from(e)}schema(e){return this.rest.schema(e)}rpc(e,t={},s={head:!1,get:!1,count:void 0}){return this.rest.rpc(e,t,s)}channel(e,t={config:{}}){return this.realtime.channel(e,t)}getChannels(){return this.realtime.getChannels()}removeChannel(e){return this.realtime.removeChannel(e)}removeAllChannels(){return this.realtime.removeAllChannels()}async _getAccessToken(){var e,t;if(this.accessToken)return await this.accessToken();const{data:s}=await this.auth.getSession();return(t=(e=s.session)===null||e===void 0?void 0:e.access_token)!==null&&t!==void 0?t:this.supabaseKey}_initSupabaseAuthClient({autoRefreshToken:e,persistSession:t,detectSessionInUrl:s,storage:n,userStorage:a,storageKey:i,flowType:o,lock:l,debug:c,throwOnError:u},f,d){const h={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new Si.SupabaseAuthClient({url:this.authUrl.href,headers:Object.assign(Object.assign({},h),f),storageKey:i,autoRefreshToken:e,persistSession:t,detectSessionInUrl:s,storage:n,userStorage:a,flowType:o,lock:l,debug:c,throwOnError:u,fetch:d,hasCustomAuthorizationHeader:Object.keys(this.headers).some(p=>p.toLowerCase()==="authorization")})}_initRealtimeClient(e){return new xi.RealtimeClient(this.realtimeUrl.href,Object.assign(Object.assign({},e),{params:Object.assign({apikey:this.supabaseKey},e==null?void 0:e.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((t,s)=>{this._handleTokenChanged(t,"CLIENT",s==null?void 0:s.access_token)})}_handleTokenChanged(e,t,s){(e==="TOKEN_REFRESHED"||e==="SIGNED_IN")&&this.changedAccessToken!==s?(this.changedAccessToken=s,this.realtime.setAuth(s)):e==="SIGNED_OUT"&&(this.realtime.setAuth(),t=="STORAGE"&&this.auth.signOut(),this.changedAccessToken=void 0)}};Je.default=ji;(function(r){var e=ge&&ge.__createBinding||(Object.create?function(u,f,d,h){h===void 0&&(h=d);var p=Object.getOwnPropertyDescriptor(f,d);(!p||("get"in p?!f.__esModule:p.writable||p.configurable))&&(p={enumerable:!0,get:function(){return f[d]}}),Object.defineProperty(u,h,p)}:function(u,f,d,h){h===void 0&&(h=d),u[h]=f[d]}),t=ge&&ge.__exportStar||function(u,f){for(var d in u)d!=="default"&&!Object.prototype.hasOwnProperty.call(f,d)&&e(f,u,d)},s=ge&&ge.__importDefault||function(u){return u&&u.__esModule?u:{default:u}};Object.defineProperty(r,"__esModule",{value:!0}),r.createClient=r.SupabaseClient=r.FunctionRegion=r.FunctionsError=r.FunctionsRelayError=r.FunctionsFetchError=r.FunctionsHttpError=r.PostgrestError=void 0;const n=s(Je);t(qs,r);var a=B;Object.defineProperty(r,"PostgrestError",{enumerable:!0,get:function(){return a.PostgrestError}});var i=Fr;Object.defineProperty(r,"FunctionsHttpError",{enumerable:!0,get:function(){return i.FunctionsHttpError}}),Object.defineProperty(r,"FunctionsFetchError",{enumerable:!0,get:function(){return i.FunctionsFetchError}}),Object.defineProperty(r,"FunctionsRelayError",{enumerable:!0,get:function(){return i.FunctionsRelayError}}),Object.defineProperty(r,"FunctionsError",{enumerable:!0,get:function(){return i.FunctionsError}}),Object.defineProperty(r,"FunctionRegion",{enumerable:!0,get:function(){return i.FunctionRegion}}),t(us,r);var o=Je;Object.defineProperty(r,"SupabaseClient",{enumerable:!0,get:function(){return s(o).default}});const l=(u,f,d)=>new n.default(u,f,d);r.createClient=l;function c(){if(typeof window<"u"||typeof process>"u")return!1;const u=process.version;if(u==null)return!1;const f=u.match(/^v(\d+)\./);return f?parseInt(f[1],10)<=18:!1}c()&&console.warn("⚠️  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217")})(Lt);const Ds=un(Lt),Ti=ln({__proto__:null,default:Ds},[Lt]),{PostgrestError:So,FunctionsHttpError:jo,FunctionsFetchError:To,FunctionsRelayError:Oo,FunctionsError:Co,FunctionRegion:Ao,SupabaseClient:Ro,createClient:Oi,GoTrueAdminApi:Po,GoTrueClient:$o,AuthAdminApi:Io,AuthClient:Lo,navigatorLock:zo,NavigatorLockAcquireTimeoutError:No,lockInternals:Mo,processLock:Bo,SIGN_OUT_SCOPES:Uo,AuthError:qo,AuthApiError:Do,AuthUnknownError:Ho,CustomAuthError:Vo,AuthSessionMissingError:Fo,AuthInvalidTokenResponseError:Ko,AuthInvalidCredentialsError:Go,AuthImplicitGrantRedirectError:Wo,AuthPKCEGrantCodeExchangeError:Jo,AuthRetryableFetchError:Yo,AuthWeakPasswordError:Qo,AuthInvalidJwtError:Xo,isAuthError:Zo,isAuthApiError:el,isAuthSessionMissingError:tl,isAuthImplicitGrantRedirectError:rl,isAuthRetryableFetchError:sl,isAuthWeakPasswordError:nl,RealtimePresence:al,RealtimeChannel:il,RealtimeClient:ol,REALTIME_LISTEN_TYPES:ll,REALTIME_POSTGRES_CHANGES_LISTEN_EVENT:cl,REALTIME_PRESENCE_LISTEN_EVENTS:dl,REALTIME_SUBSCRIBE_STATES:ul,REALTIME_CHANNEL_STATES:hl}=Ds||Ti,Ci="https://gcpgmzewvaclbxeyvjng.supabase.co",Ai="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjcGdtemV3dmFjbGJ4ZXl2am5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5NTczMzQsImV4cCI6MjA4MDUzMzMzNH0.MsapRRGwXMwadiSTWedBP87jm7HQL4LV0EFI5ENDnJM",Y=Oi(Ci,Ai),W=Object.freeze(Object.defineProperty({__proto__:null,supabase:Y},Symbol.toStringTag,{value:"Module"})),C={services:[{id:"pojasevi",name:"Ugradnja pojaseva",icon:"🔧",description:"Profesionalna ugradnja sigurnosnih pojaseva. Možete donijeti i rastavljeni sustav za pojaseve.",sellingPoints:["Certificirana ugradnja","Garancija na rad","Brza i precizna usluga","Podrška za sve modele"],images:["/images/service-seatbelt-1.jpg","/images/service-seatbelt-2.jpg"]},{id:"zvjezdano-nebo",name:"Ugradnja zvjezdanog neba",icon:"✨",description:"Luksuzna ugradnja LED zvjezdanog neba u strop vozila. Odaberite broj zvjezdica (100-1000).",sellingPoints:["Premium LED tehnologija","Prilagođeni dizajn","Dugotrajnost","Spektakularan efekt"],images:["/images/service-stars-1.jpg","/images/service-stars-2.jpg"]},{id:"zatamnjivanje",name:"Zatamnjivanje zadnjih stakala",icon:"🪟",description:"Profesionalno zatamnjivanje stakala prema zakonskim propisima.",sellingPoints:["Zakonski propisi","UV zaštita","Estetski izgled","Povećana privatnost"],images:["/images/service-tint-1.jpg","/images/service-tint-2.jpg"]},{id:"mapiranje",name:"Mapiranje vozila",icon:"💻",description:"Profesionalno mapiranje i optimizacija performansi vašeg vozila.",sellingPoints:["Povećane performanse","Bolja ekonomičnost","Sigurno mapiranje","Garancija na uslugu"],images:["/images/service-mapping-1.jpg","/images/service-mapping-2.jpg"]}],maxReservations:4,reviews:[{id:1,company:"Maminjo",logo:"/images/review-maminjo.png",rating:5,text:"Odličan servis! Profesionalno i brzo obavljen posao. Preporučujem!",author:"Maminjo"},{id:2,company:"Luxe Rent",logo:"/images/review-luxerent.png",rating:5,text:"Koristimo njihove usluge za cijelu flotu. Uvijek pouzdani i kvalitetni.",author:"Luxe Rent"}],faq:[{question:"Koliko traje ugradnja pojaseva?",answer:"Ugradnja pojaseva obično traje 2-4 sata, ovisno o modelu vozila i broju pojaseva."},{question:"Mogu li donijeti vlastite pojaseve?",answer:"Da, možete donijeti vlastite pojaseve ili čak rastavljeni sustav. Naši stručnjaci će ih profesionalno ugraditi."},{question:"Koliko zvjezdica mogu odabrati za zvjezdano nebo?",answer:"Možete odabrati između 100 i 1000 zvjezdica, ovisno o vašim preferencijama i veličini stropa vozila."},{question:"Je li zatamnjivanje stakala zakonito?",answer:"Da, naše zatamnjivanje je u skladu sa zakonskim propisima. Prednja stakla ostaju nezatamnjena."},{question:"Što je mapiranje vozila?",answer:"Mapiranje je proces optimizacije softvera upravljačke jedinice motora za poboljšanje performansi i ekonomičnosti."},{question:"Imate li garanciju na usluge?",answer:"Da, sve naše usluge dolaze s garancijom. Detalji ovise o vrsti usluge."},{question:"Trebam li naručiti termin unaprijed?",answer:"Preporučujemo rezervaciju termina kako bismo osigurali dostupnost i najbolju uslugu."},{question:"Koliko košta ugradnja pojaseva?",answer:"Cijena ovisi o modelu vozila i broju pojaseva. Kontaktirajte nas za točnu ponudu."},{question:"Radite li vikendom?",answer:"Radimo od ponedjeljka do petka. Za hitne slučajeve, kontaktirajte nas."},{question:"Gdje se nalazite?",answer:"Nalazimo se na adresi Vranplaninska ulica 1, Zagreb."}],booking:{service:null,vehicle:{},date:null,time:null,customer:{}},reservations:[],async saveBooking(r){var a;const{supabase:e}=await G(async()=>{const{supabase:i}=await Promise.resolve().then(()=>W);return{supabase:i}},void 0),t={service_id:r.service_id,service_name:r.service_name||((a=this.services.find(i=>i.id===r.service_id))==null?void 0:a.name),marka:r.marka,model:r.model,godina:r.godina,broj_pojaseva:r.broj_pojaseva?parseInt(r.broj_pojaseva):null,vlastiti_pojasevi:r.vlastiti_pojasevi||!1,broj_zvjezdica:r.broj_zvjezdica?parseInt(r.broj_zvjezdica):null,napomena:r.napomena||null,appointment_date:r.appointment_date,appointment_time:r.appointment_time,ime:r.ime,prezime:r.prezime,email:r.email,telefon:r.telefon,adresa:r.adresa||null,status:"pending",is_manual_entry:r.is_manual_entry||!1},{data:s,error:n}=await e.from("bookings").insert([t]).select();if(n)throw console.error("Error saving booking:",n),n;return s[0]},async getReservations(){const{supabase:r}=await G(async()=>{const{supabase:s}=await Promise.resolve().then(()=>W);return{supabase:s}},void 0),{data:e,error:t}=await r.from("bookings").select("*").order("created_at",{ascending:!1});return t?(console.error("Error fetching reservations:",t),[]):e||[]},async updateReservationStatus(r,e){const{supabase:t}=await G(async()=>{const{supabase:n}=await Promise.resolve().then(()=>W);return{supabase:n}},void 0),{error:s}=await t.from("bookings").update({status:e}).eq("id",r);if(s)throw console.error("Error updating reservation:",s),s},async fetchServiceConfig(){const{supabase:r}=await G(async()=>{const{supabase:s}=await Promise.resolve().then(()=>W);return{supabase:s}},void 0),{data:e,error:t}=await r.from("services").select("*");if(t){console.warn("Error fetching service config:",t);return}if(e&&e.length>0){const s=e.find(n=>n.id==="global_config");s&&(this.maxReservations=s.duration_minutes||4),this.services=this.services.map(n=>{const a=e.find(i=>i.id===n.id);return a?{...n,duration:a.duration_minutes,durationPerUnit:a.duration_per_unit_minutes,durationRastavljeni:a.duration_rastavljeni_minutes}:n})}return this.services},async updateServiceConfig(r,e){const{supabase:t}=await G(async()=>{const{supabase:n}=await Promise.resolve().then(()=>W);return{supabase:n}},void 0),{error:s}=await t.from("services").upsert({id:r,name:"Service Config",icon:"⚙️",description:"Config",...e,updated_at:new Date().toISOString()});if(s)throw console.error("Update Service Config Error:",JSON.stringify(s,null,2)),s;await this.fetchServiceConfig()},async getReviews(){const{supabase:r}=await G(async()=>{const{supabase:s}=await Promise.resolve().then(()=>W);return{supabase:s}},void 0),{data:e,error:t}=await r.from("reviews").select("*").eq("is_approved",!0).order("created_at",{ascending:!1});return t?(console.error("Error fetching reviews:",t),[]):e||[]},async saveReview(r){var a;const{supabase:e}=await G(async()=>{const{supabase:i}=await Promise.resolve().then(()=>W);return{supabase:i}},void 0),{data:{user:t}}=await e.auth.getUser(),s=((a=t==null?void 0:t.user_metadata)==null?void 0:a.role)==="admin",{error:n}=await e.from("reviews").insert([{...r,is_approved:s}]);if(n)throw n},async deleteReview(r){const{supabase:e}=await G(async()=>{const{supabase:s}=await Promise.resolve().then(()=>W);return{supabase:s}},void 0),{error:t}=await e.from("reviews").delete().eq("id",r);if(t)throw t},async uploadReviewImage(r){const{supabase:e}=await G(async()=>{const{supabase:o}=await Promise.resolve().then(()=>W);return{supabase:o}},void 0),t=r.name.split(".").pop(),n=`${`${Math.random()}.${t}`}`,{error:a}=await e.storage.from("review-images").upload(n,r);if(a)throw a;const{data:i}=e.storage.from("review-images").getPublicUrl(n);return i.publicUrl},async getCalendarAvailability(r,e){const{supabase:t}=await G(async()=>{const{supabase:d}=await Promise.resolve().then(()=>W);return{supabase:d}},void 0);await this.fetchServiceConfig();const s=new Date(r,e,1),n=new Date(r,e+1,0),a=s.toISOString().split("T")[0],i=n.toISOString().split("T")[0],{data:o,error:l}=await t.from("bookings").select("appointment_date, status").gte("appointment_date",a).lte("appointment_date",i).neq("status","cancelled");if(l)return console.error("Error fetching availability:",l),{};const c={};o&&o.forEach(d=>{const h=d.appointment_date;c[h]=(c[h]||0)+1});const u={},f=n.getDate();for(let d=1;d<=f;d++){const h=new Date(r,e,d),p=`${r}-${String(e+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`,g=h.getDay();if(g===0||g===6)u[d]={status:"unavailable",count:0};else{const v=c[p]||0;let m="available";v>=C.maxReservations?m="unavailable":v>=C.maxReservations-1&&(m="almost-full"),u[d]={status:m,count:v}}}return u},async getReservationsByDate(r){const{supabase:e}=await G(async()=>{const{supabase:n}=await Promise.resolve().then(()=>W);return{supabase:n}},void 0),{data:t,error:s}=await e.from("bookings").select("*").eq("appointment_date",r).order("appointment_time",{ascending:!0});return s?(console.error("Error fetching daily reservations:",s),[]):t||[]},async getTimeSlots(r){const{supabase:e}=await G(async()=>{const{supabase:i}=await Promise.resolve().then(()=>W);return{supabase:i}},void 0),{count:t,error:s}=await e.from("bookings").select("*",{count:"exact",head:!0}).eq("appointment_date",r).neq("status","cancelled"),n=this.maxReservations||4,a=s?!1:t>=n;return[{time:"10:00",available:!a},{time:"10:30",available:!a},{time:"11:00",available:!a},{time:"11:30",available:!a},{time:"14:00",available:!a},{time:"14:30",available:!a},{time:"15:00",available:!a},{time:"15:30",available:!a}]}};function Ri(){const r=document.createElement("section");r.className="hero-section",r.innerHTML=`
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <div class="container">
        <div class="hero-text">
          <h1 class="hero-title fade-in">
            <span class="heading-top">autopojasevi.hr</span>
            <span class="heading-bottom">Sigurnost i stil u jednom</span>
          </h1>
        </div>
        
        <div class="hero-search">
          <div class="search-box glass">
            <svg class="search-icon icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input 
              type="text" 
              class="search-input" 
              placeholder="Rezerviraj Termin - Pretraži uslugu..."
              id="hero-search-input"
            >
          </div>
          <div class="search-results hidden" id="search-results"></div>
        </div>
      </div>
    </div>
  `;const e=r.querySelector("#hero-search-input"),t=r.querySelector("#search-results");return e.addEventListener("input",s=>{const n=s.target.value.toLowerCase().trim();if(n.length===0){t.classList.add("hidden");return}const a=C.services.filter(i=>i.name.toLowerCase().includes(n)||i.description.toLowerCase().includes(n));a.length>0?(t.innerHTML=a.map(i=>`
        <div class="search-result-item glass" data-service-id="${i.id}">
          <span class="result-icon">${i.icon}</span>
          <span class="result-name">${i.name}</span>
        </div>
      `).join(""),t.classList.remove("hidden"),t.querySelectorAll(".search-result-item").forEach(i=>{i.addEventListener("click",()=>{const o=i.dataset.serviceId;U.navigate("/booking",{serviceId:o})})})):t.classList.add("hidden")}),document.addEventListener("click",s=>{r.contains(s.target)||t.classList.add("hidden")}),r}const Hs=document.createElement("style");Hs.textContent=`
  .hero-section {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url('/images/hero-car.png');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    overflow: hidden;
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(22, 22, 22, 0.95) 0%,
      rgba(22, 22, 22, 0.7) 50%,
      rgba(22, 22, 22, 0.95) 100%
    );
  }

  .hero-content {
    position: relative;
    z-index: 1;
    width: 100%;
    padding: var(--spacing-3xl) 0;
  }

  .hero-text {
    text-align: center;
    margin-bottom: var(--spacing-3xl);
  }

  .hero-title {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .hero-title .heading-top {
    font-size: 2rem;
  }

  .hero-title .heading-bottom {
    font-size: 4rem;
  }

  .hero-search {
    max-width: 700px;
    margin: 0 auto;
    position: relative;
  }

  .search-box {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-md) var(--spacing-lg);
    transition: all var(--transition-base);
  }

  .search-box:focus-within {
    border-color: var(--color-accent);
    box-shadow: var(--shadow-glow-red);
  }

  .search-icon {
    flex-shrink: 0;
    color: var(--color-accent);
  }

  .search-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: var(--color-text);
    font-family: var(--font-body);
    font-size: 1.1rem;
  }

  .search-input::placeholder {
    color: var(--color-text-muted);
  }

  .search-results {
    position: absolute;
    top: calc(100% + var(--spacing-sm));
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    max-height: 300px;
    overflow-y: auto;
    z-index: 10;
  }

  .search-result-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-md) var(--spacing-lg);
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .search-result-item:hover {
    border-color: var(--color-accent);
    transform: translateX(4px);
  }

  .result-icon {
    font-size: 1.5rem;
  }

  .result-name {
    font-size: 1rem;
    font-weight: 400;
  }

  @media (max-width: 768px) {
    .hero-content {
        padding: var(--spacing-xl) 0;
    }

    .hero-text {
        margin-bottom: var(--spacing-lg);
    }
  
    .hero-title .heading-top {
      font-size: 1rem;
    }

    .hero-title .heading-bottom {
      font-size: 2rem;
      line-height: 1.1;
    }
    
    .search-input {
      font-size: 0.9rem;
    }
    
    .search-box {
        padding: 0.5rem 0.75rem;
    }
    
    .search-icon {
        width: 18px;
        height: 18px;
    }
  }
`;document.head.appendChild(Hs);function Pi(){const r=document.createElement("section");return r.className="section how-it-works",r.innerHTML=`
    <div class="container">
      <h2 class="section-title text-center mb-xl">
        <span class="heading-top">PROCES</span>
        <span class="heading-bottom">Kako Funkcionira</span>
      </h2>
      
      <div class="grid grid-3">
        <div class="card step-card">
          <div class="step-icon">
            <svg class="icon icon-xl" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.39zM11 18a7 7 0 1 1 7-7 7 7 0 0 1-7 7z"/>
              <path d="M9.5 11h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-1 0V10h-2.5a.5.5 0 0 0 0 1z"/>
            </svg>
          </div>
          <h3 class="step-title">Odaberi Uslugu</h3>
          <p class="step-description">
            Pregledaj našu ponudu i odaberi uslugu koja ti treba - od ugradnje pojaseva do mapiranja vozila.
          </p>
        </div>

        <div class="card step-card">
          <div class="step-icon">
            <svg class="icon icon-xl" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/>
            </svg>
          </div>
          <h3 class="step-title">Odaberi Datum</h3>
          <p class="step-description">
            Rezerviraj termin koji ti odgovara. Naš kalendar pokazuje dostupnost u realnom vremenu.
          </p>
        </div>

        <div class="card step-card">
          <div class="step-icon">
            <svg class="icon icon-xl" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
            </svg>
          </div>
          <h3 class="step-title">Donesi Auto</h3>
          <p class="step-description">
            Dođi u dogovoreno vrijeme na našu adresu. Naš tim će se pobrinuti za sve ostalo.
          </p>
        </div>
      </div>
    </div>
  `,r}const Vs=document.createElement("style");Vs.textContent=`
  .how-it-works {
    background: var(--color-primary);
  }

  .section-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-xs);
  }

  .step-card {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-md);
  }

  .step-icon {
    width: 80px;
    height: 80px;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-accent);
    transition: all var(--transition-base);
  }

  .step-card:hover .step-icon {
    background: rgba(254, 0, 2, 0.1);
    border-color: var(--color-accent);
    transform: scale(1.1);
  }

  .step-title {
    font-size: 1.5rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  @media (max-width: 768px) {
    .step-card {
        gap: var(--spacing-lg);
        padding: var(--spacing-lg) 0;
    }
    
    .step-icon {
        width: 60px;
        height: 60px;
    }
    
    .icon-xl {
        width: 32px;
        height: 32px;
    }

    .step-title {
        font-size: 1.2rem;
    }
  }
`;document.head.appendChild(Vs);function $i(){const r=document.createElement("section");r.className="section services-widget";const e=C.services.map(t=>`
    <div class="card service-card" data-service-id="${t.id}">
      <div class="service-icon">${t.icon}</div>
      <h3 class="service-title">${t.name}</h3>
      <p class="service-description">${t.description}</p>
      <button class="btn btn-primary service-btn">
        Rezerviraj
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  `).join("");return r.innerHTML=`
    <div class="container">
      <h2 class="section-title text-center mb-xl">
        <span class="heading-top">USLUGE</span>
        <span class="heading-bottom">Što Nudimo</span>
      </h2>
      
      <div class="grid grid-4 services-grid">
        ${e}
      </div>
    </div>
  `,r.querySelectorAll(".service-card").forEach(t=>{t.addEventListener("click",s=>{if(s.target.closest(".service-btn")){const n=t.dataset.serviceId;U.navigate("/booking",{serviceId:n})}})}),r}const Fs=document.createElement("style");Fs.textContent=`
  .services-widget {
    background: var(--color-secondary);
  }

  .services-grid {
    gap: var(--spacing-xl);
  }

  .service-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--spacing-md);
    cursor: pointer;
    transition: all var(--transition-base);
  }

  .service-card:hover {
    transform: translateY(-8px);
  }

  .service-icon {
    font-size: 4rem;
    line-height: 1;
    margin-bottom: var(--spacing-sm);
  }

  .service-title {
    font-size: 1.3rem;
    font-weight: 900;
    text-transform: uppercase;
    min-height: 2.6em;
    display: flex;
    align-items: center;
  }

  .service-description {
    color: var(--color-text-muted);
    line-height: 1.7;
    flex: 1;
    font-size: 0.95rem;
  }

  .service-btn {
    margin-top: auto;
    width: 100%;
  }

  @media (max-width: 1024px) {
    .services-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 640px) {
    .services-grid {
      grid-template-columns: 1fr;
    }
    
    .service-card {
        padding: var(--spacing-lg);
    }
    
    .service-icon {
        font-size: 3rem;
    }
    
    .service-title {
        font-size: 1.1rem;
        min-height: auto;
    }
  }
`;document.head.appendChild(Fs);function Ii(){const r=document.createElement("section");return r.className="cta-banner",r.innerHTML=`
    <div class="cta-content glass">
      <h2 class="cta-title">Rezerviraj termin u 3 jednostavna koraka.</h2>
      <button class="btn btn-cta" id="cta-button">
        Započni Rezervaciju
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  `,r.querySelector("#cta-button").addEventListener("click",()=>{U.navigate("/booking")}),r}const Ks=document.createElement("style");Ks.textContent=`
  .cta-banner {
    background: var(--color-secondary);
    padding: 0;
    position: relative;
    overflow: hidden;
  }

  .cta-content {
    position: relative;
    z-index: 2;
    padding: var(--spacing-3xl) 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-xl);
    text-align: center;
    background: linear-gradient(135deg, rgba(254, 0, 2, 0.1) 0%, rgba(254, 0, 2, 0.05) 100%);
  }

  .cta-title {
    font-size: 2.5rem;
    font-weight: 900;
    text-transform: uppercase;
    max-width: 800px;
  }

  @media (max-width: 768px) {
    .cta-title {
      font-size: 1.4rem;
    }
  }
`;document.head.appendChild(Ks);function Li(){const r=document.createElement("section");r.className="section about-section",r.id="about-section",r.innerHTML=`
    <div class="container">
      <div class="about-grid">
        <div class="about-text">
          <h2 class="section-title mb-lg">
            <span class="heading-top">O NAMA</span>
            <span class="heading-bottom">Naša Priča</span>
          </h2>
          
          <div class="about-content">
            <p>
              <strong>Autopojasevi.hr</strong> je brend koji spaja stručnost, sigurnost i stil. 
              Osnivač i vlasnik <strong>Ismael Hadžić</strong>, poznat content creator, 
              prepoznao je potrebu za profesionalnom i pouzdanom uslugom u automobilskoj industriji.
            </p>
            
            <p>
              Naša misija je pružiti vrhunsku uslugu svakom klijentu, bez obzira radi li se o 
              ugradnji sigurnosnih pojaseva, luksuznom zvjezdanom nebu ili profesionalnom mapiranju vozila.
            </p>
            
            <p>
              <strong>Povjerenje je temelj našeg poslovanja.</strong> Kod nas su bili poznati influenceri 
              i veliki klijenti koji nam vjeruju jer znaju da ćemo posao obaviti precizno, 
              sigurno i profesionalno.
            </p>
            
            <div class="about-values">
              <div class="value-item">
                <svg class="icon icon-lg text-accent" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                </svg>
                <span>Sigurnost</span>
              </div>
              <div class="value-item">
                <svg class="icon icon-lg text-accent" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                </svg>
                <span>Preciznost</span>
              </div>
              <div class="value-item">
                <svg class="icon icon-lg text-accent" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>Povjerenje</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="about-image-wrapper">
          <div class="about-image-container" id="parallax-car">
            <img src="/images/about-car.png" alt="Luxury Car" class="about-car-image">
          </div>
        </div>
      </div>
    </div>
  `;let e=!1;const t=r.querySelector("#parallax-car"),s=()=>{const a=window.pageYOffset,i=r.offsetTop,o=r.offsetHeight,l=window.innerHeight;if(a+l>i&&a<i+o){const c=(a-i)*-.3;t.style.transform=`translateY(${c}px)`}e=!1},n=()=>{e||(requestAnimationFrame(s),e=!0)};return window.addEventListener("scroll",n),r}const Gs=document.createElement("style");Gs.textContent=`
  .about-section {
    background: var(--color-primary);
    overflow: hidden;
  }

  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-3xl);
    align-items: center;
  }

  .about-text {
    display: flex;
    flex-direction: column;
  }

  .about-content p {
    font-size: 1.05rem;
    line-height: 1.8;
    color: var(--color-text);
    margin-bottom: var(--spacing-lg);
  }

  .about-content strong {
    color: var(--color-accent);
  }

  .about-values {
    display: flex;
    justify-content: center;
    gap: var(--spacing-xl);
    margin-top: var(--spacing-xl);
    padding-top: var(--spacing-xl);
    border-top: 1px solid var(--glass-border);
  }

  .value-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-sm);
    text-align: center;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 0.9rem;
  }

  .about-image-wrapper {
    position: relative;
    height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .about-image-container {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.1s ease-out;
  }

  .about-car-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5));
  }

  @media (max-width: 1024px) {
    .about-grid {
      grid-template-columns: 1fr;
      gap: var(--spacing-2xl);
    }

    .about-image-wrapper {
      height: 400px;
    }

    .about-values {
      justify-content: space-around;
    }
  }

  @media (max-width: 640px) {
    .about-values {
      flex-direction: row; /* Force row on mobile too */
      flex-wrap: wrap; /* Allow wrapping if really needed but try to keep row */
      gap: var(--spacing-sm);
      justify-content: center;
    }
    
    .value-item {
        font-size: 0.75rem;
    }
    
    .icon-lg {
        width: 24px;
        height: 24px;
    }

    .about-image-wrapper {
        height: 250px; /* Smaller height */
        margin-top: var(--spacing-lg);
    }
    
    .about-image-container {
        /* Adjust positioning if needed to avoid overlap or just rely on flow */
        transform: none !important; /* Disable parallax on mobile if it causes issues */
    }
  }
`;document.head.appendChild(Gs);function zi(){const r=document.createElement("section");return r.className="section reviews-slider",r.innerHTML=`
    <div class="container">
      <h2 class="section-title text-center mb-xl">
        <span class="heading-top">RECENZIJE</span>
        <span class="heading-bottom">Što Kažu Naši Klijenti</span>
      </h2>
      <div class="text-center">
        <p>Učitavanje recenzija...</p>
      </div>
    </div>
  `,C.getReviews().then(e=>{if(!e||e.length===0){r.innerHTML=`
            <div class="container">
            <h2 class="section-title text-center mb-xl">
                <span class="heading-top">RECENZIJE</span>
                <span class="heading-bottom">Što Kažu Naši Klijenti</span>
            </h2>
            <div class="text-center glass" style="padding: 2rem;">
                <p>Trenutno nema recenzija.</p>
            </div>
            </div>
        `;return}const t=e.map(p=>`
        <div class="review-card glass">
        <div class="review-header">
            <div class="review-company">
            <div class="company-logo">
                ${p.company?p.company.charAt(0):p.author.charAt(0)}
            </div>
            <span class="company-name">${p.company||p.author}</span>
            </div>
            <div class="review-rating">
            ${Array(5).fill(0).map((g,v)=>`
                <svg class="star ${v<p.rating?"filled":""}" viewBox="0 0 24 24" fill="${v<p.rating?"currentColor":"none"}" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
            `).join("")}
            </div>
        </div>
        <p class="review-text">"${p.text}"</p>
        <p class="review-author">— ${p.author}</p>
        </div>
    `).join("");r.innerHTML=`
        <div class="container">
        <h2 class="section-title text-center mb-xl">
            <span class="heading-top">RECENZIJE</span>
            <span class="heading-bottom">Što Kažu Naši Klijenti</span>
        </h2>
        
        <div class="slider-container">
            <button class="slider-btn slider-btn-prev" id="slider-prev">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 18l-6-6 6-6"/>
            </svg>
            </button>
            
            <div class="slider-track" id="reviews-track">
            ${t}
            </div>
            
            <button class="slider-btn slider-btn-next" id="slider-next">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18l6-6-6-6"/>
            </svg>
            </button>
        </div>
        
        <div class="slider-dots" id="slider-dots"></div>
        </div>
    `;const s=r.querySelector("#reviews-track"),n=r.querySelector("#slider-prev"),a=r.querySelector("#slider-next"),i=r.querySelector("#slider-dots");let o=0;const l=e.length;for(let p=0;p<l;p++){const g=document.createElement("button");g.className=`slider-dot ${p===0?"active":""}`,g.addEventListener("click",()=>u(p)),i.appendChild(g)}const c=()=>{s.querySelectorAll(".review-card").forEach((g,v)=>{g.classList.toggle("active",v===o)}),i.querySelectorAll(".slider-dot").forEach((g,v)=>{g.classList.toggle("active",v===o)})},u=p=>{o=p,c()},f=()=>{o=(o+1)%l,c()},d=()=>{o=(o-1+l)%l,c()};n.addEventListener("click",d),a.addEventListener("click",f);let h=setInterval(f,5e3);r.addEventListener("mouseenter",()=>{clearInterval(h)}),r.addEventListener("mouseleave",()=>{h=setInterval(f,5e3)}),setTimeout(c,0)}),r}const Ws=document.createElement("style");Ws.textContent=`
  .reviews-slider {
    background: var(--color-secondary);
  }

  .slider-container {
    position: relative;
    overflow: hidden;
    padding: 0 var(--spacing-3xl);
  }

  .slider-track {
    display: grid;
    grid-template-areas: "stack";
    width: 100%;
  }

  .review-card {
    grid-area: stack;
    width: 100%;
    padding: var(--spacing-2xl);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
    z-index: 0;
  }
  
  .review-card.active {
    opacity: 1;
    pointer-events: auto;
    z-index: 1;
  }

  .review-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--spacing-md);
  }

  .review-company {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
  }

  .company-logo {
    width: 60px;
    height: 60px;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    font-size: 1.5rem;
    font-weight: 900;
    color: var(--color-accent);
  }

  .company-logo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .company-name {
    font-size: 1.2rem;
    font-weight: 700;
  }

  .review-rating {
    display: flex;
    gap: var(--spacing-xs);
  }

  .star {
    width: 24px;
    height: 24px;
    color: var(--color-text-muted);
  }

  .star.filled {
    color: #ffd700;
  }

  .review-text {
    font-size: 1.3rem;
    line-height: 1.8;
    font-style: italic;
    color: var(--color-text);
  }

  .review-author {
    font-size: 1rem;
    color: var(--color-text-muted);
    text-align: right;
  }

  .slider-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all var(--transition-base);
    z-index: 10;
    color: var(--color-text);
  }

  .slider-btn:hover {
    background: var(--color-accent);
    border-color: var(--color-accent);
    color: #ffffff;
  }

  .slider-btn-prev {
    left: 0;
  }

  .slider-btn-next {
    right: 0;
  }

  .slider-dots {
    display: flex;
    justify-content: center;
    gap: var(--spacing-sm);
    margin-top: var(--spacing-xl);
    position: relative;
    z-index: 2;
  }

  .slider-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--glass-border);
    border: none;
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .slider-dot.active {
    background: var(--color-accent);
    transform: scale(1.3);
  }

  @media (max-width: 768px) {
    .slider-container {
      padding: 0 var(--spacing-xl);
    }

    .slider-btn {
      width: 40px;
      height: 40px;
    }

    .review-text {
      font-size: 0.95rem;
      line-height: 1.5;
    }
    
    .review-author {
        font-size: 0.85rem;
    }
    
    .company-name {
        font-size: 0.9rem;
    }
    
    .company-logo {
        width: 40px;
        height: 40px;
        font-size: 1rem;
    }
  }
`;document.head.appendChild(Ws);function Ni(){const r=document.createElement("section");r.className="section-sm faq-section",r.id="faq-section";const e=C.faq.map((t,s)=>`
    <div class="faq-item glass">
      <button class="faq-question" data-index="${s}">
        <span>${t.question}</span>
        <svg class="faq-icon icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      <div class="faq-answer">
        <p>${t.answer}</p>
      </div>
    </div>
  `).join("");return r.innerHTML=`
    <div class="container-boxed">
      <h2 class="section-title text-center mb-xl">
        <span class="heading-top">FAQ</span>
        <span class="heading-bottom">Često Postavljena Pitanja</span>
      </h2>
      
      <div class="faq-list">
        ${e}
      </div>
    </div>
  `,r.querySelectorAll(".faq-question").forEach(t=>{t.addEventListener("click",()=>{const s=t.closest(".faq-item"),n=s.classList.contains("open");r.querySelectorAll(".faq-item").forEach(a=>{a.classList.remove("open")}),n||s.classList.add("open")})}),r}const Js=document.createElement("style");Js.textContent=`
  .faq-section {
    background: var(--color-primary);
  }

  .faq-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .faq-item {
    overflow: hidden;
    transition: all var(--transition-base);
  }

  .faq-item.open {
    border-color: var(--color-accent);
  }

  .faq-question {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-md) var(--spacing-lg);
    background: transparent;
    border: none;
    color: var(--color-text);
    font-family: var(--font-body);
    font-size: 1.1rem;
    font-weight: 700;
    text-align: left;
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .faq-question:hover {
    color: var(--color-accent);
  }

  .faq-icon {
    flex-shrink: 0;
    transition: transform var(--transition-base);
    color: var(--color-accent);
  }

  .faq-item.open .faq-icon {
    transform: rotate(180deg);
  }

  .faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height var(--transition-base);
  }

  .faq-item.open .faq-answer {
    max-height: 500px;
  }

  .faq-answer p {
    padding: 0 var(--spacing-lg) var(--spacing-lg);
    color: var(--color-text-muted);
    line-height: 1.8;
  }
`;document.head.appendChild(Js);function Mi(){const r=document.createElement("section");return r.className="section contact-section",r.id="contact-section",r.innerHTML=`
    <div class="container">
      <h2 class="section-title text-center mb-xl">
        <span class="heading-top">KONTAKT</span>
        <span class="heading-bottom">Dođite Nam U Posjet</span>
      </h2>
      
      <div class="contact-grid">
        <div class="contact-info glass">
          <div class="contact-item">
            <svg class="icon icon-lg text-accent" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <div class="contact-details">
              <h4>Email</h4>
              <a href="mailto:info@autopojasevi.hr">info@autopojasevi.hr</a>
            </div>
          </div>

          <div class="contact-item">
            <svg class="icon icon-lg text-accent" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            <div class="contact-details">
              <h4>Telefon</h4>
              <a href="tel:+385123456789">+385 12 345 6789</a>
            </div>
          </div>

          <div class="contact-item">
            <svg class="icon icon-lg text-accent" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <div class="contact-details">
              <h4>Adresa</h4>
              <p>Vranplaninska ulica 1<br>10000 Zagreb, Hrvatska</p>
            </div>
          </div>

          <div class="contact-item">
            <svg class="icon icon-lg text-accent" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
            </svg>
            <div class="contact-details">
              <h4>Radno vrijeme</h4>
              <p>Ponedjeljak - Petak<br>09:00 - 17:00</p>
            </div>
          </div>
        </div>

        <div class="contact-map glass">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2780.6786656789!2d16.0395!3d45.8205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4765d7a6b6a6a6a6%3A0x6a6a6a6a6a6a6a6!2sVranplaninska%20ul.%201%2C%2010000%2C%20Zagreb!5e0!3m2!1sen!2shr!4v1234567890123!5m2!1sen!2shr&maptype=roadmap&style=feature:all|element:all|saturation:-100|lightness:-20&style=feature:poi|element:all|visibility:off"
            width="100%"
            height="100%"
            style="border:0; filter: grayscale(100%) invert(90%) contrast(120%);"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  `,r}const Ys=document.createElement("style");Ys.textContent=`
  .contact-section {
    background: var(--color-secondary);
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-xl);
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
    padding: var(--spacing-2xl);
  }

  .contact-item {
    display: flex;
    gap: var(--spacing-lg);
    align-items: flex-start;
  }

  .contact-details {
    flex: 1;
  }

  .contact-details h4 {
    font-size: 1.1rem;
    font-weight: 900;
    text-transform: uppercase;
    margin-bottom: var(--spacing-xs);
    color: var(--color-text);
  }

  .contact-details p,
  .contact-details a {
    font-size: 1rem;
    line-height: 1.6;
    color: var(--color-text-muted);
  }

  .contact-details a {
    transition: color var(--transition-fast);
  }

  .contact-details a:hover {
    color: var(--color-accent);
  }

  .contact-map {
    min-height: 500px;
    overflow: hidden;
    padding: 0;
  }

  .contact-map iframe {
    display: block;
  }

  @media (max-width: 1024px) {
    .contact-grid {
      grid-template-columns: 1fr;
      gap: var(--spacing-lg);
    }
    
    .contact-info {
        padding: var(--spacing-lg);
        gap: var(--spacing-lg);
    }

    .contact-map {
      min-height: 300px;
    }
  }
`;document.head.appendChild(Ys);function Bi(){const r=document.createElement("div");r.className="page-home",r.appendChild(gr());const e=document.createElement("main");return e.appendChild(Ri()),e.appendChild(Pi()),e.appendChild($i()),e.appendChild(Ii()),e.appendChild(Li()),e.appendChild(zi()),e.appendChild(Ni()),e.appendChild(Mi()),r.appendChild(e),r.appendChild(mr()),r}function Ui({currentStep:r,totalSteps:e=6}){const t=document.createElement("div");t.className="progress-bar-container";const s=r/e*100;return t.innerHTML=`
    <div class="progress-steps">
      ${Array(e).fill(0).map((n,a)=>`
        <div class="progress-step ${a<r?"completed":""} ${a===r-1?"active":""}">
          <div class="step-number">${a+1}</div>
          <div class="step-label">${qi(a+1)}</div>
        </div>
      `).join("")}
    </div>
    <div class="progress-bar">
      <div class="progress-fill" style="width: ${s}%"></div>
    </div>
  `,t}function qi(r){return{1:"Usluga",2:"Vozilo",3:"Termin",4:"Podaci",5:"Pregled",6:"Gotovo"}[r]||""}const Qs=document.createElement("style");Qs.textContent=`
  .progress-bar-container {
    margin-bottom: var(--spacing-2xl);
  }

  .progress-steps {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--spacing-md);
    position: relative;
  }

  .progress-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-xs);
    flex: 1;
    position: relative;
  }

  .step-number {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid var(--glass-border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    font-size: 1.1rem;
    transition: all var(--transition-base);
    z-index: 2;
  }

  .progress-step.active .step-number {
    background: var(--color-accent);
    border-color: var(--color-accent);
    color: #ffffff;
    transform: scale(1.2);
  }

  .progress-step.completed .step-number {
    background: rgba(254, 0, 2, 0.3);
    border-color: var(--color-accent);
  }

  .step-label {
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text-muted);
    font-weight: 700;
  }

  .progress-step.active .step-label {
    color: var(--color-accent);
  }

  .progress-bar {
    width: 100%;
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: var(--color-accent);
    transition: width var(--transition-slow);
  }

  @media (max-width: 768px) {
    .step-label {
      font-size: 0.6rem;
      letter-spacing: 0;
    }

    .step-number {
      width: 24px;
      height: 24px;
      font-size: 0.8rem;
      border-width: 1px;
    }
    
    .progress-bar-container {
        margin-bottom: var(--spacing-xl);
    }
  }
`;document.head.appendChild(Qs);function Di({onNext:r,selectedServiceId:e}){const t=document.createElement("div");t.className="booking-step step-service-selection";let s=e||null;const n=C.services.map(o=>`
    <div class="service-selection-card card ${o.id===s?"selected":""}" data-service-id="${o.id}">
      <div class="service-icon-large">${o.icon}</div>
      <h3 class="service-name">${o.name}</h3>
    </div>
  `).join("");t.innerHTML=`
    <h2 class="step-title">
      <span class="heading-top">KORAK 1</span>
      <span class="heading-bottom">Odaberi Uslugu</span>
    </h2>
    
    <div class="grid grid-4 service-selection-grid">
      ${n}
    </div>
    
    <div class="step-actions">
      <button class="btn btn-cta" id="next-btn" ${s?"":"disabled"}>
        Nastavi
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  `;const a=t.querySelectorAll(".service-selection-card"),i=t.querySelector("#next-btn");return a.forEach(o=>{o.addEventListener("click",()=>{s=o.dataset.serviceId,a.forEach(l=>l.classList.remove("selected")),o.classList.add("selected"),i.disabled=!1})}),i.addEventListener("click",()=>{s&&r({serviceId:s})}),t}const Xs=document.createElement("style");Xs.textContent=`
  .booking-step {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
  }

  .step-title {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  .service-selection-grid {
    gap: var(--spacing-lg);
  }

  .service-selection-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-xl);
    cursor: pointer;
    text-align: center;
    transition: all var(--transition-base);
  }

  .service-selection-card:hover {
    transform: translateY(-4px);
  }

  .service-selection-card.selected {
    border-color: var(--color-accent);
    box-shadow: var(--shadow-glow-red);
    background: rgba(254, 0, 2, 0.05);
  }

  .service-icon-large {
    font-size: 5rem;
    line-height: 1;
  }

  .service-name {
    font-size: 1.2rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  @media (max-width: 768px) {
    .service-selection-card {
        padding: var(--spacing-lg);
    }
    
    .service-icon-large {
        font-size: 3rem;
    }
    
    .service-name {
        font-size: 1rem;
    }
    
    .step-actions {
        flex-direction: column;
        width: 100%;
    }
    
    .step-actions .btn {
        width: 100%;
        justify-content: center;
    }
  }
`;document.head.appendChild(Xs);function Hi({serviceId:r,onNext:e,onBack:t}){const s=document.createElement("div");s.className="booking-step step-service-details";const n=C.services.find(a=>a.id===r);return n?(s.innerHTML=`
    <div class="service-details-grid">
      <div class="service-details-left">
        <div class="service-header">
          <div class="service-icon-large">${n.icon}</div>
          <h2 class="service-title-large">${n.name}</h2>
        </div>
        
        <p class="service-description-full">${n.description}</p>
        
        <div class="service-selling-points">
          ${n.sellingPoints.map(a=>`
            <div class="selling-point">
              <svg class="icon text-accent" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
              </svg>
              <span>${a}</span>
            </div>
          `).join("")}
        </div>
        
        <button class="btn btn-cta" id="continue-btn">
          Nastavi
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
      
      <div class="service-details-right">
        <div class="service-image-placeholder glass">
          <div class="placeholder-icon">${n.icon}</div>
          <p>Slika usluge 1</p>
        </div>
        <div class="service-image-placeholder glass">
          <div class="placeholder-icon">${n.icon}</div>
          <p>Slika usluge 2</p>
        </div>
      </div>
    </div>
  `,s.querySelector("#continue-btn").addEventListener("click",()=>{e({serviceId:r})}),s):(s.innerHTML="<p>Service not found</p>",s)}const Zs=document.createElement("style");Zs.textContent=`
  .service-details-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-3xl);
    align-items: start;
  }

  .service-details-left {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
  }

  .service-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-lg);
  }

  .service-title-large {
    font-size: 2rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .service-description-full {
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--color-text-muted);
  }

  .service-selling-points {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    padding: var(--spacing-lg);
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
  }

  .selling-point {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    font-size: 1rem;
  }

  .service-details-right {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  .service-image-placeholder {
    aspect-ratio: 16/9;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-md);
    padding: var(--spacing-xl);
  }

  .placeholder-icon {
    font-size: 4rem;
    opacity: 0.3;
  }

  @media (max-width: 1024px) {
    .service-details-grid {
      grid-template-columns: 1fr;
    }
  }
`;document.head.appendChild(Zs);const at=[{id:"bmw",name:"BMW",logo:"https://www.carlogos.org/car-logos/bmw-logo.png",models:[{name:"Serija 1",years:[2004,2025]},{name:"Serija 2",years:[2014,2025]},{name:"Serija 3",years:[1975,2025]},{name:"Serija 4",years:[2013,2025]},{name:"Serija 5",years:[1972,2025]},{name:"Serija 6",years:[1976,2025]},{name:"Serija 7",years:[1977,2025]},{name:"Serija 8",years:[1990,2025]},{name:"X1",years:[2009,2025]},{name:"X2",years:[2018,2025]},{name:"X3",years:[2003,2025]},{name:"X4",years:[2014,2025]},{name:"X5",years:[1999,2025]},{name:"X6",years:[2008,2025]},{name:"X7",years:[2019,2025]},{name:"Z4",years:[2002,2025]},{name:"i3",years:[2013,2022]},{name:"i4",years:[2021,2025]},{name:"iX",years:[2021,2025]}]},{id:"mercedes",name:"Mercedes-Benz",logo:"https://www.carlogos.org/car-logos/mercedes-benz-logo.png",models:[{name:"A-Klasa",years:[1997,2025]},{name:"B-Klasa",years:[2005,2025]},{name:"C-Klasa",years:[1993,2025]},{name:"E-Klasa",years:[1993,2025]},{name:"S-Klasa",years:[1972,2025]},{name:"CLA",years:[2013,2025]},{name:"CLS",years:[2004,2025]},{name:"GLA",years:[2014,2025]},{name:"GLB",years:[2019,2025]},{name:"GLC",years:[2015,2025]},{name:"GLE",years:[2015,2025]},{name:"GLS",years:[2016,2025]},{name:"G-Klasa",years:[1979,2025]},{name:"SL",years:[1954,2025]},{name:"SLC",years:[2016,2020]},{name:"AMG GT",years:[2014,2025]},{name:"EQA",years:[2021,2025]},{name:"EQC",years:[2019,2025]},{name:"EQS",years:[2021,2025]}]},{id:"audi",name:"Audi",logo:"https://www.carlogos.org/car-logos/audi-logo.png",models:[{name:"A1",years:[2010,2025]},{name:"A3",years:[1996,2025]},{name:"A4",years:[1994,2025]},{name:"A5",years:[2007,2025]},{name:"A6",years:[1994,2025]},{name:"A7",years:[2010,2025]},{name:"A8",years:[1994,2025]},{name:"Q2",years:[2016,2025]},{name:"Q3",years:[2011,2025]},{name:"Q4 e-tron",years:[2021,2025]},{name:"Q5",years:[2008,2025]},{name:"Q7",years:[2006,2025]},{name:"Q8",years:[2018,2025]},{name:"TT",years:[1998,2023]},{name:"R8",years:[2006,2025]},{name:"e-tron",years:[2018,2025]},{name:"e-tron GT",years:[2021,2025]}]},{id:"volkswagen",name:"Volkswagen",logo:"https://www.carlogos.org/car-logos/volkswagen-logo.png",models:[{name:"Golf",years:[1974,2025]},{name:"Polo",years:[1975,2025]},{name:"Passat",years:[1973,2025]},{name:"Tiguan",years:[2007,2025]},{name:"Touareg",years:[2002,2025]},{name:"T-Roc",years:[2017,2025]},{name:"T-Cross",years:[2019,2025]},{name:"Arteon",years:[2017,2025]},{name:"Jetta",years:[1979,2025]},{name:"Beetle",years:[1938,2019]},{name:"Caddy",years:[1980,2025]},{name:"Transporter",years:[1950,2025]},{name:"ID.3",years:[2020,2025]},{name:"ID.4",years:[2021,2025]},{name:"ID.5",years:[2022,2025]},{name:"ID. Buzz",years:[2022,2025]}]},{id:"toyota",name:"Toyota",logo:"https://www.carlogos.org/car-logos/toyota-logo.png",models:[{name:"Corolla",years:[1966,2025]},{name:"Camry",years:[1982,2025]},{name:"RAV4",years:[1994,2025]},{name:"Yaris",years:[1999,2025]},{name:"Aygo",years:[2005,2025]},{name:"C-HR",years:[2016,2025]},{name:"Highlander",years:[2e3,2025]},{name:"Land Cruiser",years:[1951,2025]},{name:"Prius",years:[1997,2025]},{name:"Supra",years:[1978,2025]},{name:"Avensis",years:[1997,2018]},{name:"Auris",years:[2006,2019]},{name:"bZ4X",years:[2022,2025]}]},{id:"honda",name:"Honda",logo:"https://www.carlogos.org/car-logos/honda-logo.png",models:[{name:"Civic",years:[1972,2025]},{name:"Accord",years:[1976,2025]},{name:"CR-V",years:[1995,2025]},{name:"HR-V",years:[1998,2025]},{name:"Jazz",years:[2001,2025]},{name:"e",years:[2020,2025]},{name:"ZR-V",years:[2023,2025]},{name:"Type R",years:[1997,2025]},{name:"NSX",years:[1990,2022]}]},{id:"ford",name:"Ford",logo:"https://www.carlogos.org/car-logos/ford-logo.png",models:[{name:"Fiesta",years:[1976,2023]},{name:"Focus",years:[1998,2025]},{name:"Mondeo",years:[1993,2022]},{name:"Kuga",years:[2008,2025]},{name:"Puma",years:[1997,2025]},{name:"Explorer",years:[1990,2025]},{name:"Mustang",years:[1964,2025]},{name:"Mustang Mach-E",years:[2021,2025]},{name:"Ranger",years:[1983,2025]},{name:"Transit",years:[1965,2025]},{name:"Bronco",years:[1966,2025]},{name:"F-150",years:[1948,2025]}]},{id:"nissan",name:"Nissan",logo:"https://www.carlogos.org/car-logos/nissan-logo.png",models:[{name:"Micra",years:[1982,2025]},{name:"Juke",years:[2010,2025]},{name:"Qashqai",years:[2006,2025]},{name:"X-Trail",years:[2001,2025]},{name:"Leaf",years:[2010,2025]},{name:"Ariya",years:[2022,2025]},{name:"370Z",years:[2009,2020]},{name:"GT-R",years:[2007,2025]},{name:"Navara",years:[1997,2025]}]},{id:"mazda",name:"Mazda",logo:"https://www.carlogos.org/car-logos/mazda-logo.png",models:[{name:"Mazda2",years:[2002,2025]},{name:"Mazda3",years:[2003,2025]},{name:"Mazda6",years:[2002,2025]},{name:"CX-3",years:[2015,2025]},{name:"CX-30",years:[2019,2025]},{name:"CX-5",years:[2012,2025]},{name:"CX-60",years:[2022,2025]},{name:"MX-5",years:[1989,2025]},{name:"MX-30",years:[2020,2025]}]},{id:"peugeot",name:"Peugeot",logo:"https://www.carlogos.org/car-logos/peugeot-logo.png",models:[{name:"208",years:[2012,2025]},{name:"308",years:[2007,2025]},{name:"508",years:[2011,2025]},{name:"2008",years:[2013,2025]},{name:"3008",years:[2009,2025]},{name:"5008",years:[2009,2025]},{name:"e-208",years:[2019,2025]},{name:"e-2008",years:[2020,2025]},{name:"Rifter",years:[2018,2025]}]},{id:"renault",name:"Renault",logo:"https://www.carlogos.org/car-logos/renault-logo.png",models:[{name:"Clio",years:[1990,2025]},{name:"Megane",years:[1995,2025]},{name:"Captur",years:[2013,2025]},{name:"Kadjar",years:[2015,2025]},{name:"Koleos",years:[2007,2025]},{name:"Twingo",years:[1992,2025]},{name:"Zoe",years:[2012,2025]},{name:"Arkana",years:[2021,2025]},{name:"Austral",years:[2022,2025]}]},{id:"citroen",name:"Citroën",logo:"https://www.carlogos.org/car-logos/citroen-logo.png",models:[{name:"C3",years:[2002,2025]},{name:"C4",years:[2004,2025]},{name:"C5",years:[2001,2025]},{name:"C3 Aircross",years:[2017,2025]},{name:"C5 Aircross",years:[2018,2025]},{name:"Berlingo",years:[1996,2025]},{name:"ë-C4",years:[2020,2025]}]},{id:"opel",name:"Opel",logo:"https://www.carlogos.org/car-logos/opel-logo.png",models:[{name:"Corsa",years:[1982,2025]},{name:"Astra",years:[1991,2025]},{name:"Insignia",years:[2008,2025]},{name:"Mokka",years:[2012,2025]},{name:"Crossland",years:[2017,2025]},{name:"Grandland",years:[2017,2025]},{name:"Combo",years:[1986,2025]},{name:"Zafira",years:[1999,2019]}]},{id:"skoda",name:"Škoda",logo:"https://www.carlogos.org/car-logos/skoda-logo.png",models:[{name:"Fabia",years:[1999,2025]},{name:"Scala",years:[2019,2025]},{name:"Octavia",years:[1996,2025]},{name:"Superb",years:[2001,2025]},{name:"Kamiq",years:[2019,2025]},{name:"Karoq",years:[2017,2025]},{name:"Kodiaq",years:[2016,2025]},{name:"Enyaq iV",years:[2021,2025]}]},{id:"hyundai",name:"Hyundai",logo:"https://www.carlogos.org/car-logos/hyundai-logo.png",models:[{name:"i10",years:[2007,2025]},{name:"i20",years:[2008,2025]},{name:"i30",years:[2007,2025]},{name:"Tucson",years:[2004,2025]},{name:"Santa Fe",years:[2e3,2025]},{name:"Kona",years:[2017,2025]},{name:"Ioniq",years:[2016,2025]},{name:"Ioniq 5",years:[2021,2025]},{name:"Ioniq 6",years:[2022,2025]}]},{id:"kia",name:"Kia",logo:"https://www.carlogos.org/car-logos/kia-logo.png",models:[{name:"Picanto",years:[2004,2025]},{name:"Rio",years:[2e3,2025]},{name:"Ceed",years:[2007,2025]},{name:"Stonic",years:[2017,2025]},{name:"Sportage",years:[1993,2025]},{name:"Sorento",years:[2002,2025]},{name:"Niro",years:[2016,2025]},{name:"EV6",years:[2021,2025]},{name:"EV9",years:[2023,2025]}]},{id:"volvo",name:"Volvo",logo:"https://www.carlogos.org/car-logos/volvo-logo.png",models:[{name:"V40",years:[2012,2019]},{name:"V60",years:[2010,2025]},{name:"V90",years:[2016,2025]},{name:"S60",years:[2e3,2025]},{name:"S90",years:[2016,2025]},{name:"XC40",years:[2017,2025]},{name:"XC60",years:[2008,2025]},{name:"XC90",years:[2002,2025]},{name:"C40",years:[2021,2025]},{name:"EX30",years:[2023,2025]}]},{id:"fiat",name:"Fiat",logo:"https://www.carlogos.org/car-logos/fiat-logo.png",models:[{name:"500",years:[2007,2025]},{name:"Panda",years:[1980,2025]},{name:"Tipo",years:[1988,2025]},{name:"500X",years:[2014,2025]},{name:"500L",years:[2012,2025]},{name:"Ducato",years:[1981,2025]}]},{id:"alfa-romeo",name:"Alfa Romeo",logo:"https://www.carlogos.org/car-logos/alfa-romeo-logo.png",models:[{name:"Giulia",years:[2016,2025]},{name:"Stelvio",years:[2017,2025]},{name:"Tonale",years:[2022,2025]},{name:"Giulietta",years:[2010,2020]},{name:"MiTo",years:[2008,2018]}]},{id:"jeep",name:"Jeep",logo:"https://www.carlogos.org/car-logos/jeep-logo.png",models:[{name:"Renegade",years:[2014,2025]},{name:"Compass",years:[2006,2025]},{name:"Cherokee",years:[1974,2025]},{name:"Grand Cherokee",years:[1992,2025]},{name:"Wrangler",years:[1986,2025]},{name:"Gladiator",years:[2019,2025]},{name:"Avenger",years:[2023,2025]}]},{id:"land-rover",name:"Land Rover",logo:"https://www.carlogos.org/car-logos/land-rover-logo.png",models:[{name:"Defender",years:[1983,2025]},{name:"Discovery",years:[1989,2025]},{name:"Discovery Sport",years:[2014,2025]},{name:"Range Rover",years:[1970,2025]},{name:"Range Rover Sport",years:[2005,2025]},{name:"Range Rover Evoque",years:[2011,2025]},{name:"Range Rover Velar",years:[2017,2025]}]},{id:"mini",name:"Mini",logo:"https://www.carlogos.org/car-logos/mini-logo.png",models:[{name:"Cooper",years:[2001,2025]},{name:"Clubman",years:[2007,2025]},{name:"Countryman",years:[2010,2025]},{name:"Paceman",years:[2012,2016]},{name:"Electric",years:[2020,2025]}]},{id:"porsche",name:"Porsche",logo:"https://www.carlogos.org/car-logos/porsche-logo.png",models:[{name:"911",years:[1963,2025]},{name:"Cayenne",years:[2002,2025]},{name:"Macan",years:[2014,2025]},{name:"Panamera",years:[2009,2025]},{name:"Taycan",years:[2019,2025]},{name:"Boxster",years:[1996,2025]},{name:"Cayman",years:[2005,2025]}]},{id:"tesla",name:"Tesla",logo:"https://www.carlogos.org/car-logos/tesla-logo.png",models:[{name:"Model S",years:[2012,2025]},{name:"Model 3",years:[2017,2025]},{name:"Model X",years:[2015,2025]},{name:"Model Y",years:[2020,2025]},{name:"Cybertruck",years:[2023,2025]}]},{id:"lexus",name:"Lexus",logo:"https://www.carlogos.org/car-logos/lexus-logo.png",models:[{name:"CT",years:[2011,2025]},{name:"IS",years:[1999,2025]},{name:"ES",years:[1989,2025]},{name:"LS",years:[1989,2025]},{name:"NX",years:[2014,2025]},{name:"RX",years:[1998,2025]},{name:"UX",years:[2018,2025]}]},{id:"subaru",name:"Subaru",logo:"https://www.carlogos.org/car-logos/subaru-logo.png",models:[{name:"Impreza",years:[1992,2025]},{name:"Forester",years:[1997,2025]},{name:"Outback",years:[1994,2025]},{name:"XV",years:[2012,2025]},{name:"Levorg",years:[2014,2025]},{name:"BRZ",years:[2012,2025]},{name:"Solterra",years:[2022,2025]}]}];function Vi(r){const[e,t]=r.years,s=[];for(let n=t;n>=e;n--)s.push(n);return s}function Fi(r){if(!r)return at;const e=r.toLowerCase();return at.filter(t=>t.name.toLowerCase().includes(e))}function Ki({serviceId:r,onNext:e,onBack:t,initialData:s={}}){const n=document.createElement("div");n.className="booking-step step-vehicle-info";const a=r==="pojasevi",i=r==="zvjezdano-nebo";let o={stage:"brand",selectedBrand:s.marka?at.find(m=>m.name===s.marka):null,selectedModel:s.model||null,selectedYear:s.godina||null,searchQuery:"",isManualEntry:!1};o.selectedBrand&&o.selectedModel&&o.selectedYear&&(o.stage="details");function l(){n.innerHTML=`
            <h2 class="step-title">
                <span class="heading-top">KORAK 2</span>
                <span class="heading-bottom">Podaci o Vozilu</span>
            </h2>
            
            <div class="vehicle-selection-container glass">
                ${c()}
                ${u()}
            </div>
        `,v()}function c(){const m=[];return o.selectedBrand&&m.push(`<span class="breadcrumb-item">${o.selectedBrand.name}</span>`),o.selectedModel&&m.push(`<span class="breadcrumb-item">${o.selectedModel}</span>`),o.selectedYear&&m.push(`<span class="breadcrumb-item">${o.selectedYear}</span>`),m.length===0?"":`
            <div class="breadcrumb">
                ${m.join('<span class="breadcrumb-separator">›</span>')}
            </div>
        `}function u(){switch(o.stage){case"brand":return f();case"model":return d();case"year":return h();case"manual":return p();case"details":return g();default:return""}}function f(){const m=Fi(o.searchQuery);return`
            <div class="selection-stage">
                <div class="search-container">
                    <input 
                        type="text" 
                        class="search-input input" 
                        placeholder="Pretraži marku vozila..." 
                        value="${o.searchQuery}"
                        id="brand-search"
                    />
                </div>

                <div class="brands-grid">
                    ${m.map(b=>`
                        <div class="brand-card" data-brand-id="${b.id}">
                            <div class="brand-logo">
                                <img src="${b.logo}" alt="${b.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                                <div class="brand-fallback" style="display:none;">${b.name.charAt(0)}</div>
                            </div>
                            <div class="brand-name">${b.name}</div>
                        </div>
                    `).join("")}
                    
                    ${m.length>0?`
                        <div class="brand-card brand-card-other" id="other-brand-btn">
                            <div class="brand-logo">
                                <div class="brand-fallback" style="display:block;">
                                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M12 5v14M5 12h14"/>
                                    </svg>
                                </div>
                            </div>
                            <div class="brand-name">Ostalo</div>
                        </div>
                    `:""}
                </div>

                ${m.length===0?`
                    <div class="no-results">
                        <p>Nema rezultata za "${o.searchQuery}"</p>
                        <button class="btn btn-secondary" id="other-brand-btn-no-results">
                            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 5v14M5 12h14"/>
                            </svg>
                            Unesi vozilo ručno
                        </button>
                    </div>
                `:""}

                <div class="step-actions">
                    <button type="button" class="btn btn-secondary" id="back-btn">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                        Natrag
                    </button>
                </div>
            </div>
        `}function d(){return`
            <div class="selection-stage">
                <button class="back-to-stage-btn" id="back-to-brand">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    Promijeni marku
                </button>

                <h3 class="stage-title">Odaberi model</h3>

                <div class="models-grid">
                    ${o.selectedBrand.models.map(b=>`
                        <div class="model-card" data-model-name="${b.name}">
                            <div class="model-name">${b.name}</div>
                            <div class="model-years">${b.years[0]} - ${b.years[1]}</div>
                        </div>
                    `).join("")}
                </div>

                <div class="step-actions">
                    <button type="button" class="btn btn-secondary" id="back-btn">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                        Natrag
                    </button>
                </div>
            </div>
        `}function h(){const m=o.selectedBrand.models.find(y=>y.name===o.selectedModel);return`
            <div class="selection-stage">
                <button class="back-to-stage-btn" id="back-to-model">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    Promijeni model
                </button>

                <h3 class="stage-title">Odaberi godinu</h3>

                <div class="years-grid">
                    ${Vi(m).map(y=>`
                        <div class="year-card" data-year="${y}">
                            ${y}
                        </div>
                    `).join("")}
                </div>

                <div class="step-actions">
                    <button type="button" class="btn btn-secondary" id="back-btn">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                        Natrag
                    </button>
                </div>
            </div>
        `}function p(){var m;return`
            <div class="selection-stage">
                <button class="back-to-stage-btn" id="back-to-brand-from-manual">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    Natrag na odabir marke
                </button>

                <h3 class="stage-title">Unesi podatke o vozilu</h3>
                <p class="stage-description">Unesite informacije o vašem vozilu ručno.</p>

                <form class="manual-entry-form" id="manual-entry-form">
                    <div class="form-group">
                        <label class="form-label">Marka vozila *</label>
                        <input 
                            type="text" 
                            class="input" 
                            name="marka" 
                            placeholder="npr. Tesla, Polestar, Rivian..." 
                            required
                            value="${((m=o.selectedBrand)==null?void 0:m.name)||""}"
                        />
                    </div>

                    <div class="form-group">
                        <label class="form-label">Model vozila *</label>
                        <input 
                            type="text" 
                            class="input" 
                            name="model" 
                            placeholder="npr. Model 3, 2, R1T..." 
                            required
                            value="${o.selectedModel||""}"
                        />
                    </div>

                    <div class="form-group">
                        <label class="form-label">Godina proizvodnje *</label>
                        <input 
                            type="number" 
                            class="input" 
                            name="godina" 
                            placeholder="npr. 2023" 
                            min="1950" 
                            max="2030" 
                            required
                            value="${o.selectedYear||""}"
                        />
                    </div>

                    <div class="step-actions">
                        <button type="button" class="btn btn-secondary" id="back-btn">
                            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M19 12H5M12 19l-7-7 7-7"/>
                            </svg>
                            Natrag
                        </button>
                        <button type="submit" class="btn btn-cta">
                            Nastavi
                            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        `}function g(){return`
            <div class="selection-stage">
                <button class="back-to-stage-btn" id="back-to-year">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    Promijeni godinu
                </button>

                <div class="selected-vehicle-summary">
                    <h3>Odabrano vozilo</h3>
                    <p class="vehicle-info">${o.selectedBrand.name} ${o.selectedModel} (${o.selectedYear})</p>
                </div>

                <form class="details-form" id="details-form">
                    ${a?`
                        <div class="form-group">
                            <label class="form-label">Broj pojaseva</label>
                            <select class="input" name="brojPojaseva" required>
                                <option value="">Odaberi...</option>
                                ${[1,2,3,4,5].map(m=>`<option value="${m}" ${s.brojPojaseva==m?"selected":""}>${m}</option>`).join("")}
                            </select>
                        </div>

                        <div class="checkbox-wrapper">
                            <input type="checkbox" class="checkbox" id="vlastiti-pojasevi" name="vlastitiPojasevi" ${s.vlastitiPojasevi?"checked":""}>
                            <label for="vlastiti-pojasevi">Nosim vlastite pojaseve / rastavljeni sustav</label>
                        </div>
                    `:""}

                    ${i?`
                        <div class="form-group">
                            <label class="form-label">Broj zvjezdica</label>
                            <select class="input" name="brojZvjezdica" required>
                                <option value="">Odaberi...</option>
                                ${[100,150,200,250,300,400,500,750,1e3].map(m=>`
                                    <option value="${m}" ${s.brojZvjezdica==m?"selected":""}>${m}</option>
                                `).join("")}
                            </select>
                        </div>
                    `:""}

                    <div class="form-group">
                        <label class="form-label">Kratka napomena (opcionalno)</label>
                        <textarea class="input" name="napomena" rows="4" placeholder="Dodatne informacije...">${s.napomena||""}</textarea>
                    </div>

                    <div class="step-actions">
                        <button type="button" class="btn btn-secondary" id="back-btn">
                            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M19 12H5M12 19l-7-7 7-7"/>
                            </svg>
                            Natrag
                        </button>
                        <button type="submit" class="btn btn-cta">
                            Nastavi
                            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        `}function v(){const m=n.querySelector("#brand-search");m&&m.addEventListener("input",A=>{o.searchQuery=A.target.value,l()}),n.querySelectorAll(".brand-card:not(.brand-card-other)").forEach(A=>{A.addEventListener("click",()=>{const se=A.dataset.brandId;o.selectedBrand=at.find(D=>D.id===se),o.stage="model",l()})});const y=n.querySelector("#other-brand-btn");y&&y.addEventListener("click",()=>{o.stage="manual",o.isManualEntry=!0,l()});const x=n.querySelector("#other-brand-btn-no-results");x&&x.addEventListener("click",()=>{o.stage="manual",o.isManualEntry=!0,l()}),n.querySelectorAll(".model-card").forEach(A=>{A.addEventListener("click",()=>{o.selectedModel=A.dataset.modelName,o.stage="year",l()})}),n.querySelectorAll(".year-card").forEach(A=>{A.addEventListener("click",()=>{o.selectedYear=A.dataset.year,o.stage="details",l()})});const k=n.querySelector("#back-to-brand");k&&k.addEventListener("click",()=>{o.stage="brand",o.selectedBrand=null,o.selectedModel=null,o.selectedYear=null,l()});const S=n.querySelector("#back-to-model");S&&S.addEventListener("click",()=>{o.stage="model",o.selectedModel=null,o.selectedYear=null,l()});const j=n.querySelector("#back-to-year");j&&j.addEventListener("click",()=>{o.stage="year",o.selectedYear=null,l()});const P=n.querySelector("#back-to-brand-from-manual");P&&P.addEventListener("click",()=>{o.stage="brand",o.isManualEntry=!1,l()});const M=n.querySelector("#manual-entry-form");M&&M.addEventListener("submit",A=>{A.preventDefault();const se=new FormData(M),D=Object.fromEntries(se.entries());o.selectedBrand={name:D.marka},o.selectedModel=D.model,o.selectedYear=D.godina,o.isManualEntry=!0,o.stage="details",l()});const F=n.querySelector("#details-form");F&&F.addEventListener("submit",A=>{var Z;A.preventDefault();const se=new FormData(F),D=Object.fromEntries(se.entries());D.marka=o.selectedBrand.name,D.model=o.selectedModel,D.godina=o.selectedYear,D.vlastitiPojasevi=((Z=F.querySelector("#vlastiti-pojasevi"))==null?void 0:Z.checked)||!1,e(D)});const q=n.querySelector("#back-btn");q&&q.addEventListener("click",()=>{o.stage==="brand"?t():(o.stage==="model"?(o.stage="brand",o.selectedBrand=null):o.stage==="year"?(o.stage="model",o.selectedModel=null):o.stage==="details"&&(o.stage="year",o.selectedYear=null),l())})}return l(),n}const en=document.createElement("style");en.textContent=`
    .vehicle-selection-container {
        max-width: 900px;
        margin: 0 auto;
        padding: var(--spacing-2xl);
    }

    .breadcrumb {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        margin-bottom: var(--spacing-xl);
        padding-bottom: var(--spacing-lg);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 0.9rem;
        color: var(--text-secondary);
    }

    .breadcrumb-item {
        color: var(--accent);
        font-weight: 600;
    }

    .breadcrumb-separator {
        color: var(--text-secondary);
        opacity: 0.5;
    }

    .selection-stage {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xl);
    }

    .search-container {
        width: 100%;
    }

    .search-input {
        width: 100%;
        font-size: 1rem;
    }

    .brands-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--spacing-lg);
    }

    @media (max-width: 1024px) {
        .brands-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    .brand-card {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: var(--radius-md);
        padding: var(--spacing-lg);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-md);
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .brand-card:hover {
        background: rgba(0, 152, 255, 0.1);
        border-color: var(--accent);
        transform: translateY(-4px);
    }

    .brand-card-other {
        background: rgba(0, 152, 255, 0.05);
        border: 2px dashed rgba(0, 152, 255, 0.3);
    }

    .brand-card-other:hover {
        background: rgba(0, 152, 255, 0.15);
        border-color: var(--accent);
    }

    .brand-card-other .brand-fallback {
        background: transparent;
        border: 2px solid var(--accent);
    }

    .brand-card-other .icon {
        width: 40px;
        height: 40px;
        color: var(--accent);
    }

    .brand-logo {
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .brand-logo img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        filter: brightness(0.9);
    }

    .brand-fallback {
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--accent);
        border-radius: 50%;
        font-size: 2rem;
        font-weight: bold;
        color: white;
    }

    .brand-name {
        font-weight: 600;
        text-align: center;
        font-size: 0.9rem;
    }

    .models-grid,
    .years-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--spacing-md);
    }

    @media (max-width: 1024px) {
        .models-grid,
        .years-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    .model-card,
    .year-card {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: var(--radius-md);
        padding: var(--spacing-lg);
        cursor: pointer;
        transition: all 0.3s ease;
        text-align: center;
    }

    .model-card:hover,
    .year-card:hover {
        background: rgba(0, 152, 255, 0.1);
        border-color: var(--accent);
        transform: translateY(-2px);
    }

    .model-name {
        font-weight: 600;
        font-size: 1.1rem;
        margin-bottom: var(--spacing-xs);
    }

    .model-years {
        font-size: 0.85rem;
        color: var(--text-secondary);
    }

    .year-card {
        font-size: 1.2rem;
        font-weight: 600;
    }

    .years-grid {
        grid-template-columns: repeat(3, 1fr);
        max-height: 400px;
        overflow-y: auto;
    }

    @media (max-width: 1024px) {
        .years-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    .back-to-stage-btn {
        background: none;
        border: none;
        color: var(--accent);
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
        cursor: pointer;
        font-size: 0.9rem;
        padding: var(--spacing-sm);
        margin: calc(var(--spacing-lg) * -1) calc(var(--spacing-lg) * -1) 0;
        transition: opacity 0.3s ease;
    }

    .back-to-stage-btn:hover {
        opacity: 0.8;
    }

    .back-to-stage-btn .icon {
        width: 16px;
        height: 16px;
    }

    .stage-title {
        font-size: 1.5rem;
        font-weight: bold;
        margin: 0;
    }

    .stage-description {
        margin: 0;
        color: var(--text-secondary);
        font-size: 0.95rem;
        line-height: 1.6;
    }

    .selected-vehicle-summary {
        background: rgba(0, 152, 255, 0.1);
        border: 1px solid var(--accent);
        border-radius: var(--radius-md);
        padding: var(--spacing-lg);
        text-align: center;
    }

    .selected-vehicle-summary h3 {
        margin: 0 0 var(--spacing-sm) 0;
        font-size: 1rem;
        color: var(--text-secondary);
    }

    .vehicle-info {
        margin: 0;
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--accent);
    }

    .details-form {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-lg);
    }

    .no-results {
        text-align: center;
        padding: var(--spacing-2xl);
        color: var(--text-secondary);
        display: flex;
        flex-direction: column;
        gap: var(--spacing-lg);
        align-items: center;
    }

    .no-results p {
        margin: 0;
    }

    .manual-entry-form {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-lg);
    }

    @media (max-width: 768px) {
        .brands-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-md);
        }

        .brand-logo {
            width: 60px;
            height: 60px;
        }

        .brand-fallback {
            width: 60px;
            height: 60px;
            font-size: 1.5rem;
        }

        .brand-card-other .icon {
            width: 30px;
            height: 30px;
        }

        .models-grid,
        .years-grid {
            grid-template-columns: 1fr;
        }
    }
`;document.head.appendChild(en);function Gi({onNext:r,onBack:e,initialData:t={}}){const s=document.createElement("div");s.className="booking-step step-calendar";const n=new Date;let a=n.getMonth(),i=n.getFullYear(),o=t.date||null,l=t.time||null;s.innerHTML=`
    <h2 class="step-title">
      <span class="heading-top">KORAK 3</span>
      <span class="heading-bottom">Odaberi Termin</span>
    </h2>
    
    <div class="calendar-container glass">
      <div class="calendar-header">
        <button class="btn btn-secondary calendar-nav" id="prev-month">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <h3 class="calendar-month" id="calendar-month"></h3>
        <button class="btn btn-secondary calendar-nav" id="next-month">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>
      
      <div class="calendar-weekdays">
        <div>Pon</div>
        <div>Uto</div>
        <div>Sri</div>
        <div>Čet</div>
        <div>Pet</div>
        <div>Sub</div>
        <div>Ned</div>
      </div>
      
      <div class="calendar-days" id="calendar-days"></div>
      
      <div class="calendar-legend">
        <div class="legend-item">
          <div class="legend-color available"></div>
          <span>Dostupno</span>
        </div>
        <div class="legend-item">
          <div class="legend-color almost-full"></div>
          <span>Skoro popunjeno</span>
        </div>
        <div class="legend-item">
          <div class="legend-color unavailable"></div>
          <span>Popunjeno</span>
        </div>
      </div>
    </div>
    
    <div class="time-slots-container hidden" id="time-slots">
      <h3 class="time-slots-title">Odaberi vrijeme</h3>
      <p style="text-align: center; color: var(--color-text-muted); margin-bottom: var(--spacing-md); font-size: 0.9rem;">
        Napomena: Vozilo je potrebno dovesti u jutarnjem (10-12h) ili popodnevnom (14-16h) terminu.
      </p>
      <div class="time-slots-grid" id="time-slots-grid"></div>
    </div>
    
    <div class="step-actions">
      <button type="button" class="btn btn-secondary" id="back-btn">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Natrag
      </button>
      <button type="button" class="btn btn-cta" id="next-btn" disabled>
        Nastavi
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  `;const c=async()=>{const f=["Siječanj","Veljača","Ožujak","Travanj","Svibanj","Lipanj","Srpanj","Kolovoz","Rujan","Listopad","Studeni","Prosinac"];s.querySelector("#calendar-month").textContent=`${f[a]} ${i}`;const d=new Date(i,a,1),p=new Date(i,a+1,0).getDate(),g=d.getDay()===0?6:d.getDay()-1,v=await C.getCalendarAvailability(i,a),m=s.querySelector("#calendar-days");m.innerHTML="";for(let b=0;b<g;b++){const y=document.createElement("div");y.className="calendar-day empty",m.appendChild(y)}for(let b=1;b<=p;b++){const y=new Date(i,a,b),x=y<n&&y.toDateString()!==n.toDateString(),w=(v[b]||{status:"unavailable"}).status,k=document.createElement("button");k.className=`calendar-day ${w} ${x?"past":""}`,k.textContent=b,k.disabled=x||w==="unavailable",k.disabled||k.addEventListener("click",()=>{o=`${i}-${String(a+1).padStart(2,"0")}-${String(b).padStart(2,"0")}`,u(o)}),m.appendChild(k)}},u=async f=>{const d=s.querySelector("#time-slots"),h=s.querySelector("#time-slots-grid"),p=await C.getTimeSlots(f);h.innerHTML=p.map(g=>`
      <button class="time-slot ${g.available?"":"disabled"}" 
              data-time="${g.time}" 
              ${g.available?"":"disabled"}>
        ${g.time}
      </button>
    `).join(""),d.classList.remove("hidden"),h.querySelectorAll(".time-slot").forEach(g=>{g.addEventListener("click",()=>{l=g.dataset.time,h.querySelectorAll(".time-slot").forEach(v=>v.classList.remove("selected")),g.classList.add("selected"),s.querySelector("#next-btn").disabled=!1})})};return s.querySelector("#prev-month").addEventListener("click",()=>{a--,a<0&&(a=11,i--),c()}),s.querySelector("#next-month").addEventListener("click",()=>{a++,a>11&&(a=0,i++),c()}),s.querySelector("#back-btn").addEventListener("click",e),s.querySelector("#next-btn").addEventListener("click",()=>{o&&l&&r({date:o,time:l})}),c(),s}const tn=document.createElement("style");tn.textContent=`
  .calendar-container {
    max-width: 700px;
    margin: 0 auto;
    padding: var(--spacing-xl);
  }

  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-lg);
  }

  .calendar-month {
    font-size: 1.5rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .calendar-nav {
    padding: var(--spacing-sm);
  }

  .calendar-weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: var(--spacing-xs);
    margin-bottom: var(--spacing-md);
    text-align: center;
    font-weight: 700;
    font-size: 0.9rem;
    color: var(--color-text-muted);
  }

  .calendar-days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: var(--spacing-xs);
  }

  .calendar-day {
    aspect-ratio: 1;
    border: 1px solid var(--glass-border);
    background: rgba(255, 255, 255, 0.05);
    color: var(--color-text);
    font-weight: 700;
    cursor: pointer;
    transition: all var(--transition-fast);
    font-family: var(--font-body);
  }

  .calendar-day.empty {
    background: transparent;
    border: none;
    cursor: default;
  }

  .calendar-day.past {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .calendar-day.available {
    border-color: var(--color-available);
  }

  .calendar-day.available:hover:not(:disabled) {
    background: rgba(0, 255, 0, 0.2);
    transform: scale(1.05);
  }

  .calendar-day.almost-full {
    border-color: var(--color-almost-full);
  }

  .calendar-day.almost-full:hover:not(:disabled) {
    background: rgba(255, 255, 0, 0.2);
  }

  .calendar-day.unavailable {
    border-color: var(--color-unavailable);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .calendar-legend {
    display: flex;
    justify-content: center;
    gap: var(--spacing-xl);
    margin-top: var(--spacing-lg);
    padding-top: var(--spacing-lg);
    border-top: 1px solid var(--glass-border);
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: 0.9rem;
  }

  .legend-color {
    width: 20px;
    height: 20px;
    border: 2px solid;
  }

  .legend-color.available {
    border-color: var(--color-available);
  }

  .legend-color.almost-full {
    border-color: var(--color-almost-full);
  }

  .legend-color.unavailable {
    border-color: var(--color-unavailable);
  }

  .time-slots-container {
    max-width: 700px;
    margin: var(--spacing-xl) auto 0;
  }

  .time-slots-title {
    text-align: center;
    margin-bottom: var(--spacing-lg);
    font-size: 1.3rem;
  }

  .time-slots-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: var(--spacing-md);
  }

  .time-slot {
    padding: var(--spacing-md);
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    color: var(--color-text);
    font-family: var(--font-body);
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all var(--transition-base);
  }

  .time-slot:hover:not(:disabled) {
    border-color: var(--color-accent);
    background: rgba(254, 0, 2, 0.1);
  }

  .time-slot.selected {
    background: var(--color-accent);
    border-color: var(--color-accent);
    color: #ffffff;
  }

    opacity: 0.3;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    .calendar-container {
        padding: var(--spacing-sm);
    }
    
    .calendar-weekdays {
        font-size: 0.75rem;
        gap: 2px;
    }
    
    .calendar-days {
        gap: 2px;
    }
    
    .calendar-day {
        font-size: 0.8rem;
        border-width: 0.5px;
    }
    
    .calendar-legend {
        flex-direction: column;
        align-items: flex-start; /* Align left */
        gap: var(--spacing-xs);
        font-size: 0.8rem;
    }
    
    .time-slots-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--spacing-sm);
    }
    
    .time-slot {
        font-size: 0.9rem;
        padding: var(--spacing-sm);
    }
  }
`;document.head.appendChild(tn);function Wi({onNext:r,onBack:e,initialData:t={}}){const s=document.createElement("div");s.className="booking-step step-customer-info",s.innerHTML=`
    <h2 class="step-title">
      <span class="heading-top">KORAK 4</span>
      <span class="heading-bottom">Vaši Podaci</span>
    </h2>
    
    <form class="customer-form glass" id="customer-form">
      <div class="form-group">
        <label class="form-label">Ime i prezime</label>
        <input type="text" class="input" name="imePrezime" required value="${t.imePrezime||""}">
      </div>

      <div class="form-group">
        <label class="form-label">Email</label>
        <input type="email" class="input" name="email" required value="${t.email||""}">
      </div>

      <div class="form-group">
        <label class="form-label">Telefon (WhatsApp)</label>
        <input type="tel" class="input" name="telefon" required placeholder="+385 xx xxx xxxx" value="${t.telefon||""}">
      </div>

      <div class="form-group">
        <label class="form-label">Registracija vozila</label>
        <input type="text" class="input" name="registracija" required placeholder="ZG-1234-AB" value="${t.registracija||""}">
      </div>

      <div class="form-checkboxes">
        <div class="checkbox-wrapper">
          <input type="checkbox" class="checkbox" id="whatsapp-reminder" name="whatsappPodsjetnik" ${t.whatsappPodsjetnik?"checked":""}>
          <label for="whatsapp-reminder">Želim WhatsApp podsjetnik dan prije termina</label>
        </div>

        <div class="checkbox-wrapper">
          <input type="checkbox" class="checkbox" id="email-reminder" name="emailPodsjetnik" ${t.emailPodsjetnik?"checked":""}>
          <label for="email-reminder">Želim mail podsjetnik dan prije termina</label>
        </div>
      </div>

      <div class="step-actions">
        <button type="button" class="btn btn-secondary" id="back-btn">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Natrag
        </button>
        <button type="submit" class="btn btn-cta">
          Nastavi
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </form>
  `;const n=s.querySelector("#customer-form");return n.addEventListener("submit",a=>{a.preventDefault();const i=new FormData(n),o=Object.fromEntries(i.entries());o.whatsappPodsjetnik=n.querySelector("#whatsapp-reminder").checked,o.emailPodsjetnik=n.querySelector("#email-reminder").checked,r(o)}),s.querySelector("#back-btn").addEventListener("click",e),s}const rn=document.createElement("style");rn.textContent=`
  .customer-form {
    max-width: 600px;
    margin: 0 auto;
    padding: var(--spacing-2xl);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  .form-checkboxes {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    padding: var(--spacing-lg);
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--glass-border);
  }
`;document.head.appendChild(rn);function Ji({bookingData:r,onNext:e,onBack:t}){const s=document.createElement("div");s.className="booking-step step-review";const n=C.services.find(c=>c.id===r.serviceId),i=new Date(r.date).toLocaleDateString("hr-HR",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),l=parseInt(r.time.split(":")[0])<13?"Jutro":"Popodne";return s.innerHTML=`
    <h2 class="step-title">
      <span class="heading-top">KORAK 5</span>
      <span class="heading-bottom">Pregled Rezervacije</span>
    </h2>
    
    <div class="review-container glass">
      <div class="review-section">
        <h3 class="review-section-title">Usluga</h3>
        <div class="review-item">
          <span class="review-icon">${n.icon}</span>
          <span class="review-value">${n.name}</span>
        </div>
      </div>

      <div class="review-section">
        <h3 class="review-section-title">Vozilo</h3>
        <div class="review-item">
          <span class="review-label">Vozilo:</span>
          <span class="review-value">${r.marka} ${r.model} (${r.godina})</span>
        </div>
        <div class="review-item">
          <span class="review-label">Registracija:</span>
          <span class="review-value">${r.registracija}</span>
        </div>
        ${r.brojPojaseva?`
          <div class="review-item">
            <span class="review-label">Broj pojaseva:</span>
            <span class="review-value">${r.brojPojaseva}</span>
          </div>
        `:""}
        ${r.brojZvjezdica?`
          <div class="review-item">
            <span class="review-label">Broj zvjezdica:</span>
            <span class="review-value">${r.brojZvjezdica}</span>
          </div>
        `:""}
        ${r.vlastitiPojasevi?`
          <div class="review-item">
            <span class="review-value text-accent">✓ Vlastiti pojasevi</span>
          </div>
        `:""}
        ${r.napomena?`
          <div class="review-item">
            <span class="review-label">Napomena:</span>
            <span class="review-value">${r.napomena}</span>
          </div>
        `:""}
      </div>

      <div class="review-section">
        <h3 class="review-section-title">Termin</h3>
        <div class="review-item">
          <span class="review-label">Datum:</span>
          <span class="review-value">${i}</span>
        </div>
        <div class="review-item">
          <span class="review-label">Vrijeme:</span>
          <span class="review-value">${r.time}</span>
        </div>
        <div class="review-item">
          <span class="review-label">Period:</span>
          <span class="review-value">${l}</span>
        </div>
      </div>

      <div class="review-section">
        <h3 class="review-section-title">Kontakt</h3>
        <div class="review-item">
          <span class="review-label">Ime:</span>
          <span class="review-value">${r.imePrezime}</span>
        </div>
        <div class="review-item">
          <span class="review-label">Email:</span>
          <span class="review-value">${r.email}</span>
        </div>
        <div class="review-item">
          <span class="review-label">Telefon:</span>
          <span class="review-value">${r.telefon}</span>
        </div>
        ${r.whatsappPodsjetnik||r.emailPodsjetnik?`
          <div class="review-item">
            <span class="review-label">Podsjetnici:</span>
            <span class="review-value">
              ${r.whatsappPodsjetnik?"WhatsApp":""}
              ${r.whatsappPodsjetnik&&r.emailPodsjetnik?", ":""}
              ${r.emailPodsjetnik?"Email":""}
            </span>
          </div>
        `:""}
      </div>

      <div class="review-section">
        <h3 class="review-section-title">Lokacija</h3>
        <div class="review-item">
          <span class="review-value">Vranplaninska ulica 1, 10000 Zagreb</span>
        </div>
      </div>

      <p class="review-terms">
        Slanjem potvrđuješ uvjete usluge.
      </p>

      <div class="step-actions">
        <button type="button" class="btn btn-secondary" id="back-btn">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Natrag
        </button>
        <button type="button" class="btn btn-cta" id="confirm-btn">
          Potvrdi Rezervaciju
          <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
          </svg>
        </button>
      </div>
    </div>
  `,s.querySelector("#back-btn").addEventListener("click",t),s.querySelector("#confirm-btn").addEventListener("click",()=>e()),s}const sn=document.createElement("style");sn.textContent=`
  .review-container {
    max-width: 700px;
    margin: 0 auto;
    padding: var(--spacing-2xl);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
  }

  .review-section {
    padding-bottom: var(--spacing-lg);
    border-bottom: 1px solid var(--glass-border);
  }

  .review-section:last-of-type {
    border-bottom: none;
  }

  .review-section-title {
    font-size: 1.2rem;
    font-weight: 900;
    text-transform: uppercase;
    margin-bottom: var(--spacing-md);
    color: var(--color-accent);
  }

  .review-item {
    display: flex;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-sm);
    align-items: center;
  }

  .review-icon {
    font-size: 2rem;
  }

  .review-label {
    font-weight: 700;
    color: var(--color-text-muted);
    min-width: 120px;
  }

  .review-value {
    color: var(--color-text);
    font-size: 1.05rem;
  }

  .review-terms {
    text-align: center;
    font-size: 0.9rem;
    color: var(--color-text-muted);
    font-style: italic;
  @media (max-width: 768px) {
    .review-container {
      padding: var(--spacing-lg);
      gap: var(--spacing-lg);
    }
    
    .review-section-title {
        font-size: 1rem;
    }
    
    .review-value, .review-label {
        font-size: 0.95rem;
    }
    
    .review-icon {
        font-size: 1.5rem;
    }
    
    .review-section {
        padding-bottom: var(--spacing-sm);
    }
  }
`;document.head.appendChild(sn);function Yi({bookingData:r}){const e=document.createElement("div");e.className="booking-step step-success";const s=new Date(r.date).toLocaleDateString("hr-HR",{weekday:"long",day:"numeric",month:"long",year:"numeric"}),a=parseInt(r.time.split(":")[0])<13?"jutro":"popodne";return e.innerHTML=`
    <div class="success-content">
      <div class="success-icon">
        <svg class="icon-xl" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </div>
      
      <h1 class="success-title">
        <span class="heading-top">rezervirano!</span>
        <span class="heading-bottom">Rezervacija Potvrđena</span>
      </h1>
      
      <div class="success-message glass">
        <p class="success-text">
          Hvala! Vaš termin je rezerviran za <strong>${s}</strong> u <strong>${a}</strong>.
        </p>
        <p class="success-text">
          Poslali smo vam potvrdu na <strong>Email</strong> i <strong>WhatsApp</strong>.
        </p>
      </div>
      
      <div class="success-details">
        <div class="detail-item">
          <svg class="icon text-accent" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z"/>
          </svg>
          <span>${s} u ${r.time}</span>
        </div>
        
        <div class="detail-item">
          <svg class="icon text-accent" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <span>Vranplaninska ulica 1, Zagreb</span>
        </div>
      </div>
      
      <button class="btn btn-cta" id="home-btn">
        Povratak na početnu
        <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
      </button>
    </div>
  `,e.querySelector("#home-btn").addEventListener("click",()=>{U.navigate("/")}),e}const nn=document.createElement("style");nn.textContent=`
  .step-success {
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .success-content {
    max-width: 700px;
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-xl);
    padding: var(--spacing-2xl);
  }

  .success-icon {
    width: 120px;
    height: 120px;
    background: var(--color-accent);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    animation: successPulse 0.6s ease-out;
  }

  .success-icon .icon-xl {
    width: 80px;
    height: 80px;
  }

  @keyframes successPulse {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  .success-title {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .success-title .heading-bottom {
    font-size: 2.5rem;
  }

  .success-message {
    padding: var(--spacing-2xl);
    width: 100%;
  }

  .success-text {
    font-size: 1.2rem;
    line-height: 1.8;
    margin-bottom: var(--spacing-md);
  }

  .success-text:last-child {
    margin-bottom: 0;
  }

  .success-text strong {
    color: var(--color-accent);
  }

  .success-details {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    width: 100%;
  }

  .detail-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-md);
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
    .success-title .heading-bottom {
      font-size: 1.5rem;
    }

    .success-text {
      font-size: 0.95rem;
    }
    
    .detail-item {
        font-size: 0.9rem;
    }
    
    .success-icon {
        width: 80px;
        height: 80px;
    }
    
    .success-icon .icon-xl {
        width: 48px;
        height: 48px;
    }
  }
`;document.head.appendChild(nn);function Qi(r={}){const e=document.createElement("div");e.className="page-booking",e.appendChild(gr());const t=document.createElement("main");t.className="booking-main";const s=document.createElement("div");s.className="booking-container";let n=1,a={serviceId:r.serviceId||null,...r};const i=()=>{s.innerHTML="",n<6&&s.appendChild(Ui({currentStep:n,totalSteps:6}));const o=document.createElement("div");o.className=n===6?"":"booking-card glass";let l;switch(n){case 1:a.serviceId?l=Hi({serviceId:a.serviceId,onNext:c=>{Object.assign(a,c),n=2,i()},onBack:()=>{a.serviceId=null,i()}}):l=Di({onNext:c=>{Object.assign(a,c),i()},selectedServiceId:a.serviceId});break;case 2:l=Ki({serviceId:a.serviceId,onNext:c=>{Object.assign(a,c),n=3,i()},onBack:()=>{n=1,i()},initialData:a});break;case 3:l=Gi({onNext:c=>{Object.assign(a,c),n=4,i()},onBack:()=>{n=2,i()},initialData:a});break;case 4:l=Wi({onNext:c=>{Object.assign(a,c),n=5,i()},onBack:()=>{n=3,i()},initialData:a});break;case 5:l=Ji({bookingData:a,onNext:async()=>{var c;try{const u={service_id:a.serviceId,service_name:a.serviceName||((c=C.services.find(d=>d.id===a.serviceId))==null?void 0:c.name),marka:a.marka,model:a.model,godina:a.godina,broj_pojaseva:a.brojPojaseva,vlastiti_pojasevi:a.vlastitiPojasevi,broj_zvjezdica:a.brojZvjezdica,napomena:a.napomena,appointment_date:a.date,appointment_time:a.time,ime:a.imePrezime?a.imePrezime.split(" ")[0]:"",prezime:a.imePrezime?a.imePrezime.split(" ")[1]:"",email:a.email,telefon:a.telefon,adresa:a.adresa,is_manual_entry:a.isManualEntry||!1},f=await C.saveBooking(u);a.date=f.appointment_date,a.time=f.appointment_time,n=6,i()}catch(u){console.error("Failed to save booking:",u),alert("Došlo je do greške pri spremanju rezervacije. Molimo pokušajte ponovno.")}},onBack:()=>{n=4,i()}});break;case 6:l=Yi({bookingData:a});break}l&&(o.appendChild(l),s.appendChild(o))};return i(),t.appendChild(s),e.appendChild(t),e.appendChild(mr()),e}const an=document.createElement("style");an.textContent=`
  .page-booking {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .booking-main {
    flex: 1;
    padding: calc(var(--header-height) + var(--spacing-2xl)) 0 var(--spacing-2xl);
  }

  .booking-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-lg);
  }

  .booking-card {
    padding: var(--spacing-2xl);
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .booking-card {
      padding: var(--spacing-lg);
    }
  }
`;document.head.appendChild(an);const te={async login(r,e){var t,s;try{const{data:n,error:a}=await Y.auth.signInWithPassword({email:r,password:e});if(a)throw a;if(!(((s=(t=n.user)==null?void 0:t.user_metadata)==null?void 0:s.role)==="admin"))throw await this.logout(),new Error("Unauthorized: Admin access required");return{user:n.user,session:n.session,error:null}}catch(n){return console.error("Login error:",n),{user:null,session:null,error:n}}},async logout(){try{const{error:r}=await Y.auth.signOut();if(r)throw r;return{error:null}}catch(r){return console.error("Logout error:",r),{error:r}}},async resetPassword(r){try{const{error:e}=await Y.auth.resetPasswordForEmail(r,{redirectTo:`${window.location.origin}/admin/reset-password`});if(e)throw e;return{error:null}}catch(e){return console.error("Password reset error:",e),{error:e}}},async updatePassword(r){try{const{error:e}=await Y.auth.updateUser({password:r});if(e)throw e;return{error:null}}catch(e){return console.error("Update password error:",e),{error:e}}},async getCurrentUser(){try{const{data:{user:r},error:e}=await Y.auth.getUser();if(e)throw e;return{user:r,error:null}}catch(r){return console.error("Get user error:",r),{user:null,error:r}}},async isAuthenticated(){var r;try{const{data:{session:e}}=await Y.auth.getSession();if(!e)return!1;const{user:t}=await this.getCurrentUser();return((r=t==null?void 0:t.user_metadata)==null?void 0:r.role)==="admin"}catch(e){return console.error("Auth check error:",e),!1}},async createAdmin(r,e){try{const{data:t,error:s}=await Y.rpc("create_admin_user",{new_email:r,new_password:e});if(s)throw s;return{user:t,error:null}}catch(t){return console.error("Create admin error:",t),{user:null,error:t}}},async listAdmins(){try{const{data:r,error:e}=await Y.rpc("get_admins");if(e)throw e;return{admins:r,error:null}}catch(r){return console.error("List admins error:",r),{admins:[],error:r}}},async deleteAdmin(r){try{const{error:e}=await Y.rpc("delete_admin_user",{target_user_id:r});if(e)throw e;return{success:!0,error:null}}catch(e){return console.error("Delete admin error:",e),{success:!1,error:e}}},onAuthStateChange(r){return Y.auth.onAuthStateChange(r)}};function Xi(){const r=document.createElement("div");r.className="page-admin";let e="dashboard";const t=()=>{r.innerHTML="",r.innerHTML=`
      <div class="admin-layout">
        <aside class="admin-sidebar glass">
          <div class="admin-logo">
            <img src="/images/logo.jpg" alt="Admin" class="admin-logo-img">
          </div>
          
          <nav class="admin-nav">
            <button class="admin-nav-item ${e==="dashboard"?"active":""}" data-view="dashboard">
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
              </svg>
              <span>Dashboard</span>
            </button>
            
            <button class="admin-nav-item ${e==="calendar"?"active":""}" data-view="calendar">
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z"/>
              </svg>
              <span>Kalendar</span>
            </button>
            
            <button class="admin-nav-item ${e==="reservations"?"active":""}" data-view="reservations">
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
              </svg>
              <span>Rezervacije</span>
            </button>
            
            <button class="admin-nav-item ${e==="reviews"?"active":""}" data-view="reviews">
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/>
              </svg>
              <span>Recenzije</span>
            </button>
            
            <button class="admin-nav-item ${e==="settings"?"active":""}" data-view="settings">
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94L14.4 2.81c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
              </svg>
              <span>Postavke</span>
            </button>
          </nav>
          
          <button class="admin-logout btn btn-secondary">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
            </svg>
            <span>Odjava</span>
          </button>
        </aside>
        
        <main class="admin-content">
          <div id="admin-view"></div>
        </main>
      </div>
      <style>
        /* Mobile Layout for Admin Panel */
        @media (max-width: 1024px) {
          .admin-layout {
            grid-template-columns: 1fr;
            height: auto;
          }
          
          .admin-sidebar {
            height: auto;
            position: relative;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            padding: var(--spacing-sm);
            gap: var(--spacing-sm);
            overflow-x: auto;
            flex-shrink: 0;
          }
          
          .admin-logo {
            margin-bottom: 0;
            width: 40px;
          }

          .admin-logo-img {
              height: 30px;
          }
          
          .admin-nav {
            flex-direction: row;
            overflow-x: auto;
            flex: 1;
            padding-bottom: 0;
            gap: 2px;
          }
          
          .admin-nav-item, .admin-logout {
            padding: 8px;
            font-size: 0.8rem;
            justify-content: center;
          }
          
          .admin-nav-item span, .admin-logout span {
            display: none; /* Hide text on small screens */
          }
          
          .admin-content {
              padding: var(--spacing-md);
              overflow-x: hidden;
          }

          /* Force tables to be scrollable or convert to cards */
          .table-container {
             overflow-x: auto;
             max-width: 100%;
          }
          
          .admin-table {
              min-width: 600px; /* Ensure table doesn't squash too much */
          }
          
          /* Dashboard Widgets stack */
          .dashboard-widgets {
              grid-template-columns: 1fr;
          }
          
          /* Calendar adjustments */
          .calendar-weekdays, .calendar-days {
              font-size: 0.7rem;
          }
        }
      </style>
    `,r.querySelectorAll(".admin-nav-item").forEach(g=>{g.addEventListener("click",()=>{e=g.dataset.view,t()})}),r.innerHTML=`
      < div class="admin-layout" >
      <aside class="admin-sidebar glass">
        <div class="admin-logo">
          <img src="/images/logo.jpg" alt="Admin" class="admin-logo-img">
        </div>
        
        <nav class="admin-nav">
          <button class="admin-nav-item" data-view="dashboard">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
            </svg>
            <span>Dashboard</span>
          </button>
          
          <button class="admin-nav-item" data-view="calendar">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z"/>
            </svg>
            <span>Kalendar</span>
          </button>
          
          <button class="admin-nav-item" data-view="reservations">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
            </svg>
            <span>Rezervacije</span>
          </button>

          <button class="admin-nav-item" data-view="services">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 11H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7c0-1.1-.9-2-2-2zm0 9H5v-7h14v7zM7 15h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zM19 2H5c-1.1 0-2 .9-2 2v5h18V4c0-1.1-.9-2-2-2zm-7 6c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
            </svg>
            <span>Usluge</span>
          </button>
          
          <button class="admin-nav-item" data-view="reviews">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/>
            </svg>
            <span>Recenzije</span>
          </button>
          
          <button class="admin-nav-item" data-view="settings">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94L14.4 2.81c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
            </svg>
            <span>Postavke</span>
          </button>
        </nav>
        
        <button class="admin-logout btn btn-secondary">
          <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
          </svg>
          <span>Odjava</span>
        </button>
      </aside>
      
      <main class="admin-content">
        <div id="admin-view"></div>
      </main>
    </div >
    `,r.querySelector(".admin-logout").addEventListener("click",async()=>{await te.logout(),U.navigate("/admin/login")});const d=r.querySelectorAll(".admin-nav-item"),h=r.querySelector(".admin-content");function p(g){d.forEach(v=>{v.dataset.view===g?v.classList.add("active"):v.classList.remove("active")}),h.innerHTML="",g==="dashboard"?h.appendChild(s()):g==="reservations"?h.appendChild(a()):g==="services"?h.appendChild(i()):g==="reviews"?h.appendChild(o()):g==="calendar"?h.appendChild(n()):g==="settings"?h.appendChild(c()):h.innerHTML=`
    < div class="glass" style = "padding: var(--spacing-2xl); text-align: center;" >
          <h2>${g.charAt(0).toUpperCase()+g.slice(1)}</h2>
          <p style="margin-top: var(--spacing-md); color: var(--color-text-muted);">
            Ova sekcija je u razvoju.
          </p>
        </div >
    `}return d.forEach(g=>{g.addEventListener("click",()=>{e=g.dataset.view,p(g.dataset.view)})}),p("dashboard"),r};function s(){const d=document.createElement("div");return d.innerHTML=`
    < h1 class="admin-title" > Dashboard</h1 >

      <div class="dashboard-widgets">
        <div class="widget glass">
          <div class="widget-icon">
            <svg class="icon icon-xl text-accent" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
            </svg>
          </div>
          <div class="widget-content">
            <h3 class="widget-value" id="today-count">...</h3>
            <p class="widget-label">Rezervacije danas</p>
          </div>
        </div>

        <div class="widget glass">
          <div class="widget-icon">
            <svg class="icon icon-xl text-accent" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <div class="widget-content">
            <h3 class="widget-value" id="total-count">...</h3>
            <p class="widget-label">Ukupno rezervacija</p>
          </div>
        </div>

        <div class="widget glass">
          <div class="widget-icon">
            <svg class="icon icon-xl text-accent" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />
            </svg>
          </div>
          <div class="widget-content">
            <h3 class="widget-value" id="reviews-count">...</h3>
            <p class="widget-label">Recenzije</p>
          </div>
        </div>
      </div>
  `,C.getReservations().then(h=>{const p=new Date().toISOString().split("T")[0],g=h.filter(v=>v.appointment_date===p).length;d.querySelector("#today-count").textContent=g,d.querySelector("#total-count").textContent=h.length}).catch(h=>{console.error("Error loading dashboard data:",h),d.querySelector("#today-count").textContent="0",d.querySelector("#total-count").textContent="0"}),d.querySelector("#reviews-count").textContent=C.reviews.length,d}function n(){const d=document.createElement("div"),h=new Date;let p=h.getMonth(),g=h.getFullYear();d.innerHTML=`
    < h1 class="admin-title" > Kalendar Rezervacija</h1 >
      <div class="glass" style="padding: var(--spacing-xl);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-lg);">
          <button class="btn btn-secondary" id="prev-month">&lt;</button>
          <h2 id="calendar-month" style="margin: 0; text-transform: uppercase;"></h2>
          <button class="btn btn-secondary" id="next-month">&gt;</button>
        </div>
        
        <div class="calendar-weekdays" style="display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; font-weight: bold; margin-bottom: var(--spacing-md); color: var(--color-text-muted);">
          <div>Pon</div><div>Uto</div><div>Sri</div><div>Čet</div><div>Pet</div><div>Sub</div><div>Ned</div>
        </div>
        
        <div id="calendar-days" style="display: grid; grid-template-columns: repeat(7, 1fr); gap: var(--spacing-xs);"></div>
      </div>

      <!--Day Details Modal-- >
      <div id="day-modal" class="glass" style="display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 90%; max-width: 500px; padding: var(--spacing-xl); z-index: 1000; max-height: 80vh; overflow-y: auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-lg);">
          <h3 id="modal-date" style="margin: 0;"></h3>
          <button id="close-day-modal" style="background: none; border: none; color: white; cursor: pointer;">✕</button>
        </div>
        <div id="day-reservations-list"></div>
      </div>
      <div id="day-modal-overlay" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 999;"></div>
  `;const v=d.querySelector("#day-modal"),m=d.querySelector("#day-modal-overlay"),b=()=>{v.style.display="none",m.style.display="none"};d.querySelector("#close-day-modal").onclick=b,m.onclick=b;const y=async()=>{const x=["Siječanj","Veljača","Ožujak","Travanj","Svibanj","Lipanj","Srpanj","Kolovoz","Rujan","Listopad","Studeni","Prosinac"];d.querySelector("#calendar-month").textContent=`${x[p]} ${g} `;const _=await C.getCalendarAvailability(g,p),w=d.querySelector("#calendar-days");w.innerHTML="";const k=new Date(g,p,1),j=new Date(g,p+1,0).getDate(),P=k.getDay()===0?6:k.getDay()-1;for(let M=0;M<P;M++)w.appendChild(document.createElement("div"));for(let M=1;M<=j;M++){const F=`${g} -${String(p+1).padStart(2,"0")} -${String(M).padStart(2,"0")} `,q=_[M]||{status:"unavailable",count:0},A=document.createElement("button");A.className="calendar-day",A.style.aspectRatio="1",A.style.border="1px solid rgba(255,255,255,0.1)",A.style.background="rgba(255,255,255,0.05)",A.style.color="white",A.style.cursor="pointer",A.style.position="relative",q.status==="unavailable"?A.style.borderColor="#ef4444":q.status==="almost-full"?A.style.borderColor="#eab308":A.style.borderColor="#22c55e",A.title=`Broj rezervacija: ${q.count} `,A.innerHTML=`
    < span style = "font-weight: bold;" > ${M}</span >
      ${q.count>0?`<div style="font-size: 0.8rem; margin-top: 5px; color: var(--color-text-muted);">${q.count} rez.</div>`:""}
  `,A.onclick=async()=>{const se=await C.getReservationsByDate(F);d.querySelector("#modal-date").textContent=new Date(F).toLocaleDateString("hr-HR");const D=d.querySelector("#day-reservations-list");se.length===0?D.innerHTML="<p>Nema rezervacija za ovaj dan.</p>":D.innerHTML=se.map(Z=>`
    < div style = "background: rgba(255,255,255,0.05); padding: 10px; margin-bottom: 10px; border-radius: 4px; border-left: 3px solid ${Z.status==="confirmed"?"#10b981":Z.status==="cancelled"?"#ef4444":"#fbbf24"}" >
                            <div style="font-weight: bold;">${Z.appointment_time} - ${Z.ime} ${Z.prezime}</div>
                            <div style="font-size: 0.9rem; color: #aaa;">${Z.service_name}</div>
                            <div style="font-size: 0.8rem;">Status: ${Z.status}</div>
                        </div >
    `).join(""),v.style.display="block",m.style.display="block"},w.appendChild(A)}};return d.querySelector("#prev-month").addEventListener("click",()=>{p--,p<0&&(p=11,g--),y()}),d.querySelector("#next-month").addEventListener("click",()=>{p++,p>11&&(p=0,g++),y()}),y(),d}function a(){const d=document.createElement("div");d.innerHTML=`
    < div style = "display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-lg);" >
      <h1 class="admin-title" style="margin: 0;">Rezervacije</h1>
      <select id="status-filter" class="input" style="width: auto;">
        <option value="all">Sve rezervacije</option>
        <option value="pending">Na čekanju</option>
        <option value="confirmed">Potvrđeno</option>
        <option value="completed">Završeno</option>
        <option value="cancelled">Otkazano</option>
      </select>
    </div >
    
    <div class="table-container glass" style="overflow-x: auto;">
      <table class="admin-table" style="min-width: 800px;">
        <thead>
          <tr>
            <th>Klijent</th>
            <th>Vozilo</th>
            <th>Usluga</th>
            <th>Datum</th>
            <th>Status</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody id="reservations-tbody">
          <tr>
            <td colspan="6" style="text-align: center; padding: var(--spacing-xl); color: var(--color-text-muted);">
              Učitavanje...
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!--Reservation Details Modal-- >
    <div id="reservation-modal" class="glass" style="display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 90%; max-width: 600px; padding: var(--spacing-xl); z-index: 1000; max-height: 90vh; overflow-y: auto;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-lg);">
        <h2 class="settings-title" style="margin: 0;">Detalji Rezervacije</h2>
        <button id="close-modal-btn" style="background: none; border: none; color: var(--color-text); cursor: pointer;">
          <svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        </button>
      </div>
      
      <div id="modal-content" style="display: flex; flex-direction: column; gap: var(--spacing-md);">
        <!-- Content injected via JS -->
      </div>

      <div id="modal-actions" style="display: flex; gap: var(--spacing-md); margin-top: var(--spacing-xl); justify-content: flex-end;">
        <!-- Actions injected via JS -->
      </div>
    </div>
    <div id="modal-overlay" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 999;"></div>
  `;const h=d.querySelector("#reservations-tbody"),p=d.querySelector("#reservation-modal"),g=d.querySelector("#modal-overlay"),v=d.querySelector("#modal-content"),m=d.querySelector("#modal-actions"),b=d.querySelector("#close-modal-btn"),y=()=>{p.style.display="none",g.style.display="none"};b.addEventListener("click",y),g.addEventListener("click",y),d.querySelector("#status-filter").addEventListener("change",x);async function x(){const w=d.querySelector("#status-filter").value;h.innerHTML='<tr><td colspan="6" style="text-align: center; padding: var(--spacing-xl);">Učitavanje...</td></tr>';try{let k=await C.getReservations();if(w!=="all"&&(k=k.filter(S=>S.status===w)),k.length===0){h.innerHTML=`
    < tr >
    <td colspan="6" style="text-align: center; padding: var(--spacing-xl); color: var(--color-text-muted);">
      Nema rezervacija
    </td>
          </tr >
    `;return}h.innerHTML=k.map(S=>{const j=C.services.find(q=>q.id===S.service_id),P=`${S.ime} ${S.prezime} `,M=new Date(S.appointment_date).toLocaleDateString("hr-HR");let F="status-pending";return S.status==="confirmed"&&(F="status-confirmed"),S.status==="cancelled"&&(F="status-completed"),`
    < tr >
            <td>${P}</td>
            <td>${S.marka} ${S.model}</td>
            <td>${(j==null?void 0:j.name)||S.service_name}</td>
            <td>${M}</td>
            <td><span class="status-badge ${F}">${S.status}</span></td>
            <td>
              <button class="btn btn-secondary btn-sm btn-open-reservation" data-id="${S.id}">Otvori</button>
            </td>
          </tr >
    `}).join(""),h.querySelectorAll(".btn-open-reservation").forEach(S=>{S.addEventListener("click",()=>{const j=k.find(P=>P.id===S.dataset.id);_(j)})})}catch(k){console.error("Error loading reservations:",k),h.innerHTML='<tr><td colspan="6" style="text-align: center; color: var(--color-error);">Greška pri učitavanju</td></tr>'}}function _(w){const k=C.services.find(j=>j.id===w.service_id),S=new Date(w.appointment_date).toLocaleDateString("hr-HR");if(v.innerHTML=`
    < div style = "display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-md);" >
        <div>
          <h4 style="color: var(--color-text-muted); font-size: 0.9rem;">Klijent</h4>
          <p style="font-weight: bold;">${w.ime} ${w.prezime}</p>
          <p>${w.email}</p>
          <p>${w.telefon}</p>
        </div>
        <div>
          <h4 style="color: var(--color-text-muted); font-size: 0.9rem;">Vozilo</h4>
          <p style="font-weight: bold;">${w.marka} ${w.model} (${w.godina})</p>
          ${w.broj_pojaseva?`<p>${w.broj_pojaseva} pojaseva</p>`:""}
          ${w.vlastiti_pojasevi?"<p>Vlastiti pojasevi: Da</p>":""}
        </div>
        <div>
          <h4 style="color: var(--color-text-muted); font-size: 0.9rem;">Usluga</h4>
          <p style="font-weight: bold;">${(k==null?void 0:k.name)||w.service_name}</p>
          <p>Datum: ${S}</p>
          <p>Vrijeme: ${w.appointment_time}</p>
        </div>
        <div>
          <h4 style="color: var(--color-text-muted); font-size: 0.9rem;">Status</h4>
          <span class="status-badge status-${w.status}">${w.status}</span>
        </div>
      </div >
    ${w.napomena?`
        <div style="margin-top: var(--spacing-md);">
          <h4 style="color: var(--color-text-muted); font-size: 0.9rem;">Napomena</h4>
          <p style="background: rgba(255,255,255,0.05); padding: var(--spacing-sm); border-radius: 4px;">${w.napomena}</p>
        </div>
      `:""}
  `,m.innerHTML="",w.status==="pending"){const j=document.createElement("button");j.className="btn btn-primary",j.textContent="Prihvati",j.onclick=async()=>{j.disabled=!0,j.textContent="...",await C.updateReservationStatus(w.id,"confirmed"),y(),x()};const P=document.createElement("button");P.className="btn btn-secondary",P.style.color="#ef4444",P.style.borderColor="rgba(239, 68, 68, 0.3)",P.textContent="Odbij",P.onclick=async()=>{confirm("Jeste li sigurni da želite odbiti ovu rezervaciju?")&&(P.disabled=!0,P.textContent="...",await C.updateReservationStatus(w.id,"cancelled"),y(),x())},m.appendChild(P),m.appendChild(j)}else if(w.status==="confirmed"){const j=document.createElement("button");j.className="btn btn-primary",j.style.background="#10b981",j.textContent="Završi",j.onclick=async()=>{confirm("Jeste li sigurni da želite označiti ovu rezervaciju kao završenu?")&&(j.disabled=!0,j.textContent="...",await C.updateReservationStatus(w.id,"completed"),y(),x())};const P=document.createElement("button");P.className="btn btn-secondary",P.textContent="Zatvori",P.onclick=y,m.appendChild(P),m.appendChild(j)}else{const j=document.createElement("button");j.className="btn btn-secondary",j.textContent="Zatvori",j.onclick=y,m.appendChild(j)}p.style.display="block",g.style.display="block"}return x(),d}function i(){const d=document.createElement("div");d.innerHTML=`
    < h1 class="admin-title" > Konfiguracija Usluga</h1 >
      <div id="services-list" class="settings-grid">
        <!-- Global Settings -->
        <div class="settings-card glass" style="border-color: var(--color-accent);">
          <div style="display: flex; align-items: center; gap: var(--spacing-md); margin-bottom: var(--spacing-lg);">
            <div style="font-size: 2rem;">⚙️</div>
            <div>
              <h3 style="margin: 0;">Globalne Postavke</h3>
              <p style="color: var(--color-text-muted); font-size: 0.9rem;">Opće postavke rezervacija</p>
            </div>
          </div>

          <form class="service-config-form" data-id="global_config">
            <div class="form-group">
              <label class="form-label">Max. rezervacija po danu</label>
              <input type="number" name="duration" class="input" value="${C.maxReservations||4}" required min="1" max="20">
                <p style="font-size: 0.8rem; color: var(--color-text-muted); margin-top: 5px;">
                  Određuje koliko se termina može rezervirati u jednom danu prije nego što postane nedostupan.
                </p>
            </div>

            <div style="margin-top: var(--spacing-lg); display: flex; justify-content: flex-end;">
              <button type="submit" class="btn btn-primary btn-sm">Spremi Postavke</button>
            </div>
            <div class="message"></div>
          </form>
        </div>

        <p>Učitavanje usluga...</p>
      </div>
  `;const h=d.querySelector("#services-list");async function p(){try{await C.fetchServiceConfig();const g=C.services;h.innerHTML=g.map(v=>{const m=v.id==="pojasevi";return`
    < div class="settings-card glass" >
              <div style="display: flex; align-items: center; gap: var(--spacing-md); margin-bottom: var(--spacing-lg);">
                <div style="font-size: 2rem;">${v.icon}</div>
                <div>
                  <h3 style="margin: 0;">${v.name}</h3>
                  <p style="color: var(--color-text-muted); font-size: 0.9rem;">ID: ${v.id}</p>
                </div>
              </div>

              <form class="service-config-form" data-id="${v.id}">
                ${m?`
                  <div class="form-group">
                    <label class="form-label">Trajanje po pojasu (min)</label>
                    <input type="number" name="durationPerUnit" class="input" value="${v.durationPerUnit||30}" required min="1">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Trajanje po pojasu (Rastavljeni) (min)</label>
                    <input type="number" name="durationRastavljeni" class="input" value="${v.durationRastavljeni||10}" required min="1">
                  </div>
                `:`
                  <div class="form-group">
                    <label class="form-label">Osnovno trajanje (min)</label>
                    <input type="number" name="duration" class="input" value="${v.duration||60}" required min="1">
                  </div>
                `}
                
                <div style="margin-top: var(--spacing-lg); display: flex; justify-content: flex-end;">
                  <button type="submit" class="btn btn-primary btn-sm">Spremi Promjene</button>
                </div>
                <div class="message"></div>
              </form>
            </div >
    `}).join(""),h.querySelectorAll("form").forEach(v=>{v.addEventListener("submit",async m=>{m.preventDefault();const b=v.dataset.id,y=v.querySelector("button"),x=v.querySelector(".message"),_=new FormData(v),w={};b==="global_config"?_.has("duration")&&(w.duration_minutes=parseInt(_.get("duration"))):(_.has("duration")&&(w.duration_minutes=parseInt(_.get("duration"))),_.has("durationPerUnit")&&(w.duration_per_unit_minutes=parseInt(_.get("durationPerUnit"))),_.has("durationRastavljeni")&&(w.duration_rastavljeni_minutes=parseInt(_.get("durationRastavljeni")))),y.disabled=!0,y.textContent="Spremanje...";try{await C.updateServiceConfig(b,w),u(x,"Spremljeno!","success")}catch(k){console.error(k),u(x,"Greška","error")}finally{y.disabled=!1,y.textContent="Spremi Promjene"}})})}catch(g){console.error(g),h.innerHTML='<p style="color: var(--color-error);">Greška pri učitavanju usluga.</p>'}}return p(),d}function o(){const d=document.createElement("div");d.innerHTML=`
    < div style = "display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-xl);" >
      <h1 class="admin-title" style="margin: 0;">Recenzije</h1>
      <button id="add-review-btn" class="btn btn-primary">
        <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
        Nova Recenzija
      </button>
    </div >

    < !--Add Review Form(Hidden by default )-- >
    <div id="add-review-form-container" class="glass" style="display: none; padding: var(--spacing-xl); margin-bottom: var(--spacing-xl);">
      <h2 class="settings-title">Dodaj Novu Recenziju</h2>
      <form id="add-review-form" class="settings-form">
        <div class="form-group">
          <label class="form-label">Autor</label>
          <input type="text" id="review-author" class="input" required placeholder="Ime i prezime">
        </div>
        <div class="form-group">
          <label class="form-label">Tvrtka (opcionalno)</label>
          <input type="text" id="review-company" class="input" placeholder="Naziv tvrtke">
        </div>
        <div class="form-group">
          <label class="form-label">Slika profila / Logo (opcionalno)</label>
          <input type="file" id="review-image" class="input" accept="image/*">
        </div>
        <div class="form-group">
          <label class="form-label">Ocjena</label>
          <select id="review-rating" class="input" required>
            <option value="5">5 - Izvrsno</option>
            <option value="4">4 - Vrlo dobro</option>
            <option value="3">3 - Dobro</option>
            <option value="2">2 - Dovoljno</option>
            <option value="1">1 - Nedovoljno</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Tekst recenzije</label>
          <textarea id="review-text" class="input" rows="4" required placeholder="Napišite recenziju..."></textarea>
        </div>
        <div style="display: flex; gap: var(--spacing-md);">
          <button type="submit" class="btn btn-primary">Spremi Recenziju</button>
          <button type="button" id="cancel-review-btn" class="btn btn-secondary">Odustani</button>
        </div>
      </form>
      <div id="review-form-message" class="message"></div>
    </div>

    <div id="reviews-list" class="reviews-grid">
      <p>Učitavanje recenzija...</p>
    </div>
  `;const h=d.querySelector("#reviews-list"),p=d.querySelector("#add-review-btn"),g=d.querySelector("#add-review-form-container"),v=d.querySelector("#cancel-review-btn"),m=d.querySelector("#add-review-form"),b=d.querySelector("#review-form-message");p.addEventListener("click",()=>{g.style.display="block",p.style.display="none"}),v.addEventListener("click",()=>{g.style.display="none",p.style.display="flex",m.reset(),b.textContent="",b.className="message"}),m.addEventListener("submit",async x=>{x.preventDefault();const _=m.querySelector('button[type="submit"]'),w=_.textContent;_.disabled=!0,_.textContent="Spremanje...";const k={author:d.querySelector("#review-author").value,company:d.querySelector("#review-company").value,rating:d.querySelector("#review-rating").value,text:d.querySelector("#review-text").value},S=d.querySelector("#review-image").files[0];if(S)try{const j=await C.uploadReviewImage(S);k.logo=j}catch(j){console.error("Image upload failed:",j),u(b,"Greška pri uploadu slike: "+j.message,"error"),_.disabled=!1,_.textContent=w;return}try{await C.saveReview(k),u(b,"Recenzija uspješno spremljena!","success"),setTimeout(()=>{g.style.display="none",p.style.display="flex",m.reset(),y()},1500)}catch(j){u(b,"Greška pri spremanju: "+j.message,"error")}finally{_.disabled=!1,_.textContent=w}});async function y(){h.innerHTML="<p>Učitavanje...</p>";const x=await C.getReviews();if(!x||x.length===0){h.innerHTML="<p>Nema recenzija.</p>";return}h.innerHTML=x.map(_=>`
    < div class="review-admin-card glass" >
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: var(--spacing-md);">
          <div style="display: flex; gap: var(--spacing-md); align-items: center;">
            ${_.logo?`<img src="${_.logo}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;">`:""}
            <div>
              <div style="font-weight: 900; font-size: 1.1rem;">${_.author}</div>
              ${_.company?`<div style="color: var(--color-text-muted); font-size: 0.9rem;">${_.company}</div>`:""}
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: var(--spacing-xs); color: #fbbf24;">
            <span style="font-weight: 900; font-size: 1.2rem;">${_.rating}</span>
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
          </div>
        </div>
        
        <p style="color: var(--color-text-muted); line-height: 1.6; margin-bottom: var(--spacing-lg);">
          "${_.text}"
        </p>

        <div style="display: flex; justify-content: flex-end;">
          <button class="btn-delete-review btn-sm" data-id="${_.id}" style="background: rgba(239, 68, 68, 0.2); color: #ef4444; border: none; cursor: pointer;">
            Obriši
          </button>
        </div>
      </div >
    `).join(""),h.querySelectorAll(".btn-delete-review").forEach(_=>{let w;_.addEventListener("click",async k=>{k.preventDefault();const S=_.dataset.id;if(_.classList.contains("confirming")){clearTimeout(w),_.disabled=!0,_.textContent="Brisanje...";try{await C.deleteReview(S),y()}catch(j){console.error(j),_.textContent="Greška"}}else _.classList.add("confirming"),_.textContent="Potvrdi?",_.style.background="#ef4444",_.style.color="white",w=setTimeout(()=>{_.classList.remove("confirming"),_.textContent="Obriši",_.style.background="rgba(239, 68, 68, 0.2)",_.style.color="#ef4444"},3e3)})})}return y(),d}const l=document.createElement("style");l.textContent=`
      .page - admin {
    min - height: 100vh;
    background: var(--color - primary);
  }

  .admin - layout {
    display: grid;
    grid - template - columns: 280px 1fr;
    min - height: 100vh;
  }

  .admin - sidebar {
    position: sticky;
    top: 0;
    height: 100vh;
    display: flex;
    flex - direction: column;
    padding: var(--spacing - xl);
    border - right: 1px solid var(--glass - border);
  }

  .admin - logo {
    margin - bottom: var(--spacing - 2xl);
    text - align: center;
  }

  .admin - logo - img {
    height: 60px;
    width: auto;
  }

  .admin - nav {
    flex: 1;
    display: flex;
    flex - direction: column;
    gap: var(--spacing - sm);
  }

  .admin - nav - item {
    display: flex;
    align - items: center;
    gap: var(--spacing - md);
    padding: var(--spacing - md);
    background: transparent;
    border: 1px solid transparent;
    color: var(--color - text);
    font - family: var(--font - body);
    font - size: 0.95rem;
    cursor: pointer;
    transition: all var(--transition - fast);
    text - align: left;
  }

  .admin - nav - item:hover {
    background: var(--glass - bg);
    border - color: var(--glass - border);
  }

  .admin - nav - item.active {
    background: var(--color - accent);
    border - color: var(--color - accent);
    color: #ffffff;
  }

  .admin - logout {
    margin - top: auto;
    width: 100 %;
    justify - content: flex - start;
  }

  .admin - content {
    padding: var(--spacing - 2xl);
    overflow - y: auto;
  }

  .admin - view {
    max - width: 1400px;
    margin: 0 auto;
  }

  .admin - title {
    font - size: 2rem;
    margin - bottom: var(--spacing - xl);
  }

  .admin - header {
    display: flex;
    justify - content: space - between;
    align - items: center;
    margin - bottom: var(--spacing - xl);
  }

  .dashboard - widgets {
    display: grid;
    grid - template - columns: repeat(auto - fit, minmax(250px, 1fr));
    gap: var(--spacing - lg);
  }

  .widget {
    padding: var(--spacing - xl);
    display: flex;
    gap: var(--spacing - lg);
    align - items: center;
  }

  .widget - icon {
    flex - shrink: 0;
  }

  .widget - content {
    flex: 1;
  }

  .widget - value {
    font - size: 2.5rem;
    font - weight: 900;
    color: var(--color - accent);
    line - height: 1;
    margin - bottom: var(--spacing - xs);
  }

  .widget - label {
    font - size: 0.9rem;
    color: var(--color - text - muted);
    text - transform: uppercase;
    letter - spacing: 0.05em;
  }

  .table - container {
    padding: var(--spacing - lg);
    overflow - x: auto;
  }

  .admin - table {
    width: 100 %;
    border - collapse: collapse;
  }

  .admin - table th {
    text - align: left;
    padding: var(--spacing - md);
    border - bottom: 2px solid var(--glass - border);
    font - weight: 900;
    text - transform: uppercase;
    font - size: 0.9rem;
    color: var(--color - text - muted);
  }

  .admin - table td {
    padding: var(--spacing - md);
    border - bottom: 1px solid var(--glass - border);
  }

  .status - badge {
    padding: var(--spacing - xs) var(--spacing - sm);
    border - radius: 2px;
    font - size: 0.85rem;
    font - weight: 700;
    text - transform: uppercase;
  }

  .status - pending {
    background: rgba(255, 255, 0, 0.2);
    color: #ffff00;
  }

  .status - confirmed {
    background: rgba(0, 255, 0, 0.2);
    color: #00ff00;
  }

  .status - completed {
    background: rgba(0, 150, 255, 0.2);
    color: #0096ff;
  }

  .btn - sm {
    padding: var(--spacing - xs) var(--spacing - sm);
    font - size: 0.85rem;
  }

  .reviews - grid {
    display: grid;
    gap: var(--spacing - lg);
  }

  .review - admin - card {
    padding: var(--spacing - xl);
  }

  .review - admin - header {
    display: flex;
    justify - content: space - between;
    align - items: flex - start;
    margin - bottom: var(--spacing - md);
  }

  .company - info {
    display: flex;
    flex - direction: column;
    gap: var(--spacing - sm);
  }

  .rating {
    display: flex;
    gap: var(--spacing - xs);
  }

  .rating.star {
    width: 20px;
    height: 20px;
    color: var(--color - text - muted);
  }

  .rating.star.filled {
    color: #ffd700;
  }

  .review - actions {
    display: flex;
    gap: var(--spacing - sm);
  }

  @media(max - width: 1024px) {
    .admin - layout {
      grid - template - columns: 1fr;
    }

    .admin - sidebar {
      position: relative;
      height: auto;
    }
  }
  `,document.head.appendChild(l);function c(){const d=document.createElement("div");d.innerHTML=`
    < h1 class="admin-title" > Postavke</h1 >

      <div class="settings-grid">
        <!-- Change Password Section -->
        <div class="settings-card glass" style="grid-column: 1 / -1;">
          <h2 class="settings-title">Promjena Lozinke</h2>
          <form id="change-password-form" class="settings-form">
            <div class="form-group">
              <label class="form-label">Nova lozinka</label>
              <input type="password" id="new-password" class="input" required minlength="6">
            </div>
            <div class="form-group">
              <label class="form-label">Potvrdi novu lozinku</label>
              <input type="password" id="confirm-password" class="input" required minlength="6">
            </div>
            <button type="submit" class="btn btn-primary">Promijeni Lozinku</button>
          </form>
          <div id="password-message" class="message"></div>
        </div>

        <!-- Admin Management Section -->
        <div class="settings-card glass" style="grid-column: 1 / -1;">
          <h2 class="settings-title">Upravljanje Adminima</h2>

          <div class="admin-management-layout" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-xl);">
            <!-- Create Admin Form -->
            <div class="create-admin-section">
              <h3 style="margin-bottom: var(--spacing-md);">Dodaj Novog Admina</h3>
              <p class="settings-desc">Novi korisnik će automatski imati admin prava.</p>
              <form id="create-admin-form" class="settings-form">
                <div class="form-group">
                  <label class="form-label">Email</label>
                  <input type="email" id="new-admin-email" class="input" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Lozinka</label>
                  <input type="password" id="new-admin-password" class="input" required minlength="6">
                </div>
                <button type="submit" class="btn btn-secondary">Kreiraj Admina</button>
              </form>
              <div id="create-admin-message" class="message"></div>
            </div>

            <!-- Admin List -->
            <div class="admin-list-section">
              <h3 style="margin-bottom: var(--spacing-md);">Postojeći Admini</h3>
              <div id="admin-list-container">
                <p>Učitavanje...</p>
              </div>
              <div id="delete-admin-message" class="message"></div>
            </div>
          </div>
        </div>
      </div>
  `;const h=d.querySelector("#change-password-form"),p=d.querySelector("#password-message");h.addEventListener("submit",async x=>{x.preventDefault();const _=d.querySelector("#new-password").value,w=d.querySelector("#confirm-password").value;if(_!==w){u(p,"Lozinke se ne podudaraju","error");return}const k=h.querySelector("button"),S=k.textContent;k.disabled=!0,k.textContent="Spremanje...";const{error:j}=await te.updatePassword(_);k.disabled=!1,k.textContent=S,j?u(p,"Greška pri promjeni lozinke: "+j.message,"error"):(u(p,"Lozinka uspješno promijenjena","success"),h.reset())});const g=d.querySelector("#create-admin-form"),v=d.querySelector("#create-admin-message");g.addEventListener("submit",async x=>{x.preventDefault();const _=d.querySelector("#new-admin-email").value,w=d.querySelector("#new-admin-password").value,k=g.querySelector("button"),S=k.textContent;k.disabled=!0,k.textContent="Kreiranje...";const{error:j}=await te.createAdmin(_,w);k.disabled=!1,k.textContent=S,j?u(v,"Greška: "+j.message,"error"):(u(v,"Admin uspješno kreiran!","success"),g.reset(),y())});const m=d.querySelector("#admin-list-container"),b=d.querySelector("#delete-admin-message");async function y(){m.innerHTML="<p>Učitavanje...</p>";const{admins:x,error:_}=await te.listAdmins();if(_){m.innerHTML=`< p style = "color: var(--color-error);" > Greška pri učitavanju: ${_.message}</p > `;return}if(!x||x.length===0){m.innerHTML="<p>Nema pronađenih admina.</p>";return}const{user:w}=await te.getCurrentUser(),k=`
    < div class="admin-list" style = "display: flex; flex-direction: column; gap: 0.5rem;" >
      ${x.map(S=>`
                <div class="admin-item glass" style="padding: 1rem; display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.05);">
                    <div>
                        <div style="font-weight: bold;">${S.email}</div>
                        <div style="font-size: 0.8rem; color: var(--color-text-muted);">ID: ${S.id.substring(0,8)}...</div>
                    </div>
                    ${S.id!==(w==null?void 0:w.id)?`
                        <button class="btn-delete-admin" data-id="${S.id}" style="background: rgba(239, 68, 68, 0.2); color: #ef4444; border: none; padding: 0.5rem; border-radius: 4px; cursor: pointer;">
                            Obriši
                        </button>
                    `:'<span style="font-size: 0.8rem; color: var(--color-primary);">Vi</span>'}
                </div>
            `).join("")}
        </div >
    `;m.innerHTML=k,d.querySelectorAll(".btn-delete-admin").forEach(S=>{let j;S.addEventListener("click",async P=>{P.preventDefault(),P.stopPropagation();const M=S.dataset.id;if(S.classList.contains("confirming")){clearTimeout(j),S.disabled=!0,S.textContent="Brisanje...";const{success:F,error:q}=await te.deleteAdmin(M);F?(u(b,"Admin uspješno obrisan","success"),y()):(u(b,"Greška pri brisanju: "+((q==null?void 0:q.message)||"Nepoznata greška"),"error"),S.disabled=!1,S.textContent="Obriši",S.classList.remove("confirming"),S.style.background="rgba(239, 68, 68, 0.2)",S.style.color="#ef4444")}else S.classList.add("confirming"),S.textContent="Potvrdi?",S.style.background="#ef4444",S.style.color="white",j=setTimeout(()=>{S.classList.remove("confirming"),S.textContent="Obriši",S.style.background="rgba(239, 68, 68, 0.2)",S.style.color="#ef4444"},3e3)})})}return y(),d}function u(d,h,p){d.textContent=h,d.className=`message message - ${p} `,setTimeout(()=>{d.textContent="",d.className="message"},5e3)}const f=document.createElement("style");return f.textContent=`
    /* Settings Styles */
    .settings - grid {
    display: grid;
    grid - template - columns: repeat(auto - fit, minmax(300px, 1fr));
    gap: var(--spacing - xl);
  }

  .settings - card {
    padding: var(--spacing - xl);
  }

  .settings - title {
    font - size: var(--font - size - xl);
    margin - bottom: var(--spacing - md);
    color: var(--color - text);
  }

  .settings - desc {
    color: var(--color - text - muted);
    margin - bottom: var(--spacing - lg);
    font - size: var(--font - size - sm);
  }

  .settings - form {
    display: flex;
    flex - direction: column;
    gap: var(--spacing - md);
  }

  .message {
    margin - top: var(--spacing - md);
    padding: var(--spacing - sm) var(--spacing - md);
    border - radius: var(--radius - sm);
    font - size: var(--font - size - sm);
  }

  .message - error {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
  }

  .message - success {
    background: rgba(34, 197, 94, 0.1);
    color: #22c55e;
  }
  `,document.head.appendChild(f),t(),r}function Zi(){const r=document.createElement("div");r.className="page-admin-login";let e="",t="",s=!1,n="",a=!1,i=!1;const o=()=>{r.innerHTML=`
            <div class="login-container">
                <div class="login-card glass">
                    <div class="login-header">
                        <h1 class="login-title">Admin Panel</h1>
                        <p class="login-subtitle">Prijavite se za pristup</p>
                    </div>

                    ${n?`
                        <div class="alert alert-error">
                            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                            </svg>
                            <span>${n}</span>
                        </div>
                    `:""}

                    ${a?`
                        <div class="alert alert-success">
                            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                            <span>Email za resetiranje lozinke je poslan. Provjerite svoj inbox.</span>
                        </div>
                    `:""}

                    ${i?`
                        <form class="login-form" id="reset-form">
                            <div class="form-group">
                                <label for="reset-email" class="form-label">Email</label>
                                <input 
                                    type="email" 
                                    id="reset-email" 
                                    class="input" 
                                    placeholder="admin@autopojasevi.hr"
                                    required
                                    value="${e}"
                                />
                            </div>

                            <div class="form-actions">
                                <button type="submit" class="btn btn-primary" ${s?"disabled":""}>
                                    ${s?"Šaljem...":"Pošalji Link"}
                                </button>
                                <button type="button" class="btn btn-secondary" id="back-to-login">
                                    Natrag na prijavu
                                </button>
                            </div>
                        </form>
                    `:`
                        <form class="login-form" id="login-form">
                            <div class="form-group">
                                <label for="email" class="form-label">Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    class="input" 
                                    placeholder="admin@autopojasevi.hr"
                                    required
                                    value="${e}"
                                />
                            </div>

                            <div class="form-group">
                                <label for="password" class="form-label">Lozinka</label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    class="input" 
                                    placeholder="••••••••"
                                    required
                                    value="${t}"
                                />
                            </div>

                            <button 
                                type="button" 
                                class="forgot-password-link" 
                                id="forgot-password"
                            >
                                Zaboravili ste lozinku?
                            </button>

                            <button type="submit" class="btn btn-primary btn-block" ${s?"disabled":""}>
                                ${s?"Prijava...":"Prijavi se"}
                            </button>
                        </form>
                    `}
                </div>
            </div>
        `,l()},l=()=>{const f=r.querySelector("#login-form"),d=r.querySelector("#reset-form"),h=r.querySelector("#forgot-password"),p=r.querySelector("#back-to-login");if(f){f.addEventListener("submit",c);const g=r.querySelector("#email"),v=r.querySelector("#password");g==null||g.addEventListener("input",m=>{e=m.target.value}),v==null||v.addEventListener("input",m=>{t=m.target.value})}if(d){d.addEventListener("submit",u);const g=r.querySelector("#reset-email");g==null||g.addEventListener("input",v=>{e=v.target.value})}h==null||h.addEventListener("click",()=>{i=!0,n="",a=!1,o()}),p==null||p.addEventListener("click",()=>{i=!1,n="",a=!1,o()})},c=async f=>{if(f.preventDefault(),!e||!t){n="Molimo unesite email i lozinku",o();return}s=!0,n="",o();const{user:d,session:h,error:p}=await te.login(e,t);if(p){s=!1,n=p.message==="Unauthorized: Admin access required"?"Nemate admin pristup":"Neispravni podaci za prijavu",o();return}U.navigate("/admin")},u=async f=>{if(f.preventDefault(),!e){n="Molimo unesite email",o();return}s=!0,n="",o();const{error:d}=await te.resetPassword(e);if(s=!1,d){n="Greška pri slanju emaila. Pokušajte ponovno.",o();return}a=!0,n="",o()};return o(),r}const on=document.createElement("style");on.textContent=`
    .page-admin-login {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
        padding: var(--spacing-lg);
    }

    .login-container {
        width: 100%;
        max-width: 450px;
    }

    .login-card {
        padding: var(--spacing-2xl);
        border-radius: var(--radius-lg);
    }

    .login-header {
        text-align: center;
        margin-bottom: var(--spacing-2xl);
    }

    .login-title {
        font-size: var(--font-size-3xl);
        font-weight: var(--font-weight-bold);
        color: var(--color-text);
        margin-bottom: var(--spacing-sm);
    }

    .login-subtitle {
        font-size: var(--font-size-lg);
        color: var(--color-text-secondary);
    }

    .login-form {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-lg);
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
    }

    .form-label {
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-medium);
        color: var(--color-text);
    }

    .forgot-password-link {
        background: none;
        border: none;
        color: var(--color-accent);
        font-size: var(--font-size-sm);
        text-align: right;
        cursor: pointer;
        padding: 0;
        margin-top: calc(var(--spacing-sm) * -1);
        transition: opacity var(--transition-base);
    }

    .forgot-password-link:hover {
        opacity: 0.8;
        text-decoration: underline;
    }

    .btn-block {
        width: 100%;
    }

    .form-actions {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
    }

    .alert {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
        padding: var(--spacing-md);
        border-radius: var(--radius-md);
        margin-bottom: var(--spacing-lg);
        font-size: var(--font-size-sm);
    }

    .alert .icon {
        width: 20px;
        height: 20px;
        flex-shrink: 0;
    }

    .alert-error {
        background: rgba(239, 68, 68, 0.1);
        color: #ef4444;
        border: 1px solid rgba(239, 68, 68, 0.2);
    }

    .alert-success {
        background: rgba(34, 197, 94, 0.1);
        color: #22c55e;
        border: 1px solid rgba(34, 197, 94, 0.2);
    }

    @media (max-width: 768px) {
        .login-card {
            padding: var(--spacing-xl);
        }

        .login-title {
            font-size: var(--font-size-2xl);
        }
    }
`;document.head.appendChild(on);U.setAuthCheck(async()=>await te.isAuthenticated());U.register("/",Bi);U.register("/booking",Qi);U.register("/admin/login",Zi);U.register("/admin",Xi,{protected:!0});U.init();
