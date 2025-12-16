import '/src/styles/design-system.css';
import '/src/styles/main.css';
import '/src/styles/admin.css';

import { router } from './utils/router.js';
import { HomePage } from './pages/HomePage.js';
import { BookingFlow } from './pages/BookingFlow.js';
import { AdminPanel } from './pages/AdminPanel.js';
import { AdminLogin } from './pages/AdminLogin.js';
import { NotFound } from './pages/NotFound.js';
import { auth } from './utils/auth.js';

// Set up authentication check
router.setAuthCheck(async () => {
    return await auth.isAuthenticated();
});

// Register routes
router.register('/', HomePage);
router.register('/booking', BookingFlow);
router.register('/admin/login', AdminLogin);
router.register('/admin', AdminPanel, { protected: true });
router.register('/404', NotFound);

// Initialize app
router.init();
