import { render, screen, fireEvent } from "@testing-library/react"
import BreathingCircle from "../src/components/BreathingCircle"
import "@testing-library/jest-dom"

describe("BreathingCircle", () => {
  const testTechnique = {
    id: "box",
    name: "Box Breathing",
    description: "Test description",
    pattern: { inhale: 4, hold1: 4, exhale: 4, hold2: 4 },
    colorClass: "bg-blue-500",
  }

  const mockOnStart = jest.fn()

  test("renders with correct initial state", () => {
    render(
      <BreathingCircle
        technique={testTechnique}
        isActive={false}
        phase="ready"
        instructionText="Press to start"
        onStart={mockOnStart}
      />
    )

    expect(screen.getByText("Press to start")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveClass("bg-blue-500")
    expect(screen.getByRole("button")).not.toBeDisabled()
  })

  test("calls onStart when clicked", () => {
    render(
      <BreathingCircle
        technique={testTechnique}
        isActive={false}
        phase="ready"
        instructionText="Press to start"
        onStart={mockOnStart}
      />
    )

    fireEvent.click(screen.getByRole("button"))
    expect(mockOnStart).toHaveBeenCalledTimes(1)
  })

  test("shows phase instructions when active", () => {
    render(
      <BreathingCircle
        technique={testTechnique}
        isActive={true}
        phase="inhale"
        instructionText="Inhale"
        onStart={mockOnStart}
      />
    )

    expect(screen.getByText("Inhale")).toBeInTheDocument()
    expect(screen.getByText("Inhale for 4 seconds")).toBeInTheDocument()
    expect(screen.getByRole("button")).toBeDisabled()
    expect(screen.getByRole("button")).toHaveClass("breathing-circle.inhale")
  })

  test("applies different animation classes for different phases", () => {
    const { rerender } = render(
      <BreathingCircle
        technique={testTechnique}
        isActive={true}
        phase="inhale"
        instructionText="Inhale"
        onStart={mockOnStart}
      />
    )

    expect(screen.getByRole("button")).toHaveClass("breathing-circle.inhale")

    // Test hold phase
    rerender(
      <BreathingCircle
        technique={testTechnique}
        isActive={true}
        phase="hold1"
        instructionText="Hold"
        onStart={mockOnStart}
      />
    )

    expect(screen.getByRole("button")).toHaveClass("breathing-circle.hold")
    expect(screen.getByText("Hold for 4 seconds")).toBeInTheDocument()

    // Test exhale phase
    rerender(
      <BreathingCircle
        technique={testTechnique}
        isActive={true}
        phase="exhale"
        instructionText="Exhale"
        onStart={mockOnStart}
      />
    )

    expect(screen.getByRole("button")).toHaveClass("breathing-circle.exhale")
    expect(screen.getByText("Exhale for 4 seconds")).toBeInTheDocument()
  })
})
