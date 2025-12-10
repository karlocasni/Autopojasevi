import { state } from '../../utils/state.js';

export function ReviewsSlider() {
  const section = document.createElement('section');
  section.className = 'section reviews-slider';

  // Initial loading state
  section.innerHTML = `
    <div class="container">
      <h2 class="section-title text-center mb-xl">
        <span class="heading-top">RECENZIJE</span>
        <span class="heading-bottom">Što Kažu Naši Klijenti</span>
      </h2>
      <div class="text-center">
        <p>Učitavanje recenzija...</p>
      </div>
    </div>
  `;

  // Fetch reviews
  state.getReviews().then(reviews => {
    if (!reviews || reviews.length === 0) {
      section.innerHTML = `
            <div class="container">
            <h2 class="section-title text-center mb-xl">
                <span class="heading-top">RECENZIJE</span>
                <span class="heading-bottom">Što Kažu Naši Klijenti</span>
            </h2>
            <div class="text-center glass" style="padding: 2rem;">
                <p>Trenutno nema recenzija.</p>
            </div>
            </div>
        `;
      return;
    }

    const reviewsHTML = reviews.map(review => `
        <div class="review-card glass">
        <div class="review-header">
            <div class="review-company">
            <div class="company-logo">
                ${review.company ? review.company.charAt(0) : review.author.charAt(0)}
            </div>
            <span class="company-name">${review.company || review.author}</span>
            </div>
            <div class="review-rating">
            ${Array(5).fill(0).map((_, i) => `
                <svg class="star ${i < review.rating ? 'filled' : ''}" viewBox="0 0 24 24" fill="${i < review.rating ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
            `).join('')}
            </div>
        </div>
        <p class="review-text">"${review.text}"</p>
        <p class="review-author">— ${review.author}</p>
        </div>
    `).join('');

    section.innerHTML = `
        <div class="container">
        <h2 class="section-title text-center mb-xl">
            <span class="heading-top">RECENZIJE</span>
            <span class="heading-bottom">Što Kažu Naši Klijenti</span>
        </h2>
        
        <div class="slider-container">
            <button class="slider-btn slider-btn-prev" id="slider-prev">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 18l-6-6 6-6"/>
            </svg>
            </button>
            
            <div class="slider-track" id="reviews-track">
            ${reviewsHTML}
            </div>
            
            <button class="slider-btn slider-btn-next" id="slider-next">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18l6-6-6-6"/>
            </svg>
            </button>
        </div>
        
        <div class="slider-dots" id="slider-dots"></div>
        </div>
    `;

    // Slider functionality
    const track = section.querySelector('#reviews-track');
    const prevBtn = section.querySelector('#slider-prev');
    const nextBtn = section.querySelector('#slider-next');
    const dotsContainer = section.querySelector('#slider-dots');

    let currentIndex = 0;
    const totalReviews = reviews.length;

    // Create dots
    for (let i = 0; i < totalReviews; i++) {
      const dot = document.createElement('button');
      dot.className = `slider-dot ${i === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }

    const updateSlider = () => {
      // Update cards opacity
      const cards = track.querySelectorAll('.review-card');
      cards.forEach((card, i) => {
        card.classList.toggle('active', i === currentIndex);
      });

      // Update dots
      dotsContainer.querySelectorAll('.slider-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    };

    const goToSlide = (index) => {
      currentIndex = index;
      updateSlider();
    };

    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % totalReviews;
      updateSlider();
    };

    const prevSlide = () => {
      currentIndex = (currentIndex - 1 + totalReviews) % totalReviews;
      updateSlider();
    };

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Auto-play
    let autoplayInterval = setInterval(nextSlide, 5000);

    section.addEventListener('mouseenter', () => {
      clearInterval(autoplayInterval);
    });

    section.addEventListener('mouseleave', () => {
      autoplayInterval = setInterval(nextSlide, 5000);
    });

    // Initialize first slide
    setTimeout(updateSlider, 0);
  });

  return section;
}

// Add styles
const style = document.createElement('style');
style.textContent = `
  .reviews-slider {
    background: var(--color-secondary);
  }

  .slider-container {
    position: relative;
    overflow: hidden;
    padding: 0 var(--spacing-3xl);
  }

  .slider-track {
    display: grid;
    grid-template-areas: "stack";
    width: 100%;
  }

  .review-card {
    grid-area: stack;
    width: 100%;
    padding: var(--spacing-2xl);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
    z-index: 0;
  }
  
  .review-card.active {
    opacity: 1;
    pointer-events: auto;
    z-index: 1;
  }

  .review-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--spacing-md);
  }

  .review-company {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
  }

  .company-logo {
    width: 60px;
    height: 60px;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    font-size: 1.5rem;
    font-weight: 900;
    color: var(--color-accent);
  }

  .company-logo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .company-name {
    font-size: 1.2rem;
    font-weight: 700;
  }

  .review-rating {
    display: flex;
    gap: var(--spacing-xs);
  }

  .star {
    width: 24px;
    height: 24px;
    color: var(--color-text-muted);
  }

  .star.filled {
    color: #ffd700;
  }

  .review-text {
    font-size: 1.3rem;
    line-height: 1.8;
    font-style: italic;
    color: var(--color-text);
  }

  .review-author {
    font-size: 1rem;
    color: var(--color-text-muted);
    text-align: right;
  }

  .slider-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all var(--transition-base);
    z-index: 10;
    color: var(--color-text);
  }

  .slider-btn:hover {
    background: var(--color-accent);
    border-color: var(--color-accent);
    color: #ffffff;
  }

  .slider-btn-prev {
    left: 0;
  }

  .slider-btn-next {
    right: 0;
  }

  .slider-dots {
    display: flex;
    justify-content: center;
    gap: var(--spacing-sm);
    margin-top: var(--spacing-xl);
    position: relative;
    z-index: 2;
  }

  .slider-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--glass-border);
    border: none;
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .slider-dot.active {
    background: var(--color-accent);
    transform: scale(1.3);
  }

  @media (max-width: 768px) {
    .slider-container {
      padding: 0 var(--spacing-xl);
    }

    .slider-btn {
      width: 40px;
      height: 40px;
    }

    .review-text {
      font-size: 0.95rem;
      line-height: 1.5;
    }
    
    .review-author {
        font-size: 0.85rem;
    }
    
    .company-name {
        font-size: 0.9rem;
    }
    
    .company-logo {
        width: 40px;
        height: 40px;
        font-size: 1rem;
    }
  }
`;
document.head.appendChild(style);
