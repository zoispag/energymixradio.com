<script setup>
import { radio } from "@/store";
import NgrLogo from "@/components/NgrLogo.vue";
import NrgPlayer from "@/components/Radio/NrgPlayer.vue";
import NrgSongInfo from "@/components/Radio/NrgSongInfo.vue";
import NrgSocial from "@/components/Social/NrgSocial.vue";
import NrgFavorites from "@/components/Radio/NrgFavorites.vue";
import NrgHistory from "@/components/Radio/NrgHistory.vue";
import NrgBackdrop from "@/components/Radio/NrgBackdrop.vue";
import NrgEqualizer from "@/components/Radio/NrgEqualizer.vue";
import NrgSleepTimer from "@/components/Radio/NrgSleepTimer.vue";
import NrgInstall from "@/components/NrgInstall.vue";
import NrgShare from "@/components/NrgShare.vue";
import NrgFooter from "@/components/NrgFooter.vue";
</script>

<template>
  <div class="grid grid-cols-[minmax(0,1fr)] place-items-center antialiased px-4 py-10 min-h-screen overflow-x-hidden" :style="{ '--accent': radio.accent }">
    <NrgBackdrop />
    <NrgEqualizer />
    <NgrLogo />
    <NrgPlayer />
    <NrgSleepTimer />
    <NrgSongInfo />
    <NrgHistory />
    <NrgFavorites />
    <NrgInstall />
    <NrgShare />
    <NrgSocial />
    <NrgFooter />
  </div>
</template>
