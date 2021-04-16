import React from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

function ArrowBack({navigation}) {
  return (
    <TouchableOpacity
      style={styles.arrowBack}
      onPress={() => navigation.goBack()}>
      <View>
        <IconFontAwesome name="chevron-circle-left" size={25} color="#F5F3F4" />
      </View>
    </TouchableOpacity>
  );
}

export default ArrowBack;

const styles = StyleSheet.create({
  arrowBack: {
    position: 'absolute',
    left: 12,
    top: 20,
    zIndex: 1,
    padding: 10,
  },
});
