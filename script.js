// Testimonials Carousel - Robust & Responsive
const initCarousel = () => {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');
    const dotsNav = document.querySelector('.carousel-indicators');
    const dots = Array.from(dotsNav.children);

    if (!track || slides.length === 0) return;

    let currentIndex = 0;

    const moveToSlide = (index) => {
        track.style.transform = `translateX(-${index * 100}%)`;
        
        // Update active classes
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentIndex = index;
    };

    const moveNext = () => {
        const nextIndex = (currentIndex + 1) % slides.length;
        moveToSlide(nextIndex);
    };

    const movePrev = () => {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        moveToSlide(prevIndex);
    };

    // Events
    nextButton.addEventListener('click', moveNext);
    prevButton.addEventListener('click', movePrev);

    dotsNav.addEventListener('click', e => {
        const targetDot = e.target.closest('button');
        if (!targetDot) return;

        const targetIndex = dots.indexOf(targetDot);
        moveToSlide(targetIndex);
    });

    // Auto-play with Pause on Hover
    let autoPlayInterval = setInterval(moveNext, 5000);

    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    carouselContainer.addEventListener('mouseleave', () => {
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(moveNext, 5000);
    });

    // Set first slide as active
    moveToSlide(0);
};

// Reveal Animation using Intersection Observer (Better performance)
const initReveal = () => {
    const reveals = document.querySelectorAll('[data-reveal]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(el => observer.observe(el));
};

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initReveal();
});
