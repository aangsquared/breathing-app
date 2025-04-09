import React from 'react';
import { X, ArrowLeft, Square } from 'lucide-react';
import BreathingCircle from './BreathingCircle';
import PatternInfo from './PatternInfo';

export default function TechniqueScreen({ 
  technique, 
  isActive, 
  phase, 
  cycles, 
  onStart, 
  onStop, 
  onReset, 
  onBack 
}) {
  // Get instruction text based on current phase
  const getInstructionText = () => {
    if (!isActive) return "Press to start";
    switch (phase) {
      case 'inhale': return "Inhale";
      case 'hold1': return "Hold";
      case 'exhale': return "Exhale";
      case 'hold2': return "Hold";
      default: return "Ready";
    }
  };
  
  return (
    <div className="app-container">
      <div className="header-nav">
        <button onClick={onBack} className="back-button">
          <ArrowLeft size={20} className="mr-1" /> Back
        </button>
        <h1 className="heading-primary mx-auto">{technique.name}</h1>
      </div>
      
      <div className="text-center mb-8">
        <p className="description-text">{technique.description}</p>
      </div>
      
      <div className="content-area">
        <BreathingCircle 
          technique={technique}
          isActive={isActive}
          phase={phase}
          instructionText={getInstructionText()}
          onStart={onStart}
        />
        
        <div className="controls-container">
          <p className="cycle-counter">
            Cycles completed: <span className="cycle-number">{cycles}</span>
          </p>
          
          {isActive && (
            <button onClick={onStop} className="stop-button">
              <Square size={16} className="mr-1" /> Stop
            </button>
          )}
          
          {!isActive && cycles > 0 && (
            <button onClick={onReset} className="reset-button">
              <X size={16} className="mr-1" /> Reset
            </button>
          )}
        </div>
        
        <PatternInfo pattern={technique.pattern} />
      </div>
    </div>
  );
}