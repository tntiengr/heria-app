import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import IntroPage from '../intro-page';
import DetailPage from '../detail-page';

const CalisMainStack = createStackNavigator();

function MainPage() {
  return (
    <CalisMainStack.Navigator screenOptions={{headerShown: false}}>
      <CalisMainStack.Screen name="Intro" component={IntroPage} />
      <CalisMainStack.Screen name="Detail" component={DetailPage} />
    </CalisMainStack.Navigator>
  );
}

export default MainPage;
