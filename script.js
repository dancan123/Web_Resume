document.addEventListener('DOMContentLoaded', () => {
    // Navigation Burger Menu
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    // Mobile Menu Handling
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Close mobile menu ONLY when a regular link (not the dropdown toggle) is clicked
    const actualLinks = document.querySelectorAll('.nav-links a:not(.dropbtn)');
    actualLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            navLinks.forEach(link => { // Reset animations
                link.style.animation = '';
            });
        });
    });

    // Dropdown Handling for Mobile
    const dropdownToggle = document.querySelector('.dropbtn');
    const dropdown = document.querySelector('.dropdown');

    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', (e) => {
            // Prevent the menu from closing or jumping
            e.stopPropagation();
            // Toggle the active class on the parent li
            dropdown.classList.toggle('active');
        });
    }

    // Close dropdown when clicking outside (optional, good for UX)
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            if (dropdown) dropdown.classList.remove('active');
        }
    });

    // Scroll Animation Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Target elements to animate
    const sections = document.querySelectorAll('section');
    const cards = document.querySelectorAll('.skill-category, .timeline-content, .edu-card, .info-item, .exp-summary-card');

    sections.forEach(section => {
        section.classList.add('fade-section');
        observer.observe(section);
    });

    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`; // Stagger effect
        card.classList.add('fade-up');
        observer.observe(card);
    });
});

// Add sticky header effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});
