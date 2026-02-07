function ws(r,e){for(var t=0;t<e.length;t++){const a=e[t];if(typeof a!="string"&&!Array.isArray(a)){for(const s in a)if(s!=="default"&&!(s in r)){const n=Object.getOwnPropertyDescriptor(a,s);n&&Object.defineProperty(r,s,n.get?n:{enumerable:!0,get:()=>a[s]})}}}return Object.freeze(Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}})();class Sr{constructor(){this.routes={},this.protectedRoutes=new Set,this.currentRoute=null,this.authCheck=null}register(e,t,a={}){this.routes[e]=t,a.protected&&this.protectedRoutes.add(e)}setAuthCheck(e){this.authCheck=e}async navigate(e,t={}){if(this.protectedRoutes.has(e)){if(!this.authCheck){console.error("Auth check function not set");return}if(!await this.authCheck()){sessionStorage.setItem("intendedRoute",e),this.navigate("/admin/login");return}}this.currentRoute=e;const a=this.routes[e];if(a){const s=document.getElementById("app");s.innerHTML="",s.appendChild(a(t)),window.scrollTo(0,0),window.history.pushState({path:e,data:t},"",e)}}navigateToIntended(){const e=sessionStorage.getItem("intendedRoute");e?(sessionStorage.removeItem("intendedRoute"),this.navigate(e)):this.navigate("/admin")}init(){window.addEventListener("popstate",a=>{a.state&&a.state.path&&this.navigate(a.state.path,a.state.data||{})});const e=window.location.pathname,t=this.routes[e]?e:"/404";this.navigate(t)}}const B=new Sr;Sr.navigate=(r,e)=>B.navigate(r,e);function Vt(){const r=document.createElement("header");return r.className="header",r.id="main-header",r.innerHTML=`
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
  `,window.addEventListener("scroll",()=>{window.pageYOffset>10?r.classList.add("scrolled"):r.classList.remove("scrolled")}),r.querySelectorAll(".nav-link").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const a=t.target.textContent.toLowerCase();window.location.pathname!=="/"&&B.navigate("/");let s=null;a==="o nama"?s="about-section":a==="faq"?s="faq-section":a==="kontakt"&&(s="contact-section"),s&&setTimeout(()=>{const n=document.getElementById(s);n&&n.scrollIntoView({behavior:"smooth"})},100)})}),r.querySelector("#header-cta").addEventListener("click",()=>{B.navigate("/booking")}),r.querySelector(".logo-img").addEventListener("click",()=>{B.navigate("/"),window.scrollTo(0,0)}),r}const Tr=document.createElement("style");Tr.textContent=`
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
`;document.head.appendChild(Tr);function Ft(){const r=document.createElement("footer");return r.className="footer",r.innerHTML=`
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
            Pon - Ned: 09:00 - 17:00
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
  `,r.querySelector("#footer-rezervacija").addEventListener("click",e=>{e.preventDefault(),B.navigate("/booking")}),r.querySelector("#footer-kontakt").addEventListener("click",e=>{var t;e.preventDefault(),(t=document.getElementById("contact-section"))==null||t.scrollIntoView({behavior:"smooth"})}),r.querySelector("#footer-admin").addEventListener("click",e=>{e.preventDefault(),B.navigate("/admin")}),r.querySelector("#footer-terms").addEventListener("click",e=>{e.preventDefault(),B.navigate("/uvjeti-poslovanja")}),r}const Ar=document.createElement("style");Ar.textContent=`
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
`;document.head.appendChild(Ar);const _s="modulepreload",ks=function(r){return"/"+r},ar={},M=function(e,t,a){let s=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),o=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));s=Promise.allSettled(t.map(l=>{if(l=ks(l),l in ar)return;ar[l]=!0;const c=l.endsWith(".css"),h=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${h}`))return;const g=document.createElement("link");if(g.rel=c?"stylesheet":_s,c||(g.as="script"),g.crossOrigin="",g.href=l,o&&g.setAttribute("nonce",o),document.head.appendChild(g),c)return new Promise((u,d)=>{g.addEventListener("load",u),g.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${l}`)))})}))}function n(i){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=i,window.dispatchEvent(o),!o.defaultPrevented)throw i}return s.then(i=>{for(const o of i||[])o.status==="rejected"&&n(o.reason);return e().catch(n)})};var ke=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function xs(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}function Be(r){if(r.__esModule)return r;var e=r.default;if(typeof e=="function"){var t=function a(){return this instanceof a?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};t.prototype=e.prototype}else t={};return Object.defineProperty(t,"__esModule",{value:!0}),Object.keys(r).forEach(function(a){var s=Object.getOwnPropertyDescriptor(r,a);Object.defineProperty(t,a,s.get?s:{enumerable:!0,get:function(){return r[a]}})}),t}var Kt={},st={},Tt=function(r,e){return Tt=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,a){t.__proto__=a}||function(t,a){for(var s in a)Object.prototype.hasOwnProperty.call(a,s)&&(t[s]=a[s])},Tt(r,e)};function Or(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");Tt(r,e);function t(){this.constructor=r}r.prototype=e===null?Object.create(e):(t.prototype=e.prototype,new t)}var nt=function(){return nt=Object.assign||function(e){for(var t,a=1,s=arguments.length;a<s;a++){t=arguments[a];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},nt.apply(this,arguments)};function ze(r,e){var t={};for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&e.indexOf(a)<0&&(t[a]=r[a]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,a=Object.getOwnPropertySymbols(r);s<a.length;s++)e.indexOf(a[s])<0&&Object.prototype.propertyIsEnumerable.call(r,a[s])&&(t[a[s]]=r[a[s]]);return t}function Cr(r,e,t,a){var s=arguments.length,n=s<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,t):a,i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(r,e,t,a);else for(var o=r.length-1;o>=0;o--)(i=r[o])&&(n=(s<3?i(n):s>3?i(e,t,n):i(e,t))||n);return s>3&&n&&Object.defineProperty(e,t,n),n}function Pr(r,e){return function(t,a){e(t,a,r)}}function Rr(r,e,t,a,s,n){function i(f){if(f!==void 0&&typeof f!="function")throw new TypeError("Function expected");return f}for(var o=a.kind,l=o==="getter"?"get":o==="setter"?"set":"value",c=!e&&r?a.static?r:r.prototype:null,h=e||(c?Object.getOwnPropertyDescriptor(c,a.name):{}),g,u=!1,d=t.length-1;d>=0;d--){var p={};for(var v in a)p[v]=v==="access"?{}:a[v];for(var v in a.access)p.access[v]=a.access[v];p.addInitializer=function(f){if(u)throw new TypeError("Cannot add initializers after decoration has completed");n.push(i(f||null))};var m=(0,t[d])(o==="accessor"?{get:h.get,set:h.set}:h[l],p);if(o==="accessor"){if(m===void 0)continue;if(m===null||typeof m!="object")throw new TypeError("Object expected");(g=i(m.get))&&(h.get=g),(g=i(m.set))&&(h.set=g),(g=i(m.init))&&s.unshift(g)}else(g=i(m))&&(o==="field"?s.unshift(g):h[l]=g)}c&&Object.defineProperty(c,a.name,h),u=!0}function $r(r,e,t){for(var a=arguments.length>2,s=0;s<e.length;s++)t=a?e[s].call(r,t):e[s].call(r);return a?t:void 0}function zr(r){return typeof r=="symbol"?r:"".concat(r)}function Ir(r,e,t){return typeof e=="symbol"&&(e=e.description?"[".concat(e.description,"]"):""),Object.defineProperty(r,"name",{configurable:!0,value:t?"".concat(t," ",e):e})}function Lr(r,e){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(r,e)}function E(r,e,t,a){function s(n){return n instanceof t?n:new t(function(i){i(n)})}return new(t||(t=Promise))(function(n,i){function o(h){try{c(a.next(h))}catch(g){i(g)}}function l(h){try{c(a.throw(h))}catch(g){i(g)}}function c(h){h.done?n(h.value):s(h.value).then(o,l)}c((a=a.apply(r,e||[])).next())})}function Nr(r,e){var t={label:0,sent:function(){if(n[0]&1)throw n[1];return n[1]},trys:[],ops:[]},a,s,n,i=Object.create((typeof Iterator=="function"?Iterator:Object).prototype);return i.next=o(0),i.throw=o(1),i.return=o(2),typeof Symbol=="function"&&(i[Symbol.iterator]=function(){return this}),i;function o(c){return function(h){return l([c,h])}}function l(c){if(a)throw new TypeError("Generator is already executing.");for(;i&&(i=0,c[0]&&(t=0)),t;)try{if(a=1,s&&(n=c[0]&2?s.return:c[0]?s.throw||((n=s.return)&&n.call(s),0):s.next)&&!(n=n.call(s,c[1])).done)return n;switch(s=0,n&&(c=[c[0]&2,n.value]),c[0]){case 0:case 1:n=c;break;case 4:return t.label++,{value:c[1],done:!1};case 5:t.label++,s=c[1],c=[0];continue;case 7:c=t.ops.pop(),t.trys.pop();continue;default:if(n=t.trys,!(n=n.length>0&&n[n.length-1])&&(c[0]===6||c[0]===2)){t=0;continue}if(c[0]===3&&(!n||c[1]>n[0]&&c[1]<n[3])){t.label=c[1];break}if(c[0]===6&&t.label<n[1]){t.label=n[1],n=c;break}if(n&&t.label<n[2]){t.label=n[2],t.ops.push(c);break}n[2]&&t.ops.pop(),t.trys.pop();continue}c=e.call(r,t)}catch(h){c=[6,h],s=0}finally{a=n=0}if(c[0]&5)throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}}var mt=Object.create?function(r,e,t,a){a===void 0&&(a=t);var s=Object.getOwnPropertyDescriptor(e,t);(!s||("get"in s?!e.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return e[t]}}),Object.defineProperty(r,a,s)}:function(r,e,t,a){a===void 0&&(a=t),r[a]=e[t]};function Mr(r,e){for(var t in r)t!=="default"&&!Object.prototype.hasOwnProperty.call(e,t)&&mt(e,r,t)}function it(r){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&r[e],a=0;if(t)return t.call(r);if(r&&typeof r.length=="number")return{next:function(){return r&&a>=r.length&&(r=void 0),{value:r&&r[a++],done:!r}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function Gt(r,e){var t=typeof Symbol=="function"&&r[Symbol.iterator];if(!t)return r;var a=t.call(r),s,n=[],i;try{for(;(e===void 0||e-- >0)&&!(s=a.next()).done;)n.push(s.value)}catch(o){i={error:o}}finally{try{s&&!s.done&&(t=a.return)&&t.call(a)}finally{if(i)throw i.error}}return n}function Ur(){for(var r=[],e=0;e<arguments.length;e++)r=r.concat(Gt(arguments[e]));return r}function qr(){for(var r=0,e=0,t=arguments.length;e<t;e++)r+=arguments[e].length;for(var a=Array(r),s=0,e=0;e<t;e++)for(var n=arguments[e],i=0,o=n.length;i<o;i++,s++)a[s]=n[i];return a}function Br(r,e,t){if(t||arguments.length===2)for(var a=0,s=e.length,n;a<s;a++)(n||!(a in e))&&(n||(n=Array.prototype.slice.call(e,0,a)),n[a]=e[a]);return r.concat(n||Array.prototype.slice.call(e))}function Re(r){return this instanceof Re?(this.v=r,this):new Re(r)}function Dr(r,e,t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var a=t.apply(r,e||[]),s,n=[];return s=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),o("next"),o("throw"),o("return",i),s[Symbol.asyncIterator]=function(){return this},s;function i(d){return function(p){return Promise.resolve(p).then(d,g)}}function o(d,p){a[d]&&(s[d]=function(v){return new Promise(function(m,f){n.push([d,v,m,f])>1||l(d,v)})},p&&(s[d]=p(s[d])))}function l(d,p){try{c(a[d](p))}catch(v){u(n[0][3],v)}}function c(d){d.value instanceof Re?Promise.resolve(d.value.v).then(h,g):u(n[0][2],d)}function h(d){l("next",d)}function g(d){l("throw",d)}function u(d,p){d(p),n.shift(),n.length&&l(n[0][0],n[0][1])}}function Hr(r){var e,t;return e={},a("next"),a("throw",function(s){throw s}),a("return"),e[Symbol.iterator]=function(){return this},e;function a(s,n){e[s]=r[s]?function(i){return(t=!t)?{value:Re(r[s](i)),done:!1}:n?n(i):i}:n}}function Vr(r){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e=r[Symbol.asyncIterator],t;return e?e.call(r):(r=typeof it=="function"?it(r):r[Symbol.iterator](),t={},a("next"),a("throw"),a("return"),t[Symbol.asyncIterator]=function(){return this},t);function a(n){t[n]=r[n]&&function(i){return new Promise(function(o,l){i=r[n](i),s(o,l,i.done,i.value)})}}function s(n,i,o,l){Promise.resolve(l).then(function(c){n({value:c,done:o})},i)}}function Fr(r,e){return Object.defineProperty?Object.defineProperty(r,"raw",{value:e}):r.raw=e,r}var js=Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e},At=function(r){return At=Object.getOwnPropertyNames||function(e){var t=[];for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[t.length]=a);return t},At(r)};function Kr(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var t=At(r),a=0;a<t.length;a++)t[a]!=="default"&&mt(e,r,t[a]);return js(e,r),e}function Gr(r){return r&&r.__esModule?r:{default:r}}function Wr(r,e,t,a){if(t==="a"&&!a)throw new TypeError("Private accessor was defined without a getter");if(typeof e=="function"?r!==e||!a:!e.has(r))throw new TypeError("Cannot read private member from an object whose class did not declare it");return t==="m"?a:t==="a"?a.call(r):a?a.value:e.get(r)}function Jr(r,e,t,a,s){if(a==="m")throw new TypeError("Private method is not writable");if(a==="a"&&!s)throw new TypeError("Private accessor was defined without a setter");if(typeof e=="function"?r!==e||!s:!e.has(r))throw new TypeError("Cannot write private member to an object whose class did not declare it");return a==="a"?s.call(r,t):s?s.value=t:e.set(r,t),t}function Zr(r,e){if(e===null||typeof e!="object"&&typeof e!="function")throw new TypeError("Cannot use 'in' operator on non-object");return typeof r=="function"?e===r:r.has(e)}function Yr(r,e,t){if(e!=null){if(typeof e!="object"&&typeof e!="function")throw new TypeError("Object expected.");var a,s;if(t){if(!Symbol.asyncDispose)throw new TypeError("Symbol.asyncDispose is not defined.");a=e[Symbol.asyncDispose]}if(a===void 0){if(!Symbol.dispose)throw new TypeError("Symbol.dispose is not defined.");a=e[Symbol.dispose],t&&(s=a)}if(typeof a!="function")throw new TypeError("Object not disposable.");s&&(a=function(){try{s.call(this)}catch(n){return Promise.reject(n)}}),r.stack.push({value:e,dispose:a,async:t})}else t&&r.stack.push({async:!0});return e}var Es=typeof SuppressedError=="function"?SuppressedError:function(r,e,t){var a=new Error(t);return a.name="SuppressedError",a.error=r,a.suppressed=e,a};function Xr(r){function e(n){r.error=r.hasError?new Es(n,r.error,"An error was suppressed during disposal."):n,r.hasError=!0}var t,a=0;function s(){for(;t=r.stack.pop();)try{if(!t.async&&a===1)return a=0,r.stack.push(t),Promise.resolve().then(s);if(t.dispose){var n=t.dispose.call(t.value);if(t.async)return a|=2,Promise.resolve(n).then(s,function(i){return e(i),s()})}else a|=1}catch(i){e(i)}if(a===1)return r.hasError?Promise.reject(r.error):Promise.resolve();if(r.hasError)throw r.error}return s()}function Qr(r,e){return typeof r=="string"&&/^\.\.?\//.test(r)?r.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i,function(t,a,s,n,i){return a?e?".jsx":".js":s&&(!n||!i)?t:s+n+"."+i.toLowerCase()+"js"}):r}const Ss={__extends:Or,__assign:nt,__rest:ze,__decorate:Cr,__param:Pr,__esDecorate:Rr,__runInitializers:$r,__propKey:zr,__setFunctionName:Ir,__metadata:Lr,__awaiter:E,__generator:Nr,__createBinding:mt,__exportStar:Mr,__values:it,__read:Gt,__spread:Ur,__spreadArrays:qr,__spreadArray:Br,__await:Re,__asyncGenerator:Dr,__asyncDelegator:Hr,__asyncValues:Vr,__makeTemplateObject:Fr,__importStar:Kr,__importDefault:Gr,__classPrivateFieldGet:Wr,__classPrivateFieldSet:Jr,__classPrivateFieldIn:Zr,__addDisposableResource:Yr,__disposeResources:Xr,__rewriteRelativeImportExtension:Qr},Ts=Object.freeze(Object.defineProperty({__proto__:null,__addDisposableResource:Yr,get __assign(){return nt},__asyncDelegator:Hr,__asyncGenerator:Dr,__asyncValues:Vr,__await:Re,__awaiter:E,__classPrivateFieldGet:Wr,__classPrivateFieldIn:Zr,__classPrivateFieldSet:Jr,__createBinding:mt,__decorate:Cr,__disposeResources:Xr,__esDecorate:Rr,__exportStar:Mr,__extends:Or,__generator:Nr,__importDefault:Gr,__importStar:Kr,__makeTemplateObject:Fr,__metadata:Lr,__param:Pr,__propKey:zr,__read:Gt,__rest:ze,__rewriteRelativeImportExtension:Qr,__runInitializers:$r,__setFunctionName:Ir,__spread:Ur,__spreadArray:Br,__spreadArrays:qr,__values:it,default:Ss},Symbol.toStringTag,{value:"Module"})),As=r=>r?(...e)=>r(...e):(...e)=>fetch(...e);let vt=class extends Error{constructor(e,t="FunctionsError",a){super(e),this.name=t,this.context=a}},ea=class extends vt{constructor(e){super("Failed to send a request to the Edge Function","FunctionsFetchError",e)}},Ot=class extends vt{constructor(e){super("Relay Error invoking the Edge Function","FunctionsRelayError",e)}},Ct=class extends vt{constructor(e){super("Edge Function returned a non-2xx status code","FunctionsHttpError",e)}};var ot;(function(r){r.Any="any",r.ApNortheast1="ap-northeast-1",r.ApNortheast2="ap-northeast-2",r.ApSouth1="ap-south-1",r.ApSoutheast1="ap-southeast-1",r.ApSoutheast2="ap-southeast-2",r.CaCentral1="ca-central-1",r.EuCentral1="eu-central-1",r.EuWest1="eu-west-1",r.EuWest2="eu-west-2",r.EuWest3="eu-west-3",r.SaEast1="sa-east-1",r.UsEast1="us-east-1",r.UsWest1="us-west-1",r.UsWest2="us-west-2"})(ot||(ot={}));class Os{constructor(e,{headers:t={},customFetch:a,region:s=ot.Any}={}){this.url=e,this.headers=t,this.region=s,this.fetch=As(a)}setAuth(e){this.headers.Authorization=`Bearer ${e}`}invoke(e){return E(this,arguments,void 0,function*(t,a={}){var s;let n,i;try{const{headers:o,method:l,body:c,signal:h,timeout:g}=a;let u={},{region:d}=a;d||(d=this.region);const p=new URL(`${this.url}/${t}`);d&&d!=="any"&&(u["x-region"]=d,p.searchParams.set("forceFunctionRegion",d));let v;c&&(o&&!Object.prototype.hasOwnProperty.call(o,"Content-Type")||!o)?typeof Blob<"u"&&c instanceof Blob||c instanceof ArrayBuffer?(u["Content-Type"]="application/octet-stream",v=c):typeof c=="string"?(u["Content-Type"]="text/plain",v=c):typeof FormData<"u"&&c instanceof FormData?v=c:(u["Content-Type"]="application/json",v=JSON.stringify(c)):v=c;let m=h;g&&(i=new AbortController,n=setTimeout(()=>i.abort(),g),h?(m=i.signal,h.addEventListener("abort",()=>i.abort())):m=i.signal);const f=yield this.fetch(p.toString(),{method:l||"POST",headers:Object.assign(Object.assign(Object.assign({},u),this.headers),o),body:v,signal:m}).catch(j=>{throw new ea(j)}),b=f.headers.get("x-relay-error");if(b&&b==="true")throw new Ot(f);if(!f.ok)throw new Ct(f);let y=((s=f.headers.get("Content-Type"))!==null&&s!==void 0?s:"text/plain").split(";")[0].trim(),k;return y==="application/json"?k=yield f.json():y==="application/octet-stream"||y==="application/pdf"?k=yield f.blob():y==="text/event-stream"?k=f:y==="multipart/form-data"?k=yield f.formData():k=yield f.text(),{data:k,error:null,response:f}}catch(o){return{data:null,error:o,response:o instanceof Ct||o instanceof Ot?o.context:void 0}}finally{n&&clearTimeout(n)}})}}const Cs=Object.freeze(Object.defineProperty({__proto__:null,get FunctionRegion(){return ot},FunctionsClient:Os,FunctionsError:vt,FunctionsFetchError:ea,FunctionsHttpError:Ct,FunctionsRelayError:Ot},Symbol.toStringTag,{value:"Module"})),ta=Be(Cs);var W={};const Ie=Be(Ts);var Fe={},Ke={},Ge={},We={},Je={},Ze={},sr;function ra(){if(sr)return Ze;sr=1,Object.defineProperty(Ze,"__esModule",{value:!0});class r extends Error{constructor(t){super(t.message),this.name="PostgrestError",this.details=t.details,this.hint=t.hint,this.code=t.code}}return Ze.default=r,Ze}var nr;function aa(){if(nr)return Je;nr=1,Object.defineProperty(Je,"__esModule",{value:!0});const e=Ie.__importDefault(ra());let t=class{constructor(s){var n,i;this.shouldThrowOnError=!1,this.method=s.method,this.url=s.url,this.headers=new Headers(s.headers),this.schema=s.schema,this.body=s.body,this.shouldThrowOnError=(n=s.shouldThrowOnError)!==null&&n!==void 0?n:!1,this.signal=s.signal,this.isMaybeSingle=(i=s.isMaybeSingle)!==null&&i!==void 0?i:!1,s.fetch?this.fetch=s.fetch:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(s,n){return this.headers=new Headers(this.headers),this.headers.set(s,n),this}then(s,n){this.schema===void 0||(["GET","HEAD"].includes(this.method)?this.headers.set("Accept-Profile",this.schema):this.headers.set("Content-Profile",this.schema)),this.method!=="GET"&&this.method!=="HEAD"&&this.headers.set("Content-Type","application/json");const i=this.fetch;let o=i(this.url.toString(),{method:this.method,headers:this.headers,body:JSON.stringify(this.body),signal:this.signal}).then(async l=>{var c,h,g,u;let d=null,p=null,v=null,m=l.status,f=l.statusText;if(l.ok){if(this.method!=="HEAD"){const j=await l.text();j===""||(this.headers.get("Accept")==="text/csv"||this.headers.get("Accept")&&(!((c=this.headers.get("Accept"))===null||c===void 0)&&c.includes("application/vnd.pgrst.plan+text"))?p=j:p=JSON.parse(j))}const y=(h=this.headers.get("Prefer"))===null||h===void 0?void 0:h.match(/count=(exact|planned|estimated)/),k=(g=l.headers.get("content-range"))===null||g===void 0?void 0:g.split("/");y&&k&&k.length>1&&(v=parseInt(k[1])),this.isMaybeSingle&&this.method==="GET"&&Array.isArray(p)&&(p.length>1?(d={code:"PGRST116",details:`Results contain ${p.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:"JSON object requested, multiple (or no) rows returned"},p=null,v=null,m=406,f="Not Acceptable"):p.length===1?p=p[0]:p=null)}else{const y=await l.text();try{d=JSON.parse(y),Array.isArray(d)&&l.status===404&&(p=[],d=null,m=200,f="OK")}catch{l.status===404&&y===""?(m=204,f="No Content"):d={message:y}}if(d&&this.isMaybeSingle&&(!((u=d==null?void 0:d.details)===null||u===void 0)&&u.includes("0 rows"))&&(d=null,m=200,f="OK"),d&&this.shouldThrowOnError)throw new e.default(d)}return{error:d,data:p,count:v,status:m,statusText:f}});return this.shouldThrowOnError||(o=o.catch(l=>{var c,h,g,u,d,p;let v="";const m=l==null?void 0:l.cause;if(m){const f=(c=m==null?void 0:m.message)!==null&&c!==void 0?c:"",b=(h=m==null?void 0:m.code)!==null&&h!==void 0?h:"";v=`${(g=l==null?void 0:l.name)!==null&&g!==void 0?g:"FetchError"}: ${l==null?void 0:l.message}`,v+=`

Caused by: ${(u=m==null?void 0:m.name)!==null&&u!==void 0?u:"Error"}: ${f}`,b&&(v+=` (${b})`),m!=null&&m.stack&&(v+=`
${m.stack}`)}else v=(d=l==null?void 0:l.stack)!==null&&d!==void 0?d:"";return{error:{message:`${(p=l==null?void 0:l.name)!==null&&p!==void 0?p:"FetchError"}: ${l==null?void 0:l.message}`,details:v,hint:"",code:""},data:null,count:null,status:0,statusText:""}})),o.then(s,n)}returns(){return this}overrideTypes(){return this}};return Je.default=t,Je}var ir;function sa(){if(ir)return We;ir=1,Object.defineProperty(We,"__esModule",{value:!0});const e=Ie.__importDefault(aa());let t=class extends e.default{select(s){let n=!1;const i=(s??"*").split("").map(o=>/\s/.test(o)&&!n?"":(o==='"'&&(n=!n),o)).join("");return this.url.searchParams.set("select",i),this.headers.append("Prefer","return=representation"),this}order(s,{ascending:n=!0,nullsFirst:i,foreignTable:o,referencedTable:l=o}={}){const c=l?`${l}.order`:"order",h=this.url.searchParams.get(c);return this.url.searchParams.set(c,`${h?`${h},`:""}${s}.${n?"asc":"desc"}${i===void 0?"":i?".nullsfirst":".nullslast"}`),this}limit(s,{foreignTable:n,referencedTable:i=n}={}){const o=typeof i>"u"?"limit":`${i}.limit`;return this.url.searchParams.set(o,`${s}`),this}range(s,n,{foreignTable:i,referencedTable:o=i}={}){const l=typeof o>"u"?"offset":`${o}.offset`,c=typeof o>"u"?"limit":`${o}.limit`;return this.url.searchParams.set(l,`${s}`),this.url.searchParams.set(c,`${n-s+1}`),this}abortSignal(s){return this.signal=s,this}single(){return this.headers.set("Accept","application/vnd.pgrst.object+json"),this}maybeSingle(){return this.method==="GET"?this.headers.set("Accept","application/json"):this.headers.set("Accept","application/vnd.pgrst.object+json"),this.isMaybeSingle=!0,this}csv(){return this.headers.set("Accept","text/csv"),this}geojson(){return this.headers.set("Accept","application/geo+json"),this}explain({analyze:s=!1,verbose:n=!1,settings:i=!1,buffers:o=!1,wal:l=!1,format:c="text"}={}){var h;const g=[s?"analyze":null,n?"verbose":null,i?"settings":null,o?"buffers":null,l?"wal":null].filter(Boolean).join("|"),u=(h=this.headers.get("Accept"))!==null&&h!==void 0?h:"application/json";return this.headers.set("Accept",`application/vnd.pgrst.plan+${c}; for="${u}"; options=${g};`),c==="json"?this:this}rollback(){return this.headers.append("Prefer","tx=rollback"),this}returns(){return this}maxAffected(s){return this.headers.append("Prefer","handling=strict"),this.headers.append("Prefer",`max-affected=${s}`),this}};return We.default=t,We}var or;function Wt(){if(or)return Ge;or=1,Object.defineProperty(Ge,"__esModule",{value:!0});const e=Ie.__importDefault(sa()),t=new RegExp("[,()]");let a=class extends e.default{eq(n,i){return this.url.searchParams.append(n,`eq.${i}`),this}neq(n,i){return this.url.searchParams.append(n,`neq.${i}`),this}gt(n,i){return this.url.searchParams.append(n,`gt.${i}`),this}gte(n,i){return this.url.searchParams.append(n,`gte.${i}`),this}lt(n,i){return this.url.searchParams.append(n,`lt.${i}`),this}lte(n,i){return this.url.searchParams.append(n,`lte.${i}`),this}like(n,i){return this.url.searchParams.append(n,`like.${i}`),this}likeAllOf(n,i){return this.url.searchParams.append(n,`like(all).{${i.join(",")}}`),this}likeAnyOf(n,i){return this.url.searchParams.append(n,`like(any).{${i.join(",")}}`),this}ilike(n,i){return this.url.searchParams.append(n,`ilike.${i}`),this}ilikeAllOf(n,i){return this.url.searchParams.append(n,`ilike(all).{${i.join(",")}}`),this}ilikeAnyOf(n,i){return this.url.searchParams.append(n,`ilike(any).{${i.join(",")}}`),this}regexMatch(n,i){return this.url.searchParams.append(n,`match.${i}`),this}regexIMatch(n,i){return this.url.searchParams.append(n,`imatch.${i}`),this}is(n,i){return this.url.searchParams.append(n,`is.${i}`),this}isDistinct(n,i){return this.url.searchParams.append(n,`isdistinct.${i}`),this}in(n,i){const o=Array.from(new Set(i)).map(l=>typeof l=="string"&&t.test(l)?`"${l}"`:`${l}`).join(",");return this.url.searchParams.append(n,`in.(${o})`),this}contains(n,i){return typeof i=="string"?this.url.searchParams.append(n,`cs.${i}`):Array.isArray(i)?this.url.searchParams.append(n,`cs.{${i.join(",")}}`):this.url.searchParams.append(n,`cs.${JSON.stringify(i)}`),this}containedBy(n,i){return typeof i=="string"?this.url.searchParams.append(n,`cd.${i}`):Array.isArray(i)?this.url.searchParams.append(n,`cd.{${i.join(",")}}`):this.url.searchParams.append(n,`cd.${JSON.stringify(i)}`),this}rangeGt(n,i){return this.url.searchParams.append(n,`sr.${i}`),this}rangeGte(n,i){return this.url.searchParams.append(n,`nxl.${i}`),this}rangeLt(n,i){return this.url.searchParams.append(n,`sl.${i}`),this}rangeLte(n,i){return this.url.searchParams.append(n,`nxr.${i}`),this}rangeAdjacent(n,i){return this.url.searchParams.append(n,`adj.${i}`),this}overlaps(n,i){return typeof i=="string"?this.url.searchParams.append(n,`ov.${i}`):this.url.searchParams.append(n,`ov.{${i.join(",")}}`),this}textSearch(n,i,{config:o,type:l}={}){let c="";l==="plain"?c="pl":l==="phrase"?c="ph":l==="websearch"&&(c="w");const h=o===void 0?"":`(${o})`;return this.url.searchParams.append(n,`${c}fts${h}.${i}`),this}match(n){return Object.entries(n).forEach(([i,o])=>{this.url.searchParams.append(i,`eq.${o}`)}),this}not(n,i,o){return this.url.searchParams.append(n,`not.${i}.${o}`),this}or(n,{foreignTable:i,referencedTable:o=i}={}){const l=o?`${o}.or`:"or";return this.url.searchParams.append(l,`(${n})`),this}filter(n,i,o){return this.url.searchParams.append(n,`${i}.${o}`),this}};return Ge.default=a,Ge}var lr;function na(){if(lr)return Ke;lr=1,Object.defineProperty(Ke,"__esModule",{value:!0});const e=Ie.__importDefault(Wt());let t=class{constructor(s,{headers:n={},schema:i,fetch:o}){this.url=s,this.headers=new Headers(n),this.schema=i,this.fetch=o}select(s,n){const{head:i=!1,count:o}=n??{},l=i?"HEAD":"GET";let c=!1;const h=(s??"*").split("").map(g=>/\s/.test(g)&&!c?"":(g==='"'&&(c=!c),g)).join("");return this.url.searchParams.set("select",h),o&&this.headers.append("Prefer",`count=${o}`),new e.default({method:l,url:this.url,headers:this.headers,schema:this.schema,fetch:this.fetch})}insert(s,{count:n,defaultToNull:i=!0}={}){var o;const l="POST";if(n&&this.headers.append("Prefer",`count=${n}`),i||this.headers.append("Prefer","missing=default"),Array.isArray(s)){const c=s.reduce((h,g)=>h.concat(Object.keys(g)),[]);if(c.length>0){const h=[...new Set(c)].map(g=>`"${g}"`);this.url.searchParams.set("columns",h.join(","))}}return new e.default({method:l,url:this.url,headers:this.headers,schema:this.schema,body:s,fetch:(o=this.fetch)!==null&&o!==void 0?o:fetch})}upsert(s,{onConflict:n,ignoreDuplicates:i=!1,count:o,defaultToNull:l=!0}={}){var c;const h="POST";if(this.headers.append("Prefer",`resolution=${i?"ignore":"merge"}-duplicates`),n!==void 0&&this.url.searchParams.set("on_conflict",n),o&&this.headers.append("Prefer",`count=${o}`),l||this.headers.append("Prefer","missing=default"),Array.isArray(s)){const g=s.reduce((u,d)=>u.concat(Object.keys(d)),[]);if(g.length>0){const u=[...new Set(g)].map(d=>`"${d}"`);this.url.searchParams.set("columns",u.join(","))}}return new e.default({method:h,url:this.url,headers:this.headers,schema:this.schema,body:s,fetch:(c=this.fetch)!==null&&c!==void 0?c:fetch})}update(s,{count:n}={}){var i;const o="PATCH";return n&&this.headers.append("Prefer",`count=${n}`),new e.default({method:o,url:this.url,headers:this.headers,schema:this.schema,body:s,fetch:(i=this.fetch)!==null&&i!==void 0?i:fetch})}delete({count:s}={}){var n;const i="DELETE";return s&&this.headers.append("Prefer",`count=${s}`),new e.default({method:i,url:this.url,headers:this.headers,schema:this.schema,fetch:(n=this.fetch)!==null&&n!==void 0?n:fetch})}};return Ke.default=t,Ke}var cr;function Ps(){if(cr)return Fe;cr=1,Object.defineProperty(Fe,"__esModule",{value:!0});const r=Ie,e=r.__importDefault(na()),t=r.__importDefault(Wt());let a=class ia{constructor(n,{headers:i={},schema:o,fetch:l}={}){this.url=n,this.headers=new Headers(i),this.schemaName=o,this.fetch=l}from(n){if(!n||typeof n!="string"||n.trim()==="")throw new Error("Invalid relation name: relation must be a non-empty string.");const i=new URL(`${this.url}/${n}`);return new e.default(i,{headers:new Headers(this.headers),schema:this.schemaName,fetch:this.fetch})}schema(n){return new ia(this.url,{headers:this.headers,schema:n,fetch:this.fetch})}rpc(n,i={},{head:o=!1,get:l=!1,count:c}={}){var h;let g;const u=new URL(`${this.url}/rpc/${n}`);let d;o||l?(g=o?"HEAD":"GET",Object.entries(i).filter(([v,m])=>m!==void 0).map(([v,m])=>[v,Array.isArray(m)?`{${m.join(",")}}`:`${m}`]).forEach(([v,m])=>{u.searchParams.append(v,m)})):(g="POST",d=i);const p=new Headers(this.headers);return c&&p.set("Prefer",`count=${c}`),new t.default({method:g,url:u,headers:p,schema:this.schemaName,body:d,fetch:(h=this.fetch)!==null&&h!==void 0?h:fetch})}};return Fe.default=a,Fe}Object.defineProperty(W,"__esModule",{value:!0});W.PostgrestError=W.PostgrestBuilder=W.PostgrestTransformBuilder=W.PostgrestFilterBuilder=W.PostgrestQueryBuilder=W.PostgrestClient=void 0;const Le=Ie,oa=Le.__importDefault(Ps());W.PostgrestClient=oa.default;const la=Le.__importDefault(na());W.PostgrestQueryBuilder=la.default;const ca=Le.__importDefault(Wt());W.PostgrestFilterBuilder=ca.default;const da=Le.__importDefault(sa());W.PostgrestTransformBuilder=da.default;const ua=Le.__importDefault(aa());W.PostgrestBuilder=ua.default;const ha=Le.__importDefault(ra());W.PostgrestError=ha.default;W.default={PostgrestClient:oa.default,PostgrestQueryBuilder:la.default,PostgrestFilterBuilder:ca.default,PostgrestTransformBuilder:da.default,PostgrestBuilder:ua.default,PostgrestError:ha.default};class pa{constructor(){}static detectEnvironment(){var e;if(typeof WebSocket<"u")return{type:"native",constructor:WebSocket};if(typeof globalThis<"u"&&typeof globalThis.WebSocket<"u")return{type:"native",constructor:globalThis.WebSocket};if(typeof global<"u"&&typeof global.WebSocket<"u")return{type:"native",constructor:global.WebSocket};if(typeof globalThis<"u"&&typeof globalThis.WebSocketPair<"u"&&typeof globalThis.WebSocket>"u")return{type:"cloudflare",error:"Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",workaround:"Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."};if(typeof globalThis<"u"&&globalThis.EdgeRuntime||typeof navigator<"u"&&(!((e=navigator.userAgent)===null||e===void 0)&&e.includes("Vercel-Edge")))return{type:"unsupported",error:"Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",workaround:"Use serverless functions or a different deployment target for WebSocket functionality."};if(typeof process<"u"){const t=process.versions;if(t&&t.node){const a=t.node,s=parseInt(a.replace(/^v/,"").split(".")[0]);return s>=22?typeof globalThis.WebSocket<"u"?{type:"native",constructor:globalThis.WebSocket}:{type:"unsupported",error:`Node.js ${s} detected but native WebSocket not found.`,workaround:"Provide a WebSocket implementation via the transport option."}:{type:"unsupported",error:`Node.js ${s} detected without native WebSocket support.`,workaround:`For Node.js < 22, install "ws" package and provide it via the transport option:
import ws from "ws"
new RealtimeClient(url, { transport: ws })`}}}return{type:"unsupported",error:"Unknown JavaScript runtime without WebSocket support.",workaround:"Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."}}static getWebSocketConstructor(){const e=this.detectEnvironment();if(e.constructor)return e.constructor;let t=e.error||"WebSocket not supported in this environment.";throw e.workaround&&(t+=`

Suggested solution: ${e.workaround}`),new Error(t)}static createWebSocket(e,t){const a=this.getWebSocketConstructor();return new a(e,t)}static isWebSocketSupported(){try{const e=this.detectEnvironment();return e.type==="native"||e.type==="ws"}catch{return!1}}}const Rs="2.86.2",$s=`realtime-js/${Rs}`,ga="1.0.0",zs="2.0.0",dr=ga,Pt=1e4,Is=1e3,Ls=100;var ye;(function(r){r[r.connecting=0]="connecting",r[r.open=1]="open",r[r.closing=2]="closing",r[r.closed=3]="closed"})(ye||(ye={}));var D;(function(r){r.closed="closed",r.errored="errored",r.joined="joined",r.joining="joining",r.leaving="leaving"})(D||(D={}));var se;(function(r){r.close="phx_close",r.error="phx_error",r.join="phx_join",r.reply="phx_reply",r.leave="phx_leave",r.access_token="access_token"})(se||(se={}));var Rt;(function(r){r.websocket="websocket"})(Rt||(Rt={}));var we;(function(r){r.Connecting="connecting",r.Open="open",r.Closing="closing",r.Closed="closed"})(we||(we={}));class Ns{constructor(e){this.HEADER_LENGTH=1,this.USER_BROADCAST_PUSH_META_LENGTH=6,this.KINDS={userBroadcastPush:3,userBroadcast:4},this.BINARY_ENCODING=0,this.JSON_ENCODING=1,this.BROADCAST_EVENT="broadcast",this.allowedMetadataKeys=[],this.allowedMetadataKeys=e??[]}encode(e,t){if(e.event===this.BROADCAST_EVENT&&!(e.payload instanceof ArrayBuffer)&&typeof e.payload.event=="string")return t(this._binaryEncodeUserBroadcastPush(e));let a=[e.join_ref,e.ref,e.topic,e.event,e.payload];return t(JSON.stringify(a))}_binaryEncodeUserBroadcastPush(e){var t;return this._isArrayBuffer((t=e.payload)===null||t===void 0?void 0:t.payload)?this._encodeBinaryUserBroadcastPush(e):this._encodeJsonUserBroadcastPush(e)}_encodeBinaryUserBroadcastPush(e){var t,a;const s=(a=(t=e.payload)===null||t===void 0?void 0:t.payload)!==null&&a!==void 0?a:new ArrayBuffer(0);return this._encodeUserBroadcastPush(e,this.BINARY_ENCODING,s)}_encodeJsonUserBroadcastPush(e){var t,a;const s=(a=(t=e.payload)===null||t===void 0?void 0:t.payload)!==null&&a!==void 0?a:{},i=new TextEncoder().encode(JSON.stringify(s)).buffer;return this._encodeUserBroadcastPush(e,this.JSON_ENCODING,i)}_encodeUserBroadcastPush(e,t,a){var s,n;const i=e.topic,o=(s=e.ref)!==null&&s!==void 0?s:"",l=(n=e.join_ref)!==null&&n!==void 0?n:"",c=e.payload.event,h=this.allowedMetadataKeys?this._pick(e.payload,this.allowedMetadataKeys):{},g=Object.keys(h).length===0?"":JSON.stringify(h);if(l.length>255)throw new Error(`joinRef length ${l.length} exceeds maximum of 255`);if(o.length>255)throw new Error(`ref length ${o.length} exceeds maximum of 255`);if(i.length>255)throw new Error(`topic length ${i.length} exceeds maximum of 255`);if(c.length>255)throw new Error(`userEvent length ${c.length} exceeds maximum of 255`);if(g.length>255)throw new Error(`metadata length ${g.length} exceeds maximum of 255`);const u=this.USER_BROADCAST_PUSH_META_LENGTH+l.length+o.length+i.length+c.length+g.length,d=new ArrayBuffer(this.HEADER_LENGTH+u);let p=new DataView(d),v=0;p.setUint8(v++,this.KINDS.userBroadcastPush),p.setUint8(v++,l.length),p.setUint8(v++,o.length),p.setUint8(v++,i.length),p.setUint8(v++,c.length),p.setUint8(v++,g.length),p.setUint8(v++,t),Array.from(l,f=>p.setUint8(v++,f.charCodeAt(0))),Array.from(o,f=>p.setUint8(v++,f.charCodeAt(0))),Array.from(i,f=>p.setUint8(v++,f.charCodeAt(0))),Array.from(c,f=>p.setUint8(v++,f.charCodeAt(0))),Array.from(g,f=>p.setUint8(v++,f.charCodeAt(0)));var m=new Uint8Array(d.byteLength+a.byteLength);return m.set(new Uint8Array(d),0),m.set(new Uint8Array(a),d.byteLength),m.buffer}decode(e,t){if(this._isArrayBuffer(e)){let a=this._binaryDecode(e);return t(a)}if(typeof e=="string"){const a=JSON.parse(e),[s,n,i,o,l]=a;return t({join_ref:s,ref:n,topic:i,event:o,payload:l})}return t({})}_binaryDecode(e){const t=new DataView(e),a=t.getUint8(0),s=new TextDecoder;switch(a){case this.KINDS.userBroadcast:return this._decodeUserBroadcast(e,t,s)}}_decodeUserBroadcast(e,t,a){const s=t.getUint8(1),n=t.getUint8(2),i=t.getUint8(3),o=t.getUint8(4);let l=this.HEADER_LENGTH+4;const c=a.decode(e.slice(l,l+s));l=l+s;const h=a.decode(e.slice(l,l+n));l=l+n;const g=a.decode(e.slice(l,l+i));l=l+i;const u=e.slice(l,e.byteLength),d=o===this.JSON_ENCODING?JSON.parse(a.decode(u)):u,p={type:this.BROADCAST_EVENT,event:h,payload:d};return i>0&&(p.meta=JSON.parse(g)),{join_ref:null,ref:null,topic:c,event:this.BROADCAST_EVENT,payload:p}}_isArrayBuffer(e){var t;return e instanceof ArrayBuffer||((t=e==null?void 0:e.constructor)===null||t===void 0?void 0:t.name)==="ArrayBuffer"}_pick(e,t){return!e||typeof e!="object"?{}:Object.fromEntries(Object.entries(e).filter(([a])=>t.includes(a)))}}class ma{constructor(e,t){this.callback=e,this.timerCalc=t,this.timer=void 0,this.tries=0,this.callback=e,this.timerCalc=t}reset(){this.tries=0,clearTimeout(this.timer),this.timer=void 0}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries=this.tries+1,this.callback()},this.timerCalc(this.tries+1))}}var L;(function(r){r.abstime="abstime",r.bool="bool",r.date="date",r.daterange="daterange",r.float4="float4",r.float8="float8",r.int2="int2",r.int4="int4",r.int4range="int4range",r.int8="int8",r.int8range="int8range",r.json="json",r.jsonb="jsonb",r.money="money",r.numeric="numeric",r.oid="oid",r.reltime="reltime",r.text="text",r.time="time",r.timestamp="timestamp",r.timestamptz="timestamptz",r.timetz="timetz",r.tsrange="tsrange",r.tstzrange="tstzrange"})(L||(L={}));const ur=(r,e,t={})=>{var a;const s=(a=t.skipTypes)!==null&&a!==void 0?a:[];return e?Object.keys(e).reduce((n,i)=>(n[i]=Ms(i,r,e,s),n),{}):{}},Ms=(r,e,t,a)=>{const s=e.find(o=>o.name===r),n=s==null?void 0:s.type,i=t[r];return n&&!a.includes(n)?va(n,i):$t(i)},va=(r,e)=>{if(r.charAt(0)==="_"){const t=r.slice(1,r.length);return Ds(e,t)}switch(r){case L.bool:return Us(e);case L.float4:case L.float8:case L.int2:case L.int4:case L.int8:case L.numeric:case L.oid:return qs(e);case L.json:case L.jsonb:return Bs(e);case L.timestamp:return Hs(e);case L.abstime:case L.date:case L.daterange:case L.int4range:case L.int8range:case L.money:case L.reltime:case L.text:case L.time:case L.timestamptz:case L.timetz:case L.tsrange:case L.tstzrange:return $t(e);default:return $t(e)}},$t=r=>r,Us=r=>{switch(r){case"t":return!0;case"f":return!1;default:return r}},qs=r=>{if(typeof r=="string"){const e=parseFloat(r);if(!Number.isNaN(e))return e}return r},Bs=r=>{if(typeof r=="string")try{return JSON.parse(r)}catch(e){return console.log(`JSON parse error: ${e}`),r}return r},Ds=(r,e)=>{if(typeof r!="string")return r;const t=r.length-1,a=r[t];if(r[0]==="{"&&a==="}"){let n;const i=r.slice(1,t);try{n=JSON.parse("["+i+"]")}catch{n=i?i.split(","):[]}return n.map(o=>va(e,o))}return r},Hs=r=>typeof r=="string"?r.replace(" ","T"):r,fa=r=>{const e=new URL(r);return e.protocol=e.protocol.replace(/^ws/i,"http"),e.pathname=e.pathname.replace(/\/+$/,"").replace(/\/socket\/websocket$/i,"").replace(/\/socket$/i,"").replace(/\/websocket$/i,""),e.pathname===""||e.pathname==="/"?e.pathname="/api/broadcast":e.pathname=e.pathname+"/api/broadcast",e.href};class _t{constructor(e,t,a={},s=Pt){this.channel=e,this.event=t,this.payload=a,this.timeout=s,this.sent=!1,this.timeoutTimer=void 0,this.ref="",this.receivedResp=null,this.recHooks=[],this.refEvent=null}resend(e){this.timeout=e,this._cancelRefEvent(),this.ref="",this.refEvent=null,this.receivedResp=null,this.sent=!1,this.send()}send(){this._hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload,ref:this.ref,join_ref:this.channel._joinRef()}))}updatePayload(e){this.payload=Object.assign(Object.assign({},this.payload),e)}receive(e,t){var a;return this._hasReceived(e)&&t((a=this.receivedResp)===null||a===void 0?void 0:a.response),this.recHooks.push({status:e,callback:t}),this}startTimeout(){if(this.timeoutTimer)return;this.ref=this.channel.socket._makeRef(),this.refEvent=this.channel._replyEventName(this.ref);const e=t=>{this._cancelRefEvent(),this._cancelTimeout(),this.receivedResp=t,this._matchReceive(t)};this.channel._on(this.refEvent,{},e),this.timeoutTimer=setTimeout(()=>{this.trigger("timeout",{})},this.timeout)}trigger(e,t){this.refEvent&&this.channel._trigger(this.refEvent,{status:e,response:t})}destroy(){this._cancelRefEvent(),this._cancelTimeout()}_cancelRefEvent(){this.refEvent&&this.channel._off(this.refEvent,{})}_cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=void 0}_matchReceive({status:e,response:t}){this.recHooks.filter(a=>a.status===e).forEach(a=>a.callback(t))}_hasReceived(e){return this.receivedResp&&this.receivedResp.status===e}}var zt;(function(r){r.SYNC="sync",r.JOIN="join",r.LEAVE="leave"})(zt||(zt={}));let ba=class et{constructor(e,t){this.channel=e,this.state={},this.pendingDiffs=[],this.joinRef=null,this.enabled=!1,this.caller={onJoin:()=>{},onLeave:()=>{},onSync:()=>{}};const a=(t==null?void 0:t.events)||{state:"presence_state",diff:"presence_diff"};this.channel._on(a.state,{},s=>{const{onJoin:n,onLeave:i,onSync:o}=this.caller;this.joinRef=this.channel._joinRef(),this.state=et.syncState(this.state,s,n,i),this.pendingDiffs.forEach(l=>{this.state=et.syncDiff(this.state,l,n,i)}),this.pendingDiffs=[],o()}),this.channel._on(a.diff,{},s=>{const{onJoin:n,onLeave:i,onSync:o}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(s):(this.state=et.syncDiff(this.state,s,n,i),o())}),this.onJoin((s,n,i)=>{this.channel._trigger("presence",{event:"join",key:s,currentPresences:n,newPresences:i})}),this.onLeave((s,n,i)=>{this.channel._trigger("presence",{event:"leave",key:s,currentPresences:n,leftPresences:i})}),this.onSync(()=>{this.channel._trigger("presence",{event:"sync"})})}static syncState(e,t,a,s){const n=this.cloneDeep(e),i=this.transformState(t),o={},l={};return this.map(n,(c,h)=>{i[c]||(l[c]=h)}),this.map(i,(c,h)=>{const g=n[c];if(g){const u=h.map(m=>m.presence_ref),d=g.map(m=>m.presence_ref),p=h.filter(m=>d.indexOf(m.presence_ref)<0),v=g.filter(m=>u.indexOf(m.presence_ref)<0);p.length>0&&(o[c]=p),v.length>0&&(l[c]=v)}else o[c]=h}),this.syncDiff(n,{joins:o,leaves:l},a,s)}static syncDiff(e,t,a,s){const{joins:n,leaves:i}={joins:this.transformState(t.joins),leaves:this.transformState(t.leaves)};return a||(a=()=>{}),s||(s=()=>{}),this.map(n,(o,l)=>{var c;const h=(c=e[o])!==null&&c!==void 0?c:[];if(e[o]=this.cloneDeep(l),h.length>0){const g=e[o].map(d=>d.presence_ref),u=h.filter(d=>g.indexOf(d.presence_ref)<0);e[o].unshift(...u)}a(o,h,l)}),this.map(i,(o,l)=>{let c=e[o];if(!c)return;const h=l.map(g=>g.presence_ref);c=c.filter(g=>h.indexOf(g.presence_ref)<0),e[o]=c,s(o,c,l),c.length===0&&delete e[o]}),e}static map(e,t){return Object.getOwnPropertyNames(e).map(a=>t(a,e[a]))}static transformState(e){return e=this.cloneDeep(e),Object.getOwnPropertyNames(e).reduce((t,a)=>{const s=e[a];return"metas"in s?t[a]=s.metas.map(n=>(n.presence_ref=n.phx_ref,delete n.phx_ref,delete n.phx_ref_prev,n)):t[a]=s,t},{})}static cloneDeep(e){return JSON.parse(JSON.stringify(e))}onJoin(e){this.caller.onJoin=e}onLeave(e){this.caller.onLeave=e}onSync(e){this.caller.onSync=e}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel._joinRef()}};var It;(function(r){r.ALL="*",r.INSERT="INSERT",r.UPDATE="UPDATE",r.DELETE="DELETE"})(It||(It={}));var Oe;(function(r){r.BROADCAST="broadcast",r.PRESENCE="presence",r.POSTGRES_CHANGES="postgres_changes",r.SYSTEM="system"})(Oe||(Oe={}));var ie;(function(r){r.SUBSCRIBED="SUBSCRIBED",r.TIMED_OUT="TIMED_OUT",r.CLOSED="CLOSED",r.CHANNEL_ERROR="CHANNEL_ERROR"})(ie||(ie={}));const Vs=D;let ya=class wa{constructor(e,t={config:{}},a){var s,n;if(this.topic=e,this.params=t,this.socket=a,this.bindings={},this.state=D.closed,this.joinedOnce=!1,this.pushBuffer=[],this.subTopic=e.replace(/^realtime:/i,""),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},t.config),this.timeout=this.socket.timeout,this.joinPush=new _t(this,se.join,this.params,this.timeout),this.rejoinTimer=new ma(()=>this._rejoinUntilConnected(),this.socket.reconnectAfterMs),this.joinPush.receive("ok",()=>{this.state=D.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(i=>i.send()),this.pushBuffer=[]}),this._onClose(()=>{this.rejoinTimer.reset(),this.socket.log("channel",`close ${this.topic} ${this._joinRef()}`),this.state=D.closed,this.socket._remove(this)}),this._onError(i=>{this._isLeaving()||this._isClosed()||(this.socket.log("channel",`error ${this.topic}`,i),this.state=D.errored,this.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("timeout",()=>{this._isJoining()&&(this.socket.log("channel",`timeout ${this.topic}`,this.joinPush.timeout),this.state=D.errored,this.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("error",i=>{this._isLeaving()||this._isClosed()||(this.socket.log("channel",`error ${this.topic}`,i),this.state=D.errored,this.rejoinTimer.scheduleTimeout())}),this._on(se.reply,{},(i,o)=>{this._trigger(this._replyEventName(o),i)}),this.presence=new ba(this),this.broadcastEndpointURL=fa(this.socket.endPoint),this.private=this.params.config.private||!1,!this.private&&(!((n=(s=this.params.config)===null||s===void 0?void 0:s.broadcast)===null||n===void 0)&&n.replay))throw`tried to use replay on public channel '${this.topic}'. It must be a private channel.`}subscribe(e,t=this.timeout){var a,s,n;if(this.socket.isConnected()||this.socket.connect(),this.state==D.closed){const{config:{broadcast:i,presence:o,private:l}}=this.params,c=(s=(a=this.bindings.postgres_changes)===null||a===void 0?void 0:a.map(d=>d.filter))!==null&&s!==void 0?s:[],h=!!this.bindings[Oe.PRESENCE]&&this.bindings[Oe.PRESENCE].length>0||((n=this.params.config.presence)===null||n===void 0?void 0:n.enabled)===!0,g={},u={broadcast:i,presence:Object.assign(Object.assign({},o),{enabled:h}),postgres_changes:c,private:l};this.socket.accessTokenValue&&(g.access_token=this.socket.accessTokenValue),this._onError(d=>e==null?void 0:e(ie.CHANNEL_ERROR,d)),this._onClose(()=>e==null?void 0:e(ie.CLOSED)),this.updateJoinPayload(Object.assign({config:u},g)),this.joinedOnce=!0,this._rejoin(t),this.joinPush.receive("ok",async({postgres_changes:d})=>{var p;if(this.socket.setAuth(),d===void 0){e==null||e(ie.SUBSCRIBED);return}else{const v=this.bindings.postgres_changes,m=(p=v==null?void 0:v.length)!==null&&p!==void 0?p:0,f=[];for(let b=0;b<m;b++){const y=v[b],{filter:{event:k,schema:j,table:x,filter:w}}=y,A=d&&d[b];if(A&&A.event===k&&A.schema===j&&A.table===x&&A.filter===w)f.push(Object.assign(Object.assign({},y),{id:A.id}));else{this.unsubscribe(),this.state=D.errored,e==null||e(ie.CHANNEL_ERROR,new Error("mismatch between server and client bindings for postgres changes"));return}}this.bindings.postgres_changes=f,e&&e(ie.SUBSCRIBED);return}}).receive("error",d=>{this.state=D.errored,e==null||e(ie.CHANNEL_ERROR,new Error(JSON.stringify(Object.values(d).join(", ")||"error")))}).receive("timeout",()=>{e==null||e(ie.TIMED_OUT)})}return this}presenceState(){return this.presence.state}async track(e,t={}){return await this.send({type:"presence",event:"track",payload:e},t.timeout||this.timeout)}async untrack(e={}){return await this.send({type:"presence",event:"untrack"},e)}on(e,t,a){return this.state===D.joined&&e===Oe.PRESENCE&&(this.socket.log("channel",`resubscribe to ${this.topic} due to change in presence callbacks on joined channel`),this.unsubscribe().then(()=>this.subscribe())),this._on(e,t,a)}async httpSend(e,t,a={}){var s;const n=this.socket.accessTokenValue?`Bearer ${this.socket.accessTokenValue}`:"";if(t==null)return Promise.reject("Payload is required for httpSend()");const i={method:"POST",headers:{Authorization:n,apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"},body:JSON.stringify({messages:[{topic:this.subTopic,event:e,payload:t,private:this.private}]})},o=await this._fetchWithTimeout(this.broadcastEndpointURL,i,(s=a.timeout)!==null&&s!==void 0?s:this.timeout);if(o.status===202)return{success:!0};let l=o.statusText;try{const c=await o.json();l=c.error||c.message||l}catch{}return Promise.reject(new Error(l))}async send(e,t={}){var a,s;if(!this._canPush()&&e.type==="broadcast"){console.warn("Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");const{event:n,payload:i}=e,l={method:"POST",headers:{Authorization:this.socket.accessTokenValue?`Bearer ${this.socket.accessTokenValue}`:"",apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"},body:JSON.stringify({messages:[{topic:this.subTopic,event:n,payload:i,private:this.private}]})};try{const c=await this._fetchWithTimeout(this.broadcastEndpointURL,l,(a=t.timeout)!==null&&a!==void 0?a:this.timeout);return await((s=c.body)===null||s===void 0?void 0:s.cancel()),c.ok?"ok":"error"}catch(c){return c.name==="AbortError"?"timed out":"error"}}else return new Promise(n=>{var i,o,l;const c=this._push(e.type,e,t.timeout||this.timeout);e.type==="broadcast"&&!(!((l=(o=(i=this.params)===null||i===void 0?void 0:i.config)===null||o===void 0?void 0:o.broadcast)===null||l===void 0)&&l.ack)&&n("ok"),c.receive("ok",()=>n("ok")),c.receive("error",()=>n("error")),c.receive("timeout",()=>n("timed out"))})}updateJoinPayload(e){this.joinPush.updatePayload(e)}unsubscribe(e=this.timeout){this.state=D.leaving;const t=()=>{this.socket.log("channel",`leave ${this.topic}`),this._trigger(se.close,"leave",this._joinRef())};this.joinPush.destroy();let a=null;return new Promise(s=>{a=new _t(this,se.leave,{},e),a.receive("ok",()=>{t(),s("ok")}).receive("timeout",()=>{t(),s("timed out")}).receive("error",()=>{s("error")}),a.send(),this._canPush()||a.trigger("ok",{})}).finally(()=>{a==null||a.destroy()})}teardown(){this.pushBuffer.forEach(e=>e.destroy()),this.pushBuffer=[],this.rejoinTimer.reset(),this.joinPush.destroy(),this.state=D.closed,this.bindings={}}async _fetchWithTimeout(e,t,a){const s=new AbortController,n=setTimeout(()=>s.abort(),a),i=await this.socket.fetch(e,Object.assign(Object.assign({},t),{signal:s.signal}));return clearTimeout(n),i}_push(e,t,a=this.timeout){if(!this.joinedOnce)throw`tried to push '${e}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;let s=new _t(this,e,t,a);return this._canPush()?s.send():this._addToPushBuffer(s),s}_addToPushBuffer(e){if(e.startTimeout(),this.pushBuffer.push(e),this.pushBuffer.length>Ls){const t=this.pushBuffer.shift();t&&(t.destroy(),this.socket.log("channel",`discarded push due to buffer overflow: ${t.event}`,t.payload))}}_onMessage(e,t,a){return t}_isMember(e){return this.topic===e}_joinRef(){return this.joinPush.ref}_trigger(e,t,a){var s,n;const i=e.toLocaleLowerCase(),{close:o,error:l,leave:c,join:h}=se;if(a&&[o,l,c,h].indexOf(i)>=0&&a!==this._joinRef())return;let u=this._onMessage(i,t,a);if(t&&!u)throw"channel onMessage callbacks must return the payload, modified or unmodified";["insert","update","delete"].includes(i)?(s=this.bindings.postgres_changes)===null||s===void 0||s.filter(d=>{var p,v,m;return((p=d.filter)===null||p===void 0?void 0:p.event)==="*"||((m=(v=d.filter)===null||v===void 0?void 0:v.event)===null||m===void 0?void 0:m.toLocaleLowerCase())===i}).map(d=>d.callback(u,a)):(n=this.bindings[i])===null||n===void 0||n.filter(d=>{var p,v,m,f,b,y;if(["broadcast","presence","postgres_changes"].includes(i))if("id"in d){const k=d.id,j=(p=d.filter)===null||p===void 0?void 0:p.event;return k&&((v=t.ids)===null||v===void 0?void 0:v.includes(k))&&(j==="*"||(j==null?void 0:j.toLocaleLowerCase())===((m=t.data)===null||m===void 0?void 0:m.type.toLocaleLowerCase()))}else{const k=(b=(f=d==null?void 0:d.filter)===null||f===void 0?void 0:f.event)===null||b===void 0?void 0:b.toLocaleLowerCase();return k==="*"||k===((y=t==null?void 0:t.event)===null||y===void 0?void 0:y.toLocaleLowerCase())}else return d.type.toLocaleLowerCase()===i}).map(d=>{if(typeof u=="object"&&"ids"in u){const p=u.data,{schema:v,table:m,commit_timestamp:f,type:b,errors:y}=p;u=Object.assign(Object.assign({},{schema:v,table:m,commit_timestamp:f,eventType:b,new:{},old:{},errors:y}),this._getPayloadRecords(p))}d.callback(u,a)})}_isClosed(){return this.state===D.closed}_isJoined(){return this.state===D.joined}_isJoining(){return this.state===D.joining}_isLeaving(){return this.state===D.leaving}_replyEventName(e){return`chan_reply_${e}`}_on(e,t,a){const s=e.toLocaleLowerCase(),n={type:s,filter:t,callback:a};return this.bindings[s]?this.bindings[s].push(n):this.bindings[s]=[n],this}_off(e,t){const a=e.toLocaleLowerCase();return this.bindings[a]&&(this.bindings[a]=this.bindings[a].filter(s=>{var n;return!(((n=s.type)===null||n===void 0?void 0:n.toLocaleLowerCase())===a&&wa.isEqual(s.filter,t))})),this}static isEqual(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const a in e)if(e[a]!==t[a])return!1;return!0}_rejoinUntilConnected(){this.rejoinTimer.scheduleTimeout(),this.socket.isConnected()&&this._rejoin()}_onClose(e){this._on(se.close,{},e)}_onError(e){this._on(se.error,{},t=>e(t))}_canPush(){return this.socket.isConnected()&&this._isJoined()}_rejoin(e=this.timeout){this._isLeaving()||(this.socket._leaveOpenTopic(this.topic),this.state=D.joining,this.joinPush.resend(e))}_getPayloadRecords(e){const t={new:{},old:{}};return(e.type==="INSERT"||e.type==="UPDATE")&&(t.new=ur(e.columns,e.record)),(e.type==="UPDATE"||e.type==="DELETE")&&(t.old=ur(e.columns,e.old_record)),t}};const kt=()=>{},Ye={HEARTBEAT_INTERVAL:25e3,RECONNECT_DELAY:10,HEARTBEAT_TIMEOUT_FALLBACK:100},Fs=[1e3,2e3,5e3,1e4],Ks=1e4,Gs=`
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;let Ws=class{constructor(e,t){var a;if(this.accessTokenValue=null,this.apiKey=null,this.channels=new Array,this.endPoint="",this.httpEndpoint="",this.headers={},this.params={},this.timeout=Pt,this.transport=null,this.heartbeatIntervalMs=Ye.HEARTBEAT_INTERVAL,this.heartbeatTimer=void 0,this.pendingHeartbeatRef=null,this.heartbeatCallback=kt,this.ref=0,this.reconnectTimer=null,this.vsn=dr,this.logger=kt,this.conn=null,this.sendBuffer=[],this.serializer=new Ns,this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.accessToken=null,this._connectionState="disconnected",this._wasManualDisconnect=!1,this._authPromise=null,this._resolveFetch=s=>s?(...n)=>s(...n):(...n)=>fetch(...n),!(!((a=t==null?void 0:t.params)===null||a===void 0)&&a.apikey))throw new Error("API key is required to connect to Realtime");this.apiKey=t.params.apikey,this.endPoint=`${e}/${Rt.websocket}`,this.httpEndpoint=fa(e),this._initializeOptions(t),this._setupReconnectionTimer(),this.fetch=this._resolveFetch(t==null?void 0:t.fetch)}connect(){if(!(this.isConnecting()||this.isDisconnecting()||this.conn!==null&&this.isConnected())){if(this._setConnectionState("connecting"),this.accessToken&&!this._authPromise&&this._setAuthSafely("connect"),this.transport)this.conn=new this.transport(this.endpointURL());else try{this.conn=pa.createWebSocket(this.endpointURL())}catch(e){this._setConnectionState("disconnected");const t=e.message;throw t.includes("Node.js")?new Error(`${t}

To use Realtime in Node.js, you need to provide a WebSocket implementation:

Option 1: Use Node.js 22+ which has native WebSocket support
Option 2: Install and provide the "ws" package:

  npm install ws

  import ws from "ws"
  const client = new RealtimeClient(url, {
    ...options,
    transport: ws
  })`):new Error(`WebSocket not available: ${t}`)}this._setupConnectionHandlers()}}endpointURL(){return this._appendParams(this.endPoint,Object.assign({},this.params,{vsn:this.vsn}))}disconnect(e,t){if(!this.isDisconnecting())if(this._setConnectionState("disconnecting",!0),this.conn){const a=setTimeout(()=>{this._setConnectionState("disconnected")},100);this.conn.onclose=()=>{clearTimeout(a),this._setConnectionState("disconnected")},typeof this.conn.close=="function"&&(e?this.conn.close(e,t??""):this.conn.close()),this._teardownConnection()}else this._setConnectionState("disconnected")}getChannels(){return this.channels}async removeChannel(e){const t=await e.unsubscribe();return this.channels.length===0&&this.disconnect(),t}async removeAllChannels(){const e=await Promise.all(this.channels.map(t=>t.unsubscribe()));return this.channels=[],this.disconnect(),e}log(e,t,a){this.logger(e,t,a)}connectionState(){switch(this.conn&&this.conn.readyState){case ye.connecting:return we.Connecting;case ye.open:return we.Open;case ye.closing:return we.Closing;default:return we.Closed}}isConnected(){return this.connectionState()===we.Open}isConnecting(){return this._connectionState==="connecting"}isDisconnecting(){return this._connectionState==="disconnecting"}channel(e,t={config:{}}){const a=`realtime:${e}`,s=this.getChannels().find(n=>n.topic===a);if(s)return s;{const n=new ya(`realtime:${e}`,t,this);return this.channels.push(n),n}}push(e){const{topic:t,event:a,payload:s,ref:n}=e,i=()=>{this.encode(e,o=>{var l;(l=this.conn)===null||l===void 0||l.send(o)})};this.log("push",`${t} ${a} (${n})`,s),this.isConnected()?i():this.sendBuffer.push(i)}async setAuth(e=null){this._authPromise=this._performAuth(e);try{await this._authPromise}finally{this._authPromise=null}}async sendHeartbeat(){var e;if(!this.isConnected()){try{this.heartbeatCallback("disconnected")}catch(t){this.log("error","error in heartbeat callback",t)}return}if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this.log("transport","heartbeat timeout. Attempting to re-establish connection");try{this.heartbeatCallback("timeout")}catch(t){this.log("error","error in heartbeat callback",t)}this._wasManualDisconnect=!1,(e=this.conn)===null||e===void 0||e.close(Is,"heartbeat timeout"),setTimeout(()=>{var t;this.isConnected()||(t=this.reconnectTimer)===null||t===void 0||t.scheduleTimeout()},Ye.HEARTBEAT_TIMEOUT_FALLBACK);return}this.pendingHeartbeatRef=this._makeRef(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef});try{this.heartbeatCallback("sent")}catch(t){this.log("error","error in heartbeat callback",t)}this._setAuthSafely("heartbeat")}onHeartbeat(e){this.heartbeatCallback=e}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(e=>e()),this.sendBuffer=[])}_makeRef(){let e=this.ref+1;return e===this.ref?this.ref=0:this.ref=e,this.ref.toString()}_leaveOpenTopic(e){let t=this.channels.find(a=>a.topic===e&&(a._isJoined()||a._isJoining()));t&&(this.log("transport",`leaving duplicate topic "${e}"`),t.unsubscribe())}_remove(e){this.channels=this.channels.filter(t=>t.topic!==e.topic)}_onConnMessage(e){this.decode(e.data,t=>{if(t.topic==="phoenix"&&t.event==="phx_reply")try{this.heartbeatCallback(t.payload.status==="ok"?"ok":"error")}catch(c){this.log("error","error in heartbeat callback",c)}t.ref&&t.ref===this.pendingHeartbeatRef&&(this.pendingHeartbeatRef=null);const{topic:a,event:s,payload:n,ref:i}=t,o=i?`(${i})`:"",l=n.status||"";this.log("receive",`${l} ${a} ${s} ${o}`.trim(),n),this.channels.filter(c=>c._isMember(a)).forEach(c=>c._trigger(s,n,i)),this._triggerStateCallbacks("message",t)})}_clearTimer(e){var t;e==="heartbeat"&&this.heartbeatTimer?(clearInterval(this.heartbeatTimer),this.heartbeatTimer=void 0):e==="reconnect"&&((t=this.reconnectTimer)===null||t===void 0||t.reset())}_clearAllTimers(){this._clearTimer("heartbeat"),this._clearTimer("reconnect")}_setupConnectionHandlers(){this.conn&&("binaryType"in this.conn&&(this.conn.binaryType="arraybuffer"),this.conn.onopen=()=>this._onConnOpen(),this.conn.onerror=e=>this._onConnError(e),this.conn.onmessage=e=>this._onConnMessage(e),this.conn.onclose=e=>this._onConnClose(e))}_teardownConnection(){if(this.conn){if(this.conn.readyState===ye.open||this.conn.readyState===ye.connecting)try{this.conn.close()}catch(e){this.log("error","Error closing connection",e)}this.conn.onopen=null,this.conn.onerror=null,this.conn.onmessage=null,this.conn.onclose=null,this.conn=null}this._clearAllTimers(),this.channels.forEach(e=>e.teardown())}_onConnOpen(){this._setConnectionState("connected"),this.log("transport",`connected to ${this.endpointURL()}`),(this._authPromise||(this.accessToken&&!this.accessTokenValue?this.setAuth():Promise.resolve())).then(()=>{this.flushSendBuffer()}).catch(t=>{this.log("error","error waiting for auth on connect",t),this.flushSendBuffer()}),this._clearTimer("reconnect"),this.worker?this.workerRef||this._startWorkerHeartbeat():this._startHeartbeat(),this._triggerStateCallbacks("open")}_startHeartbeat(){this.heartbeatTimer&&clearInterval(this.heartbeatTimer),this.heartbeatTimer=setInterval(()=>this.sendHeartbeat(),this.heartbeatIntervalMs)}_startWorkerHeartbeat(){this.workerUrl?this.log("worker",`starting worker for from ${this.workerUrl}`):this.log("worker","starting default worker");const e=this._workerObjectUrl(this.workerUrl);this.workerRef=new Worker(e),this.workerRef.onerror=t=>{this.log("worker","worker error",t.message),this.workerRef.terminate()},this.workerRef.onmessage=t=>{t.data.event==="keepAlive"&&this.sendHeartbeat()},this.workerRef.postMessage({event:"start",interval:this.heartbeatIntervalMs})}_onConnClose(e){var t;this._setConnectionState("disconnected"),this.log("transport","close",e),this._triggerChanError(),this._clearTimer("heartbeat"),this._wasManualDisconnect||(t=this.reconnectTimer)===null||t===void 0||t.scheduleTimeout(),this._triggerStateCallbacks("close",e)}_onConnError(e){this._setConnectionState("disconnected"),this.log("transport",`${e}`),this._triggerChanError(),this._triggerStateCallbacks("error",e)}_triggerChanError(){this.channels.forEach(e=>e._trigger(se.error))}_appendParams(e,t){if(Object.keys(t).length===0)return e;const a=e.match(/\?/)?"&":"?",s=new URLSearchParams(t);return`${e}${a}${s}`}_workerObjectUrl(e){let t;if(e)t=e;else{const a=new Blob([Gs],{type:"application/javascript"});t=URL.createObjectURL(a)}return t}_setConnectionState(e,t=!1){this._connectionState=e,e==="connecting"?this._wasManualDisconnect=!1:e==="disconnecting"&&(this._wasManualDisconnect=t)}async _performAuth(e=null){let t;e?t=e:this.accessToken?t=await this.accessToken():t=this.accessTokenValue,this.accessTokenValue!=t&&(this.accessTokenValue=t,this.channels.forEach(a=>{const s={access_token:t,version:$s};t&&a.updateJoinPayload(s),a.joinedOnce&&a._isJoined()&&a._push(se.access_token,{access_token:t})}))}async _waitForAuthIfNeeded(){this._authPromise&&await this._authPromise}_setAuthSafely(e="general"){this.setAuth().catch(t=>{this.log("error",`error setting auth in ${e}`,t)})}_triggerStateCallbacks(e,t){try{this.stateChangeCallbacks[e].forEach(a=>{try{a(t)}catch(s){this.log("error",`error in ${e} callback`,s)}})}catch(a){this.log("error",`error triggering ${e} callbacks`,a)}}_setupReconnectionTimer(){this.reconnectTimer=new ma(async()=>{setTimeout(async()=>{await this._waitForAuthIfNeeded(),this.isConnected()||this.connect()},Ye.RECONNECT_DELAY)},this.reconnectAfterMs)}_initializeOptions(e){var t,a,s,n,i,o,l,c,h,g,u,d;switch(this.transport=(t=e==null?void 0:e.transport)!==null&&t!==void 0?t:null,this.timeout=(a=e==null?void 0:e.timeout)!==null&&a!==void 0?a:Pt,this.heartbeatIntervalMs=(s=e==null?void 0:e.heartbeatIntervalMs)!==null&&s!==void 0?s:Ye.HEARTBEAT_INTERVAL,this.worker=(n=e==null?void 0:e.worker)!==null&&n!==void 0?n:!1,this.accessToken=(i=e==null?void 0:e.accessToken)!==null&&i!==void 0?i:null,this.heartbeatCallback=(o=e==null?void 0:e.heartbeatCallback)!==null&&o!==void 0?o:kt,this.vsn=(l=e==null?void 0:e.vsn)!==null&&l!==void 0?l:dr,e!=null&&e.params&&(this.params=e.params),e!=null&&e.logger&&(this.logger=e.logger),(e!=null&&e.logLevel||e!=null&&e.log_level)&&(this.logLevel=e.logLevel||e.log_level,this.params=Object.assign(Object.assign({},this.params),{log_level:this.logLevel})),this.reconnectAfterMs=(c=e==null?void 0:e.reconnectAfterMs)!==null&&c!==void 0?c:p=>Fs[p-1]||Ks,this.vsn){case ga:this.encode=(h=e==null?void 0:e.encode)!==null&&h!==void 0?h:(p,v)=>v(JSON.stringify(p)),this.decode=(g=e==null?void 0:e.decode)!==null&&g!==void 0?g:(p,v)=>v(JSON.parse(p));break;case zs:this.encode=(u=e==null?void 0:e.encode)!==null&&u!==void 0?u:this.serializer.encode.bind(this.serializer),this.decode=(d=e==null?void 0:e.decode)!==null&&d!==void 0?d:this.serializer.decode.bind(this.serializer);break;default:throw new Error(`Unsupported serializer version: ${this.vsn}`)}if(this.worker){if(typeof window<"u"&&!window.Worker)throw new Error("Web Worker is not supported");this.workerUrl=e==null?void 0:e.workerUrl}}};const Js=Object.freeze(Object.defineProperty({__proto__:null,REALTIME_CHANNEL_STATES:Vs,get REALTIME_LISTEN_TYPES(){return Oe},get REALTIME_POSTGRES_CHANGES_LISTEN_EVENT(){return It},get REALTIME_PRESENCE_LISTEN_EVENTS(){return zt},get REALTIME_SUBSCRIBE_STATES(){return ie},RealtimeChannel:ya,RealtimeClient:Ws,RealtimePresence:ba,WebSocketFactory:pa},Symbol.toStringTag,{value:"Module"})),_a=Be(Js);class De extends Error{constructor(e){super(e),this.__isStorageError=!0,this.name="StorageError"}}function q(r){return typeof r=="object"&&r!==null&&"__isStorageError"in r}class ka extends De{constructor(e,t,a){super(e),this.name="StorageApiError",this.status=t,this.statusCode=a}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}}class lt extends De{constructor(e,t){super(e),this.name="StorageUnknownError",this.originalError=t}}const Jt=r=>r?(...e)=>r(...e):(...e)=>fetch(...e),Zs=()=>Response,Lt=r=>{if(Array.isArray(r))return r.map(t=>Lt(t));if(typeof r=="function"||r!==Object(r))return r;const e={};return Object.entries(r).forEach(([t,a])=>{const s=t.replace(/([-_][a-z])/gi,n=>n.toUpperCase().replace(/[-_]/g,""));e[s]=Lt(a)}),e},Ys=r=>{if(typeof r!="object"||r===null)return!1;const e=Object.getPrototypeOf(r);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in r)&&!(Symbol.iterator in r)},Xs=r=>!r||typeof r!="string"||r.length===0||r.length>100||r.trim()!==r||r.includes("/")||r.includes("\\")?!1:/^[\w!.\*'() &$@=;:+,?-]+$/.test(r),xt=r=>{var e;return r.msg||r.message||r.error_description||(typeof r.error=="string"?r.error:(e=r.error)===null||e===void 0?void 0:e.message)||JSON.stringify(r)},Qs=(r,e,t)=>E(void 0,void 0,void 0,function*(){const a=yield Zs();r instanceof a&&!(t!=null&&t.noResolveJson)?r.json().then(s=>{const n=r.status||500,i=(s==null?void 0:s.statusCode)||n+"";e(new ka(xt(s),n,i))}).catch(s=>{e(new lt(xt(s),s))}):e(new lt(xt(r),r))}),en=(r,e,t,a)=>{const s={method:r,headers:(e==null?void 0:e.headers)||{}};return r==="GET"||!a?s:(Ys(a)?(s.headers=Object.assign({"Content-Type":"application/json"},e==null?void 0:e.headers),s.body=JSON.stringify(a)):s.body=a,e!=null&&e.duplex&&(s.duplex=e.duplex),Object.assign(Object.assign({},s),t))};function He(r,e,t,a,s,n){return E(this,void 0,void 0,function*(){return new Promise((i,o)=>{r(t,en(e,a,s,n)).then(l=>{if(!l.ok)throw l;return a!=null&&a.noResolveJson?l:l.json()}).then(l=>i(l)).catch(l=>Qs(l,o,a))})})}function Ue(r,e,t,a){return E(this,void 0,void 0,function*(){return He(r,"GET",e,t,a)})}function ae(r,e,t,a,s){return E(this,void 0,void 0,function*(){return He(r,"POST",e,a,s,t)})}function Nt(r,e,t,a,s){return E(this,void 0,void 0,function*(){return He(r,"PUT",e,a,s,t)})}function tn(r,e,t,a){return E(this,void 0,void 0,function*(){return He(r,"HEAD",e,Object.assign(Object.assign({},t),{noResolveJson:!0}),a)})}function Zt(r,e,t,a,s){return E(this,void 0,void 0,function*(){return He(r,"DELETE",e,a,s,t)})}class rn{constructor(e,t){this.downloadFn=e,this.shouldThrowOnError=t}then(e,t){return this.execute().then(e,t)}execute(){return E(this,void 0,void 0,function*(){try{return{data:(yield this.downloadFn()).body,error:null}}catch(e){if(this.shouldThrowOnError)throw e;if(q(e))return{data:null,error:e};throw e}})}}var xa;class an{constructor(e,t){this.downloadFn=e,this.shouldThrowOnError=t,this[xa]="BlobDownloadBuilder",this.promise=null}asStream(){return new rn(this.downloadFn,this.shouldThrowOnError)}then(e,t){return this.getPromise().then(e,t)}catch(e){return this.getPromise().catch(e)}finally(e){return this.getPromise().finally(e)}getPromise(){return this.promise||(this.promise=this.execute()),this.promise}execute(){return E(this,void 0,void 0,function*(){try{return{data:yield(yield this.downloadFn()).blob(),error:null}}catch(e){if(this.shouldThrowOnError)throw e;if(q(e))return{data:null,error:e};throw e}})}}xa=Symbol.toStringTag;const sn={limit:100,offset:0,sortBy:{column:"name",order:"asc"}},hr={cacheControl:"3600",contentType:"text/plain;charset=UTF-8",upsert:!1};class nn{constructor(e,t={},a,s){this.shouldThrowOnError=!1,this.url=e,this.headers=t,this.bucketId=a,this.fetch=Jt(s)}throwOnError(){return this.shouldThrowOnError=!0,this}uploadOrUpdate(e,t,a,s){return E(this,void 0,void 0,function*(){try{let n;const i=Object.assign(Object.assign({},hr),s);let o=Object.assign(Object.assign({},this.headers),e==="POST"&&{"x-upsert":String(i.upsert)});const l=i.metadata;typeof Blob<"u"&&a instanceof Blob?(n=new FormData,n.append("cacheControl",i.cacheControl),l&&n.append("metadata",this.encodeMetadata(l)),n.append("",a)):typeof FormData<"u"&&a instanceof FormData?(n=a,n.has("cacheControl")||n.append("cacheControl",i.cacheControl),l&&!n.has("metadata")&&n.append("metadata",this.encodeMetadata(l))):(n=a,o["cache-control"]=`max-age=${i.cacheControl}`,o["content-type"]=i.contentType,l&&(o["x-metadata"]=this.toBase64(this.encodeMetadata(l))),(typeof ReadableStream<"u"&&n instanceof ReadableStream||n&&typeof n=="object"&&"pipe"in n&&typeof n.pipe=="function")&&!i.duplex&&(i.duplex="half")),s!=null&&s.headers&&(o=Object.assign(Object.assign({},o),s.headers));const c=this._removeEmptyFolders(t),h=this._getFinalPath(c),g=yield(e=="PUT"?Nt:ae)(this.fetch,`${this.url}/object/${h}`,n,Object.assign({headers:o},i!=null&&i.duplex?{duplex:i.duplex}:{}));return{data:{path:c,id:g.Id,fullPath:g.Key},error:null}}catch(n){if(this.shouldThrowOnError)throw n;if(q(n))return{data:null,error:n};throw n}})}upload(e,t,a){return E(this,void 0,void 0,function*(){return this.uploadOrUpdate("POST",e,t,a)})}uploadToSignedUrl(e,t,a,s){return E(this,void 0,void 0,function*(){const n=this._removeEmptyFolders(e),i=this._getFinalPath(n),o=new URL(this.url+`/object/upload/sign/${i}`);o.searchParams.set("token",t);try{let l;const c=Object.assign({upsert:hr.upsert},s),h=Object.assign(Object.assign({},this.headers),{"x-upsert":String(c.upsert)});typeof Blob<"u"&&a instanceof Blob?(l=new FormData,l.append("cacheControl",c.cacheControl),l.append("",a)):typeof FormData<"u"&&a instanceof FormData?(l=a,l.append("cacheControl",c.cacheControl)):(l=a,h["cache-control"]=`max-age=${c.cacheControl}`,h["content-type"]=c.contentType);const g=yield Nt(this.fetch,o.toString(),l,{headers:h});return{data:{path:n,fullPath:g.Key},error:null}}catch(l){if(this.shouldThrowOnError)throw l;if(q(l))return{data:null,error:l};throw l}})}createSignedUploadUrl(e,t){return E(this,void 0,void 0,function*(){try{let a=this._getFinalPath(e);const s=Object.assign({},this.headers);t!=null&&t.upsert&&(s["x-upsert"]="true");const n=yield ae(this.fetch,`${this.url}/object/upload/sign/${a}`,{},{headers:s}),i=new URL(this.url+n.url),o=i.searchParams.get("token");if(!o)throw new De("No token returned by API");return{data:{signedUrl:i.toString(),path:e,token:o},error:null}}catch(a){if(this.shouldThrowOnError)throw a;if(q(a))return{data:null,error:a};throw a}})}update(e,t,a){return E(this,void 0,void 0,function*(){return this.uploadOrUpdate("PUT",e,t,a)})}move(e,t,a){return E(this,void 0,void 0,function*(){try{return{data:yield ae(this.fetch,`${this.url}/object/move`,{bucketId:this.bucketId,sourceKey:e,destinationKey:t,destinationBucket:a==null?void 0:a.destinationBucket},{headers:this.headers}),error:null}}catch(s){if(this.shouldThrowOnError)throw s;if(q(s))return{data:null,error:s};throw s}})}copy(e,t,a){return E(this,void 0,void 0,function*(){try{return{data:{path:(yield ae(this.fetch,`${this.url}/object/copy`,{bucketId:this.bucketId,sourceKey:e,destinationKey:t,destinationBucket:a==null?void 0:a.destinationBucket},{headers:this.headers})).Key},error:null}}catch(s){if(this.shouldThrowOnError)throw s;if(q(s))return{data:null,error:s};throw s}})}createSignedUrl(e,t,a){return E(this,void 0,void 0,function*(){try{let s=this._getFinalPath(e),n=yield ae(this.fetch,`${this.url}/object/sign/${s}`,Object.assign({expiresIn:t},a!=null&&a.transform?{transform:a.transform}:{}),{headers:this.headers});const i=a!=null&&a.download?`&download=${a.download===!0?"":a.download}`:"";return n={signedUrl:encodeURI(`${this.url}${n.signedURL}${i}`)},{data:n,error:null}}catch(s){if(this.shouldThrowOnError)throw s;if(q(s))return{data:null,error:s};throw s}})}createSignedUrls(e,t,a){return E(this,void 0,void 0,function*(){try{const s=yield ae(this.fetch,`${this.url}/object/sign/${this.bucketId}`,{expiresIn:t,paths:e},{headers:this.headers}),n=a!=null&&a.download?`&download=${a.download===!0?"":a.download}`:"";return{data:s.map(i=>Object.assign(Object.assign({},i),{signedUrl:i.signedURL?encodeURI(`${this.url}${i.signedURL}${n}`):null})),error:null}}catch(s){if(this.shouldThrowOnError)throw s;if(q(s))return{data:null,error:s};throw s}})}download(e,t){const s=typeof(t==null?void 0:t.transform)<"u"?"render/image/authenticated":"object",n=this.transformOptsToQueryString((t==null?void 0:t.transform)||{}),i=n?`?${n}`:"",o=this._getFinalPath(e),l=()=>Ue(this.fetch,`${this.url}/${s}/${o}${i}`,{headers:this.headers,noResolveJson:!0});return new an(l,this.shouldThrowOnError)}info(e){return E(this,void 0,void 0,function*(){const t=this._getFinalPath(e);try{const a=yield Ue(this.fetch,`${this.url}/object/info/${t}`,{headers:this.headers});return{data:Lt(a),error:null}}catch(a){if(this.shouldThrowOnError)throw a;if(q(a))return{data:null,error:a};throw a}})}exists(e){return E(this,void 0,void 0,function*(){const t=this._getFinalPath(e);try{return yield tn(this.fetch,`${this.url}/object/${t}`,{headers:this.headers}),{data:!0,error:null}}catch(a){if(this.shouldThrowOnError)throw a;if(q(a)&&a instanceof lt){const s=a.originalError;if([400,404].includes(s==null?void 0:s.status))return{data:!1,error:a}}throw a}})}getPublicUrl(e,t){const a=this._getFinalPath(e),s=[],n=t!=null&&t.download?`download=${t.download===!0?"":t.download}`:"";n!==""&&s.push(n);const o=typeof(t==null?void 0:t.transform)<"u"?"render/image":"object",l=this.transformOptsToQueryString((t==null?void 0:t.transform)||{});l!==""&&s.push(l);let c=s.join("&");return c!==""&&(c=`?${c}`),{data:{publicUrl:encodeURI(`${this.url}/${o}/public/${a}${c}`)}}}remove(e){return E(this,void 0,void 0,function*(){try{return{data:yield Zt(this.fetch,`${this.url}/object/${this.bucketId}`,{prefixes:e},{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(q(t))return{data:null,error:t};throw t}})}list(e,t,a){return E(this,void 0,void 0,function*(){try{const s=Object.assign(Object.assign(Object.assign({},sn),t),{prefix:e||""});return{data:yield ae(this.fetch,`${this.url}/object/list/${this.bucketId}`,s,{headers:this.headers},a),error:null}}catch(s){if(this.shouldThrowOnError)throw s;if(q(s))return{data:null,error:s};throw s}})}listV2(e,t){return E(this,void 0,void 0,function*(){try{const a=Object.assign({},e);return{data:yield ae(this.fetch,`${this.url}/object/list-v2/${this.bucketId}`,a,{headers:this.headers},t),error:null}}catch(a){if(this.shouldThrowOnError)throw a;if(q(a))return{data:null,error:a};throw a}})}encodeMetadata(e){return JSON.stringify(e)}toBase64(e){return typeof Buffer<"u"?Buffer.from(e).toString("base64"):btoa(e)}_getFinalPath(e){return`${this.bucketId}/${e.replace(/^\/+/,"")}`}_removeEmptyFolders(e){return e.replace(/^\/|\/$/g,"").replace(/\/+/g,"/")}transformOptsToQueryString(e){const t=[];return e.width&&t.push(`width=${e.width}`),e.height&&t.push(`height=${e.height}`),e.resize&&t.push(`resize=${e.resize}`),e.format&&t.push(`format=${e.format}`),e.quality&&t.push(`quality=${e.quality}`),t.join("&")}}const ja="2.86.2",Ea={"X-Client-Info":`storage-js/${ja}`};class on{constructor(e,t={},a,s){this.shouldThrowOnError=!1;const n=new URL(e);s!=null&&s.useNewHostname&&/supabase\.(co|in|red)$/.test(n.hostname)&&!n.hostname.includes("storage.supabase.")&&(n.hostname=n.hostname.replace("supabase.","storage.supabase.")),this.url=n.href.replace(/\/$/,""),this.headers=Object.assign(Object.assign({},Ea),t),this.fetch=Jt(a)}throwOnError(){return this.shouldThrowOnError=!0,this}listBuckets(e){return E(this,void 0,void 0,function*(){try{const t=this.listBucketOptionsToQueryString(e);return{data:yield Ue(this.fetch,`${this.url}/bucket${t}`,{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(q(t))return{data:null,error:t};throw t}})}getBucket(e){return E(this,void 0,void 0,function*(){try{return{data:yield Ue(this.fetch,`${this.url}/bucket/${e}`,{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(q(t))return{data:null,error:t};throw t}})}createBucket(e){return E(this,arguments,void 0,function*(t,a={public:!1}){try{return{data:yield ae(this.fetch,`${this.url}/bucket`,{id:t,name:t,type:a.type,public:a.public,file_size_limit:a.fileSizeLimit,allowed_mime_types:a.allowedMimeTypes},{headers:this.headers}),error:null}}catch(s){if(this.shouldThrowOnError)throw s;if(q(s))return{data:null,error:s};throw s}})}updateBucket(e,t){return E(this,void 0,void 0,function*(){try{return{data:yield Nt(this.fetch,`${this.url}/bucket/${e}`,{id:e,name:e,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:this.headers}),error:null}}catch(a){if(this.shouldThrowOnError)throw a;if(q(a))return{data:null,error:a};throw a}})}emptyBucket(e){return E(this,void 0,void 0,function*(){try{return{data:yield ae(this.fetch,`${this.url}/bucket/${e}/empty`,{},{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(q(t))return{data:null,error:t};throw t}})}deleteBucket(e){return E(this,void 0,void 0,function*(){try{return{data:yield Zt(this.fetch,`${this.url}/bucket/${e}`,{},{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(q(t))return{data:null,error:t};throw t}})}listBucketOptionsToQueryString(e){const t={};return e&&("limit"in e&&(t.limit=String(e.limit)),"offset"in e&&(t.offset=String(e.offset)),e.search&&(t.search=e.search),e.sortColumn&&(t.sortColumn=e.sortColumn),e.sortOrder&&(t.sortOrder=e.sortOrder)),Object.keys(t).length>0?"?"+new URLSearchParams(t).toString():""}}var qe=class extends Error{constructor(r,e){var t;super(r),this.name="IcebergError",this.status=e.status,this.icebergType=e.icebergType,this.icebergCode=e.icebergCode,this.details=e.details,this.isCommitStateUnknown=e.icebergType==="CommitStateUnknownException"||[500,502,504].includes(e.status)&&((t=e.icebergType)==null?void 0:t.includes("CommitState"))===!0}isNotFound(){return this.status===404}isConflict(){return this.status===409}isAuthenticationTimeout(){return this.status===419}};function ln(r,e,t){const a=new URL(e,r);if(t)for(const[s,n]of Object.entries(t))n!==void 0&&a.searchParams.set(s,n);return a.toString()}async function cn(r){return!r||r.type==="none"?{}:r.type==="bearer"?{Authorization:`Bearer ${r.token}`}:r.type==="header"?{[r.name]:r.value}:r.type==="custom"?await r.getHeaders():{}}function dn(r){const e=r.fetchImpl??globalThis.fetch;return{async request({method:t,path:a,query:s,body:n,headers:i}){const o=ln(r.baseUrl,a,s),l=await cn(r.auth),c=await e(o,{method:t,headers:{...n?{"Content-Type":"application/json"}:{},...l,...i},body:n?JSON.stringify(n):void 0}),h=await c.text(),g=(c.headers.get("content-type")||"").includes("application/json"),u=g&&h?JSON.parse(h):h;if(!c.ok){const d=g?u:void 0,p=d==null?void 0:d.error;throw new qe((p==null?void 0:p.message)??`Request failed with status ${c.status}`,{status:c.status,icebergType:p==null?void 0:p.type,icebergCode:p==null?void 0:p.code,details:d})}return{status:c.status,headers:c.headers,data:u}}}}function Xe(r){return r.join("")}var un=class{constructor(r,e=""){this.client=r,this.prefix=e}async listNamespaces(r){const e=r?{parent:Xe(r.namespace)}:void 0;return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces`,query:e})).data.namespaces.map(a=>({namespace:a}))}async createNamespace(r,e){const t={namespace:r.namespace,properties:e==null?void 0:e.properties};return(await this.client.request({method:"POST",path:`${this.prefix}/namespaces`,body:t})).data}async dropNamespace(r){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${Xe(r.namespace)}`})}async loadNamespaceMetadata(r){return{properties:(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${Xe(r.namespace)}`})).data.properties}}async namespaceExists(r){try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${Xe(r.namespace)}`}),!0}catch(e){if(e instanceof qe&&e.status===404)return!1;throw e}}async createNamespaceIfNotExists(r,e){try{return await this.createNamespace(r,e)}catch(t){if(t instanceof qe&&t.status===409)return;throw t}}};function xe(r){return r.join("")}var hn=class{constructor(r,e="",t){this.client=r,this.prefix=e,this.accessDelegation=t}async listTables(r){return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${xe(r.namespace)}/tables`})).data.identifiers}async createTable(r,e){const t={};return this.accessDelegation&&(t["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${xe(r.namespace)}/tables`,body:e,headers:t})).data.metadata}async updateTable(r,e){const t=await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${xe(r.namespace)}/tables/${r.name}`,body:e});return{"metadata-location":t.data["metadata-location"],metadata:t.data.metadata}}async dropTable(r,e){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${xe(r.namespace)}/tables/${r.name}`,query:{purgeRequested:String((e==null?void 0:e.purge)??!1)}})}async loadTable(r){const e={};return this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${xe(r.namespace)}/tables/${r.name}`,headers:e})).data.metadata}async tableExists(r){const e={};this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation);try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${xe(r.namespace)}/tables/${r.name}`,headers:e}),!0}catch(t){if(t instanceof qe&&t.status===404)return!1;throw t}}async createTableIfNotExists(r,e){try{return await this.createTable(r,e)}catch(t){if(t instanceof qe&&t.status===409)return await this.loadTable({namespace:r.namespace,name:e.name});throw t}}},pn=class{constructor(r){var a;let e="v1";r.catalogName&&(e+=`/${r.catalogName}`);const t=r.baseUrl.endsWith("/")?r.baseUrl:`${r.baseUrl}/`;this.client=dn({baseUrl:t,auth:r.auth,fetchImpl:r.fetch}),this.accessDelegation=(a=r.accessDelegation)==null?void 0:a.join(","),this.namespaceOps=new un(this.client,e),this.tableOps=new hn(this.client,e,this.accessDelegation)}async listNamespaces(r){return this.namespaceOps.listNamespaces(r)}async createNamespace(r,e){return this.namespaceOps.createNamespace(r,e)}async dropNamespace(r){await this.namespaceOps.dropNamespace(r)}async loadNamespaceMetadata(r){return this.namespaceOps.loadNamespaceMetadata(r)}async listTables(r){return this.tableOps.listTables(r)}async createTable(r,e){return this.tableOps.createTable(r,e)}async updateTable(r,e){return this.tableOps.updateTable(r,e)}async dropTable(r,e){await this.tableOps.dropTable(r,e)}async loadTable(r){return this.tableOps.loadTable(r)}async namespaceExists(r){return this.namespaceOps.namespaceExists(r)}async tableExists(r){return this.tableOps.tableExists(r)}async createNamespaceIfNotExists(r,e){return this.namespaceOps.createNamespaceIfNotExists(r,e)}async createTableIfNotExists(r,e){return this.tableOps.createTableIfNotExists(r,e)}};class Sa{constructor(e,t={},a){this.shouldThrowOnError=!1,this.url=e.replace(/\/$/,""),this.headers=Object.assign(Object.assign({},Ea),t),this.fetch=Jt(a)}throwOnError(){return this.shouldThrowOnError=!0,this}createBucket(e){return E(this,void 0,void 0,function*(){try{return{data:yield ae(this.fetch,`${this.url}/bucket`,{name:e},{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(q(t))return{data:null,error:t};throw t}})}listBuckets(e){return E(this,void 0,void 0,function*(){try{const t=new URLSearchParams;(e==null?void 0:e.limit)!==void 0&&t.set("limit",e.limit.toString()),(e==null?void 0:e.offset)!==void 0&&t.set("offset",e.offset.toString()),e!=null&&e.sortColumn&&t.set("sortColumn",e.sortColumn),e!=null&&e.sortOrder&&t.set("sortOrder",e.sortOrder),e!=null&&e.search&&t.set("search",e.search);const a=t.toString(),s=a?`${this.url}/bucket?${a}`:`${this.url}/bucket`;return{data:yield Ue(this.fetch,s,{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(q(t))return{data:null,error:t};throw t}})}deleteBucket(e){return E(this,void 0,void 0,function*(){try{return{data:yield Zt(this.fetch,`${this.url}/bucket/${e}`,{},{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(q(t))return{data:null,error:t};throw t}})}from(e){if(!Xs(e))throw new De("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");return new pn({baseUrl:this.url,catalogName:e,auth:{type:"custom",getHeaders:()=>E(this,void 0,void 0,function*(){return this.headers})},fetch:this.fetch})}}const Yt={"X-Client-Info":`storage-js/${ja}`,"Content-Type":"application/json"};class Xt extends Error{constructor(e){super(e),this.__isStorageVectorsError=!0,this.name="StorageVectorsError"}}function X(r){return typeof r=="object"&&r!==null&&"__isStorageVectorsError"in r}class tt extends Xt{constructor(e,t,a){super(e),this.name="StorageVectorsApiError",this.status=t,this.statusCode=a}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}}class Ta extends Xt{constructor(e,t){super(e),this.name="StorageVectorsUnknownError",this.originalError=t}}var Mt;(function(r){r.InternalError="InternalError",r.S3VectorConflictException="S3VectorConflictException",r.S3VectorNotFoundException="S3VectorNotFoundException",r.S3VectorBucketNotEmpty="S3VectorBucketNotEmpty",r.S3VectorMaxBucketsExceeded="S3VectorMaxBucketsExceeded",r.S3VectorMaxIndexesExceeded="S3VectorMaxIndexesExceeded"})(Mt||(Mt={}));const ft=r=>r?(...e)=>r(...e):(...e)=>fetch(...e),gn=()=>Response,Aa=r=>{if(typeof r!="object"||r===null)return!1;const e=Object.getPrototypeOf(r);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in r)&&!(Symbol.iterator in r)},mn=r=>Array.from(new Float32Array(r)),vn=(r,e)=>{if(e!==void 0&&r.float32.length!==e)throw new Error(`Vector dimension mismatch: expected ${e}, got ${r.float32.length}`)},pr=r=>r.msg||r.message||r.error_description||r.error||JSON.stringify(r),fn=(r,e,t)=>E(void 0,void 0,void 0,function*(){if(r&&typeof r=="object"&&"status"in r&&"ok"in r&&typeof r.status=="number"&&!(t!=null&&t.noResolveJson)){const s=r.status||500,n=r;if(typeof n.json=="function")n.json().then(i=>{const o=(i==null?void 0:i.statusCode)||(i==null?void 0:i.code)||s+"";e(new tt(pr(i),s,o))}).catch(()=>{const i=s+"",o=n.statusText||`HTTP ${s} error`;e(new tt(o,s,i))});else{const i=s+"",o=n.statusText||`HTTP ${s} error`;e(new tt(o,s,i))}}else e(new Ta(pr(r),r))}),bn=(r,e,t,a)=>{const s={method:r,headers:(e==null?void 0:e.headers)||{}};return a?(Aa(a)?(s.headers=Object.assign({"Content-Type":"application/json"},e==null?void 0:e.headers),s.body=JSON.stringify(a)):s.body=a,Object.assign(Object.assign({},s),t)):s};function yn(r,e,t,a,s,n){return E(this,void 0,void 0,function*(){return new Promise((i,o)=>{r(t,bn(e,a,s,n)).then(l=>{if(!l.ok)throw l;if(a!=null&&a.noResolveJson)return l;const c=l.headers.get("content-type");return!c||!c.includes("application/json")?{}:l.json()}).then(l=>i(l)).catch(l=>fn(l,o,a))})})}function ee(r,e,t,a,s){return E(this,void 0,void 0,function*(){return yn(r,"POST",e,a,s,t)})}class Oa{constructor(e,t={},a){this.shouldThrowOnError=!1,this.url=e.replace(/\/$/,""),this.headers=Object.assign(Object.assign({},Yt),t),this.fetch=ft(a)}throwOnError(){return this.shouldThrowOnError=!0,this}createIndex(e){return E(this,void 0,void 0,function*(){try{return{data:(yield ee(this.fetch,`${this.url}/CreateIndex`,e,{headers:this.headers}))||{},error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(X(t))return{data:null,error:t};throw t}})}getIndex(e,t){return E(this,void 0,void 0,function*(){try{return{data:yield ee(this.fetch,`${this.url}/GetIndex`,{vectorBucketName:e,indexName:t},{headers:this.headers}),error:null}}catch(a){if(this.shouldThrowOnError)throw a;if(X(a))return{data:null,error:a};throw a}})}listIndexes(e){return E(this,void 0,void 0,function*(){try{return{data:yield ee(this.fetch,`${this.url}/ListIndexes`,e,{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(X(t))return{data:null,error:t};throw t}})}deleteIndex(e,t){return E(this,void 0,void 0,function*(){try{return{data:(yield ee(this.fetch,`${this.url}/DeleteIndex`,{vectorBucketName:e,indexName:t},{headers:this.headers}))||{},error:null}}catch(a){if(this.shouldThrowOnError)throw a;if(X(a))return{data:null,error:a};throw a}})}}class Ca{constructor(e,t={},a){this.shouldThrowOnError=!1,this.url=e.replace(/\/$/,""),this.headers=Object.assign(Object.assign({},Yt),t),this.fetch=ft(a)}throwOnError(){return this.shouldThrowOnError=!0,this}putVectors(e){return E(this,void 0,void 0,function*(){try{if(e.vectors.length<1||e.vectors.length>500)throw new Error("Vector batch size must be between 1 and 500 items");return{data:(yield ee(this.fetch,`${this.url}/PutVectors`,e,{headers:this.headers}))||{},error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(X(t))return{data:null,error:t};throw t}})}getVectors(e){return E(this,void 0,void 0,function*(){try{return{data:yield ee(this.fetch,`${this.url}/GetVectors`,e,{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(X(t))return{data:null,error:t};throw t}})}listVectors(e){return E(this,void 0,void 0,function*(){try{if(e.segmentCount!==void 0){if(e.segmentCount<1||e.segmentCount>16)throw new Error("segmentCount must be between 1 and 16");if(e.segmentIndex!==void 0&&(e.segmentIndex<0||e.segmentIndex>=e.segmentCount))throw new Error(`segmentIndex must be between 0 and ${e.segmentCount-1}`)}return{data:yield ee(this.fetch,`${this.url}/ListVectors`,e,{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(X(t))return{data:null,error:t};throw t}})}queryVectors(e){return E(this,void 0,void 0,function*(){try{return{data:yield ee(this.fetch,`${this.url}/QueryVectors`,e,{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(X(t))return{data:null,error:t};throw t}})}deleteVectors(e){return E(this,void 0,void 0,function*(){try{if(e.keys.length<1||e.keys.length>500)throw new Error("Keys batch size must be between 1 and 500 items");return{data:(yield ee(this.fetch,`${this.url}/DeleteVectors`,e,{headers:this.headers}))||{},error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(X(t))return{data:null,error:t};throw t}})}}class Pa{constructor(e,t={},a){this.shouldThrowOnError=!1,this.url=e.replace(/\/$/,""),this.headers=Object.assign(Object.assign({},Yt),t),this.fetch=ft(a)}throwOnError(){return this.shouldThrowOnError=!0,this}createBucket(e){return E(this,void 0,void 0,function*(){try{return{data:(yield ee(this.fetch,`${this.url}/CreateVectorBucket`,{vectorBucketName:e},{headers:this.headers}))||{},error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(X(t))return{data:null,error:t};throw t}})}getBucket(e){return E(this,void 0,void 0,function*(){try{return{data:yield ee(this.fetch,`${this.url}/GetVectorBucket`,{vectorBucketName:e},{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(X(t))return{data:null,error:t};throw t}})}listBuckets(){return E(this,arguments,void 0,function*(e={}){try{return{data:yield ee(this.fetch,`${this.url}/ListVectorBuckets`,e,{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(X(t))return{data:null,error:t};throw t}})}deleteBucket(e){return E(this,void 0,void 0,function*(){try{return{data:(yield ee(this.fetch,`${this.url}/DeleteVectorBucket`,{vectorBucketName:e},{headers:this.headers}))||{},error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(X(t))return{data:null,error:t};throw t}})}}class Ra extends Pa{constructor(e,t={}){super(e,t.headers||{},t.fetch)}from(e){return new $a(this.url,this.headers,e,this.fetch)}createBucket(e){const t=Object.create(null,{createBucket:{get:()=>super.createBucket}});return E(this,void 0,void 0,function*(){return t.createBucket.call(this,e)})}getBucket(e){const t=Object.create(null,{getBucket:{get:()=>super.getBucket}});return E(this,void 0,void 0,function*(){return t.getBucket.call(this,e)})}listBuckets(){const e=Object.create(null,{listBuckets:{get:()=>super.listBuckets}});return E(this,arguments,void 0,function*(t={}){return e.listBuckets.call(this,t)})}deleteBucket(e){const t=Object.create(null,{deleteBucket:{get:()=>super.deleteBucket}});return E(this,void 0,void 0,function*(){return t.deleteBucket.call(this,e)})}}class $a extends Oa{constructor(e,t,a,s){super(e,t,s),this.vectorBucketName=a}createIndex(e){const t=Object.create(null,{createIndex:{get:()=>super.createIndex}});return E(this,void 0,void 0,function*(){return t.createIndex.call(this,Object.assign(Object.assign({},e),{vectorBucketName:this.vectorBucketName}))})}listIndexes(){const e=Object.create(null,{listIndexes:{get:()=>super.listIndexes}});return E(this,arguments,void 0,function*(t={}){return e.listIndexes.call(this,Object.assign(Object.assign({},t),{vectorBucketName:this.vectorBucketName}))})}getIndex(e){const t=Object.create(null,{getIndex:{get:()=>super.getIndex}});return E(this,void 0,void 0,function*(){return t.getIndex.call(this,this.vectorBucketName,e)})}deleteIndex(e){const t=Object.create(null,{deleteIndex:{get:()=>super.deleteIndex}});return E(this,void 0,void 0,function*(){return t.deleteIndex.call(this,this.vectorBucketName,e)})}index(e){return new za(this.url,this.headers,this.vectorBucketName,e,this.fetch)}}class za extends Ca{constructor(e,t,a,s,n){super(e,t,n),this.vectorBucketName=a,this.indexName=s}putVectors(e){const t=Object.create(null,{putVectors:{get:()=>super.putVectors}});return E(this,void 0,void 0,function*(){return t.putVectors.call(this,Object.assign(Object.assign({},e),{vectorBucketName:this.vectorBucketName,indexName:this.indexName}))})}getVectors(e){const t=Object.create(null,{getVectors:{get:()=>super.getVectors}});return E(this,void 0,void 0,function*(){return t.getVectors.call(this,Object.assign(Object.assign({},e),{vectorBucketName:this.vectorBucketName,indexName:this.indexName}))})}listVectors(){const e=Object.create(null,{listVectors:{get:()=>super.listVectors}});return E(this,arguments,void 0,function*(t={}){return e.listVectors.call(this,Object.assign(Object.assign({},t),{vectorBucketName:this.vectorBucketName,indexName:this.indexName}))})}queryVectors(e){const t=Object.create(null,{queryVectors:{get:()=>super.queryVectors}});return E(this,void 0,void 0,function*(){return t.queryVectors.call(this,Object.assign(Object.assign({},e),{vectorBucketName:this.vectorBucketName,indexName:this.indexName}))})}deleteVectors(e){const t=Object.create(null,{deleteVectors:{get:()=>super.deleteVectors}});return E(this,void 0,void 0,function*(){return t.deleteVectors.call(this,Object.assign(Object.assign({},e),{vectorBucketName:this.vectorBucketName,indexName:this.indexName}))})}}class wn extends on{constructor(e,t={},a,s){super(e,t,a,s)}from(e){return new nn(this.url,this.headers,e,this.fetch)}get vectors(){return new Ra(this.url+"/vector",{headers:this.headers,fetch:this.fetch})}get analytics(){return new Sa(this.url+"/iceberg",this.headers,this.fetch)}}const _n=Object.freeze(Object.defineProperty({__proto__:null,StorageAnalyticsClient:Sa,StorageApiError:ka,StorageClient:wn,StorageError:De,StorageUnknownError:lt,StorageVectorsApiError:tt,StorageVectorsClient:Ra,StorageVectorsError:Xt,get StorageVectorsErrorCode(){return Mt},StorageVectorsUnknownError:Ta,VectorBucketApi:Pa,VectorBucketScope:$a,VectorDataApi:Ca,VectorIndexApi:Oa,VectorIndexScope:za,isPlainObject:Aa,isStorageError:q,isStorageVectorsError:X,normalizeToFloat32:mn,resolveFetch:ft,resolveResponse:gn,validateVectorDimension:vn},Symbol.toStringTag,{value:"Module"})),kn=Be(_n);var Ia={},bt={};Object.defineProperty(bt,"__esModule",{value:!0});bt.version=void 0;bt.version="2.86.2";(function(r){Object.defineProperty(r,"__esModule",{value:!0}),r.DEFAULT_REALTIME_OPTIONS=r.DEFAULT_AUTH_OPTIONS=r.DEFAULT_DB_OPTIONS=r.DEFAULT_GLOBAL_OPTIONS=r.DEFAULT_HEADERS=void 0;const e=bt;let t="";typeof Deno<"u"?t="deno":typeof document<"u"?t="web":typeof navigator<"u"&&navigator.product==="ReactNative"?t="react-native":t="node",r.DEFAULT_HEADERS={"X-Client-Info":`supabase-js-${t}/${e.version}`},r.DEFAULT_GLOBAL_OPTIONS={headers:r.DEFAULT_HEADERS},r.DEFAULT_DB_OPTIONS={schema:"public"},r.DEFAULT_AUTH_OPTIONS={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"implicit"},r.DEFAULT_REALTIME_OPTIONS={}})(Ia);var La={};(function(r){Object.defineProperty(r,"__esModule",{value:!0}),r.fetchWithAuth=r.resolveHeadersConstructor=r.resolveFetch=void 0;const e=s=>s?(...n)=>s(...n):(...n)=>fetch(...n);r.resolveFetch=e;const t=()=>Headers;r.resolveHeadersConstructor=t;const a=(s,n,i)=>{const o=(0,r.resolveFetch)(i),l=(0,r.resolveHeadersConstructor)();return async(c,h)=>{var g;const u=(g=await n())!==null&&g!==void 0?g:s;let d=new l(h==null?void 0:h.headers);return d.has("apikey")||d.set("apikey",s),d.has("Authorization")||d.set("Authorization",`Bearer ${u}`),o(c,Object.assign(Object.assign({},h),{headers:d}))}};r.fetchWithAuth=a})(La);var pe={};Object.defineProperty(pe,"__esModule",{value:!0});pe.isBrowser=void 0;pe.uuid=xn;pe.ensureTrailingSlash=Na;pe.applySettingDefaults=En;pe.validateSupabaseUrl=Sn;function xn(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(r){var e=Math.random()*16|0,t=r=="x"?e:e&3|8;return t.toString(16)})}function Na(r){return r.endsWith("/")?r:r+"/"}const jn=()=>typeof window<"u";pe.isBrowser=jn;function En(r,e){var t,a;const{db:s,auth:n,realtime:i,global:o}=r,{db:l,auth:c,realtime:h,global:g}=e,u={db:Object.assign(Object.assign({},l),s),auth:Object.assign(Object.assign({},c),n),realtime:Object.assign(Object.assign({},h),i),storage:{},global:Object.assign(Object.assign(Object.assign({},g),o),{headers:Object.assign(Object.assign({},(t=g==null?void 0:g.headers)!==null&&t!==void 0?t:{}),(a=o==null?void 0:o.headers)!==null&&a!==void 0?a:{})}),accessToken:async()=>""};return r.accessToken?u.accessToken=r.accessToken:delete u.accessToken,u}function Sn(r){const e=r==null?void 0:r.trim();if(!e)throw new Error("supabaseUrl is required.");if(!e.match(/^https?:\/\//i))throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");try{return new URL(Na(e))}catch{throw Error("Invalid supabaseUrl: Provided URL is malformed.")}}var yt={};const Ma="2.86.2",Te=30*1e3,Ut=3,jt=Ut*Te,Tn="http://localhost:9999",An="supabase.auth.token",On={"X-Client-Info":`gotrue-js/${Ma}`},qt="X-Supabase-Api-Version",Ua={"2024-01-01":{timestamp:Date.parse("2024-01-01T00:00:00.0Z"),name:"2024-01-01"}},Cn=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,Pn=10*60*1e3;let $e=class extends Error{constructor(e,t,a){super(e),this.__isAuthError=!0,this.name="AuthError",this.status=t,this.code=a}};function S(r){return typeof r=="object"&&r!==null&&"__isAuthError"in r}let qa=class extends $e{constructor(e,t,a){super(e,t,a),this.name="AuthApiError",this.status=t,this.code=a}};function Ba(r){return S(r)&&r.name==="AuthApiError"}let ue=class extends $e{constructor(e,t){super(e),this.name="AuthUnknownError",this.originalError=t}},le=class extends $e{constructor(e,t,a,s){super(e,a,s),this.name=t,this.status=a}},Y=class extends le{constructor(){super("Auth session missing!","AuthSessionMissingError",400,void 0)}};function Da(r){return S(r)&&r.name==="AuthSessionMissingError"}let ve=class extends le{constructor(){super("Auth session or user missing","AuthInvalidTokenResponseError",500,void 0)}},Ne=class extends le{constructor(e){super(e,"AuthInvalidCredentialsError",400,void 0)}},Me=class extends le{constructor(e,t=null){super(e,"AuthImplicitGrantRedirectError",500,void 0),this.details=null,this.details=t}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}};function Ha(r){return S(r)&&r.name==="AuthImplicitGrantRedirectError"}let Bt=class extends le{constructor(e,t=null){super(e,"AuthPKCEGrantCodeExchangeError",500,void 0),this.details=null,this.details=t}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}},ct=class extends le{constructor(e,t){super(e,"AuthRetryableFetchError",t,void 0)}};function rt(r){return S(r)&&r.name==="AuthRetryableFetchError"}let Dt=class extends le{constructor(e,t,a){super(e,"AuthWeakPasswordError",t,"weak_password"),this.reasons=a}};function Rn(r){return S(r)&&r.name==="AuthWeakPasswordError"}let dt=class extends le{constructor(e){super(e,"AuthInvalidJwtError",400,"invalid_jwt")}};const ut="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),gr=` 	
\r=`.split(""),$n=(()=>{const r=new Array(128);for(let e=0;e<r.length;e+=1)r[e]=-1;for(let e=0;e<gr.length;e+=1)r[gr[e].charCodeAt(0)]=-2;for(let e=0;e<ut.length;e+=1)r[ut[e].charCodeAt(0)]=e;return r})();function mr(r,e,t){if(r!==null)for(e.queue=e.queue<<8|r,e.queuedBits+=8;e.queuedBits>=6;){const a=e.queue>>e.queuedBits-6&63;t(ut[a]),e.queuedBits-=6}else if(e.queuedBits>0)for(e.queue=e.queue<<6-e.queuedBits,e.queuedBits=6;e.queuedBits>=6;){const a=e.queue>>e.queuedBits-6&63;t(ut[a]),e.queuedBits-=6}}function Va(r,e,t){const a=$n[r];if(a>-1)for(e.queue=e.queue<<6|a,e.queuedBits+=6;e.queuedBits>=8;)t(e.queue>>e.queuedBits-8&255),e.queuedBits-=8;else{if(a===-2)return;throw new Error(`Invalid Base64-URL character "${String.fromCharCode(r)}"`)}}function vr(r){const e=[],t=i=>{e.push(String.fromCodePoint(i))},a={utf8seq:0,codepoint:0},s={queue:0,queuedBits:0},n=i=>{Ln(i,a,t)};for(let i=0;i<r.length;i+=1)Va(r.charCodeAt(i),s,n);return e.join("")}function zn(r,e){if(r<=127){e(r);return}else if(r<=2047){e(192|r>>6),e(128|r&63);return}else if(r<=65535){e(224|r>>12),e(128|r>>6&63),e(128|r&63);return}else if(r<=1114111){e(240|r>>18),e(128|r>>12&63),e(128|r>>6&63),e(128|r&63);return}throw new Error(`Unrecognized Unicode codepoint: ${r.toString(16)}`)}function In(r,e){for(let t=0;t<r.length;t+=1){let a=r.charCodeAt(t);if(a>55295&&a<=56319){const s=(a-55296)*1024&65535;a=(r.charCodeAt(t+1)-56320&65535|s)+65536,t+=1}zn(a,e)}}function Ln(r,e,t){if(e.utf8seq===0){if(r<=127){t(r);return}for(let a=1;a<6;a+=1)if(!(r>>7-a&1)){e.utf8seq=a;break}if(e.utf8seq===2)e.codepoint=r&31;else if(e.utf8seq===3)e.codepoint=r&15;else if(e.utf8seq===4)e.codepoint=r&7;else throw new Error("Invalid UTF-8 sequence");e.utf8seq-=1}else if(e.utf8seq>0){if(r<=127)throw new Error("Invalid UTF-8 sequence");e.codepoint=e.codepoint<<6|r&63,e.utf8seq-=1,e.utf8seq===0&&t(e.codepoint)}}function Ce(r){const e=[],t={queue:0,queuedBits:0},a=s=>{e.push(s)};for(let s=0;s<r.length;s+=1)Va(r.charCodeAt(s),t,a);return new Uint8Array(e)}function Nn(r){const e=[];return In(r,t=>e.push(t)),new Uint8Array(e)}function _e(r){const e=[],t={queue:0,queuedBits:0},a=s=>{e.push(s)};return r.forEach(s=>mr(s,t,a)),mr(null,t,a),e.join("")}function Mn(r){return Math.round(Date.now()/1e3)+r}function Un(){return Symbol("auth-callback")}const K=()=>typeof window<"u"&&typeof document<"u",ge={tested:!1,writable:!1},Fa=()=>{if(!K())return!1;try{if(typeof globalThis.localStorage!="object")return!1}catch{return!1}if(ge.tested)return ge.writable;const r=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(r,r),globalThis.localStorage.removeItem(r),ge.tested=!0,ge.writable=!0}catch{ge.tested=!0,ge.writable=!1}return ge.writable};function qn(r){const e={},t=new URL(r);if(t.hash&&t.hash[0]==="#")try{new URLSearchParams(t.hash.substring(1)).forEach((s,n)=>{e[n]=s})}catch{}return t.searchParams.forEach((a,s)=>{e[s]=a}),e}const Ka=r=>r?(...e)=>r(...e):(...e)=>fetch(...e),Bn=r=>typeof r=="object"&&r!==null&&"status"in r&&"ok"in r&&"json"in r&&typeof r.json=="function",Ae=async(r,e,t)=>{await r.setItem(e,JSON.stringify(t))},me=async(r,e)=>{const t=await r.getItem(e);if(!t)return null;try{return JSON.parse(t)}catch{return t}},F=async(r,e)=>{await r.removeItem(e)};class wt{constructor(){this.promise=new wt.promiseConstructor((e,t)=>{this.resolve=e,this.reject=t})}}wt.promiseConstructor=Promise;function Et(r){const e=r.split(".");if(e.length!==3)throw new dt("Invalid JWT structure");for(let a=0;a<e.length;a++)if(!Cn.test(e[a]))throw new dt("JWT not in base64url format");return{header:JSON.parse(vr(e[0])),payload:JSON.parse(vr(e[1])),signature:Ce(e[2]),raw:{header:e[0],payload:e[1]}}}async function Dn(r){return await new Promise(e=>{setTimeout(()=>e(null),r)})}function Hn(r,e){return new Promise((a,s)=>{(async()=>{for(let n=0;n<1/0;n++)try{const i=await r(n);if(!e(n,null,i)){a(i);return}}catch(i){if(!e(n,i)){s(i);return}}})()})}function Vn(r){return("0"+r.toString(16)).substr(-2)}function Fn(){const e=new Uint32Array(56);if(typeof crypto>"u"){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",a=t.length;let s="";for(let n=0;n<56;n++)s+=t.charAt(Math.floor(Math.random()*a));return s}return crypto.getRandomValues(e),Array.from(e,Vn).join("")}async function Kn(r){const t=new TextEncoder().encode(r),a=await crypto.subtle.digest("SHA-256",t),s=new Uint8Array(a);return Array.from(s).map(n=>String.fromCharCode(n)).join("")}async function Gn(r){if(!(typeof crypto<"u"&&typeof crypto.subtle<"u"&&typeof TextEncoder<"u"))return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."),r;const t=await Kn(r);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}async function je(r,e,t=!1){const a=Fn();let s=a;t&&(s+="/PASSWORD_RECOVERY"),await Ae(r,`${e}-code-verifier`,s);const n=await Gn(a);return[n,a===n?"plain":"s256"]}const Wn=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function Jn(r){const e=r.headers.get(qt);if(!e||!e.match(Wn))return null;try{return new Date(`${e}T00:00:00.0Z`)}catch{return null}}function Zn(r){if(!r)throw new Error("Missing exp claim");const e=Math.floor(Date.now()/1e3);if(r<=e)throw new Error("JWT has expired")}function Yn(r){switch(r){case"RS256":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}};case"ES256":return{name:"ECDSA",namedCurve:"P-256",hash:{name:"SHA-256"}};default:throw new Error("Invalid alg claim")}}const Xn=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;function Ee(r){if(!Xn.test(r))throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not")}function St(){const r={};return new Proxy(r,{get:(e,t)=>{if(t==="__isUserNotAvailableProxy")return!0;if(typeof t=="symbol"){const a=t.toString();if(a==="Symbol(Symbol.toPrimitive)"||a==="Symbol(Symbol.toStringTag)"||a==="Symbol(util.inspect.custom)")return}throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${t}" property of the session object is not supported. Please use getUser() instead.`)},set:(e,t)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)},deleteProperty:(e,t)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)}})}function Qn(r,e){return new Proxy(r,{get:(t,a,s)=>{if(a==="__isInsecureUserWarningProxy")return!0;if(typeof a=="symbol"){const n=a.toString();if(n==="Symbol(Symbol.toPrimitive)"||n==="Symbol(Symbol.toStringTag)"||n==="Symbol(util.inspect.custom)"||n==="Symbol(nodejs.util.inspect.custom)")return Reflect.get(t,a,s)}return!e.value&&typeof a=="string"&&(console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."),e.value=!0),Reflect.get(t,a,s)}})}function fr(r){return JSON.parse(JSON.stringify(r))}const fe=r=>r.msg||r.message||r.error_description||r.error||JSON.stringify(r),ei=[502,503,504];async function br(r){var e;if(!Bn(r))throw new ct(fe(r),0);if(ei.includes(r.status))throw new ct(fe(r),r.status);let t;try{t=await r.json()}catch(n){throw new ue(fe(n),n)}let a;const s=Jn(r);if(s&&s.getTime()>=Ua["2024-01-01"].timestamp&&typeof t=="object"&&t&&typeof t.code=="string"?a=t.code:typeof t=="object"&&t&&typeof t.error_code=="string"&&(a=t.error_code),a){if(a==="weak_password")throw new Dt(fe(t),r.status,((e=t.weak_password)===null||e===void 0?void 0:e.reasons)||[]);if(a==="session_not_found")throw new Y}else if(typeof t=="object"&&t&&typeof t.weak_password=="object"&&t.weak_password&&Array.isArray(t.weak_password.reasons)&&t.weak_password.reasons.length&&t.weak_password.reasons.reduce((n,i)=>n&&typeof i=="string",!0))throw new Dt(fe(t),r.status,t.weak_password.reasons);throw new qa(fe(t),r.status||500,a)}const ti=(r,e,t,a)=>{const s={method:r,headers:(e==null?void 0:e.headers)||{}};return r==="GET"?s:(s.headers=Object.assign({"Content-Type":"application/json;charset=UTF-8"},e==null?void 0:e.headers),s.body=JSON.stringify(a),Object.assign(Object.assign({},s),t))};async function O(r,e,t,a){var s;const n=Object.assign({},a==null?void 0:a.headers);n[qt]||(n[qt]=Ua["2024-01-01"].name),a!=null&&a.jwt&&(n.Authorization=`Bearer ${a.jwt}`);const i=(s=a==null?void 0:a.query)!==null&&s!==void 0?s:{};a!=null&&a.redirectTo&&(i.redirect_to=a.redirectTo);const o=Object.keys(i).length?"?"+new URLSearchParams(i).toString():"",l=await ri(r,e,t+o,{headers:n,noResolveJson:a==null?void 0:a.noResolveJson},{},a==null?void 0:a.body);return a!=null&&a.xform?a==null?void 0:a.xform(l):{data:Object.assign({},l),error:null}}async function ri(r,e,t,a,s,n){const i=ti(e,a,s,n);let o;try{o=await r(t,Object.assign({},i))}catch(l){throw console.error(l),new ct(fe(l),0)}if(o.ok||await br(o),a!=null&&a.noResolveJson)return o;try{return await o.json()}catch(l){await br(l)}}function te(r){var e;let t=null;ni(r)&&(t=Object.assign({},r),r.expires_at||(t.expires_at=Mn(r.expires_in)));const a=(e=r.user)!==null&&e!==void 0?e:r;return{data:{session:t,user:a},error:null}}function yr(r){const e=te(r);return!e.error&&r.weak_password&&typeof r.weak_password=="object"&&Array.isArray(r.weak_password.reasons)&&r.weak_password.reasons.length&&r.weak_password.message&&typeof r.weak_password.message=="string"&&r.weak_password.reasons.reduce((t,a)=>t&&typeof a=="string",!0)&&(e.data.weak_password=r.weak_password),e}function he(r){var e;return{data:{user:(e=r.user)!==null&&e!==void 0?e:r},error:null}}function ai(r){return{data:r,error:null}}function si(r){const{action_link:e,email_otp:t,hashed_token:a,redirect_to:s,verification_type:n}=r,i=ze(r,["action_link","email_otp","hashed_token","redirect_to","verification_type"]),o={action_link:e,email_otp:t,hashed_token:a,redirect_to:s,verification_type:n},l=Object.assign({},i);return{data:{properties:o,user:l},error:null}}function wr(r){return r}function ni(r){return r.access_token&&r.refresh_token&&r.expires_in}const at=["global","local","others"];let Qt=class{constructor({url:e="",headers:t={},fetch:a}){this.url=e,this.headers=t,this.fetch=Ka(a),this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)},this.oauth={listClients:this._listOAuthClients.bind(this),createClient:this._createOAuthClient.bind(this),getClient:this._getOAuthClient.bind(this),updateClient:this._updateOAuthClient.bind(this),deleteClient:this._deleteOAuthClient.bind(this),regenerateClientSecret:this._regenerateOAuthClientSecret.bind(this)}}async signOut(e,t=at[0]){if(at.indexOf(t)<0)throw new Error(`@supabase/auth-js: Parameter scope must be one of ${at.join(", ")}`);try{return await O(this.fetch,"POST",`${this.url}/logout?scope=${t}`,{headers:this.headers,jwt:e,noResolveJson:!0}),{data:null,error:null}}catch(a){if(S(a))return{data:null,error:a};throw a}}async inviteUserByEmail(e,t={}){try{return await O(this.fetch,"POST",`${this.url}/invite`,{body:{email:e,data:t.data},headers:this.headers,redirectTo:t.redirectTo,xform:he})}catch(a){if(S(a))return{data:{user:null},error:a};throw a}}async generateLink(e){try{const{options:t}=e,a=ze(e,["options"]),s=Object.assign(Object.assign({},a),t);return"newEmail"in a&&(s.new_email=a==null?void 0:a.newEmail,delete s.newEmail),await O(this.fetch,"POST",`${this.url}/admin/generate_link`,{body:s,headers:this.headers,xform:si,redirectTo:t==null?void 0:t.redirectTo})}catch(t){if(S(t))return{data:{properties:null,user:null},error:t};throw t}}async createUser(e){try{return await O(this.fetch,"POST",`${this.url}/admin/users`,{body:e,headers:this.headers,xform:he})}catch(t){if(S(t))return{data:{user:null},error:t};throw t}}async listUsers(e){var t,a,s,n,i,o,l;try{const c={nextPage:null,lastPage:0,total:0},h=await O(this.fetch,"GET",`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(a=(t=e==null?void 0:e.page)===null||t===void 0?void 0:t.toString())!==null&&a!==void 0?a:"",per_page:(n=(s=e==null?void 0:e.perPage)===null||s===void 0?void 0:s.toString())!==null&&n!==void 0?n:""},xform:wr});if(h.error)throw h.error;const g=await h.json(),u=(i=h.headers.get("x-total-count"))!==null&&i!==void 0?i:0,d=(l=(o=h.headers.get("link"))===null||o===void 0?void 0:o.split(","))!==null&&l!==void 0?l:[];return d.length>0&&(d.forEach(p=>{const v=parseInt(p.split(";")[0].split("=")[1].substring(0,1)),m=JSON.parse(p.split(";")[1].split("=")[1]);c[`${m}Page`]=v}),c.total=parseInt(u)),{data:Object.assign(Object.assign({},g),c),error:null}}catch(c){if(S(c))return{data:{users:[]},error:c};throw c}}async getUserById(e){Ee(e);try{return await O(this.fetch,"GET",`${this.url}/admin/users/${e}`,{headers:this.headers,xform:he})}catch(t){if(S(t))return{data:{user:null},error:t};throw t}}async updateUserById(e,t){Ee(e);try{return await O(this.fetch,"PUT",`${this.url}/admin/users/${e}`,{body:t,headers:this.headers,xform:he})}catch(a){if(S(a))return{data:{user:null},error:a};throw a}}async deleteUser(e,t=!1){Ee(e);try{return await O(this.fetch,"DELETE",`${this.url}/admin/users/${e}`,{headers:this.headers,body:{should_soft_delete:t},xform:he})}catch(a){if(S(a))return{data:{user:null},error:a};throw a}}async _listFactors(e){Ee(e.userId);try{const{data:t,error:a}=await O(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/factors`,{headers:this.headers,xform:s=>({data:{factors:s},error:null})});return{data:t,error:a}}catch(t){if(S(t))return{data:null,error:t};throw t}}async _deleteFactor(e){Ee(e.userId),Ee(e.id);try{return{data:await O(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/factors/${e.id}`,{headers:this.headers}),error:null}}catch(t){if(S(t))return{data:null,error:t};throw t}}async _listOAuthClients(e){var t,a,s,n,i,o,l;try{const c={nextPage:null,lastPage:0,total:0},h=await O(this.fetch,"GET",`${this.url}/admin/oauth/clients`,{headers:this.headers,noResolveJson:!0,query:{page:(a=(t=e==null?void 0:e.page)===null||t===void 0?void 0:t.toString())!==null&&a!==void 0?a:"",per_page:(n=(s=e==null?void 0:e.perPage)===null||s===void 0?void 0:s.toString())!==null&&n!==void 0?n:""},xform:wr});if(h.error)throw h.error;const g=await h.json(),u=(i=h.headers.get("x-total-count"))!==null&&i!==void 0?i:0,d=(l=(o=h.headers.get("link"))===null||o===void 0?void 0:o.split(","))!==null&&l!==void 0?l:[];return d.length>0&&(d.forEach(p=>{const v=parseInt(p.split(";")[0].split("=")[1].substring(0,1)),m=JSON.parse(p.split(";")[1].split("=")[1]);c[`${m}Page`]=v}),c.total=parseInt(u)),{data:Object.assign(Object.assign({},g),c),error:null}}catch(c){if(S(c))return{data:{clients:[]},error:c};throw c}}async _createOAuthClient(e){try{return await O(this.fetch,"POST",`${this.url}/admin/oauth/clients`,{body:e,headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if(S(t))return{data:null,error:t};throw t}}async _getOAuthClient(e){try{return await O(this.fetch,"GET",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if(S(t))return{data:null,error:t};throw t}}async _updateOAuthClient(e,t){try{return await O(this.fetch,"PUT",`${this.url}/admin/oauth/clients/${e}`,{body:t,headers:this.headers,xform:a=>({data:a,error:null})})}catch(a){if(S(a))return{data:null,error:a};throw a}}async _deleteOAuthClient(e){try{return await O(this.fetch,"DELETE",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(t){if(S(t))return{data:null,error:t};throw t}}async _regenerateOAuthClientSecret(e){try{return await O(this.fetch,"POST",`${this.url}/admin/oauth/clients/${e}/regenerate_secret`,{headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if(S(t))return{data:null,error:t};throw t}}};function _r(r={}){return{getItem:e=>r[e]||null,setItem:(e,t)=>{r[e]=t},removeItem:e=>{delete r[e]}}}const be={debug:!!(globalThis&&Fa()&&globalThis.localStorage&&globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug")==="true")};class er extends Error{constructor(e){super(e),this.isAcquireTimeout=!0}}let Ga=class extends er{};class ii extends er{}async function Wa(r,e,t){be.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquire lock",r,e);const a=new globalThis.AbortController;return e>0&&setTimeout(()=>{a.abort(),be.debug&&console.log("@supabase/gotrue-js: navigatorLock acquire timed out",r)},e),await Promise.resolve().then(()=>globalThis.navigator.locks.request(r,e===0?{mode:"exclusive",ifAvailable:!0}:{mode:"exclusive",signal:a.signal},async s=>{if(s){be.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquired",r,s.name);try{return await t()}finally{be.debug&&console.log("@supabase/gotrue-js: navigatorLock: released",r,s.name)}}else{if(e===0)throw be.debug&&console.log("@supabase/gotrue-js: navigatorLock: not immediately available",r),new Ga(`Acquiring an exclusive Navigator LockManager lock "${r}" immediately failed`);if(be.debug)try{const n=await globalThis.navigator.locks.query();console.log("@supabase/gotrue-js: Navigator LockManager state",JSON.stringify(n,null,"  "))}catch(n){console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state",n)}return console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"),await t()}}))}const kr={};async function oi(r,e,t){var a;const s=(a=kr[r])!==null&&a!==void 0?a:Promise.resolve(),n=Promise.race([s.catch(()=>null),e>=0?new Promise((i,o)=>{setTimeout(()=>{o(new ii(`Acquring process lock with name "${r}" timed out`))},e)}):null].filter(i=>i)).catch(i=>{if(i&&i.isAcquireTimeout)throw i;return null}).then(async()=>await t());return kr[r]=n.catch(async i=>{if(i&&i.isAcquireTimeout)return await s,null;throw i}),await n}function li(){if(typeof globalThis!="object")try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<"u"&&(self.globalThis=self)}}function Ja(r){if(!/^0x[a-fA-F0-9]{40}$/.test(r))throw new Error(`@supabase/auth-js: Address "${r}" is invalid.`);return r.toLowerCase()}function ci(r){return parseInt(r,16)}function di(r){const e=new TextEncoder().encode(r);return"0x"+Array.from(e,a=>a.toString(16).padStart(2,"0")).join("")}function ui(r){var e;const{chainId:t,domain:a,expirationTime:s,issuedAt:n=new Date,nonce:i,notBefore:o,requestId:l,resources:c,scheme:h,uri:g,version:u}=r;{if(!Number.isInteger(t))throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${t}`);if(!a)throw new Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');if(i&&i.length<8)throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${i}`);if(!g)throw new Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');if(u!=="1")throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${u}`);if(!((e=r.statement)===null||e===void 0)&&e.includes(`
`))throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${r.statement}`)}const d=Ja(r.address),p=h?`${h}://${a}`:a,v=r.statement?`${r.statement}
`:"",m=`${p} wants you to sign in with your Ethereum account:
${d}

${v}`;let f=`URI: ${g}
Version: ${u}
Chain ID: ${t}${i?`
Nonce: ${i}`:""}
Issued At: ${n.toISOString()}`;if(s&&(f+=`
Expiration Time: ${s.toISOString()}`),o&&(f+=`
Not Before: ${o.toISOString()}`),l&&(f+=`
Request ID: ${l}`),c){let b=`
Resources:`;for(const y of c){if(!y||typeof y!="string")throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${y}`);b+=`
- ${y}`}f+=b}return`${m}
${f}`}class H extends Error{constructor({message:e,code:t,cause:a,name:s}){var n;super(e,{cause:a}),this.__isWebAuthnError=!0,this.name=(n=s??(a instanceof Error?a.name:void 0))!==null&&n!==void 0?n:"Unknown Error",this.code=t}}class ht extends H{constructor(e,t){super({code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t,message:e}),this.name="WebAuthnUnknownError",this.originalError=t}}function hi({error:r,options:e}){var t,a,s;const{publicKey:n}=e;if(!n)throw Error("options was missing required publicKey property");if(r.name==="AbortError"){if(e.signal instanceof AbortSignal)return new H({message:"Registration ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:r})}else if(r.name==="ConstraintError"){if(((t=n.authenticatorSelection)===null||t===void 0?void 0:t.requireResidentKey)===!0)return new H({message:"Discoverable credentials were required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",cause:r});if(e.mediation==="conditional"&&((a=n.authenticatorSelection)===null||a===void 0?void 0:a.userVerification)==="required")return new H({message:"User verification was required during automatic registration but it could not be performed",code:"ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",cause:r});if(((s=n.authenticatorSelection)===null||s===void 0?void 0:s.userVerification)==="required")return new H({message:"User verification was required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",cause:r})}else{if(r.name==="InvalidStateError")return new H({message:"The authenticator was previously registered",code:"ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",cause:r});if(r.name==="NotAllowedError")return new H({message:r.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:r});if(r.name==="NotSupportedError")return n.pubKeyCredParams.filter(o=>o.type==="public-key").length===0?new H({message:'No entry in pubKeyCredParams was of type "public-key"',code:"ERROR_MALFORMED_PUBKEYCREDPARAMS",cause:r}):new H({message:"No available authenticator supported any of the specified pubKeyCredParams algorithms",code:"ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",cause:r});if(r.name==="SecurityError"){const i=window.location.hostname;if(Za(i)){if(n.rp.id!==i)return new H({message:`The RP ID "${n.rp.id}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:r})}else return new H({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:r})}else if(r.name==="TypeError"){if(n.user.id.byteLength<1||n.user.id.byteLength>64)return new H({message:"User ID was not between 1 and 64 characters",code:"ERROR_INVALID_USER_ID_LENGTH",cause:r})}else if(r.name==="UnknownError")return new H({message:"The authenticator was unable to process the specified options, or could not create a new credential",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:r})}return new H({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:r})}function pi({error:r,options:e}){const{publicKey:t}=e;if(!t)throw Error("options was missing required publicKey property");if(r.name==="AbortError"){if(e.signal instanceof AbortSignal)return new H({message:"Authentication ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:r})}else{if(r.name==="NotAllowedError")return new H({message:r.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:r});if(r.name==="SecurityError"){const a=window.location.hostname;if(Za(a)){if(t.rpId!==a)return new H({message:`The RP ID "${t.rpId}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:r})}else return new H({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:r})}else if(r.name==="UnknownError")return new H({message:"The authenticator was unable to process the specified options, or could not create a new assertion signature",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:r})}return new H({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:r})}class gi{createNewAbortSignal(){if(this.controller){const t=new Error("Cancelling existing WebAuthn API call for new one");t.name="AbortError",this.controller.abort(t)}const e=new AbortController;return this.controller=e,e.signal}cancelCeremony(){if(this.controller){const e=new Error("Manually cancelling existing WebAuthn API call");e.name="AbortError",this.controller.abort(e),this.controller=void 0}}}const mi=new gi;function vi(r){if(!r)throw new Error("Credential creation options are required");if(typeof PublicKeyCredential<"u"&&"parseCreationOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseCreationOptionsFromJSON=="function")return PublicKeyCredential.parseCreationOptionsFromJSON(r);const{challenge:e,user:t,excludeCredentials:a}=r,s=ze(r,["challenge","user","excludeCredentials"]),n=Ce(e).buffer,i=Object.assign(Object.assign({},t),{id:Ce(t.id).buffer}),o=Object.assign(Object.assign({},s),{challenge:n,user:i});if(a&&a.length>0){o.excludeCredentials=new Array(a.length);for(let l=0;l<a.length;l++){const c=a[l];o.excludeCredentials[l]=Object.assign(Object.assign({},c),{id:Ce(c.id).buffer,type:c.type||"public-key",transports:c.transports})}}return o}function fi(r){if(!r)throw new Error("Credential request options are required");if(typeof PublicKeyCredential<"u"&&"parseRequestOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseRequestOptionsFromJSON=="function")return PublicKeyCredential.parseRequestOptionsFromJSON(r);const{challenge:e,allowCredentials:t}=r,a=ze(r,["challenge","allowCredentials"]),s=Ce(e).buffer,n=Object.assign(Object.assign({},a),{challenge:s});if(t&&t.length>0){n.allowCredentials=new Array(t.length);for(let i=0;i<t.length;i++){const o=t[i];n.allowCredentials[i]=Object.assign(Object.assign({},o),{id:Ce(o.id).buffer,type:o.type||"public-key",transports:o.transports})}}return n}function bi(r){var e;if("toJSON"in r&&typeof r.toJSON=="function")return r.toJSON();const t=r;return{id:r.id,rawId:r.id,response:{attestationObject:_e(new Uint8Array(r.response.attestationObject)),clientDataJSON:_e(new Uint8Array(r.response.clientDataJSON))},type:"public-key",clientExtensionResults:r.getClientExtensionResults(),authenticatorAttachment:(e=t.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function yi(r){var e;if("toJSON"in r&&typeof r.toJSON=="function")return r.toJSON();const t=r,a=r.getClientExtensionResults(),s=r.response;return{id:r.id,rawId:r.id,response:{authenticatorData:_e(new Uint8Array(s.authenticatorData)),clientDataJSON:_e(new Uint8Array(s.clientDataJSON)),signature:_e(new Uint8Array(s.signature)),userHandle:s.userHandle?_e(new Uint8Array(s.userHandle)):void 0},type:"public-key",clientExtensionResults:a,authenticatorAttachment:(e=t.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function Za(r){return r==="localhost"||/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(r)}function xr(){var r,e;return!!(K()&&"PublicKeyCredential"in window&&window.PublicKeyCredential&&"credentials"in navigator&&typeof((r=navigator==null?void 0:navigator.credentials)===null||r===void 0?void 0:r.create)=="function"&&typeof((e=navigator==null?void 0:navigator.credentials)===null||e===void 0?void 0:e.get)=="function")}async function wi(r){try{const e=await navigator.credentials.create(r);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new ht("Browser returned unexpected credential type",e)}:{data:null,error:new ht("Empty credential response",e)}}catch(e){return{data:null,error:hi({error:e,options:r})}}}async function _i(r){try{const e=await navigator.credentials.get(r);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new ht("Browser returned unexpected credential type",e)}:{data:null,error:new ht("Empty credential response",e)}}catch(e){return{data:null,error:pi({error:e,options:r})}}}const ki={hints:["security-key"],authenticatorSelection:{authenticatorAttachment:"cross-platform",requireResidentKey:!1,userVerification:"preferred",residentKey:"discouraged"},attestation:"direct"},xi={userVerification:"preferred",hints:["security-key"],attestation:"direct"};function pt(...r){const e=s=>s!==null&&typeof s=="object"&&!Array.isArray(s),t=s=>s instanceof ArrayBuffer||ArrayBuffer.isView(s),a={};for(const s of r)if(s)for(const n in s){const i=s[n];if(i!==void 0)if(Array.isArray(i))a[n]=i;else if(t(i))a[n]=i;else if(e(i)){const o=a[n];e(o)?a[n]=pt(o,i):a[n]=pt(i)}else a[n]=i}return a}function ji(r,e){return pt(ki,r,e||{})}function Ei(r,e){return pt(xi,r,e||{})}class Si{constructor(e){this.client=e,this.enroll=this._enroll.bind(this),this.challenge=this._challenge.bind(this),this.verify=this._verify.bind(this),this.authenticate=this._authenticate.bind(this),this.register=this._register.bind(this)}async _enroll(e){return this.client.mfa.enroll(Object.assign(Object.assign({},e),{factorType:"webauthn"}))}async _challenge({factorId:e,webauthn:t,friendlyName:a,signal:s},n){try{const{data:i,error:o}=await this.client.mfa.challenge({factorId:e,webauthn:t});if(!i)return{data:null,error:o};const l=s??mi.createNewAbortSignal();if(i.webauthn.type==="create"){const{user:c}=i.webauthn.credential_options.publicKey;c.name||(c.name=`${c.id}:${a}`),c.displayName||(c.displayName=c.name)}switch(i.webauthn.type){case"create":{const c=ji(i.webauthn.credential_options.publicKey,n==null?void 0:n.create),{data:h,error:g}=await wi({publicKey:c,signal:l});return h?{data:{factorId:e,challengeId:i.id,webauthn:{type:i.webauthn.type,credential_response:h}},error:null}:{data:null,error:g}}case"request":{const c=Ei(i.webauthn.credential_options.publicKey,n==null?void 0:n.request),{data:h,error:g}=await _i(Object.assign(Object.assign({},i.webauthn.credential_options),{publicKey:c,signal:l}));return h?{data:{factorId:e,challengeId:i.id,webauthn:{type:i.webauthn.type,credential_response:h}},error:null}:{data:null,error:g}}}}catch(i){return S(i)?{data:null,error:i}:{data:null,error:new ue("Unexpected error in challenge",i)}}}async _verify({challengeId:e,factorId:t,webauthn:a}){return this.client.mfa.verify({factorId:t,challengeId:e,webauthn:a})}async _authenticate({factorId:e,webauthn:{rpId:t=typeof window<"u"?window.location.hostname:void 0,rpOrigins:a=typeof window<"u"?[window.location.origin]:void 0,signal:s}={}},n){if(!t)return{data:null,error:new $e("rpId is required for WebAuthn authentication")};try{if(!xr())return{data:null,error:new ue("Browser does not support WebAuthn",null)};const{data:i,error:o}=await this.challenge({factorId:e,webauthn:{rpId:t,rpOrigins:a},signal:s},{request:n});if(!i)return{data:null,error:o};const{webauthn:l}=i;return this._verify({factorId:e,challengeId:i.challengeId,webauthn:{type:l.type,rpId:t,rpOrigins:a,credential_response:l.credential_response}})}catch(i){return S(i)?{data:null,error:i}:{data:null,error:new ue("Unexpected error in authenticate",i)}}}async _register({friendlyName:e,webauthn:{rpId:t=typeof window<"u"?window.location.hostname:void 0,rpOrigins:a=typeof window<"u"?[window.location.origin]:void 0,signal:s}={}},n){if(!t)return{data:null,error:new $e("rpId is required for WebAuthn registration")};try{if(!xr())return{data:null,error:new ue("Browser does not support WebAuthn",null)};const{data:i,error:o}=await this._enroll({friendlyName:e});if(!i)return await this.client.mfa.listFactors().then(h=>{var g;return(g=h.data)===null||g===void 0?void 0:g.all.find(u=>u.factor_type==="webauthn"&&u.friendly_name===e&&u.status!=="unverified")}).then(h=>h?this.client.mfa.unenroll({factorId:h==null?void 0:h.id}):void 0),{data:null,error:o};const{data:l,error:c}=await this._challenge({factorId:i.id,friendlyName:i.friendly_name,webauthn:{rpId:t,rpOrigins:a},signal:s},{create:n});return l?this._verify({factorId:i.id,challengeId:l.challengeId,webauthn:{rpId:t,rpOrigins:a,type:l.webauthn.type,credential_response:l.webauthn.credential_response}}):{data:null,error:c}}catch(i){return S(i)?{data:null,error:i}:{data:null,error:new ue("Unexpected error in register",i)}}}}li();const Ti={url:Tn,storageKey:An,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:On,flowType:"implicit",debug:!1,hasCustomAuthorizationHeader:!1,throwOnError:!1};async function jr(r,e,t){return await t()}const Se={};let tr=class Ht{get jwks(){var e,t;return(t=(e=Se[this.storageKey])===null||e===void 0?void 0:e.jwks)!==null&&t!==void 0?t:{keys:[]}}set jwks(e){Se[this.storageKey]=Object.assign(Object.assign({},Se[this.storageKey]),{jwks:e})}get jwks_cached_at(){var e,t;return(t=(e=Se[this.storageKey])===null||e===void 0?void 0:e.cachedAt)!==null&&t!==void 0?t:Number.MIN_SAFE_INTEGER}set jwks_cached_at(e){Se[this.storageKey]=Object.assign(Object.assign({},Se[this.storageKey]),{cachedAt:e})}constructor(e){var t,a,s;this.userStorage=null,this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.initializePromise=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log;const n=Object.assign(Object.assign({},Ti),e);if(this.storageKey=n.storageKey,this.instanceID=(t=Ht.nextInstanceID[this.storageKey])!==null&&t!==void 0?t:0,Ht.nextInstanceID[this.storageKey]=this.instanceID+1,this.logDebugMessages=!!n.debug,typeof n.debug=="function"&&(this.logger=n.debug),this.instanceID>0&&K()){const i=`${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;console.warn(i),this.logDebugMessages&&console.trace(i)}if(this.persistSession=n.persistSession,this.autoRefreshToken=n.autoRefreshToken,this.admin=new Qt({url:n.url,headers:n.headers,fetch:n.fetch}),this.url=n.url,this.headers=n.headers,this.fetch=Ka(n.fetch),this.lock=n.lock||jr,this.detectSessionInUrl=n.detectSessionInUrl,this.flowType=n.flowType,this.hasCustomAuthorizationHeader=n.hasCustomAuthorizationHeader,this.throwOnError=n.throwOnError,n.lock?this.lock=n.lock:K()&&(!((a=globalThis==null?void 0:globalThis.navigator)===null||a===void 0)&&a.locks)?this.lock=Wa:this.lock=jr,this.jwks||(this.jwks={keys:[]},this.jwks_cached_at=Number.MIN_SAFE_INTEGER),this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this),webauthn:new Si(this)},this.oauth={getAuthorizationDetails:this._getAuthorizationDetails.bind(this),approveAuthorization:this._approveAuthorization.bind(this),denyAuthorization:this._denyAuthorization.bind(this),listGrants:this._listOAuthGrants.bind(this),revokeGrant:this._revokeOAuthGrant.bind(this)},this.persistSession?(n.storage?this.storage=n.storage:Fa()?this.storage=globalThis.localStorage:(this.memoryStorage={},this.storage=_r(this.memoryStorage)),n.userStorage&&(this.userStorage=n.userStorage)):(this.memoryStorage={},this.storage=_r(this.memoryStorage)),K()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(i){console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available",i)}(s=this.broadcastChannel)===null||s===void 0||s.addEventListener("message",async i=>{this._debug("received broadcast notification from other tab or client",i),await this._notifyAllSubscribers(i.data.event,i.data.session,!1)})}this.initialize()}isThrowOnErrorEnabled(){return this.throwOnError}_returnResult(e){if(this.throwOnError&&e&&e.error)throw e.error;return e}_logPrefix(){return`GoTrueClient@${this.storageKey}:${this.instanceID} (${Ma}) ${new Date().toISOString()}`}_debug(...e){return this.logDebugMessages&&this.logger(this._logPrefix(),...e),this}async initialize(){return this.initializePromise?await this.initializePromise:(this.initializePromise=(async()=>await this._acquireLock(-1,async()=>await this._initialize()))(),await this.initializePromise)}async _initialize(){var e;try{let t={},a="none";if(K()&&(t=qn(window.location.href),this._isImplicitGrantCallback(t)?a="implicit":await this._isPKCECallback(t)&&(a="pkce")),K()&&this.detectSessionInUrl&&a!=="none"){const{data:s,error:n}=await this._getSessionFromURL(t,a);if(n){if(this._debug("#_initialize()","error detecting session from URL",n),Ha(n)){const l=(e=n.details)===null||e===void 0?void 0:e.code;if(l==="identity_already_exists"||l==="identity_not_found"||l==="single_identity_not_deletable")return{error:n}}return await this._removeSession(),{error:n}}const{session:i,redirectType:o}=s;return this._debug("#_initialize()","detected session in URL",i,"redirect type",o),await this._saveSession(i),setTimeout(async()=>{o==="recovery"?await this._notifyAllSubscribers("PASSWORD_RECOVERY",i):await this._notifyAllSubscribers("SIGNED_IN",i)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(t){return S(t)?this._returnResult({error:t}):this._returnResult({error:new ue("Unexpected error during initialization",t)})}finally{await this._handleVisibilityChange(),this._debug("#_initialize()","end")}}async signInAnonymously(e){var t,a,s;try{const n=await O(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{data:(a=(t=e==null?void 0:e.options)===null||t===void 0?void 0:t.data)!==null&&a!==void 0?a:{},gotrue_meta_security:{captcha_token:(s=e==null?void 0:e.options)===null||s===void 0?void 0:s.captchaToken}},xform:te}),{data:i,error:o}=n;if(o||!i)return this._returnResult({data:{user:null,session:null},error:o});const l=i.session,c=i.user;return i.session&&(await this._saveSession(i.session),await this._notifyAllSubscribers("SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(n){if(S(n))return this._returnResult({data:{user:null,session:null},error:n});throw n}}async signUp(e){var t,a,s;try{let n;if("email"in e){const{email:h,password:g,options:u}=e;let d=null,p=null;this.flowType==="pkce"&&([d,p]=await je(this.storage,this.storageKey)),n=await O(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,redirectTo:u==null?void 0:u.emailRedirectTo,body:{email:h,password:g,data:(t=u==null?void 0:u.data)!==null&&t!==void 0?t:{},gotrue_meta_security:{captcha_token:u==null?void 0:u.captchaToken},code_challenge:d,code_challenge_method:p},xform:te})}else if("phone"in e){const{phone:h,password:g,options:u}=e;n=await O(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{phone:h,password:g,data:(a=u==null?void 0:u.data)!==null&&a!==void 0?a:{},channel:(s=u==null?void 0:u.channel)!==null&&s!==void 0?s:"sms",gotrue_meta_security:{captcha_token:u==null?void 0:u.captchaToken}},xform:te})}else throw new Ne("You must provide either an email or phone number and a password");const{data:i,error:o}=n;if(o||!i)return await F(this.storage,`${this.storageKey}-code-verifier`),this._returnResult({data:{user:null,session:null},error:o});const l=i.session,c=i.user;return i.session&&(await this._saveSession(i.session),await this._notifyAllSubscribers("SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(n){if(await F(this.storage,`${this.storageKey}-code-verifier`),S(n))return this._returnResult({data:{user:null,session:null},error:n});throw n}}async signInWithPassword(e){try{let t;if("email"in e){const{email:n,password:i,options:o}=e;t=await O(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:n,password:i,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}},xform:yr})}else if("phone"in e){const{phone:n,password:i,options:o}=e;t=await O(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:n,password:i,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}},xform:yr})}else throw new Ne("You must provide either an email or phone number and a password");const{data:a,error:s}=t;if(s)return this._returnResult({data:{user:null,session:null},error:s});if(!a||!a.session||!a.user){const n=new ve;return this._returnResult({data:{user:null,session:null},error:n})}return a.session&&(await this._saveSession(a.session),await this._notifyAllSubscribers("SIGNED_IN",a.session)),this._returnResult({data:Object.assign({user:a.user,session:a.session},a.weak_password?{weakPassword:a.weak_password}:null),error:s})}catch(t){if(S(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async signInWithOAuth(e){var t,a,s,n;return await this._handleProviderSignIn(e.provider,{redirectTo:(t=e.options)===null||t===void 0?void 0:t.redirectTo,scopes:(a=e.options)===null||a===void 0?void 0:a.scopes,queryParams:(s=e.options)===null||s===void 0?void 0:s.queryParams,skipBrowserRedirect:(n=e.options)===null||n===void 0?void 0:n.skipBrowserRedirect})}async exchangeCodeForSession(e){return await this.initializePromise,this._acquireLock(-1,async()=>this._exchangeCodeForSession(e))}async signInWithWeb3(e){const{chain:t}=e;switch(t){case"ethereum":return await this.signInWithEthereum(e);case"solana":return await this.signInWithSolana(e);default:throw new Error(`@supabase/auth-js: Unsupported chain "${t}"`)}}async signInWithEthereum(e){var t,a,s,n,i,o,l,c,h,g,u;let d,p;if("message"in e)d=e.message,p=e.signature;else{const{chain:v,wallet:m,statement:f,options:b}=e;let y;if(K())if(typeof m=="object")y=m;else{const R=window;if("ethereum"in R&&typeof R.ethereum=="object"&&"request"in R.ethereum&&typeof R.ethereum.request=="function")y=R.ethereum;else throw new Error("@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.")}else{if(typeof m!="object"||!(b!=null&&b.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");y=m}const k=new URL((t=b==null?void 0:b.url)!==null&&t!==void 0?t:window.location.href),j=await y.request({method:"eth_requestAccounts"}).then(R=>R).catch(()=>{throw new Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid")});if(!j||j.length===0)throw new Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");const x=Ja(j[0]);let w=(a=b==null?void 0:b.signInWithEthereum)===null||a===void 0?void 0:a.chainId;if(!w){const R=await y.request({method:"eth_chainId"});w=ci(R)}const A={domain:k.host,address:x,statement:f,uri:k.href,version:"1",chainId:w,nonce:(s=b==null?void 0:b.signInWithEthereum)===null||s===void 0?void 0:s.nonce,issuedAt:(i=(n=b==null?void 0:b.signInWithEthereum)===null||n===void 0?void 0:n.issuedAt)!==null&&i!==void 0?i:new Date,expirationTime:(o=b==null?void 0:b.signInWithEthereum)===null||o===void 0?void 0:o.expirationTime,notBefore:(l=b==null?void 0:b.signInWithEthereum)===null||l===void 0?void 0:l.notBefore,requestId:(c=b==null?void 0:b.signInWithEthereum)===null||c===void 0?void 0:c.requestId,resources:(h=b==null?void 0:b.signInWithEthereum)===null||h===void 0?void 0:h.resources};d=ui(A),p=await y.request({method:"personal_sign",params:[di(d),x]})}try{const{data:v,error:m}=await O(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"ethereum",message:d,signature:p},!((g=e.options)===null||g===void 0)&&g.captchaToken?{gotrue_meta_security:{captcha_token:(u=e.options)===null||u===void 0?void 0:u.captchaToken}}:null),xform:te});if(m)throw m;if(!v||!v.session||!v.user){const f=new ve;return this._returnResult({data:{user:null,session:null},error:f})}return v.session&&(await this._saveSession(v.session),await this._notifyAllSubscribers("SIGNED_IN",v.session)),this._returnResult({data:Object.assign({},v),error:m})}catch(v){if(S(v))return this._returnResult({data:{user:null,session:null},error:v});throw v}}async signInWithSolana(e){var t,a,s,n,i,o,l,c,h,g,u,d;let p,v;if("message"in e)p=e.message,v=e.signature;else{const{chain:m,wallet:f,statement:b,options:y}=e;let k;if(K())if(typeof f=="object")k=f;else{const x=window;if("solana"in x&&typeof x.solana=="object"&&("signIn"in x.solana&&typeof x.solana.signIn=="function"||"signMessage"in x.solana&&typeof x.solana.signMessage=="function"))k=x.solana;else throw new Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.")}else{if(typeof f!="object"||!(y!=null&&y.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");k=f}const j=new URL((t=y==null?void 0:y.url)!==null&&t!==void 0?t:window.location.href);if("signIn"in k&&k.signIn){const x=await k.signIn(Object.assign(Object.assign(Object.assign({issuedAt:new Date().toISOString()},y==null?void 0:y.signInWithSolana),{version:"1",domain:j.host,uri:j.href}),b?{statement:b}:null));let w;if(Array.isArray(x)&&x[0]&&typeof x[0]=="object")w=x[0];else if(x&&typeof x=="object"&&"signedMessage"in x&&"signature"in x)w=x;else throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");if("signedMessage"in w&&"signature"in w&&(typeof w.signedMessage=="string"||w.signedMessage instanceof Uint8Array)&&w.signature instanceof Uint8Array)p=typeof w.signedMessage=="string"?w.signedMessage:new TextDecoder().decode(w.signedMessage),v=w.signature;else throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields")}else{if(!("signMessage"in k)||typeof k.signMessage!="function"||!("publicKey"in k)||typeof k!="object"||!k.publicKey||!("toBase58"in k.publicKey)||typeof k.publicKey.toBase58!="function")throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");p=[`${j.host} wants you to sign in with your Solana account:`,k.publicKey.toBase58(),...b?["",b,""]:[""],"Version: 1",`URI: ${j.href}`,`Issued At: ${(s=(a=y==null?void 0:y.signInWithSolana)===null||a===void 0?void 0:a.issuedAt)!==null&&s!==void 0?s:new Date().toISOString()}`,...!((n=y==null?void 0:y.signInWithSolana)===null||n===void 0)&&n.notBefore?[`Not Before: ${y.signInWithSolana.notBefore}`]:[],...!((i=y==null?void 0:y.signInWithSolana)===null||i===void 0)&&i.expirationTime?[`Expiration Time: ${y.signInWithSolana.expirationTime}`]:[],...!((o=y==null?void 0:y.signInWithSolana)===null||o===void 0)&&o.chainId?[`Chain ID: ${y.signInWithSolana.chainId}`]:[],...!((l=y==null?void 0:y.signInWithSolana)===null||l===void 0)&&l.nonce?[`Nonce: ${y.signInWithSolana.nonce}`]:[],...!((c=y==null?void 0:y.signInWithSolana)===null||c===void 0)&&c.requestId?[`Request ID: ${y.signInWithSolana.requestId}`]:[],...!((g=(h=y==null?void 0:y.signInWithSolana)===null||h===void 0?void 0:h.resources)===null||g===void 0)&&g.length?["Resources",...y.signInWithSolana.resources.map(w=>`- ${w}`)]:[]].join(`
`);const x=await k.signMessage(new TextEncoder().encode(p),"utf8");if(!x||!(x instanceof Uint8Array))throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");v=x}}try{const{data:m,error:f}=await O(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"solana",message:p,signature:_e(v)},!((u=e.options)===null||u===void 0)&&u.captchaToken?{gotrue_meta_security:{captcha_token:(d=e.options)===null||d===void 0?void 0:d.captchaToken}}:null),xform:te});if(f)throw f;if(!m||!m.session||!m.user){const b=new ve;return this._returnResult({data:{user:null,session:null},error:b})}return m.session&&(await this._saveSession(m.session),await this._notifyAllSubscribers("SIGNED_IN",m.session)),this._returnResult({data:Object.assign({},m),error:f})}catch(m){if(S(m))return this._returnResult({data:{user:null,session:null},error:m});throw m}}async _exchangeCodeForSession(e){const t=await me(this.storage,`${this.storageKey}-code-verifier`),[a,s]=(t??"").split("/");try{const{data:n,error:i}=await O(this.fetch,"POST",`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:e,code_verifier:a},xform:te});if(await F(this.storage,`${this.storageKey}-code-verifier`),i)throw i;if(!n||!n.session||!n.user){const o=new ve;return this._returnResult({data:{user:null,session:null,redirectType:null},error:o})}return n.session&&(await this._saveSession(n.session),await this._notifyAllSubscribers("SIGNED_IN",n.session)),this._returnResult({data:Object.assign(Object.assign({},n),{redirectType:s??null}),error:i})}catch(n){if(await F(this.storage,`${this.storageKey}-code-verifier`),S(n))return this._returnResult({data:{user:null,session:null,redirectType:null},error:n});throw n}}async signInWithIdToken(e){try{const{options:t,provider:a,token:s,access_token:n,nonce:i}=e,o=await O(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:a,id_token:s,access_token:n,nonce:i,gotrue_meta_security:{captcha_token:t==null?void 0:t.captchaToken}},xform:te}),{data:l,error:c}=o;if(c)return this._returnResult({data:{user:null,session:null},error:c});if(!l||!l.session||!l.user){const h=new ve;return this._returnResult({data:{user:null,session:null},error:h})}return l.session&&(await this._saveSession(l.session),await this._notifyAllSubscribers("SIGNED_IN",l.session)),this._returnResult({data:l,error:c})}catch(t){if(S(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async signInWithOtp(e){var t,a,s,n,i;try{if("email"in e){const{email:o,options:l}=e;let c=null,h=null;this.flowType==="pkce"&&([c,h]=await je(this.storage,this.storageKey));const{error:g}=await O(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{email:o,data:(t=l==null?void 0:l.data)!==null&&t!==void 0?t:{},create_user:(a=l==null?void 0:l.shouldCreateUser)!==null&&a!==void 0?a:!0,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken},code_challenge:c,code_challenge_method:h},redirectTo:l==null?void 0:l.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:g})}if("phone"in e){const{phone:o,options:l}=e,{data:c,error:h}=await O(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{phone:o,data:(s=l==null?void 0:l.data)!==null&&s!==void 0?s:{},create_user:(n=l==null?void 0:l.shouldCreateUser)!==null&&n!==void 0?n:!0,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken},channel:(i=l==null?void 0:l.channel)!==null&&i!==void 0?i:"sms"}});return this._returnResult({data:{user:null,session:null,messageId:c==null?void 0:c.message_id},error:h})}throw new Ne("You must provide either an email or phone number.")}catch(o){if(await F(this.storage,`${this.storageKey}-code-verifier`),S(o))return this._returnResult({data:{user:null,session:null},error:o});throw o}}async verifyOtp(e){var t,a;try{let s,n;"options"in e&&(s=(t=e.options)===null||t===void 0?void 0:t.redirectTo,n=(a=e.options)===null||a===void 0?void 0:a.captchaToken);const{data:i,error:o}=await O(this.fetch,"POST",`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},e),{gotrue_meta_security:{captcha_token:n}}),redirectTo:s,xform:te});if(o)throw o;if(!i)throw new Error("An error occurred on token verification.");const l=i.session,c=i.user;return l!=null&&l.access_token&&(await this._saveSession(l),await this._notifyAllSubscribers(e.type=="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(s){if(S(s))return this._returnResult({data:{user:null,session:null},error:s});throw s}}async signInWithSSO(e){var t,a,s,n,i;try{let o=null,l=null;this.flowType==="pkce"&&([o,l]=await je(this.storage,this.storageKey));const c=await O(this.fetch,"POST",`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},"providerId"in e?{provider_id:e.providerId}:null),"domain"in e?{domain:e.domain}:null),{redirect_to:(a=(t=e.options)===null||t===void 0?void 0:t.redirectTo)!==null&&a!==void 0?a:void 0}),!((s=e==null?void 0:e.options)===null||s===void 0)&&s.captchaToken?{gotrue_meta_security:{captcha_token:e.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:o,code_challenge_method:l}),headers:this.headers,xform:ai});return!((n=c.data)===null||n===void 0)&&n.url&&K()&&!(!((i=e.options)===null||i===void 0)&&i.skipBrowserRedirect)&&window.location.assign(c.data.url),this._returnResult(c)}catch(o){if(await F(this.storage,`${this.storageKey}-code-verifier`),S(o))return this._returnResult({data:null,error:o});throw o}}async reauthenticate(){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._reauthenticate())}async _reauthenticate(){try{return await this._useSession(async e=>{const{data:{session:t},error:a}=e;if(a)throw a;if(!t)throw new Y;const{error:s}=await O(this.fetch,"GET",`${this.url}/reauthenticate`,{headers:this.headers,jwt:t.access_token});return this._returnResult({data:{user:null,session:null},error:s})})}catch(e){if(S(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async resend(e){try{const t=`${this.url}/resend`;if("email"in e){const{email:a,type:s,options:n}=e,{error:i}=await O(this.fetch,"POST",t,{headers:this.headers,body:{email:a,type:s,gotrue_meta_security:{captcha_token:n==null?void 0:n.captchaToken}},redirectTo:n==null?void 0:n.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:i})}else if("phone"in e){const{phone:a,type:s,options:n}=e,{data:i,error:o}=await O(this.fetch,"POST",t,{headers:this.headers,body:{phone:a,type:s,gotrue_meta_security:{captcha_token:n==null?void 0:n.captchaToken}}});return this._returnResult({data:{user:null,session:null,messageId:i==null?void 0:i.message_id},error:o})}throw new Ne("You must provide either an email or phone number and a type")}catch(t){if(S(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async getSession(){return await this.initializePromise,await this._acquireLock(-1,async()=>this._useSession(async t=>t))}async _acquireLock(e,t){this._debug("#_acquireLock","begin",e);try{if(this.lockAcquired){const a=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),s=(async()=>(await a,await t()))();return this.pendingInLock.push((async()=>{try{await s}catch{}})()),s}return await this.lock(`lock:${this.storageKey}`,e,async()=>{this._debug("#_acquireLock","lock acquired for storage key",this.storageKey);try{this.lockAcquired=!0;const a=t();for(this.pendingInLock.push((async()=>{try{await a}catch{}})()),await a;this.pendingInLock.length;){const s=[...this.pendingInLock];await Promise.all(s),this.pendingInLock.splice(0,s.length)}return await a}finally{this._debug("#_acquireLock","lock released for storage key",this.storageKey),this.lockAcquired=!1}})}finally{this._debug("#_acquireLock","end")}}async _useSession(e){this._debug("#_useSession","begin");try{const t=await this.__loadSession();return await e(t)}finally{this._debug("#_useSession","end")}}async __loadSession(){this._debug("#__loadSession()","begin"),this.lockAcquired||this._debug("#__loadSession()","used outside of an acquired lock!",new Error().stack);try{let e=null;const t=await me(this.storage,this.storageKey);if(this._debug("#getSession()","session from storage",t),t!==null&&(this._isValidSession(t)?e=t:(this._debug("#getSession()","session from storage is not valid"),await this._removeSession())),!e)return{data:{session:null},error:null};const a=e.expires_at?e.expires_at*1e3-Date.now()<jt:!1;if(this._debug("#__loadSession()",`session has${a?"":" not"} expired`,"expires_at",e.expires_at),!a){if(this.userStorage){const i=await me(this.userStorage,this.storageKey+"-user");i!=null&&i.user?e.user=i.user:e.user=St()}if(this.storage.isServer&&e.user&&!e.user.__isUserNotAvailableProxy){const i={value:this.suppressGetSessionWarning};e.user=Qn(e.user,i),i.value&&(this.suppressGetSessionWarning=!0)}return{data:{session:e},error:null}}const{data:s,error:n}=await this._callRefreshToken(e.refresh_token);return n?this._returnResult({data:{session:null},error:n}):this._returnResult({data:{session:s},error:null})}finally{this._debug("#__loadSession()","end")}}async getUser(e){if(e)return await this._getUser(e);await this.initializePromise;const t=await this._acquireLock(-1,async()=>await this._getUser());return t.data.user&&(this.suppressGetSessionWarning=!0),t}async _getUser(e){try{return e?await O(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:e,xform:he}):await this._useSession(async t=>{var a,s,n;const{data:i,error:o}=t;if(o)throw o;return!(!((a=i.session)===null||a===void 0)&&a.access_token)&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new Y}:await O(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:(n=(s=i.session)===null||s===void 0?void 0:s.access_token)!==null&&n!==void 0?n:void 0,xform:he})})}catch(t){if(S(t))return Da(t)&&(await this._removeSession(),await F(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({data:{user:null},error:t});throw t}}async updateUser(e,t={}){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._updateUser(e,t))}async _updateUser(e,t={}){try{return await this._useSession(async a=>{const{data:s,error:n}=a;if(n)throw n;if(!s.session)throw new Y;const i=s.session;let o=null,l=null;this.flowType==="pkce"&&e.email!=null&&([o,l]=await je(this.storage,this.storageKey));const{data:c,error:h}=await O(this.fetch,"PUT",`${this.url}/user`,{headers:this.headers,redirectTo:t==null?void 0:t.emailRedirectTo,body:Object.assign(Object.assign({},e),{code_challenge:o,code_challenge_method:l}),jwt:i.access_token,xform:he});if(h)throw h;return i.user=c.user,await this._saveSession(i),await this._notifyAllSubscribers("USER_UPDATED",i),this._returnResult({data:{user:i.user},error:null})})}catch(a){if(await F(this.storage,`${this.storageKey}-code-verifier`),S(a))return this._returnResult({data:{user:null},error:a});throw a}}async setSession(e){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._setSession(e))}async _setSession(e){try{if(!e.access_token||!e.refresh_token)throw new Y;const t=Date.now()/1e3;let a=t,s=!0,n=null;const{payload:i}=Et(e.access_token);if(i.exp&&(a=i.exp,s=a<=t),s){const{data:o,error:l}=await this._callRefreshToken(e.refresh_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});if(!o)return{data:{user:null,session:null},error:null};n=o}else{const{data:o,error:l}=await this._getUser(e.access_token);if(l)throw l;n={access_token:e.access_token,refresh_token:e.refresh_token,user:o.user,token_type:"bearer",expires_in:a-t,expires_at:a},await this._saveSession(n),await this._notifyAllSubscribers("SIGNED_IN",n)}return this._returnResult({data:{user:n.user,session:n},error:null})}catch(t){if(S(t))return this._returnResult({data:{session:null,user:null},error:t});throw t}}async refreshSession(e){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._refreshSession(e))}async _refreshSession(e){try{return await this._useSession(async t=>{var a;if(!e){const{data:i,error:o}=t;if(o)throw o;e=(a=i.session)!==null&&a!==void 0?a:void 0}if(!(e!=null&&e.refresh_token))throw new Y;const{data:s,error:n}=await this._callRefreshToken(e.refresh_token);return n?this._returnResult({data:{user:null,session:null},error:n}):s?this._returnResult({data:{user:s.user,session:s},error:null}):this._returnResult({data:{user:null,session:null},error:null})})}catch(t){if(S(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async _getSessionFromURL(e,t){try{if(!K())throw new Me("No browser detected.");if(e.error||e.error_description||e.error_code)throw new Me(e.error_description||"Error in URL with unspecified error_description",{error:e.error||"unspecified_error",code:e.error_code||"unspecified_code"});switch(t){case"implicit":if(this.flowType==="pkce")throw new Bt("Not a valid PKCE flow url.");break;case"pkce":if(this.flowType==="implicit")throw new Me("Not a valid implicit grant flow url.");break;default:}if(t==="pkce"){if(this._debug("#_initialize()","begin","is PKCE flow",!0),!e.code)throw new Bt("No code detected.");const{data:b,error:y}=await this._exchangeCodeForSession(e.code);if(y)throw y;const k=new URL(window.location.href);return k.searchParams.delete("code"),window.history.replaceState(window.history.state,"",k.toString()),{data:{session:b.session,redirectType:null},error:null}}const{provider_token:a,provider_refresh_token:s,access_token:n,refresh_token:i,expires_in:o,expires_at:l,token_type:c}=e;if(!n||!o||!i||!c)throw new Me("No session defined in URL");const h=Math.round(Date.now()/1e3),g=parseInt(o);let u=h+g;l&&(u=parseInt(l));const d=u-h;d*1e3<=Te&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${d}s, should have been closer to ${g}s`);const p=u-g;h-p>=120?console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",p,u,h):h-p<0&&console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",p,u,h);const{data:v,error:m}=await this._getUser(n);if(m)throw m;const f={provider_token:a,provider_refresh_token:s,access_token:n,expires_in:g,expires_at:u,refresh_token:i,token_type:c,user:v.user};return window.location.hash="",this._debug("#_getSessionFromURL()","clearing window.location.hash"),this._returnResult({data:{session:f,redirectType:e.type},error:null})}catch(a){if(S(a))return this._returnResult({data:{session:null,redirectType:null},error:a});throw a}}_isImplicitGrantCallback(e){return!!(e.access_token||e.error_description)}async _isPKCECallback(e){const t=await me(this.storage,`${this.storageKey}-code-verifier`);return!!(e.code&&t)}async signOut(e={scope:"global"}){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._signOut(e))}async _signOut({scope:e}={scope:"global"}){return await this._useSession(async t=>{var a;const{data:s,error:n}=t;if(n)return this._returnResult({error:n});const i=(a=s.session)===null||a===void 0?void 0:a.access_token;if(i){const{error:o}=await this.admin.signOut(i,e);if(o&&!(Ba(o)&&(o.status===404||o.status===401||o.status===403)))return this._returnResult({error:o})}return e!=="others"&&(await this._removeSession(),await F(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({error:null})})}onAuthStateChange(e){const t=Un(),a={id:t,callback:e,unsubscribe:()=>{this._debug("#unsubscribe()","state change callback with id removed",t),this.stateChangeEmitters.delete(t)}};return this._debug("#onAuthStateChange()","registered callback with id",t),this.stateChangeEmitters.set(t,a),(async()=>(await this.initializePromise,await this._acquireLock(-1,async()=>{this._emitInitialSession(t)})))(),{data:{subscription:a}}}async _emitInitialSession(e){return await this._useSession(async t=>{var a,s;try{const{data:{session:n},error:i}=t;if(i)throw i;await((a=this.stateChangeEmitters.get(e))===null||a===void 0?void 0:a.callback("INITIAL_SESSION",n)),this._debug("INITIAL_SESSION","callback id",e,"session",n)}catch(n){await((s=this.stateChangeEmitters.get(e))===null||s===void 0?void 0:s.callback("INITIAL_SESSION",null)),this._debug("INITIAL_SESSION","callback id",e,"error",n),console.error(n)}})}async resetPasswordForEmail(e,t={}){let a=null,s=null;this.flowType==="pkce"&&([a,s]=await je(this.storage,this.storageKey,!0));try{return await O(this.fetch,"POST",`${this.url}/recover`,{body:{email:e,code_challenge:a,code_challenge_method:s,gotrue_meta_security:{captcha_token:t.captchaToken}},headers:this.headers,redirectTo:t.redirectTo})}catch(n){if(await F(this.storage,`${this.storageKey}-code-verifier`),S(n))return this._returnResult({data:null,error:n});throw n}}async getUserIdentities(){var e;try{const{data:t,error:a}=await this.getUser();if(a)throw a;return this._returnResult({data:{identities:(e=t.user.identities)!==null&&e!==void 0?e:[]},error:null})}catch(t){if(S(t))return this._returnResult({data:null,error:t});throw t}}async linkIdentity(e){return"token"in e?this.linkIdentityIdToken(e):this.linkIdentityOAuth(e)}async linkIdentityOAuth(e){var t;try{const{data:a,error:s}=await this._useSession(async n=>{var i,o,l,c,h;const{data:g,error:u}=n;if(u)throw u;const d=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,e.provider,{redirectTo:(i=e.options)===null||i===void 0?void 0:i.redirectTo,scopes:(o=e.options)===null||o===void 0?void 0:o.scopes,queryParams:(l=e.options)===null||l===void 0?void 0:l.queryParams,skipBrowserRedirect:!0});return await O(this.fetch,"GET",d,{headers:this.headers,jwt:(h=(c=g.session)===null||c===void 0?void 0:c.access_token)!==null&&h!==void 0?h:void 0})});if(s)throw s;return K()&&!(!((t=e.options)===null||t===void 0)&&t.skipBrowserRedirect)&&window.location.assign(a==null?void 0:a.url),this._returnResult({data:{provider:e.provider,url:a==null?void 0:a.url},error:null})}catch(a){if(S(a))return this._returnResult({data:{provider:e.provider,url:null},error:a});throw a}}async linkIdentityIdToken(e){return await this._useSession(async t=>{var a;try{const{error:s,data:{session:n}}=t;if(s)throw s;const{options:i,provider:o,token:l,access_token:c,nonce:h}=e,g=await O(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,jwt:(a=n==null?void 0:n.access_token)!==null&&a!==void 0?a:void 0,body:{provider:o,id_token:l,access_token:c,nonce:h,link_identity:!0,gotrue_meta_security:{captcha_token:i==null?void 0:i.captchaToken}},xform:te}),{data:u,error:d}=g;return d?this._returnResult({data:{user:null,session:null},error:d}):!u||!u.session||!u.user?this._returnResult({data:{user:null,session:null},error:new ve}):(u.session&&(await this._saveSession(u.session),await this._notifyAllSubscribers("USER_UPDATED",u.session)),this._returnResult({data:u,error:d}))}catch(s){if(await F(this.storage,`${this.storageKey}-code-verifier`),S(s))return this._returnResult({data:{user:null,session:null},error:s});throw s}})}async unlinkIdentity(e){try{return await this._useSession(async t=>{var a,s;const{data:n,error:i}=t;if(i)throw i;return await O(this.fetch,"DELETE",`${this.url}/user/identities/${e.identity_id}`,{headers:this.headers,jwt:(s=(a=n.session)===null||a===void 0?void 0:a.access_token)!==null&&s!==void 0?s:void 0})})}catch(t){if(S(t))return this._returnResult({data:null,error:t});throw t}}async _refreshAccessToken(e){const t=`#_refreshAccessToken(${e.substring(0,5)}...)`;this._debug(t,"begin");try{const a=Date.now();return await Hn(async s=>(s>0&&await Dn(200*Math.pow(2,s-1)),this._debug(t,"refreshing attempt",s),await O(this.fetch,"POST",`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:e},headers:this.headers,xform:te})),(s,n)=>{const i=200*Math.pow(2,s);return n&&rt(n)&&Date.now()+i-a<Te})}catch(a){if(this._debug(t,"error",a),S(a))return this._returnResult({data:{session:null,user:null},error:a});throw a}finally{this._debug(t,"end")}}_isValidSession(e){return typeof e=="object"&&e!==null&&"access_token"in e&&"refresh_token"in e&&"expires_at"in e}async _handleProviderSignIn(e,t){const a=await this._getUrlForProvider(`${this.url}/authorize`,e,{redirectTo:t.redirectTo,scopes:t.scopes,queryParams:t.queryParams});return this._debug("#_handleProviderSignIn()","provider",e,"options",t,"url",a),K()&&!t.skipBrowserRedirect&&window.location.assign(a),{data:{provider:e,url:a},error:null}}async _recoverAndRefresh(){var e,t;const a="#_recoverAndRefresh()";this._debug(a,"begin");try{const s=await me(this.storage,this.storageKey);if(s&&this.userStorage){let i=await me(this.userStorage,this.storageKey+"-user");!this.storage.isServer&&Object.is(this.storage,this.userStorage)&&!i&&(i={user:s.user},await Ae(this.userStorage,this.storageKey+"-user",i)),s.user=(e=i==null?void 0:i.user)!==null&&e!==void 0?e:St()}else if(s&&!s.user&&!s.user){const i=await me(this.storage,this.storageKey+"-user");i&&(i!=null&&i.user)?(s.user=i.user,await F(this.storage,this.storageKey+"-user"),await Ae(this.storage,this.storageKey,s)):s.user=St()}if(this._debug(a,"session from storage",s),!this._isValidSession(s)){this._debug(a,"session is not valid"),s!==null&&await this._removeSession();return}const n=((t=s.expires_at)!==null&&t!==void 0?t:1/0)*1e3-Date.now()<jt;if(this._debug(a,`session has${n?"":" not"} expired with margin of ${jt}s`),n){if(this.autoRefreshToken&&s.refresh_token){const{error:i}=await this._callRefreshToken(s.refresh_token);i&&(console.error(i),rt(i)||(this._debug(a,"refresh failed with a non-retryable error, removing the session",i),await this._removeSession()))}}else if(s.user&&s.user.__isUserNotAvailableProxy===!0)try{const{data:i,error:o}=await this._getUser(s.access_token);!o&&(i!=null&&i.user)?(s.user=i.user,await this._saveSession(s),await this._notifyAllSubscribers("SIGNED_IN",s)):this._debug(a,"could not get user data, skipping SIGNED_IN notification")}catch(i){console.error("Error getting user data:",i),this._debug(a,"error getting user data, skipping SIGNED_IN notification",i)}else await this._notifyAllSubscribers("SIGNED_IN",s)}catch(s){this._debug(a,"error",s),console.error(s);return}finally{this._debug(a,"end")}}async _callRefreshToken(e){var t,a;if(!e)throw new Y;if(this.refreshingDeferred)return this.refreshingDeferred.promise;const s=`#_callRefreshToken(${e.substring(0,5)}...)`;this._debug(s,"begin");try{this.refreshingDeferred=new wt;const{data:n,error:i}=await this._refreshAccessToken(e);if(i)throw i;if(!n.session)throw new Y;await this._saveSession(n.session),await this._notifyAllSubscribers("TOKEN_REFRESHED",n.session);const o={data:n.session,error:null};return this.refreshingDeferred.resolve(o),o}catch(n){if(this._debug(s,"error",n),S(n)){const i={data:null,error:n};return rt(n)||await this._removeSession(),(t=this.refreshingDeferred)===null||t===void 0||t.resolve(i),i}throw(a=this.refreshingDeferred)===null||a===void 0||a.reject(n),n}finally{this.refreshingDeferred=null,this._debug(s,"end")}}async _notifyAllSubscribers(e,t,a=!0){const s=`#_notifyAllSubscribers(${e})`;this._debug(s,"begin",t,`broadcast = ${a}`);try{this.broadcastChannel&&a&&this.broadcastChannel.postMessage({event:e,session:t});const n=[],i=Array.from(this.stateChangeEmitters.values()).map(async o=>{try{await o.callback(e,t)}catch(l){n.push(l)}});if(await Promise.all(i),n.length>0){for(let o=0;o<n.length;o+=1)console.error(n[o]);throw n[0]}}finally{this._debug(s,"end")}}async _saveSession(e){this._debug("#_saveSession()",e),this.suppressGetSessionWarning=!0,await F(this.storage,`${this.storageKey}-code-verifier`);const t=Object.assign({},e),a=t.user&&t.user.__isUserNotAvailableProxy===!0;if(this.userStorage){!a&&t.user&&await Ae(this.userStorage,this.storageKey+"-user",{user:t.user});const s=Object.assign({},t);delete s.user;const n=fr(s);await Ae(this.storage,this.storageKey,n)}else{const s=fr(t);await Ae(this.storage,this.storageKey,s)}}async _removeSession(){this._debug("#_removeSession()"),this.suppressGetSessionWarning=!1,await F(this.storage,this.storageKey),await F(this.storage,this.storageKey+"-code-verifier"),await F(this.storage,this.storageKey+"-user"),this.userStorage&&await F(this.userStorage,this.storageKey+"-user"),await this._notifyAllSubscribers("SIGNED_OUT",null)}_removeVisibilityChangedCallback(){this._debug("#_removeVisibilityChangedCallback()");const e=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{e&&K()&&(window!=null&&window.removeEventListener)&&window.removeEventListener("visibilitychange",e)}catch(t){console.error("removing visibilitychange callback failed",t)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug("#_startAutoRefresh()");const e=setInterval(()=>this._autoRefreshTokenTick(),Te);this.autoRefreshTicker=e,e&&typeof e=="object"&&typeof e.unref=="function"?e.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(e),setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0)}async _stopAutoRefresh(){this._debug("#_stopAutoRefresh()");const e=this.autoRefreshTicker;this.autoRefreshTicker=null,e&&clearInterval(e)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async _autoRefreshTokenTick(){this._debug("#_autoRefreshTokenTick()","begin");try{await this._acquireLock(0,async()=>{try{const e=Date.now();try{return await this._useSession(async t=>{const{data:{session:a}}=t;if(!a||!a.refresh_token||!a.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const s=Math.floor((a.expires_at*1e3-e)/Te);this._debug("#_autoRefreshTokenTick()",`access token expires in ${s} ticks, a tick lasts ${Te}ms, refresh threshold is ${Ut} ticks`),s<=Ut&&await this._callRefreshToken(a.refresh_token)})}catch(t){console.error("Auto refresh tick failed with error. This is likely a transient error.",t)}}finally{this._debug("#_autoRefreshTokenTick()","end")}})}catch(e){if(e.isAcquireTimeout||e instanceof er)this._debug("auto refresh token tick lock not available");else throw e}}async _handleVisibilityChange(){if(this._debug("#_handleVisibilityChange()"),!K()||!(window!=null&&window.addEventListener))return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>await this._onVisibilityChanged(!1),window==null||window.addEventListener("visibilitychange",this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(e){console.error("_handleVisibilityChange",e)}}async _onVisibilityChanged(e){const t=`#_onVisibilityChanged(${e})`;this._debug(t,"visibilityState",document.visibilityState),document.visibilityState==="visible"?(this.autoRefreshToken&&this._startAutoRefresh(),e||(await this.initializePromise,await this._acquireLock(-1,async()=>{if(document.visibilityState!=="visible"){this._debug(t,"acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");return}await this._recoverAndRefresh()}))):document.visibilityState==="hidden"&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(e,t,a){const s=[`provider=${encodeURIComponent(t)}`];if(a!=null&&a.redirectTo&&s.push(`redirect_to=${encodeURIComponent(a.redirectTo)}`),a!=null&&a.scopes&&s.push(`scopes=${encodeURIComponent(a.scopes)}`),this.flowType==="pkce"){const[n,i]=await je(this.storage,this.storageKey),o=new URLSearchParams({code_challenge:`${encodeURIComponent(n)}`,code_challenge_method:`${encodeURIComponent(i)}`});s.push(o.toString())}if(a!=null&&a.queryParams){const n=new URLSearchParams(a.queryParams);s.push(n.toString())}return a!=null&&a.skipBrowserRedirect&&s.push(`skip_http_redirect=${a.skipBrowserRedirect}`),`${e}?${s.join("&")}`}async _unenroll(e){try{return await this._useSession(async t=>{var a;const{data:s,error:n}=t;return n?this._returnResult({data:null,error:n}):await O(this.fetch,"DELETE",`${this.url}/factors/${e.factorId}`,{headers:this.headers,jwt:(a=s==null?void 0:s.session)===null||a===void 0?void 0:a.access_token})})}catch(t){if(S(t))return this._returnResult({data:null,error:t});throw t}}async _enroll(e){try{return await this._useSession(async t=>{var a,s;const{data:n,error:i}=t;if(i)return this._returnResult({data:null,error:i});const o=Object.assign({friendly_name:e.friendlyName,factor_type:e.factorType},e.factorType==="phone"?{phone:e.phone}:e.factorType==="totp"?{issuer:e.issuer}:{}),{data:l,error:c}=await O(this.fetch,"POST",`${this.url}/factors`,{body:o,headers:this.headers,jwt:(a=n==null?void 0:n.session)===null||a===void 0?void 0:a.access_token});return c?this._returnResult({data:null,error:c}):(e.factorType==="totp"&&l.type==="totp"&&(!((s=l==null?void 0:l.totp)===null||s===void 0)&&s.qr_code)&&(l.totp.qr_code=`data:image/svg+xml;utf-8,${l.totp.qr_code}`),this._returnResult({data:l,error:null}))})}catch(t){if(S(t))return this._returnResult({data:null,error:t});throw t}}async _verify(e){return this._acquireLock(-1,async()=>{try{return await this._useSession(async t=>{var a;const{data:s,error:n}=t;if(n)return this._returnResult({data:null,error:n});const i=Object.assign({challenge_id:e.challengeId},"webauthn"in e?{webauthn:Object.assign(Object.assign({},e.webauthn),{credential_response:e.webauthn.type==="create"?bi(e.webauthn.credential_response):yi(e.webauthn.credential_response)})}:{code:e.code}),{data:o,error:l}=await O(this.fetch,"POST",`${this.url}/factors/${e.factorId}/verify`,{body:i,headers:this.headers,jwt:(a=s==null?void 0:s.session)===null||a===void 0?void 0:a.access_token});return l?this._returnResult({data:null,error:l}):(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+o.expires_in},o)),await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED",o),this._returnResult({data:o,error:l}))})}catch(t){if(S(t))return this._returnResult({data:null,error:t});throw t}})}async _challenge(e){return this._acquireLock(-1,async()=>{try{return await this._useSession(async t=>{var a;const{data:s,error:n}=t;if(n)return this._returnResult({data:null,error:n});const i=await O(this.fetch,"POST",`${this.url}/factors/${e.factorId}/challenge`,{body:e,headers:this.headers,jwt:(a=s==null?void 0:s.session)===null||a===void 0?void 0:a.access_token});if(i.error)return i;const{data:o}=i;if(o.type!=="webauthn")return{data:o,error:null};switch(o.webauthn.type){case"create":return{data:Object.assign(Object.assign({},o),{webauthn:Object.assign(Object.assign({},o.webauthn),{credential_options:Object.assign(Object.assign({},o.webauthn.credential_options),{publicKey:vi(o.webauthn.credential_options.publicKey)})})}),error:null};case"request":return{data:Object.assign(Object.assign({},o),{webauthn:Object.assign(Object.assign({},o.webauthn),{credential_options:Object.assign(Object.assign({},o.webauthn.credential_options),{publicKey:fi(o.webauthn.credential_options.publicKey)})})}),error:null}}})}catch(t){if(S(t))return this._returnResult({data:null,error:t});throw t}})}async _challengeAndVerify(e){const{data:t,error:a}=await this._challenge({factorId:e.factorId});return a?this._returnResult({data:null,error:a}):await this._verify({factorId:e.factorId,challengeId:t.id,code:e.code})}async _listFactors(){var e;const{data:{user:t},error:a}=await this.getUser();if(a)return{data:null,error:a};const s={all:[],phone:[],totp:[],webauthn:[]};for(const n of(e=t==null?void 0:t.factors)!==null&&e!==void 0?e:[])s.all.push(n),n.status==="verified"&&s[n.factor_type].push(n);return{data:s,error:null}}async _getAuthenticatorAssuranceLevel(){var e,t;const{data:{session:a},error:s}=await this.getSession();if(s)return this._returnResult({data:null,error:s});if(!a)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};const{payload:n}=Et(a.access_token);let i=null;n.aal&&(i=n.aal);let o=i;((t=(e=a.user.factors)===null||e===void 0?void 0:e.filter(h=>h.status==="verified"))!==null&&t!==void 0?t:[]).length>0&&(o="aal2");const c=n.amr||[];return{data:{currentLevel:i,nextLevel:o,currentAuthenticationMethods:c},error:null}}async _getAuthorizationDetails(e){try{return await this._useSession(async t=>{const{data:{session:a},error:s}=t;return s?this._returnResult({data:null,error:s}):a?await O(this.fetch,"GET",`${this.url}/oauth/authorizations/${e}`,{headers:this.headers,jwt:a.access_token,xform:n=>({data:n,error:null})}):this._returnResult({data:null,error:new Y})})}catch(t){if(S(t))return this._returnResult({data:null,error:t});throw t}}async _approveAuthorization(e,t){try{return await this._useSession(async a=>{const{data:{session:s},error:n}=a;if(n)return this._returnResult({data:null,error:n});if(!s)return this._returnResult({data:null,error:new Y});const i=await O(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:s.access_token,body:{action:"approve"},xform:o=>({data:o,error:null})});return i.data&&i.data.redirect_url&&K()&&!(t!=null&&t.skipBrowserRedirect)&&window.location.assign(i.data.redirect_url),i})}catch(a){if(S(a))return this._returnResult({data:null,error:a});throw a}}async _denyAuthorization(e,t){try{return await this._useSession(async a=>{const{data:{session:s},error:n}=a;if(n)return this._returnResult({data:null,error:n});if(!s)return this._returnResult({data:null,error:new Y});const i=await O(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:s.access_token,body:{action:"deny"},xform:o=>({data:o,error:null})});return i.data&&i.data.redirect_url&&K()&&!(t!=null&&t.skipBrowserRedirect)&&window.location.assign(i.data.redirect_url),i})}catch(a){if(S(a))return this._returnResult({data:null,error:a});throw a}}async _listOAuthGrants(){try{return await this._useSession(async e=>{const{data:{session:t},error:a}=e;return a?this._returnResult({data:null,error:a}):t?await O(this.fetch,"GET",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:t.access_token,xform:s=>({data:s,error:null})}):this._returnResult({data:null,error:new Y})})}catch(e){if(S(e))return this._returnResult({data:null,error:e});throw e}}async _revokeOAuthGrant(e){try{return await this._useSession(async t=>{const{data:{session:a},error:s}=t;return s?this._returnResult({data:null,error:s}):a?(await O(this.fetch,"DELETE",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:a.access_token,query:{client_id:e.clientId},noResolveJson:!0}),{data:{},error:null}):this._returnResult({data:null,error:new Y})})}catch(t){if(S(t))return this._returnResult({data:null,error:t});throw t}}async fetchJwk(e,t={keys:[]}){let a=t.keys.find(o=>o.kid===e);if(a)return a;const s=Date.now();if(a=this.jwks.keys.find(o=>o.kid===e),a&&this.jwks_cached_at+Pn>s)return a;const{data:n,error:i}=await O(this.fetch,"GET",`${this.url}/.well-known/jwks.json`,{headers:this.headers});if(i)throw i;return!n.keys||n.keys.length===0||(this.jwks=n,this.jwks_cached_at=s,a=n.keys.find(o=>o.kid===e),!a)?null:a}async getClaims(e,t={}){try{let a=e;if(!a){const{data:d,error:p}=await this.getSession();if(p||!d.session)return this._returnResult({data:null,error:p});a=d.session.access_token}const{header:s,payload:n,signature:i,raw:{header:o,payload:l}}=Et(a);t!=null&&t.allowExpired||Zn(n.exp);const c=!s.alg||s.alg.startsWith("HS")||!s.kid||!("crypto"in globalThis&&"subtle"in globalThis.crypto)?null:await this.fetchJwk(s.kid,t!=null&&t.keys?{keys:t.keys}:t==null?void 0:t.jwks);if(!c){const{error:d}=await this.getUser(a);if(d)throw d;return{data:{claims:n,header:s,signature:i},error:null}}const h=Yn(s.alg),g=await crypto.subtle.importKey("jwk",c,h,!0,["verify"]);if(!await crypto.subtle.verify(h,g,i,Nn(`${o}.${l}`)))throw new dt("Invalid JWT signature");return{data:{claims:n,header:s,signature:i},error:null}}catch(a){if(S(a))return this._returnResult({data:null,error:a});throw a}}};tr.nextInstanceID={};const Ai=Qt,Oi=tr,Ci=Object.freeze(Object.defineProperty({__proto__:null,AuthAdminApi:Ai,AuthApiError:qa,AuthClient:Oi,AuthError:$e,AuthImplicitGrantRedirectError:Me,AuthInvalidCredentialsError:Ne,AuthInvalidJwtError:dt,AuthInvalidTokenResponseError:ve,AuthPKCEGrantCodeExchangeError:Bt,AuthRetryableFetchError:ct,AuthSessionMissingError:Y,AuthUnknownError:ue,AuthWeakPasswordError:Dt,CustomAuthError:le,GoTrueAdminApi:Qt,GoTrueClient:tr,NavigatorLockAcquireTimeoutError:Ga,SIGN_OUT_SCOPES:at,isAuthApiError:Ba,isAuthError:S,isAuthImplicitGrantRedirectError:Ha,isAuthRetryableFetchError:rt,isAuthSessionMissingError:Da,isAuthWeakPasswordError:Rn,lockInternals:be,navigatorLock:Wa,processLock:oi},Symbol.toStringTag,{value:"Module"})),Ya=Be(Ci);Object.defineProperty(yt,"__esModule",{value:!0});yt.SupabaseAuthClient=void 0;const Pi=Ya;class Ri extends Pi.AuthClient{constructor(e){super(e)}}yt.SupabaseAuthClient=Ri;Object.defineProperty(st,"__esModule",{value:!0});const $i=ta,zi=W,Ii=_a,Li=kn,Qe=Ia,Ni=La,Er=pe,Mi=yt;let Ui=class{constructor(e,t,a){var s,n,i;this.supabaseUrl=e,this.supabaseKey=t;const o=(0,Er.validateSupabaseUrl)(e);if(!t)throw new Error("supabaseKey is required.");this.realtimeUrl=new URL("realtime/v1",o),this.realtimeUrl.protocol=this.realtimeUrl.protocol.replace("http","ws"),this.authUrl=new URL("auth/v1",o),this.storageUrl=new URL("storage/v1",o),this.functionsUrl=new URL("functions/v1",o);const l=`sb-${o.hostname.split(".")[0]}-auth-token`,c={db:Qe.DEFAULT_DB_OPTIONS,realtime:Qe.DEFAULT_REALTIME_OPTIONS,auth:Object.assign(Object.assign({},Qe.DEFAULT_AUTH_OPTIONS),{storageKey:l}),global:Qe.DEFAULT_GLOBAL_OPTIONS},h=(0,Er.applySettingDefaults)(a??{},c);this.storageKey=(s=h.auth.storageKey)!==null&&s!==void 0?s:"",this.headers=(n=h.global.headers)!==null&&n!==void 0?n:{},h.accessToken?(this.accessToken=h.accessToken,this.auth=new Proxy({},{get:(g,u)=>{throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(u)} is not possible`)}})):this.auth=this._initSupabaseAuthClient((i=h.auth)!==null&&i!==void 0?i:{},this.headers,h.global.fetch),this.fetch=(0,Ni.fetchWithAuth)(t,this._getAccessToken.bind(this),h.global.fetch),this.realtime=this._initRealtimeClient(Object.assign({headers:this.headers,accessToken:this._getAccessToken.bind(this)},h.realtime)),this.accessToken&&this.accessToken().then(g=>this.realtime.setAuth(g)).catch(g=>console.warn("Failed to set initial Realtime auth token:",g)),this.rest=new zi.PostgrestClient(new URL("rest/v1",o).href,{headers:this.headers,schema:h.db.schema,fetch:this.fetch}),this.storage=new Li.StorageClient(this.storageUrl.href,this.headers,this.fetch,a==null?void 0:a.storage),h.accessToken||this._listenForAuthEvents()}get functions(){return new $i.FunctionsClient(this.functionsUrl.href,{headers:this.headers,customFetch:this.fetch})}from(e){return this.rest.from(e)}schema(e){return this.rest.schema(e)}rpc(e,t={},a={head:!1,get:!1,count:void 0}){return this.rest.rpc(e,t,a)}channel(e,t={config:{}}){return this.realtime.channel(e,t)}getChannels(){return this.realtime.getChannels()}removeChannel(e){return this.realtime.removeChannel(e)}removeAllChannels(){return this.realtime.removeAllChannels()}async _getAccessToken(){var e,t;if(this.accessToken)return await this.accessToken();const{data:a}=await this.auth.getSession();return(t=(e=a.session)===null||e===void 0?void 0:e.access_token)!==null&&t!==void 0?t:this.supabaseKey}_initSupabaseAuthClient({autoRefreshToken:e,persistSession:t,detectSessionInUrl:a,storage:s,userStorage:n,storageKey:i,flowType:o,lock:l,debug:c,throwOnError:h},g,u){const d={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new Mi.SupabaseAuthClient({url:this.authUrl.href,headers:Object.assign(Object.assign({},d),g),storageKey:i,autoRefreshToken:e,persistSession:t,detectSessionInUrl:a,storage:s,userStorage:n,flowType:o,lock:l,debug:c,throwOnError:h,fetch:u,hasCustomAuthorizationHeader:Object.keys(this.headers).some(p=>p.toLowerCase()==="authorization")})}_initRealtimeClient(e){return new Ii.RealtimeClient(this.realtimeUrl.href,Object.assign(Object.assign({},e),{params:Object.assign({apikey:this.supabaseKey},e==null?void 0:e.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((t,a)=>{this._handleTokenChanged(t,"CLIENT",a==null?void 0:a.access_token)})}_handleTokenChanged(e,t,a){(e==="TOKEN_REFRESHED"||e==="SIGNED_IN")&&this.changedAccessToken!==a?(this.changedAccessToken=a,this.realtime.setAuth(a)):e==="SIGNED_OUT"&&(this.realtime.setAuth(),t=="STORAGE"&&this.auth.signOut(),this.changedAccessToken=void 0)}};st.default=Ui;(function(r){var e=ke&&ke.__createBinding||(Object.create?function(h,g,u,d){d===void 0&&(d=u);var p=Object.getOwnPropertyDescriptor(g,u);(!p||("get"in p?!g.__esModule:p.writable||p.configurable))&&(p={enumerable:!0,get:function(){return g[u]}}),Object.defineProperty(h,d,p)}:function(h,g,u,d){d===void 0&&(d=u),h[d]=g[u]}),t=ke&&ke.__exportStar||function(h,g){for(var u in h)u!=="default"&&!Object.prototype.hasOwnProperty.call(g,u)&&e(g,h,u)},a=ke&&ke.__importDefault||function(h){return h&&h.__esModule?h:{default:h}};Object.defineProperty(r,"__esModule",{value:!0}),r.createClient=r.SupabaseClient=r.FunctionRegion=r.FunctionsError=r.FunctionsRelayError=r.FunctionsFetchError=r.FunctionsHttpError=r.PostgrestError=void 0;const s=a(st);t(Ya,r);var n=W;Object.defineProperty(r,"PostgrestError",{enumerable:!0,get:function(){return n.PostgrestError}});var i=ta;Object.defineProperty(r,"FunctionsHttpError",{enumerable:!0,get:function(){return i.FunctionsHttpError}}),Object.defineProperty(r,"FunctionsFetchError",{enumerable:!0,get:function(){return i.FunctionsFetchError}}),Object.defineProperty(r,"FunctionsRelayError",{enumerable:!0,get:function(){return i.FunctionsRelayError}}),Object.defineProperty(r,"FunctionsError",{enumerable:!0,get:function(){return i.FunctionsError}}),Object.defineProperty(r,"FunctionRegion",{enumerable:!0,get:function(){return i.FunctionRegion}}),t(_a,r);var o=st;Object.defineProperty(r,"SupabaseClient",{enumerable:!0,get:function(){return a(o).default}});const l=(h,g,u)=>new s.default(h,g,u);r.createClient=l;function c(){if(typeof window<"u"||typeof process>"u")return!1;const h=process.version;if(h==null)return!1;const g=h.match(/^v(\d+)\./);return g?parseInt(g[1],10)<=18:!1}c()&&console.warn("⚠️  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217")})(Kt);const Xa=xs(Kt),qi=ws({__proto__:null,default:Xa},[Kt]),{PostgrestError:Do,FunctionsHttpError:Ho,FunctionsFetchError:Vo,FunctionsRelayError:Fo,FunctionsError:Ko,FunctionRegion:Go,SupabaseClient:Wo,createClient:Bi,GoTrueAdminApi:Jo,GoTrueClient:Zo,AuthAdminApi:Yo,AuthClient:Xo,navigatorLock:Qo,NavigatorLockAcquireTimeoutError:el,lockInternals:tl,processLock:rl,SIGN_OUT_SCOPES:al,AuthError:sl,AuthApiError:nl,AuthUnknownError:il,CustomAuthError:ol,AuthSessionMissingError:ll,AuthInvalidTokenResponseError:cl,AuthInvalidCredentialsError:dl,AuthImplicitGrantRedirectError:ul,AuthPKCEGrantCodeExchangeError:hl,AuthRetryableFetchError:pl,AuthWeakPasswordError:gl,AuthInvalidJwtError:ml,isAuthError:vl,isAuthApiError:fl,isAuthSessionMissingError:bl,isAuthImplicitGrantRedirectError:yl,isAuthRetryableFetchError:wl,isAuthWeakPasswordError:_l,RealtimePresence:kl,RealtimeChannel:xl,RealtimeClient:jl,REALTIME_LISTEN_TYPES:El,REALTIME_POSTGRES_CHANGES_LISTEN_EVENT:Sl,REALTIME_PRESENCE_LISTEN_EVENTS:Tl,REALTIME_SUBSCRIBE_STATES:Al,REALTIME_CHANNEL_STATES:Ol}=Xa||qi,Di="https://gcpgmzewvaclbxeyvjng.supabase.co",Hi="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjcGdtemV3dmFjbGJ4ZXl2am5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5NTczMzQsImV4cCI6MjA4MDUzMzMzNH0.MsapRRGwXMwadiSTWedBP87jm7HQL4LV0EFI5ENDnJM",re=Bi(Di,Hi),U=Object.freeze(Object.defineProperty({__proto__:null,supabase:re},Symbol.toStringTag,{value:"Module"})),T={services:[{id:"pojasevi",name:"Ugradnja pojaseva",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 13.5 10.5 17.7a4 4 0 0 0 0 5.6 4 4 0 0 0 5.6 0l4.2-4.2a4 4 0 0 0 0-5.6l-5.6-5.6"/><path d="M20.2 13.5 13.5 20.2"/><path d="M4 11V4h7"/><path d="M2.5 7.5 11 16"/></svg>',description:"Profesionalna ugradnja sigurnosnih pojaseva. Možete donijeti i rastavljeni sustav za pojaseve.",sellingPoints:["Certificirana ugradnja","Garancija na rad","Brza i precizna usluga","Podrška za sve modele"],images:["/images/pojas1.png","/images/pojas2.png"]},{id:"zvjezdano-nebo",name:"Ugradnja zvjezdanog neba",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z"/></svg>',description:"Luksuzna ugradnja LED zvjezdanog neba u strop vozila.",sellingPoints:["Premium LED tehnologija","Prilagođeni dizajn","Dugotrajnost","Spektakularan efekt"],images:["/images/zvjezde1.png","/images/zvjezde2.png"]},{id:"zatamnjivanje",name:"Zatamnjivanje zadnjih stakala",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h18v18H3zM21 9H3M21 15H3M12 3v18"/></svg>',is_request_price:!0,description:"Profesionalno zatamnjivanje stakala prema zakonskim propisima.",sellingPoints:["Zakonski propisi","UV zaštita","Estetski izgled","Povećana privatnost"],images:["/images/stakla1.png","/images/stakla2.png"]},{id:"kodiranje",name:"Kodiranje vozila",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',is_request_price:!0,description:"Otključavanje dodatnih funkcija i personalizacija vozila.",sellingPoints:["Video u vožnji","Carplay/Android Auto","Ažuriranje navigacije","Needle sweep"],images:["/images/kodiranje1.png","/images/kodiranje2.png"]},{id:"mapiranje",name:"Mapiranje vozila",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',is_request_price:!0,description:"Optimizacija softvera motora za bolje performanse (Stage 1, EGR, DPF...).",sellingPoints:["Povećanje snage","Manja potrošnja","Optimizacija rada","Isključivanje sustava"],images:["/images/kodiranje1.png","/images/kodiranje2.png"]},{id:"chrome-delete",name:"Chrome delete",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>',is_request_price:!0,description:"Presvlačenje kromiranih dijelova u crnu sjajnu ili mat foliju.",sellingPoints:["Moderniji izgled","Zaštita kroma","Crna sjaj ili mat","Reverzibilan proces"],images:["/images/chrome1.png","/images/chrome2.png"]}],bundles:[{id:"bronze-paket",name:"Bronze Paket",price:490,original_price:615,icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M7 15h0M2 9h20M7 4v5"/></svg>',description:"Ugradnja pojaseva, promjena boje čeljusti, kodiranje vozila.",includes:["pojasevi","kocnice","kodiranje"],sellingPoints:["Ugradnja pojaseva","Lakiranje čeljusti","Kodiranje vozila"],images:["/images/pojas1.png","/images/kocnica1.png"]},{id:"silver-paket",name:"Silver Paket",price:690,original_price:815,icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 7l2 5h-4l2-5"/></svg>',description:"Ugradnja pojaseva, promjena boje čeljusti, zatamnjivanje stakala, kodiranje vozila.",includes:["pojasevi","kocnice","zatamnjivanje","kodiranje"],sellingPoints:["Sve iz Bronze paketa","Zatamnjivanje stakala"],images:["/images/pojas1.png","/images/kodiranje1.png"]},{id:"gold-paket",name:"Gold Paket",price:790,original_price:965,icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 7l2 5h-4l2-5"/><path d="M8 12h8"/></svg>',description:"Ugradnja pojaseva, promjena boje čeljusti, kodiranje vozila, mapiranje vozila.",includes:["pojasevi","kocnice","kodiranje","mapiranje"],sellingPoints:["Ugradnja pojaseva & Lakiranje čeljusti","Kodiranje & Mapiranje vozila"],images:["/images/pojas1.png","/images/kodiranje1.png"]},{id:"best-deal",name:"Best Deal",price:490,original_price:695,icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',description:"Ugradnja pojaseva i mapiranje vozila.",includes:["pojasevi","mapiranje"],sellingPoints:["Ugradnja pojaseva","Mapiranje vozila"],images:["/images/pojas1.png","/images/kodiranje1.png"]},{id:"platinum-paket",name:"Platinum Paket",price:1490,original_price:1950,icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 7l2 5h-4l2-5"/><path d="M12 2v20"/></svg>',description:"Ugradnja pojaseva, promjena boje čeljusti, kodiranje, ugradnja zvjezdanog neba (650 zvjezdica), mapiranje, zatamnjivanje.",includes:["pojasevi","kocnice","kodiranje","zvjezdano-nebo","mapiranje","zatamnjivanje"],sellingPoints:["Sve usluge uključene","Zvjezdano nebo (650 zvjezdica)","Potpuna transformacija vozila"],images:["/images/pojas1.png","/images/kodiranje1.png"]}],maxReservations:4,reviews:[{id:1,company:"Maminjo",logo:"/images/review-maminjo.png",rating:5,text:"Odličan servis! Profesionalno i brzo obavljen posao. Preporučujem!",author:"Maminjo"},{id:2,company:"Luxe Rent",logo:"/images/review-luxerent.png",rating:5,text:"Koristimo njihove usluge za cijelu flotu. Uvijek pouzdani i kvalitetni.",author:"Luxe Rent"}],faq:[{question:"Koliko traje ugradnja pojaseva?",answer:"Ugradnja pojaseva obično traje 2-4 sata, ovisno o modelu vozila i broju pojaseva."},{question:"Mogu li donijeti vlastite pojaseve?",answer:"Da, možete donijeti vlastite pojaseve ili čak rastavljeni sustav. Naši stručnjaci će ih profesionalno ugraditi."},{question:"Koliko zvjezdica mogu odabrati za zvjezdano nebo?",answer:"Nudimo širok raspon opcija zvjezdica, prilagođen vašim željama i vozilu. Kontaktirajte nas za detalje."},{question:"Je li zatamnjivanje stakala zakonito?",answer:"Da, naše zatamnjivanje je u skladu sa zakonskim propisima. Prednja stakla ostaju nezatamnjena."},{question:"Što je mapiranje vozila?",answer:"Mapiranje je proces optimizacije softvera upravljačke jedinice motora za poboljšanje performansi i ekonomičnosti."},{question:"Imate li garanciju na usluge?",answer:"Da, sve naše usluge dolaze s garancijom. Detalji ovise o vrsti usluge."},{question:"Trebam li naručiti termin unaprijed?",answer:"Preporučujemo rezervaciju termina kako bismo osigurali dostupnost i najbolju uslugu."},{question:"Koliko košta ugradnja pojaseva?",answer:"Cijena ovisi o modelu vozila i broju pojaseva. Kontaktirajte nas za točnu ponudu."},{question:"Radite li vikendom?",answer:"Radimo od ponedjeljka do petka. Za hitne slučajeve, kontaktirajte nas."},{question:"Gdje se nalazite?",answer:"Nalazimo se na adresi Vranplaninska ulica 1, Zagreb."}],booking:{service:null,vehicle:{},date:null,time:null,customer:{}},reservations:[],async saveBooking(r){var i,o,l;const{supabase:e}=await M(async()=>{const{supabase:c}=await Promise.resolve().then(()=>U);return{supabase:c}},void 0);let t=null;if(r.softverSlika instanceof File)try{t=await this.uploadBookingFile(r.softverSlika)}catch(c){console.error("Failed to upload software image",c)}const a={service_id:r.service_id,service_name:r.service_name||((i=this.services.find(c=>c.id===r.service_id))==null?void 0:i.name)||((l=(o=this.bundles)==null?void 0:o.find(c=>c.id===r.service_id))==null?void 0:l.name),marka:r.marka,model:r.model,godina:r.godina,broj_pojaseva:r.broj_pojaseva?parseInt(r.broj_pojaseva):null,vlastiti_pojasevi:r.vlastiti_pojasevi||!1,broj_zvjezdica:r.broj_zvjezdica?parseInt(r.broj_zvjezdica):null,vin:r.vinBroj||null,software_version_image_url:t,napomena:r.napomena||null,appointment_date:r.appointment_date,appointment_time:r.appointment_time,ime:r.ime,prezime:r.prezime,email:r.email,telefon:r.telefon,status:"pending",is_manual_entry:r.is_manual_entry||!1},{data:s,error:n}=await e.from("bookings").insert([a]).select();if(n)throw console.error("Error saving booking:",n),n;return s[0]},async uploadBookingFile(r){const{supabase:e}=await M(async()=>{const{supabase:o}=await Promise.resolve().then(()=>U);return{supabase:o}},void 0),t=r.name.split(".").pop(),s=`${`${Math.random().toString(36).substring(2)}.${t}`}`,{error:n}=await e.storage.from("booking-files").upload(s,r);if(n)throw n;const{data:i}=e.storage.from("booking-files").getPublicUrl(s);return i.publicUrl},async getReservations(){const{supabase:r}=await M(async()=>{const{supabase:a}=await Promise.resolve().then(()=>U);return{supabase:a}},void 0),{data:e,error:t}=await r.from("bookings").select("*").order("created_at",{ascending:!1});return t?(console.error("Error fetching reservations:",t),[]):e||[]},async updateReservationStatus(r,e,t=null){const{supabase:a}=await M(async()=>{const{supabase:i}=await Promise.resolve().then(()=>U);return{supabase:i}},void 0),s={status:e};t!==null&&(s.price=t);const{error:n}=await a.from("bookings").update(s).eq("id",r);if(n)throw console.error("Error updating reservation:",n),n},async fetchServiceConfig(){const{supabase:r}=await M(async()=>{const{supabase:a}=await Promise.resolve().then(()=>U);return{supabase:a}},void 0),{data:e,error:t}=await r.from("services").select("*");if(t&&console.warn("Error fetching service config:",t),e&&e.length>0){const a=e.find(s=>s.id==="global_config");a&&(this.maxReservations=a.duration_minutes||4),this.services=this.services.map(s=>{const n=e.find(i=>i.id===s.id);return n?{...s,duration:n.duration_minutes,durationPerUnit:n.duration_per_unit_minutes,durationRastavljeni:n.duration_rastavljeni_minutes,price:n.price}:s})}return this.services},async loadServices(){return await this.fetchServiceConfig()},async updateServiceConfig(r,e){const{supabase:t}=await M(async()=>{const{supabase:i}=await Promise.resolve().then(()=>U);return{supabase:i}},void 0),a=this.services.find(i=>i.id===r),s={id:r,...e,updated_at:new Date().toISOString()};a?(s.name=a.name,s.icon=a.icon,s.description||(s.description=a.description)):s.name=s.name||"Service Config";const{error:n}=await t.from("services").upsert(s);if(n)throw console.error("Update Service Config Error:",JSON.stringify(n,null,2)),n;await this.fetchServiceConfig()},async loadReviews(){return this.reviews=await this.getReviews(),this.reviews},async getReviews(){const{supabase:r}=await M(async()=>{const{supabase:a}=await Promise.resolve().then(()=>U);return{supabase:a}},void 0),{data:e,error:t}=await r.from("reviews").select("*").eq("is_approved",!0).order("created_at",{ascending:!1});return t?(console.error("Error fetching reviews:",t),[]):e||[]},async saveReview(r){var n;const{supabase:e}=await M(async()=>{const{supabase:i}=await Promise.resolve().then(()=>U);return{supabase:i}},void 0),{data:{user:t}}=await e.auth.getUser(),a=((n=t==null?void 0:t.user_metadata)==null?void 0:n.role)==="admin",{error:s}=await e.from("reviews").insert([{...r,is_approved:a}]);if(s)throw s},async deleteReview(r){const{supabase:e}=await M(async()=>{const{supabase:a}=await Promise.resolve().then(()=>U);return{supabase:a}},void 0),{error:t}=await e.from("reviews").delete().eq("id",r);if(t)throw t},async uploadReviewImage(r){const{supabase:e}=await M(async()=>{const{supabase:o}=await Promise.resolve().then(()=>U);return{supabase:o}},void 0),t=r.name.split(".").pop(),s=`${`${Math.random()}.${t}`}`,{error:n}=await e.storage.from("review-images").upload(s,r);if(n)throw n;const{data:i}=e.storage.from("review-images").getPublicUrl(s);return i.publicUrl},async getCalendarAvailability(r,e){const{supabase:t}=await M(async()=>{const{supabase:u}=await Promise.resolve().then(()=>U);return{supabase:u}},void 0);await this.fetchServiceConfig();const a=new Date(r,e,1),s=new Date(r,e+1,0),n=a.toISOString().split("T")[0],i=s.toISOString().split("T")[0],{data:o,error:l}=await t.from("bookings").select("appointment_date, service_id, status").gte("appointment_date",n).lte("appointment_date",i).neq("status","cancelled");if(l)return console.error("Error fetching availability:",l),{};const c={};o&&o.forEach(u=>{const d=u.appointment_date;let p=1;u.service_id==="platinum-paket"||u.service_id==="gold-paket"||u.service_id==="silver-paket"?p=2:p=1,c[d]=(c[d]||0)+p});const h={},g=s.getDate();for(let u=1;u<=g;u++){const d=new Date(r,e,u),p=`${r}-${String(e+1).padStart(2,"0")}-${String(u).padStart(2,"0")}`;d.getDay();{const v=c[p]||0;let m="available";(await this.getClosedDays()).some(b=>b.date===p)?m="unavailable":v>=T.maxReservations-1&&(m="almost-full"),h[u]={status:m,count:v||0}}}return h},async getReservationsByDate(r){const{supabase:e}=await M(async()=>{const{supabase:s}=await Promise.resolve().then(()=>U);return{supabase:s}},void 0),{data:t,error:a}=await e.from("bookings").select("*").eq("appointment_date",r).order("appointment_time",{ascending:!0});return a?(console.error("Error fetching daily reservations:",a),[]):t||[]},async getReservationById(r){const{supabase:e}=await M(async()=>{const{supabase:s}=await Promise.resolve().then(()=>U);return{supabase:s}},void 0),{data:t,error:a}=await e.from("bookings").select("*").eq("id",r).single();return a?(console.error("Error fetching reservation:",a),null):t},async getTimeSlots(r){const{supabase:e}=await M(async()=>{const{supabase:s}=await Promise.resolve().then(()=>U);return{supabase:s}},void 0),{count:t,error:a}=await e.from("bookings").select("*",{count:"exact",head:!0}).eq("appointment_date",r).neq("status","cancelled");return this.maxReservations,[{time:"09:00",available:!0},{time:"09:30",available:!0},{time:"10:00",available:!0},{time:"10:30",available:!0},{time:"11:00",available:!0},{time:"11:30",available:!0},{time:"12:00",available:!0},{time:"12:30",available:!0},{time:"13:00",available:!0},{time:"13:30",available:!0},{time:"14:00",available:!0}]},async addReview(r){const{supabase:e}=await M(async()=>{const{supabase:a}=await Promise.resolve().then(()=>U);return{supabase:a}},void 0),{error:t}=await e.from("reviews").insert([{...r,is_approved:!0}]);if(t)throw t},async updateReview(r,e){const{supabase:t}=await M(async()=>{const{supabase:s}=await Promise.resolve().then(()=>U);return{supabase:s}},void 0),{error:a}=await t.from("reviews").update(e).eq("id",r);if(a)throw a},async fetchServiceConfig(){const{supabase:r}=await M(async()=>{const{supabase:a}=await Promise.resolve().then(()=>U);return{supabase:a}},void 0),{data:e,error:t}=await r.from("services").select("*");if(t)console.warn("Error fetching service config:",t);else if(e){const a=e.find(s=>s.id==="global_config");a&&(this.maxReservations=a.duration_minutes||4),this.services=this.services.map(s=>{const n=e.find(i=>i.id===s.id);return n?{...s,duration:n.duration_minutes,durationPerUnit:n.duration_per_unit_minutes,durationRastavljeni:n.duration_rastavljeni_minutes,price:n.price,is_from:n.is_from,price_to:n.price_to,is_request_price:n.is_request_price,price_disassembled:n.price_disassembled,price_per_star:n.price_per_star}:s})}return this.services},async updateServiceConfig(r,e){const{supabase:t}=await M(async()=>{const{supabase:i}=await Promise.resolve().then(()=>U);return{supabase:i}},void 0),a=this.services.find(i=>i.id===r),s={id:r,...e,updated_at:new Date().toISOString()};a?(s.name=a.name,s.icon=a.icon,s.description=a.description||e.description||"Service Description"):(s.name=s.name||"Service Config",s.icon=s.icon||"⚙️",s.description=s.description||"Config");const{error:n}=await t.from("services").upsert(s);if(n)throw console.error("Update Service Config Error:",n),n;await this.fetchServiceConfig()},async manageAdmins(r,e={}){const{supabase:t}=await M(async()=>{const{supabase:n}=await Promise.resolve().then(()=>U);return{supabase:n}},void 0),{data:a,error:s}=await t.functions.invoke("manage-admins",{body:{action:r,...e}});if(s)throw console.error("manage-admins Error:",s),new Error(`Function failed: ${s.message||JSON.stringify(s)}`);if(a&&a.error)throw console.error("manage-admins App Error:",a.error),new Error(a.error);return a},async getClosedDays(){const{supabase:r}=await M(async()=>{const{supabase:a}=await Promise.resolve().then(()=>U);return{supabase:a}},void 0),{data:e,error:t}=await r.from("closed_days").select("*");return t?(console.error("Error fetching closed days:",t),[]):e||[]},async addClosedDay(r){const{supabase:e}=await M(async()=>{const{supabase:s}=await Promise.resolve().then(()=>U);return{supabase:s}},void 0);if((await this.getClosedDays()).find(s=>s.date===r))throw new Error("Dan je već zatvoren.");const{error:a}=await e.from("closed_days").insert([{date:r}]);if(a)throw console.error("Error adding closed day:",a),a},async removeClosedDay(r){const{supabase:e}=await M(async()=>{const{supabase:a}=await Promise.resolve().then(()=>U);return{supabase:a}},void 0),{error:t}=await e.from("closed_days").delete().eq("id",r);if(t)throw console.error("Error removing closed day:",t),t},async buyCoupon(r){const{supabase:e}=await M(async()=>{const{supabase:a}=await Promise.resolve().then(()=>U);return{supabase:a}},void 0),{error:t}=await e.from("coupons").insert([{amount:parseInt(r.amount),purchaser_name:r.purchaserName,purchaser_email:r.purchaserEmail,purchaser_phone:r.purchaserPhone,recipient_name:r.recipientName,recipient_email:r.recipientEmail,recipient_message:r.message,status:"confirmed"}]);if(t)throw console.error("Error buying coupon:",t),t},async getCoupons(){const{supabase:r}=await M(async()=>{const{supabase:a}=await Promise.resolve().then(()=>U);return{supabase:a}},void 0),{data:e,error:t}=await r.from("coupons").select("*").order("created_at",{ascending:!1});return t?(console.error("Error fetching coupons:",t),[]):e||[]}};function Vi(){const r=document.createElement("section");r.className="hero-section",r.innerHTML=`
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
            <svg class="search-icon icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.28-.06-.58.02-.81.23l-1.31 1.31 5.65 5.65c.35.35.8.53 1.29.53H18c1.1 0 2-.9 2-2v-4.46c0-.5-.2-1.01-.58-1.55z" />
            </svg>
            <input 
              type="text" 
              class="search-input" 
              placeholder="Rezerviraj termin - pretraži uslugu..."
              id="hero-search-input"
            >
          </div>
          <div class="search-results hidden" id="search-results"></div>
        </div>
      </div>
    </div>
  `;const e=r.querySelector("#hero-search-input"),t=r.querySelector("#search-results"),a=n=>{n.length>0?(t.innerHTML=n.map(i=>`
        <div class="search-result-item glass" data-service-id="${i.id}">
          <span class="result-icon">${i.icon}</span>
          <span class="result-name">${i.name}</span>
        </div>
      `).join(""),t.classList.remove("hidden"),t.querySelectorAll(".search-result-item").forEach(i=>{i.addEventListener("click",()=>{const o=i.dataset.serviceId;B.navigate("/booking",{serviceId:o})})})):t.classList.add("hidden")},s=n=>{const i=n.toLowerCase().trim();if(i.length===0){a(T.services);return}const o=T.services.filter(l=>l.name.toLowerCase().includes(i)||l.description.toLowerCase().includes(i));a(o)};return e.addEventListener("input",n=>{s(n.target.value)}),e.addEventListener("focus",()=>{s(e.value)}),document.addEventListener("click",n=>{r.contains(n.target)||t.classList.add("hidden")}),r}const Qa=document.createElement("style");Qa.textContent=`
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
    color: rgba(255, 255, 255, 0.5);
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
`;document.head.appendChild(Qa);function Fi(){const r=document.createElement("section");return r.className="section how-it-works",r.innerHTML=`
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
            Pogledaj našu ponudu i odaberi uslugu koja ti treba - od ugradnje pojaseva do kodiranja vozila.
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
          <h3 class="step-title">Dovezi Auto</h3>
          <p class="step-description">
            Dovezi auto u dogovoreno vrijeme na našu adresu. Naš tim će se pobrinuti za sve ostalo.
          </p>
        </div>
      </div>
    </div>
  `,r}const es=document.createElement("style");es.textContent=`
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
`;document.head.appendChild(es);function Ki(){const r=document.createElement("section");r.className="section services-widget";let e=!1;const t=()=>{const a=e?T.bundles:T.services,s=e?"PAKETI":"USLUGE",n=a.map(i=>{const o=i.id==="best-deal";return`
      <div class="card service-card ${o?"best-deal-card":""}" data-id="${i.id}" data-type="${e?"bundle":"service"}">
        ${o?'<div class="best-deal-badge">NAJBOLJA PONUDA</div>':""}
        <div class="service-icon">${i.icon}</div>
        <h3 class="service-title">${i.name}</h3>
        <p class="service-description">${i.description}</p>
        ${i.is_request_price?'<p class="service-price" style="font-weight: bold; color: var(--color-accent); margin-bottom: 10px; font-size: 1.1rem;">Cijena na upit</p>':i.price?`<div class="service-price" style="font-weight: bold; color: var(--color-accent); margin-bottom: 10px; font-size: 1.1rem; display: flex; flex-direction: column; align-items: center;">
            ${i.original_price&&i.original_price>i.price?`<span style="text-decoration: line-through; color: var(--text-secondary); font-size: 0.8em;">${i.original_price} EUR</span>`:""}
            <span>${i.is_from?'<span style="font-size: 0.9em; opacity: 0.8; font-weight: normal;">od</span> ':""}${i.price.toFixed(2)} EUR</span>
        </div>`:""}
        <button class="btn btn-primary service-btn">
          Rezerviraj
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
  `}).join("");r.innerHTML=`
    <div class="container">
      <h2 class="section-title text-center mb-xl">
        <span class="heading-top">${s}</span>
        <span class="heading-bottom">Što Nudimo</span>
      </h2>
      
      <div class="text-center mb-xl">
        <button class="btn btn-white" id="toggle-view-btn">
            ${e?"KLIKNI ZA POJEDINAČNE USLUGE":"KLIKNI ZA PAKETE"}
        </button>
      </div>

      <div class="grid services-grid">
        ${n}
      </div>
    </div>
  `,r.querySelectorAll(".service-card").forEach(i=>{i.addEventListener("click",o=>{if(o.target.closest(".service-btn")){const l=i.dataset.id;B.navigate("/booking",{serviceId:l})}})}),r.querySelector("#toggle-view-btn").addEventListener("click",()=>{e=!e,t()})};return t(),T.loadServices().then(()=>{e||t()}),r}const ts=document.createElement("style");ts.textContent=`
  .services-widget {
    background: var(--color-secondary);
  }

  .services-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--spacing-xl);
  }

  .service-card {
    width: calc(33.333% - var(--spacing-xl));
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
    .service-card {
      width: calc(50% - var(--spacing-xl));
    }
  }

  @media (max-width: 640px) {
    .service-card {
      width: 100%;
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

  .best-deal-card {
      border: 1px solid #eab308 !important; /* Yellow border */
      box-shadow: 0 0 15px rgba(234, 179, 8, 0.2);
      position: relative;
  }
  
  .best-deal-badge {
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: #eab308;
      color: black;
      font-weight: bold;
      font-size: 0.75rem;
      padding: 4px 12px;
      border-radius: 12px;
      white-space: nowrap;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      z-index: 10;
  }
`;document.head.appendChild(ts);function Gi(){const r=document.createElement("section");return r.className="cta-banner",r.innerHTML=`
    <div class="cta-content glass">
      <h2 class="cta-title">Rezerviraj termin u 3 jednostavna koraka.</h2>
      <button class="btn btn-cta" id="cta-button">
        Započni Rezervaciju
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  `,r.querySelector("#cta-button").addEventListener("click",()=>{B.navigate("/booking")}),r}const rs=document.createElement("style");rs.textContent=`
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
`;document.head.appendChild(rs);function Wi(){const r=document.createElement("section");r.className="section about-section",r.id="about-section",r.innerHTML=`
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
  `;let e=!1;const t=r.querySelector("#parallax-car"),a=()=>{const n=window.pageYOffset,i=r.offsetTop,o=r.offsetHeight,l=window.innerHeight;if(n+l>i&&n<i+o){const c=(n-i)*-.3;t.style.transform=`translateY(${c}px)`}e=!1},s=()=>{e||(requestAnimationFrame(a),e=!0)};return window.addEventListener("scroll",s),r}const as=document.createElement("style");as.textContent=`
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
`;document.head.appendChild(as);function Ji(){const r=document.createElement("section");r.className="section coupons-section",r.id="coupons",r.innerHTML=`
        <div class="container">
            <h2 class="section-title mb-lg">
                <span class="heading-top">POKLON BONOVI</span>
                <span class="heading-bottom" style="font-size: 2.5rem;">USREĆI FRENDA/ICU</span>
            </h2>

            <div class="coupons-grid">
                ${[50,100,200,300].map(g=>`
                    <div class="coupon-card glass" data-amount="${g}">
                        <div class="coupon-content">
                            <div class="coupon-amount">${g}€</div>
                            <div class="coupon-label">Poklon Bon</div>
                        </div>
                        <button class="btn btn-primary coupon-btn">Kupi</button>
                    </div>
                `).join("")}
            </div>
        </div>

        <!-- Coupon Modal -->
        <div id="coupon-modal" class="glass coupon-modal" style="display: none;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-lg);">
                <h3 id="coupon-modal-title">Kupi Poklon Bon</h3>
                <button id="close-coupon-modal" class="close-modal-btn">✕</button>
            </div>
            
            <form id="coupon-form">
                <input type="hidden" name="amount" id="coupon-amount-input">
                
                <h4 style="color: var(--color-accent); margin-bottom: 10px;">Vaši Podaci</h4>
                <div class="form-group mb-sm">
                    <label class="form-label">Vaše ime i prezime</label>
                    <input type="text" class="input" name="purchaserName" required>
                </div>
                <div class="form-group mb-sm">
                    <label class="form-label">Vaš email (za potvrdu)</label>
                    <input type="email" class="input" name="purchaserEmail" required>
                </div>
                <div class="form-group mb-md">
                    <label class="form-label">Vaš telefon</label>
                    <input type="tel" class="input" name="purchaserPhone" required>
                </div>

                <h4 style="color: var(--color-accent); margin-bottom: 10px;">Podaci Primatelja</h4>
                <div class="form-group mb-sm">
                    <label class="form-label">Ime i prezime primatelja</label>
                    <input type="text" class="input" name="recipientName" required>
                </div>
                <div class="form-group mb-sm">
                    <label class="form-label">Email primatelja (za slanje bona)</label>
                    <input type="email" class="input" name="recipientEmail" required>
                </div>
                <div class="form-group mb-md">
                    <label class="form-label">Poruka (opcionalno)</label>
                    <textarea class="input" name="message" rows="3"></textarea>
                </div>

                <button type="submit" class="btn btn-cta w-full" id="coupon-submit-btn">Naruči</button>
            </form>

            <!-- Success Message View -->
            <div id="coupon-success-view" style="display: none; text-align: center; padding: var(--spacing-lg) 0;">
                <div style="margin-bottom: var(--spacing-lg);">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 60px; height: 60px; color: var(--color-success); margin: 0 auto;">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                </div>
                <h3 style="font-size: 1.5rem; margin-bottom: var(--spacing-md);">Hvala na narudžbi!</h3>
                <p style="color: var(--color-text-muted); margin-bottom: var(--spacing-lg);">
                    Poklon bon je uspješno naručen.<br>
                    Uskoro ćemo Vam na mail poslati račun.
                </p>
                <button class="btn btn-primary w-full" id="close-success-btn">Zatvori</button>
            </div>
        </div>
        <div id="coupon-overlay" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 999;"></div>
    `;const e=r.querySelector("#coupon-modal"),t=r.querySelector("#coupon-overlay"),a=r.querySelector("#coupon-form"),s=r.querySelector("#coupon-success-view"),n=r.querySelector("#coupon-amount-input"),i=r.querySelector("#coupon-modal-title"),o=r.querySelector("#close-coupon-modal"),l=r.querySelector("#close-success-btn"),c=g=>{n.value=g,i.innerHTML=`Kupi Poklon Bon <span style="color: var(--color-accent);">${g}€</span>`,a.style.display="block",s.style.display="none",a.reset(),e.classList.remove("modal-exit"),e.classList.add("modal-enter"),e.style.display="block",t.style.display="block",document.body.style.overflow="hidden"},h=()=>{e.classList.remove("modal-enter"),e.classList.add("modal-exit"),t.style.display="none",document.body.style.overflow="",setTimeout(()=>{e.style.display="none",a.reset(),a.style.display="block",s.style.display="none"},300)};return o.onclick=h,t.onclick=h,l.onclick=h,r.querySelectorAll(".coupon-card").forEach(g=>{g.addEventListener("click",()=>{c(g.dataset.amount)})}),a.addEventListener("submit",async g=>{g.preventDefault();const u=r.querySelector("#coupon-submit-btn"),d=u.textContent;u.textContent="Obrađivanje...",u.disabled=!0;const p=new FormData(a),v=Object.fromEntries(p.entries());try{await T.buyCoupon(v),a.style.display="none",s.style.display="block"}catch(m){console.error(m),alert("Greška prilikom narudžbe: "+(m.message||"Molimo pokušajte ponovno."))}finally{u.textContent=d,u.disabled=!1}}),r}const ss=document.createElement("style");ss.textContent=`
    .coupons-section {
        padding: var(--spacing-3xl) 0;
        background: linear-gradient(to bottom, var(--color-background), var(--color-primary));
    }

    .coupons-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: var(--spacing-lg);
        margin-top: var(--spacing-xl);
    }

    .coupon-card {
        padding: var(--spacing-xl);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-lg);
        transition: transform 0.3s ease, border-color 0.3s ease;
        cursor: pointer;
        background: radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 70%);
        border: 1px solid rgba(255,255,255,0.1);
    }

    .coupon-card:hover {
        transform: translateY(-5px);
        border-color: var(--color-accent);
        box-shadow: 0 10px 30px rgba(0, 152, 255, 0.1);
    }

    .coupon-amount {
        font-size: 3rem;
        font-weight: 900;
        color: var(--color-accent);
        line-height: 1;
        text-shadow: 0 0 20px rgba(0, 152, 255, 0.3);
    }

    .coupon-label {
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-size: 0.9rem;
        color: var(--text-secondary);
        margin-top: var(--spacing-xs);
    }

    @media (max-width: 1024px) {
        .coupons-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 640px) {
        .coupons-grid {
            grid-template-columns: 1fr;
        }
        
        .heading-bottom {
            font-size: 1.8rem !important; /* Force smaller size on mobile */
        }
    }
    
    .mb-sm { margin-bottom: var(--spacing-sm); }
    .mb-md { margin-bottom: var(--spacing-md); }
    .w-full { width: 100%; }

    /* Modal Styles */
    .coupon-modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        max-width: 500px;
        padding: var(--spacing-xl);
        z-index: 1000;
        max-height: 90vh;
        overflow-y: auto;
    }

    .close-modal-btn {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 2rem;
        line-height: 1;
        padding: 5px;
        transition: color 0.2s;
    }
    .close-modal-btn:hover {
        color: var(--color-accent);
    }

    /* Animations */
    @keyframes fadeInModal {
        from { opacity: 0; transform: translate(-50%, -45%); }
        to { opacity: 1; transform: translate(-50%, -50%); }
    }

    @keyframes fadeOutModal {
        from { opacity: 1; transform: translate(-50%, -50%); }
        to { opacity: 0; transform: translate(-50%, -45%); }
    }

    .modal-enter {
        animation: fadeInModal 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .modal-exit {
        animation: fadeOutModal 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
`;document.head.appendChild(ss);function Zi(){const r=document.createElement("section");return r.className="section reviews-slider",r.innerHTML=`
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
            ${Array(5).fill(0).map((v,m)=>`
                <svg class="star ${m<p.rating?"filled":""}" viewBox="0 0 24 24" fill="${m<p.rating?"currentColor":"none"}" stroke="currentColor" stroke-width="2">
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
    `;const a=r.querySelector("#reviews-track"),s=r.querySelector("#slider-prev"),n=r.querySelector("#slider-next"),i=r.querySelector("#slider-dots");let o=0;const l=e.length;for(let p=0;p<l;p++){const v=document.createElement("button");v.className=`slider-dot ${p===0?"active":""}`,v.addEventListener("click",()=>h(p)),i.appendChild(v)}const c=()=>{a.querySelectorAll(".review-card").forEach((v,m)=>{v.classList.toggle("active",m===o)}),i.querySelectorAll(".slider-dot").forEach((v,m)=>{v.classList.toggle("active",m===o)})},h=p=>{o=p,c()},g=()=>{o=(o+1)%l,c()},u=()=>{o=(o-1+l)%l,c()};s.addEventListener("click",u),n.addEventListener("click",g);let d=setInterval(g,5e3);r.addEventListener("mouseenter",()=>{clearInterval(d)}),r.addEventListener("mouseleave",()=>{d=setInterval(g,5e3)}),setTimeout(c,0)}),r}const ns=document.createElement("style");ns.textContent=`
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
`;document.head.appendChild(ns);function Yi(){const r=document.createElement("section");r.className="section-sm faq-section",r.id="faq-section";const e=T.faq.map((t,a)=>`
    <div class="faq-item glass">
      <button class="faq-question" data-index="${a}">
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
  `,r.querySelectorAll(".faq-question").forEach(t=>{t.addEventListener("click",()=>{const a=t.closest(".faq-item"),s=a.classList.contains("open");r.querySelectorAll(".faq-item").forEach(n=>{n.classList.remove("open")}),s||a.classList.add("open")})}),r}const is=document.createElement("style");is.textContent=`
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
`;document.head.appendChild(is);function Xi(){const r=document.createElement("section");return r.className="section contact-section",r.id="contact-section",r.innerHTML=`
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
              <a href="tel:+385995323122">+385 99 532 3122</a>
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
              <p>Ponedjeljak - Nedjelja<br>09:00 - 17:00</p>
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
  `,r}const os=document.createElement("style");os.textContent=`
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
`;document.head.appendChild(os);function Qi(){const r=document.createElement("div");r.className="page-home",r.appendChild(Vt());const e=document.createElement("main");return e.appendChild(Vi()),e.appendChild(Fi()),e.appendChild(Ki()),e.appendChild(Gi()),e.appendChild(Ji()),e.appendChild(Wi()),e.appendChild(Zi()),e.appendChild(Yi()),e.appendChild(Xi()),r.appendChild(e),r.appendChild(Ft()),r}function eo({currentStep:r,totalSteps:e=6,onStepClick:t}){const a=document.createElement("div");a.className="progress-bar-container";const s=r/e*100;return a.innerHTML=`
    <div class="progress-steps">
      ${Array(e).fill(0).map((n,i)=>`
        <div class="progress-step ${i<r?"completed clickable":""} ${i===r-1?"active":""}" data-step="${i+1}">
          <div class="step-number">${i+1}</div>
          <div class="step-label">${to(i+1)}</div>
        </div>
      `).join("")}
    </div>
    <div class="progress-bar">
      <div class="progress-fill" style="width: ${s}%"></div>
    </div>
  `,t&&a.querySelectorAll(".progress-step.clickable").forEach(n=>{n.addEventListener("click",()=>{const i=parseInt(n.dataset.step);i<r&&t(i)})}),a}function to(r){return{1:"Usluga",2:"Vozilo",3:"Termin",4:"Podaci",5:"Pregled",6:"Gotovo"}[r]||""}const ls=document.createElement("style");ls.textContent=`
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

  .progress-step.clickable {
      cursor: pointer;
  }
  
  .progress-step.clickable:hover .step-number {
      border-color: var(--color-accent);
      background: rgba(254, 0, 2, 0.5);
  }

  .progress-step.clickable:hover .step-label {
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
`;document.head.appendChild(ls);function ro({onNext:r,selectedServiceId:e}){const t=document.createElement("div");t.className="booking-step step-service-selection";let a=e||null,s=!1;a&&T.bundles.find(i=>i.id===a)&&(s=!0);const n=()=>{const i=s?T.bundles:T.services,o=s?"ODABERI PAKET":"ODABERI USLUGU",l=i.map(g=>{const u=g.original_price&&g.price&&g.original_price>g.price,d=g.id==="best-deal";return`
        <div class="service-selection-card card ${g.id===a?"selected":""} ${d?"best-deal-card":""}" data-id="${g.id}">
        ${d?'<div class="best-deal-badge">NAJBOLJA PONUDA</div>':""}
        <div class="service-icon-large">${g.icon}</div>
        <h3 class="service-name">${g.name}</h3>
        ${g.is_request_price?'<div style="font-weight: bold; color: var(--color-accent); margin-top: 5px;">Cijena na upit</div>':g.price?`<div style="font-weight: bold; color: var(--color-accent); margin-top: 5px; display: flex; flex-direction: column; align-items: center;">
             ${u?`<span style="text-decoration: line-through; color: var(--text-secondary); font-size: 0.9em;">${g.original_price} EUR</span>`:""}
             <span>${g.is_from?'<span style="font-size: 0.9em; opacity: 0.8; font-weight: normal;">od</span> ':""}${g.price.toFixed(2)} ${g.is_from&&g.price_to?`<span style="font-size: 0.9em; opacity: 0.8; font-weight: normal;">do</span> ${g.price_to.toFixed(2)}`:""} EUR</span>
        </div>`:""}
        </div>
    `}).join("");t.innerHTML=`
        <h2 class="step-title">
        <span class="heading-top">KORAK 1</span>
        <span class="heading-bottom">${o}</span>
        </h2>
        
        <div style="text-align: center; margin-bottom: var(--spacing-xl);">
            <button type="button" class="btn btn-white" id="toggle-view-btn">
                ${s?"KLIKNI ZA POJEDINAČNE USLUGE":"KLIKNI ZA PAKETE"}
            </button>
        </div>
        
        <div class="service-selection-grid">
        ${l}
        </div>
        
        <div class="step-actions" style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
            <button class="btn btn-cta" id="next-btn" ${a?"":"disabled"}>
                Nastavi
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            </button>
        </div>
    `;const c=t.querySelectorAll(".service-selection-card"),h=t.querySelector("#next-btn");c.forEach(g=>{g.addEventListener("click",()=>{a=g.dataset.id,c.forEach(d=>d.classList.remove("selected")),g.classList.add("selected"),h.disabled=!1})}),t.querySelector("#toggle-view-btn").addEventListener("click",()=>{s=!s,n()}),h.addEventListener("click",()=>{a&&r({serviceId:a})})};return n(),T.loadServices().then(()=>{s||n()}),t}const cs=document.createElement("style");cs.textContent=`
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
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--spacing-lg);
  }
  
  .service-selection-card {
      width: calc(33.333% - var(--spacing-lg));
  }

  @media (max-width: 1024px) {
    .service-selection-card {
      width: calc(50% - var(--spacing-lg));
    }
  }

  @media (max-width: 640px) {
    .service-selection-card {
      width: 100%;
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
  
  .best-deal-card {
      border: 1px solid #eab308 !important; /* Yellow border */
      box-shadow: 0 0 15px rgba(234, 179, 8, 0.2);
      position: relative;
  }
  
  .best-deal-badge {
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: #eab308;
      color: black;
      font-weight: bold;
      font-size: 0.75rem;
      padding: 4px 12px;
      border-radius: 12px;
      white-space: nowrap;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
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
`;document.head.appendChild(cs);function ao({serviceId:r,onNext:e,onBack:t}){var o;const a=document.createElement("div");a.className="booking-step step-service-details";const s=T.services.find(l=>l.id===r)||((o=T.bundles)==null?void 0:o.find(l=>l.id===r));if(!s)return a.innerHTML="<p>Service not found</p>",a;let n="";const i=l=>Number.isInteger(l)?l:l.toFixed(2);if(s.id==="zvjezdano-nebo")n="od 595 € do 1190 €";else if(s.is_request_price)n="Na upit";else if(s.price){const l=i(s.price);s.is_from?n=`od ${l} €${s.price_to?" do "+i(s.price_to)+" €":""}`:n=`${l} €`}return a.innerHTML=`
    <div class="service-details-grid">
      <div class="service-details-left">
        <div class="service-header">
          <div class="service-icon-large">${s.icon}</div>
          <h2 class="service-title-large">${s.name}</h2>
        </div>
        
        <p class="service-description-full">${s.description}</p>
        
        <div class="service-selling-points">
          ${s.sellingPoints.map(l=>`
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
        ${s.images&&s.images[0]?`
        <div class="service-image-container glass">
          <img src="${s.images[0]}" alt="${s.name} 1" class="service-image" />
        </div>
        `:`
        <div class="service-image-placeholder glass">
          <div class="placeholder-icon">${s.icon}</div>
          <p>Slika nije dostupna</p>
        </div>
        `}
        ${s.images&&s.images[1]?`
        <div class="service-image-container glass">
           <img src="${s.images[1]}" alt="${s.name} 2" class="service-image" />
        </div>
        `:""}
      </div>
    </div>
  `,a.querySelector("#continue-btn").addEventListener("click",()=>{e({serviceId:r})}),a}const ds=document.createElement("style");ds.textContent=`
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
`;document.head.appendChild(ds);const gt=[{id:"bmw",name:"BMW",logo:"https://www.carlogos.org/car-logos/bmw-logo.png",models:[{name:"Serija 1",years:[2004,2025]},{name:"Serija 2",years:[2014,2025]},{name:"Serija 3",years:[1975,2025]},{name:"Serija 4",years:[2013,2025]},{name:"Serija 5",years:[1972,2025]},{name:"Serija 6",years:[1976,2025]},{name:"Serija 7",years:[1977,2025]},{name:"Serija 8",years:[1990,2025]},{name:"X1",years:[2009,2025]},{name:"X2",years:[2018,2025]},{name:"X3",years:[2003,2025]},{name:"X4",years:[2014,2025]},{name:"X5",years:[1999,2025]},{name:"X6",years:[2008,2025]},{name:"X7",years:[2019,2025]},{name:"Z4",years:[2002,2025]},{name:"i3",years:[2013,2022]},{name:"i4",years:[2021,2025]},{name:"iX",years:[2021,2025]}]},{id:"mercedes",name:"Mercedes-Benz",logo:"https://www.carlogos.org/car-logos/mercedes-benz-logo.png",models:[{name:"A-Klasa",years:[1997,2025]},{name:"B-Klasa",years:[2005,2025]},{name:"C-Klasa",years:[1993,2025]},{name:"E-Klasa",years:[1993,2025]},{name:"S-Klasa",years:[1972,2025]},{name:"CLA",years:[2013,2025]},{name:"CLS",years:[2004,2025]},{name:"GLA",years:[2014,2025]},{name:"GLB",years:[2019,2025]},{name:"GLC",years:[2015,2025]},{name:"GLE",years:[2015,2025]},{name:"GLS",years:[2016,2025]},{name:"G-Klasa",years:[1979,2025]},{name:"SL",years:[1954,2025]},{name:"SLC",years:[2016,2020]},{name:"AMG GT",years:[2014,2025]},{name:"EQA",years:[2021,2025]},{name:"EQC",years:[2019,2025]},{name:"EQS",years:[2021,2025]}]},{id:"audi",name:"Audi",logo:"https://www.carlogos.org/car-logos/audi-logo.png",models:[{name:"A1",years:[2010,2025]},{name:"A3",years:[1996,2025]},{name:"A4",years:[1994,2025]},{name:"A5",years:[2007,2025]},{name:"A6",years:[1994,2025]},{name:"A7",years:[2010,2025]},{name:"A8",years:[1994,2025]},{name:"Q2",years:[2016,2025]},{name:"Q3",years:[2011,2025]},{name:"Q4 e-tron",years:[2021,2025]},{name:"Q5",years:[2008,2025]},{name:"Q7",years:[2006,2025]},{name:"Q8",years:[2018,2025]},{name:"TT",years:[1998,2023]},{name:"R8",years:[2006,2025]},{name:"e-tron",years:[2018,2025]},{name:"e-tron GT",years:[2021,2025]}]},{id:"volkswagen",name:"Volkswagen",logo:"https://www.carlogos.org/car-logos/volkswagen-logo.png",models:[{name:"Golf",years:[1974,2025]},{name:"Polo",years:[1975,2025]},{name:"Passat",years:[1973,2025]},{name:"Tiguan",years:[2007,2025]},{name:"Touareg",years:[2002,2025]},{name:"T-Roc",years:[2017,2025]},{name:"T-Cross",years:[2019,2025]},{name:"Arteon",years:[2017,2025]},{name:"Jetta",years:[1979,2025]},{name:"Beetle",years:[1938,2019]},{name:"Caddy",years:[1980,2025]},{name:"Transporter",years:[1950,2025]},{name:"ID.3",years:[2020,2025]},{name:"ID.4",years:[2021,2025]},{name:"ID.5",years:[2022,2025]},{name:"ID. Buzz",years:[2022,2025]}]},{id:"toyota",name:"Toyota",logo:"https://www.carlogos.org/car-logos/toyota-logo.png",models:[{name:"Corolla",years:[1966,2025]},{name:"Camry",years:[1982,2025]},{name:"RAV4",years:[1994,2025]},{name:"Yaris",years:[1999,2025]},{name:"Aygo",years:[2005,2025]},{name:"C-HR",years:[2016,2025]},{name:"Highlander",years:[2e3,2025]},{name:"Land Cruiser",years:[1951,2025]},{name:"Prius",years:[1997,2025]},{name:"Supra",years:[1978,2025]},{name:"Avensis",years:[1997,2018]},{name:"Auris",years:[2006,2019]},{name:"bZ4X",years:[2022,2025]}]},{id:"honda",name:"Honda",logo:"https://www.carlogos.org/car-logos/honda-logo.png",models:[{name:"Civic",years:[1972,2025]},{name:"Accord",years:[1976,2025]},{name:"CR-V",years:[1995,2025]},{name:"HR-V",years:[1998,2025]},{name:"Jazz",years:[2001,2025]},{name:"e",years:[2020,2025]},{name:"ZR-V",years:[2023,2025]},{name:"Type R",years:[1997,2025]},{name:"NSX",years:[1990,2022]}]},{id:"ford",name:"Ford",logo:"https://www.carlogos.org/car-logos/ford-logo.png",models:[{name:"Fiesta",years:[1976,2023]},{name:"Focus",years:[1998,2025]},{name:"Mondeo",years:[1993,2022]},{name:"Kuga",years:[2008,2025]},{name:"Puma",years:[1997,2025]},{name:"Explorer",years:[1990,2025]},{name:"Mustang",years:[1964,2025]},{name:"Mustang Mach-E",years:[2021,2025]},{name:"Ranger",years:[1983,2025]},{name:"Transit",years:[1965,2025]},{name:"Bronco",years:[1966,2025]},{name:"F-150",years:[1948,2025]}]},{id:"nissan",name:"Nissan",logo:"https://www.carlogos.org/car-logos/nissan-logo.png",models:[{name:"Micra",years:[1982,2025]},{name:"Juke",years:[2010,2025]},{name:"Qashqai",years:[2006,2025]},{name:"X-Trail",years:[2001,2025]},{name:"Leaf",years:[2010,2025]},{name:"Ariya",years:[2022,2025]},{name:"370Z",years:[2009,2020]},{name:"GT-R",years:[2007,2025]},{name:"Navara",years:[1997,2025]}]},{id:"mazda",name:"Mazda",logo:"https://www.carlogos.org/car-logos/mazda-logo.png",models:[{name:"Mazda2",years:[2002,2025]},{name:"Mazda3",years:[2003,2025]},{name:"Mazda6",years:[2002,2025]},{name:"CX-3",years:[2015,2025]},{name:"CX-30",years:[2019,2025]},{name:"CX-5",years:[2012,2025]},{name:"CX-60",years:[2022,2025]},{name:"MX-5",years:[1989,2025]},{name:"MX-30",years:[2020,2025]}]},{id:"peugeot",name:"Peugeot",logo:"https://www.carlogos.org/car-logos/peugeot-logo.png",models:[{name:"208",years:[2012,2025]},{name:"308",years:[2007,2025]},{name:"508",years:[2011,2025]},{name:"2008",years:[2013,2025]},{name:"3008",years:[2009,2025]},{name:"5008",years:[2009,2025]},{name:"e-208",years:[2019,2025]},{name:"e-2008",years:[2020,2025]},{name:"Rifter",years:[2018,2025]}]},{id:"renault",name:"Renault",logo:"https://www.carlogos.org/car-logos/renault-logo.png",models:[{name:"Clio",years:[1990,2025]},{name:"Megane",years:[1995,2025]},{name:"Captur",years:[2013,2025]},{name:"Kadjar",years:[2015,2025]},{name:"Koleos",years:[2007,2025]},{name:"Twingo",years:[1992,2025]},{name:"Zoe",years:[2012,2025]},{name:"Arkana",years:[2021,2025]},{name:"Austral",years:[2022,2025]}]},{id:"citroen",name:"Citroën",logo:"https://www.carlogos.org/car-logos/citroen-logo.png",models:[{name:"C3",years:[2002,2025]},{name:"C4",years:[2004,2025]},{name:"C5",years:[2001,2025]},{name:"C3 Aircross",years:[2017,2025]},{name:"C5 Aircross",years:[2018,2025]},{name:"Berlingo",years:[1996,2025]},{name:"ë-C4",years:[2020,2025]}]},{id:"opel",name:"Opel",logo:"https://www.carlogos.org/car-logos/opel-logo.png",models:[{name:"Corsa",years:[1982,2025]},{name:"Astra",years:[1991,2025]},{name:"Insignia",years:[2008,2025]},{name:"Mokka",years:[2012,2025]},{name:"Crossland",years:[2017,2025]},{name:"Grandland",years:[2017,2025]},{name:"Combo",years:[1986,2025]},{name:"Zafira",years:[1999,2019]}]},{id:"skoda",name:"Škoda",logo:"https://www.carlogos.org/car-logos/skoda-logo.png",models:[{name:"Fabia",years:[1999,2025]},{name:"Scala",years:[2019,2025]},{name:"Octavia",years:[1996,2025]},{name:"Superb",years:[2001,2025]},{name:"Kamiq",years:[2019,2025]},{name:"Karoq",years:[2017,2025]},{name:"Kodiaq",years:[2016,2025]},{name:"Enyaq iV",years:[2021,2025]}]},{id:"hyundai",name:"Hyundai",logo:"https://www.carlogos.org/car-logos/hyundai-logo.png",models:[{name:"i10",years:[2007,2025]},{name:"i20",years:[2008,2025]},{name:"i30",years:[2007,2025]},{name:"Tucson",years:[2004,2025]},{name:"Santa Fe",years:[2e3,2025]},{name:"Kona",years:[2017,2025]},{name:"Ioniq",years:[2016,2025]},{name:"Ioniq 5",years:[2021,2025]},{name:"Ioniq 6",years:[2022,2025]}]},{id:"kia",name:"Kia",logo:"https://www.carlogos.org/car-logos/kia-logo.png",models:[{name:"Picanto",years:[2004,2025]},{name:"Rio",years:[2e3,2025]},{name:"Ceed",years:[2007,2025]},{name:"Stonic",years:[2017,2025]},{name:"Sportage",years:[1993,2025]},{name:"Sorento",years:[2002,2025]},{name:"Niro",years:[2016,2025]},{name:"EV6",years:[2021,2025]},{name:"EV9",years:[2023,2025]}]},{id:"volvo",name:"Volvo",logo:"https://www.carlogos.org/car-logos/volvo-logo.png",models:[{name:"V40",years:[2012,2019]},{name:"V60",years:[2010,2025]},{name:"V90",years:[2016,2025]},{name:"S60",years:[2e3,2025]},{name:"S90",years:[2016,2025]},{name:"XC40",years:[2017,2025]},{name:"XC60",years:[2008,2025]},{name:"XC90",years:[2002,2025]},{name:"C40",years:[2021,2025]},{name:"EX30",years:[2023,2025]}]},{id:"fiat",name:"Fiat",logo:"https://www.carlogos.org/car-logos/fiat-logo.png",models:[{name:"500",years:[2007,2025]},{name:"Panda",years:[1980,2025]},{name:"Tipo",years:[1988,2025]},{name:"500X",years:[2014,2025]},{name:"500L",years:[2012,2025]},{name:"Ducato",years:[1981,2025]}]},{id:"alfa-romeo",name:"Alfa Romeo",logo:"https://www.carlogos.org/car-logos/alfa-romeo-logo.png",models:[{name:"Giulia",years:[2016,2025]},{name:"Stelvio",years:[2017,2025]},{name:"Tonale",years:[2022,2025]},{name:"Giulietta",years:[2010,2020]},{name:"MiTo",years:[2008,2018]}]},{id:"jeep",name:"Jeep",logo:"https://www.carlogos.org/car-logos/jeep-logo.png",models:[{name:"Renegade",years:[2014,2025]},{name:"Compass",years:[2006,2025]},{name:"Cherokee",years:[1974,2025]},{name:"Grand Cherokee",years:[1992,2025]},{name:"Wrangler",years:[1986,2025]},{name:"Gladiator",years:[2019,2025]},{name:"Avenger",years:[2023,2025]}]},{id:"land-rover",name:"Land Rover",logo:"https://www.carlogos.org/car-logos/land-rover-logo.png",models:[{name:"Defender",years:[1983,2025]},{name:"Discovery",years:[1989,2025]},{name:"Discovery Sport",years:[2014,2025]},{name:"Range Rover",years:[1970,2025]},{name:"Range Rover Sport",years:[2005,2025]},{name:"Range Rover Evoque",years:[2011,2025]},{name:"Range Rover Velar",years:[2017,2025]}]},{id:"mini",name:"Mini",logo:"https://www.carlogos.org/car-logos/mini-logo.png",models:[{name:"Cooper",years:[2001,2025]},{name:"Clubman",years:[2007,2025]},{name:"Countryman",years:[2010,2025]},{name:"Paceman",years:[2012,2016]},{name:"Electric",years:[2020,2025]}]},{id:"porsche",name:"Porsche",logo:"https://www.carlogos.org/car-logos/porsche-logo.png",models:[{name:"911",years:[1963,2025]},{name:"Cayenne",years:[2002,2025]},{name:"Macan",years:[2014,2025]},{name:"Panamera",years:[2009,2025]},{name:"Taycan",years:[2019,2025]},{name:"Boxster",years:[1996,2025]},{name:"Cayman",years:[2005,2025]}]},{id:"tesla",name:"Tesla",logo:"https://www.carlogos.org/car-logos/tesla-logo.png",models:[{name:"Model S",years:[2012,2025]},{name:"Model 3",years:[2017,2025]},{name:"Model X",years:[2015,2025]},{name:"Model Y",years:[2020,2025]},{name:"Cybertruck",years:[2023,2025]}]},{id:"lexus",name:"Lexus",logo:"https://www.carlogos.org/car-logos/lexus-logo.png",models:[{name:"CT",years:[2011,2025]},{name:"IS",years:[1999,2025]},{name:"ES",years:[1989,2025]},{name:"LS",years:[1989,2025]},{name:"NX",years:[2014,2025]},{name:"RX",years:[1998,2025]},{name:"UX",years:[2018,2025]}]},{id:"subaru",name:"Subaru",logo:"https://www.carlogos.org/car-logos/subaru-logo.png",models:[{name:"Impreza",years:[1992,2025]},{name:"Forester",years:[1997,2025]},{name:"Outback",years:[1994,2025]},{name:"XV",years:[2012,2025]},{name:"Levorg",years:[2014,2025]},{name:"BRZ",years:[2012,2025]},{name:"Solterra",years:[2022,2025]}]}];function so(r){const[e,t]=r.years,a=[];for(let s=t;s>=e;s--)a.push(s);return a}function no(r){if(!r)return gt;const e=r.toLowerCase();return gt.filter(t=>t.name.toLowerCase().includes(e))}function io({serviceId:r,onNext:e,onBack:t,initialData:a={}}){var x;const s=document.createElement("div");s.className="booking-step step-vehicle-info";const n=T.services.find(w=>w.id===r)||((x=T.bundles)==null?void 0:x.find(w=>w.id===r)),i=w=>(n==null?void 0:n.id)===w||(n==null?void 0:n.includes)&&n.includes.includes(w),o=i("pojasevi"),l=i("zvjezdano-nebo"),c=i("kodiranje"),h=i("mapiranje"),g=(n==null?void 0:n.id)==="platinum-paket";let u={stage:"brand",selectedBrand:a.marka?gt.find(w=>w.name===a.marka):null,selectedModel:a.model||null,selectedYear:a.godina||null,searchQuery:"",isManualEntry:!1};u.selectedBrand&&u.selectedModel&&u.selectedYear&&(u.stage="details");function d(){s.innerHTML=`
            <h2 class="step-title">
                <span class="heading-top">KORAK 2</span>
                <span class="heading-bottom">Podaci o Vozilu</span>
            </h2>
            
            <div class="vehicle-selection-container glass">
                ${p()}
                ${v()}
            </div>
        `,j()}function p(){const w=[];return u.selectedBrand&&w.push(`<span class="breadcrumb-item">${u.selectedBrand.name}</span>`),u.selectedModel&&w.push(`<span class="breadcrumb-item">${u.selectedModel}</span>`),u.selectedYear&&w.push(`<span class="breadcrumb-item">${u.selectedYear}</span>`),w.length===0?"":`
            <div class="breadcrumb">
                ${w.join('<span class="breadcrumb-separator">›</span>')}
            </div>
        `}function v(){switch(u.stage){case"brand":return m();case"model":return f();case"year":return b();case"manual":return y();case"details":return k();default:return""}}function m(){const w=no(u.searchQuery);return`
            <div class="selection-stage">
                <div class="search-container">
                    <input 
                        type="text" 
                        class="search-input input" 
                        placeholder="Pretraži marku vozila..." 
                        value="${u.searchQuery}"
                        id="brand-search"
                    />
                </div>

                <div class="brands-grid">
                    ${w.map(A=>`
                        <div class="brand-card" data-brand-id="${A.id}">
                            <div class="brand-logo">
                                <img src="${A.logo}" alt="${A.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                                <div class="brand-fallback" style="display:none;">${A.name.charAt(0)}</div>
                            </div>
                            <div class="brand-name">${A.name}</div>
                        </div>
                    `).join("")}
                    
                    ${w.length>0?`
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

                ${w.length===0?`
                    <div class="no-results">
                        <p>Nema rezultata za "${u.searchQuery}"</p>
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
        `}function f(){return`
            <div class="selection-stage">
                <button class="back-to-stage-btn" id="back-to-brand">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    Promijeni marku
                </button>

                <h3 class="stage-title">Odaberi model</h3>

                <div class="models-grid">
                    ${u.selectedBrand.models.map(A=>`
                        <div class="model-card" data-model-name="${A.name}">
                            <div class="model-name">${A.name}</div>
                            <div class="model-years">${A.years[0]} - ${A.years[1]}</div>
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
        `}function b(){const w=u.selectedBrand.models.find(R=>R.name===u.selectedModel);return`
            <div class="selection-stage">
                <button class="back-to-stage-btn" id="back-to-model">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    Promijeni model
                </button>

                <h3 class="stage-title">Odaberi godinu</h3>

                <div class="years-grid">
                    ${so(w).map(R=>`
                        <div class="year-card" data-year="${R}">
                            ${R}
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
        `}function y(){var w;return`
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
                            value="${((w=u.selectedBrand)==null?void 0:w.name)||""}"
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
                            value="${u.selectedModel||""}"
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
                            value="${u.selectedYear||""}"
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
        `}function k(){return`
            <div class="selection-stage">
                <button class="back-to-stage-btn" id="back-to-year">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    Promijeni godinu
                </button>

                <div class="selected-vehicle-summary">
                    <h3>Odabrano vozilo</h3>
                    <p class="vehicle-info">${u.selectedBrand.name} ${u.selectedModel} (${u.selectedYear})</p>
                </div>

                <form class="details-form" id="details-form">
                    ${o?`
                        <div class="form-group">
                            <label class="form-label">Broj pojaseva</label>
                            <select class="input" name="brojPojaseva" id="broj-pojaseva" required>
                                <option value="">Odaberi...</option>
                                ${[1,2,3,4,5,6,7].map(w=>`<option value="${w}" ${a.brojPojaseva==w?"selected":""}>${w}</option>`).join("")}
                            </select>
                            <div id="seatbelt-warning" style="visibility: hidden; margin-top: 10px; font-size: 0.9rem; color: #fbbf24; border: 1px solid rgba(251, 191, 36, 0.3); background: rgba(251, 191, 36, 0.1); padding: 10px; border-radius: 4px;">
                                Ne preporučujemo ugradnju manje od 4 pojasa zbog zakonskih regulativa.
                            </div>
                        </div>

                        <div class="checkbox-wrapper">
                            <input type="checkbox" class="checkbox" id="vlastiti-pojasevi" name="vlastitiPojasevi" ${a.vlastitiPojasevi?"checked":""}>
                            <label for="vlastiti-pojasevi">Rastavljeni sustav (mehanizam)</label>
                        </div>
                    `:""}

                    ${l?`
                        <div class="form-group">
                            <label class="form-label">Broj zvjezdica</label>
                            ${g?`
                                <input type="hidden" name="brojZvjezdica" value="650">
                                <input type="text" class="input" value="650 (Platinum Standard)" disabled>
                            `:`
                                <select class="input" name="brojZvjezdica" required>
                                    <option value="">Odaberi...</option>
                                    ${[500,600,750,850,1e3].map(w=>`
                                        <option value="${w}" ${a.brojZvjezdica==w?"selected":""}>${w}</option>
                                    `).join("")}
                                </select>
                            `}
                        </div>
                    `:""}

                    ${c?`
                        <div class="form-group">
                            <label class="form-label">Opcija kodiranja</label>
                            <select class="input" name="codingOption" id="coding-option" required>
                                <option value="">Odaberi...</option>
                                <option value="video_u_voznji">Video u vožnji</option>
                                <option value="carplay_android_auto">Carplay/Android Auto</option>
                                <option value="azuriranje_navigacije">Ažuriranje navigacije</option>
                                <option value="needle_sweep">Needle sweep</option>
                                <option value="uklanjanje_start_stop">Uklanjanje Start/Stop</option>
                                <option value="ostalo">Ostalo</option>
                            </select>
                        </div>
                    `:""}

                    ${h?`
                        <div class="form-group">
                            <label class="form-label">Opcija mapiranja</label>
                            <select class="input" name="mappingOption" id="mapping-option" required>
                                <option value="">Odaberi...</option>
                                <option value="stage_tune">Stage tune</option>
                                <option value="pops_bangs">Pops and bangs</option>
                                <option value="custom_mapa">Custom mapa</option>
                                <option value="uklanjanje_torque_limitera">Uklanjanje torque limitera</option>
                                <option value="uklanjanje_adblue">Uklanjanje AdBlue</option>
                                <option value="uklanjanje_aktivnih_poklopaca">Uklanjanje aktivnih poklopaca maske</option>
                                <option value="uklanjanje_dpf_opf">Uklanjanje DPFa/OPFa</option>
                                <option value="uklanjanje_egr">Uklanjanje EGRa</option>
                                <option value="uklanjanje_senzora_kisika">Uklanjanje senzora kisika</option>
                                <option value="uklanjanje_kickdowna">Uklanjanje kickdowna</option>
                                <option value="uklanjanje_maf">Uklanjanje MAF senzora</option>
                                <option value="uklanjanje_ventila">Uklanjanje ventila (valve)</option>
                                <option value="uklanjanje_limitera_brzine">Uklanjanje limitera brzine</option>
                            </select>
                        </div>
                    `:""}

                    ${c||h?`
                        <div class="form-group">
                            <label class="form-label">Slika verzije softvera (opcionalno)</label>
                            <input type="file" class="input" name="softverSlika" accept="image/*">
                            <p style="font-size:0.8rem; color:var(--text-secondary); margin-top:5px;">Molimo učitajte sliku trenutne verzije softvera. Ako ne znate kako ju pronaći, preskočite ovaj dio i nazovite naš tim.</p>
                        </div>
                    `:""}

                    <div class="form-group">
                        <label class="form-label">Kratka napomena <span id="napomena-optional">(opcionalno)</span></label>
                        <textarea class="input" name="napomena" id="napomena-input" rows="4" placeholder="Dodatne informacije...">${a.napomena||""}</textarea>
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
        `}function j(){const w=s.querySelector("#brand-search");w&&w.addEventListener("input",$=>{u.searchQuery=$.target.value,d()}),s.querySelectorAll(".brand-card:not(.brand-card-other)").forEach($=>{$.addEventListener("click",()=>{const Q=$.dataset.brandId;u.selectedBrand=gt.find(I=>I.id===Q),u.stage="model",d()})});const R=s.querySelector("#other-brand-btn");R&&R.addEventListener("click",()=>{u.stage="manual",u.isManualEntry=!0,d()});const z=s.querySelector("#other-brand-btn-no-results");z&&z.addEventListener("click",()=>{u.stage="manual",u.isManualEntry=!0,d()}),s.querySelectorAll(".model-card").forEach($=>{$.addEventListener("click",()=>{u.selectedModel=$.dataset.modelName,u.stage="year",d()})}),s.querySelectorAll(".year-card").forEach($=>{$.addEventListener("click",()=>{u.selectedYear=$.dataset.year,u.stage="details",d()})});const C=s.querySelector("#back-to-brand");C&&C.addEventListener("click",()=>{u.stage="brand",u.selectedBrand=null,u.selectedModel=null,u.selectedYear=null,d()});const G=s.querySelector("#back-to-model");G&&G.addEventListener("click",()=>{u.stage="model",u.selectedModel=null,u.selectedYear=null,d()});const oe=s.querySelector("#back-to-year");oe&&oe.addEventListener("click",()=>{u.stage="year",u.selectedYear=null,d()});const J=s.querySelector("#back-to-brand-from-manual");J&&J.addEventListener("click",()=>{u.stage="brand",u.isManualEntry=!1,d()});const V=s.querySelector("#manual-entry-form");V&&V.addEventListener("submit",$=>{$.preventDefault();const Q=new FormData(V),I=Object.fromEntries(Q.entries());u.selectedBrand={name:I.marka},u.selectedModel=I.model,u.selectedYear=I.godina,u.isManualEntry=!0,u.stage="details",d()});const Z=s.querySelector("#details-form");if(Z){const $=Z.querySelector("#broj-pojaseva");if($){const ce=Z.querySelector("#seatbelt-warning"),Ve=()=>{const de=parseInt($.value);de>0&&de<4?ce.style.visibility="visible":ce.style.visibility="hidden"};$.addEventListener("change",Ve),Ve()}const Q=Z.querySelector("#coding-option"),I=Z.querySelector("#napomena-input"),N=Z.querySelector("#napomena-optional");if(Q&&I){const ce=()=>{Q.value==="ostalo"?(I.required=!0,N&&(N.textContent="*")):(I.required=!1,N&&(N.textContent="(opcionalno)"))};Q.addEventListener("change",ce),ce()}Z.addEventListener("submit",ce=>{var rr;ce.preventDefault();const Ve=new FormData(Z),de=Object.fromEntries(Ve.entries());de.marka=u.selectedBrand.name,de.model=u.selectedModel,de.godina=u.selectedYear,de.vlastitiPojasevi=((rr=Z.querySelector("#vlastiti-pojasevi"))==null?void 0:rr.checked)||!1,e(de)})}const ne=s.querySelector("#back-btn");ne&&ne.addEventListener("click",()=>{u.stage==="brand"?t():(u.stage==="model"?(u.stage="brand",u.selectedBrand=null):u.stage==="year"?(u.stage="model",u.selectedModel=null):u.stage==="details"&&(u.stage="year",u.selectedYear=null),d())})}return d(),s}const us=document.createElement("style");us.textContent=`
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
`;document.head.appendChild(us);function oo({onNext:r,onBack:e,initialData:t={}}){const a=document.createElement("div");a.className="booking-step step-calendar";const s=new Date;let n=s.getMonth(),i=s.getFullYear(),o=t.date||null,l=t.time||null;a.innerHTML=`
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
        Napomena: Vozilo je potrebno dovesti u odabranom terminu (09-14h).
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
  `;const c=async()=>{const g=["Siječanj","Veljača","Ožujak","Travanj","Svibanj","Lipanj","Srpanj","Kolovoz","Rujan","Listopad","Studeni","Prosinac"];a.querySelector("#calendar-month").textContent=`${g[n]} ${i}`;const u=new Date(i,n,1),p=new Date(i,n+1,0).getDate(),v=u.getDay()===0?6:u.getDay()-1,m=a.querySelector("#calendar-days");m.innerHTML='<div class="calendar-loading" style="grid-column: 1 / -1; text-align: center; padding: 20px; color: var(--color-text-muted);">Učitavanje...</div>';const f=a.querySelector("#prev-month"),b=a.querySelector("#next-month");f&&(f.disabled=!0),b&&(b.disabled=!0);try{const y=await T.getCalendarAvailability(i,n);m.innerHTML="";for(let x=0;x<v;x++){const w=document.createElement("div");w.className="calendar-day empty",m.appendChild(w)}const k=new Date;k.setHours(k.getHours()+24);const j=!1;for(let x=1;x<=p;x++){const w=new Date(i,n,x),A=new Date(w);A.setHours(23,59,59);const R=A<k,z=y[x]||{status:"unavailable",count:0};let P=z.status;const _=document.createElement("button");let C=P==="unavailable";j&&z.count>0,_.className=`calendar-day ${P} ${R?"past":""}`,_.textContent=x,_.disabled=R||C,_.disabled||_.addEventListener("click",()=>{o=`${i}-${String(n+1).padStart(2,"0")}-${String(x).padStart(2,"0")}`,m.querySelectorAll(".calendar-day").forEach(G=>G.classList.remove("selected")),_.classList.add("selected"),h(o)}),m.appendChild(_)}}catch(y){console.error("Error rendering calendar:",y),m.innerHTML='<div style="grid-column: 1/-1; color: var(--color-unavailable); text-align: center;">Greška pri učitavanju kalendara.</div>'}finally{f&&(f.disabled=!1),b&&(b.disabled=!1)}},h=async g=>{const u=a.querySelector("#time-slots"),d=a.querySelector("#time-slots-grid"),p=await T.getTimeSlots(g),v=new Date;v.setHours(v.getHours()+24),d.innerHTML=p.map(m=>{const[f,b]=m.time.split(":"),y=new Date(g);y.setHours(parseInt(f),parseInt(b));const k=y<v,j=!m.available||k;return`
      <button class="time-slot ${j?"disabled":""}" 
              data-time="${m.time}" 
              ${j?"disabled":""}>
        ${m.time}
      </button>
    `}).join(""),u.classList.remove("hidden"),d.querySelectorAll(".time-slot").forEach(m=>{m.addEventListener("click",()=>{l=m.dataset.time,d.querySelectorAll(".time-slot").forEach(f=>f.classList.remove("selected")),m.classList.add("selected"),a.querySelector("#next-btn").disabled=!1})})};return a.querySelector("#prev-month").addEventListener("click",()=>{n--,n<0&&(n=11,i--),c()}),a.querySelector("#next-month").addEventListener("click",()=>{n++,n>11&&(n=0,i++),c()}),a.querySelector("#back-btn").addEventListener("click",e),a.querySelector("#next-btn").addEventListener("click",()=>{o&&l&&r({date:o,time:l})}),c(),a}const hs=document.createElement("style");hs.textContent=`
  .calendar-container {
    width: 100%;
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
    padding: 0px;
    padding-top: 0px;
    padding-right: 0px;
    padding-bottom: 0px;
    padding-left: 0px;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
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
        padding: 4px !important;
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
        overflow: hidden !important;
    }
    
    .calendar-header {
        margin-bottom: 4px;
    }
    
    .calendar-month {
        font-size: 0.9rem;
    }
    
    .calendar-nav {
        padding: 2px 4px;
    }
    
    .calendar-weekdays {
        font-size: 0.6rem;
        gap: 0;
        margin-bottom: 2px;
    }
    
    .calendar-days {
        gap: 0 !important;
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 !important;
        box-sizing: border-box !important;
        grid-template-columns: repeat(7, 1fr) !important;
        grid-auto-rows: 1fr !important;
        justify-items: stretch !important;
        align-items: stretch !important;
    }
    
    .calendar-days .calendar-day,
    .calendar-days button.calendar-day,
    .calendar-days button[class*="calendar-day"],
    button.calendar-day.available,
    button.calendar-day.almost-full,
    button.calendar-day.unavailable,
    .step-calendar .calendar-day {
        font-size: 0.5rem !important;
        padding: 0px !important;
        padding-top: 0px !important;
        padding-right: 0px !important;
        padding-bottom: 0px !important;
        padding-left: 0px !important;
        padding-inline: 0px !important;
        padding-block: 0px !important;
        margin: 0 !important;
        aspect-ratio: 1 !important;
        line-height: 1 !important;
        border-width: 0.5px !important;
        width: 100% !important;
        height: 100% !important;
        min-width: 0 !important;
        min-height: 0 !important;
        box-sizing: border-box !important;
    }
    
    .calendar-legend {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        gap: 6px;
        font-size: 0.6rem;
        padding-top: 8px;
        margin-top: 6px;
    }
    
    .legend-color {
        width: 14px;
        height: 14px;
    }
    
    .time-slots-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 6px;
    }
    
    .time-slot {
        font-size: 0.75rem;
        padding: 6px 4px;
    }
    
    .time-slots-title {
        font-size: 0.95rem;
        margin-bottom: 10px;
    }
  }

  /* Ultra-specific override for mobile calendar day padding */
  @media (max-width: 768px) {
    button.calendar-day,
    .calendar-days button,
    .booking-step.step-calendar .calendar-container .calendar-days button.calendar-day,
    .step-calendar .calendar-days button.calendar-day.available,
    .step-calendar .calendar-days button.calendar-day.past,
    .step-calendar .calendar-days button.calendar-day.almost-full,
    .step-calendar .calendar-days button.calendar-day.unavailable,
    .calendar-container .calendar-days button {
        padding: 0px !important;
        padding-top: 0px !important;
        padding-right: 0px !important;
        padding-bottom: 0px !important;
        padding-left: 0px !important;
        padding-inline-start: 0px !important;
        padding-inline-end: 0px !important;
        padding-block-start: 0px !important;
        padding-block-end: 0px !important;
        font-size: 0.5rem !important;
    }
  }
`;document.head.appendChild(hs);function lo({onNext:r,onBack:e,initialData:t={}}){const a=document.createElement("div");a.className="booking-step step-customer-info",a.innerHTML=`
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
  `;const s=a.querySelector("#customer-form");return s.addEventListener("submit",n=>{n.preventDefault();const i=new FormData(s),o=Object.fromEntries(i.entries());if(o.telefon=o.telefon.replace(/\s/g,""),!o.telefon.startsWith("+")){alert("Molimo unesite broj telefona s pozivnim brojem (npr. +385...)");return}o.whatsappPodsjetnik=!0,o.emailPodsjetnik=!0,r(o)}),a.querySelector("#back-btn").addEventListener("click",e),a}const ps=document.createElement("style");ps.textContent=`
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
`;document.head.appendChild(ps);function co({bookingData:r,onNext:e,onBack:t}){var m;const a=document.createElement("div");a.className="booking-step step-review";const s=T.services.find(f=>f.id===r.serviceId)||((m=T.bundles)==null?void 0:m.find(f=>f.id===r.serviceId));let n=null;if(s.id==="pojasevi"&&r.brojPojaseva){const f=s.price||69,b=s.price_disassembled||39,y=r.vlastitiPojasevi?b:f;n=parseInt(r.brojPojaseva)*y}else if(s.id==="zvjezdano-nebo"&&r.brojZvjezdica){const f=parseInt(r.brojZvjezdica),b=s.price_per_star||1.19;n=f*b}else s.is_request_price?n=null:s.price&&(n=s.price);const i=(r.model||"").toLowerCase();(i.includes("cabrio")||i.includes("targa")||i.includes("convertible")||i.includes("spider")||i.includes("roadster"))&&(n=null),r.totalPrice=n;const c=new Date(r.date).toLocaleDateString("hr-HR",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),g=parseInt(r.time.split(":")[0])<13?"Jutro":"Popodne";a.innerHTML=`
    <h2 class="step-title">
      <span class="heading-top">KORAK 5</span>
      <span class="heading-bottom">Pregled Rezervacije</span>
    </h2>
    
    <div class="review-container glass">
      <div class="review-section">
        <h3 class="review-section-title">Usluga</h3>
        <div class="review-item">
          <span class="review-icon">${s.icon}</span>
          <span class="review-value">${s.name}</span>
        </div>
        <div class="review-item" style="margin-top: 10px;">
          <span class="review-label">Cijena:</span>
          <span class="review-value" style="font-size: 1.2rem; font-weight: bold; color: var(--color-accent);">
            ${n!==null?n.toFixed(2)+" €":"Na upit"}
          </span>
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
          <span class="review-value">${c}</span>
        </div>
        <div class="review-item">
          <span class="review-label">Vrijeme:</span>
          <span class="review-value">${r.time}</span>
        </div>
        <div class="review-item">
          <span class="review-label">Period:</span>
          <span class="review-value">${g}</span>
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
                Slanjem potvrđuješ <button type="button" id="terms-open-btn" style="background: none; border: none; padding: 0; color: var(--color-accent); text-decoration: underline; cursor: pointer; font-size: inherit; font-family: inherit;">uvjete usluge</button>.
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
  `;const u="terms-modal";let d=document.getElementById(u);const p=`
    <div style="font-family: var(--font-body); color: var(--color-text); line-height: 1.6;">
        <h3 style="color: var(--color-accent); margin-bottom: 1rem; text-align:center;">UVJETI POSLOVANJA</h3>
        <p><strong>Autopojasevi.hr</strong></p>
        <p>Korištenjem web stranice autopojasevi.hr i slanjem zahtjeva za rezervaciju termina, korisnik (u daljnjem tekstu: Klijent) u potpunosti prihvaća dolje navedene uvjete poslovanja, pravila o prikupljanju podataka i politiku otkazivanja.</p>

        <h4 style="color:var(--color-text); margin-top:1.5rem; margin-bottom:0.5rem;">I. POLITIKA PRIVATNOSTI I ZAŠTITA PODATAKA</h4>
        <p><strong>1. Kontakt i pitanja</strong><br>Poštujemo vašu privatnost. Za sva pitanja vezana uz obradu vaših podataka ili ove uvjete, možete nas kontaktirati na e-mail adresu: info@autopojasevi.hr.</p>
        <p><strong>2. Prikupljanje podataka</strong><br>Prilikom rezervacije termina za usluge auto detailinga, prikupljamo sljedeće osobne podatke: ime i prezime, adresu e-pošte, broj telefona te podatke o vozilu.</p>
        <p><strong>3. Svrha obrade</strong><br>Vaši podaci nužni su za: dogovaranje i realizaciju termina, izdavanje računa za usluge ili naknadu štete, te zakonske obveze.</p>

        <h4 style="color:var(--color-text); margin-top:1.5rem; margin-bottom:0.5rem;">II. UVJETI REZERVACIJE, OTKAZIVANJA I NAPLATE (Obavezno pročitati)</h4>
        <p><strong>1. Obvezujuća rezervacija</strong><br>Rezervacija termina putem sustava autopojasevi.hr smatra se sklapanjem obvezujućeg ugovora o pružanju usluge.</p>
        <p><strong>2. Politika nedolaska i otkazivanja (No-Show Policy)</strong><br>Slanjem rezervacije Klijent pristaje na sljedeće stroge uvjete otkazivanja:</p>
        <ul style="padding-left:20px; list-style:disc; margin-bottom:1rem;">
            <li><strong>Bezuvjetna naplata:</strong> U slučaju da Klijent ne dođe na dogovoreni termin ili otkaže termin unutar 5 dana prije rezerviranog datuma, Klijent je dužan platiti naknadu.</li>
            <li><strong>Iznos naknade:</strong> Naknada za otkazivanje ili nedolazak iznosi 50% ukupne cijene rezervirane usluge.</li>
        </ul>
        <p><strong>3. Izdavanje računa i rok plaćanja</strong><br>U slučaju otkazivanja ili nedolaska, Klijentu će biti poslan račun na iznos od 50% vrijednosti usluge koji je dužan podmiriti u roku od 3 radna dana.</p>
        <p><strong>4. Prisilna naplata</strong><br>Ukoliko se račun ne podmiri, pokreće se postupak prisilne naplate, a Klijent snosi sve troškove postupka.</p>
        <p><strong>5. Izjava o prihvaćanju</strong><br>Zaključenjem procesa rezervacije Klijent potvrđuje da je pročitao i razumio ove Uvjete.</p>
    </div>
  `;if(!d){d=document.createElement("div"),d.id=u,d.className="glass modal-overlay",d.style.cssText="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:9999; justify-content:center; align-items:center;";const f=document.createElement("div");f.className="glass modal-content",f.style.cssText="background: #1a1a1a; border: 1px solid var(--glass-border); padding: 30px; max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto; position: relative; border-radius: 12px;",f.innerHTML=`
          <button class="close-modal-btn" style="position: absolute; top: 15px; right: 15px; background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer;">&times;</button>
          ${p}
      `,d.appendChild(f),document.body.appendChild(d);const b=()=>{d.style.display="none"};d.querySelector(".close-modal-btn").onclick=b,d.onclick=y=>{y.target===d&&b()}}a.querySelector("#terms-open-btn").addEventListener("click",f=>{f.preventDefault(),d.style.display="flex"}),a.querySelector("#back-btn").addEventListener("click",t);const v=a.querySelector("#terms-check");return a.querySelector("#confirm-btn").addEventListener("click",()=>{if(!v.checked){alert("Molimo potvrdite uvjete usluge prije nastavka.");return}e()}),a}const gs=document.createElement("style");gs.textContent=`
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
`;document.head.appendChild(gs);function uo({bookingData:r}){const e=document.createElement("div");e.className="booking-step step-success";const a=new Date(r.date).toLocaleDateString("hr-HR",{weekday:"long",day:"numeric",month:"long",year:"numeric"}),n=parseInt(r.time.split(":")[0])<13?"jutro":"popodne";return e.innerHTML=`
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
          Hvala! Vaš termin je rezerviran za <strong>${a}</strong> u <strong>${n}</strong>.
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
        `:`
        <p class="success-text" style="font-size: 1.1rem; margins-top: 15px; color: var(--color-accent);">
           Cijena je na upit. Nakon pregleda rezervacije, poslat ćemo vam ponudu s točnom cijenom na email prije potvrde termina.
        </p>
        `}
      </div>
      
      <div class="success-details">
        <div class="detail-item">
          <svg class="icon text-accent" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z"/>
          </svg>
          <span>${a} u ${r.time}</span>
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
  `,e.querySelector("#home-btn").addEventListener("click",()=>{B.navigate("/")}),e}const ms=document.createElement("style");ms.textContent=`
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
`;document.head.appendChild(ms);function ho({currentServiceId:r,onUpgrade:e,onSkip:t}){var i;const a=document.createElement("div");a.className="booking-step step-upsell";const s=((i=T.bundles)==null?void 0:i.filter(o=>o.includes&&o.includes.includes(r)))||[];if(s.length===0)return setTimeout(t,0),a;const n=s.map(o=>{const l=o.original_price&&o.price?o.original_price-o.price:0;return`
        <div class="upsell-card glass" data-id="${o.id}">
            <div class="upsell-header">
                <div class="upsell-icon">${o.icon}</div>
                <div class="upsell-info">
                    <h3 class="upsell-title">${o.name}</h3>
                    <div class="upsell-price">
                        ${o.original_price?`<span class="original-price">${o.original_price} €</span>`:""}
                        <span class="current-price">${o.price} €</span>
                    </div>
                    ${l>0?`<div class="upsell-savings">Ušteda: ${l} €</div>`:""}
                </div>
            </div>
            <div class="upsell-description">
                ${o.description}
            </div>
            <button class="btn btn-cta btn-upgrade" data-id="${o.id}">
                Nadogradi
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            </button>
        </div>
        `}).join("");return a.innerHTML=`
        <h2 class="step-title">
            <span class="heading-top">PRIJE NEGO ZAVRŠIMO</span>
            <span class="heading-bottom">Iskoristi Priliku!</span>
        </h2>
        
        <div class="upsell-container">
            <p class="upsell-intro">Dodajte još usluga uz vaš odabir i ostvarite značajne uštede uz naše pakete.</p>
            
            <div style="text-align: center;">
                <button class="btn btn-white" id="skip-btn">
                    Ne želim paket, nastavi s rezervacijom
                </button>
            </div>
            
            <div class="upsell-grid">
                ${n}
            </div>
        </div>
    `,a.querySelectorAll(".btn-upgrade").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.id;e(l)})}),a.querySelector("#skip-btn").addEventListener("click",t),a}const vs=document.createElement("style");vs.textContent=`
    .step-upsell {
        max-width: 800px;
        margin: 0 auto;
        text-align: center;
    }

    .upsell-container {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xl);
        padding: var(--spacing-xl) 0;
    }

    .upsell-intro {
        font-size: 1.1rem;
        color: var(--text-secondary);
        max-width: 600px;
        margin: 0 auto;
    }

    .upsell-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: var(--spacing-lg);
        justify-items: center;
    }

    .upsell-card {
        padding: var(--spacing-lg);
        width: 100%;
        max-width: 350px;
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
        border: 1px solid var(--glass-border);
        transition: transform 0.3s ease;
        text-align: left;
    }

    .upsell-card:hover {
        transform: translateY(-5px);
        border-color: var(--accent);
    }

    .upsell-header {
        display: flex;
        gap: var(--spacing-md);
        align-items: center;
    }

    .upsell-icon {
        color: var(--accent);
        width: 50px;
        height: 50px;
        flex-shrink: 0;
    }
    
    .upsell-icon svg {
        width: 100%;
        height: 100%;
    }

    .upsell-info {
        display: flex;
        flex-direction: column;
    }

    .upsell-title {
        font-size: 1.1rem;
        font-weight: bold;
        text-transform: uppercase;
    }

    .upsell-price {
        display: flex;
        gap: 8px;
        align-items: baseline;
    }

    .original-price {
        text-decoration: line-through;
        color: var(--text-secondary);
        font-size: 0.9rem;
    }

    .current-price {
        color: var(--accent);
        font-weight: bold;
        font-size: 1.2rem;
    }

    .upsell-savings {
        color: #22c55e;
        font-size: 0.85rem;
        font-weight: 600;
    }

    .upsell-description {
        font-size: 0.9rem;
        color: var(--text-secondary);
        line-height: 1.5;
        flex-grow: 1;
    }

    .btn-skip {
        margin-top: var(--spacing-md);
        color: var(--text-secondary);
        opacity: 0.7;
        font-size: 0.9rem;
        background: none;
        border: none;
        cursor: pointer;
        text-decoration: underline;
    }
    
    .btn-skip:hover {
        opacity: 1;
        color: var(--text-primary);
    }
`;document.head.appendChild(vs);function po(r={}){const e=document.createElement("div");e.className="page-booking",e.appendChild(Vt());const t=document.createElement("main");t.className="booking-main";const a=document.createElement("div");a.className="booking-container";let s=1,n={serviceId:r.serviceId||null,isUpgrade:!1,...r};const i=async()=>{var l,c,h;try{const g={service_id:n.serviceId,service_name:n.serviceName||((l=T.services.find(d=>d.id===n.serviceId))==null?void 0:l.name)||((h=(c=T.bundles)==null?void 0:c.find(d=>d.id===n.serviceId))==null?void 0:h.name),marka:n.marka,model:n.model,godina:n.godina,broj_pojaseva:n.brojPojaseva,vlastiti_pojasevi:n.vlastitiPojasevi,broj_zvjezdica:n.brojZvjezdica,vinBroj:n.vinBroj,softverSlika:n.softverSlika,napomena:n.napomena,appointment_date:n.date,appointment_time:n.time,ime:n.imePrezime?n.imePrezime.trim().split(" ")[0]:"",prezime:n.imePrezime&&n.imePrezime.trim().indexOf(" ")>-1?n.imePrezime.trim().split(" ").slice(1).join(" "):n.imePrezime||"",email:n.email,telefon:n.telefon,adresa:n.adresa,is_manual_entry:n.isManualEntry||!1},u=await T.saveBooking(g);n.date=u.appointment_date,n.time=u.appointment_time,s=6,o()}catch(g){console.error("Failed to save booking:",g),alert("Došlo je do greške pri spremanju rezervacije. Molimo pokušajte ponovno.")}},o=()=>{a.innerHTML="",s<6&&a.appendChild(eo({currentStep:s,totalSteps:6,onStepClick:h=>{s=h,o()}}));const l=document.createElement("div");l.className=s===6?"":"booking-card glass";let c;switch(s){case 1:n.serviceId?c=ao({serviceId:n.serviceId,onNext:h=>{Object.assign(n,h),s=2,o()},onBack:()=>{n.serviceId=null,o()}}):c=ro({onNext:h=>{Object.assign(n,h),o()},selectedServiceId:n.serviceId});break;case 2:c=io({serviceId:n.serviceId,onNext:h=>{Object.assign(n,h),n.isUpgrade?s=5:s=3,o()},onBack:()=>{s=1,o()},initialData:n});break;case 3:c=oo({onNext:h=>{Object.assign(n,h),s=4,o()},onBack:()=>{s=2,o()},initialData:n});break;case 4:c=lo({onNext:h=>{Object.assign(n,h),s=5,o()},onBack:()=>{s=3,o()},initialData:n});break;case 5:c=co({bookingData:n,onNext:()=>{var u,d;!((u=T.bundles)==null?void 0:u.some(p=>p.id===n.serviceId))&&((d=T.bundles)==null?void 0:d.some(p=>p.includes&&p.includes.includes(n.serviceId)))?(s=55,o()):i()},onBack:()=>{s=4,o()}});break;case 55:c=ho({currentServiceId:n.serviceId,onUpgrade:h=>{n.serviceId=h,n.isUpgrade=!0,s=2,o()},onSkip:()=>{i()}});break;case 6:c=uo({bookingData:n});break}c&&(l.appendChild(c),a.appendChild(l))};return o(),t.appendChild(a),e.appendChild(t),e.appendChild(Ft()),e}const fs=document.createElement("style");fs.textContent=`
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
      padding: var(--spacing-sm);
    }
  }
`;document.head.appendChild(fs);const Pe={async login(r,e){var t,a;try{const{data:s,error:n}=await re.auth.signInWithPassword({email:r,password:e});if(n)throw n;if(!(((a=(t=s.user)==null?void 0:t.user_metadata)==null?void 0:a.role)==="admin"))throw await this.logout(),new Error("Unauthorized: Admin access required");return{user:s.user,session:s.session,error:null}}catch(s){return console.error("Login error:",s),{user:null,session:null,error:s}}},async logout(){try{const{error:r}=await re.auth.signOut();if(r)throw r;return{error:null}}catch(r){return console.error("Logout error:",r),{error:r}}},async resetPassword(r){try{const{error:e}=await re.auth.resetPasswordForEmail(r,{redirectTo:`${window.location.origin}/admin/reset-password`});if(e)throw e;return{error:null}}catch(e){return console.error("Password reset error:",e),{error:e}}},async updatePassword(r){try{const{error:e}=await re.auth.updateUser({password:r});if(e)throw e;return{error:null}}catch(e){return console.error("Update password error:",e),{error:e}}},async getCurrentUser(){try{const{data:{user:r},error:e}=await re.auth.getUser();if(e)throw e;return{user:r,error:null}}catch(r){return console.error("Get user error:",r),{user:null,error:r}}},async isAuthenticated(){var r;try{const{data:{session:e}}=await re.auth.getSession();if(!e)return!1;const{user:t}=await this.getCurrentUser();return((r=t==null?void 0:t.user_metadata)==null?void 0:r.role)==="admin"}catch(e){return console.error("Auth check error:",e),!1}},async createAdmin(r,e){try{const{data:t,error:a}=await re.rpc("create_admin_user",{new_email:r,new_password:e});if(a)throw a;return{user:t,error:null}}catch(t){return console.error("Create admin error:",t),{user:null,error:t}}},async listAdmins(){try{const{data:r,error:e}=await re.rpc("get_admins");if(e)throw e;return{admins:r,error:null}}catch(r){return console.error("List admins error:",r),{admins:[],error:r}}},async deleteAdmin(r){try{const{error:e}=await re.rpc("delete_admin_user",{target_user_id:r});if(e)throw e;return{success:!0,error:null}}catch(e){return console.error("Delete admin error:",e),{success:!1,error:e}}},onAuthStateChange(r){return re.auth.onAuthStateChange(r)}};function go(){const r=document.createElement("div");r.className="page-admin";let e="dashboard",t=null;function a(d){const p=r.querySelectorAll(".admin-nav-item"),v=r.querySelector(".admin-content");p.forEach(m=>{m.dataset.view===d?m.classList.add("active"):m.classList.remove("active")}),v&&(v.innerHTML="",d==="dashboard"?v.appendChild(n()):d==="reservations"?(v.appendChild(o(t)),t=null):d==="add-reservation"?v.appendChild(u()):d==="services"?v.appendChild(l()):d==="reviews"?v.appendChild(c()):d==="calendar"?v.appendChild(i()):d==="coupons"?v.appendChild(g()):d==="settings"?v.appendChild(h()):v.innerHTML=`
    <div class="glass" style="padding: var(--spacing-2xl); text-align: center;">
            <h2>${d.charAt(0).toUpperCase()+d.slice(1)}</h2>
            <p style="margin-top: var(--spacing-md); color: var(--color-text-muted);">
            Ova sekcija je u razvoju.
            </p>
        </div>
    `)}const s=()=>{r.innerHTML="",r.innerHTML=`
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

            <button class="admin-nav-item ${e==="add-reservation"?"active":""}" data-view="add-reservation">
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
              <span>Nova Rezervacija</span>
            </button>

            <button class="admin-nav-item ${e==="coupons"?"active":""}" data-view="coupons">
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
              </svg>
              <span>Poklon Bonovi</span>
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
    `,r.querySelector(".admin-logout").addEventListener("click",async()=>{await Pe.logout(),B.navigate("/admin/login")});const d=r.querySelector("#mobile-menu-toggle"),p=r.querySelector("#admin-sidebar");d&&d.addEventListener("click",()=>{p.classList.toggle("open")});const v=r.querySelectorAll(".admin-nav-item");return r.querySelector(".admin-content"),v.forEach(m=>{m.addEventListener("click",()=>{window.innerWidth<=1024&&p.classList.remove("open")})}),v.forEach(m=>{m.addEventListener("click",()=>{e=m.dataset.view,a(m.dataset.view)})}),setTimeout(()=>{a("dashboard")},0),r};function n(){const d=document.createElement("div");return d.innerHTML=`
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
  `,T.getReservations().then(p=>{const v=new Date().toISOString().split("T")[0],m=p.filter(f=>f.appointment_date===v&&f.status!=="cancelled").length;d.querySelector("#today-count").textContent=m,d.querySelector("#total-count").textContent=p.length}).catch(p=>{console.error("Error loading dashboard data:",p),d.querySelector("#today-count").textContent="0",d.querySelector("#total-count").textContent="0"}),d.querySelector("#reviews-count").textContent=T.reviews.length,d}function i(){const d=document.createElement("div"),p=new Date;let v=p.getMonth(),m=p.getFullYear();d.innerHTML=`
    <style>
      @media (max-width: 768px) {
        .admin-calendar-card {
            padding: 4px !important; /* Minimal padding */
            width: 100% !important;
            box-sizing: border-box !important;
        }
        #calendar-days {
          min-height: 250px !important;
          gap: 1px !important; /* Tighter gap */
        }
        .calendar-day {
            padding: 0 !important;
            border-width: 1px !important;
        }
        .calendar-day span:first-child {
          font-size: clamp(0.7rem, 4vw, 0.9rem) !important; /* Responsive font */
        }
        .calendar-day span:last-child {
          font-size: clamp(0.4rem, 2.5vw, 0.5rem) !important; /* Responsive font */
          margin-top: 1px !important;
        }
        .calendar-weekdays {
            font-size: 0.7rem;
            margin-bottom: var(--spacing-sm) !important;
        }
        .calendar-weekdays div {
            padding: 0;
        }
      }
    </style>
    <h1 class="admin-title">Kalendar Rezervacija</h1>
      <div class="glass admin-calendar-card" style="padding: var(--spacing-xl); max-width: 700px; margin: 0 auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-lg);">
          <button class="btn btn-secondary" id="prev-month">&lt;</button>
          <h2 id="calendar-month" style="margin: 0; text-transform: uppercase;"></h2>
          <button class="btn btn-secondary" id="next-month">&gt;</button>
        </div>
        
        <div class="calendar-weekdays" style="display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; font-weight: bold; margin-bottom: var(--spacing-md); color: var(--color-text-muted);">
          <div>Pon</div><div>Uto</div><div>Sri</div><div>Čet</div><div>Pet</div><div>Sub</div><div>Ned</div>
        </div>
        
        <div id="calendar-days" style="display: grid; grid-template-columns: repeat(7, 1fr); gap: var(--spacing-xs); min-height: 400px;"></div>
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
  `;const f=d.querySelector("#day-modal"),b=d.querySelector("#day-modal-overlay"),y=()=>{f.style.display="none",b.style.display="none"};d.querySelector("#close-day-modal").onclick=y,b.onclick=y;const k=async()=>{const z=["Siječanj","Veljača","Ožujak","Travanj","Svibanj","Lipanj","Srpanj","Kolovoz","Rujan","Listopad","Studeni","Prosinac"];d.querySelector("#calendar-month").textContent=`${z[v]} ${m}`;const P=await T.getCalendarAvailability(m,v),_=d.querySelector("#calendar-days");_.innerHTML="";const C=new Date(m,v,1),oe=new Date(m,v+1,0).getDate(),J=C.getDay()===0?6:C.getDay()-1;for(let V=0;V<J;V++)_.appendChild(document.createElement("div"));for(let V=1;V<=oe;V++){const Z=`${m}-${String(v+1).padStart(2,"0")}-${String(V).padStart(2,"0")}`,ne=P[V]||{status:"unavailable",count:0},$=document.createElement("button");$.className="calendar-day",$.style.aspectRatio="1",$.style.border="1px solid rgba(255,255,255,0.1)",$.style.background="rgba(255,255,255,0.05)",$.style.color="white",$.style.cursor="pointer",$.style.display="flex",$.style.flexDirection="column",$.style.alignItems="center",$.style.justifyContent="center",$.style.padding="4px",ne.status==="unavailable"?$.style.borderColor="#ef4444":ne.status==="almost-full"?$.style.borderColor="#eab308":$.style.borderColor="#22c55e",$.innerHTML=`
    <span style="font-weight: bold; font-size: 1.2rem; line-height: 1;">${V}</span>
    ${ne.count>0?`
        <span style="
            font-size: 0.7rem; 
            margin-top: 4px; 
            color: #4ade80; 
            font-weight: 600;
            text-transform: uppercase;
        ">${ne.count} REZ.</span>
    `:""}
  `,$.onclick=async()=>{const Q=await T.getReservationsByDate(Z);d.querySelector("#modal-date").textContent=new Date(Z).toLocaleDateString("hr-HR");const I=d.querySelector("#day-reservations-list");Q.length===0?I.innerHTML="<p>Nema rezervacija za ovaj dan.</p>":(I.innerHTML=Q.map(N=>`
    <div style="background: rgba(255,255,255,0.05); padding: 10px; margin-bottom: 10px; border-radius: 4px; border-left: 3px solid ${N.status==="confirmed"?"#10b981":N.status==="cancelled"?"#ef4444":"#fbbf24"}; cursor: pointer;"
         class="calendar-reservation-item" data-id="${N.id}">
                            <div style="font-weight: bold;">${N.appointment_time} - ${N.ime} ${N.prezime}</div>
                            <div style="font-size: 0.9rem; color: #aaa;">${N.service_name}</div>
                            <div style="font-size: 0.8rem;">Status: ${N.status}</div>
                        </div>
    `).join(""),I.querySelectorAll(".calendar-reservation-item").forEach(N=>{N.addEventListener("click",()=>{t=N.dataset.id,y(),e="reservations",a("reservations")})})),f.style.display="block",b.style.display="block"},_.appendChild($)}};d.querySelector("#prev-month").addEventListener("click",()=>{v--,v<0&&(v=11,m--),k()}),d.querySelector("#next-month").addEventListener("click",()=>{v++,v>11&&(v=0,m++),k()}),k();const j=document.createElement("div");j.className="glass",j.style.padding="var(--spacing-lg)",j.style.marginTop="var(--spacing-xl)",j.innerHTML=`
        <h3 class="settings-title" style="margin-bottom: var(--spacing-md);">Upravljanje Neradnim Danima</h3>
        <div style="display: flex; gap: var(--spacing-md); margin-bottom: var(--spacing-lg); align-items: center; flex-wrap: wrap;">
            <input type="date" id="closed-date-input" class="input" style="width: auto;">
            <button id="add-closed-btn" class="btn btn-secondary" style="background: var(--color-accent); border: none; color: white;">Zatvori Dan</button>
        </div>
        <div id="closed-days-list" style="display: flex; flex-wrap: wrap; gap: var(--spacing-sm);">
            <span style="color: var(--color-text-muted);">Učitavanje...</span>
        </div>
    `,d.appendChild(j);const x=j.querySelector("#closed-date-input"),w=j.querySelector("#add-closed-btn"),A=j.querySelector("#closed-days-list"),R=async()=>{A.innerHTML='<span style="color: var(--color-text-muted);">Učitavanje...</span>';try{const z=await T.getClosedDays();if(!z||z.length===0){A.innerHTML='<span style="color: var(--color-text-muted);">Nema zatvorenih dana.</span>';return}A.innerHTML=z.map(P=>`
                <div style="background: rgba(255, 0, 0, 0.1); border: 1px solid rgba(255, 0, 0, 0.3); padding: 5px 10px; border-radius: 4px; display: flex; align-items: center; gap: 8px;">
                    <span>${new Date(P.date).toLocaleDateString()}</span>
                    <button class="remove-closed-btn" data-id="${P.id}" style="background: none; border: none; color: var(--color-text); cursor: pointer; font-size: 1.1rem;">&times;</button>
                </div>
            `).join(""),A.querySelectorAll(".remove-closed-btn").forEach(P=>{P.addEventListener("click",async()=>{confirm("Otvoriti ovaj dan?")&&(await T.removeClosedDay(P.dataset.id),R(),k())})})}catch(z){console.error(z),A.innerHTML="Greška."}};return w.addEventListener("click",async()=>{const z=x.value;if(!z)return alert("Odaberite datum");try{await T.addClosedDay(z),x.value="",R(),k()}catch(P){alert(P.message)}}),R(),d}function o(d=null){const p=document.createElement("div");let v="all";d&&setTimeout(()=>R(d),100),p.innerHTML=`
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
  `;const m=p.querySelector("#reservations-tbody"),f=p.querySelector("#reservation-modal"),b=p.querySelector("#modal-overlay"),y=p.querySelector("#modal-content"),k=p.querySelector("#modal-actions"),j=p.querySelector("#close-modal-btn"),x=()=>{f.style.display="none",b.style.display="none"};j.addEventListener("click",x),b.addEventListener("click",x);const w=p.querySelectorAll(".filter-pill");w.forEach(P=>{P.addEventListener("click",()=>{v=P.dataset.value,w.forEach(_=>_.classList.remove("active")),P.classList.add("active"),A()})});async function A(){m.innerHTML='<tr><td colspan="6" style="text-align: center; padding: var(--spacing-xl);">Učitavanje...</td></tr>';try{let P=await T.getReservations();if(v!=="all"&&(P=P.filter(_=>_.status===v)),P.length===0){m.innerHTML=`
    <tr>
    <td colspan="6" style="text-align: center; padding: var(--spacing-xl); color: var(--color-text-muted);">
      Nema rezervacija
    </td>
          </tr>
    `;return}if(m.innerHTML=P.map(_=>{const C=T.services.find(V=>V.id===_.service_id),G=`${_.ime} ${_.prezime}`,oe=new Date(_.appointment_date).toLocaleDateString("hr-HR");let J="status-pending";return _.status==="confirmed"&&(J="status-confirmed"),_.status==="completed"&&(J="status-completed"),_.status==="cancelled"&&(J="status-cancelled"),`
    <tr>
            <td>${G}</td>
            <td class="hide-mobile">${_.marka} ${_.model}</td>
            <td>${(C==null?void 0:C.name)||_.service_name}</td>
            <td>${oe}</td>
            <td><span class="status-badge ${J}">${_.status}</span></td>
            <td>
              <button class="btn btn-secondary btn-sm btn-open-reservation" data-id="${_.id}" id="btn-open-res-${_.id}">Otvori</button>
            </td>
          </tr>
    `}).join(""),p.querySelectorAll(".btn-open-reservation").forEach(_=>{_.addEventListener("click",C=>R(C.target.dataset.id))}),d){const _=p.querySelector(`#btn-open-res-${d}`);_?_.click():setTimeout(()=>R(d),100)}}catch(P){console.error("Error loading reservations table:",P),m.innerHTML='<tr><td colspan="6" style="text-align: center; padding: var(--spacing-xl);">Greška pri učitavanju.</td></tr>'}}async function R(P){var Q;if(!P){console.error("No ID provided to openReservationModal");return}const _=await T.getReservationById(P);if(!_){alert("Greška: Rezervacija nije pronađena.");return}const C=T.services.find(I=>I.id===_.service_id)||((Q=T.bundles)==null?void 0:Q.find(I=>I.id===_.service_id)),G=C==null?void 0:C.is_request_price,oe=_.status==="pending"&&(G||_.price===0||_.price===null)&&C.id!=="pojasevi";let J=_.price||(C==null?void 0:C.price)||0,V="";if(_.service_id==="pojasevi"){const I=_.broj_pojaseva||0,N=_.vlastiti_pojasevi;_.cijena||(J=(N?(C==null?void 0:C.price_disassembled)??39:(C==null?void 0:C.price)??69)*I),V+=`<p><strong>Broj pojaseva:</strong> ${I}</p>`,V+=`<p><strong>Izvađeni mehanizam:</strong> ${N?"DA":"NE"}</p>`}else if(_.service_id==="zvjezdano-nebo"){const I=_.broj_zvjezdica||0;if(!_.cijena){const N=(C==null?void 0:C.price_per_star)??1.19;J=I*N}V+=`<p><strong>Broj zvjezdica:</strong> ${I}</p>`}y.innerHTML=`
        <p><strong>Klijent:</strong> ${_.ime} ${_.prezime}</p>
        <p><strong>Email:</strong> ${_.email}</p>
        <p><strong>Telefon:</strong> ${_.telefon}</p>
        <p><strong>Vozilo:</strong> ${_.marka} ${_.model}</p>
        <p><strong>Godina:</strong> ${_.godina}</p>
        ${_.vin?`<p><strong>VIN:</strong> ${_.vin}</p>`:""}
        <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 10px 0;">
        <p><strong>Usluga:</strong> ${(C==null?void 0:C.name)||_.service_name}</p>
        ${V}
        <p><strong>Cijena:</strong> <span style="font-size: 1.2em; color: var(--color-accent); font-weight: bold;">${_.price||J?(_.price||J).toFixed(2)+" EUR":"Na upit"}</span></p>
        <p><strong>Datum:</strong> ${new Date(_.appointment_date).toLocaleDateString("hr-HR")} u ${_.appointment_time}</p>
        <p><strong>Status:</strong> <span class="status-badge ${_.status==="confirmed"?"status-confirmed":_.status==="completed"?"status-completed":_.status==="cancelled"?"status-cancelled":"status-pending"}">${_.status}</span></p>
        <p><strong>Napomene:</strong> ${_.napomena||"-"}</p>
        ${_.software_version_image_url?`
            <div style="margin-top: 15px;">
                <p><strong>Slika softvera:</strong></p>
                <a href="${_.software_version_image_url}" target="_blank" style="display: inline-block; margin-top: 5px;">
                    <img src="${_.software_version_image_url}" alt="Slika softvera" style="max-width: 100%; max-height: 300px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.2);">
                </a>
            </div>
        `:""}
        
        ${_.status==="pending"&&oe?`
             <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Unesi cijenu za klijenta (€): </label>
                <input type="number" id="confirm-price-input" class="input" style="width: 100%; padding: 10px;" value="${J||""}" placeholder="0.00">
                <p style="font-size: 0.8rem; color: #aaa; margin-top: 5px;">Klijent će primiti email s ovom cijenom nakon potvrde.</p>
             </div>`:""}
        `,k.innerHTML="",_.status==="pending"?(k.innerHTML+='<button class="btn btn-secondary" id="cancel">Otkaži</button>',k.innerHTML+='<button class="btn btn-cta" id="confirm">Potvrdi</button>'):_.status==="confirmed"&&(k.innerHTML+='<button class="btn btn-secondary" id="cancel">Otkaži</button>',k.innerHTML+='<button class="btn btn-primary" id="completed">Završi</button>');const Z=k.querySelector("#confirm"),ne=k.querySelector("#cancel"),$=k.querySelector("#completed");Z&&(Z.onclick=()=>{const I=y.querySelector("#confirm-price-input"),N=I?parseFloat(I.value):null;if(oe&&(N===null||isNaN(N)))return alert("Molimo unesite cijenu prije potvrde.");z(P,"confirmed",N)}),ne&&(ne.onclick=()=>z(P,"cancelled")),$&&($.onclick=()=>z(P,"completed")),f.style.display="block",b.style.display="block"}async function z(P,_,C=null){try{C!==null&&(C=parseFloat(C)),await T.updateReservationStatus(P,_,C),x(),A()}catch(G){console.error("Failed to update status:",G),alert("Greška pri ažuriranju statusa: "+(G.message||G))}}return A(),p}function l(){const d=document.createElement("div");d.innerHTML='<h1 class="admin-title">Konfiguracija Usluga</h1>';const p=document.createElement("div");p.className="settings-card glass",p.innerHTML=`
        <h2 style="margin-bottom: var(--spacing-lg);">Usluge i Cijene</h2>
        <div id="services-list">Učitavanje...</div>
    `,d.appendChild(p);const v=p.querySelector("#services-list");return(async()=>{if(v.innerHTML="Učitavanje...",await T.loadServices(),!T.services||T.services.length===0){v.innerHTML="<p>Nema dostupnih usluga.</p>";return}v.innerHTML=`
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Cijena Konfiguracija</th>
                        <th>Akcije</th>
                    </tr>
                </thead>
                <tbody>
                ${T.services.map(f=>`
                    <tr>
                        <td style="vertical-align: top;">
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <span style="font-size: 1.5rem;">${f.icon}</span>
                                <div>
                                    <div style="font-weight: bold;">${f.name}</div>
                                    <div style="font-size: 0.8rem; color: #888;">${f.id}</div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                <div style="display: flex; align-items: center; gap: 16px;">
                                    <div style="display: flex; align-items: center; gap: 8px;">
                                        <input type="checkbox" id="is_request_price_${f.id}" class="is-request-price-checkbox" data-id="${f.id}" ${f.is_request_price?"checked":""}>
                                        <label for="is_request_price_${f.id}" style="font-size: 0.9rem;">Na upit</label>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 8px;">
                                        <input type="checkbox" id="is_from_${f.id}" class="is-from-checkbox" data-id="${f.id}" ${f.is_from?"checked":""}>
                                        <label for="is_from_${f.id}" style="font-size: 0.9rem;">Cijena "OD"</label>
                                    </div>
                                </div>
                                <div id="price-inputs-${f.id}" style="display: ${f.is_request_price?"none":"block"};">
                                    <div style="display: flex; align-items: center; gap: 8px; margin-top: 5px;">
                                        <input type="number" class="input service-price-input" data-id="${f.id}" value="${f.price||""}" placeholder="Cijena" style="width: 100px;">
                                        <span style="font-size: 0.9rem;">EUR</span>
                                    </div>
                                    <div class="price-to-container" id="price_to_container_${f.id}" style="display: ${f.is_from?"flex":"none"}; align-items: center; gap: 8px; margin-top: 5px;">
                                        <span style="font-size: 0.9rem;">DO:</span>
                                        <input type="number" class="input service-price-to-input" data-id="${f.id}" value="${f.price_to||""}" placeholder="Max" style="width: 100px;">
                                        <span style="font-size: 0.9rem;">EUR</span>
                                    </div>

                                    ${f.id==="pojasevi"?`
                                    <div style="margin-top: 10px;">
                                        <label style="font-size: 0.8rem; display: block; margin-bottom: 2px;">Cijena Rastavljeni (po komadu):</label>
                                        <div style="display: flex; align-items: center; gap: 8px;">
                                            <input type="number" class="input service-price-disassembled-input" data-id="${f.id}" value="${f.price_disassembled||""}" placeholder="39" style="width: 100px;">
                                            <span style="font-size: 0.9rem;">EUR</span>
                                        </div>
                                    </div>
                                    `:""}

                                    ${f.id==="zvjezdano-nebo"?`
                                    <div style="margin-top: 10px;">
                                        <label style="font-size: 0.8rem; display: block; margin-bottom: 2px;">Cijena po zvjezdici:</label>
                                        <div style="display: flex; align-items: center; gap: 8px;">
                                            <input type="number" class="input service-price-star-input" data-id="${f.id}" value="${f.price_per_star||""}" step="0.01" placeholder="1.19" style="width: 100px;">
                                            <span style="font-size: 0.9rem;">EUR</span>
                                        </div>
                                    </div>
                                    <div style="margin-top: 10px;">
                                        <label style="font-size: 0.8rem; display: block; margin-bottom: 2px;">Cijena za 500 zvjezdica:</label>
                                        <div style="display: flex; align-items: center; gap: 8px;">
                                            <input type="number" class="input service-price-500-input" data-id="${f.id}" value="${f.price_500_stars||""}" placeholder="595" style="width: 100px;">
                                            <span style="font-size: 0.9rem;">EUR</span>
                                        </div>
                                    </div>
                                    <div style="margin-top: 10px;">
                                        <label style="font-size: 0.8rem; display: block; margin-bottom: 2px;">Cijena za 750 zvjezdica:</label>
                                        <div style="display: flex; align-items: center; gap: 8px;">
                                            <input type="number" class="input service-price-750-input" data-id="${f.id}" value="${f.price_750_stars||""}" placeholder="750" style="width: 100px;">
                                            <span style="font-size: 0.9rem;">EUR</span>
                                        </div>
                                    </div>
                                    `:""}
                                </div>
                            </div>
                        </td>
                        <td style="vertical-align: top;">
                            <button class="btn btn-primary btn-sm save-service-btn" data-id="${f.id}">Spremi</button>
                        </td>
                    </tr>`).join("")}
                </tbody>
            </table>
        `,v.querySelectorAll(".is-request-price-checkbox").forEach(f=>{f.addEventListener("change",b=>{const y=b.target.dataset.id,k=v.querySelector(`#price-inputs-${y}`);k.style.display=b.target.checked?"none":"block"})}),v.querySelectorAll(".is-from-checkbox").forEach(f=>{f.addEventListener("change",b=>{const y=b.target.dataset.id,k=v.querySelector(`#price_to_container_${y}`);k.style.display=b.target.checked?"flex":"none"})}),v.querySelectorAll(".save-service-btn").forEach(f=>{f.addEventListener("click",async b=>{const y=b.target.dataset.id,k=v.querySelector(`.service-price-input[data-id="${y}"]`),j=v.querySelector(`#is_from_${y}`),x=v.querySelector(`#is_request_price_${y}`),w=v.querySelector(`.service-price-to-input[data-id="${y}"]`),A=x.checked,R=k.value?parseFloat(k.value):0;if(!A&&isNaN(R)){alert("Molimo unesite ispravnu osnovnu cijenu.");return}let z={};if(y==="pojasevi"){const _=v.querySelector(`.service-price-disassembled-input[data-id="${y}"]`);_&&(z.price_disassembled=parseFloat(_.value)||0)}if(y==="zvjezdano-nebo"){const _=v.querySelector(`.service-price-star-input[data-id="${y}"]`),C=v.querySelector(`.service-price-500-input[data-id="${y}"]`),G=v.querySelector(`.service-price-750-input[data-id="${y}"]`);_&&(z.price_per_star=parseFloat(_.value)||0),C&&(z.price_500_stars=parseFloat(C.value)||0),G&&(z.price_750_stars=parseFloat(G.value)||0)}const P=b.target.textContent;b.target.textContent="Spremanje...",b.target.disabled=!0;try{await T.updateServiceConfig(y,{price:R,is_from:j.checked,price_to:w&&w.value?parseFloat(w.value):null,is_request_price:A,...z}),alert("Spremljeno!")}catch(_){console.error(_),alert("Greška pri spremanju.")}finally{b.target.disabled=!1,b.target.textContent=P}})})})(),d}function c(){const d=document.createElement("div");d.innerHTML='<h1 class="admin-title">Recenzije</h1>';const p=document.createElement("div");p.className="settings-card glass";const v=document.createElement("button");v.className="btn btn-primary",v.textContent="Dodaj Recenziju",v.style.marginBottom="var(--spacing-lg)";const m=document.createElement("div");m.className="glass",m.style.cssText="display:none; position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); width:90%; max-width:500px; padding:var(--spacing-xl); z-index:1000;",m.innerHTML=`
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
    `;const f=document.createElement("div");f.style.cssText="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.7); z-index:999;",d.appendChild(m),d.appendChild(f);let b=null;const y=(w=null)=>{b=w?w.id:null,d.querySelector("#review-modal-title").textContent=w?"Uredi Recenziju":"Dodaj Recenziju",d.querySelector("#review-name").value=w?w.name:"",d.querySelector("#review-rating").value=w?w.rating:5,d.querySelector("#review-comment").value=w&&(w.comment||w.text)||"",m.style.display="block",f.style.display="block"},k=()=>{m.style.display="none",f.style.display="none",b=null};v.onclick=()=>y(),d.querySelector("#cancel-review-btn").onclick=k,f.onclick=k,d.querySelector("#save-review-btn").onclick=async()=>{const w=d.querySelector("#review-name").value,A=parseInt(d.querySelector("#review-rating").value),R=d.querySelector("#review-comment").value;if(!w||!R){alert("Sva polja su obavezna.");return}const z={name:w,rating:A,comment:R,is_approved:!0};try{b?await T.updateReview(b,z):await T.addReview(z),k(),x()}catch(P){console.error(P),alert("Greška: "+P.message)}},p.appendChild(v);const j=document.createElement("div");j.id="reviews-list",j.innerHTML="Učitavanje...",p.appendChild(j),d.appendChild(p);const x=async()=>{j.innerHTML="Učitavanje...";const w=await T.loadReviews();if(!w||w.length===0){j.innerHTML="<p>Nema recenzija.</p>";return}j.innerHTML=`
            <table class="admin-table">
                <thead><tr><th>Ime</th><th>Komentar</th><th>Ocjena</th><th>Akcije</th></tr></thead>
                <tbody>
                ${w.map(A=>`
                    <tr>
                        <td>${A.name||A.author}</td>
                        <td>${(A.comment||A.text||"").substring(0,50)}...</td>
                        <td>${"★".repeat(A.rating||0)}${"☆".repeat(5-(A.rating||0))}</td>
                        <td>
                          <button class="btn btn-secondary btn-sm edit-review-btn" data-id="${A.id}">Uredi</button>
                          <button class="btn btn-secondary btn-sm delete-review-btn" data-id="${A.id}" style="margin-left: 5px; background: #500;">Obriši</button>
                        </td>
                    </tr>`).join("")}
                </tbody>
            </table>
        `,j.querySelectorAll(".edit-review-btn").forEach(A=>{A.onclick=R=>{const z=R.target.dataset.id,P=w.find(_=>_.id==z);P&&y(P)}}),j.querySelectorAll(".delete-review-btn").forEach(A=>{A.onclick=async R=>{const z=R.target.dataset.id;confirm("Jeste li sigurni da želite obrisati ovu recenziju?")&&(await T.deleteReview(z),x())}})};return x(),d}function h(){const d=document.createElement("div");d.innerHTML='<h1 class="admin-title">Postavke Admin Računa</h1>';const p=document.createElement("div");p.className="settings-card glass",p.innerHTML=`
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
    `,p.querySelector("#update-password-btn").addEventListener("click",async m=>{const f=p.querySelector("#new-password").value;if(!f||f.length<6){alert("Lozinka mora imati barem 6 znakova.");return}m.target.disabled=!0,m.target.textContent="...";try{const{error:b}=await Pe.updatePassword(f);if(b)throw b;alert("Lozinka uspješno promijenjena!"),p.querySelector("#new-password").value=""}catch(b){console.error(b),alert("Greška pri promjeni lozinke: "+b.message)}finally{m.target.disabled=!1,m.target.textContent="Ažuriraj Lozinku"}}),p.querySelector("#create-admin-btn").addEventListener("click",async m=>{const f=p.querySelector("#new-admin-email").value,b=p.querySelector("#new-admin-password").value;if(!f||!b){alert("Molimo unesite email i lozinku.");return}m.target.disabled=!0,m.target.textContent="...";try{await T.manageAdmins("create",{email:f,password:b}),alert("Admin uspješno kreiran!"),p.querySelector("#new-admin-email").value="",p.querySelector("#new-admin-password").value="",v()}catch(y){console.error(y),alert("Greška: "+y.message)}finally{m.target.disabled=!1,m.target.textContent="Kreiraj Admina"}});const v=async()=>{const m=p.querySelector("#admin-list");try{const{users:f}=await T.manageAdmins("list"),b=await Pe.getCurrentUser();if(!f||f.length===0){m.innerHTML="Nema pronađenih admina.";return}m.innerHTML=`
                <table class="admin-table" style="width: 100%;">
                    <thead>
                        <tr>
                            <th style="text-align: left;">Email</th>
                            <th style="text-align: left;">Kreiran</th>
                            <th style="text-align: right;">Akcije</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${f.map(y=>`
                            <tr>
                                <td>${y.email} ${y.id===(b==null?void 0:b.id)?"(Vi)":""}</td>
                                <td>${new Date(y.created_at).toLocaleDateString()}</td>
                                <td style="text-align: right;">
                                    ${y.id!==(b==null?void 0:b.id)?`<button class="btn btn-secondary btn-sm delete-admin-btn" data-id="${y.id}" style="background: #991b1b; color: white; border: none;">Obriši</button>`:'<span style="color: var(--color-text-muted); font-size: 0.9rem;">(Trenutni korisnik)</span>'}
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            `,m.querySelectorAll(".delete-admin-btn").forEach(y=>{y.addEventListener("click",async k=>{k.preventDefault(),setTimeout(async()=>{if(confirm("Jeste li sigurni da želite obrisati ovog admina?"))try{await T.manageAdmins("delete",{userId:y.dataset.id}),v()}catch(j){alert("Greška: "+j.message)}},10)})})}catch(f){console.error(f),m.innerHTML=`<div class="alert alert-error">Greška pri učitavanju: ${f.message}</div>`}};return v(),d.appendChild(p),d}function g(){const d=document.createElement("div");d.innerHTML='<h1 class="admin-title">Poklon Bonovi</h1>';const p=document.createElement("div");return p.className="table-container glass",p.style.overflowX="auto",p.innerHTML=`
        <table class="admin-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Iznos</th>
                    <th>Kupac</th>
                    <th>Primatelj</th>
                    <th>Datum</th>
                    <th>Status</th>
                    <th>Detalji</th>
                </tr>
            </thead>
            <tbody id="coupons-tbody">
                <tr><td colspan="6" style="text-align: center; padding: 20px;">Učitavanje...</td></tr>
            </tbody>
        </table>
    `,d.appendChild(p),T.getCoupons().then(v=>{const m=p.querySelector("#coupons-tbody");if(!v||v.length===0){m.innerHTML='<tr><td colspan="6" style="text-align: center; padding: 20px;">Nema prodanih bonova.</td></tr>';return}m.innerHTML=v.map(j=>`
            <tr>
                <td style="font-family: monospace;">${j.id.slice(0,8)}...</td>
                <td style="color: var(--color-accent); font-weight: bold;">${j.amount} €</td>
                <td>
                    <div>${j.purchaser_name}</div>
                    <div style="font-size: 0.8rem; color: #888;">${j.purchaser_email}</div>
                </td>
                <td>
                    <div>${j.recipient_name}</div>
                    <div style="font-size: 0.8rem; color: #888;">${j.recipient_email}</div>
                </td>
                <td>${new Date(j.created_at).toLocaleDateString()}</td>
                <td><span class="status-badge status-confirmed">Potvrđeno</span></td>
                <td>
                    <button class="btn btn-sm btn-secondary view-coupon-btn" data-id="${j.id}">Otvori</button>
                </td>
            </tr>
        `).join("");const f="admin-coupon-modal";let b=document.getElementById(f);if(!b){b=document.createElement("div"),b.id=f,b.className="glass admin-modal",b.style.display="none",b.innerHTML=`
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h3 style="margin: 0;">Detalji Poklon Bona</h3>
                    <button class="close-admin-modal" style="background:none; border:none; color:white; font-size:1.5rem; cursor:pointer;">&times;</button>
                </div>
                <div id="${f}-content" style="font-family: monospace; white-space: pre-wrap; line-height: 1.5;"></div>
            `,document.body.appendChild(b);const j=document.createElement("div");j.id=`${f}-overlay`,j.style.cssText="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:9999;",document.body.appendChild(j);const x=()=>{b.style.display="none",j.style.display="none"};b.querySelector(".close-admin-modal").onclick=x,j.onclick=x}const y=document.getElementById(`${f}-content`),k=document.getElementById(`${f}-overlay`);p.querySelectorAll(".view-coupon-btn").forEach(j=>{j.addEventListener("click",()=>{const x=v.find(w=>w.id===j.dataset.id);x&&(y.innerHTML=`
<strong style="color: var(--color-accent);">POKLON BON DETALJI</strong>
ID:      ${x.id}
Iznos:   <span style="font-size: 1.2em; font-weight: bold;">${x.amount} €</span>
Datum:   ${new Date(x.created_at).toLocaleString()}
Status:  ${x.status}

<strong style="color: var(--color-accent);">KUPAC (Račun)</strong>
Ime:     ${x.purchaser_name}
Email:   ${x.purchaser_email}
Telefon: ${x.purchaser_phone}

<strong style="color: var(--color-accent);">PRIMATELJ</strong>
Ime:     ${x.recipient_name}
Email:   ${x.recipient_email}
Poruka:  ${x.recipient_message||"-"}
                   `,b.style.display="block",b.style.cssText="display:block; position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); width:90%; max-width:500px; padding:30px; z-index:10000; background: #1a1a1a; border: 1px solid #333; border-radius: 8px;",k.style.display="block")})})}),d}function u(){const d=document.createElement("div");d.innerHTML='<h1 class="admin-title">Nova Rezervacija (Admin)</h1>';const p=document.createElement("div");p.className="glass",p.style.padding="var(--spacing-xl)",p.style.maxWidth="600px",p.style.margin="0 auto";const v=`
        <form id="add-manual-reservation-form" style="display: flex; flex-direction: column; gap: var(--spacing-md);">
            <div class="form-group">
                <label>Tip Usluge</label>
                <select name="type" class="input" id="type-select">
                    <option value="service">Pojedinačna Usluga</option>
                    <option value="bundle">Paket</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>Odaberi Uslugu/Paket</label>
                <select name="service_id" class="input" id="service-select" required>
                    <!-- Populated by JS -->
                </select>
            </div>
            
            <div class="form-group">
                <label>Marka Vozila</label>
                <input type="text" name="marka" class="input" required placeholder="npr. BMW">
            </div>
             <div class="form-group">
                <label>Model Vozila</label>
                <input type="text" name="model" class="input" required placeholder="npr. Serija 3">
            </div>
             <div class="form-group">
                <label>Godina</label>
                <input type="text" name="godina" class="input" required placeholder="npr. 2020">
            </div>
            
            <div class="form-group">
                <label>Datum Termina</label>
                <input type="date" name="appointment_date" class="input" required>
            </div>
            
             <div class="form-group">
                <label>Vrijeme</label>
                <select name="appointment_time" class="input" required>
                    <option value="09:00">09:00</option>
                    <option value="09:30">09:30</option>
                    <option value="10:00">10:00</option>
                    <option value="10:30">10:30</option>
                    <option value="11:00">11:00</option>
                    <option value="11:30">11:30</option>
                    <option value="12:00">12:00</option>
                    <option value="12:30">12:30</option>
                    <option value="13:00">13:00</option>
                    <option value="13:30">13:30</option>
                    <option value="14:00">14:00</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>Napomena</label>
                <textarea name="napomena" class="input" rows="3"></textarea>
            </div>
            
            <button type="submit" class="btn btn-cta">Kreiraj Rezervaciju</button>
        </form>
      `;p.innerHTML=v,d.appendChild(p);const m=p.querySelector("#type-select"),f=p.querySelector("#service-select"),b=p.querySelector("#add-manual-reservation-form"),y=()=>{const j=m.value==="bundle"?T.bundles:T.services;f.innerHTML=j.map(x=>`<option value="${x.id}">${x.name}</option>`).join("")};return m.addEventListener("change",y),y(),b.addEventListener("submit",async k=>{k.preventDefault();const j=new FormData(b),x=Object.fromEntries(j.entries()),w={service_id:x.service_id,marka:x.marka,model:x.model,godina:x.godina,appointment_date:x.appointment_date,appointment_time:x.appointment_time,napomena:x.napomena,ime:"Ručni",prezime:"Unos",email:"-",telefon:"-",is_manual_entry:!0};try{await T.saveBooking(w),alert("Rezervacija kreirana!"),e="reservations",a("reservations")}catch(A){console.error(A),alert("Greška pri kreiranju rezervacije.")}}),d}return s()}function mo(){const r=document.createElement("div");r.className="page-admin-login";let e="",t="",a=!1,s="",n=!1,i=!1;const o=()=>{r.innerHTML=`
            <div class="login-container">
                <div class="login-card glass">
                    <div class="login-header">
                        <a href="/" id="home-link" style="display: inline-block; margin-bottom: 1rem;">
                      <div class="login-logo-container">
      <img src="/images/logo.png" alt="Admin" class="login-logo" style="cursor: pointer; width: 120px; height: auto;">
    </div>                    </a>
                        <p class="login-subtitle">Prijavite se za pristup</p>
                    </div>

                    ${s?`
                        <div class="alert alert-error">
                            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                            </svg>
                            <span>${s}</span>
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
                                <button type="submit" class="btn btn-primary" ${a?"disabled":""}>
                                    ${a?"Šaljem...":"Pošalji Link"}
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

                            <button type="submit" class="btn btn-primary btn-block" ${a?"disabled":""}>
                                ${a?"Prijava...":"Prijavi se"}
                            </button>
                        </form>
                    `}
                </div>
            </div>
        `,l()},l=()=>{const g=r.querySelector("#login-form"),u=r.querySelector("#reset-form"),d=r.querySelector("#forgot-password"),p=r.querySelector("#back-to-login"),v=r.querySelector("#home-link");if(v==null||v.addEventListener("click",m=>{m.preventDefault(),B.navigate("/")}),g){g.addEventListener("submit",c);const m=r.querySelector("#email"),f=r.querySelector("#password");m==null||m.addEventListener("input",b=>{e=b.target.value}),f==null||f.addEventListener("input",b=>{t=b.target.value})}if(u){u.addEventListener("submit",h);const m=r.querySelector("#reset-email");m==null||m.addEventListener("input",f=>{e=f.target.value})}d==null||d.addEventListener("click",()=>{i=!0,s="",n=!1,o()}),p==null||p.addEventListener("click",()=>{i=!1,s="",n=!1,o()})},c=async g=>{if(g.preventDefault(),!e||!t){s="Molimo unesite email i lozinku",o();return}a=!0,s="",o();const{user:u,session:d,error:p}=await Pe.login(e,t);if(p){a=!1,s=p.message==="Unauthorized: Admin access required"?"Nemate admin pristup":"Neispravni podaci za prijavu",o();return}B.navigate("/admin")},h=async g=>{if(g.preventDefault(),!e){s="Molimo unesite email",o();return}a=!0,s="",o();const{error:u}=await Pe.resetPassword(e);if(a=!1,u){s="Greška pri slanju emaila. Pokušajte ponovno.",o();return}n=!0,s="",o()};return o(),r}const bs=document.createElement("style");bs.textContent=`
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
`;document.head.appendChild(bs);function vo(){const r=document.createElement("div");r.className="page-terms",r.appendChild(Vt());const e=document.createElement("main");return e.className="terms-main",e.innerHTML=`
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
                <p><strong>Bezuvjetna naplata:</strong> U slučaju da Klijent ne dođe na dogovoreni termin ili otkaže termin unutar 5 dana prije rezerviranog datuma, Klijent je dužan platiti naknadu.</p>
                <p><strong>Iznos naknade:</strong> Naknada za otkazivanje ili nedolazak iznosi 50% ukupne cijene rezervirane usluge.</p>

                <h4>3. Izdavanje računa i rok plaćanja</h4>
                <p>U slučaju nastupa okolnosti iz točke 2. (otkazivanje ili nedolazak), Klijentu će na ostavljenu e-mail adresu biti poslan račun na iznos od 50% vrijednosti usluge.</p>
                <p>Klijent je dužan podmiriti navedeni iznos u roku od 3 (tri) radna dana od primitka računa putem e-maila.</p>

                <h4>4. Prisilna naplata i sudski postupak</h4>
                <p>Ukoliko Klijent ne podmiri račun u navedenom roku, pokreće se postupak prisilne naplate sukladno važećim zakonima Republike Hrvatske.</p>
                <p>Slučaj se prosljeđuje na rješavanje nadležnim tijelima radi pokretanja ovršnog postupka ili sudske tužbe.</p>
                <p>U slučaju prisilne naplate, Klijent se obvezuje, pored osnovnog duga, podmiriti i sve nastale troškove postupka (troškove odvjetnika, javnobilježničke pristojbe) te zakonske zatezne kamate.</p>

                <h4>5. Izjava o prihvaćanju</h4>
                <p>Zaključenjem procesa rezervacije Klijent potvrđuje da je pročitao ove Uvjete, da ih razumije te da je suglasan s naplatom iznosa od 50% vrijednosti usluge u slučaju da rezervirani termin ne iskoristi ili ne otkaže najmanje 5 dana ranije.</p>
            </div>
        </div>
    </div>
  `,r.appendChild(e),r.appendChild(Ft()),r}const ys=document.createElement("style");ys.textContent=`
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
`;document.head.appendChild(ys);function fo(){const r=document.createElement("div");r.className="page-container not-found-page",r.innerHTML=`
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
  `;const e=r.querySelector("#back-home-btn");return e.onclick=()=>{B.navigate("/")},r}B.setAuthCheck(async()=>await Pe.isAuthenticated());B.register("/",Qi);B.register("/booking",po);B.register("/admin/login",mo);B.register("/uvjeti-poslovanja",vo);B.register("/admin",go,{protected:!0});B.register("/404",fo);B.init();
