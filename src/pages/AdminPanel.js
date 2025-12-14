import { state } from '../utils/state.js';
import { router } from '../utils/router.js';
import { auth } from '../utils/auth.js';

export function AdminPanel() {
  const page = document.createElement('div');
  page.className = 'page-admin';

  let currentView = 'dashboard';

  const render = () => {
    page.innerHTML = '';

    // Main Layout Structure
    page.innerHTML = `
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

            <button class="admin-nav-item ${currentView === 'services' ? 'active' : ''}" data-view="services">
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 11H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7c0-1.1-.9-2-2-2zm0 9H5v-7h14v7zM7 15h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zM19 2H5c-1.1 0-2 .9-2 2v5h18V4c0-1.1-.9-2-2-2zm-7 6c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
              </svg>
              <span>Usluge</span>
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

    // Logout
    page.querySelector('.admin-logout').addEventListener('click', async () => {
      await auth.logout();
      router.navigate('/admin/login');
    });

    // Mobile Toggle Logic
    const toggleBtn = page.querySelector('#mobile-menu-toggle');
    const sidebar = page.querySelector('#admin-sidebar');

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
      });
    }

    // Handle Navigation
    const navItems = page.querySelectorAll('.admin-nav-item');
    const contentArea = page.querySelector('.admin-content');

    // Close menu when clicking items on mobile
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
          sidebar.classList.remove('open');
        }
      });
    });

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
    <div class="glass" style="padding: var(--spacing-2xl); text-align: center;">
          <h2>${viewName.charAt(0).toUpperCase() + viewName.slice(1)}</h2>
          <p style="margin-top: var(--spacing-md); color: var(--color-text-muted);">
            Ova sekcija je u razvoju.
          </p>
        </div>
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
    setTimeout(() => {
      updateView('dashboard');
    }, 0);

    return page;
  }

  function renderDashboard() {
    const container = document.createElement('div');

    container.innerHTML = `
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

      container.querySelector('#calendar-month').textContent = `${monthNames[currentMonth]} ${currentYear}`;

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
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayData = availability[day] || { status: 'unavailable', count: 0 };

        const btn = document.createElement('button');
        btn.className = 'calendar-day';
        btn.style.aspectRatio = '1';
        btn.style.border = '1px solid rgba(255,255,255,0.1)';
        btn.style.background = 'rgba(255,255,255,0.05)';
        btn.style.color = 'white';
        btn.style.cursor = 'pointer';
        // Flexbox to center content
        btn.style.display = 'flex';
        btn.style.flexDirection = 'column';
        btn.style.alignItems = 'center';
        btn.style.justifyContent = 'center';
        btn.style.padding = '4px';

        // Color based on status
        if (dayData.status === 'unavailable') btn.style.borderColor = '#ef4444'; // Red
        else if (dayData.status === 'almost-full') btn.style.borderColor = '#eab308'; // Yellow
        else btn.style.borderColor = '#22c55e'; // Green

        // Remove tooltip as requested
        // btn.title = ...

        btn.innerHTML = `
    <span style="font-weight: bold; font-size: 1.2rem; line-height: 1;">${day}</span>
    ${dayData.count > 0 ? `
        <span style="
            font-size: 0.7rem; 
            margin-top: 4px; 
            color: #4ade80; 
            font-weight: 600;
            text-transform: uppercase;
        ">${dayData.count} REZ.</span>
    ` : ''}
  `;

        btn.onclick = async () => {
          const reservations = await state.getReservationsByDate(dateStr);
          container.querySelector('#modal-date').textContent = new Date(dateStr).toLocaleDateString('hr-HR');
          const list = container.querySelector('#day-reservations-list');

          if (reservations.length === 0) {
            list.innerHTML = '<p>Nema rezervacija za ovaj dan.</p>';
          } else {
            list.innerHTML = reservations.map(r => `
    <div style="background: rgba(255,255,255,0.05); padding: 10px; margin-bottom: 10px; border-radius: 4px; border-left: 3px solid ${r.status === 'confirmed' ? '#10b981' : (r.status === 'cancelled' ? '#ef4444' : '#fbbf24')}">
                            <div style="font-weight: bold;">${r.appointment_time} - ${r.ime} ${r.prezime}</div>
                            <div style="font-size: 0.9rem; color: #aaa;">${r.service_name}</div>
                            <div style="font-size: 0.8rem;">Status: ${r.status}</div>
                        </div>
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

    // Closed Days Section (UI)
    const closedDaysSection = document.createElement('div');
    closedDaysSection.className = 'glass';
    closedDaysSection.style.padding = 'var(--spacing-lg)';
    closedDaysSection.style.marginTop = 'var(--spacing-xl)';

    closedDaysSection.innerHTML = `
        <h3 class="settings-title" style="margin-bottom: var(--spacing-md);">Upravljanje Neradnim Danima</h3>
        <div style="display: flex; gap: var(--spacing-md); margin-bottom: var(--spacing-lg); align-items: center; flex-wrap: wrap;">
            <input type="date" id="closed-date-input" class="input" style="width: auto;">
            <button id="add-closed-btn" class="btn btn-secondary" style="background: var(--color-accent); border: none; color: white;">Zatvori Dan</button>
        </div>
        <div id="closed-days-list" style="display: flex; flex-wrap: wrap; gap: var(--spacing-sm);">
            <span style="color: var(--color-text-muted);">Učitavanje...</span>
        </div>
    `;

    container.appendChild(closedDaysSection);

    const dateInput = closedDaysSection.querySelector('#closed-date-input');
    const addBtn = closedDaysSection.querySelector('#add-closed-btn');
    const listDiv = closedDaysSection.querySelector('#closed-days-list');

    const renderClosedDays = async () => {
      listDiv.innerHTML = '<span style="color: var(--color-text-muted);">Učitavanje...</span>';
      try {
        const days = await state.getClosedDays();

        if (!days || days.length === 0) {
          listDiv.innerHTML = '<span style="color: var(--color-text-muted);">Nema zatvorenih dana.</span>';
          return;
        }

        listDiv.innerHTML = days.map(d => `
                <div style="background: rgba(255, 0, 0, 0.1); border: 1px solid rgba(255, 0, 0, 0.3); padding: 5px 10px; border-radius: 4px; display: flex; align-items: center; gap: 8px;">
                    <span>${new Date(d.date).toLocaleDateString()}</span>
                    <button class="remove-closed-btn" data-id="${d.id}" style="background: none; border: none; color: var(--color-text); cursor: pointer; font-size: 1.1rem;">&times;</button>
                </div>
            `).join('');

        listDiv.querySelectorAll('.remove-closed-btn').forEach(btn => {
          btn.addEventListener('click', async () => {
            if (confirm('Otvoriti ovaj dan?')) {
              await state.removeClosedDay(btn.dataset.id);
              renderClosedDays();
            }
          });
        });
      } catch (err) {
        console.error(err);
        listDiv.innerHTML = 'Greška.';
      }
    };

    addBtn.addEventListener('click', async () => {
      const date = dateInput.value;
      if (!date) return alert('Odaberite datum');
      try {
        await state.addClosedDay(date);
        dateInput.value = '';
        renderClosedDays();
      } catch (err) {
        alert(err.message);
      }
    });

    renderClosedDays();

    return container;
  }

  function renderReservations() {
    const container = document.createElement('div');

    let currentFilter = 'all';

    container.innerHTML = `
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

    // Filter Pills Logic
    const pills = container.querySelectorAll('.filter-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        currentFilter = pill.dataset.value;
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        loadReservations();
      });
    });

    async function loadReservations() {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: var(--spacing-xl);">Učitavanje...</td></tr>';

      try {
        let reservations = await state.getReservations();

        if (currentFilter !== 'all') {
          reservations = reservations.filter(r => r.status === currentFilter);
        }

        if (reservations.length === 0) {
          tbody.innerHTML = `
    <tr>
    <td colspan="6" style="text-align: center; padding: var(--spacing-xl); color: var(--color-text-muted);">
      Nema rezervacija
    </td>
          </tr>
    `;
          return;
        }

        tbody.innerHTML = reservations.map(r => {
          const service = state.services.find(s => s.id === r.service_id);
          const fullName = `${r.ime} ${r.prezime}`;
          const date = new Date(r.appointment_date).toLocaleDateString('hr-HR');

          let statusClass = 'status-pending';
          if (r.status === 'confirmed') statusClass = 'status-confirmed';
          if (r.status === 'completed') statusClass = 'status-completed';
          if (r.status === 'cancelled') statusClass = 'status-cancelled';

          return `
    <tr>
            <td>${fullName}</td>
            <td class="hide-mobile">${r.marka} ${r.model}</td>
            <td>${service?.name || r.service_name}</td>
            <td>${date}</td>
            <td><span class="status-badge ${statusClass}">${r.status}</span></td>
            <td>
              <button class="btn btn-secondary btn-sm btn-open-reservation" data-id="${r.id}">Otvori</button>
            </td>
          </tr>
    `;
        }).join('');

        container.querySelectorAll('.btn-open-reservation').forEach(btn => {
          btn.addEventListener('click', (e) => openReservationModal(e.target.dataset.id));
        });

      } catch (error) {
        console.error("Error loading reservations table:", error);
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: var(--spacing-xl);">Greška pri učitavanju.</td></tr>';
      }
    }

    async function openReservationModal(id) {
      if (!id) { console.error('No ID provided to openReservationModal'); return; }

      const reservation = await state.getReservationById(id);

      if (!reservation) {
        alert('Greška: Rezervacija nije pronađena.');
        return;
      }

      // Find service detail, handle case where service might be deleted or loaded via config
      const service = state.services.find(s => s.id === reservation.service_id);

      modalContent.innerHTML = `
        <p><strong>Klijent:</strong> ${reservation.ime} ${reservation.prezime}</p>
        <p><strong>Email:</strong> ${reservation.email}</p>
        <p><strong>Telefon:</strong> ${reservation.telefon}</p>
        <p><strong>Vozilo:</strong> ${reservation.marka} ${reservation.model}</p>
        <p><strong>Godina:</strong> ${reservation.godina}</p>
        ${reservation.vin ? `<p><strong>VIN:</strong> ${reservation.vin}</p>` : ''}
        <p><strong>Usluga:</strong> ${service?.name || reservation.service_name}</p>
        <p><strong>Cijena:</strong> ${(service?.price || reservation.cijena || 0).toFixed(2)} EUR</p>
        <p><strong>Datum:</strong> ${new Date(reservation.appointment_date).toLocaleDateString('hr-HR')} u ${reservation.appointment_time}</p>
        <p><strong>Status:</strong> <span class="status-badge ${reservation.status === 'confirmed' ? 'status-confirmed' : (reservation.status === 'completed' ? 'status-completed' : (reservation.status === 'cancelled' ? 'status-cancelled' : 'status-pending'))}">${reservation.status}</span></p>
        <p><strong>Napomene:</strong> ${reservation.napomena || '-'}</p>
        ${reservation.software_version_image_url ? `
            <div style="margin-top: 15px;">
                <p><strong>Slika softvera:</strong></p>
                <a href="${reservation.software_version_image_url}" target="_blank" style="display: inline-block; margin-top: 5px;">
                    <img src="${reservation.software_version_image_url}" alt="Slika softvera" style="max-width: 100%; max-height: 300px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.2);">
                </a>
            </div>
        ` : ''}
        `;

      modalActions.innerHTML = '';
      if (reservation.status === 'pending') {
        modalActions.innerHTML += `<button class="btn btn-secondary" id="cancel">Otkaži</button>`
        modalActions.innerHTML += `<button class="btn btn-cta" id="confirm">Potvrdi</button>`
      } else if (reservation.status === 'confirmed') {
        modalActions.innerHTML += `<button class="btn btn-secondary" id="cancel">Otkaži</button>`
        modalActions.innerHTML += `<button class="btn btn-primary" id="complete">Završi</button>`
      }

      const confirmBtn = modalActions.querySelector('#confirm');
      const cancelBtn = modalActions.querySelector('#cancel');
      const completeBtn = modalActions.querySelector('#complete');

      // Use closures for ID
      if (confirmBtn) confirmBtn.onclick = () => updateStatus(id, 'confirmed');
      if (cancelBtn) cancelBtn.onclick = () => updateStatus(id, 'cancelled');
      if (completeBtn) completeBtn.onclick = () => updateStatus(id, 'completed');

      modal.style.display = 'block';
      overlay.style.display = 'block';
    }

    async function updateStatus(id, newStatus) {
      await state.updateReservationStatus(id, newStatus);
      closeModal();
      loadReservations();
    }

    loadReservations();
    return container;
  }

  function renderServices() {
    const container = document.createElement('div');
    container.innerHTML = `<h1 class="admin-title">Konfiguracija Usluga</h1>`;

    const card = document.createElement('div');
    card.className = 'settings-card glass';
    card.innerHTML = `
        <h2 style="margin-bottom: var(--spacing-lg);">Usluge i Cijene</h2>
        <div id="services-list">Učitavanje...</div>
    `;
    container.appendChild(card);

    const servicesListDiv = card.querySelector('#services-list');

    const loadServices = async () => {
      servicesListDiv.innerHTML = 'Učitavanje...';
      await state.loadServices();

      if (!state.services || state.services.length === 0) {
        servicesListDiv.innerHTML = '<p>Nema dostupnih usluga.</p>';
        return;
      }

      servicesListDiv.innerHTML = `
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Cijena Konfiguracija</th>
                        <th>Akcije</th>
                    </tr>
                </thead>
                <tbody>
                ${state.services.map(s => `
                    <tr>
                        <td style="vertical-align: top;">
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <span style="font-size: 1.5rem;">${s.icon}</span>
                                <div>
                                    <div style="font-weight: bold;">${s.name}</div>
                                    <div style="font-size: 0.8rem; color: #888;">${s.id}</div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                <div style="display: flex; align-items: center; gap: 16px;">
                                    <div style="display: flex; align-items: center; gap: 8px;">
                                        <input type="checkbox" id="is_request_price_${s.id}" class="is-request-price-checkbox" data-id="${s.id}" ${s.is_request_price ? 'checked' : ''}>
                                        <label for="is_request_price_${s.id}" style="font-size: 0.9rem;">Na upit</label>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 8px;">
                                        <input type="checkbox" id="is_from_${s.id}" class="is-from-checkbox" data-id="${s.id}" ${s.is_from ? 'checked' : ''}>
                                        <label for="is_from_${s.id}" style="font-size: 0.9rem;">Cijena "OD"</label>
                                    </div>
                                </div>
                                <div id="price-inputs-${s.id}" style="display: ${s.is_request_price ? 'none' : 'block'};">
                                    <div style="display: flex; align-items: center; gap: 8px; margin-top: 5px;">
                                        <input type="number" class="input service-price-input" data-id="${s.id}" value="${s.price || ''}" placeholder="Cijena" style="width: 100px;">
                                        <span style="font-size: 0.9rem;">EUR</span>
                                    </div>
                                    <div class="price-to-container" id="price_to_container_${s.id}" style="display: ${s.is_from ? 'flex' : 'none'}; align-items: center; gap: 8px; margin-top: 5px;">
                                        <span style="font-size: 0.9rem;">DO:</span>
                                        <input type="number" class="input service-price-to-input" data-id="${s.id}" value="${s.price_to || ''}" placeholder="Max" style="width: 100px;">
                                        <span style="font-size: 0.9rem;">EUR</span>
                                    </div>

                                    ${s.id === 'pojasevi' ? `
                                    <div style="margin-top: 10px;">
                                        <label style="font-size: 0.8rem; display: block; margin-bottom: 2px;">Cijena Rastavljeni (po komadu):</label>
                                        <div style="display: flex; align-items: center; gap: 8px;">
                                            <input type="number" class="input service-price-disassembled-input" data-id="${s.id}" value="${s.price_disassembled || ''}" placeholder="39" style="width: 100px;">
                                            <span style="font-size: 0.9rem;">EUR</span>
                                        </div>
                                    </div>
                                    ` : ''}

                                    ${s.id === 'zvjezdano-nebo' ? `
                                    <div style="margin-top: 10px;">
                                        <label style="font-size: 0.8rem; display: block; margin-bottom: 2px;">Cijena po zvjezdici:</label>
                                        <div style="display: flex; align-items: center; gap: 8px;">
                                            <input type="number" class="input service-price-star-input" data-id="${s.id}" value="${s.price_per_star || ''}" step="0.01" placeholder="1.19" style="width: 100px;">
                                            <span style="font-size: 0.9rem;">EUR</span>
                                        </div>
                                    </div>
                                    ` : ''}
                                </div>
                            </div>
                        </td>
                        <td style="vertical-align: top;">
                            <button class="btn btn-primary btn-sm save-service-btn" data-id="${s.id}">Spremi</button>
                        </td>
                    </tr>`).join('')}
                </tbody>
            </table>
        `;

      servicesListDiv.querySelectorAll('.is-request-price-checkbox').forEach(cb => {
        cb.addEventListener('change', (e) => {
          const id = e.target.dataset.id;
          const inputsDiv = servicesListDiv.querySelector(`#price-inputs-${id}`);
          inputsDiv.style.display = e.target.checked ? 'none' : 'block';
        });
      });

      servicesListDiv.querySelectorAll('.is-from-checkbox').forEach(cb => {
        cb.addEventListener('change', (e) => {
          const id = e.target.dataset.id;
          const container = servicesListDiv.querySelector(`#price_to_container_${id}`);
          container.style.display = e.target.checked ? 'flex' : 'none';
        });
      });

      servicesListDiv.querySelectorAll('.save-service-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const id = e.target.dataset.id;
          const priceInput = servicesListDiv.querySelector(`.service-price-input[data-id="${id}"]`);
          const isFromCb = servicesListDiv.querySelector(`#is_from_${id}`);
          const isRequestCb = servicesListDiv.querySelector(`#is_request_price_${id}`); // New
          const priceToInput = servicesListDiv.querySelector(`.service-price-to-input[data-id="${id}"]`);

          const isRequestPrice = isRequestCb.checked;
          const newPrice = priceInput.value ? parseFloat(priceInput.value) : 0;
          const isFrom = isFromCb.checked;
          const newPriceTo = isFrom && priceToInput.value ? parseFloat(priceToInput.value) : null;

          const priceDisassembledInput = servicesListDiv.querySelector(`.service-price-disassembled-input[data-id="${id}"]`);
          const priceStarInput = servicesListDiv.querySelector(`.service-price-star-input[data-id="${id}"]`);

          const newPriceDisassembled = priceDisassembledInput && priceDisassembledInput.value ? parseFloat(priceDisassembledInput.value) : null;
          const newPriceStar = priceStarInput && priceStarInput.value ? parseFloat(priceStarInput.value) : null;

          if (!isRequestPrice && isNaN(newPrice)) {
            alert('Molimo unesite ispravnu osnovnu cijenu.');
            return;
          }

          const btnOriginalText = e.target.textContent;
          e.target.textContent = 'Spremanje...';
          e.target.disabled = true;

          try {
            await state.updateServiceConfig(id, {
              price: newPrice,
              is_from: isFrom,
              price_to: newPriceTo,
              is_request_price: isRequestPrice,
              price_disassembled: newPriceDisassembled,
              price_per_star: newPriceStar
            });
            alert('Usluga uspješno ažurirana!');
          } catch (err) {
            console.error(err);
            alert(`Greška pri spremanju: ${err.message || JSON.stringify(err)}`);
          } finally {
            e.target.disabled = false;
            e.target.textContent = 'Spremi';
          }
        });
      });
    };

    loadServices();
    return container;
  }

  function renderReviews() {
    const container = document.createElement('div');
    container.innerHTML = `<h1 class="admin-title">Recenzije</h1>`;

    const card = document.createElement('div');
    card.className = 'settings-card glass';

    // Add Review Button
    const addBtn = document.createElement('button');
    addBtn.className = 'btn btn-primary';
    addBtn.textContent = 'Dodaj Recenziju';
    addBtn.style.marginBottom = 'var(--spacing-lg)';

    // Modal for Add/Edit
    const modal = document.createElement('div');
    modal.className = 'glass';
    modal.style.cssText = 'display:none; position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); width:90%; max-width:500px; padding:var(--spacing-xl); z-index:1000;';
    modal.innerHTML = `
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
    `;
    const overlay = document.createElement('div');
    overlay.style.cssText = 'display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.7); z-index:999;';

    container.appendChild(modal);
    container.appendChild(overlay);

    let currentEditId = null;

    const openModal = (review = null) => {
      currentEditId = review ? review.id : null;
      container.querySelector('#review-modal-title').textContent = review ? 'Uredi Recenziju' : 'Dodaj Recenziju';
      container.querySelector('#review-name').value = review ? review.name : '';
      container.querySelector('#review-rating').value = review ? review.rating : 5;
      container.querySelector('#review-comment').value = review ? (review.comment || review.text || '') : '';
      modal.style.display = 'block';
      overlay.style.display = 'block';
    };

    const closeModal = () => {
      modal.style.display = 'none';
      overlay.style.display = 'none';
      currentEditId = null;
    };

    addBtn.onclick = () => openModal();
    container.querySelector('#cancel-review-btn').onclick = closeModal;
    overlay.onclick = closeModal;

    container.querySelector('#save-review-btn').onclick = async () => {
      const name = container.querySelector('#review-name').value;
      const rating = parseInt(container.querySelector('#review-rating').value);
      const comment = container.querySelector('#review-comment').value;

      if (!name || !comment) { alert('Sva polja su obavezna.'); return; }

      const reviewData = { name, rating, comment, is_approved: true };

      try {
        if (currentEditId) {
          await state.updateReview(currentEditId, reviewData);
        } else {
          await state.addReview(reviewData);
        }
        closeModal();
        loadReviews();
      } catch (e) {
        console.error(e);
        alert('Greška: ' + e.message);
      }
    };

    card.appendChild(addBtn);

    const listDiv = document.createElement('div');
    listDiv.id = 'reviews-list';
    listDiv.innerHTML = 'Učitavanje...';
    card.appendChild(listDiv);

    container.appendChild(card);

    const loadReviews = async () => {
      listDiv.innerHTML = 'Učitavanje...';
      const reviews = await state.loadReviews();

      if (!reviews || reviews.length === 0) {
        listDiv.innerHTML = '<p>Nema recenzija.</p>';
        return;
      }

      listDiv.innerHTML = `
            <table class="admin-table">
                <thead><tr><th>Ime</th><th>Komentar</th><th>Ocjena</th><th>Akcije</th></tr></thead>
                <tbody>
                ${reviews.map(r => `
                    <tr>
                        <td>${r.name || r.author}</td>
                        <td>${(r.comment || r.text || '').substring(0, 50)}...</td>
                        <td>${'★'.repeat(r.rating || 0)}${'☆'.repeat(5 - (r.rating || 0))}</td>
                        <td>
                          <button class="btn btn-secondary btn-sm edit-review-btn" data-id="${r.id}">Uredi</button>
                          <button class="btn btn-secondary btn-sm delete-review-btn" data-id="${r.id}" style="margin-left: 5px; background: #500;">Obriši</button>
                        </td>
                    </tr>`).join('')}
                </tbody>
            </table>
        `;

      listDiv.querySelectorAll('.edit-review-btn').forEach(btn => {
        btn.onclick = (e) => {
          const id = e.target.dataset.id;
          const review = reviews.find(r => r.id == id);
          if (review) openModal(review);
        };
      });

      listDiv.querySelectorAll('.delete-review-btn').forEach(btn => {
        btn.onclick = async (e) => {
          const id = e.target.dataset.id;
          if (confirm('Jeste li sigurni da želite obrisati ovu recenziju?')) {
            await state.deleteReview(id);
            loadReviews();
          }
        }
      });
    };

    loadReviews();
    return container;
  }

  function renderSettings() {
    const container = document.createElement('div');
    container.innerHTML = `<h1 class="admin-title">Postavke Admin Računa</h1>`;

    const card = document.createElement('div');
    card.className = 'settings-card glass';
    card.innerHTML = `
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
    `;

    // Change Password Logic
    card.querySelector('#update-password-btn').addEventListener('click', async (e) => {
      const newPassword = card.querySelector('#new-password').value;
      if (!newPassword || newPassword.length < 6) {
        alert('Lozinka mora imati barem 6 znakova.');
        return;
      }

      e.target.disabled = true;
      e.target.textContent = '...';

      try {
        const { error } = await auth.updatePassword(newPassword);
        if (error) throw error;
        alert('Lozinka uspješno promijenjena!');
        card.querySelector('#new-password').value = '';
      } catch (err) {
        console.error(err);
        alert('Greška pri promjeni lozinke: ' + err.message);
      } finally {
        e.target.disabled = false;
        e.target.textContent = 'Ažuriraj Lozinku';
      }
    });

    // Create Admin Logic
    card.querySelector('#create-admin-btn').addEventListener('click', async (e) => {
      const email = card.querySelector('#new-admin-email').value;
      const password = card.querySelector('#new-admin-password').value;

      if (!email || !password) {
        alert('Molimo unesite email i lozinku.');
        return;
      }

      e.target.disabled = true;
      e.target.textContent = '...';

      try {
        await state.manageAdmins('create', { email, password });
        alert('Admin uspješno kreiran!');
        card.querySelector('#new-admin-email').value = '';
        card.querySelector('#new-admin-password').value = '';
        loadAdmins();
      } catch (err) {
        console.error(err);
        alert('Greška: ' + err.message);
      } finally {
        e.target.disabled = false;
        e.target.textContent = 'Kreiraj Admina';
      }
    });

    // Load Admins Logic
    const loadAdmins = async () => {
      const listDiv = card.querySelector('#admin-list');
      try {
        const { users } = await state.manageAdmins('list');
        const currentUser = await auth.getCurrentUser();

        if (!users || users.length === 0) {
          listDiv.innerHTML = 'Nema pronađenih admina.';
          return;
        }

        listDiv.innerHTML = `
                <table class="admin-table" style="width: 100%;">
                    <thead>
                        <tr>
                            <th style="text-align: left;">Email</th>
                            <th style="text-align: left;">Kreiran</th>
                            <th style="text-align: right;">Akcije</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${users.map(user => `
                            <tr>
                                <td>${user.email} ${user.id === currentUser?.id ? '(Vi)' : ''}</td>
                                <td>${new Date(user.created_at).toLocaleDateString()}</td>
                                <td style="text-align: right;">
                                    ${user.id !== currentUser?.id ?
            `<button class="btn btn-secondary btn-sm delete-admin-btn" data-id="${user.id}" style="background: #991b1b; color: white; border: none;">Obriši</button>` :
            '<span style="color: var(--color-text-muted); font-size: 0.9rem;">(Trenutni korisnik)</span>'}
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;

        listDiv.querySelectorAll('.delete-admin-btn').forEach(btn => {
          btn.addEventListener('click', async (e) => {
            e.preventDefault();
            // Use setTimeout to ensure UI rendering doesn't interfere with confirm dialog
            setTimeout(async () => {
              if (confirm('Jeste li sigurni da želite obrisati ovog admina?')) {
                try {
                  await state.manageAdmins('delete', { userId: btn.dataset.id });
                  loadAdmins();
                } catch (err) {
                  alert('Greška: ' + err.message);
                }
              }
            }, 10);
          });
        });

      } catch (err) {
        console.error(err);
        listDiv.innerHTML = `<div class="alert alert-error">Greška pri učitavanju: ${err.message}</div>`;
      }
    };

    // Load admins if authenticated (which we are)
    loadAdmins();

    container.appendChild(card);
    return container;
  }

  return render();
}
