import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, Platform, View, Image } from 'react-native';
import font from '../theme/font';
import SvgIndex from '../assets/svgIndex';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Inbox from '../screen/BottomTab/Inbox/Inbox';
import InstistionHome from '../screen/InstitutionTab/HomeInstiustion/Home/InstitutionHome';
import UserProfile from '../screen/BottomTab/Profile/UserProfile';
import ShiftBooking from '../screen/InstitutionTab/ShiftBooking/ShiftBooking';

const Tab = createBottomTabNavigator();

// ---------------- CONFIG ----------------
const TAB_CONFIG = {
  Orders: {
    label: 'Home',
    iconActive: SvgIndex.HomeAtive,
    iconInactive: SvgIndex.Home,
  },
  Booking: {
    label: 'Booking',
    iconActive: SvgIndex.Box,
    iconInactive: SvgIndex.Box1,
  },
  Inbox: {
    label: 'Inbox',
    iconActive: SvgIndex.MessageActive,
    iconInactive: SvgIndex.Message,
  },
  Profile: {
    label: 'Profile',
    iconActive: SvgIndex.UserActive,
    iconInactive: SvgIndex.User,
  },
};

const TAB_BAR_HEIGHT = Platform.OS === 'ios' ? 70 : 65;
const ICON_SIZE = 26;

// ---------------- MAIN COMPONENT ----------------

export default function DeliveryTabNavigator() {
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
                fontSize: 11,
                marginTop: 4,
                fontFamily: font.MonolithRegular,
                color: focused ? '#F3178B' : '#2F4858',
              }}
            >
              {tab?.label ?? route.name}
            </Text>
          ),

          tabBarIcon: ({ focused }) => {
            const Icon = focused ? tab.iconActive : tab.iconInactive;

            return typeof Icon === 'function' ? (
              <Icon width={ICON_SIZE} height={ICON_SIZE} />
            ) : (
              <Image
                source={Icon}
                style={{
                  width: ICON_SIZE,
                  height: ICON_SIZE,
                  resizeMode: 'contain',
                }}
              />
            );
          },

          // ---- UI STYLING ----
          tabBarStyle: {
            position: 'absolute',
            left: 20,
            right: 20,
            bottom: 10,

            height: TAB_BAR_HEIGHT + insets.bottom,
            paddingBottom: insets.bottom,
            paddingTop: 8,

            backgroundColor: 'white',

            borderRadius: 16,
            borderWidth: 1,
            borderColor: 'rgba(125, 154, 155, 0.12)',

            // shadow for iOS
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.12,
            shadowRadius: 6,

            // elevation for Android
            elevation: 6,
          },
        };
      }}
    >
      <Tab.Screen name="Orders" component={InstistionHome} />
      <Tab.Screen name="Booking" component={ShiftBooking} />
      <Tab.Screen name="Inbox" component={Inbox} />
      <Tab.Screen name="Profile" component={UserProfile} />
    </Tab.Navigator>
  );
}
