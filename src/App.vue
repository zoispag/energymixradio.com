<script setup>
import { radio } from "@/store";
import NgrLogo from "@/components/NgrLogo.vue";
import NrgPlayer from "@/components/Radio/NrgPlayer.vue";
import NrgSongInfo from "@/components/Radio/NrgSongInfo.vue";
import NrgSocial from "@/components/Social/NrgSocial.vue";
import NrgFavorites from "@/components/Radio/NrgFavorites.vue";
import NrgHistory from "@/components/Radio/NrgHistory.vue";
import NrgBackdrop from "@/components/Radio/NrgBackdrop.vue";
import NrgFocusMode from "@/components/Radio/NrgFocusMode.vue";
import NrgEqualizer from "@/components/Radio/NrgEqualizer.vue";
import NrgSleepTimer from "@/components/Radio/NrgSleepTimer.vue";
import NrgInstall from "@/components/NrgInstall.vue";
import NrgShare from "@/components/NrgShare.vue";
import NrgFooter from "@/components/NrgFooter.vue";
</script>

<template>
  <div
    class="flex min-h-dvh flex-col overflow-x-hidden px-4 antialiased lg:h-dvh lg:overflow-hidden"
    :style="{ '--accent': radio.accent }"
  >
    <NrgBackdrop />
    <NrgEqualizer />
    <NrgFocusMode />
    <main id="main" class="mx-auto grid w-full max-w-5xl flex-1 grid-cols-[minmax(0,1fr)] content-center place-items-center gap-y-6 py-6 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-0 lg:py-2">
      <h1 class="sr-only">EnergyMixRadio, live 24/7 internet radio</h1>
      <section class="flex w-full flex-col items-center">
        <NgrLogo />
        <NrgPlayer />
        <NrgSleepTimer />
      </section>
      <section class="flex w-full flex-col items-center [&>*]:mb-0! [&>*]:mt-0! gap-3">
        <NrgSongInfo />
        <NrgHistory />
        <NrgFavorites />
        <NrgInstall />
        <div class="flex flex-wrap items-center justify-center gap-3 [&>*]:mb-0!">
          <NrgShare />
          <NrgSocial />
        </div>
      </section>
    </main>
    <NrgFooter />
  </div>
</template>
