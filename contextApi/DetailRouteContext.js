import React, {useState, createContext} from 'react';

export const RoutingDetail = createContext();

export const RoutingDetailProvider = props => {
  const [routeName, setRouteName] = useState('Shop');
  const [showSearch, setShowSearch] = useState(false);

  return (
    <RoutingDetail.Provider
      value={[routeName, setRouteName, showSearch, setShowSearch]}>
      {props.children}
    </RoutingDetail.Provider>
  );
};
