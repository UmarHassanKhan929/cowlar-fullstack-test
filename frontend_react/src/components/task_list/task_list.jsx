import React, { useState, useEffect } from "react"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGrip } from "@fortawesome/free-solid-svg-icons"
import { BACKEND_URL } from "../../constants/constants"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import styles from "./task_list.module.css"
import TaskViewModal from "../task_description/task_description"

const TaskList = () => {
  const queryClient = useQueryClient()
  const [selectedTask, setSelectedTask] = useState(null)

  const {
    data: tasks,
    isLoading: tasksAreLoading,
    isError: tasksAreError,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await fetch(`${BACKEND_URL}/api/task/get`)

      if (!response.ok) {
        throw new Error("Failed to fetch data")
      }

      const resData = await response.json()
      return resData.body
    },
  })

  const updateTaskMutation = useMutation(
    (task) => {
      return axios.put(`${BACKEND_URL}/api/task/update/${task._id}`, {
        completed: !task.completed,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("tasks")
      },
    }
  )

  const viewTask = (task) => {
    setSelectedTask(task)
  }

  const updateTask = (task) => {
    updateTaskMutation.mutate(task)
  }

  const closeModal = () => {
    setSelectedTask(null)
  }
  return (
    <div className={styles.task_list}>
      {tasksAreLoading ? (
        <p className="theme_color">Tasks Loading...</p>
      ) : tasksAreError ? (
        <p className="theme_color">Error while fetching Tasks</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id} className={styles.task_card}>
            <div className={styles.left}>
              <input
                type="checkbox"
                checked={task.completed}
                className={styles.checkbox_round}
                onChange={() => updateTask(task)}
              />
            </div>
            <div className={styles.center}>
              <p className="theme_text_color">{task.task}</p>
            </div>
            <div className={styles.right}>
              <FontAwesomeIcon
                icon={faGrip}
                className={`theme_color ${styles.grip_dots_vertical}`}
                onClick={() => viewTask(task)}
              />
            </div>
          </div>
        ))
      )}
      {selectedTask && (
        <TaskViewModal selectedTask={selectedTask} onCloseModal={closeModal} />
      )}
    </div>
  )
}

export default TaskList
