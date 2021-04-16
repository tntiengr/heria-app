import React, {useContext} from 'react';

import {StyleSheet, View, Text, TouchableHighlight} from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

import {RoutingDetail} from '../../contextApi/DetailRouteContext';

function NavBar({navigation}) {
  const [routeName, setRouteName] = useContext(RoutingDetail);

  return (
    <View style={styles.navContainer}>
      <TouchableHighlight
        style={[styles.navItem, styles.shopItem]}
        onPress={() => {
          navigation.navigate('Shop');
          setRouteName('Shop');
        }}>
        <View style={styles.tabContainer}>
          <IconFontAwesome
            style={[styles.menuIcon, routeName === 'Shop' && styles.activeTab]}
            name="shopping-cart"
            size={25}
            color="#F5F3F4"
          />
          <Text
            style={[
              styles.itemTitle,
              routeName === 'Shop' && styles.activeTab,
            ]}>
            Shop
          </Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        style={[styles.navItem, styles.excercisesItem]}
        onPress={() => {
          navigation.navigate('Excercises');
          setRouteName('Excercises');
        }}>
        <View style={styles.tabContainer}>
          <IconFontAwesome
            style={[
              styles.menuIcon,
              routeName === 'Excercises' && styles.activeTab,
            ]}
            name="bolt"
            size={25}
            color="#F5F3F4"
          />
          <Text
            style={[
              styles.itemTitle,
              routeName === 'Excercises' && styles.activeTab,
            ]}>
            Excercises
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

export default NavBar;

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  navItem: {
    flexBasis: '50%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    backgroundColor: '#161A1D',
  },
  shopItem: {},
  excercisesItem: {},
  tabContainer: {
    alignItems: 'center',
  },
  itemTitle: {
    marginTop: 5,
    color: '#F5F3F4',
  },
  activeTab: {
    color: '#BA181B',
  },
});
