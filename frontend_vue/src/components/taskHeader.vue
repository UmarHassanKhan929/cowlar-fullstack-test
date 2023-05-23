<script setup>
import axios from "axios"
import { BACKEND_URL } from "../constants/constants.js"
</script>

<template>
  <div class="tile" :class="{ expanded: isExpanded }">
    <div class="content">
      <div class="left">
        <font-awesome-icon
          icon="fa-solid fa-bars"
          :style="{ color: themeColor, width: '22px', height: '22px' }"
        />
      </div>
      <div class="middle">
        <p>To Do Today</p>
      </div>
      <div class="right" @click="toggleExpansion">
        <font-awesome-icon
          :icon="
            isExpanded ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'
          "
          :style="{ color: themeColor }"
        />
      </div>
    </div>

    <div name="expand">
      <div v-if="isExpanded" class="expanded-content">
        <input
          ref="taskInput"
          type="text"
          v-model="taskInput"
          placeholder="Add a task"
          class="task-input-field"
          id="task-input-field"
          @keydown.enter="addTask"
        />
        <button @click="addTask">Add Task</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "To do today",
      themeColor: "#8f754d",
      isExpanded: false,
      taskInput: "",
    }
  },
  methods: {
    toggleExpansion() {
      this.isExpanded = !this.isExpanded
      this.taskInput = ""
      if (this.isExpanded) {
        this.$nextTick(() => {
          this.$refs.taskInput.focus()
        })
      }
    },
    addTask() {
      if (this.taskInput) {
        console.log("Add task:", this.taskInput)
        axios
          .post(`${BACKEND_URL}/api/task/create`, {
            task: this.taskInput,
          })
          .then((val) => {
            console.log("Added task:", val)
            this.$emit("task-added")
          })
          .catch((error) => {
            console.error("Error updating task:", error)
          })
        this.taskInput = ""
      }
    },
  },
}
</script>

<style scoped>
.tile {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  width: 420px;
  height: 55px;
  border-radius: 10px;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.05)
  );
  box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.3);
  transition: height 0.3s;
}

.expanded {
  height: 120px;
}

.content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.expanded-content {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding: 10px;
}

.task-input-field {
  width: 250px;
  height: 30px;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
  outline: none;
  background-color: transparent;
}

.expanded-content button {
  background: none;
  border: none;
  padding: 6px 10px;
  font-size: 14px;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s;
  color: #454545;
}

.expanded-content button:hover {
  background-color: rgba(255, 255, 255, 0.5);
}

.left {
  margin-left: 10px;
}

.right {
  margin-right: 10px;
}

.middle {
  flex-grow: 1;
  text-align: center;
}

img {
  width: 24px;
  height: 24px;
}

span {
  font-weight: bold;
}
</style>
