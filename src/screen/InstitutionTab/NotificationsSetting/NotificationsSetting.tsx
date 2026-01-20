import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import CustomHeader from '../../../compoent/CustomHeader';
import { color } from '../../../constant';
import { language } from '../../../constant/Language'; // Import your language file
import { useLanguage } from '../../../LanguageContext';

const NotificationsSetting = () => {
  // Reference Finnish labels
  const { labels} = useLanguage();

  // State for toggles
  const [generalNotification, setGeneralNotification] = useState(true);
  const [sound, setSound] = useState(false);
  const [vibrate, setVibrate] = useState(false);
  const [appUpdates, setAppUpdates] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent />
      <View>
        <CustomHeader label={labels.notifications} />

        {/* Body */}
        <View style={styles.settingsCard}>
          <View style={styles.notificationOption}>
            <Text style={styles.optionText}>{labels.generalNotification}</Text>
            <Switch
              value={generalNotification}
              onValueChange={val => setGeneralNotification(val)}
              trackColor={{ false: '#767577', true: '#000' }}
              thumbColor={'#fff'}
            />
          </View>

          <View style={styles.notificationOption}>
            <Text style={styles.optionText}>{labels.sound}</Text>
            <Switch
              value={sound}
              onValueChange={val => setSound(val)}
              trackColor={{ false: '#767577', true: '#000' }}
              thumbColor={'#fff'}
            />
          </View>

          <View style={styles.notificationOption}>
            <Text style={styles.optionText}>{labels.vibrate}</Text>
            <Switch
              value={vibrate}
              onValueChange={val => setVibrate(val)}
              trackColor={{ false: '#767577', true: '#000' }}
              thumbColor={'#fff'}
            />
          </View>

          <View style={styles.notificationOption}>
            <Text style={styles.optionText}>{labels.newTipsAvailable}</Text>
            <Switch
              value={appUpdates}
              onValueChange={val => setAppUpdates(val)}
              trackColor={{ false: '#767577', true: '#000'}}
              thumbColor={'#fff'}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

 

export default NotificationsSetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    justifyContent: 'space-between',
  },
  hamburger: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  notificationOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
   },
  optionText: {
    fontSize: 16,
    color: "#000000",
     lineHeight:15 ,
     fontWeight:"600",
  },
   settingsCard: {
    marginTop: 40,
    marginHorizontal: 15,
    padding: 20,
    backgroundColor: "#FFF",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    borderRadius: 10,
  },
});
