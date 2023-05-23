<script setup>
import axios from "axios"
import { BACKEND_URL } from "./constants/constants"
import Avatar from "./components/avatar.vue"
import TaskHeader from "./components/taskHeader.vue"
import TaskList from "./components/taskList.vue"
</script>
<template>
  <div class="container">
    <div class="background"></div>

    <div class="content">
      <Avatar />

      <div class="task-header">
        <TaskHeader @task-added="fetchTasks" />
        <br />
        <TaskList :tasks="tasks" :key="tasks.length" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: [],
    }
  },
  created() {
    this.fetchTasks()
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
  },
  components: {
    Avatar,
    TaskHeader,
    TaskList,
  },
}
</script>

<style scoped>
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("assets/bg-full.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  filter: blur(8px);
  z-index: -1;
}

.background::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(63, 59, 56, 0.4);
}

.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.task-header {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
