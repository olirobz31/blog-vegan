// Script pour gérer l'affichage du bouton de connexion dans le header
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAuPzS0VIej4_vkVIsNbSuJx6Lx-b0s6xI",
    authDomain: "vegetalicious-47767.firebaseapp.com",
    projectId: "vegetalicious-47767",
    storageBucket: "vegetalicious-47767.firebasestorage.app",
    messagingSenderId: "227650648871",
    appId: "1:227650648871:web:4a78a07ebd939cc5370702",
    measurementId: "G-G22N9J98RS"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Créer le bouton de connexion dans le header
function createAuthButton() {
    const socialIcons = document.querySelector('.social-icons');
    if (!socialIcons) return;

    // Créer le conteneur du bouton d'authentification
    const authContainer = document.createElement('div');
    authContainer.className = 'header-auth-container';
    authContainer.innerHTML = `
        <a href="connexion.html" class="header-auth-btn" id="headerAuthBtn">
            <i class="fas fa-user"></i>
            <span>Connexion</span>
        </a>
    `;

    // Insérer avant les icônes sociales
    socialIcons.parentNode.insertBefore(authContainer, socialIcons);
}

// Mettre à jour le bouton selon l'état de connexion
function updateAuthButton(user) {
    const authBtn = document.getElementById('headerAuthBtn');
    if (!authBtn) return;

    if (user) {
        // Utilisateur connecté
        authBtn.innerHTML = `
            <i class="fas fa-user-check"></i>
            <span>Mon compte</span>
        `;
        authBtn.classList.add('header-user-btn');
    } else {
        // Utilisateur non connecté
        authBtn.innerHTML = `
            <i class="fas fa-user"></i>
            <span>Connexion</span>
        `;
        authBtn.classList.remove('header-user-btn');
    }
}

// Initialiser quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
    createAuthButton();
    onAuthStateChanged(auth, updateAuthButton);
});
