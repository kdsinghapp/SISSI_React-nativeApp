import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import imageIndex from "../../../assets/imageIndex";
import font from "../../../theme/font";
import LogoutModal from "../../../compoent/LogoutModal";
import CustomButton from "../../../compoent/CustomButton";
import ScreenNameEnum from "../../../routes/screenName.enum";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [logoutModal, setLogoutModal] = useState(false);

  /* -------- MENU DATA ARRAY -------- */
  const menuData = [
    {
      id: "1",
      title: "My Profile",
      icon: imageIndex.P1,
      screen: ScreenNameEnum.EditProfile,
    },
    {
      id: "2",
      title: "Favorite Institutions",
      icon: imageIndex.P1,
      screen: ScreenNameEnum.FavoriteScreen,
    },
    {
      id: "3",
      title: "Notifications",
      icon: imageIndex.P1,
      screen: ScreenNameEnum.NotificationsSetting,
    },
    {
      id: "4",
      title: "About Us",
      icon: imageIndex.P1,
      screen: ScreenNameEnum.PrivacyPolicy,
    },
    {
      id: "5",
      title: "Privacy Policy",
      icon: imageIndex.P1,
      screen: ScreenNameEnum.PrivacyPolicy,
    },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* TITLE */}
        <Text style={styles.profileTitle}>Profile</Text>

        {/* USER CARD */}
        <View style={styles.userCard}>
          <View>
            <Image
              source={{ uri: "https://i.pravatar.cc/300" }}
              style={styles.avatar}
            />
          </View>

          <View style={{ marginLeft: 15 }}>
            <Text style={styles.userName}>Ashlynn Bergson</Text>
            <Text style={styles.username}>@Ashlynn</Text>
          </View>
        </View>

        {/* MENU FLATLIST */}
        <View style={styles.menuCard}>
          <FlatList
            data={menuData}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            // ItemSeparatorComponent={() => <Divider />}
            renderItem={({ item }:any) => (
              <MenuItem
                title={item.title}
                icon={item.icon}
                // onPress={() => navigation.navigate(item.screen)}
              />
            )}
          />
        </View>

        {/* LOGOUT BUTTON */}
        <View style={{ marginTop: 20 }}>
          <CustomButton title="Logout"  
          button1={{ backgroundColor: "#FF383C" }}
          onPress={() => setLogoutModal(true)} />
        </View>

        <LogoutModal
          visible={logoutModal} 
          onCancel={() => setLogoutModal(false)}
          onLogout={() => {
            setLogoutModal(false);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

/* -------- MENU ITEM COMPONENT -------- */
const MenuItem = ({ title, icon, onPress }:any) => {
  return (
    <Pressable style={styles.menuRow} onPress={onPress}>
      <View style={styles.menuLeft}>
        <Image source={icon} style={styles.menuIcon} />
        <Text style={styles.menuText}>{title}</Text>
      </View>

      <Image
        source={imageIndex.Back1}
        style={styles.arrowIcon}
        resizeMode="contain"
      />
    </Pressable>
  );
};

/* DIVIDER */
const Divider = () => <View style={styles.divider} />;

/* -------- STYLES -------- */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  container: {
    padding: 16,
    paddingBottom: 40,
  },

  profileTitle: {
    fontSize: 26,
    color: "#000",
    marginBottom: 20,
    fontWeight: "600",
  },

  userCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 18,
    marginBottom: 20,
    alignItems: "center",
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },

  userName: {
    fontSize: 18,
    color: "#000",
    fontWeight: "500",
  },

  username: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
    fontFamily: font.MonolithRegular,
  },

  menuCard: {
 marginTop:2
 
   },

  menuRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
   backgroundColor: "#FFF",
  elevation: 5,
   shadowColor: "#000",
  shadowOpacity: 0.10,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 3,
   borderRadius: 10, // optional for smooth edges
padding:18,
margin:8
   },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuIcon: {
    width: 28,
    height: 28,
    marginRight: 14,
    resizeMode: "contain",
  },

  menuText: {
    fontSize: 15,
    color: "#000",
    fontWeight: "600",
  },

  arrowIcon: {
    width: 25,
    height: 25,
    tintColor: "#F3178B",
  },

  divider: {
    height: 1,
    backgroundColor: "#EFEFEF",
   },
});

export default ProfileScreen;
