/* eslint-disable */
import { pathKeys } from './index';

export const DateTimeFormat = {
  DATE_TIME: 'MMM DD, YYYY hh:mm A',
  SHORT: 'MMM DD, YYYY',
  DATE: 'MM/DD/YYYY',
  TIME: 'hh:mm',
  AM_PM: 'A',
};

export const LAYOUT = {
  DRAWERLEFT: 'DRAWERLEFT',
  FULLPAGE: 'FULLPAGE',
};

export const MenuLeft = [
  {
    name: 'Home',
    pathName: pathKeys.ROOT,
  },
  {
    name: 'Dashboard',
    pathName: pathKeys.DASHBOARD,
  },
  {
    name: 'About',
    pathName: pathKeys.ABOUT,
  },
];
