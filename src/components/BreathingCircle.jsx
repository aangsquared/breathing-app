import React from "react";

export default function BreathingCircle({ technique, isActive, phase, instructionText, onStart }) {
    
    const getAnimationClasses = () => {
      if (!isActive) return "ready";
      
      switch (phase) {
        case 'inhale':
          return "breathing-circle.inhale";
        case 'hold1':
        case 'hold2':
          return "breathing-circle.hold";
        case 'exhale':
          return "breathing-circle.exhale";
        default:
          return "ready";
      }
    };
    
    return (
      <div className="breathing-container">
        <button
          onClick={onStart}
          disabled={isActive}
          className={`breathing-circle ${technique.colorClass} ${getAnimationClasses()} ${isActive ? 'active' : ''}`}
        >
          {instructionText}
        </button>
        
        {isActive && (
          <div className="phase-instruction">
            {phase === 'inhale' && `Inhale for ${technique.pattern.inhale} seconds`}
            {phase === 'hold1' && `Hold for ${technique.pattern.hold1} seconds`}
            {phase === 'exhale' && `Exhale for ${technique.pattern.exhale} seconds`}
            {phase === 'hold2' && `Hold for ${technique.pattern.hold2} seconds`}
          </div>
        )}
      </div>
    );
  }