<script setup lang="ts">
import VHeader from "@/components/header/VHeader.vue";
import VPager from "@/components/pager/VPager.vue"

import { data, useAnimation } from "./useAnimation";

const { state, containerRef, onNext } = useAnimation();
</script>

<template>
  <VHeader />

  <div class="m">
    <main class="container" ref="containerRef">
      <div 
        v-for="(v, i) in data"
        :key="v.img"
        :class="[
          'card',
          `card-${i}`
        ]"
        :style="[
          `background-image: url(${v.img})`,
          i !== state.active ? 'box-shadow: 6px 6px 10px 2px rgba(0, 0, 0, 0.6)' : ''
        ]"
      />
      <VPager @next="onNext" />
    </main>
</div>

</template>

<style scoped>
.m {
  width: 100%;
  max-width: 1280px;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
}

.container {
  margin: 15vh 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  z-index: 1;
  overflow: hidden;
  filter: blur(0);
}


.card {
  position: fixed;
  background-position: center;
  background-size: cover;
  border-radius: 16px;
  z-index: -1;
}
</style>
