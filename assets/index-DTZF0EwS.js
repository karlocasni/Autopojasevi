function pa(r,e){for(var t=0;t<e.length;t++){const s=e[t];if(typeof s!="string"&&!Array.isArray(s)){for(const a in s)if(a!=="default"&&!(a in r)){const n=Object.getOwnPropertyDescriptor(s,a);n&&Object.defineProperty(r,a,n.get?n:{enumerable:!0,get:()=>s[a]})}}}return Object.freeze(Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function t(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(a){if(a.ep)return;a.ep=!0;const n=t(a);fetch(a.href,n)}})();class _r{constructor(){this.routes={},this.protectedRoutes=new Set,this.currentRoute=null,this.authCheck=null}register(e,t,s={}){this.routes[e]=t,s.protected&&this.protectedRoutes.add(e)}setAuthCheck(e){this.authCheck=e}async navigate(e,t={}){if(this.protectedRoutes.has(e)){if(!this.authCheck){console.error("Auth check function not set");return}if(!await this.authCheck()){sessionStorage.setItem("intendedRoute",e),this.navigate("/admin/login");return}}this.currentRoute=e;const s=this.routes[e];if(s){const a=document.getElementById("app");a.innerHTML="",a.appendChild(s(t)),window.scrollTo(0,0),window.history.pushState({path:e,data:t},"",e)}}navigateToIntended(){const e=sessionStorage.getItem("intendedRoute");e?(sessionStorage.removeItem("intendedRoute"),this.navigate(e)):this.navigate("/admin")}init(){window.addEventListener("popstate",s=>{s.state&&s.state.path&&this.navigate(s.state.path,s.state.data||{})});const e=window.location.pathname,t=this.routes[e]?e:"/404";this.navigate(t)}}const $=new _r;_r.navigate=(r,e)=>$.navigate(r,e);function Ut(){const r=document.createElement("header");return r.className="header",r.id="main-header",r.innerHTML=`
    <div class="header-container">
      <nav class="header-nav">
        <a href="#" class="nav-link" data-route="/">O NAMA</a>
        <a href="#" class="nav-link" data-route="/">FAQ</a>
      </nav>
      
      <div class="header-logo">
        <img src="/images/logo.png" alt="Autopojasevi.hr" class="logo-img" style="cursor: pointer">
      </div>
      
      <nav class="header-nav">
        <a href="#" class="nav-link" data-route="/">KONTAKT</a>
        <button class="btn btn-cta" id="header-cta">REZERVIRAJ</button>
      </nav>
    </div>
  `,window.addEventListener("scroll",()=>{window.pageYOffset>10?r.classList.add("scrolled"):r.classList.remove("scrolled")}),r.querySelectorAll(".nav-link").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const s=t.target.textContent.toLowerCase();window.location.pathname!=="/"&&$.navigate("/");let a=null;s==="o nama"?a="about-section":s==="faq"?a="faq-section":s==="kontakt"&&(a="contact-section"),a&&setTimeout(()=>{const n=document.getElementById(a);n&&n.scrollIntoView({behavior:"smooth"})},100)})}),r.querySelector("#header-cta").addEventListener("click",()=>{$.navigate("/booking")}),r.querySelector(".logo-img").addEventListener("click",()=>{$.navigate("/"),window.scrollTo(0,0)}),r}const kr=document.createElement("style");kr.textContent=`
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
        justify-self: end;
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
`;document.head.appendChild(kr);function qt(){const r=document.createElement("footer");return r.className="footer",r.innerHTML=`
    <div class="footer-container">
      <div class="footer-column footer-left">
        <h4 class="footer-heading">Navigacija</h4>
        <ul class="footer-links">
          <li><a href="#" class="footer-link" id="footer-rezervacija">Rezervacija</a></li>
          <li><a href="#" class="footer-link" id="footer-kontakt">Kontakt</a></li>
          <li><a href="#" class="footer-link" id="footer-admin">Admin panel</a></li>
          <li><a href="/uvjeti-poslovanja" class="footer-link" id="footer-terms">Uvjeti poslovanja</a></li>
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
  `,r.querySelector("#footer-rezervacija").addEventListener("click",e=>{e.preventDefault(),$.navigate("/booking")}),r.querySelector("#footer-kontakt").addEventListener("click",e=>{var t;e.preventDefault(),(t=document.getElementById("contact-section"))==null||t.scrollIntoView({behavior:"smooth"})}),r.querySelector("#footer-admin").addEventListener("click",e=>{e.preventDefault(),$.navigate("/admin")}),r.querySelector("#footer-terms").addEventListener("click",e=>{e.preventDefault(),$.navigate("/uvjeti-poslovanja")}),r}const xr=document.createElement("style");xr.textContent=`
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
`;document.head.appendChild(xr);const fa="modulepreload",ga=function(r){return"/"+r},Qt={},M=function(e,t,s){let a=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),o=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));a=Promise.allSettled(t.map(l=>{if(l=ga(l),l in Qt)return;Qt[l]=!0;const c=l.endsWith(".css"),d=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${d}`))return;const u=document.createElement("link");if(u.rel=c?"stylesheet":fa,c||(u.as="script"),u.crossOrigin="",u.href=l,o&&u.setAttribute("nonce",o),document.head.appendChild(u),c)return new Promise((p,h)=>{u.addEventListener("load",p),u.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${l}`)))})}))}function n(i){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=i,window.dispatchEvent(o),!o.defaultPrevented)throw i}return a.then(i=>{for(const o of i||[])o.status==="rejected"&&n(o.reason);return e().catch(n)})};var ye=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function va(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}function Ne(r){if(r.__esModule)return r;var e=r.default;if(typeof e=="function"){var t=function s(){return this instanceof s?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};t.prototype=e.prototype}else t={};return Object.defineProperty(t,"__esModule",{value:!0}),Object.keys(r).forEach(function(s){var a=Object.getOwnPropertyDescriptor(r,s);Object.defineProperty(t,s,a.get?a:{enumerable:!0,get:function(){return r[s]}})}),t}var Bt={},Xe={},kt=function(r,e){return kt=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,s){t.__proto__=s}||function(t,s){for(var a in s)Object.prototype.hasOwnProperty.call(s,a)&&(t[a]=s[a])},kt(r,e)};function jr(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");kt(r,e);function t(){this.constructor=r}r.prototype=e===null?Object.create(e):(t.prototype=e.prototype,new t)}var et=function(){return et=Object.assign||function(e){for(var t,s=1,a=arguments.length;s<a;s++){t=arguments[s];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},et.apply(this,arguments)};function Ce(r,e){var t={};for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&e.indexOf(s)<0&&(t[s]=r[s]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,s=Object.getOwnPropertySymbols(r);a<s.length;a++)e.indexOf(s[a])<0&&Object.prototype.propertyIsEnumerable.call(r,s[a])&&(t[s[a]]=r[s[a]]);return t}function Er(r,e,t,s){var a=arguments.length,n=a<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,t):s,i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(r,e,t,s);else for(var o=r.length-1;o>=0;o--)(i=r[o])&&(n=(a<3?i(n):a>3?i(e,t,n):i(e,t))||n);return a>3&&n&&Object.defineProperty(e,t,n),n}function Sr(r,e){return function(t,s){e(t,s,r)}}function Tr(r,e,t,s,a,n){function i(m){if(m!==void 0&&typeof m!="function")throw new TypeError("Function expected");return m}for(var o=s.kind,l=o==="getter"?"get":o==="setter"?"set":"value",c=!e&&r?s.static?r:r.prototype:null,d=e||(c?Object.getOwnPropertyDescriptor(c,s.name):{}),u,p=!1,h=t.length-1;h>=0;h--){var f={};for(var g in s)f[g]=g==="access"?{}:s[g];for(var g in s.access)f.access[g]=s.access[g];f.addInitializer=function(m){if(p)throw new TypeError("Cannot add initializers after decoration has completed");n.push(i(m||null))};var v=(0,t[h])(o==="accessor"?{get:d.get,set:d.set}:d[l],f);if(o==="accessor"){if(v===void 0)continue;if(v===null||typeof v!="object")throw new TypeError("Object expected");(u=i(v.get))&&(d.get=u),(u=i(v.set))&&(d.set=u),(u=i(v.init))&&a.unshift(u)}else(u=i(v))&&(o==="field"?a.unshift(u):d[l]=u)}c&&Object.defineProperty(c,s.name,d),p=!0}function Or(r,e,t){for(var s=arguments.length>2,a=0;a<e.length;a++)t=s?e[a].call(r,t):e[a].call(r);return s?t:void 0}function Ar(r){return typeof r=="symbol"?r:"".concat(r)}function Cr(r,e,t){return typeof e=="symbol"&&(e=e.description?"[".concat(e.description,"]"):""),Object.defineProperty(r,"name",{configurable:!0,value:t?"".concat(t," ",e):e})}function Rr(r,e){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(r,e)}function j(r,e,t,s){function a(n){return n instanceof t?n:new t(function(i){i(n)})}return new(t||(t=Promise))(function(n,i){function o(d){try{c(s.next(d))}catch(u){i(u)}}function l(d){try{c(s.throw(d))}catch(u){i(u)}}function c(d){d.done?n(d.value):a(d.value).then(o,l)}c((s=s.apply(r,e||[])).next())})}function Pr(r,e){var t={label:0,sent:function(){if(n[0]&1)throw n[1];return n[1]},trys:[],ops:[]},s,a,n,i=Object.create((typeof Iterator=="function"?Iterator:Object).prototype);return i.next=o(0),i.throw=o(1),i.return=o(2),typeof Symbol=="function"&&(i[Symbol.iterator]=function(){return this}),i;function o(c){return function(d){return l([c,d])}}function l(c){if(s)throw new TypeError("Generator is already executing.");for(;i&&(i=0,c[0]&&(t=0)),t;)try{if(s=1,a&&(n=c[0]&2?a.return:c[0]?a.throw||((n=a.return)&&n.call(a),0):a.next)&&!(n=n.call(a,c[1])).done)return n;switch(a=0,n&&(c=[c[0]&2,n.value]),c[0]){case 0:case 1:n=c;break;case 4:return t.label++,{value:c[1],done:!1};case 5:t.label++,a=c[1],c=[0];continue;case 7:c=t.ops.pop(),t.trys.pop();continue;default:if(n=t.trys,!(n=n.length>0&&n[n.length-1])&&(c[0]===6||c[0]===2)){t=0;continue}if(c[0]===3&&(!n||c[1]>n[0]&&c[1]<n[3])){t.label=c[1];break}if(c[0]===6&&t.label<n[1]){t.label=n[1],n=c;break}if(n&&t.label<n[2]){t.label=n[2],t.ops.push(c);break}n[2]&&t.ops.pop(),t.trys.pop();continue}c=e.call(r,t)}catch(d){c=[6,d],a=0}finally{s=n=0}if(c[0]&5)throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}}var dt=Object.create?function(r,e,t,s){s===void 0&&(s=t);var a=Object.getOwnPropertyDescriptor(e,t);(!a||("get"in a?!e.__esModule:a.writable||a.configurable))&&(a={enumerable:!0,get:function(){return e[t]}}),Object.defineProperty(r,s,a)}:function(r,e,t,s){s===void 0&&(s=t),r[s]=e[t]};function $r(r,e){for(var t in r)t!=="default"&&!Object.prototype.hasOwnProperty.call(e,t)&&dt(e,r,t)}function tt(r){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&r[e],s=0;if(t)return t.call(r);if(r&&typeof r.length=="number")return{next:function(){return r&&s>=r.length&&(r=void 0),{value:r&&r[s++],done:!r}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function Dt(r,e){var t=typeof Symbol=="function"&&r[Symbol.iterator];if(!t)return r;var s=t.call(r),a,n=[],i;try{for(;(e===void 0||e-- >0)&&!(a=s.next()).done;)n.push(a.value)}catch(o){i={error:o}}finally{try{a&&!a.done&&(t=s.return)&&t.call(s)}finally{if(i)throw i.error}}return n}function Ir(){for(var r=[],e=0;e<arguments.length;e++)r=r.concat(Dt(arguments[e]));return r}function zr(){for(var r=0,e=0,t=arguments.length;e<t;e++)r+=arguments[e].length;for(var s=Array(r),a=0,e=0;e<t;e++)for(var n=arguments[e],i=0,o=n.length;i<o;i++,a++)s[a]=n[i];return s}function Lr(r,e,t){if(t||arguments.length===2)for(var s=0,a=e.length,n;s<a;s++)(n||!(s in e))&&(n||(n=Array.prototype.slice.call(e,0,s)),n[s]=e[s]);return r.concat(n||Array.prototype.slice.call(e))}function Oe(r){return this instanceof Oe?(this.v=r,this):new Oe(r)}function Nr(r,e,t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var s=t.apply(r,e||[]),a,n=[];return a=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),o("next"),o("throw"),o("return",i),a[Symbol.asyncIterator]=function(){return this},a;function i(h){return function(f){return Promise.resolve(f).then(h,u)}}function o(h,f){s[h]&&(a[h]=function(g){return new Promise(function(v,m){n.push([h,g,v,m])>1||l(h,g)})},f&&(a[h]=f(a[h])))}function l(h,f){try{c(s[h](f))}catch(g){p(n[0][3],g)}}function c(h){h.value instanceof Oe?Promise.resolve(h.value.v).then(d,u):p(n[0][2],h)}function d(h){l("next",h)}function u(h){l("throw",h)}function p(h,f){h(f),n.shift(),n.length&&l(n[0][0],n[0][1])}}function Mr(r){var e,t;return e={},s("next"),s("throw",function(a){throw a}),s("return"),e[Symbol.iterator]=function(){return this},e;function s(a,n){e[a]=r[a]?function(i){return(t=!t)?{value:Oe(r[a](i)),done:!1}:n?n(i):i}:n}}function Ur(r){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e=r[Symbol.asyncIterator],t;return e?e.call(r):(r=typeof tt=="function"?tt(r):r[Symbol.iterator](),t={},s("next"),s("throw"),s("return"),t[Symbol.asyncIterator]=function(){return this},t);function s(n){t[n]=r[n]&&function(i){return new Promise(function(o,l){i=r[n](i),a(o,l,i.done,i.value)})}}function a(n,i,o,l){Promise.resolve(l).then(function(c){n({value:c,done:o})},i)}}function qr(r,e){return Object.defineProperty?Object.defineProperty(r,"raw",{value:e}):r.raw=e,r}var ma=Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e},xt=function(r){return xt=Object.getOwnPropertyNames||function(e){var t=[];for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&(t[t.length]=s);return t},xt(r)};function Br(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var t=xt(r),s=0;s<t.length;s++)t[s]!=="default"&&dt(e,r,t[s]);return ma(e,r),e}function Dr(r){return r&&r.__esModule?r:{default:r}}function Hr(r,e,t,s){if(t==="a"&&!s)throw new TypeError("Private accessor was defined without a getter");if(typeof e=="function"?r!==e||!s:!e.has(r))throw new TypeError("Cannot read private member from an object whose class did not declare it");return t==="m"?s:t==="a"?s.call(r):s?s.value:e.get(r)}function Fr(r,e,t,s,a){if(s==="m")throw new TypeError("Private method is not writable");if(s==="a"&&!a)throw new TypeError("Private accessor was defined without a setter");if(typeof e=="function"?r!==e||!a:!e.has(r))throw new TypeError("Cannot write private member to an object whose class did not declare it");return s==="a"?a.call(r,t):a?a.value=t:e.set(r,t),t}function Vr(r,e){if(e===null||typeof e!="object"&&typeof e!="function")throw new TypeError("Cannot use 'in' operator on non-object");return typeof r=="function"?e===r:r.has(e)}function Kr(r,e,t){if(e!=null){if(typeof e!="object"&&typeof e!="function")throw new TypeError("Object expected.");var s,a;if(t){if(!Symbol.asyncDispose)throw new TypeError("Symbol.asyncDispose is not defined.");s=e[Symbol.asyncDispose]}if(s===void 0){if(!Symbol.dispose)throw new TypeError("Symbol.dispose is not defined.");s=e[Symbol.dispose],t&&(a=s)}if(typeof s!="function")throw new TypeError("Object not disposable.");a&&(s=function(){try{a.call(this)}catch(n){return Promise.reject(n)}}),r.stack.push({value:e,dispose:s,async:t})}else t&&r.stack.push({async:!0});return e}var ya=typeof SuppressedError=="function"?SuppressedError:function(r,e,t){var s=new Error(t);return s.name="SuppressedError",s.error=r,s.suppressed=e,s};function Gr(r){function e(n){r.error=r.hasError?new ya(n,r.error,"An error was suppressed during disposal."):n,r.hasError=!0}var t,s=0;function a(){for(;t=r.stack.pop();)try{if(!t.async&&s===1)return s=0,r.stack.push(t),Promise.resolve().then(a);if(t.dispose){var n=t.dispose.call(t.value);if(t.async)return s|=2,Promise.resolve(n).then(a,function(i){return e(i),a()})}else s|=1}catch(i){e(i)}if(s===1)return r.hasError?Promise.reject(r.error):Promise.resolve();if(r.hasError)throw r.error}return a()}function Wr(r,e){return typeof r=="string"&&/^\.\.?\//.test(r)?r.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i,function(t,s,a,n,i){return s?e?".jsx":".js":a&&(!n||!i)?t:a+n+"."+i.toLowerCase()+"js"}):r}const ba={__extends:jr,__assign:et,__rest:Ce,__decorate:Er,__param:Sr,__esDecorate:Tr,__runInitializers:Or,__propKey:Ar,__setFunctionName:Cr,__metadata:Rr,__awaiter:j,__generator:Pr,__createBinding:dt,__exportStar:$r,__values:tt,__read:Dt,__spread:Ir,__spreadArrays:zr,__spreadArray:Lr,__await:Oe,__asyncGenerator:Nr,__asyncDelegator:Mr,__asyncValues:Ur,__makeTemplateObject:qr,__importStar:Br,__importDefault:Dr,__classPrivateFieldGet:Hr,__classPrivateFieldSet:Fr,__classPrivateFieldIn:Vr,__addDisposableResource:Kr,__disposeResources:Gr,__rewriteRelativeImportExtension:Wr},wa=Object.freeze(Object.defineProperty({__proto__:null,__addDisposableResource:Kr,get __assign(){return et},__asyncDelegator:Mr,__asyncGenerator:Nr,__asyncValues:Ur,__await:Oe,__awaiter:j,__classPrivateFieldGet:Hr,__classPrivateFieldIn:Vr,__classPrivateFieldSet:Fr,__createBinding:dt,__decorate:Er,__disposeResources:Gr,__esDecorate:Tr,__exportStar:$r,__extends:jr,__generator:Pr,__importDefault:Dr,__importStar:Br,__makeTemplateObject:qr,__metadata:Rr,__param:Sr,__propKey:Ar,__read:Dt,__rest:Ce,__rewriteRelativeImportExtension:Wr,__runInitializers:Or,__setFunctionName:Cr,__spread:Ir,__spreadArray:Lr,__spreadArrays:zr,__values:tt,default:ba},Symbol.toStringTag,{value:"Module"})),_a=r=>r?(...e)=>r(...e):(...e)=>fetch(...e);let ut=class extends Error{constructor(e,t="FunctionsError",s){super(e),this.name=t,this.context=s}},Jr=class extends ut{constructor(e){super("Failed to send a request to the Edge Function","FunctionsFetchError",e)}},jt=class extends ut{constructor(e){super("Relay Error invoking the Edge Function","FunctionsRelayError",e)}},Et=class extends ut{constructor(e){super("Edge Function returned a non-2xx status code","FunctionsHttpError",e)}};var rt;(function(r){r.Any="any",r.ApNortheast1="ap-northeast-1",r.ApNortheast2="ap-northeast-2",r.ApSouth1="ap-south-1",r.ApSoutheast1="ap-southeast-1",r.ApSoutheast2="ap-southeast-2",r.CaCentral1="ca-central-1",r.EuCentral1="eu-central-1",r.EuWest1="eu-west-1",r.EuWest2="eu-west-2",r.EuWest3="eu-west-3",r.SaEast1="sa-east-1",r.UsEast1="us-east-1",r.UsWest1="us-west-1",r.UsWest2="us-west-2"})(rt||(rt={}));class ka{constructor(e,{headers:t={},customFetch:s,region:a=rt.Any}={}){this.url=e,this.headers=t,this.region=a,this.fetch=_a(s)}setAuth(e){this.headers.Authorization=`Bearer ${e}`}invoke(e){return j(this,arguments,void 0,function*(t,s={}){var a;let n,i;try{const{headers:o,method:l,body:c,signal:d,timeout:u}=s;let p={},{region:h}=s;h||(h=this.region);const f=new URL(`${this.url}/${t}`);h&&h!=="any"&&(p["x-region"]=h,f.searchParams.set("forceFunctionRegion",h));let g;c&&(o&&!Object.prototype.hasOwnProperty.call(o,"Content-Type")||!o)?typeof Blob<"u"&&c instanceof Blob||c instanceof ArrayBuffer?(p["Content-Type"]="application/octet-stream",g=c):typeof c=="string"?(p["Content-Type"]="text/plain",g=c):typeof FormData<"u"&&c instanceof FormData?g=c:(p["Content-Type"]="application/json",g=JSON.stringify(c)):g=c;let v=d;u&&(i=new AbortController,n=setTimeout(()=>i.abort(),u),d?(v=i.signal,d.addEventListener("abort",()=>i.abort())):v=i.signal);const m=yield this.fetch(f.toString(),{method:l||"POST",headers:Object.assign(Object.assign(Object.assign({},p),this.headers),o),body:g,signal:v}).catch(k=>{throw new Jr(k)}),_=m.headers.get("x-relay-error");if(_&&_==="true")throw new jt(m);if(!m.ok)throw new Et(m);let y=((a=m.headers.get("Content-Type"))!==null&&a!==void 0?a:"text/plain").split(";")[0].trim(),x;return y==="application/json"?x=yield m.json():y==="application/octet-stream"||y==="application/pdf"?x=yield m.blob():y==="text/event-stream"?x=m:y==="multipart/form-data"?x=yield m.formData():x=yield m.text(),{data:x,error:null,response:m}}catch(o){return{data:null,error:o,response:o instanceof Et||o instanceof jt?o.context:void 0}}finally{n&&clearTimeout(n)}})}}const xa=Object.freeze(Object.defineProperty({__proto__:null,get FunctionRegion(){return rt},FunctionsClient:ka,FunctionsError:ut,FunctionsFetchError:Jr,FunctionsHttpError:Et,FunctionsRelayError:jt},Symbol.toStringTag,{value:"Module"})),Yr=Ne(xa);var K={};const Re=Ne(wa);var qe={},Be={},De={},He={},Fe={},Ve={},Xt;function Zr(){if(Xt)return Ve;Xt=1,Object.defineProperty(Ve,"__esModule",{value:!0});class r extends Error{constructor(t){super(t.message),this.name="PostgrestError",this.details=t.details,this.hint=t.hint,this.code=t.code}}return Ve.default=r,Ve}var er;function Qr(){if(er)return Fe;er=1,Object.defineProperty(Fe,"__esModule",{value:!0});const e=Re.__importDefault(Zr());let t=class{constructor(a){var n,i;this.shouldThrowOnError=!1,this.method=a.method,this.url=a.url,this.headers=new Headers(a.headers),this.schema=a.schema,this.body=a.body,this.shouldThrowOnError=(n=a.shouldThrowOnError)!==null&&n!==void 0?n:!1,this.signal=a.signal,this.isMaybeSingle=(i=a.isMaybeSingle)!==null&&i!==void 0?i:!1,a.fetch?this.fetch=a.fetch:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(a,n){return this.headers=new Headers(this.headers),this.headers.set(a,n),this}then(a,n){this.schema===void 0||(["GET","HEAD"].includes(this.method)?this.headers.set("Accept-Profile",this.schema):this.headers.set("Content-Profile",this.schema)),this.method!=="GET"&&this.method!=="HEAD"&&this.headers.set("Content-Type","application/json");const i=this.fetch;let o=i(this.url.toString(),{method:this.method,headers:this.headers,body:JSON.stringify(this.body),signal:this.signal}).then(async l=>{var c,d,u,p;let h=null,f=null,g=null,v=l.status,m=l.statusText;if(l.ok){if(this.method!=="HEAD"){const k=await l.text();k===""||(this.headers.get("Accept")==="text/csv"||this.headers.get("Accept")&&(!((c=this.headers.get("Accept"))===null||c===void 0)&&c.includes("application/vnd.pgrst.plan+text"))?f=k:f=JSON.parse(k))}const y=(d=this.headers.get("Prefer"))===null||d===void 0?void 0:d.match(/count=(exact|planned|estimated)/),x=(u=l.headers.get("content-range"))===null||u===void 0?void 0:u.split("/");y&&x&&x.length>1&&(g=parseInt(x[1])),this.isMaybeSingle&&this.method==="GET"&&Array.isArray(f)&&(f.length>1?(h={code:"PGRST116",details:`Results contain ${f.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:"JSON object requested, multiple (or no) rows returned"},f=null,g=null,v=406,m="Not Acceptable"):f.length===1?f=f[0]:f=null)}else{const y=await l.text();try{h=JSON.parse(y),Array.isArray(h)&&l.status===404&&(f=[],h=null,v=200,m="OK")}catch{l.status===404&&y===""?(v=204,m="No Content"):h={message:y}}if(h&&this.isMaybeSingle&&(!((p=h==null?void 0:h.details)===null||p===void 0)&&p.includes("0 rows"))&&(h=null,v=200,m="OK"),h&&this.shouldThrowOnError)throw new e.default(h)}return{error:h,data:f,count:g,status:v,statusText:m}});return this.shouldThrowOnError||(o=o.catch(l=>{var c,d,u,p,h,f;let g="";const v=l==null?void 0:l.cause;if(v){const m=(c=v==null?void 0:v.message)!==null&&c!==void 0?c:"",_=(d=v==null?void 0:v.code)!==null&&d!==void 0?d:"";g=`${(u=l==null?void 0:l.name)!==null&&u!==void 0?u:"FetchError"}: ${l==null?void 0:l.message}`,g+=`

Caused by: ${(p=v==null?void 0:v.name)!==null&&p!==void 0?p:"Error"}: ${m}`,_&&(g+=` (${_})`),v!=null&&v.stack&&(g+=`
${v.stack}`)}else g=(h=l==null?void 0:l.stack)!==null&&h!==void 0?h:"";return{error:{message:`${(f=l==null?void 0:l.name)!==null&&f!==void 0?f:"FetchError"}: ${l==null?void 0:l.message}`,details:g,hint:"",code:""},data:null,count:null,status:0,statusText:""}})),o.then(a,n)}returns(){return this}overrideTypes(){return this}};return Fe.default=t,Fe}var tr;function Xr(){if(tr)return He;tr=1,Object.defineProperty(He,"__esModule",{value:!0});const e=Re.__importDefault(Qr());let t=class extends e.default{select(a){let n=!1;const i=(a??"*").split("").map(o=>/\s/.test(o)&&!n?"":(o==='"'&&(n=!n),o)).join("");return this.url.searchParams.set("select",i),this.headers.append("Prefer","return=representation"),this}order(a,{ascending:n=!0,nullsFirst:i,foreignTable:o,referencedTable:l=o}={}){const c=l?`${l}.order`:"order",d=this.url.searchParams.get(c);return this.url.searchParams.set(c,`${d?`${d},`:""}${a}.${n?"asc":"desc"}${i===void 0?"":i?".nullsfirst":".nullslast"}`),this}limit(a,{foreignTable:n,referencedTable:i=n}={}){const o=typeof i>"u"?"limit":`${i}.limit`;return this.url.searchParams.set(o,`${a}`),this}range(a,n,{foreignTable:i,referencedTable:o=i}={}){const l=typeof o>"u"?"offset":`${o}.offset`,c=typeof o>"u"?"limit":`${o}.limit`;return this.url.searchParams.set(l,`${a}`),this.url.searchParams.set(c,`${n-a+1}`),this}abortSignal(a){return this.signal=a,this}single(){return this.headers.set("Accept","application/vnd.pgrst.object+json"),this}maybeSingle(){return this.method==="GET"?this.headers.set("Accept","application/json"):this.headers.set("Accept","application/vnd.pgrst.object+json"),this.isMaybeSingle=!0,this}csv(){return this.headers.set("Accept","text/csv"),this}geojson(){return this.headers.set("Accept","application/geo+json"),this}explain({analyze:a=!1,verbose:n=!1,settings:i=!1,buffers:o=!1,wal:l=!1,format:c="text"}={}){var d;const u=[a?"analyze":null,n?"verbose":null,i?"settings":null,o?"buffers":null,l?"wal":null].filter(Boolean).join("|"),p=(d=this.headers.get("Accept"))!==null&&d!==void 0?d:"application/json";return this.headers.set("Accept",`application/vnd.pgrst.plan+${c}; for="${p}"; options=${u};`),c==="json"?this:this}rollback(){return this.headers.append("Prefer","tx=rollback"),this}returns(){return this}maxAffected(a){return this.headers.append("Prefer","handling=strict"),this.headers.append("Prefer",`max-affected=${a}`),this}};return He.default=t,He}var rr;function Ht(){if(rr)return De;rr=1,Object.defineProperty(De,"__esModule",{value:!0});const e=Re.__importDefault(Xr()),t=new RegExp("[,()]");let s=class extends e.default{eq(n,i){return this.url.searchParams.append(n,`eq.${i}`),this}neq(n,i){return this.url.searchParams.append(n,`neq.${i}`),this}gt(n,i){return this.url.searchParams.append(n,`gt.${i}`),this}gte(n,i){return this.url.searchParams.append(n,`gte.${i}`),this}lt(n,i){return this.url.searchParams.append(n,`lt.${i}`),this}lte(n,i){return this.url.searchParams.append(n,`lte.${i}`),this}like(n,i){return this.url.searchParams.append(n,`like.${i}`),this}likeAllOf(n,i){return this.url.searchParams.append(n,`like(all).{${i.join(",")}}`),this}likeAnyOf(n,i){return this.url.searchParams.append(n,`like(any).{${i.join(",")}}`),this}ilike(n,i){return this.url.searchParams.append(n,`ilike.${i}`),this}ilikeAllOf(n,i){return this.url.searchParams.append(n,`ilike(all).{${i.join(",")}}`),this}ilikeAnyOf(n,i){return this.url.searchParams.append(n,`ilike(any).{${i.join(",")}}`),this}regexMatch(n,i){return this.url.searchParams.append(n,`match.${i}`),this}regexIMatch(n,i){return this.url.searchParams.append(n,`imatch.${i}`),this}is(n,i){return this.url.searchParams.append(n,`is.${i}`),this}isDistinct(n,i){return this.url.searchParams.append(n,`isdistinct.${i}`),this}in(n,i){const o=Array.from(new Set(i)).map(l=>typeof l=="string"&&t.test(l)?`"${l}"`:`${l}`).join(",");return this.url.searchParams.append(n,`in.(${o})`),this}contains(n,i){return typeof i=="string"?this.url.searchParams.append(n,`cs.${i}`):Array.isArray(i)?this.url.searchParams.append(n,`cs.{${i.join(",")}}`):this.url.searchParams.append(n,`cs.${JSON.stringify(i)}`),this}containedBy(n,i){return typeof i=="string"?this.url.searchParams.append(n,`cd.${i}`):Array.isArray(i)?this.url.searchParams.append(n,`cd.{${i.join(",")}}`):this.url.searchParams.append(n,`cd.${JSON.stringify(i)}`),this}rangeGt(n,i){return this.url.searchParams.append(n,`sr.${i}`),this}rangeGte(n,i){return this.url.searchParams.append(n,`nxl.${i}`),this}rangeLt(n,i){return this.url.searchParams.append(n,`sl.${i}`),this}rangeLte(n,i){return this.url.searchParams.append(n,`nxr.${i}`),this}rangeAdjacent(n,i){return this.url.searchParams.append(n,`adj.${i}`),this}overlaps(n,i){return typeof i=="string"?this.url.searchParams.append(n,`ov.${i}`):this.url.searchParams.append(n,`ov.{${i.join(",")}}`),this}textSearch(n,i,{config:o,type:l}={}){let c="";l==="plain"?c="pl":l==="phrase"?c="ph":l==="websearch"&&(c="w");const d=o===void 0?"":`(${o})`;return this.url.searchParams.append(n,`${c}fts${d}.${i}`),this}match(n){return Object.entries(n).forEach(([i,o])=>{this.url.searchParams.append(i,`eq.${o}`)}),this}not(n,i,o){return this.url.searchParams.append(n,`not.${i}.${o}`),this}or(n,{foreignTable:i,referencedTable:o=i}={}){const l=o?`${o}.or`:"or";return this.url.searchParams.append(l,`(${n})`),this}filter(n,i,o){return this.url.searchParams.append(n,`${i}.${o}`),this}};return De.default=s,De}var sr;function es(){if(sr)return Be;sr=1,Object.defineProperty(Be,"__esModule",{value:!0});const e=Re.__importDefault(Ht());let t=class{constructor(a,{headers:n={},schema:i,fetch:o}){this.url=a,this.headers=new Headers(n),this.schema=i,this.fetch=o}select(a,n){const{head:i=!1,count:o}=n??{},l=i?"HEAD":"GET";let c=!1;const d=(a??"*").split("").map(u=>/\s/.test(u)&&!c?"":(u==='"'&&(c=!c),u)).join("");return this.url.searchParams.set("select",d),o&&this.headers.append("Prefer",`count=${o}`),new e.default({method:l,url:this.url,headers:this.headers,schema:this.schema,fetch:this.fetch})}insert(a,{count:n,defaultToNull:i=!0}={}){var o;const l="POST";if(n&&this.headers.append("Prefer",`count=${n}`),i||this.headers.append("Prefer","missing=default"),Array.isArray(a)){const c=a.reduce((d,u)=>d.concat(Object.keys(u)),[]);if(c.length>0){const d=[...new Set(c)].map(u=>`"${u}"`);this.url.searchParams.set("columns",d.join(","))}}return new e.default({method:l,url:this.url,headers:this.headers,schema:this.schema,body:a,fetch:(o=this.fetch)!==null&&o!==void 0?o:fetch})}upsert(a,{onConflict:n,ignoreDuplicates:i=!1,count:o,defaultToNull:l=!0}={}){var c;const d="POST";if(this.headers.append("Prefer",`resolution=${i?"ignore":"merge"}-duplicates`),n!==void 0&&this.url.searchParams.set("on_conflict",n),o&&this.headers.append("Prefer",`count=${o}`),l||this.headers.append("Prefer","missing=default"),Array.isArray(a)){const u=a.reduce((p,h)=>p.concat(Object.keys(h)),[]);if(u.length>0){const p=[...new Set(u)].map(h=>`"${h}"`);this.url.searchParams.set("columns",p.join(","))}}return new e.default({method:d,url:this.url,headers:this.headers,schema:this.schema,body:a,fetch:(c=this.fetch)!==null&&c!==void 0?c:fetch})}update(a,{count:n}={}){var i;const o="PATCH";return n&&this.headers.append("Prefer",`count=${n}`),new e.default({method:o,url:this.url,headers:this.headers,schema:this.schema,body:a,fetch:(i=this.fetch)!==null&&i!==void 0?i:fetch})}delete({count:a}={}){var n;const i="DELETE";return a&&this.headers.append("Prefer",`count=${a}`),new e.default({method:i,url:this.url,headers:this.headers,schema:this.schema,fetch:(n=this.fetch)!==null&&n!==void 0?n:fetch})}};return Be.default=t,Be}var ar;function ja(){if(ar)return qe;ar=1,Object.defineProperty(qe,"__esModule",{value:!0});const r=Re,e=r.__importDefault(es()),t=r.__importDefault(Ht());let s=class ts{constructor(n,{headers:i={},schema:o,fetch:l}={}){this.url=n,this.headers=new Headers(i),this.schemaName=o,this.fetch=l}from(n){if(!n||typeof n!="string"||n.trim()==="")throw new Error("Invalid relation name: relation must be a non-empty string.");const i=new URL(`${this.url}/${n}`);return new e.default(i,{headers:new Headers(this.headers),schema:this.schemaName,fetch:this.fetch})}schema(n){return new ts(this.url,{headers:this.headers,schema:n,fetch:this.fetch})}rpc(n,i={},{head:o=!1,get:l=!1,count:c}={}){var d;let u;const p=new URL(`${this.url}/rpc/${n}`);let h;o||l?(u=o?"HEAD":"GET",Object.entries(i).filter(([g,v])=>v!==void 0).map(([g,v])=>[g,Array.isArray(v)?`{${v.join(",")}}`:`${v}`]).forEach(([g,v])=>{p.searchParams.append(g,v)})):(u="POST",h=i);const f=new Headers(this.headers);return c&&f.set("Prefer",`count=${c}`),new t.default({method:u,url:p,headers:f,schema:this.schemaName,body:h,fetch:(d=this.fetch)!==null&&d!==void 0?d:fetch})}};return qe.default=s,qe}Object.defineProperty(K,"__esModule",{value:!0});K.PostgrestError=K.PostgrestBuilder=K.PostgrestTransformBuilder=K.PostgrestFilterBuilder=K.PostgrestQueryBuilder=K.PostgrestClient=void 0;const Pe=Re,rs=Pe.__importDefault(ja());K.PostgrestClient=rs.default;const ss=Pe.__importDefault(es());K.PostgrestQueryBuilder=ss.default;const as=Pe.__importDefault(Ht());K.PostgrestFilterBuilder=as.default;const ns=Pe.__importDefault(Xr());K.PostgrestTransformBuilder=ns.default;const is=Pe.__importDefault(Qr());K.PostgrestBuilder=is.default;const os=Pe.__importDefault(Zr());K.PostgrestError=os.default;K.default={PostgrestClient:rs.default,PostgrestQueryBuilder:ss.default,PostgrestFilterBuilder:as.default,PostgrestTransformBuilder:ns.default,PostgrestBuilder:is.default,PostgrestError:os.default};class ls{constructor(){}static detectEnvironment(){var e;if(typeof WebSocket<"u")return{type:"native",constructor:WebSocket};if(typeof globalThis<"u"&&typeof globalThis.WebSocket<"u")return{type:"native",constructor:globalThis.WebSocket};if(typeof global<"u"&&typeof global.WebSocket<"u")return{type:"native",constructor:global.WebSocket};if(typeof globalThis<"u"&&typeof globalThis.WebSocketPair<"u"&&typeof globalThis.WebSocket>"u")return{type:"cloudflare",error:"Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",workaround:"Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."};if(typeof globalThis<"u"&&globalThis.EdgeRuntime||typeof navigator<"u"&&(!((e=navigator.userAgent)===null||e===void 0)&&e.includes("Vercel-Edge")))return{type:"unsupported",error:"Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",workaround:"Use serverless functions or a different deployment target for WebSocket functionality."};if(typeof process<"u"){const t=process.versions;if(t&&t.node){const s=t.node,a=parseInt(s.replace(/^v/,"").split(".")[0]);return a>=22?typeof globalThis.WebSocket<"u"?{type:"native",constructor:globalThis.WebSocket}:{type:"unsupported",error:`Node.js ${a} detected but native WebSocket not found.`,workaround:"Provide a WebSocket implementation via the transport option."}:{type:"unsupported",error:`Node.js ${a} detected without native WebSocket support.`,workaround:`For Node.js < 22, install "ws" package and provide it via the transport option:
import ws from "ws"
new RealtimeClient(url, { transport: ws })`}}}return{type:"unsupported",error:"Unknown JavaScript runtime without WebSocket support.",workaround:"Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."}}static getWebSocketConstructor(){const e=this.detectEnvironment();if(e.constructor)return e.constructor;let t=e.error||"WebSocket not supported in this environment.";throw e.workaround&&(t+=`

Suggested solution: ${e.workaround}`),new Error(t)}static createWebSocket(e,t){const s=this.getWebSocketConstructor();return new s(e,t)}static isWebSocketSupported(){try{const e=this.detectEnvironment();return e.type==="native"||e.type==="ws"}catch{return!1}}}const Ea="2.86.2",Sa=`realtime-js/${Ea}`,cs="1.0.0",Ta="2.0.0",nr=cs,St=1e4,Oa=1e3,Aa=100;var fe;(function(r){r[r.connecting=0]="connecting",r[r.open=1]="open",r[r.closing=2]="closing",r[r.closed=3]="closed"})(fe||(fe={}));var z;(function(r){r.closed="closed",r.errored="errored",r.joined="joined",r.joining="joining",r.leaving="leaving"})(z||(z={}));var ee;(function(r){r.close="phx_close",r.error="phx_error",r.join="phx_join",r.reply="phx_reply",r.leave="phx_leave",r.access_token="access_token"})(ee||(ee={}));var Tt;(function(r){r.websocket="websocket"})(Tt||(Tt={}));var ge;(function(r){r.Connecting="connecting",r.Open="open",r.Closing="closing",r.Closed="closed"})(ge||(ge={}));class Ca{constructor(e){this.HEADER_LENGTH=1,this.USER_BROADCAST_PUSH_META_LENGTH=6,this.KINDS={userBroadcastPush:3,userBroadcast:4},this.BINARY_ENCODING=0,this.JSON_ENCODING=1,this.BROADCAST_EVENT="broadcast",this.allowedMetadataKeys=[],this.allowedMetadataKeys=e??[]}encode(e,t){if(e.event===this.BROADCAST_EVENT&&!(e.payload instanceof ArrayBuffer)&&typeof e.payload.event=="string")return t(this._binaryEncodeUserBroadcastPush(e));let s=[e.join_ref,e.ref,e.topic,e.event,e.payload];return t(JSON.stringify(s))}_binaryEncodeUserBroadcastPush(e){var t;return this._isArrayBuffer((t=e.payload)===null||t===void 0?void 0:t.payload)?this._encodeBinaryUserBroadcastPush(e):this._encodeJsonUserBroadcastPush(e)}_encodeBinaryUserBroadcastPush(e){var t,s;const a=(s=(t=e.payload)===null||t===void 0?void 0:t.payload)!==null&&s!==void 0?s:new ArrayBuffer(0);return this._encodeUserBroadcastPush(e,this.BINARY_ENCODING,a)}_encodeJsonUserBroadcastPush(e){var t,s;const a=(s=(t=e.payload)===null||t===void 0?void 0:t.payload)!==null&&s!==void 0?s:{},i=new TextEncoder().encode(JSON.stringify(a)).buffer;return this._encodeUserBroadcastPush(e,this.JSON_ENCODING,i)}_encodeUserBroadcastPush(e,t,s){var a,n;const i=e.topic,o=(a=e.ref)!==null&&a!==void 0?a:"",l=(n=e.join_ref)!==null&&n!==void 0?n:"",c=e.payload.event,d=this.allowedMetadataKeys?this._pick(e.payload,this.allowedMetadataKeys):{},u=Object.keys(d).length===0?"":JSON.stringify(d);if(l.length>255)throw new Error(`joinRef length ${l.length} exceeds maximum of 255`);if(o.length>255)throw new Error(`ref length ${o.length} exceeds maximum of 255`);if(i.length>255)throw new Error(`topic length ${i.length} exceeds maximum of 255`);if(c.length>255)throw new Error(`userEvent length ${c.length} exceeds maximum of 255`);if(u.length>255)throw new Error(`metadata length ${u.length} exceeds maximum of 255`);const p=this.USER_BROADCAST_PUSH_META_LENGTH+l.length+o.length+i.length+c.length+u.length,h=new ArrayBuffer(this.HEADER_LENGTH+p);let f=new DataView(h),g=0;f.setUint8(g++,this.KINDS.userBroadcastPush),f.setUint8(g++,l.length),f.setUint8(g++,o.length),f.setUint8(g++,i.length),f.setUint8(g++,c.length),f.setUint8(g++,u.length),f.setUint8(g++,t),Array.from(l,m=>f.setUint8(g++,m.charCodeAt(0))),Array.from(o,m=>f.setUint8(g++,m.charCodeAt(0))),Array.from(i,m=>f.setUint8(g++,m.charCodeAt(0))),Array.from(c,m=>f.setUint8(g++,m.charCodeAt(0))),Array.from(u,m=>f.setUint8(g++,m.charCodeAt(0)));var v=new Uint8Array(h.byteLength+s.byteLength);return v.set(new Uint8Array(h),0),v.set(new Uint8Array(s),h.byteLength),v.buffer}decode(e,t){if(this._isArrayBuffer(e)){let s=this._binaryDecode(e);return t(s)}if(typeof e=="string"){const s=JSON.parse(e),[a,n,i,o,l]=s;return t({join_ref:a,ref:n,topic:i,event:o,payload:l})}return t({})}_binaryDecode(e){const t=new DataView(e),s=t.getUint8(0),a=new TextDecoder;switch(s){case this.KINDS.userBroadcast:return this._decodeUserBroadcast(e,t,a)}}_decodeUserBroadcast(e,t,s){const a=t.getUint8(1),n=t.getUint8(2),i=t.getUint8(3),o=t.getUint8(4);let l=this.HEADER_LENGTH+4;const c=s.decode(e.slice(l,l+a));l=l+a;const d=s.decode(e.slice(l,l+n));l=l+n;const u=s.decode(e.slice(l,l+i));l=l+i;const p=e.slice(l,e.byteLength),h=o===this.JSON_ENCODING?JSON.parse(s.decode(p)):p,f={type:this.BROADCAST_EVENT,event:d,payload:h};return i>0&&(f.meta=JSON.parse(u)),{join_ref:null,ref:null,topic:c,event:this.BROADCAST_EVENT,payload:f}}_isArrayBuffer(e){var t;return e instanceof ArrayBuffer||((t=e==null?void 0:e.constructor)===null||t===void 0?void 0:t.name)==="ArrayBuffer"}_pick(e,t){return!e||typeof e!="object"?{}:Object.fromEntries(Object.entries(e).filter(([s])=>t.includes(s)))}}class ds{constructor(e,t){this.callback=e,this.timerCalc=t,this.timer=void 0,this.tries=0,this.callback=e,this.timerCalc=t}reset(){this.tries=0,clearTimeout(this.timer),this.timer=void 0}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries=this.tries+1,this.callback()},this.timerCalc(this.tries+1))}}var R;(function(r){r.abstime="abstime",r.bool="bool",r.date="date",r.daterange="daterange",r.float4="float4",r.float8="float8",r.int2="int2",r.int4="int4",r.int4range="int4range",r.int8="int8",r.int8range="int8range",r.json="json",r.jsonb="jsonb",r.money="money",r.numeric="numeric",r.oid="oid",r.reltime="reltime",r.text="text",r.time="time",r.timestamp="timestamp",r.timestamptz="timestamptz",r.timetz="timetz",r.tsrange="tsrange",r.tstzrange="tstzrange"})(R||(R={}));const ir=(r,e,t={})=>{var s;const a=(s=t.skipTypes)!==null&&s!==void 0?s:[];return e?Object.keys(e).reduce((n,i)=>(n[i]=Ra(i,r,e,a),n),{}):{}},Ra=(r,e,t,s)=>{const a=e.find(o=>o.name===r),n=a==null?void 0:a.type,i=t[r];return n&&!s.includes(n)?us(n,i):Ot(i)},us=(r,e)=>{if(r.charAt(0)==="_"){const t=r.slice(1,r.length);return za(e,t)}switch(r){case R.bool:return Pa(e);case R.float4:case R.float8:case R.int2:case R.int4:case R.int8:case R.numeric:case R.oid:return $a(e);case R.json:case R.jsonb:return Ia(e);case R.timestamp:return La(e);case R.abstime:case R.date:case R.daterange:case R.int4range:case R.int8range:case R.money:case R.reltime:case R.text:case R.time:case R.timestamptz:case R.timetz:case R.tsrange:case R.tstzrange:return Ot(e);default:return Ot(e)}},Ot=r=>r,Pa=r=>{switch(r){case"t":return!0;case"f":return!1;default:return r}},$a=r=>{if(typeof r=="string"){const e=parseFloat(r);if(!Number.isNaN(e))return e}return r},Ia=r=>{if(typeof r=="string")try{return JSON.parse(r)}catch(e){return console.log(`JSON parse error: ${e}`),r}return r},za=(r,e)=>{if(typeof r!="string")return r;const t=r.length-1,s=r[t];if(r[0]==="{"&&s==="}"){let n;const i=r.slice(1,t);try{n=JSON.parse("["+i+"]")}catch{n=i?i.split(","):[]}return n.map(o=>us(e,o))}return r},La=r=>typeof r=="string"?r.replace(" ","T"):r,hs=r=>{const e=new URL(r);return e.protocol=e.protocol.replace(/^ws/i,"http"),e.pathname=e.pathname.replace(/\/+$/,"").replace(/\/socket\/websocket$/i,"").replace(/\/socket$/i,"").replace(/\/websocket$/i,""),e.pathname===""||e.pathname==="/"?e.pathname="/api/broadcast":e.pathname=e.pathname+"/api/broadcast",e.href};class vt{constructor(e,t,s={},a=St){this.channel=e,this.event=t,this.payload=s,this.timeout=a,this.sent=!1,this.timeoutTimer=void 0,this.ref="",this.receivedResp=null,this.recHooks=[],this.refEvent=null}resend(e){this.timeout=e,this._cancelRefEvent(),this.ref="",this.refEvent=null,this.receivedResp=null,this.sent=!1,this.send()}send(){this._hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload,ref:this.ref,join_ref:this.channel._joinRef()}))}updatePayload(e){this.payload=Object.assign(Object.assign({},this.payload),e)}receive(e,t){var s;return this._hasReceived(e)&&t((s=this.receivedResp)===null||s===void 0?void 0:s.response),this.recHooks.push({status:e,callback:t}),this}startTimeout(){if(this.timeoutTimer)return;this.ref=this.channel.socket._makeRef(),this.refEvent=this.channel._replyEventName(this.ref);const e=t=>{this._cancelRefEvent(),this._cancelTimeout(),this.receivedResp=t,this._matchReceive(t)};this.channel._on(this.refEvent,{},e),this.timeoutTimer=setTimeout(()=>{this.trigger("timeout",{})},this.timeout)}trigger(e,t){this.refEvent&&this.channel._trigger(this.refEvent,{status:e,response:t})}destroy(){this._cancelRefEvent(),this._cancelTimeout()}_cancelRefEvent(){this.refEvent&&this.channel._off(this.refEvent,{})}_cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=void 0}_matchReceive({status:e,response:t}){this.recHooks.filter(s=>s.status===e).forEach(s=>s.callback(t))}_hasReceived(e){return this.receivedResp&&this.receivedResp.status===e}}var At;(function(r){r.SYNC="sync",r.JOIN="join",r.LEAVE="leave"})(At||(At={}));let ps=class Je{constructor(e,t){this.channel=e,this.state={},this.pendingDiffs=[],this.joinRef=null,this.enabled=!1,this.caller={onJoin:()=>{},onLeave:()=>{},onSync:()=>{}};const s=(t==null?void 0:t.events)||{state:"presence_state",diff:"presence_diff"};this.channel._on(s.state,{},a=>{const{onJoin:n,onLeave:i,onSync:o}=this.caller;this.joinRef=this.channel._joinRef(),this.state=Je.syncState(this.state,a,n,i),this.pendingDiffs.forEach(l=>{this.state=Je.syncDiff(this.state,l,n,i)}),this.pendingDiffs=[],o()}),this.channel._on(s.diff,{},a=>{const{onJoin:n,onLeave:i,onSync:o}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(a):(this.state=Je.syncDiff(this.state,a,n,i),o())}),this.onJoin((a,n,i)=>{this.channel._trigger("presence",{event:"join",key:a,currentPresences:n,newPresences:i})}),this.onLeave((a,n,i)=>{this.channel._trigger("presence",{event:"leave",key:a,currentPresences:n,leftPresences:i})}),this.onSync(()=>{this.channel._trigger("presence",{event:"sync"})})}static syncState(e,t,s,a){const n=this.cloneDeep(e),i=this.transformState(t),o={},l={};return this.map(n,(c,d)=>{i[c]||(l[c]=d)}),this.map(i,(c,d)=>{const u=n[c];if(u){const p=d.map(v=>v.presence_ref),h=u.map(v=>v.presence_ref),f=d.filter(v=>h.indexOf(v.presence_ref)<0),g=u.filter(v=>p.indexOf(v.presence_ref)<0);f.length>0&&(o[c]=f),g.length>0&&(l[c]=g)}else o[c]=d}),this.syncDiff(n,{joins:o,leaves:l},s,a)}static syncDiff(e,t,s,a){const{joins:n,leaves:i}={joins:this.transformState(t.joins),leaves:this.transformState(t.leaves)};return s||(s=()=>{}),a||(a=()=>{}),this.map(n,(o,l)=>{var c;const d=(c=e[o])!==null&&c!==void 0?c:[];if(e[o]=this.cloneDeep(l),d.length>0){const u=e[o].map(h=>h.presence_ref),p=d.filter(h=>u.indexOf(h.presence_ref)<0);e[o].unshift(...p)}s(o,d,l)}),this.map(i,(o,l)=>{let c=e[o];if(!c)return;const d=l.map(u=>u.presence_ref);c=c.filter(u=>d.indexOf(u.presence_ref)<0),e[o]=c,a(o,c,l),c.length===0&&delete e[o]}),e}static map(e,t){return Object.getOwnPropertyNames(e).map(s=>t(s,e[s]))}static transformState(e){return e=this.cloneDeep(e),Object.getOwnPropertyNames(e).reduce((t,s)=>{const a=e[s];return"metas"in a?t[s]=a.metas.map(n=>(n.presence_ref=n.phx_ref,delete n.phx_ref,delete n.phx_ref_prev,n)):t[s]=a,t},{})}static cloneDeep(e){return JSON.parse(JSON.stringify(e))}onJoin(e){this.caller.onJoin=e}onLeave(e){this.caller.onLeave=e}onSync(e){this.caller.onSync=e}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel._joinRef()}};var Ct;(function(r){r.ALL="*",r.INSERT="INSERT",r.UPDATE="UPDATE",r.DELETE="DELETE"})(Ct||(Ct={}));var Ee;(function(r){r.BROADCAST="broadcast",r.PRESENCE="presence",r.POSTGRES_CHANGES="postgres_changes",r.SYSTEM="system"})(Ee||(Ee={}));var se;(function(r){r.SUBSCRIBED="SUBSCRIBED",r.TIMED_OUT="TIMED_OUT",r.CLOSED="CLOSED",r.CHANNEL_ERROR="CHANNEL_ERROR"})(se||(se={}));const Na=z;let fs=class gs{constructor(e,t={config:{}},s){var a,n;if(this.topic=e,this.params=t,this.socket=s,this.bindings={},this.state=z.closed,this.joinedOnce=!1,this.pushBuffer=[],this.subTopic=e.replace(/^realtime:/i,""),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},t.config),this.timeout=this.socket.timeout,this.joinPush=new vt(this,ee.join,this.params,this.timeout),this.rejoinTimer=new ds(()=>this._rejoinUntilConnected(),this.socket.reconnectAfterMs),this.joinPush.receive("ok",()=>{this.state=z.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(i=>i.send()),this.pushBuffer=[]}),this._onClose(()=>{this.rejoinTimer.reset(),this.socket.log("channel",`close ${this.topic} ${this._joinRef()}`),this.state=z.closed,this.socket._remove(this)}),this._onError(i=>{this._isLeaving()||this._isClosed()||(this.socket.log("channel",`error ${this.topic}`,i),this.state=z.errored,this.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("timeout",()=>{this._isJoining()&&(this.socket.log("channel",`timeout ${this.topic}`,this.joinPush.timeout),this.state=z.errored,this.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("error",i=>{this._isLeaving()||this._isClosed()||(this.socket.log("channel",`error ${this.topic}`,i),this.state=z.errored,this.rejoinTimer.scheduleTimeout())}),this._on(ee.reply,{},(i,o)=>{this._trigger(this._replyEventName(o),i)}),this.presence=new ps(this),this.broadcastEndpointURL=hs(this.socket.endPoint),this.private=this.params.config.private||!1,!this.private&&(!((n=(a=this.params.config)===null||a===void 0?void 0:a.broadcast)===null||n===void 0)&&n.replay))throw`tried to use replay on public channel '${this.topic}'. It must be a private channel.`}subscribe(e,t=this.timeout){var s,a,n;if(this.socket.isConnected()||this.socket.connect(),this.state==z.closed){const{config:{broadcast:i,presence:o,private:l}}=this.params,c=(a=(s=this.bindings.postgres_changes)===null||s===void 0?void 0:s.map(h=>h.filter))!==null&&a!==void 0?a:[],d=!!this.bindings[Ee.PRESENCE]&&this.bindings[Ee.PRESENCE].length>0||((n=this.params.config.presence)===null||n===void 0?void 0:n.enabled)===!0,u={},p={broadcast:i,presence:Object.assign(Object.assign({},o),{enabled:d}),postgres_changes:c,private:l};this.socket.accessTokenValue&&(u.access_token=this.socket.accessTokenValue),this._onError(h=>e==null?void 0:e(se.CHANNEL_ERROR,h)),this._onClose(()=>e==null?void 0:e(se.CLOSED)),this.updateJoinPayload(Object.assign({config:p},u)),this.joinedOnce=!0,this._rejoin(t),this.joinPush.receive("ok",async({postgres_changes:h})=>{var f;if(this.socket.setAuth(),h===void 0){e==null||e(se.SUBSCRIBED);return}else{const g=this.bindings.postgres_changes,v=(f=g==null?void 0:g.length)!==null&&f!==void 0?f:0,m=[];for(let _=0;_<v;_++){const y=g[_],{filter:{event:x,schema:k,table:w,filter:b}}=y,O=h&&h[_];if(O&&O.event===x&&O.schema===k&&O.table===w&&O.filter===b)m.push(Object.assign(Object.assign({},y),{id:O.id}));else{this.unsubscribe(),this.state=z.errored,e==null||e(se.CHANNEL_ERROR,new Error("mismatch between server and client bindings for postgres changes"));return}}this.bindings.postgres_changes=m,e&&e(se.SUBSCRIBED);return}}).receive("error",h=>{this.state=z.errored,e==null||e(se.CHANNEL_ERROR,new Error(JSON.stringify(Object.values(h).join(", ")||"error")))}).receive("timeout",()=>{e==null||e(se.TIMED_OUT)})}return this}presenceState(){return this.presence.state}async track(e,t={}){return await this.send({type:"presence",event:"track",payload:e},t.timeout||this.timeout)}async untrack(e={}){return await this.send({type:"presence",event:"untrack"},e)}on(e,t,s){return this.state===z.joined&&e===Ee.PRESENCE&&(this.socket.log("channel",`resubscribe to ${this.topic} due to change in presence callbacks on joined channel`),this.unsubscribe().then(()=>this.subscribe())),this._on(e,t,s)}async httpSend(e,t,s={}){var a;const n=this.socket.accessTokenValue?`Bearer ${this.socket.accessTokenValue}`:"";if(t==null)return Promise.reject("Payload is required for httpSend()");const i={method:"POST",headers:{Authorization:n,apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"},body:JSON.stringify({messages:[{topic:this.subTopic,event:e,payload:t,private:this.private}]})},o=await this._fetchWithTimeout(this.broadcastEndpointURL,i,(a=s.timeout)!==null&&a!==void 0?a:this.timeout);if(o.status===202)return{success:!0};let l=o.statusText;try{const c=await o.json();l=c.error||c.message||l}catch{}return Promise.reject(new Error(l))}async send(e,t={}){var s,a;if(!this._canPush()&&e.type==="broadcast"){console.warn("Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");const{event:n,payload:i}=e,l={method:"POST",headers:{Authorization:this.socket.accessTokenValue?`Bearer ${this.socket.accessTokenValue}`:"",apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"},body:JSON.stringify({messages:[{topic:this.subTopic,event:n,payload:i,private:this.private}]})};try{const c=await this._fetchWithTimeout(this.broadcastEndpointURL,l,(s=t.timeout)!==null&&s!==void 0?s:this.timeout);return await((a=c.body)===null||a===void 0?void 0:a.cancel()),c.ok?"ok":"error"}catch(c){return c.name==="AbortError"?"timed out":"error"}}else return new Promise(n=>{var i,o,l;const c=this._push(e.type,e,t.timeout||this.timeout);e.type==="broadcast"&&!(!((l=(o=(i=this.params)===null||i===void 0?void 0:i.config)===null||o===void 0?void 0:o.broadcast)===null||l===void 0)&&l.ack)&&n("ok"),c.receive("ok",()=>n("ok")),c.receive("error",()=>n("error")),c.receive("timeout",()=>n("timed out"))})}updateJoinPayload(e){this.joinPush.updatePayload(e)}unsubscribe(e=this.timeout){this.state=z.leaving;const t=()=>{this.socket.log("channel",`leave ${this.topic}`),this._trigger(ee.close,"leave",this._joinRef())};this.joinPush.destroy();let s=null;return new Promise(a=>{s=new vt(this,ee.leave,{},e),s.receive("ok",()=>{t(),a("ok")}).receive("timeout",()=>{t(),a("timed out")}).receive("error",()=>{a("error")}),s.send(),this._canPush()||s.trigger("ok",{})}).finally(()=>{s==null||s.destroy()})}teardown(){this.pushBuffer.forEach(e=>e.destroy()),this.pushBuffer=[],this.rejoinTimer.reset(),this.joinPush.destroy(),this.state=z.closed,this.bindings={}}async _fetchWithTimeout(e,t,s){const a=new AbortController,n=setTimeout(()=>a.abort(),s),i=await this.socket.fetch(e,Object.assign(Object.assign({},t),{signal:a.signal}));return clearTimeout(n),i}_push(e,t,s=this.timeout){if(!this.joinedOnce)throw`tried to push '${e}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;let a=new vt(this,e,t,s);return this._canPush()?a.send():this._addToPushBuffer(a),a}_addToPushBuffer(e){if(e.startTimeout(),this.pushBuffer.push(e),this.pushBuffer.length>Aa){const t=this.pushBuffer.shift();t&&(t.destroy(),this.socket.log("channel",`discarded push due to buffer overflow: ${t.event}`,t.payload))}}_onMessage(e,t,s){return t}_isMember(e){return this.topic===e}_joinRef(){return this.joinPush.ref}_trigger(e,t,s){var a,n;const i=e.toLocaleLowerCase(),{close:o,error:l,leave:c,join:d}=ee;if(s&&[o,l,c,d].indexOf(i)>=0&&s!==this._joinRef())return;let p=this._onMessage(i,t,s);if(t&&!p)throw"channel onMessage callbacks must return the payload, modified or unmodified";["insert","update","delete"].includes(i)?(a=this.bindings.postgres_changes)===null||a===void 0||a.filter(h=>{var f,g,v;return((f=h.filter)===null||f===void 0?void 0:f.event)==="*"||((v=(g=h.filter)===null||g===void 0?void 0:g.event)===null||v===void 0?void 0:v.toLocaleLowerCase())===i}).map(h=>h.callback(p,s)):(n=this.bindings[i])===null||n===void 0||n.filter(h=>{var f,g,v,m,_,y;if(["broadcast","presence","postgres_changes"].includes(i))if("id"in h){const x=h.id,k=(f=h.filter)===null||f===void 0?void 0:f.event;return x&&((g=t.ids)===null||g===void 0?void 0:g.includes(x))&&(k==="*"||(k==null?void 0:k.toLocaleLowerCase())===((v=t.data)===null||v===void 0?void 0:v.type.toLocaleLowerCase()))}else{const x=(_=(m=h==null?void 0:h.filter)===null||m===void 0?void 0:m.event)===null||_===void 0?void 0:_.toLocaleLowerCase();return x==="*"||x===((y=t==null?void 0:t.event)===null||y===void 0?void 0:y.toLocaleLowerCase())}else return h.type.toLocaleLowerCase()===i}).map(h=>{if(typeof p=="object"&&"ids"in p){const f=p.data,{schema:g,table:v,commit_timestamp:m,type:_,errors:y}=f;p=Object.assign(Object.assign({},{schema:g,table:v,commit_timestamp:m,eventType:_,new:{},old:{},errors:y}),this._getPayloadRecords(f))}h.callback(p,s)})}_isClosed(){return this.state===z.closed}_isJoined(){return this.state===z.joined}_isJoining(){return this.state===z.joining}_isLeaving(){return this.state===z.leaving}_replyEventName(e){return`chan_reply_${e}`}_on(e,t,s){const a=e.toLocaleLowerCase(),n={type:a,filter:t,callback:s};return this.bindings[a]?this.bindings[a].push(n):this.bindings[a]=[n],this}_off(e,t){const s=e.toLocaleLowerCase();return this.bindings[s]&&(this.bindings[s]=this.bindings[s].filter(a=>{var n;return!(((n=a.type)===null||n===void 0?void 0:n.toLocaleLowerCase())===s&&gs.isEqual(a.filter,t))})),this}static isEqual(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const s in e)if(e[s]!==t[s])return!1;return!0}_rejoinUntilConnected(){this.rejoinTimer.scheduleTimeout(),this.socket.isConnected()&&this._rejoin()}_onClose(e){this._on(ee.close,{},e)}_onError(e){this._on(ee.error,{},t=>e(t))}_canPush(){return this.socket.isConnected()&&this._isJoined()}_rejoin(e=this.timeout){this._isLeaving()||(this.socket._leaveOpenTopic(this.topic),this.state=z.joining,this.joinPush.resend(e))}_getPayloadRecords(e){const t={new:{},old:{}};return(e.type==="INSERT"||e.type==="UPDATE")&&(t.new=ir(e.columns,e.record)),(e.type==="UPDATE"||e.type==="DELETE")&&(t.old=ir(e.columns,e.old_record)),t}};const mt=()=>{},Ke={HEARTBEAT_INTERVAL:25e3,RECONNECT_DELAY:10,HEARTBEAT_TIMEOUT_FALLBACK:100},Ma=[1e3,2e3,5e3,1e4],Ua=1e4,qa=`
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;let Ba=class{constructor(e,t){var s;if(this.accessTokenValue=null,this.apiKey=null,this.channels=new Array,this.endPoint="",this.httpEndpoint="",this.headers={},this.params={},this.timeout=St,this.transport=null,this.heartbeatIntervalMs=Ke.HEARTBEAT_INTERVAL,this.heartbeatTimer=void 0,this.pendingHeartbeatRef=null,this.heartbeatCallback=mt,this.ref=0,this.reconnectTimer=null,this.vsn=nr,this.logger=mt,this.conn=null,this.sendBuffer=[],this.serializer=new Ca,this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.accessToken=null,this._connectionState="disconnected",this._wasManualDisconnect=!1,this._authPromise=null,this._resolveFetch=a=>a?(...n)=>a(...n):(...n)=>fetch(...n),!(!((s=t==null?void 0:t.params)===null||s===void 0)&&s.apikey))throw new Error("API key is required to connect to Realtime");this.apiKey=t.params.apikey,this.endPoint=`${e}/${Tt.websocket}`,this.httpEndpoint=hs(e),this._initializeOptions(t),this._setupReconnectionTimer(),this.fetch=this._resolveFetch(t==null?void 0:t.fetch)}connect(){if(!(this.isConnecting()||this.isDisconnecting()||this.conn!==null&&this.isConnected())){if(this._setConnectionState("connecting"),this.accessToken&&!this._authPromise&&this._setAuthSafely("connect"),this.transport)this.conn=new this.transport(this.endpointURL());else try{this.conn=ls.createWebSocket(this.endpointURL())}catch(e){this._setConnectionState("disconnected");const t=e.message;throw t.includes("Node.js")?new Error(`${t}

To use Realtime in Node.js, you need to provide a WebSocket implementation:

Option 1: Use Node.js 22+ which has native WebSocket support
Option 2: Install and provide the "ws" package:

  npm install ws

  import ws from "ws"
  const client = new RealtimeClient(url, {
    ...options,
    transport: ws
  })`):new Error(`WebSocket not available: ${t}`)}this._setupConnectionHandlers()}}endpointURL(){return this._appendParams(this.endPoint,Object.assign({},this.params,{vsn:this.vsn}))}disconnect(e,t){if(!this.isDisconnecting())if(this._setConnectionState("disconnecting",!0),this.conn){const s=setTimeout(()=>{this._setConnectionState("disconnected")},100);this.conn.onclose=()=>{clearTimeout(s),this._setConnectionState("disconnected")},typeof this.conn.close=="function"&&(e?this.conn.close(e,t??""):this.conn.close()),this._teardownConnection()}else this._setConnectionState("disconnected")}getChannels(){return this.channels}async removeChannel(e){const t=await e.unsubscribe();return this.channels.length===0&&this.disconnect(),t}async removeAllChannels(){const e=await Promise.all(this.channels.map(t=>t.unsubscribe()));return this.channels=[],this.disconnect(),e}log(e,t,s){this.logger(e,t,s)}connectionState(){switch(this.conn&&this.conn.readyState){case fe.connecting:return ge.Connecting;case fe.open:return ge.Open;case fe.closing:return ge.Closing;default:return ge.Closed}}isConnected(){return this.connectionState()===ge.Open}isConnecting(){return this._connectionState==="connecting"}isDisconnecting(){return this._connectionState==="disconnecting"}channel(e,t={config:{}}){const s=`realtime:${e}`,a=this.getChannels().find(n=>n.topic===s);if(a)return a;{const n=new fs(`realtime:${e}`,t,this);return this.channels.push(n),n}}push(e){const{topic:t,event:s,payload:a,ref:n}=e,i=()=>{this.encode(e,o=>{var l;(l=this.conn)===null||l===void 0||l.send(o)})};this.log("push",`${t} ${s} (${n})`,a),this.isConnected()?i():this.sendBuffer.push(i)}async setAuth(e=null){this._authPromise=this._performAuth(e);try{await this._authPromise}finally{this._authPromise=null}}async sendHeartbeat(){var e;if(!this.isConnected()){try{this.heartbeatCallback("disconnected")}catch(t){this.log("error","error in heartbeat callback",t)}return}if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this.log("transport","heartbeat timeout. Attempting to re-establish connection");try{this.heartbeatCallback("timeout")}catch(t){this.log("error","error in heartbeat callback",t)}this._wasManualDisconnect=!1,(e=this.conn)===null||e===void 0||e.close(Oa,"heartbeat timeout"),setTimeout(()=>{var t;this.isConnected()||(t=this.reconnectTimer)===null||t===void 0||t.scheduleTimeout()},Ke.HEARTBEAT_TIMEOUT_FALLBACK);return}this.pendingHeartbeatRef=this._makeRef(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef});try{this.heartbeatCallback("sent")}catch(t){this.log("error","error in heartbeat callback",t)}this._setAuthSafely("heartbeat")}onHeartbeat(e){this.heartbeatCallback=e}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(e=>e()),this.sendBuffer=[])}_makeRef(){let e=this.ref+1;return e===this.ref?this.ref=0:this.ref=e,this.ref.toString()}_leaveOpenTopic(e){let t=this.channels.find(s=>s.topic===e&&(s._isJoined()||s._isJoining()));t&&(this.log("transport",`leaving duplicate topic "${e}"`),t.unsubscribe())}_remove(e){this.channels=this.channels.filter(t=>t.topic!==e.topic)}_onConnMessage(e){this.decode(e.data,t=>{if(t.topic==="phoenix"&&t.event==="phx_reply")try{this.heartbeatCallback(t.payload.status==="ok"?"ok":"error")}catch(c){this.log("error","error in heartbeat callback",c)}t.ref&&t.ref===this.pendingHeartbeatRef&&(this.pendingHeartbeatRef=null);const{topic:s,event:a,payload:n,ref:i}=t,o=i?`(${i})`:"",l=n.status||"";this.log("receive",`${l} ${s} ${a} ${o}`.trim(),n),this.channels.filter(c=>c._isMember(s)).forEach(c=>c._trigger(a,n,i)),this._triggerStateCallbacks("message",t)})}_clearTimer(e){var t;e==="heartbeat"&&this.heartbeatTimer?(clearInterval(this.heartbeatTimer),this.heartbeatTimer=void 0):e==="reconnect"&&((t=this.reconnectTimer)===null||t===void 0||t.reset())}_clearAllTimers(){this._clearTimer("heartbeat"),this._clearTimer("reconnect")}_setupConnectionHandlers(){this.conn&&("binaryType"in this.conn&&(this.conn.binaryType="arraybuffer"),this.conn.onopen=()=>this._onConnOpen(),this.conn.onerror=e=>this._onConnError(e),this.conn.onmessage=e=>this._onConnMessage(e),this.conn.onclose=e=>this._onConnClose(e))}_teardownConnection(){if(this.conn){if(this.conn.readyState===fe.open||this.conn.readyState===fe.connecting)try{this.conn.close()}catch(e){this.log("error","Error closing connection",e)}this.conn.onopen=null,this.conn.onerror=null,this.conn.onmessage=null,this.conn.onclose=null,this.conn=null}this._clearAllTimers(),this.channels.forEach(e=>e.teardown())}_onConnOpen(){this._setConnectionState("connected"),this.log("transport",`connected to ${this.endpointURL()}`),(this._authPromise||(this.accessToken&&!this.accessTokenValue?this.setAuth():Promise.resolve())).then(()=>{this.flushSendBuffer()}).catch(t=>{this.log("error","error waiting for auth on connect",t),this.flushSendBuffer()}),this._clearTimer("reconnect"),this.worker?this.workerRef||this._startWorkerHeartbeat():this._startHeartbeat(),this._triggerStateCallbacks("open")}_startHeartbeat(){this.heartbeatTimer&&clearInterval(this.heartbeatTimer),this.heartbeatTimer=setInterval(()=>this.sendHeartbeat(),this.heartbeatIntervalMs)}_startWorkerHeartbeat(){this.workerUrl?this.log("worker",`starting worker for from ${this.workerUrl}`):this.log("worker","starting default worker");const e=this._workerObjectUrl(this.workerUrl);this.workerRef=new Worker(e),this.workerRef.onerror=t=>{this.log("worker","worker error",t.message),this.workerRef.terminate()},this.workerRef.onmessage=t=>{t.data.event==="keepAlive"&&this.sendHeartbeat()},this.workerRef.postMessage({event:"start",interval:this.heartbeatIntervalMs})}_onConnClose(e){var t;this._setConnectionState("disconnected"),this.log("transport","close",e),this._triggerChanError(),this._clearTimer("heartbeat"),this._wasManualDisconnect||(t=this.reconnectTimer)===null||t===void 0||t.scheduleTimeout(),this._triggerStateCallbacks("close",e)}_onConnError(e){this._setConnectionState("disconnected"),this.log("transport",`${e}`),this._triggerChanError(),this._triggerStateCallbacks("error",e)}_triggerChanError(){this.channels.forEach(e=>e._trigger(ee.error))}_appendParams(e,t){if(Object.keys(t).length===0)return e;const s=e.match(/\?/)?"&":"?",a=new URLSearchParams(t);return`${e}${s}${a}`}_workerObjectUrl(e){let t;if(e)t=e;else{const s=new Blob([qa],{type:"application/javascript"});t=URL.createObjectURL(s)}return t}_setConnectionState(e,t=!1){this._connectionState=e,e==="connecting"?this._wasManualDisconnect=!1:e==="disconnecting"&&(this._wasManualDisconnect=t)}async _performAuth(e=null){let t;e?t=e:this.accessToken?t=await this.accessToken():t=this.accessTokenValue,this.accessTokenValue!=t&&(this.accessTokenValue=t,this.channels.forEach(s=>{const a={access_token:t,version:Sa};t&&s.updateJoinPayload(a),s.joinedOnce&&s._isJoined()&&s._push(ee.access_token,{access_token:t})}))}async _waitForAuthIfNeeded(){this._authPromise&&await this._authPromise}_setAuthSafely(e="general"){this.setAuth().catch(t=>{this.log("error",`error setting auth in ${e}`,t)})}_triggerStateCallbacks(e,t){try{this.stateChangeCallbacks[e].forEach(s=>{try{s(t)}catch(a){this.log("error",`error in ${e} callback`,a)}})}catch(s){this.log("error",`error triggering ${e} callbacks`,s)}}_setupReconnectionTimer(){this.reconnectTimer=new ds(async()=>{setTimeout(async()=>{await this._waitForAuthIfNeeded(),this.isConnected()||this.connect()},Ke.RECONNECT_DELAY)},this.reconnectAfterMs)}_initializeOptions(e){var t,s,a,n,i,o,l,c,d,u,p,h;switch(this.transport=(t=e==null?void 0:e.transport)!==null&&t!==void 0?t:null,this.timeout=(s=e==null?void 0:e.timeout)!==null&&s!==void 0?s:St,this.heartbeatIntervalMs=(a=e==null?void 0:e.heartbeatIntervalMs)!==null&&a!==void 0?a:Ke.HEARTBEAT_INTERVAL,this.worker=(n=e==null?void 0:e.worker)!==null&&n!==void 0?n:!1,this.accessToken=(i=e==null?void 0:e.accessToken)!==null&&i!==void 0?i:null,this.heartbeatCallback=(o=e==null?void 0:e.heartbeatCallback)!==null&&o!==void 0?o:mt,this.vsn=(l=e==null?void 0:e.vsn)!==null&&l!==void 0?l:nr,e!=null&&e.params&&(this.params=e.params),e!=null&&e.logger&&(this.logger=e.logger),(e!=null&&e.logLevel||e!=null&&e.log_level)&&(this.logLevel=e.logLevel||e.log_level,this.params=Object.assign(Object.assign({},this.params),{log_level:this.logLevel})),this.reconnectAfterMs=(c=e==null?void 0:e.reconnectAfterMs)!==null&&c!==void 0?c:f=>Ma[f-1]||Ua,this.vsn){case cs:this.encode=(d=e==null?void 0:e.encode)!==null&&d!==void 0?d:(f,g)=>g(JSON.stringify(f)),this.decode=(u=e==null?void 0:e.decode)!==null&&u!==void 0?u:(f,g)=>g(JSON.parse(f));break;case Ta:this.encode=(p=e==null?void 0:e.encode)!==null&&p!==void 0?p:this.serializer.encode.bind(this.serializer),this.decode=(h=e==null?void 0:e.decode)!==null&&h!==void 0?h:this.serializer.decode.bind(this.serializer);break;default:throw new Error(`Unsupported serializer version: ${this.vsn}`)}if(this.worker){if(typeof window<"u"&&!window.Worker)throw new Error("Web Worker is not supported");this.workerUrl=e==null?void 0:e.workerUrl}}};const Da=Object.freeze(Object.defineProperty({__proto__:null,REALTIME_CHANNEL_STATES:Na,get REALTIME_LISTEN_TYPES(){return Ee},get REALTIME_POSTGRES_CHANGES_LISTEN_EVENT(){return Ct},get REALTIME_PRESENCE_LISTEN_EVENTS(){return At},get REALTIME_SUBSCRIBE_STATES(){return se},RealtimeChannel:fs,RealtimeClient:Ba,RealtimePresence:ps,WebSocketFactory:ls},Symbol.toStringTag,{value:"Module"})),vs=Ne(Da);class Me extends Error{constructor(e){super(e),this.__isStorageError=!0,this.name="StorageError"}}function P(r){return typeof r=="object"&&r!==null&&"__isStorageError"in r}class ms extends Me{constructor(e,t,s){super(e),this.name="StorageApiError",this.status=t,this.statusCode=s}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}}class st extends Me{constructor(e,t){super(e),this.name="StorageUnknownError",this.originalError=t}}const Ft=r=>r?(...e)=>r(...e):(...e)=>fetch(...e),Ha=()=>Response,Rt=r=>{if(Array.isArray(r))return r.map(t=>Rt(t));if(typeof r=="function"||r!==Object(r))return r;const e={};return Object.entries(r).forEach(([t,s])=>{const a=t.replace(/([-_][a-z])/gi,n=>n.toUpperCase().replace(/[-_]/g,""));e[a]=Rt(s)}),e},Fa=r=>{if(typeof r!="object"||r===null)return!1;const e=Object.getPrototypeOf(r);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in r)&&!(Symbol.iterator in r)},Va=r=>!r||typeof r!="string"||r.length===0||r.length>100||r.trim()!==r||r.includes("/")||r.includes("\\")?!1:/^[\w!.\*'() &$@=;:+,?-]+$/.test(r),yt=r=>{var e;return r.msg||r.message||r.error_description||(typeof r.error=="string"?r.error:(e=r.error)===null||e===void 0?void 0:e.message)||JSON.stringify(r)},Ka=(r,e,t)=>j(void 0,void 0,void 0,function*(){const s=yield Ha();r instanceof s&&!(t!=null&&t.noResolveJson)?r.json().then(a=>{const n=r.status||500,i=(a==null?void 0:a.statusCode)||n+"";e(new ms(yt(a),n,i))}).catch(a=>{e(new st(yt(a),a))}):e(new st(yt(r),r))}),Ga=(r,e,t,s)=>{const a={method:r,headers:(e==null?void 0:e.headers)||{}};return r==="GET"||!s?a:(Fa(s)?(a.headers=Object.assign({"Content-Type":"application/json"},e==null?void 0:e.headers),a.body=JSON.stringify(s)):a.body=s,e!=null&&e.duplex&&(a.duplex=e.duplex),Object.assign(Object.assign({},a),t))};function Ue(r,e,t,s,a,n){return j(this,void 0,void 0,function*(){return new Promise((i,o)=>{r(t,Ga(e,s,a,n)).then(l=>{if(!l.ok)throw l;return s!=null&&s.noResolveJson?l:l.json()}).then(l=>i(l)).catch(l=>Ka(l,o,s))})})}function ze(r,e,t,s){return j(this,void 0,void 0,function*(){return Ue(r,"GET",e,t,s)})}function X(r,e,t,s,a){return j(this,void 0,void 0,function*(){return Ue(r,"POST",e,s,a,t)})}function Pt(r,e,t,s,a){return j(this,void 0,void 0,function*(){return Ue(r,"PUT",e,s,a,t)})}function Wa(r,e,t,s){return j(this,void 0,void 0,function*(){return Ue(r,"HEAD",e,Object.assign(Object.assign({},t),{noResolveJson:!0}),s)})}function Vt(r,e,t,s,a){return j(this,void 0,void 0,function*(){return Ue(r,"DELETE",e,s,a,t)})}class Ja{constructor(e,t){this.downloadFn=e,this.shouldThrowOnError=t}then(e,t){return this.execute().then(e,t)}execute(){return j(this,void 0,void 0,function*(){try{return{data:(yield this.downloadFn()).body,error:null}}catch(e){if(this.shouldThrowOnError)throw e;if(P(e))return{data:null,error:e};throw e}})}}var ys;class Ya{constructor(e,t){this.downloadFn=e,this.shouldThrowOnError=t,this[ys]="BlobDownloadBuilder",this.promise=null}asStream(){return new Ja(this.downloadFn,this.shouldThrowOnError)}then(e,t){return this.getPromise().then(e,t)}catch(e){return this.getPromise().catch(e)}finally(e){return this.getPromise().finally(e)}getPromise(){return this.promise||(this.promise=this.execute()),this.promise}execute(){return j(this,void 0,void 0,function*(){try{return{data:yield(yield this.downloadFn()).blob(),error:null}}catch(e){if(this.shouldThrowOnError)throw e;if(P(e))return{data:null,error:e};throw e}})}}ys=Symbol.toStringTag;const Za={limit:100,offset:0,sortBy:{column:"name",order:"asc"}},or={cacheControl:"3600",contentType:"text/plain;charset=UTF-8",upsert:!1};class Qa{constructor(e,t={},s,a){this.shouldThrowOnError=!1,this.url=e,this.headers=t,this.bucketId=s,this.fetch=Ft(a)}throwOnError(){return this.shouldThrowOnError=!0,this}uploadOrUpdate(e,t,s,a){return j(this,void 0,void 0,function*(){try{let n;const i=Object.assign(Object.assign({},or),a);let o=Object.assign(Object.assign({},this.headers),e==="POST"&&{"x-upsert":String(i.upsert)});const l=i.metadata;typeof Blob<"u"&&s instanceof Blob?(n=new FormData,n.append("cacheControl",i.cacheControl),l&&n.append("metadata",this.encodeMetadata(l)),n.append("",s)):typeof FormData<"u"&&s instanceof FormData?(n=s,n.has("cacheControl")||n.append("cacheControl",i.cacheControl),l&&!n.has("metadata")&&n.append("metadata",this.encodeMetadata(l))):(n=s,o["cache-control"]=`max-age=${i.cacheControl}`,o["content-type"]=i.contentType,l&&(o["x-metadata"]=this.toBase64(this.encodeMetadata(l))),(typeof ReadableStream<"u"&&n instanceof ReadableStream||n&&typeof n=="object"&&"pipe"in n&&typeof n.pipe=="function")&&!i.duplex&&(i.duplex="half")),a!=null&&a.headers&&(o=Object.assign(Object.assign({},o),a.headers));const c=this._removeEmptyFolders(t),d=this._getFinalPath(c),u=yield(e=="PUT"?Pt:X)(this.fetch,`${this.url}/object/${d}`,n,Object.assign({headers:o},i!=null&&i.duplex?{duplex:i.duplex}:{}));return{data:{path:c,id:u.Id,fullPath:u.Key},error:null}}catch(n){if(this.shouldThrowOnError)throw n;if(P(n))return{data:null,error:n};throw n}})}upload(e,t,s){return j(this,void 0,void 0,function*(){return this.uploadOrUpdate("POST",e,t,s)})}uploadToSignedUrl(e,t,s,a){return j(this,void 0,void 0,function*(){const n=this._removeEmptyFolders(e),i=this._getFinalPath(n),o=new URL(this.url+`/object/upload/sign/${i}`);o.searchParams.set("token",t);try{let l;const c=Object.assign({upsert:or.upsert},a),d=Object.assign(Object.assign({},this.headers),{"x-upsert":String(c.upsert)});typeof Blob<"u"&&s instanceof Blob?(l=new FormData,l.append("cacheControl",c.cacheControl),l.append("",s)):typeof FormData<"u"&&s instanceof FormData?(l=s,l.append("cacheControl",c.cacheControl)):(l=s,d["cache-control"]=`max-age=${c.cacheControl}`,d["content-type"]=c.contentType);const u=yield Pt(this.fetch,o.toString(),l,{headers:d});return{data:{path:n,fullPath:u.Key},error:null}}catch(l){if(this.shouldThrowOnError)throw l;if(P(l))return{data:null,error:l};throw l}})}createSignedUploadUrl(e,t){return j(this,void 0,void 0,function*(){try{let s=this._getFinalPath(e);const a=Object.assign({},this.headers);t!=null&&t.upsert&&(a["x-upsert"]="true");const n=yield X(this.fetch,`${this.url}/object/upload/sign/${s}`,{},{headers:a}),i=new URL(this.url+n.url),o=i.searchParams.get("token");if(!o)throw new Me("No token returned by API");return{data:{signedUrl:i.toString(),path:e,token:o},error:null}}catch(s){if(this.shouldThrowOnError)throw s;if(P(s))return{data:null,error:s};throw s}})}update(e,t,s){return j(this,void 0,void 0,function*(){return this.uploadOrUpdate("PUT",e,t,s)})}move(e,t,s){return j(this,void 0,void 0,function*(){try{return{data:yield X(this.fetch,`${this.url}/object/move`,{bucketId:this.bucketId,sourceKey:e,destinationKey:t,destinationBucket:s==null?void 0:s.destinationBucket},{headers:this.headers}),error:null}}catch(a){if(this.shouldThrowOnError)throw a;if(P(a))return{data:null,error:a};throw a}})}copy(e,t,s){return j(this,void 0,void 0,function*(){try{return{data:{path:(yield X(this.fetch,`${this.url}/object/copy`,{bucketId:this.bucketId,sourceKey:e,destinationKey:t,destinationBucket:s==null?void 0:s.destinationBucket},{headers:this.headers})).Key},error:null}}catch(a){if(this.shouldThrowOnError)throw a;if(P(a))return{data:null,error:a};throw a}})}createSignedUrl(e,t,s){return j(this,void 0,void 0,function*(){try{let a=this._getFinalPath(e),n=yield X(this.fetch,`${this.url}/object/sign/${a}`,Object.assign({expiresIn:t},s!=null&&s.transform?{transform:s.transform}:{}),{headers:this.headers});const i=s!=null&&s.download?`&download=${s.download===!0?"":s.download}`:"";return n={signedUrl:encodeURI(`${this.url}${n.signedURL}${i}`)},{data:n,error:null}}catch(a){if(this.shouldThrowOnError)throw a;if(P(a))return{data:null,error:a};throw a}})}createSignedUrls(e,t,s){return j(this,void 0,void 0,function*(){try{const a=yield X(this.fetch,`${this.url}/object/sign/${this.bucketId}`,{expiresIn:t,paths:e},{headers:this.headers}),n=s!=null&&s.download?`&download=${s.download===!0?"":s.download}`:"";return{data:a.map(i=>Object.assign(Object.assign({},i),{signedUrl:i.signedURL?encodeURI(`${this.url}${i.signedURL}${n}`):null})),error:null}}catch(a){if(this.shouldThrowOnError)throw a;if(P(a))return{data:null,error:a};throw a}})}download(e,t){const a=typeof(t==null?void 0:t.transform)<"u"?"render/image/authenticated":"object",n=this.transformOptsToQueryString((t==null?void 0:t.transform)||{}),i=n?`?${n}`:"",o=this._getFinalPath(e),l=()=>ze(this.fetch,`${this.url}/${a}/${o}${i}`,{headers:this.headers,noResolveJson:!0});return new Ya(l,this.shouldThrowOnError)}info(e){return j(this,void 0,void 0,function*(){const t=this._getFinalPath(e);try{const s=yield ze(this.fetch,`${this.url}/object/info/${t}`,{headers:this.headers});return{data:Rt(s),error:null}}catch(s){if(this.shouldThrowOnError)throw s;if(P(s))return{data:null,error:s};throw s}})}exists(e){return j(this,void 0,void 0,function*(){const t=this._getFinalPath(e);try{return yield Wa(this.fetch,`${this.url}/object/${t}`,{headers:this.headers}),{data:!0,error:null}}catch(s){if(this.shouldThrowOnError)throw s;if(P(s)&&s instanceof st){const a=s.originalError;if([400,404].includes(a==null?void 0:a.status))return{data:!1,error:s}}throw s}})}getPublicUrl(e,t){const s=this._getFinalPath(e),a=[],n=t!=null&&t.download?`download=${t.download===!0?"":t.download}`:"";n!==""&&a.push(n);const o=typeof(t==null?void 0:t.transform)<"u"?"render/image":"object",l=this.transformOptsToQueryString((t==null?void 0:t.transform)||{});l!==""&&a.push(l);let c=a.join("&");return c!==""&&(c=`?${c}`),{data:{publicUrl:encodeURI(`${this.url}/${o}/public/${s}${c}`)}}}remove(e){return j(this,void 0,void 0,function*(){try{return{data:yield Vt(this.fetch,`${this.url}/object/${this.bucketId}`,{prefixes:e},{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(P(t))return{data:null,error:t};throw t}})}list(e,t,s){return j(this,void 0,void 0,function*(){try{const a=Object.assign(Object.assign(Object.assign({},Za),t),{prefix:e||""});return{data:yield X(this.fetch,`${this.url}/object/list/${this.bucketId}`,a,{headers:this.headers},s),error:null}}catch(a){if(this.shouldThrowOnError)throw a;if(P(a))return{data:null,error:a};throw a}})}listV2(e,t){return j(this,void 0,void 0,function*(){try{const s=Object.assign({},e);return{data:yield X(this.fetch,`${this.url}/object/list-v2/${this.bucketId}`,s,{headers:this.headers},t),error:null}}catch(s){if(this.shouldThrowOnError)throw s;if(P(s))return{data:null,error:s};throw s}})}encodeMetadata(e){return JSON.stringify(e)}toBase64(e){return typeof Buffer<"u"?Buffer.from(e).toString("base64"):btoa(e)}_getFinalPath(e){return`${this.bucketId}/${e.replace(/^\/+/,"")}`}_removeEmptyFolders(e){return e.replace(/^\/|\/$/g,"").replace(/\/+/g,"/")}transformOptsToQueryString(e){const t=[];return e.width&&t.push(`width=${e.width}`),e.height&&t.push(`height=${e.height}`),e.resize&&t.push(`resize=${e.resize}`),e.format&&t.push(`format=${e.format}`),e.quality&&t.push(`quality=${e.quality}`),t.join("&")}}const bs="2.86.2",ws={"X-Client-Info":`storage-js/${bs}`};class Xa{constructor(e,t={},s,a){this.shouldThrowOnError=!1;const n=new URL(e);a!=null&&a.useNewHostname&&/supabase\.(co|in|red)$/.test(n.hostname)&&!n.hostname.includes("storage.supabase.")&&(n.hostname=n.hostname.replace("supabase.","storage.supabase.")),this.url=n.href.replace(/\/$/,""),this.headers=Object.assign(Object.assign({},ws),t),this.fetch=Ft(s)}throwOnError(){return this.shouldThrowOnError=!0,this}listBuckets(e){return j(this,void 0,void 0,function*(){try{const t=this.listBucketOptionsToQueryString(e);return{data:yield ze(this.fetch,`${this.url}/bucket${t}`,{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(P(t))return{data:null,error:t};throw t}})}getBucket(e){return j(this,void 0,void 0,function*(){try{return{data:yield ze(this.fetch,`${this.url}/bucket/${e}`,{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(P(t))return{data:null,error:t};throw t}})}createBucket(e){return j(this,arguments,void 0,function*(t,s={public:!1}){try{return{data:yield X(this.fetch,`${this.url}/bucket`,{id:t,name:t,type:s.type,public:s.public,file_size_limit:s.fileSizeLimit,allowed_mime_types:s.allowedMimeTypes},{headers:this.headers}),error:null}}catch(a){if(this.shouldThrowOnError)throw a;if(P(a))return{data:null,error:a};throw a}})}updateBucket(e,t){return j(this,void 0,void 0,function*(){try{return{data:yield Pt(this.fetch,`${this.url}/bucket/${e}`,{id:e,name:e,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:this.headers}),error:null}}catch(s){if(this.shouldThrowOnError)throw s;if(P(s))return{data:null,error:s};throw s}})}emptyBucket(e){return j(this,void 0,void 0,function*(){try{return{data:yield X(this.fetch,`${this.url}/bucket/${e}/empty`,{},{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(P(t))return{data:null,error:t};throw t}})}deleteBucket(e){return j(this,void 0,void 0,function*(){try{return{data:yield Vt(this.fetch,`${this.url}/bucket/${e}`,{},{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(P(t))return{data:null,error:t};throw t}})}listBucketOptionsToQueryString(e){const t={};return e&&("limit"in e&&(t.limit=String(e.limit)),"offset"in e&&(t.offset=String(e.offset)),e.search&&(t.search=e.search),e.sortColumn&&(t.sortColumn=e.sortColumn),e.sortOrder&&(t.sortOrder=e.sortOrder)),Object.keys(t).length>0?"?"+new URLSearchParams(t).toString():""}}var Le=class extends Error{constructor(r,e){var t;super(r),this.name="IcebergError",this.status=e.status,this.icebergType=e.icebergType,this.icebergCode=e.icebergCode,this.details=e.details,this.isCommitStateUnknown=e.icebergType==="CommitStateUnknownException"||[500,502,504].includes(e.status)&&((t=e.icebergType)==null?void 0:t.includes("CommitState"))===!0}isNotFound(){return this.status===404}isConflict(){return this.status===409}isAuthenticationTimeout(){return this.status===419}};function en(r,e,t){const s=new URL(e,r);if(t)for(const[a,n]of Object.entries(t))n!==void 0&&s.searchParams.set(a,n);return s.toString()}async function tn(r){return!r||r.type==="none"?{}:r.type==="bearer"?{Authorization:`Bearer ${r.token}`}:r.type==="header"?{[r.name]:r.value}:r.type==="custom"?await r.getHeaders():{}}function rn(r){const e=r.fetchImpl??globalThis.fetch;return{async request({method:t,path:s,query:a,body:n,headers:i}){const o=en(r.baseUrl,s,a),l=await tn(r.auth),c=await e(o,{method:t,headers:{...n?{"Content-Type":"application/json"}:{},...l,...i},body:n?JSON.stringify(n):void 0}),d=await c.text(),u=(c.headers.get("content-type")||"").includes("application/json"),p=u&&d?JSON.parse(d):d;if(!c.ok){const h=u?p:void 0,f=h==null?void 0:h.error;throw new Le((f==null?void 0:f.message)??`Request failed with status ${c.status}`,{status:c.status,icebergType:f==null?void 0:f.type,icebergCode:f==null?void 0:f.code,details:h})}return{status:c.status,headers:c.headers,data:p}}}}function Ge(r){return r.join("")}var sn=class{constructor(r,e=""){this.client=r,this.prefix=e}async listNamespaces(r){const e=r?{parent:Ge(r.namespace)}:void 0;return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces`,query:e})).data.namespaces.map(s=>({namespace:s}))}async createNamespace(r,e){const t={namespace:r.namespace,properties:e==null?void 0:e.properties};return(await this.client.request({method:"POST",path:`${this.prefix}/namespaces`,body:t})).data}async dropNamespace(r){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${Ge(r.namespace)}`})}async loadNamespaceMetadata(r){return{properties:(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${Ge(r.namespace)}`})).data.properties}}async namespaceExists(r){try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${Ge(r.namespace)}`}),!0}catch(e){if(e instanceof Le&&e.status===404)return!1;throw e}}async createNamespaceIfNotExists(r,e){try{return await this.createNamespace(r,e)}catch(t){if(t instanceof Le&&t.status===409)return;throw t}}};function be(r){return r.join("")}var an=class{constructor(r,e="",t){this.client=r,this.prefix=e,this.accessDelegation=t}async listTables(r){return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${be(r.namespace)}/tables`})).data.identifiers}async createTable(r,e){const t={};return this.accessDelegation&&(t["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${be(r.namespace)}/tables`,body:e,headers:t})).data.metadata}async updateTable(r,e){const t=await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${be(r.namespace)}/tables/${r.name}`,body:e});return{"metadata-location":t.data["metadata-location"],metadata:t.data.metadata}}async dropTable(r,e){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${be(r.namespace)}/tables/${r.name}`,query:{purgeRequested:String((e==null?void 0:e.purge)??!1)}})}async loadTable(r){const e={};return this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${be(r.namespace)}/tables/${r.name}`,headers:e})).data.metadata}async tableExists(r){const e={};this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation);try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${be(r.namespace)}/tables/${r.name}`,headers:e}),!0}catch(t){if(t instanceof Le&&t.status===404)return!1;throw t}}async createTableIfNotExists(r,e){try{return await this.createTable(r,e)}catch(t){if(t instanceof Le&&t.status===409)return await this.loadTable({namespace:r.namespace,name:e.name});throw t}}},nn=class{constructor(r){var s;let e="v1";r.catalogName&&(e+=`/${r.catalogName}`);const t=r.baseUrl.endsWith("/")?r.baseUrl:`${r.baseUrl}/`;this.client=rn({baseUrl:t,auth:r.auth,fetchImpl:r.fetch}),this.accessDelegation=(s=r.accessDelegation)==null?void 0:s.join(","),this.namespaceOps=new sn(this.client,e),this.tableOps=new an(this.client,e,this.accessDelegation)}async listNamespaces(r){return this.namespaceOps.listNamespaces(r)}async createNamespace(r,e){return this.namespaceOps.createNamespace(r,e)}async dropNamespace(r){await this.namespaceOps.dropNamespace(r)}async loadNamespaceMetadata(r){return this.namespaceOps.loadNamespaceMetadata(r)}async listTables(r){return this.tableOps.listTables(r)}async createTable(r,e){return this.tableOps.createTable(r,e)}async updateTable(r,e){return this.tableOps.updateTable(r,e)}async dropTable(r,e){await this.tableOps.dropTable(r,e)}async loadTable(r){return this.tableOps.loadTable(r)}async namespaceExists(r){return this.namespaceOps.namespaceExists(r)}async tableExists(r){return this.tableOps.tableExists(r)}async createNamespaceIfNotExists(r,e){return this.namespaceOps.createNamespaceIfNotExists(r,e)}async createTableIfNotExists(r,e){return this.tableOps.createTableIfNotExists(r,e)}};class _s{constructor(e,t={},s){this.shouldThrowOnError=!1,this.url=e.replace(/\/$/,""),this.headers=Object.assign(Object.assign({},ws),t),this.fetch=Ft(s)}throwOnError(){return this.shouldThrowOnError=!0,this}createBucket(e){return j(this,void 0,void 0,function*(){try{return{data:yield X(this.fetch,`${this.url}/bucket`,{name:e},{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(P(t))return{data:null,error:t};throw t}})}listBuckets(e){return j(this,void 0,void 0,function*(){try{const t=new URLSearchParams;(e==null?void 0:e.limit)!==void 0&&t.set("limit",e.limit.toString()),(e==null?void 0:e.offset)!==void 0&&t.set("offset",e.offset.toString()),e!=null&&e.sortColumn&&t.set("sortColumn",e.sortColumn),e!=null&&e.sortOrder&&t.set("sortOrder",e.sortOrder),e!=null&&e.search&&t.set("search",e.search);const s=t.toString(),a=s?`${this.url}/bucket?${s}`:`${this.url}/bucket`;return{data:yield ze(this.fetch,a,{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(P(t))return{data:null,error:t};throw t}})}deleteBucket(e){return j(this,void 0,void 0,function*(){try{return{data:yield Vt(this.fetch,`${this.url}/bucket/${e}`,{},{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(P(t))return{data:null,error:t};throw t}})}from(e){if(!Va(e))throw new Me("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");return new nn({baseUrl:this.url,catalogName:e,auth:{type:"custom",getHeaders:()=>j(this,void 0,void 0,function*(){return this.headers})},fetch:this.fetch})}}const Kt={"X-Client-Info":`storage-js/${bs}`,"Content-Type":"application/json"};class Gt extends Error{constructor(e){super(e),this.__isStorageVectorsError=!0,this.name="StorageVectorsError"}}function W(r){return typeof r=="object"&&r!==null&&"__isStorageVectorsError"in r}class Ye extends Gt{constructor(e,t,s){super(e),this.name="StorageVectorsApiError",this.status=t,this.statusCode=s}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}}class ks extends Gt{constructor(e,t){super(e),this.name="StorageVectorsUnknownError",this.originalError=t}}var $t;(function(r){r.InternalError="InternalError",r.S3VectorConflictException="S3VectorConflictException",r.S3VectorNotFoundException="S3VectorNotFoundException",r.S3VectorBucketNotEmpty="S3VectorBucketNotEmpty",r.S3VectorMaxBucketsExceeded="S3VectorMaxBucketsExceeded",r.S3VectorMaxIndexesExceeded="S3VectorMaxIndexesExceeded"})($t||($t={}));const ht=r=>r?(...e)=>r(...e):(...e)=>fetch(...e),on=()=>Response,xs=r=>{if(typeof r!="object"||r===null)return!1;const e=Object.getPrototypeOf(r);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in r)&&!(Symbol.iterator in r)},ln=r=>Array.from(new Float32Array(r)),cn=(r,e)=>{if(e!==void 0&&r.float32.length!==e)throw new Error(`Vector dimension mismatch: expected ${e}, got ${r.float32.length}`)},lr=r=>r.msg||r.message||r.error_description||r.error||JSON.stringify(r),dn=(r,e,t)=>j(void 0,void 0,void 0,function*(){if(r&&typeof r=="object"&&"status"in r&&"ok"in r&&typeof r.status=="number"&&!(t!=null&&t.noResolveJson)){const a=r.status||500,n=r;if(typeof n.json=="function")n.json().then(i=>{const o=(i==null?void 0:i.statusCode)||(i==null?void 0:i.code)||a+"";e(new Ye(lr(i),a,o))}).catch(()=>{const i=a+"",o=n.statusText||`HTTP ${a} error`;e(new Ye(o,a,i))});else{const i=a+"",o=n.statusText||`HTTP ${a} error`;e(new Ye(o,a,i))}}else e(new ks(lr(r),r))}),un=(r,e,t,s)=>{const a={method:r,headers:(e==null?void 0:e.headers)||{}};return s?(xs(s)?(a.headers=Object.assign({"Content-Type":"application/json"},e==null?void 0:e.headers),a.body=JSON.stringify(s)):a.body=s,Object.assign(Object.assign({},a),t)):a};function hn(r,e,t,s,a,n){return j(this,void 0,void 0,function*(){return new Promise((i,o)=>{r(t,un(e,s,a,n)).then(l=>{if(!l.ok)throw l;if(s!=null&&s.noResolveJson)return l;const c=l.headers.get("content-type");return!c||!c.includes("application/json")?{}:l.json()}).then(l=>i(l)).catch(l=>dn(l,o,s))})})}function Y(r,e,t,s,a){return j(this,void 0,void 0,function*(){return hn(r,"POST",e,s,a,t)})}class js{constructor(e,t={},s){this.shouldThrowOnError=!1,this.url=e.replace(/\/$/,""),this.headers=Object.assign(Object.assign({},Kt),t),this.fetch=ht(s)}throwOnError(){return this.shouldThrowOnError=!0,this}createIndex(e){return j(this,void 0,void 0,function*(){try{return{data:(yield Y(this.fetch,`${this.url}/CreateIndex`,e,{headers:this.headers}))||{},error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(W(t))return{data:null,error:t};throw t}})}getIndex(e,t){return j(this,void 0,void 0,function*(){try{return{data:yield Y(this.fetch,`${this.url}/GetIndex`,{vectorBucketName:e,indexName:t},{headers:this.headers}),error:null}}catch(s){if(this.shouldThrowOnError)throw s;if(W(s))return{data:null,error:s};throw s}})}listIndexes(e){return j(this,void 0,void 0,function*(){try{return{data:yield Y(this.fetch,`${this.url}/ListIndexes`,e,{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(W(t))return{data:null,error:t};throw t}})}deleteIndex(e,t){return j(this,void 0,void 0,function*(){try{return{data:(yield Y(this.fetch,`${this.url}/DeleteIndex`,{vectorBucketName:e,indexName:t},{headers:this.headers}))||{},error:null}}catch(s){if(this.shouldThrowOnError)throw s;if(W(s))return{data:null,error:s};throw s}})}}class Es{constructor(e,t={},s){this.shouldThrowOnError=!1,this.url=e.replace(/\/$/,""),this.headers=Object.assign(Object.assign({},Kt),t),this.fetch=ht(s)}throwOnError(){return this.shouldThrowOnError=!0,this}putVectors(e){return j(this,void 0,void 0,function*(){try{if(e.vectors.length<1||e.vectors.length>500)throw new Error("Vector batch size must be between 1 and 500 items");return{data:(yield Y(this.fetch,`${this.url}/PutVectors`,e,{headers:this.headers}))||{},error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(W(t))return{data:null,error:t};throw t}})}getVectors(e){return j(this,void 0,void 0,function*(){try{return{data:yield Y(this.fetch,`${this.url}/GetVectors`,e,{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(W(t))return{data:null,error:t};throw t}})}listVectors(e){return j(this,void 0,void 0,function*(){try{if(e.segmentCount!==void 0){if(e.segmentCount<1||e.segmentCount>16)throw new Error("segmentCount must be between 1 and 16");if(e.segmentIndex!==void 0&&(e.segmentIndex<0||e.segmentIndex>=e.segmentCount))throw new Error(`segmentIndex must be between 0 and ${e.segmentCount-1}`)}return{data:yield Y(this.fetch,`${this.url}/ListVectors`,e,{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(W(t))return{data:null,error:t};throw t}})}queryVectors(e){return j(this,void 0,void 0,function*(){try{return{data:yield Y(this.fetch,`${this.url}/QueryVectors`,e,{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(W(t))return{data:null,error:t};throw t}})}deleteVectors(e){return j(this,void 0,void 0,function*(){try{if(e.keys.length<1||e.keys.length>500)throw new Error("Keys batch size must be between 1 and 500 items");return{data:(yield Y(this.fetch,`${this.url}/DeleteVectors`,e,{headers:this.headers}))||{},error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(W(t))return{data:null,error:t};throw t}})}}class Ss{constructor(e,t={},s){this.shouldThrowOnError=!1,this.url=e.replace(/\/$/,""),this.headers=Object.assign(Object.assign({},Kt),t),this.fetch=ht(s)}throwOnError(){return this.shouldThrowOnError=!0,this}createBucket(e){return j(this,void 0,void 0,function*(){try{return{data:(yield Y(this.fetch,`${this.url}/CreateVectorBucket`,{vectorBucketName:e},{headers:this.headers}))||{},error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(W(t))return{data:null,error:t};throw t}})}getBucket(e){return j(this,void 0,void 0,function*(){try{return{data:yield Y(this.fetch,`${this.url}/GetVectorBucket`,{vectorBucketName:e},{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(W(t))return{data:null,error:t};throw t}})}listBuckets(){return j(this,arguments,void 0,function*(e={}){try{return{data:yield Y(this.fetch,`${this.url}/ListVectorBuckets`,e,{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(W(t))return{data:null,error:t};throw t}})}deleteBucket(e){return j(this,void 0,void 0,function*(){try{return{data:(yield Y(this.fetch,`${this.url}/DeleteVectorBucket`,{vectorBucketName:e},{headers:this.headers}))||{},error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(W(t))return{data:null,error:t};throw t}})}}class Ts extends Ss{constructor(e,t={}){super(e,t.headers||{},t.fetch)}from(e){return new Os(this.url,this.headers,e,this.fetch)}createBucket(e){const t=Object.create(null,{createBucket:{get:()=>super.createBucket}});return j(this,void 0,void 0,function*(){return t.createBucket.call(this,e)})}getBucket(e){const t=Object.create(null,{getBucket:{get:()=>super.getBucket}});return j(this,void 0,void 0,function*(){return t.getBucket.call(this,e)})}listBuckets(){const e=Object.create(null,{listBuckets:{get:()=>super.listBuckets}});return j(this,arguments,void 0,function*(t={}){return e.listBuckets.call(this,t)})}deleteBucket(e){const t=Object.create(null,{deleteBucket:{get:()=>super.deleteBucket}});return j(this,void 0,void 0,function*(){return t.deleteBucket.call(this,e)})}}class Os extends js{constructor(e,t,s,a){super(e,t,a),this.vectorBucketName=s}createIndex(e){const t=Object.create(null,{createIndex:{get:()=>super.createIndex}});return j(this,void 0,void 0,function*(){return t.createIndex.call(this,Object.assign(Object.assign({},e),{vectorBucketName:this.vectorBucketName}))})}listIndexes(){const e=Object.create(null,{listIndexes:{get:()=>super.listIndexes}});return j(this,arguments,void 0,function*(t={}){return e.listIndexes.call(this,Object.assign(Object.assign({},t),{vectorBucketName:this.vectorBucketName}))})}getIndex(e){const t=Object.create(null,{getIndex:{get:()=>super.getIndex}});return j(this,void 0,void 0,function*(){return t.getIndex.call(this,this.vectorBucketName,e)})}deleteIndex(e){const t=Object.create(null,{deleteIndex:{get:()=>super.deleteIndex}});return j(this,void 0,void 0,function*(){return t.deleteIndex.call(this,this.vectorBucketName,e)})}index(e){return new As(this.url,this.headers,this.vectorBucketName,e,this.fetch)}}class As extends Es{constructor(e,t,s,a,n){super(e,t,n),this.vectorBucketName=s,this.indexName=a}putVectors(e){const t=Object.create(null,{putVectors:{get:()=>super.putVectors}});return j(this,void 0,void 0,function*(){return t.putVectors.call(this,Object.assign(Object.assign({},e),{vectorBucketName:this.vectorBucketName,indexName:this.indexName}))})}getVectors(e){const t=Object.create(null,{getVectors:{get:()=>super.getVectors}});return j(this,void 0,void 0,function*(){return t.getVectors.call(this,Object.assign(Object.assign({},e),{vectorBucketName:this.vectorBucketName,indexName:this.indexName}))})}listVectors(){const e=Object.create(null,{listVectors:{get:()=>super.listVectors}});return j(this,arguments,void 0,function*(t={}){return e.listVectors.call(this,Object.assign(Object.assign({},t),{vectorBucketName:this.vectorBucketName,indexName:this.indexName}))})}queryVectors(e){const t=Object.create(null,{queryVectors:{get:()=>super.queryVectors}});return j(this,void 0,void 0,function*(){return t.queryVectors.call(this,Object.assign(Object.assign({},e),{vectorBucketName:this.vectorBucketName,indexName:this.indexName}))})}deleteVectors(e){const t=Object.create(null,{deleteVectors:{get:()=>super.deleteVectors}});return j(this,void 0,void 0,function*(){return t.deleteVectors.call(this,Object.assign(Object.assign({},e),{vectorBucketName:this.vectorBucketName,indexName:this.indexName}))})}}class pn extends Xa{constructor(e,t={},s,a){super(e,t,s,a)}from(e){return new Qa(this.url,this.headers,e,this.fetch)}get vectors(){return new Ts(this.url+"/vector",{headers:this.headers,fetch:this.fetch})}get analytics(){return new _s(this.url+"/iceberg",this.headers,this.fetch)}}const fn=Object.freeze(Object.defineProperty({__proto__:null,StorageAnalyticsClient:_s,StorageApiError:ms,StorageClient:pn,StorageError:Me,StorageUnknownError:st,StorageVectorsApiError:Ye,StorageVectorsClient:Ts,StorageVectorsError:Gt,get StorageVectorsErrorCode(){return $t},StorageVectorsUnknownError:ks,VectorBucketApi:Ss,VectorBucketScope:Os,VectorDataApi:Es,VectorIndexApi:js,VectorIndexScope:As,isPlainObject:xs,isStorageError:P,isStorageVectorsError:W,normalizeToFloat32:ln,resolveFetch:ht,resolveResponse:on,validateVectorDimension:cn},Symbol.toStringTag,{value:"Module"})),gn=Ne(fn);var Cs={},pt={};Object.defineProperty(pt,"__esModule",{value:!0});pt.version=void 0;pt.version="2.86.2";(function(r){Object.defineProperty(r,"__esModule",{value:!0}),r.DEFAULT_REALTIME_OPTIONS=r.DEFAULT_AUTH_OPTIONS=r.DEFAULT_DB_OPTIONS=r.DEFAULT_GLOBAL_OPTIONS=r.DEFAULT_HEADERS=void 0;const e=pt;let t="";typeof Deno<"u"?t="deno":typeof document<"u"?t="web":typeof navigator<"u"&&navigator.product==="ReactNative"?t="react-native":t="node",r.DEFAULT_HEADERS={"X-Client-Info":`supabase-js-${t}/${e.version}`},r.DEFAULT_GLOBAL_OPTIONS={headers:r.DEFAULT_HEADERS},r.DEFAULT_DB_OPTIONS={schema:"public"},r.DEFAULT_AUTH_OPTIONS={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"implicit"},r.DEFAULT_REALTIME_OPTIONS={}})(Cs);var Rs={};(function(r){Object.defineProperty(r,"__esModule",{value:!0}),r.fetchWithAuth=r.resolveHeadersConstructor=r.resolveFetch=void 0;const e=a=>a?(...n)=>a(...n):(...n)=>fetch(...n);r.resolveFetch=e;const t=()=>Headers;r.resolveHeadersConstructor=t;const s=(a,n,i)=>{const o=(0,r.resolveFetch)(i),l=(0,r.resolveHeadersConstructor)();return async(c,d)=>{var u;const p=(u=await n())!==null&&u!==void 0?u:a;let h=new l(d==null?void 0:d.headers);return h.has("apikey")||h.set("apikey",a),h.has("Authorization")||h.set("Authorization",`Bearer ${p}`),o(c,Object.assign(Object.assign({},d),{headers:h}))}};r.fetchWithAuth=s})(Rs);var le={};Object.defineProperty(le,"__esModule",{value:!0});le.isBrowser=void 0;le.uuid=vn;le.ensureTrailingSlash=Ps;le.applySettingDefaults=yn;le.validateSupabaseUrl=bn;function vn(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(r){var e=Math.random()*16|0,t=r=="x"?e:e&3|8;return t.toString(16)})}function Ps(r){return r.endsWith("/")?r:r+"/"}const mn=()=>typeof window<"u";le.isBrowser=mn;function yn(r,e){var t,s;const{db:a,auth:n,realtime:i,global:o}=r,{db:l,auth:c,realtime:d,global:u}=e,p={db:Object.assign(Object.assign({},l),a),auth:Object.assign(Object.assign({},c),n),realtime:Object.assign(Object.assign({},d),i),storage:{},global:Object.assign(Object.assign(Object.assign({},u),o),{headers:Object.assign(Object.assign({},(t=u==null?void 0:u.headers)!==null&&t!==void 0?t:{}),(s=o==null?void 0:o.headers)!==null&&s!==void 0?s:{})}),accessToken:async()=>""};return r.accessToken?p.accessToken=r.accessToken:delete p.accessToken,p}function bn(r){const e=r==null?void 0:r.trim();if(!e)throw new Error("supabaseUrl is required.");if(!e.match(/^https?:\/\//i))throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");try{return new URL(Ps(e))}catch{throw Error("Invalid supabaseUrl: Provided URL is malformed.")}}var ft={};const $s="2.86.2",xe=30*1e3,It=3,bt=It*xe,wn="http://localhost:9999",_n="supabase.auth.token",kn={"X-Client-Info":`gotrue-js/${$s}`},zt="X-Supabase-Api-Version",Is={"2024-01-01":{timestamp:Date.parse("2024-01-01T00:00:00.0Z"),name:"2024-01-01"}},xn=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,jn=10*60*1e3;let Ae=class extends Error{constructor(e,t,s){super(e),this.__isAuthError=!0,this.name="AuthError",this.status=t,this.code=s}};function E(r){return typeof r=="object"&&r!==null&&"__isAuthError"in r}let zs=class extends Ae{constructor(e,t,s){super(e,t,s),this.name="AuthApiError",this.status=t,this.code=s}};function Ls(r){return E(r)&&r.name==="AuthApiError"}let ie=class extends Ae{constructor(e,t){super(e),this.name="AuthUnknownError",this.originalError=t}},ae=class extends Ae{constructor(e,t,s,a){super(e,s,a),this.name=t,this.status=s}},G=class extends ae{constructor(){super("Auth session missing!","AuthSessionMissingError",400,void 0)}};function Ns(r){return E(r)&&r.name==="AuthSessionMissingError"}let ue=class extends ae{constructor(){super("Auth session or user missing","AuthInvalidTokenResponseError",500,void 0)}},$e=class extends ae{constructor(e){super(e,"AuthInvalidCredentialsError",400,void 0)}},Ie=class extends ae{constructor(e,t=null){super(e,"AuthImplicitGrantRedirectError",500,void 0),this.details=null,this.details=t}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}};function Ms(r){return E(r)&&r.name==="AuthImplicitGrantRedirectError"}let Lt=class extends ae{constructor(e,t=null){super(e,"AuthPKCEGrantCodeExchangeError",500,void 0),this.details=null,this.details=t}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}},at=class extends ae{constructor(e,t){super(e,"AuthRetryableFetchError",t,void 0)}};function Ze(r){return E(r)&&r.name==="AuthRetryableFetchError"}let Nt=class extends ae{constructor(e,t,s){super(e,"AuthWeakPasswordError",t,"weak_password"),this.reasons=s}};function En(r){return E(r)&&r.name==="AuthWeakPasswordError"}let nt=class extends ae{constructor(e){super(e,"AuthInvalidJwtError",400,"invalid_jwt")}};const it="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),cr=` 	
\r=`.split(""),Sn=(()=>{const r=new Array(128);for(let e=0;e<r.length;e+=1)r[e]=-1;for(let e=0;e<cr.length;e+=1)r[cr[e].charCodeAt(0)]=-2;for(let e=0;e<it.length;e+=1)r[it[e].charCodeAt(0)]=e;return r})();function dr(r,e,t){if(r!==null)for(e.queue=e.queue<<8|r,e.queuedBits+=8;e.queuedBits>=6;){const s=e.queue>>e.queuedBits-6&63;t(it[s]),e.queuedBits-=6}else if(e.queuedBits>0)for(e.queue=e.queue<<6-e.queuedBits,e.queuedBits=6;e.queuedBits>=6;){const s=e.queue>>e.queuedBits-6&63;t(it[s]),e.queuedBits-=6}}function Us(r,e,t){const s=Sn[r];if(s>-1)for(e.queue=e.queue<<6|s,e.queuedBits+=6;e.queuedBits>=8;)t(e.queue>>e.queuedBits-8&255),e.queuedBits-=8;else{if(s===-2)return;throw new Error(`Invalid Base64-URL character "${String.fromCharCode(r)}"`)}}function ur(r){const e=[],t=i=>{e.push(String.fromCodePoint(i))},s={utf8seq:0,codepoint:0},a={queue:0,queuedBits:0},n=i=>{An(i,s,t)};for(let i=0;i<r.length;i+=1)Us(r.charCodeAt(i),a,n);return e.join("")}function Tn(r,e){if(r<=127){e(r);return}else if(r<=2047){e(192|r>>6),e(128|r&63);return}else if(r<=65535){e(224|r>>12),e(128|r>>6&63),e(128|r&63);return}else if(r<=1114111){e(240|r>>18),e(128|r>>12&63),e(128|r>>6&63),e(128|r&63);return}throw new Error(`Unrecognized Unicode codepoint: ${r.toString(16)}`)}function On(r,e){for(let t=0;t<r.length;t+=1){let s=r.charCodeAt(t);if(s>55295&&s<=56319){const a=(s-55296)*1024&65535;s=(r.charCodeAt(t+1)-56320&65535|a)+65536,t+=1}Tn(s,e)}}function An(r,e,t){if(e.utf8seq===0){if(r<=127){t(r);return}for(let s=1;s<6;s+=1)if(!(r>>7-s&1)){e.utf8seq=s;break}if(e.utf8seq===2)e.codepoint=r&31;else if(e.utf8seq===3)e.codepoint=r&15;else if(e.utf8seq===4)e.codepoint=r&7;else throw new Error("Invalid UTF-8 sequence");e.utf8seq-=1}else if(e.utf8seq>0){if(r<=127)throw new Error("Invalid UTF-8 sequence");e.codepoint=e.codepoint<<6|r&63,e.utf8seq-=1,e.utf8seq===0&&t(e.codepoint)}}function Se(r){const e=[],t={queue:0,queuedBits:0},s=a=>{e.push(a)};for(let a=0;a<r.length;a+=1)Us(r.charCodeAt(a),t,s);return new Uint8Array(e)}function Cn(r){const e=[];return On(r,t=>e.push(t)),new Uint8Array(e)}function ve(r){const e=[],t={queue:0,queuedBits:0},s=a=>{e.push(a)};return r.forEach(a=>dr(a,t,s)),dr(null,t,s),e.join("")}function Rn(r){return Math.round(Date.now()/1e3)+r}function Pn(){return Symbol("auth-callback")}const F=()=>typeof window<"u"&&typeof document<"u",ce={tested:!1,writable:!1},qs=()=>{if(!F())return!1;try{if(typeof globalThis.localStorage!="object")return!1}catch{return!1}if(ce.tested)return ce.writable;const r=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(r,r),globalThis.localStorage.removeItem(r),ce.tested=!0,ce.writable=!0}catch{ce.tested=!0,ce.writable=!1}return ce.writable};function $n(r){const e={},t=new URL(r);if(t.hash&&t.hash[0]==="#")try{new URLSearchParams(t.hash.substring(1)).forEach((a,n)=>{e[n]=a})}catch{}return t.searchParams.forEach((s,a)=>{e[a]=s}),e}const Bs=r=>r?(...e)=>r(...e):(...e)=>fetch(...e),In=r=>typeof r=="object"&&r!==null&&"status"in r&&"ok"in r&&"json"in r&&typeof r.json=="function",je=async(r,e,t)=>{await r.setItem(e,JSON.stringify(t))},de=async(r,e)=>{const t=await r.getItem(e);if(!t)return null;try{return JSON.parse(t)}catch{return t}},H=async(r,e)=>{await r.removeItem(e)};class gt{constructor(){this.promise=new gt.promiseConstructor((e,t)=>{this.resolve=e,this.reject=t})}}gt.promiseConstructor=Promise;function wt(r){const e=r.split(".");if(e.length!==3)throw new nt("Invalid JWT structure");for(let s=0;s<e.length;s++)if(!xn.test(e[s]))throw new nt("JWT not in base64url format");return{header:JSON.parse(ur(e[0])),payload:JSON.parse(ur(e[1])),signature:Se(e[2]),raw:{header:e[0],payload:e[1]}}}async function zn(r){return await new Promise(e=>{setTimeout(()=>e(null),r)})}function Ln(r,e){return new Promise((s,a)=>{(async()=>{for(let n=0;n<1/0;n++)try{const i=await r(n);if(!e(n,null,i)){s(i);return}}catch(i){if(!e(n,i)){a(i);return}}})()})}function Nn(r){return("0"+r.toString(16)).substr(-2)}function Mn(){const e=new Uint32Array(56);if(typeof crypto>"u"){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",s=t.length;let a="";for(let n=0;n<56;n++)a+=t.charAt(Math.floor(Math.random()*s));return a}return crypto.getRandomValues(e),Array.from(e,Nn).join("")}async function Un(r){const t=new TextEncoder().encode(r),s=await crypto.subtle.digest("SHA-256",t),a=new Uint8Array(s);return Array.from(a).map(n=>String.fromCharCode(n)).join("")}async function qn(r){if(!(typeof crypto<"u"&&typeof crypto.subtle<"u"&&typeof TextEncoder<"u"))return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."),r;const t=await Un(r);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}async function we(r,e,t=!1){const s=Mn();let a=s;t&&(a+="/PASSWORD_RECOVERY"),await je(r,`${e}-code-verifier`,a);const n=await qn(s);return[n,s===n?"plain":"s256"]}const Bn=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function Dn(r){const e=r.headers.get(zt);if(!e||!e.match(Bn))return null;try{return new Date(`${e}T00:00:00.0Z`)}catch{return null}}function Hn(r){if(!r)throw new Error("Missing exp claim");const e=Math.floor(Date.now()/1e3);if(r<=e)throw new Error("JWT has expired")}function Fn(r){switch(r){case"RS256":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}};case"ES256":return{name:"ECDSA",namedCurve:"P-256",hash:{name:"SHA-256"}};default:throw new Error("Invalid alg claim")}}const Vn=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;function _e(r){if(!Vn.test(r))throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not")}function _t(){const r={};return new Proxy(r,{get:(e,t)=>{if(t==="__isUserNotAvailableProxy")return!0;if(typeof t=="symbol"){const s=t.toString();if(s==="Symbol(Symbol.toPrimitive)"||s==="Symbol(Symbol.toStringTag)"||s==="Symbol(util.inspect.custom)")return}throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${t}" property of the session object is not supported. Please use getUser() instead.`)},set:(e,t)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)},deleteProperty:(e,t)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)}})}function Kn(r,e){return new Proxy(r,{get:(t,s,a)=>{if(s==="__isInsecureUserWarningProxy")return!0;if(typeof s=="symbol"){const n=s.toString();if(n==="Symbol(Symbol.toPrimitive)"||n==="Symbol(Symbol.toStringTag)"||n==="Symbol(util.inspect.custom)"||n==="Symbol(nodejs.util.inspect.custom)")return Reflect.get(t,s,a)}return!e.value&&typeof s=="string"&&(console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."),e.value=!0),Reflect.get(t,s,a)}})}function hr(r){return JSON.parse(JSON.stringify(r))}const he=r=>r.msg||r.message||r.error_description||r.error||JSON.stringify(r),Gn=[502,503,504];async function pr(r){var e;if(!In(r))throw new at(he(r),0);if(Gn.includes(r.status))throw new at(he(r),r.status);let t;try{t=await r.json()}catch(n){throw new ie(he(n),n)}let s;const a=Dn(r);if(a&&a.getTime()>=Is["2024-01-01"].timestamp&&typeof t=="object"&&t&&typeof t.code=="string"?s=t.code:typeof t=="object"&&t&&typeof t.error_code=="string"&&(s=t.error_code),s){if(s==="weak_password")throw new Nt(he(t),r.status,((e=t.weak_password)===null||e===void 0?void 0:e.reasons)||[]);if(s==="session_not_found")throw new G}else if(typeof t=="object"&&t&&typeof t.weak_password=="object"&&t.weak_password&&Array.isArray(t.weak_password.reasons)&&t.weak_password.reasons.length&&t.weak_password.reasons.reduce((n,i)=>n&&typeof i=="string",!0))throw new Nt(he(t),r.status,t.weak_password.reasons);throw new zs(he(t),r.status||500,s)}const Wn=(r,e,t,s)=>{const a={method:r,headers:(e==null?void 0:e.headers)||{}};return r==="GET"?a:(a.headers=Object.assign({"Content-Type":"application/json;charset=UTF-8"},e==null?void 0:e.headers),a.body=JSON.stringify(s),Object.assign(Object.assign({},a),t))};async function S(r,e,t,s){var a;const n=Object.assign({},s==null?void 0:s.headers);n[zt]||(n[zt]=Is["2024-01-01"].name),s!=null&&s.jwt&&(n.Authorization=`Bearer ${s.jwt}`);const i=(a=s==null?void 0:s.query)!==null&&a!==void 0?a:{};s!=null&&s.redirectTo&&(i.redirect_to=s.redirectTo);const o=Object.keys(i).length?"?"+new URLSearchParams(i).toString():"",l=await Jn(r,e,t+o,{headers:n,noResolveJson:s==null?void 0:s.noResolveJson},{},s==null?void 0:s.body);return s!=null&&s.xform?s==null?void 0:s.xform(l):{data:Object.assign({},l),error:null}}async function Jn(r,e,t,s,a,n){const i=Wn(e,s,a,n);let o;try{o=await r(t,Object.assign({},i))}catch(l){throw console.error(l),new at(he(l),0)}if(o.ok||await pr(o),s!=null&&s.noResolveJson)return o;try{return await o.json()}catch(l){await pr(l)}}function Z(r){var e;let t=null;Qn(r)&&(t=Object.assign({},r),r.expires_at||(t.expires_at=Rn(r.expires_in)));const s=(e=r.user)!==null&&e!==void 0?e:r;return{data:{session:t,user:s},error:null}}function fr(r){const e=Z(r);return!e.error&&r.weak_password&&typeof r.weak_password=="object"&&Array.isArray(r.weak_password.reasons)&&r.weak_password.reasons.length&&r.weak_password.message&&typeof r.weak_password.message=="string"&&r.weak_password.reasons.reduce((t,s)=>t&&typeof s=="string",!0)&&(e.data.weak_password=r.weak_password),e}function oe(r){var e;return{data:{user:(e=r.user)!==null&&e!==void 0?e:r},error:null}}function Yn(r){return{data:r,error:null}}function Zn(r){const{action_link:e,email_otp:t,hashed_token:s,redirect_to:a,verification_type:n}=r,i=Ce(r,["action_link","email_otp","hashed_token","redirect_to","verification_type"]),o={action_link:e,email_otp:t,hashed_token:s,redirect_to:a,verification_type:n},l=Object.assign({},i);return{data:{properties:o,user:l},error:null}}function gr(r){return r}function Qn(r){return r.access_token&&r.refresh_token&&r.expires_in}const Qe=["global","local","others"];let Wt=class{constructor({url:e="",headers:t={},fetch:s}){this.url=e,this.headers=t,this.fetch=Bs(s),this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)},this.oauth={listClients:this._listOAuthClients.bind(this),createClient:this._createOAuthClient.bind(this),getClient:this._getOAuthClient.bind(this),updateClient:this._updateOAuthClient.bind(this),deleteClient:this._deleteOAuthClient.bind(this),regenerateClientSecret:this._regenerateOAuthClientSecret.bind(this)}}async signOut(e,t=Qe[0]){if(Qe.indexOf(t)<0)throw new Error(`@supabase/auth-js: Parameter scope must be one of ${Qe.join(", ")}`);try{return await S(this.fetch,"POST",`${this.url}/logout?scope=${t}`,{headers:this.headers,jwt:e,noResolveJson:!0}),{data:null,error:null}}catch(s){if(E(s))return{data:null,error:s};throw s}}async inviteUserByEmail(e,t={}){try{return await S(this.fetch,"POST",`${this.url}/invite`,{body:{email:e,data:t.data},headers:this.headers,redirectTo:t.redirectTo,xform:oe})}catch(s){if(E(s))return{data:{user:null},error:s};throw s}}async generateLink(e){try{const{options:t}=e,s=Ce(e,["options"]),a=Object.assign(Object.assign({},s),t);return"newEmail"in s&&(a.new_email=s==null?void 0:s.newEmail,delete a.newEmail),await S(this.fetch,"POST",`${this.url}/admin/generate_link`,{body:a,headers:this.headers,xform:Zn,redirectTo:t==null?void 0:t.redirectTo})}catch(t){if(E(t))return{data:{properties:null,user:null},error:t};throw t}}async createUser(e){try{return await S(this.fetch,"POST",`${this.url}/admin/users`,{body:e,headers:this.headers,xform:oe})}catch(t){if(E(t))return{data:{user:null},error:t};throw t}}async listUsers(e){var t,s,a,n,i,o,l;try{const c={nextPage:null,lastPage:0,total:0},d=await S(this.fetch,"GET",`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(s=(t=e==null?void 0:e.page)===null||t===void 0?void 0:t.toString())!==null&&s!==void 0?s:"",per_page:(n=(a=e==null?void 0:e.perPage)===null||a===void 0?void 0:a.toString())!==null&&n!==void 0?n:""},xform:gr});if(d.error)throw d.error;const u=await d.json(),p=(i=d.headers.get("x-total-count"))!==null&&i!==void 0?i:0,h=(l=(o=d.headers.get("link"))===null||o===void 0?void 0:o.split(","))!==null&&l!==void 0?l:[];return h.length>0&&(h.forEach(f=>{const g=parseInt(f.split(";")[0].split("=")[1].substring(0,1)),v=JSON.parse(f.split(";")[1].split("=")[1]);c[`${v}Page`]=g}),c.total=parseInt(p)),{data:Object.assign(Object.assign({},u),c),error:null}}catch(c){if(E(c))return{data:{users:[]},error:c};throw c}}async getUserById(e){_e(e);try{return await S(this.fetch,"GET",`${this.url}/admin/users/${e}`,{headers:this.headers,xform:oe})}catch(t){if(E(t))return{data:{user:null},error:t};throw t}}async updateUserById(e,t){_e(e);try{return await S(this.fetch,"PUT",`${this.url}/admin/users/${e}`,{body:t,headers:this.headers,xform:oe})}catch(s){if(E(s))return{data:{user:null},error:s};throw s}}async deleteUser(e,t=!1){_e(e);try{return await S(this.fetch,"DELETE",`${this.url}/admin/users/${e}`,{headers:this.headers,body:{should_soft_delete:t},xform:oe})}catch(s){if(E(s))return{data:{user:null},error:s};throw s}}async _listFactors(e){_e(e.userId);try{const{data:t,error:s}=await S(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/factors`,{headers:this.headers,xform:a=>({data:{factors:a},error:null})});return{data:t,error:s}}catch(t){if(E(t))return{data:null,error:t};throw t}}async _deleteFactor(e){_e(e.userId),_e(e.id);try{return{data:await S(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/factors/${e.id}`,{headers:this.headers}),error:null}}catch(t){if(E(t))return{data:null,error:t};throw t}}async _listOAuthClients(e){var t,s,a,n,i,o,l;try{const c={nextPage:null,lastPage:0,total:0},d=await S(this.fetch,"GET",`${this.url}/admin/oauth/clients`,{headers:this.headers,noResolveJson:!0,query:{page:(s=(t=e==null?void 0:e.page)===null||t===void 0?void 0:t.toString())!==null&&s!==void 0?s:"",per_page:(n=(a=e==null?void 0:e.perPage)===null||a===void 0?void 0:a.toString())!==null&&n!==void 0?n:""},xform:gr});if(d.error)throw d.error;const u=await d.json(),p=(i=d.headers.get("x-total-count"))!==null&&i!==void 0?i:0,h=(l=(o=d.headers.get("link"))===null||o===void 0?void 0:o.split(","))!==null&&l!==void 0?l:[];return h.length>0&&(h.forEach(f=>{const g=parseInt(f.split(";")[0].split("=")[1].substring(0,1)),v=JSON.parse(f.split(";")[1].split("=")[1]);c[`${v}Page`]=g}),c.total=parseInt(p)),{data:Object.assign(Object.assign({},u),c),error:null}}catch(c){if(E(c))return{data:{clients:[]},error:c};throw c}}async _createOAuthClient(e){try{return await S(this.fetch,"POST",`${this.url}/admin/oauth/clients`,{body:e,headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if(E(t))return{data:null,error:t};throw t}}async _getOAuthClient(e){try{return await S(this.fetch,"GET",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if(E(t))return{data:null,error:t};throw t}}async _updateOAuthClient(e,t){try{return await S(this.fetch,"PUT",`${this.url}/admin/oauth/clients/${e}`,{body:t,headers:this.headers,xform:s=>({data:s,error:null})})}catch(s){if(E(s))return{data:null,error:s};throw s}}async _deleteOAuthClient(e){try{return await S(this.fetch,"DELETE",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(t){if(E(t))return{data:null,error:t};throw t}}async _regenerateOAuthClientSecret(e){try{return await S(this.fetch,"POST",`${this.url}/admin/oauth/clients/${e}/regenerate_secret`,{headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if(E(t))return{data:null,error:t};throw t}}};function vr(r={}){return{getItem:e=>r[e]||null,setItem:(e,t)=>{r[e]=t},removeItem:e=>{delete r[e]}}}const pe={debug:!!(globalThis&&qs()&&globalThis.localStorage&&globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug")==="true")};class Jt extends Error{constructor(e){super(e),this.isAcquireTimeout=!0}}let Ds=class extends Jt{};class Xn extends Jt{}async function Hs(r,e,t){pe.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquire lock",r,e);const s=new globalThis.AbortController;return e>0&&setTimeout(()=>{s.abort(),pe.debug&&console.log("@supabase/gotrue-js: navigatorLock acquire timed out",r)},e),await Promise.resolve().then(()=>globalThis.navigator.locks.request(r,e===0?{mode:"exclusive",ifAvailable:!0}:{mode:"exclusive",signal:s.signal},async a=>{if(a){pe.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquired",r,a.name);try{return await t()}finally{pe.debug&&console.log("@supabase/gotrue-js: navigatorLock: released",r,a.name)}}else{if(e===0)throw pe.debug&&console.log("@supabase/gotrue-js: navigatorLock: not immediately available",r),new Ds(`Acquiring an exclusive Navigator LockManager lock "${r}" immediately failed`);if(pe.debug)try{const n=await globalThis.navigator.locks.query();console.log("@supabase/gotrue-js: Navigator LockManager state",JSON.stringify(n,null,"  "))}catch(n){console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state",n)}return console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"),await t()}}))}const mr={};async function ei(r,e,t){var s;const a=(s=mr[r])!==null&&s!==void 0?s:Promise.resolve(),n=Promise.race([a.catch(()=>null),e>=0?new Promise((i,o)=>{setTimeout(()=>{o(new Xn(`Acquring process lock with name "${r}" timed out`))},e)}):null].filter(i=>i)).catch(i=>{if(i&&i.isAcquireTimeout)throw i;return null}).then(async()=>await t());return mr[r]=n.catch(async i=>{if(i&&i.isAcquireTimeout)return await a,null;throw i}),await n}function ti(){if(typeof globalThis!="object")try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<"u"&&(self.globalThis=self)}}function Fs(r){if(!/^0x[a-fA-F0-9]{40}$/.test(r))throw new Error(`@supabase/auth-js: Address "${r}" is invalid.`);return r.toLowerCase()}function ri(r){return parseInt(r,16)}function si(r){const e=new TextEncoder().encode(r);return"0x"+Array.from(e,s=>s.toString(16).padStart(2,"0")).join("")}function ai(r){var e;const{chainId:t,domain:s,expirationTime:a,issuedAt:n=new Date,nonce:i,notBefore:o,requestId:l,resources:c,scheme:d,uri:u,version:p}=r;{if(!Number.isInteger(t))throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${t}`);if(!s)throw new Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');if(i&&i.length<8)throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${i}`);if(!u)throw new Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');if(p!=="1")throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${p}`);if(!((e=r.statement)===null||e===void 0)&&e.includes(`
`))throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${r.statement}`)}const h=Fs(r.address),f=d?`${d}://${s}`:s,g=r.statement?`${r.statement}
`:"",v=`${f} wants you to sign in with your Ethereum account:
${h}

${g}`;let m=`URI: ${u}
Version: ${p}
Chain ID: ${t}${i?`
Nonce: ${i}`:""}
Issued At: ${n.toISOString()}`;if(a&&(m+=`
Expiration Time: ${a.toISOString()}`),o&&(m+=`
Not Before: ${o.toISOString()}`),l&&(m+=`
Request ID: ${l}`),c){let _=`
Resources:`;for(const y of c){if(!y||typeof y!="string")throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${y}`);_+=`
- ${y}`}m+=_}return`${v}
${m}`}class L extends Error{constructor({message:e,code:t,cause:s,name:a}){var n;super(e,{cause:s}),this.__isWebAuthnError=!0,this.name=(n=a??(s instanceof Error?s.name:void 0))!==null&&n!==void 0?n:"Unknown Error",this.code=t}}class ot extends L{constructor(e,t){super({code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t,message:e}),this.name="WebAuthnUnknownError",this.originalError=t}}function ni({error:r,options:e}){var t,s,a;const{publicKey:n}=e;if(!n)throw Error("options was missing required publicKey property");if(r.name==="AbortError"){if(e.signal instanceof AbortSignal)return new L({message:"Registration ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:r})}else if(r.name==="ConstraintError"){if(((t=n.authenticatorSelection)===null||t===void 0?void 0:t.requireResidentKey)===!0)return new L({message:"Discoverable credentials were required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",cause:r});if(e.mediation==="conditional"&&((s=n.authenticatorSelection)===null||s===void 0?void 0:s.userVerification)==="required")return new L({message:"User verification was required during automatic registration but it could not be performed",code:"ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",cause:r});if(((a=n.authenticatorSelection)===null||a===void 0?void 0:a.userVerification)==="required")return new L({message:"User verification was required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",cause:r})}else{if(r.name==="InvalidStateError")return new L({message:"The authenticator was previously registered",code:"ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",cause:r});if(r.name==="NotAllowedError")return new L({message:r.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:r});if(r.name==="NotSupportedError")return n.pubKeyCredParams.filter(o=>o.type==="public-key").length===0?new L({message:'No entry in pubKeyCredParams was of type "public-key"',code:"ERROR_MALFORMED_PUBKEYCREDPARAMS",cause:r}):new L({message:"No available authenticator supported any of the specified pubKeyCredParams algorithms",code:"ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",cause:r});if(r.name==="SecurityError"){const i=window.location.hostname;if(Vs(i)){if(n.rp.id!==i)return new L({message:`The RP ID "${n.rp.id}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:r})}else return new L({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:r})}else if(r.name==="TypeError"){if(n.user.id.byteLength<1||n.user.id.byteLength>64)return new L({message:"User ID was not between 1 and 64 characters",code:"ERROR_INVALID_USER_ID_LENGTH",cause:r})}else if(r.name==="UnknownError")return new L({message:"The authenticator was unable to process the specified options, or could not create a new credential",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:r})}return new L({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:r})}function ii({error:r,options:e}){const{publicKey:t}=e;if(!t)throw Error("options was missing required publicKey property");if(r.name==="AbortError"){if(e.signal instanceof AbortSignal)return new L({message:"Authentication ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:r})}else{if(r.name==="NotAllowedError")return new L({message:r.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:r});if(r.name==="SecurityError"){const s=window.location.hostname;if(Vs(s)){if(t.rpId!==s)return new L({message:`The RP ID "${t.rpId}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:r})}else return new L({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:r})}else if(r.name==="UnknownError")return new L({message:"The authenticator was unable to process the specified options, or could not create a new assertion signature",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:r})}return new L({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:r})}class oi{createNewAbortSignal(){if(this.controller){const t=new Error("Cancelling existing WebAuthn API call for new one");t.name="AbortError",this.controller.abort(t)}const e=new AbortController;return this.controller=e,e.signal}cancelCeremony(){if(this.controller){const e=new Error("Manually cancelling existing WebAuthn API call");e.name="AbortError",this.controller.abort(e),this.controller=void 0}}}const li=new oi;function ci(r){if(!r)throw new Error("Credential creation options are required");if(typeof PublicKeyCredential<"u"&&"parseCreationOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseCreationOptionsFromJSON=="function")return PublicKeyCredential.parseCreationOptionsFromJSON(r);const{challenge:e,user:t,excludeCredentials:s}=r,a=Ce(r,["challenge","user","excludeCredentials"]),n=Se(e).buffer,i=Object.assign(Object.assign({},t),{id:Se(t.id).buffer}),o=Object.assign(Object.assign({},a),{challenge:n,user:i});if(s&&s.length>0){o.excludeCredentials=new Array(s.length);for(let l=0;l<s.length;l++){const c=s[l];o.excludeCredentials[l]=Object.assign(Object.assign({},c),{id:Se(c.id).buffer,type:c.type||"public-key",transports:c.transports})}}return o}function di(r){if(!r)throw new Error("Credential request options are required");if(typeof PublicKeyCredential<"u"&&"parseRequestOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseRequestOptionsFromJSON=="function")return PublicKeyCredential.parseRequestOptionsFromJSON(r);const{challenge:e,allowCredentials:t}=r,s=Ce(r,["challenge","allowCredentials"]),a=Se(e).buffer,n=Object.assign(Object.assign({},s),{challenge:a});if(t&&t.length>0){n.allowCredentials=new Array(t.length);for(let i=0;i<t.length;i++){const o=t[i];n.allowCredentials[i]=Object.assign(Object.assign({},o),{id:Se(o.id).buffer,type:o.type||"public-key",transports:o.transports})}}return n}function ui(r){var e;if("toJSON"in r&&typeof r.toJSON=="function")return r.toJSON();const t=r;return{id:r.id,rawId:r.id,response:{attestationObject:ve(new Uint8Array(r.response.attestationObject)),clientDataJSON:ve(new Uint8Array(r.response.clientDataJSON))},type:"public-key",clientExtensionResults:r.getClientExtensionResults(),authenticatorAttachment:(e=t.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function hi(r){var e;if("toJSON"in r&&typeof r.toJSON=="function")return r.toJSON();const t=r,s=r.getClientExtensionResults(),a=r.response;return{id:r.id,rawId:r.id,response:{authenticatorData:ve(new Uint8Array(a.authenticatorData)),clientDataJSON:ve(new Uint8Array(a.clientDataJSON)),signature:ve(new Uint8Array(a.signature)),userHandle:a.userHandle?ve(new Uint8Array(a.userHandle)):void 0},type:"public-key",clientExtensionResults:s,authenticatorAttachment:(e=t.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function Vs(r){return r==="localhost"||/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(r)}function yr(){var r,e;return!!(F()&&"PublicKeyCredential"in window&&window.PublicKeyCredential&&"credentials"in navigator&&typeof((r=navigator==null?void 0:navigator.credentials)===null||r===void 0?void 0:r.create)=="function"&&typeof((e=navigator==null?void 0:navigator.credentials)===null||e===void 0?void 0:e.get)=="function")}async function pi(r){try{const e=await navigator.credentials.create(r);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new ot("Browser returned unexpected credential type",e)}:{data:null,error:new ot("Empty credential response",e)}}catch(e){return{data:null,error:ni({error:e,options:r})}}}async function fi(r){try{const e=await navigator.credentials.get(r);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new ot("Browser returned unexpected credential type",e)}:{data:null,error:new ot("Empty credential response",e)}}catch(e){return{data:null,error:ii({error:e,options:r})}}}const gi={hints:["security-key"],authenticatorSelection:{authenticatorAttachment:"cross-platform",requireResidentKey:!1,userVerification:"preferred",residentKey:"discouraged"},attestation:"direct"},vi={userVerification:"preferred",hints:["security-key"],attestation:"direct"};function lt(...r){const e=a=>a!==null&&typeof a=="object"&&!Array.isArray(a),t=a=>a instanceof ArrayBuffer||ArrayBuffer.isView(a),s={};for(const a of r)if(a)for(const n in a){const i=a[n];if(i!==void 0)if(Array.isArray(i))s[n]=i;else if(t(i))s[n]=i;else if(e(i)){const o=s[n];e(o)?s[n]=lt(o,i):s[n]=lt(i)}else s[n]=i}return s}function mi(r,e){return lt(gi,r,e||{})}function yi(r,e){return lt(vi,r,e||{})}class bi{constructor(e){this.client=e,this.enroll=this._enroll.bind(this),this.challenge=this._challenge.bind(this),this.verify=this._verify.bind(this),this.authenticate=this._authenticate.bind(this),this.register=this._register.bind(this)}async _enroll(e){return this.client.mfa.enroll(Object.assign(Object.assign({},e),{factorType:"webauthn"}))}async _challenge({factorId:e,webauthn:t,friendlyName:s,signal:a},n){try{const{data:i,error:o}=await this.client.mfa.challenge({factorId:e,webauthn:t});if(!i)return{data:null,error:o};const l=a??li.createNewAbortSignal();if(i.webauthn.type==="create"){const{user:c}=i.webauthn.credential_options.publicKey;c.name||(c.name=`${c.id}:${s}`),c.displayName||(c.displayName=c.name)}switch(i.webauthn.type){case"create":{const c=mi(i.webauthn.credential_options.publicKey,n==null?void 0:n.create),{data:d,error:u}=await pi({publicKey:c,signal:l});return d?{data:{factorId:e,challengeId:i.id,webauthn:{type:i.webauthn.type,credential_response:d}},error:null}:{data:null,error:u}}case"request":{const c=yi(i.webauthn.credential_options.publicKey,n==null?void 0:n.request),{data:d,error:u}=await fi(Object.assign(Object.assign({},i.webauthn.credential_options),{publicKey:c,signal:l}));return d?{data:{factorId:e,challengeId:i.id,webauthn:{type:i.webauthn.type,credential_response:d}},error:null}:{data:null,error:u}}}}catch(i){return E(i)?{data:null,error:i}:{data:null,error:new ie("Unexpected error in challenge",i)}}}async _verify({challengeId:e,factorId:t,webauthn:s}){return this.client.mfa.verify({factorId:t,challengeId:e,webauthn:s})}async _authenticate({factorId:e,webauthn:{rpId:t=typeof window<"u"?window.location.hostname:void 0,rpOrigins:s=typeof window<"u"?[window.location.origin]:void 0,signal:a}={}},n){if(!t)return{data:null,error:new Ae("rpId is required for WebAuthn authentication")};try{if(!yr())return{data:null,error:new ie("Browser does not support WebAuthn",null)};const{data:i,error:o}=await this.challenge({factorId:e,webauthn:{rpId:t,rpOrigins:s},signal:a},{request:n});if(!i)return{data:null,error:o};const{webauthn:l}=i;return this._verify({factorId:e,challengeId:i.challengeId,webauthn:{type:l.type,rpId:t,rpOrigins:s,credential_response:l.credential_response}})}catch(i){return E(i)?{data:null,error:i}:{data:null,error:new ie("Unexpected error in authenticate",i)}}}async _register({friendlyName:e,webauthn:{rpId:t=typeof window<"u"?window.location.hostname:void 0,rpOrigins:s=typeof window<"u"?[window.location.origin]:void 0,signal:a}={}},n){if(!t)return{data:null,error:new Ae("rpId is required for WebAuthn registration")};try{if(!yr())return{data:null,error:new ie("Browser does not support WebAuthn",null)};const{data:i,error:o}=await this._enroll({friendlyName:e});if(!i)return await this.client.mfa.listFactors().then(d=>{var u;return(u=d.data)===null||u===void 0?void 0:u.all.find(p=>p.factor_type==="webauthn"&&p.friendly_name===e&&p.status!=="unverified")}).then(d=>d?this.client.mfa.unenroll({factorId:d==null?void 0:d.id}):void 0),{data:null,error:o};const{data:l,error:c}=await this._challenge({factorId:i.id,friendlyName:i.friendly_name,webauthn:{rpId:t,rpOrigins:s},signal:a},{create:n});return l?this._verify({factorId:i.id,challengeId:l.challengeId,webauthn:{rpId:t,rpOrigins:s,type:l.webauthn.type,credential_response:l.webauthn.credential_response}}):{data:null,error:c}}catch(i){return E(i)?{data:null,error:i}:{data:null,error:new ie("Unexpected error in register",i)}}}}ti();const wi={url:wn,storageKey:_n,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:kn,flowType:"implicit",debug:!1,hasCustomAuthorizationHeader:!1,throwOnError:!1};async function br(r,e,t){return await t()}const ke={};let Yt=class Mt{get jwks(){var e,t;return(t=(e=ke[this.storageKey])===null||e===void 0?void 0:e.jwks)!==null&&t!==void 0?t:{keys:[]}}set jwks(e){ke[this.storageKey]=Object.assign(Object.assign({},ke[this.storageKey]),{jwks:e})}get jwks_cached_at(){var e,t;return(t=(e=ke[this.storageKey])===null||e===void 0?void 0:e.cachedAt)!==null&&t!==void 0?t:Number.MIN_SAFE_INTEGER}set jwks_cached_at(e){ke[this.storageKey]=Object.assign(Object.assign({},ke[this.storageKey]),{cachedAt:e})}constructor(e){var t,s,a;this.userStorage=null,this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.initializePromise=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log;const n=Object.assign(Object.assign({},wi),e);if(this.storageKey=n.storageKey,this.instanceID=(t=Mt.nextInstanceID[this.storageKey])!==null&&t!==void 0?t:0,Mt.nextInstanceID[this.storageKey]=this.instanceID+1,this.logDebugMessages=!!n.debug,typeof n.debug=="function"&&(this.logger=n.debug),this.instanceID>0&&F()){const i=`${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;console.warn(i),this.logDebugMessages&&console.trace(i)}if(this.persistSession=n.persistSession,this.autoRefreshToken=n.autoRefreshToken,this.admin=new Wt({url:n.url,headers:n.headers,fetch:n.fetch}),this.url=n.url,this.headers=n.headers,this.fetch=Bs(n.fetch),this.lock=n.lock||br,this.detectSessionInUrl=n.detectSessionInUrl,this.flowType=n.flowType,this.hasCustomAuthorizationHeader=n.hasCustomAuthorizationHeader,this.throwOnError=n.throwOnError,n.lock?this.lock=n.lock:F()&&(!((s=globalThis==null?void 0:globalThis.navigator)===null||s===void 0)&&s.locks)?this.lock=Hs:this.lock=br,this.jwks||(this.jwks={keys:[]},this.jwks_cached_at=Number.MIN_SAFE_INTEGER),this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this),webauthn:new bi(this)},this.oauth={getAuthorizationDetails:this._getAuthorizationDetails.bind(this),approveAuthorization:this._approveAuthorization.bind(this),denyAuthorization:this._denyAuthorization.bind(this),listGrants:this._listOAuthGrants.bind(this),revokeGrant:this._revokeOAuthGrant.bind(this)},this.persistSession?(n.storage?this.storage=n.storage:qs()?this.storage=globalThis.localStorage:(this.memoryStorage={},this.storage=vr(this.memoryStorage)),n.userStorage&&(this.userStorage=n.userStorage)):(this.memoryStorage={},this.storage=vr(this.memoryStorage)),F()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(i){console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available",i)}(a=this.broadcastChannel)===null||a===void 0||a.addEventListener("message",async i=>{this._debug("received broadcast notification from other tab or client",i),await this._notifyAllSubscribers(i.data.event,i.data.session,!1)})}this.initialize()}isThrowOnErrorEnabled(){return this.throwOnError}_returnResult(e){if(this.throwOnError&&e&&e.error)throw e.error;return e}_logPrefix(){return`GoTrueClient@${this.storageKey}:${this.instanceID} (${$s}) ${new Date().toISOString()}`}_debug(...e){return this.logDebugMessages&&this.logger(this._logPrefix(),...e),this}async initialize(){return this.initializePromise?await this.initializePromise:(this.initializePromise=(async()=>await this._acquireLock(-1,async()=>await this._initialize()))(),await this.initializePromise)}async _initialize(){var e;try{let t={},s="none";if(F()&&(t=$n(window.location.href),this._isImplicitGrantCallback(t)?s="implicit":await this._isPKCECallback(t)&&(s="pkce")),F()&&this.detectSessionInUrl&&s!=="none"){const{data:a,error:n}=await this._getSessionFromURL(t,s);if(n){if(this._debug("#_initialize()","error detecting session from URL",n),Ms(n)){const l=(e=n.details)===null||e===void 0?void 0:e.code;if(l==="identity_already_exists"||l==="identity_not_found"||l==="single_identity_not_deletable")return{error:n}}return await this._removeSession(),{error:n}}const{session:i,redirectType:o}=a;return this._debug("#_initialize()","detected session in URL",i,"redirect type",o),await this._saveSession(i),setTimeout(async()=>{o==="recovery"?await this._notifyAllSubscribers("PASSWORD_RECOVERY",i):await this._notifyAllSubscribers("SIGNED_IN",i)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(t){return E(t)?this._returnResult({error:t}):this._returnResult({error:new ie("Unexpected error during initialization",t)})}finally{await this._handleVisibilityChange(),this._debug("#_initialize()","end")}}async signInAnonymously(e){var t,s,a;try{const n=await S(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{data:(s=(t=e==null?void 0:e.options)===null||t===void 0?void 0:t.data)!==null&&s!==void 0?s:{},gotrue_meta_security:{captcha_token:(a=e==null?void 0:e.options)===null||a===void 0?void 0:a.captchaToken}},xform:Z}),{data:i,error:o}=n;if(o||!i)return this._returnResult({data:{user:null,session:null},error:o});const l=i.session,c=i.user;return i.session&&(await this._saveSession(i.session),await this._notifyAllSubscribers("SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(n){if(E(n))return this._returnResult({data:{user:null,session:null},error:n});throw n}}async signUp(e){var t,s,a;try{let n;if("email"in e){const{email:d,password:u,options:p}=e;let h=null,f=null;this.flowType==="pkce"&&([h,f]=await we(this.storage,this.storageKey)),n=await S(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,redirectTo:p==null?void 0:p.emailRedirectTo,body:{email:d,password:u,data:(t=p==null?void 0:p.data)!==null&&t!==void 0?t:{},gotrue_meta_security:{captcha_token:p==null?void 0:p.captchaToken},code_challenge:h,code_challenge_method:f},xform:Z})}else if("phone"in e){const{phone:d,password:u,options:p}=e;n=await S(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{phone:d,password:u,data:(s=p==null?void 0:p.data)!==null&&s!==void 0?s:{},channel:(a=p==null?void 0:p.channel)!==null&&a!==void 0?a:"sms",gotrue_meta_security:{captcha_token:p==null?void 0:p.captchaToken}},xform:Z})}else throw new $e("You must provide either an email or phone number and a password");const{data:i,error:o}=n;if(o||!i)return await H(this.storage,`${this.storageKey}-code-verifier`),this._returnResult({data:{user:null,session:null},error:o});const l=i.session,c=i.user;return i.session&&(await this._saveSession(i.session),await this._notifyAllSubscribers("SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(n){if(await H(this.storage,`${this.storageKey}-code-verifier`),E(n))return this._returnResult({data:{user:null,session:null},error:n});throw n}}async signInWithPassword(e){try{let t;if("email"in e){const{email:n,password:i,options:o}=e;t=await S(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:n,password:i,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}},xform:fr})}else if("phone"in e){const{phone:n,password:i,options:o}=e;t=await S(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:n,password:i,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}},xform:fr})}else throw new $e("You must provide either an email or phone number and a password");const{data:s,error:a}=t;if(a)return this._returnResult({data:{user:null,session:null},error:a});if(!s||!s.session||!s.user){const n=new ue;return this._returnResult({data:{user:null,session:null},error:n})}return s.session&&(await this._saveSession(s.session),await this._notifyAllSubscribers("SIGNED_IN",s.session)),this._returnResult({data:Object.assign({user:s.user,session:s.session},s.weak_password?{weakPassword:s.weak_password}:null),error:a})}catch(t){if(E(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async signInWithOAuth(e){var t,s,a,n;return await this._handleProviderSignIn(e.provider,{redirectTo:(t=e.options)===null||t===void 0?void 0:t.redirectTo,scopes:(s=e.options)===null||s===void 0?void 0:s.scopes,queryParams:(a=e.options)===null||a===void 0?void 0:a.queryParams,skipBrowserRedirect:(n=e.options)===null||n===void 0?void 0:n.skipBrowserRedirect})}async exchangeCodeForSession(e){return await this.initializePromise,this._acquireLock(-1,async()=>this._exchangeCodeForSession(e))}async signInWithWeb3(e){const{chain:t}=e;switch(t){case"ethereum":return await this.signInWithEthereum(e);case"solana":return await this.signInWithSolana(e);default:throw new Error(`@supabase/auth-js: Unsupported chain "${t}"`)}}async signInWithEthereum(e){var t,s,a,n,i,o,l,c,d,u,p;let h,f;if("message"in e)h=e.message,f=e.signature;else{const{chain:g,wallet:v,statement:m,options:_}=e;let y;if(F())if(typeof v=="object")y=v;else{const C=window;if("ethereum"in C&&typeof C.ethereum=="object"&&"request"in C.ethereum&&typeof C.ethereum.request=="function")y=C.ethereum;else throw new Error("@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.")}else{if(typeof v!="object"||!(_!=null&&_.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");y=v}const x=new URL((t=_==null?void 0:_.url)!==null&&t!==void 0?t:window.location.href),k=await y.request({method:"eth_requestAccounts"}).then(C=>C).catch(()=>{throw new Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid")});if(!k||k.length===0)throw new Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");const w=Fs(k[0]);let b=(s=_==null?void 0:_.signInWithEthereum)===null||s===void 0?void 0:s.chainId;if(!b){const C=await y.request({method:"eth_chainId"});b=ri(C)}const O={domain:x.host,address:w,statement:m,uri:x.href,version:"1",chainId:b,nonce:(a=_==null?void 0:_.signInWithEthereum)===null||a===void 0?void 0:a.nonce,issuedAt:(i=(n=_==null?void 0:_.signInWithEthereum)===null||n===void 0?void 0:n.issuedAt)!==null&&i!==void 0?i:new Date,expirationTime:(o=_==null?void 0:_.signInWithEthereum)===null||o===void 0?void 0:o.expirationTime,notBefore:(l=_==null?void 0:_.signInWithEthereum)===null||l===void 0?void 0:l.notBefore,requestId:(c=_==null?void 0:_.signInWithEthereum)===null||c===void 0?void 0:c.requestId,resources:(d=_==null?void 0:_.signInWithEthereum)===null||d===void 0?void 0:d.resources};h=ai(O),f=await y.request({method:"personal_sign",params:[si(h),w]})}try{const{data:g,error:v}=await S(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"ethereum",message:h,signature:f},!((u=e.options)===null||u===void 0)&&u.captchaToken?{gotrue_meta_security:{captcha_token:(p=e.options)===null||p===void 0?void 0:p.captchaToken}}:null),xform:Z});if(v)throw v;if(!g||!g.session||!g.user){const m=new ue;return this._returnResult({data:{user:null,session:null},error:m})}return g.session&&(await this._saveSession(g.session),await this._notifyAllSubscribers("SIGNED_IN",g.session)),this._returnResult({data:Object.assign({},g),error:v})}catch(g){if(E(g))return this._returnResult({data:{user:null,session:null},error:g});throw g}}async signInWithSolana(e){var t,s,a,n,i,o,l,c,d,u,p,h;let f,g;if("message"in e)f=e.message,g=e.signature;else{const{chain:v,wallet:m,statement:_,options:y}=e;let x;if(F())if(typeof m=="object")x=m;else{const w=window;if("solana"in w&&typeof w.solana=="object"&&("signIn"in w.solana&&typeof w.solana.signIn=="function"||"signMessage"in w.solana&&typeof w.solana.signMessage=="function"))x=w.solana;else throw new Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.")}else{if(typeof m!="object"||!(y!=null&&y.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");x=m}const k=new URL((t=y==null?void 0:y.url)!==null&&t!==void 0?t:window.location.href);if("signIn"in x&&x.signIn){const w=await x.signIn(Object.assign(Object.assign(Object.assign({issuedAt:new Date().toISOString()},y==null?void 0:y.signInWithSolana),{version:"1",domain:k.host,uri:k.href}),_?{statement:_}:null));let b;if(Array.isArray(w)&&w[0]&&typeof w[0]=="object")b=w[0];else if(w&&typeof w=="object"&&"signedMessage"in w&&"signature"in w)b=w;else throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");if("signedMessage"in b&&"signature"in b&&(typeof b.signedMessage=="string"||b.signedMessage instanceof Uint8Array)&&b.signature instanceof Uint8Array)f=typeof b.signedMessage=="string"?b.signedMessage:new TextDecoder().decode(b.signedMessage),g=b.signature;else throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields")}else{if(!("signMessage"in x)||typeof x.signMessage!="function"||!("publicKey"in x)||typeof x!="object"||!x.publicKey||!("toBase58"in x.publicKey)||typeof x.publicKey.toBase58!="function")throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");f=[`${k.host} wants you to sign in with your Solana account:`,x.publicKey.toBase58(),..._?["",_,""]:[""],"Version: 1",`URI: ${k.href}`,`Issued At: ${(a=(s=y==null?void 0:y.signInWithSolana)===null||s===void 0?void 0:s.issuedAt)!==null&&a!==void 0?a:new Date().toISOString()}`,...!((n=y==null?void 0:y.signInWithSolana)===null||n===void 0)&&n.notBefore?[`Not Before: ${y.signInWithSolana.notBefore}`]:[],...!((i=y==null?void 0:y.signInWithSolana)===null||i===void 0)&&i.expirationTime?[`Expiration Time: ${y.signInWithSolana.expirationTime}`]:[],...!((o=y==null?void 0:y.signInWithSolana)===null||o===void 0)&&o.chainId?[`Chain ID: ${y.signInWithSolana.chainId}`]:[],...!((l=y==null?void 0:y.signInWithSolana)===null||l===void 0)&&l.nonce?[`Nonce: ${y.signInWithSolana.nonce}`]:[],...!((c=y==null?void 0:y.signInWithSolana)===null||c===void 0)&&c.requestId?[`Request ID: ${y.signInWithSolana.requestId}`]:[],...!((u=(d=y==null?void 0:y.signInWithSolana)===null||d===void 0?void 0:d.resources)===null||u===void 0)&&u.length?["Resources",...y.signInWithSolana.resources.map(b=>`- ${b}`)]:[]].join(`
`);const w=await x.signMessage(new TextEncoder().encode(f),"utf8");if(!w||!(w instanceof Uint8Array))throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");g=w}}try{const{data:v,error:m}=await S(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"solana",message:f,signature:ve(g)},!((p=e.options)===null||p===void 0)&&p.captchaToken?{gotrue_meta_security:{captcha_token:(h=e.options)===null||h===void 0?void 0:h.captchaToken}}:null),xform:Z});if(m)throw m;if(!v||!v.session||!v.user){const _=new ue;return this._returnResult({data:{user:null,session:null},error:_})}return v.session&&(await this._saveSession(v.session),await this._notifyAllSubscribers("SIGNED_IN",v.session)),this._returnResult({data:Object.assign({},v),error:m})}catch(v){if(E(v))return this._returnResult({data:{user:null,session:null},error:v});throw v}}async _exchangeCodeForSession(e){const t=await de(this.storage,`${this.storageKey}-code-verifier`),[s,a]=(t??"").split("/");try{const{data:n,error:i}=await S(this.fetch,"POST",`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:e,code_verifier:s},xform:Z});if(await H(this.storage,`${this.storageKey}-code-verifier`),i)throw i;if(!n||!n.session||!n.user){const o=new ue;return this._returnResult({data:{user:null,session:null,redirectType:null},error:o})}return n.session&&(await this._saveSession(n.session),await this._notifyAllSubscribers("SIGNED_IN",n.session)),this._returnResult({data:Object.assign(Object.assign({},n),{redirectType:a??null}),error:i})}catch(n){if(await H(this.storage,`${this.storageKey}-code-verifier`),E(n))return this._returnResult({data:{user:null,session:null,redirectType:null},error:n});throw n}}async signInWithIdToken(e){try{const{options:t,provider:s,token:a,access_token:n,nonce:i}=e,o=await S(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:s,id_token:a,access_token:n,nonce:i,gotrue_meta_security:{captcha_token:t==null?void 0:t.captchaToken}},xform:Z}),{data:l,error:c}=o;if(c)return this._returnResult({data:{user:null,session:null},error:c});if(!l||!l.session||!l.user){const d=new ue;return this._returnResult({data:{user:null,session:null},error:d})}return l.session&&(await this._saveSession(l.session),await this._notifyAllSubscribers("SIGNED_IN",l.session)),this._returnResult({data:l,error:c})}catch(t){if(E(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async signInWithOtp(e){var t,s,a,n,i;try{if("email"in e){const{email:o,options:l}=e;let c=null,d=null;this.flowType==="pkce"&&([c,d]=await we(this.storage,this.storageKey));const{error:u}=await S(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{email:o,data:(t=l==null?void 0:l.data)!==null&&t!==void 0?t:{},create_user:(s=l==null?void 0:l.shouldCreateUser)!==null&&s!==void 0?s:!0,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken},code_challenge:c,code_challenge_method:d},redirectTo:l==null?void 0:l.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:u})}if("phone"in e){const{phone:o,options:l}=e,{data:c,error:d}=await S(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{phone:o,data:(a=l==null?void 0:l.data)!==null&&a!==void 0?a:{},create_user:(n=l==null?void 0:l.shouldCreateUser)!==null&&n!==void 0?n:!0,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken},channel:(i=l==null?void 0:l.channel)!==null&&i!==void 0?i:"sms"}});return this._returnResult({data:{user:null,session:null,messageId:c==null?void 0:c.message_id},error:d})}throw new $e("You must provide either an email or phone number.")}catch(o){if(await H(this.storage,`${this.storageKey}-code-verifier`),E(o))return this._returnResult({data:{user:null,session:null},error:o});throw o}}async verifyOtp(e){var t,s;try{let a,n;"options"in e&&(a=(t=e.options)===null||t===void 0?void 0:t.redirectTo,n=(s=e.options)===null||s===void 0?void 0:s.captchaToken);const{data:i,error:o}=await S(this.fetch,"POST",`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},e),{gotrue_meta_security:{captcha_token:n}}),redirectTo:a,xform:Z});if(o)throw o;if(!i)throw new Error("An error occurred on token verification.");const l=i.session,c=i.user;return l!=null&&l.access_token&&(await this._saveSession(l),await this._notifyAllSubscribers(e.type=="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(a){if(E(a))return this._returnResult({data:{user:null,session:null},error:a});throw a}}async signInWithSSO(e){var t,s,a,n,i;try{let o=null,l=null;this.flowType==="pkce"&&([o,l]=await we(this.storage,this.storageKey));const c=await S(this.fetch,"POST",`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},"providerId"in e?{provider_id:e.providerId}:null),"domain"in e?{domain:e.domain}:null),{redirect_to:(s=(t=e.options)===null||t===void 0?void 0:t.redirectTo)!==null&&s!==void 0?s:void 0}),!((a=e==null?void 0:e.options)===null||a===void 0)&&a.captchaToken?{gotrue_meta_security:{captcha_token:e.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:o,code_challenge_method:l}),headers:this.headers,xform:Yn});return!((n=c.data)===null||n===void 0)&&n.url&&F()&&!(!((i=e.options)===null||i===void 0)&&i.skipBrowserRedirect)&&window.location.assign(c.data.url),this._returnResult(c)}catch(o){if(await H(this.storage,`${this.storageKey}-code-verifier`),E(o))return this._returnResult({data:null,error:o});throw o}}async reauthenticate(){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._reauthenticate())}async _reauthenticate(){try{return await this._useSession(async e=>{const{data:{session:t},error:s}=e;if(s)throw s;if(!t)throw new G;const{error:a}=await S(this.fetch,"GET",`${this.url}/reauthenticate`,{headers:this.headers,jwt:t.access_token});return this._returnResult({data:{user:null,session:null},error:a})})}catch(e){if(E(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async resend(e){try{const t=`${this.url}/resend`;if("email"in e){const{email:s,type:a,options:n}=e,{error:i}=await S(this.fetch,"POST",t,{headers:this.headers,body:{email:s,type:a,gotrue_meta_security:{captcha_token:n==null?void 0:n.captchaToken}},redirectTo:n==null?void 0:n.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:i})}else if("phone"in e){const{phone:s,type:a,options:n}=e,{data:i,error:o}=await S(this.fetch,"POST",t,{headers:this.headers,body:{phone:s,type:a,gotrue_meta_security:{captcha_token:n==null?void 0:n.captchaToken}}});return this._returnResult({data:{user:null,session:null,messageId:i==null?void 0:i.message_id},error:o})}throw new $e("You must provide either an email or phone number and a type")}catch(t){if(E(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async getSession(){return await this.initializePromise,await this._acquireLock(-1,async()=>this._useSession(async t=>t))}async _acquireLock(e,t){this._debug("#_acquireLock","begin",e);try{if(this.lockAcquired){const s=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),a=(async()=>(await s,await t()))();return this.pendingInLock.push((async()=>{try{await a}catch{}})()),a}return await this.lock(`lock:${this.storageKey}`,e,async()=>{this._debug("#_acquireLock","lock acquired for storage key",this.storageKey);try{this.lockAcquired=!0;const s=t();for(this.pendingInLock.push((async()=>{try{await s}catch{}})()),await s;this.pendingInLock.length;){const a=[...this.pendingInLock];await Promise.all(a),this.pendingInLock.splice(0,a.length)}return await s}finally{this._debug("#_acquireLock","lock released for storage key",this.storageKey),this.lockAcquired=!1}})}finally{this._debug("#_acquireLock","end")}}async _useSession(e){this._debug("#_useSession","begin");try{const t=await this.__loadSession();return await e(t)}finally{this._debug("#_useSession","end")}}async __loadSession(){this._debug("#__loadSession()","begin"),this.lockAcquired||this._debug("#__loadSession()","used outside of an acquired lock!",new Error().stack);try{let e=null;const t=await de(this.storage,this.storageKey);if(this._debug("#getSession()","session from storage",t),t!==null&&(this._isValidSession(t)?e=t:(this._debug("#getSession()","session from storage is not valid"),await this._removeSession())),!e)return{data:{session:null},error:null};const s=e.expires_at?e.expires_at*1e3-Date.now()<bt:!1;if(this._debug("#__loadSession()",`session has${s?"":" not"} expired`,"expires_at",e.expires_at),!s){if(this.userStorage){const i=await de(this.userStorage,this.storageKey+"-user");i!=null&&i.user?e.user=i.user:e.user=_t()}if(this.storage.isServer&&e.user&&!e.user.__isUserNotAvailableProxy){const i={value:this.suppressGetSessionWarning};e.user=Kn(e.user,i),i.value&&(this.suppressGetSessionWarning=!0)}return{data:{session:e},error:null}}const{data:a,error:n}=await this._callRefreshToken(e.refresh_token);return n?this._returnResult({data:{session:null},error:n}):this._returnResult({data:{session:a},error:null})}finally{this._debug("#__loadSession()","end")}}async getUser(e){if(e)return await this._getUser(e);await this.initializePromise;const t=await this._acquireLock(-1,async()=>await this._getUser());return t.data.user&&(this.suppressGetSessionWarning=!0),t}async _getUser(e){try{return e?await S(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:e,xform:oe}):await this._useSession(async t=>{var s,a,n;const{data:i,error:o}=t;if(o)throw o;return!(!((s=i.session)===null||s===void 0)&&s.access_token)&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new G}:await S(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:(n=(a=i.session)===null||a===void 0?void 0:a.access_token)!==null&&n!==void 0?n:void 0,xform:oe})})}catch(t){if(E(t))return Ns(t)&&(await this._removeSession(),await H(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({data:{user:null},error:t});throw t}}async updateUser(e,t={}){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._updateUser(e,t))}async _updateUser(e,t={}){try{return await this._useSession(async s=>{const{data:a,error:n}=s;if(n)throw n;if(!a.session)throw new G;const i=a.session;let o=null,l=null;this.flowType==="pkce"&&e.email!=null&&([o,l]=await we(this.storage,this.storageKey));const{data:c,error:d}=await S(this.fetch,"PUT",`${this.url}/user`,{headers:this.headers,redirectTo:t==null?void 0:t.emailRedirectTo,body:Object.assign(Object.assign({},e),{code_challenge:o,code_challenge_method:l}),jwt:i.access_token,xform:oe});if(d)throw d;return i.user=c.user,await this._saveSession(i),await this._notifyAllSubscribers("USER_UPDATED",i),this._returnResult({data:{user:i.user},error:null})})}catch(s){if(await H(this.storage,`${this.storageKey}-code-verifier`),E(s))return this._returnResult({data:{user:null},error:s});throw s}}async setSession(e){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._setSession(e))}async _setSession(e){try{if(!e.access_token||!e.refresh_token)throw new G;const t=Date.now()/1e3;let s=t,a=!0,n=null;const{payload:i}=wt(e.access_token);if(i.exp&&(s=i.exp,a=s<=t),a){const{data:o,error:l}=await this._callRefreshToken(e.refresh_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});if(!o)return{data:{user:null,session:null},error:null};n=o}else{const{data:o,error:l}=await this._getUser(e.access_token);if(l)throw l;n={access_token:e.access_token,refresh_token:e.refresh_token,user:o.user,token_type:"bearer",expires_in:s-t,expires_at:s},await this._saveSession(n),await this._notifyAllSubscribers("SIGNED_IN",n)}return this._returnResult({data:{user:n.user,session:n},error:null})}catch(t){if(E(t))return this._returnResult({data:{session:null,user:null},error:t});throw t}}async refreshSession(e){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._refreshSession(e))}async _refreshSession(e){try{return await this._useSession(async t=>{var s;if(!e){const{data:i,error:o}=t;if(o)throw o;e=(s=i.session)!==null&&s!==void 0?s:void 0}if(!(e!=null&&e.refresh_token))throw new G;const{data:a,error:n}=await this._callRefreshToken(e.refresh_token);return n?this._returnResult({data:{user:null,session:null},error:n}):a?this._returnResult({data:{user:a.user,session:a},error:null}):this._returnResult({data:{user:null,session:null},error:null})})}catch(t){if(E(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async _getSessionFromURL(e,t){try{if(!F())throw new Ie("No browser detected.");if(e.error||e.error_description||e.error_code)throw new Ie(e.error_description||"Error in URL with unspecified error_description",{error:e.error||"unspecified_error",code:e.error_code||"unspecified_code"});switch(t){case"implicit":if(this.flowType==="pkce")throw new Lt("Not a valid PKCE flow url.");break;case"pkce":if(this.flowType==="implicit")throw new Ie("Not a valid implicit grant flow url.");break;default:}if(t==="pkce"){if(this._debug("#_initialize()","begin","is PKCE flow",!0),!e.code)throw new Lt("No code detected.");const{data:_,error:y}=await this._exchangeCodeForSession(e.code);if(y)throw y;const x=new URL(window.location.href);return x.searchParams.delete("code"),window.history.replaceState(window.history.state,"",x.toString()),{data:{session:_.session,redirectType:null},error:null}}const{provider_token:s,provider_refresh_token:a,access_token:n,refresh_token:i,expires_in:o,expires_at:l,token_type:c}=e;if(!n||!o||!i||!c)throw new Ie("No session defined in URL");const d=Math.round(Date.now()/1e3),u=parseInt(o);let p=d+u;l&&(p=parseInt(l));const h=p-d;h*1e3<=xe&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${h}s, should have been closer to ${u}s`);const f=p-u;d-f>=120?console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",f,p,d):d-f<0&&console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",f,p,d);const{data:g,error:v}=await this._getUser(n);if(v)throw v;const m={provider_token:s,provider_refresh_token:a,access_token:n,expires_in:u,expires_at:p,refresh_token:i,token_type:c,user:g.user};return window.location.hash="",this._debug("#_getSessionFromURL()","clearing window.location.hash"),this._returnResult({data:{session:m,redirectType:e.type},error:null})}catch(s){if(E(s))return this._returnResult({data:{session:null,redirectType:null},error:s});throw s}}_isImplicitGrantCallback(e){return!!(e.access_token||e.error_description)}async _isPKCECallback(e){const t=await de(this.storage,`${this.storageKey}-code-verifier`);return!!(e.code&&t)}async signOut(e={scope:"global"}){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._signOut(e))}async _signOut({scope:e}={scope:"global"}){return await this._useSession(async t=>{var s;const{data:a,error:n}=t;if(n)return this._returnResult({error:n});const i=(s=a.session)===null||s===void 0?void 0:s.access_token;if(i){const{error:o}=await this.admin.signOut(i,e);if(o&&!(Ls(o)&&(o.status===404||o.status===401||o.status===403)))return this._returnResult({error:o})}return e!=="others"&&(await this._removeSession(),await H(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({error:null})})}onAuthStateChange(e){const t=Pn(),s={id:t,callback:e,unsubscribe:()=>{this._debug("#unsubscribe()","state change callback with id removed",t),this.stateChangeEmitters.delete(t)}};return this._debug("#onAuthStateChange()","registered callback with id",t),this.stateChangeEmitters.set(t,s),(async()=>(await this.initializePromise,await this._acquireLock(-1,async()=>{this._emitInitialSession(t)})))(),{data:{subscription:s}}}async _emitInitialSession(e){return await this._useSession(async t=>{var s,a;try{const{data:{session:n},error:i}=t;if(i)throw i;await((s=this.stateChangeEmitters.get(e))===null||s===void 0?void 0:s.callback("INITIAL_SESSION",n)),this._debug("INITIAL_SESSION","callback id",e,"session",n)}catch(n){await((a=this.stateChangeEmitters.get(e))===null||a===void 0?void 0:a.callback("INITIAL_SESSION",null)),this._debug("INITIAL_SESSION","callback id",e,"error",n),console.error(n)}})}async resetPasswordForEmail(e,t={}){let s=null,a=null;this.flowType==="pkce"&&([s,a]=await we(this.storage,this.storageKey,!0));try{return await S(this.fetch,"POST",`${this.url}/recover`,{body:{email:e,code_challenge:s,code_challenge_method:a,gotrue_meta_security:{captcha_token:t.captchaToken}},headers:this.headers,redirectTo:t.redirectTo})}catch(n){if(await H(this.storage,`${this.storageKey}-code-verifier`),E(n))return this._returnResult({data:null,error:n});throw n}}async getUserIdentities(){var e;try{const{data:t,error:s}=await this.getUser();if(s)throw s;return this._returnResult({data:{identities:(e=t.user.identities)!==null&&e!==void 0?e:[]},error:null})}catch(t){if(E(t))return this._returnResult({data:null,error:t});throw t}}async linkIdentity(e){return"token"in e?this.linkIdentityIdToken(e):this.linkIdentityOAuth(e)}async linkIdentityOAuth(e){var t;try{const{data:s,error:a}=await this._useSession(async n=>{var i,o,l,c,d;const{data:u,error:p}=n;if(p)throw p;const h=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,e.provider,{redirectTo:(i=e.options)===null||i===void 0?void 0:i.redirectTo,scopes:(o=e.options)===null||o===void 0?void 0:o.scopes,queryParams:(l=e.options)===null||l===void 0?void 0:l.queryParams,skipBrowserRedirect:!0});return await S(this.fetch,"GET",h,{headers:this.headers,jwt:(d=(c=u.session)===null||c===void 0?void 0:c.access_token)!==null&&d!==void 0?d:void 0})});if(a)throw a;return F()&&!(!((t=e.options)===null||t===void 0)&&t.skipBrowserRedirect)&&window.location.assign(s==null?void 0:s.url),this._returnResult({data:{provider:e.provider,url:s==null?void 0:s.url},error:null})}catch(s){if(E(s))return this._returnResult({data:{provider:e.provider,url:null},error:s});throw s}}async linkIdentityIdToken(e){return await this._useSession(async t=>{var s;try{const{error:a,data:{session:n}}=t;if(a)throw a;const{options:i,provider:o,token:l,access_token:c,nonce:d}=e,u=await S(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,jwt:(s=n==null?void 0:n.access_token)!==null&&s!==void 0?s:void 0,body:{provider:o,id_token:l,access_token:c,nonce:d,link_identity:!0,gotrue_meta_security:{captcha_token:i==null?void 0:i.captchaToken}},xform:Z}),{data:p,error:h}=u;return h?this._returnResult({data:{user:null,session:null},error:h}):!p||!p.session||!p.user?this._returnResult({data:{user:null,session:null},error:new ue}):(p.session&&(await this._saveSession(p.session),await this._notifyAllSubscribers("USER_UPDATED",p.session)),this._returnResult({data:p,error:h}))}catch(a){if(await H(this.storage,`${this.storageKey}-code-verifier`),E(a))return this._returnResult({data:{user:null,session:null},error:a});throw a}})}async unlinkIdentity(e){try{return await this._useSession(async t=>{var s,a;const{data:n,error:i}=t;if(i)throw i;return await S(this.fetch,"DELETE",`${this.url}/user/identities/${e.identity_id}`,{headers:this.headers,jwt:(a=(s=n.session)===null||s===void 0?void 0:s.access_token)!==null&&a!==void 0?a:void 0})})}catch(t){if(E(t))return this._returnResult({data:null,error:t});throw t}}async _refreshAccessToken(e){const t=`#_refreshAccessToken(${e.substring(0,5)}...)`;this._debug(t,"begin");try{const s=Date.now();return await Ln(async a=>(a>0&&await zn(200*Math.pow(2,a-1)),this._debug(t,"refreshing attempt",a),await S(this.fetch,"POST",`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:e},headers:this.headers,xform:Z})),(a,n)=>{const i=200*Math.pow(2,a);return n&&Ze(n)&&Date.now()+i-s<xe})}catch(s){if(this._debug(t,"error",s),E(s))return this._returnResult({data:{session:null,user:null},error:s});throw s}finally{this._debug(t,"end")}}_isValidSession(e){return typeof e=="object"&&e!==null&&"access_token"in e&&"refresh_token"in e&&"expires_at"in e}async _handleProviderSignIn(e,t){const s=await this._getUrlForProvider(`${this.url}/authorize`,e,{redirectTo:t.redirectTo,scopes:t.scopes,queryParams:t.queryParams});return this._debug("#_handleProviderSignIn()","provider",e,"options",t,"url",s),F()&&!t.skipBrowserRedirect&&window.location.assign(s),{data:{provider:e,url:s},error:null}}async _recoverAndRefresh(){var e,t;const s="#_recoverAndRefresh()";this._debug(s,"begin");try{const a=await de(this.storage,this.storageKey);if(a&&this.userStorage){let i=await de(this.userStorage,this.storageKey+"-user");!this.storage.isServer&&Object.is(this.storage,this.userStorage)&&!i&&(i={user:a.user},await je(this.userStorage,this.storageKey+"-user",i)),a.user=(e=i==null?void 0:i.user)!==null&&e!==void 0?e:_t()}else if(a&&!a.user&&!a.user){const i=await de(this.storage,this.storageKey+"-user");i&&(i!=null&&i.user)?(a.user=i.user,await H(this.storage,this.storageKey+"-user"),await je(this.storage,this.storageKey,a)):a.user=_t()}if(this._debug(s,"session from storage",a),!this._isValidSession(a)){this._debug(s,"session is not valid"),a!==null&&await this._removeSession();return}const n=((t=a.expires_at)!==null&&t!==void 0?t:1/0)*1e3-Date.now()<bt;if(this._debug(s,`session has${n?"":" not"} expired with margin of ${bt}s`),n){if(this.autoRefreshToken&&a.refresh_token){const{error:i}=await this._callRefreshToken(a.refresh_token);i&&(console.error(i),Ze(i)||(this._debug(s,"refresh failed with a non-retryable error, removing the session",i),await this._removeSession()))}}else if(a.user&&a.user.__isUserNotAvailableProxy===!0)try{const{data:i,error:o}=await this._getUser(a.access_token);!o&&(i!=null&&i.user)?(a.user=i.user,await this._saveSession(a),await this._notifyAllSubscribers("SIGNED_IN",a)):this._debug(s,"could not get user data, skipping SIGNED_IN notification")}catch(i){console.error("Error getting user data:",i),this._debug(s,"error getting user data, skipping SIGNED_IN notification",i)}else await this._notifyAllSubscribers("SIGNED_IN",a)}catch(a){this._debug(s,"error",a),console.error(a);return}finally{this._debug(s,"end")}}async _callRefreshToken(e){var t,s;if(!e)throw new G;if(this.refreshingDeferred)return this.refreshingDeferred.promise;const a=`#_callRefreshToken(${e.substring(0,5)}...)`;this._debug(a,"begin");try{this.refreshingDeferred=new gt;const{data:n,error:i}=await this._refreshAccessToken(e);if(i)throw i;if(!n.session)throw new G;await this._saveSession(n.session),await this._notifyAllSubscribers("TOKEN_REFRESHED",n.session);const o={data:n.session,error:null};return this.refreshingDeferred.resolve(o),o}catch(n){if(this._debug(a,"error",n),E(n)){const i={data:null,error:n};return Ze(n)||await this._removeSession(),(t=this.refreshingDeferred)===null||t===void 0||t.resolve(i),i}throw(s=this.refreshingDeferred)===null||s===void 0||s.reject(n),n}finally{this.refreshingDeferred=null,this._debug(a,"end")}}async _notifyAllSubscribers(e,t,s=!0){const a=`#_notifyAllSubscribers(${e})`;this._debug(a,"begin",t,`broadcast = ${s}`);try{this.broadcastChannel&&s&&this.broadcastChannel.postMessage({event:e,session:t});const n=[],i=Array.from(this.stateChangeEmitters.values()).map(async o=>{try{await o.callback(e,t)}catch(l){n.push(l)}});if(await Promise.all(i),n.length>0){for(let o=0;o<n.length;o+=1)console.error(n[o]);throw n[0]}}finally{this._debug(a,"end")}}async _saveSession(e){this._debug("#_saveSession()",e),this.suppressGetSessionWarning=!0,await H(this.storage,`${this.storageKey}-code-verifier`);const t=Object.assign({},e),s=t.user&&t.user.__isUserNotAvailableProxy===!0;if(this.userStorage){!s&&t.user&&await je(this.userStorage,this.storageKey+"-user",{user:t.user});const a=Object.assign({},t);delete a.user;const n=hr(a);await je(this.storage,this.storageKey,n)}else{const a=hr(t);await je(this.storage,this.storageKey,a)}}async _removeSession(){this._debug("#_removeSession()"),this.suppressGetSessionWarning=!1,await H(this.storage,this.storageKey),await H(this.storage,this.storageKey+"-code-verifier"),await H(this.storage,this.storageKey+"-user"),this.userStorage&&await H(this.userStorage,this.storageKey+"-user"),await this._notifyAllSubscribers("SIGNED_OUT",null)}_removeVisibilityChangedCallback(){this._debug("#_removeVisibilityChangedCallback()");const e=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{e&&F()&&(window!=null&&window.removeEventListener)&&window.removeEventListener("visibilitychange",e)}catch(t){console.error("removing visibilitychange callback failed",t)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug("#_startAutoRefresh()");const e=setInterval(()=>this._autoRefreshTokenTick(),xe);this.autoRefreshTicker=e,e&&typeof e=="object"&&typeof e.unref=="function"?e.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(e),setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0)}async _stopAutoRefresh(){this._debug("#_stopAutoRefresh()");const e=this.autoRefreshTicker;this.autoRefreshTicker=null,e&&clearInterval(e)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async _autoRefreshTokenTick(){this._debug("#_autoRefreshTokenTick()","begin");try{await this._acquireLock(0,async()=>{try{const e=Date.now();try{return await this._useSession(async t=>{const{data:{session:s}}=t;if(!s||!s.refresh_token||!s.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const a=Math.floor((s.expires_at*1e3-e)/xe);this._debug("#_autoRefreshTokenTick()",`access token expires in ${a} ticks, a tick lasts ${xe}ms, refresh threshold is ${It} ticks`),a<=It&&await this._callRefreshToken(s.refresh_token)})}catch(t){console.error("Auto refresh tick failed with error. This is likely a transient error.",t)}}finally{this._debug("#_autoRefreshTokenTick()","end")}})}catch(e){if(e.isAcquireTimeout||e instanceof Jt)this._debug("auto refresh token tick lock not available");else throw e}}async _handleVisibilityChange(){if(this._debug("#_handleVisibilityChange()"),!F()||!(window!=null&&window.addEventListener))return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>await this._onVisibilityChanged(!1),window==null||window.addEventListener("visibilitychange",this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(e){console.error("_handleVisibilityChange",e)}}async _onVisibilityChanged(e){const t=`#_onVisibilityChanged(${e})`;this._debug(t,"visibilityState",document.visibilityState),document.visibilityState==="visible"?(this.autoRefreshToken&&this._startAutoRefresh(),e||(await this.initializePromise,await this._acquireLock(-1,async()=>{if(document.visibilityState!=="visible"){this._debug(t,"acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");return}await this._recoverAndRefresh()}))):document.visibilityState==="hidden"&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(e,t,s){const a=[`provider=${encodeURIComponent(t)}`];if(s!=null&&s.redirectTo&&a.push(`redirect_to=${encodeURIComponent(s.redirectTo)}`),s!=null&&s.scopes&&a.push(`scopes=${encodeURIComponent(s.scopes)}`),this.flowType==="pkce"){const[n,i]=await we(this.storage,this.storageKey),o=new URLSearchParams({code_challenge:`${encodeURIComponent(n)}`,code_challenge_method:`${encodeURIComponent(i)}`});a.push(o.toString())}if(s!=null&&s.queryParams){const n=new URLSearchParams(s.queryParams);a.push(n.toString())}return s!=null&&s.skipBrowserRedirect&&a.push(`skip_http_redirect=${s.skipBrowserRedirect}`),`${e}?${a.join("&")}`}async _unenroll(e){try{return await this._useSession(async t=>{var s;const{data:a,error:n}=t;return n?this._returnResult({data:null,error:n}):await S(this.fetch,"DELETE",`${this.url}/factors/${e.factorId}`,{headers:this.headers,jwt:(s=a==null?void 0:a.session)===null||s===void 0?void 0:s.access_token})})}catch(t){if(E(t))return this._returnResult({data:null,error:t});throw t}}async _enroll(e){try{return await this._useSession(async t=>{var s,a;const{data:n,error:i}=t;if(i)return this._returnResult({data:null,error:i});const o=Object.assign({friendly_name:e.friendlyName,factor_type:e.factorType},e.factorType==="phone"?{phone:e.phone}:e.factorType==="totp"?{issuer:e.issuer}:{}),{data:l,error:c}=await S(this.fetch,"POST",`${this.url}/factors`,{body:o,headers:this.headers,jwt:(s=n==null?void 0:n.session)===null||s===void 0?void 0:s.access_token});return c?this._returnResult({data:null,error:c}):(e.factorType==="totp"&&l.type==="totp"&&(!((a=l==null?void 0:l.totp)===null||a===void 0)&&a.qr_code)&&(l.totp.qr_code=`data:image/svg+xml;utf-8,${l.totp.qr_code}`),this._returnResult({data:l,error:null}))})}catch(t){if(E(t))return this._returnResult({data:null,error:t});throw t}}async _verify(e){return this._acquireLock(-1,async()=>{try{return await this._useSession(async t=>{var s;const{data:a,error:n}=t;if(n)return this._returnResult({data:null,error:n});const i=Object.assign({challenge_id:e.challengeId},"webauthn"in e?{webauthn:Object.assign(Object.assign({},e.webauthn),{credential_response:e.webauthn.type==="create"?ui(e.webauthn.credential_response):hi(e.webauthn.credential_response)})}:{code:e.code}),{data:o,error:l}=await S(this.fetch,"POST",`${this.url}/factors/${e.factorId}/verify`,{body:i,headers:this.headers,jwt:(s=a==null?void 0:a.session)===null||s===void 0?void 0:s.access_token});return l?this._returnResult({data:null,error:l}):(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+o.expires_in},o)),await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED",o),this._returnResult({data:o,error:l}))})}catch(t){if(E(t))return this._returnResult({data:null,error:t});throw t}})}async _challenge(e){return this._acquireLock(-1,async()=>{try{return await this._useSession(async t=>{var s;const{data:a,error:n}=t;if(n)return this._returnResult({data:null,error:n});const i=await S(this.fetch,"POST",`${this.url}/factors/${e.factorId}/challenge`,{body:e,headers:this.headers,jwt:(s=a==null?void 0:a.session)===null||s===void 0?void 0:s.access_token});if(i.error)return i;const{data:o}=i;if(o.type!=="webauthn")return{data:o,error:null};switch(o.webauthn.type){case"create":return{data:Object.assign(Object.assign({},o),{webauthn:Object.assign(Object.assign({},o.webauthn),{credential_options:Object.assign(Object.assign({},o.webauthn.credential_options),{publicKey:ci(o.webauthn.credential_options.publicKey)})})}),error:null};case"request":return{data:Object.assign(Object.assign({},o),{webauthn:Object.assign(Object.assign({},o.webauthn),{credential_options:Object.assign(Object.assign({},o.webauthn.credential_options),{publicKey:di(o.webauthn.credential_options.publicKey)})})}),error:null}}})}catch(t){if(E(t))return this._returnResult({data:null,error:t});throw t}})}async _challengeAndVerify(e){const{data:t,error:s}=await this._challenge({factorId:e.factorId});return s?this._returnResult({data:null,error:s}):await this._verify({factorId:e.factorId,challengeId:t.id,code:e.code})}async _listFactors(){var e;const{data:{user:t},error:s}=await this.getUser();if(s)return{data:null,error:s};const a={all:[],phone:[],totp:[],webauthn:[]};for(const n of(e=t==null?void 0:t.factors)!==null&&e!==void 0?e:[])a.all.push(n),n.status==="verified"&&a[n.factor_type].push(n);return{data:a,error:null}}async _getAuthenticatorAssuranceLevel(){var e,t;const{data:{session:s},error:a}=await this.getSession();if(a)return this._returnResult({data:null,error:a});if(!s)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};const{payload:n}=wt(s.access_token);let i=null;n.aal&&(i=n.aal);let o=i;((t=(e=s.user.factors)===null||e===void 0?void 0:e.filter(d=>d.status==="verified"))!==null&&t!==void 0?t:[]).length>0&&(o="aal2");const c=n.amr||[];return{data:{currentLevel:i,nextLevel:o,currentAuthenticationMethods:c},error:null}}async _getAuthorizationDetails(e){try{return await this._useSession(async t=>{const{data:{session:s},error:a}=t;return a?this._returnResult({data:null,error:a}):s?await S(this.fetch,"GET",`${this.url}/oauth/authorizations/${e}`,{headers:this.headers,jwt:s.access_token,xform:n=>({data:n,error:null})}):this._returnResult({data:null,error:new G})})}catch(t){if(E(t))return this._returnResult({data:null,error:t});throw t}}async _approveAuthorization(e,t){try{return await this._useSession(async s=>{const{data:{session:a},error:n}=s;if(n)return this._returnResult({data:null,error:n});if(!a)return this._returnResult({data:null,error:new G});const i=await S(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:a.access_token,body:{action:"approve"},xform:o=>({data:o,error:null})});return i.data&&i.data.redirect_url&&F()&&!(t!=null&&t.skipBrowserRedirect)&&window.location.assign(i.data.redirect_url),i})}catch(s){if(E(s))return this._returnResult({data:null,error:s});throw s}}async _denyAuthorization(e,t){try{return await this._useSession(async s=>{const{data:{session:a},error:n}=s;if(n)return this._returnResult({data:null,error:n});if(!a)return this._returnResult({data:null,error:new G});const i=await S(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:a.access_token,body:{action:"deny"},xform:o=>({data:o,error:null})});return i.data&&i.data.redirect_url&&F()&&!(t!=null&&t.skipBrowserRedirect)&&window.location.assign(i.data.redirect_url),i})}catch(s){if(E(s))return this._returnResult({data:null,error:s});throw s}}async _listOAuthGrants(){try{return await this._useSession(async e=>{const{data:{session:t},error:s}=e;return s?this._returnResult({data:null,error:s}):t?await S(this.fetch,"GET",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:t.access_token,xform:a=>({data:a,error:null})}):this._returnResult({data:null,error:new G})})}catch(e){if(E(e))return this._returnResult({data:null,error:e});throw e}}async _revokeOAuthGrant(e){try{return await this._useSession(async t=>{const{data:{session:s},error:a}=t;return a?this._returnResult({data:null,error:a}):s?(await S(this.fetch,"DELETE",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:s.access_token,query:{client_id:e.clientId},noResolveJson:!0}),{data:{},error:null}):this._returnResult({data:null,error:new G})})}catch(t){if(E(t))return this._returnResult({data:null,error:t});throw t}}async fetchJwk(e,t={keys:[]}){let s=t.keys.find(o=>o.kid===e);if(s)return s;const a=Date.now();if(s=this.jwks.keys.find(o=>o.kid===e),s&&this.jwks_cached_at+jn>a)return s;const{data:n,error:i}=await S(this.fetch,"GET",`${this.url}/.well-known/jwks.json`,{headers:this.headers});if(i)throw i;return!n.keys||n.keys.length===0||(this.jwks=n,this.jwks_cached_at=a,s=n.keys.find(o=>o.kid===e),!s)?null:s}async getClaims(e,t={}){try{let s=e;if(!s){const{data:h,error:f}=await this.getSession();if(f||!h.session)return this._returnResult({data:null,error:f});s=h.session.access_token}const{header:a,payload:n,signature:i,raw:{header:o,payload:l}}=wt(s);t!=null&&t.allowExpired||Hn(n.exp);const c=!a.alg||a.alg.startsWith("HS")||!a.kid||!("crypto"in globalThis&&"subtle"in globalThis.crypto)?null:await this.fetchJwk(a.kid,t!=null&&t.keys?{keys:t.keys}:t==null?void 0:t.jwks);if(!c){const{error:h}=await this.getUser(s);if(h)throw h;return{data:{claims:n,header:a,signature:i},error:null}}const d=Fn(a.alg),u=await crypto.subtle.importKey("jwk",c,d,!0,["verify"]);if(!await crypto.subtle.verify(d,u,i,Cn(`${o}.${l}`)))throw new nt("Invalid JWT signature");return{data:{claims:n,header:a,signature:i},error:null}}catch(s){if(E(s))return this._returnResult({data:null,error:s});throw s}}};Yt.nextInstanceID={};const _i=Wt,ki=Yt,xi=Object.freeze(Object.defineProperty({__proto__:null,AuthAdminApi:_i,AuthApiError:zs,AuthClient:ki,AuthError:Ae,AuthImplicitGrantRedirectError:Ie,AuthInvalidCredentialsError:$e,AuthInvalidJwtError:nt,AuthInvalidTokenResponseError:ue,AuthPKCEGrantCodeExchangeError:Lt,AuthRetryableFetchError:at,AuthSessionMissingError:G,AuthUnknownError:ie,AuthWeakPasswordError:Nt,CustomAuthError:ae,GoTrueAdminApi:Wt,GoTrueClient:Yt,NavigatorLockAcquireTimeoutError:Ds,SIGN_OUT_SCOPES:Qe,isAuthApiError:Ls,isAuthError:E,isAuthImplicitGrantRedirectError:Ms,isAuthRetryableFetchError:Ze,isAuthSessionMissingError:Ns,isAuthWeakPasswordError:En,lockInternals:pe,navigatorLock:Hs,processLock:ei},Symbol.toStringTag,{value:"Module"})),Ks=Ne(xi);Object.defineProperty(ft,"__esModule",{value:!0});ft.SupabaseAuthClient=void 0;const ji=Ks;class Ei extends ji.AuthClient{constructor(e){super(e)}}ft.SupabaseAuthClient=Ei;Object.defineProperty(Xe,"__esModule",{value:!0});const Si=Yr,Ti=K,Oi=vs,Ai=gn,We=Cs,Ci=Rs,wr=le,Ri=ft;let Pi=class{constructor(e,t,s){var a,n,i;this.supabaseUrl=e,this.supabaseKey=t;const o=(0,wr.validateSupabaseUrl)(e);if(!t)throw new Error("supabaseKey is required.");this.realtimeUrl=new URL("realtime/v1",o),this.realtimeUrl.protocol=this.realtimeUrl.protocol.replace("http","ws"),this.authUrl=new URL("auth/v1",o),this.storageUrl=new URL("storage/v1",o),this.functionsUrl=new URL("functions/v1",o);const l=`sb-${o.hostname.split(".")[0]}-auth-token`,c={db:We.DEFAULT_DB_OPTIONS,realtime:We.DEFAULT_REALTIME_OPTIONS,auth:Object.assign(Object.assign({},We.DEFAULT_AUTH_OPTIONS),{storageKey:l}),global:We.DEFAULT_GLOBAL_OPTIONS},d=(0,wr.applySettingDefaults)(s??{},c);this.storageKey=(a=d.auth.storageKey)!==null&&a!==void 0?a:"",this.headers=(n=d.global.headers)!==null&&n!==void 0?n:{},d.accessToken?(this.accessToken=d.accessToken,this.auth=new Proxy({},{get:(u,p)=>{throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(p)} is not possible`)}})):this.auth=this._initSupabaseAuthClient((i=d.auth)!==null&&i!==void 0?i:{},this.headers,d.global.fetch),this.fetch=(0,Ci.fetchWithAuth)(t,this._getAccessToken.bind(this),d.global.fetch),this.realtime=this._initRealtimeClient(Object.assign({headers:this.headers,accessToken:this._getAccessToken.bind(this)},d.realtime)),this.accessToken&&this.accessToken().then(u=>this.realtime.setAuth(u)).catch(u=>console.warn("Failed to set initial Realtime auth token:",u)),this.rest=new Ti.PostgrestClient(new URL("rest/v1",o).href,{headers:this.headers,schema:d.db.schema,fetch:this.fetch}),this.storage=new Ai.StorageClient(this.storageUrl.href,this.headers,this.fetch,s==null?void 0:s.storage),d.accessToken||this._listenForAuthEvents()}get functions(){return new Si.FunctionsClient(this.functionsUrl.href,{headers:this.headers,customFetch:this.fetch})}from(e){return this.rest.from(e)}schema(e){return this.rest.schema(e)}rpc(e,t={},s={head:!1,get:!1,count:void 0}){return this.rest.rpc(e,t,s)}channel(e,t={config:{}}){return this.realtime.channel(e,t)}getChannels(){return this.realtime.getChannels()}removeChannel(e){return this.realtime.removeChannel(e)}removeAllChannels(){return this.realtime.removeAllChannels()}async _getAccessToken(){var e,t;if(this.accessToken)return await this.accessToken();const{data:s}=await this.auth.getSession();return(t=(e=s.session)===null||e===void 0?void 0:e.access_token)!==null&&t!==void 0?t:this.supabaseKey}_initSupabaseAuthClient({autoRefreshToken:e,persistSession:t,detectSessionInUrl:s,storage:a,userStorage:n,storageKey:i,flowType:o,lock:l,debug:c,throwOnError:d},u,p){const h={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new Ri.SupabaseAuthClient({url:this.authUrl.href,headers:Object.assign(Object.assign({},h),u),storageKey:i,autoRefreshToken:e,persistSession:t,detectSessionInUrl:s,storage:a,userStorage:n,flowType:o,lock:l,debug:c,throwOnError:d,fetch:p,hasCustomAuthorizationHeader:Object.keys(this.headers).some(f=>f.toLowerCase()==="authorization")})}_initRealtimeClient(e){return new Oi.RealtimeClient(this.realtimeUrl.href,Object.assign(Object.assign({},e),{params:Object.assign({apikey:this.supabaseKey},e==null?void 0:e.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((t,s)=>{this._handleTokenChanged(t,"CLIENT",s==null?void 0:s.access_token)})}_handleTokenChanged(e,t,s){(e==="TOKEN_REFRESHED"||e==="SIGNED_IN")&&this.changedAccessToken!==s?(this.changedAccessToken=s,this.realtime.setAuth(s)):e==="SIGNED_OUT"&&(this.realtime.setAuth(),t=="STORAGE"&&this.auth.signOut(),this.changedAccessToken=void 0)}};Xe.default=Pi;(function(r){var e=ye&&ye.__createBinding||(Object.create?function(d,u,p,h){h===void 0&&(h=p);var f=Object.getOwnPropertyDescriptor(u,p);(!f||("get"in f?!u.__esModule:f.writable||f.configurable))&&(f={enumerable:!0,get:function(){return u[p]}}),Object.defineProperty(d,h,f)}:function(d,u,p,h){h===void 0&&(h=p),d[h]=u[p]}),t=ye&&ye.__exportStar||function(d,u){for(var p in d)p!=="default"&&!Object.prototype.hasOwnProperty.call(u,p)&&e(u,d,p)},s=ye&&ye.__importDefault||function(d){return d&&d.__esModule?d:{default:d}};Object.defineProperty(r,"__esModule",{value:!0}),r.createClient=r.SupabaseClient=r.FunctionRegion=r.FunctionsError=r.FunctionsRelayError=r.FunctionsFetchError=r.FunctionsHttpError=r.PostgrestError=void 0;const a=s(Xe);t(Ks,r);var n=K;Object.defineProperty(r,"PostgrestError",{enumerable:!0,get:function(){return n.PostgrestError}});var i=Yr;Object.defineProperty(r,"FunctionsHttpError",{enumerable:!0,get:function(){return i.FunctionsHttpError}}),Object.defineProperty(r,"FunctionsFetchError",{enumerable:!0,get:function(){return i.FunctionsFetchError}}),Object.defineProperty(r,"FunctionsRelayError",{enumerable:!0,get:function(){return i.FunctionsRelayError}}),Object.defineProperty(r,"FunctionsError",{enumerable:!0,get:function(){return i.FunctionsError}}),Object.defineProperty(r,"FunctionRegion",{enumerable:!0,get:function(){return i.FunctionRegion}}),t(vs,r);var o=Xe;Object.defineProperty(r,"SupabaseClient",{enumerable:!0,get:function(){return s(o).default}});const l=(d,u,p)=>new a.default(d,u,p);r.createClient=l;function c(){if(typeof window<"u"||typeof process>"u")return!1;const d=process.version;if(d==null)return!1;const u=d.match(/^v(\d+)\./);return u?parseInt(u[1],10)<=18:!1}c()&&console.warn("⚠️  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217")})(Bt);const Gs=va(Bt),$i=pa({__proto__:null,default:Gs},[Bt]),{PostgrestError:$o,FunctionsHttpError:Io,FunctionsFetchError:zo,FunctionsRelayError:Lo,FunctionsError:No,FunctionRegion:Mo,SupabaseClient:Uo,createClient:Ii,GoTrueAdminApi:qo,GoTrueClient:Bo,AuthAdminApi:Do,AuthClient:Ho,navigatorLock:Fo,NavigatorLockAcquireTimeoutError:Vo,lockInternals:Ko,processLock:Go,SIGN_OUT_SCOPES:Wo,AuthError:Jo,AuthApiError:Yo,AuthUnknownError:Zo,CustomAuthError:Qo,AuthSessionMissingError:Xo,AuthInvalidTokenResponseError:el,AuthInvalidCredentialsError:tl,AuthImplicitGrantRedirectError:rl,AuthPKCEGrantCodeExchangeError:sl,AuthRetryableFetchError:al,AuthWeakPasswordError:nl,AuthInvalidJwtError:il,isAuthError:ol,isAuthApiError:ll,isAuthSessionMissingError:cl,isAuthImplicitGrantRedirectError:dl,isAuthRetryableFetchError:ul,isAuthWeakPasswordError:hl,RealtimePresence:pl,RealtimeChannel:fl,RealtimeClient:gl,REALTIME_LISTEN_TYPES:vl,REALTIME_POSTGRES_CHANGES_LISTEN_EVENT:ml,REALTIME_PRESENCE_LISTEN_EVENTS:yl,REALTIME_SUBSCRIBE_STATES:bl,REALTIME_CHANNEL_STATES:wl}=Gs||$i,zi="https://gcpgmzewvaclbxeyvjng.supabase.co",Li="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjcGdtemV3dmFjbGJ4ZXl2am5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5NTczMzQsImV4cCI6MjA4MDUzMzMzNH0.MsapRRGwXMwadiSTWedBP87jm7HQL4LV0EFI5ENDnJM",Q=Ii(zi,Li),U=Object.freeze(Object.defineProperty({__proto__:null,supabase:Q},Symbol.toStringTag,{value:"Module"})),T={services:[{id:"pojasevi",name:"Ugradnja pojaseva",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 13.5 10.5 17.7a4 4 0 0 0 0 5.6 4 4 0 0 0 5.6 0l4.2-4.2a4 4 0 0 0 0-5.6l-5.6-5.6"/><path d="M20.2 13.5 13.5 20.2"/><path d="M4 11V4h7"/><path d="M2.5 7.5 11 16"/></svg>',description:"Profesionalna ugradnja sigurnosnih pojaseva. Možete donijeti i rastavljeni sustav za pojaseve.",sellingPoints:["Certificirana ugradnja","Garancija na rad","Brza i precizna usluga","Podrška za sve modele"],images:["/images/pojas1.png","/images/pojas2.png"]},{id:"zvjezdano-nebo",name:"Ugradnja zvjezdanog neba",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z"/></svg>',description:"Luksuzna ugradnja LED zvjezdanog neba u strop vozila. Odaberite broj zvjezdica (100-1000).",sellingPoints:["Premium LED tehnologija","Prilagođeni dizajn","Dugotrajnost","Spektakularan efekt"],images:["/images/zvjezde1.png","/images/zvjezde2.png"]},{id:"zatamnjivanje",name:"Zatamnjivanje zadnjih stakala",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h18v18H3zM21 9H3M21 15H3M12 3v18"/></svg>',description:"Profesionalno zatamnjivanje stakala prema zakonskim propisima.",sellingPoints:["Zakonski propisi","UV zaštita","Estetski izgled","Povećana privatnost"],images:["/images/stakla1.png","/images/stakla2.png"]},{id:"mapiranje",name:"Kodiranje vozila",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',description:"Profesionalno kodiranje i optimizacija softvera vašeg vozila.",sellingPoints:["Povećane performanse","Bolja ekonomičnost","Sigurno kodiranje","Garancija na uslugu"],images:["/images/kodiranje1.png","/images/kodiranje2.png"]},{id:"kocnice",name:"Promjena boje kočnica",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><path d="M14.5 9.5 12 12"/></svg>',price:199,description:"Profesionalno lakiranje kočionih čeljusti u boju po želji.",sellingPoints:["Visoka otpornost na toplinu","Dugotrajna boja","Zaštita od korozije","Sportski izgled"],images:["/images/kocnica1.png","/images/kocnica2.png"]},{id:"chrome-delete",name:"Chrome delete",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>',is_request_price:!0,description:"Presvlačenje kromiranih dijelova u crnu sjajnu ili mat foliju.",sellingPoints:["Moderniji izgled","Zaštita kroma","Crna sjaj ili mat","Reverzibilan proces"],images:["/images/chrome1.png","/images/chrome2.png"]}],bundles:[{id:"silver-paket",name:"Silver Paket",price:490,icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 7l2 5h-4l2-5"/></svg>',description:"Ugradnja pojaseva, promjena boje čeljusti, kodiranje.",includes:["pojasevi","kocnice","mapiranje"],sellingPoints:["Ugradnja pojaseva u boji po želji","Profesionalno lakiranje čeljusti","Softversko kodiranje"],images:["/images/pojas1.png","/images/kodiranje1.png"]},{id:"gold-paket",name:"Gold Paket",price:690,icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 7l2 5h-4l2-5"/><path d="M8 12h8"/></svg>',description:"Ugradnja pojaseva, promjena boje čeljusti, kodiranje, zatamnjivanje stakala.",includes:["pojasevi","kocnice","mapiranje","zatamnjivanje"],sellingPoints:["Sve iz Silver paketa","Zatamnjivanje stakala (premium folija)"],images:["/images/pojas1.png","/images/kodiranje1.png"]},{id:"platinum-paket",name:"Platinum Paket",price:990,icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 7l2 5h-4l2-5"/><path d="M12 2v20"/></svg>',description:"Ugradnja pojaseva, promjena boje čeljusti, kodiranje, zvjezadno nebo (500 zvjezdica).",includes:["pojasevi","kocnice","mapiranje","zvjezdano-nebo"],sellingPoints:["Sve iz Silver paketa","Zvjezdano nebo (500 zvjezdica)","Potpuna transformacija vozila"],images:["/images/pojas1.png","/images/kodiranje1.png"]}],maxReservations:4,reviews:[{id:1,company:"Maminjo",logo:"/images/review-maminjo.png",rating:5,text:"Odličan servis! Profesionalno i brzo obavljen posao. Preporučujem!",author:"Maminjo"},{id:2,company:"Luxe Rent",logo:"/images/review-luxerent.png",rating:5,text:"Koristimo njihove usluge za cijelu flotu. Uvijek pouzdani i kvalitetni.",author:"Luxe Rent"}],faq:[{question:"Koliko traje ugradnja pojaseva?",answer:"Ugradnja pojaseva obično traje 2-4 sata, ovisno o modelu vozila i broju pojaseva."},{question:"Mogu li donijeti vlastite pojaseve?",answer:"Da, možete donijeti vlastite pojaseve ili čak rastavljeni sustav. Naši stručnjaci će ih profesionalno ugraditi."},{question:"Koliko zvjezdica mogu odabrati za zvjezdano nebo?",answer:"Možete odabrati između 100 i 1000 zvjezdica, ovisno o vašim preferencijama i veličini stropa vozila."},{question:"Je li zatamnjivanje stakala zakonito?",answer:"Da, naše zatamnjivanje je u skladu sa zakonskim propisima. Prednja stakla ostaju nezatamnjena."},{question:"Što je mapiranje vozila?",answer:"Mapiranje je proces optimizacije softvera upravljačke jedinice motora za poboljšanje performansi i ekonomičnosti."},{question:"Imate li garanciju na usluge?",answer:"Da, sve naše usluge dolaze s garancijom. Detalji ovise o vrsti usluge."},{question:"Trebam li naručiti termin unaprijed?",answer:"Preporučujemo rezervaciju termina kako bismo osigurali dostupnost i najbolju uslugu."},{question:"Koliko košta ugradnja pojaseva?",answer:"Cijena ovisi o modelu vozila i broju pojaseva. Kontaktirajte nas za točnu ponudu."},{question:"Radite li vikendom?",answer:"Radimo od ponedjeljka do petka. Za hitne slučajeve, kontaktirajte nas."},{question:"Gdje se nalazite?",answer:"Nalazimo se na adresi Vranplaninska ulica 1, Zagreb."}],booking:{service:null,vehicle:{},date:null,time:null,customer:{}},reservations:[],async saveBooking(r){var i,o,l;const{supabase:e}=await M(async()=>{const{supabase:c}=await Promise.resolve().then(()=>U);return{supabase:c}},void 0);let t=null;if(r.softverSlika instanceof File)try{t=await this.uploadBookingFile(r.softverSlika)}catch(c){console.error("Failed to upload software image",c)}const s={service_id:r.service_id,service_name:r.service_name||((i=this.services.find(c=>c.id===r.service_id))==null?void 0:i.name)||((l=(o=this.bundles)==null?void 0:o.find(c=>c.id===r.service_id))==null?void 0:l.name),marka:r.marka,model:r.model,godina:r.godina,broj_pojaseva:r.broj_pojaseva?parseInt(r.broj_pojaseva):null,vlastiti_pojasevi:r.vlastiti_pojasevi||!1,broj_zvjezdica:r.broj_zvjezdica?parseInt(r.broj_zvjezdica):null,vin:r.vinBroj||null,software_version_image_url:t,napomena:r.napomena||null,appointment_date:r.appointment_date,appointment_time:r.appointment_time,ime:r.ime,prezime:r.prezime,email:r.email,telefon:r.telefon,status:"pending",is_manual_entry:r.is_manual_entry||!1},{data:a,error:n}=await e.from("bookings").insert([s]).select();if(n)throw console.error("Error saving booking:",n),n;return a[0]},async uploadBookingFile(r){const{supabase:e}=await M(async()=>{const{supabase:o}=await Promise.resolve().then(()=>U);return{supabase:o}},void 0),t=r.name.split(".").pop(),a=`${`${Math.random().toString(36).substring(2)}.${t}`}`,{error:n}=await e.storage.from("booking-files").upload(a,r);if(n)throw n;const{data:i}=e.storage.from("booking-files").getPublicUrl(a);return i.publicUrl},async getReservations(){const{supabase:r}=await M(async()=>{const{supabase:s}=await Promise.resolve().then(()=>U);return{supabase:s}},void 0),{data:e,error:t}=await r.from("bookings").select("*").order("created_at",{ascending:!1});return t?(console.error("Error fetching reservations:",t),[]):e||[]},async updateReservationStatus(r,e){const{supabase:t}=await M(async()=>{const{supabase:a}=await Promise.resolve().then(()=>U);return{supabase:a}},void 0),{error:s}=await t.from("bookings").update({status:e}).eq("id",r);if(s)throw console.error("Error updating reservation:",s),s},async fetchServiceConfig(){const{supabase:r}=await M(async()=>{const{supabase:s}=await Promise.resolve().then(()=>U);return{supabase:s}},void 0),{data:e,error:t}=await r.from("services").select("*");if(t&&console.warn("Error fetching service config:",t),e&&e.length>0){const s=e.find(a=>a.id==="global_config");s&&(this.maxReservations=s.duration_minutes||4),this.services=this.services.map(a=>{const n=e.find(i=>i.id===a.id);return n?{...a,duration:n.duration_minutes,durationPerUnit:n.duration_per_unit_minutes,durationRastavljeni:n.duration_rastavljeni_minutes,price:n.price}:a})}return this.services},async loadServices(){return await this.fetchServiceConfig()},async updateServiceConfig(r,e){const{supabase:t}=await M(async()=>{const{supabase:i}=await Promise.resolve().then(()=>U);return{supabase:i}},void 0),s=this.services.find(i=>i.id===r),a={id:r,...e,updated_at:new Date().toISOString()};s?(a.name=s.name,a.icon=s.icon,a.description||(a.description=s.description)):a.name=a.name||"Service Config";const{error:n}=await t.from("services").upsert(a);if(n)throw console.error("Update Service Config Error:",JSON.stringify(n,null,2)),n;await this.fetchServiceConfig()},async loadReviews(){return this.reviews=await this.getReviews(),this.reviews},async getReviews(){const{supabase:r}=await M(async()=>{const{supabase:s}=await Promise.resolve().then(()=>U);return{supabase:s}},void 0),{data:e,error:t}=await r.from("reviews").select("*").eq("is_approved",!0).order("created_at",{ascending:!1});return t?(console.error("Error fetching reviews:",t),[]):e||[]},async saveReview(r){var n;const{supabase:e}=await M(async()=>{const{supabase:i}=await Promise.resolve().then(()=>U);return{supabase:i}},void 0),{data:{user:t}}=await e.auth.getUser(),s=((n=t==null?void 0:t.user_metadata)==null?void 0:n.role)==="admin",{error:a}=await e.from("reviews").insert([{...r,is_approved:s}]);if(a)throw a},async deleteReview(r){const{supabase:e}=await M(async()=>{const{supabase:s}=await Promise.resolve().then(()=>U);return{supabase:s}},void 0),{error:t}=await e.from("reviews").delete().eq("id",r);if(t)throw t},async uploadReviewImage(r){const{supabase:e}=await M(async()=>{const{supabase:o}=await Promise.resolve().then(()=>U);return{supabase:o}},void 0),t=r.name.split(".").pop(),a=`${`${Math.random()}.${t}`}`,{error:n}=await e.storage.from("review-images").upload(a,r);if(n)throw n;const{data:i}=e.storage.from("review-images").getPublicUrl(a);return i.publicUrl},async getCalendarAvailability(r,e){const{supabase:t}=await M(async()=>{const{supabase:p}=await Promise.resolve().then(()=>U);return{supabase:p}},void 0);await this.fetchServiceConfig();const s=new Date(r,e,1),a=new Date(r,e+1,0),n=s.toISOString().split("T")[0],i=a.toISOString().split("T")[0],{data:o,error:l}=await t.from("bookings").select("appointment_date, service_id, status").gte("appointment_date",n).lte("appointment_date",i).neq("status","cancelled");if(l)return console.error("Error fetching availability:",l),{};const c={};o&&o.forEach(p=>{const h=p.appointment_date;let f=1;p.service_id==="platinum-paket"||p.service_id==="zvjezdano-nebo"?f=this.maxReservations||4:(p.service_id==="gold-paket"||p.service_id==="silver-paket")&&(f=2),c[h]=(c[h]||0)+f});const d={},u=a.getDate();for(let p=1;p<=u;p++){const h=new Date(r,e,p),f=`${r}-${String(e+1).padStart(2,"0")}-${String(p).padStart(2,"0")}`,g=h.getDay();if(g===0||g===6)d[p]={status:"unavailable",count:0};else{const v=c[f]||0;let m="available";JSON.parse(localStorage.getItem("closed_days")||"[]").some(y=>y.date===f)||v>=T.maxReservations?m="unavailable":v>=T.maxReservations-1&&(m="almost-full"),d[p]={status:m,count:v||0}}}return d},async getReservationsByDate(r){const{supabase:e}=await M(async()=>{const{supabase:a}=await Promise.resolve().then(()=>U);return{supabase:a}},void 0),{data:t,error:s}=await e.from("bookings").select("*").eq("appointment_date",r).order("appointment_time",{ascending:!0});return s?(console.error("Error fetching daily reservations:",s),[]):t||[]},async getReservationById(r){const{supabase:e}=await M(async()=>{const{supabase:a}=await Promise.resolve().then(()=>U);return{supabase:a}},void 0),{data:t,error:s}=await e.from("bookings").select("*").eq("id",r).single();return s?(console.error("Error fetching reservation:",s),null):t},async getTimeSlots(r){const{supabase:e}=await M(async()=>{const{supabase:i}=await Promise.resolve().then(()=>U);return{supabase:i}},void 0),{count:t,error:s}=await e.from("bookings").select("*",{count:"exact",head:!0}).eq("appointment_date",r).neq("status","cancelled"),a=this.maxReservations||4,n=s?!1:t>=a;return[{time:"10:00",available:!n},{time:"10:30",available:!n},{time:"11:00",available:!n},{time:"11:30",available:!n},{time:"14:00",available:!n},{time:"14:30",available:!n},{time:"15:00",available:!n},{time:"15:30",available:!n}]},async addReview(r){const{supabase:e}=await M(async()=>{const{supabase:s}=await Promise.resolve().then(()=>U);return{supabase:s}},void 0),{error:t}=await e.from("reviews").insert([{...r,is_approved:!0}]);if(t)throw t},async updateReview(r,e){const{supabase:t}=await M(async()=>{const{supabase:a}=await Promise.resolve().then(()=>U);return{supabase:a}},void 0),{error:s}=await t.from("reviews").update(e).eq("id",r);if(s)throw s},async fetchServiceConfig(){const{supabase:r}=await M(async()=>{const{supabase:s}=await Promise.resolve().then(()=>U);return{supabase:s}},void 0),{data:e,error:t}=await r.from("services").select("*");if(t)console.warn("Error fetching service config:",t);else if(e){const s=e.find(a=>a.id==="global_config");s&&(this.maxReservations=s.duration_minutes||4),this.services=this.services.map(a=>{const n=e.find(i=>i.id===a.id);return n?{...a,duration:n.duration_minutes,durationPerUnit:n.duration_per_unit_minutes,durationRastavljeni:n.duration_rastavljeni_minutes,price:n.price,is_from:n.is_from,price_to:n.price_to,is_request_price:n.is_request_price,price_disassembled:n.price_disassembled,price_per_star:n.price_per_star}:a})}return this.services},async updateServiceConfig(r,e){const{supabase:t}=await M(async()=>{const{supabase:i}=await Promise.resolve().then(()=>U);return{supabase:i}},void 0),s=this.services.find(i=>i.id===r),a={id:r,...e,updated_at:new Date().toISOString()};s?(a.name=s.name,a.icon=s.icon,a.description=s.description||e.description||"Service Description"):(a.name=a.name||"Service Config",a.icon=a.icon||"⚙️",a.description=a.description||"Config");const{error:n}=await t.from("services").upsert(a);if(n)throw console.error("Update Service Config Error:",n),n;await this.fetchServiceConfig()},async manageAdmins(r,e={}){const{supabase:t}=await M(async()=>{const{supabase:n}=await Promise.resolve().then(()=>U);return{supabase:n}},void 0),{data:s,error:a}=await t.functions.invoke("manage-admins",{body:{action:r,...e}});if(a)throw console.error("manage-admins Error:",a),new Error(`Function failed: ${a.message||JSON.stringify(a)}`);if(s&&s.error)throw console.error("manage-admins App Error:",s.error),new Error(s.error);return s},async getClosedDays(){return JSON.parse(localStorage.getItem("closed_days")||"[]")},async addClosedDay(r){const e=await this.getClosedDays();if(e.find(t=>t.date===r))throw new Error("Dan je već zatvoren.");e.push({id:Date.now().toString(),date:r}),localStorage.setItem("closed_days",JSON.stringify(e))},async removeClosedDay(r){const t=(await this.getClosedDays()).filter(s=>s.id!==r);localStorage.setItem("closed_days",JSON.stringify(t))}};function Ni(){const r=document.createElement("section");r.className="hero-section",r.innerHTML=`
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
  `;const e=r.querySelector("#hero-search-input"),t=r.querySelector("#search-results"),s=n=>{n.length>0?(t.innerHTML=n.map(i=>`
        <div class="search-result-item glass" data-service-id="${i.id}">
          <span class="result-icon">${i.icon}</span>
          <span class="result-name">${i.name}</span>
        </div>
      `).join(""),t.classList.remove("hidden"),t.querySelectorAll(".search-result-item").forEach(i=>{i.addEventListener("click",()=>{const o=i.dataset.serviceId;$.navigate("/booking",{serviceId:o})})})):t.classList.add("hidden")},a=n=>{const i=n.toLowerCase().trim();if(i.length===0){s(T.services);return}const o=T.services.filter(l=>l.name.toLowerCase().includes(i)||l.description.toLowerCase().includes(i));s(o)};return e.addEventListener("input",n=>{a(n.target.value)}),e.addEventListener("focus",()=>{a(e.value)}),document.addEventListener("click",n=>{r.contains(n.target)||t.classList.add("hidden")}),r}const Ws=document.createElement("style");Ws.textContent=`
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
    width: 24px;
    height: 24px;
    color: var(--color-accent);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .result-icon svg {
    width: 100%;
    height: 100%;
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
`;document.head.appendChild(Ws);function Mi(){const r=document.createElement("section");return r.className="section how-it-works",r.innerHTML=`
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
  `,r}const Js=document.createElement("style");Js.textContent=`
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
`;document.head.appendChild(Js);function Ui(){const r=document.createElement("section");r.className="section services-widget";let e=!0;const t=()=>{const s=e?T.bundles:T.services,a=e?"PAKETI":"USLUGE",n=s.map(i=>`
    <div class="card service-card" data-id="${i.id}" data-type="${e?"bundle":"service"}">
      <div class="service-icon">${i.icon}</div>
      <h3 class="service-title">${i.name}</h3>
      <p class="service-description">${i.description}</p>
      ${i.is_request_price?'<p class="service-price" style="font-weight: bold; color: var(--color-accent); margin-bottom: 10px; font-size: 1.1rem;">Cijena na upit</p>':i.price?`<p class="service-price" style="font-weight: bold; color: var(--color-accent); margin-bottom: 10px; font-size: 1.1rem;">
          ${i.is_from?'<span style="font-size: 0.9em; opacity: 0.8; font-weight: normal;">od</span> ':""}${i.price.toFixed(2)} EUR
      </p>`:""}
      <button class="btn btn-primary service-btn">
        Rezerviraj
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  `).join("");r.innerHTML=`
    <div class="container">
      <h2 class="section-title text-center mb-xl">
        <span class="heading-top">${a}</span>
        <span class="heading-bottom">Što Nudimo</span>
      </h2>
      
      <div class="grid services-grid">
        ${n}
      </div>

      <div class="text-center mt-xl">
        <button class="btn btn-secondary" id="toggle-view-btn">
            ${e?"Pojedinačne usluge":"Pogledaj pakete"}
        </button>
      </div>
    </div>
  `,r.querySelectorAll(".service-card").forEach(i=>{i.addEventListener("click",o=>{if(o.target.closest(".service-btn")){const l=i.dataset.id;$.navigate("/booking",{serviceId:l})}})}),r.querySelector("#toggle-view-btn").addEventListener("click",()=>{e=!e,t()})};return t(),T.loadServices().then(()=>{e||t()}),r}const Ys=document.createElement("style");Ys.textContent=`
  .services-widget {
    background: var(--color-secondary);
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
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
    width: 80px;
    height: 80px;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 50%;
    margin-bottom: var(--spacing-sm);
    color: var(--color-accent);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-base);
  }

  .service-card:hover .service-icon {
    background: rgba(254, 0, 2, 0.1);
    border-color: var(--color-accent);
    transform: scale(1.1);
  }

  .service-icon svg {
    width: 40px;
    height: 40px;
    stroke-width: 1.5;
  }

  .service-title {
    font-size: 1.3rem;
    font-weight: 900;
    text-transform: uppercase;
    min-height: 2.6em;
    display: flex;
    align-items: center;
    justify-content: center;
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
  
  .mt-xl {
    margin-top: var(--spacing-xl);
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
        width: 60px;
        height: 60px;
    }

    .service-icon svg {
        width: 30px;
        height: 30px;
    }
    
    .service-title {
        font-size: 1.1rem;
        min-height: auto;
    }
  }
`;document.head.appendChild(Ys);function qi(){const r=document.createElement("section");return r.className="cta-banner",r.innerHTML=`
    <div class="cta-content glass">
      <h2 class="cta-title">Rezerviraj termin u 3 jednostavna koraka.</h2>
      <button class="btn btn-cta" id="cta-button">
        Započni Rezervaciju
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  `,r.querySelector("#cta-button").addEventListener("click",()=>{$.navigate("/booking")}),r}const Zs=document.createElement("style");Zs.textContent=`
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
`;document.head.appendChild(Zs);function Bi(){const r=document.createElement("section");r.className="section about-section",r.id="about-section",r.innerHTML=`
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
              Prepoznali smo potrebu za profesionalnom i pouzdanom uslugom u automobilskoj industriji.
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
  `;let e=!1;const t=r.querySelector("#parallax-car"),s=()=>{const n=window.pageYOffset,i=r.offsetTop,o=r.offsetHeight,l=window.innerHeight;if(n+l>i&&n<i+o){const c=(n-i)*-.3;t.style.transform=`translateY(${c}px)`}e=!1},a=()=>{e||(requestAnimationFrame(s),e=!0)};return window.addEventListener("scroll",a),r}const Qs=document.createElement("style");Qs.textContent=`
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
`;document.head.appendChild(Qs);function Di(){const r=document.createElement("section");return r.className="section reviews-slider",r.innerHTML=`
    <div class="container">
      <h2 class="section-title text-center mb-xl">
        <span class="heading-top">RECENZIJE</span>
        <span class="heading-bottom">Što Kažu Naši Klijenti</span>
      </h2>
      <div class="text-center">
        <p>Učitavanje recenzija...</p>
      </div>
    </div>
  `,T.getReviews().then(e=>{if(!e||e.length===0){r.innerHTML=`
            <div class="container">
            <h2 class="section-title text-center mb-xl">
                <span class="heading-top">RECENZIJE</span>
                <span class="heading-bottom">Što Kažu Naši Klijenti</span>
            </h2>
            <div class="text-center glass" style="padding: 2rem;">
                <p>Trenutno nema recenzija.</p>
            </div>
            </div>
        `;return}const t=e.map(f=>`
        <div class="review-card glass">
        <div class="review-header">
            <div class="review-company">
            <div class="company-logo">
                ${f.company?f.company.charAt(0):f.author.charAt(0)}
            </div>
            <span class="company-name">${f.company||f.author}</span>
            </div>
            <div class="review-rating">
            ${Array(5).fill(0).map((g,v)=>`
                <svg class="star ${v<f.rating?"filled":""}" viewBox="0 0 24 24" fill="${v<f.rating?"currentColor":"none"}" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
            `).join("")}
            </div>
        </div>
        <p class="review-text">"${f.text}"</p>
        <p class="review-author">— ${f.author}</p>
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
    `;const s=r.querySelector("#reviews-track"),a=r.querySelector("#slider-prev"),n=r.querySelector("#slider-next"),i=r.querySelector("#slider-dots");let o=0;const l=e.length;for(let f=0;f<l;f++){const g=document.createElement("button");g.className=`slider-dot ${f===0?"active":""}`,g.addEventListener("click",()=>d(f)),i.appendChild(g)}const c=()=>{s.querySelectorAll(".review-card").forEach((g,v)=>{g.classList.toggle("active",v===o)}),i.querySelectorAll(".slider-dot").forEach((g,v)=>{g.classList.toggle("active",v===o)})},d=f=>{o=f,c()},u=()=>{o=(o+1)%l,c()},p=()=>{o=(o-1+l)%l,c()};a.addEventListener("click",p),n.addEventListener("click",u);let h=setInterval(u,5e3);r.addEventListener("mouseenter",()=>{clearInterval(h)}),r.addEventListener("mouseleave",()=>{h=setInterval(u,5e3)}),setTimeout(c,0)}),r}const Xs=document.createElement("style");Xs.textContent=`
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
`;document.head.appendChild(Xs);function Hi(){const r=document.createElement("section");r.className="section-sm faq-section",r.id="faq-section";const e=T.faq.map((t,s)=>`
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
  `,r.querySelectorAll(".faq-question").forEach(t=>{t.addEventListener("click",()=>{const s=t.closest(".faq-item"),a=s.classList.contains("open");r.querySelectorAll(".faq-item").forEach(n=>{n.classList.remove("open")}),a||s.classList.add("open")})}),r}const ea=document.createElement("style");ea.textContent=`
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
`;document.head.appendChild(ea);function Fi(){const r=document.createElement("section");return r.className="section contact-section",r.id="contact-section",r.innerHTML=`
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
  `,r}const ta=document.createElement("style");ta.textContent=`
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
`;document.head.appendChild(ta);function Vi(){const r=document.createElement("div");r.className="page-home",r.appendChild(Ut());const e=document.createElement("main");return e.appendChild(Ni()),e.appendChild(Mi()),e.appendChild(Ui()),e.appendChild(qi()),e.appendChild(Bi()),e.appendChild(Di()),e.appendChild(Hi()),e.appendChild(Fi()),r.appendChild(e),r.appendChild(qt()),r}function Ki({currentStep:r,totalSteps:e=6}){const t=document.createElement("div");t.className="progress-bar-container";const s=r/e*100;return t.innerHTML=`
    <div class="progress-steps">
      ${Array(e).fill(0).map((a,n)=>`
        <div class="progress-step ${n<r?"completed":""} ${n===r-1?"active":""}">
          <div class="step-number">${n+1}</div>
          <div class="step-label">${Gi(n+1)}</div>
        </div>
      `).join("")}
    </div>
    <div class="progress-bar">
      <div class="progress-fill" style="width: ${s}%"></div>
    </div>
  `,t}function Gi(r){return{1:"Usluga",2:"Vozilo",3:"Termin",4:"Podaci",5:"Pregled",6:"Gotovo"}[r]||""}const ra=document.createElement("style");ra.textContent=`
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
`;document.head.appendChild(ra);function Wi({onNext:r,selectedServiceId:e}){const t=document.createElement("div");t.className="booking-step step-service-selection";let s=e||null,a=!0;s&&T.services.find(i=>i.id===s)&&(a=!1);const n=()=>{const i=a?T.bundles:T.services,o=a?"ODABERI PAKET":"ODABERI USLUGU",l=i.map(u=>`
        <div class="service-selection-card card ${u.id===s?"selected":""}" data-id="${u.id}">
        <div class="service-icon-large">${u.icon}</div>
        <h3 class="service-name">${u.name}</h3>
        ${u.is_request_price?'<div style="font-weight: bold; color: var(--color-accent); margin-top: 5px;">Cijena na upit</div>':u.price?`<div style="font-weight: bold; color: var(--color-accent); margin-top: 5px;">
             ${u.is_from?'<span style="font-size: 0.9em; opacity: 0.8; font-weight: normal;">od</span> ':""}${u.price.toFixed(2)} ${u.is_from&&u.price_to?`<span style="font-size: 0.9em; opacity: 0.8; font-weight: normal;">do</span> ${u.price_to.toFixed(2)}`:""} EUR
        </div>`:""}
        </div>
    `).join("");t.innerHTML=`
        <h2 class="step-title">
        <span class="heading-top">KORAK 1</span>
        <span class="heading-bottom">${o}</span>
        </h2>
        
        <div class="service-selection-grid">
        ${l}
        </div>
        
        <div class="step-actions" style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
            <button type="button" class="btn btn-secondary" id="toggle-view-btn">
                ${a?"Pojedinačne usluge":"Pogledaj pakete"}
            </button>
            
            <button class="btn btn-cta" id="next-btn" ${s?"":"disabled"}>
                Nastavi
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            </button>
        </div>
    `;const c=t.querySelectorAll(".service-selection-card"),d=t.querySelector("#next-btn");c.forEach(u=>{u.addEventListener("click",()=>{s=u.dataset.id,c.forEach(h=>h.classList.remove("selected")),u.classList.add("selected"),d.disabled=!1})}),t.querySelector("#toggle-view-btn").addEventListener("click",()=>{a=!a,n()}),d.addEventListener("click",()=>{s&&r({serviceId:s})})};return n(),T.loadServices().then(()=>{a||n()}),t}const sa=document.createElement("style");sa.textContent=`
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
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-lg);
  }

  @media (max-width: 1024px) {
    .service-selection-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 640px) {
    .service-selection-grid {
      grid-template-columns: 1fr;
    }
  }

  .service-selection-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-lg);
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
    width: 80px;
    height: 80px;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 50%;
    margin-bottom: var(--spacing-sm);
    color: var(--color-accent);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-base);
  }
    
  .service-selection-card:hover .service-icon-large,
  .service-selection-card.selected .service-icon-large {
    background: rgba(254, 0, 2, 0.1);
    border-color: var(--color-accent);
    transform: scale(1.1);
  }

  .service-icon-large svg {
    width: 40px;
    height: 40px;
    stroke-width: 1.5;
  }

  .service-name {
    font-size: 1rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  @media (max-width: 768px) {
    .service-selection-card {
        padding: var(--spacing-lg);
    }
    
    .service-icon-large {
        width: 60px;
        height: 60px;
    }

    .service-icon-large svg {
        width: 30px;
        height: 30px;
    }
    
    .service-name {
        font-size: 1rem;
    }
    
    .step-actions {
        width: 100%;
        flex-direction: column;
    }
    
    .step-actions .btn {
        width: 100%;
        justify-content: center;
    }
  }
`;document.head.appendChild(sa);function Ji({serviceId:r,onNext:e,onBack:t}){var o;const s=document.createElement("div");s.className="booking-step step-service-details";const a=T.services.find(l=>l.id===r)||((o=T.bundles)==null?void 0:o.find(l=>l.id===r));if(!a)return s.innerHTML="<p>Service not found</p>",s;let n="";const i=l=>Number.isInteger(l)?l:l.toFixed(2);if(a.id==="zvjezdano-nebo")n="od 595 € do 1190 €";else if(a.is_request_price)n="Na upit";else if(a.price){const l=i(a.price);a.is_from?n=`od ${l} €${a.price_to?" do "+i(a.price_to)+" €":""}`:n=`${l} €`}return s.innerHTML=`
    <div class="service-details-grid">
      <div class="service-details-left">
        <div class="service-header">
          <div class="service-icon-large">${a.icon}</div>
          <h2 class="service-title-large">${a.name}</h2>
        </div>
        
        <p class="service-description-full">${a.description}</p>
        
        <div class="service-selling-points">
          ${a.sellingPoints.map(l=>`
            <div class="selling-point">
              <svg class="icon text-accent" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
              </svg>
              <span>${l}</span>
            </div>
          `).join("")}
        </div>

        ${n?`
            <div class="service-price-display" style="font-size: 1.25rem; font-weight: bold; color: var(--color-accent); margin-bottom: var(--spacing-sm);">
                ${n}
            </div>
        `:""}
        
        <button class="btn btn-cta" id="continue-btn">
          Nastavi
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
      
      <div class="service-details-right">
        ${a.images&&a.images[0]?`
        <div class="service-image-container glass">
          <img src="${a.images[0]}" alt="${a.name} 1" class="service-image" />
        </div>
        `:`
        <div class="service-image-placeholder glass">
          <div class="placeholder-icon">${a.icon}</div>
          <p>Slika nije dostupna</p>
        </div>
        `}
        ${a.images&&a.images[1]?`
        <div class="service-image-container glass">
           <img src="${a.images[1]}" alt="${a.name} 2" class="service-image" />
        </div>
        `:""}
      </div>
    </div>
  `,s.querySelector("#continue-btn").addEventListener("click",()=>{e({serviceId:r})}),s}const aa=document.createElement("style");aa.textContent=`
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

  .service-image-container {
    aspect-ratio: 16/9;
    width: 100%;
    overflow: hidden;
    padding: 0;
  }

  .service-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.3s ease;
  }
  
  .service-image:hover {
    transform: scale(1.03);
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
      gap: var(--spacing-xl);
    }
    
    .service-image-placeholder {
        padding: var(--spacing-lg);
        aspect-ratio: 21/9; /* Much shorter on mobile */
    }
    
    .placeholder-icon {
        font-size: 2.5rem;
    }
    
    .service-title-large {
        font-size: 1.5rem;
    }
  }
`;document.head.appendChild(aa);const ct=[{id:"bmw",name:"BMW",logo:"https://www.carlogos.org/car-logos/bmw-logo.png",models:[{name:"Serija 1",years:[2004,2025]},{name:"Serija 2",years:[2014,2025]},{name:"Serija 3",years:[1975,2025]},{name:"Serija 4",years:[2013,2025]},{name:"Serija 5",years:[1972,2025]},{name:"Serija 6",years:[1976,2025]},{name:"Serija 7",years:[1977,2025]},{name:"Serija 8",years:[1990,2025]},{name:"X1",years:[2009,2025]},{name:"X2",years:[2018,2025]},{name:"X3",years:[2003,2025]},{name:"X4",years:[2014,2025]},{name:"X5",years:[1999,2025]},{name:"X6",years:[2008,2025]},{name:"X7",years:[2019,2025]},{name:"Z4",years:[2002,2025]},{name:"i3",years:[2013,2022]},{name:"i4",years:[2021,2025]},{name:"iX",years:[2021,2025]}]},{id:"mercedes",name:"Mercedes-Benz",logo:"https://www.carlogos.org/car-logos/mercedes-benz-logo.png",models:[{name:"A-Klasa",years:[1997,2025]},{name:"B-Klasa",years:[2005,2025]},{name:"C-Klasa",years:[1993,2025]},{name:"E-Klasa",years:[1993,2025]},{name:"S-Klasa",years:[1972,2025]},{name:"CLA",years:[2013,2025]},{name:"CLS",years:[2004,2025]},{name:"GLA",years:[2014,2025]},{name:"GLB",years:[2019,2025]},{name:"GLC",years:[2015,2025]},{name:"GLE",years:[2015,2025]},{name:"GLS",years:[2016,2025]},{name:"G-Klasa",years:[1979,2025]},{name:"SL",years:[1954,2025]},{name:"SLC",years:[2016,2020]},{name:"AMG GT",years:[2014,2025]},{name:"EQA",years:[2021,2025]},{name:"EQC",years:[2019,2025]},{name:"EQS",years:[2021,2025]}]},{id:"audi",name:"Audi",logo:"https://www.carlogos.org/car-logos/audi-logo.png",models:[{name:"A1",years:[2010,2025]},{name:"A3",years:[1996,2025]},{name:"A4",years:[1994,2025]},{name:"A5",years:[2007,2025]},{name:"A6",years:[1994,2025]},{name:"A7",years:[2010,2025]},{name:"A8",years:[1994,2025]},{name:"Q2",years:[2016,2025]},{name:"Q3",years:[2011,2025]},{name:"Q4 e-tron",years:[2021,2025]},{name:"Q5",years:[2008,2025]},{name:"Q7",years:[2006,2025]},{name:"Q8",years:[2018,2025]},{name:"TT",years:[1998,2023]},{name:"R8",years:[2006,2025]},{name:"e-tron",years:[2018,2025]},{name:"e-tron GT",years:[2021,2025]}]},{id:"volkswagen",name:"Volkswagen",logo:"https://www.carlogos.org/car-logos/volkswagen-logo.png",models:[{name:"Golf",years:[1974,2025]},{name:"Polo",years:[1975,2025]},{name:"Passat",years:[1973,2025]},{name:"Tiguan",years:[2007,2025]},{name:"Touareg",years:[2002,2025]},{name:"T-Roc",years:[2017,2025]},{name:"T-Cross",years:[2019,2025]},{name:"Arteon",years:[2017,2025]},{name:"Jetta",years:[1979,2025]},{name:"Beetle",years:[1938,2019]},{name:"Caddy",years:[1980,2025]},{name:"Transporter",years:[1950,2025]},{name:"ID.3",years:[2020,2025]},{name:"ID.4",years:[2021,2025]},{name:"ID.5",years:[2022,2025]},{name:"ID. Buzz",years:[2022,2025]}]},{id:"toyota",name:"Toyota",logo:"https://www.carlogos.org/car-logos/toyota-logo.png",models:[{name:"Corolla",years:[1966,2025]},{name:"Camry",years:[1982,2025]},{name:"RAV4",years:[1994,2025]},{name:"Yaris",years:[1999,2025]},{name:"Aygo",years:[2005,2025]},{name:"C-HR",years:[2016,2025]},{name:"Highlander",years:[2e3,2025]},{name:"Land Cruiser",years:[1951,2025]},{name:"Prius",years:[1997,2025]},{name:"Supra",years:[1978,2025]},{name:"Avensis",years:[1997,2018]},{name:"Auris",years:[2006,2019]},{name:"bZ4X",years:[2022,2025]}]},{id:"honda",name:"Honda",logo:"https://www.carlogos.org/car-logos/honda-logo.png",models:[{name:"Civic",years:[1972,2025]},{name:"Accord",years:[1976,2025]},{name:"CR-V",years:[1995,2025]},{name:"HR-V",years:[1998,2025]},{name:"Jazz",years:[2001,2025]},{name:"e",years:[2020,2025]},{name:"ZR-V",years:[2023,2025]},{name:"Type R",years:[1997,2025]},{name:"NSX",years:[1990,2022]}]},{id:"ford",name:"Ford",logo:"https://www.carlogos.org/car-logos/ford-logo.png",models:[{name:"Fiesta",years:[1976,2023]},{name:"Focus",years:[1998,2025]},{name:"Mondeo",years:[1993,2022]},{name:"Kuga",years:[2008,2025]},{name:"Puma",years:[1997,2025]},{name:"Explorer",years:[1990,2025]},{name:"Mustang",years:[1964,2025]},{name:"Mustang Mach-E",years:[2021,2025]},{name:"Ranger",years:[1983,2025]},{name:"Transit",years:[1965,2025]},{name:"Bronco",years:[1966,2025]},{name:"F-150",years:[1948,2025]}]},{id:"nissan",name:"Nissan",logo:"https://www.carlogos.org/car-logos/nissan-logo.png",models:[{name:"Micra",years:[1982,2025]},{name:"Juke",years:[2010,2025]},{name:"Qashqai",years:[2006,2025]},{name:"X-Trail",years:[2001,2025]},{name:"Leaf",years:[2010,2025]},{name:"Ariya",years:[2022,2025]},{name:"370Z",years:[2009,2020]},{name:"GT-R",years:[2007,2025]},{name:"Navara",years:[1997,2025]}]},{id:"mazda",name:"Mazda",logo:"https://www.carlogos.org/car-logos/mazda-logo.png",models:[{name:"Mazda2",years:[2002,2025]},{name:"Mazda3",years:[2003,2025]},{name:"Mazda6",years:[2002,2025]},{name:"CX-3",years:[2015,2025]},{name:"CX-30",years:[2019,2025]},{name:"CX-5",years:[2012,2025]},{name:"CX-60",years:[2022,2025]},{name:"MX-5",years:[1989,2025]},{name:"MX-30",years:[2020,2025]}]},{id:"peugeot",name:"Peugeot",logo:"https://www.carlogos.org/car-logos/peugeot-logo.png",models:[{name:"208",years:[2012,2025]},{name:"308",years:[2007,2025]},{name:"508",years:[2011,2025]},{name:"2008",years:[2013,2025]},{name:"3008",years:[2009,2025]},{name:"5008",years:[2009,2025]},{name:"e-208",years:[2019,2025]},{name:"e-2008",years:[2020,2025]},{name:"Rifter",years:[2018,2025]}]},{id:"renault",name:"Renault",logo:"https://www.carlogos.org/car-logos/renault-logo.png",models:[{name:"Clio",years:[1990,2025]},{name:"Megane",years:[1995,2025]},{name:"Captur",years:[2013,2025]},{name:"Kadjar",years:[2015,2025]},{name:"Koleos",years:[2007,2025]},{name:"Twingo",years:[1992,2025]},{name:"Zoe",years:[2012,2025]},{name:"Arkana",years:[2021,2025]},{name:"Austral",years:[2022,2025]}]},{id:"citroen",name:"Citroën",logo:"https://www.carlogos.org/car-logos/citroen-logo.png",models:[{name:"C3",years:[2002,2025]},{name:"C4",years:[2004,2025]},{name:"C5",years:[2001,2025]},{name:"C3 Aircross",years:[2017,2025]},{name:"C5 Aircross",years:[2018,2025]},{name:"Berlingo",years:[1996,2025]},{name:"ë-C4",years:[2020,2025]}]},{id:"opel",name:"Opel",logo:"https://www.carlogos.org/car-logos/opel-logo.png",models:[{name:"Corsa",years:[1982,2025]},{name:"Astra",years:[1991,2025]},{name:"Insignia",years:[2008,2025]},{name:"Mokka",years:[2012,2025]},{name:"Crossland",years:[2017,2025]},{name:"Grandland",years:[2017,2025]},{name:"Combo",years:[1986,2025]},{name:"Zafira",years:[1999,2019]}]},{id:"skoda",name:"Škoda",logo:"https://www.carlogos.org/car-logos/skoda-logo.png",models:[{name:"Fabia",years:[1999,2025]},{name:"Scala",years:[2019,2025]},{name:"Octavia",years:[1996,2025]},{name:"Superb",years:[2001,2025]},{name:"Kamiq",years:[2019,2025]},{name:"Karoq",years:[2017,2025]},{name:"Kodiaq",years:[2016,2025]},{name:"Enyaq iV",years:[2021,2025]}]},{id:"hyundai",name:"Hyundai",logo:"https://www.carlogos.org/car-logos/hyundai-logo.png",models:[{name:"i10",years:[2007,2025]},{name:"i20",years:[2008,2025]},{name:"i30",years:[2007,2025]},{name:"Tucson",years:[2004,2025]},{name:"Santa Fe",years:[2e3,2025]},{name:"Kona",years:[2017,2025]},{name:"Ioniq",years:[2016,2025]},{name:"Ioniq 5",years:[2021,2025]},{name:"Ioniq 6",years:[2022,2025]}]},{id:"kia",name:"Kia",logo:"https://www.carlogos.org/car-logos/kia-logo.png",models:[{name:"Picanto",years:[2004,2025]},{name:"Rio",years:[2e3,2025]},{name:"Ceed",years:[2007,2025]},{name:"Stonic",years:[2017,2025]},{name:"Sportage",years:[1993,2025]},{name:"Sorento",years:[2002,2025]},{name:"Niro",years:[2016,2025]},{name:"EV6",years:[2021,2025]},{name:"EV9",years:[2023,2025]}]},{id:"volvo",name:"Volvo",logo:"https://www.carlogos.org/car-logos/volvo-logo.png",models:[{name:"V40",years:[2012,2019]},{name:"V60",years:[2010,2025]},{name:"V90",years:[2016,2025]},{name:"S60",years:[2e3,2025]},{name:"S90",years:[2016,2025]},{name:"XC40",years:[2017,2025]},{name:"XC60",years:[2008,2025]},{name:"XC90",years:[2002,2025]},{name:"C40",years:[2021,2025]},{name:"EX30",years:[2023,2025]}]},{id:"fiat",name:"Fiat",logo:"https://www.carlogos.org/car-logos/fiat-logo.png",models:[{name:"500",years:[2007,2025]},{name:"Panda",years:[1980,2025]},{name:"Tipo",years:[1988,2025]},{name:"500X",years:[2014,2025]},{name:"500L",years:[2012,2025]},{name:"Ducato",years:[1981,2025]}]},{id:"alfa-romeo",name:"Alfa Romeo",logo:"https://www.carlogos.org/car-logos/alfa-romeo-logo.png",models:[{name:"Giulia",years:[2016,2025]},{name:"Stelvio",years:[2017,2025]},{name:"Tonale",years:[2022,2025]},{name:"Giulietta",years:[2010,2020]},{name:"MiTo",years:[2008,2018]}]},{id:"jeep",name:"Jeep",logo:"https://www.carlogos.org/car-logos/jeep-logo.png",models:[{name:"Renegade",years:[2014,2025]},{name:"Compass",years:[2006,2025]},{name:"Cherokee",years:[1974,2025]},{name:"Grand Cherokee",years:[1992,2025]},{name:"Wrangler",years:[1986,2025]},{name:"Gladiator",years:[2019,2025]},{name:"Avenger",years:[2023,2025]}]},{id:"land-rover",name:"Land Rover",logo:"https://www.carlogos.org/car-logos/land-rover-logo.png",models:[{name:"Defender",years:[1983,2025]},{name:"Discovery",years:[1989,2025]},{name:"Discovery Sport",years:[2014,2025]},{name:"Range Rover",years:[1970,2025]},{name:"Range Rover Sport",years:[2005,2025]},{name:"Range Rover Evoque",years:[2011,2025]},{name:"Range Rover Velar",years:[2017,2025]}]},{id:"mini",name:"Mini",logo:"https://www.carlogos.org/car-logos/mini-logo.png",models:[{name:"Cooper",years:[2001,2025]},{name:"Clubman",years:[2007,2025]},{name:"Countryman",years:[2010,2025]},{name:"Paceman",years:[2012,2016]},{name:"Electric",years:[2020,2025]}]},{id:"porsche",name:"Porsche",logo:"https://www.carlogos.org/car-logos/porsche-logo.png",models:[{name:"911",years:[1963,2025]},{name:"Cayenne",years:[2002,2025]},{name:"Macan",years:[2014,2025]},{name:"Panamera",years:[2009,2025]},{name:"Taycan",years:[2019,2025]},{name:"Boxster",years:[1996,2025]},{name:"Cayman",years:[2005,2025]}]},{id:"tesla",name:"Tesla",logo:"https://www.carlogos.org/car-logos/tesla-logo.png",models:[{name:"Model S",years:[2012,2025]},{name:"Model 3",years:[2017,2025]},{name:"Model X",years:[2015,2025]},{name:"Model Y",years:[2020,2025]},{name:"Cybertruck",years:[2023,2025]}]},{id:"lexus",name:"Lexus",logo:"https://www.carlogos.org/car-logos/lexus-logo.png",models:[{name:"CT",years:[2011,2025]},{name:"IS",years:[1999,2025]},{name:"ES",years:[1989,2025]},{name:"LS",years:[1989,2025]},{name:"NX",years:[2014,2025]},{name:"RX",years:[1998,2025]},{name:"UX",years:[2018,2025]}]},{id:"subaru",name:"Subaru",logo:"https://www.carlogos.org/car-logos/subaru-logo.png",models:[{name:"Impreza",years:[1992,2025]},{name:"Forester",years:[1997,2025]},{name:"Outback",years:[1994,2025]},{name:"XV",years:[2012,2025]},{name:"Levorg",years:[2014,2025]},{name:"BRZ",years:[2012,2025]},{name:"Solterra",years:[2022,2025]}]}];function Yi(r){const[e,t]=r.years,s=[];for(let a=t;a>=e;a--)s.push(a);return s}function Zi(r){if(!r)return ct;const e=r.toLowerCase();return ct.filter(t=>t.name.toLowerCase().includes(e))}function Qi({serviceId:r,onNext:e,onBack:t,initialData:s={}}){var x;const a=document.createElement("div");a.className="booking-step step-vehicle-info";const n=T.services.find(k=>k.id===r)||((x=T.bundles)==null?void 0:x.find(k=>k.id===r)),i=k=>(n==null?void 0:n.id)===k||(n==null?void 0:n.includes)&&n.includes.includes(k),o=(n==null?void 0:n.id)==="pojasevi",l=(n==null?void 0:n.id)==="zvjezdano-nebo",c=i("mapiranje");let d={stage:"brand",selectedBrand:s.marka?ct.find(k=>k.name===s.marka):null,selectedModel:s.model||null,selectedYear:s.godina||null,searchQuery:"",isManualEntry:!1};d.selectedBrand&&d.selectedModel&&d.selectedYear&&(d.stage="details");function u(){a.innerHTML=`
            <h2 class="step-title">
                <span class="heading-top">KORAK 2</span>
                <span class="heading-bottom">Podaci o Vozilu</span>
            </h2>
            
            <div class="vehicle-selection-container glass">
                ${p()}
                ${h()}
            </div>
        `,y()}function p(){const k=[];return d.selectedBrand&&k.push(`<span class="breadcrumb-item">${d.selectedBrand.name}</span>`),d.selectedModel&&k.push(`<span class="breadcrumb-item">${d.selectedModel}</span>`),d.selectedYear&&k.push(`<span class="breadcrumb-item">${d.selectedYear}</span>`),k.length===0?"":`
            <div class="breadcrumb">
                ${k.join('<span class="breadcrumb-separator">›</span>')}
            </div>
        `}function h(){switch(d.stage){case"brand":return f();case"model":return g();case"year":return v();case"manual":return m();case"details":return _();default:return""}}function f(){const k=Zi(d.searchQuery);return`
            <div class="selection-stage">
                <div class="search-container">
                    <input 
                        type="text" 
                        class="search-input input" 
                        placeholder="Pretraži marku vozila..." 
                        value="${d.searchQuery}"
                        id="brand-search"
                    />
                </div>

                <div class="brands-grid">
                    ${k.map(w=>`
                        <div class="brand-card" data-brand-id="${w.id}">
                            <div class="brand-logo">
                                <img src="${w.logo}" alt="${w.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                                <div class="brand-fallback" style="display:none;">${w.name.charAt(0)}</div>
                            </div>
                            <div class="brand-name">${w.name}</div>
                        </div>
                    `).join("")}
                    
                    ${k.length>0?`
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

                ${k.length===0?`
                    <div class="no-results">
                        <p>Nema rezultata za "${d.searchQuery}"</p>
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
        `}function g(){return`
            <div class="selection-stage">
                <button class="back-to-stage-btn" id="back-to-brand">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    Promijeni marku
                </button>

                <h3 class="stage-title">Odaberi model</h3>

                <div class="models-grid">
                    ${d.selectedBrand.models.map(w=>`
                        <div class="model-card" data-model-name="${w.name}">
                            <div class="model-name">${w.name}</div>
                            <div class="model-years">${w.years[0]} - ${w.years[1]}</div>
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
        `}function v(){const k=d.selectedBrand.models.find(b=>b.name===d.selectedModel);return`
            <div class="selection-stage">
                <button class="back-to-stage-btn" id="back-to-model">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    Promijeni model
                </button>

                <h3 class="stage-title">Odaberi godinu</h3>

                <div class="years-grid">
                    ${Yi(k).map(b=>`
                        <div class="year-card" data-year="${b}">
                            ${b}
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
        `}function m(){var k;return`
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
                            value="${((k=d.selectedBrand)==null?void 0:k.name)||""}"
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
                            value="${d.selectedModel||""}"
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
                            value="${d.selectedYear||""}"
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
        `}function _(){return`
            <div class="selection-stage">
                <button class="back-to-stage-btn" id="back-to-year">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    Promijeni godinu
                </button>

                <div class="selected-vehicle-summary">
                    <h3>Odabrano vozilo</h3>
                    <p class="vehicle-info">${d.selectedBrand.name} ${d.selectedModel} (${d.selectedYear})</p>
                </div>

                <form class="details-form" id="details-form">
                    ${o?`
                        <div class="form-group">
                            <label class="form-label">Broj pojaseva</label>
                            <select class="input" name="brojPojaseva" id="broj-pojaseva" required>
                                <option value="">Odaberi...</option>
                                ${[1,2,3,4,5,6,7].map(k=>`<option value="${k}" ${s.brojPojaseva==k?"selected":""}>${k}</option>`).join("")}
                            </select>
                            <div id="seatbelt-warning" style="visibility: hidden; margin-top: 10px; font-size: 0.9rem; color: #fbbf24; border: 1px solid rgba(251, 191, 36, 0.3); background: rgba(251, 191, 36, 0.1); padding: 10px; border-radius: 4px;">
                                Ne preporučujemo ugradnju manje od 4 pojasa zbog zakonskih regulativa.
                            </div>
                        </div>

                        <div class="checkbox-wrapper">
                            <input type="checkbox" class="checkbox" id="vlastiti-pojasevi" name="vlastitiPojasevi" ${s.vlastitiPojasevi?"checked":""}>
                            <label for="vlastiti-pojasevi">Nosim vlastite pojaseve / rastavljeni sustav</label>
                        </div>
                    `:""}

                    ${l?`
                        <div class="form-group">
                            <label class="form-label">Broj zvjezdica</label>
                            <select class="input" name="brojZvjezdica" required>
                                <option value="">Odaberi...</option>
                                ${[500,600,700,750,800,900,1e3].map(k=>`
                                    <option value="${k}" ${s.brojZvjezdica==k?"selected":""}>${k}</option>
                                `).join("")}
                            </select>
                        </div>
                    `:""}

                    ${c?`
                        <div class="form-group">
                            <label class="form-label">Broj šasije (VIN)</label>
                            <input type="text" class="input" name="vinBroj" placeholder="Unesite broj šasije" required value="${s.vinBroj||""}">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Slika verzije softvera</label>
                            <input type="file" class="input" name="softverSlika" accept="image/*" ${s.softverSlika?"":"required"}>
                            <p style="font-size:0.8rem; color:var(--text-secondary); margin-top:5px;">Molimo učitajte sliku trenutne verzije softvera.</p>
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
        `}function y(){const k=a.querySelector("#brand-search");k&&k.addEventListener("input",N=>{d.searchQuery=N.target.value,u()}),a.querySelectorAll(".brand-card:not(.brand-card-other)").forEach(N=>{N.addEventListener("click",()=>{const V=N.dataset.brandId;d.selectedBrand=ct.find(re=>re.id===V),d.stage="model",u()})});const b=a.querySelector("#other-brand-btn");b&&b.addEventListener("click",()=>{d.stage="manual",d.isManualEntry=!0,u()});const O=a.querySelector("#other-brand-btn-no-results");O&&O.addEventListener("click",()=>{d.stage="manual",d.isManualEntry=!0,u()}),a.querySelectorAll(".model-card").forEach(N=>{N.addEventListener("click",()=>{d.selectedModel=N.dataset.modelName,d.stage="year",u()})}),a.querySelectorAll(".year-card").forEach(N=>{N.addEventListener("click",()=>{d.selectedYear=N.dataset.year,d.stage="details",u()})});const q=a.querySelector("#back-to-brand");q&&q.addEventListener("click",()=>{d.stage="brand",d.selectedBrand=null,d.selectedModel=null,d.selectedYear=null,u()});const I=a.querySelector("#back-to-model");I&&I.addEventListener("click",()=>{d.stage="model",d.selectedModel=null,d.selectedYear=null,u()});const D=a.querySelector("#back-to-year");D&&D.addEventListener("click",()=>{d.stage="year",d.selectedYear=null,u()});const te=a.querySelector("#back-to-brand-from-manual");te&&te.addEventListener("click",()=>{d.stage="brand",d.isManualEntry=!1,u()});const B=a.querySelector("#manual-entry-form");B&&B.addEventListener("submit",N=>{N.preventDefault();const V=new FormData(B),re=Object.fromEntries(V.entries());d.selectedBrand={name:re.marka},d.selectedModel=re.model,d.selectedYear=re.godina,d.isManualEntry=!0,d.stage="details",u()});const A=a.querySelector("#details-form");if(A){const N=A.querySelector("#broj-pojaseva");if(N){const V=A.querySelector("#seatbelt-warning"),re=()=>{const ne=parseInt(N.value);ne>0&&ne<4?V.style.visibility="visible":V.style.visibility="hidden"};N.addEventListener("change",re),re()}A.addEventListener("submit",V=>{var Zt;V.preventDefault();const re=new FormData(A),ne=Object.fromEntries(re.entries());ne.marka=d.selectedBrand.name,ne.model=d.selectedModel,ne.godina=d.selectedYear,ne.vlastitiPojasevi=((Zt=A.querySelector("#vlastiti-pojasevi"))==null?void 0:Zt.checked)||!1,e(ne)})}const me=a.querySelector("#back-btn");me&&me.addEventListener("click",()=>{d.stage==="brand"?t():(d.stage==="model"?(d.stage="brand",d.selectedBrand=null):d.stage==="year"?(d.stage="model",d.selectedModel=null):d.stage==="details"&&(d.stage="year",d.selectedYear=null),u())})}return u(),a}const na=document.createElement("style");na.textContent=`
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
`;document.head.appendChild(na);function Xi({onNext:r,onBack:e,initialData:t={}}){const s=document.createElement("div");s.className="booking-step step-calendar";const a=new Date;let n=a.getMonth(),i=a.getFullYear(),o=t.date||null,l=t.time||null;s.innerHTML=`
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
  `;const c=async()=>{const u=["Siječanj","Veljača","Ožujak","Travanj","Svibanj","Lipanj","Srpanj","Kolovoz","Rujan","Listopad","Studeni","Prosinac"];s.querySelector("#calendar-month").textContent=`${u[n]} ${i}`;const p=new Date(i,n,1),f=new Date(i,n+1,0).getDate(),g=p.getDay()===0?6:p.getDay()-1,v=await T.getCalendarAvailability(i,n),m=s.querySelector("#calendar-days");m.innerHTML="";for(let w=0;w<g;w++){const b=document.createElement("div");b.className="calendar-day empty",m.appendChild(b)}const _=new Date;_.setHours(_.getHours()+24);const y=t.serviceId==="zvjezdano-nebo",x=t.serviceId==="platinum-paket",k=y||x;for(let w=1;w<=f;w++){const b=new Date(i,n,w),O=new Date(b);O.setHours(23,59,59);const C=O<_,J=v[w]||{status:"unavailable",count:0};let q=J.status;const I=document.createElement("button");let D=q==="unavailable";k&&J.count>0&&(D=!0,q="unavailable"),I.className=`calendar-day ${q} ${C?"past":""}`,I.textContent=w,I.disabled=C||D,I.disabled||I.addEventListener("click",()=>{o=`${i}-${String(n+1).padStart(2,"0")}-${String(w).padStart(2,"0")}`,m.querySelectorAll(".calendar-day").forEach(te=>te.classList.remove("selected")),I.classList.add("selected"),d(o)}),m.appendChild(I)}},d=async u=>{const p=s.querySelector("#time-slots"),h=s.querySelector("#time-slots-grid"),f=await T.getTimeSlots(u),g=new Date;g.setHours(g.getHours()+24),h.innerHTML=f.map(v=>{const[m,_]=v.time.split(":"),y=new Date(u);y.setHours(parseInt(m),parseInt(_));const x=y<g,k=!v.available||x;return`
      <button class="time-slot ${k?"disabled":""}" 
              data-time="${v.time}" 
              ${k?"disabled":""}>
        ${v.time}
      </button>
    `}).join(""),p.classList.remove("hidden"),h.querySelectorAll(".time-slot").forEach(v=>{v.addEventListener("click",()=>{l=v.dataset.time,h.querySelectorAll(".time-slot").forEach(m=>m.classList.remove("selected")),v.classList.add("selected"),s.querySelector("#next-btn").disabled=!1})})};return s.querySelector("#prev-month").addEventListener("click",()=>{n--,n<0&&(n=11,i--),c()}),s.querySelector("#next-month").addEventListener("click",()=>{n++,n>11&&(n=0,i++),c()}),s.querySelector("#back-btn").addEventListener("click",e),s.querySelector("#next-btn").addEventListener("click",()=>{o&&l&&r({date:o,time:l})}),c(),s}const ia=document.createElement("style");ia.textContent=`
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
        max-width: 100%;
    }
    
    .calendar-weekdays {
        font-size: 0.65rem;
        gap: 1px;
        margin-bottom: var(--spacing-sm);
    }
    
    .calendar-days {
        gap: 2px;
    }
    
    .calendar-day {
        font-size: 0.75rem;
        border-width: 1px;
        aspect-ratio: 1; /* Keep square */
        height: auto;
    }
    
    .calendar-legend {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        gap: var(--spacing-sm);
        font-size: 0.7rem;
        padding-top: var(--spacing-md);
    }
    
    .time-slots-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--spacing-sm);
    }
    
    .time-slot {
        font-size: 0.85rem;
        padding: 6px 10px;
    }
    
    .time-slots-title {
        font-size: 1.1rem;
        margin-bottom: var(--spacing-md);
    }
  }
`;document.head.appendChild(ia);function eo({onNext:r,onBack:e,initialData:t={}}){const s=document.createElement("div");s.className="booking-step step-customer-info",s.innerHTML=`
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
        <label class="form-label">Telefon</label>
        <input type="tel" class="input" name="telefon" required placeholder="+385 91 123 4567" pattern="^\\+[0-9\\s]{9,}$" title="Unesite broj u formatu +385..." value="${t.telefon||""}">
      </div>

      <div class="form-group">
        <label class="form-label">Registracija vozila</label>
        <input type="text" class="input" name="registracija" required placeholder="ZG-1234-AB" value="${t.registracija||""}">
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
  `;const a=s.querySelector("#customer-form");return a.addEventListener("submit",n=>{n.preventDefault();const i=new FormData(a),o=Object.fromEntries(i.entries());if(o.telefon=o.telefon.replace(/\s/g,""),!o.telefon.startsWith("+")){alert("Molimo unesite broj telefona s pozivnim brojem (npr. +385...)");return}o.whatsappPodsjetnik=!0,o.emailPodsjetnik=!0,r(o)}),s.querySelector("#back-btn").addEventListener("click",e),s}const oa=document.createElement("style");oa.textContent=`
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
`;document.head.appendChild(oa);function to({bookingData:r,onNext:e,onBack:t}){var u;const s=document.createElement("div");s.className="booking-step step-review";const a=T.services.find(p=>p.id===r.serviceId)||((u=T.bundles)==null?void 0:u.find(p=>p.id===r.serviceId));let n=null;if(a.id==="pojasevi"&&r.brojPojaseva){const p=a.price||69,h=a.price_disassembled||39,f=r.vlastitiPojasevi?h:p;n=parseInt(r.brojPojaseva)*f}else if(a.id==="zvjezdano-nebo"&&r.brojZvjezdica){const p=a.price_per_star||1.19;n=parseInt(r.brojZvjezdica)*p}else a.price&&(n=a.price);r.totalPrice=n;const o=new Date(r.date).toLocaleDateString("hr-HR",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),c=parseInt(r.time.split(":")[0])<13?"Jutro":"Popodne";s.innerHTML=`
    <h2 class="step-title">
      <span class="heading-top">KORAK 5</span>
      <span class="heading-bottom">Pregled Rezervacije</span>
    </h2>
    
    <div class="review-container glass">
      <div class="review-section">
        <h3 class="review-section-title">Usluga</h3>
        <div class="review-item">
          <span class="review-icon">${a.icon}</span>
          <span class="review-value">${a.name}</span>
        </div>
        ${n!==null?`
        <div class="review-item" style="margin-top: 10px;">
          <span class="review-label">Cijena:</span>
          <span class="review-value" style="font-size: 1.2rem; font-weight: bold; color: var(--color-accent);">
            ${n.toFixed(2)} €
          </span>
        </div>
        `:""}
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
          <span class="review-value">${o}</span>
        </div>
        <div class="review-item">
          <span class="review-label">Vrijeme:</span>
          <span class="review-value">${r.time}</span>
        </div>
        <div class="review-item">
          <span class="review-label">Period:</span>
          <span class="review-value">${c}</span>
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
              ${r.whatsappPodsjetnik?"SMS":""}
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

      <div class="review-terms-wrapper" style="text-align: center; margin-bottom: var(--spacing-lg);">
        <label style="display: inline-flex; align-items: center; gap: 8px; cursor: pointer; color: var(--color-text-muted);">
            <input type="checkbox" id="terms-check" style="width: 18px; height: 18px; accent-color: var(--color-accent);">
            <span>
                Slanjem potvrđuješ <a href="/uvjeti-poslovanja" target="_blank" style="color: var(--color-accent); text-decoration: underline;">uvjete usluge</a>.
            </span>
        </label>
      </div>

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
  `,s.querySelector("#back-btn").addEventListener("click",t);const d=s.querySelector("#terms-check");return s.querySelector("#confirm-btn").addEventListener("click",()=>{if(!d.checked){alert("Molimo potvrdite uvjete usluge prije nastavka.");return}e()}),s}const la=document.createElement("style");la.textContent=`
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
    
    .review-item {
        flex-wrap: wrap; 
        gap: 4px;
        align-items: flex-start;
        margin-bottom: var(--spacing-sm);
    }
    
    .review-label {
        font-size: 0.85rem;
        min-width: 80px;
        flex-shrink: 0;
    }

    .review-value {
        font-size: 0.9rem;
        word-break: break-word; /* Ensure long emails wrap */
        flex: 1;
    }

    .review-section {
        padding-bottom: var(--spacing-sm);
    }
  }
`;document.head.appendChild(la);function ro({bookingData:r}){const e=document.createElement("div");e.className="booking-step step-success";const s=new Date(r.date).toLocaleDateString("hr-HR",{weekday:"long",day:"numeric",month:"long",year:"numeric"}),n=parseInt(r.time.split(":")[0])<13?"jutro":"popodne";return e.innerHTML=`
    <div class="success-content">
      <div class="success-icon">
        <svg class="icon-xl" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </div>
      
      <h1 class="success-title">
        <span class="heading-top">rezervirano!</span>
        <span class="heading-bottom">Rezervacija Zaprimljena</span>
      </h1>
      
      <div class="success-message glass">
        <p class="success-text">
          Hvala! Vaš termin je rezerviran za <strong>${s}</strong> u <strong>${n}</strong>.
        </p>
        <p class="success-text">
          Poslat ćemo vam potvrdu na <strong>Email</strong> i <strong>SMS</strong> čim odobrimo rezervaciju.
        </p>
        <p class="success-text" style="font-size: 0.9rem; color: var(--color-text-muted);">
          Ako nešto ne bude u redu, kontaktirat ćemo vas.
        </p>
        ${r.totalPrice?`
        <p class="success-text" style="font-size: 1.4rem; margin-top: 15px;">
            Ukupna cijena: <strong>${r.totalPrice.toFixed(2)} €</strong>
        </p>
        `:""}
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
  `,e.querySelector("#home-btn").addEventListener("click",()=>{$.navigate("/")}),e}const ca=document.createElement("style");ca.textContent=`
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
`;document.head.appendChild(ca);function so(r={}){const e=document.createElement("div");e.className="page-booking",e.appendChild(Ut());const t=document.createElement("main");t.className="booking-main";const s=document.createElement("div");s.className="booking-container";let a=1,n={serviceId:r.serviceId||null,...r};const i=()=>{s.innerHTML="",a<6&&s.appendChild(Ki({currentStep:a,totalSteps:6}));const o=document.createElement("div");o.className=a===6?"":"booking-card glass";let l;switch(a){case 1:n.serviceId?l=Ji({serviceId:n.serviceId,onNext:c=>{Object.assign(n,c),a=2,i()},onBack:()=>{n.serviceId=null,i()}}):l=Wi({onNext:c=>{Object.assign(n,c),i()},selectedServiceId:n.serviceId});break;case 2:l=Qi({serviceId:n.serviceId,onNext:c=>{Object.assign(n,c),a=3,i()},onBack:()=>{a=1,i()},initialData:n});break;case 3:l=Xi({onNext:c=>{Object.assign(n,c),a=4,i()},onBack:()=>{a=2,i()},initialData:n});break;case 4:l=eo({onNext:c=>{Object.assign(n,c),a=5,i()},onBack:()=>{a=3,i()},initialData:n});break;case 5:l=to({bookingData:n,onNext:async()=>{var c,d,u;try{const p={service_id:n.serviceId,service_name:n.serviceName||((c=T.services.find(f=>f.id===n.serviceId))==null?void 0:c.name)||((u=(d=T.bundles)==null?void 0:d.find(f=>f.id===n.serviceId))==null?void 0:u.name),marka:n.marka,model:n.model,godina:n.godina,broj_pojaseva:n.brojPojaseva,vlastiti_pojasevi:n.vlastitiPojasevi,broj_zvjezdica:n.brojZvjezdica,vinBroj:n.vinBroj,softverSlika:n.softverSlika,napomena:n.napomena,appointment_date:n.date,appointment_time:n.time,ime:n.imePrezime?n.imePrezime.trim().split(" ")[0]:"",prezime:n.imePrezime&&n.imePrezime.trim().indexOf(" ")>-1?n.imePrezime.trim().split(" ").slice(1).join(" "):n.imePrezime||"",email:n.email,telefon:n.telefon,adresa:n.adresa,is_manual_entry:n.isManualEntry||!1},h=await T.saveBooking(p);n.date=h.appointment_date,n.time=h.appointment_time,a=6,i()}catch(p){console.error("Failed to save booking:",p),alert("Došlo je do greške pri spremanju rezervacije. Molimo pokušajte ponovno.")}},onBack:()=>{a=4,i()}});break;case 6:l=ro({bookingData:n});break}l&&(o.appendChild(l),s.appendChild(o))};return i(),t.appendChild(s),e.appendChild(t),e.appendChild(qt()),e}const da=document.createElement("style");da.textContent=`
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
`;document.head.appendChild(da);const Te={async login(r,e){var t,s;try{const{data:a,error:n}=await Q.auth.signInWithPassword({email:r,password:e});if(n)throw n;if(!(((s=(t=a.user)==null?void 0:t.user_metadata)==null?void 0:s.role)==="admin"))throw await this.logout(),new Error("Unauthorized: Admin access required");return{user:a.user,session:a.session,error:null}}catch(a){return console.error("Login error:",a),{user:null,session:null,error:a}}},async logout(){try{const{error:r}=await Q.auth.signOut();if(r)throw r;return{error:null}}catch(r){return console.error("Logout error:",r),{error:r}}},async resetPassword(r){try{const{error:e}=await Q.auth.resetPasswordForEmail(r,{redirectTo:`${window.location.origin}/admin/reset-password`});if(e)throw e;return{error:null}}catch(e){return console.error("Password reset error:",e),{error:e}}},async updatePassword(r){try{const{error:e}=await Q.auth.updateUser({password:r});if(e)throw e;return{error:null}}catch(e){return console.error("Update password error:",e),{error:e}}},async getCurrentUser(){try{const{data:{user:r},error:e}=await Q.auth.getUser();if(e)throw e;return{user:r,error:null}}catch(r){return console.error("Get user error:",r),{user:null,error:r}}},async isAuthenticated(){var r;try{const{data:{session:e}}=await Q.auth.getSession();if(!e)return!1;const{user:t}=await this.getCurrentUser();return((r=t==null?void 0:t.user_metadata)==null?void 0:r.role)==="admin"}catch(e){return console.error("Auth check error:",e),!1}},async createAdmin(r,e){try{const{data:t,error:s}=await Q.rpc("create_admin_user",{new_email:r,new_password:e});if(s)throw s;return{user:t,error:null}}catch(t){return console.error("Create admin error:",t),{user:null,error:t}}},async listAdmins(){try{const{data:r,error:e}=await Q.rpc("get_admins");if(e)throw e;return{admins:r,error:null}}catch(r){return console.error("List admins error:",r),{admins:[],error:r}}},async deleteAdmin(r){try{const{error:e}=await Q.rpc("delete_admin_user",{target_user_id:r});if(e)throw e;return{success:!0,error:null}}catch(e){return console.error("Delete admin error:",e),{success:!1,error:e}}},onAuthStateChange(r){return Q.auth.onAuthStateChange(r)}};function ao(){const r=document.createElement("div");r.className="page-admin";let e="dashboard";const t=()=>{r.innerHTML="",r.innerHTML=`
      <!-- Mobile Header -->
      <header class="mobile-header">
        <div class="admin-logo-mobile">
            <img src="/images/logo.png" alt="Admin" style="height: 32px; width: auto;">
        </div>
        <button id="mobile-menu-toggle" class="mobile-menu-btn">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
        </button>
      </header>

      <div class="admin-layout">
        <aside class="admin-sidebar glass" id="admin-sidebar">
          <div class="admin-logo">
            <img src="/images/logo.png" alt="Admin" class="admin-logo-img">
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

            <button class="admin-nav-item ${e==="services"?"active":""}" data-view="services">
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 11H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7c0-1.1-.9-2-2-2zm0 9H5v-7h14v7zM7 15h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zM19 2H5c-1.1 0-2 .9-2 2v5h18V4c0-1.1-.9-2-2-2zm-7 6c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
              </svg>
              <span>Usluge</span>
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
    `,r.querySelector(".admin-logout").addEventListener("click",async()=>{await Te.logout(),$.navigate("/admin/login")});const c=r.querySelector("#mobile-menu-toggle"),d=r.querySelector("#admin-sidebar");c&&c.addEventListener("click",()=>{d.classList.toggle("open")});const u=r.querySelectorAll(".admin-nav-item"),p=r.querySelector(".admin-content");u.forEach(f=>{f.addEventListener("click",()=>{window.innerWidth<=1024&&d.classList.remove("open")})});function h(f){u.forEach(g=>{g.dataset.view===f?g.classList.add("active"):g.classList.remove("active")}),p.innerHTML="",f==="dashboard"?p.appendChild(s()):f==="reservations"?p.appendChild(n()):f==="services"?p.appendChild(i()):f==="reviews"?p.appendChild(o()):f==="calendar"?p.appendChild(a()):f==="settings"?p.appendChild(l()):p.innerHTML=`
    <div class="glass" style="padding: var(--spacing-2xl); text-align: center;">
          <h2>${f.charAt(0).toUpperCase()+f.slice(1)}</h2>
          <p style="margin-top: var(--spacing-md); color: var(--color-text-muted);">
            Ova sekcija je u razvoju.
          </p>
        </div>
    `}return u.forEach(f=>{f.addEventListener("click",()=>{e=f.dataset.view,h(f.dataset.view)})}),setTimeout(()=>{h("dashboard")},0),r};function s(){const c=document.createElement("div");return c.innerHTML=`
    <h1 class="admin-title">Dashboard</h1>

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
  `,T.getReservations().then(d=>{const u=new Date().toISOString().split("T")[0],p=d.filter(h=>h.appointment_date===u).length;c.querySelector("#today-count").textContent=p,c.querySelector("#total-count").textContent=d.length}).catch(d=>{console.error("Error loading dashboard data:",d),c.querySelector("#today-count").textContent="0",c.querySelector("#total-count").textContent="0"}),c.querySelector("#reviews-count").textContent=T.reviews.length,c}function a(){const c=document.createElement("div"),d=new Date;let u=d.getMonth(),p=d.getFullYear();c.innerHTML=`
    <h1 class="admin-title">Kalendar Rezervacija</h1>
      <div class="glass" style="padding: var(--spacing-xl); max-width: 700px; margin: 0 auto;">
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

      <!--Day Details Modal-->
      <div id="day-modal" class="glass" style="display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 90%; max-width: 500px; padding: var(--spacing-xl); z-index: 1000; max-height: 80vh; overflow-y: auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-lg);">
          <h3 id="modal-date" style="margin: 0;"></h3>
          <button id="close-day-modal" style="background: none; border: none; color: white; cursor: pointer;">✕</button>
        </div>
        <div id="day-reservations-list"></div>
      </div>
      <div id="day-modal-overlay" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 999;"></div>
  `;const h=c.querySelector("#day-modal"),f=c.querySelector("#day-modal-overlay"),g=()=>{h.style.display="none",f.style.display="none"};c.querySelector("#close-day-modal").onclick=g,f.onclick=g;const v=async()=>{const w=["Siječanj","Veljača","Ožujak","Travanj","Svibanj","Lipanj","Srpanj","Kolovoz","Rujan","Listopad","Studeni","Prosinac"];c.querySelector("#calendar-month").textContent=`${w[u]} ${p}`;const b=await T.getCalendarAvailability(p,u),O=c.querySelector("#calendar-days");O.innerHTML="";const C=new Date(p,u,1),q=new Date(p,u+1,0).getDate(),I=C.getDay()===0?6:C.getDay()-1;for(let D=0;D<I;D++)O.appendChild(document.createElement("div"));for(let D=1;D<=q;D++){const te=`${p}-${String(u+1).padStart(2,"0")}-${String(D).padStart(2,"0")}`,B=b[D]||{status:"unavailable",count:0},A=document.createElement("button");A.className="calendar-day",A.style.aspectRatio="1",A.style.border="1px solid rgba(255,255,255,0.1)",A.style.background="rgba(255,255,255,0.05)",A.style.color="white",A.style.cursor="pointer",A.style.display="flex",A.style.flexDirection="column",A.style.alignItems="center",A.style.justifyContent="center",A.style.padding="4px",B.status==="unavailable"?A.style.borderColor="#ef4444":B.status==="almost-full"?A.style.borderColor="#eab308":A.style.borderColor="#22c55e",A.innerHTML=`
    <span style="font-weight: bold; font-size: 1.2rem; line-height: 1;">${D}</span>
    ${B.count>0?`
        <span style="
            font-size: 0.7rem; 
            margin-top: 4px; 
            color: #4ade80; 
            font-weight: 600;
            text-transform: uppercase;
        ">${B.count} REZ.</span>
    `:""}
  `,A.onclick=async()=>{const me=await T.getReservationsByDate(te);c.querySelector("#modal-date").textContent=new Date(te).toLocaleDateString("hr-HR");const N=c.querySelector("#day-reservations-list");me.length===0?N.innerHTML="<p>Nema rezervacija za ovaj dan.</p>":N.innerHTML=me.map(V=>`
    <div style="background: rgba(255,255,255,0.05); padding: 10px; margin-bottom: 10px; border-radius: 4px; border-left: 3px solid ${V.status==="confirmed"?"#10b981":V.status==="cancelled"?"#ef4444":"#fbbf24"}">
                            <div style="font-weight: bold;">${V.appointment_time} - ${V.ime} ${V.prezime}</div>
                            <div style="font-size: 0.9rem; color: #aaa;">${V.service_name}</div>
                            <div style="font-size: 0.8rem;">Status: ${V.status}</div>
                        </div>
    `).join(""),h.style.display="block",f.style.display="block"},O.appendChild(A)}};c.querySelector("#prev-month").addEventListener("click",()=>{u--,u<0&&(u=11,p--),v()}),c.querySelector("#next-month").addEventListener("click",()=>{u++,u>11&&(u=0,p++),v()}),v();const m=document.createElement("div");m.className="glass",m.style.padding="var(--spacing-lg)",m.style.marginTop="var(--spacing-xl)",m.innerHTML=`
        <h3 class="settings-title" style="margin-bottom: var(--spacing-md);">Upravljanje Neradnim Danima</h3>
        <div style="display: flex; gap: var(--spacing-md); margin-bottom: var(--spacing-lg); align-items: center; flex-wrap: wrap;">
            <input type="date" id="closed-date-input" class="input" style="width: auto;">
            <button id="add-closed-btn" class="btn btn-secondary" style="background: var(--color-accent); border: none; color: white;">Zatvori Dan</button>
        </div>
        <div id="closed-days-list" style="display: flex; flex-wrap: wrap; gap: var(--spacing-sm);">
            <span style="color: var(--color-text-muted);">Učitavanje...</span>
        </div>
    `,c.appendChild(m);const _=m.querySelector("#closed-date-input"),y=m.querySelector("#add-closed-btn"),x=m.querySelector("#closed-days-list"),k=async()=>{x.innerHTML='<span style="color: var(--color-text-muted);">Učitavanje...</span>';try{const w=await T.getClosedDays();if(!w||w.length===0){x.innerHTML='<span style="color: var(--color-text-muted);">Nema zatvorenih dana.</span>';return}x.innerHTML=w.map(b=>`
                <div style="background: rgba(255, 0, 0, 0.1); border: 1px solid rgba(255, 0, 0, 0.3); padding: 5px 10px; border-radius: 4px; display: flex; align-items: center; gap: 8px;">
                    <span>${new Date(b.date).toLocaleDateString()}</span>
                    <button class="remove-closed-btn" data-id="${b.id}" style="background: none; border: none; color: var(--color-text); cursor: pointer; font-size: 1.1rem;">&times;</button>
                </div>
            `).join(""),x.querySelectorAll(".remove-closed-btn").forEach(b=>{b.addEventListener("click",async()=>{confirm("Otvoriti ovaj dan?")&&(await T.removeClosedDay(b.dataset.id),k())})})}catch(w){console.error(w),x.innerHTML="Greška."}};return y.addEventListener("click",async()=>{const w=_.value;if(!w)return alert("Odaberite datum");try{await T.addClosedDay(w),_.value="",k()}catch(b){alert(b.message)}}),k(),c}function n(){const c=document.createElement("div");let d="all";c.innerHTML=`
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-lg); flex-wrap: wrap; gap: 10px;">
      <h1 class="admin-title" style="margin: 0;">Rezervacije</h1>
      <div id="status-filter-container" class="filter-pills" style="display: flex; gap: 5px; flex-wrap: wrap;">
        <button class="filter-pill active" data-value="all">Sve</button>
        <button class="filter-pill" data-value="pending">Na čekanju</button>
        <button class="filter-pill" data-value="confirmed">Potrđeno</button>
        <button class="filter-pill" data-value="completed">Završeno</button>
        <button class="filter-pill" data-value="cancelled">Otkazano</button>
      </div>
    </div>
    
    <div class="table-container glass" style="overflow-x: auto;">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Klijent</th>
            <th class="hide-mobile">Vozilo</th>
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

    <!--Reservation Details Modal-->
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
  `;const u=c.querySelector("#reservations-tbody"),p=c.querySelector("#reservation-modal"),h=c.querySelector("#modal-overlay"),f=c.querySelector("#modal-content"),g=c.querySelector("#modal-actions"),v=c.querySelector("#close-modal-btn"),m=()=>{p.style.display="none",h.style.display="none"};v.addEventListener("click",m),h.addEventListener("click",m);const _=c.querySelectorAll(".filter-pill");_.forEach(w=>{w.addEventListener("click",()=>{d=w.dataset.value,_.forEach(b=>b.classList.remove("active")),w.classList.add("active"),y()})});async function y(){u.innerHTML='<tr><td colspan="6" style="text-align: center; padding: var(--spacing-xl);">Učitavanje...</td></tr>';try{let w=await T.getReservations();if(d!=="all"&&(w=w.filter(b=>b.status===d)),w.length===0){u.innerHTML=`
    <tr>
    <td colspan="6" style="text-align: center; padding: var(--spacing-xl); color: var(--color-text-muted);">
      Nema rezervacija
    </td>
          </tr>
    `;return}u.innerHTML=w.map(b=>{const O=T.services.find(I=>I.id===b.service_id),C=`${b.ime} ${b.prezime}`,J=new Date(b.appointment_date).toLocaleDateString("hr-HR");let q="status-pending";return b.status==="confirmed"&&(q="status-confirmed"),b.status==="completed"&&(q="status-completed"),b.status==="cancelled"&&(q="status-cancelled"),`
    <tr>
            <td>${C}</td>
            <td class="hide-mobile">${b.marka} ${b.model}</td>
            <td>${(O==null?void 0:O.name)||b.service_name}</td>
            <td>${J}</td>
            <td><span class="status-badge ${q}">${b.status}</span></td>
            <td>
              <button class="btn btn-secondary btn-sm btn-open-reservation" data-id="${b.id}">Otvori</button>
            </td>
          </tr>
    `}).join(""),c.querySelectorAll(".btn-open-reservation").forEach(b=>{b.addEventListener("click",O=>x(O.target.dataset.id))})}catch(w){console.error("Error loading reservations table:",w),u.innerHTML='<tr><td colspan="6" style="text-align: center; padding: var(--spacing-xl);">Greška pri učitavanju.</td></tr>'}}async function x(w){var te;if(!w){console.error("No ID provided to openReservationModal");return}const b=await T.getReservationById(w);if(!b){alert("Greška: Rezervacija nije pronađena.");return}const O=T.services.find(B=>B.id===b.service_id)||((te=T.bundles)==null?void 0:te.find(B=>B.id===b.service_id));let C=(O==null?void 0:O.price)||0,J="";if(b.service_id==="pojasevi"){const B=b.broj_pojaseva||0,A=b.vlastiti_pojasevi;C=(A?(O==null?void 0:O.price_disassembled)??39:(O==null?void 0:O.price)??69)*B,J+=`<p><strong>Broj pojaseva:</strong> ${B}</p>`,J+=`<p><strong>Izvađeni mehanizam:</strong> ${A?"DA":"NE"}</p>`}else if(b.service_id==="zvjezdano-nebo"){const B=b.broj_zvjezdica||0,A=(O==null?void 0:O.price_per_star)??1.19;C=B*A,J+=`<p><strong>Broj zvjezdica:</strong> ${B}</p>`}C===0&&b.cijena&&(C=b.cijena),f.innerHTML=`
        <p><strong>Klijent:</strong> ${b.ime} ${b.prezime}</p>
        <p><strong>Email:</strong> ${b.email}</p>
        <p><strong>Telefon:</strong> ${b.telefon}</p>
        <p><strong>Vozilo:</strong> ${b.marka} ${b.model}</p>
        <p><strong>Godina:</strong> ${b.godina}</p>
        ${b.vin?`<p><strong>VIN:</strong> ${b.vin}</p>`:""}
        <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 10px 0;">
        <p><strong>Usluga:</strong> ${(O==null?void 0:O.name)||b.service_name}</p>
        ${J}
        <p><strong>Cijena:</strong> <span style="font-size: 1.2em; color: var(--color-accent); font-weight: bold;">${C.toFixed(2)} EUR</span></p>
        <p><strong>Datum:</strong> ${new Date(b.appointment_date).toLocaleDateString("hr-HR")} u ${b.appointment_time}</p>
        <p><strong>Status:</strong> <span class="status-badge ${b.status==="confirmed"?"status-confirmed":b.status==="completed"?"status-completed":b.status==="cancelled"?"status-cancelled":"status-pending"}">${b.status}</span></p>
        <p><strong>Napomene:</strong> ${b.napomena||"-"}</p>
        ${b.software_version_image_url?`
            <div style="margin-top: 15px;">
                <p><strong>Slika softvera:</strong></p>
                <a href="${b.software_version_image_url}" target="_blank" style="display: inline-block; margin-top: 5px;">
                    <img src="${b.software_version_image_url}" alt="Slika softvera" style="max-width: 100%; max-height: 300px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.2);">
                </a>
            </div>
        `:""}
        `,g.innerHTML="",b.status==="pending"?(g.innerHTML+='<button class="btn btn-secondary" id="cancel">Otkaži</button>',g.innerHTML+='<button class="btn btn-cta" id="confirm">Potvrdi</button>'):b.status==="confirmed"&&(g.innerHTML+='<button class="btn btn-secondary" id="cancel">Otkaži</button>',g.innerHTML+='<button class="btn btn-primary" id="complete">Završi</button>');const q=g.querySelector("#confirm"),I=g.querySelector("#cancel"),D=g.querySelector("#complete");q&&(q.onclick=()=>k(w,"confirmed")),I&&(I.onclick=()=>k(w,"cancelled")),D&&(D.onclick=()=>k(w,"completed")),p.style.display="block",h.style.display="block"}async function k(w,b){await T.updateReservationStatus(w,b),m(),y()}return y(),c}function i(){const c=document.createElement("div");c.innerHTML='<h1 class="admin-title">Konfiguracija Usluga</h1>';const d=document.createElement("div");d.className="settings-card glass",d.innerHTML=`
        <h2 style="margin-bottom: var(--spacing-lg);">Usluge i Cijene</h2>
        <div id="services-list">Učitavanje...</div>
    `,c.appendChild(d);const u=d.querySelector("#services-list");return(async()=>{if(u.innerHTML="Učitavanje...",await T.loadServices(),!T.services||T.services.length===0){u.innerHTML="<p>Nema dostupnih usluga.</p>";return}u.innerHTML=`
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Cijena Konfiguracija</th>
                        <th>Akcije</th>
                    </tr>
                </thead>
                <tbody>
                ${T.services.map(h=>`
                    <tr>
                        <td style="vertical-align: top;">
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <span style="font-size: 1.5rem;">${h.icon}</span>
                                <div>
                                    <div style="font-weight: bold;">${h.name}</div>
                                    <div style="font-size: 0.8rem; color: #888;">${h.id}</div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                <div style="display: flex; align-items: center; gap: 16px;">
                                    <div style="display: flex; align-items: center; gap: 8px;">
                                        <input type="checkbox" id="is_request_price_${h.id}" class="is-request-price-checkbox" data-id="${h.id}" ${h.is_request_price?"checked":""}>
                                        <label for="is_request_price_${h.id}" style="font-size: 0.9rem;">Na upit</label>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 8px;">
                                        <input type="checkbox" id="is_from_${h.id}" class="is-from-checkbox" data-id="${h.id}" ${h.is_from?"checked":""}>
                                        <label for="is_from_${h.id}" style="font-size: 0.9rem;">Cijena "OD"</label>
                                    </div>
                                </div>
                                <div id="price-inputs-${h.id}" style="display: ${h.is_request_price?"none":"block"};">
                                    <div style="display: flex; align-items: center; gap: 8px; margin-top: 5px;">
                                        <input type="number" class="input service-price-input" data-id="${h.id}" value="${h.price||""}" placeholder="Cijena" style="width: 100px;">
                                        <span style="font-size: 0.9rem;">EUR</span>
                                    </div>
                                    <div class="price-to-container" id="price_to_container_${h.id}" style="display: ${h.is_from?"flex":"none"}; align-items: center; gap: 8px; margin-top: 5px;">
                                        <span style="font-size: 0.9rem;">DO:</span>
                                        <input type="number" class="input service-price-to-input" data-id="${h.id}" value="${h.price_to||""}" placeholder="Max" style="width: 100px;">
                                        <span style="font-size: 0.9rem;">EUR</span>
                                    </div>

                                    ${h.id==="pojasevi"?`
                                    <div style="margin-top: 10px;">
                                        <label style="font-size: 0.8rem; display: block; margin-bottom: 2px;">Cijena Rastavljeni (po komadu):</label>
                                        <div style="display: flex; align-items: center; gap: 8px;">
                                            <input type="number" class="input service-price-disassembled-input" data-id="${h.id}" value="${h.price_disassembled||""}" placeholder="39" style="width: 100px;">
                                            <span style="font-size: 0.9rem;">EUR</span>
                                        </div>
                                    </div>
                                    `:""}

                                    ${h.id==="zvjezdano-nebo"?`
                                    <div style="margin-top: 10px;">
                                        <label style="font-size: 0.8rem; display: block; margin-bottom: 2px;">Cijena po zvjezdici:</label>
                                        <div style="display: flex; align-items: center; gap: 8px;">
                                            <input type="number" class="input service-price-star-input" data-id="${h.id}" value="${h.price_per_star||""}" step="0.01" placeholder="1.19" style="width: 100px;">
                                            <span style="font-size: 0.9rem;">EUR</span>
                                        </div>
                                    </div>
                                    `:""}
                                </div>
                            </div>
                        </td>
                        <td style="vertical-align: top;">
                            <button class="btn btn-primary btn-sm save-service-btn" data-id="${h.id}">Spremi</button>
                        </td>
                    </tr>`).join("")}
                </tbody>
            </table>
        `,u.querySelectorAll(".is-request-price-checkbox").forEach(h=>{h.addEventListener("change",f=>{const g=f.target.dataset.id,v=u.querySelector(`#price-inputs-${g}`);v.style.display=f.target.checked?"none":"block"})}),u.querySelectorAll(".is-from-checkbox").forEach(h=>{h.addEventListener("change",f=>{const g=f.target.dataset.id,v=u.querySelector(`#price_to_container_${g}`);v.style.display=f.target.checked?"flex":"none"})}),u.querySelectorAll(".save-service-btn").forEach(h=>{h.addEventListener("click",async f=>{const g=f.target.dataset.id,v=u.querySelector(`.service-price-input[data-id="${g}"]`),m=u.querySelector(`#is_from_${g}`),_=u.querySelector(`#is_request_price_${g}`),y=u.querySelector(`.service-price-to-input[data-id="${g}"]`),x=_.checked,k=v.value?parseFloat(v.value):0,w=m.checked,b=w&&y.value?parseFloat(y.value):null,O=u.querySelector(`.service-price-disassembled-input[data-id="${g}"]`),C=u.querySelector(`.service-price-star-input[data-id="${g}"]`),J=O&&O.value?parseFloat(O.value):null,q=C&&C.value?parseFloat(C.value):null;if(!x&&isNaN(k)){alert("Molimo unesite ispravnu osnovnu cijenu.");return}f.target.textContent,f.target.textContent="Spremanje...",f.target.disabled=!0;try{await T.updateServiceConfig(g,{price:k,is_from:w,price_to:b,is_request_price:x,price_disassembled:J,price_per_star:q}),alert("Usluga uspješno ažurirana!")}catch(I){console.error(I),alert(`Greška pri spremanju: ${I.message||JSON.stringify(I)}`)}finally{f.target.disabled=!1,f.target.textContent="Spremi"}})})})(),c}function o(){const c=document.createElement("div");c.innerHTML='<h1 class="admin-title">Recenzije</h1>';const d=document.createElement("div");d.className="settings-card glass";const u=document.createElement("button");u.className="btn btn-primary",u.textContent="Dodaj Recenziju",u.style.marginBottom="var(--spacing-lg)";const p=document.createElement("div");p.className="glass",p.style.cssText="display:none; position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); width:90%; max-width:500px; padding:var(--spacing-xl); z-index:1000;",p.innerHTML=`
        <h2 id="review-modal-title">Dodaj Recenziju</h2>
        <div class="form-group">
            <label class="form-label">Ime</label>
            <input type="text" id="review-name" class="input">
        </div>
        <div class="form-group">
            <label class="form-label">Ocjena (1-5)</label>
            <input type="number" id="review-rating" class="input" min="1" max="5" value="5">
        </div>
        <div class="form-group">
            <label class="form-label">Komentar</label>
            <textarea id="review-comment" class="input" rows="4"></textarea>
        </div>
        <div style="display:flex; justify-content:flex-end; gap:10px;">
            <button id="cancel-review-btn" class="btn btn-secondary">Odustani</button>
            <button id="save-review-btn" class="btn btn-primary">Spremi</button>
        </div>
    `;const h=document.createElement("div");h.style.cssText="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.7); z-index:999;",c.appendChild(p),c.appendChild(h);let f=null;const g=(y=null)=>{f=y?y.id:null,c.querySelector("#review-modal-title").textContent=y?"Uredi Recenziju":"Dodaj Recenziju",c.querySelector("#review-name").value=y?y.name:"",c.querySelector("#review-rating").value=y?y.rating:5,c.querySelector("#review-comment").value=y&&(y.comment||y.text)||"",p.style.display="block",h.style.display="block"},v=()=>{p.style.display="none",h.style.display="none",f=null};u.onclick=()=>g(),c.querySelector("#cancel-review-btn").onclick=v,h.onclick=v,c.querySelector("#save-review-btn").onclick=async()=>{const y=c.querySelector("#review-name").value,x=parseInt(c.querySelector("#review-rating").value),k=c.querySelector("#review-comment").value;if(!y||!k){alert("Sva polja su obavezna.");return}const w={name:y,rating:x,comment:k,is_approved:!0};try{f?await T.updateReview(f,w):await T.addReview(w),v(),_()}catch(b){console.error(b),alert("Greška: "+b.message)}},d.appendChild(u);const m=document.createElement("div");m.id="reviews-list",m.innerHTML="Učitavanje...",d.appendChild(m),c.appendChild(d);const _=async()=>{m.innerHTML="Učitavanje...";const y=await T.loadReviews();if(!y||y.length===0){m.innerHTML="<p>Nema recenzija.</p>";return}m.innerHTML=`
            <table class="admin-table">
                <thead><tr><th>Ime</th><th>Komentar</th><th>Ocjena</th><th>Akcije</th></tr></thead>
                <tbody>
                ${y.map(x=>`
                    <tr>
                        <td>${x.name||x.author}</td>
                        <td>${(x.comment||x.text||"").substring(0,50)}...</td>
                        <td>${"★".repeat(x.rating||0)}${"☆".repeat(5-(x.rating||0))}</td>
                        <td>
                          <button class="btn btn-secondary btn-sm edit-review-btn" data-id="${x.id}">Uredi</button>
                          <button class="btn btn-secondary btn-sm delete-review-btn" data-id="${x.id}" style="margin-left: 5px; background: #500;">Obriši</button>
                        </td>
                    </tr>`).join("")}
                </tbody>
            </table>
        `,m.querySelectorAll(".edit-review-btn").forEach(x=>{x.onclick=k=>{const w=k.target.dataset.id,b=y.find(O=>O.id==w);b&&g(b)}}),m.querySelectorAll(".delete-review-btn").forEach(x=>{x.onclick=async k=>{const w=k.target.dataset.id;confirm("Jeste li sigurni da želite obrisati ovu recenziju?")&&(await T.deleteReview(w),_())}})};return _(),c}function l(){const c=document.createElement("div");c.innerHTML='<h1 class="admin-title">Postavke Admin Računa</h1>';const d=document.createElement("div");d.className="settings-card glass",d.innerHTML=`
        <h2>Upravljanje Računom</h2>
        
        <div class="grid grid-2" style="margin-top: var(--spacing-xl);">
            <!-- Change Password -->
            <div>
                <h3 class="mb-md">Promjena Lozinke</h3>
                <div class="form-group">
                        <label class="form-label">Nova Lozinka</label>
                        <input type="password" id="new-password" class="input" placeholder="Nova lozinka">
                </div>
                <button id="update-password-btn" class="btn btn-primary">Ažuriraj Lozinku</button>
            </div>

            <!-- Create New Admin -->
            <div>
                <h3 class="mb-md">Dodaj Novog Admina</h3>
                 <div class="form-group">
                        <label class="form-label">Email</label>
                        <input type="email" id="new-admin-email" class="input" placeholder="admin@example.com">
                </div>
                <div class="form-group">
                        <label class="form-label">Lozinka</label>
                        <input type="password" id="new-admin-password" class="input" placeholder="Lozinka">
                </div>
                <button id="create-admin-btn" class="btn btn-cta">Kreiraj Admina</button>
            </div>
        </div>

        <!-- Admin List -->
        <div style="margin-top: var(--spacing-2xl); border-top: 1px solid var(--glass-border); padding-top: var(--spacing-xl);">
            <h3 class="mb-md">Popis Admina</h3>
            <div id="admin-list" class="table-container">
                Učitavanje...
            </div>
        </div>
    `,d.querySelector("#update-password-btn").addEventListener("click",async p=>{const h=d.querySelector("#new-password").value;if(!h||h.length<6){alert("Lozinka mora imati barem 6 znakova.");return}p.target.disabled=!0,p.target.textContent="...";try{const{error:f}=await Te.updatePassword(h);if(f)throw f;alert("Lozinka uspješno promijenjena!"),d.querySelector("#new-password").value=""}catch(f){console.error(f),alert("Greška pri promjeni lozinke: "+f.message)}finally{p.target.disabled=!1,p.target.textContent="Ažuriraj Lozinku"}}),d.querySelector("#create-admin-btn").addEventListener("click",async p=>{const h=d.querySelector("#new-admin-email").value,f=d.querySelector("#new-admin-password").value;if(!h||!f){alert("Molimo unesite email i lozinku.");return}p.target.disabled=!0,p.target.textContent="...";try{await T.manageAdmins("create",{email:h,password:f}),alert("Admin uspješno kreiran!"),d.querySelector("#new-admin-email").value="",d.querySelector("#new-admin-password").value="",u()}catch(g){console.error(g),alert("Greška: "+g.message)}finally{p.target.disabled=!1,p.target.textContent="Kreiraj Admina"}});const u=async()=>{const p=d.querySelector("#admin-list");try{const{users:h}=await T.manageAdmins("list"),f=await Te.getCurrentUser();if(!h||h.length===0){p.innerHTML="Nema pronađenih admina.";return}p.innerHTML=`
                <table class="admin-table" style="width: 100%;">
                    <thead>
                        <tr>
                            <th style="text-align: left;">Email</th>
                            <th style="text-align: left;">Kreiran</th>
                            <th style="text-align: right;">Akcije</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${h.map(g=>`
                            <tr>
                                <td>${g.email} ${g.id===(f==null?void 0:f.id)?"(Vi)":""}</td>
                                <td>${new Date(g.created_at).toLocaleDateString()}</td>
                                <td style="text-align: right;">
                                    ${g.id!==(f==null?void 0:f.id)?`<button class="btn btn-secondary btn-sm delete-admin-btn" data-id="${g.id}" style="background: #991b1b; color: white; border: none;">Obriši</button>`:'<span style="color: var(--color-text-muted); font-size: 0.9rem;">(Trenutni korisnik)</span>'}
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            `,p.querySelectorAll(".delete-admin-btn").forEach(g=>{g.addEventListener("click",async v=>{v.preventDefault(),setTimeout(async()=>{if(confirm("Jeste li sigurni da želite obrisati ovog admina?"))try{await T.manageAdmins("delete",{userId:g.dataset.id}),u()}catch(m){alert("Greška: "+m.message)}},10)})})}catch(h){console.error(h),p.innerHTML=`<div class="alert alert-error">Greška pri učitavanju: ${h.message}</div>`}};return u(),c.appendChild(d),c}return t()}function no(){const r=document.createElement("div");r.className="page-admin-login";let e="",t="",s=!1,a="",n=!1,i=!1;const o=()=>{r.innerHTML=`
            <div class="login-container">
                <div class="login-card glass">
                    <div class="login-header">
                        <a href="/" id="home-link" style="display: inline-block; margin-bottom: 1rem;">
                      <div class="login-logo-container">
      <img src="/images/logo.png" alt="Admin" class="login-logo" style="cursor: pointer; width: 120px; height: auto;">
    </div>                    </a>
                        <p class="login-subtitle">Prijavite se za pristup</p>
                    </div>

                    ${a?`
                        <div class="alert alert-error">
                            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                            </svg>
                            <span>${a}</span>
                        </div>
                    `:""}

                    ${n?`
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
        `,l()},l=()=>{const u=r.querySelector("#login-form"),p=r.querySelector("#reset-form"),h=r.querySelector("#forgot-password"),f=r.querySelector("#back-to-login"),g=r.querySelector("#home-link");if(g==null||g.addEventListener("click",v=>{v.preventDefault(),$.navigate("/")}),u){u.addEventListener("submit",c);const v=r.querySelector("#email"),m=r.querySelector("#password");v==null||v.addEventListener("input",_=>{e=_.target.value}),m==null||m.addEventListener("input",_=>{t=_.target.value})}if(p){p.addEventListener("submit",d);const v=r.querySelector("#reset-email");v==null||v.addEventListener("input",m=>{e=m.target.value})}h==null||h.addEventListener("click",()=>{i=!0,a="",n=!1,o()}),f==null||f.addEventListener("click",()=>{i=!1,a="",n=!1,o()})},c=async u=>{if(u.preventDefault(),!e||!t){a="Molimo unesite email i lozinku",o();return}s=!0,a="",o();const{user:p,session:h,error:f}=await Te.login(e,t);if(f){s=!1,a=f.message==="Unauthorized: Admin access required"?"Nemate admin pristup":"Neispravni podaci za prijavu",o();return}$.navigate("/admin")},d=async u=>{if(u.preventDefault(),!e){a="Molimo unesite email",o();return}s=!0,a="",o();const{error:p}=await Te.resetPassword(e);if(s=!1,p){a="Greška pri slanju emaila. Pokušajte ponovno.",o();return}n=!0,a="",o()};return o(),r}const ua=document.createElement("style");ua.textContent=`
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
`;document.head.appendChild(ua);function io(){const r=document.createElement("div");r.className="page-terms",r.appendChild(Ut());const e=document.createElement("main");return e.className="terms-main",e.innerHTML=`
    <div class="container" style="max-width: 800px; margin: 0 auto; padding: calc(var(--header-height, 80px) + var(--spacing-2xl)) var(--spacing-lg) var(--spacing-2xl);">
        <h1 class="section-title text-center" style="margin-bottom: var(--spacing-2xl);">Opći uvjeti poslovanja i Politika privatnosti</h1>
        
        <div class="glass" style="padding: var(--spacing-2xl);">
            <div class="terms-content">
                <p><strong>Autopojasevi.hr</strong></p>
                <p>Korištenjem web stranice autopojasevi.hr i slanjem zahtjeva za rezervaciju termina, korisnik (u daljnjem tekstu: Klijent) u potpunosti prihvaća dolje navedene uvjete poslovanja, pravila o prikupljanju podataka i politiku otkazivanja.</p>

                <h3>I. POLITIKA PRIVATNOSTI I ZAŠTITA PODATAKA</h3>

                <h4>1. Kontakt i pitanja</h4>
                <p>Poštujemo vašu privatnost. Za sva pitanja vezana uz obradu vaših podataka ili ove uvjete, možete nas kontaktirati na e-mail adresu: info@autopojasevi.hr.</p>

                <h4>2. Prikupljanje podataka</h4>
                <p>Prilikom rezervacije termina za usluge auto detailinga, prikupljamo sljedeće osobne podatke: ime i prezime, adresu e-pošte, broj telefona te podatke o vozilu.</p>

                <h4>3. Svrha obrade</h4>
                <p>Vaši podaci nužni su za:</p>
                <ul>
                    <li>Dogovaranje, potvrdu i realizaciju termina.</li>
                    <li>Izdavanje računa za obavljene usluge.</li>
                    <li>Izdavanje računa za naknadu štete u slučaju nedolaska ili otkazivanja termina.</li>
                    <li>Zakonske obveze vođenja poslovnih knjiga.</li>
                </ul>

                <h4>4. Pohrana i dijeljenje</h4>
                <p>Vaši podaci čuvaju se sukladno zakonskim propisima. Podaci se ne dijele s trećim stranama, osim kada je to nužno za ispunjenje zakonskih obveza ili za potrebe prisilne naplate potraživanja (odvjetnički uredi, javni bilježnici, FINA).</p>

                <h3>II. UVJETI REZERVACIJE, OTKAZIVANJA I NAPLATE (Obavezno pročitati)</h3>

                <h4>1. Obvezujuća rezervacija</h4>
                <p>Rezervacija termina putem sustava autopojasevi.hr smatra se sklapanjem obvezujućeg ugovora o pružanju usluge. Rezervacijom zauzimate termin koji pružatelj usluge ne može ustupiti drugom klijentu.</p>

                <h4>2. Politika nedolaska i otkazivanja (No-Show Policy)</h4>
                <p>Slanjem rezervacije Klijent pristaje na sljedeće stroge uvjete otkazivanja:</p>
                <p><strong>Bezuvjetna naplata:</strong> U slučaju da Klijent ne dođe na dogovoreni termin ili otkaže termin, bez obzira na vremenski trenutak otkazivanja (bilo odmah nakon rezervacije, danima ranije ili na dan termina), Klijent je dužan platiti naknadu za rezervaciju termina.</p>
                <p><strong>Iznos naknade:</strong> Naknada za otkazivanje ili nedolazak iznosi 50,00 EUR (slovima: pedeset eura).</p>

                <h4>3. Izdavanje računa i rok plaćanja</h4>
                <p>U slučaju nastupa okolnosti iz točke 2. (otkazivanje ili nedolazak), Klijentu će na ostavljenu e-mail adresu biti poslan račun na iznos od 50,00 EUR.</p>
                <p>Klijent je dužan podmiriti navedeni iznos u roku od 3 (tri) radna dana od primitka računa putem e-maila.</p>

                <h4>4. Prisilna naplata i sudski postupak</h4>
                <p>Ukoliko Klijent ne podmiri račun u navedenom roku, pokreće se postupak prisilne naplate sukladno važećim zakonima Republike Hrvatske.</p>
                <p>Slučaj se prosljeđuje na rješavanje nadležnim tijelima radi pokretanja ovršnog postupka ili sudske tužbe.</p>
                <p>U slučaju prisilne naplate, Klijent se obvezuje, pored osnovnog duga od 50,00 EUR, podmiriti i sve nastale troškove postupka (troškove odvjetnika, javnobilježničke pristojbe) te zakonske zatezne kamate.</p>

                <h4>5. Izjava o prihvaćanju</h4>
                <p>Zaključenjem procesa rezervacije Klijent potvrđuje da je pročitao ove Uvjete, da ih razumije te da je suglasan s naplatom iznosa od 50,00 EUR u slučaju da rezervirani termin ne iskoristi, neovisno o razlogu ili vremenu otkazivanja.</p>
            </div>
        </div>
    </div>
  `,r.appendChild(e),r.appendChild(qt()),r}const ha=document.createElement("style");ha.textContent=`
    .terms-content h3 {
        color: var(--color-accent);
        margin-top: 2rem;
        margin-bottom: 1rem;
        font-size: 1.5rem;
    }
    .terms-content h4 {
        margin-top: 1.5rem;
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
        color: var(--color-text);
    }
    .terms-content p, .terms-content ul {
        margin-bottom: 1rem;
        line-height: 1.6;
        color: var(--color-text-muted);
    }
    .terms-content ul {
        padding-left: 20px;
        list-style-type: disc;
    }
`;document.head.appendChild(ha);function oo(){const r=document.createElement("div");r.className="page-container not-found-page",r.innerHTML=`
    <div class="glass-panel" style="text-align: center; max-width: 600px; padding: 3rem;">
      <h1 style="font-size: 6rem; color: var(--accent); margin: 0; line-height: 1;">404</h1>
      <h2 style="font-size: 2rem; margin: 1rem 0; color: var(--text);">Stranica nije pronađena</h2>
      <p style="color: var(--text-muted); margin-bottom: 2rem; font-size: 1.1rem;">
        Izgleda da ste skrenuli s puta. Stranica koju tražite ne postoji ili je premještena.
      </p>
      
      <button class="btn btn-primary" id="back-home-btn">
        <span>Povratak na naslovnicu</span>
      </button>
    </div>
  `;const e=r.querySelector("#back-home-btn");return e.onclick=()=>{$.navigate("/")},r}$.setAuthCheck(async()=>await Te.isAuthenticated());$.register("/",Vi);$.register("/booking",so);$.register("/admin/login",no);$.register("/uvjeti-poslovanja",io);$.register("/admin",ao,{protected:!0});$.register("/404",oo);$.init();
