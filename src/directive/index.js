import { clickOutside } from './ClickOutside'
import { Focus } from './Focus'


export const initDirective = (app) => {
  clickOutside(app);
  Focus(app);
}