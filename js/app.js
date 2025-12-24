const { createApp } = Vue;

createApp({
    data() {
        return {
            currentServiceIndex: 0,
            currentPartnerIndex: 0,
            autoRotateInterval: null,
            formSuccess: false,
            formData: {
                name: '',
                email: '',
                subject: '',
                message: ''
            },
            
            // Services for carousel
            services: [
                {
                    name: 'Web Development',
                    description: 'Building responsive, engaging websites that drive growth'
                },
                {
                    name: 'App Development',
                    description: 'Creating intuitive applications for web and mobile'
                },
                {
                    name: 'UI/UX Design',
                    description: 'Designing beautiful and functional user experiences'
                },
                {
                    name: 'Digital Integration',
                    description: 'Connecting your business across digital platforms'
                },
                {
                    name: 'Backend Solutions',
                    description: 'Robust, scalable server-side infrastructure'
                }
            ],
            
            // Digital Integration services
            digitalIntegration: [
                'Google Map Listings',
                'Social Media Profile Creation',
                'LinkedIn Integration',
                'Facebook & Instagram Pages',
                'TikTok Business Account',
                'Twitter/X Integration',
                'WhatsApp Business Setup',
                'Local SEO Optimization'
            ],
            
            // Software Development services
            softwareDevelopment: [
                'Mobile Apps',
                'Web Applications',
                'Desktop Software',
                'Progressive Web Apps',
                'Cloud Solutions'
            ],
            
            // Partners
            partners: [
                {
                    name: 'Tech Partner Co.',
                    initials: 'TP',
                    description: 'Leading technology solutions provider specializing in cloud infrastructure',
                    website: 'https://example.com',
                    linkedin: 'https://linkedin.com/company/tech-partner'
                },
                {
                    name: 'Design Studios',
                    initials: 'DS',
                    description: 'Creative design agency focusing on brand identity and visual storytelling',
                    website: 'https://example.com',
                    linkedin: 'https://linkedin.com/company/design-studios'
                },
                {
                    name: 'Business Consulting',
                    initials: 'BC',
                    description: 'Strategy and business development consultants for growth',
                    website: 'https://example.com',
                    linkedin: 'https://linkedin.com/company/business-consulting'
                },
                {
                    name: 'Marketing Solutions',
                    initials: 'MS',
                    description: 'Digital marketing experts driving customer engagement and conversions',
                    website: 'https://example.com',
                    linkedin: 'https://linkedin.com/company/marketing-solutions'
                },
                {
                    name: 'SEO Specialists',
                    initials: 'SS',
                    description: 'Search optimization experts improving online visibility and rankings',
                    website: 'https://example.com',
                    linkedin: 'https://linkedin.com/company/seo-specialists'
                }
            ],

            // Portfolio Projects
            portfolioProjects: [
                {
                    id: 1,
                    name: 'E-Commerce Platform',
                    description: 'Full-stack e-commerce solution with payment integration and inventory management',
                    icon: '🛍️',
                    color: '#E8F5E9',
                    tags: ['Vue.js', 'Node.js', 'MongoDB'],
                    link: 'https://github.com'
                },
                {
                    id: 2,
                    name: 'Project Management App',
                    description: 'Collaborative project management tool with real-time updates and team features',
                    icon: '📊',
                    color: '#E3F2FD',
                    tags: ['React', 'Firebase', 'Material UI'],
                    link: 'https://github.com'
                },
                {
                    id: 3,
                    name: 'Mobile Fitness Tracker',
                    description: 'Cross-platform mobile app for tracking fitness goals and workout routines',
                    icon: '💪',
                    color: '#FCE4EC',
                    tags: ['React Native', 'Firebase', 'Health API'],
                    link: 'https://github.com'
                },
                {
                    id: 4,
                    name: 'Business Analytics Dashboard',
                    description: 'Real-time analytics dashboard with data visualization and reporting features',
                    icon: '📈',
                    color: '#FFF3E0',
                    tags: ['Vue.js', 'D3.js', 'Python'],
                    link: 'https://github.com'
                },
                {
                    id: 5,
                    name: 'Community Platform',
                    description: 'Social community platform with user profiles, messaging, and content sharing',
                    icon: '👥',
                    color: '#F3E5F5',
                    tags: ['Next.js', 'PostgreSQL', 'Socket.io'],
                    link: 'https://github.com'
                },
                {
                    id: 6,
                    name: 'AI Chatbot Integration',
                    description: 'Intelligent chatbot solution for customer support and engagement automation',
                    icon: '🤖',
                    color: '#E0F2F1',
                    tags: ['OpenAI API', 'Node.js', 'WebSocket'],
                    link: 'https://github.com'
                }
            ]
        };
    },
    
    methods: {
        // Carousel navigation
        nextService() {
            this.currentServiceIndex = (this.currentServiceIndex + 1) % this.services.length;
        },
        
        previousService() {
            this.currentServiceIndex = (this.currentServiceIndex - 1 + this.services.length) % this.services.length;
        },
        
        selectPartner(index) {
            this.currentPartnerIndex = index;
        },
        
        scrollTo(sectionId) {
            event.preventDefault();
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        },
        
        // Get animation style for carousel
        getCarouselAnimation(index) {
            const isActive = this.currentServiceIndex === index;
            return {
                animation: isActive ? 'none' : 'none'
            };
        },
        
        // Auto-rotate carousel
        startAutoRotate() {
            this.autoRotateInterval = setInterval(() => {
                this.nextService();
            }, 6000); // Change slide every 6 seconds
        },
        
        stopAutoRotate() {
            if (this.autoRotateInterval) {
                clearInterval(this.autoRotateInterval);
            }
        },
        
        submitForm() {
            // Validate form
            if (!this.formData.name || !this.formData.email || !this.formData.subject || !this.formData.message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Show loading state
            const submitButton = document.querySelector('.btn-submit');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Submit to backend
            const apiUrl = process.env.VUE_APP_API_URL || 'http://localhost:5000/api';
            
            fetch(`${apiUrl}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    this.formSuccess = true;
                    this.formData = {
                        name: '',
                        email: '',
                        subject: '',
                        message: ''
                    };
                    
                    // Hide success message after 3 seconds
                    setTimeout(() => {
                        this.formSuccess = false;
                    }, 3000);
                } else {
                    alert(data.message || 'An error occurred. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                alert('Failed to submit form. Please try again or contact us directly.');
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            });
        }
    },
    
    mounted() {
        // Start auto-rotation when component mounts
        this.startAutoRotate();
        
        // Add scroll-triggered animations
        this.addScrollAnimations();
        
        // Add parallax effect to hero section
        this.addParallaxEffect();
    },
    
    beforeUnmount() {
        this.stopAutoRotate();
    },
    
    watch: {
        currentServiceIndex() {
            // Restart auto-rotate timer when manually changing slides
            this.stopAutoRotate();
            this.startAutoRotate();
        }
    }
}).mount('#app');

// ================================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ================================================
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all service items, partner cards, etc.
    document.querySelectorAll(
        '.service-item, .partner-card, .quality, .service-category'
    ).forEach(el => {
        observer.observe(el);
    });
}

// Call observer after a short delay to ensure DOM is ready
setTimeout(observeElements, 100);

// Add animate-in class styles
const style = document.createElement('style');
style.textContent = `
    .service-item,
    .partner-card,
    .quality,
    .service-category {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .service-item.animate-in,
    .partner-card.animate-in,
    .quality.animate-in,
    .service-category.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Stagger animation for multiple elements */
    .service-item:nth-child(2) { transition-delay: 0.1s; }
    .service-item:nth-child(3) { transition-delay: 0.2s; }
    .service-item:nth-child(4) { transition-delay: 0.3s; }
    .service-item:nth-child(5) { transition-delay: 0.4s; }
    
    .partner-card:nth-child(2) { transition-delay: 0.1s; }
    .partner-card:nth-child(3) { transition-delay: 0.2s; }
    .partner-card:nth-child(4) { transition-delay: 0.3s; }
    .partner-card:nth-child(5) { transition-delay: 0.4s; }
    
    .quality:nth-child(2) { transition-delay: 0.1s; }
    .quality:nth-child(3) { transition-delay: 0.2s; }
    .quality:nth-child(4) { transition-delay: 0.3s; }
`;
document.head.appendChild(style);

// ================================================
// PARALLAX EFFECT
// ================================================
function addParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    });
}

// ================================================
// SMOOTH SCROLL BEHAVIOR FOR LINKS
// ================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ================================================
// ACTIVE NAV LINK ON SCROLL
// ================================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active nav link styling
const navStyle = document.createElement('style');
navStyle.textContent = `
    .nav-links a.active {
        color: var(--color-accent);
    }
    
    .nav-links a.active::after {
        width: 100%;
        background: var(--color-accent);
    }
`;
document.head.appendChild(navStyle);
