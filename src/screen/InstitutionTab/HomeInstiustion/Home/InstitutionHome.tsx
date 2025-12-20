import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
    ScrollView, 
  Image,
 
} from 'react-native';
import imageIndex from '../../../../assets/imageIndex';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../../../routes/screenName.enum';
import StatusBarComponent from '../../../../compoent/StatusBarCompoent';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { useSelector } from 'react-redux';
import { color } from '../../../../constant';

const InstitutionHome = () => {
  const navigation = useNavigation();
 const isLogin = useSelector((state: any) => state.auth);
 
  // Grid items data
  const gridItems = [
    {
      id: '1',
      title: 'Posted Shifts',
      icon: imageIndex.Posted,
      backgroundColor: '#A26BFF',
      screen: ScreenNameEnum.PostedShifts
    },
    {
      id: '2',
      title: 'Shift Booking Request',
      icon: imageIndex.Shiftbooking,
      backgroundColor: '#00C48C',
      screen: ScreenNameEnum.ShiftBooking
    },
    {
      id: '3',
      title: 'Booked Shifts',
      icon: imageIndex.ShiBookedftbooking,
      backgroundColor: '#00BFFF',
         screen: ScreenNameEnum.BookedShifts
    },
    {
      id: '4',
      title: 'Past Shifts',
      icon: imageIndex.Past,
      backgroundColor: '#3A85FF',
      screen: ScreenNameEnum.PastShifts
    },
    {
      id: '5',
      title: 'Inbox',
      icon: imageIndex.Inbox,
      backgroundColor: '#FFD966',
      screen: 'Inbox'
    },
  ];

 

 

  return (
    <SafeAreaView style={styles.container}>
   <StatusBarComponent barStyle="light-content" backgroundColor={color.primary}/>
       <View style={styles.header}>
        <Image
        source={isLogin?.userData?.image_url ? { uri:  isLogin?.userData?.image_url} : imageIndex.prfile}
          // source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
          style={styles.profileImage}
        />
        <TouchableOpacity onPress={() => navigation.navigate(ScreenNameEnum.EditProfile)} style={styles.userInfo}>
          <Text style={styles.welcomeText}>Hello, Welcome  🎉</Text>
          <Text style={styles.userName}>{isLogin?.userData?.user_name}</Text>
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity 
            style={styles.iconButton}
            // onPress={() => navigation.navigate('Search')}
          >
            <Image 
              source={imageIndex.no1} 
              style={styles.headerIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.navigate(ScreenNameEnum.EditProfile)}
          >
            <Image 
              source={imageIndex.Notification2} 
              style={styles.headerIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
         <TouchableOpacity 
          style={styles.createShiftCard}
        onPress={() => navigation.navigate(ScreenNameEnum.CreateNewShift)}
        >
          <View style={styles.createShiftContent}>
            <Text style={styles.plusIcon}>+</Text>
            <Text style={styles.createShiftText}>Create New Shift</Text>
          </View>
        </TouchableOpacity>

    
        <View style={styles.grid}>
          {gridItems.map((item) => (
            <TouchableOpacity 
              key={item.id}
              style={[styles.gridCard, { backgroundColor: item.backgroundColor }]}
               onPress={() => navigation.navigate(item.screen)}
            >
              <View style={styles.gridCardContent}>
                <Image 
                  source={item.icon} 
                  style={styles.gridIcon}
                />
                <Text style={styles.gridCardText}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

       
        {/* FlatList for Shift Cards */}
     
      </ScrollView>
    </SafeAreaView>
  );
};

export default InstitutionHome;

 