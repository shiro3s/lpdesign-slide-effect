<script setup lang="ts">
const emits = defineEmits<{
	next: [];
	prev: [];
}>();
const handleNext = () => {
	emits("next");
};

const handlePrev = () => {
	emits("prev");
};
</script>

<template>
  <div class="v-pager">
    <div class="arrow arrow-left" @click="handlePrev">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
    </div>

    <div class="arrow arrow-right" @click="handleNext">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.v-pager {
  display: flex;
  gap: 16px;
  margin: 10px;
  z-index: 40;
}

.arrow {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #ffffff55;
}

.arrow svg {
  width: 24px;
  height: 24px;
  stroke-width: 2;
  color: #ffffff99;
}
</style>