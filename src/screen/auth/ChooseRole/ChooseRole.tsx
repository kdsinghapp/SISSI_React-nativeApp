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
import LinearGradient from "react-native-linear-gradient";
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

  // Define the colors for the gradient or solid state
  // If selected, we show the gradient. Otherwise, we show the inactive thirdColor.
  const gradientColors = selected 
    ? ['#FF007C', '#310071'] 
    : [color.thirdColor, color.thirdColor];

  return (
    <TouchableWithoutFeedback onPress={animatePress}>
      <Animated.View style={{ transform: [{ scale }], marginBottom: 20 }}>
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientWrapper}
        >
          <View style={styles.contentContainer}>
            <View style={[
              styles.iconView, 
              { borderColor: selected ? '#FFFFFF' : color.primary }
            ]}>
              <Image 
                source={icon} 
                style={[styles.icon, { tintColor: '#FFFFFF'  }]} 
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.inactiveTitle, { color: selected ? '#FFFFFF' : color.textPrimary }]}>
                {title}
              </Text>
              <Text style={[styles.inactiveSubtitle, { color: selected ? '#FFFFFF' : color.textPrimary }]}>
                {subtitle}
              </Text>
            </View>
          </View>
        </LinearGradient>
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
          icon={imageIndex.userType}
          selected={selected === "Substitute"}
          onPress={() => handleSelectRole("Substitute")}
          islenear = {true}
        />

        <RoleButton
          title={labels.roleInstTitle}
          subtitle={labels.roleInstSub}
          icon={imageIndex.instituteType}
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
    backgroundColor: color.background,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    color: color.textPrimary,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    color: color.textPrimary,
    marginBottom: 25,

  },
  gradientWrapper: {
    borderRadius: 100, // Keeps the pill shape
    height: 100,
    width: '100%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: '100%',
    width: '100%',
  },
  iconView: {
    width: 70,
    height: 70,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35, // Half of width/height
    marginLeft: 15,
    marginRight: 10,
    backgroundColor: '#0000000D', // Subtle background for icon
  },
  inactiveTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  inactiveSubtitle: {
    fontSize: 13,
    marginTop: 4,
    width: "90%",
  },
  inactiveButton: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
    backgroundColor: color.thirdColor,
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

  //  iconView: {
  //   width: 70,
  //   height: 70,
  //   resizeMode: "contain",
  //   right: 1,
  //   borderWidth:2,
  //   borderColor:color.primary,
  //   alignItems:'center',
  //   justifyContent:'center',
  //   borderRadius:50,
  //   marginLeft:15,
  //   marginRight:10
  // },
  // inactiveTitle: {
  //   color: color.textPrimary,
  //   fontSize: 18,
  //   fontWeight: "700",
  // },
  // inactiveSubtitle: {
  //   color: color.textPrimary,
  //   fontSize: 13,
  //   marginTop: 4,
  //   width: "90%",
  // },
  bottomImage: {
    width: "100%",
    height: 200,
    marginTop: 35,
    alignSelf: "center",
  },
});
