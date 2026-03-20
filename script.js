document.addEventListener('DOMContentLoaded', () => {

    //Loader logic moved to loader.js

    // ================= EXISTING WEBSITE LOGIC =================

    // --- Custom Cursor Logic ---
    const cursor = document.getElementById('cursor');
    const interactiveElements = document.querySelectorAll('a, .inventory-slot, .quest-card, .achievement-badge, .btn-main');

    // Initially hide cursor to prevent "corner glitch"
    cursor.style.display = 'none';

    document.addEventListener('mousemove', (e) => {
        cursor.style.display = 'block';
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hovered');

            if (el.classList.contains('bio-quest') || el.classList.contains('inventory-slot') && el.dataset.hover === 'Bio') {
                cursor.style.borderColor = 'var(--accent-bio)';
            } else if (el.classList.contains('achievement-badge')) {
                cursor.style.borderColor = 'var(--accent-pm)';
            }
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovered');
            cursor.style.borderColor = 'var(--accent-code)';
        });
    });

    // --- XP Bar & Level Up Logic ---
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;

        document.getElementById('xpBar').style.width = scrolled + '%';

        const levelSpan = document.getElementById('levelNum');
        if (scrolled < 33) levelSpan.innerText = "1";
        else if (scrolled < 66) levelSpan.innerText = "2";
        else levelSpan.innerText = "3";
    });

    // --- Avatar Scroll Logic ---
    // Ensure videos are playing
    const videos = document.querySelectorAll('video');
    videos.forEach(v => v.play().catch(e => console.log("Autoplay blocked", e)));

    // --- Terminal Typing Effect ---
    const typingElement = document.getElementById('typingEffect');
    if (typingElement) {
        setInterval(() => {
            typingElement.style.opacity = typingElement.style.opacity === '0' ? '1' : '0';
        }, 500);
    }
    // --- Skills Wheel Logic ---
    const skillData = {
        "Languages": {
            desc: "Core programming languages for system and application development.",
            skills: ["Python", "Java", "Swift", "JavaScript", "C++", "C#", "SQL", "HTML/CSS"],
            angle: 0
        },
        "AI & ML": {
            desc: "Advanced machine learning and computer vision technologies.",
            skills: ["Computer Vision (OpenCV)", "YOLO", "VitPose", "Transformers", "RAG", "LLMOps", "Scikit-learn", "Pandas", "Power BI"],
            angle: 60
        },
        "Databases": {
            desc: "Data storage, modeling, and retrieval systems.",
            skills: ["MySQL", "Microsoft Access", "Vector Databases (Weaviate)", "Embeddings", "Data Modeling", "Bioinformatics Data Mining"],
            angle: 120
        },
        "Frameworks": {
            desc: "Libraries and frameworks for rapid development.",
            skills: ["SwiftUI", "Node.js", "LangChain", "Handlebars", "MapKit", "Core Location", "REST APIs", "WebSockets", "bcrypt"],
            angle: 180
        },
        "Hardware": {
            desc: "Physical computing and embedded systems.",
            skills: ["Arduino", "Servo Motors", "Flex Sensors", "Wearable Prototyping"],
            angle: 240
        },
        "Dev Tools": {
            desc: "Tools for development, deployment, and design.",
            skills: ["Git", "Docker", "AWS", "Xcode", "Unity", "Jupyter Notebooks", "Google Colab", "GameMaker", "Figma", "Fusion 360", "Vercel"],
            angle: 300
        }
    };

    const segments = document.querySelectorAll('.skill-segment');
    const wheelContainer = document.querySelector('.skills-wheel-container');
    const displayPanel = document.getElementById('skills-display');
    const displayTitle = document.getElementById('display-title');
    const displayDesc = document.getElementById('display-desc');
    const displayList = document.getElementById('display-list');
    const centerHub = document.getElementById('skill-category-title');
    const btnBack = document.getElementById('btn-back');

    segments.forEach(segment => {
        segment.addEventListener('click', () => {
            const category = segment.getAttribute('data-category');
            if (skillData[category]) {
                const data = skillData[category];

                // 1. Activate Segment
                segments.forEach(s => s.classList.remove('active'));
                segment.classList.add('active');

                // 2. Rotate Wheel to position selected at TOP with EXTRA SPINS
                // Rotate to bring selected to 270 deg (top) + 5 full rotations (360 * 5 = 1800)
                // We add the extra rotations to the target angle.
                let targetAngle = (270 - data.angle) + (360 * 5);

                // Apply transform directly via JS to avoid CSS conflict
                // Scale scales down to 0 while rotating
                wheelContainer.style.transform = `rotate(${targetAngle}deg) scale(0)`;

                // 3. Disappear Animation
                // We add the class to handle opacity fade out
                setTimeout(() => {
                    wheelContainer.classList.add('wheel-hidden');

                    // Show Panel after wheel starts disappearing
                    setTimeout(() => {
                        // 5. Show Display Panel
                        displayPanel.classList.add('active'); // Use class based transition
                        displayPanel.style.opacity = ''; // Clear inline if any
                        displayPanel.style.pointerEvents = '';

                        // Populate data
                        centerHub.textContent = category;
                        displayTitle.textContent = category;
                        displayDesc.textContent = data.desc;

                        // Show Back Button
                        btnBack.style.display = 'flex';

                        displayList.innerHTML = '';
                        data.skills.forEach(skill => {
                            const tag = document.createElement('span');
                            tag.classList.add('skill-tag');
                            tag.textContent = skill;
                            displayList.appendChild(tag);
                        });

                        // AnimeJS stagger
                        if (window.anime) {
                            anime({
                                targets: '.skill-tag',
                                opacity: [0, 1],
                                translateY: [10, 0],
                                delay: anime.stagger(30)
                            });
                        }
                    }, 2000); // 2000ms delay to match the 2s animation duration
                }, 50); // Short delay to register click
            }
        });
    });

    // Back Button Logic
    // Back Button Logic
    btnBack.addEventListener('click', () => {
        // Hide Panel
        displayPanel.classList.remove('active');
        btnBack.style.display = 'none';

        // Bring Wheel Back
        // Remove 'wheel-hidden' for opacity
        wheelContainer.classList.remove('wheel-hidden');

        // Reset transform to 0 rotation and full scale
        // The transition in CSS (2s) will animate this reset too, which is nice.
        setTimeout(() => {
            wheelContainer.style.transform = 'rotate(0deg) scale(1)';
            segments.forEach(s => s.classList.remove('active'));
            centerHub.textContent = "Select a Module";
        }, 100);

    });
    // Removed duplicate btnBack.style.display = 'none'; as it's not needed here globally
});