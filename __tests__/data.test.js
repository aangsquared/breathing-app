import { breathingTechniques } from "../src/data/breathingTechniques"

describe("Breathing techniques from data", () => {
  test("should contain all required techniques", () => {
    expect(breathingTechniques).toHaveLength(4)
    expect(breathingTechniques.map((t) => t.id)).toEqual(
      expect.arrayContaining(["box", "478", "diaphragmatic", "alternate"])
    )
  })
  test("each technique should have required properties", () => {
    breathingTechniques.forEach((technique) => {
      expect(technique).toHaveProperty("id")
      expect(technique).toHaveProperty("name")
      expect(technique).toHaveProperty("description")
      expect(technique).toHaveProperty("pattern")
      expect(technique).toHaveProperty("color")

      expect(technique.pattern).toHaveProperty("inhale")
      expect(technique.pattern).toHaveProperty("hold1")
      expect(technique.pattern).toHaveProperty("exhale")
      expect(technique.pattern).toHaveProperty("hold2")
    })
  })
})
