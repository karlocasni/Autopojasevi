import { router } from '../../utils/router.js';
import { state } from '../../utils/state.js';

export function ServicesWidget() {
  const section = document.createElement('section');
  section.className = 'section services-widget';

  const servicesHTML = state.services.map(service => `
    <div class="card service-card" data-service-id="${service.id}">
      <div class="service-icon">${service.icon}</div>
      <h3 class="service-title">${service.name}</h3>
      <p class="service-description">${service.description}</p>
      <button class="btn btn-primary service-btn">
        Rezerviraj
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  `).join('');

  section.innerHTML = `
    <div class="container">
      <h2 class="section-title text-center mb-xl">
        <span class="heading-top">USLUGE</span>
        <span class="heading-bottom">Što Nudimo</span>
      </h2>
      
      <div class="grid grid-4 services-grid">
        ${servicesHTML}
      </div>
    </div>
  `;

  // Add click handlers
  section.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.service-btn')) {
        const serviceId = card.dataset.serviceId;
        router.navigate('/booking', { serviceId });
      }
    });
  });

  return section;
}

// Add styles
const style = document.createElement('style');
style.textContent = `
  .services-widget {
    background: var(--color-secondary);
  }

  .services-grid {
    gap: var(--spacing-xl);
  }

  .service-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--spacing-md);
    cursor: pointer;
    transition: all var(--transition-base);
  }

  .service-card:hover {
    transform: translateY(-8px);
  }

  .service-icon {
    font-size: 4rem;
    line-height: 1;
    margin-bottom: var(--spacing-sm);
  }

  .service-title {
    font-size: 1.3rem;
    font-weight: 900;
    text-transform: uppercase;
    min-height: 2.6em;
    display: flex;
    align-items: center;
  }

  .service-description {
    color: var(--color-text-muted);
    line-height: 1.7;
    flex: 1;
    font-size: 0.95rem;
  }

  .service-btn {
    margin-top: auto;
    width: 100%;
  }

  @media (max-width: 1024px) {
    .services-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 640px) {
    .services-grid {
      grid-template-columns: 1fr;
    }
    
    .service-card {
        padding: var(--spacing-lg);
    }
    
    .service-icon {
        font-size: 3rem;
    }
    
    .service-title {
        font-size: 1.1rem;
        min-height: auto;
    }
  }
`;
document.head.appendChild(style);
