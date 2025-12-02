// Simple router for SPA navigation
export class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
  }

  register(path, component) {
    this.routes[path] = component;
  }

  navigate(path, data = {}) {
    this.currentRoute = path;
    const component = this.routes[path];
    
    if (component) {
      const app = document.getElementById('app');
      app.innerHTML = '';
      app.appendChild(component(data));
      window.scrollTo(0, 0);
      
      // Update URL without reload
      window.history.pushState({ path, data }, '', path);
    }
  }

  init() {
    // Handle back/forward buttons
    window.addEventListener('popstate', (e) => {
      if (e.state && e.state.path) {
        this.navigate(e.state.path, e.state.data || {});
      }
    });

    // Navigate to current path or default to home
    const currentPath = window.location.pathname;
    const route = this.routes[currentPath] ? currentPath : '/';
    this.navigate(route);
  }
}

export const router = new Router();
