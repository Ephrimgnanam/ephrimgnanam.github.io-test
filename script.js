document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIGURATION ---
    const typingSpeed = 50;
    const missileLaunchIntervalMin = 8000;  // 8 seconds
    const missileLaunchIntervalMax = 20000; // 20 seconds
    
    // --- ELEMENT SELECTORS ---
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const mainNav = document.getElementById('main-nav');
    const homePage = document.getElementById('home');
    const blogListContainer = document.querySelector('.blog-list-container');
    const blogPosts = document.querySelectorAll('.blog-post');
    const scrollCursor = document.querySelector('.scroll-cursor');
    const miscCards = document.querySelectorAll('.misc-card');
    const terminalBody = document.getElementById('terminal-body');
    const missileSilo = document.querySelector('.missile-silo');
    const missileTemplate = document.querySelector('.missile-template');

    // --- PAGE NAVIGATION ---
    const showPage = (pageId) => {
        pages.forEach(page => {
            page.classList.add('hidden');
        });
        document.getElementById(pageId).classList.remove('hidden');

        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.page === pageId);
        });
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = e.target.dataset.page;
            showPage(pageId);
        });
    });

    // --- HOME PAGE TYPING ANIMATION ---
    const linesToType = [
        { text: '$ INITIATING SECURE CONNECTION...', isPrompt: false },
        { text: '$ CONNECTION ESTABLISHED.', isPrompt: false, delay: 500 },
        { text: '$ LOADING PHANTOMFORGE PROTOCOL...', isPrompt: false },
        { text: '> Welcome. This is a private terminal for strategic analysis, cybersecurity research, and reflections on faith and conflict in the digital age. All data is classified. Proceed with caution.', isPrompt: true, delay: 1000 },
    ];
    
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const typeLine = async (line, element) => {
        const p = document.createElement('p');
        if (line.isPrompt) p.classList.add('prompt');
        element.appendChild(p);

        for (let i = 0; i < line.text.length; i++) {
            p.innerHTML += line.text.charAt(i);
            await sleep(typingSpeed);
        }
    };

    const runTerminalIntro = async () => {
        const cursor = document.createElement('span');
        cursor.className = 'cursor';
        terminalBody.appendChild(cursor);

        for (const line of linesToType) {
            terminalBody.removeChild(cursor);
            if (line.delay) await sleep(line.delay);
            await typeLine(line, terminalBody);
            terminalBody.appendChild(cursor);
        }

        // Create and show buttons after typing
        const buttonContainer = document.createElement('div');
        buttonContainer.style.marginTop = '20px';
        const enterButton = document.createElement('button');
        enterButton.className = 'terminal-button';
        enterButton.textContent = '[ENTER_SITE]';
        enterButton.onclick = () => {
            homePage.classList.add('hidden');
            mainNav.classList.remove('hidden');
            showPage('blog'); // Default page after entering
        };
        buttonContainer.appendChild(enterButton);
        terminalBody.appendChild(buttonContainer);
        terminalBody.removeChild(cursor);
    };


    // --- BLOG PAGE CURSOR ---
    if (blogListContainer) {
        blogPosts.forEach(post => {
            post.addEventListener('mouseenter', () => {
                const rect = post.getBoundingClientRect();
                const containerRect = blogListContainer.getBoundingClientRect();
                scrollCursor.style.top = `${rect.top - containerRect.top + (rect.height / 2) - 8}px`;
            });
        });
    }

    // --- MISCELLANEOUS PAGE GLITCH EFFECT ---
    miscCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('glitch');
            setTimeout(() => card.classList.remove('glitch'), 200);
        });
    });

    // --- BACKGROUND MISSILE LAUNCH ---
    const launchMissile = () => {
        const missile = missileTemplate.cloneNode(true);
        missileSilo.appendChild(missile);

        const startX = Math.random() * 90 + 5; // 5% to 95% of width
        missile.style.left = `${startX}%`;

        // Trigger animation
        requestAnimationFrame(() => {
            missile.classList.add('launch');
        });

        // Clean up after animation
        missile.addEventListener('transitionend', () => {
            missile.remove();
        });
    };
    
    const scheduleNextLaunch = () => {
        const delay = Math.random() * (missileLaunchIntervalMax - missileLaunchIntervalMin) + missileLaunchIntervalMin;
        setTimeout(() => {
            launchMissile();
            scheduleNextLaunch();
        }, delay);
    };

    // --- INITIALIZATION ---
    runTerminalIntro();
    scheduleNextLaunch(); // Start the missile launches
});