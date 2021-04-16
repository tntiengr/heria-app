import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';

const {width} = Dimensions.get('window');
const ITEM_SIZE = width * 0.64;

function Item({item, isItem = true, isSetItem = false, translateY}) {
  return (
    <Animated.View style={[styles.itemWrapper, {transform: [{translateY}]}]}>
      <View style={styles.content}>
        {!isSetItem ? (
          <>
            <SharedElement id={`item${item.id}.background`}>
              <Image
                style={styles.itemCover}
                source={{uri: item.images.background}}
                resizeMode="cover"
              />
            </SharedElement>

            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text style={styles.des} numberOfLines={1}>
              {item.description}
            </Text>
            <Text style={styles.price}>${item.price}</Text>
          </>
        ) : (
          <>
            <SharedElement id={`setItem${item.id}.background`}>
              <Image
                style={styles.itemCover}
                source={{uri: item.displayAssets[0].background}}
                resizeMode="cover"
              />
            </SharedElement>

            <Text style={styles.itemTitle}>{item.displayName}</Text>
            <Text style={styles.des} numberOfLines={1}>
              {item.granted[0].description}
            </Text>
            <Text style={styles.price}>${item.price.finalPrice || 0}</Text>
          </>
        )}
      </View>
    </Animated.View>
  );
}

export default Item;

const styles = StyleSheet.create({
  itemWrapper: {
    paddingHorizontal: 10,
    width: ITEM_SIZE,
    // alignItems: 'center',
    // backgroundColor: '#1f1f1f',
    // borderRadius: 5,
    // paddingBottom: 20,
    shadowColor: '#4895ef',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  content: {
    alignItems: 'center',
    backgroundColor: '#1f1f1f',
    borderRadius: 5,
    paddingBottom: 20,
  },
  itemTitle: {
    color: '#F5F3F4',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },
  itemCover: {
    marginVertical: 10,
    width: ITEM_SIZE - 40,
    height: 220,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  des: {
    color: '#D3D3D3',
    fontSize: 17,
  },
  price: {
    color: '#ffecd1',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
