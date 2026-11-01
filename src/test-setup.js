// jsdom has no matchMedia; real browsers always do
window.matchMedia ||= (query) => ({
  matches: false,
  media: query,
  addEventListener() {},
  removeEventListener() {},
});
