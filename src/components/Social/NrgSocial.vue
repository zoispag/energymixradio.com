<template>
  <nav class="flex items-center gap-3" aria-label="Follow us">
    <a
      href="https://www.facebook.com/energymixradio"
      target="_blank"
      rel="noopener"
      class="social"
    >
      <svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor"><path d="M13.5 22v-8.2h2.8l.5-3.3h-3.3V8.4c0-.9.4-1.7 1.8-1.7h1.6V3.8c-.3 0-1.3-.2-2.4-.2-2.5 0-4.1 1.5-4.1 4.2v2.7H7.6v3.3h2.8V22h3.1z" /></svg>
      <span>Facebook<span class="sr-only"> (opens in a new tab)</span></span>
    </a>
    <a
      href="https://twitter.com/EnergyMixRadio"
      target="_blank"
      rel="noopener"
      class="social"
    >
      <svg viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor"><path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.3L5.3 21H2.2l7.2-8.3L1.9 3h6.4l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.3 4.7H5.5l11.2 14.5z" /></svg>
      <span>Follow<span class="sr-only"> EnergyMixRadio on X (opens in a new tab)</span></span>
    </a>
  </nav>
</template>

<style scoped>
.social {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 9999px;
  border: 1px solid rgb(255 255 255 / 0.15);
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgb(229 231 235);
  transition: border-color 0.2s, color 0.2s;
}
.social:hover {
  border-color: rgb(255 255 255 / 0.6);
  color: white;
}
</style>
