import { render, screen, act, waitFor } from "@testing-library/react"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import TaskList from "../src/components/task_list/task_list"
import "@testing-library/jest-dom/extend-expect"
import { rest } from "msw"
import { setupServer } from "msw/node"
import { BACKEND_URL } from "../src/constants/constants"

// Mock the server response for error while fetching tasks
const server = setupServer(
  rest.get(`${BACKEND_URL}/api/task/get`, (req, res, ctx) => {
    return res(ctx.status(500), ctx.json({ error: "Failed to fetch tasks" }))
  })
)

const queryClient = new QueryClient()

beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  queryClient.clear()
})
afterAll(() => server.close())

// Test case for displaying error message when tasks fetching fails
test("displays error message when tasks fetching fails", async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <TaskList />
    </QueryClientProvider>
  )

  await waitFor(() => {
    const errorMessage = screen.getByText("Error while fetching Tasks")
    expect(errorMessage).toBeInTheDocument()
  })
})
