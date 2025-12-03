import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import imageIndex from '../../../assets/imageIndex';
import { color } from '../../../constant';
import { styles } from './style';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../../routes/screenName.enum';

const Splash: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // ⏳ Wait 2 seconds then navigate
    const timer = setTimeout(() => {
      navigation.navigate(ScreenNameEnum.OnboardingScreen);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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
