const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Wiz Dice</title>
        <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        <style>
          body { background: #121212; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; color: white; font-family: system-ui; }
          .dice { font-size: 100px; transition: transform 0.2s; }
          .rolling { animation: shake 0.1s infinite; }
          @keyframes shake { 0% { transform: rotate(5deg); } 50% { transform: rotate(-5deg); } 100% { transform: rotate(5deg); } }
          button { padding: 15px 30px; font-size: 18px; background: #ffd700; border: none; border-radius: 10px; cursor: pointer; font-weight: bold; }
          button:disabled { background: #555; }
        </style>
      </head>
      <body>
        <div id="root"></div>
        <script type="text/babel">
          const { useState } = React;
          const faces = ['','⚀','⚁','⚂','⚃','⚄','⚅'];

          const DiceGame = () => {
            const [pVal, setPVal] = useState(1);
            const [wVal, setWVal] = useState(1);
            const [pScore, setPScore] = useState(0);
            const [wScore, setWScore] = useState(0);
            const [rolling, setRolling] = useState(false);
            const [msg, setMsg] = useState("Roll the dice!");

            const roll = () => {
              setRolling(true);
              setMsg("Rolling...");
              setTimeout(() => {
                const p = Math.floor(Math.random() * 6) + 1;
                const w = Math.floor(Math.random() * 6) + 1;
                setPVal(p); setWVal(w);
                setRolling(false);
                
                if (p > w) {
                  setMsg("✨ You Win!");
                  setPScore(s => s + 1);
                } else if (w > p) {
                  setMsg("🔮 Wiz Wins!");
                  setWScore(s => s + 1);
                } else {
                  setMsg("🤝 Draw!");
                }
              }, 600);
            };

            const reset = () => {
              setPScore(0); setWScore(0); setMsg("Scores Reset!");
            };

            return (
              <div style={{ textAlign: 'center', padding: '40px', background: '#1a1a1a', borderRadius: '20px', border: '2px solid #ffd700' }}>
                <h1 style={{ color: '#ffd700', margin: '0' }}>🎲 Wiz Dice Pro</h1>
                
                <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', margin: '20px 0', fontSize: '20px' }}>
                  <div style={{ padding: '10px 20px', background: '#333', borderRadius: '10px' }}>
                    You: <span style={{ color: '#ffd700', fontWeight: 'bold' }}>{pScore}</span>
                  </div>
                  <div style={{ padding: '10px 20px', background: '#333', borderRadius: '10px' }}>
                    Wiz: <span style={{ color: '#ffd700', fontWeight: 'bold' }}>{wScore}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '40px', margin: '30px 0' }}>
                  <div><p>Player</p><div className={rolling ? 'dice rolling' : 'dice'}>{faces[pVal]}</div></div>
                  <div><p>The Wiz</p><div className={rolling ? 'dice rolling' : 'dice'}>{faces[wVal]}</div></div>
                </div>

                <h2 style={{ height: '40px', color: '#ccc' }}>{msg}</h2>
                
                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                  <button onClick={roll} disabled={rolling}>{rolling ? 'ROLLING...' : 'ROLL DICE'}</button>
                  <button onClick={reset} style={{ background: '#444', color: 'white' }}>RESET</button>
                </div>
              </div>
            );
          };

          ReactDOM.createRoot(document.getElementById('root')).render(<DiceGame />);
        </script>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log("Dice app running at http://localhost:" + port);
});
