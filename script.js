document.addEventListener('DOMContentLoaded', function () {
    // Custom cursor
    const cursor = document.querySelector('.cursor');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Make cursor interactive with clickable elements
    const clickableElements = document.querySelectorAll('a, button, .project-card, .skill, .stat-card');

    clickableElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-grow');
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-grow');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Mobile menu toggle
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links li a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            burger.classList.remove('active');
        });
    });

    // Animate skills bars on scroll
    const skills = document.querySelectorAll('.skill');

    function animateSkills() {
        skills.forEach(skill => {
            const skillLevel = skill.getAttribute('data-level');
            const skillProgress = skill.querySelector('.skill-progress');

            if (isElementInViewport(skill)) {
                skillProgress.style.width = skillLevel + '%';
            }
        });
    }

    // Check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    // Animate stats counting
    const statNumbers = document.querySelectorAll('.stat-number');

    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;

            const timer = setInterval(() => {
                current += increment;
                stat.textContent = Math.floor(current);

                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                }
            }, 16);
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('skill')) {
                    animateSkills();
                }

                if (entry.target.classList.contains('stat-number')) {
                    animateStats();
                    observer.unobserve(entry.target);
                }

                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe elements
    skills.forEach(skill => {
        observer.observe(skill);
    });

    statNumbers.forEach(stat => {
        observer.observe(stat);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Text animation for hero section
    const animatedText = document.querySelector('.animated-text');
    const animatedSubtext = document.querySelector('.animated-subtext');
    const animatedParagraph = document.querySelector('.animated-paragraph');

    setTimeout(() => {
        animatedText.style.opacity = '1';
        animatedText.style.transform = 'translateY(0)';
    }, 500);

    setTimeout(() => {
        animatedSubtext.style.opacity = '1';
        animatedSubtext.style.transform = 'translateY(0)';
    }, 1000);

    setTimeout(() => {
        animatedParagraph.style.opacity = '1';
        animatedParagraph.style.transform = 'translateY(0)';
    }, 1500);

    // Form submission
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Here you would typically send the form data to a server
            // For demo purposes, we'll just show an alert
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }




    // Dark/Light Mode Toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Check for saved user preference, if any
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.add(currentTheme);
        if (currentTheme === 'dark-mode') {
            darkModeToggle.checked = true;
        }
    }

    // Listen for toggle changes
    darkModeToggle.addEventListener('change', () => {
        if (darkModeToggle.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', '');
        }
    });

    // Update cursor color in dark mode
    function updateCursorColor() {
        const cursor = document.querySelector('.cursor');
        if (body.classList.contains('dark-mode')) {
            cursor.style.backgroundColor = '#f1c40f';
            cursor.style.mixBlendMode = 'normal';
        } else {
            cursor.style.backgroundColor = 'var(--primary-color)';
            cursor.style.mixBlendMode = 'difference';
        }
    }

    // Call initially and when theme changes
    updateCursorColor();
    darkModeToggle.addEventListener('change', updateCursorColor);



    // Initialize animations on page load
    animateSkills();
});