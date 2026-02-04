// Theme Toggle Functionality
        const themeToggle = document.getElementById('themeToggle');
        const html = document.documentElement;
        
        // Check for saved theme preference or default to dark mode
        const currentTheme = localStorage.getItem('theme') || 'dark';
        html.setAttribute('data-theme', currentTheme);
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });

        // Cursor glow effect
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            document.body.classList.add('mouse-active');
        });

        document.addEventListener('mouseleave', () => {
            document.body.classList.remove('mouse-active');
        });

        function animateCursor() {
            // Smooth interpolation for cursor position
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            
            // Update the pseudo-element position using transform
            const glow = document.body;
            glow.style.setProperty('--glow-x', `${cursorX}px`);
            glow.style.setProperty('--glow-y', `${cursorY}px`);
            
            requestAnimationFrame(animateCursor);
        }

        // Start the animation loop
        animateCursor();

        // Set last updated date
        const lastUpdatedElement = document.getElementById('last-updated-date');
        if (lastUpdatedElement) {
            const today = new Date();
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            lastUpdatedElement.textContent = today.toLocaleDateString('en-US', options);
        }

        // Project tabs functionality
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                const targetContent = document.querySelector(`[data-content="${targetTab}"]`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });

        // Email display functionality
        const emailButton = document.getElementById('email-button');
        const emailDisplay = document.getElementById('email-display');
        const copyEmailBtn = document.getElementById('copy-email-btn');

        if (emailButton && emailDisplay) {
            emailButton.addEventListener('click', () => {
                emailDisplay.classList.toggle('show');
            });
        }

        if (copyEmailBtn) {
            copyEmailBtn.addEventListener('click', () => {
                const email = 'reeyarauf@gmail.com';
                navigator.clipboard.writeText(email).then(() => {
                    copyEmailBtn.textContent = 'Copied!';
                    setTimeout(() => {
                        copyEmailBtn.textContent = 'Copy to Clipboard';
                    }, 2000);
                });
            });
        }

        // Smooth scrolling for navigation links
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

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Add stagger effect to skill cards
        const skillCards = document.querySelectorAll('.skill-card');
        skillCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });

        // Add stagger effect to project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.15}s`;
        });