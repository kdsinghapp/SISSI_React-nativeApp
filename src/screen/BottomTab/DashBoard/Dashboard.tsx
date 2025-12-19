import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import imageIndex from '../../../assets/imageIndex';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { useSelector } from 'react-redux';
import { color } from '../../../constant';
 
const Dashboard = () => {
  const navigator = useNavigation<any>();
  
  const isLogin = useSelector((state: any) => state.auth);
  console.log(isLogin, 'userData')
  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent />

      <View style={styles.wrapper}>

        {/* HEADER */}
        <View style={styles.headerContainer}>
          <Image
            source={{ uri: "https://i.pravatar.cc/300" }}
            style={styles.profileImage}
          />

          <View style={{ marginLeft: 12 }}>
            <Text style={styles.welcomeText}>Hello, Welcome 👋</Text>
            <Text style={styles.userName}>{isLogin?.userData?.user_name}</Text>
          </View>

          <TouchableOpacity style={styles.notification}>
            <Image
              source={imageIndex.notification}
              style={styles.notificationIcon}
            />
          </TouchableOpacity>
        </View>

        {/* MENU CARD - 1 */}
        <TouchableOpacity style={[styles.card, styles.cardPrimary]} 
        onPress={(()=>{
          navigator.navigate(ScreenNameEnum.BrowseShifts);
        })}
        >
          <Image source={imageIndex.calneder} style={styles.cardIconWhite} />

          <View style={styles.cardTextBox}>
            <Text style={styles.cardTitleWhite}>Browse Shifts</Text>
            <Text style={styles.cardSubtitleWhite}>Find all available shifts</Text>
          </View>

          <Image source={imageIndex.rightBack} style={styles.arrowWhiteIcon} />
        </TouchableOpacity>

        {/* MENU CARD - 2 */}
        <TouchableOpacity style={styles.card} 
        
         onPress={(()=>{
          navigator.navigate('Booking');
        })}
        > 


          <Image source={imageIndex.time2} style={styles.cardIconPink} />

          <View style={styles.cardTextBox}>
            <Text style={styles.cardTitle}>My Shifts</Text>
            <Text style={styles.cardSubtitle}>Upcoming & completed</Text>
          </View>

                  <Image source={imageIndex.rightBack} style={styles.arrowWhiteIcon} />

        </TouchableOpacity>

        {/* MENU CARD - 3 */}
        <TouchableOpacity  
        
        
         onPress={(()=>{
          navigator.navigate(ScreenNameEnum.FavoriteScreen);
        })}
        style={styles.card}>
          <Image source={imageIndex.Vector} style={styles.cardIconPink} />

          <View style={styles.cardTextBox}>
            <Text style={styles.cardTitle}>Favorite Institutions</Text>
          </View>

                    <Image source={imageIndex.rightBack} style={styles.arrowWhiteIcon} />

        </TouchableOpacity>

        {/* MENU CARD - 4 */}
        <TouchableOpacity style={styles.card} 
        
         onPress={(()=>{
          navigator.navigate('Profile');
        })}
        >
          <Image source={imageIndex.Setting} style={styles.cardIconPink} />

          <View style={styles.cardTextBox}>
            <Text style={styles.cardTitle}>Profile & Preferences</Text>
          </View>

          <Image source={imageIndex.rightBack} style={styles.arrowWhiteIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  wrapper: {
    marginHorizontal: 18,
    marginTop: 10,
  },

  /* HEADER */
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },

  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },

  welcomeText: {
    fontSize: 14,
    color: "#777",
  },

  userName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
  },

  notification: {
    marginLeft: "auto",
    padding: 6,
  },

  notificationIcon: {
    width: 30,
    height: 30,
  },

  /* MENU CARDS */
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    marginVertical: 10,
    height:78,

    // iOS shadow
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,

    // Android shadow
    elevation: 5,
  },

  cardPrimary: {
    backgroundColor: color.thirdColor,
  },

  cardTextBox: {
    marginLeft: 15,
    flex: 1,
  },

  cardIconWhite: {
    width: 24,
    height: 24,
    tintColor: "#fff",
  },

  cardIconPink: {
    width: 24,
    height: 24,
    tintColor: color.primary,
  },

  cardTitle: {
    fontSize: 15,
    color: "#111",
    fontWeight: "600",
  },

  cardSubtitle: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },

  cardTitleWhite: {
    fontSize: 17,
    fontWeight: "700",
    color: "#fff",
  },

  cardSubtitleWhite: {
    fontSize: 13,
    color: "#f5f5f5",
    marginTop: 3,
  },

  arrow: {
    fontSize: 20,
    color: color.primary,
  },

  arrowWhiteIcon: {
    width: 22,
    height: 22,
   },
});
