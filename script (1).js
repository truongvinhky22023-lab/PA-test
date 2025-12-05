document.addEventListener('DOMContentLoaded', () => {
            
            const loader = document.getElementById('hacker-loader');
            const loadingTerminalLine = document.getElementById('loading-terminal-line');
            const loadingMessages = [
                "<Connecting to AgencyTeam network...>",
                "<Connecting: Ok...>",
                "<Bypassing firewall...>",
                "<Authenticating user: Benjamin Lewis...>",
                "<Running System Diagnostic: OK...>",
                "<Access Granted. Loading Portfolio...>",
                "<Succeed...> "
            ];
            let messageIndex = 0;

            function typeLoadingMessage() {
                if (messageIndex >= loadingMessages.length) {
                    setTimeout(() => {
                        loader.classList.add('hidden');
                    }, 1000);
                    return;
                }
a
                const currentMessage = loadingMessages[messageIndex];
                let charIndex = 0;
                loadingTerminalLine.textContent = ''; 

                function typeChar() {
                    if (charIndex < currentMessage.length) {
                        loadingTerminalLine.textContent += currentMessage.charAt(charIndex);
                        charIndex++;

                        setTimeout(typeChar, 50); 
                    } else {
                       
                        messageIndex++;
                        setTimeout(typeLoadingMessage, 800); 
                    }
                }
                
                typeChar(); 
            }
            
            
            typeLoadingMessage();


            
            const hamburger = document.getElementById("hamburger");
            const navMenu = document.querySelector(".nav-menu");
            hamburger.addEventListener("click", () => {
                navMenu.classList.toggle("active");
            });

            
            const themeToggle = document.getElementById('theme-toggle');
            const themeIcon = document.getElementById('theme-icon');
            const body = document.body;

            let matrixInterval = null; 

            themeToggle.addEventListener('click', () => {
                body.classList.toggle('light-mode');
                if (body.classList.contains('light-mode')) {
                    themeIcon.classList.remove('fa-terminal');
                    themeIcon.classList.add('fa-sun');
                    stopMatrix(); 
                } else {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-terminal');
                    startMatrix(); 
                }
            });

            
            const typedTextDisplay = document.querySelector(".typing-text");
            const words = ["Nguyen Vo Chi Nguyen", "Linux User", "Hustler Can Tho", "YoungBoi Hau Giang"];
            let wordIndex = 0;
            let charIndex = 0;
            let isDeleting = false;

            function typeEffect() {
                const currentWord = words[wordIndex];
                if (isDeleting) {
                    typedTextDisplay.textContent = "> " + currentWord.substring(0, charIndex--);
                    if (charIndex < 0) {
                        isDeleting = false;
                        wordIndex = (wordIndex + 1) % words.length;
                        setTimeout(typeEffect, 500); 
                    } else {
                        setTimeout(typeEffect, 50); 
                    }
                } else {
                    typedTextDisplay.textContent = "> " + currentWord.substring(0, charIndex++);
                    if (charIndex > currentWord.length) {
                        isDeleting = true;
                        setTimeout(typeEffect, 1500); 
                    } else {
                        setTimeout(typeEffect, 100); 
                    }
                }
            }
            
            if(typedTextDisplay) {
                typeEffect();
            }

            
            window.startCounters = () => {
                const counters = document.querySelectorAll(".stat-numb");
                counters.forEach(counter => {
                    
                    counter.innerText = '0';
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-goal');
                        const count = +counter.innerText;
                        
                        const increment = target / 200; 

                        if (count < target) {
                            counter.innerText = Math.ceil(count + increment);
                            setTimeout(updateCount, 1); 
                        } else {
                            counter.innerText = target; 
                        }
                    };
                    
                    
                    const observer = new IntersectionObserver(entries => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                updateCount();
                                observer.unobserve(counter); 
                            }
                        });
                    }, { threshold: 0.5 });
                    
                    observer.observe(counter);
                });
            };
            
            window.startCounters();

            
            
            const canvas = document.getElementById('matrix-canvas');
            if (canvas) {
                const ctx = canvas.getContext('2d');

                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
                const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                const nums = '0123456789';
                const alphabet = katakana + latin + nums;

                const fontSize = 16;
                const columns = canvas.width / fontSize;
                const rainDrops = [];

                for (let x = 0; x < columns; x++) {
                    rainDrops[x] = 1;
                }

                const draw = () => {
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);

                    ctx.fillStyle = '#00FF41'; 
                    ctx.font = fontSize + 'px monospace';

                    for (let i = 0; i < rainDrops.length; i++) {
                        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

                        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                            rainDrops[i] = 0;
                        }
                        rainDrops[i]++;
                    }
                };
                

                const startMatrix = () => {
                    if (!matrixInterval && !document.body.classList.contains('light-mode')) {
                        matrixInterval = setInterval(draw, 33);
                    }
                };

                const stopMatrix = () => {
                    if (matrixInterval) {
                         clearInterval(matrixInterval);
                         matrixInterval = null;
                         ctx.clearRect(0, 0, canvas.width, canvas.height);
                    }
                };

                if (!document.body.classList.contains('light-mode')) {
                    startMatrix();
                }
                
                window.addEventListener('resize', () => {
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;

                    if (matrixInterval) {
                         stopMatrix();
                         startMatrix();
                    }
                });
            }

            
            const fadeElements = document.querySelectorAll('.fade-in');
            
            const fadeInObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        fadeInObserver.unobserve(entry.target); 
                    }
                });
            }, { 
                threshold: 0.1 
            });

            fadeElements.forEach(el => {
                fadeInObserver.observe(el);
            });
            
            const filterButtons = document.querySelectorAll('.filter-btn');
            const projectCards = document.querySelectorAll('.project-card');

            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Xử lý active state cho nút
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');

                    const filter = button.getAttribute('data-filter');

                    // Lọc và hiển thị/ẩn project
                    projectCards.forEach(card => {
                        const category = card.getAttribute('data-category');
                        if (filter === 'all' || category === filter) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });

        });