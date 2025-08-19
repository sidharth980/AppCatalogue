import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Coffee, Brain, Settings } from 'lucide-react';
import BackButton from '../components/BackButton';

const PomodoroApp = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('work'); // 'work', 'shortBreak', 'longBreak'
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  
  const [durations, setDurations] = useState({
    work: 25,
    shortBreak: 5,
    longBreak: 15
  });
  
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Play a simple beep sound
      playNotificationSound();
      handleTimerComplete();
    } else {
      clearInterval(intervalRef.current);
    }
    
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  const playNotificationSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      gainNode.gain.value = 0.1;
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (error) {
      console.log('Audio notification not supported');
    }
  };

  const handleTimerComplete = () => {
    setIsRunning(false);
    
    if (mode === 'work') {
      const newCount = completedPomodoros + 1;
      setCompletedPomodoros(newCount);
      
      if (newCount % 4 === 0) {
        setMode('longBreak');
        setTimeLeft(durations.longBreak * 60);
      } else {
        setMode('shortBreak');
        setTimeLeft(durations.shortBreak * 60);
      }
    } else {
      setMode('work');
      setTimeLeft(durations.work * 60);
    }
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(durations[mode] * 60);
  };

  const switchMode = (newMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(durations[newMode] * 60);
  };

  const updateDuration = (modeToUpdate, value) => {
    const newValue = Math.max(1, Math.min(60, value));
    setDurations(prev => ({ ...prev, [modeToUpdate]: newValue }));
    if (modeToUpdate === mode) {
      setTimeLeft(newValue * 60);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    const totalTime = durations[mode] * 60;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  const getModeColor = () => {
    switch(mode) {
      case 'work': return 'text-red-400';
      case 'shortBreak': return 'text-blue-400';
      case 'longBreak': return 'text-green-400';
      default: return 'text-red-400';
    }
  };

  const getModeIcon = () => {
    switch(mode) {
      case 'work': return <Brain className="w-5 h-5" />;
      case 'shortBreak': 
      case 'longBreak': return <Coffee className="w-5 h-5" />;
      default: return <Brain className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <BackButton />
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">Pomodoro Timer</h1>
          <p className="text-gray-400 text-sm">Stay focused, take breaks, get things done</p>
        </div>

        {/* Main Timer Card */}
        <div className="bg-gray-900/50 rounded-3xl p-8 shadow-2xl border border-gray-800/50">
          {/* Mode Selector */}
          <div className="flex justify-center gap-2 mb-8">
            <button
              onClick={() => switchMode('work')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                mode === 'work' 
                  ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                  : 'bg-gray-800/40 text-gray-500 hover:bg-gray-700/40'
              }`}
            >
              Work
            </button>
            <button
              onClick={() => switchMode('shortBreak')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                mode === 'shortBreak' 
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                  : 'bg-gray-800/40 text-gray-500 hover:bg-gray-700/40'
              }`}
            >
              Short Break
            </button>
            <button
              onClick={() => switchMode('longBreak')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                mode === 'longBreak' 
                  ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                  : 'bg-gray-800/40 text-gray-500 hover:bg-gray-700/40'
              }`}
            >
              Long Break
            </button>
          </div>

          {/* Timer Display */}
          <div className="relative mb-8">
            {/* Progress Ring */}
            <div className="relative w-64 h-64 mx-auto">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  stroke="#1f2937"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  stroke={mode === 'work' ? '#f87171' : mode === 'shortBreak' ? '#60a5fa' : '#4ade80'}
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 120}`}
                  strokeDashoffset={`${2 * Math.PI * 120 * (1 - getProgressPercentage() / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>
              
              {/* Timer Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className={`flex items-center gap-2 mb-2 ${getModeColor()}`}>
                  {getModeIcon()}
                  <span className="text-sm font-medium uppercase tracking-wider">
                    {mode === 'work' ? 'Focus Time' : mode === 'shortBreak' ? 'Short Break' : 'Long Break'}
                  </span>
                </div>
                <div className="text-6xl font-bold text-gray-100 font-mono">
                  {formatTime(timeLeft)}
                </div>
              </div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={toggleTimer}
              className={`px-8 py-3 rounded-xl font-semibold text-lg flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 ${
                isRunning 
                  ? 'bg-gray-700/60 text-gray-300 hover:bg-gray-600/60' 
                  : mode === 'work' 
                    ? 'bg-red-500/70 text-white hover:bg-red-600/70' 
                    : mode === 'shortBreak'
                    ? 'bg-blue-500/70 text-white hover:bg-blue-600/70'
                    : 'bg-green-500/70 text-white hover:bg-green-600/70'
              }`}
            >
              {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isRunning ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={resetTimer}
              className="px-6 py-3 bg-gray-800/40 text-gray-400 rounded-xl font-semibold hover:bg-gray-700/40 transition-all transform hover:scale-105 active:scale-95"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="px-6 py-3 bg-gray-800/40 text-gray-400 rounded-xl font-semibold hover:bg-gray-700/40 transition-all transform hover:scale-105 active:scale-95"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="bg-gray-800/30 rounded-xl p-4 mb-6 space-y-3 border border-gray-700/50">
              <h3 className="text-gray-400 font-semibold mb-2">Timer Settings (minutes)</h3>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Work Duration</span>
                <input
                  type="number"
                  value={durations.work}
                  onChange={(e) => updateDuration('work', parseInt(e.target.value))}
                  className="w-16 px-2 py-1 bg-gray-900/50 text-gray-300 rounded border border-gray-700/50 text-center"
                  min="1"
                  max="60"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Short Break</span>
                <input
                  type="number"
                  value={durations.shortBreak}
                  onChange={(e) => updateDuration('shortBreak', parseInt(e.target.value))}
                  className="w-16 px-2 py-1 bg-gray-900/50 text-gray-300 rounded border border-gray-700/50 text-center"
                  min="1"
                  max="60"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Long Break</span>
                <input
                  type="number"
                  value={durations.longBreak}
                  onChange={(e) => updateDuration('longBreak', parseInt(e.target.value))}
                  className="w-16 px-2 py-1 bg-gray-900/50 text-gray-300 rounded border border-gray-700/50 text-center"
                  min="1"
                  max="60"
                />
              </div>
            </div>
          )}

          {/* Pomodoro Counter */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/30 rounded-lg">
              <span className="text-gray-500 text-sm">Completed Pomodoros:</span>
              <span className="text-gray-300 font-semibold">{completedPomodoros}</span>
            </div>
          </div>
        </div>

        {/* Footer Tips */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-xs">
            {mode === 'work' 
              ? "Focus on your task until the timer rings" 
              : "Take a break! Stretch, hydrate, and relax"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PomodoroApp;
