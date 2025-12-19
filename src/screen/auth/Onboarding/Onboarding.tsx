import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
 import imageIndex from "../../../assets/imageIndex";
import CustomButton from "../../../compoent/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import { useNavigation } from "@react-navigation/native";
import { onNavgation } from "../../../api/authApi/BaseUrl";
import ScreenNameEnum from "../../../routes/screenName.enum";
import { color } from "../../../constant";

export default function OnboardingScreen() { 
  const navigation = useNavigation();

   return (
    <SafeAreaView
    
    edges={["top"]}
    style={styles.container}>
      <StatusBarComponent/>
   
      <TouchableOpacity  
      onPress={()=>navigation.navigate(ScreenNameEnum.ChooseRole)}

      
      style={styles.skipContainer}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Illustration */}
      <View style={styles.imageContainer}>
        <Image 
          source={imageIndex.bag}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Bottom Card */}
      <View
        
        style={styles.bottomCard}
      >
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.titleBold}>SISSI</Text>

        <Text style={styles.subtitle}>
          Screen Building for Institutions & Stakeholders systems
        </Text>

        {/* Dots */}
        <View style={styles.dotsContainer}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* Next Button */}
        <View style={{
          marginTop:30
        }}>
<CustomButton  title="Next"  

onPress={()=>navigation.navigate(ScreenNameEnum.ChooseRole)}
/>
</View>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  skipContainer: {
     padding: 15,
  },

  skipText: {
    color: color.primary,
    fontSize: 16,
    fontWeight: "600",
  },

  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },

  image: {
    width: "95%",
    height: "95%",
  },

  bottomCard: {
    height: "40%",
    backgroundColor: color.thirdColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 15,
  },

  title: {
    fontSize: 26,
    fontWeight: "600",
    color: "#fff",
  },

  titleBold: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 15,
    color: "#fff",
    opacity: 0.9,
    marginBottom: 20,
  },

  dotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    alignSelf:'center'
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ffffff60",
    marginRight: 6,
  },

  dotActive: {
    width: 20,
    backgroundColor: "#fff",
  },

  nextBtn: {
    marginTop: 10,
    backgroundColor: "#ff0080",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },

  nextText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "700",
  },
});
