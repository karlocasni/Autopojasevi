export function ProgressBar({ currentStep, totalSteps = 6 }) {
    const container = document.createElement('div');
    container.className = 'progress-bar-container';

    const percentage = (currentStep / totalSteps) * 100;

    container.innerHTML = `
    <div class="progress-steps">
      ${Array(totalSteps).fill(0).map((_, i) => `
        <div class="progress-step ${i < currentStep ? 'completed' : ''} ${i === currentStep - 1 ? 'active' : ''}">
          <div class="step-number">${i + 1}</div>
          <div class="step-label">${getStepLabel(i + 1)}</div>
        </div>
      `).join('')}
    </div>
    <div class="progress-bar">
      <div class="progress-fill" style="width: ${percentage}%"></div>
    </div>
  `;

    return container;
}

function getStepLabel(step) {
    const labels = {
        1: 'Usluga',
        2: 'Vozilo',
        3: 'Termin',
        4: 'Podaci',
        5: 'Pregled',
        6: 'Gotovo'
    };
    return labels[step] || '';
}

// Add styles
const style = document.createElement('style');
style.textContent = `
  .progress-bar-container {
    margin-bottom: var(--spacing-2xl);
  }

  .progress-steps {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--spacing-md);
    position: relative;
  }

  .progress-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-xs);
    flex: 1;
    position: relative;
  }

  .step-number {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid var(--glass-border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    font-size: 1.1rem;
    transition: all var(--transition-base);
    z-index: 2;
  }

  .progress-step.active .step-number {
    background: var(--color-accent);
    border-color: var(--color-accent);
    color: #ffffff;
    transform: scale(1.2);
  }

  .progress-step.completed .step-number {
    background: rgba(254, 0, 2, 0.3);
    border-color: var(--color-accent);
  }

  .step-label {
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text-muted);
    font-weight: 700;
  }

  .progress-step.active .step-label {
    color: var(--color-accent);
  }

  .progress-bar {
    width: 100%;
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: var(--color-accent);
    transition: width var(--transition-slow);
  }

  @media (max-width: 768px) {
    .step-label {
      font-size: 0.7rem;
    }

    .step-number {
      width: 32px;
      height: 32px;
      font-size: 0.9rem;
    }
  }
`;
document.head.appendChild(style);
