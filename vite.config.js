
import { defineConfig } from 'vite';

export default defineConfig({
    // Since you are deploying to custom domain autopojasevi.hr, base should likely be '/'
    // BUT if you are deploying to GitHub Pages without a custom domain first (e.g. username.github.io/repo), it needs base: '/repo/'
    // Given homepage in package.json is 'https://autopojasevi.hr', base '/' is correct for Custom Domain.
    // HOWEVER, gh-pages deploy might be serving from a subpath if CNAME isn't active yet.
    // Ideally for a root domain deployment:
    base: '/',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
    }
});
