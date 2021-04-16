import React, {useState, useEffect, useContext} from 'react';

import {UserContext} from '../../contextApi/UserContext';

import {
  StyleSheet,
  Image,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

import {Avatar, Title, Caption, Drawer, Text} from 'react-native-paper';

function DrawerContent({props, navigation}) {
  const [username] = useContext(UserContext);
  let pageIndexx = navigation.dangerouslyGetState().index;
  const [pageIndex, setPageIndex] = useState(0);

  const _onLoginLogout = () => {
    Alert.alert('Log Out', 'Do you sure to log out?', [
      {
        text: 'Log out',
        onPress: () => Alert.alert('Logged out'),
        // style: styles.logoutBtn,
      },
      {
        text: 'Cancel',
        // style: styles.cancelBtn,
      },
    ]);
  };

  useEffect(() => {
    setPageIndex(pageIndexx);
  }, [pageIndexx]);

  return (
    <SafeAreaView style={styles.drawerFrame}>
      <View style={styles.logoWrapper}>
        <Image
          resizeMode="cover"
          style={styles.logoHeader}
          source={{
            uri:
              'https://fsa.zobj.net/crop.php?r=P2jCkF1GoRkXgDkS3Azd4Wp7GcGGsnDjJ2UdnyhoJVILqfGgKf_G95LKDgJgU5eVpZ921S0JRArauZRcB2heikfEw8ovkryo2AQnE2Jc44_rUVU2f_7Kuf2r14EzPYM63tcAPgEy4KoUUoKkj-BaDBZBKtI3lpt72IeZpsLLXwE6LIGe-pKFam7-W0idTeCuLerDULup6AgVFBZS',
          }}
        />
      </View>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.generalInfo}>
            <View>
              <Avatar.Image
                source={require('../../static/images/drawer/heriaAva.png')}
                size={40}
              />
            </View>
            <View style={styles.userContent}>
              <Title style={styles.userTitle}>
                {username.length ? username : 'Heria Chris'}
              </Title>
              <Caption style={styles.userCaption}>
                Nothing is impossible
              </Caption>
            </View>
          </View>
          <View style={styles.majorWrapper}>
            <Text style={styles.majorText}>Majors</Text>
            <View style={styles.majorWrapperInside}>
              <TouchableOpacity style={styles.majorItem}>
                <View>
                  <Text style={styles.majorTitle}>Calisthenics</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.majorItem}>
                <View>
                  <Text style={styles.majorTitle}>Swim</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.majorItem}>
                <View>
                  <Text style={styles.majorTitle}>Run</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.majorItem}>
                <View>
                  <Text style={styles.majorTitle}>Boxing</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Drawer.Section>
          <DrawerItem
            onPress={() => {
              navigation.navigate('Introdution');
            }}
            label="Introdution"
            icon={() => (
              <IconFontAwesome
                style={styles.menuIcon}
                name="paper-plane"
                size={20}
                color="#808080"
              />
            )}
            style={[styles.drawerItemStyle, pageIndex === 0 && styles.active]}
            labelStyle={styles.drawerLabelStyle}
            activeBackgroundColor="#200"
          />
          <DrawerItem
            onPress={() => {
              navigation.navigate('Home');
            }}
            label="Home"
            icon={() => (
              <IconFontAwesome
                style={styles.menuIcon}
                name="home"
                size={20}
                color="#808080"
              />
            )}
            style={[styles.drawerItemStyle, pageIndex === 1 && styles.active]}
            labelStyle={styles.drawerLabelStyle}
            activeBackgroundColor="#200"
          />
          <DrawerItem
            label="Profile"
            icon={() => (
              <IconFontAwesome
                style={styles.menuIcon}
                name="user"
                size={20}
                color="#808080"
              />
            )}
            style={styles.drawerItemStyle}
            labelStyle={styles.drawerLabelStyle}
            activeBackgroundColor="#200"
          />
          <DrawerItem
            label="Settings"
            icon={() => (
              <IconFontAwesome
                style={styles.menuIcon}
                name="cog"
                size={20}
                color="#808080"
              />
            )}
            style={styles.drawerItemStyle}
            labelStyle={styles.drawerLabelStyle}
            activeBackgroundColor="#200"
          />
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section>
        <DrawerItem
          label="Sign Out"
          icon={() => (
            <IconFontAwesome
              style={styles.menuIcon}
              name="minus-circle"
              size={20}
              color="#900"
            />
          )}
          style={[styles.drawerItemStyle, styles.drawerItemLogIO]}
          labelStyle={[styles.drawerLabelStyle, styles.drawerSignoutLabelStyle]}
          onPress={_onLoginLogout}
        />
      </Drawer.Section>
    </SafeAreaView>
  );
}

export default DrawerContent;

const styles = StyleSheet.create({
  logoHeader: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  drawerFrame: {
    flex: 1,
    backgroundColor: '#000',
  },
  logoWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  text: {
    color: '#fff',
  },
  drawerItemStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#121212',
    borderStyle: 'solid',
  },
  drawerItemLogIO: {
    borderBottomWidth: 0,
  },
  drawerLabelStyle: {
    color: '#808080',
  },
  drawerSignoutLabelStyle: {
    color: '#900',
  },
  drawerContent: {
    marginHorizontal: 12,
  },
  menuIcon: {
    width: 20,
    height: 20,
  },
  generalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  userContent: {
    marginHorizontal: 12,
  },
  userTitle: {
    color: '#808080',
    marginBottom: 10,
  },
  userCaption: {
    color: '#fff',
  },
  majorWrapper: {
    marginVertical: 20,
  },
  majorWrapperInside: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  majorText: {
    color: '#fff',
    marginBottom: 10,
  },
  majorItem: {
    backgroundColor: '#808080',
    padding: 10,
    borderRadius: 15,
    opacity: 0.5,
    marginRight: 5,
    marginBottom: 5,
  },
  majorTitle: {
    color: '#fff',
  },
  active: {
    backgroundColor: '#121212',
  },
});
