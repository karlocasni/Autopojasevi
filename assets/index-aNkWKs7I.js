function Hs(s,e){for(var t=0;t<e.length;t++){const r=e[t];if(typeof r!="string"&&!Array.isArray(r)){for(const n in r)if(n!=="default"&&!(n in s)){const i=Object.getOwnPropertyDescriptor(r,n);i&&Object.defineProperty(s,n,i.get?i:{enumerable:!0,get:()=>r[n]})}}}return Object.freeze(Object.defineProperty(s,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(n){if(n.ep)return;n.ep=!0;const i=t(n);fetch(n.href,i)}})();class er{constructor(){this.routes={},this.protectedRoutes=new Set,this.currentRoute=null,this.authCheck=null}register(e,t,r={}){this.routes[e]=t,r.protected&&this.protectedRoutes.add(e)}setAuthCheck(e){this.authCheck=e}async navigate(e,t={}){if(this.protectedRoutes.has(e)){if(!this.authCheck){console.error("Auth check function not set");return}if(!await this.authCheck()){sessionStorage.setItem("intendedRoute",e),this.navigate("/admin/login");return}}this.currentRoute=e;const r=this.routes[e];if(r){const n=document.getElementById("app");n.innerHTML="",n.appendChild(r(t)),window.scrollTo(0,0),window.history.pushState({path:e,data:t},"",e)}}navigateToIntended(){const e=sessionStorage.getItem("intendedRoute");e?(sessionStorage.removeItem("intendedRoute"),this.navigate(e)):this.navigate("/admin")}init(){window.addEventListener("popstate",r=>{r.state&&r.state.path&&this.navigate(r.state.path,r.state.data||{})});const e=window.location.pathname,t=this.routes[e]?e:"/404";this.navigate(t)}}const G=new er;er.navigate=(s,e)=>G.navigate(s,e);const tr=document.createElement("style");tr.textContent=`
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
`;document.head.appendChild(tr);const rr=document.createElement("style");rr.textContent=`
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
`;document.head.appendChild(rr);var se=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Js(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}function _e(s){if(s.__esModule)return s;var e=s.default;if(typeof e=="function"){var t=function r(){return this instanceof r?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};t.prototype=e.prototype}else t={};return Object.defineProperty(t,"__esModule",{value:!0}),Object.keys(s).forEach(function(r){var n=Object.getOwnPropertyDescriptor(s,r);Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:function(){return s[r]}})}),t}var xt={},Le={},it=function(s,e){return it=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,r){t.__proto__=r}||function(t,r){for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])},it(s,e)};function sr(s,e){if(typeof e!="function"&&e!==null)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");it(s,e);function t(){this.constructor=s}s.prototype=e===null?Object.create(e):(t.prototype=e.prototype,new t)}var De=function(){return De=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++){t=arguments[r];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])}return e},De.apply(this,arguments)};function ge(s,e){var t={};for(var r in s)Object.prototype.hasOwnProperty.call(s,r)&&e.indexOf(r)<0&&(t[r]=s[r]);if(s!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,r=Object.getOwnPropertySymbols(s);n<r.length;n++)e.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(s,r[n])&&(t[r[n]]=s[r[n]]);return t}function nr(s,e,t,r){var n=arguments.length,i=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(s,e,t,r);else for(var o=s.length-1;o>=0;o--)(a=s[o])&&(i=(n<3?a(i):n>3?a(e,t,i):a(e,t))||i);return n>3&&i&&Object.defineProperty(e,t,i),i}function ir(s,e){return function(t,r){e(t,r,s)}}function ar(s,e,t,r,n,i){function a(b){if(b!==void 0&&typeof b!="function")throw new TypeError("Function expected");return b}for(var o=r.kind,l=o==="getter"?"get":o==="setter"?"set":"value",c=!e&&s?r.static?s:s.prototype:null,u=e||(c?Object.getOwnPropertyDescriptor(c,r.name):{}),h,f=!1,d=t.length-1;d>=0;d--){var g={};for(var m in r)g[m]=m==="access"?{}:r[m];for(var m in r.access)g.access[m]=r.access[m];g.addInitializer=function(b){if(f)throw new TypeError("Cannot add initializers after decoration has completed");i.push(a(b||null))};var p=(0,t[d])(o==="accessor"?{get:u.get,set:u.set}:u[l],g);if(o==="accessor"){if(p===void 0)continue;if(p===null||typeof p!="object")throw new TypeError("Object expected");(h=a(p.get))&&(u.get=h),(h=a(p.set))&&(u.set=h),(h=a(p.init))&&n.unshift(h)}else(h=a(p))&&(o==="field"?n.unshift(h):u[l]=h)}c&&Object.defineProperty(c,r.name,u),f=!0}function or(s,e,t){for(var r=arguments.length>2,n=0;n<e.length;n++)t=r?e[n].call(s,t):e[n].call(s);return r?t:void 0}function lr(s){return typeof s=="symbol"?s:"".concat(s)}function cr(s,e,t){return typeof e=="symbol"&&(e=e.description?"[".concat(e.description,"]"):""),Object.defineProperty(s,"name",{configurable:!0,value:t?"".concat(t," ",e):e})}function ur(s,e){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(s,e)}function y(s,e,t,r){function n(i){return i instanceof t?i:new t(function(a){a(i)})}return new(t||(t=Promise))(function(i,a){function o(u){try{c(r.next(u))}catch(h){a(h)}}function l(u){try{c(r.throw(u))}catch(h){a(h)}}function c(u){u.done?i(u.value):n(u.value).then(o,l)}c((r=r.apply(s,e||[])).next())})}function dr(s,e){var t={label:0,sent:function(){if(i[0]&1)throw i[1];return i[1]},trys:[],ops:[]},r,n,i,a=Object.create((typeof Iterator=="function"?Iterator:Object).prototype);return a.next=o(0),a.throw=o(1),a.return=o(2),typeof Symbol=="function"&&(a[Symbol.iterator]=function(){return this}),a;function o(c){return function(u){return l([c,u])}}function l(c){if(r)throw new TypeError("Generator is already executing.");for(;a&&(a=0,c[0]&&(t=0)),t;)try{if(r=1,n&&(i=c[0]&2?n.return:c[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,c[1])).done)return i;switch(n=0,i&&(c=[c[0]&2,i.value]),c[0]){case 0:case 1:i=c;break;case 4:return t.label++,{value:c[1],done:!1};case 5:t.label++,n=c[1],c=[0];continue;case 7:c=t.ops.pop(),t.trys.pop();continue;default:if(i=t.trys,!(i=i.length>0&&i[i.length-1])&&(c[0]===6||c[0]===2)){t=0;continue}if(c[0]===3&&(!i||c[1]>i[0]&&c[1]<i[3])){t.label=c[1];break}if(c[0]===6&&t.label<i[1]){t.label=i[1],i=c;break}if(i&&t.label<i[2]){t.label=i[2],t.ops.push(c);break}i[2]&&t.ops.pop(),t.trys.pop();continue}c=e.call(s,t)}catch(u){c=[6,u],n=0}finally{r=i=0}if(c[0]&5)throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}}var Ge=Object.create?function(s,e,t,r){r===void 0&&(r=t);var n=Object.getOwnPropertyDescriptor(e,t);(!n||("get"in n?!e.__esModule:n.writable||n.configurable))&&(n={enumerable:!0,get:function(){return e[t]}}),Object.defineProperty(s,r,n)}:function(s,e,t,r){r===void 0&&(r=t),s[r]=e[t]};function hr(s,e){for(var t in s)t!=="default"&&!Object.prototype.hasOwnProperty.call(e,t)&&Ge(e,s,t)}function Be(s){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&s[e],r=0;if(t)return t.call(s);if(s&&typeof s.length=="number")return{next:function(){return s&&r>=s.length&&(s=void 0),{value:s&&s[r++],done:!s}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function Et(s,e){var t=typeof Symbol=="function"&&s[Symbol.iterator];if(!t)return s;var r=t.call(s),n,i=[],a;try{for(;(e===void 0||e-- >0)&&!(n=r.next()).done;)i.push(n.value)}catch(o){a={error:o}}finally{try{n&&!n.done&&(t=r.return)&&t.call(r)}finally{if(a)throw a.error}}return i}function fr(){for(var s=[],e=0;e<arguments.length;e++)s=s.concat(Et(arguments[e]));return s}function gr(){for(var s=0,e=0,t=arguments.length;e<t;e++)s+=arguments[e].length;for(var r=Array(s),n=0,e=0;e<t;e++)for(var i=arguments[e],a=0,o=i.length;a<o;a++,n++)r[n]=i[a];return r}function pr(s,e,t){if(t||arguments.length===2)for(var r=0,n=e.length,i;r<n;r++)(i||!(r in e))&&(i||(i=Array.prototype.slice.call(e,0,r)),i[r]=e[r]);return s.concat(i||Array.prototype.slice.call(e))}function he(s){return this instanceof he?(this.v=s,this):new he(s)}function mr(s,e,t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r=t.apply(s,e||[]),n,i=[];return n=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),o("next"),o("throw"),o("return",a),n[Symbol.asyncIterator]=function(){return this},n;function a(d){return function(g){return Promise.resolve(g).then(d,h)}}function o(d,g){r[d]&&(n[d]=function(m){return new Promise(function(p,b){i.push([d,m,p,b])>1||l(d,m)})},g&&(n[d]=g(n[d])))}function l(d,g){try{c(r[d](g))}catch(m){f(i[0][3],m)}}function c(d){d.value instanceof he?Promise.resolve(d.value.v).then(u,h):f(i[0][2],d)}function u(d){l("next",d)}function h(d){l("throw",d)}function f(d,g){d(g),i.shift(),i.length&&l(i[0][0],i[0][1])}}function vr(s){var e,t;return e={},r("next"),r("throw",function(n){throw n}),r("return"),e[Symbol.iterator]=function(){return this},e;function r(n,i){e[n]=s[n]?function(a){return(t=!t)?{value:he(s[n](a)),done:!1}:i?i(a):a}:i}}function br(s){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e=s[Symbol.asyncIterator],t;return e?e.call(s):(s=typeof Be=="function"?Be(s):s[Symbol.iterator](),t={},r("next"),r("throw"),r("return"),t[Symbol.asyncIterator]=function(){return this},t);function r(i){t[i]=s[i]&&function(a){return new Promise(function(o,l){a=s[i](a),n(o,l,a.done,a.value)})}}function n(i,a,o,l){Promise.resolve(l).then(function(c){i({value:c,done:o})},a)}}function yr(s,e){return Object.defineProperty?Object.defineProperty(s,"raw",{value:e}):s.raw=e,s}var Ys=Object.create?function(s,e){Object.defineProperty(s,"default",{enumerable:!0,value:e})}:function(s,e){s.default=e},at=function(s){return at=Object.getOwnPropertyNames||function(e){var t=[];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[t.length]=r);return t},at(s)};function wr(s){if(s&&s.__esModule)return s;var e={};if(s!=null)for(var t=at(s),r=0;r<t.length;r++)t[r]!=="default"&&Ge(e,s,t[r]);return Ys(e,s),e}function _r(s){return s&&s.__esModule?s:{default:s}}function xr(s,e,t,r){if(t==="a"&&!r)throw new TypeError("Private accessor was defined without a getter");if(typeof e=="function"?s!==e||!r:!e.has(s))throw new TypeError("Cannot read private member from an object whose class did not declare it");return t==="m"?r:t==="a"?r.call(s):r?r.value:e.get(s)}function Er(s,e,t,r,n){if(r==="m")throw new TypeError("Private method is not writable");if(r==="a"&&!n)throw new TypeError("Private accessor was defined without a setter");if(typeof e=="function"?s!==e||!n:!e.has(s))throw new TypeError("Cannot write private member to an object whose class did not declare it");return r==="a"?n.call(s,t):n?n.value=t:e.set(s,t),t}function kr(s,e){if(e===null||typeof e!="object"&&typeof e!="function")throw new TypeError("Cannot use 'in' operator on non-object");return typeof s=="function"?e===s:s.has(e)}function Sr(s,e,t){if(e!=null){if(typeof e!="object"&&typeof e!="function")throw new TypeError("Object expected.");var r,n;if(t){if(!Symbol.asyncDispose)throw new TypeError("Symbol.asyncDispose is not defined.");r=e[Symbol.asyncDispose]}if(r===void 0){if(!Symbol.dispose)throw new TypeError("Symbol.dispose is not defined.");r=e[Symbol.dispose],t&&(n=r)}if(typeof r!="function")throw new TypeError("Object not disposable.");n&&(r=function(){try{n.call(this)}catch(i){return Promise.reject(i)}}),s.stack.push({value:e,dispose:r,async:t})}else t&&s.stack.push({async:!0});return e}var Qs=typeof SuppressedError=="function"?SuppressedError:function(s,e,t){var r=new Error(t);return r.name="SuppressedError",r.error=s,r.suppressed=e,r};function Or(s){function e(i){s.error=s.hasError?new Qs(i,s.error,"An error was suppressed during disposal."):i,s.hasError=!0}var t,r=0;function n(){for(;t=s.stack.pop();)try{if(!t.async&&r===1)return r=0,s.stack.push(t),Promise.resolve().then(n);if(t.dispose){var i=t.dispose.call(t.value);if(t.async)return r|=2,Promise.resolve(i).then(n,function(a){return e(a),n()})}else r|=1}catch(a){e(a)}if(r===1)return s.hasError?Promise.reject(s.error):Promise.resolve();if(s.hasError)throw s.error}return n()}function Tr(s,e){return typeof s=="string"&&/^\.\.?\//.test(s)?s.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i,function(t,r,n,i,a){return r?e?".jsx":".js":n&&(!i||!a)?t:n+i+"."+a.toLowerCase()+"js"}):s}const Xs={__extends:sr,__assign:De,__rest:ge,__decorate:nr,__param:ir,__esDecorate:ar,__runInitializers:or,__propKey:lr,__setFunctionName:cr,__metadata:ur,__awaiter:y,__generator:dr,__createBinding:Ge,__exportStar:hr,__values:Be,__read:Et,__spread:fr,__spreadArrays:gr,__spreadArray:pr,__await:he,__asyncGenerator:mr,__asyncDelegator:vr,__asyncValues:br,__makeTemplateObject:yr,__importStar:wr,__importDefault:_r,__classPrivateFieldGet:xr,__classPrivateFieldSet:Er,__classPrivateFieldIn:kr,__addDisposableResource:Sr,__disposeResources:Or,__rewriteRelativeImportExtension:Tr},Zs=Object.freeze(Object.defineProperty({__proto__:null,__addDisposableResource:Sr,get __assign(){return De},__asyncDelegator:vr,__asyncGenerator:mr,__asyncValues:br,__await:he,__awaiter:y,__classPrivateFieldGet:xr,__classPrivateFieldIn:kr,__classPrivateFieldSet:Er,__createBinding:Ge,__decorate:nr,__disposeResources:Or,__esDecorate:ar,__exportStar:hr,__extends:sr,__generator:dr,__importDefault:_r,__importStar:wr,__makeTemplateObject:yr,__metadata:ur,__param:ir,__propKey:lr,__read:Et,__rest:ge,__rewriteRelativeImportExtension:Tr,__runInitializers:or,__setFunctionName:cr,__spread:fr,__spreadArray:pr,__spreadArrays:gr,__values:Be,default:Xs},Symbol.toStringTag,{value:"Module"})),en=s=>s?(...e)=>s(...e):(...e)=>fetch(...e);let He=class extends Error{constructor(e,t="FunctionsError",r){super(e),this.name=t,this.context=r}},Ar=class extends He{constructor(e){super("Failed to send a request to the Edge Function","FunctionsFetchError",e)}},ot=class extends He{constructor(e){super("Relay Error invoking the Edge Function","FunctionsRelayError",e)}},lt=class extends He{constructor(e){super("Edge Function returned a non-2xx status code","FunctionsHttpError",e)}};var ze;(function(s){s.Any="any",s.ApNortheast1="ap-northeast-1",s.ApNortheast2="ap-northeast-2",s.ApSouth1="ap-south-1",s.ApSoutheast1="ap-southeast-1",s.ApSoutheast2="ap-southeast-2",s.CaCentral1="ca-central-1",s.EuCentral1="eu-central-1",s.EuWest1="eu-west-1",s.EuWest2="eu-west-2",s.EuWest3="eu-west-3",s.SaEast1="sa-east-1",s.UsEast1="us-east-1",s.UsWest1="us-west-1",s.UsWest2="us-west-2"})(ze||(ze={}));class tn{constructor(e,{headers:t={},customFetch:r,region:n=ze.Any}={}){this.url=e,this.headers=t,this.region=n,this.fetch=en(r)}setAuth(e){this.headers.Authorization=`Bearer ${e}`}invoke(e){return y(this,arguments,void 0,function*(t,r={}){var n;let i,a;try{const{headers:o,method:l,body:c,signal:u,timeout:h}=r;let f={},{region:d}=r;d||(d=this.region);const g=new URL(`${this.url}/${t}`);d&&d!=="any"&&(f["x-region"]=d,g.searchParams.set("forceFunctionRegion",d));let m;c&&(o&&!Object.prototype.hasOwnProperty.call(o,"Content-Type")||!o)?typeof Blob<"u"&&c instanceof Blob||c instanceof ArrayBuffer?(f["Content-Type"]="application/octet-stream",m=c):typeof c=="string"?(f["Content-Type"]="text/plain",m=c):typeof FormData<"u"&&c instanceof FormData?m=c:(f["Content-Type"]="application/json",m=JSON.stringify(c)):m=c;let p=u;h&&(a=new AbortController,i=setTimeout(()=>a.abort(),h),u?(p=a.signal,u.addEventListener("abort",()=>a.abort())):p=a.signal);const b=yield this.fetch(g.toString(),{method:l||"POST",headers:Object.assign(Object.assign(Object.assign({},f),this.headers),o),body:m,signal:p}).catch(T=>{throw new Ar(T)}),_=b.headers.get("x-relay-error");if(_&&_==="true")throw new ot(b);if(!b.ok)throw new lt(b);let v=((n=b.headers.get("Content-Type"))!==null&&n!==void 0?n:"text/plain").split(";")[0].trim(),E;return v==="application/json"?E=yield b.json():v==="application/octet-stream"||v==="application/pdf"?E=yield b.blob():v==="text/event-stream"?E=b:v==="multipart/form-data"?E=yield b.formData():E=yield b.text(),{data:E,error:null,response:b}}catch(o){return{data:null,error:o,response:o instanceof lt||o instanceof ot?o.context:void 0}}finally{i&&clearTimeout(i)}})}}const rn=Object.freeze(Object.defineProperty({__proto__:null,get FunctionRegion(){return ze},FunctionsClient:tn,FunctionsError:He,FunctionsFetchError:Ar,FunctionsHttpError:lt,FunctionsRelayError:ot},Symbol.toStringTag,{value:"Module"})),Rr=_e(rn);var I={};const pe=_e(Zs);var ke={},Se={},Oe={},Te={},Ae={},Re={},Ct;function jr(){if(Ct)return Re;Ct=1,Object.defineProperty(Re,"__esModule",{value:!0});class s extends Error{constructor(t){super(t.message),this.name="PostgrestError",this.details=t.details,this.hint=t.hint,this.code=t.code}}return Re.default=s,Re}var It;function Pr(){if(It)return Ae;It=1,Object.defineProperty(Ae,"__esModule",{value:!0});const e=pe.__importDefault(jr());let t=class{constructor(n){var i,a;this.shouldThrowOnError=!1,this.method=n.method,this.url=n.url,this.headers=new Headers(n.headers),this.schema=n.schema,this.body=n.body,this.shouldThrowOnError=(i=n.shouldThrowOnError)!==null&&i!==void 0?i:!1,this.signal=n.signal,this.isMaybeSingle=(a=n.isMaybeSingle)!==null&&a!==void 0?a:!1,n.fetch?this.fetch=n.fetch:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(n,i){return this.headers=new Headers(this.headers),this.headers.set(n,i),this}then(n,i){this.schema===void 0||(["GET","HEAD"].includes(this.method)?this.headers.set("Accept-Profile",this.schema):this.headers.set("Content-Profile",this.schema)),this.method!=="GET"&&this.method!=="HEAD"&&this.headers.set("Content-Type","application/json");const a=this.fetch;let o=a(this.url.toString(),{method:this.method,headers:this.headers,body:JSON.stringify(this.body),signal:this.signal}).then(async l=>{var c,u,h,f;let d=null,g=null,m=null,p=l.status,b=l.statusText;if(l.ok){if(this.method!=="HEAD"){const T=await l.text();T===""||(this.headers.get("Accept")==="text/csv"||this.headers.get("Accept")&&(!((c=this.headers.get("Accept"))===null||c===void 0)&&c.includes("application/vnd.pgrst.plan+text"))?g=T:g=JSON.parse(T))}const v=(u=this.headers.get("Prefer"))===null||u===void 0?void 0:u.match(/count=(exact|planned|estimated)/),E=(h=l.headers.get("content-range"))===null||h===void 0?void 0:h.split("/");v&&E&&E.length>1&&(m=parseInt(E[1])),this.isMaybeSingle&&this.method==="GET"&&Array.isArray(g)&&(g.length>1?(d={code:"PGRST116",details:`Results contain ${g.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:"JSON object requested, multiple (or no) rows returned"},g=null,m=null,p=406,b="Not Acceptable"):g.length===1?g=g[0]:g=null)}else{const v=await l.text();try{d=JSON.parse(v),Array.isArray(d)&&l.status===404&&(g=[],d=null,p=200,b="OK")}catch{l.status===404&&v===""?(p=204,b="No Content"):d={message:v}}if(d&&this.isMaybeSingle&&(!((f=d==null?void 0:d.details)===null||f===void 0)&&f.includes("0 rows"))&&(d=null,p=200,b="OK"),d&&this.shouldThrowOnError)throw new e.default(d)}return{error:d,data:g,count:m,status:p,statusText:b}});return this.shouldThrowOnError||(o=o.catch(l=>{var c,u,h,f,d,g;let m="";const p=l==null?void 0:l.cause;if(p){const b=(c=p==null?void 0:p.message)!==null&&c!==void 0?c:"",_=(u=p==null?void 0:p.code)!==null&&u!==void 0?u:"";m=`${(h=l==null?void 0:l.name)!==null&&h!==void 0?h:"FetchError"}: ${l==null?void 0:l.message}`,m+=`

Caused by: ${(f=p==null?void 0:p.name)!==null&&f!==void 0?f:"Error"}: ${b}`,_&&(m+=` (${_})`),p!=null&&p.stack&&(m+=`
${p.stack}`)}else m=(d=l==null?void 0:l.stack)!==null&&d!==void 0?d:"";return{error:{message:`${(g=l==null?void 0:l.name)!==null&&g!==void 0?g:"FetchError"}: ${l==null?void 0:l.message}`,details:m,hint:"",code:""},data:null,count:null,status:0,statusText:""}})),o.then(n,i)}returns(){return this}overrideTypes(){return this}};return Ae.default=t,Ae}var $t;function Cr(){if($t)return Te;$t=1,Object.defineProperty(Te,"__esModule",{value:!0});const e=pe.__importDefault(Pr());let t=class extends e.default{select(n){let i=!1;const a=(n??"*").split("").map(o=>/\s/.test(o)&&!i?"":(o==='"'&&(i=!i),o)).join("");return this.url.searchParams.set("select",a),this.headers.append("Prefer","return=representation"),this}order(n,{ascending:i=!0,nullsFirst:a,foreignTable:o,referencedTable:l=o}={}){const c=l?`${l}.order`:"order",u=this.url.searchParams.get(c);return this.url.searchParams.set(c,`${u?`${u},`:""}${n}.${i?"asc":"desc"}${a===void 0?"":a?".nullsfirst":".nullslast"}`),this}limit(n,{foreignTable:i,referencedTable:a=i}={}){const o=typeof a>"u"?"limit":`${a}.limit`;return this.url.searchParams.set(o,`${n}`),this}range(n,i,{foreignTable:a,referencedTable:o=a}={}){const l=typeof o>"u"?"offset":`${o}.offset`,c=typeof o>"u"?"limit":`${o}.limit`;return this.url.searchParams.set(l,`${n}`),this.url.searchParams.set(c,`${i-n+1}`),this}abortSignal(n){return this.signal=n,this}single(){return this.headers.set("Accept","application/vnd.pgrst.object+json"),this}maybeSingle(){return this.method==="GET"?this.headers.set("Accept","application/json"):this.headers.set("Accept","application/vnd.pgrst.object+json"),this.isMaybeSingle=!0,this}csv(){return this.headers.set("Accept","text/csv"),this}geojson(){return this.headers.set("Accept","application/geo+json"),this}explain({analyze:n=!1,verbose:i=!1,settings:a=!1,buffers:o=!1,wal:l=!1,format:c="text"}={}){var u;const h=[n?"analyze":null,i?"verbose":null,a?"settings":null,o?"buffers":null,l?"wal":null].filter(Boolean).join("|"),f=(u=this.headers.get("Accept"))!==null&&u!==void 0?u:"application/json";return this.headers.set("Accept",`application/vnd.pgrst.plan+${c}; for="${f}"; options=${h};`),c==="json"?this:this}rollback(){return this.headers.append("Prefer","tx=rollback"),this}returns(){return this}maxAffected(n){return this.headers.append("Prefer","handling=strict"),this.headers.append("Prefer",`max-affected=${n}`),this}};return Te.default=t,Te}var Ut;function kt(){if(Ut)return Oe;Ut=1,Object.defineProperty(Oe,"__esModule",{value:!0});const e=pe.__importDefault(Cr()),t=new RegExp("[,()]");let r=class extends e.default{eq(i,a){return this.url.searchParams.append(i,`eq.${a}`),this}neq(i,a){return this.url.searchParams.append(i,`neq.${a}`),this}gt(i,a){return this.url.searchParams.append(i,`gt.${a}`),this}gte(i,a){return this.url.searchParams.append(i,`gte.${a}`),this}lt(i,a){return this.url.searchParams.append(i,`lt.${a}`),this}lte(i,a){return this.url.searchParams.append(i,`lte.${a}`),this}like(i,a){return this.url.searchParams.append(i,`like.${a}`),this}likeAllOf(i,a){return this.url.searchParams.append(i,`like(all).{${a.join(",")}}`),this}likeAnyOf(i,a){return this.url.searchParams.append(i,`like(any).{${a.join(",")}}`),this}ilike(i,a){return this.url.searchParams.append(i,`ilike.${a}`),this}ilikeAllOf(i,a){return this.url.searchParams.append(i,`ilike(all).{${a.join(",")}}`),this}ilikeAnyOf(i,a){return this.url.searchParams.append(i,`ilike(any).{${a.join(",")}}`),this}regexMatch(i,a){return this.url.searchParams.append(i,`match.${a}`),this}regexIMatch(i,a){return this.url.searchParams.append(i,`imatch.${a}`),this}is(i,a){return this.url.searchParams.append(i,`is.${a}`),this}isDistinct(i,a){return this.url.searchParams.append(i,`isdistinct.${a}`),this}in(i,a){const o=Array.from(new Set(a)).map(l=>typeof l=="string"&&t.test(l)?`"${l}"`:`${l}`).join(",");return this.url.searchParams.append(i,`in.(${o})`),this}contains(i,a){return typeof a=="string"?this.url.searchParams.append(i,`cs.${a}`):Array.isArray(a)?this.url.searchParams.append(i,`cs.{${a.join(",")}}`):this.url.searchParams.append(i,`cs.${JSON.stringify(a)}`),this}containedBy(i,a){return typeof a=="string"?this.url.searchParams.append(i,`cd.${a}`):Array.isArray(a)?this.url.searchParams.append(i,`cd.{${a.join(",")}}`):this.url.searchParams.append(i,`cd.${JSON.stringify(a)}`),this}rangeGt(i,a){return this.url.searchParams.append(i,`sr.${a}`),this}rangeGte(i,a){return this.url.searchParams.append(i,`nxl.${a}`),this}rangeLt(i,a){return this.url.searchParams.append(i,`sl.${a}`),this}rangeLte(i,a){return this.url.searchParams.append(i,`nxr.${a}`),this}rangeAdjacent(i,a){return this.url.searchParams.append(i,`adj.${a}`),this}overlaps(i,a){return typeof a=="string"?this.url.searchParams.append(i,`ov.${a}`):this.url.searchParams.append(i,`ov.{${a.join(",")}}`),this}textSearch(i,a,{config:o,type:l}={}){let c="";l==="plain"?c="pl":l==="phrase"?c="ph":l==="websearch"&&(c="w");const u=o===void 0?"":`(${o})`;return this.url.searchParams.append(i,`${c}fts${u}.${a}`),this}match(i){return Object.entries(i).forEach(([a,o])=>{this.url.searchParams.append(a,`eq.${o}`)}),this}not(i,a,o){return this.url.searchParams.append(i,`not.${a}.${o}`),this}or(i,{foreignTable:a,referencedTable:o=a}={}){const l=o?`${o}.or`:"or";return this.url.searchParams.append(l,`(${i})`),this}filter(i,a,o){return this.url.searchParams.append(i,`${a}.${o}`),this}};return Oe.default=r,Oe}var Nt;function Ir(){if(Nt)return Se;Nt=1,Object.defineProperty(Se,"__esModule",{value:!0});const e=pe.__importDefault(kt());let t=class{constructor(n,{headers:i={},schema:a,fetch:o}){this.url=n,this.headers=new Headers(i),this.schema=a,this.fetch=o}select(n,i){const{head:a=!1,count:o}=i??{},l=a?"HEAD":"GET";let c=!1;const u=(n??"*").split("").map(h=>/\s/.test(h)&&!c?"":(h==='"'&&(c=!c),h)).join("");return this.url.searchParams.set("select",u),o&&this.headers.append("Prefer",`count=${o}`),new e.default({method:l,url:this.url,headers:this.headers,schema:this.schema,fetch:this.fetch})}insert(n,{count:i,defaultToNull:a=!0}={}){var o;const l="POST";if(i&&this.headers.append("Prefer",`count=${i}`),a||this.headers.append("Prefer","missing=default"),Array.isArray(n)){const c=n.reduce((u,h)=>u.concat(Object.keys(h)),[]);if(c.length>0){const u=[...new Set(c)].map(h=>`"${h}"`);this.url.searchParams.set("columns",u.join(","))}}return new e.default({method:l,url:this.url,headers:this.headers,schema:this.schema,body:n,fetch:(o=this.fetch)!==null&&o!==void 0?o:fetch})}upsert(n,{onConflict:i,ignoreDuplicates:a=!1,count:o,defaultToNull:l=!0}={}){var c;const u="POST";if(this.headers.append("Prefer",`resolution=${a?"ignore":"merge"}-duplicates`),i!==void 0&&this.url.searchParams.set("on_conflict",i),o&&this.headers.append("Prefer",`count=${o}`),l||this.headers.append("Prefer","missing=default"),Array.isArray(n)){const h=n.reduce((f,d)=>f.concat(Object.keys(d)),[]);if(h.length>0){const f=[...new Set(h)].map(d=>`"${d}"`);this.url.searchParams.set("columns",f.join(","))}}return new e.default({method:u,url:this.url,headers:this.headers,schema:this.schema,body:n,fetch:(c=this.fetch)!==null&&c!==void 0?c:fetch})}update(n,{count:i}={}){var a;const o="PATCH";return i&&this.headers.append("Prefer",`count=${i}`),new e.default({method:o,url:this.url,headers:this.headers,schema:this.schema,body:n,fetch:(a=this.fetch)!==null&&a!==void 0?a:fetch})}delete({count:n}={}){var i;const a="DELETE";return n&&this.headers.append("Prefer",`count=${n}`),new e.default({method:a,url:this.url,headers:this.headers,schema:this.schema,fetch:(i=this.fetch)!==null&&i!==void 0?i:fetch})}};return Se.default=t,Se}var Lt;function sn(){if(Lt)return ke;Lt=1,Object.defineProperty(ke,"__esModule",{value:!0});const s=pe,e=s.__importDefault(Ir()),t=s.__importDefault(kt());let r=class $r{constructor(i,{headers:a={},schema:o,fetch:l}={}){this.url=i,this.headers=new Headers(a),this.schemaName=o,this.fetch=l}from(i){if(!i||typeof i!="string"||i.trim()==="")throw new Error("Invalid relation name: relation must be a non-empty string.");const a=new URL(`${this.url}/${i}`);return new e.default(a,{headers:new Headers(this.headers),schema:this.schemaName,fetch:this.fetch})}schema(i){return new $r(this.url,{headers:this.headers,schema:i,fetch:this.fetch})}rpc(i,a={},{head:o=!1,get:l=!1,count:c}={}){var u;let h;const f=new URL(`${this.url}/rpc/${i}`);let d;o||l?(h=o?"HEAD":"GET",Object.entries(a).filter(([m,p])=>p!==void 0).map(([m,p])=>[m,Array.isArray(p)?`{${p.join(",")}}`:`${p}`]).forEach(([m,p])=>{f.searchParams.append(m,p)})):(h="POST",d=a);const g=new Headers(this.headers);return c&&g.set("Prefer",`count=${c}`),new t.default({method:h,url:f,headers:g,schema:this.schemaName,body:d,fetch:(u=this.fetch)!==null&&u!==void 0?u:fetch})}};return ke.default=r,ke}Object.defineProperty(I,"__esModule",{value:!0});I.PostgrestError=I.PostgrestBuilder=I.PostgrestTransformBuilder=I.PostgrestFilterBuilder=I.PostgrestQueryBuilder=I.PostgrestClient=void 0;const me=pe,Ur=me.__importDefault(sn());I.PostgrestClient=Ur.default;const Nr=me.__importDefault(Ir());I.PostgrestQueryBuilder=Nr.default;const Lr=me.__importDefault(kt());I.PostgrestFilterBuilder=Lr.default;const Dr=me.__importDefault(Cr());I.PostgrestTransformBuilder=Dr.default;const Br=me.__importDefault(Pr());I.PostgrestBuilder=Br.default;const zr=me.__importDefault(jr());I.PostgrestError=zr.default;I.default={PostgrestClient:Ur.default,PostgrestQueryBuilder:Nr.default,PostgrestFilterBuilder:Lr.default,PostgrestTransformBuilder:Dr.default,PostgrestBuilder:Br.default,PostgrestError:zr.default};class qr{constructor(){}static detectEnvironment(){var e;if(typeof WebSocket<"u")return{type:"native",constructor:WebSocket};if(typeof globalThis<"u"&&typeof globalThis.WebSocket<"u")return{type:"native",constructor:globalThis.WebSocket};if(typeof global<"u"&&typeof global.WebSocket<"u")return{type:"native",constructor:global.WebSocket};if(typeof globalThis<"u"&&typeof globalThis.WebSocketPair<"u"&&typeof globalThis.WebSocket>"u")return{type:"cloudflare",error:"Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",workaround:"Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."};if(typeof globalThis<"u"&&globalThis.EdgeRuntime||typeof navigator<"u"&&(!((e=navigator.userAgent)===null||e===void 0)&&e.includes("Vercel-Edge")))return{type:"unsupported",error:"Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",workaround:"Use serverless functions or a different deployment target for WebSocket functionality."};if(typeof process<"u"){const t=process.versions;if(t&&t.node){const r=t.node,n=parseInt(r.replace(/^v/,"").split(".")[0]);return n>=22?typeof globalThis.WebSocket<"u"?{type:"native",constructor:globalThis.WebSocket}:{type:"unsupported",error:`Node.js ${n} detected but native WebSocket not found.`,workaround:"Provide a WebSocket implementation via the transport option."}:{type:"unsupported",error:`Node.js ${n} detected without native WebSocket support.`,workaround:`For Node.js < 22, install "ws" package and provide it via the transport option:
import ws from "ws"
new RealtimeClient(url, { transport: ws })`}}}return{type:"unsupported",error:"Unknown JavaScript runtime without WebSocket support.",workaround:"Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."}}static getWebSocketConstructor(){const e=this.detectEnvironment();if(e.constructor)return e.constructor;let t=e.error||"WebSocket not supported in this environment.";throw e.workaround&&(t+=`

Suggested solution: ${e.workaround}`),new Error(t)}static createWebSocket(e,t){const r=this.getWebSocketConstructor();return new r(e,t)}static isWebSocketSupported(){try{const e=this.detectEnvironment();return e.type==="native"||e.type==="ws"}catch{return!1}}}const nn="2.86.2",an=`realtime-js/${nn}`,Fr="1.0.0",on="2.0.0",Dt=Fr,ct=1e4,ln=1e3,cn=100;var ee;(function(s){s[s.connecting=0]="connecting",s[s.open=1]="open",s[s.closing=2]="closing",s[s.closed=3]="closed"})(ee||(ee={}));var A;(function(s){s.closed="closed",s.errored="errored",s.joined="joined",s.joining="joining",s.leaving="leaving"})(A||(A={}));var B;(function(s){s.close="phx_close",s.error="phx_error",s.join="phx_join",s.reply="phx_reply",s.leave="phx_leave",s.access_token="access_token"})(B||(B={}));var ut;(function(s){s.websocket="websocket"})(ut||(ut={}));var te;(function(s){s.Connecting="connecting",s.Open="open",s.Closing="closing",s.Closed="closed"})(te||(te={}));class un{constructor(e){this.HEADER_LENGTH=1,this.USER_BROADCAST_PUSH_META_LENGTH=6,this.KINDS={userBroadcastPush:3,userBroadcast:4},this.BINARY_ENCODING=0,this.JSON_ENCODING=1,this.BROADCAST_EVENT="broadcast",this.allowedMetadataKeys=[],this.allowedMetadataKeys=e??[]}encode(e,t){if(e.event===this.BROADCAST_EVENT&&!(e.payload instanceof ArrayBuffer)&&typeof e.payload.event=="string")return t(this._binaryEncodeUserBroadcastPush(e));let r=[e.join_ref,e.ref,e.topic,e.event,e.payload];return t(JSON.stringify(r))}_binaryEncodeUserBroadcastPush(e){var t;return this._isArrayBuffer((t=e.payload)===null||t===void 0?void 0:t.payload)?this._encodeBinaryUserBroadcastPush(e):this._encodeJsonUserBroadcastPush(e)}_encodeBinaryUserBroadcastPush(e){var t,r;const n=(r=(t=e.payload)===null||t===void 0?void 0:t.payload)!==null&&r!==void 0?r:new ArrayBuffer(0);return this._encodeUserBroadcastPush(e,this.BINARY_ENCODING,n)}_encodeJsonUserBroadcastPush(e){var t,r;const n=(r=(t=e.payload)===null||t===void 0?void 0:t.payload)!==null&&r!==void 0?r:{},a=new TextEncoder().encode(JSON.stringify(n)).buffer;return this._encodeUserBroadcastPush(e,this.JSON_ENCODING,a)}_encodeUserBroadcastPush(e,t,r){var n,i;const a=e.topic,o=(n=e.ref)!==null&&n!==void 0?n:"",l=(i=e.join_ref)!==null&&i!==void 0?i:"",c=e.payload.event,u=this.allowedMetadataKeys?this._pick(e.payload,this.allowedMetadataKeys):{},h=Object.keys(u).length===0?"":JSON.stringify(u);if(l.length>255)throw new Error(`joinRef length ${l.length} exceeds maximum of 255`);if(o.length>255)throw new Error(`ref length ${o.length} exceeds maximum of 255`);if(a.length>255)throw new Error(`topic length ${a.length} exceeds maximum of 255`);if(c.length>255)throw new Error(`userEvent length ${c.length} exceeds maximum of 255`);if(h.length>255)throw new Error(`metadata length ${h.length} exceeds maximum of 255`);const f=this.USER_BROADCAST_PUSH_META_LENGTH+l.length+o.length+a.length+c.length+h.length,d=new ArrayBuffer(this.HEADER_LENGTH+f);let g=new DataView(d),m=0;g.setUint8(m++,this.KINDS.userBroadcastPush),g.setUint8(m++,l.length),g.setUint8(m++,o.length),g.setUint8(m++,a.length),g.setUint8(m++,c.length),g.setUint8(m++,h.length),g.setUint8(m++,t),Array.from(l,b=>g.setUint8(m++,b.charCodeAt(0))),Array.from(o,b=>g.setUint8(m++,b.charCodeAt(0))),Array.from(a,b=>g.setUint8(m++,b.charCodeAt(0))),Array.from(c,b=>g.setUint8(m++,b.charCodeAt(0))),Array.from(h,b=>g.setUint8(m++,b.charCodeAt(0)));var p=new Uint8Array(d.byteLength+r.byteLength);return p.set(new Uint8Array(d),0),p.set(new Uint8Array(r),d.byteLength),p.buffer}decode(e,t){if(this._isArrayBuffer(e)){let r=this._binaryDecode(e);return t(r)}if(typeof e=="string"){const r=JSON.parse(e),[n,i,a,o,l]=r;return t({join_ref:n,ref:i,topic:a,event:o,payload:l})}return t({})}_binaryDecode(e){const t=new DataView(e),r=t.getUint8(0),n=new TextDecoder;switch(r){case this.KINDS.userBroadcast:return this._decodeUserBroadcast(e,t,n)}}_decodeUserBroadcast(e,t,r){const n=t.getUint8(1),i=t.getUint8(2),a=t.getUint8(3),o=t.getUint8(4);let l=this.HEADER_LENGTH+4;const c=r.decode(e.slice(l,l+n));l=l+n;const u=r.decode(e.slice(l,l+i));l=l+i;const h=r.decode(e.slice(l,l+a));l=l+a;const f=e.slice(l,e.byteLength),d=o===this.JSON_ENCODING?JSON.parse(r.decode(f)):f,g={type:this.BROADCAST_EVENT,event:u,payload:d};return a>0&&(g.meta=JSON.parse(h)),{join_ref:null,ref:null,topic:c,event:this.BROADCAST_EVENT,payload:g}}_isArrayBuffer(e){var t;return e instanceof ArrayBuffer||((t=e==null?void 0:e.constructor)===null||t===void 0?void 0:t.name)==="ArrayBuffer"}_pick(e,t){return!e||typeof e!="object"?{}:Object.fromEntries(Object.entries(e).filter(([r])=>t.includes(r)))}}class Mr{constructor(e,t){this.callback=e,this.timerCalc=t,this.timer=void 0,this.tries=0,this.callback=e,this.timerCalc=t}reset(){this.tries=0,clearTimeout(this.timer),this.timer=void 0}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries=this.tries+1,this.callback()},this.timerCalc(this.tries+1))}}var S;(function(s){s.abstime="abstime",s.bool="bool",s.date="date",s.daterange="daterange",s.float4="float4",s.float8="float8",s.int2="int2",s.int4="int4",s.int4range="int4range",s.int8="int8",s.int8range="int8range",s.json="json",s.jsonb="jsonb",s.money="money",s.numeric="numeric",s.oid="oid",s.reltime="reltime",s.text="text",s.time="time",s.timestamp="timestamp",s.timestamptz="timestamptz",s.timetz="timetz",s.tsrange="tsrange",s.tstzrange="tstzrange"})(S||(S={}));const Bt=(s,e,t={})=>{var r;const n=(r=t.skipTypes)!==null&&r!==void 0?r:[];return e?Object.keys(e).reduce((i,a)=>(i[a]=dn(a,s,e,n),i),{}):{}},dn=(s,e,t,r)=>{const n=e.find(o=>o.name===s),i=n==null?void 0:n.type,a=t[s];return i&&!r.includes(i)?Wr(i,a):dt(a)},Wr=(s,e)=>{if(s.charAt(0)==="_"){const t=s.slice(1,s.length);return pn(e,t)}switch(s){case S.bool:return hn(e);case S.float4:case S.float8:case S.int2:case S.int4:case S.int8:case S.numeric:case S.oid:return fn(e);case S.json:case S.jsonb:return gn(e);case S.timestamp:return mn(e);case S.abstime:case S.date:case S.daterange:case S.int4range:case S.int8range:case S.money:case S.reltime:case S.text:case S.time:case S.timestamptz:case S.timetz:case S.tsrange:case S.tstzrange:return dt(e);default:return dt(e)}},dt=s=>s,hn=s=>{switch(s){case"t":return!0;case"f":return!1;default:return s}},fn=s=>{if(typeof s=="string"){const e=parseFloat(s);if(!Number.isNaN(e))return e}return s},gn=s=>{if(typeof s=="string")try{return JSON.parse(s)}catch(e){return console.log(`JSON parse error: ${e}`),s}return s},pn=(s,e)=>{if(typeof s!="string")return s;const t=s.length-1,r=s[t];if(s[0]==="{"&&r==="}"){let i;const a=s.slice(1,t);try{i=JSON.parse("["+a+"]")}catch{i=a?a.split(","):[]}return i.map(o=>Wr(e,o))}return s},mn=s=>typeof s=="string"?s.replace(" ","T"):s,Vr=s=>{const e=new URL(s);return e.protocol=e.protocol.replace(/^ws/i,"http"),e.pathname=e.pathname.replace(/\/+$/,"").replace(/\/socket\/websocket$/i,"").replace(/\/socket$/i,"").replace(/\/websocket$/i,""),e.pathname===""||e.pathname==="/"?e.pathname="/api/broadcast":e.pathname=e.pathname+"/api/broadcast",e.href};class Ze{constructor(e,t,r={},n=ct){this.channel=e,this.event=t,this.payload=r,this.timeout=n,this.sent=!1,this.timeoutTimer=void 0,this.ref="",this.receivedResp=null,this.recHooks=[],this.refEvent=null}resend(e){this.timeout=e,this._cancelRefEvent(),this.ref="",this.refEvent=null,this.receivedResp=null,this.sent=!1,this.send()}send(){this._hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload,ref:this.ref,join_ref:this.channel._joinRef()}))}updatePayload(e){this.payload=Object.assign(Object.assign({},this.payload),e)}receive(e,t){var r;return this._hasReceived(e)&&t((r=this.receivedResp)===null||r===void 0?void 0:r.response),this.recHooks.push({status:e,callback:t}),this}startTimeout(){if(this.timeoutTimer)return;this.ref=this.channel.socket._makeRef(),this.refEvent=this.channel._replyEventName(this.ref);const e=t=>{this._cancelRefEvent(),this._cancelTimeout(),this.receivedResp=t,this._matchReceive(t)};this.channel._on(this.refEvent,{},e),this.timeoutTimer=setTimeout(()=>{this.trigger("timeout",{})},this.timeout)}trigger(e,t){this.refEvent&&this.channel._trigger(this.refEvent,{status:e,response:t})}destroy(){this._cancelRefEvent(),this._cancelTimeout()}_cancelRefEvent(){this.refEvent&&this.channel._off(this.refEvent,{})}_cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=void 0}_matchReceive({status:e,response:t}){this.recHooks.filter(r=>r.status===e).forEach(r=>r.callback(t))}_hasReceived(e){return this.receivedResp&&this.receivedResp.status===e}}var ht;(function(s){s.SYNC="sync",s.JOIN="join",s.LEAVE="leave"})(ht||(ht={}));let Kr=class Ie{constructor(e,t){this.channel=e,this.state={},this.pendingDiffs=[],this.joinRef=null,this.enabled=!1,this.caller={onJoin:()=>{},onLeave:()=>{},onSync:()=>{}};const r=(t==null?void 0:t.events)||{state:"presence_state",diff:"presence_diff"};this.channel._on(r.state,{},n=>{const{onJoin:i,onLeave:a,onSync:o}=this.caller;this.joinRef=this.channel._joinRef(),this.state=Ie.syncState(this.state,n,i,a),this.pendingDiffs.forEach(l=>{this.state=Ie.syncDiff(this.state,l,i,a)}),this.pendingDiffs=[],o()}),this.channel._on(r.diff,{},n=>{const{onJoin:i,onLeave:a,onSync:o}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(n):(this.state=Ie.syncDiff(this.state,n,i,a),o())}),this.onJoin((n,i,a)=>{this.channel._trigger("presence",{event:"join",key:n,currentPresences:i,newPresences:a})}),this.onLeave((n,i,a)=>{this.channel._trigger("presence",{event:"leave",key:n,currentPresences:i,leftPresences:a})}),this.onSync(()=>{this.channel._trigger("presence",{event:"sync"})})}static syncState(e,t,r,n){const i=this.cloneDeep(e),a=this.transformState(t),o={},l={};return this.map(i,(c,u)=>{a[c]||(l[c]=u)}),this.map(a,(c,u)=>{const h=i[c];if(h){const f=u.map(p=>p.presence_ref),d=h.map(p=>p.presence_ref),g=u.filter(p=>d.indexOf(p.presence_ref)<0),m=h.filter(p=>f.indexOf(p.presence_ref)<0);g.length>0&&(o[c]=g),m.length>0&&(l[c]=m)}else o[c]=u}),this.syncDiff(i,{joins:o,leaves:l},r,n)}static syncDiff(e,t,r,n){const{joins:i,leaves:a}={joins:this.transformState(t.joins),leaves:this.transformState(t.leaves)};return r||(r=()=>{}),n||(n=()=>{}),this.map(i,(o,l)=>{var c;const u=(c=e[o])!==null&&c!==void 0?c:[];if(e[o]=this.cloneDeep(l),u.length>0){const h=e[o].map(d=>d.presence_ref),f=u.filter(d=>h.indexOf(d.presence_ref)<0);e[o].unshift(...f)}r(o,u,l)}),this.map(a,(o,l)=>{let c=e[o];if(!c)return;const u=l.map(h=>h.presence_ref);c=c.filter(h=>u.indexOf(h.presence_ref)<0),e[o]=c,n(o,c,l),c.length===0&&delete e[o]}),e}static map(e,t){return Object.getOwnPropertyNames(e).map(r=>t(r,e[r]))}static transformState(e){return e=this.cloneDeep(e),Object.getOwnPropertyNames(e).reduce((t,r)=>{const n=e[r];return"metas"in n?t[r]=n.metas.map(i=>(i.presence_ref=i.phx_ref,delete i.phx_ref,delete i.phx_ref_prev,i)):t[r]=n,t},{})}static cloneDeep(e){return JSON.parse(JSON.stringify(e))}onJoin(e){this.caller.onJoin=e}onLeave(e){this.caller.onLeave=e}onSync(e){this.caller.onSync=e}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel._joinRef()}};var ft;(function(s){s.ALL="*",s.INSERT="INSERT",s.UPDATE="UPDATE",s.DELETE="DELETE"})(ft||(ft={}));var ue;(function(s){s.BROADCAST="broadcast",s.PRESENCE="presence",s.POSTGRES_CHANGES="postgres_changes",s.SYSTEM="system"})(ue||(ue={}));var q;(function(s){s.SUBSCRIBED="SUBSCRIBED",s.TIMED_OUT="TIMED_OUT",s.CLOSED="CLOSED",s.CHANNEL_ERROR="CHANNEL_ERROR"})(q||(q={}));const vn=A;let Gr=class Hr{constructor(e,t={config:{}},r){var n,i;if(this.topic=e,this.params=t,this.socket=r,this.bindings={},this.state=A.closed,this.joinedOnce=!1,this.pushBuffer=[],this.subTopic=e.replace(/^realtime:/i,""),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},t.config),this.timeout=this.socket.timeout,this.joinPush=new Ze(this,B.join,this.params,this.timeout),this.rejoinTimer=new Mr(()=>this._rejoinUntilConnected(),this.socket.reconnectAfterMs),this.joinPush.receive("ok",()=>{this.state=A.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(a=>a.send()),this.pushBuffer=[]}),this._onClose(()=>{this.rejoinTimer.reset(),this.socket.log("channel",`close ${this.topic} ${this._joinRef()}`),this.state=A.closed,this.socket._remove(this)}),this._onError(a=>{this._isLeaving()||this._isClosed()||(this.socket.log("channel",`error ${this.topic}`,a),this.state=A.errored,this.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("timeout",()=>{this._isJoining()&&(this.socket.log("channel",`timeout ${this.topic}`,this.joinPush.timeout),this.state=A.errored,this.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("error",a=>{this._isLeaving()||this._isClosed()||(this.socket.log("channel",`error ${this.topic}`,a),this.state=A.errored,this.rejoinTimer.scheduleTimeout())}),this._on(B.reply,{},(a,o)=>{this._trigger(this._replyEventName(o),a)}),this.presence=new Kr(this),this.broadcastEndpointURL=Vr(this.socket.endPoint),this.private=this.params.config.private||!1,!this.private&&(!((i=(n=this.params.config)===null||n===void 0?void 0:n.broadcast)===null||i===void 0)&&i.replay))throw`tried to use replay on public channel '${this.topic}'. It must be a private channel.`}subscribe(e,t=this.timeout){var r,n,i;if(this.socket.isConnected()||this.socket.connect(),this.state==A.closed){const{config:{broadcast:a,presence:o,private:l}}=this.params,c=(n=(r=this.bindings.postgres_changes)===null||r===void 0?void 0:r.map(d=>d.filter))!==null&&n!==void 0?n:[],u=!!this.bindings[ue.PRESENCE]&&this.bindings[ue.PRESENCE].length>0||((i=this.params.config.presence)===null||i===void 0?void 0:i.enabled)===!0,h={},f={broadcast:a,presence:Object.assign(Object.assign({},o),{enabled:u}),postgres_changes:c,private:l};this.socket.accessTokenValue&&(h.access_token=this.socket.accessTokenValue),this._onError(d=>e==null?void 0:e(q.CHANNEL_ERROR,d)),this._onClose(()=>e==null?void 0:e(q.CLOSED)),this.updateJoinPayload(Object.assign({config:f},h)),this.joinedOnce=!0,this._rejoin(t),this.joinPush.receive("ok",async({postgres_changes:d})=>{var g;if(this.socket.setAuth(),d===void 0){e==null||e(q.SUBSCRIBED);return}else{const m=this.bindings.postgres_changes,p=(g=m==null?void 0:m.length)!==null&&g!==void 0?g:0,b=[];for(let _=0;_<p;_++){const v=m[_],{filter:{event:E,schema:T,table:k,filter:j}}=v,W=d&&d[_];if(W&&W.event===E&&W.schema===T&&W.table===k&&W.filter===j)b.push(Object.assign(Object.assign({},v),{id:W.id}));else{this.unsubscribe(),this.state=A.errored,e==null||e(q.CHANNEL_ERROR,new Error("mismatch between server and client bindings for postgres changes"));return}}this.bindings.postgres_changes=b,e&&e(q.SUBSCRIBED);return}}).receive("error",d=>{this.state=A.errored,e==null||e(q.CHANNEL_ERROR,new Error(JSON.stringify(Object.values(d).join(", ")||"error")))}).receive("timeout",()=>{e==null||e(q.TIMED_OUT)})}return this}presenceState(){return this.presence.state}async track(e,t={}){return await this.send({type:"presence",event:"track",payload:e},t.timeout||this.timeout)}async untrack(e={}){return await this.send({type:"presence",event:"untrack"},e)}on(e,t,r){return this.state===A.joined&&e===ue.PRESENCE&&(this.socket.log("channel",`resubscribe to ${this.topic} due to change in presence callbacks on joined channel`),this.unsubscribe().then(()=>this.subscribe())),this._on(e,t,r)}async httpSend(e,t,r={}){var n;const i=this.socket.accessTokenValue?`Bearer ${this.socket.accessTokenValue}`:"";if(t==null)return Promise.reject("Payload is required for httpSend()");const a={method:"POST",headers:{Authorization:i,apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"},body:JSON.stringify({messages:[{topic:this.subTopic,event:e,payload:t,private:this.private}]})},o=await this._fetchWithTimeout(this.broadcastEndpointURL,a,(n=r.timeout)!==null&&n!==void 0?n:this.timeout);if(o.status===202)return{success:!0};let l=o.statusText;try{const c=await o.json();l=c.error||c.message||l}catch{}return Promise.reject(new Error(l))}async send(e,t={}){var r,n;if(!this._canPush()&&e.type==="broadcast"){console.warn("Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");const{event:i,payload:a}=e,l={method:"POST",headers:{Authorization:this.socket.accessTokenValue?`Bearer ${this.socket.accessTokenValue}`:"",apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"},body:JSON.stringify({messages:[{topic:this.subTopic,event:i,payload:a,private:this.private}]})};try{const c=await this._fetchWithTimeout(this.broadcastEndpointURL,l,(r=t.timeout)!==null&&r!==void 0?r:this.timeout);return await((n=c.body)===null||n===void 0?void 0:n.cancel()),c.ok?"ok":"error"}catch(c){return c.name==="AbortError"?"timed out":"error"}}else return new Promise(i=>{var a,o,l;const c=this._push(e.type,e,t.timeout||this.timeout);e.type==="broadcast"&&!(!((l=(o=(a=this.params)===null||a===void 0?void 0:a.config)===null||o===void 0?void 0:o.broadcast)===null||l===void 0)&&l.ack)&&i("ok"),c.receive("ok",()=>i("ok")),c.receive("error",()=>i("error")),c.receive("timeout",()=>i("timed out"))})}updateJoinPayload(e){this.joinPush.updatePayload(e)}unsubscribe(e=this.timeout){this.state=A.leaving;const t=()=>{this.socket.log("channel",`leave ${this.topic}`),this._trigger(B.close,"leave",this._joinRef())};this.joinPush.destroy();let r=null;return new Promise(n=>{r=new Ze(this,B.leave,{},e),r.receive("ok",()=>{t(),n("ok")}).receive("timeout",()=>{t(),n("timed out")}).receive("error",()=>{n("error")}),r.send(),this._canPush()||r.trigger("ok",{})}).finally(()=>{r==null||r.destroy()})}teardown(){this.pushBuffer.forEach(e=>e.destroy()),this.pushBuffer=[],this.rejoinTimer.reset(),this.joinPush.destroy(),this.state=A.closed,this.bindings={}}async _fetchWithTimeout(e,t,r){const n=new AbortController,i=setTimeout(()=>n.abort(),r),a=await this.socket.fetch(e,Object.assign(Object.assign({},t),{signal:n.signal}));return clearTimeout(i),a}_push(e,t,r=this.timeout){if(!this.joinedOnce)throw`tried to push '${e}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;let n=new Ze(this,e,t,r);return this._canPush()?n.send():this._addToPushBuffer(n),n}_addToPushBuffer(e){if(e.startTimeout(),this.pushBuffer.push(e),this.pushBuffer.length>cn){const t=this.pushBuffer.shift();t&&(t.destroy(),this.socket.log("channel",`discarded push due to buffer overflow: ${t.event}`,t.payload))}}_onMessage(e,t,r){return t}_isMember(e){return this.topic===e}_joinRef(){return this.joinPush.ref}_trigger(e,t,r){var n,i;const a=e.toLocaleLowerCase(),{close:o,error:l,leave:c,join:u}=B;if(r&&[o,l,c,u].indexOf(a)>=0&&r!==this._joinRef())return;let f=this._onMessage(a,t,r);if(t&&!f)throw"channel onMessage callbacks must return the payload, modified or unmodified";["insert","update","delete"].includes(a)?(n=this.bindings.postgres_changes)===null||n===void 0||n.filter(d=>{var g,m,p;return((g=d.filter)===null||g===void 0?void 0:g.event)==="*"||((p=(m=d.filter)===null||m===void 0?void 0:m.event)===null||p===void 0?void 0:p.toLocaleLowerCase())===a}).map(d=>d.callback(f,r)):(i=this.bindings[a])===null||i===void 0||i.filter(d=>{var g,m,p,b,_,v;if(["broadcast","presence","postgres_changes"].includes(a))if("id"in d){const E=d.id,T=(g=d.filter)===null||g===void 0?void 0:g.event;return E&&((m=t.ids)===null||m===void 0?void 0:m.includes(E))&&(T==="*"||(T==null?void 0:T.toLocaleLowerCase())===((p=t.data)===null||p===void 0?void 0:p.type.toLocaleLowerCase()))}else{const E=(_=(b=d==null?void 0:d.filter)===null||b===void 0?void 0:b.event)===null||_===void 0?void 0:_.toLocaleLowerCase();return E==="*"||E===((v=t==null?void 0:t.event)===null||v===void 0?void 0:v.toLocaleLowerCase())}else return d.type.toLocaleLowerCase()===a}).map(d=>{if(typeof f=="object"&&"ids"in f){const g=f.data,{schema:m,table:p,commit_timestamp:b,type:_,errors:v}=g;f=Object.assign(Object.assign({},{schema:m,table:p,commit_timestamp:b,eventType:_,new:{},old:{},errors:v}),this._getPayloadRecords(g))}d.callback(f,r)})}_isClosed(){return this.state===A.closed}_isJoined(){return this.state===A.joined}_isJoining(){return this.state===A.joining}_isLeaving(){return this.state===A.leaving}_replyEventName(e){return`chan_reply_${e}`}_on(e,t,r){const n=e.toLocaleLowerCase(),i={type:n,filter:t,callback:r};return this.bindings[n]?this.bindings[n].push(i):this.bindings[n]=[i],this}_off(e,t){const r=e.toLocaleLowerCase();return this.bindings[r]&&(this.bindings[r]=this.bindings[r].filter(n=>{var i;return!(((i=n.type)===null||i===void 0?void 0:i.toLocaleLowerCase())===r&&Hr.isEqual(n.filter,t))})),this}static isEqual(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const r in e)if(e[r]!==t[r])return!1;return!0}_rejoinUntilConnected(){this.rejoinTimer.scheduleTimeout(),this.socket.isConnected()&&this._rejoin()}_onClose(e){this._on(B.close,{},e)}_onError(e){this._on(B.error,{},t=>e(t))}_canPush(){return this.socket.isConnected()&&this._isJoined()}_rejoin(e=this.timeout){this._isLeaving()||(this.socket._leaveOpenTopic(this.topic),this.state=A.joining,this.joinPush.resend(e))}_getPayloadRecords(e){const t={new:{},old:{}};return(e.type==="INSERT"||e.type==="UPDATE")&&(t.new=Bt(e.columns,e.record)),(e.type==="UPDATE"||e.type==="DELETE")&&(t.old=Bt(e.columns,e.old_record)),t}};const et=()=>{},je={HEARTBEAT_INTERVAL:25e3,RECONNECT_DELAY:10,HEARTBEAT_TIMEOUT_FALLBACK:100},bn=[1e3,2e3,5e3,1e4],yn=1e4,wn=`
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;let _n=class{constructor(e,t){var r;if(this.accessTokenValue=null,this.apiKey=null,this.channels=new Array,this.endPoint="",this.httpEndpoint="",this.headers={},this.params={},this.timeout=ct,this.transport=null,this.heartbeatIntervalMs=je.HEARTBEAT_INTERVAL,this.heartbeatTimer=void 0,this.pendingHeartbeatRef=null,this.heartbeatCallback=et,this.ref=0,this.reconnectTimer=null,this.vsn=Dt,this.logger=et,this.conn=null,this.sendBuffer=[],this.serializer=new un,this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.accessToken=null,this._connectionState="disconnected",this._wasManualDisconnect=!1,this._authPromise=null,this._resolveFetch=n=>n?(...i)=>n(...i):(...i)=>fetch(...i),!(!((r=t==null?void 0:t.params)===null||r===void 0)&&r.apikey))throw new Error("API key is required to connect to Realtime");this.apiKey=t.params.apikey,this.endPoint=`${e}/${ut.websocket}`,this.httpEndpoint=Vr(e),this._initializeOptions(t),this._setupReconnectionTimer(),this.fetch=this._resolveFetch(t==null?void 0:t.fetch)}connect(){if(!(this.isConnecting()||this.isDisconnecting()||this.conn!==null&&this.isConnected())){if(this._setConnectionState("connecting"),this.accessToken&&!this._authPromise&&this._setAuthSafely("connect"),this.transport)this.conn=new this.transport(this.endpointURL());else try{this.conn=qr.createWebSocket(this.endpointURL())}catch(e){this._setConnectionState("disconnected");const t=e.message;throw t.includes("Node.js")?new Error(`${t}

To use Realtime in Node.js, you need to provide a WebSocket implementation:

Option 1: Use Node.js 22+ which has native WebSocket support
Option 2: Install and provide the "ws" package:

  npm install ws

  import ws from "ws"
  const client = new RealtimeClient(url, {
    ...options,
    transport: ws
  })`):new Error(`WebSocket not available: ${t}`)}this._setupConnectionHandlers()}}endpointURL(){return this._appendParams(this.endPoint,Object.assign({},this.params,{vsn:this.vsn}))}disconnect(e,t){if(!this.isDisconnecting())if(this._setConnectionState("disconnecting",!0),this.conn){const r=setTimeout(()=>{this._setConnectionState("disconnected")},100);this.conn.onclose=()=>{clearTimeout(r),this._setConnectionState("disconnected")},typeof this.conn.close=="function"&&(e?this.conn.close(e,t??""):this.conn.close()),this._teardownConnection()}else this._setConnectionState("disconnected")}getChannels(){return this.channels}async removeChannel(e){const t=await e.unsubscribe();return this.channels.length===0&&this.disconnect(),t}async removeAllChannels(){const e=await Promise.all(this.channels.map(t=>t.unsubscribe()));return this.channels=[],this.disconnect(),e}log(e,t,r){this.logger(e,t,r)}connectionState(){switch(this.conn&&this.conn.readyState){case ee.connecting:return te.Connecting;case ee.open:return te.Open;case ee.closing:return te.Closing;default:return te.Closed}}isConnected(){return this.connectionState()===te.Open}isConnecting(){return this._connectionState==="connecting"}isDisconnecting(){return this._connectionState==="disconnecting"}channel(e,t={config:{}}){const r=`realtime:${e}`,n=this.getChannels().find(i=>i.topic===r);if(n)return n;{const i=new Gr(`realtime:${e}`,t,this);return this.channels.push(i),i}}push(e){const{topic:t,event:r,payload:n,ref:i}=e,a=()=>{this.encode(e,o=>{var l;(l=this.conn)===null||l===void 0||l.send(o)})};this.log("push",`${t} ${r} (${i})`,n),this.isConnected()?a():this.sendBuffer.push(a)}async setAuth(e=null){this._authPromise=this._performAuth(e);try{await this._authPromise}finally{this._authPromise=null}}async sendHeartbeat(){var e;if(!this.isConnected()){try{this.heartbeatCallback("disconnected")}catch(t){this.log("error","error in heartbeat callback",t)}return}if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this.log("transport","heartbeat timeout. Attempting to re-establish connection");try{this.heartbeatCallback("timeout")}catch(t){this.log("error","error in heartbeat callback",t)}this._wasManualDisconnect=!1,(e=this.conn)===null||e===void 0||e.close(ln,"heartbeat timeout"),setTimeout(()=>{var t;this.isConnected()||(t=this.reconnectTimer)===null||t===void 0||t.scheduleTimeout()},je.HEARTBEAT_TIMEOUT_FALLBACK);return}this.pendingHeartbeatRef=this._makeRef(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef});try{this.heartbeatCallback("sent")}catch(t){this.log("error","error in heartbeat callback",t)}this._setAuthSafely("heartbeat")}onHeartbeat(e){this.heartbeatCallback=e}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(e=>e()),this.sendBuffer=[])}_makeRef(){let e=this.ref+1;return e===this.ref?this.ref=0:this.ref=e,this.ref.toString()}_leaveOpenTopic(e){let t=this.channels.find(r=>r.topic===e&&(r._isJoined()||r._isJoining()));t&&(this.log("transport",`leaving duplicate topic "${e}"`),t.unsubscribe())}_remove(e){this.channels=this.channels.filter(t=>t.topic!==e.topic)}_onConnMessage(e){this.decode(e.data,t=>{if(t.topic==="phoenix"&&t.event==="phx_reply")try{this.heartbeatCallback(t.payload.status==="ok"?"ok":"error")}catch(c){this.log("error","error in heartbeat callback",c)}t.ref&&t.ref===this.pendingHeartbeatRef&&(this.pendingHeartbeatRef=null);const{topic:r,event:n,payload:i,ref:a}=t,o=a?`(${a})`:"",l=i.status||"";this.log("receive",`${l} ${r} ${n} ${o}`.trim(),i),this.channels.filter(c=>c._isMember(r)).forEach(c=>c._trigger(n,i,a)),this._triggerStateCallbacks("message",t)})}_clearTimer(e){var t;e==="heartbeat"&&this.heartbeatTimer?(clearInterval(this.heartbeatTimer),this.heartbeatTimer=void 0):e==="reconnect"&&((t=this.reconnectTimer)===null||t===void 0||t.reset())}_clearAllTimers(){this._clearTimer("heartbeat"),this._clearTimer("reconnect")}_setupConnectionHandlers(){this.conn&&("binaryType"in this.conn&&(this.conn.binaryType="arraybuffer"),this.conn.onopen=()=>this._onConnOpen(),this.conn.onerror=e=>this._onConnError(e),this.conn.onmessage=e=>this._onConnMessage(e),this.conn.onclose=e=>this._onConnClose(e))}_teardownConnection(){if(this.conn){if(this.conn.readyState===ee.open||this.conn.readyState===ee.connecting)try{this.conn.close()}catch(e){this.log("error","Error closing connection",e)}this.conn.onopen=null,this.conn.onerror=null,this.conn.onmessage=null,this.conn.onclose=null,this.conn=null}this._clearAllTimers(),this.channels.forEach(e=>e.teardown())}_onConnOpen(){this._setConnectionState("connected"),this.log("transport",`connected to ${this.endpointURL()}`),(this._authPromise||(this.accessToken&&!this.accessTokenValue?this.setAuth():Promise.resolve())).then(()=>{this.flushSendBuffer()}).catch(t=>{this.log("error","error waiting for auth on connect",t),this.flushSendBuffer()}),this._clearTimer("reconnect"),this.worker?this.workerRef||this._startWorkerHeartbeat():this._startHeartbeat(),this._triggerStateCallbacks("open")}_startHeartbeat(){this.heartbeatTimer&&clearInterval(this.heartbeatTimer),this.heartbeatTimer=setInterval(()=>this.sendHeartbeat(),this.heartbeatIntervalMs)}_startWorkerHeartbeat(){this.workerUrl?this.log("worker",`starting worker for from ${this.workerUrl}`):this.log("worker","starting default worker");const e=this._workerObjectUrl(this.workerUrl);this.workerRef=new Worker(e),this.workerRef.onerror=t=>{this.log("worker","worker error",t.message),this.workerRef.terminate()},this.workerRef.onmessage=t=>{t.data.event==="keepAlive"&&this.sendHeartbeat()},this.workerRef.postMessage({event:"start",interval:this.heartbeatIntervalMs})}_onConnClose(e){var t;this._setConnectionState("disconnected"),this.log("transport","close",e),this._triggerChanError(),this._clearTimer("heartbeat"),this._wasManualDisconnect||(t=this.reconnectTimer)===null||t===void 0||t.scheduleTimeout(),this._triggerStateCallbacks("close",e)}_onConnError(e){this._setConnectionState("disconnected"),this.log("transport",`${e}`),this._triggerChanError(),this._triggerStateCallbacks("error",e)}_triggerChanError(){this.channels.forEach(e=>e._trigger(B.error))}_appendParams(e,t){if(Object.keys(t).length===0)return e;const r=e.match(/\?/)?"&":"?",n=new URLSearchParams(t);return`${e}${r}${n}`}_workerObjectUrl(e){let t;if(e)t=e;else{const r=new Blob([wn],{type:"application/javascript"});t=URL.createObjectURL(r)}return t}_setConnectionState(e,t=!1){this._connectionState=e,e==="connecting"?this._wasManualDisconnect=!1:e==="disconnecting"&&(this._wasManualDisconnect=t)}async _performAuth(e=null){let t;e?t=e:this.accessToken?t=await this.accessToken():t=this.accessTokenValue,this.accessTokenValue!=t&&(this.accessTokenValue=t,this.channels.forEach(r=>{const n={access_token:t,version:an};t&&r.updateJoinPayload(n),r.joinedOnce&&r._isJoined()&&r._push(B.access_token,{access_token:t})}))}async _waitForAuthIfNeeded(){this._authPromise&&await this._authPromise}_setAuthSafely(e="general"){this.setAuth().catch(t=>{this.log("error",`error setting auth in ${e}`,t)})}_triggerStateCallbacks(e,t){try{this.stateChangeCallbacks[e].forEach(r=>{try{r(t)}catch(n){this.log("error",`error in ${e} callback`,n)}})}catch(r){this.log("error",`error triggering ${e} callbacks`,r)}}_setupReconnectionTimer(){this.reconnectTimer=new Mr(async()=>{setTimeout(async()=>{await this._waitForAuthIfNeeded(),this.isConnected()||this.connect()},je.RECONNECT_DELAY)},this.reconnectAfterMs)}_initializeOptions(e){var t,r,n,i,a,o,l,c,u,h,f,d;switch(this.transport=(t=e==null?void 0:e.transport)!==null&&t!==void 0?t:null,this.timeout=(r=e==null?void 0:e.timeout)!==null&&r!==void 0?r:ct,this.heartbeatIntervalMs=(n=e==null?void 0:e.heartbeatIntervalMs)!==null&&n!==void 0?n:je.HEARTBEAT_INTERVAL,this.worker=(i=e==null?void 0:e.worker)!==null&&i!==void 0?i:!1,this.accessToken=(a=e==null?void 0:e.accessToken)!==null&&a!==void 0?a:null,this.heartbeatCallback=(o=e==null?void 0:e.heartbeatCallback)!==null&&o!==void 0?o:et,this.vsn=(l=e==null?void 0:e.vsn)!==null&&l!==void 0?l:Dt,e!=null&&e.params&&(this.params=e.params),e!=null&&e.logger&&(this.logger=e.logger),(e!=null&&e.logLevel||e!=null&&e.log_level)&&(this.logLevel=e.logLevel||e.log_level,this.params=Object.assign(Object.assign({},this.params),{log_level:this.logLevel})),this.reconnectAfterMs=(c=e==null?void 0:e.reconnectAfterMs)!==null&&c!==void 0?c:g=>bn[g-1]||yn,this.vsn){case Fr:this.encode=(u=e==null?void 0:e.encode)!==null&&u!==void 0?u:(g,m)=>m(JSON.stringify(g)),this.decode=(h=e==null?void 0:e.decode)!==null&&h!==void 0?h:(g,m)=>m(JSON.parse(g));break;case on:this.encode=(f=e==null?void 0:e.encode)!==null&&f!==void 0?f:this.serializer.encode.bind(this.serializer),this.decode=(d=e==null?void 0:e.decode)!==null&&d!==void 0?d:this.serializer.decode.bind(this.serializer);break;default:throw new Error(`Unsupported serializer version: ${this.vsn}`)}if(this.worker){if(typeof window<"u"&&!window.Worker)throw new Error("Web Worker is not supported");this.workerUrl=e==null?void 0:e.workerUrl}}};const xn=Object.freeze(Object.defineProperty({__proto__:null,REALTIME_CHANNEL_STATES:vn,get REALTIME_LISTEN_TYPES(){return ue},get REALTIME_POSTGRES_CHANGES_LISTEN_EVENT(){return ft},get REALTIME_PRESENCE_LISTEN_EVENTS(){return ht},get REALTIME_SUBSCRIBE_STATES(){return q},RealtimeChannel:Gr,RealtimeClient:_n,RealtimePresence:Kr,WebSocketFactory:qr},Symbol.toStringTag,{value:"Module"})),Jr=_e(xn);class xe extends Error{constructor(e){super(e),this.__isStorageError=!0,this.name="StorageError"}}function O(s){return typeof s=="object"&&s!==null&&"__isStorageError"in s}class Yr extends xe{constructor(e,t,r){super(e),this.name="StorageApiError",this.status=t,this.statusCode=r}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}}class qe extends xe{constructor(e,t){super(e),this.name="StorageUnknownError",this.originalError=t}}const St=s=>s?(...e)=>s(...e):(...e)=>fetch(...e),En=()=>Response,gt=s=>{if(Array.isArray(s))return s.map(t=>gt(t));if(typeof s=="function"||s!==Object(s))return s;const e={};return Object.entries(s).forEach(([t,r])=>{const n=t.replace(/([-_][a-z])/gi,i=>i.toUpperCase().replace(/[-_]/g,""));e[n]=gt(r)}),e},kn=s=>{if(typeof s!="object"||s===null)return!1;const e=Object.getPrototypeOf(s);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in s)&&!(Symbol.iterator in s)},Sn=s=>!s||typeof s!="string"||s.length===0||s.length>100||s.trim()!==s||s.includes("/")||s.includes("\\")?!1:/^[\w!.\*'() &$@=;:+,?-]+$/.test(s),tt=s=>{var e;return s.msg||s.message||s.error_description||(typeof s.error=="string"?s.error:(e=s.error)===null||e===void 0?void 0:e.message)||JSON.stringify(s)},On=(s,e,t)=>y(void 0,void 0,void 0,function*(){const r=yield En();s instanceof r&&!(t!=null&&t.noResolveJson)?s.json().then(n=>{const i=s.status||500,a=(n==null?void 0:n.statusCode)||i+"";e(new Yr(tt(n),i,a))}).catch(n=>{e(new qe(tt(n),n))}):e(new qe(tt(s),s))}),Tn=(s,e,t,r)=>{const n={method:s,headers:(e==null?void 0:e.headers)||{}};return s==="GET"||!r?n:(kn(r)?(n.headers=Object.assign({"Content-Type":"application/json"},e==null?void 0:e.headers),n.body=JSON.stringify(r)):n.body=r,e!=null&&e.duplex&&(n.duplex=e.duplex),Object.assign(Object.assign({},n),t))};function Ee(s,e,t,r,n,i){return y(this,void 0,void 0,function*(){return new Promise((a,o)=>{s(t,Tn(e,r,n,i)).then(l=>{if(!l.ok)throw l;return r!=null&&r.noResolveJson?l:l.json()}).then(l=>a(l)).catch(l=>On(l,o,r))})})}function ye(s,e,t,r){return y(this,void 0,void 0,function*(){return Ee(s,"GET",e,t,r)})}function D(s,e,t,r,n){return y(this,void 0,void 0,function*(){return Ee(s,"POST",e,r,n,t)})}function pt(s,e,t,r,n){return y(this,void 0,void 0,function*(){return Ee(s,"PUT",e,r,n,t)})}function An(s,e,t,r){return y(this,void 0,void 0,function*(){return Ee(s,"HEAD",e,Object.assign(Object.assign({},t),{noResolveJson:!0}),r)})}function Ot(s,e,t,r,n){return y(this,void 0,void 0,function*(){return Ee(s,"DELETE",e,r,n,t)})}class Rn{constructor(e,t){this.downloadFn=e,this.shouldThrowOnError=t}then(e,t){return this.execute().then(e,t)}execute(){return y(this,void 0,void 0,function*(){try{return{data:(yield this.downloadFn()).body,error:null}}catch(e){if(this.shouldThrowOnError)throw e;if(O(e))return{data:null,error:e};throw e}})}}var Qr;class jn{constructor(e,t){this.downloadFn=e,this.shouldThrowOnError=t,this[Qr]="BlobDownloadBuilder",this.promise=null}asStream(){return new Rn(this.downloadFn,this.shouldThrowOnError)}then(e,t){return this.getPromise().then(e,t)}catch(e){return this.getPromise().catch(e)}finally(e){return this.getPromise().finally(e)}getPromise(){return this.promise||(this.promise=this.execute()),this.promise}execute(){return y(this,void 0,void 0,function*(){try{return{data:yield(yield this.downloadFn()).blob(),error:null}}catch(e){if(this.shouldThrowOnError)throw e;if(O(e))return{data:null,error:e};throw e}})}}Qr=Symbol.toStringTag;const Pn={limit:100,offset:0,sortBy:{column:"name",order:"asc"}},zt={cacheControl:"3600",contentType:"text/plain;charset=UTF-8",upsert:!1};class Cn{constructor(e,t={},r,n){this.shouldThrowOnError=!1,this.url=e,this.headers=t,this.bucketId=r,this.fetch=St(n)}throwOnError(){return this.shouldThrowOnError=!0,this}uploadOrUpdate(e,t,r,n){return y(this,void 0,void 0,function*(){try{let i;const a=Object.assign(Object.assign({},zt),n);let o=Object.assign(Object.assign({},this.headers),e==="POST"&&{"x-upsert":String(a.upsert)});const l=a.metadata;typeof Blob<"u"&&r instanceof Blob?(i=new FormData,i.append("cacheControl",a.cacheControl),l&&i.append("metadata",this.encodeMetadata(l)),i.append("",r)):typeof FormData<"u"&&r instanceof FormData?(i=r,i.has("cacheControl")||i.append("cacheControl",a.cacheControl),l&&!i.has("metadata")&&i.append("metadata",this.encodeMetadata(l))):(i=r,o["cache-control"]=`max-age=${a.cacheControl}`,o["content-type"]=a.contentType,l&&(o["x-metadata"]=this.toBase64(this.encodeMetadata(l))),(typeof ReadableStream<"u"&&i instanceof ReadableStream||i&&typeof i=="object"&&"pipe"in i&&typeof i.pipe=="function")&&!a.duplex&&(a.duplex="half")),n!=null&&n.headers&&(o=Object.assign(Object.assign({},o),n.headers));const c=this._removeEmptyFolders(t),u=this._getFinalPath(c),h=yield(e=="PUT"?pt:D)(this.fetch,`${this.url}/object/${u}`,i,Object.assign({headers:o},a!=null&&a.duplex?{duplex:a.duplex}:{}));return{data:{path:c,id:h.Id,fullPath:h.Key},error:null}}catch(i){if(this.shouldThrowOnError)throw i;if(O(i))return{data:null,error:i};throw i}})}upload(e,t,r){return y(this,void 0,void 0,function*(){return this.uploadOrUpdate("POST",e,t,r)})}uploadToSignedUrl(e,t,r,n){return y(this,void 0,void 0,function*(){const i=this._removeEmptyFolders(e),a=this._getFinalPath(i),o=new URL(this.url+`/object/upload/sign/${a}`);o.searchParams.set("token",t);try{let l;const c=Object.assign({upsert:zt.upsert},n),u=Object.assign(Object.assign({},this.headers),{"x-upsert":String(c.upsert)});typeof Blob<"u"&&r instanceof Blob?(l=new FormData,l.append("cacheControl",c.cacheControl),l.append("",r)):typeof FormData<"u"&&r instanceof FormData?(l=r,l.append("cacheControl",c.cacheControl)):(l=r,u["cache-control"]=`max-age=${c.cacheControl}`,u["content-type"]=c.contentType);const h=yield pt(this.fetch,o.toString(),l,{headers:u});return{data:{path:i,fullPath:h.Key},error:null}}catch(l){if(this.shouldThrowOnError)throw l;if(O(l))return{data:null,error:l};throw l}})}createSignedUploadUrl(e,t){return y(this,void 0,void 0,function*(){try{let r=this._getFinalPath(e);const n=Object.assign({},this.headers);t!=null&&t.upsert&&(n["x-upsert"]="true");const i=yield D(this.fetch,`${this.url}/object/upload/sign/${r}`,{},{headers:n}),a=new URL(this.url+i.url),o=a.searchParams.get("token");if(!o)throw new xe("No token returned by API");return{data:{signedUrl:a.toString(),path:e,token:o},error:null}}catch(r){if(this.shouldThrowOnError)throw r;if(O(r))return{data:null,error:r};throw r}})}update(e,t,r){return y(this,void 0,void 0,function*(){return this.uploadOrUpdate("PUT",e,t,r)})}move(e,t,r){return y(this,void 0,void 0,function*(){try{return{data:yield D(this.fetch,`${this.url}/object/move`,{bucketId:this.bucketId,sourceKey:e,destinationKey:t,destinationBucket:r==null?void 0:r.destinationBucket},{headers:this.headers}),error:null}}catch(n){if(this.shouldThrowOnError)throw n;if(O(n))return{data:null,error:n};throw n}})}copy(e,t,r){return y(this,void 0,void 0,function*(){try{return{data:{path:(yield D(this.fetch,`${this.url}/object/copy`,{bucketId:this.bucketId,sourceKey:e,destinationKey:t,destinationBucket:r==null?void 0:r.destinationBucket},{headers:this.headers})).Key},error:null}}catch(n){if(this.shouldThrowOnError)throw n;if(O(n))return{data:null,error:n};throw n}})}createSignedUrl(e,t,r){return y(this,void 0,void 0,function*(){try{let n=this._getFinalPath(e),i=yield D(this.fetch,`${this.url}/object/sign/${n}`,Object.assign({expiresIn:t},r!=null&&r.transform?{transform:r.transform}:{}),{headers:this.headers});const a=r!=null&&r.download?`&download=${r.download===!0?"":r.download}`:"";return i={signedUrl:encodeURI(`${this.url}${i.signedURL}${a}`)},{data:i,error:null}}catch(n){if(this.shouldThrowOnError)throw n;if(O(n))return{data:null,error:n};throw n}})}createSignedUrls(e,t,r){return y(this,void 0,void 0,function*(){try{const n=yield D(this.fetch,`${this.url}/object/sign/${this.bucketId}`,{expiresIn:t,paths:e},{headers:this.headers}),i=r!=null&&r.download?`&download=${r.download===!0?"":r.download}`:"";return{data:n.map(a=>Object.assign(Object.assign({},a),{signedUrl:a.signedURL?encodeURI(`${this.url}${a.signedURL}${i}`):null})),error:null}}catch(n){if(this.shouldThrowOnError)throw n;if(O(n))return{data:null,error:n};throw n}})}download(e,t){const n=typeof(t==null?void 0:t.transform)<"u"?"render/image/authenticated":"object",i=this.transformOptsToQueryString((t==null?void 0:t.transform)||{}),a=i?`?${i}`:"",o=this._getFinalPath(e),l=()=>ye(this.fetch,`${this.url}/${n}/${o}${a}`,{headers:this.headers,noResolveJson:!0});return new jn(l,this.shouldThrowOnError)}info(e){return y(this,void 0,void 0,function*(){const t=this._getFinalPath(e);try{const r=yield ye(this.fetch,`${this.url}/object/info/${t}`,{headers:this.headers});return{data:gt(r),error:null}}catch(r){if(this.shouldThrowOnError)throw r;if(O(r))return{data:null,error:r};throw r}})}exists(e){return y(this,void 0,void 0,function*(){const t=this._getFinalPath(e);try{return yield An(this.fetch,`${this.url}/object/${t}`,{headers:this.headers}),{data:!0,error:null}}catch(r){if(this.shouldThrowOnError)throw r;if(O(r)&&r instanceof qe){const n=r.originalError;if([400,404].includes(n==null?void 0:n.status))return{data:!1,error:r}}throw r}})}getPublicUrl(e,t){const r=this._getFinalPath(e),n=[],i=t!=null&&t.download?`download=${t.download===!0?"":t.download}`:"";i!==""&&n.push(i);const o=typeof(t==null?void 0:t.transform)<"u"?"render/image":"object",l=this.transformOptsToQueryString((t==null?void 0:t.transform)||{});l!==""&&n.push(l);let c=n.join("&");return c!==""&&(c=`?${c}`),{data:{publicUrl:encodeURI(`${this.url}/${o}/public/${r}${c}`)}}}remove(e){return y(this,void 0,void 0,function*(){try{return{data:yield Ot(this.fetch,`${this.url}/object/${this.bucketId}`,{prefixes:e},{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(O(t))return{data:null,error:t};throw t}})}list(e,t,r){return y(this,void 0,void 0,function*(){try{const n=Object.assign(Object.assign(Object.assign({},Pn),t),{prefix:e||""});return{data:yield D(this.fetch,`${this.url}/object/list/${this.bucketId}`,n,{headers:this.headers},r),error:null}}catch(n){if(this.shouldThrowOnError)throw n;if(O(n))return{data:null,error:n};throw n}})}listV2(e,t){return y(this,void 0,void 0,function*(){try{const r=Object.assign({},e);return{data:yield D(this.fetch,`${this.url}/object/list-v2/${this.bucketId}`,r,{headers:this.headers},t),error:null}}catch(r){if(this.shouldThrowOnError)throw r;if(O(r))return{data:null,error:r};throw r}})}encodeMetadata(e){return JSON.stringify(e)}toBase64(e){return typeof Buffer<"u"?Buffer.from(e).toString("base64"):btoa(e)}_getFinalPath(e){return`${this.bucketId}/${e.replace(/^\/+/,"")}`}_removeEmptyFolders(e){return e.replace(/^\/|\/$/g,"").replace(/\/+/g,"/")}transformOptsToQueryString(e){const t=[];return e.width&&t.push(`width=${e.width}`),e.height&&t.push(`height=${e.height}`),e.resize&&t.push(`resize=${e.resize}`),e.format&&t.push(`format=${e.format}`),e.quality&&t.push(`quality=${e.quality}`),t.join("&")}}const Xr="2.86.2",Zr={"X-Client-Info":`storage-js/${Xr}`};class In{constructor(e,t={},r,n){this.shouldThrowOnError=!1;const i=new URL(e);n!=null&&n.useNewHostname&&/supabase\.(co|in|red)$/.test(i.hostname)&&!i.hostname.includes("storage.supabase.")&&(i.hostname=i.hostname.replace("supabase.","storage.supabase.")),this.url=i.href.replace(/\/$/,""),this.headers=Object.assign(Object.assign({},Zr),t),this.fetch=St(r)}throwOnError(){return this.shouldThrowOnError=!0,this}listBuckets(e){return y(this,void 0,void 0,function*(){try{const t=this.listBucketOptionsToQueryString(e);return{data:yield ye(this.fetch,`${this.url}/bucket${t}`,{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(O(t))return{data:null,error:t};throw t}})}getBucket(e){return y(this,void 0,void 0,function*(){try{return{data:yield ye(this.fetch,`${this.url}/bucket/${e}`,{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(O(t))return{data:null,error:t};throw t}})}createBucket(e){return y(this,arguments,void 0,function*(t,r={public:!1}){try{return{data:yield D(this.fetch,`${this.url}/bucket`,{id:t,name:t,type:r.type,public:r.public,file_size_limit:r.fileSizeLimit,allowed_mime_types:r.allowedMimeTypes},{headers:this.headers}),error:null}}catch(n){if(this.shouldThrowOnError)throw n;if(O(n))return{data:null,error:n};throw n}})}updateBucket(e,t){return y(this,void 0,void 0,function*(){try{return{data:yield pt(this.fetch,`${this.url}/bucket/${e}`,{id:e,name:e,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:this.headers}),error:null}}catch(r){if(this.shouldThrowOnError)throw r;if(O(r))return{data:null,error:r};throw r}})}emptyBucket(e){return y(this,void 0,void 0,function*(){try{return{data:yield D(this.fetch,`${this.url}/bucket/${e}/empty`,{},{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(O(t))return{data:null,error:t};throw t}})}deleteBucket(e){return y(this,void 0,void 0,function*(){try{return{data:yield Ot(this.fetch,`${this.url}/bucket/${e}`,{},{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(O(t))return{data:null,error:t};throw t}})}listBucketOptionsToQueryString(e){const t={};return e&&("limit"in e&&(t.limit=String(e.limit)),"offset"in e&&(t.offset=String(e.offset)),e.search&&(t.search=e.search),e.sortColumn&&(t.sortColumn=e.sortColumn),e.sortOrder&&(t.sortOrder=e.sortOrder)),Object.keys(t).length>0?"?"+new URLSearchParams(t).toString():""}}var we=class extends Error{constructor(s,e){var t;super(s),this.name="IcebergError",this.status=e.status,this.icebergType=e.icebergType,this.icebergCode=e.icebergCode,this.details=e.details,this.isCommitStateUnknown=e.icebergType==="CommitStateUnknownException"||[500,502,504].includes(e.status)&&((t=e.icebergType)==null?void 0:t.includes("CommitState"))===!0}isNotFound(){return this.status===404}isConflict(){return this.status===409}isAuthenticationTimeout(){return this.status===419}};function $n(s,e,t){const r=new URL(e,s);if(t)for(const[n,i]of Object.entries(t))i!==void 0&&r.searchParams.set(n,i);return r.toString()}async function Un(s){return!s||s.type==="none"?{}:s.type==="bearer"?{Authorization:`Bearer ${s.token}`}:s.type==="header"?{[s.name]:s.value}:s.type==="custom"?await s.getHeaders():{}}function Nn(s){const e=s.fetchImpl??globalThis.fetch;return{async request({method:t,path:r,query:n,body:i,headers:a}){const o=$n(s.baseUrl,r,n),l=await Un(s.auth),c=await e(o,{method:t,headers:{...i?{"Content-Type":"application/json"}:{},...l,...a},body:i?JSON.stringify(i):void 0}),u=await c.text(),h=(c.headers.get("content-type")||"").includes("application/json"),f=h&&u?JSON.parse(u):u;if(!c.ok){const d=h?f:void 0,g=d==null?void 0:d.error;throw new we((g==null?void 0:g.message)??`Request failed with status ${c.status}`,{status:c.status,icebergType:g==null?void 0:g.type,icebergCode:g==null?void 0:g.code,details:d})}return{status:c.status,headers:c.headers,data:f}}}}function Pe(s){return s.join("")}var Ln=class{constructor(s,e=""){this.client=s,this.prefix=e}async listNamespaces(s){const e=s?{parent:Pe(s.namespace)}:void 0;return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces`,query:e})).data.namespaces.map(r=>({namespace:r}))}async createNamespace(s,e){const t={namespace:s.namespace,properties:e==null?void 0:e.properties};return(await this.client.request({method:"POST",path:`${this.prefix}/namespaces`,body:t})).data}async dropNamespace(s){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${Pe(s.namespace)}`})}async loadNamespaceMetadata(s){return{properties:(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${Pe(s.namespace)}`})).data.properties}}async namespaceExists(s){try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${Pe(s.namespace)}`}),!0}catch(e){if(e instanceof we&&e.status===404)return!1;throw e}}async createNamespaceIfNotExists(s,e){try{return await this.createNamespace(s,e)}catch(t){if(t instanceof we&&t.status===409)return;throw t}}};function ne(s){return s.join("")}var Dn=class{constructor(s,e="",t){this.client=s,this.prefix=e,this.accessDelegation=t}async listTables(s){return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${ne(s.namespace)}/tables`})).data.identifiers}async createTable(s,e){const t={};return this.accessDelegation&&(t["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${ne(s.namespace)}/tables`,body:e,headers:t})).data.metadata}async updateTable(s,e){const t=await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${ne(s.namespace)}/tables/${s.name}`,body:e});return{"metadata-location":t.data["metadata-location"],metadata:t.data.metadata}}async dropTable(s,e){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${ne(s.namespace)}/tables/${s.name}`,query:{purgeRequested:String((e==null?void 0:e.purge)??!1)}})}async loadTable(s){const e={};return this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${ne(s.namespace)}/tables/${s.name}`,headers:e})).data.metadata}async tableExists(s){const e={};this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation);try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${ne(s.namespace)}/tables/${s.name}`,headers:e}),!0}catch(t){if(t instanceof we&&t.status===404)return!1;throw t}}async createTableIfNotExists(s,e){try{return await this.createTable(s,e)}catch(t){if(t instanceof we&&t.status===409)return await this.loadTable({namespace:s.namespace,name:e.name});throw t}}},Bn=class{constructor(s){var r;let e="v1";s.catalogName&&(e+=`/${s.catalogName}`);const t=s.baseUrl.endsWith("/")?s.baseUrl:`${s.baseUrl}/`;this.client=Nn({baseUrl:t,auth:s.auth,fetchImpl:s.fetch}),this.accessDelegation=(r=s.accessDelegation)==null?void 0:r.join(","),this.namespaceOps=new Ln(this.client,e),this.tableOps=new Dn(this.client,e,this.accessDelegation)}async listNamespaces(s){return this.namespaceOps.listNamespaces(s)}async createNamespace(s,e){return this.namespaceOps.createNamespace(s,e)}async dropNamespace(s){await this.namespaceOps.dropNamespace(s)}async loadNamespaceMetadata(s){return this.namespaceOps.loadNamespaceMetadata(s)}async listTables(s){return this.tableOps.listTables(s)}async createTable(s,e){return this.tableOps.createTable(s,e)}async updateTable(s,e){return this.tableOps.updateTable(s,e)}async dropTable(s,e){await this.tableOps.dropTable(s,e)}async loadTable(s){return this.tableOps.loadTable(s)}async namespaceExists(s){return this.namespaceOps.namespaceExists(s)}async tableExists(s){return this.tableOps.tableExists(s)}async createNamespaceIfNotExists(s,e){return this.namespaceOps.createNamespaceIfNotExists(s,e)}async createTableIfNotExists(s,e){return this.tableOps.createTableIfNotExists(s,e)}};class es{constructor(e,t={},r){this.shouldThrowOnError=!1,this.url=e.replace(/\/$/,""),this.headers=Object.assign(Object.assign({},Zr),t),this.fetch=St(r)}throwOnError(){return this.shouldThrowOnError=!0,this}createBucket(e){return y(this,void 0,void 0,function*(){try{return{data:yield D(this.fetch,`${this.url}/bucket`,{name:e},{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(O(t))return{data:null,error:t};throw t}})}listBuckets(e){return y(this,void 0,void 0,function*(){try{const t=new URLSearchParams;(e==null?void 0:e.limit)!==void 0&&t.set("limit",e.limit.toString()),(e==null?void 0:e.offset)!==void 0&&t.set("offset",e.offset.toString()),e!=null&&e.sortColumn&&t.set("sortColumn",e.sortColumn),e!=null&&e.sortOrder&&t.set("sortOrder",e.sortOrder),e!=null&&e.search&&t.set("search",e.search);const r=t.toString(),n=r?`${this.url}/bucket?${r}`:`${this.url}/bucket`;return{data:yield ye(this.fetch,n,{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(O(t))return{data:null,error:t};throw t}})}deleteBucket(e){return y(this,void 0,void 0,function*(){try{return{data:yield Ot(this.fetch,`${this.url}/bucket/${e}`,{},{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(O(t))return{data:null,error:t};throw t}})}from(e){if(!Sn(e))throw new xe("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");return new Bn({baseUrl:this.url,catalogName:e,auth:{type:"custom",getHeaders:()=>y(this,void 0,void 0,function*(){return this.headers})},fetch:this.fetch})}}const Tt={"X-Client-Info":`storage-js/${Xr}`,"Content-Type":"application/json"};class At extends Error{constructor(e){super(e),this.__isStorageVectorsError=!0,this.name="StorageVectorsError"}}function U(s){return typeof s=="object"&&s!==null&&"__isStorageVectorsError"in s}class $e extends At{constructor(e,t,r){super(e),this.name="StorageVectorsApiError",this.status=t,this.statusCode=r}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}}class ts extends At{constructor(e,t){super(e),this.name="StorageVectorsUnknownError",this.originalError=t}}var mt;(function(s){s.InternalError="InternalError",s.S3VectorConflictException="S3VectorConflictException",s.S3VectorNotFoundException="S3VectorNotFoundException",s.S3VectorBucketNotEmpty="S3VectorBucketNotEmpty",s.S3VectorMaxBucketsExceeded="S3VectorMaxBucketsExceeded",s.S3VectorMaxIndexesExceeded="S3VectorMaxIndexesExceeded"})(mt||(mt={}));const Je=s=>s?(...e)=>s(...e):(...e)=>fetch(...e),zn=()=>Response,rs=s=>{if(typeof s!="object"||s===null)return!1;const e=Object.getPrototypeOf(s);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in s)&&!(Symbol.iterator in s)},qn=s=>Array.from(new Float32Array(s)),Fn=(s,e)=>{if(e!==void 0&&s.float32.length!==e)throw new Error(`Vector dimension mismatch: expected ${e}, got ${s.float32.length}`)},qt=s=>s.msg||s.message||s.error_description||s.error||JSON.stringify(s),Mn=(s,e,t)=>y(void 0,void 0,void 0,function*(){if(s&&typeof s=="object"&&"status"in s&&"ok"in s&&typeof s.status=="number"&&!(t!=null&&t.noResolveJson)){const n=s.status||500,i=s;if(typeof i.json=="function")i.json().then(a=>{const o=(a==null?void 0:a.statusCode)||(a==null?void 0:a.code)||n+"";e(new $e(qt(a),n,o))}).catch(()=>{const a=n+"",o=i.statusText||`HTTP ${n} error`;e(new $e(o,n,a))});else{const a=n+"",o=i.statusText||`HTTP ${n} error`;e(new $e(o,n,a))}}else e(new ts(qt(s),s))}),Wn=(s,e,t,r)=>{const n={method:s,headers:(e==null?void 0:e.headers)||{}};return r?(rs(r)?(n.headers=Object.assign({"Content-Type":"application/json"},e==null?void 0:e.headers),n.body=JSON.stringify(r)):n.body=r,Object.assign(Object.assign({},n),t)):n};function Vn(s,e,t,r,n,i){return y(this,void 0,void 0,function*(){return new Promise((a,o)=>{s(t,Wn(e,r,n,i)).then(l=>{if(!l.ok)throw l;if(r!=null&&r.noResolveJson)return l;const c=l.headers.get("content-type");return!c||!c.includes("application/json")?{}:l.json()}).then(l=>a(l)).catch(l=>Mn(l,o,r))})})}function N(s,e,t,r,n){return y(this,void 0,void 0,function*(){return Vn(s,"POST",e,r,n,t)})}class ss{constructor(e,t={},r){this.shouldThrowOnError=!1,this.url=e.replace(/\/$/,""),this.headers=Object.assign(Object.assign({},Tt),t),this.fetch=Je(r)}throwOnError(){return this.shouldThrowOnError=!0,this}createIndex(e){return y(this,void 0,void 0,function*(){try{return{data:(yield N(this.fetch,`${this.url}/CreateIndex`,e,{headers:this.headers}))||{},error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(U(t))return{data:null,error:t};throw t}})}getIndex(e,t){return y(this,void 0,void 0,function*(){try{return{data:yield N(this.fetch,`${this.url}/GetIndex`,{vectorBucketName:e,indexName:t},{headers:this.headers}),error:null}}catch(r){if(this.shouldThrowOnError)throw r;if(U(r))return{data:null,error:r};throw r}})}listIndexes(e){return y(this,void 0,void 0,function*(){try{return{data:yield N(this.fetch,`${this.url}/ListIndexes`,e,{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(U(t))return{data:null,error:t};throw t}})}deleteIndex(e,t){return y(this,void 0,void 0,function*(){try{return{data:(yield N(this.fetch,`${this.url}/DeleteIndex`,{vectorBucketName:e,indexName:t},{headers:this.headers}))||{},error:null}}catch(r){if(this.shouldThrowOnError)throw r;if(U(r))return{data:null,error:r};throw r}})}}class ns{constructor(e,t={},r){this.shouldThrowOnError=!1,this.url=e.replace(/\/$/,""),this.headers=Object.assign(Object.assign({},Tt),t),this.fetch=Je(r)}throwOnError(){return this.shouldThrowOnError=!0,this}putVectors(e){return y(this,void 0,void 0,function*(){try{if(e.vectors.length<1||e.vectors.length>500)throw new Error("Vector batch size must be between 1 and 500 items");return{data:(yield N(this.fetch,`${this.url}/PutVectors`,e,{headers:this.headers}))||{},error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(U(t))return{data:null,error:t};throw t}})}getVectors(e){return y(this,void 0,void 0,function*(){try{return{data:yield N(this.fetch,`${this.url}/GetVectors`,e,{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(U(t))return{data:null,error:t};throw t}})}listVectors(e){return y(this,void 0,void 0,function*(){try{if(e.segmentCount!==void 0){if(e.segmentCount<1||e.segmentCount>16)throw new Error("segmentCount must be between 1 and 16");if(e.segmentIndex!==void 0&&(e.segmentIndex<0||e.segmentIndex>=e.segmentCount))throw new Error(`segmentIndex must be between 0 and ${e.segmentCount-1}`)}return{data:yield N(this.fetch,`${this.url}/ListVectors`,e,{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(U(t))return{data:null,error:t};throw t}})}queryVectors(e){return y(this,void 0,void 0,function*(){try{return{data:yield N(this.fetch,`${this.url}/QueryVectors`,e,{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(U(t))return{data:null,error:t};throw t}})}deleteVectors(e){return y(this,void 0,void 0,function*(){try{if(e.keys.length<1||e.keys.length>500)throw new Error("Keys batch size must be between 1 and 500 items");return{data:(yield N(this.fetch,`${this.url}/DeleteVectors`,e,{headers:this.headers}))||{},error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(U(t))return{data:null,error:t};throw t}})}}class is{constructor(e,t={},r){this.shouldThrowOnError=!1,this.url=e.replace(/\/$/,""),this.headers=Object.assign(Object.assign({},Tt),t),this.fetch=Je(r)}throwOnError(){return this.shouldThrowOnError=!0,this}createBucket(e){return y(this,void 0,void 0,function*(){try{return{data:(yield N(this.fetch,`${this.url}/CreateVectorBucket`,{vectorBucketName:e},{headers:this.headers}))||{},error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(U(t))return{data:null,error:t};throw t}})}getBucket(e){return y(this,void 0,void 0,function*(){try{return{data:yield N(this.fetch,`${this.url}/GetVectorBucket`,{vectorBucketName:e},{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(U(t))return{data:null,error:t};throw t}})}listBuckets(){return y(this,arguments,void 0,function*(e={}){try{return{data:yield N(this.fetch,`${this.url}/ListVectorBuckets`,e,{headers:this.headers}),error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(U(t))return{data:null,error:t};throw t}})}deleteBucket(e){return y(this,void 0,void 0,function*(){try{return{data:(yield N(this.fetch,`${this.url}/DeleteVectorBucket`,{vectorBucketName:e},{headers:this.headers}))||{},error:null}}catch(t){if(this.shouldThrowOnError)throw t;if(U(t))return{data:null,error:t};throw t}})}}class as extends is{constructor(e,t={}){super(e,t.headers||{},t.fetch)}from(e){return new os(this.url,this.headers,e,this.fetch)}createBucket(e){const t=Object.create(null,{createBucket:{get:()=>super.createBucket}});return y(this,void 0,void 0,function*(){return t.createBucket.call(this,e)})}getBucket(e){const t=Object.create(null,{getBucket:{get:()=>super.getBucket}});return y(this,void 0,void 0,function*(){return t.getBucket.call(this,e)})}listBuckets(){const e=Object.create(null,{listBuckets:{get:()=>super.listBuckets}});return y(this,arguments,void 0,function*(t={}){return e.listBuckets.call(this,t)})}deleteBucket(e){const t=Object.create(null,{deleteBucket:{get:()=>super.deleteBucket}});return y(this,void 0,void 0,function*(){return t.deleteBucket.call(this,e)})}}class os extends ss{constructor(e,t,r,n){super(e,t,n),this.vectorBucketName=r}createIndex(e){const t=Object.create(null,{createIndex:{get:()=>super.createIndex}});return y(this,void 0,void 0,function*(){return t.createIndex.call(this,Object.assign(Object.assign({},e),{vectorBucketName:this.vectorBucketName}))})}listIndexes(){const e=Object.create(null,{listIndexes:{get:()=>super.listIndexes}});return y(this,arguments,void 0,function*(t={}){return e.listIndexes.call(this,Object.assign(Object.assign({},t),{vectorBucketName:this.vectorBucketName}))})}getIndex(e){const t=Object.create(null,{getIndex:{get:()=>super.getIndex}});return y(this,void 0,void 0,function*(){return t.getIndex.call(this,this.vectorBucketName,e)})}deleteIndex(e){const t=Object.create(null,{deleteIndex:{get:()=>super.deleteIndex}});return y(this,void 0,void 0,function*(){return t.deleteIndex.call(this,this.vectorBucketName,e)})}index(e){return new ls(this.url,this.headers,this.vectorBucketName,e,this.fetch)}}class ls extends ns{constructor(e,t,r,n,i){super(e,t,i),this.vectorBucketName=r,this.indexName=n}putVectors(e){const t=Object.create(null,{putVectors:{get:()=>super.putVectors}});return y(this,void 0,void 0,function*(){return t.putVectors.call(this,Object.assign(Object.assign({},e),{vectorBucketName:this.vectorBucketName,indexName:this.indexName}))})}getVectors(e){const t=Object.create(null,{getVectors:{get:()=>super.getVectors}});return y(this,void 0,void 0,function*(){return t.getVectors.call(this,Object.assign(Object.assign({},e),{vectorBucketName:this.vectorBucketName,indexName:this.indexName}))})}listVectors(){const e=Object.create(null,{listVectors:{get:()=>super.listVectors}});return y(this,arguments,void 0,function*(t={}){return e.listVectors.call(this,Object.assign(Object.assign({},t),{vectorBucketName:this.vectorBucketName,indexName:this.indexName}))})}queryVectors(e){const t=Object.create(null,{queryVectors:{get:()=>super.queryVectors}});return y(this,void 0,void 0,function*(){return t.queryVectors.call(this,Object.assign(Object.assign({},e),{vectorBucketName:this.vectorBucketName,indexName:this.indexName}))})}deleteVectors(e){const t=Object.create(null,{deleteVectors:{get:()=>super.deleteVectors}});return y(this,void 0,void 0,function*(){return t.deleteVectors.call(this,Object.assign(Object.assign({},e),{vectorBucketName:this.vectorBucketName,indexName:this.indexName}))})}}class Kn extends In{constructor(e,t={},r,n){super(e,t,r,n)}from(e){return new Cn(this.url,this.headers,e,this.fetch)}get vectors(){return new as(this.url+"/vector",{headers:this.headers,fetch:this.fetch})}get analytics(){return new es(this.url+"/iceberg",this.headers,this.fetch)}}const Gn=Object.freeze(Object.defineProperty({__proto__:null,StorageAnalyticsClient:es,StorageApiError:Yr,StorageClient:Kn,StorageError:xe,StorageUnknownError:qe,StorageVectorsApiError:$e,StorageVectorsClient:as,StorageVectorsError:At,get StorageVectorsErrorCode(){return mt},StorageVectorsUnknownError:ts,VectorBucketApi:is,VectorBucketScope:os,VectorDataApi:ns,VectorIndexApi:ss,VectorIndexScope:ls,isPlainObject:rs,isStorageError:O,isStorageVectorsError:U,normalizeToFloat32:qn,resolveFetch:Je,resolveResponse:zn,validateVectorDimension:Fn},Symbol.toStringTag,{value:"Module"})),Hn=_e(Gn);var cs={},Ye={};Object.defineProperty(Ye,"__esModule",{value:!0});Ye.version=void 0;Ye.version="2.86.2";(function(s){Object.defineProperty(s,"__esModule",{value:!0}),s.DEFAULT_REALTIME_OPTIONS=s.DEFAULT_AUTH_OPTIONS=s.DEFAULT_DB_OPTIONS=s.DEFAULT_GLOBAL_OPTIONS=s.DEFAULT_HEADERS=void 0;const e=Ye;let t="";typeof Deno<"u"?t="deno":typeof document<"u"?t="web":typeof navigator<"u"&&navigator.product==="ReactNative"?t="react-native":t="node",s.DEFAULT_HEADERS={"X-Client-Info":`supabase-js-${t}/${e.version}`},s.DEFAULT_GLOBAL_OPTIONS={headers:s.DEFAULT_HEADERS},s.DEFAULT_DB_OPTIONS={schema:"public"},s.DEFAULT_AUTH_OPTIONS={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"implicit"},s.DEFAULT_REALTIME_OPTIONS={}})(cs);var us={};(function(s){Object.defineProperty(s,"__esModule",{value:!0}),s.fetchWithAuth=s.resolveHeadersConstructor=s.resolveFetch=void 0;const e=n=>n?(...i)=>n(...i):(...i)=>fetch(...i);s.resolveFetch=e;const t=()=>Headers;s.resolveHeadersConstructor=t;const r=(n,i,a)=>{const o=(0,s.resolveFetch)(a),l=(0,s.resolveHeadersConstructor)();return async(c,u)=>{var h;const f=(h=await i())!==null&&h!==void 0?h:n;let d=new l(u==null?void 0:u.headers);return d.has("apikey")||d.set("apikey",n),d.has("Authorization")||d.set("Authorization",`Bearer ${f}`),o(c,Object.assign(Object.assign({},u),{headers:d}))}};s.fetchWithAuth=r})(us);var H={};Object.defineProperty(H,"__esModule",{value:!0});H.isBrowser=void 0;H.uuid=Jn;H.ensureTrailingSlash=ds;H.applySettingDefaults=Qn;H.validateSupabaseUrl=Xn;function Jn(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(s){var e=Math.random()*16|0,t=s=="x"?e:e&3|8;return t.toString(16)})}function ds(s){return s.endsWith("/")?s:s+"/"}const Yn=()=>typeof window<"u";H.isBrowser=Yn;function Qn(s,e){var t,r;const{db:n,auth:i,realtime:a,global:o}=s,{db:l,auth:c,realtime:u,global:h}=e,f={db:Object.assign(Object.assign({},l),n),auth:Object.assign(Object.assign({},c),i),realtime:Object.assign(Object.assign({},u),a),storage:{},global:Object.assign(Object.assign(Object.assign({},h),o),{headers:Object.assign(Object.assign({},(t=h==null?void 0:h.headers)!==null&&t!==void 0?t:{}),(r=o==null?void 0:o.headers)!==null&&r!==void 0?r:{})}),accessToken:async()=>""};return s.accessToken?f.accessToken=s.accessToken:delete f.accessToken,f}function Xn(s){const e=s==null?void 0:s.trim();if(!e)throw new Error("supabaseUrl is required.");if(!e.match(/^https?:\/\//i))throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");try{return new URL(ds(e))}catch{throw Error("Invalid supabaseUrl: Provided URL is malformed.")}}var Qe={};const hs="2.86.2",le=30*1e3,vt=3,rt=vt*le,Zn="http://localhost:9999",ei="supabase.auth.token",ti={"X-Client-Info":`gotrue-js/${hs}`},bt="X-Supabase-Api-Version",fs={"2024-01-01":{timestamp:Date.parse("2024-01-01T00:00:00.0Z"),name:"2024-01-01"}},ri=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,si=10*60*1e3;let fe=class extends Error{constructor(e,t,r){super(e),this.__isAuthError=!0,this.name="AuthError",this.status=t,this.code=r}};function w(s){return typeof s=="object"&&s!==null&&"__isAuthError"in s}let gs=class extends fe{constructor(e,t,r){super(e,t,r),this.name="AuthApiError",this.status=t,this.code=r}};function ps(s){return w(s)&&s.name==="AuthApiError"}let V=class extends fe{constructor(e,t){super(e),this.name="AuthUnknownError",this.originalError=t}},M=class extends fe{constructor(e,t,r,n){super(e,r,n),this.name=t,this.status=r}},$=class extends M{constructor(){super("Auth session missing!","AuthSessionMissingError",400,void 0)}};function ms(s){return w(s)&&s.name==="AuthSessionMissingError"}let Q=class extends M{constructor(){super("Auth session or user missing","AuthInvalidTokenResponseError",500,void 0)}},ve=class extends M{constructor(e){super(e,"AuthInvalidCredentialsError",400,void 0)}},be=class extends M{constructor(e,t=null){super(e,"AuthImplicitGrantRedirectError",500,void 0),this.details=null,this.details=t}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}};function vs(s){return w(s)&&s.name==="AuthImplicitGrantRedirectError"}let yt=class extends M{constructor(e,t=null){super(e,"AuthPKCEGrantCodeExchangeError",500,void 0),this.details=null,this.details=t}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}},Fe=class extends M{constructor(e,t){super(e,"AuthRetryableFetchError",t,void 0)}};function Ue(s){return w(s)&&s.name==="AuthRetryableFetchError"}let wt=class extends M{constructor(e,t,r){super(e,"AuthWeakPasswordError",t,"weak_password"),this.reasons=r}};function ni(s){return w(s)&&s.name==="AuthWeakPasswordError"}let Me=class extends M{constructor(e){super(e,"AuthInvalidJwtError",400,"invalid_jwt")}};const We="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),Ft=` 	
\r=`.split(""),ii=(()=>{const s=new Array(128);for(let e=0;e<s.length;e+=1)s[e]=-1;for(let e=0;e<Ft.length;e+=1)s[Ft[e].charCodeAt(0)]=-2;for(let e=0;e<We.length;e+=1)s[We[e].charCodeAt(0)]=e;return s})();function Mt(s,e,t){if(s!==null)for(e.queue=e.queue<<8|s,e.queuedBits+=8;e.queuedBits>=6;){const r=e.queue>>e.queuedBits-6&63;t(We[r]),e.queuedBits-=6}else if(e.queuedBits>0)for(e.queue=e.queue<<6-e.queuedBits,e.queuedBits=6;e.queuedBits>=6;){const r=e.queue>>e.queuedBits-6&63;t(We[r]),e.queuedBits-=6}}function bs(s,e,t){const r=ii[s];if(r>-1)for(e.queue=e.queue<<6|r,e.queuedBits+=6;e.queuedBits>=8;)t(e.queue>>e.queuedBits-8&255),e.queuedBits-=8;else{if(r===-2)return;throw new Error(`Invalid Base64-URL character "${String.fromCharCode(s)}"`)}}function Wt(s){const e=[],t=a=>{e.push(String.fromCodePoint(a))},r={utf8seq:0,codepoint:0},n={queue:0,queuedBits:0},i=a=>{li(a,r,t)};for(let a=0;a<s.length;a+=1)bs(s.charCodeAt(a),n,i);return e.join("")}function ai(s,e){if(s<=127){e(s);return}else if(s<=2047){e(192|s>>6),e(128|s&63);return}else if(s<=65535){e(224|s>>12),e(128|s>>6&63),e(128|s&63);return}else if(s<=1114111){e(240|s>>18),e(128|s>>12&63),e(128|s>>6&63),e(128|s&63);return}throw new Error(`Unrecognized Unicode codepoint: ${s.toString(16)}`)}function oi(s,e){for(let t=0;t<s.length;t+=1){let r=s.charCodeAt(t);if(r>55295&&r<=56319){const n=(r-55296)*1024&65535;r=(s.charCodeAt(t+1)-56320&65535|n)+65536,t+=1}ai(r,e)}}function li(s,e,t){if(e.utf8seq===0){if(s<=127){t(s);return}for(let r=1;r<6;r+=1)if(!(s>>7-r&1)){e.utf8seq=r;break}if(e.utf8seq===2)e.codepoint=s&31;else if(e.utf8seq===3)e.codepoint=s&15;else if(e.utf8seq===4)e.codepoint=s&7;else throw new Error("Invalid UTF-8 sequence");e.utf8seq-=1}else if(e.utf8seq>0){if(s<=127)throw new Error("Invalid UTF-8 sequence");e.codepoint=e.codepoint<<6|s&63,e.utf8seq-=1,e.utf8seq===0&&t(e.codepoint)}}function de(s){const e=[],t={queue:0,queuedBits:0},r=n=>{e.push(n)};for(let n=0;n<s.length;n+=1)bs(s.charCodeAt(n),t,r);return new Uint8Array(e)}function ci(s){const e=[];return oi(s,t=>e.push(t)),new Uint8Array(e)}function re(s){const e=[],t={queue:0,queuedBits:0},r=n=>{e.push(n)};return s.forEach(n=>Mt(n,t,r)),Mt(null,t,r),e.join("")}function ui(s){return Math.round(Date.now()/1e3)+s}function di(){return Symbol("auth-callback")}const C=()=>typeof window<"u"&&typeof document<"u",J={tested:!1,writable:!1},ys=()=>{if(!C())return!1;try{if(typeof globalThis.localStorage!="object")return!1}catch{return!1}if(J.tested)return J.writable;const s=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(s,s),globalThis.localStorage.removeItem(s),J.tested=!0,J.writable=!0}catch{J.tested=!0,J.writable=!1}return J.writable};function hi(s){const e={},t=new URL(s);if(t.hash&&t.hash[0]==="#")try{new URLSearchParams(t.hash.substring(1)).forEach((n,i)=>{e[i]=n})}catch{}return t.searchParams.forEach((r,n)=>{e[n]=r}),e}const ws=s=>s?(...e)=>s(...e):(...e)=>fetch(...e),fi=s=>typeof s=="object"&&s!==null&&"status"in s&&"ok"in s&&"json"in s&&typeof s.json=="function",ce=async(s,e,t)=>{await s.setItem(e,JSON.stringify(t))},Y=async(s,e)=>{const t=await s.getItem(e);if(!t)return null;try{return JSON.parse(t)}catch{return t}},P=async(s,e)=>{await s.removeItem(e)};class Xe{constructor(){this.promise=new Xe.promiseConstructor((e,t)=>{this.resolve=e,this.reject=t})}}Xe.promiseConstructor=Promise;function st(s){const e=s.split(".");if(e.length!==3)throw new Me("Invalid JWT structure");for(let r=0;r<e.length;r++)if(!ri.test(e[r]))throw new Me("JWT not in base64url format");return{header:JSON.parse(Wt(e[0])),payload:JSON.parse(Wt(e[1])),signature:de(e[2]),raw:{header:e[0],payload:e[1]}}}async function gi(s){return await new Promise(e=>{setTimeout(()=>e(null),s)})}function pi(s,e){return new Promise((r,n)=>{(async()=>{for(let i=0;i<1/0;i++)try{const a=await s(i);if(!e(i,null,a)){r(a);return}}catch(a){if(!e(i,a)){n(a);return}}})()})}function mi(s){return("0"+s.toString(16)).substr(-2)}function vi(){const e=new Uint32Array(56);if(typeof crypto>"u"){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",r=t.length;let n="";for(let i=0;i<56;i++)n+=t.charAt(Math.floor(Math.random()*r));return n}return crypto.getRandomValues(e),Array.from(e,mi).join("")}async function bi(s){const t=new TextEncoder().encode(s),r=await crypto.subtle.digest("SHA-256",t),n=new Uint8Array(r);return Array.from(n).map(i=>String.fromCharCode(i)).join("")}async function yi(s){if(!(typeof crypto<"u"&&typeof crypto.subtle<"u"&&typeof TextEncoder<"u"))return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."),s;const t=await bi(s);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}async function ie(s,e,t=!1){const r=vi();let n=r;t&&(n+="/PASSWORD_RECOVERY"),await ce(s,`${e}-code-verifier`,n);const i=await yi(r);return[i,r===i?"plain":"s256"]}const wi=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function _i(s){const e=s.headers.get(bt);if(!e||!e.match(wi))return null;try{return new Date(`${e}T00:00:00.0Z`)}catch{return null}}function xi(s){if(!s)throw new Error("Missing exp claim");const e=Math.floor(Date.now()/1e3);if(s<=e)throw new Error("JWT has expired")}function Ei(s){switch(s){case"RS256":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}};case"ES256":return{name:"ECDSA",namedCurve:"P-256",hash:{name:"SHA-256"}};default:throw new Error("Invalid alg claim")}}const ki=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;function ae(s){if(!ki.test(s))throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not")}function nt(){const s={};return new Proxy(s,{get:(e,t)=>{if(t==="__isUserNotAvailableProxy")return!0;if(typeof t=="symbol"){const r=t.toString();if(r==="Symbol(Symbol.toPrimitive)"||r==="Symbol(Symbol.toStringTag)"||r==="Symbol(util.inspect.custom)")return}throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${t}" property of the session object is not supported. Please use getUser() instead.`)},set:(e,t)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)},deleteProperty:(e,t)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)}})}function Si(s,e){return new Proxy(s,{get:(t,r,n)=>{if(r==="__isInsecureUserWarningProxy")return!0;if(typeof r=="symbol"){const i=r.toString();if(i==="Symbol(Symbol.toPrimitive)"||i==="Symbol(Symbol.toStringTag)"||i==="Symbol(util.inspect.custom)"||i==="Symbol(nodejs.util.inspect.custom)")return Reflect.get(t,r,n)}return!e.value&&typeof r=="string"&&(console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."),e.value=!0),Reflect.get(t,r,n)}})}function Vt(s){return JSON.parse(JSON.stringify(s))}const X=s=>s.msg||s.message||s.error_description||s.error||JSON.stringify(s),Oi=[502,503,504];async function Kt(s){var e;if(!fi(s))throw new Fe(X(s),0);if(Oi.includes(s.status))throw new Fe(X(s),s.status);let t;try{t=await s.json()}catch(i){throw new V(X(i),i)}let r;const n=_i(s);if(n&&n.getTime()>=fs["2024-01-01"].timestamp&&typeof t=="object"&&t&&typeof t.code=="string"?r=t.code:typeof t=="object"&&t&&typeof t.error_code=="string"&&(r=t.error_code),r){if(r==="weak_password")throw new wt(X(t),s.status,((e=t.weak_password)===null||e===void 0?void 0:e.reasons)||[]);if(r==="session_not_found")throw new $}else if(typeof t=="object"&&t&&typeof t.weak_password=="object"&&t.weak_password&&Array.isArray(t.weak_password.reasons)&&t.weak_password.reasons.length&&t.weak_password.reasons.reduce((i,a)=>i&&typeof a=="string",!0))throw new wt(X(t),s.status,t.weak_password.reasons);throw new gs(X(t),s.status||500,r)}const Ti=(s,e,t,r)=>{const n={method:s,headers:(e==null?void 0:e.headers)||{}};return s==="GET"?n:(n.headers=Object.assign({"Content-Type":"application/json;charset=UTF-8"},e==null?void 0:e.headers),n.body=JSON.stringify(r),Object.assign(Object.assign({},n),t))};async function x(s,e,t,r){var n;const i=Object.assign({},r==null?void 0:r.headers);i[bt]||(i[bt]=fs["2024-01-01"].name),r!=null&&r.jwt&&(i.Authorization=`Bearer ${r.jwt}`);const a=(n=r==null?void 0:r.query)!==null&&n!==void 0?n:{};r!=null&&r.redirectTo&&(a.redirect_to=r.redirectTo);const o=Object.keys(a).length?"?"+new URLSearchParams(a).toString():"",l=await Ai(s,e,t+o,{headers:i,noResolveJson:r==null?void 0:r.noResolveJson},{},r==null?void 0:r.body);return r!=null&&r.xform?r==null?void 0:r.xform(l):{data:Object.assign({},l),error:null}}async function Ai(s,e,t,r,n,i){const a=Ti(e,r,n,i);let o;try{o=await s(t,Object.assign({},a))}catch(l){throw console.error(l),new Fe(X(l),0)}if(o.ok||await Kt(o),r!=null&&r.noResolveJson)return o;try{return await o.json()}catch(l){await Kt(l)}}function L(s){var e;let t=null;Pi(s)&&(t=Object.assign({},s),s.expires_at||(t.expires_at=ui(s.expires_in)));const r=(e=s.user)!==null&&e!==void 0?e:s;return{data:{session:t,user:r},error:null}}function Gt(s){const e=L(s);return!e.error&&s.weak_password&&typeof s.weak_password=="object"&&Array.isArray(s.weak_password.reasons)&&s.weak_password.reasons.length&&s.weak_password.message&&typeof s.weak_password.message=="string"&&s.weak_password.reasons.reduce((t,r)=>t&&typeof r=="string",!0)&&(e.data.weak_password=s.weak_password),e}function K(s){var e;return{data:{user:(e=s.user)!==null&&e!==void 0?e:s},error:null}}function Ri(s){return{data:s,error:null}}function ji(s){const{action_link:e,email_otp:t,hashed_token:r,redirect_to:n,verification_type:i}=s,a=ge(s,["action_link","email_otp","hashed_token","redirect_to","verification_type"]),o={action_link:e,email_otp:t,hashed_token:r,redirect_to:n,verification_type:i},l=Object.assign({},a);return{data:{properties:o,user:l},error:null}}function Ht(s){return s}function Pi(s){return s.access_token&&s.refresh_token&&s.expires_in}const Ne=["global","local","others"];let Rt=class{constructor({url:e="",headers:t={},fetch:r}){this.url=e,this.headers=t,this.fetch=ws(r),this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)},this.oauth={listClients:this._listOAuthClients.bind(this),createClient:this._createOAuthClient.bind(this),getClient:this._getOAuthClient.bind(this),updateClient:this._updateOAuthClient.bind(this),deleteClient:this._deleteOAuthClient.bind(this),regenerateClientSecret:this._regenerateOAuthClientSecret.bind(this)}}async signOut(e,t=Ne[0]){if(Ne.indexOf(t)<0)throw new Error(`@supabase/auth-js: Parameter scope must be one of ${Ne.join(", ")}`);try{return await x(this.fetch,"POST",`${this.url}/logout?scope=${t}`,{headers:this.headers,jwt:e,noResolveJson:!0}),{data:null,error:null}}catch(r){if(w(r))return{data:null,error:r};throw r}}async inviteUserByEmail(e,t={}){try{return await x(this.fetch,"POST",`${this.url}/invite`,{body:{email:e,data:t.data},headers:this.headers,redirectTo:t.redirectTo,xform:K})}catch(r){if(w(r))return{data:{user:null},error:r};throw r}}async generateLink(e){try{const{options:t}=e,r=ge(e,["options"]),n=Object.assign(Object.assign({},r),t);return"newEmail"in r&&(n.new_email=r==null?void 0:r.newEmail,delete n.newEmail),await x(this.fetch,"POST",`${this.url}/admin/generate_link`,{body:n,headers:this.headers,xform:ji,redirectTo:t==null?void 0:t.redirectTo})}catch(t){if(w(t))return{data:{properties:null,user:null},error:t};throw t}}async createUser(e){try{return await x(this.fetch,"POST",`${this.url}/admin/users`,{body:e,headers:this.headers,xform:K})}catch(t){if(w(t))return{data:{user:null},error:t};throw t}}async listUsers(e){var t,r,n,i,a,o,l;try{const c={nextPage:null,lastPage:0,total:0},u=await x(this.fetch,"GET",`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(r=(t=e==null?void 0:e.page)===null||t===void 0?void 0:t.toString())!==null&&r!==void 0?r:"",per_page:(i=(n=e==null?void 0:e.perPage)===null||n===void 0?void 0:n.toString())!==null&&i!==void 0?i:""},xform:Ht});if(u.error)throw u.error;const h=await u.json(),f=(a=u.headers.get("x-total-count"))!==null&&a!==void 0?a:0,d=(l=(o=u.headers.get("link"))===null||o===void 0?void 0:o.split(","))!==null&&l!==void 0?l:[];return d.length>0&&(d.forEach(g=>{const m=parseInt(g.split(";")[0].split("=")[1].substring(0,1)),p=JSON.parse(g.split(";")[1].split("=")[1]);c[`${p}Page`]=m}),c.total=parseInt(f)),{data:Object.assign(Object.assign({},h),c),error:null}}catch(c){if(w(c))return{data:{users:[]},error:c};throw c}}async getUserById(e){ae(e);try{return await x(this.fetch,"GET",`${this.url}/admin/users/${e}`,{headers:this.headers,xform:K})}catch(t){if(w(t))return{data:{user:null},error:t};throw t}}async updateUserById(e,t){ae(e);try{return await x(this.fetch,"PUT",`${this.url}/admin/users/${e}`,{body:t,headers:this.headers,xform:K})}catch(r){if(w(r))return{data:{user:null},error:r};throw r}}async deleteUser(e,t=!1){ae(e);try{return await x(this.fetch,"DELETE",`${this.url}/admin/users/${e}`,{headers:this.headers,body:{should_soft_delete:t},xform:K})}catch(r){if(w(r))return{data:{user:null},error:r};throw r}}async _listFactors(e){ae(e.userId);try{const{data:t,error:r}=await x(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/factors`,{headers:this.headers,xform:n=>({data:{factors:n},error:null})});return{data:t,error:r}}catch(t){if(w(t))return{data:null,error:t};throw t}}async _deleteFactor(e){ae(e.userId),ae(e.id);try{return{data:await x(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/factors/${e.id}`,{headers:this.headers}),error:null}}catch(t){if(w(t))return{data:null,error:t};throw t}}async _listOAuthClients(e){var t,r,n,i,a,o,l;try{const c={nextPage:null,lastPage:0,total:0},u=await x(this.fetch,"GET",`${this.url}/admin/oauth/clients`,{headers:this.headers,noResolveJson:!0,query:{page:(r=(t=e==null?void 0:e.page)===null||t===void 0?void 0:t.toString())!==null&&r!==void 0?r:"",per_page:(i=(n=e==null?void 0:e.perPage)===null||n===void 0?void 0:n.toString())!==null&&i!==void 0?i:""},xform:Ht});if(u.error)throw u.error;const h=await u.json(),f=(a=u.headers.get("x-total-count"))!==null&&a!==void 0?a:0,d=(l=(o=u.headers.get("link"))===null||o===void 0?void 0:o.split(","))!==null&&l!==void 0?l:[];return d.length>0&&(d.forEach(g=>{const m=parseInt(g.split(";")[0].split("=")[1].substring(0,1)),p=JSON.parse(g.split(";")[1].split("=")[1]);c[`${p}Page`]=m}),c.total=parseInt(f)),{data:Object.assign(Object.assign({},h),c),error:null}}catch(c){if(w(c))return{data:{clients:[]},error:c};throw c}}async _createOAuthClient(e){try{return await x(this.fetch,"POST",`${this.url}/admin/oauth/clients`,{body:e,headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if(w(t))return{data:null,error:t};throw t}}async _getOAuthClient(e){try{return await x(this.fetch,"GET",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if(w(t))return{data:null,error:t};throw t}}async _updateOAuthClient(e,t){try{return await x(this.fetch,"PUT",`${this.url}/admin/oauth/clients/${e}`,{body:t,headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(w(r))return{data:null,error:r};throw r}}async _deleteOAuthClient(e){try{return await x(this.fetch,"DELETE",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(t){if(w(t))return{data:null,error:t};throw t}}async _regenerateOAuthClientSecret(e){try{return await x(this.fetch,"POST",`${this.url}/admin/oauth/clients/${e}/regenerate_secret`,{headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if(w(t))return{data:null,error:t};throw t}}};function Jt(s={}){return{getItem:e=>s[e]||null,setItem:(e,t)=>{s[e]=t},removeItem:e=>{delete s[e]}}}const Z={debug:!!(globalThis&&ys()&&globalThis.localStorage&&globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug")==="true")};class jt extends Error{constructor(e){super(e),this.isAcquireTimeout=!0}}let _s=class extends jt{};class Ci extends jt{}async function xs(s,e,t){Z.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquire lock",s,e);const r=new globalThis.AbortController;return e>0&&setTimeout(()=>{r.abort(),Z.debug&&console.log("@supabase/gotrue-js: navigatorLock acquire timed out",s)},e),await Promise.resolve().then(()=>globalThis.navigator.locks.request(s,e===0?{mode:"exclusive",ifAvailable:!0}:{mode:"exclusive",signal:r.signal},async n=>{if(n){Z.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquired",s,n.name);try{return await t()}finally{Z.debug&&console.log("@supabase/gotrue-js: navigatorLock: released",s,n.name)}}else{if(e===0)throw Z.debug&&console.log("@supabase/gotrue-js: navigatorLock: not immediately available",s),new _s(`Acquiring an exclusive Navigator LockManager lock "${s}" immediately failed`);if(Z.debug)try{const i=await globalThis.navigator.locks.query();console.log("@supabase/gotrue-js: Navigator LockManager state",JSON.stringify(i,null,"  "))}catch(i){console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state",i)}return console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"),await t()}}))}const Yt={};async function Ii(s,e,t){var r;const n=(r=Yt[s])!==null&&r!==void 0?r:Promise.resolve(),i=Promise.race([n.catch(()=>null),e>=0?new Promise((a,o)=>{setTimeout(()=>{o(new Ci(`Acquring process lock with name "${s}" timed out`))},e)}):null].filter(a=>a)).catch(a=>{if(a&&a.isAcquireTimeout)throw a;return null}).then(async()=>await t());return Yt[s]=i.catch(async a=>{if(a&&a.isAcquireTimeout)return await n,null;throw a}),await i}function $i(){if(typeof globalThis!="object")try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<"u"&&(self.globalThis=self)}}function Es(s){if(!/^0x[a-fA-F0-9]{40}$/.test(s))throw new Error(`@supabase/auth-js: Address "${s}" is invalid.`);return s.toLowerCase()}function Ui(s){return parseInt(s,16)}function Ni(s){const e=new TextEncoder().encode(s);return"0x"+Array.from(e,r=>r.toString(16).padStart(2,"0")).join("")}function Li(s){var e;const{chainId:t,domain:r,expirationTime:n,issuedAt:i=new Date,nonce:a,notBefore:o,requestId:l,resources:c,scheme:u,uri:h,version:f}=s;{if(!Number.isInteger(t))throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${t}`);if(!r)throw new Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');if(a&&a.length<8)throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${a}`);if(!h)throw new Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');if(f!=="1")throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${f}`);if(!((e=s.statement)===null||e===void 0)&&e.includes(`
`))throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${s.statement}`)}const d=Es(s.address),g=u?`${u}://${r}`:r,m=s.statement?`${s.statement}
`:"",p=`${g} wants you to sign in with your Ethereum account:
${d}

${m}`;let b=`URI: ${h}
Version: ${f}
Chain ID: ${t}${a?`
Nonce: ${a}`:""}
Issued At: ${i.toISOString()}`;if(n&&(b+=`
Expiration Time: ${n.toISOString()}`),o&&(b+=`
Not Before: ${o.toISOString()}`),l&&(b+=`
Request ID: ${l}`),c){let _=`
Resources:`;for(const v of c){if(!v||typeof v!="string")throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${v}`);_+=`
- ${v}`}b+=_}return`${p}
${b}`}class R extends Error{constructor({message:e,code:t,cause:r,name:n}){var i;super(e,{cause:r}),this.__isWebAuthnError=!0,this.name=(i=n??(r instanceof Error?r.name:void 0))!==null&&i!==void 0?i:"Unknown Error",this.code=t}}class Ve extends R{constructor(e,t){super({code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t,message:e}),this.name="WebAuthnUnknownError",this.originalError=t}}function Di({error:s,options:e}){var t,r,n;const{publicKey:i}=e;if(!i)throw Error("options was missing required publicKey property");if(s.name==="AbortError"){if(e.signal instanceof AbortSignal)return new R({message:"Registration ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:s})}else if(s.name==="ConstraintError"){if(((t=i.authenticatorSelection)===null||t===void 0?void 0:t.requireResidentKey)===!0)return new R({message:"Discoverable credentials were required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",cause:s});if(e.mediation==="conditional"&&((r=i.authenticatorSelection)===null||r===void 0?void 0:r.userVerification)==="required")return new R({message:"User verification was required during automatic registration but it could not be performed",code:"ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",cause:s});if(((n=i.authenticatorSelection)===null||n===void 0?void 0:n.userVerification)==="required")return new R({message:"User verification was required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",cause:s})}else{if(s.name==="InvalidStateError")return new R({message:"The authenticator was previously registered",code:"ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",cause:s});if(s.name==="NotAllowedError")return new R({message:s.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:s});if(s.name==="NotSupportedError")return i.pubKeyCredParams.filter(o=>o.type==="public-key").length===0?new R({message:'No entry in pubKeyCredParams was of type "public-key"',code:"ERROR_MALFORMED_PUBKEYCREDPARAMS",cause:s}):new R({message:"No available authenticator supported any of the specified pubKeyCredParams algorithms",code:"ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",cause:s});if(s.name==="SecurityError"){const a=window.location.hostname;if(ks(a)){if(i.rp.id!==a)return new R({message:`The RP ID "${i.rp.id}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:s})}else return new R({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:s})}else if(s.name==="TypeError"){if(i.user.id.byteLength<1||i.user.id.byteLength>64)return new R({message:"User ID was not between 1 and 64 characters",code:"ERROR_INVALID_USER_ID_LENGTH",cause:s})}else if(s.name==="UnknownError")return new R({message:"The authenticator was unable to process the specified options, or could not create a new credential",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:s})}return new R({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:s})}function Bi({error:s,options:e}){const{publicKey:t}=e;if(!t)throw Error("options was missing required publicKey property");if(s.name==="AbortError"){if(e.signal instanceof AbortSignal)return new R({message:"Authentication ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:s})}else{if(s.name==="NotAllowedError")return new R({message:s.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:s});if(s.name==="SecurityError"){const r=window.location.hostname;if(ks(r)){if(t.rpId!==r)return new R({message:`The RP ID "${t.rpId}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:s})}else return new R({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:s})}else if(s.name==="UnknownError")return new R({message:"The authenticator was unable to process the specified options, or could not create a new assertion signature",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:s})}return new R({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:s})}class zi{createNewAbortSignal(){if(this.controller){const t=new Error("Cancelling existing WebAuthn API call for new one");t.name="AbortError",this.controller.abort(t)}const e=new AbortController;return this.controller=e,e.signal}cancelCeremony(){if(this.controller){const e=new Error("Manually cancelling existing WebAuthn API call");e.name="AbortError",this.controller.abort(e),this.controller=void 0}}}const qi=new zi;function Fi(s){if(!s)throw new Error("Credential creation options are required");if(typeof PublicKeyCredential<"u"&&"parseCreationOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseCreationOptionsFromJSON=="function")return PublicKeyCredential.parseCreationOptionsFromJSON(s);const{challenge:e,user:t,excludeCredentials:r}=s,n=ge(s,["challenge","user","excludeCredentials"]),i=de(e).buffer,a=Object.assign(Object.assign({},t),{id:de(t.id).buffer}),o=Object.assign(Object.assign({},n),{challenge:i,user:a});if(r&&r.length>0){o.excludeCredentials=new Array(r.length);for(let l=0;l<r.length;l++){const c=r[l];o.excludeCredentials[l]=Object.assign(Object.assign({},c),{id:de(c.id).buffer,type:c.type||"public-key",transports:c.transports})}}return o}function Mi(s){if(!s)throw new Error("Credential request options are required");if(typeof PublicKeyCredential<"u"&&"parseRequestOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseRequestOptionsFromJSON=="function")return PublicKeyCredential.parseRequestOptionsFromJSON(s);const{challenge:e,allowCredentials:t}=s,r=ge(s,["challenge","allowCredentials"]),n=de(e).buffer,i=Object.assign(Object.assign({},r),{challenge:n});if(t&&t.length>0){i.allowCredentials=new Array(t.length);for(let a=0;a<t.length;a++){const o=t[a];i.allowCredentials[a]=Object.assign(Object.assign({},o),{id:de(o.id).buffer,type:o.type||"public-key",transports:o.transports})}}return i}function Wi(s){var e;if("toJSON"in s&&typeof s.toJSON=="function")return s.toJSON();const t=s;return{id:s.id,rawId:s.id,response:{attestationObject:re(new Uint8Array(s.response.attestationObject)),clientDataJSON:re(new Uint8Array(s.response.clientDataJSON))},type:"public-key",clientExtensionResults:s.getClientExtensionResults(),authenticatorAttachment:(e=t.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function Vi(s){var e;if("toJSON"in s&&typeof s.toJSON=="function")return s.toJSON();const t=s,r=s.getClientExtensionResults(),n=s.response;return{id:s.id,rawId:s.id,response:{authenticatorData:re(new Uint8Array(n.authenticatorData)),clientDataJSON:re(new Uint8Array(n.clientDataJSON)),signature:re(new Uint8Array(n.signature)),userHandle:n.userHandle?re(new Uint8Array(n.userHandle)):void 0},type:"public-key",clientExtensionResults:r,authenticatorAttachment:(e=t.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function ks(s){return s==="localhost"||/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(s)}function Qt(){var s,e;return!!(C()&&"PublicKeyCredential"in window&&window.PublicKeyCredential&&"credentials"in navigator&&typeof((s=navigator==null?void 0:navigator.credentials)===null||s===void 0?void 0:s.create)=="function"&&typeof((e=navigator==null?void 0:navigator.credentials)===null||e===void 0?void 0:e.get)=="function")}async function Ki(s){try{const e=await navigator.credentials.create(s);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new Ve("Browser returned unexpected credential type",e)}:{data:null,error:new Ve("Empty credential response",e)}}catch(e){return{data:null,error:Di({error:e,options:s})}}}async function Gi(s){try{const e=await navigator.credentials.get(s);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new Ve("Browser returned unexpected credential type",e)}:{data:null,error:new Ve("Empty credential response",e)}}catch(e){return{data:null,error:Bi({error:e,options:s})}}}const Hi={hints:["security-key"],authenticatorSelection:{authenticatorAttachment:"cross-platform",requireResidentKey:!1,userVerification:"preferred",residentKey:"discouraged"},attestation:"direct"},Ji={userVerification:"preferred",hints:["security-key"],attestation:"direct"};function Ke(...s){const e=n=>n!==null&&typeof n=="object"&&!Array.isArray(n),t=n=>n instanceof ArrayBuffer||ArrayBuffer.isView(n),r={};for(const n of s)if(n)for(const i in n){const a=n[i];if(a!==void 0)if(Array.isArray(a))r[i]=a;else if(t(a))r[i]=a;else if(e(a)){const o=r[i];e(o)?r[i]=Ke(o,a):r[i]=Ke(a)}else r[i]=a}return r}function Yi(s,e){return Ke(Hi,s,e||{})}function Qi(s,e){return Ke(Ji,s,e||{})}class Xi{constructor(e){this.client=e,this.enroll=this._enroll.bind(this),this.challenge=this._challenge.bind(this),this.verify=this._verify.bind(this),this.authenticate=this._authenticate.bind(this),this.register=this._register.bind(this)}async _enroll(e){return this.client.mfa.enroll(Object.assign(Object.assign({},e),{factorType:"webauthn"}))}async _challenge({factorId:e,webauthn:t,friendlyName:r,signal:n},i){try{const{data:a,error:o}=await this.client.mfa.challenge({factorId:e,webauthn:t});if(!a)return{data:null,error:o};const l=n??qi.createNewAbortSignal();if(a.webauthn.type==="create"){const{user:c}=a.webauthn.credential_options.publicKey;c.name||(c.name=`${c.id}:${r}`),c.displayName||(c.displayName=c.name)}switch(a.webauthn.type){case"create":{const c=Yi(a.webauthn.credential_options.publicKey,i==null?void 0:i.create),{data:u,error:h}=await Ki({publicKey:c,signal:l});return u?{data:{factorId:e,challengeId:a.id,webauthn:{type:a.webauthn.type,credential_response:u}},error:null}:{data:null,error:h}}case"request":{const c=Qi(a.webauthn.credential_options.publicKey,i==null?void 0:i.request),{data:u,error:h}=await Gi(Object.assign(Object.assign({},a.webauthn.credential_options),{publicKey:c,signal:l}));return u?{data:{factorId:e,challengeId:a.id,webauthn:{type:a.webauthn.type,credential_response:u}},error:null}:{data:null,error:h}}}}catch(a){return w(a)?{data:null,error:a}:{data:null,error:new V("Unexpected error in challenge",a)}}}async _verify({challengeId:e,factorId:t,webauthn:r}){return this.client.mfa.verify({factorId:t,challengeId:e,webauthn:r})}async _authenticate({factorId:e,webauthn:{rpId:t=typeof window<"u"?window.location.hostname:void 0,rpOrigins:r=typeof window<"u"?[window.location.origin]:void 0,signal:n}={}},i){if(!t)return{data:null,error:new fe("rpId is required for WebAuthn authentication")};try{if(!Qt())return{data:null,error:new V("Browser does not support WebAuthn",null)};const{data:a,error:o}=await this.challenge({factorId:e,webauthn:{rpId:t,rpOrigins:r},signal:n},{request:i});if(!a)return{data:null,error:o};const{webauthn:l}=a;return this._verify({factorId:e,challengeId:a.challengeId,webauthn:{type:l.type,rpId:t,rpOrigins:r,credential_response:l.credential_response}})}catch(a){return w(a)?{data:null,error:a}:{data:null,error:new V("Unexpected error in authenticate",a)}}}async _register({friendlyName:e,webauthn:{rpId:t=typeof window<"u"?window.location.hostname:void 0,rpOrigins:r=typeof window<"u"?[window.location.origin]:void 0,signal:n}={}},i){if(!t)return{data:null,error:new fe("rpId is required for WebAuthn registration")};try{if(!Qt())return{data:null,error:new V("Browser does not support WebAuthn",null)};const{data:a,error:o}=await this._enroll({friendlyName:e});if(!a)return await this.client.mfa.listFactors().then(u=>{var h;return(h=u.data)===null||h===void 0?void 0:h.all.find(f=>f.factor_type==="webauthn"&&f.friendly_name===e&&f.status!=="unverified")}).then(u=>u?this.client.mfa.unenroll({factorId:u==null?void 0:u.id}):void 0),{data:null,error:o};const{data:l,error:c}=await this._challenge({factorId:a.id,friendlyName:a.friendly_name,webauthn:{rpId:t,rpOrigins:r},signal:n},{create:i});return l?this._verify({factorId:a.id,challengeId:l.challengeId,webauthn:{rpId:t,rpOrigins:r,type:l.webauthn.type,credential_response:l.webauthn.credential_response}}):{data:null,error:c}}catch(a){return w(a)?{data:null,error:a}:{data:null,error:new V("Unexpected error in register",a)}}}}$i();const Zi={url:Zn,storageKey:ei,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:ti,flowType:"implicit",debug:!1,hasCustomAuthorizationHeader:!1,throwOnError:!1};async function Xt(s,e,t){return await t()}const oe={};let Pt=class _t{get jwks(){var e,t;return(t=(e=oe[this.storageKey])===null||e===void 0?void 0:e.jwks)!==null&&t!==void 0?t:{keys:[]}}set jwks(e){oe[this.storageKey]=Object.assign(Object.assign({},oe[this.storageKey]),{jwks:e})}get jwks_cached_at(){var e,t;return(t=(e=oe[this.storageKey])===null||e===void 0?void 0:e.cachedAt)!==null&&t!==void 0?t:Number.MIN_SAFE_INTEGER}set jwks_cached_at(e){oe[this.storageKey]=Object.assign(Object.assign({},oe[this.storageKey]),{cachedAt:e})}constructor(e){var t,r,n;this.userStorage=null,this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.initializePromise=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log;const i=Object.assign(Object.assign({},Zi),e);if(this.storageKey=i.storageKey,this.instanceID=(t=_t.nextInstanceID[this.storageKey])!==null&&t!==void 0?t:0,_t.nextInstanceID[this.storageKey]=this.instanceID+1,this.logDebugMessages=!!i.debug,typeof i.debug=="function"&&(this.logger=i.debug),this.instanceID>0&&C()){const a=`${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;console.warn(a),this.logDebugMessages&&console.trace(a)}if(this.persistSession=i.persistSession,this.autoRefreshToken=i.autoRefreshToken,this.admin=new Rt({url:i.url,headers:i.headers,fetch:i.fetch}),this.url=i.url,this.headers=i.headers,this.fetch=ws(i.fetch),this.lock=i.lock||Xt,this.detectSessionInUrl=i.detectSessionInUrl,this.flowType=i.flowType,this.hasCustomAuthorizationHeader=i.hasCustomAuthorizationHeader,this.throwOnError=i.throwOnError,i.lock?this.lock=i.lock:C()&&(!((r=globalThis==null?void 0:globalThis.navigator)===null||r===void 0)&&r.locks)?this.lock=xs:this.lock=Xt,this.jwks||(this.jwks={keys:[]},this.jwks_cached_at=Number.MIN_SAFE_INTEGER),this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this),webauthn:new Xi(this)},this.oauth={getAuthorizationDetails:this._getAuthorizationDetails.bind(this),approveAuthorization:this._approveAuthorization.bind(this),denyAuthorization:this._denyAuthorization.bind(this),listGrants:this._listOAuthGrants.bind(this),revokeGrant:this._revokeOAuthGrant.bind(this)},this.persistSession?(i.storage?this.storage=i.storage:ys()?this.storage=globalThis.localStorage:(this.memoryStorage={},this.storage=Jt(this.memoryStorage)),i.userStorage&&(this.userStorage=i.userStorage)):(this.memoryStorage={},this.storage=Jt(this.memoryStorage)),C()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(a){console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available",a)}(n=this.broadcastChannel)===null||n===void 0||n.addEventListener("message",async a=>{this._debug("received broadcast notification from other tab or client",a),await this._notifyAllSubscribers(a.data.event,a.data.session,!1)})}this.initialize()}isThrowOnErrorEnabled(){return this.throwOnError}_returnResult(e){if(this.throwOnError&&e&&e.error)throw e.error;return e}_logPrefix(){return`GoTrueClient@${this.storageKey}:${this.instanceID} (${hs}) ${new Date().toISOString()}`}_debug(...e){return this.logDebugMessages&&this.logger(this._logPrefix(),...e),this}async initialize(){return this.initializePromise?await this.initializePromise:(this.initializePromise=(async()=>await this._acquireLock(-1,async()=>await this._initialize()))(),await this.initializePromise)}async _initialize(){var e;try{let t={},r="none";if(C()&&(t=hi(window.location.href),this._isImplicitGrantCallback(t)?r="implicit":await this._isPKCECallback(t)&&(r="pkce")),C()&&this.detectSessionInUrl&&r!=="none"){const{data:n,error:i}=await this._getSessionFromURL(t,r);if(i){if(this._debug("#_initialize()","error detecting session from URL",i),vs(i)){const l=(e=i.details)===null||e===void 0?void 0:e.code;if(l==="identity_already_exists"||l==="identity_not_found"||l==="single_identity_not_deletable")return{error:i}}return await this._removeSession(),{error:i}}const{session:a,redirectType:o}=n;return this._debug("#_initialize()","detected session in URL",a,"redirect type",o),await this._saveSession(a),setTimeout(async()=>{o==="recovery"?await this._notifyAllSubscribers("PASSWORD_RECOVERY",a):await this._notifyAllSubscribers("SIGNED_IN",a)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(t){return w(t)?this._returnResult({error:t}):this._returnResult({error:new V("Unexpected error during initialization",t)})}finally{await this._handleVisibilityChange(),this._debug("#_initialize()","end")}}async signInAnonymously(e){var t,r,n;try{const i=await x(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{data:(r=(t=e==null?void 0:e.options)===null||t===void 0?void 0:t.data)!==null&&r!==void 0?r:{},gotrue_meta_security:{captcha_token:(n=e==null?void 0:e.options)===null||n===void 0?void 0:n.captchaToken}},xform:L}),{data:a,error:o}=i;if(o||!a)return this._returnResult({data:{user:null,session:null},error:o});const l=a.session,c=a.user;return a.session&&(await this._saveSession(a.session),await this._notifyAllSubscribers("SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(i){if(w(i))return this._returnResult({data:{user:null,session:null},error:i});throw i}}async signUp(e){var t,r,n;try{let i;if("email"in e){const{email:u,password:h,options:f}=e;let d=null,g=null;this.flowType==="pkce"&&([d,g]=await ie(this.storage,this.storageKey)),i=await x(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,redirectTo:f==null?void 0:f.emailRedirectTo,body:{email:u,password:h,data:(t=f==null?void 0:f.data)!==null&&t!==void 0?t:{},gotrue_meta_security:{captcha_token:f==null?void 0:f.captchaToken},code_challenge:d,code_challenge_method:g},xform:L})}else if("phone"in e){const{phone:u,password:h,options:f}=e;i=await x(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{phone:u,password:h,data:(r=f==null?void 0:f.data)!==null&&r!==void 0?r:{},channel:(n=f==null?void 0:f.channel)!==null&&n!==void 0?n:"sms",gotrue_meta_security:{captcha_token:f==null?void 0:f.captchaToken}},xform:L})}else throw new ve("You must provide either an email or phone number and a password");const{data:a,error:o}=i;if(o||!a)return await P(this.storage,`${this.storageKey}-code-verifier`),this._returnResult({data:{user:null,session:null},error:o});const l=a.session,c=a.user;return a.session&&(await this._saveSession(a.session),await this._notifyAllSubscribers("SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(i){if(await P(this.storage,`${this.storageKey}-code-verifier`),w(i))return this._returnResult({data:{user:null,session:null},error:i});throw i}}async signInWithPassword(e){try{let t;if("email"in e){const{email:i,password:a,options:o}=e;t=await x(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:i,password:a,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}},xform:Gt})}else if("phone"in e){const{phone:i,password:a,options:o}=e;t=await x(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:i,password:a,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}},xform:Gt})}else throw new ve("You must provide either an email or phone number and a password");const{data:r,error:n}=t;if(n)return this._returnResult({data:{user:null,session:null},error:n});if(!r||!r.session||!r.user){const i=new Q;return this._returnResult({data:{user:null,session:null},error:i})}return r.session&&(await this._saveSession(r.session),await this._notifyAllSubscribers("SIGNED_IN",r.session)),this._returnResult({data:Object.assign({user:r.user,session:r.session},r.weak_password?{weakPassword:r.weak_password}:null),error:n})}catch(t){if(w(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async signInWithOAuth(e){var t,r,n,i;return await this._handleProviderSignIn(e.provider,{redirectTo:(t=e.options)===null||t===void 0?void 0:t.redirectTo,scopes:(r=e.options)===null||r===void 0?void 0:r.scopes,queryParams:(n=e.options)===null||n===void 0?void 0:n.queryParams,skipBrowserRedirect:(i=e.options)===null||i===void 0?void 0:i.skipBrowserRedirect})}async exchangeCodeForSession(e){return await this.initializePromise,this._acquireLock(-1,async()=>this._exchangeCodeForSession(e))}async signInWithWeb3(e){const{chain:t}=e;switch(t){case"ethereum":return await this.signInWithEthereum(e);case"solana":return await this.signInWithSolana(e);default:throw new Error(`@supabase/auth-js: Unsupported chain "${t}"`)}}async signInWithEthereum(e){var t,r,n,i,a,o,l,c,u,h,f;let d,g;if("message"in e)d=e.message,g=e.signature;else{const{chain:m,wallet:p,statement:b,options:_}=e;let v;if(C())if(typeof p=="object")v=p;else{const F=window;if("ethereum"in F&&typeof F.ethereum=="object"&&"request"in F.ethereum&&typeof F.ethereum.request=="function")v=F.ethereum;else throw new Error("@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.")}else{if(typeof p!="object"||!(_!=null&&_.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");v=p}const E=new URL((t=_==null?void 0:_.url)!==null&&t!==void 0?t:window.location.href),T=await v.request({method:"eth_requestAccounts"}).then(F=>F).catch(()=>{throw new Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid")});if(!T||T.length===0)throw new Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");const k=Es(T[0]);let j=(r=_==null?void 0:_.signInWithEthereum)===null||r===void 0?void 0:r.chainId;if(!j){const F=await v.request({method:"eth_chainId"});j=Ui(F)}const W={domain:E.host,address:k,statement:b,uri:E.href,version:"1",chainId:j,nonce:(n=_==null?void 0:_.signInWithEthereum)===null||n===void 0?void 0:n.nonce,issuedAt:(a=(i=_==null?void 0:_.signInWithEthereum)===null||i===void 0?void 0:i.issuedAt)!==null&&a!==void 0?a:new Date,expirationTime:(o=_==null?void 0:_.signInWithEthereum)===null||o===void 0?void 0:o.expirationTime,notBefore:(l=_==null?void 0:_.signInWithEthereum)===null||l===void 0?void 0:l.notBefore,requestId:(c=_==null?void 0:_.signInWithEthereum)===null||c===void 0?void 0:c.requestId,resources:(u=_==null?void 0:_.signInWithEthereum)===null||u===void 0?void 0:u.resources};d=Li(W),g=await v.request({method:"personal_sign",params:[Ni(d),k]})}try{const{data:m,error:p}=await x(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"ethereum",message:d,signature:g},!((h=e.options)===null||h===void 0)&&h.captchaToken?{gotrue_meta_security:{captcha_token:(f=e.options)===null||f===void 0?void 0:f.captchaToken}}:null),xform:L});if(p)throw p;if(!m||!m.session||!m.user){const b=new Q;return this._returnResult({data:{user:null,session:null},error:b})}return m.session&&(await this._saveSession(m.session),await this._notifyAllSubscribers("SIGNED_IN",m.session)),this._returnResult({data:Object.assign({},m),error:p})}catch(m){if(w(m))return this._returnResult({data:{user:null,session:null},error:m});throw m}}async signInWithSolana(e){var t,r,n,i,a,o,l,c,u,h,f,d;let g,m;if("message"in e)g=e.message,m=e.signature;else{const{chain:p,wallet:b,statement:_,options:v}=e;let E;if(C())if(typeof b=="object")E=b;else{const k=window;if("solana"in k&&typeof k.solana=="object"&&("signIn"in k.solana&&typeof k.solana.signIn=="function"||"signMessage"in k.solana&&typeof k.solana.signMessage=="function"))E=k.solana;else throw new Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.")}else{if(typeof b!="object"||!(v!=null&&v.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");E=b}const T=new URL((t=v==null?void 0:v.url)!==null&&t!==void 0?t:window.location.href);if("signIn"in E&&E.signIn){const k=await E.signIn(Object.assign(Object.assign(Object.assign({issuedAt:new Date().toISOString()},v==null?void 0:v.signInWithSolana),{version:"1",domain:T.host,uri:T.href}),_?{statement:_}:null));let j;if(Array.isArray(k)&&k[0]&&typeof k[0]=="object")j=k[0];else if(k&&typeof k=="object"&&"signedMessage"in k&&"signature"in k)j=k;else throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");if("signedMessage"in j&&"signature"in j&&(typeof j.signedMessage=="string"||j.signedMessage instanceof Uint8Array)&&j.signature instanceof Uint8Array)g=typeof j.signedMessage=="string"?j.signedMessage:new TextDecoder().decode(j.signedMessage),m=j.signature;else throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields")}else{if(!("signMessage"in E)||typeof E.signMessage!="function"||!("publicKey"in E)||typeof E!="object"||!E.publicKey||!("toBase58"in E.publicKey)||typeof E.publicKey.toBase58!="function")throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");g=[`${T.host} wants you to sign in with your Solana account:`,E.publicKey.toBase58(),..._?["",_,""]:[""],"Version: 1",`URI: ${T.href}`,`Issued At: ${(n=(r=v==null?void 0:v.signInWithSolana)===null||r===void 0?void 0:r.issuedAt)!==null&&n!==void 0?n:new Date().toISOString()}`,...!((i=v==null?void 0:v.signInWithSolana)===null||i===void 0)&&i.notBefore?[`Not Before: ${v.signInWithSolana.notBefore}`]:[],...!((a=v==null?void 0:v.signInWithSolana)===null||a===void 0)&&a.expirationTime?[`Expiration Time: ${v.signInWithSolana.expirationTime}`]:[],...!((o=v==null?void 0:v.signInWithSolana)===null||o===void 0)&&o.chainId?[`Chain ID: ${v.signInWithSolana.chainId}`]:[],...!((l=v==null?void 0:v.signInWithSolana)===null||l===void 0)&&l.nonce?[`Nonce: ${v.signInWithSolana.nonce}`]:[],...!((c=v==null?void 0:v.signInWithSolana)===null||c===void 0)&&c.requestId?[`Request ID: ${v.signInWithSolana.requestId}`]:[],...!((h=(u=v==null?void 0:v.signInWithSolana)===null||u===void 0?void 0:u.resources)===null||h===void 0)&&h.length?["Resources",...v.signInWithSolana.resources.map(j=>`- ${j}`)]:[]].join(`
`);const k=await E.signMessage(new TextEncoder().encode(g),"utf8");if(!k||!(k instanceof Uint8Array))throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");m=k}}try{const{data:p,error:b}=await x(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"solana",message:g,signature:re(m)},!((f=e.options)===null||f===void 0)&&f.captchaToken?{gotrue_meta_security:{captcha_token:(d=e.options)===null||d===void 0?void 0:d.captchaToken}}:null),xform:L});if(b)throw b;if(!p||!p.session||!p.user){const _=new Q;return this._returnResult({data:{user:null,session:null},error:_})}return p.session&&(await this._saveSession(p.session),await this._notifyAllSubscribers("SIGNED_IN",p.session)),this._returnResult({data:Object.assign({},p),error:b})}catch(p){if(w(p))return this._returnResult({data:{user:null,session:null},error:p});throw p}}async _exchangeCodeForSession(e){const t=await Y(this.storage,`${this.storageKey}-code-verifier`),[r,n]=(t??"").split("/");try{const{data:i,error:a}=await x(this.fetch,"POST",`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:e,code_verifier:r},xform:L});if(await P(this.storage,`${this.storageKey}-code-verifier`),a)throw a;if(!i||!i.session||!i.user){const o=new Q;return this._returnResult({data:{user:null,session:null,redirectType:null},error:o})}return i.session&&(await this._saveSession(i.session),await this._notifyAllSubscribers("SIGNED_IN",i.session)),this._returnResult({data:Object.assign(Object.assign({},i),{redirectType:n??null}),error:a})}catch(i){if(await P(this.storage,`${this.storageKey}-code-verifier`),w(i))return this._returnResult({data:{user:null,session:null,redirectType:null},error:i});throw i}}async signInWithIdToken(e){try{const{options:t,provider:r,token:n,access_token:i,nonce:a}=e,o=await x(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:r,id_token:n,access_token:i,nonce:a,gotrue_meta_security:{captcha_token:t==null?void 0:t.captchaToken}},xform:L}),{data:l,error:c}=o;if(c)return this._returnResult({data:{user:null,session:null},error:c});if(!l||!l.session||!l.user){const u=new Q;return this._returnResult({data:{user:null,session:null},error:u})}return l.session&&(await this._saveSession(l.session),await this._notifyAllSubscribers("SIGNED_IN",l.session)),this._returnResult({data:l,error:c})}catch(t){if(w(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async signInWithOtp(e){var t,r,n,i,a;try{if("email"in e){const{email:o,options:l}=e;let c=null,u=null;this.flowType==="pkce"&&([c,u]=await ie(this.storage,this.storageKey));const{error:h}=await x(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{email:o,data:(t=l==null?void 0:l.data)!==null&&t!==void 0?t:{},create_user:(r=l==null?void 0:l.shouldCreateUser)!==null&&r!==void 0?r:!0,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken},code_challenge:c,code_challenge_method:u},redirectTo:l==null?void 0:l.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:h})}if("phone"in e){const{phone:o,options:l}=e,{data:c,error:u}=await x(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{phone:o,data:(n=l==null?void 0:l.data)!==null&&n!==void 0?n:{},create_user:(i=l==null?void 0:l.shouldCreateUser)!==null&&i!==void 0?i:!0,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken},channel:(a=l==null?void 0:l.channel)!==null&&a!==void 0?a:"sms"}});return this._returnResult({data:{user:null,session:null,messageId:c==null?void 0:c.message_id},error:u})}throw new ve("You must provide either an email or phone number.")}catch(o){if(await P(this.storage,`${this.storageKey}-code-verifier`),w(o))return this._returnResult({data:{user:null,session:null},error:o});throw o}}async verifyOtp(e){var t,r;try{let n,i;"options"in e&&(n=(t=e.options)===null||t===void 0?void 0:t.redirectTo,i=(r=e.options)===null||r===void 0?void 0:r.captchaToken);const{data:a,error:o}=await x(this.fetch,"POST",`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},e),{gotrue_meta_security:{captcha_token:i}}),redirectTo:n,xform:L});if(o)throw o;if(!a)throw new Error("An error occurred on token verification.");const l=a.session,c=a.user;return l!=null&&l.access_token&&(await this._saveSession(l),await this._notifyAllSubscribers(e.type=="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(n){if(w(n))return this._returnResult({data:{user:null,session:null},error:n});throw n}}async signInWithSSO(e){var t,r,n,i,a;try{let o=null,l=null;this.flowType==="pkce"&&([o,l]=await ie(this.storage,this.storageKey));const c=await x(this.fetch,"POST",`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},"providerId"in e?{provider_id:e.providerId}:null),"domain"in e?{domain:e.domain}:null),{redirect_to:(r=(t=e.options)===null||t===void 0?void 0:t.redirectTo)!==null&&r!==void 0?r:void 0}),!((n=e==null?void 0:e.options)===null||n===void 0)&&n.captchaToken?{gotrue_meta_security:{captcha_token:e.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:o,code_challenge_method:l}),headers:this.headers,xform:Ri});return!((i=c.data)===null||i===void 0)&&i.url&&C()&&!(!((a=e.options)===null||a===void 0)&&a.skipBrowserRedirect)&&window.location.assign(c.data.url),this._returnResult(c)}catch(o){if(await P(this.storage,`${this.storageKey}-code-verifier`),w(o))return this._returnResult({data:null,error:o});throw o}}async reauthenticate(){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._reauthenticate())}async _reauthenticate(){try{return await this._useSession(async e=>{const{data:{session:t},error:r}=e;if(r)throw r;if(!t)throw new $;const{error:n}=await x(this.fetch,"GET",`${this.url}/reauthenticate`,{headers:this.headers,jwt:t.access_token});return this._returnResult({data:{user:null,session:null},error:n})})}catch(e){if(w(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async resend(e){try{const t=`${this.url}/resend`;if("email"in e){const{email:r,type:n,options:i}=e,{error:a}=await x(this.fetch,"POST",t,{headers:this.headers,body:{email:r,type:n,gotrue_meta_security:{captcha_token:i==null?void 0:i.captchaToken}},redirectTo:i==null?void 0:i.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:a})}else if("phone"in e){const{phone:r,type:n,options:i}=e,{data:a,error:o}=await x(this.fetch,"POST",t,{headers:this.headers,body:{phone:r,type:n,gotrue_meta_security:{captcha_token:i==null?void 0:i.captchaToken}}});return this._returnResult({data:{user:null,session:null,messageId:a==null?void 0:a.message_id},error:o})}throw new ve("You must provide either an email or phone number and a type")}catch(t){if(w(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async getSession(){return await this.initializePromise,await this._acquireLock(-1,async()=>this._useSession(async t=>t))}async _acquireLock(e,t){this._debug("#_acquireLock","begin",e);try{if(this.lockAcquired){const r=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),n=(async()=>(await r,await t()))();return this.pendingInLock.push((async()=>{try{await n}catch{}})()),n}return await this.lock(`lock:${this.storageKey}`,e,async()=>{this._debug("#_acquireLock","lock acquired for storage key",this.storageKey);try{this.lockAcquired=!0;const r=t();for(this.pendingInLock.push((async()=>{try{await r}catch{}})()),await r;this.pendingInLock.length;){const n=[...this.pendingInLock];await Promise.all(n),this.pendingInLock.splice(0,n.length)}return await r}finally{this._debug("#_acquireLock","lock released for storage key",this.storageKey),this.lockAcquired=!1}})}finally{this._debug("#_acquireLock","end")}}async _useSession(e){this._debug("#_useSession","begin");try{const t=await this.__loadSession();return await e(t)}finally{this._debug("#_useSession","end")}}async __loadSession(){this._debug("#__loadSession()","begin"),this.lockAcquired||this._debug("#__loadSession()","used outside of an acquired lock!",new Error().stack);try{let e=null;const t=await Y(this.storage,this.storageKey);if(this._debug("#getSession()","session from storage",t),t!==null&&(this._isValidSession(t)?e=t:(this._debug("#getSession()","session from storage is not valid"),await this._removeSession())),!e)return{data:{session:null},error:null};const r=e.expires_at?e.expires_at*1e3-Date.now()<rt:!1;if(this._debug("#__loadSession()",`session has${r?"":" not"} expired`,"expires_at",e.expires_at),!r){if(this.userStorage){const a=await Y(this.userStorage,this.storageKey+"-user");a!=null&&a.user?e.user=a.user:e.user=nt()}if(this.storage.isServer&&e.user&&!e.user.__isUserNotAvailableProxy){const a={value:this.suppressGetSessionWarning};e.user=Si(e.user,a),a.value&&(this.suppressGetSessionWarning=!0)}return{data:{session:e},error:null}}const{data:n,error:i}=await this._callRefreshToken(e.refresh_token);return i?this._returnResult({data:{session:null},error:i}):this._returnResult({data:{session:n},error:null})}finally{this._debug("#__loadSession()","end")}}async getUser(e){if(e)return await this._getUser(e);await this.initializePromise;const t=await this._acquireLock(-1,async()=>await this._getUser());return t.data.user&&(this.suppressGetSessionWarning=!0),t}async _getUser(e){try{return e?await x(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:e,xform:K}):await this._useSession(async t=>{var r,n,i;const{data:a,error:o}=t;if(o)throw o;return!(!((r=a.session)===null||r===void 0)&&r.access_token)&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new $}:await x(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:(i=(n=a.session)===null||n===void 0?void 0:n.access_token)!==null&&i!==void 0?i:void 0,xform:K})})}catch(t){if(w(t))return ms(t)&&(await this._removeSession(),await P(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({data:{user:null},error:t});throw t}}async updateUser(e,t={}){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._updateUser(e,t))}async _updateUser(e,t={}){try{return await this._useSession(async r=>{const{data:n,error:i}=r;if(i)throw i;if(!n.session)throw new $;const a=n.session;let o=null,l=null;this.flowType==="pkce"&&e.email!=null&&([o,l]=await ie(this.storage,this.storageKey));const{data:c,error:u}=await x(this.fetch,"PUT",`${this.url}/user`,{headers:this.headers,redirectTo:t==null?void 0:t.emailRedirectTo,body:Object.assign(Object.assign({},e),{code_challenge:o,code_challenge_method:l}),jwt:a.access_token,xform:K});if(u)throw u;return a.user=c.user,await this._saveSession(a),await this._notifyAllSubscribers("USER_UPDATED",a),this._returnResult({data:{user:a.user},error:null})})}catch(r){if(await P(this.storage,`${this.storageKey}-code-verifier`),w(r))return this._returnResult({data:{user:null},error:r});throw r}}async setSession(e){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._setSession(e))}async _setSession(e){try{if(!e.access_token||!e.refresh_token)throw new $;const t=Date.now()/1e3;let r=t,n=!0,i=null;const{payload:a}=st(e.access_token);if(a.exp&&(r=a.exp,n=r<=t),n){const{data:o,error:l}=await this._callRefreshToken(e.refresh_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});if(!o)return{data:{user:null,session:null},error:null};i=o}else{const{data:o,error:l}=await this._getUser(e.access_token);if(l)throw l;i={access_token:e.access_token,refresh_token:e.refresh_token,user:o.user,token_type:"bearer",expires_in:r-t,expires_at:r},await this._saveSession(i),await this._notifyAllSubscribers("SIGNED_IN",i)}return this._returnResult({data:{user:i.user,session:i},error:null})}catch(t){if(w(t))return this._returnResult({data:{session:null,user:null},error:t});throw t}}async refreshSession(e){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._refreshSession(e))}async _refreshSession(e){try{return await this._useSession(async t=>{var r;if(!e){const{data:a,error:o}=t;if(o)throw o;e=(r=a.session)!==null&&r!==void 0?r:void 0}if(!(e!=null&&e.refresh_token))throw new $;const{data:n,error:i}=await this._callRefreshToken(e.refresh_token);return i?this._returnResult({data:{user:null,session:null},error:i}):n?this._returnResult({data:{user:n.user,session:n},error:null}):this._returnResult({data:{user:null,session:null},error:null})})}catch(t){if(w(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async _getSessionFromURL(e,t){try{if(!C())throw new be("No browser detected.");if(e.error||e.error_description||e.error_code)throw new be(e.error_description||"Error in URL with unspecified error_description",{error:e.error||"unspecified_error",code:e.error_code||"unspecified_code"});switch(t){case"implicit":if(this.flowType==="pkce")throw new yt("Not a valid PKCE flow url.");break;case"pkce":if(this.flowType==="implicit")throw new be("Not a valid implicit grant flow url.");break;default:}if(t==="pkce"){if(this._debug("#_initialize()","begin","is PKCE flow",!0),!e.code)throw new yt("No code detected.");const{data:_,error:v}=await this._exchangeCodeForSession(e.code);if(v)throw v;const E=new URL(window.location.href);return E.searchParams.delete("code"),window.history.replaceState(window.history.state,"",E.toString()),{data:{session:_.session,redirectType:null},error:null}}const{provider_token:r,provider_refresh_token:n,access_token:i,refresh_token:a,expires_in:o,expires_at:l,token_type:c}=e;if(!i||!o||!a||!c)throw new be("No session defined in URL");const u=Math.round(Date.now()/1e3),h=parseInt(o);let f=u+h;l&&(f=parseInt(l));const d=f-u;d*1e3<=le&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${d}s, should have been closer to ${h}s`);const g=f-h;u-g>=120?console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",g,f,u):u-g<0&&console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",g,f,u);const{data:m,error:p}=await this._getUser(i);if(p)throw p;const b={provider_token:r,provider_refresh_token:n,access_token:i,expires_in:h,expires_at:f,refresh_token:a,token_type:c,user:m.user};return window.location.hash="",this._debug("#_getSessionFromURL()","clearing window.location.hash"),this._returnResult({data:{session:b,redirectType:e.type},error:null})}catch(r){if(w(r))return this._returnResult({data:{session:null,redirectType:null},error:r});throw r}}_isImplicitGrantCallback(e){return!!(e.access_token||e.error_description)}async _isPKCECallback(e){const t=await Y(this.storage,`${this.storageKey}-code-verifier`);return!!(e.code&&t)}async signOut(e={scope:"global"}){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._signOut(e))}async _signOut({scope:e}={scope:"global"}){return await this._useSession(async t=>{var r;const{data:n,error:i}=t;if(i)return this._returnResult({error:i});const a=(r=n.session)===null||r===void 0?void 0:r.access_token;if(a){const{error:o}=await this.admin.signOut(a,e);if(o&&!(ps(o)&&(o.status===404||o.status===401||o.status===403)))return this._returnResult({error:o})}return e!=="others"&&(await this._removeSession(),await P(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({error:null})})}onAuthStateChange(e){const t=di(),r={id:t,callback:e,unsubscribe:()=>{this._debug("#unsubscribe()","state change callback with id removed",t),this.stateChangeEmitters.delete(t)}};return this._debug("#onAuthStateChange()","registered callback with id",t),this.stateChangeEmitters.set(t,r),(async()=>(await this.initializePromise,await this._acquireLock(-1,async()=>{this._emitInitialSession(t)})))(),{data:{subscription:r}}}async _emitInitialSession(e){return await this._useSession(async t=>{var r,n;try{const{data:{session:i},error:a}=t;if(a)throw a;await((r=this.stateChangeEmitters.get(e))===null||r===void 0?void 0:r.callback("INITIAL_SESSION",i)),this._debug("INITIAL_SESSION","callback id",e,"session",i)}catch(i){await((n=this.stateChangeEmitters.get(e))===null||n===void 0?void 0:n.callback("INITIAL_SESSION",null)),this._debug("INITIAL_SESSION","callback id",e,"error",i),console.error(i)}})}async resetPasswordForEmail(e,t={}){let r=null,n=null;this.flowType==="pkce"&&([r,n]=await ie(this.storage,this.storageKey,!0));try{return await x(this.fetch,"POST",`${this.url}/recover`,{body:{email:e,code_challenge:r,code_challenge_method:n,gotrue_meta_security:{captcha_token:t.captchaToken}},headers:this.headers,redirectTo:t.redirectTo})}catch(i){if(await P(this.storage,`${this.storageKey}-code-verifier`),w(i))return this._returnResult({data:null,error:i});throw i}}async getUserIdentities(){var e;try{const{data:t,error:r}=await this.getUser();if(r)throw r;return this._returnResult({data:{identities:(e=t.user.identities)!==null&&e!==void 0?e:[]},error:null})}catch(t){if(w(t))return this._returnResult({data:null,error:t});throw t}}async linkIdentity(e){return"token"in e?this.linkIdentityIdToken(e):this.linkIdentityOAuth(e)}async linkIdentityOAuth(e){var t;try{const{data:r,error:n}=await this._useSession(async i=>{var a,o,l,c,u;const{data:h,error:f}=i;if(f)throw f;const d=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,e.provider,{redirectTo:(a=e.options)===null||a===void 0?void 0:a.redirectTo,scopes:(o=e.options)===null||o===void 0?void 0:o.scopes,queryParams:(l=e.options)===null||l===void 0?void 0:l.queryParams,skipBrowserRedirect:!0});return await x(this.fetch,"GET",d,{headers:this.headers,jwt:(u=(c=h.session)===null||c===void 0?void 0:c.access_token)!==null&&u!==void 0?u:void 0})});if(n)throw n;return C()&&!(!((t=e.options)===null||t===void 0)&&t.skipBrowserRedirect)&&window.location.assign(r==null?void 0:r.url),this._returnResult({data:{provider:e.provider,url:r==null?void 0:r.url},error:null})}catch(r){if(w(r))return this._returnResult({data:{provider:e.provider,url:null},error:r});throw r}}async linkIdentityIdToken(e){return await this._useSession(async t=>{var r;try{const{error:n,data:{session:i}}=t;if(n)throw n;const{options:a,provider:o,token:l,access_token:c,nonce:u}=e,h=await x(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,jwt:(r=i==null?void 0:i.access_token)!==null&&r!==void 0?r:void 0,body:{provider:o,id_token:l,access_token:c,nonce:u,link_identity:!0,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}},xform:L}),{data:f,error:d}=h;return d?this._returnResult({data:{user:null,session:null},error:d}):!f||!f.session||!f.user?this._returnResult({data:{user:null,session:null},error:new Q}):(f.session&&(await this._saveSession(f.session),await this._notifyAllSubscribers("USER_UPDATED",f.session)),this._returnResult({data:f,error:d}))}catch(n){if(await P(this.storage,`${this.storageKey}-code-verifier`),w(n))return this._returnResult({data:{user:null,session:null},error:n});throw n}})}async unlinkIdentity(e){try{return await this._useSession(async t=>{var r,n;const{data:i,error:a}=t;if(a)throw a;return await x(this.fetch,"DELETE",`${this.url}/user/identities/${e.identity_id}`,{headers:this.headers,jwt:(n=(r=i.session)===null||r===void 0?void 0:r.access_token)!==null&&n!==void 0?n:void 0})})}catch(t){if(w(t))return this._returnResult({data:null,error:t});throw t}}async _refreshAccessToken(e){const t=`#_refreshAccessToken(${e.substring(0,5)}...)`;this._debug(t,"begin");try{const r=Date.now();return await pi(async n=>(n>0&&await gi(200*Math.pow(2,n-1)),this._debug(t,"refreshing attempt",n),await x(this.fetch,"POST",`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:e},headers:this.headers,xform:L})),(n,i)=>{const a=200*Math.pow(2,n);return i&&Ue(i)&&Date.now()+a-r<le})}catch(r){if(this._debug(t,"error",r),w(r))return this._returnResult({data:{session:null,user:null},error:r});throw r}finally{this._debug(t,"end")}}_isValidSession(e){return typeof e=="object"&&e!==null&&"access_token"in e&&"refresh_token"in e&&"expires_at"in e}async _handleProviderSignIn(e,t){const r=await this._getUrlForProvider(`${this.url}/authorize`,e,{redirectTo:t.redirectTo,scopes:t.scopes,queryParams:t.queryParams});return this._debug("#_handleProviderSignIn()","provider",e,"options",t,"url",r),C()&&!t.skipBrowserRedirect&&window.location.assign(r),{data:{provider:e,url:r},error:null}}async _recoverAndRefresh(){var e,t;const r="#_recoverAndRefresh()";this._debug(r,"begin");try{const n=await Y(this.storage,this.storageKey);if(n&&this.userStorage){let a=await Y(this.userStorage,this.storageKey+"-user");!this.storage.isServer&&Object.is(this.storage,this.userStorage)&&!a&&(a={user:n.user},await ce(this.userStorage,this.storageKey+"-user",a)),n.user=(e=a==null?void 0:a.user)!==null&&e!==void 0?e:nt()}else if(n&&!n.user&&!n.user){const a=await Y(this.storage,this.storageKey+"-user");a&&(a!=null&&a.user)?(n.user=a.user,await P(this.storage,this.storageKey+"-user"),await ce(this.storage,this.storageKey,n)):n.user=nt()}if(this._debug(r,"session from storage",n),!this._isValidSession(n)){this._debug(r,"session is not valid"),n!==null&&await this._removeSession();return}const i=((t=n.expires_at)!==null&&t!==void 0?t:1/0)*1e3-Date.now()<rt;if(this._debug(r,`session has${i?"":" not"} expired with margin of ${rt}s`),i){if(this.autoRefreshToken&&n.refresh_token){const{error:a}=await this._callRefreshToken(n.refresh_token);a&&(console.error(a),Ue(a)||(this._debug(r,"refresh failed with a non-retryable error, removing the session",a),await this._removeSession()))}}else if(n.user&&n.user.__isUserNotAvailableProxy===!0)try{const{data:a,error:o}=await this._getUser(n.access_token);!o&&(a!=null&&a.user)?(n.user=a.user,await this._saveSession(n),await this._notifyAllSubscribers("SIGNED_IN",n)):this._debug(r,"could not get user data, skipping SIGNED_IN notification")}catch(a){console.error("Error getting user data:",a),this._debug(r,"error getting user data, skipping SIGNED_IN notification",a)}else await this._notifyAllSubscribers("SIGNED_IN",n)}catch(n){this._debug(r,"error",n),console.error(n);return}finally{this._debug(r,"end")}}async _callRefreshToken(e){var t,r;if(!e)throw new $;if(this.refreshingDeferred)return this.refreshingDeferred.promise;const n=`#_callRefreshToken(${e.substring(0,5)}...)`;this._debug(n,"begin");try{this.refreshingDeferred=new Xe;const{data:i,error:a}=await this._refreshAccessToken(e);if(a)throw a;if(!i.session)throw new $;await this._saveSession(i.session),await this._notifyAllSubscribers("TOKEN_REFRESHED",i.session);const o={data:i.session,error:null};return this.refreshingDeferred.resolve(o),o}catch(i){if(this._debug(n,"error",i),w(i)){const a={data:null,error:i};return Ue(i)||await this._removeSession(),(t=this.refreshingDeferred)===null||t===void 0||t.resolve(a),a}throw(r=this.refreshingDeferred)===null||r===void 0||r.reject(i),i}finally{this.refreshingDeferred=null,this._debug(n,"end")}}async _notifyAllSubscribers(e,t,r=!0){const n=`#_notifyAllSubscribers(${e})`;this._debug(n,"begin",t,`broadcast = ${r}`);try{this.broadcastChannel&&r&&this.broadcastChannel.postMessage({event:e,session:t});const i=[],a=Array.from(this.stateChangeEmitters.values()).map(async o=>{try{await o.callback(e,t)}catch(l){i.push(l)}});if(await Promise.all(a),i.length>0){for(let o=0;o<i.length;o+=1)console.error(i[o]);throw i[0]}}finally{this._debug(n,"end")}}async _saveSession(e){this._debug("#_saveSession()",e),this.suppressGetSessionWarning=!0,await P(this.storage,`${this.storageKey}-code-verifier`);const t=Object.assign({},e),r=t.user&&t.user.__isUserNotAvailableProxy===!0;if(this.userStorage){!r&&t.user&&await ce(this.userStorage,this.storageKey+"-user",{user:t.user});const n=Object.assign({},t);delete n.user;const i=Vt(n);await ce(this.storage,this.storageKey,i)}else{const n=Vt(t);await ce(this.storage,this.storageKey,n)}}async _removeSession(){this._debug("#_removeSession()"),this.suppressGetSessionWarning=!1,await P(this.storage,this.storageKey),await P(this.storage,this.storageKey+"-code-verifier"),await P(this.storage,this.storageKey+"-user"),this.userStorage&&await P(this.userStorage,this.storageKey+"-user"),await this._notifyAllSubscribers("SIGNED_OUT",null)}_removeVisibilityChangedCallback(){this._debug("#_removeVisibilityChangedCallback()");const e=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{e&&C()&&(window!=null&&window.removeEventListener)&&window.removeEventListener("visibilitychange",e)}catch(t){console.error("removing visibilitychange callback failed",t)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug("#_startAutoRefresh()");const e=setInterval(()=>this._autoRefreshTokenTick(),le);this.autoRefreshTicker=e,e&&typeof e=="object"&&typeof e.unref=="function"?e.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(e),setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0)}async _stopAutoRefresh(){this._debug("#_stopAutoRefresh()");const e=this.autoRefreshTicker;this.autoRefreshTicker=null,e&&clearInterval(e)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async _autoRefreshTokenTick(){this._debug("#_autoRefreshTokenTick()","begin");try{await this._acquireLock(0,async()=>{try{const e=Date.now();try{return await this._useSession(async t=>{const{data:{session:r}}=t;if(!r||!r.refresh_token||!r.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const n=Math.floor((r.expires_at*1e3-e)/le);this._debug("#_autoRefreshTokenTick()",`access token expires in ${n} ticks, a tick lasts ${le}ms, refresh threshold is ${vt} ticks`),n<=vt&&await this._callRefreshToken(r.refresh_token)})}catch(t){console.error("Auto refresh tick failed with error. This is likely a transient error.",t)}}finally{this._debug("#_autoRefreshTokenTick()","end")}})}catch(e){if(e.isAcquireTimeout||e instanceof jt)this._debug("auto refresh token tick lock not available");else throw e}}async _handleVisibilityChange(){if(this._debug("#_handleVisibilityChange()"),!C()||!(window!=null&&window.addEventListener))return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>await this._onVisibilityChanged(!1),window==null||window.addEventListener("visibilitychange",this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(e){console.error("_handleVisibilityChange",e)}}async _onVisibilityChanged(e){const t=`#_onVisibilityChanged(${e})`;this._debug(t,"visibilityState",document.visibilityState),document.visibilityState==="visible"?(this.autoRefreshToken&&this._startAutoRefresh(),e||(await this.initializePromise,await this._acquireLock(-1,async()=>{if(document.visibilityState!=="visible"){this._debug(t,"acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");return}await this._recoverAndRefresh()}))):document.visibilityState==="hidden"&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(e,t,r){const n=[`provider=${encodeURIComponent(t)}`];if(r!=null&&r.redirectTo&&n.push(`redirect_to=${encodeURIComponent(r.redirectTo)}`),r!=null&&r.scopes&&n.push(`scopes=${encodeURIComponent(r.scopes)}`),this.flowType==="pkce"){const[i,a]=await ie(this.storage,this.storageKey),o=new URLSearchParams({code_challenge:`${encodeURIComponent(i)}`,code_challenge_method:`${encodeURIComponent(a)}`});n.push(o.toString())}if(r!=null&&r.queryParams){const i=new URLSearchParams(r.queryParams);n.push(i.toString())}return r!=null&&r.skipBrowserRedirect&&n.push(`skip_http_redirect=${r.skipBrowserRedirect}`),`${e}?${n.join("&")}`}async _unenroll(e){try{return await this._useSession(async t=>{var r;const{data:n,error:i}=t;return i?this._returnResult({data:null,error:i}):await x(this.fetch,"DELETE",`${this.url}/factors/${e.factorId}`,{headers:this.headers,jwt:(r=n==null?void 0:n.session)===null||r===void 0?void 0:r.access_token})})}catch(t){if(w(t))return this._returnResult({data:null,error:t});throw t}}async _enroll(e){try{return await this._useSession(async t=>{var r,n;const{data:i,error:a}=t;if(a)return this._returnResult({data:null,error:a});const o=Object.assign({friendly_name:e.friendlyName,factor_type:e.factorType},e.factorType==="phone"?{phone:e.phone}:e.factorType==="totp"?{issuer:e.issuer}:{}),{data:l,error:c}=await x(this.fetch,"POST",`${this.url}/factors`,{body:o,headers:this.headers,jwt:(r=i==null?void 0:i.session)===null||r===void 0?void 0:r.access_token});return c?this._returnResult({data:null,error:c}):(e.factorType==="totp"&&l.type==="totp"&&(!((n=l==null?void 0:l.totp)===null||n===void 0)&&n.qr_code)&&(l.totp.qr_code=`data:image/svg+xml;utf-8,${l.totp.qr_code}`),this._returnResult({data:l,error:null}))})}catch(t){if(w(t))return this._returnResult({data:null,error:t});throw t}}async _verify(e){return this._acquireLock(-1,async()=>{try{return await this._useSession(async t=>{var r;const{data:n,error:i}=t;if(i)return this._returnResult({data:null,error:i});const a=Object.assign({challenge_id:e.challengeId},"webauthn"in e?{webauthn:Object.assign(Object.assign({},e.webauthn),{credential_response:e.webauthn.type==="create"?Wi(e.webauthn.credential_response):Vi(e.webauthn.credential_response)})}:{code:e.code}),{data:o,error:l}=await x(this.fetch,"POST",`${this.url}/factors/${e.factorId}/verify`,{body:a,headers:this.headers,jwt:(r=n==null?void 0:n.session)===null||r===void 0?void 0:r.access_token});return l?this._returnResult({data:null,error:l}):(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+o.expires_in},o)),await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED",o),this._returnResult({data:o,error:l}))})}catch(t){if(w(t))return this._returnResult({data:null,error:t});throw t}})}async _challenge(e){return this._acquireLock(-1,async()=>{try{return await this._useSession(async t=>{var r;const{data:n,error:i}=t;if(i)return this._returnResult({data:null,error:i});const a=await x(this.fetch,"POST",`${this.url}/factors/${e.factorId}/challenge`,{body:e,headers:this.headers,jwt:(r=n==null?void 0:n.session)===null||r===void 0?void 0:r.access_token});if(a.error)return a;const{data:o}=a;if(o.type!=="webauthn")return{data:o,error:null};switch(o.webauthn.type){case"create":return{data:Object.assign(Object.assign({},o),{webauthn:Object.assign(Object.assign({},o.webauthn),{credential_options:Object.assign(Object.assign({},o.webauthn.credential_options),{publicKey:Fi(o.webauthn.credential_options.publicKey)})})}),error:null};case"request":return{data:Object.assign(Object.assign({},o),{webauthn:Object.assign(Object.assign({},o.webauthn),{credential_options:Object.assign(Object.assign({},o.webauthn.credential_options),{publicKey:Mi(o.webauthn.credential_options.publicKey)})})}),error:null}}})}catch(t){if(w(t))return this._returnResult({data:null,error:t});throw t}})}async _challengeAndVerify(e){const{data:t,error:r}=await this._challenge({factorId:e.factorId});return r?this._returnResult({data:null,error:r}):await this._verify({factorId:e.factorId,challengeId:t.id,code:e.code})}async _listFactors(){var e;const{data:{user:t},error:r}=await this.getUser();if(r)return{data:null,error:r};const n={all:[],phone:[],totp:[],webauthn:[]};for(const i of(e=t==null?void 0:t.factors)!==null&&e!==void 0?e:[])n.all.push(i),i.status==="verified"&&n[i.factor_type].push(i);return{data:n,error:null}}async _getAuthenticatorAssuranceLevel(){var e,t;const{data:{session:r},error:n}=await this.getSession();if(n)return this._returnResult({data:null,error:n});if(!r)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};const{payload:i}=st(r.access_token);let a=null;i.aal&&(a=i.aal);let o=a;((t=(e=r.user.factors)===null||e===void 0?void 0:e.filter(u=>u.status==="verified"))!==null&&t!==void 0?t:[]).length>0&&(o="aal2");const c=i.amr||[];return{data:{currentLevel:a,nextLevel:o,currentAuthenticationMethods:c},error:null}}async _getAuthorizationDetails(e){try{return await this._useSession(async t=>{const{data:{session:r},error:n}=t;return n?this._returnResult({data:null,error:n}):r?await x(this.fetch,"GET",`${this.url}/oauth/authorizations/${e}`,{headers:this.headers,jwt:r.access_token,xform:i=>({data:i,error:null})}):this._returnResult({data:null,error:new $})})}catch(t){if(w(t))return this._returnResult({data:null,error:t});throw t}}async _approveAuthorization(e,t){try{return await this._useSession(async r=>{const{data:{session:n},error:i}=r;if(i)return this._returnResult({data:null,error:i});if(!n)return this._returnResult({data:null,error:new $});const a=await x(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:n.access_token,body:{action:"approve"},xform:o=>({data:o,error:null})});return a.data&&a.data.redirect_url&&C()&&!(t!=null&&t.skipBrowserRedirect)&&window.location.assign(a.data.redirect_url),a})}catch(r){if(w(r))return this._returnResult({data:null,error:r});throw r}}async _denyAuthorization(e,t){try{return await this._useSession(async r=>{const{data:{session:n},error:i}=r;if(i)return this._returnResult({data:null,error:i});if(!n)return this._returnResult({data:null,error:new $});const a=await x(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:n.access_token,body:{action:"deny"},xform:o=>({data:o,error:null})});return a.data&&a.data.redirect_url&&C()&&!(t!=null&&t.skipBrowserRedirect)&&window.location.assign(a.data.redirect_url),a})}catch(r){if(w(r))return this._returnResult({data:null,error:r});throw r}}async _listOAuthGrants(){try{return await this._useSession(async e=>{const{data:{session:t},error:r}=e;return r?this._returnResult({data:null,error:r}):t?await x(this.fetch,"GET",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:t.access_token,xform:n=>({data:n,error:null})}):this._returnResult({data:null,error:new $})})}catch(e){if(w(e))return this._returnResult({data:null,error:e});throw e}}async _revokeOAuthGrant(e){try{return await this._useSession(async t=>{const{data:{session:r},error:n}=t;return n?this._returnResult({data:null,error:n}):r?(await x(this.fetch,"DELETE",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:r.access_token,query:{client_id:e.clientId},noResolveJson:!0}),{data:{},error:null}):this._returnResult({data:null,error:new $})})}catch(t){if(w(t))return this._returnResult({data:null,error:t});throw t}}async fetchJwk(e,t={keys:[]}){let r=t.keys.find(o=>o.kid===e);if(r)return r;const n=Date.now();if(r=this.jwks.keys.find(o=>o.kid===e),r&&this.jwks_cached_at+si>n)return r;const{data:i,error:a}=await x(this.fetch,"GET",`${this.url}/.well-known/jwks.json`,{headers:this.headers});if(a)throw a;return!i.keys||i.keys.length===0||(this.jwks=i,this.jwks_cached_at=n,r=i.keys.find(o=>o.kid===e),!r)?null:r}async getClaims(e,t={}){try{let r=e;if(!r){const{data:d,error:g}=await this.getSession();if(g||!d.session)return this._returnResult({data:null,error:g});r=d.session.access_token}const{header:n,payload:i,signature:a,raw:{header:o,payload:l}}=st(r);t!=null&&t.allowExpired||xi(i.exp);const c=!n.alg||n.alg.startsWith("HS")||!n.kid||!("crypto"in globalThis&&"subtle"in globalThis.crypto)?null:await this.fetchJwk(n.kid,t!=null&&t.keys?{keys:t.keys}:t==null?void 0:t.jwks);if(!c){const{error:d}=await this.getUser(r);if(d)throw d;return{data:{claims:i,header:n,signature:a},error:null}}const u=Ei(n.alg),h=await crypto.subtle.importKey("jwk",c,u,!0,["verify"]);if(!await crypto.subtle.verify(u,h,a,ci(`${o}.${l}`)))throw new Me("Invalid JWT signature");return{data:{claims:i,header:n,signature:a},error:null}}catch(r){if(w(r))return this._returnResult({data:null,error:r});throw r}}};Pt.nextInstanceID={};const ea=Rt,ta=Pt,ra=Object.freeze(Object.defineProperty({__proto__:null,AuthAdminApi:ea,AuthApiError:gs,AuthClient:ta,AuthError:fe,AuthImplicitGrantRedirectError:be,AuthInvalidCredentialsError:ve,AuthInvalidJwtError:Me,AuthInvalidTokenResponseError:Q,AuthPKCEGrantCodeExchangeError:yt,AuthRetryableFetchError:Fe,AuthSessionMissingError:$,AuthUnknownError:V,AuthWeakPasswordError:wt,CustomAuthError:M,GoTrueAdminApi:Rt,GoTrueClient:Pt,NavigatorLockAcquireTimeoutError:_s,SIGN_OUT_SCOPES:Ne,isAuthApiError:ps,isAuthError:w,isAuthImplicitGrantRedirectError:vs,isAuthRetryableFetchError:Ue,isAuthSessionMissingError:ms,isAuthWeakPasswordError:ni,lockInternals:Z,navigatorLock:xs,processLock:Ii},Symbol.toStringTag,{value:"Module"})),Ss=_e(ra);Object.defineProperty(Qe,"__esModule",{value:!0});Qe.SupabaseAuthClient=void 0;const sa=Ss;class na extends sa.AuthClient{constructor(e){super(e)}}Qe.SupabaseAuthClient=na;Object.defineProperty(Le,"__esModule",{value:!0});const ia=Rr,aa=I,oa=Jr,la=Hn,Ce=cs,ca=us,Zt=H,ua=Qe;let da=class{constructor(e,t,r){var n,i,a;this.supabaseUrl=e,this.supabaseKey=t;const o=(0,Zt.validateSupabaseUrl)(e);if(!t)throw new Error("supabaseKey is required.");this.realtimeUrl=new URL("realtime/v1",o),this.realtimeUrl.protocol=this.realtimeUrl.protocol.replace("http","ws"),this.authUrl=new URL("auth/v1",o),this.storageUrl=new URL("storage/v1",o),this.functionsUrl=new URL("functions/v1",o);const l=`sb-${o.hostname.split(".")[0]}-auth-token`,c={db:Ce.DEFAULT_DB_OPTIONS,realtime:Ce.DEFAULT_REALTIME_OPTIONS,auth:Object.assign(Object.assign({},Ce.DEFAULT_AUTH_OPTIONS),{storageKey:l}),global:Ce.DEFAULT_GLOBAL_OPTIONS},u=(0,Zt.applySettingDefaults)(r??{},c);this.storageKey=(n=u.auth.storageKey)!==null&&n!==void 0?n:"",this.headers=(i=u.global.headers)!==null&&i!==void 0?i:{},u.accessToken?(this.accessToken=u.accessToken,this.auth=new Proxy({},{get:(h,f)=>{throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(f)} is not possible`)}})):this.auth=this._initSupabaseAuthClient((a=u.auth)!==null&&a!==void 0?a:{},this.headers,u.global.fetch),this.fetch=(0,ca.fetchWithAuth)(t,this._getAccessToken.bind(this),u.global.fetch),this.realtime=this._initRealtimeClient(Object.assign({headers:this.headers,accessToken:this._getAccessToken.bind(this)},u.realtime)),this.accessToken&&this.accessToken().then(h=>this.realtime.setAuth(h)).catch(h=>console.warn("Failed to set initial Realtime auth token:",h)),this.rest=new aa.PostgrestClient(new URL("rest/v1",o).href,{headers:this.headers,schema:u.db.schema,fetch:this.fetch}),this.storage=new la.StorageClient(this.storageUrl.href,this.headers,this.fetch,r==null?void 0:r.storage),u.accessToken||this._listenForAuthEvents()}get functions(){return new ia.FunctionsClient(this.functionsUrl.href,{headers:this.headers,customFetch:this.fetch})}from(e){return this.rest.from(e)}schema(e){return this.rest.schema(e)}rpc(e,t={},r={head:!1,get:!1,count:void 0}){return this.rest.rpc(e,t,r)}channel(e,t={config:{}}){return this.realtime.channel(e,t)}getChannels(){return this.realtime.getChannels()}removeChannel(e){return this.realtime.removeChannel(e)}removeAllChannels(){return this.realtime.removeAllChannels()}async _getAccessToken(){var e,t;if(this.accessToken)return await this.accessToken();const{data:r}=await this.auth.getSession();return(t=(e=r.session)===null||e===void 0?void 0:e.access_token)!==null&&t!==void 0?t:this.supabaseKey}_initSupabaseAuthClient({autoRefreshToken:e,persistSession:t,detectSessionInUrl:r,storage:n,userStorage:i,storageKey:a,flowType:o,lock:l,debug:c,throwOnError:u},h,f){const d={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new ua.SupabaseAuthClient({url:this.authUrl.href,headers:Object.assign(Object.assign({},d),h),storageKey:a,autoRefreshToken:e,persistSession:t,detectSessionInUrl:r,storage:n,userStorage:i,flowType:o,lock:l,debug:c,throwOnError:u,fetch:f,hasCustomAuthorizationHeader:Object.keys(this.headers).some(g=>g.toLowerCase()==="authorization")})}_initRealtimeClient(e){return new oa.RealtimeClient(this.realtimeUrl.href,Object.assign(Object.assign({},e),{params:Object.assign({apikey:this.supabaseKey},e==null?void 0:e.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((t,r)=>{this._handleTokenChanged(t,"CLIENT",r==null?void 0:r.access_token)})}_handleTokenChanged(e,t,r){(e==="TOKEN_REFRESHED"||e==="SIGNED_IN")&&this.changedAccessToken!==r?(this.changedAccessToken=r,this.realtime.setAuth(r)):e==="SIGNED_OUT"&&(this.realtime.setAuth(),t=="STORAGE"&&this.auth.signOut(),this.changedAccessToken=void 0)}};Le.default=da;(function(s){var e=se&&se.__createBinding||(Object.create?function(u,h,f,d){d===void 0&&(d=f);var g=Object.getOwnPropertyDescriptor(h,f);(!g||("get"in g?!h.__esModule:g.writable||g.configurable))&&(g={enumerable:!0,get:function(){return h[f]}}),Object.defineProperty(u,d,g)}:function(u,h,f,d){d===void 0&&(d=f),u[d]=h[f]}),t=se&&se.__exportStar||function(u,h){for(var f in u)f!=="default"&&!Object.prototype.hasOwnProperty.call(h,f)&&e(h,u,f)},r=se&&se.__importDefault||function(u){return u&&u.__esModule?u:{default:u}};Object.defineProperty(s,"__esModule",{value:!0}),s.createClient=s.SupabaseClient=s.FunctionRegion=s.FunctionsError=s.FunctionsRelayError=s.FunctionsFetchError=s.FunctionsHttpError=s.PostgrestError=void 0;const n=r(Le);t(Ss,s);var i=I;Object.defineProperty(s,"PostgrestError",{enumerable:!0,get:function(){return i.PostgrestError}});var a=Rr;Object.defineProperty(s,"FunctionsHttpError",{enumerable:!0,get:function(){return a.FunctionsHttpError}}),Object.defineProperty(s,"FunctionsFetchError",{enumerable:!0,get:function(){return a.FunctionsFetchError}}),Object.defineProperty(s,"FunctionsRelayError",{enumerable:!0,get:function(){return a.FunctionsRelayError}}),Object.defineProperty(s,"FunctionsError",{enumerable:!0,get:function(){return a.FunctionsError}}),Object.defineProperty(s,"FunctionRegion",{enumerable:!0,get:function(){return a.FunctionRegion}}),t(Jr,s);var o=Le;Object.defineProperty(s,"SupabaseClient",{enumerable:!0,get:function(){return r(o).default}});const l=(u,h,f)=>new n.default(u,h,f);s.createClient=l;function c(){if(typeof window<"u"||typeof process>"u")return!1;const u=process.version;if(u==null)return!1;const h=u.match(/^v(\d+)\./);return h?parseInt(h[1],10)<=18:!1}c()&&console.warn("⚠️  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217")})(xt);const Os=Js(xt),ha=Hs({__proto__:null,default:Os},[xt]),{PostgrestError:Fa,FunctionsHttpError:Ma,FunctionsFetchError:Wa,FunctionsRelayError:Va,FunctionsError:Ka,FunctionRegion:Ga,SupabaseClient:Ha,createClient:fa,GoTrueAdminApi:Ja,GoTrueClient:Ya,AuthAdminApi:Qa,AuthClient:Xa,navigatorLock:Za,NavigatorLockAcquireTimeoutError:eo,lockInternals:to,processLock:ro,SIGN_OUT_SCOPES:so,AuthError:no,AuthApiError:io,AuthUnknownError:ao,CustomAuthError:oo,AuthSessionMissingError:lo,AuthInvalidTokenResponseError:co,AuthInvalidCredentialsError:uo,AuthImplicitGrantRedirectError:ho,AuthPKCEGrantCodeExchangeError:fo,AuthRetryableFetchError:go,AuthWeakPasswordError:po,AuthInvalidJwtError:mo,isAuthError:vo,isAuthApiError:bo,isAuthSessionMissingError:yo,isAuthImplicitGrantRedirectError:wo,isAuthRetryableFetchError:_o,isAuthWeakPasswordError:xo,RealtimePresence:Eo,RealtimeChannel:ko,RealtimeClient:So,REALTIME_LISTEN_TYPES:Oo,REALTIME_POSTGRES_CHANGES_LISTEN_EVENT:To,REALTIME_PRESENCE_LISTEN_EVENTS:Ao,REALTIME_SUBSCRIBE_STATES:Ro,REALTIME_CHANNEL_STATES:jo}=Os||ha,ga="https://gcpgmzewvaclbxeyvjng.supabase.co",pa="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjcGdtemV3dmFjbGJ4ZXl2am5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5NTczMzQsImV4cCI6MjA4MDUzMzMzNH0.MsapRRGwXMwadiSTWedBP87jm7HQL4LV0EFI5ENDnJM",z=fa(ga,pa),Ts=document.createElement("style");Ts.textContent=`
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
`;document.head.appendChild(Ts);const As=document.createElement("style");As.textContent=`
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
`;document.head.appendChild(As);const Rs=document.createElement("style");Rs.textContent=`
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
`;document.head.appendChild(Rs);const js=document.createElement("style");js.textContent=`
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
`;document.head.appendChild(js);const Ps=document.createElement("style");Ps.textContent=`
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
`;document.head.appendChild(Ps);const Cs=document.createElement("style");Cs.textContent=`
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
`;document.head.appendChild(Cs);const Is=document.createElement("style");Is.textContent=`
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
`;document.head.appendChild(Is);const $s=document.createElement("style");$s.textContent=`
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
`;document.head.appendChild($s);const Us=document.createElement("style");Us.textContent=`
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
`;document.head.appendChild(Us);const Ns=document.createElement("style");Ns.textContent=`
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
`;document.head.appendChild(Ns);const Ls=document.createElement("style");Ls.textContent=`
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
`;document.head.appendChild(Ls);const Ds=document.createElement("style");Ds.textContent=`
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
`;document.head.appendChild(Ds);const Bs=document.createElement("style");Bs.textContent=`
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
`;document.head.appendChild(Bs);const zs=document.createElement("style");zs.textContent=`
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
`;document.head.appendChild(zs);const qs=document.createElement("style");qs.textContent=`
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
`;document.head.appendChild(qs);const Fs=document.createElement("style");Fs.textContent=`
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
`;document.head.appendChild(Fs);const Ms=document.createElement("style");Ms.textContent=`
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
`;document.head.appendChild(Ms);const Ws=document.createElement("style");Ws.textContent=`
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
`;document.head.appendChild(Ws);const Vs=document.createElement("style");Vs.textContent=`
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
`;document.head.appendChild(Vs);const ma={async login(s,e){var t,r;try{const{data:n,error:i}=await z.auth.signInWithPassword({email:s,password:e});if(i)throw i;if(!(((r=(t=n.user)==null?void 0:t.user_metadata)==null?void 0:r.role)==="admin"))throw await this.logout(),new Error("Unauthorized: Admin access required");return{user:n.user,session:n.session,error:null}}catch(n){return console.error("Login error:",n),{user:null,session:null,error:n}}},async logout(){try{const{error:s}=await z.auth.signOut();if(s)throw s;return{error:null}}catch(s){return console.error("Logout error:",s),{error:s}}},async resetPassword(s){try{const{error:e}=await z.auth.resetPasswordForEmail(s,{redirectTo:`${window.location.origin}/admin/reset-password`});if(e)throw e;return{error:null}}catch(e){return console.error("Password reset error:",e),{error:e}}},async updatePassword(s){try{const{error:e}=await z.auth.updateUser({password:s});if(e)throw e;return{error:null}}catch(e){return console.error("Update password error:",e),{error:e}}},async getCurrentUser(){try{const{data:{user:s},error:e}=await z.auth.getUser();if(e)throw e;return{user:s,error:null}}catch(s){return console.error("Get user error:",s),{user:null,error:s}}},async isAuthenticated(){var s;try{const{data:{session:e}}=await z.auth.getSession();if(!e)return!1;const{user:t}=await this.getCurrentUser();return((s=t==null?void 0:t.user_metadata)==null?void 0:s.role)==="admin"}catch(e){return console.error("Auth check error:",e),!1}},async createAdmin(s,e){try{const{data:t,error:r}=await z.rpc("create_admin_user",{new_email:s,new_password:e});if(r)throw r;return{user:t,error:null}}catch(t){return console.error("Create admin error:",t),{user:null,error:t}}},async listAdmins(){try{const{data:s,error:e}=await z.rpc("get_admins");if(e)throw e;return{admins:s,error:null}}catch(s){return console.error("List admins error:",s),{admins:[],error:s}}},async deleteAdmin(s){try{const{error:e}=await z.rpc("delete_admin_user",{target_user_id:s});if(e)throw e;return{success:!0,error:null}}catch(e){return console.error("Delete admin error:",e),{success:!1,error:e}}},onAuthStateChange(s){return z.auth.onAuthStateChange(s)}},Ks=document.createElement("style");Ks.textContent=`
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
`;document.head.appendChild(Ks);const Gs=document.createElement("style");Gs.textContent=`
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
`;document.head.appendChild(Gs);function va(){const s=document.createElement("div");s.className="page-container not-found-page",s.innerHTML=`
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
  `;const e=s.querySelector("#back-home-btn");return e.onclick=()=>{G.navigate("/")},s}G.setAuthCheck(async()=>await ma.isAuthenticated());{const s=G.navigate.bind(G);G.navigate=async(e,t)=>s("/404",t),G.register("/404",va)}G.init();
