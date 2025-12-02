import '/src/styles/design-system.css';
import '/src/styles/main.css';
import { router } from './utils/router.js';
import { HomePage } from './pages/HomePage.js';
import { BookingFlow } from './pages/BookingFlow.js';
import { AdminPanel } from './pages/AdminPanel.js';

// Register routes
router.register('/', HomePage);
router.register('/booking', BookingFlow);
router.register('/admin', AdminPanel);

// Initialize app
router.init();
