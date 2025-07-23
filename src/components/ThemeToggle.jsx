// Imports nécessaires
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

// Composant bouton pour basculer entre mode sombre et clair
function ThemeToggle() {
  // Récupération de l'état du thème et de la fonction pour le changer
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle-container">
      {/* Checkbox cachée qui gère l'état */}
      <input
        type="checkbox"
        id="theme-toggle"
        className="theme-toggle-checkbox"
        checked={isDarkMode}
        onChange={toggleTheme}
      />
      {/* Label stylisé qui fait office de bouton visuel */}
      <label htmlFor="theme-toggle" className="theme-toggle-label">
        <span className="theme-toggle-slider">
          <span className="theme-toggle-icon">
            {/* Icône qui change selon le mode actuel */}
            {isDarkMode ? '🌙' : '☀️'}
          </span>
        </span>
      </label>
    </div>
  );
}

export default ThemeToggle;
