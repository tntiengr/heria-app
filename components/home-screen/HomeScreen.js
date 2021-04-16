import React, {useState, useContext, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import {UserContext} from '../../contextApi/UserContext';

import {
  Alert,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  ScrollView,
  Animated,
} from 'react-native';

const {height, width} = Dimensions.get('window');

function HomeScreen({navigation}) {
  const [userText, setUserText] = useState('');
  const [username, setUsername] = useContext(UserContext);

  const _onJoin = () => {
    setUsername(userText);
    setUserText('');
  };
  const _onChangeUsername = name => {
    setUserText(name);
  };

  const _onDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const _onArlertPrompt = () => {
    Alert.alert('title', 'body', [{text: 'yes'}, {text: 'no'}]);
  };

  const _openDrawer = () => {
    navigation.toggleDrawer();
  };

  const value = useState(new Animated.ValueXY({x: 0, y: 0}))[0];

  useEffect(() => {
    Animated.timing(value, {
      toValue: {x: Number(`-${width}`), y: 0},
      duration: 1000,
      useNativeDriver: false,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.mainView}>
      <ScrollView>
        <TouchableWithoutFeedback onPress={_onDismissKeyboard}>
          <View style={styles.app}>
            <Image
              resizeMode="cover"
              style={styles.bgImg}
              source={{
                uri:
                  'https://fsa.zobj.net/crop.php?r=P2jCkF1GoRkXgDkS3Azd4Wp7GcGGsnDjJ2UdnyhoJVILqfGgKf_G95LKDgJgU5eVpZ921S0JRArauZRcB2heikfEw8ovkryo2AQnE2Jc44_rUVU2f_7Kuf2r14EzPYM63tcAPgEy4KoUUoKkj-BaDBZBKtI3lpt72IeZpsLLXwE6LIGe-pKFam7-W0idTeCuLerDULup6AgVFBZS',
              }}
            />
            <Icon
              onPress={_openDrawer}
              style={styles.menuBar}
              name="bars"
              size={25}
              color="#900"
            />
            <View style={styles.header}>
              <Image
                style={styles.logo}
                source={{
                  uri: 'https://www.heriapro.com/android-icon-192x192.png',
                }}
              />
              <Text style={styles.heriaApp}>Heria Pro</Text>
            </View>
            <Animated.View style={[value.getLayout(), {position: 'absolute'}]}>
              <View style={styles.slashAniWrapper} />
            </Animated.View>
            <Text style={styles.title}>
              {username.length
                ? `Welcome ${username}`
                : 'Welcome elite athletics'}
            </Text>
            <View style={styles.groupButton}>
              <TouchableOpacity
                style={styles.btnWrapper}
                onPress={() => {
                  console.log('abc');
                }}>
                <Text style={[styles.buttonText, styles.btn1]}>
                  Parallettes
                </Text>
                <View style={styles.haftButton} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnWrapper}
                onPress={_onArlertPrompt}>
                <Text
                  style={[styles.buttonText, styles.btn2]}
                  accessibilityLabel="Learn more about this button">
                  HandTieing
                </Text>
                <View style={styles.haftButton} />
              </TouchableOpacity>
            </View>
            <View style={styles.groupButton}>
              <TouchableOpacity
                style={styles.btnWrapper}
                onPress={() => {
                  Alert.alert(
                    `Screen width: is ${Dimensions.get('screen').width}`,
                  );
                }}>
                <Text style={[styles.buttonText, styles.btn3]}>Joggers</Text>
                <View style={styles.haftButton} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnWrapper}
                onPress={() => {
                  Alert.alert('Sorry, this product is not avilable now.');
                }}>
                <Text
                  style={[styles.buttonText, styles.btn4]}
                  accessibilityLabel="Learn more about this button">
                  HeriaShirt
                </Text>
                <View style={styles.haftButton} />
              </TouchableOpacity>
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.userInput}
                placeholder={'your name is?'}
                maxLength={20}
                onChangeText={_onChangeUsername}
                value={userText}
              />
            </View>
            <TouchableHighlight onPress={_onJoin}>
              <Text style={styles.joinBtn}>Join Now</Text>
            </TouchableHighlight>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#000',
  },
  app: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  bgImg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.15,
  },
  slashAniWrapper: {
    position: 'absolute',
    width: width,
    height: height,
    backgroundColor: '#000',
  },
  logo: {
    width: 80,
    height: 80,
  },
  header: {
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    marginTop: 85,
  },
  heriaApp: {
    color: '#fff',
    marginTop: 10,
  },
  title: {
    fontSize: 27,
    textTransform: 'uppercase',
    color: '#fff',
    paddingBottom: 20,
  },
  groupButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: "center",
    flexWrap: 'wrap',
    width: '100%',
    // alignItems: "center",
  },
  buttonText: {
    color: '#fff',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    textAlign: 'center',
    width: '100%',
  },
  btnWrapper: {
    width: '35%',
    margin: 5,
    marginBottom: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  haftButton: {
    width: '150%',
    height: '100%',
    position: 'absolute',
    top: '70%',
    left: '-8%',
    backgroundColor: 'rgba(0,0,0,0.25)',
    transform: [{rotate: '15deg'}],
  },
  inputWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginTop: 30,
  },
  userInput: {
    backgroundColor: 'transparent',
    color: '#fff',
    width: '50%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#fff',
    padding: 2,
    textAlign: 'center',
  },
  joinBtn: {
    color: '#fff',
    position: 'relative',
    top: 15,
    textDecorationLine: 'underline',
  },
  menuBar: {position: 'absolute', top: 10, left: 20, padding: 10},
});

export default HomeScreen;
