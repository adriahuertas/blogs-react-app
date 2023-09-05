import { describe, expect, test } from "vitest"
import { render, screen } from "@testing-library/react"
import Note from "components/Note"
import { prettyDOM } from "@testing-library/dom"

describe("Note test", () => {
  test("Renders content", () => {
    const note = {
      content: "Component testing is done with react-testing-library",
    }
    const component = render(<Note note={note} />)

    expect(screen.getByText(/Component/i)).toBeDefined()

    const span = component.container.querySelector("span")

    console.log(prettyDOM(span))

    // screen.debug()
  })
})
