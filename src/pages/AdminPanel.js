import { state } from '../utils/state.js';
import { router } from '../utils/router.js';

export function AdminPanel() {
    const page = document.createElement('div');
    page.className = 'page-admin';

    let currentView = 'dashboard';

    const render = () => {
        page.innerHTML = '';

        page.innerHTML = `
      <div class="admin-layout">
        <aside class="admin-sidebar glass">
          <div class="admin-logo">
            <img src="/images/logo.jpg" alt="Admin" class="admin-logo-img">
          </div>
          
          <nav class="admin-nav">
            <button class="admin-nav-item ${currentView === 'dashboard' ? 'active' : ''}" data-view="dashboard">
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
              </svg>
              <span>Dashboard</span>
            </button>
            
            <button class="admin-nav-item ${currentView === 'calendar' ? 'active' : ''}" data-view="calendar">
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z"/>
              </svg>
              <span>Kalendar</span>
            </button>
            
            <button class="admin-nav-item ${currentView === 'reservations' ? 'active' : ''}" data-view="reservations">
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
              </svg>
              <span>Rezervacije</span>
            </button>
            
            <button class="admin-nav-item ${currentView === 'reviews' ? 'active' : ''}" data-view="reviews">
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/>
              </svg>
              <span>Recenzije</span>
            </button>
            
            <button class="admin-nav-item ${currentView === 'settings' ? 'active' : ''}" data-view="settings">
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
    `;

        // Navigation
        page.querySelectorAll('.admin-nav-item').forEach(btn => {
            btn.addEventListener('click', () => {
                currentView = btn.dataset.view;
                render();
            });
        });

        // Logout
        page.querySelector('.admin-logout').addEventListener('click', () => {
            router.navigate('/');
        });

        // Render current view
        const viewContainer = page.querySelector('#admin-view');
        viewContainer.appendChild(renderView(currentView));
    };

    render();
    return page;
}

function renderView(view) {
    const container = document.createElement('div');
    container.className = 'admin-view';

    switch (view) {
        case 'dashboard':
            container.appendChild(renderDashboard());
            break;
        case 'reservations':
            container.appendChild(renderReservations());
            break;
        case 'reviews':
            container.appendChild(renderReviews());
            break;
        default:
            container.innerHTML = `
        <div class="glass" style="padding: var(--spacing-2xl); text-align: center;">
          <h2>${view.charAt(0).toUpperCase() + view.slice(1)}</h2>
          <p style="margin-top: var(--spacing-md); color: var(--color-text-muted);">
            Ova sekcija je u razvoju.
          </p>
        </div>
      `;
    }

    return container;
}

function renderDashboard() {
    const container = document.createElement('div');
    const reservations = state.getReservations();
    const todayCount = reservations.filter(r => {
        const date = new Date(r.date);
        const today = new Date();
        return date.toDateString() === today.toDateString();
    }).length;

    container.innerHTML = `
    <h1 class="admin-title">Dashboard</h1>
    
    <div class="dashboard-widgets">
      <div class="widget glass">
        <div class="widget-icon">
          <svg class="icon icon-xl text-accent" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
          </svg>
        </div>
        <div class="widget-content">
          <h3 class="widget-value">${todayCount}</h3>
          <p class="widget-label">Rezervacije danas</p>
        </div>
      </div>
      
      <div class="widget glass">
        <div class="widget-icon">
          <svg class="icon icon-xl text-accent" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <div class="widget-content">
          <h3 class="widget-value">${reservations.length}</h3>
          <p class="widget-label">Ukupno rezervacija</p>
        </div>
      </div>
      
      <div class="widget glass">
        <div class="widget-icon">
          <svg class="icon icon-xl text-accent" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/>
          </svg>
        </div>
        <div class="widget-content">
          <h3 class="widget-value">${state.getReviews().length}</h3>
          <p class="widget-label">Recenzije</p>
        </div>
      </div>
    </div>
  `;

    return container;
}

function renderReservations() {
    const container = document.createElement('div');
    const reservations = state.getReservations();

    container.innerHTML = `
    <h1 class="admin-title">Rezervacije</h1>
    
    <div class="table-container glass">
      <table class="admin-table">
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
        <tbody>
          ${reservations.length === 0 ? `
            <tr>
              <td colspan="6" style="text-align: center; padding: var(--spacing-xl); color: var(--color-text-muted);">
                Nema rezervacija
              </td>
            </tr>
          ` : reservations.map(r => {
        const service = state.services.find(s => s.id === r.serviceId);
        return `
              <tr>
                <td>${r.imePrezime}</td>
                <td>${r.marka} ${r.model}</td>
                <td>${service?.name || r.serviceId}</td>
                <td>${new Date(r.date).toLocaleDateString('hr-HR')}</td>
                <td><span class="status-badge status-${r.status}">${r.status}</span></td>
                <td>
                  <button class="btn btn-secondary btn-sm">Otvori</button>
                </td>
              </tr>
            `;
    }).join('')}
        </tbody>
      </table>
    </div>
  `;

    return container;
}

