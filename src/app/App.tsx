import { useState, useEffect, useRef } from "react";
import imgHeaderTomato from "../assets/68bbda757e2281d8a6d20dc2489e56c8016568e3.png";
import imgGarden from "../assets/721b4cf338efad7e8da5b09789b4d34f795ef1ab.png";

export default function App() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showSetTime, setShowSetTime] = useState(false);
  const [showGarden, setShowGarden] = useState(false);
  const [inputMinutes, setInputMinutes] = useState(25);
  const [completedSessions, setCompletedSessions] = useState(0);
  const intervalRef = useRef<number | null>(null);

  // Generate random tomato positions within soil plot areas
  const generateTomatoPositions = (count: number) => {
    const positions = [];
    // Soil plots are roughly in the middle-bottom area of the garden
    // Left plot: x: 100-450, y: 350-550
    // Middle plot: x: 475-750, y: 350-550
    // Right plot: x: 775-1050, y: 350-550
    const plots = [
      { minX: 100, maxX: 450, minY: 350, maxY: 550 },
      { minX: 475, maxX: 750, minY: 350, maxY: 550 },
      { minX: 775, maxX: 1050, minY: 350, maxY: 550 },
    ];

    for (let i = 0; i < count; i++) {
      const plot = plots[Math.floor(Math.random() * plots.length)];
      positions.push({
        x: plot.minX + Math.random() * (plot.maxX - plot.minX),
        y: plot.minY + Math.random() * (plot.maxY - plot.minY),
      });
    }
    return positions;
  };

  const tomatoPositions = generateTomatoPositions(completedSessions);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            setMinutes((prevMinutes) => {
              if (prevMinutes === 0) {
                setIsRunning(false);
                // Session completed! Add a tomato
                setCompletedSessions((prev) => prev + 1);
                return 0;
              }
              return prevMinutes - 1;
            });
            return 59;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setMinutes(inputMinutes);
    setSeconds(0);
  };

  const handleSetTime = () => {
    setShowSetTime(!showSetTime);
  };

  const handleGarden = () => {
    setShowGarden(!showGarden);
  };

  const handleTimeSubmit = () => {
    const newMinutes = Math.max(1, Math.min(99, inputMinutes));
    setInputMinutes(newMinutes);
    setMinutes(newMinutes);
    setSeconds(0);
    setIsRunning(false);
    setShowSetTime(false);
  };

  // Garden Screen
  if (showGarden) {
    return (
      <div className="relative w-[1200px] h-[700px] mx-auto overflow-hidden" style={{ fontFamily: "'Press Start 2P', monospace" }}>
        {/* Garden Background Image */}
        <img
          src={imgGarden}
          alt="Garden"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Tomatoes in the garden */}
        {tomatoPositions.map((pos, index) => (
          <img
            key={index}
            src={imgHeaderTomato}
            alt="Tomato"
            className="absolute w-[50px] h-[50px]"
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              imageRendering: 'pixelated',
              filter: 'drop-shadow(2px 2px 3px rgba(0,0,0,0.4))',
            }}
          />
        ))}

        {/* Back Button */}
        <div className="absolute left-[450px] bottom-[50px] w-[300px] h-[60px]">
          <button onClick={handleGarden} className="relative w-full h-full group">
            <div className="absolute inset-0 bg-[#8B1919] rounded-[14px] translate-y-[4px]" />
            <div className="absolute inset-0 rounded-[14px] border-[4px] border-[#C14F4F] shadow-[inset_0_-3px_0_0_rgba(0,0,0,0.25),inset_0_2px_0_0_rgba(255,255,255,0.25)] transition-transform group-hover:translate-y-[2px] group-active:translate-y-[4px]"
              style={{
                background: 'linear-gradient(180deg, #FFC5C5 0%, #FFB0B0 50%, #FF9999 100%)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-transparent h-[30%]" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative text-[28px] text-[#7B1919]" style={{
                textShadow: '2px 2px 0px rgba(0,0,0,0.25)',
                fontFamily: "'Press Start 2P', monospace",
              }}>
                BACK
              </div>
            </div>
          </button>
        </div>

        {/* Session Counter */}
        <div className="absolute top-[20px] left-[20px] bg-[#8B5A2B] rounded-[16px] border-[4px] border-[#4A2511] px-6 py-3 shadow-[0_6px_0_0_rgba(0,0,0,0.3)]">
          <div className="text-[24px] text-[#FFF8DC]" style={{
            textShadow: '2px 2px 0px rgba(0,0,0,0.4)',
            fontFamily: "'Press Start 2P', monospace",
          }}>
            Sessions: {completedSessions}
          </div>
        </div>
      </div>
    );
  }

  // Main Timer Screen
  return (
    <div className="relative w-[1200px] h-[700px] mx-auto overflow-hidden" style={{ fontFamily: "'Press Start 2P', monospace" }}>
      {/* Sky gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#87CEEB] via-[#98D8E8] to-[#B8E6F0]" />

      {/* Pixel clouds */}
      <div className="absolute top-6 left-12 w-20 h-8 opacity-70">
        <div className="absolute w-5 h-2 bg-white top-2 left-0" style={{ imageRendering: 'pixelated' }} />
        <div className="absolute w-10 h-2 bg-white top-1 left-2" style={{ imageRendering: 'pixelated' }} />
        <div className="absolute w-7 h-2 bg-white top-0 left-5" style={{ imageRendering: 'pixelated' }} />
        <div className="absolute w-5 h-2 bg-white top-2 left-10" style={{ imageRendering: 'pixelated' }} />
      </div>

      <div className="absolute top-8 right-16 w-24 h-10 opacity-70">
        <div className="absolute w-6 h-2 bg-white top-3 left-0" style={{ imageRendering: 'pixelated' }} />
        <div className="absolute w-12 h-2 bg-white top-1 left-3" style={{ imageRendering: 'pixelated' }} />
        <div className="absolute w-8 h-2 bg-white top-0 left-6" style={{ imageRendering: 'pixelated' }} />
        <div className="absolute w-5 h-2 bg-white top-3 left-12" style={{ imageRendering: 'pixelated' }} />
      </div>

      {/* Main UI panel with wood texture - wider */}
      <div className="absolute left-[20px] top-[80px] w-[1160px] h-[480px] rounded-[24px] shadow-[0_10px_0_0_rgba(0,0,0,0.3)] border-[5px] border-[#4A2511] overflow-hidden">
        {/* Wood panel background */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, #8B5A2B 0%, #A0683C 20%, #8B5A2B 40%, #A0683C 60%, #8B5A2B 80%, #A0683C 100%)',
            backgroundSize: '30px 100%',
          }}
        />
        {/* Wood grain overlay */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
          }}
        />
        {/* Light cream paper overlay */}
        <div className="absolute inset-[10px] bg-[#FFF8DC] rounded-[18px] border-[3px] border-[#8B5A2B] shadow-[inset_0_3px_6px_rgba(0,0,0,0.08)]" />
      </div>

      {/* Title with pixel effect */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[12px] text-center">
        <div className="relative inline-block">
          {/* Main text - clean without excessive effects */}
          <div className="relative text-[42px] text-[#C41E3A]" style={{
            textShadow: '3px 3px 0px rgba(74,16,16,0.4)',
            WebkitTextStroke: '2px #8B1919'
          }}>
            POMOD
            <img
              src={imgHeaderTomato}
              alt="O"
              className="inline-block w-[38px] h-[38px] mx-1 -mt-1"
              style={{ imageRendering: 'pixelated' }}
            />
            MATO
          </div>
        </div>
      </div>

      {/* Tomato with subtle glow - centered */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[120px] w-[170px] h-[160px]">
        {/* Subtle glow behind tomato */}
        <div className="absolute inset-[-12px]">
          <div className="absolute inset-0 rounded-full bg-gradient-radial from-[#FFE4B5]/30 via-[#FFB6A3]/15 to-transparent blur-xl" />
        </div>
        <img
          src={imgHeaderTomato}
          alt="Tomato"
          className="relative w-full h-full drop-shadow-[5px_5px_6px_rgba(0,0,0,0.3)]"
          style={{ imageRendering: 'pixelated', filter: 'brightness(1.05) contrast(1.05)' }}
        />
      </div>

      {/* Timer display - no background box, just text */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[310px]">
        <div className="relative text-[64px] leading-none text-[#911d1d]" style={{
          textShadow: '3px 3px 0px rgba(0,0,0,0.3)',
          fontFamily: "'Press Start 2P', monospace",
          letterSpacing: '0.05em'
        }}>
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </div>
      </div>

      {/* START/PAUSE button - centered */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[410px] w-[350px] h-[80px]">
        <button onClick={handleStartPause} className="relative w-full h-full group">
          {/* Button shadow */}
          <div className="absolute inset-0 bg-[#6B2D0F] rounded-[18px] translate-y-[5px]" />

          {/* Main button */}
          <div className="absolute inset-0 rounded-[18px] border-[5px] shadow-[inset_0_-4px_0_0_rgba(0,0,0,0.25),inset_0_2px_0_0_rgba(255,255,255,0.35)] overflow-hidden transition-transform group-hover:translate-y-[2px] group-active:translate-y-[5px]"
            style={{
              background: isRunning
                ? 'linear-gradient(180deg, #FFFFFF 0%, #FFF5E8 20%, #FFE4C8 50%, #EFAE75 100%)'
                : 'linear-gradient(180deg, #FFE87C 0%, #FFD93D 30%, #FFC837 70%, #E8A83C 100%)',
              borderColor: isRunning ? '#D89A5F' : '#E8854C',
            }}
          >
            {/* Button shine */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent h-[35%]" />
          </div>

          {/* Button text - clean */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative text-[42px]" style={{
              color: isRunning ? '#8B5A2B' : '#8B3A0F',
              textShadow: '2px 2px 0px rgba(0,0,0,0.3)',
              fontFamily: "'Press Start 2P', monospace",
            }}>
              {isRunning ? 'PAUSE' : 'START'}
            </div>
          </div>
        </button>
      </div>

      {/* Bottom buttons - centered and evenly spaced, moved down */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[580px] flex gap-[30px] justify-center">
        <button onClick={handleReset} className="relative w-[300px] h-[60px] group">
          <div className="absolute inset-0 bg-[#8B1919] rounded-[14px] translate-y-[4px]" />
          <div className="absolute inset-0 rounded-[14px] border-[4px] border-[#C14F4F] shadow-[inset_0_-3px_0_0_rgba(0,0,0,0.25),inset_0_2px_0_0_rgba(255,255,255,0.25)] transition-transform group-hover:translate-y-[2px] group-active:translate-y-[4px]"
            style={{
              background: 'linear-gradient(180deg, #FFC5C5 0%, #FFB0B0 50%, #FF9999 100%)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-transparent h-[30%]" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative text-[28px] text-[#7B1919]" style={{
              textShadow: '2px 2px 0px rgba(0,0,0,0.25)',
              fontFamily: "'Press Start 2P', monospace",
            }}>
              RESET
            </div>
          </div>
        </button>

        <button onClick={handleSetTime} className="relative w-[300px] h-[60px] group">
          <div className="absolute inset-0 bg-[#8B1919] rounded-[14px] translate-y-[4px]" />
          <div className="absolute inset-0 rounded-[14px] border-[4px] border-[#C14F4F] shadow-[inset_0_-3px_0_0_rgba(0,0,0,0.25),inset_0_2px_0_0_rgba(255,255,255,0.25)] transition-transform group-hover:translate-y-[2px] group-active:translate-y-[4px]"
            style={{
              background: 'linear-gradient(180deg, #FFC5C5 0%, #FFB0B0 50%, #FF9999 100%)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-transparent h-[30%]" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative text-[28px] text-[#7B1919]" style={{
              textShadow: '2px 2px 0px rgba(0,0,0,0.25)',
              fontFamily: "'Press Start 2P', monospace",
            }}>
              SET TIME
            </div>
          </div>
        </button>

        <button onClick={handleGarden} className="relative w-[300px] h-[60px] group">
          <div className="absolute inset-0 bg-[#8B1919] rounded-[14px] translate-y-[4px]" />
          <div className="absolute inset-0 rounded-[14px] border-[4px] border-[#C14F4F] shadow-[inset_0_-3px_0_0_rgba(0,0,0,0.25),inset_0_2px_0_0_rgba(255,255,255,0.25)] transition-transform group-hover:translate-y-[2px] group-active:translate-y-[4px]"
            style={{
              background: 'linear-gradient(180deg, #FFC5C5 0%, #FFB0B0 50%, #FF9999 100%)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-transparent h-[30%]" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative text-[28px] text-[#7B1919]" style={{
              textShadow: '2px 2px 0px rgba(0,0,0,0.25)',
              fontFamily: "'Press Start 2P', monospace",
            }}>
              GARDEN
            </div>
          </div>
        </button>
      </div>

      {/* Set Time Modal - cleaner design */}
      {showSetTime && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowSetTime(false)} />

          {/* Modal */}
          <div className="relative w-[480px] bg-[#8B5A2B] rounded-[24px] border-[5px] border-[#4A2511] shadow-[0_14px_28px_rgba(0,0,0,0.4)] p-5">
            {/* Modal paper background */}
            <div className="absolute inset-[5px] bg-[#FFF8DC] rounded-[20px] border-[3px] border-[#8B5A2B]" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-5">
              <div className="text-[32px] text-[#8B1919]" style={{
                textShadow: '2px 2px 0px rgba(0,0,0,0.2)',
                fontFamily: "'Press Start 2P', monospace",
              }}>
                SET TIME
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setInputMinutes(Math.max(1, inputMinutes - 5))}
                  className="w-12 h-12 bg-gradient-to-b from-[#FF9999] to-[#FF6B6B] border-[3px] border-[#C14F4F] rounded-lg shadow-[3px_3px_0_rgba(0,0,0,0.25)] hover:translate-y-1 active:translate-y-2 transition-transform text-[24px] text-[#8B1919]"
                  style={{ fontFamily: "'Press Start 2P', monospace" }}
                >
                  -
                </button>

                <div className="w-36 px-4 py-2 bg-[#2C1810] border-[3px] border-[#8B4513] rounded-lg text-center">
                  <div className="text-[42px] leading-none text-[#FF6B6B]" style={{
                    textShadow: '0 0 6px rgba(255,0,0,0.2), 2px 2px 0px rgba(0,0,0,0.4)',
                    fontFamily: "'Press Start 2P', monospace",
                  }}>
                    {String(inputMinutes).padStart(2, "0")}
                  </div>
                  <div className="text-[14px] text-[#FFB6A3] mt-1" style={{ fontFamily: "'Press Start 2P', monospace" }}>
                    MIN
                  </div>
                </div>

                <button
                  onClick={() => setInputMinutes(Math.min(99, inputMinutes + 5))}
                  className="w-12 h-12 bg-gradient-to-b from-[#FF9999] to-[#FF6B6B] border-[3px] border-[#C14F4F] rounded-lg shadow-[3px_3px_0_rgba(0,0,0,0.25)] hover:translate-y-1 active:translate-y-2 transition-transform text-[24px] text-[#8B1919]"
                  style={{ fontFamily: "'Press Start 2P', monospace" }}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleTimeSubmit}
                className="relative group"
              >
                <div className="absolute inset-0 bg-[#6B2D0F] rounded-[14px] translate-y-[4px]" />
                <div className="relative px-8 py-2 rounded-[14px] border-[4px] border-[#E8854C] shadow-[inset_0_-3px_0_0_rgba(0,0,0,0.25),inset_0_2px_0_0_rgba(255,255,255,0.35)] transition-transform group-hover:translate-y-[2px] group-active:translate-y-[4px]"
                  style={{
                    background: 'linear-gradient(180deg, #FFE87C 0%, #FFD93D 30%, #FFC837 70%, #E8A83C 100%)',
                  }}
                >
                  <div className="text-[24px] text-[#8B3A0F]" style={{
                    textShadow: '2px 2px 0px rgba(0,0,0,0.3)',
                    fontFamily: "'Press Start 2P', monospace",
                  }}>
                    CONFIRM
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
