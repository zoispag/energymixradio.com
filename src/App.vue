<script setup>
import { radio } from "@/store";
import NgrLogo from "@/components/NgrLogo.vue";
import NrgPlayer from "@/components/Radio/NrgPlayer.vue";
import NrgSongInfo from "@/components/Radio/NrgSongInfo.vue";
import Facebook from "@/components/Social/NrgFacebook.vue";
import Twitter from "@/components/Social/NrgTwitter.vue";
import NrgHistory from "@/components/Radio/NrgHistory.vue";
import NrgShare from "@/components/NrgShare.vue";
import NrgFooter from "@/components/NrgFooter.vue";
</script>

<template>
  <div class="grid place-items-center antialiased px-2 py-12 min-h-screen glow" :style="{ '--accent': radio.accent }">
    <NgrLogo />
    <NrgPlayer />
    <NrgSongInfo />
    <NrgHistory />
    <NrgShare />
    <Facebook />
    <Twitter />
    <NrgFooter />
  </div>
</template>

<style>
@property --accent-a {
  syntax: "<number>";
  inherits: true;
  initial-value: 0.4;
}
.glow {
  background:
    radial-gradient(ellipse at 50% 30%, rgba(var(--accent), 0.45), transparent 60%),
    radial-gradient(ellipse at 50% 110%, rgba(var(--accent), 0.25), transparent 55%);
  transition: --accent 1s;
}
</style>
