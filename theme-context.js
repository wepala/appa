import {createContext} from 'react';
import * as eva from '@eva-design/eva';

export const {light, dark} = eva;

export const ThemeContext = createContext(
  light, // default value
);
