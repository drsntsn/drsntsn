// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Initialize Particles.js (Network Effect for Hero)
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#64ffda" /* Accent Color */
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#64ffda",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 3,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Initialize VanillaTilt (3D Effect on Cards)
    // Select Service Cards and Portfolio Items
    VanillaTilt.init(document.querySelectorAll(".service-card, .portfolio-item"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
        scale: 1.05
    });

    // Dynamic Counters
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target + "+";
                }
            };
            updateCount();
        });
    };

    // Trigger Counters when About section is in view
    let aboutSection = document.querySelector('#about');
    if (aboutSection) {
        let observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(aboutSection);
    }
});

/* =========================================
   Interactive Functions (Migrated from HTML)
   ========================================= */

// Mobile Menu Toggle
window.toggleMenu = function () {
    const nav = document.getElementById('navLinks');
    nav.classList.toggle('active');
};

// Service Card Toggle (Accordion-like)
window.toggleService = function (card) {
    // Close other cards
    const allCards = document.querySelectorAll('.service-card');
    allCards.forEach(c => {
        if (c !== card) {
            c.classList.remove('active');
        }
    });
    // Toggle current card
    card.classList.toggle('active');
};

// Lightbox Functions
window.openLightbox = function (item) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('caption');
    const title = item.querySelector('h3').innerText;
    const imageUrl = item.getAttribute('data-image');

    lightbox.style.display = "flex";
    if (imageUrl) {
        lightboxImg.src = imageUrl;
        lightboxImg.style.display = "block";
    } else {
        lightboxImg.style.display = "none";
    }
    caption.innerHTML = title;
};

window.closeLightbox = function () {
    document.getElementById('lightbox').style.display = "none";
};

// Portfolio Filter
window.filterPortfolio = function (category) {
    // Update active button
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick').includes(category)) {
            btn.classList.add('active');
        }
    });

    // Filter items
    const items = document.querySelectorAll('.portfolio-item');
    items.forEach(item => {
        if (item.classList.contains(category)) {
            item.style.display = 'flex';
            // Animation
            item.animate([
                { transform: 'scale(0.9)', opacity: 0 },
                { transform: 'scale(1)', opacity: 1 }
            ], {
                duration: 300,
                fill: 'forwards'
            });
        } else {
            item.style.display = 'none';
        }
    });
};

// Newsletter Subscription
window.subscribeNewsletter = function (e) {
    e.preventDefault();
    const emailInput = document.getElementById('newsletter-email');
    const email = emailInput.value;

    if (email) {
        let emails = JSON.parse(localStorage.getItem('nodusEmails')) || [];
        emails.push(email);
        localStorage.setItem('nodusEmails', JSON.stringify(emails));
        alert('Bültenimize abone olduğunuz için teşekkürler! (' + email + ')');
        emailInput.value = '';
    }
};

// Theme Toggle
window.toggleTheme = function (isChecked) {
    if (isChecked) {
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
    }
};

// Check Local Storage on Load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const toggle = document.getElementById('checkbox');

    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        if (toggle) toggle.checked = true;
    }

    // Start Hero Auto-Play
    initHeroSlider();
    // Init Reviews
    initReviews();
});

// --- Hero Auto-Play Logic ---
function initHeroSlider() {
    const items = document.querySelectorAll('.accordion-item');
    const container = document.querySelector('.hero-accordion');
    let currentIndex = 0;
    let interval;
    const delay = 2500; // 2.5 seconds

    // Function to advance slide
    const nextSlide = () => {
        if (!items.length) return;
        currentIndex = (currentIndex + 1) % items.length;

        // Desktop: Class Based
        if (window.innerWidth > 768) {
            items.forEach(el => el.classList.remove('active'));
            items[currentIndex].classList.add('active');
        }
        // Mobile: Scroll Based
        else if (container) {
            const width = items[0].offsetWidth;
            container.scrollTo({
                left: width * currentIndex,
                behavior: 'smooth'
            });
        }
    };

    // Start Loop
    const start = () => {
        clearInterval(interval);
        interval = setInterval(nextSlide, delay);
    };

    // Pause Loop
    const stop = () => clearInterval(interval);

    // Interaction Listeners (Pause on hover/touch)
    if (container) {
        container.addEventListener('mouseenter', stop);
        container.addEventListener('mouseleave', start);
        container.addEventListener('touchstart', stop);
        container.addEventListener('touchend', start);
    }

    // Init state
    if (window.innerWidth > 768 && items.length > 0) {
        items[0].classList.add('active'); // Activate first on Desktop initially
    }

    start();
}

// --- Review Like Functionality ---
const reviewsData = {
    1: { count: 12, liked: false },
    2: { count: 8, liked: false },
    3: { count: 15, liked: false }
};

// Load existing likes from storage on init
function initReviews() {
    const savedData = localStorage.getItem('nodusReviewLikes');

    if (savedData) {
        const parsed = JSON.parse(savedData);
        for (let id in parsed) {
            if (reviewsData[id]) {
                reviewsData[id] = parsed[id];
            }
        }
    }
    // Update UI
    updateReviewUI();
}

function updateReviewUI() {
    for (let id in reviewsData) {
        const counter = document.getElementById(`like-count-${id}`);
        const heart = document.getElementById(`heart-${id}`);

        if (counter && heart) {
            const btn = heart.parentElement;
            counter.innerText = reviewsData[id].count;

            if (reviewsData[id].liked) {
                heart.classList.remove('fa-regular');
                heart.classList.add('fa-solid');
                btn.classList.add('liked');
            } else {
                heart.classList.remove('fa-solid');
                heart.classList.add('fa-regular');
                btn.classList.remove('liked');
            }
        }
    }
}

window.toggleLike = function (id) {
    const data = reviewsData[id];
    if (!data) return;

    if (data.liked) {
        data.count--;
        data.liked = false;
    } else {
        data.count++;
        data.liked = true;
    }

    // Save
    localStorage.setItem('nodusReviewLikes', JSON.stringify(reviewsData));

    // Update UI
    updateReviewUI();
};
