// Professional Account Vision Script
// Dark theme animations, typewriter, counters, smooth scroll

// Preloader
window.addEventListener('load', () => {
    document.querySelector('.preloader').classList.add('fade-out');
});

// Navbar scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) navbar.style.background = 'rgba(10, 14, 23, 0.98)';
    else navbar.style.background = 'rgba(10, 14, 23, 0.95)';
});

// Mobile menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Typewriter effect
const typewriter = new Typewriter(document.querySelector('.typewriter'), {
    loop: true,
    delay: 100
});

typewriter.typeString('Financial Futures')
    .pauseFor(1000)
    .deleteAll()
    .typeString('Business Success')
    .pauseFor(1000)
    .typeString('Your Growth Partner')
    .start();

// Animated counters
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const count = +counter.innerText.replace(/,/g, '');
        const increment = target / 100;
        const timer = setInterval(() => {
            counter.innerText = Math.ceil(count + increment);
            if (count >= target) {
                clearInterval(timer);
                counter.innerText = target + (target > 1 ? '+' : '%');
            }
        }, 30);
    });
}

// Scroll reveal
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            if (entry.target.closest('.hero-stats')) animateCounters();
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.service-card, .stat-item, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.8s ease';
    observer.observe(el);
});

// Testimonial slider
let testimonialIndex = 0;
function nextTestimonial() {
    const slider = document.querySelector('.testimonial-slider');
    testimonialIndex = (testimonialIndex + 1) % 3;
    slider.style.transform = `translateX(-${testimonialIndex * 33.33}%)`;
}
setInterval(nextTestimonial, 5000);

// Parallax hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroShapes = document.querySelectorAll('.hero-shape');
    heroShapes.forEach((shape, i) => {
        const speed = 0.5 + i * 0.2;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Form handling
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.innerHTML = original;
        btn.disabled = false;
        // Show success (EmailJS in production)
        alert('Enquiry sent! We\'ll contact you within 24hrs.');
    }, 1500);
});

// Intersection for navbar
const navbarObserver = new IntersectionObserver(([entry]) => {
    document.body.classList.toggle('scrolled', !entry.isIntersecting);
}, { rootMargin: '-100px 0px 0px 0px' });

navbarObserver.observe(document.querySelector('#home'));

console.log('Account Vision Pro Script Loaded 🎯');

