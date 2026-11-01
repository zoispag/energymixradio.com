<script setup>
import { radio } from "@/store";
import NgrLogo from "@/components/NgrLogo.vue";
import NrgPlayer from "@/components/Radio/NrgPlayer.vue";
import NrgSongInfo from "@/components/Radio/NrgSongInfo.vue";
import Facebook from "@/components/Social/NrgFacebook.vue";
import Twitter from "@/components/Social/NrgTwitter.vue";
import NrgHistory from "@/components/Radio/NrgHistory.vue";
import NrgInstall from "@/components/NrgInstall.vue";
import NrgShare from "@/components/NrgShare.vue";
import NrgFooter from "@/components/NrgFooter.vue";
</script>

<template>
  <div class="grid place-items-center antialiased px-2 py-12 min-h-screen glow" :style="{ '--accent': radio.accent }">
    <NgrLogo />
    <NrgPlayer />
    <NrgSongInfo />
    <NrgHistory />
    <NrgInstall />
    <NrgShare />
    <Facebook />
    <Twitter />
    <NrgFooter />
  </div>
</template>

<style>
@property --accent {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(185 28 28);
}
.glow {
  background:
    radial-gradient(ellipse at 50% 30%, color-mix(in srgb, var(--accent) 45%, transparent), transparent 60%),
    radial-gradient(ellipse at 50% 110%, color-mix(in srgb, var(--accent) 25%, transparent), transparent 55%);
  transition: --accent 1.2s ease;
}
</style>
