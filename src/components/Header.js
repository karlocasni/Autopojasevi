import { router } from '../utils/router.js';

export function Header() {
  const header = document.createElement('header');
  header.className = 'header';
  header.id = 'main-header';

  header.innerHTML = `
    <div class="header-container">
      <nav class="header-nav">
        <a href="#" class="nav-link" data-route="/">O NAMA</a>
        <a href="#" class="nav-link" data-route="/">FAQ</a>
      </nav>
      
      <div class="header-logo">
        <img src="/images/logo.jpg" alt="Autopojasevi.hr" class="logo-img">
      </div>
      
      <nav class="header-nav">
        <a href="#" class="nav-link" data-route="/">KONTAKT</a>
        <button class="btn btn-cta" id="header-cta">REZERVIRAJ</button>
      </nav>
    </div>
  `;

  // Add scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // Navigation handlers
  header.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = e.target.textContent.toLowerCase();

      if (section === 'o nama') {
        document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
      } else if (section === 'faq') {
        document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' });
      } else if (section === 'kontakt') {
        document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // CTA button
  header.querySelector('#header-cta').addEventListener('click', () => {
    router.navigate('/booking');
  });

  return header;
}

// Add header styles
const style = document.createElement('style');
style.textContent = `
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    transition: all var(--transition-base);
    padding: var(--spacing-md) 0;
  }

  .header.scrolled {
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border-bottom: 1px solid var(--glass-border);
    padding: var(--spacing-sm) 0;
  }

  .header-container {
    max-width: var(--container-max);
    margin: 0 auto;
    padding: 0 var(--spacing-lg);
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: var(--spacing-xl);
  }

  .header-nav {
    display: flex;
    align-items: center;
    gap: var(--spacing-xl);
  }
  
  .header-nav:first-child {
    justify-self: start;
  }
  
  .header-nav:last-child {
    justify-self: end;
  }

  .nav-link {
    font-family: var(--font-body);
    font-weight: 400;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-text);
    transition: color var(--transition-fast);
    cursor: pointer;
  }

  .nav-link:hover {
    color: var(--color-accent);
  }

  .header-logo {
    justify-self: center;
  }

  .logo-img {
    height: 60px;
    width: auto;
    object-fit: contain;
    transition: transform var(--transition-base);
  }

  .header.scrolled .logo-img {
    height: 50px;
  }

  .logo-img:hover {
    transform: scale(1.05);
  }
  
  #header-cta {
    padding: var(--spacing-sm) var(--spacing-lg);
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    .header {
        padding: var(--spacing-sm) 0;
    }

    .header-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--spacing-sm);
    }

    .header-nav {
      width: 100%;
      justify-content: center;
      gap: var(--spacing-md);
      font-size: 0.8rem;
    }
    
    .header-nav:first-child {
        justify-self: center;
        order: 2; 
    }

    .header-nav:last-child {
        justify-self: center;
        order: 3; 
    }

    .header-logo {
      order: 1; 
      width: 100%;
      text-align: center;
      margin-bottom: 0;
    }

    .logo-img {
      height: 40px; /* Reduced from 50px */
    }

    #header-cta {
        padding: 0.4rem 0.8rem;
        font-size: 0.85rem;
    }
  }
`;
document.head.appendChild(style);
