"use client"
import React, { useState } from "react"
import { X, ArrowLeft, Square } from "lucide-react"
import PatternInfo from "../components/PatternInfo"
import { breathingTechniques } from "@/data/breathingTechniques"
import BreathingCircle from "@/components/BreathingCircle"

export default function Home() {
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState("ready")
  const technique = breathingTechniques[0]
  const getInstructionText = () => {
    if (!isActive) return "Press to start"
    switch (phase) {
      case "inhale":
        return "Inhale"
      case "hold1":
        return "Hold"
      case "exhale":
        return "Exhale"
      case "hold2":
        return "Hold"
      default:
        return "Ready"
    }
  }

  return (
    <div className="app-container">
      <div className="header-nav">
        <button className="back-button">
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
          //onStart={onStart}
        />

        <PatternInfo pattern={technique.pattern} />
      </div>
    </div>
  )
}
