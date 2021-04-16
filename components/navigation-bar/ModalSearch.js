import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Animated,
} from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

import {RoutingDetail} from '../../contextApi/DetailRouteContext';
import {HeaderHeight} from '../../contextApi/DetailHeaderHeightContext';

function ModalSearch() {
  const [, , showSearch] = useContext(RoutingDetail);
  const [headerHeight] = useContext(HeaderHeight);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const opaAnimation = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(opaAnimation, {
      toValue: showSearch ? 1 : isFirstRender === true ? 1 : 0,
      duration: 350,
      delay: 0,
      useNativeDriver: false,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSearch, isFirstRender]);

  useEffect(() => {
    showSearch === true && setIsFirstRender(false);
  }, [showSearch]);

  return (
    <Animated.View
      style={[
        styles.modalWrapper,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          position: 'absolute',
          top: headerHeight,
          left: 0,
          width: '100%',
          opacity: opaAnimation,
        },
      ]}>
      <View
        style={styles.searchWrapper}
        pointerEvents={showSearch ? 'auto' : 'none'}>
        <Text style={styles.searchText}>What are you searching for?</Text>
        <View style={styles.searchArea}>
          <TextInput style={styles.searchInput} placeholder="Search here..." />
          <TouchableHighlight style={styles.findBtn}>
            <IconFontAwesome
              style={styles.findIcon}
              name="search"
              size={20}
              color="#F5F3F4"
            />
          </TouchableHighlight>
        </View>
      </View>
    </Animated.View>
  );
}

export default ModalSearch;

const styles = StyleSheet.create({
  modalWrapper: {
    backgroundColor: '#161A1D',
    paddingVertical: 12,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  searchWrapper: {
    marginHorizontal: 12,
  },
  searchArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 6,
    backgroundColor: 'transparent',
    color: '#fff',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#fff',
    padding: 5,
    textAlign: 'center',
  },
  searchText: {
    color: '#F5F3F4',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  findBtn: {
    flex: 1,
  },
  findIcon: {
    textAlign: 'center',
  },
});
