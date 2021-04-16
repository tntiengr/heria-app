import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// import {StyleSheet} from 'react-native';

import Shop from '../shop';
import Excercise from '../excercise';
import NavigationBar from '../navigation-bar';

import ModalSearch from '../navigation-bar/ModalSearch';

import {RoutingDetailProvider} from '../../contextApi/DetailRouteContext';
// import {RoutingDetail} from '../../contextApi/DetailRouteContext';
import {HeaderHeightProvider} from '../../contextApi/DetailHeaderHeightContext';

const ContentStack = createStackNavigator();

function DetailPage({navigation}) {
  return (
    <>
      <ContentStack.Navigator
        screenOptions={{
          headerShown: false,
          // headerLeft: () => (
          //   <TouchableOpacity
          //     style={styles.menuIcon}
          //     onPress={_onShowSearchInput}>
          //     <IconFontAwesome name="search" size={20} color="#F5F3F4" />
          //   </TouchableOpacity>
          // ),
          // headerStyle: {
          //   backgroundColor: '#161A1D',
          //   borderWidth: 0,
          //   shadowOffset: {width: 0, height: 0},
          // },
          // headerTitleStyle: {
          //   color: '#fefae0',
          // },
          // headerRight: () => (
          //   <TouchableOpacity>
          //     <Image
          //       resizeMode="cover"
          //       style={styles.logoHeader}
          //       source={require('../../static/images/drawer/heriaAva.png')}
          //     />
          //   </TouchableOpacity>
          // ),
        }}>
        <ContentStack.Screen
          name="Shop"
          component={Shop}
          options={{title: 'Calis Shop'}}
        />
        <ContentStack.Screen name="Excercises" component={Excercise} />
      </ContentStack.Navigator>
      <ModalSearch />
      <NavigationBar navigation={navigation} />
    </>
  );
}

function DetailPageWrapper({navigation}) {
  return (
    <RoutingDetailProvider>
      <HeaderHeightProvider>
        <DetailPage navigation={navigation} />
      </HeaderHeightProvider>
    </RoutingDetailProvider>
  );
}

export default DetailPageWrapper;

// const styles = StyleSheet.create({
//   detailPageWapper: {},
//   logoHeader: {
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//     marginRight: 12,
//   },
//   menuIcon: {
//     marginLeft: 12,
//   },
// });
