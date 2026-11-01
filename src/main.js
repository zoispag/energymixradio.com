import { createApp } from "vue";
import App from "./App.vue";
import "./assets/main.css";

if ("serviceWorker" in navigator && import.meta.env.PROD) {
  navigator.serviceWorker.register("/sw.js").catch(() => {});
}

createApp(App).mount("#app");
