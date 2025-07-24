// Imports nécessaires
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

// Composant bouton moderne pour basculer entre mode sombre et clair
function ThemeToggle() {
  // Récupération de l'état du thème et de la fonction pour le changer
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      className="theme-toggle"
      title={isDarkMode ? 'Passer en mode clair' : 'Passer en mode sombre'}
    >
      <span className="theme-icon">
        {isDarkMode ? '🌙' : '☀️'}
      </span>
    </button>
  );
}

export default ThemeToggle;
