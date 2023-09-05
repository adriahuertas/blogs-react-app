import { describe, expect, test } from "vitest"
import { render, screen } from "@testing-library/react"
import Blog from "components/Blog"

describe("Blog test", () => {
  test("Renders content", () => {
    const blog = {
      title: "Component testing is done with react-testing-library",
    }
    render(<Blog blog={blog} />)

    expect(screen.getByText(/Component/i)).toBeDefined()
  })
})
