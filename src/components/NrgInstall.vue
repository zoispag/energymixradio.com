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
      class="rounded-full bg-red-600 px-6 py-2 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-red-900/50 transition hover:bg-red-500"
      @click="install"
    >
      Get the app · one tap to listen
    </button>
    <p v-if="showIosHint" class="mt-2 text-xs text-gray-400">
      Tap <span class="font-bold">Share</span>, then <span class="font-bold">Add to Home Screen</span>.
    </p>
  </div>
</template>
