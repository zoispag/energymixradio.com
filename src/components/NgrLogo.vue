<template>
  <div class="flex w-full flex-col items-center px-2 pb-4 lg:pb-1">
    <img src="@/assets/logo.webp" alt="EnergyMixRadio" width="967" height="698" fetchpriority="high" class="logo w-full max-w-xs sm:max-w-sm lg:w-[min(30rem,46vh)]" />
    <p class="relative z-10 mt-2 flex whitespace-nowrap lg:mt-1 items-center justify-center gap-2 text-center text-xs uppercase tracking-[0.25em] text-gray-300">
      <span class="live-dot" aria-hidden="true"></span>
      Live 24/7
    </p>
  </div>
</template>

<style scoped>
.live-dot {
  height: 8px;
  width: 8px;
  border-radius: 9999px;
  background: #ef4444;
  box-shadow: 0 0 0 0 rgb(239 68 68 / 0.7);
  animation: live 1.8s ease-out infinite;
}
@keyframes live {
  to { box-shadow: 0 0 0 10px rgb(239 68 68 / 0); }
}
.logo {
  filter: drop-shadow(0 0 28px color-mix(in srgb, var(--accent) 60%, transparent));
  animation: float 6s ease-in-out infinite;
}
@keyframes float {
  50% { transform: translateY(-8px); }
}
@media (prefers-reduced-motion: reduce) {
  .logo, .live-dot { animation: none; }
}
</style>
