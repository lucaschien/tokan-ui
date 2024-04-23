import { ClickOutside } from './ClickOutside'
import { Focus } from './Focus'
import { BsTooltip } from './BsTooltip'


export const initDirective = (app) => {
  ClickOutside(app);
  Focus(app);
  BsTooltip(app);
}