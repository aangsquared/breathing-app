"use client"
import React, { useState } from "react"
import { X, ArrowLeft, Square } from "lucide-react"
import { breathingTechniques } from "@/data/breathingTechniques"
import IntroScreen from "@/components/IntroScreen"
import TechniqueScreen from "@/components/TechniqueScreen"

export default function BreathingApp() {
  const [selectedTechnique, setSelectedTechnique] = useState(null)
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState("ready") // ready, inhale, hold1, exhale, hold2
  const [cycles, setCycles] = useState(0)

  const startBreathing = () => {
    if (!isActive) {
      setIsActive(true)
      setPhase("inhale")
      breathingCycle()
    }
  }

  const stopBreathing = () => {
    setIsActive(false)
    setPhase("ready")
  }

  const breathingCycle = () => {
    if (!selectedTechnique) return

    setPhase("inhale")
    const technique = selectedTechnique

    setTimeout(() => {
      if (!isActive) return

      if (technique.pattern.hold1 > 0) {
        setPhase("hold1")

        setTimeout(() => {
          if (!isActive) return
          setPhase("exhale")

          setTimeout(() => {
            if (!isActive) return

            if (technique.pattern.hold2 > 0) {
              setPhase("hold2")

              setTimeout(() => {
                if (!isActive) return
                setCycles((prev) => prev + 1)
                breathingCycle()
              }, technique.pattern.hold2 * 1000)
            } else {
              setCycles((prev) => prev + 1)
              breathingCycle()
            }
          }, technique.pattern.exhale * 1000)
        }, technique.pattern.hold1 * 1000)
      } else {
        setPhase("exhale")

        setTimeout(() => {
          if (!isActive) return
          setCycles((prev) => prev + 1)
          breathingCycle()
        }, technique.pattern.exhale * 1000)
      }
    }, technique.pattern.inhale * 1000)
  }

  const resetSession = () => {
    setIsActive(false)
    setPhase("ready")
    setCycles(0)
  }

  const goBack = () => {
    resetSession()
    setSelectedTechnique(null)
  }

  if (!selectedTechnique) {
    return (
      <IntroScreen
        breathingTechniques={breathingTechniques}
        onSelectTechnique={setSelectedTechnique}
      />
    )
  }

  return (
    <TechniqueScreen
      technique={selectedTechnique}
      isActive={isActive}
      phase={phase}
      cycles={cycles}
      onStart={startBreathing}
      onStop={stopBreathing}
      onReset={resetSession}
      onBack={goBack}
    />
  )
}
