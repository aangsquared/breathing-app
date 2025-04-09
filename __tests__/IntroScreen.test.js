import { render, screen, fireEvent } from "@testing-library/react"
import IntroScreen from "../src/components/IntroScreen"
import { breathingTechniques } from "../src/data/breathingTechniques"

describe("IntroScreen", () => {
  const mockSelectTechnique = jest.fn()

  beforeEach(() => {
    render(
      <IntroScreen
        breathingTechniques={breathingTechniques}
        onSelectTechnique={mockSelectTechnique}
      />
    )
  })

  test("renders title and introduction", () => {
    expect(screen.getByText("Breathing Techniques")).toBeInTheDocument()
    expect(screen.getByText(/Regular breathing exercises/)).toBeInTheDocument()
  })

  test("renders all technique cards", () => {
    breathingTechniques.forEach((technique) => {
      expect(screen.getByText(technique.name)).toBeInTheDocument()
      expect(screen.getByText(technique.description)).toBeInTheDocument()
    })
  })

  test("calls onSelectTechnique when a card is clicked", () => {
    const boxBreathingCard = screen.getByText("Box Breathing").closest("div")
    fireEvent.click(boxBreathingCard)

    expect(mockSelectTechnique).toHaveBeenCalledWith(
      expect.objectContaining({ id: "box" })
    )
  })
})
