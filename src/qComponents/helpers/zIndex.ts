const $Q: $Q = {
  locale: ref(locale),
  zIndex: zIndexCounter
};
Object.defineProperties($Q, {
  zIndex: {
    get() {
      zIndexCounter += 1;
      return zIndexCounter;
    }
  }
});

export default zIndex;
