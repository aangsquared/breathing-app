import { render, screen, fireEvent } from "@testing-library/react"
import TechniqueScreen from "../src/components/TechniqueScreen"

describe("TechniqueScreen", () => {
  const mockTechnique = {
    id: "box",
    name: "Box Breathing",
    description: "Test description",
    pattern: { inhale: 4, hold1: 4, exhale: 4, hold2: 4 },
    color: "#3b82f6",
  }

  const mockProps = {
    technique: mockTechnique,
    isActive: false,
    phase: "ready",
    cycles: 0,
    onStart: jest.fn(),
    onStop: jest.fn(),
    onReset: jest.fn(),
    onBack: jest.fn(),
  }

  test("renders technique details correctly", () => {
    render(<TechniqueScreen {...mockProps} />)

    expect(screen.getByText("Box Breathing")).toBeInTheDocument()
    expect(screen.getByText("Test description")).toBeInTheDocument()
    expect(screen.getByText("Cycles completed:")).toBeInTheDocument()
    expect(screen.getByText("0")).toBeInTheDocument()
  })

  test("shows back button and calls onBack when clicked", () => {
    render(<TechniqueScreen {...mockProps} />)

    const backButton = screen.getByText("Back").closest("button")
    fireEvent.click(backButton)

    expect(mockProps.onBack).toHaveBeenCalledTimes(1)
  })

  test("shows stop button when session is active", () => {
    render(<TechniqueScreen {...mockProps} isActive={true} />)

    const stopButton = screen.getByText("Stop").closest("button")
    fireEvent.click(stopButton)

    expect(mockProps.onStop).toHaveBeenCalledTimes(1)
  })

  test("shows reset button when session is inactive but cycles > 0", () => {
    render(<TechniqueScreen {...mockProps} cycles={3} />)

    const resetButton = screen.getByText("Reset").closest("button")
    fireEvent.click(resetButton)

    expect(mockProps.onReset).toHaveBeenCalledTimes(1)
  })
})
