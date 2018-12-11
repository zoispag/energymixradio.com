<template>
  <div class="py-2 hidden sm:block">
    <iframe
      src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fnrgmixradio%2F&tabs&width=340&height=70&small_header=true&adapt_container_width=false&hide_cover=true&show_facepile=false&appId=177487622329664"
      width="340"
      height="70"
      style="border:none;overflow:hidden"
      scrolling="no"
      frameborder="0"
      allowTransparency="true"
      allow="encrypted-media"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: "NrgSocialFacebook"
};
</script>

<style scoped lang="scss">
@import "../assets/styles/tailwind.postcss";

.fb {
  border: none;
  overflow: hidden;
  width: 292px;
  height: 65px;
}
</style>
