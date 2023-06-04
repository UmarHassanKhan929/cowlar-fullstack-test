import { render, screen, act, waitFor } from "@testing-library/react"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import TaskList from "../src/components/task_list/task_list"
import "@testing-library/jest-dom/extend-expect"
import { rest } from "msw"
import { setupServer } from "msw/node"
import { BACKEND_URL } from "../src/constants/constants"

// Mock the server response for successful tasks fetch
const server = setupServer(
  rest.get(`${BACKEND_URL}/api/task/get`, (req, res, ctx) => {
    const tasks = [
      { _id: 1, task: "Task 1", completed: false },
      { _id: 2, task: "Task 2", completed: true },
    ]
    return res(ctx.json({ body: tasks }))
  })
)
const queryClient = new QueryClient()

beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  queryClient.clear()
})
afterAll(() => server.close())

// Test case for rendering TaskList component
test("renders TaskList component without errors", () => {
  render(
    <QueryClientProvider client={queryClient}>
      <TaskList />
    </QueryClientProvider>
  )
})

// Test case for displaying loading message while fetching tasks
test("displays loading message while fetching tasks", () => {
  const { getByText } = render(
    <QueryClientProvider client={queryClient}>
      <TaskList />
    </QueryClientProvider>
  )
  const loadingMessage = getByText("Tasks Loading...")
  expect(loadingMessage).toBeInTheDocument()
})

// Test case for rendering tasks when fetched successfully
test("renders tasks when fetched successfully", async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <TaskList />
    </QueryClientProvider>
  )

  // Wait for tasks to load
  await screen.findByText("Task 1")

  const tasks = screen.getAllByTestId("task-card")
  expect(tasks).toHaveLength(2)
})
