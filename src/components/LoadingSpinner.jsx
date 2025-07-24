import React from 'react';

const LoadingSpinner = ({ size = 'medium', text = 'Chargement...' }) => {
  const sizes = {
    small: '30px',
    medium: '50px',
    large: '80px'
  };

  return (
    <div className="loading-container" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      gap: '20px'
    }}>
      <div 
        className="modern-spinner"
        style={{
          width: sizes[size],
          height: sizes[size],
          border: '3px solid rgba(255, 255, 255, 0.2)',
          borderTop: '3px solid #667eea',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          boxShadow: '0 0 20px rgba(102, 126, 234, 0.3)'
        }}
      />
      <p style={{
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: '500',
        fontSize: '1rem',
        animation: 'pulse 1.5s ease-in-out infinite'
      }}>
        {text}
      </p>
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
