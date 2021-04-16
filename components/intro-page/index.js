import React, {useEffect, useState} from 'react';

import {StyleSheet, View, Dimensions, Text, Animated} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import {Easing} from 'react-native-reanimated';

import Video from 'react-native-video';

const {height} = Dimensions.get('window');
function IntroPage({navigation}) {
  const [pause, setPause] = useState(false);
  const _onExploreUs = () => {
    setPause(true);
    navigation.navigate('Detail');
  };
  const fadeInText = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeInText, {
      toValue: 1,
      delay: 1000,
      duration: 2000,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  useEffect(() => {
    const blur = navigation.addListener('blur', () => {
      setPause(true);
    });

    const focus = navigation.addListener('focus', () => {
      setPause(false);
    });

    // eslint-disable-next-line no-sequences
    return blur, focus;
  }, [navigation]);
  return (
    <View style={styles.homeWrapper}>
      <Video
        source={require('../../static/videos/bgrVid.mp4')}
        style={styles.backgroundVideo}
        repeat={true}
        muted={true}
        resizeMode={'cover'}
        rate={1.0}
        ignoreSilentSwitch={'obey'}
        paused={pause}
      />
      <Animated.View style={[styles.thenixIntroPage, {opacity: fadeInText}]}>
        <Text style={styles.welcomeText}>Welcome to thenix</Text>
        <TouchableRipple onPress={_onExploreUs}>
          <Text style={styles.exploreText}>touch here to explore...</Text>
        </TouchableRipple>
      </Animated.View>
    </View>
  );
}

export default IntroPage;

const styles = StyleSheet.create({
  homeWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thenixIntroPage: {
    flex: 1,
    justifyContent: 'center',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    alignItems: 'stretch',
    height: height,
  },
  welcomeText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
    color: '#fff',
  },
  exploreText: {
    padding: 20,
    backgroundColor: '#000',
    opacity: 0.5,
    color: '#fff',
  },
});
