import React from 'react';

export default function IntroScreen({ breathingTechniques, onSelectTechnique }) {
  return (
    <div className="app-container">
      <div className="text-center mb-8">
        <h1 className="heading-primary">Breathing Techniques</h1>
        <p className="description-text">
          Regular breathing exercises can reduce stress, improve lung function, enhance focus, 
          and promote better sleep. Choose a technique to begin.
        </p>
      </div>
      
      <div className="technique-grid">
        {breathingTechniques.map((technique) => (
          <TechniqueCard 
            key={technique.id}
            technique={technique}
            onClick={() => onSelectTechnique(technique)}
          />
        ))}
      </div>
    </div>
  );
}

function TechniqueCard({ technique, onClick }) {
  return (
    <div className="technique-card" onClick={onClick}>
      <div className={`technique-icon ${technique.colorClass}`}>
        <span className="technique-icon-text">{technique.name.charAt(0)}</span>
      </div>
      <h2 className="technique-title">{technique.name}</h2>
      <p className="technique-description">{technique.description}</p>
    </div>
  );
}