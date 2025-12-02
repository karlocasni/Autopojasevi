import { state } from '../../utils/state.js';

export function FAQSection() {
    const section = document.createElement('section');
    section.className = 'section-sm faq-section';
    section.id = 'faq-section';

    const faqHTML = state.faq.map((item, index) => `
    <div class="faq-item glass">
      <button class="faq-question" data-index="${index}">
        <span>${item.question}</span>
        <svg class="faq-icon icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      <div class="faq-answer">
        <p>${item.answer}</p>
      </div>
    </div>
  `).join('');

    section.innerHTML = `
    <div class="container-boxed">
      <h2 class="section-title text-center mb-xl">
        <span class="heading-top">FAQ</span>
        <span class="heading-bottom">Često Postavljena Pitanja</span>
      </h2>
      
      <div class="faq-list">
        ${faqHTML}
      </div>
    </div>
  `;

    // Accordion functionality
    section.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const item = button.closest('.faq-item');
            const isOpen = item.classList.contains('open');

            // Close all items
            section.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('open');
            });

            // Open clicked item if it was closed
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });

    return section;
}

// Add styles
const style = document.createElement('style');
style.textContent = `
  .faq-section {
    background: var(--color-primary);
  }

  .faq-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .faq-item {
    overflow: hidden;
    transition: all var(--transition-base);
  }

  .faq-item.open {
    border-color: var(--color-accent);
  }

  .faq-question {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-md) var(--spacing-lg);
    background: transparent;
    border: none;
    color: var(--color-text);
    font-family: var(--font-body);
    font-size: 1.1rem;
    font-weight: 700;
    text-align: left;
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .faq-question:hover {
    color: var(--color-accent);
  }

  .faq-icon {
    flex-shrink: 0;
    transition: transform var(--transition-base);
    color: var(--color-accent);
  }

  .faq-item.open .faq-icon {
    transform: rotate(180deg);
  }

  .faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height var(--transition-base);
  }

  .faq-item.open .faq-answer {
    max-height: 500px;
  }

  .faq-answer p {
    padding: 0 var(--spacing-lg) var(--spacing-lg);
    color: var(--color-text-muted);
    line-height: 1.8;
  }
`;
document.head.appendChild(style);
