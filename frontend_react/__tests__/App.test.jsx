import { describe, test } from "vitest"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

import App from "../src/App.jsx"

// Test if the App component is rendered
describe("render the App Component", () => {
  test("renders the App Component", () => {
    render(<App />)
    // Assert that the App component is rendered
    expect(screen.getByTestId("app-component")).toBeInTheDocument()
  })
})

// Test if the Avatar component is rendered
test("renders the Avatar component", () => {
  render(<App />)
  // Assert that the Avatar component is rendered
  expect(screen.getByTestId("avatar-component")).toBeInTheDocument()
})

// Test if the TaskHeader component is rendered
test("renders the TaskHeader component", () => {
  render(<App />)
  // Assert that the TaskHeader component is rendered
  expect(screen.getByTestId("task-header-component")).toBeInTheDocument()
})
