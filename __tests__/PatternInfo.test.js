import PatternInfo from "../src/components/PatternInfo"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
//import { waitFor } from "@testing-library/react"

describe("PatternInfo", () => {
  const samplePattern = { inhale: 4, hold1: 4, exhale: 4, hold2: 4 }
  test("renders all phases with the correct values", () => {
    render(<PatternInfo pattern={samplePattern} />)
    screen.debug()

    expect(screen.getAllByText("4s")).toHaveLength(4)
    expect(screen.getByText("Inhale")).toBeInTheDocument()
    expect(screen.getAllByText("Hold")).toHaveLength(2)
    expect(screen.getByText("Exhale")).toBeInTheDocument()

    //more robust testing for "4s" value

    const inhaleItem = screen.getByText("Inhale").closest(".pattern-item")
    expect(inhaleItem).toHaveTextContent("4s")

    const exhaleItem = screen.getByText("Exhale").closest(".pattern-item")
    expect(exhaleItem).toHaveTextContent("4s")

    const holdItems = screen
      .getAllByText("Hold")
      .map((element) => element.closest(".pattern-item"))
    holdItems.forEach((item) => {
      expect(item).toHaveTextContent("4s")
    })
  })
})
