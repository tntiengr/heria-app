import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Animated} from 'react-native';

function Excercise() {
  const rotateA = React.useRef(new Animated.Value(0)).current;
  const roateAni = rotateA.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  useEffect(() => {
    Animated.timing(rotateA, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.excercisesWrapper}>
      <Text style={styles.titleExercises}>This is Excercise</Text>
      <Animated.View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          backgroundColor: 'red',
          width: 50,
          height: 50,
          transform: [
            {
              rotateY: roateAni,
            },
          ],
        }}
      />
    </View>
  );
}

export default Excercise;

const styles = StyleSheet.create({
  excercisesWrapper: {
    backgroundColor: '#000',
    flex: 1,
  },
  titleExercises: {
    color: '#fff',
  },
});
