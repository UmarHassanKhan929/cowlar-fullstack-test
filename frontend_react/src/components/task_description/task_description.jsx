import React from "react"
import styles from "./task_description.module.css"
import axios from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { BACKEND_URL } from "../../constants/constants"

const TaskViewModal = ({ selectedTask, onCloseModal }) => {
  const queryClient = useQueryClient()
  const deleteTaskMutation = useMutation({
    mutationFn: (taskId) => {
      return axios.delete(`${BACKEND_URL}/api/task/delete/${taskId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries("tasks")
      onCloseModal()
    },
  })

  const deleteTask = (task) => {
    deleteTaskMutation.mutate(task._id)
  }

  const formatLocalizedDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <div className={styles.modal}>
      <div>
        <h3>{selectedTask.task}</h3>
        <p>Created at: {formatLocalizedDate(selectedTask.createdAt)}</p>
        <p>Updated at: {formatLocalizedDate(selectedTask.updatedAt)}</p>
        <p>Completed: {selectedTask.completed ? "Yes" : "No"}</p>
        <div className={styles.bottom_buttons_row}>
          <button onClick={onCloseModal}>Close</button>
          <button onClick={() => deleteTask(selectedTask)}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default TaskViewModal
