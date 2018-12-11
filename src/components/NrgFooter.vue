<template>
  <footer class="footer">
    <p>
      <span>
        <a href="#">&copy;</a> 2010 - {{ new Date().getFullYear() }}
        <a href="http://www.facebook.com/energymixradio">EnergyMixRadio</a>. All
        rights reserved. | Designed by <span><a href="#">ZP</a></span>
      </span>
    </p>
  </footer>
</template>

<script>
export default {
  name: "NrgFooter"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
div.footer {
  position: relative;
  width: 650px;
  top: 15px;
}
div.footer p {
  font-weight: bold;
  font-size: 10px;
  color: #ffffff;
}
div.footer a {
  color: #ffffff;
  text-decoration: none;
}
</style>
