<script setup>
import axios from "axios"
import { BACKEND_URL } from "../constants/constants.js"
import TaskDescription from "./taskDescription.vue"
</script>

<template>
  <div class="task-list">
    <div v-if="tasks.length == 0">
      <p :style="{ color: themeTextColor }">Tasks Loading...</p>
    </div>
    <div v-for="task in tasks" :key="task.id" class="task-card">
      <div class="left">
        <input
          type="checkbox"
          v-model="task.completed"
          class="checkbox-round"
          @click="updateTask(task)"
        />
      </div>
      <div class="center">
        <p :style="{ color: themeTextColor }">{{ task.task }}</p>
      </div>

      <div class="right">
        <font-awesome-icon
          icon="fa-solid fa-grip"
          class="grip-dots-vertical"
          :style="{ color: themeColor }"
          @click="viewTask(task)"
        />
      </div>
    </div>

    <div v-if="selectedTask">
      <TaskDescription
        :selected-task="selectedTask"
        @delete-task="deleteTask"
        @close-modal="closeModal"
      ></TaskDescription>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tasks: [],
      themeColor: "#8f754d",
      themeTextColor: "#5e4f39",
      selectedTask: null,
    }
  },
  created() {
    this.fetchTasks()
  },
  components: {
    TaskDescription,
  },
  methods: {
    fetchTasks() {
      axios
        .get(`${BACKEND_URL}/api/task/get`)
        .then((response) => {
          this.tasks = response.data.body
        })
        .catch((error) => {
          console.error("Error fetching tasks:", error)
        })
    },

    formatLocalizedDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleString()
    },
    viewTask(task) {
      console.log("View task:", task)
      this.selectedTask = task
    },
    updateTask(task) {
      axios
        .put(`${BACKEND_URL}/api/task/update/${task._id}`, {
          completed: !task.completed,
        })
        .then(() => {
          console.log("Update task:", task)
          this.fetchTasks()
        })
        .catch((error) => {
          console.error("Error updating task:", error)
        })
    },

    deleteTask(task) {
      axios
        .delete(`${BACKEND_URL}/api/task/delete/${task._id}`)
        .then(() => {
          console.log("Delete task:", task)
          this.closeModal()
          this.fetchTasks()
        })
        .catch((error) => {
          console.error("Error deleting task:", error)
        })
    },
    closeModal() {
      this.selectedTask = null
    },
  },
}
</script>

<style scoped>
.task-list {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
}

.task-card {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 420px;
  height: 45px;
}

.task-card:first-child {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.task-card:last-child {
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.left {
  margin-right: 10px;
}

.center {
  flex-grow: 1;
}

.right {
  margin-left: 10px;
  margin-right: 10px;
}

input[type="checkbox"] {
  width: 22px;
  height: 22px;
  color: #a38455;
  vertical-align: middle;
  -webkit-appearance: none;

  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  transition: background 300ms;
  cursor: pointer;
}

input[type="checkbox"]::before {
  content: "";
  color: transparent;
  display: block;
  width: inherit;
  height: inherit;
  border-radius: inherit;
  border: 0;
  background-color: transparent;
  background-size: contain;
  box-shadow: inset 0 0 0 1px #554430;
}

[type="checkbox"]:checked {
  background-color: currentcolor;
}

[type="checkbox"]:checked::before {
  box-shadow: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E %3Cpath d='M15.88 8.29L10 14.17l-1.88-1.88a.996.996 0 1 0-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7a.996.996 0 0 0 0-1.41c-.39-.39-1.03-.39-1.42 0z' fill='%23fff'/%3E %3C/svg%3E");
}

.grip-dots-vertical {
  width: 20px;
  height: 20px;
  rotate: 90deg;
}

.task-options {
  display: flex;
  gap: 10px;
  margin-left: auto;
}
</style>
