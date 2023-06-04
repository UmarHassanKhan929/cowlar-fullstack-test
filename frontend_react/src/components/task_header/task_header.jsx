import React, { useState, useEffect, useRef } from "react"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBars,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons"
import { BACKEND_URL } from "../../constants/constants.js"
import styles from "./task_header.module.css"

import { useQueryClient, useMutation } from "@tanstack/react-query"

const TaskHeader = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [taskInput, setTaskInput] = useState("")
  const taskInputRef = useRef(null)
  const queryClient = useQueryClient()

  const addTaskMutation = useMutation(
    (task) => {
      return axios.post(`${BACKEND_URL}/api/task/create`, {
        task: task,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("tasks")
      },
    }
  )

  useEffect(() => {
    if (isExpanded) {
      taskInputRef.current.focus()
    }
  }, [isExpanded])

  const addTask = () => {
    if (taskInput.trim() !== "") {
      addTaskMutation.mutate(taskInput)
      setTaskInput("")
    }
  }

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded)
    setTaskInput("")
  }

  return (
    <div
      className={`${styles.tile} ${isExpanded ? styles.expanded : ""}`}
      data-testid="task-header-component"
    >
      <div className={styles.content}>
        <div className={styles.left}>
          <FontAwesomeIcon
            icon={faBars}
            style={{ color: "#8f754d", width: "22px", height: "22px" }}
          />
        </div>
        <div className={styles.middle}>
          <p>To Do Today</p>
        </div>
        <div className={styles.right} onClick={toggleExpansion}>
          <FontAwesomeIcon
            icon={isExpanded ? faChevronUp : faChevronDown}
            style={{ color: "#8f754d" }}
          />
        </div>
      </div>

      {isExpanded && (
        <div name={styles.expand}>
          <div className={styles.expanded_content}>
            <input
              ref={taskInputRef}
              type="text"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder="Add a task"
              className={styles.task_input_field}
              id="task_input_field"
              onKeyDown={(e) => e.key === "Enter" && addTask()}
            />
            <button onClick={addTask}>Add Task</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskHeader
