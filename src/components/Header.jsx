import React from 'react';
import logo from '../assets/logo.PNG'; 

const Header = () => {
  return (
    <header style={{
      backgroundColor: '#000',
      color: '#fff',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'relative',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      height: '70px'
    }}>
      <div style={{ 
        fontSize: '1.5rem', 
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center'
      }}>
        SmartLang
      </div>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '1rem',
        marginRight: '2rem'
      }}>
        <span style={{ 
          fontSize: '1.5rem',
          fontWeight: '500',
          color: '#808080'
        }}>Team Rocket</span>
        <img 
          src={logo}
          alt="Team Rocket Logo" 
          style={{ 
            height: '70px', 
            width: 'auto',
            borderRadius: '50%',
            objectFit: 'cover'
          }}
        />
      </div>
    </header>
  );
};

export default Header;
