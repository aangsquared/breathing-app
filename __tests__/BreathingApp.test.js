import { render, screen, fireEvent, act } from "@testing-library/react"
import BreathingApp from "../src/app/page"
import { breathingTechniques } from "@/data/breathingTechniques"

// Mock timers for breathing cycle
jest.useFakeTimers()

describe("BreathingApp", () => {
  test("initially renders the intro screen", () => {
    render(<BreathingApp />)

    expect(screen.getByText("Breathing Techniques")).toBeInTheDocument()
    expect(screen.getByText("Box Breathing")).toBeInTheDocument()
  })

  test("navigates to technique screen when technique is selected", () => {
    render(<BreathingApp />)

    const boxBreathingCard = screen.getByText("Box Breathing").closest("div")
    fireEvent.click(boxBreathingCard)

    // Now should be on technique screen
    expect(screen.getByText("Back")).toBeInTheDocument()
    expect(screen.getByText("Press to start")).toBeInTheDocument()
  })

  test("starts breathing cycle when button is clicked", () => {
    render(<BreathingApp breathingTechniques={breathingTechniques} />)

    // Select technique
    const boxBreathingCard = screen.getByText("Box Breathing").closest("div")
    fireEvent.click(boxBreathingCard)

    // Start session
    const startButton = screen.getByText("Press to start")
    fireEvent.click(startButton)

    expect(screen.getAllByText("Inhale")).toHaveLength(2)
    expect(screen.getByText("Inhale for 4 seconds")).toBeInTheDocument()
  })

  test("completes a full breathing cycle", () => {
    render(<BreathingApp />)

    // Select technique
    const boxBreathingCard = screen.getByText("Box Breathing").closest("div")
    fireEvent.click(boxBreathingCard)

    // Start session
    const startButton = screen.getByText("Press to start")
    fireEvent.click(startButton)

    // Inhale phase
    expect(screen.getAllByText("Inhale")).toHaveLength(2)

    // Move to hold1 phase
    act(() => {
      jest.advanceTimersByTime(4000)
    })
    screen.debug()
    expect(screen.getAllByText("Hold")).toHaveLength(2)
    expect(screen.getByText("Hold for 4 seconds")).toBeInTheDocument()

    // Move to exhale phase
    act(() => {
      jest.advanceTimersByTime(4000)
    })
    expect(screen.getByText("Exhale")).toBeInTheDocument()

    // Move to hold2 phase
    act(() => {
      jest.advanceTimersByTime(4000)
    })
    expect(screen.getByText("Hold")).toBeInTheDocument()

    // Complete cycle
    act(() => {
      jest.advanceTimersByTime(4000)
    })

    // Should show 1 completed cycle
    expect(screen.getByText("1")).toBeInTheDocument()
  })

  test("goes back to intro screen when back button is clicked", () => {
    render(<BreathingApp />)

    // Navigate to technique screen
    const boxBreathingCard = screen.getByText("Box Breathing").closest("div")
    fireEvent.click(boxBreathingCard)

    // Go back to intro
    const backButton = screen.getByText("Back").closest("button")
    fireEvent.click(backButton)

    // Should be back on intro screen
    expect(screen.getByText("Breathing Techniques")).toBeInTheDocument()
  })
})
