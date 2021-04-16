import React from 'react';
import 'react-native-gesture-handler';

import Introdution from './components/home-screen/HomeScreen';
import Home from './components/main-page';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {UserContextProvider} from './contextApi/UserContext';
import HeriaMenu from './components/drawer/DrawerContent';

const MainDrawer = createDrawerNavigator();

function App() {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <MainDrawer.Navigator
          drawerContent={props => <HeriaMenu {...props} />}
          initialRouteName="Introdution">
          <MainDrawer.Screen name="Introdution" component={Introdution} />
          <MainDrawer.Screen name="Home" component={Home} />
        </MainDrawer.Navigator>
      </NavigationContainer>
    </UserContextProvider>
  );
}

export default App;
