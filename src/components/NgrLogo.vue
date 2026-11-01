<template>
  <div class="w-full max-w-xs sm:max-w-md px-2 pb-6 sm:pb-2">
    <img src="@/assets/logo.webp" alt="EnergyMixRadio" width="797" height="469" fetchpriority="high" class="logo mx-auto w-full" />
    <p class="mt-4 flex items-center justify-center gap-2 text-center text-xs uppercase tracking-[0.25em] text-gray-300">
      <span class="live-dot" aria-hidden="true"></span>
      Live 24/7 · Non-stop mixes
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
