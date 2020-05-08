import React, {useState, useCallback} from 'react';

export const useSection = () => {
  const [section, setSection] = useState('agenda');
  const setCurrentSection = useCallback(section => {
    setSection(section);
  }, []);
  return {
    section,
    setCurrentSection,
  };
};

export const TasksContext = React.createContext({
  section: 'agenda',
  setCurrentSection: () => {},
});
