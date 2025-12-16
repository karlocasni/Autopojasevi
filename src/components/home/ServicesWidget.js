import { router } from '../../utils/router.js';
import { state } from '../../utils/state.js';

export function ServicesWidget() {
  const section = document.createElement('section');
  section.className = 'section services-widget';

  let showBundles = true;

  const render = () => {
    const items = showBundles ? state.bundles : state.services;
    const titleTop = showBundles ? 'PAKETI' : 'USLUGE';

    const itemsHTML = items.map(item => `
    <div class="card service-card" data-id="${item.id}" data-type="${showBundles ? 'bundle' : 'service'}">
      <div class="service-icon">${item.icon}</div>
      <h3 class="service-title">${item.name}</h3>
      <p class="service-description">${item.description}</p>
      ${item.is_request_price ? '<p class="service-price" style="font-weight: bold; color: var(--color-accent); margin-bottom: 10px; font-size: 1.1rem;">Cijena na upit</p>' : (item.price ? `<p class="service-price" style="font-weight: bold; color: var(--color-accent); margin-bottom: 10px; font-size: 1.1rem;">
          ${item.is_from ? '<span style="font-size: 0.9em; opacity: 0.8; font-weight: normal;">od</span> ' : ''}${item.price.toFixed(2)} EUR
      </p>` : '')}
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
        <span class="heading-top">${titleTop}</span>
        <span class="heading-bottom">Što Nudimo</span>
      </h2>
      
      <div class="grid services-grid">
        ${itemsHTML}
      </div>

      <div class="text-center mt-xl">
        <button class="btn btn-secondary" id="toggle-view-btn">
            ${showBundles ? 'Pojedinačne usluge' : 'Pogledaj pakete'}
        </button>
      </div>
    </div>
  `;

    // Add click handlers
    section.querySelectorAll('.service-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.service-btn')) {
          const id = card.dataset.id;
          // Navigate with serviceId (or bundleId logic handled by router/booking flow)
          // We pass it as serviceId for simplicity as discussed
          router.navigate('/booking', { serviceId: id });
        }
      });
    });

    // Toggle handler
    section.querySelector('#toggle-view-btn').addEventListener('click', () => {
      showBundles = !showBundles;
      render();
    });
  };

  // Initial render
  render();

  // Fetch updated config/prices and re-render (only affects services usually)
  state.loadServices().then(() => {
    // Only re-render if we are viewing services, or if we want to ensure data coherence
    if (!showBundles) render();
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
    display: grid;
    grid-template-columns: repeat(3, 1fr);
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

  .service-card:hover .service-icon {
    background: rgba(254, 0, 2, 0.1);
    border-color: var(--color-accent);
    transform: scale(1.1);
  }

  .service-icon svg {
    width: 40px;
    height: 40px;
    stroke-width: 1.5;
  }

  .service-title {
    font-size: 1.3rem;
    font-weight: 900;
    text-transform: uppercase;
    min-height: 2.6em;
    display: flex;
    align-items: center;
    justify-content: center;
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
  
  .mt-xl {
    margin-top: var(--spacing-xl);
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
        width: 60px;
        height: 60px;
    }

    .service-icon svg {
        width: 30px;
        height: 30px;
    }
    
    .service-title {
        font-size: 1.1rem;
        min-height: auto;
    }
  }
`;
document.head.appendChild(style);
