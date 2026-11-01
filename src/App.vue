<script setup>
import NgrLogo from "@/components/NgrLogo.vue";
import NrgPlayer from "@/components/Radio/NrgPlayer.vue";
import NrgSongInfo from "@/components/Radio/NrgSongInfo.vue";
import Facebook from "@/components/Social/NrgFacebook.vue";
import Twitter from "@/components/Social/NrgTwitter.vue";
import NrgShare from "@/components/NrgShare.vue";
import NrgFooter from "@/components/NrgFooter.vue";
</script>

<template>
  <div class="grid place-items-center antialiased px-2 py-12 min-h-screen glow">
    <NgrLogo />
    <NrgPlayer />
    <NrgSongInfo />
    <NrgShare />
    <Facebook />
    <Twitter />
    <NrgFooter />
  </div>
</template>

<style>
.glow {
  background: radial-gradient(ellipse at 50% 35%, rgba(185, 28, 28, 0.35), transparent 60%);
}
</style>
