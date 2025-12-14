import { state } from '../../utils/state.js';

export function Step1ServiceSelection({ onNext, selectedServiceId }) {
  const container = document.createElement('div');
  container.className = 'booking-step step-service-selection';

  let selected = selectedServiceId || null;

  const render = () => {
    const servicesHTML = state.services.map(service => `
        <div class="service-selection-card card ${service.id === selected ? 'selected' : ''}" data-service-id="${service.id}">
        <div class="service-icon-large">${service.icon}</div>
        <h3 class="service-name">${service.name}</h3>
        ${service.is_request_price ? '<div style="font-weight: bold; color: var(--color-accent); margin-top: 5px;">Cijena na upit</div>' : (service.price ? `<div style="font-weight: bold; color: var(--color-accent); margin-top: 5px;">
             ${service.is_from ? '<span style="font-size: 0.9em; opacity: 0.8; font-weight: normal;">od</span> ' : ''}${service.price.toFixed(2)} ${service.is_from && service.price_to ? `<span style="font-size: 0.9em; opacity: 0.8; font-weight: normal;">do</span> ${service.price_to.toFixed(2)}` : ''} EUR
        </div>` : '')}
        </div>
    `).join('');

    container.innerHTML = `
        <h2 class="step-title">
        <span class="heading-top">KORAK 1</span>
        <span class="heading-bottom">Odaberi Uslugu</span>
        </h2>
        
        <div class="service-selection-grid">
        ${servicesHTML}
        </div>
        
        <div class="step-actions" style="display: flex; justify-content: center;">
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
        const selectedId = card.dataset.serviceId;
        selected = selectedId;

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
  };

  render();

  state.loadServices().then(() => {
    render();
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
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--spacing-lg);
  }

  @media (max-width: 1024px) {
    .service-selection-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 640px) {
    .service-selection-grid {
      grid-template-columns: 1fr;
    }
  }

  .service-selection-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-lg);
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
    width: 80px;
    height: 80px;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 50%;
    margin-bottom: var(--spacing-sm);
    color: var(--color-accent);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-base);
  }
    
  .service-selection-card:hover .service-icon-large,
  .service-selection-card.selected .service-icon-large {
    background: rgba(254, 0, 2, 0.1);
    border-color: var(--color-accent);
    transform: scale(1.1);
  }

  .service-icon-large svg {
    width: 40px;
    height: 40px;
    stroke-width: 1.5;
  }

  .service-name {
    font-size: 1rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  @media (max-width: 768px) {
    .service-selection-card {
        padding: var(--spacing-lg);
    }
    
    .service-icon-large {
        width: 60px;
        height: 60px;
    }

    .service-icon-large svg {
        width: 30px;
        height: 30px;
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
