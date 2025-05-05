document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const themeToggle = document.querySelector('.theme-toggle');
    const htmlElement = document.documentElement;
    const ctaButton = document.querySelector('.cta-button');
    const coin = document.querySelector('.coin');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const heroParticles = document.querySelector('.hero-particles');
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Play animation for theme change
        document.body.classList.add('theme-transition');
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 1000);
    });
    
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else {
        // Check system preference
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        if (prefersDarkScheme.matches) {
            htmlElement.setAttribute('data-theme', 'dark');
        } else {
            htmlElement.setAttribute('data-theme', 'light');
        }
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const target = this.getAttribute('href');
            if (target !== '#' && document.querySelector(target)) {
                e.preventDefault();
                document.querySelector(target).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation pour le bouton CTA
    ctaButton.addEventListener('click', () => {
        ctaButton.classList.add('clicked');
        setTimeout(() => {
            ctaButton.classList.remove('clicked');
            alert('🚀 Fonctionnalité d\'achat à venir ! 🚀');
        }, 300);
    });

    // Animation pour la pièce
    coin.addEventListener('mouseover', () => {
        coin.style.animation = 'float 1s ease-in-out infinite';
    });

    coin.addEventListener('mouseout', () => {
        coin.style.animation = 'float 3s ease-in-out infinite';
    });

    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        mobileMenuToggle.classList.toggle('toggle-active');
    });

    // Create particle effect
    createParticles();

    // Parallax effect on scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        if (heroParticles) {
            heroParticles.style.transform = `translateY(${scrollPosition * 0.15}px)`;
        }
    });
    
    // Add glass card hover effects
    const glassCards = document.querySelectorAll('.glass-card');
    glassCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Animate stats when they come into view
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelector('.stat-progress').style.animation = 'progressGrow 2s ease-out forwards';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animated-stat').forEach(stat => {
        statsObserver.observe(stat);
    });
});

// Function to create particle effect in hero section
function createParticles() {
    const particles = document.querySelector('.hero-particles');
    const particleCount = 20;
    
    if (!particles) return;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random styling
        const size = Math.random() * 10 + 5;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 10;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: linear-gradient(45deg, var(--color-primary), var(--color-accent));
            opacity: ${Math.random() * 0.5 + 0.1};
            left: ${posX}%;
            top: ${posY}%;
            animation: float ${duration}s ease-in-out ${delay}s infinite;
            box-shadow: 0 0 10px rgba(var(--color-primary-rgb), 0.8);
        `;
        
        particles.appendChild(particle);
    }
}