// Menu Mobile
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');
const body = document.body;

// Créer l'overlay
const overlay = document.createElement('div');
overlay.className = 'menu-overlay';
document.body.appendChild(overlay);

// Toggle menu
mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    overlay.classList.toggle('active');
    body.classList.toggle('menu-open');
    
    // Changer l'icône
    const icon = mobileMenuBtn.querySelector('i');
    if (nav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Fermer le menu en cliquant sur l'overlay
overlay.addEventListener('click', () => {
    nav.classList.remove('active');
    overlay.classList.remove('active');
    body.classList.remove('menu-open');
    
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
});

// Fermer le menu quand on clique sur un lien
const navLinks = document.querySelectorAll('.nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
        
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Gestion du formulaire de contact
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        const successMessage = document.getElementById('successMessage');
        const errorMessage = document.getElementById('errorMessage');
        
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Masquer les messages précédents
            successMessage.style.display = 'none';
            errorMessage.style.display = 'none';
            
            // Ajouter l'effet de chargement
            contactForm.classList.add('loading');
            
            // Préparer les données
            const formData = new FormData(contactForm);
            formData.append('access_key', '9a01e0ea-0cc2-487d-8e01-f760a34845cf'); // ⚠️ REMPLACE PAR TA CLÉ
            
            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                
                if (data.success) {
                    successMessage.style.display = 'block';
                    contactForm.reset();
                    // Faire défiler vers le message
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else {
                    errorMessage.style.display = 'block';
                }
            } catch (error) {
                errorMessage.style.display = 'block';
            } finally {
                contactForm.classList.remove('loading');
            }
        });
    }
});

// Gestion du formulaire newsletter
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        const successMessage = document.getElementById('newsletterSuccess');
        const errorMessage = document.getElementById('newsletterError');
        
        newsletterForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Masquer les messages précédents
            successMessage.style.display = 'none';
            errorMessage.style.display = 'none';
            
            // Ajouter l'effet de chargement
            newsletterForm.classList.add('loading');
            
            // Préparer les données
            const formData = new FormData(newsletterForm);
            formData.append('access_key', '9a01e0ea-0cc2-487d-8e01-f760a34845cf'); // ⚠️ REMPLACE PAR TA CLÉ
            formData.append('subject', 'Nouvel abonné newsletter Végétalicious');
            
            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                
                if (data.success) {
                    successMessage.style.display = 'block';
                    newsletterForm.reset();
                } else {
                    errorMessage.style.display = 'block';
                }
            } catch (error) {
                errorMessage.style.display = 'block';
            } finally {
                newsletterForm.classList.remove('loading');
            }
        });
    }
});