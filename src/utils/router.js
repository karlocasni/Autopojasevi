// Simple router for SPA navigation with authentication
export class Router {
  constructor() {
    this.routes = {};
    this.protectedRoutes = new Set();
    this.currentRoute = null;
    this.authCheck = null;
  }

  register(path, component, options = {}) {
    this.routes[path] = component;
    if (options.protected) {
      this.protectedRoutes.add(path);
    }
  }

  setAuthCheck(authCheckFunction) {
    this.authCheck = authCheckFunction;
  }

  async navigate(path, data = {}) {
    // Check if route requires authentication
    if (this.protectedRoutes.has(path)) {
      if (!this.authCheck) {
        console.error('Auth check function not set');
        return;
      }

      const isAuthenticated = await this.authCheck();
      if (!isAuthenticated) {
        // Store intended destination
        sessionStorage.setItem('intendedRoute', path);
        // Redirect to login
        this.navigate('/admin/login');
        return;
      }
    }

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

  // Navigate to intended route after login
  navigateToIntended() {
    const intendedRoute = sessionStorage.getItem('intendedRoute');
    if (intendedRoute) {
      sessionStorage.removeItem('intendedRoute');
      this.navigate(intendedRoute);
    } else {
      this.navigate('/admin');
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

// Convenience method for navigation
Router.navigate = (path, data) => router.navigate(path, data);
