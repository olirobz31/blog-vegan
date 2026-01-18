// Configuration Firebase pour Végétalicious
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

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
const analytics = getAnalytics(app);

// Fonction d'inscription
export async function inscription(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return { success: true, user: userCredential.user };
    } catch (error) {
        let message = "Une erreur est survenue";
        switch (error.code) {
            case 'auth/email-already-in-use':
                message = "Cette adresse email est déjà utilisée";
                break;
            case 'auth/weak-password':
                message = "Le mot de passe doit contenir au moins 6 caractères";
                break;
            case 'auth/invalid-email':
                message = "Adresse email invalide";
                break;
        }
        return { success: false, error: message };
    }
}

// Fonction de connexion
export async function connexion(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { success: true, user: userCredential.user };
    } catch (error) {
        let message = "Une erreur est survenue";
        switch (error.code) {
            case 'auth/user-not-found':
                message = "Aucun compte trouvé avec cette adresse email";
                break;
            case 'auth/wrong-password':
                message = "Mot de passe incorrect";
                break;
            case 'auth/invalid-email':
                message = "Adresse email invalide";
                break;
            case 'auth/invalid-credential':
                message = "Email ou mot de passe incorrect";
                break;
        }
        return { success: false, error: message };
    }
}

// Fonction de déconnexion
export async function deconnexion() {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Observer l'état de connexion
export function observerConnexion(callback) {
    onAuthStateChanged(auth, callback);
}

// Exporter auth pour utilisation directe si nécessaire
export { auth };
