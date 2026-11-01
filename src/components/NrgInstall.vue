<script setup>
import { ref, onMounted } from "vue";

const prompt = ref(null);
const isIos = ref(false);
const standalone = ref(false);
const showIosHint = ref(false);

onMounted(() => {
  standalone.value = window.matchMedia("(display-mode: standalone)").matches || navigator.standalone;
  isIos.value = /iphone|ipad|ipod/i.test(navigator.userAgent);
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    prompt.value = e;
  });
  window.addEventListener("appinstalled", () => (prompt.value = null));
});

async function install() {
  if (prompt.value) {
    prompt.value.prompt();
    await prompt.value.userChoice;
    prompt.value = null;
  } else {
    showIosHint.value = !showIosHint.value;
  }
}
</script>

<template>
  <div v-if="!standalone && (prompt || isIos)" class="mb-4 text-center">
    <button
      type="button"
      class="rounded-full border border-white/20 px-5 py-2 text-xs uppercase tracking-widest text-gray-200 transition hover:border-white/60 hover:text-white"
      @click="install"
    >
      Install app
    </button>
    <p v-if="showIosHint" class="mt-2 text-xs text-gray-400">
      Tap <span class="font-bold">Share</span>, scroll down the list and choose
      <span class="font-bold">Add to Home Screen</span>.
    </p>
  </div>
</template>
