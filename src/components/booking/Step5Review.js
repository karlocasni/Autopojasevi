import { state } from '../../utils/state.js';

export function Step5Review({ bookingData, onNext, onBack }) {
  const container = document.createElement('div');
  container.className = 'booking-step step-review';

  const service = state.services.find(s => s.id === bookingData.serviceId);
  const dateObj = new Date(bookingData.date);
  const formattedDate = dateObj.toLocaleDateString('hr-HR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Determine period
  const hour = parseInt(bookingData.time.split(':')[0]);
  const period = hour < 13 ? 'Jutro' : 'Popodne';

  container.innerHTML = `
    <h2 class="step-title">
      <span class="heading-top">KORAK 5</span>
      <span class="heading-bottom">Pregled Rezervacije</span>
    </h2>
    
    <div class="review-container glass">
      <div class="review-section">
        <h3 class="review-section-title">Usluga</h3>
        <div class="review-item">
          <span class="review-icon">${service.icon}</span>
          <span class="review-value">${service.name}</span>
        </div>
      </div>

      <div class="review-section">
        <h3 class="review-section-title">Vozilo</h3>
        <div class="review-item">
          <span class="review-label">Vozilo:</span>
          <span class="review-value">${bookingData.marka} ${bookingData.model} (${bookingData.godina})</span>
        </div>
        <div class="review-item">
          <span class="review-label">Registracija:</span>
          <span class="review-value">${bookingData.registracija}</span>
        </div>
        ${bookingData.brojPojaseva ? `
          <div class="review-item">
            <span class="review-label">Broj pojaseva:</span>
            <span class="review-value">${bookingData.brojPojaseva}</span>
          </div>
        ` : ''}
        ${bookingData.brojZvjezdica ? `
          <div class="review-item">
            <span class="review-label">Broj zvjezdica:</span>
            <span class="review-value">${bookingData.brojZvjezdica}</span>
          </div>
        ` : ''}
        ${bookingData.vlastitiPojasevi ? `
          <div class="review-item">
            <span class="review-value text-accent">✓ Vlastiti pojasevi</span>
          </div>
        ` : ''}
        ${bookingData.napomena ? `
          <div class="review-item">
            <span class="review-label">Napomena:</span>
            <span class="review-value">${bookingData.napomena}</span>
          </div>
        ` : ''}
      </div>

      <div class="review-section">
        <h3 class="review-section-title">Termin</h3>
        <div class="review-item">
          <span class="review-label">Datum:</span>
          <span class="review-value">${formattedDate}</span>
        </div>
        <div class="review-item">
          <span class="review-label">Vrijeme:</span>
          <span class="review-value">${bookingData.time}</span>
        </div>
        <div class="review-item">
          <span class="review-label">Period:</span>
          <span class="review-value">${period}</span>
        </div>
      </div>

      <div class="review-section">
        <h3 class="review-section-title">Kontakt</h3>
        <div class="review-item">
          <span class="review-label">Ime:</span>
          <span class="review-value">${bookingData.imePrezime}</span>
        </div>
        <div class="review-item">
          <span class="review-label">Email:</span>
          <span class="review-value">${bookingData.email}</span>
        </div>
        <div class="review-item">
          <span class="review-label">Telefon:</span>
          <span class="review-value">${bookingData.telefon}</span>
        </div>
        ${bookingData.whatsappPodsjetnik || bookingData.emailPodsjetnik ? `
          <div class="review-item">
            <span class="review-label">Podsjetnici:</span>
            <span class="review-value">
              ${bookingData.whatsappPodsjetnik ? 'WhatsApp' : ''}
              ${bookingData.whatsappPodsjetnik && bookingData.emailPodsjetnik ? ', ' : ''}
              ${bookingData.emailPodsjetnik ? 'Email' : ''}
            </span>
          </div>
        ` : ''}
      </div>

      <div class="review-section">
        <h3 class="review-section-title">Lokacija</h3>
        <div class="review-item">
          <span class="review-value">Vranplaninska ulica 1, 10000 Zagreb</span>
        </div>
      </div>

      <p class="review-terms">
        Slanjem potvrđuješ uvjete usluge.
      </p>

      <div class="step-actions">
        <button type="button" class="btn btn-secondary" id="back-btn">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Natrag
        </button>
        <button type="button" class="btn btn-cta" id="confirm-btn">
          Potvrdi Rezervaciju
          <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
          </svg>
        </button>
      </div>
    </div>
  `;

  container.querySelector('#back-btn').addEventListener('click', onBack);
  container.querySelector('#confirm-btn').addEventListener('click', () => onNext());

  return container;
}

// Add styles
const style = document.createElement('style');
style.textContent = `
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
    
    .review-section {
        padding-bottom: var(--spacing-sm);
    }
  }
`;
document.head.appendChild(style);
