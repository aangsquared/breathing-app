import { breathingTechniques } from "../src/data/breathingTechniques"

describe("Breathing techniques from data", () => {
  test("should contain all required techniques", () => {
    expect(breathingTechniques).toHaveLength(4)
    expect(breathingTechniques.map((t) => t.id)).toEqual(
      expect.arrayContaining(["box", "478", "diaphragmatic", "alternate"])
    )
  })
})
