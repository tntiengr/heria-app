import React from 'react';
import {ScrollView, View, StyleSheet, Text, Image} from 'react-native';

import {SharedElement} from 'react-navigation-shared-element';

import ArrowBack from '../../navigation-bar/ArrowBack';

function RecommendItemDetails({navigation, route}) {
  const {recommendItem, width} = route.params;

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.wrapper}>
        <ArrowBack navigation={navigation} />
        <SharedElement id={recommendItem.id}>
          <Image
            style={{width, height: width - 20}}
            source={{uri: recommendItem?.images?.background}}
            resizeMode="cover"
          />
        </SharedElement>

        <View style={styles.contentView}>
          <Text style={styles.name}>{recommendItem?.name}</Text>
          <Text style={styles.des}>{recommendItem?.description}</Text>
          <Text style={styles.price}>${recommendItem?.price}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

RecommendItemDetails.sharedElements = (route, otherRoute, showing) => {
  const item = route.params.recommendItem;
  return [item.id];
};

export default RecommendItemDetails;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#000',
    marginBottom: 55,
  },
  // itemImage: {
  //   width: width,
  //   height: width - 20,
  // },
  contentView: {
    padding: 12,
  },
  name: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 25,
    marginBottom: 10,
  },
  des: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 18,
    marginBottom: 5,
  },
  price: {
    color: '#ffecd1',
    fontWeight: '800',
    fontSize: 20,
  },
});
