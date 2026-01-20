import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, Platform, Image } from 'react-native';
import ScreenNameEnum from '../routes/screenName.enum';
import HomeStack from './HomeStack';
import SvgIndex from '../assets/svgIndex';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import UserProfile from '../screen/BottomTab/Profile/UserProfile';
import ChatInboxScreen from '../screen/BottomTab/Inbox/Inbox';
import ShiftsScreen from '../screen/BottomTab/Shifts/ShiftsScreen';
import { color } from '../constant';
import { language } from '../constant/Language';

const Tab = createBottomTabNavigator();
const labels = language.fi;

const TAB_CONFIG: any = {
  [ScreenNameEnum.HomeStack]: {
    label: labels.home,
    iconActive: SvgIndex.HomeAtive,
    iconInactive: SvgIndex.Home,
  },

  Booking: {
    label: labels.shiftsHeader,
    iconActive: SvgIndex.Box,
    iconInactive: SvgIndex.Box1,
  },
  Chat: {
    label: labels.inbox,
    iconActive: SvgIndex.MessageActive,
    iconInactive: SvgIndex.Message,
  },
  Profile: {
    label: labels.profile,
    iconActive: SvgIndex.UserActive,
    iconInactive: SvgIndex.User,
  },
};

const TAB_BAR_HEIGHT = Platform.OS === 'ios' ? 80 : 70;
const ICON_SIZE = 26;

export default function TabNavigator() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const tab = TAB_CONFIG[route.name];
        return {
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 13,
                color: focused ? color.primary : '#2F4858',
                marginTop: 4,
                fontWeight: "500"
              }}
            >
              {tab?.label ?? route.name}
            </Text>
          ),
          tabBarIcon: ({ focused }) => {
            const Icon = focused ? tab.iconActive : tab.iconInactive;
            if (typeof Icon === 'function') {
              return <Icon width={ICON_SIZE} height={ICON_SIZE} />;
            } else {
              return (
                <Image
                  source={Icon}
                  style={{
                    width: ICON_SIZE,
                    height: ICON_SIZE,
                    resizeMode: 'contain',
                  }}
                />
              );
            }
          },
          tabBarStyle: {
            position: 'absolute',
            left: 20,
            right: 20,
            backgroundColor: 'white', // your desired background
            height: TAB_BAR_HEIGHT + insets.bottom, // safe height including bottom inset
            paddingBottom: insets.bottom,
            paddingTop: 8,

            // Rounded corners
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,

            // Borders

            borderTopColor: 'rgba(125, 154, 155, 0.15)',
            borderLeftColor: 'rgba(125, 154, 155, 0.15)',
            borderRightColor: 'rgba(125, 154, 155, 0.15)',

            // Optional shadow for iOS
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 4,

            // Optional elevation for Android
            elevation: 4,


          },
        };
      }}
    >
      <Tab.Screen name={ScreenNameEnum.HomeStack} component={HomeStack} />
      {/* <Tab.Screen name="MyTrack" component={MyTrack} /> */}
      <Tab.Screen name="Booking" component={ShiftsScreen} />
      <Tab.Screen name="Chat" component={ChatInboxScreen} />
      <Tab.Screen name="Profile" component={UserProfile} />
    </Tab.Navigator>
  );
}
