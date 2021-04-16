import React, {useState, createContext} from 'react';

export const HeaderHeight = createContext();

export const HeaderHeightProvider = props => {
  const [headerHeight, setHeaderHeight] = useState(0);

  return (
    <HeaderHeight.Provider value={[headerHeight, setHeaderHeight]}>
      {props.children}
    </HeaderHeight.Provider>
  );
};
