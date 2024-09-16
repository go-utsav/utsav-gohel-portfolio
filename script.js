document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-links a');
    const form = document.getElementById('contact-form');
    const exploreButton = document.querySelector('.explore-button');
    const navLinksContainer = document.getElementById('menu-list');
    
    // Typed.js initialization
    if (document.getElementById('typed')) {
        new Typed('#typed', {
            stringsElement: '#typed-strings',
            typeSpeed: 40,
            backSpeed: 20,
            backDelay: 1000,
            loop: true,
            loopCount: Infinity,
            onStringTyped: function(arrayPos, self) {
                self.el.innerHTML += '<br>';
            }
        });
    }
    
    // Cloud Console functionality
    if (exploreButton && navLinksContainer) {
        exploreButton.addEventListener('click', function(e) {
            e.preventDefault();
            const expanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !expanded);
            navLinksContainer.classList.toggle('show');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!exploreButton.contains(e.target) && !navLinksContainer.contains(e.target)) {
                exploreButton.setAttribute('aria-expanded', 'false');
                navLinksContainer.classList.remove('show');
            }
        });
    }

    // Smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                // Close the menu if it's open
                if (navLinksContainer) {
                    navLinksContainer.classList.remove('show');
                }
                if (exploreButton) {
                    exploreButton.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // Form submission
    if (form) {
        form.addEventListener('submit', async function (event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            const body = JSON.stringify({
                senderName: name,
                senderEmail: email,
                message: message
            });

            try {
                const response = await fetch('https://qahw2klilf.execute-api.us-east-1.amazonaws.com/prod/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: body
                });

                if (!response.ok) {
                    throw new Error('Error in fetch');
                }

                const result = await response.json();
                alert('Message sent successfully!');
                form.reset();
            } catch (error) {
                alert('Error sending message. Please try again later.');
            }
        });
    }

    // Scroll-triggered animations
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

    const animatedElements = document.querySelectorAll('.skill-item, .project-card');
    animatedElements.forEach(el => observer.observe(el));

    // Header scroll effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, false);

    // Skill hover effect
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.05)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
        });
    });
    

    // Fetch AWS News if on aws-news.html
    if (window.location.pathname.includes('aws-news.html')) {
        fetch('https://cj2bnnrpftobqkf5n4je5qa2ne0iuusn.lambda-url.us-east-1.on.aws/')
            .then(response => response.json())
            .then(data => displayNews(data))
            .catch(error => console.error('Error fetching news:', error));
    }

    function displayNews(newsItems) {
        const container = document.getElementById('posts-container');
        newsItems.forEach(item => {
            const newsElement = document.createElement('div');
            newsElement.innerHTML = `
                <h3>${item.Title}</h3>
                <p>${item.Summary}</p>
                <a href="${item.Link}" target="_blank">Read more</a>
            `;
            container.appendChild(newsElement);
        });
    }
});