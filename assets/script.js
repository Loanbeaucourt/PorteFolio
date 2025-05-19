// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animation on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight - 100) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});


// Typed.js (animation texte)
if (document.querySelector('.typing')) {
    const typed = new Typed('.typing', {
        strings: [
            "Étudiant en BTS SIO SISR", 
            "Futur Administrateur Réseaux", 
            "Passionné de Hardware"
        ],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true
    });
}

// Smooth scroll pour la flèche de l'accueil
document.querySelector('.scroll-down').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#profil').scrollIntoView({ behavior: 'smooth' });
});

// Smooth scrolling pour tous les liens anchor
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start' // Scroll jusqu'au début de la section
        });
    });
});

// Initialisation des disques NAS
document.querySelectorAll('.hard-drive').forEach(drive => {
    const terminal = drive.querySelector('.terminal');
    const originalContent = terminal.innerHTML; // Sauvegarde le contenu initial

    drive.addEventListener('click', function() {
        const isActive = this.classList.contains('active');
        
        // Fermeture
        if (isActive) {
            this.classList.remove('active');
            terminal.innerHTML = originalContent; // Réinitialise sans animation
            return;
        }

        // Ouverture
        this.classList.add('active');
        terminal.innerHTML = ''; // Nettoie avant l'animation

        // Récupère les lignes du contenu original
        const parser = new DOMParser();
        const doc = parser.parseFromString(originalContent, 'text/html');
        const lines = doc.querySelectorAll('.terminal-line');

        lines.forEach((line, lineIndex) => {
            setTimeout(() => {
                const lineElement = document.createElement('div');
                lineElement.className = line.className;
                terminal.appendChild(lineElement);

                // Animation caractère par caractère
                const text = line.textContent;
                let charIndex = 0;
                const typingInterval = setInterval(() => {
                    if (charIndex < text.length) {
                        lineElement.textContent += text[charIndex];
                        charIndex++;
                    } else {
                        clearInterval(typingInterval);
                    }
                }, 30);
            }, lineIndex * 500); // Délai entre les lignes
        });
    });
});