import React, { useState, useEffect } from 'react';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Sparkles, Trophy, Sword } from 'lucide-react';

const DiceIcon = ({ value, className, color }) => {
  const icons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];
  const Icon = icons[value - 1] || Dice1;
  return <Icon className={className} size={100} color={color} style={{ filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.3))' }} />;
};

const DiceGame = () => {
  const [playerRoll, setPlayerRoll] = useState(1);
  const [wizRoll, setWizRoll] = useState(1);
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState("Are you feeling lucky?");
  const [history, setHistory] = useState([]);
  const [score, setScore] = useState({ player: 0, wiz: 0 });

  return (
    <div style={{ 
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif", 
      textAlign: 'center', 
      padding: '40px',
      background: 'rgba(30, 30, 46, 0.7)',
      backdropFilter: 'blur(10px)',
      color: '#cdd6f4',
      borderRadius: '30px',
      maxWidth: '500px',
      margin: '40px auto',
      boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
      border: '1px solid rgba(255, 215, 0, 0.2)',
      position: 'relative',
      zIndex: 1
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
        <Sparkles color="#ffd700" />
        <h1 style={{ color: '#ffd700', fontSize: '2.5rem', margin: '10px 0', textShadow: '0 0 20px rgba(255, 215, 0, 0.4)' }}>
          WIZ DICE
        </h1>
        <Sparkles color="#ffd700" />
      </div>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-around', 
        padding: '20px', 
        backgroundColor: 'rgba(255,255,255,0.05)', 
        borderRadius: '20px',
        marginBottom: '30px'
      }}>
        <div>
          <p style={{ color: '#89b4fa', fontWeight: 'bold' }}>YOU</p>
          <p style={{ fontSize: '1.5rem', margin: '5px 0' }}>{score.player}</p>
        </div>
        <div style={{ borderLeft: '1px solid #45475a', height: '40px', alignSelf: 'center' }}></div>
        <div>
          <p style={{ color: '#f38ba8', fontWeight: 'bold' }}>THE WIZ</p>
          <p style={{ fontSize: '1.5rem', margin: '5px 0' }}>{score.wiz}</p>
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-around', margin: '40px 0', perspective: '1000px' }}>
        <div className={rolling ? 'animate-roll' : ''}>
          <DiceIcon value={playerRoll} color="#89b4fa" />
          <p style={{ marginTop: '10px', opacity: 0.7 }}>Your Fate</p>
        </div>
        <div className={rolling ? 'animate-roll-alt' : ''}>
          <DiceIcon value={wizRoll} color="#f38ba8" />
          <p style={{ marginTop: '10px', opacity: 0.7 }}>Wiz Magic</p>
        </div>
      </div>

      <div style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ 
          fontSize: '1.8rem', 
          color: result.includes('✨') ? '#a6e3a1' : result.includes('🔮') ? '#f38ba8' : '#ffd700',
          transition: 'all 0.3s ease'
        }}>
          {result}
        </h2>
      </div>

      <button 
        onClick={rollDice}
        disabled={rolling}
        style={{
          padding: '20px 50px',
          fontSize: '20px',
          backgroundColor: rolling ? '#45475a' : '#ffd700',
          border: 'none',
          borderRadius: '15px',
          cursor: rolling ? 'default' : 'pointer',
          fontWeight: 'bold',
          color: '#11111b',
          transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transform: rolling ? 'scale(0.95)' : 'scale(1)',
          boxShadow: rolling ? 'none' : '0 10px 20px rgba(255, 215, 0, 0.2)'
        }}
      >
        {rolling ? 'CASTING...' : 'ROLL THE DICE'}
      </button>

      {history.length > 0 && (
        <div style={{ marginTop: '30px', textAlign: 'left', padding: '0 20px' }}>
          <p style={{ fontSize: '0.8rem', opacity: 0.5, marginBottom: '5px' }}>LATEST SCROLLS</p>
          {history.map((h, i) => (
            <div key={i} style={{ fontSize: '0.9rem', opacity: 1 - (i * 0.2), borderLeft: '2px solid #313244', paddingLeft: '10px', margin: '4px 0' }}>
              {h}
            </div>
          ))}
        </div>
      )}

      <style>{`
        .animate-roll {
          animation: roll 0.6s infinite ease-in-out;
        }
        .animate-roll-alt {
          animation: roll 0.6s infinite ease-in-out reverse;
        }
        @keyframes roll {
          0% { transform: translateY(0) rotate(0deg) scale(1); }
          25% { transform: translateY(-30px) rotate(90deg) scale(1.1); }
          50% { transform: translateY(0) rotate(180deg) scale(1); }
          75% { transform: translateY(-15px) rotate(270deg) scale(1.05); }
          100% { transform: translateY(0) rotate(360deg) scale(1); }
        }
        button:hover:not(:disabled) {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 15px 30px rgba(255, 215, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default DiceGame;
