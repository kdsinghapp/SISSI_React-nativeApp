import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInputField from '../../../compoent/TextInputField';
import CustomButton from '../../../compoent/CustomButton';
import imageIndex from '../../../assets/imageIndex';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import CustomHeader from '../../../compoent/CustomHeader';
import { useNavigation, useRoute } from '@react-navigation/native';
import PostSuccessfull from '../../../compoent/PostSuccessfull';
import ScreenNameEnum from '../../../routes/screenName.enum';

import { add_shift_API, update_shift_API } from '../../../api/apiRequest';
import { useSelector } from 'react-redux';
import DatePicker from 'react-native-date-picker'
import LoadingModal from '../../../utils/Loader';
import { color } from '../../../constant';
import { language } from '../../../constant/Language'; // Import labels
import { useLanguage } from '../../../LanguageContext';

export default function CreateNewShift() {
  const { labels} = useLanguage(); // Reference Finnish strings
  const route = useRoute();
  const { type }: any = route?.params || "";
  const shiftData: any = route?.params?.shiftData || {};
  
  const [visible, setvisible] = useState(false);
  const navigation = useNavigation<any>();
  const isLogin = useSelector((state: any) => state.auth);

  const [location, setLocation] = useState(shiftData?.location || '');
  const [unit, setUnit] = useState(shiftData?.unit || '');
  const [description, setDescription] = useState(shiftData?.description || '');
  const [date, setDate] = useState(new Date(shiftData?.shift_date || new Date()));
  
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<any>('date');
  const [activeField, setActiveField] = useState(null);
  const [loading, setLoading] = useState(false);

  const timeStringToDate = (timeStr, baseDate = new Date()) => {
    if (!timeStr) return baseDate;
    const [hours, minutes, seconds] = timeStr.split(':').map(Number);
    const date = new Date(baseDate);
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds || 0);
    date.setMilliseconds(0);
    return date;
  };

  const [startTime, setStartTime] = useState(timeStringToDate(shiftData?.time_start, new Date()));
  const [endTime, setEndTime] = useState(timeStringToDate(shiftData?.time_end, new Date()));

  const openPicker = (field, pickerMode) => {
    setActiveField(field);
    setMode(pickerMode);
    setOpen(true);
  };

  const validate = () => {
    if (!date) { Alert.alert(labels.valTitle, labels.valDate); return false; }
    if (!startTime) { Alert.alert(labels.valTitle, labels.valStart); return false; }
    if (!endTime) { Alert.alert(labels.valTitle, labels.valEnd); return false; }
    if (!location.trim()) { Alert.alert(labels.valTitle, labels.valLoc); return false; }
    if (!unit.trim()) { Alert.alert(labels.valTitle, labels.valUnit); return false; }
    if (!description.trim()) { Alert.alert(labels.valTitle, labels.valDesc); return false; }
    return true;
  };

  const submitShift = async () => {
    if (!validate()) return;

    const payload = {
      date: formatDate(date),
      startTime: formatTime(startTime),
      endTime: formatTime(endTime),
      location,
      unit,
      description,
      token: isLogin?.token,
      shift_id: shiftData?.id || "",
    };

    setLoading(true);
    let res;
    if (type === "Edit") {
      res = await update_shift_API(payload, setLoading);
    } else {
      res = await add_shift_API(payload, setLoading);
    }

    if (res?.success) {
      setvisible(true);
    }
  };

  const formatDate = (d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const formatTime = (d) => {
    const h = String(d.getHours()).padStart(2, '0');
    const m = String(d.getMinutes()).padStart(2, '0');
    return `${h}:${m}`;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {loading && <LoadingModal />}
      <StatusBarComponent />
      <CustomHeader label={type === "Edit" ? labels.editShift : labels.createNewShift} />
      
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
          style={styles.scrollView} 
        >
          <View style={styles.card}>
            <View style={styles.formContainer}>
              <TouchableOpacity onPress={() => openPicker('date', 'date')}>
                <TextInputField
                  placeholder={labels.selectDate}
                  text={formatDate(date)}
                  editable={false}
                  firstLogo
                  img={imageIndex.calneder}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => openPicker('start', 'time')}>
                <TextInputField
                  placeholder={labels.startTime}
                  text={formatTime(startTime)}
                  editable={false}
                  firstLogo
                  img={imageIndex.time2}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => openPicker('end', 'time')}>
                <TextInputField
                  placeholder={labels.endTime}
                  text={formatTime(endTime)}
                  editable={false}
                  firstLogo
                  img={imageIndex.time2}
                />
              </TouchableOpacity>

              <TextInputField
                placeholder={labels.location}
                text={location}
                onChangeText={setLocation}
                firstLogo
                img={imageIndex.location}
              />

              <TextInputField
                placeholder={labels.unit}
                text={unit}
                onChangeText={setUnit}
                firstLogo
                img={imageIndex.Level}
              />

              <TextInputField
                placeholder={labels.description}
                text={description}
                onChangeText={setDescription}
                firstLogo
                img={imageIndex.Phone1}
                multiline={true}
                numberOfLines={3}
              />
            </View>
          </View>

          <CustomButton
            title={type === "Edit" ? labels.updateShift : labels.postShift}
            disabled={loading}
            onPress={submitShift}
          />

          <PostSuccessfull
            userImage={imageIndex.post1}
            visible={visible}
            title={type === "Edit" ? labels.updateSuccess : labels.postSuccess}
            subTitle={type === "Edit" ? labels.updateSub : labels.postSub}
            onOpenChat={() => {
              setvisible(false);
              navigation.navigate(ScreenNameEnum.Tab2Navigator);
            }}
            onClose={() => setvisible(false)}
          />

          <DatePicker
            modal
            open={open}
            mode={mode}
            date={
              activeField === 'date' ? date : activeField === 'start' ? startTime : endTime
            }
            onConfirm={(selectedDate) => {
              setOpen(false);
              if (activeField === 'date') setDate(selectedDate);
              if (activeField === 'start') setStartTime(selectedDate);
              if (activeField === 'end') setEndTime(selectedDate);
            }}
            onCancel={() => setOpen(false)}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    marginBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  iosPickerContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '50%',
  },
  iosPicker: {
    height: 200,
  },
  iosPickerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  iosPickerButton: {
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  doneButton: {
    backgroundColor: color.primary,
  },
  iosPickerButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  doneButtonText: {
    color: '#fff',
  },
  scrollView: {
    marginHorizontal: 20,
    marginTop: hp(3),
    backgroundColor: "white",
  },
  card: {
    backgroundColor: '#FFF',
    marginHorizontal: 5,
    borderColor: '#ccc',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 15,
    marginTop: 11,
    marginBottom: 60
  },
  // formContainer: {
  //   marginBottom: 20,
  // },
});