import "./App.css"
import Avatar from "./components/avatar/avatar"
import TaskHeader from "./components/task_header/task_header"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import TaskList from "./components/task_list/task_list"

const queryClient = new QueryClient()
function App() {
  return (
    <div data-testid="app-component">
      <div className="background"></div>
      <QueryClientProvider client={queryClient}>
        <div className="content">
          <Avatar />
          <br />
          <TaskHeader />
          <br />
          <TaskList />
        </div>
      </QueryClientProvider>
    </div>
  )
}

export default App
