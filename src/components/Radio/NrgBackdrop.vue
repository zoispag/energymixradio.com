<script setup>
import { radio } from "@/store";
</script>

<template>
  <div class="pointer-events-none fixed inset-0 -z-20 overflow-hidden glow" aria-hidden="true">
    <Transition name="fade">
      <img
        v-if="radio.artwork"
        :key="radio.artwork"
        :src="radio.artwork"
        alt=""
        class="absolute inset-0 h-full w-full scale-125 object-cover opacity-40 blur-3xl saturate-150"
      />
    </Transition>
    <div class="absolute inset-0 bg-linear-to-b from-black/30 via-black/50 to-black"></div>
  </div>
</template>

<style scoped>
@property --accent {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(185 28 28);
}
.glow {
  background:
    radial-gradient(ellipse at 50% 30%, color-mix(in srgb, var(--accent) 45%, transparent), transparent 60%),
    radial-gradient(ellipse at 50% 110%, color-mix(in srgb, var(--accent) 25%, transparent), transparent 55%),
    #000;
  transition: --accent 1.2s ease;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.6s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0 !important;
}
</style>
