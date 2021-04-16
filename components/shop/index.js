import React, {useContext, useEffect, useState} from 'react';
import Axios from '../Axios/Axios';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
// import {createStackNavigator} from '@react-navigation/stack';
import {
  createSharedElementStackNavigator,
  SharedElement,
} from 'react-navigation-shared-element';
import {enableScreens} from 'react-native-screens';
enableScreens();

import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Linking,
  Animated,
  TouchableOpacity,
} from 'react-native';

import Item from './Item';
import ItemDetails from './item-details';
import RecommendItemDetails from './item-details/RecommendItemDetails';

import {useHeaderHeight} from '@react-navigation/stack';
import {HeaderHeight} from '../../contextApi/DetailHeaderHeightContext';

import {RoutingDetail} from '../../contextApi/DetailRouteContext';
import {TouchableHighlight} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');
const ITEM_SIZE = width * 0.64;
const BACKDROP_HEIGHT = height * 0.5;
const HIGHLIGHT_FONT_COLOR = '#4895ef';
const SLASH_ANI_HEIGHT = (BACKDROP_HEIGHT - 70) * 0.85;

const ShopStack = createSharedElementStackNavigator();

function RouteShop() {
  const [, , showSearch, setShowSearch] = useContext(RoutingDetail);

  const _onShowSearchInput = () => {
    setShowSearch(!showSearch);
  };
  return (
    <ShopStack.Navigator
      initialRouteName="ItemList"
      screenOptions={{
        headerLeft: () => (
          <TouchableOpacity
            style={styles.menuIcon}
            onPress={_onShowSearchInput}>
            <IconFontAwesome name="search" size={20} color="#F5F3F4" />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#161A1D',
          borderWidth: 0,
          shadowOffset: {width: 0, height: 0},
        },
        headerTitleStyle: {
          color: '#fefae0',
        },
        headerRight: () => (
          <TouchableOpacity>
            <Image
              resizeMode="cover"
              style={styles.logoHeader}
              source={require('../../static/images/drawer/heriaAva.png')}
            />
          </TouchableOpacity>
        ),
        // headerShown: false,
      }}>
      <ShopStack.Screen
        name="ItemList"
        component={Shop}
        options={{title: 'Calis Shop'}}
      />
      <ShopStack.Screen
        name="ItemDetails"
        component={ItemDetails}
        options={{
          headerShown: false,
        }}
      />
      <ShopStack.Screen
        name="RecommendItemDetails"
        component={RecommendItemDetails}
        options={{
          headerShown: false,
        }}
      />
    </ShopStack.Navigator>
  );
}

