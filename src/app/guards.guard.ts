import { CanDeactivateFn } from '@angular/router';

export const guardsGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  return true;
};