function renderReviews() {
    const container = document.createElement('div');
    const reviews = state.getReviews();

    container.innerHTML = `
    <div class="admin-header">
      <h1 class="admin-title">Recenzije</h1>
      <button class="btn btn-cta" id="add-review-btn">
        <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
        Dodaj recenziju
      </button>
    </div>
    
    <div class="reviews-grid">
      ${reviews.map(review => `
        <div class="review-admin-card glass">
          <div class="review-admin-header">
            <div class="company-info">
              <strong>${review.company}</strong>
              <div class="rating">
                ${Array(5).fill(0).map((_, i) => `
                  <svg class="star ${i < review.rating ? 'filled' : ''}" viewBox="0 0 24 24" fill="${i < review.rating ? 'currentColor' : 'none'}" stroke="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                `).join('')}
              </div>
            </div>
            <div class="review-actions">
              <button class="btn btn-secondary btn-sm">Uredi</button>
              <button class="btn btn-secondary btn-sm">Obriši</button>
            </div>
          </div>
          <p class="review-text">"${review.text}"</p>
        </div>
      `).join('')}
    </div>
  `;

    return container;
}

// Add admin styles
const style = document.createElement('style');
style.textContent = `
  .page-admin {
    min-height: 100vh;
    background: var(--color-primary);
  }

  .admin-layout {
    display: grid;
    grid-template-columns: 280px 1fr;
    min-height: 100vh;
  }

  .admin-sidebar {
    position: sticky;
    top: 0;
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding: var(--spacing-xl);
    border-right: 1px solid var(--glass-border);
  }

  .admin-logo {
    margin-bottom: var(--spacing-2xl);
    text-align: center;
  }

  .admin-logo-img {
    height: 60px;
    width: auto;
  }

  .admin-nav {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .admin-nav-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
    background: transparent;
    border: 1px solid transparent;
    color: var(--color-text);
    font-family: var(--font-body);
    font-size: 0.95rem;
    cursor: pointer;
    transition: all var(--transition-fast);
    text-align: left;
  }

  .admin-nav-item:hover {
    background: var(--glass-bg);
    border-color: var(--glass-border);
  }

  .admin-nav-item.active {
    background: var(--color-accent);
    border-color: var(--color-accent);
    color: #ffffff;
  }

  .admin-logout {
    margin-top: auto;
    width: 100%;
    justify-content: flex-start;
  }

  .admin-content {
    padding: var(--spacing-2xl);
    overflow-y: auto;
  }

  .admin-view {
    max-width: 1400px;
    margin: 0 auto;
  }

  .admin-title {
    font-size: 2rem;
    margin-bottom: var(--spacing-xl);
  }

  .admin-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-xl);
  }

  .dashboard-widgets {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-lg);
  }

  .widget {
    padding: var(--spacing-xl);
    display: flex;
    gap: var(--spacing-lg);
    align-items: center;
  }

  .widget-icon {
    flex-shrink: 0;
  }

  .widget-content {
    flex: 1;
  }

  .widget-value {
    font-size: 2.5rem;
    font-weight: 900;
    color: var(--color-accent);
    line-height: 1;
    margin-bottom: var(--spacing-xs);
  }

  .widget-label {
    font-size: 0.9rem;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .table-container {
    padding: var(--spacing-lg);
    overflow-x: auto;
  }

  .admin-table {
    width: 100%;
    border-collapse: collapse;
  }

  .admin-table th {
    text-align: left;
    padding: var(--spacing-md);
    border-bottom: 2px solid var(--glass-border);
    font-weight: 900;
    text-transform: uppercase;
    font-size: 0.9rem;
    color: var(--color-text-muted);
  }

  .admin-table td {
    padding: var(--spacing-md);
    border-bottom: 1px solid var(--glass-border);
  }

  .status-badge {
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: 2px;
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
  }

  .status-pending {
    background: rgba(255, 255, 0, 0.2);
    color: #ffff00;
  }

  .status-confirmed {
    background: rgba(0, 255, 0, 0.2);
    color: #00ff00;
  }

  .status-completed {
    background: rgba(0, 150, 255, 0.2);
    color: #0096ff;
  }

  .btn-sm {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: 0.85rem;
  }

  .reviews-grid {
    display: grid;
    gap: var(--spacing-lg);
  }

  .review-admin-card {
    padding: var(--spacing-xl);
  }

  .review-admin-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: var(--spacing-md);
  }

  .company-info {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .rating {
    display: flex;
    gap: var(--spacing-xs);
  }

  .rating .star {
    width: 20px;
    height: 20px;
    color: var(--color-text-muted);
  }

  .rating .star.filled {
    color: #ffd700;
  }

  .review-actions {
    display: flex;
    gap: var(--spacing-sm);
  }

  @media (max-width: 1024px) {
    .admin-layout {
      grid-template-columns: 1fr;
    }

    .admin-sidebar {
      position: relative;
      height: auto;
    }
  }
`;
document.head.appendChild(style);
