import {
  CLOSE_SIDEBAR,
  OPEN_SIDEBAR,
} from './action-types';

export const closeSidebar = () => ({
  type: CLOSE_SIDEBAR,
});

export const openSidebar = () => ({
  type: OPEN_SIDEBAR,
});
