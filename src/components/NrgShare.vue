<script setup>
import { ref } from "vue";
import { radio } from "@/store";

const copied = ref(false);

async function share() {
  const data = {
    title: "EnergyMixRadio",
    text: radio.meta ? `Listening to ${radio.meta} on EnergyMixRadio` : "Listen to EnergyMixRadio live",
    url: "https://www.energymixradio.com",
  };
  if (navigator.share) {
    try {
      await navigator.share(data);
    } catch (e) {
      /* user dismissed */
    }
    return;
  }
  try {
    await navigator.clipboard.writeText(`${data.text} ${data.url}`);
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  } catch (e) {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(data.text)}&url=${encodeURIComponent(data.url)}`);
  }
}
</script>

<template>
  <div class="flex items-center">
    <button
      type="button"
      class="rounded-full border border-white/20 px-5 py-2 text-xs uppercase tracking-widest text-gray-200 transition hover:border-red-500 hover:text-white"
      @click="share"
    >
      {{ copied ? "Link copied ✓" : "↗ Share" }}
    </button>
  </div>
</template>
