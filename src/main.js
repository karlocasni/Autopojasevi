import '/src/styles/design-system.css';
import '/src/styles/main.css';
import '/src/styles/admin.css';

import { router } from './utils/router.js';
import { HomePage } from './pages/HomePage.js';
import { BookingFlow } from './pages/BookingFlow.js';
import { AdminPanel } from './pages/AdminPanel.js';
import { AdminLogin } from './pages/AdminLogin.js';
import { TermsPage } from './pages/TermsPage.js';
import { NotFound } from './pages/NotFound.js';
import { auth } from './utils/auth.js';

// --- TEMPORARY SITE CLOSURE ---
// Set to 'true' to show 404 on ALL pages (temporarily closes the site)
// Set to 'false' to restore normal routing
export const SITE_TEMPORARILY_CLOSED = true;

// Set up authentication check
router.setAuthCheck(async () => {
    return await auth.isAuthenticated();
});

if (SITE_TEMPORARILY_CLOSED) {
    // Hijack router to always render 404
    const originalNavigate = router.navigate.bind(router);
    router.navigate = async (path, data) => {
        return originalNavigate('/404', data);
    };
    
    // Register only 404
    router.register('/404', NotFound);
} else {
    // Register normal routes
    router.register('/', HomePage);
    router.register('/booking', BookingFlow);
    router.register('/admin/login', AdminLogin);
    router.register('/uvjeti-poslovanja', TermsPage);
    router.register('/admin', AdminPanel, { protected: true });
    router.register('/404', NotFound);
}

// Initialize app
router.init();
