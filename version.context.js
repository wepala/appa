import React from 'react';
import packageJson from './package';
import {VERSION} from 'react-native-dotenv';

const npmVers = packageJson.version;
export const VersionContext = React.createContext(
  VERSION !== '' ? VERSION : npmVers,
);
