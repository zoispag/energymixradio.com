<script setup>
import { radio } from "@/store";

const bars = Array.from({ length: 56 }, (_, i) => ({
  delay: -((i * 37) % 17) / 10,
  duration: 0.7 + ((i * 53) % 11) / 10,
}));
</script>

<template>
  <div class="eq pointer-events-none fixed inset-x-0 bottom-0 -z-10 flex h-40 items-end gap-[3px] px-1" :class="{ on: radio.playing }" aria-hidden="true">
    <i
      v-for="(b, i) in bars"
      :key="i"
      :style="{ animationDelay: b.delay + 's', animationDuration: b.duration + 's' }"
    ></i>
  </div>
</template>

<style scoped>
.eq {
  opacity: 0;
  transition: opacity 1s;
  mask-image: linear-gradient(to top, black 10%, transparent);
  -webkit-mask-image: linear-gradient(to top, black 10%, transparent);
}
.eq.on {
  opacity: 0.55;
}
.eq i {
  flex: 1;
  height: 100%;
  border-radius: 3px 3px 0 0;
  background: var(--accent);
  transform-origin: bottom;
  transform: scaleY(0.05);
  animation: bounce 1s ease-in-out infinite alternate paused;
}
.eq.on i {
  animation-play-state: running;
}
@keyframes bounce {
  from { transform: scaleY(0.05); }
  to { transform: scaleY(1); }
}
@media (prefers-reduced-motion: reduce) {
  .eq { display: none; }
}
</style>
