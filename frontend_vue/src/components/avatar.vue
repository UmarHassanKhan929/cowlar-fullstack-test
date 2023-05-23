<script setup></script>

<template>
  <div class="avatar-container">
    <div class="avatar-wrapper">
      <img class="avatar" :src="imageSource" alt="Avatar" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageSource: "/src/assets/avatar-crop.jpg",
    }
  },
}
</script>

<style scoped>
.avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
}

.avatar-wrapper {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.3);
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
  background: linear-gradient(
    to bottom right,
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.1)
  );
  backdrop-filter: blur(2px);
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
</style>