function Shop({navigation}) {
  const heightOfHeder = useHeaderHeight();
  const loadingAni = new Animated.Value(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const scrollX2 = React.useRef(new Animated.Value(0)).current;
  const flashAnimation = React.useRef(
    new Animated.ValueXY({x: 0, y: SLASH_ANI_HEIGHT}),
  ).current;
  const rotateA = React.useRef(new Animated.Value(0)).current;
  const roateAni = rotateA.interpolate({
    inputRange: [0, 4, 5, 6, 10],
    outputRange: ['0deg', '180deg', '180deg', '180deg', '360deg'],
  });

  const [, setHeaderHeight] = useContext(HeaderHeight);
  const [items, setListItem] = useState([]);
  const [shopItems, setListShopItem] = useState([]);
  const [recommendItem, setRecommendItem] = useState({});

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateA, {
        toValue: 10,
        duration: 13000,
        useNativeDriver: true,
      }),
    ).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(4000),
        Animated.timing(flashAnimation, {
          toValue: {x: 0, y: -SLASH_ANI_HEIGHT},
          duration: 400,
          useNativeDriver: false,
        }),
        Animated.timing(flashAnimation, {
          toValue: {x: 0, y: SLASH_ANI_HEIGHT},
          duration: 0,
          useNativeDriver: false,
        }),
      ]),
    ).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setHeaderHeight(heightOfHeder);
  }, [heightOfHeder, setHeaderHeight]);

  useEffect(() => {
    Axios.get('v2/items/upcoming?lang=en').then(res => {
      setListItem([
        {key: 'leftspacer', id: 'lspacer'},
        ...res.data.items,
        {key: 'rightspacer', id: 'rspacer'},
      ]);
    });
  }, []);

  useEffect(() => {
    Axios.get('v2/shop?lang=en').then(res => {
      setListShopItem([
        {key: 'leftspacer', mainId: 'lspacer'},
        ...res.data.shop.slice(0, res.data.shop.length > 20 ? 20 : 5),
        {key: 'rightspacer', mainId: 'rspacer'},
      ]);
    });
  }, []);

  useEffect(() => {
    Axios.get(
      'v2/items/get?id=CID_242_Athena_Commando_F_Bullseye&lang=en',
    ).then(res => {
      setRecommendItem(res.data.item);
    });
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadingAnimation = () => {
    Animated.sequence([
      Animated.timing(loadingAni, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(loadingAni, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      loadingAnimation();
    });
  };

  useEffect(() => {
    loadingAnimation();
  }, [loadingAnimation]);

  return (
    <ScrollView style={styles.shopWrapper}>
      <View style={styles.bannerWrapper}>
        <Text style={styles.titleShop}>Discovery Heria Shop</Text>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('https://www.youtube.com/user/TheMiamiTrainer');
          }}>
          <Image
            style={styles.bannerShop}
            resizeMode="cover"
            source={require('../../static/images/shop-images/shopBanner.jpeg')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.contentWrapper}>
        <View style={[styles.categoryShopWrapper]}>
          <View style={styles.recommendSection}>
            <Text style={styles.recommendTtitle}>Daily Recommend</Text>
            {recommendItem?.images?.background ? (
              <>
                <TouchableHighlight
                  onPress={() => {
                    navigation.navigate('RecommendItemDetails', {
                      recommendItem,
                      width,
                    });
                  }}>
                  <Animated.View
                    style={[
                      styles.imageWrapper,
                      {
                        transform: [
                          {
                            rotateY: roateAni,
                          },
                        ],
                      },
                    ]}
                    removeClippedSubviews={true}>
                    <SharedElement id={recommendItem.id}>
                      <Image
                        source={{uri: recommendItem.images.background}}
                        resizeMode="cover"
                        style={[
                          styles.recommentImage,
                          // {
                          //   transform: [
                          //     {
                          //       rotateY: roateAni,
                          //     },
                          //   ],
                          // },
                        ]}
                      />
                    </SharedElement>

                    <Animated.View
                      style={[
                        flashAnimation.getLayout(),
                        styles.slashImage,
                        // {
                        //   top: flashAnimation.interpolate({
                        //     inputRange: [0, 1],
                        //     outputRange: ['-85%', '85%'],
                        //   }),
                        // },
                      ]}
                      pointerEvents="none"
                    />
                  </Animated.View>
                </TouchableHighlight>

                <Text style={styles.recommentName}>{recommendItem.name}</Text>
              </>
            ) : (
              <Animated.View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  opacity: loadingAni.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                  alignItems: 'center',
                }}>
                <IconFontAwesome name="bomb" size={30} color="#A4161A" />
                <Text
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    color: '#fff',
                    marginTop: 10,
                  }}>
                  Loading...
                </Text>
              </Animated.View>
            )}
          </View>
          <Text style={styles.titleCagetory}>Calisthenics</Text>
          {items.length ? (
            <Animated.FlatList
              showsHorizontalScrollIndicator={false}
              snapToInterval={ITEM_SIZE}
              decelerationRate={0}
              bounces={false}
              data={items}
              keyExtractor={item => item.id}
              horizontal
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {useNativeDriver: true},
              )}
              scrollEventThrottle={16}
              // eslint-disable-next-line react-native/no-inline-styles
              contentContainerStyle={{
                alignItems: 'center',
                paddingTop: 35,
              }}
              renderItem={({item, index}) => {
                if (!item.images) {
                  return (
                    <View
                      // eslint-disable-next-line react-native/no-inline-styles
                      style={{
                        width: (width - ITEM_SIZE) / 2 - 10,
                        paddingHorizontal: 10,
                      }}
                    />
                  );
                }
                const inputRange = [
                  (index - 2) * ITEM_SIZE,
                  (index - 1) * ITEM_SIZE,
                  index * ITEM_SIZE,
                ];
                const translateY = scrollX.interpolate({
                  inputRange,
                  outputRange: [0, -35, 0],
                });
                return (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ItemDetails', {item})}>
                    <Item item={item} translateY={translateY} />
                  </TouchableOpacity>
                );
              }}
            />
          ) : (
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                height: 377,
                backgroundColor: '#1f1f1f',
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 10,
              }}>
              <Animated.View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  opacity: loadingAni.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                  alignItems: 'center',
                }}>
                <IconFontAwesome name="bomb" size={30} color="#A4161A" />
                <Text
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    color: '#fff',
                    marginTop: 10,
                  }}>
                  Loading...
                </Text>
              </Animated.View>
            </View>
          )}
          <LinearGradient
            colors={[
              'transparent',
              'transparent',
              HIGHLIGHT_FONT_COLOR,
              '#000',
            ]}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              position: 'absolute',
              width: width - 25,
              height: BACKDROP_HEIGHT,
              left: 0,
              bottom: 0,
              zIndex: -1,
            }}
            pointerEvents="none"
          />
        </View>
        <View style={[styles.categoryShopWrapper]}>
          <Text style={styles.titleCagetory}>Boxing</Text>
          {shopItems.length ? (
            <Animated.FlatList
              showsHorizontalScrollIndicator={false}
              snapToInterval={ITEM_SIZE}
              decelerationRate={0}
              bounces={false}
              data={shopItems}
              keyExtractor={item => item.mainId}
              horizontal
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX2}}}],
                {useNativeDriver: true},
              )}
              scrollEventThrottle={16}
              // eslint-disable-next-line react-native/no-inline-styles
              contentContainerStyle={{
                alignItems: 'center',
                paddingTop: 35,
              }}
              renderItem={({item, index}) => {
                if (!item.displayAssets) {
                  return (
                    <View
                      // eslint-disable-next-line react-native/no-inline-styles
                      style={{
                        width: (width - ITEM_SIZE) / 2 - 10,
                        paddingHorizontal: 10,
                      }}
                    />
                  );
                }
                const inputRange = [
                  (index - 2) * ITEM_SIZE,
                  (index - 1) * ITEM_SIZE,
                  index * ITEM_SIZE,
                ];
                const translateY = scrollX2.interpolate({
                  inputRange,
                  outputRange: [0, -35, 0],
                });
                return (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ItemDetails', {item})}>
                    <Item
                      item={item}
                      isSetItem={true}
                      translateY={translateY}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          ) : (
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                height: 377,
                backgroundColor: '#1f1f1f',
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 10,
              }}>
              <Animated.View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  opacity: loadingAni.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                  alignItems: 'center',
                }}>
                <IconFontAwesome name="bomb" size={30} color="#A4161A" />
                <Text
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    color: '#fff',
                    marginTop: 10,
                  }}>
                  Loading...
                </Text>
              </Animated.View>
            </View>
          )}
          <LinearGradient
            colors={[
              'transparent',
              'transparent',
              HIGHLIGHT_FONT_COLOR,
              '#000',
            ]}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              position: 'absolute',
              width: width - 25,
              height: BACKDROP_HEIGHT,
              left: 0,
              bottom: 0,
              zIndex: -1,
            }}
            pointerEvents="none"
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default RouteShop;

