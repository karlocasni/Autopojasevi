
import { router } from '../utils/router.js';

export function NotFound() {
    const container = document.createElement('div');
    container.className = 'page-container not-found-page';

    container.innerHTML = `
    <div class="glass-panel" style="text-align: center; max-width: 600px; padding: 3rem;">
      <h1 style="font-size: 6rem; color: var(--accent); margin: 0; line-height: 1;">404</h1>
      <h2 style="font-size: 2rem; margin: 1rem 0; color: var(--text);">Stranica nije pronađena</h2>
      <p style="color: var(--text-muted); margin-bottom: 2rem; font-size: 1.1rem;">
        Izgleda da ste skrenuli s puta. Stranica koju tražite ne postoji ili je premještena.
      </p>
      
      <button class="btn btn-primary" id="back-home-btn">
        <span>Povratak na naslovnicu</span>
      </button>
    </div>
  `;

    // Add styles specific to this page if needed, or rely on global
    // Ideally this would be in a CSS file, but for a single component inline is fine for structure
    // We use existing classes .page-container, .glass-panel, .btn-primary

    // Event listener for the button
    const btn = container.querySelector('#back-home-btn');
    btn.onclick = () => {
        router.navigate('/');
    };

    return container;
}
