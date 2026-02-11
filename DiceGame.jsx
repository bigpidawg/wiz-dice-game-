import React, { useState } from 'react';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';

const DiceIcon = ({ value, className }) => {
  const icons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];
  const Icon = icons[value - 1] || Dice1;
  return <Icon className={className} size={80} />;
};

const DiceGame = () => {
  const [playerRoll, setPlayerRoll] = useState(1);
  const [wizRoll, setWizRoll] = useState(1);
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState("Roll the dice!");

  const rollDice = () => {
    setRolling(true);
    setResult("Rolling...");
    
    setTimeout(() => {
      const p = Math.floor(Math.random() * 6) + 1;
      const w = Math.floor(Math.random() * 6) + 1;
      
      setPlayerRoll(p);
      setWizRoll(w);
      setRolling(false);

      if (p > w) setResult("✨ You Win!");
      else if (w > p) setResult("🔮 The Wiz Wins!");
      else setResult("🤝 It's a Draw!");
    }, 600);
  };

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      textAlign: 'center', 
      padding: '40px',
      backgroundColor: '#1a1a1a',
      color: 'white',
      borderRadius: '20px',
      maxWidth: '400px',
      margin: '20px auto'
    }}>
      <h1 style={{ color: '#ffd700' }}>🎲 Wiz Dice</h1>
      
      <div style={{ display: 'flex', justifyContent: 'space-around', margin: '40px 0' }}>
        <div>
          <p>You</p>
          <DiceIcon value={playerRoll} className={rolling ? 'animate-bounce' : ''} />
        </div>
        <div>
          <p>The Wiz</p>
          <DiceIcon value={wizRoll} className={rolling ? 'animate-bounce' : ''} />
        </div>
      </div>

      <h2 style={{ height: '40px' }}>{result}</h2>

      <button 
        onClick={rollDice}
        disabled={rolling}
        style={{
          padding: '15px 30px',
          fontSize: '18px',
          backgroundColor: '#ffd700',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          fontWeight: 'bold',
          color: 'black'
        }}
      >
        {rolling ? 'ROLLING...' : 'ROLL DICE'}
      </button>

      <style>{`
        .animate-bounce {
          animation: bounce 0.5s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default DiceGame;
