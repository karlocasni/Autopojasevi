import { state } from '../../utils/state.js';

export function Step1ServiceSelection({ onNext, selectedServiceId }) {
  const container = document.createElement('div');
  container.className = 'booking-step step-service-selection';

  let selected = selectedServiceId || null;

  const servicesHTML = state.services.map(service => `
    <div class="service-selection-card card ${service.id === selected ? 'selected' : ''}" data-service-id="${service.id}">
      <div class="service-icon-large">${service.icon}</div>
      <h3 class="service-name">${service.name}</h3>
    </div>
  `).join('');

  container.innerHTML = `
    <h2 class="step-title">
      <span class="heading-top">KORAK 1</span>
      <span class="heading-bottom">Odaberi Uslugu</span>
    </h2>
    
    <div class="grid grid-4 service-selection-grid">
      ${servicesHTML}
    </div>
    
    <div class="step-actions">
      <button class="btn btn-cta" id="next-btn" ${!selected ? 'disabled' : ''}>
        Nastavi
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  `;

  // Handle selection
  const cards = container.querySelectorAll('.service-selection-card');
  const nextBtn = container.querySelector('#next-btn');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      selected = card.dataset.serviceId;

      // Update UI
      cards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      nextBtn.disabled = false;
    });
  });

  nextBtn.addEventListener('click', () => {
    if (selected) {
      onNext({ serviceId: selected });
    }
  });

  return container;
}

// Add styles
const style = document.createElement('style');
style.textContent = `
  .booking-step {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
  }

  .step-title {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  .service-selection-grid {
    gap: var(--spacing-lg);
  }

  .service-selection-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-xl);
    cursor: pointer;
    text-align: center;
    transition: all var(--transition-base);
  }

  .service-selection-card:hover {
    transform: translateY(-4px);
  }

  .service-selection-card.selected {
    border-color: var(--color-accent);
    box-shadow: var(--shadow-glow-red);
    background: rgba(254, 0, 2, 0.05);
  }

  .service-icon-large {
    font-size: 5rem;
    line-height: 1;
  }

  .service-name {
    font-size: 1.2rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  @media (max-width: 768px) {
    .service-selection-card {
        padding: var(--spacing-lg);
    }
    
    .service-icon-large {
        font-size: 3rem;
    }
    
    .service-name {
        font-size: 1rem;
    }
    
    .step-actions {
        flex-direction: column;
        width: 100%;
    }
    
    .step-actions .btn {
        width: 100%;
        justify-content: center;
    }
  }
`;
document.head.appendChild(style);
