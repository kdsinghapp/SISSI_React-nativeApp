import React, { memo } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import imageIndex from '../assets/imageIndex';
import { color } from '../constant';
import { language } from '../constant/Language'; // Import your language file
import font from '../theme/font';

const LogoutModal = ({ visible, onLogout, onCancel }: any) => {
  // Reference Finnish labels
  const labels = language.fi;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onCancel}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>
          
          <Image 
            source={imageIndex.logoutImg} 
            style={styles.imageStyle} 
            resizeMode='contain'
          />

          <Text allowFontScaling={false} style={styles.title}>
            {labels.logoutTitle}
          </Text>
          
          <Text allowFontScaling={false} style={styles.message}>
            {labels.logoutMessage}
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
              <Text allowFontScaling={false} style={styles.logoutText}>
                {labels.yes}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text allowFontScaling={false} style={styles.cancelText}>
                {labels.no}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
  
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EDEDED',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 1,
    backgroundColor:color.primary,
    height:22,
    width:22,
    borderRadius:11,
    alignItems:'center',
    justifyContent:'center'

  },
  closeText: {
    fontSize: 22,
    color: '#fff',
    lineHeight: 22,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
     textAlign: 'center',
    color: '#333',
  },
  message: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 25,
        fontWeight: '500',

   },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  logoutButton: {
    flex: 1,
    backgroundColor: color.thirdColor,
    paddingVertical: 12,
    marginRight: 10,
    borderRadius: 25,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: font.MonolithRegular,
   },
  cancelButton: {
    flex: 1,
    // backgroundColor: '#EDEDED',
    paddingVertical: 12,
    marginLeft: 10,
    borderRadius: 25,
    alignItems: 'center',
    borderColor: color.primary,
    borderWidth:1
  },
  cancelText: {
    color: color.primary,
    fontSize: 16,
    fontFamily: font.MonolithRegular,
    // fontWeight: '600',
  },
  imageStyle:{
    height:150, 
    width:150, 
    marginBottom:15,
    marginTop:20
  }
});

export default memo(LogoutModal);
