import { Tooltip } from 'bootstrap/dist/js/bootstrap.esm.min.js'

export const BsTooltip = (app) => {
  app.directive('BsTooltip', {
    mounted (el) {
      new Tooltip(el)
    }
  });
}