import { state } from '../../utils/state.js';

export function Step3Calendar({ onNext, onBack, initialData = {} }) {
  const container = document.createElement('div');
  container.className = 'booking-step step-calendar';

  const today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();
  let selectedDate = initialData.date || null;
  let selectedTime = initialData.time || null;

  container.innerHTML = `
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
  `;

  const renderCalendar = async () => {
    const monthNames = ['Siječanj', 'Veljača', 'Ožujak', 'Travanj', 'Svibanj', 'Lipanj',
      'Srpanj', 'Kolovoz', 'Rujan', 'Listopad', 'Studeni', 'Prosinac'];

    container.querySelector('#calendar-month').textContent = `${monthNames[currentMonth]} ${currentYear}`;

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Monday = 0

    const daysContainer = container.querySelector('#calendar-days');
    // Show loading
    daysContainer.innerHTML = '<div class="calendar-loading" style="grid-column: 1 / -1; text-align: center; padding: 20px; color: var(--color-text-muted);">Učitavanje...</div>';

    // Disable nav
    const prevBtn = container.querySelector('#prev-month');
    const nextBtn = container.querySelector('#next-month');
    if (prevBtn) prevBtn.disabled = true;
    if (nextBtn) nextBtn.disabled = true;

    try {
      const availability = await state.getCalendarAvailability(currentYear, currentMonth);
      daysContainer.innerHTML = '';

      // Empty cells before first day
      for (let i = 0; i < startingDayOfWeek; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        daysContainer.appendChild(emptyDay);
      }


      const cutOff = new Date();
      cutOff.setHours(cutOff.getHours() + 24);

      // Check if service requires full day (Zvjezdano nebo or Platinum Bundle)
      // Check if service requires full day (No longer required)
      const requiresEmptyDay = false;

      // Days
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, currentMonth, day);
        const dayEnd = new Date(date);
        dayEnd.setHours(23, 59, 59);

        const isRestricted = dayEnd < cutOff;

        const dayData = availability[day] || { status: 'unavailable', count: 0 };
        let status = dayData.status;

        const dayEl = document.createElement('button');

        let isUnavailable = status === 'unavailable';
        // For Zvjezdano Nebo or Bundles, day must be empty (count === 0)
        if (requiresEmptyDay && dayData.count > 0) {
          isUnavailable = true;
          status = 'unavailable';
        }

        dayEl.className = `calendar-day ${status} ${isRestricted ? 'past' : ''}`;
        dayEl.textContent = day;
        dayEl.disabled = isRestricted || isUnavailable;

        if (!dayEl.disabled) {
          dayEl.addEventListener('click', () => {
            selectedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            // Visual selection
            daysContainer.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
            dayEl.classList.add('selected');
            showTimeSlots(selectedDate);
          });
        }

        daysContainer.appendChild(dayEl);
      }
    } catch (error) {
      console.error('Error rendering calendar:', error);
      daysContainer.innerHTML = '<div style="grid-column: 1/-1; color: var(--color-unavailable); text-align: center;">Greška pri učitavanju kalendara.</div>';
    } finally {
      if (prevBtn) prevBtn.disabled = false;
      if (nextBtn) nextBtn.disabled = false;
    }
  };

  const showTimeSlots = async (date) => {
    const timeSlotsContainer = container.querySelector('#time-slots');
    const timeSlotsGrid = container.querySelector('#time-slots-grid');

    const slots = await state.getTimeSlots(date);

    const cutOff = new Date();
    cutOff.setHours(cutOff.getHours() + 24);

    timeSlotsGrid.innerHTML = slots.map(slot => {
      const [h, m] = slot.time.split(':');
      const slotDate = new Date(date);
      slotDate.setHours(parseInt(h), parseInt(m));

      const isTooSoon = slotDate < cutOff;
      const isDisabled = !slot.available || isTooSoon;

      return `
      <button class="time-slot ${isDisabled ? 'disabled' : ''}" 
              data-time="${slot.time}" 
              ${isDisabled ? 'disabled' : ''}>
        ${slot.time}
      </button>
    `}).join('');

    timeSlotsContainer.classList.remove('hidden');

    // Handle time selection
    timeSlotsGrid.querySelectorAll('.time-slot').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedTime = btn.dataset.time;

        // Update UI
        timeSlotsGrid.querySelectorAll('.time-slot').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        // Enable next button
        container.querySelector('#next-btn').disabled = false;
      });
    });
  };

  // Navigation
  container.querySelector('#prev-month').addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar();
  });

  container.querySelector('#next-month').addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar();
  });

  container.querySelector('#back-btn').addEventListener('click', onBack);

  container.querySelector('#next-btn').addEventListener('click', () => {
    if (selectedDate && selectedTime) {
      onNext({ date: selectedDate, time: selectedTime });
    }
  });

  renderCalendar();

  return container;
}

// Add styles
const style = document.createElement('style');
style.textContent = `
  .calendar-container {
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
        padding: var(--spacing-sm);
        max-width: 100%;
    }
    
    .calendar-weekdays {
        font-size: 0.65rem;
        gap: 1px;
        margin-bottom: var(--spacing-sm);
    }
    
    .calendar-days {
        gap: 2px;
    }
    
    .calendar-day {
        font-size: 0.75rem;
        border-width: 1px;
        aspect-ratio: 1; /* Keep square */
        height: auto;
    }
    
    .calendar-legend {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        gap: var(--spacing-sm);
        font-size: 0.7rem;
        padding-top: var(--spacing-md);
    }
    
    .time-slots-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--spacing-sm);
    }
    
    .time-slot {
        font-size: 0.85rem;
        padding: 6px 10px;
    }
    
    .time-slots-title {
        font-size: 1.1rem;
        margin-bottom: var(--spacing-md);
    }
  }
`;
document.head.appendChild(style);
