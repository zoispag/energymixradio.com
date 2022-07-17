<script setup>
import NgrLogo from "@/components/NgrLogo.vue";
import NrgPlayer from "@/components/Radio/NrgPlayer.vue";
import NrgSongInfo from "@/components/Radio/NrgSongInfo.vue";
import Facebook from "@/components/Social/NrgFacebook.vue";
import Twitter from "@/components/Social/NrgTwitter.vue";
import NrgFooter from "@/components/NrgFooter.vue";
</script>

<template>
  <div class="grid place-items-center antialiased px-2 py-12">
    <NgrLogo />
    <NrgPlayer />
    <NrgSongInfo />
    <Facebook />
    <Twitter />
    <NrgFooter />
  </div>
</template>
