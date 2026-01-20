import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
import CustomHeader from "../../../compoent/CustomHeader"; 
import { useLanguage } from "../../../LanguageContext";

export default function ShiftDetailScreen({ route }) {
  const { item } = route.params; // 👈 single item
  const { labels} = useLanguage(); // Reference Finnish strings

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader label={labels.shiftDetails} />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>{labels.institutionName}</Text>
        <Text style={styles.value}>{item?.user_name}</Text>

        <Text style={styles.label}>{labels.unitName}</Text>
        <Text style={styles.value}>{item?.unit_name}</Text>

        <Text style={styles.label}>{labels.dateTime}</Text>
        <Text style={styles.value}>
          {moment(item?.shift_date, "YYYY-MM-DD")
            .format("dddd, DD MMMM YYYY")}
          {"\n"}
          {item?.time_start} – {item?.time_end}
        </Text>

        <Text style={styles.label}>{labels.location}</Text>
        <Text style={styles.value}>{item?.location}</Text>

        <Text style={styles.label}>{labels.description}</Text>
        <Text style={styles.value}>{item?.description}</Text>

        <Text style={styles.label}>{labels.status}</Text>
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
