export const Focus = (app) => {
  app.directive('Focus', {
    mounted (el) {
      el.focus();
    }
  })
}