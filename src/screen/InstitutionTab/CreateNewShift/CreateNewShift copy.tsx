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
  Modal
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
import DateTimePicker from '@react-native-community/datetimepicker';
import { add_shift_API, AddCarApi } from '../../../api/apiRequest';
import { useSelector } from 'react-redux';
import { color } from '../../../constant';

export default function CreateNewShift() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [education, setEducation] = useState('');
  const [radioSelected, setRadioSelected] = useState(false);
  const [radioSelected1, setRadioSelected1] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [visible, setvisible] = useState(false);
  const navgation = useNavigation()
  const route = useRoute()
   const isLogin = useSelector((state: any) => state.auth);
  // console.log(isLogin?.token, 'userData')
  // const [date, setDate] = useState(new Date());
  // const [startTime, setStartTime] = useState(new Date());
  // const [endTime, setEndTime] = useState(new Date());
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [unit, setUnit] = useState('');
  const [description, setDescription] = useState('');

  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState('date');
  const [activeField, setActiveField] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  const openPicker = (mode, field) => {
    setPickerMode(mode);
    setActiveField(field);

    // Set temp date based on current field value
    if (field === 'date' && date) {
      setTempDate(date);
    } else if (field === 'start' && startTime) {
      setTempDate(startTime);
    } else if (field === 'end' && endTime) {
      setTempDate(endTime);
    } else {
      setTempDate(new Date());
    }

    setShowPicker(true);
  };

  const onPickerChange = (event, selectedValue) => {
    // For Android, always hide the picker
    if (Platform.OS === 'android') {
      setShowPicker(false);

      // Check if user cancelled
      if (event.type === 'dismissed') {
        return;
      }

      if (selectedValue) {
        updateDateValue(selectedValue);
      }
    } else {
      // For iOS, update value but keep picker open
      if (selectedValue) {
        updateDateValue(selectedValue);
      }
    }
  };

  const updateDateValue = (selectedValue) => {
    if (activeField === 'date') {
      setDate(selectedValue);
    } else if (activeField === 'start') {
      setStartTime(selectedValue);
    } else if (activeField === 'end') {
      setEndTime(selectedValue);
    }
  };

  const formatDate = (d) => {
    if (!d) return '';
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (t) => {
    if (!t) return '';
    return t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDateForAPI = (d) => {
    if (!d) return '';
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
const resetForm = () => {
  setDate('');
  setStartTime('');
  setEndTime('');
  setLocation('');
  setUnit('');
  setDescription('');
};
  const validate = () => {
    if (!date) {
      Alert.alert('Validation', 'Please select date');
      return false;
    }
    if (!startTime) {
      Alert.alert('Validation', 'Please select start time');
      return false;
    }
    if (!endTime) {
      Alert.alert('Validation', 'Please select end time');
      return false;
    }

    // Check if end time is after start time
    // const start = new Date(startTime);
    // const end = new Date(endTime);
    // if (end <= start) {
    //   Alert.alert('Validation', 'End time must be after start time');
    //   return false;
    // }

    if (!location.trim()) {
      Alert.alert('Validation', 'Enter location');
      return false;
    }
    if (!unit.trim()) {
      Alert.alert('Validation', 'Enter unit');
      return false;
    }
    if (!description.trim()) {
      Alert.alert('Validation', 'Enter description');
      return false;
    }
    return true;
  };

  const submitShift = async () => {
    if (!validate()) return;

    setLoading(true);

    const payload = {
      date: date,
      startTime: startTime,
      endTime: endTime,
      // date: formatDateForAPI(date),
      // startTime: formatTime(startTime),
      // endTime: formatTime(endTime),
      location,
      unit,
      description,
      token: isLogin?.token
    };
    console.log('Submitting shift:', payload);
    // add_shift_API(payload, setLoading)
  const dd = await add_shift_API(payload, setLoading)
    // if (success) {
    //   resetForm();       // ✅ clear form
    //   setvisible(true);  // ✅ show success modal
    // }
if(dd?.success){
  resetForm();  
   setvisible(true);
  };
  }
  const { type } = route?.params || "";

  // For Android, we can use the DateTimePicker as a modal
  const renderAndroidPicker = () => {
    if (!showPicker || Platform.OS !== 'android') return null;

    return (
      <DateTimePicker
        value={tempDate}
        mode={pickerMode}
        display="default"
        onChange={onPickerChange}
        is24Hour={false}
        minimumDate={pickerMode === 'date' ? new Date() : undefined}
      />
    );
  };

  // For iOS, render a modal with the picker
  const renderIOSPicker = () => {
    if (!showPicker || Platform.OS !== 'ios') return null;

    return (
      <Modal
        transparent={true}
        animationType="slide"
        visible={showPicker}
        onRequestClose={() => setShowPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.iosPickerContainer}>
            <DateTimePicker
              value={tempDate}
              mode={pickerMode}
              display="spinner"
              onChange={onPickerChange}
              is24Hour={false}
              minimumDate={pickerMode === 'date' ? new Date() : undefined}
              style={styles.iosPicker}
            />
            <View style={styles.iosPickerButtons}>
              <TouchableOpacity
                style={[styles.iosPickerButton, styles.cancelButton]}
                onPress={() => setShowPicker(false)}
              >
                <Text style={styles.iosPickerButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.iosPickerButton, styles.doneButton]}
                onPress={() => setShowPicker(false)}
              >
                <Text style={styles.iosPickerButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBarComponent />
      <CustomHeader label={type ? "Edit Shift" : 'Create New Shift'} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
          style={{
            marginHorizontal: 20,
            marginTop: hp(3),
            backgroundColor: "white",
          }} >
          <View style={{
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
          }}>
            <View style={styles.formContainer}>
              {/* <TouchableOpacity 
                onPress={() => openPicker('date', 'date')}
                activeOpacity={0.7}
              > */}
              <TextInputField
                placeholder="Date (YYYY-MM-DD)"
                value={date}
                // editable={false}
                firstLogo
                img={imageIndex.calneder}
                pointerEvents="none"
                onChangeText={setDate}
              />
              {/* </TouchableOpacity> */}

              {/* <TouchableOpacity 
                onPress={() => openPicker('time', 'start')}
                activeOpacity={0.7}
              > */}
              <TextInputField
                placeholder="Time Start (HH:MM)"
                value={startTime}
                // editable={false}
                firstLogo
                img={imageIndex.time2}
                pointerEvents="none"
                onChangeText={setStartTime}
              />
              {/* </TouchableOpacity> */}

              {/* <TouchableOpacity 
                onPress={() => openPicker('time', 'end')}
                activeOpacity={0.7}
              > */}
              <TextInputField
                placeholder="Time End (HH:MM)"
                // value={formatTime(endTime)}
                // editable={false}
                value={endTime}
                firstLogo
                img={imageIndex.time2}
                pointerEvents="none"
                onChangeText={setEndTime}
              />
              {/* </TouchableOpacity> */}

              <TextInputField
                placeholder="Location"
                value={location}
                onChangeText={setLocation}
                firstLogo
                img={imageIndex.location}
              />

              <TextInputField
                placeholder="Unit"
                value={unit}
                onChangeText={setUnit}
                firstLogo
                img={imageIndex.Level}
              />

              <TextInputField
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                firstLogo
                img={imageIndex.Phone1}
                multiline={true}
                numberOfLines={3}
              />
            </View>
          </View>

          <CustomButton
            title={loading ? 'Posting...' : 'Post Shift'}
            disabled={loading}
            onPress={submitShift}
          />

          {/* Render pickers based on platform */}
          {renderAndroidPicker()}
          {renderIOSPicker()}

          <PostSuccessfull
            userImage={imageIndex.post1}
            visible={visible}
            title={"Post Successful"}
            subTitle={"Shift successfully posted. Workers notified automatically."}
            onOpenChat={() => {
              setvisible(false);
              navgation.navigate(ScreenNameEnum.Tab2Navigator);
            }}
            onClose={() => {
              setvisible(false)
            }}
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
});