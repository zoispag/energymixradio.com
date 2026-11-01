<template>
  <div class="w-full max-w-xs sm:max-w-md px-2 pb-6 sm:pb-2">
    <img src="@/assets/logo.png" alt="EnergyMixRadio" class="logo mx-auto w-full" />
  </div>
</template>

<style scoped>
.logo {
  filter: drop-shadow(0 0 28px color-mix(in srgb, var(--accent) 60%, transparent));
  animation: float 6s ease-in-out infinite;
}
@keyframes float {
  50% { transform: translateY(-8px); }
}
@media (prefers-reduced-motion: reduce) {
  .logo { animation: none; }
}
</style>
