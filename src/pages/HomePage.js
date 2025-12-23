import { Header } from '../components/Header.js';
import { Footer } from '../components/Footer.js';
import { HeroSection } from '../components/home/HeroSection.js';
import { HowItWorks } from '../components/home/HowItWorks.js';
import { ServicesWidget } from '../components/home/ServicesWidget.js';
import { CTABanner } from '../components/home/CTABanner.js';
import { AboutSection } from '../components/home/AboutSection.js';
import { CouponsSection } from '../components/home/CouponsSection.js';
import { ReviewsSlider } from '../components/home/ReviewsSlider.js';
import { FAQSection } from '../components/home/FAQSection.js';
import { ContactSection } from '../components/home/ContactSection.js';

export function HomePage() {
    const page = document.createElement('div');
    page.className = 'page-home';

    // Append header
    page.appendChild(Header());

    // Main content
    const main = document.createElement('main');
    main.appendChild(HeroSection());
    main.appendChild(HowItWorks());
    main.appendChild(ServicesWidget());
    main.appendChild(CTABanner());
    main.appendChild(CouponsSection()); // Coupons before About
    main.appendChild(AboutSection());
    main.appendChild(ReviewsSlider());
    main.appendChild(FAQSection());
    main.appendChild(ContactSection());

    page.appendChild(main);

    // Append footer
    page.appendChild(Footer());

    return page;
}
