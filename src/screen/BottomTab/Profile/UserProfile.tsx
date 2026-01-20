import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import imageIndex from "../../../assets/imageIndex";
import font from "../../../theme/font";
import LogoutModal from "../../../compoent/LogoutModal";
import CustomButton from "../../../compoent/CustomButton";
import ScreenNameEnum from "../../../routes/screenName.enum";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { color } from "../../../constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { language } from "../../../constant/Language";
import { useLanguage } from "../../../LanguageContext";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [logoutModal, setLogoutModal] = useState(false);
  const isLogin = useSelector((state: any) => state.auth);
  const { labels} = useLanguage(); // Reference Finnish strings
  console.log(isLogin, 'userData')
  /* -------- MENU DATA ARRAY -------- */
  const menuData = isLogin?.userData?.type == "User" ? [
    {
      id: "1",
      title: labels.myProfile,
      icon: imageIndex.P1,
      screen: ScreenNameEnum.EditProfile,
    },
    {
      id: "2",
      title: labels.favoriteInstitutions,
      icon: imageIndex.favort,
      screen: ScreenNameEnum.FavoriteScreen,
    },
    {
      id: "3",
      title: labels.notifications,
      icon: imageIndex.notifcaton,
      screen: ScreenNameEnum.NotificationsSetting,
    },
    {
      id: "4",
      title: labels.aboutUs,
      icon: imageIndex.privacy,
      screen: ScreenNameEnum.AboutUS,
    },
    {
      id: "5",
      title: labels.privacyPolicy,
      icon: imageIndex.privacy,
      screen: ScreenNameEnum.PrivacyPolicy,
    },
  ] :
    [
      {
        id: "1",
        title: labels.myProfile,
        icon: imageIndex.P1,
        screen: ScreenNameEnum.EditProfile,
      },

      {
        id: "3",
        title: labels.notifications,
        icon: imageIndex.notifcaton,
        screen: ScreenNameEnum.NotificationsSetting,
      },
      {
        id: "4",
        title: labels.aboutUs,
        icon: imageIndex.privacy,
        screen: ScreenNameEnum.AboutUS,
      },
      {
        id: "5",
        title: labels.privacyPolicy,
        icon: imageIndex.privacy,
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
        <Text style={styles.profileTitle}>{labels.profile}</Text>

        {/* USER CARD */}
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate(ScreenNameEnum.EditProfile)} style={styles.userCard}>
          <View>

            <Image
              source={isLogin?.userData?.image ? { uri: isLogin?.userData?.image } : imageIndex.prfile}
              style={styles.avatar}
            />
          </View>

          <View style={{ marginLeft: 15 }}>
            <Text style={styles.userName}>{isLogin?.userData?.user_name}</Text>
            <Text style={styles.username}>{isLogin?.userData?.email}</Text>
          </View>
        </TouchableOpacity>

        {/* MENU FLATLIST */}
        <View style={styles.menuCard}>
          <FlatList
            data={menuData}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            // ItemSeparatorComponent={() => <Divider />}
            renderItem={({ item }: any) => (
              <MenuItem
                title={item.title}
                icon={item.icon}
                onPress={() => navigation.navigate(item.screen)}
              />
            )}
          />
        </View>

        {/* LOGOUT BUTTON */}
        <View style={{ marginTop: 20 }}>
          <CustomButton title={labels.logout}
            // button1={{ backgroundColor: "#FF383C" }}
            onPress={() => {
              setLogoutModal(true);
              // navigation.navigate(ScreenNameEnum.ChooseRole);
            }}

          />
        </View>

        <LogoutModal
          visible={logoutModal}
          onCancel={() => setLogoutModal(false)}
          onLogout={async () => {
            setLogoutModal(false);
            await AsyncStorage.clear();
            navigation.navigate(ScreenNameEnum.ChooseRole);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

/* -------- MENU ITEM COMPONENT -------- */
const MenuItem = ({ title, icon, onPress }: any) => {
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
    marginTop: 2

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
    padding: 18,
    margin: 8
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
    tintColor: color.primary,
  },

  divider: {
    height: 1,
    backgroundColor: "#EFEFEF",
  },
});

export default ProfileScreen;
