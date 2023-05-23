<template>
  <div class="modal">
    <div class="modal-content">
      <h3>{{ selectedTask.task }}</h3>
      <p>Created at: {{ formatLocalizedDate(selectedTask.createdAt) }}</p>
      <p>Updated at: {{ formatLocalizedDate(selectedTask.updatedAt) }}</p>
      <p>Completed: {{ selectedTask.completed }}</p>
      <div
        :style="{
          display: 'flex',
          justifyContent: 'space-around',
          width: '100%',
        }"
      >
        <button @click="closeModal">Close</button>
        <button @click="deleteTask(selectedTask)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedTask: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatLocalizedDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleString()
    },
    deleteTask(task) {
      this.$emit("delete-task", task)
    },
    closeModal() {
      this.$emit("close-modal")
    },
  },
}
</script>
<style scoped>
.modal {
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 350px;
  padding: 20px;
  border-radius: 10px;
  color: #5e4f39;
}
</style>
