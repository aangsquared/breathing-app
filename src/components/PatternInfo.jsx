import React from "react";

export default function PatternInfo({pattern}){
    return(
        <div className="pattern-grid">
      <div className="pattern-item">
        <p className="pattern-label">Inhale</p>
        <p className="pattern-value">{pattern.inhale}s</p>
      </div>
      <div className="pattern-item">
        <p className="pattern-label">Hold</p>
        <p className="pattern-value">{pattern.hold1}s</p>
      </div>
      <div className="pattern-item">
        <p className="pattern-label">Exhale</p>
        <p className="pattern-value">{pattern.exhale}s</p>
      </div>
      <div className="pattern-item">
        <p className="pattern-label">Hold</p>
        <p className="pattern-value">{pattern.hold2}s</p>
      </div>
    </div>
    )
}