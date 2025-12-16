import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatusBarComponent from './StatusBarCompoent';
import CustomButton from './CustomButton';

const DeleteRequestModal = ({ 
  visible, 
  onClose, 
  onConfirm,
  title = "Delete Request",
  message = "Are you sure you want to delete this request? This action cannot be undone.",
  confirmButtonText = "Delete",
  cancelButtonText = "Cancel",
  showCancelButton = true,
  icon
}: any) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <StatusBarComponent />
        <View style={styles.modalView}>
          {/* Icon or Warning Image */}
          {icon && (
            <Image 
              source={icon}
              style={styles.icon}
            />
          )}
          
          {/* Title */}
          <Text style={styles.title}>{title}</Text>
          
          {/* Message */}
          <Text style={styles.message}>
            {message}
          </Text>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            {showCancelButton && (
              <View style={styles.cancelButtonWrapper}>
                <CustomButton 
                  title={cancelButtonText}
                  onPress={onClose}
                  style={styles.cancelButton}
                  textStyle={styles.cancelButtonText}
                />
              </View>
            )}
            
            <View style={styles.confirmButtonWrapper}>
              <CustomButton 
                title={confirmButtonText}
                onPress={onConfirm}
                style={styles.confirmButton}
                textStyle={styles.confirmButtonText}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalView: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 5,
    textAlign: 'center',
    color: '#333',
  },
  message: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  cancelButtonWrapper: {
    flex: 1,
    marginRight: 10,
  },
  confirmButtonWrapper: {
    flex: 1,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  confirmButton: {
    backgroundColor: '#FF3B30', // Red color for delete action
    paddingVertical: 14,
    borderRadius: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default DeleteRequestModal;