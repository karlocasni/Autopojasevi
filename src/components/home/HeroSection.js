import { router } from '../../utils/router.js';
import { state } from '../../utils/state.js';

export function HeroSection() {
  const section = document.createElement('section');
  section.className = 'hero-section';

  section.innerHTML = `
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <div class="container">
        <div class="hero-text">
          <h1 class="hero-title fade-in">
            <span class="heading-top">autopojasevi.hr</span>
            <span class="heading-bottom">Sigurnost i stil u jednom</span>
          </h1>
        </div>
        
        <div class="hero-search">
          <div class="search-box glass">
            <svg class="search-icon icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input 
              type="text" 
              class="search-input" 
              placeholder="Rezerviraj Termin - Pretraži uslugu..."
              id="hero-search-input"
            >
          </div>
          <div class="search-results hidden" id="search-results"></div>
        </div>
      </div>
    </div>
  `;

  // Search functionality
  const searchInput = section.querySelector('#hero-search-input');
  const searchResults = section.querySelector('#search-results');

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    if (query.length === 0) {
      searchResults.classList.add('hidden');
      return;
    }

    const filtered = state.services.filter(service =>
      service.name.toLowerCase().includes(query) ||
      service.description.toLowerCase().includes(query)
    );

    if (filtered.length > 0) {
      searchResults.innerHTML = filtered.map(service => `
        <div class="search-result-item glass" data-service-id="${service.id}">
          <span class="result-icon">${service.icon}</span>
          <span class="result-name">${service.name}</span>
        </div>
      `).join('');
      searchResults.classList.remove('hidden');

      // Add click handlers
      searchResults.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
          const serviceId = item.dataset.serviceId;
          router.navigate('/booking', { serviceId });
        });
      });
    } else {
      searchResults.classList.add('hidden');
    }
  });

  // Close results when clicking outside
  document.addEventListener('click', (e) => {
    if (!section.contains(e.target)) {
      searchResults.classList.add('hidden');
    }
  });

  return section;
}

// Add hero styles
const style = document.createElement('style');
style.textContent = `
  .hero-section {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url('/images/hero-car.png');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    overflow: hidden;
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(22, 22, 22, 0.95) 0%,
      rgba(22, 22, 22, 0.7) 50%,
      rgba(22, 22, 22, 0.95) 100%
    );
  }

  .hero-content {
    position: relative;
    z-index: 1;
    width: 100%;
    padding: var(--spacing-3xl) 0;
  }

  .hero-text {
    text-align: center;
    margin-bottom: var(--spacing-3xl);
  }

  .hero-title {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .hero-title .heading-top {
    font-size: 2rem;
  }

  .hero-title .heading-bottom {
    font-size: 4rem;
  }

  .hero-search {
    max-width: 700px;
    margin: 0 auto;
    position: relative;
  }

  .search-box {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-md) var(--spacing-lg);
    transition: all var(--transition-base);
  }

  .search-box:focus-within {
    border-color: var(--color-accent);
    box-shadow: var(--shadow-glow-red);
  }

  .search-icon {
    flex-shrink: 0;
    color: var(--color-accent);
  }

  .search-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: var(--color-text);
    font-family: var(--font-body);
    font-size: 1.1rem;
  }

  .search-input::placeholder {
    color: var(--color-text-muted);
  }

  .search-results {
    position: absolute;
    top: calc(100% + var(--spacing-sm));
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    max-height: 300px;
    overflow-y: auto;
    z-index: 10;
  }

  .search-result-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-md) var(--spacing-lg);
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .search-result-item:hover {
    border-color: var(--color-accent);
    transform: translateX(4px);
  }

  .result-icon {
    font-size: 1.5rem;
  }

  .result-name {
    font-size: 1rem;
    font-weight: 400;
  }

  @media (max-width: 768px) {
    .hero-content {
        padding: var(--spacing-xl) 0;
    }

    .hero-text {
        margin-bottom: var(--spacing-lg);
    }
  
    .hero-title .heading-top {
      font-size: 1rem;
    }

    .hero-title .heading-bottom {
      font-size: 2rem;
      line-height: 1.1;
    }
    
    .search-input {
      font-size: 0.9rem;
    }
    
    .search-box {
        padding: 0.5rem 0.75rem;
    }
    
    .search-icon {
        width: 18px;
        height: 18px;
    }
  }
`;
document.head.appendChild(style);
