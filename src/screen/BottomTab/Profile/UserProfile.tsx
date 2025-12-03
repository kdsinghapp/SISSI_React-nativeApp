import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import imageIndex from "../../../assets/imageIndex";
import SvgIndex from "../../../assets/svgIndex";
import font from "../../../theme/font";
import LogoutModal from "../../../compoent/LogoutModal";
import CustomButton from "../../../compoent/CustomButton";
import ScreenNameEnum from "../../../routes/screenName.enum";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [logoutModal, setLogoutModal] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        
        {/* Title */}
        <Text style={styles.profileTitle}>Profile</Text>

        {/* USER CARD */}
        <View style={styles.userCard}>
          <View>
            <Image
              source={imageIndex.userDemo} // your avatar
              style={styles.avatar}
            />

            {/* Edit Icon */}
            <TouchableOpacity
              style={styles.editIcon}
              onPress={() => navigation.navigate(ScreenNameEnum.EditProfile)}
            >
              <Image
                source={imageIndex.eoditphots}
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
          </View>

          <View style={{ marginLeft: 15 }}>
            <Text style={styles.userName}>Ashlynn Bergson</Text>
            <Text style={styles.username}>@Ashlynn</Text>
          </View>
        </View>

        {/* MENU CARD */}
        <View style={styles.menuCard}>
          <MenuItem
            title="My Profile"
            icon={imageIndex.userPink}
            onPress={() => navigation.navigate(ScreenNameEnum.EditProfile)}
          />

          <Divider />

          <MenuItem
            title="Favorite Institutions"
            icon={imageIndex.starPink}
            onPress={() => navigation.navigate(ScreenNameEnum.FavoriteScreen)}
          />

          <Divider />

          <MenuItem
            title="Notifications"
            icon={imageIndex.notificationPink}
            onPress={() => navigation.navigate(ScreenNameEnum.NotificationScreen)}
          />

          <Divider />

          <MenuItem
            title="About Us"
            icon={imageIndex.aboutPink}
            onPress={() => navigation.navigate(ScreenNameEnum.AboutUs)}
          />

          <Divider />

          <MenuItem
            title="Privacy Policy"
            icon={imageIndex.privacyPink}
            onPress={() => navigation.navigate(ScreenNameEnum.PrivacyPolicy)}
          />
        </View>

        {/* LOGOUT BUTTON */}
        <View style={{ marginTop: 20 }}>
          <CustomButton
            title="Logout"
            onPress={() => setLogoutModal(true)}
          />
        </View>

        <LogoutModal
          visible={logoutModal}
          onCancel={() => setLogoutModal(false)}
          onLogout={() => {
            setLogoutModal(false);
            // your logout logic
          }}
        />

      </ScrollView>
    </SafeAreaView>
  );
};

/* MENU ITEM COMPONENT */
const MenuItem = ({ title, icon, onPress }: any) => {
  return (
    <Pressable style={styles.menuRow} onPress={onPress}>
      <View style={styles.menuLeft}>
        <Image source={icon} style={styles.menuIcon} />
        <Text style={styles.menuText}>{title}</Text>
      </View>

      {/* right arrow */}
      <Image source={imageIndex.arrowRightPink} style={{ width: 22, height: 22 }} />
    </Pressable>
  );
};

const Divider = () => <View style={styles.divider} />;

/* ---------- STYLES ---------- */
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
    fontFamily: font.MonolithBold,
    color: "#000",
    marginBottom: 20,
  },

  userCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    alignItems: "center",
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },

  editIcon: {
    position: "absolute",
    right: -5,
    bottom: -5,
    backgroundColor: "#FF5B5B",
    width: 25,
    height: 25,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  userName: {
    fontSize: 18,
    fontFamily: font.MonolithSemiBold,
    color: "#000",
  },

  username: {
    fontSize: 14,
    fontFamily: font.MonolithRegular,
    color: "#808080",
    marginTop: 4,
  },

  menuCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  menuRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center", 
   },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuIcon: {
    width: 28,
    height: 28,
    marginRight: 12,
  },

  menuText: {
    fontSize: 15,
    fontFamily: font.MonolithRegular,
    color: "#000",
  },

  divider: {
    height: 1,
    backgroundColor: "#EFEFEF",
    marginHorizontal: 16,
  },
});

export default ProfileScreen;
