import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import imageIndex from '../../../assets/imageIndex';
import { color } from '../../../constant';
import { styles } from './style';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { useSelector } from 'react-redux';

const Splash: React.FC = () => {
  const navigation = useNavigation();
 const isLogin = useSelector((state: any) => state.auth);
  console.log(isLogin, 'userData')
  // useEffect(() => {
  //   // ⏳ Wait 2 seconds then navigate
  //   const timer = setTimeout(() => {
  //     navigation.navigate(ScreenNameEnum.OnboardingScreen);
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, []);


   useEffect(() => {
        const checkTokenAndNavigate = async () => {
            // await new Promise(resolve => setTimeout(resolve, 4000)); // 4 seconds delay
            if (isLogin?.userData) {
            console.log(isLogin?.userData, 'this is from splash')

              if (isLogin?.userData?.type == "User") {
                       
                        navigation.replace(ScreenNameEnum.TabNavigator);
                    } else {
                       navigation.replace(ScreenNameEnum.Tab2Navigator);
                    }
            } else {
                navigation.navigate(ScreenNameEnum.OnboardingScreen); // Replace with your login screen enum
            }

        };

        checkTokenAndNavigate();
    }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent backgroundColor={color.white} />

      <View style={styles.centerContent}>
        <Image
          style={styles.logo}
          source={imageIndex.appLogo}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
};

export default Splash;
