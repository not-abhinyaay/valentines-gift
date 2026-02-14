document.addEventListener('DOMContentLoaded', () => {

    // --- Floating Hearts Animation ---
    const heartsContainer = document.getElementById('hearts-container');
    const heartSymbols = ['💗', '💖', '💝', '💕', '💓'];

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerText = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

        // Randomize position and size
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';

        // Randomize animation duration
        heart.style.animationDuration = (Math.random() * 5 + 10) + 's';

        heartsContainer.appendChild(heart);

        // Remove heart after animation to prevent DOM overflow
        setTimeout(() => {
            heart.remove();
        }, 15000);
    }

    // Create a heart every 800ms
    setInterval(createHeart, 800);


    // --- Hamburger Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });


    // --- Intersection Observer for Fade-in Animations ---
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animates only once
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));


    // --- Scroll to Top Button ---
    const scrollTopBtn = document.getElementById('scroll-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    // --- Music Toggle ---
    const musicBtn = document.getElementById('music-btn');
    const bgMusic = document.getElementById('bg-music');
    let isPlaying = false;

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.innerText = '🎵';
            musicBtn.classList.remove('playing');
        } else {
            bgMusic.play().then(() => {
                musicBtn.innerText = '⏸';
                musicBtn.classList.add('playing');
            }).catch(error => {
                console.log("Audio play failed (browser policy):", error);
                alert("Please interact with the page first or allow audio autoplay!");
            });
        }
        isPlaying = !isPlaying;
    });


    // --- Card Reveal on Tap ---
    const hiddenCards = document.querySelectorAll('.hidden-card');

    hiddenCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.add('revealed');
        });
    });

    function revealAllCards() {
        hiddenCards.forEach(card => card.classList.add('revealed'));
    }


    // --- Shake Detection (mobile) ---
    let lastX = 0, lastY = 0, lastZ = 0;
    let shakeThreshold = 25;

    function handleMotion(event) {
        const { x, y, z } = event.accelerationIncludingGravity || {};
        if (x === null || x === undefined) return;

        const deltaX = Math.abs(x - lastX);
        const deltaY = Math.abs(y - lastY);
        const deltaZ = Math.abs(z - lastZ);

        if ((deltaX > shakeThreshold && deltaY > shakeThreshold) ||
            (deltaX > shakeThreshold && deltaZ > shakeThreshold) ||
            (deltaY > shakeThreshold && deltaZ > shakeThreshold)) {
            revealAllCards();
        }

        lastX = x; lastY = y; lastZ = z;
    }

    if (window.DeviceMotionEvent) {
        // iOS 13+ requires permission
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            document.body.addEventListener('click', function requestMotion() {
                DeviceMotionEvent.requestPermission()
                    .then(response => {
                        if (response === 'granted') {
                            window.addEventListener('devicemotion', handleMotion);
                        }
                    });
                document.body.removeEventListener('click', requestMotion);
            });
        } else {
            window.addEventListener('devicemotion', handleMotion);
        }
    }

});
