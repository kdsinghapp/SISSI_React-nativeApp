import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
import CustomHeader from "../../../compoent/CustomHeader";

export default function ShiftDetailScreen({ route }) {
  const { item } = route.params; // 👈 single item

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader label="Shift Details" />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>Institution Name</Text>
        <Text style={styles.value}>{item?.user_name}</Text>

        <Text style={styles.label}>Unit Name</Text>
        <Text style={styles.value}>{item?.unit_name}</Text>

        <Text style={styles.label}>Date & Time</Text>
        <Text style={styles.value}>
          {moment(item?.shift_date, "YYYY-MM-DD")
            .format("dddd, DD MMMM YYYY")}
          {"\n"}
          {item?.time_start} – {item?.time_end}
        </Text>

        <Text style={styles.label}>Location</Text>
        <Text style={styles.value}>{item?.location}</Text>

        <Text style={styles.label}>Description</Text>
        <Text style={styles.value}>{item?.description}</Text>

        <Text style={styles.label}>Status</Text>
        <Text style={styles.value}>{item?.status}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 16 },
  label: {
    fontSize: 14,
    color: "#0056B3",
    fontWeight: "500",
    marginTop: 16,
  },
  value: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    marginTop: 4,
  },
});
