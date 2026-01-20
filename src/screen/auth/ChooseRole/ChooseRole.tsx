import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import imageIndex from "../../../assets/imageIndex";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import ScreenNameEnum from "../../../routes/screenName.enum";
import { color } from "../../../constant";
import {useLanguage} from './../../../LanguageContext'
// import { language } from "../../../constant/Language";

const RoleButton = ({ title, subtitle, icon, selected, onPress }) => {
  const scale = new Animated.Value(1);

  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.96, duration: 100, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
    onPress();
  };

  return (
    <TouchableWithoutFeedback onPress={animatePress}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <View
          style={[
            styles.inactiveButton,
            { backgroundColor: selected ? color.primary : "white" },
          ]}
        >
          <View style={styles.iconView}>
            <Image source={icon} style={styles.icon} />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.inactiveTitle,
                { color: selected ? "white" : "black" },
              ]}
            >
              {title}
            </Text>
            <Text
              style={[
                styles.inactiveSubtitle,
                { color: selected ? "white" : "rgba(0,0,0,0.6)" },
              ]}
            >
              {subtitle}
            </Text>
          </View>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default function ChooseRoleScreen() {
  const [selected, setSelected] = useState(null);
  const navigation = useNavigation();
  // const { labels} = useLanguage(); // Using Finnish labels
const { labels} = useLanguage();
  useEffect(() => {
    const loadRole = async () => {
      try {
        const savedRole = await AsyncStorage.getItem("userRole");
        if (savedRole) setSelected(savedRole);
      } catch (error) {
        console.log("Failed to load role", error);
      }
    };
    loadRole();
  }, []);

  const handleSelectRole = async (role) => {
    try {
      setSelected(role);
      await AsyncStorage.setItem("userRole", role);
      navigation.navigate(ScreenNameEnum.Login);
    } catch (error) {
      console.log("Failed to save role", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{labels.chooseRoleTitle}</Text>
      <Text style={styles.subtitle}>{labels.chooseRoleSubtitle}</Text>
      
      <View style={{ marginTop: 30 }}>
        <RoleButton
          title={labels.roleWorkerTitle}
          subtitle={labels.roleWorkerSub}
          icon={imageIndex.category1}
          selected={selected === "Substitute"}
          onPress={() => handleSelectRole("Substitute")}
        />

        <RoleButton
          title={labels.roleInstTitle}
          subtitle={labels.roleInstSub}
          icon={imageIndex.Beauty}
          selected={selected === "Institution"}
          onPress={() => handleSelectRole("Institution")}
        />
      </View>

      <Image
        source={imageIndex.first1}
        style={styles.bottomImage}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 55,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    color: "#000",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    color: "black",
    marginBottom: 25,
  },
  inactiveButton: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
    backgroundColor: "#fff",
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    height: 100,
    marginBottom: 20,
  },
    icon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    // right: 1,
  },

   iconView: {
    width: 70,
    height: 70,
    resizeMode: "contain",
    right: 1,
    borderWidth:2,
    borderColor:color.primary,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:50,
    marginLeft:15,
    marginRight:10
  },
  inactiveTitle: {
    color: "#000",
    fontSize: 18,
    fontWeight: "700",
  },
  inactiveSubtitle: {
    color: "#777",
    fontSize: 13,
    marginTop: 4,
    width: "90%",
  },
  bottomImage: {
    width: "100%",
    height: 200,
    marginTop: 35,
    alignSelf: "center",
  },
});
