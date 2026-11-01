<template>
  <div class="flex w-full flex-col items-center px-2 pb-4 lg:pb-1">
    <img src="@/assets/logo.webp" alt="EnergyMixRadio" width="797" height="469" fetchpriority="high" class="logo w-full max-w-xs sm:max-w-sm lg:w-[min(30rem,46vh)]" />
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
