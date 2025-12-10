import { state } from '../utils/state.js';
import { router } from '../utils/router.js';
import { auth } from '../utils/auth.js';

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
      <style>
        /* Mobile Layout for Admin Panel */
        @media (max-width: 1024px) {
          .admin-layout {
            grid-template-columns: 1fr;
          }
          
          .admin-sidebar {
            height: auto;
            position: relative;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
            padding: var(--spacing-sm);
            gap: var(--spacing-sm);
            overflow-x: auto;
          }
          
          .admin-logo {
            margin-bottom: 0;
            width: 50px;
          }
          
          .admin-nav {
            flex-direction: row;
            overflow-x: auto;
            flex: 1;
            padding-bottom: 5px; /* Scrollbar space */
          }
          
          .admin-nav-item, .admin-logout {
            padding: 10px;
            font-size: 0.8rem;
          }
          
          .admin-nav-item span, .admin-logout span {
            display: none; /* Hide text on small screens, show only icons */
          }
        }
      </style>
    `;

    // Navigation
    page.querySelectorAll('.admin-nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        currentView = btn.dataset.view;
        render();
      });
    });

    // Initial render of the layout
    page.innerHTML = `
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
    `;

    // Logout
    page.querySelector('.admin-logout').addEventListener('click', async () => {
      await auth.logout();
      router.navigate('/admin/login');
    });

    // Handle Navigation
    const navItems = page.querySelectorAll('.admin-nav-item');
    const contentArea = page.querySelector('.admin-content');

    function updateView(viewName) {
      // Update Nav
      navItems.forEach(item => {
        if (item.dataset.view === viewName) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });

      // Update Content
      contentArea.innerHTML = '';
      if (viewName === 'dashboard') {
        contentArea.appendChild(renderDashboard());
      } else if (viewName === 'reservations') {
        contentArea.appendChild(renderReservations());
      } else if (viewName === 'services') {
        contentArea.appendChild(renderServices());
      } else if (viewName === 'reviews') {
        contentArea.appendChild(renderReviews());
      } else if (viewName === 'calendar') {
        contentArea.appendChild(renderCalendarView());
      } else if (viewName === 'settings') {
        contentArea.appendChild(renderSettings());
      } else {
        contentArea.innerHTML = `
    < div class="glass" style = "padding: var(--spacing-2xl); text-align: center;" >
          <h2>${viewName.charAt(0).toUpperCase() + viewName.slice(1)}</h2>
          <p style="margin-top: var(--spacing-md); color: var(--color-text-muted);">
            Ova sekcija je u razvoju.
          </p>
        </div >
    `;
      }
    }

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        currentView = item.dataset.view; // Update currentView state
        updateView(item.dataset.view);
      });
    });

    // Initial View
    updateView('dashboard');

    return page;
  }

  function renderDashboard() {
    const container = document.createElement('div');

    container.innerHTML = `
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
  `;

    // Load data asynchronously
    state.getReservations().then(reservations => {
      const today = new Date().toISOString().split('T')[0];
      const todayCount = reservations.filter(r => r.appointment_date === today).length;

      container.querySelector('#today-count').textContent = todayCount;
      container.querySelector('#total-count').textContent = reservations.length;
    }).catch(error => {
      console.error('Error loading dashboard data:', error);
      container.querySelector('#today-count').textContent = '0';
      container.querySelector('#total-count').textContent = '0';
    });

    container.querySelector('#reviews-count').textContent = state.reviews.length;

    return container;
  }

  function renderCalendarView() {
    const container = document.createElement('div');
    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    container.innerHTML = `
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
  `;

    const dayModal = container.querySelector('#day-modal');
    const dayOverlay = container.querySelector('#day-modal-overlay');
    const closeModal = () => {
      dayModal.style.display = 'none';
      dayOverlay.style.display = 'none';
    };
    container.querySelector('#close-day-modal').onclick = closeModal;
    dayOverlay.onclick = closeModal;

    const render = async () => {
      const monthNames = ['Siječanj', 'Veljača', 'Ožujak', 'Travanj', 'Svibanj', 'Lipanj',
        'Srpanj', 'Kolovoz', 'Rujan', 'Listopad', 'Studeni', 'Prosinac'];

      container.querySelector('#calendar-month').textContent = `${monthNames[currentMonth]} ${currentYear} `;

      const availability = await state.getCalendarAvailability(currentYear, currentMonth);
      const daysContainer = container.querySelector('#calendar-days');
      daysContainer.innerHTML = '';

      const firstDay = new Date(currentYear, currentMonth, 1);
      const lastDay = new Date(currentYear, currentMonth + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startingDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

      // Empty cells
      for (let i = 0; i < startingDayOfWeek; i++) {
        daysContainer.appendChild(document.createElement('div'));
      }

      for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${currentYear} -${String(currentMonth + 1).padStart(2, '0')} -${String(day).padStart(2, '0')} `;
        const dayData = availability[day] || { status: 'unavailable', count: 0 };

        const btn = document.createElement('button');
        btn.className = 'calendar-day';
        btn.style.aspectRatio = '1';
        btn.style.border = '1px solid rgba(255,255,255,0.1)';
        btn.style.background = 'rgba(255,255,255,0.05)';
        btn.style.color = 'white';
        btn.style.cursor = 'pointer';
        btn.style.position = 'relative';

        // Color based on status
        if (dayData.status === 'unavailable') btn.style.borderColor = '#ef4444'; // Red
        else if (dayData.status === 'almost-full') btn.style.borderColor = '#eab308'; // Yellow
        else btn.style.borderColor = '#22c55e'; // Green

        // Tooltip
        btn.title = `Broj rezervacija: ${dayData.count} `;

        btn.innerHTML = `
    < span style = "font-weight: bold;" > ${day}</span >
      ${dayData.count > 0 ? `<div style="font-size: 0.8rem; margin-top: 5px; color: var(--color-text-muted);">${dayData.count} rez.</div>` : ''}
  `;

        btn.onclick = async () => {
          const reservations = await state.getReservationsByDate(dateStr);
          container.querySelector('#modal-date').textContent = new Date(dateStr).toLocaleDateString('hr-HR');
          const list = container.querySelector('#day-reservations-list');

          if (reservations.length === 0) {
            list.innerHTML = '<p>Nema rezervacija za ovaj dan.</p>';
          } else {
            list.innerHTML = reservations.map(r => `
    < div style = "background: rgba(255,255,255,0.05); padding: 10px; margin-bottom: 10px; border-radius: 4px; border-left: 3px solid ${r.status === 'confirmed' ? '#10b981' : (r.status === 'cancelled' ? '#ef4444' : '#fbbf24')}" >
                            <div style="font-weight: bold;">${r.appointment_time} - ${r.ime} ${r.prezime}</div>
                            <div style="font-size: 0.9rem; color: #aaa;">${r.service_name}</div>
                            <div style="font-size: 0.8rem;">Status: ${r.status}</div>
                        </div >
    `).join('');
          }

          dayModal.style.display = 'block';
          dayOverlay.style.display = 'block';
        };

        daysContainer.appendChild(btn);
      }
    };

    container.querySelector('#prev-month').addEventListener('click', () => {
      currentMonth--;
      if (currentMonth < 0) { currentMonth = 11; currentYear--; }
      render();
    });

    container.querySelector('#next-month').addEventListener('click', () => {
      currentMonth++;
      if (currentMonth > 11) { currentMonth = 0; currentYear++; }
      render();
    });

    render();
    return container;
  }

  function renderReservations() {
    const container = document.createElement('div');

    container.innerHTML = `
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
  `;

    const tbody = container.querySelector('#reservations-tbody');
    const modal = container.querySelector('#reservation-modal');
    const overlay = container.querySelector('#modal-overlay');
    const modalContent = container.querySelector('#modal-content');
    const modalActions = container.querySelector('#modal-actions');
    const closeModalBtn = container.querySelector('#close-modal-btn');

    const closeModal = () => {
      modal.style.display = 'none';
      overlay.style.display = 'none';
    };

    closeModalBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    container.querySelector('#status-filter').addEventListener('change', loadReservations);

    async function loadReservations() {
      const filterValue = container.querySelector('#status-filter').value;
      tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: var(--spacing-xl);">Učitavanje...</td></tr>';

      try {
        let reservations = await state.getReservations();

        if (filterValue !== 'all') {
          reservations = reservations.filter(r => r.status === filterValue);
        }

        if (reservations.length === 0) {
          tbody.innerHTML = `
    < tr >
    <td colspan="6" style="text-align: center; padding: var(--spacing-xl); color: var(--color-text-muted);">
      Nema rezervacija
    </td>
          </tr >
    `;
          return;
        }

        tbody.innerHTML = reservations.map(r => {
          const service = state.services.find(s => s.id === r.service_id);
          const fullName = `${r.ime} ${r.prezime} `;
          const date = new Date(r.appointment_date).toLocaleDateString('hr-HR');

          let statusClass = 'status-pending';
          if (r.status === 'confirmed') statusClass = 'status-confirmed';
          if (r.status === 'cancelled') statusClass = 'status-completed'; // Reusing completed style for cancelled/red

          return `
    < tr >
            <td>${fullName}</td>
            <td>${r.marka} ${r.model}</td>
            <td>${service?.name || r.service_name}</td>
            <td>${date}</td>
            <td><span class="status-badge ${statusClass}">${r.status}</span></td>
            <td>
              <button class="btn btn-secondary btn-sm btn-open-reservation" data-id="${r.id}">Otvori</button>
            </td>
          </tr >
    `;
        }).join('');

        // Attach handlers
        tbody.querySelectorAll('.btn-open-reservation').forEach(btn => {
          btn.addEventListener('click', () => {
            const r = reservations.find(res => res.id === btn.dataset.id);
            openModal(r);
          });
        });

      } catch (error) {
        console.error('Error loading reservations:', error);
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: var(--color-error);">Greška pri učitavanju</td></tr>';
      }
    }

    function openModal(r) {
      const service = state.services.find(s => s.id === r.service_id);
      const date = new Date(r.appointment_date).toLocaleDateString('hr-HR');

      modalContent.innerHTML = `
    < div style = "display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-md);" >
        <div>
          <h4 style="color: var(--color-text-muted); font-size: 0.9rem;">Klijent</h4>
          <p style="font-weight: bold;">${r.ime} ${r.prezime}</p>
          <p>${r.email}</p>
          <p>${r.telefon}</p>
        </div>
        <div>
          <h4 style="color: var(--color-text-muted); font-size: 0.9rem;">Vozilo</h4>
          <p style="font-weight: bold;">${r.marka} ${r.model} (${r.godina})</p>
          ${r.broj_pojaseva ? `<p>${r.broj_pojaseva} pojaseva</p>` : ''}
          ${r.vlastiti_pojasevi ? `<p>Vlastiti pojasevi: Da</p>` : ''}
        </div>
        <div>
          <h4 style="color: var(--color-text-muted); font-size: 0.9rem;">Usluga</h4>
          <p style="font-weight: bold;">${service?.name || r.service_name}</p>
          <p>Datum: ${date}</p>
          <p>Vrijeme: ${r.appointment_time}</p>
        </div>
        <div>
          <h4 style="color: var(--color-text-muted); font-size: 0.9rem;">Status</h4>
          <span class="status-badge status-${r.status}">${r.status}</span>
        </div>
      </div >
    ${r.napomena ? `
        <div style="margin-top: var(--spacing-md);">
          <h4 style="color: var(--color-text-muted); font-size: 0.9rem;">Napomena</h4>
          <p style="background: rgba(255,255,255,0.05); padding: var(--spacing-sm); border-radius: 4px;">${r.napomena}</p>
        </div>
      ` : ''
        }
  `;

      modalActions.innerHTML = '';

      if (r.status === 'pending') {
        const approveBtn = document.createElement('button');
        approveBtn.className = 'btn btn-primary';
        approveBtn.textContent = 'Prihvati';
        approveBtn.onclick = async () => {
          approveBtn.disabled = true;
          approveBtn.textContent = '...';
          await state.updateReservationStatus(r.id, 'confirmed');
          closeModal();
          loadReservations();
        };

        const declineBtn = document.createElement('button');
        declineBtn.className = 'btn btn-secondary';
        declineBtn.style.color = '#ef4444';
        declineBtn.style.borderColor = 'rgba(239, 68, 68, 0.3)';
        declineBtn.textContent = 'Odbij';
        declineBtn.onclick = async () => {
          if (confirm('Jeste li sigurni da želite odbiti ovu rezervaciju?')) {
            declineBtn.disabled = true;
            declineBtn.textContent = '...';
            await state.updateReservationStatus(r.id, 'cancelled');
            closeModal();
            loadReservations();
          }
        };

        modalActions.appendChild(declineBtn);
        modalActions.appendChild(approveBtn);
      } else if (r.status === 'confirmed') {
        const completeBtn = document.createElement('button');
        completeBtn.className = 'btn btn-primary';
        completeBtn.style.background = '#10b981'; // Green
        completeBtn.textContent = 'Završi';
        completeBtn.onclick = async () => {
          if (confirm('Jeste li sigurni da želite označiti ovu rezervaciju kao završenu?')) {
            completeBtn.disabled = true;
            completeBtn.textContent = '...';
            await state.updateReservationStatus(r.id, 'completed');
            closeModal();
            loadReservations();
          }
        };

        const closeBtn = document.createElement('button');
        closeBtn.className = 'btn btn-secondary';
        closeBtn.textContent = 'Zatvori';
        closeBtn.onclick = closeModal;

        modalActions.appendChild(closeBtn);
        modalActions.appendChild(completeBtn);
      } else {
        const closeBtn = document.createElement('button');
        closeBtn.className = 'btn btn-secondary';
        closeBtn.textContent = 'Zatvori';
        closeBtn.onclick = closeModal;
        modalActions.appendChild(closeBtn);
      }

      modal.style.display = 'block';
      overlay.style.display = 'block';
    }

    loadReservations();
    return container;
  }


  function renderServices() {
    const container = document.createElement('div');

    container.innerHTML = `
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
              <input type="number" name="duration" class="input" value="${state.maxReservations || 4}" required min="1" max="20">
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
  `;

    const list = container.querySelector('#services-list');

    async function loadServices() {
      try {
        // Ensure we have the latest config
        await state.fetchServiceConfig();
        const services = state.services;

        // Generate Global Settings Card with updated state


        list.innerHTML = services.map(service => {
          const isPojasevi = service.id === 'pojasevi';

          return `
    < div class="settings-card glass" >
              <div style="display: flex; align-items: center; gap: var(--spacing-md); margin-bottom: var(--spacing-lg);">
                <div style="font-size: 2rem;">${service.icon}</div>
                <div>
                  <h3 style="margin: 0;">${service.name}</h3>
                  <p style="color: var(--color-text-muted); font-size: 0.9rem;">ID: ${service.id}</p>
                </div>
              </div>

              <form class="service-config-form" data-id="${service.id}">
                ${isPojasevi ? `
                  <div class="form-group">
                    <label class="form-label">Trajanje po pojasu (min)</label>
                    <input type="number" name="durationPerUnit" class="input" value="${service.durationPerUnit || 30}" required min="1">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Trajanje po pojasu (Rastavljeni) (min)</label>
                    <input type="number" name="durationRastavljeni" class="input" value="${service.durationRastavljeni || 10}" required min="1">
                  </div>
                ` : `
                  <div class="form-group">
                    <label class="form-label">Osnovno trajanje (min)</label>
                    <input type="number" name="duration" class="input" value="${service.duration || 60}" required min="1">
                  </div>
                `}
                
                <div style="margin-top: var(--spacing-lg); display: flex; justify-content: flex-end;">
                  <button type="submit" class="btn btn-primary btn-sm">Spremi Promjene</button>
                </div>
                <div class="message"></div>
              </form>
            </div >
    `;
        }).join('');

        // Attach handlers
        list.querySelectorAll('form').forEach(form => {
          form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const id = form.dataset.id;
            const btn = form.querySelector('button');
            const msg = form.querySelector('.message');
            const formData = new FormData(form);

            const config = {};
            // Special handling for global config reusing duration_minutes column
            if (id === 'global_config') {
              if (formData.has('duration')) config.duration_minutes = parseInt(formData.get('duration'));
              // We don't need other fields for global config
            } else {
              if (formData.has('duration')) config.duration_minutes = parseInt(formData.get('duration'));
              if (formData.has('durationPerUnit')) config.duration_per_unit_minutes = parseInt(formData.get('durationPerUnit'));
              if (formData.has('durationRastavljeni')) config.duration_rastavljeni_minutes = parseInt(formData.get('durationRastavljeni'));
            }

            btn.disabled = true;
            btn.textContent = 'Spremanje...';

            try {
              await state.updateServiceConfig(id, config);
              showMessage(msg, 'Spremljeno!', 'success');
            } catch (error) {
              console.error(error);
              showMessage(msg, 'Greška', 'error');
            } finally {
              btn.disabled = false;
              btn.textContent = 'Spremi Promjene';
            }
          });
        });

      } catch (error) {
        console.error(error);
        list.innerHTML = '<p style="color: var(--color-error);">Greška pri učitavanju usluga.</p>';
      }
    }

    loadServices();
    return container;
  }

  function renderReviews() {
    const container = document.createElement('div');

    container.innerHTML = `
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
  `;

    const reviewsList = container.querySelector('#reviews-list');
    const addReviewBtn = container.querySelector('#add-review-btn');
    const addReviewFormContainer = container.querySelector('#add-review-form-container');
    const cancelReviewBtn = container.querySelector('#cancel-review-btn');
    const addReviewForm = container.querySelector('#add-review-form');
    const formMessage = container.querySelector('#review-form-message');

    // Toggle Form
    addReviewBtn.addEventListener('click', () => {
      addReviewFormContainer.style.display = 'block';
      addReviewBtn.style.display = 'none';
    });

    cancelReviewBtn.addEventListener('click', () => {
      addReviewFormContainer.style.display = 'none';
      addReviewBtn.style.display = 'flex';
      addReviewForm.reset();
      formMessage.textContent = '';
      formMessage.className = 'message';
    });

    // Handle Submit
    addReviewForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btn = addReviewForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Spremanje...';

      const review = {
        author: container.querySelector('#review-author').value,
        company: container.querySelector('#review-company').value,
        rating: container.querySelector('#review-rating').value,
        text: container.querySelector('#review-text').value
      };

      const imageFile = container.querySelector('#review-image').files[0];
      if (imageFile) {
        try {
          const imageUrl = await state.uploadReviewImage(imageFile);
          review.logo = imageUrl;
        } catch (error) {
          console.error('Image upload failed:', error);
          showMessage(formMessage, 'Greška pri uploadu slike: ' + error.message, 'error');
          btn.disabled = false;
          btn.textContent = originalText;
          return;
        }
      }

      try {
        await state.saveReview(review);
        showMessage(formMessage, 'Recenzija uspješno spremljena!', 'success');

        setTimeout(() => {
          addReviewFormContainer.style.display = 'none';
          addReviewBtn.style.display = 'flex';
          addReviewForm.reset();
          loadReviews(); // Refresh list
        }, 1500);
      } catch (error) {
        showMessage(formMessage, 'Greška pri spremanju: ' + error.message, 'error');
      } finally {
        btn.disabled = false;
        btn.textContent = originalText;
      }
    });

    // Load Reviews
    async function loadReviews() {
      reviewsList.innerHTML = '<p>Učitavanje...</p>';
      const reviews = await state.getReviews();

      if (!reviews || reviews.length === 0) {
        reviewsList.innerHTML = '<p>Nema recenzija.</p>';
        return;
      }

      reviewsList.innerHTML = reviews.map(review => `
    < div class="review-admin-card glass" >
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: var(--spacing-md);">
          <div style="display: flex; gap: var(--spacing-md); align-items: center;">
            ${review.logo ? `<img src="${review.logo}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;">` : ''}
            <div>
              <div style="font-weight: 900; font-size: 1.1rem;">${review.author}</div>
              ${review.company ? `<div style="color: var(--color-text-muted); font-size: 0.9rem;">${review.company}</div>` : ''}
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: var(--spacing-xs); color: #fbbf24;">
            <span style="font-weight: 900; font-size: 1.2rem;">${review.rating}</span>
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
          </div>
        </div>
        
        <p style="color: var(--color-text-muted); line-height: 1.6; margin-bottom: var(--spacing-lg);">
          "${review.text}"
        </p>

        <div style="display: flex; justify-content: flex-end;">
          <button class="btn-delete-review btn-sm" data-id="${review.id}" style="background: rgba(239, 68, 68, 0.2); color: #ef4444; border: none; cursor: pointer;">
            Obriši
          </button>
        </div>
      </div >
    `).join('');

      // Attach delete handlers
      reviewsList.querySelectorAll('.btn-delete-review').forEach(btn => {
        let confirmTimeout;

        btn.addEventListener('click', async (e) => {
          e.preventDefault();
          const id = btn.dataset.id;

          if (btn.classList.contains('confirming')) {
            // Confirmed
            clearTimeout(confirmTimeout);
            btn.disabled = true;
            btn.textContent = 'Brisanje...';

            try {
              await state.deleteReview(id);
              loadReviews();
            } catch (error) {
              console.error(error);
              btn.textContent = 'Greška';
            }
          } else {
            // First click
            btn.classList.add('confirming');
            btn.textContent = 'Potvrdi?';
            btn.style.background = '#ef4444';
            btn.style.color = 'white';

            confirmTimeout = setTimeout(() => {
              btn.classList.remove('confirming');
              btn.textContent = 'Obriši';
              btn.style.background = 'rgba(239, 68, 68, 0.2)';
              btn.style.color = '#ef4444';
            }, 3000);
          }
        });
      });
    }

    loadReviews();
    return container;
  }

  // Add admin styles
  const style = document.createElement('style');
  style.textContent = `
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
  `;
  document.head.appendChild(style);

  function renderSettings() {
    const container = document.createElement('div');

    container.innerHTML = `
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
  `;

    // Handle Password Change
    const passwordForm = container.querySelector('#change-password-form');
    const passwordMessage = container.querySelector('#password-message');

    passwordForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const newPassword = container.querySelector('#new-password').value;
      const confirmPassword = container.querySelector('#confirm-password').value;

      if (newPassword !== confirmPassword) {
        showMessage(passwordMessage, 'Lozinke se ne podudaraju', 'error');
        return;
      }

      const btn = passwordForm.querySelector('button');
      const originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Spremanje...';

      const { error } = await auth.updatePassword(newPassword);

      btn.disabled = false;
      btn.textContent = originalText;

      if (error) {
        showMessage(passwordMessage, 'Greška pri promjeni lozinke: ' + error.message, 'error');
      } else {
        showMessage(passwordMessage, 'Lozinka uspješno promijenjena', 'success');
        passwordForm.reset();
      }
    });

    // Handle Create Admin
    const createAdminForm = container.querySelector('#create-admin-form');
    const createAdminMessage = container.querySelector('#create-admin-message');

    createAdminForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = container.querySelector('#new-admin-email').value;
      const password = container.querySelector('#new-admin-password').value;

      const btn = createAdminForm.querySelector('button');
      const originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Kreiranje...';

      const { error } = await auth.createAdmin(email, password);

      btn.disabled = false;
      btn.textContent = originalText;

      if (error) {
        showMessage(createAdminMessage, 'Greška: ' + error.message, 'error');
      } else {
        showMessage(createAdminMessage, 'Admin uspješno kreiran!', 'success');
        createAdminForm.reset();
        loadAdmins(); // Refresh list
      }
    });

    // Load and Render Admin List
    const adminListContainer = container.querySelector('#admin-list-container');
    const deleteMessage = container.querySelector('#delete-admin-message');

    async function loadAdmins() {
      adminListContainer.innerHTML = '<p>Učitavanje...</p>';
      const { admins, error } = await auth.listAdmins();

      if (error) {
        adminListContainer.innerHTML = `< p style = "color: var(--color-error);" > Greška pri učitavanju: ${error.message}</p > `;
        return;
      }

      if (!admins || admins.length === 0) {
        adminListContainer.innerHTML = '<p>Nema pronađenih admina.</p>';
        return;
      }

      const { user: currentUser } = await auth.getCurrentUser();

      const listHtml = `
    < div class="admin-list" style = "display: flex; flex-direction: column; gap: 0.5rem;" >
      ${admins.map(admin => `
                <div class="admin-item glass" style="padding: 1rem; display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.05);">
                    <div>
                        <div style="font-weight: bold;">${admin.email}</div>
                        <div style="font-size: 0.8rem; color: var(--color-text-muted);">ID: ${admin.id.substring(0, 8)}...</div>
                    </div>
                    ${admin.id !== currentUser?.id ? `
                        <button class="btn-delete-admin" data-id="${admin.id}" style="background: rgba(239, 68, 68, 0.2); color: #ef4444; border: none; padding: 0.5rem; border-radius: 4px; cursor: pointer;">
                            Obriši
                        </button>
                    ` : '<span style="font-size: 0.8rem; color: var(--color-primary);">Vi</span>'}
                </div>
            `).join('')
        }
        </div >
    `;
      adminListContainer.innerHTML = listHtml;

      // Attach delete handlers
      container.querySelectorAll('.btn-delete-admin').forEach(btn => {
        let confirmTimeout;

        btn.addEventListener('click', async (e) => {
          e.preventDefault();
          e.stopPropagation();

          const adminId = btn.dataset.id;

          if (btn.classList.contains('confirming')) {
            // Confirmed - Delete
            clearTimeout(confirmTimeout);
            btn.disabled = true;
            btn.textContent = 'Brisanje...';

            const { success, error } = await auth.deleteAdmin(adminId);

            if (success) {
              showMessage(deleteMessage, 'Admin uspješno obrisan', 'success');
              loadAdmins();
            } else {
              showMessage(deleteMessage, 'Greška pri brisanju: ' + (error?.message || 'Nepoznata greška'), 'error');
              btn.disabled = false;
              btn.textContent = 'Obriši';
              btn.classList.remove('confirming');
              btn.style.background = 'rgba(239, 68, 68, 0.2)';
              btn.style.color = '#ef4444';
            }
          } else {
            // First click - Ask for confirmation
            btn.classList.add('confirming');
            btn.textContent = 'Potvrdi?';
            btn.style.background = '#ef4444';
            btn.style.color = 'white';

            confirmTimeout = setTimeout(() => {
              btn.classList.remove('confirming');
              btn.textContent = 'Obriši';
              btn.style.background = 'rgba(239, 68, 68, 0.2)';
              btn.style.color = '#ef4444';
            }, 3000);
          }
        });
      });
    }

    // Initial load
    loadAdmins();

    return container;
  }

  function showMessage(element, text, type) {
    element.textContent = text;
    element.className = `message message - ${type} `;
    setTimeout(() => {
      element.textContent = '';
      element.className = 'message';
    }, 5000);
  }

  // Add settings styles
  const settingsStyle = document.createElement('style');
  settingsStyle.textContent = `
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
  `;
  document.head.appendChild(settingsStyle);

  render();
  return page;
}
