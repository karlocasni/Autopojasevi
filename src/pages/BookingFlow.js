import { Header } from '../components/Header.js';
import { Footer } from '../components/Footer.js';
import { ProgressBar } from '../components/booking/ProgressBar.js';
import { Step1ServiceSelection } from '../components/booking/Step1ServiceSelection.js';
import { Step1bServiceDetails } from '../components/booking/Step1bServiceDetails.js';
import { Step2VehicleInfo } from '../components/booking/Step2VehicleInfo.js';
import { Step3Calendar } from '../components/booking/Step3Calendar.js';
import { Step4CustomerInfo } from '../components/booking/Step4CustomerInfo.js';
import { Step5Review } from '../components/booking/Step5Review.js';
import { Step6Success } from '../components/booking/Step6Success.js';
import { state } from '../utils/state.js';

export function BookingFlow(data = {}) {
    const page = document.createElement('div');
    page.className = 'page-booking';

    // Append header
    page.appendChild(Header());

    // Main content
    const main = document.createElement('main');
    main.className = 'booking-main';

    const container = document.createElement('div');
    container.className = 'booking-container';

    // Booking state
    let currentStep = 1;
    let bookingData = {
        serviceId: data.serviceId || null,
        ...data
    };

    const renderStep = () => {
        container.innerHTML = '';

        // Add progress bar (except for success step)
        if (currentStep < 6) {
            container.appendChild(ProgressBar({ currentStep, totalSteps: 6 }));
        }

        // Add step content card
        const stepCard = document.createElement('div');
        stepCard.className = currentStep === 6 ? '' : 'booking-card glass';

        let stepComponent;

        switch (currentStep) {
            case 1:
                if (bookingData.serviceId) {
                    // Skip to service details if service already selected
                    stepComponent = Step1bServiceDetails({
                        serviceId: bookingData.serviceId,
                        onNext: (data) => {
                            Object.assign(bookingData, data);
                            currentStep = 2;
                            renderStep();
                        },
                        onBack: () => {
                            bookingData.serviceId = null;
                            renderStep();
                        }
                    });
                } else {
                    stepComponent = Step1ServiceSelection({
                        onNext: (data) => {
                            Object.assign(bookingData, data);
                            renderStep(); // Re-render to show service details
                        },
                        selectedServiceId: bookingData.serviceId
                    });
                }
                break;

            case 2:
                stepComponent = Step2VehicleInfo({
                    serviceId: bookingData.serviceId,
                    onNext: (data) => {
                        Object.assign(bookingData, data);
                        currentStep = 3;
                        renderStep();
                    },
                    onBack: () => {
                        currentStep = 1;
                        renderStep();
                    },
                    initialData: bookingData
                });
                break;

            case 3:
                stepComponent = Step3Calendar({
                    onNext: (data) => {
                        Object.assign(bookingData, data);
                        currentStep = 4;
                        renderStep();
                    },
                    onBack: () => {
                        currentStep = 2;
                        renderStep();
                    },
                    initialData: bookingData
                });
                break;

            case 4:
                stepComponent = Step4CustomerInfo({
                    onNext: (data) => {
                        Object.assign(bookingData, data);
                        currentStep = 5;
                        renderStep();
                    },
                    onBack: () => {
                        currentStep = 3;
                        renderStep();
                    },
                    initialData: bookingData
                });
                break;

            case 5:
                stepComponent = Step5Review({
                    bookingData,
                    onNext: () => {
                        // Save booking
                        state.saveBooking(bookingData);
                        currentStep = 6;
                        renderStep();
                    },
                    onBack: () => {
                        currentStep = 4;
                        renderStep();
                    }
                });
                break;

            case 6:
                stepComponent = Step6Success({ bookingData });
                break;
        }

        if (stepComponent) {
            stepCard.appendChild(stepComponent);
            container.appendChild(stepCard);
        }
    };

    renderStep();

    main.appendChild(container);
    page.appendChild(main);

    // Append footer
    page.appendChild(Footer());

    return page;
}

// Add booking page styles
const style = document.createElement('style');
style.textContent = `
  .page-booking {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .booking-main {
    flex: 1;
    padding: calc(var(--header-height) + var(--spacing-2xl)) 0 var(--spacing-2xl);
  }

  .booking-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-lg);
  }

  .booking-card {
    padding: var(--spacing-2xl);
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .booking-card {
      padding: var(--spacing-lg);
    }
  }
`;
document.head.appendChild(style);
