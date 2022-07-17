<script setup>
const currentYear = new Date().getFullYear();
const streamUrl = "http://cast.magicstreams.gr:9117";
const gitHub = "https://github.com/zoispag";
</script>

<template>
  <footer class="text-gray-300 text-xs tracking-wide pt-12 sm:pt-2">
    <span class="text-center">
      <a class="text-gray-300 no-underline" :href="streamUrl">&copy;</a>
      2010 - {{ currentYear }} EnergyMixRadio. All rights reserved.
      <span class="hidden sm:inline">
        | Designed by
        <a class="text-gray-300 no-underline" :href="gitHub">ZP</a>
      </span>
    </span>
  </footer>
</template>
