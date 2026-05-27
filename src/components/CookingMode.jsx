import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, X, Play, Pause, RotateCcw, AlertCircle, Award } from "lucide-react";

export default function CookingMode({ recipe, servings, onFinishCooking, onExit }) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const steps = recipe.instructions;
  const currentStep = steps[currentStepIdx];
  const isLastStep = currentStepIdx === steps.length - 1;
  
  // Timer State
  const [timeLeft, setTimeLeft] = useState(0); // in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef(null);

  // Initialize timer for current step if duration exists
  useEffect(() => {
    if (currentStep && currentStep.duration) {
      setTimeLeft(currentStep.duration * 60);
      setIsTimerRunning(false);
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      setTimeLeft(0);
      setIsTimerRunning(false);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentStepIdx, currentStep]);

  // Countdown timer logic
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            clearInterval(timerRef.current);
            playCompletionAlarm();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning]);

  // Synthesize a beep using Web Audio API
  const playCompletionAlarm = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      // Play 3 successive beeps
      const playBeepAt = (delay, freq) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
        gainNode.gain.setValueAtTime(0.15, ctx.currentTime + delay);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + delay + 0.25);
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + 0.3);
      };

      playBeepAt(0, 880);
      playBeepAt(0.3, 880);
      playBeepAt(0.6, 1200);
    } catch (e) {
      console.warn("Could not play alarm sound: ", e);
    }
  };

  const handleToggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    if (currentStep && currentStep.duration) {
      setTimeLeft(currentStep.duration * 60);
    }
  };

  const handleNext = () => {
    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx(c => c + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(c => c - 1);
    }
  };

  // Format time (seconds -> mm:ss)
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainingSecs.toString().padStart(2, "0")}`;
  };

  const progressPercent = Math.round(((currentStepIdx + 1) / steps.length) * 100);
  
  // Calculate scaled waste weight
  const ratio = servings / recipe.servings;
  const scaledWaste = Math.round(recipe.wasteWeightGrams * ratio);

  return (
    <div className="cooking-mode-overlay glassmorphic animated-fade-in">
      <div className="cooking-mode-container">
        {/* Top Control Bar */}
        <div className="cooking-mode-header">
          <div className="cooking-recipe-info">
            <span className="badge-cooking">NOW COOKING</span>
            <h4>{recipe.title}</h4>
          </div>
          <button className="exit-cooking-btn" onClick={onExit}>
            <X size={20} />
            <span>Cancel</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="cooking-progress-wrapper">
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <div className="progress-labels">
            <span>Step {currentStepIdx + 1} of {steps.length}</span>
            <span>{progressPercent}% Complete</span>
          </div>
        </div>

        {/* Cooking Step Card */}
        <div className="cooking-card glassmorphic">
          <div className="step-number-bubble">
            {currentStep.step}
          </div>

          <p className="cooking-instruction-text">
            {currentStep.text}
          </p>

          {/* If the step has a timer */}
          {currentStep.duration && (
            <div className="cooking-timer-box">
              <div className={`timer-ring ${isTimerRunning ? "pulse" : ""}`}>
                <div className="timer-display font-mono">
                  {formatTime(timeLeft)}
                </div>
                <div className="timer-label">
                  {timeLeft === 0 ? "Time's Up!" : "Remaining"}
                </div>
              </div>

              <div className="timer-controls">
                <button 
                  className={`btn-timer-ctrl ${isTimerRunning ? "pause" : "play"}`}
                  onClick={handleToggleTimer}
                >
                  {isTimerRunning ? <Pause size={18} /> : <Play size={18} />}
                  <span>{isTimerRunning ? "Pause" : "Start"}</span>
                </button>
                
                <button className="btn-timer-ctrl reset" onClick={handleResetTimer}>
                  <RotateCcw size={16} />
                  <span>Reset</span>
                </button>
              </div>
              
              {timeLeft === 0 && (
                <div className="timer-alert-banner animate-bounce">
                  <AlertCircle size={16} />
                  <span>Done! Proceed to next step.</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="cooking-nav-controls">
          <button 
            disabled={currentStepIdx === 0} 
            className="btn btn-secondary nav-btn"
            onClick={handlePrev}
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>

          {!isLastStep ? (
            <button className="btn btn-primary nav-btn" onClick={handleNext}>
              <span>Next</span>
              <ArrowRight size={18} />
            </button>
          ) : (
            <button 
              className="btn btn-accent nav-btn finish-btn animate-pulse"
              onClick={() => onFinishCooking(recipe, scaledWaste)}
            >
              <Award size={18} />
              <span>Finish & Log {scaledWaste}g Saved!</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
