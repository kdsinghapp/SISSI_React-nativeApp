// // DatePickerModal.tsx
// import React from "react";
// import { Modal, View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";

// type Props = {
//   visible: boolean;
//   mode: "date" | "time";
//   value: Date;
//   onClose: () => void;
//   onConfirm: (date: Date) => void;
// };

// const DatePickerModal: React.FC<Props> = ({ visible, mode, value, onClose, onConfirm }) => {
//   const [tempDate, setTempDate] = React.useState(value);

//   return (
//     <Modal transparent={true} animationType="slide" visible={visible} onRequestClose={onClose}>
//       <View style={styles.modalOverlay}>
//         <View style={styles.modalContainer}>
//           <Text style={styles.title}>{mode === "date" ? "Select Date" : "Select Time"}</Text>

//           <DateTimePicker
//             value={tempDate}
//             mode={mode}
//             display={Platform.OS === "ios" ? "spinner" : "default"}
//             onChange={(event, selectedDate) => {
//               if (selectedDate) setTempDate(selectedDate);
//             }}
//           />

//           <View style={styles.btnRow}>
//             <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
//               <Text style={{ color: "#666" }}>Cancel</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.confirmBtn}
//               onPress={() => {
//                 onConfirm(tempDate);
//                 onClose();
//               }}
//             >
//               <Text style={{ color: "#fff" }}>Confirm</Text>
//             </TouchableOpacity>
//           </View>

//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.4)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContainer: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     padding: 20,
//     width: "85%",
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginBottom: 15,
//     textAlign: "center",
//   },
//   btnRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 15,
//   },
//   cancelBtn: {
//     padding: 12,
//     flex: 1,
//     alignItems: "center",
//   },
//   confirmBtn: {
//     backgroundColor: "#0D6EFD",
//     padding: 12,
//     borderRadius: 8,
//     flex: 1,
//     alignItems: "center",
//     marginLeft: 10,
//   },
// });

// export default DatePickerModal;
import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

type Props = {
  visible: boolean;
  mode: "date" | "time";
  value: Date;
  onClose: () => void;
  onConfirm: (date: Date) => void;
};

const DatePickerModal: React.FC<Props> = ({ visible, mode, value, onClose, onConfirm }) => {
  const [tempDate, setTempDate] = useState(value);

  useEffect(() => {
    setTempDate(value);
  }, [value]);

  // ANDROID → show native picker only
  if (Platform.OS === "android" && visible) {
    return (
      <DateTimePicker
        value={tempDate}
        mode={mode}
        display="default"
        onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
          if (event.type === "set" && selectedDate) {
            onConfirm(selectedDate);
            onClose();
          }
          onClose(); // close whether confirm or cancel
        }}
      />
    );
  }

  // IOS → custom modal wrapper
  return (
    <Modal transparent animationType="slide" visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{mode === "date" ? "Select Date" : "Select Time"}</Text>

          <DateTimePicker
            value={tempDate}
            mode={mode}
            display="spinner"
            onChange={(_, selectedDate) => {
              if (selectedDate) setTempDate(selectedDate);
            }}
          />

          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={{ color: "#666" }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={() => {
                onConfirm(tempDate);
                onClose();
              }}
            >
              <Text style={{ color: "#fff" }}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "85%",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 15,
    textAlign: "center",
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  cancelBtn: {
    padding: 12,
    flex: 1,
    alignItems: "center",
  },
  confirmBtn: {
    backgroundColor: "#0D6EFD",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    marginLeft: 10,
  },
});

export default DatePickerModal;