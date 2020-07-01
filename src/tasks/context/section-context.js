import React from 'react';

export const SectionContext = React.createContext({
  section: 'agenda',
  setSection(section) {
    this.section = section;
  },
});