const styles = StyleSheet.create({
  shopWrapper: {
    flex: 1,
    backgroundColor: '#000',
    marginBottom: 55,
  },
  titleShop: {
    color: '#A4161A',
    fontSize: 25,
    fontWeight: '800',
    borderRadius: 5,
  },
  bannerWrapper: {
    alignItems: 'center',
    marginVertical: 20,
  },
  bannerShop: {
    marginTop: 10,
    width: 320,
    height: 88,
  },
  contentWrapper: {
    marginHorizontal: 12,
  },
  titleCagetory: {
    fontWeight: '700',
    fontSize: 20,
    color: '#fff',
    textTransform: 'uppercase',
    marginBottom: 10,
    textShadowColor: '#A4161A',
    textShadowOffset: {width: -1, height: -1},
    textShadowRadius: 10,
  },
  categoryShopWrapper: {
    marginVertical: 10,
    marginBottom: 20,
  },
  recommendSection: {
    alignItems: 'center',
    marginHorizontal: 12,
    shadowColor: HIGHLIGHT_FONT_COLOR,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
  },
  recommendTtitle: {
    color: '#fff',
    fontSize: 23,
    fontWeight: '700',
    marginBottom: 10,
    textShadowColor: '#A4161A',
    textShadowOffset: {width: -1, height: -1},
    textShadowRadius: 10,
    paddingHorizontal: 10,
  },
  imageWrapper: {
    width: ITEM_SIZE + 20,
    height: BACKDROP_HEIGHT - 70,
    overflow: 'hidden',
  },
  recommentImage: {
    width: '100%',
    height: '100%',
  },
  recommentName: {
    color: HIGHLIGHT_FONT_COLOR,
    fontWeight: '800',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  slashImage: {
    position: 'absolute',
    width: ITEM_SIZE + 20,
    height: '100%',
    backgroundColor: '#fff',
    transform: [{skewX: '60deg'}, {skewY: '60deg'}],
    borderRadius: (ITEM_SIZE + 20) / 2,
    opacity: 0.6,
  },
  detailPageWapper: {},
  logoHeader: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 12,
  },
  menuIcon: {
    marginLeft: 12,
  },
});
