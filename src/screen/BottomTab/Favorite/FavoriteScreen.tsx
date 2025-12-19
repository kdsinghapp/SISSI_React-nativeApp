import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../../compoent/CustomHeader";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import SearchBar from "../../../compoent/SearchBar";
import { color } from "../../../constant";
 
const DATA = [1, 2, 3];

export default function FavoriteScreen() {
  const renderCard = () => {
    return (
      <View style={styles.card}>
         <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Institution Name</Text>
            <Text style={styles.value}>BrightCare Child Protection Unit</Text>
          </View>

          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Text style={styles.label}>Unit Example</Text>
            <Text style={styles.value}>Early Development Wing</Text>
          </View>
        </View>

        {/* Row 2 */}
        <View style={[styles.row, { marginTop: 12 }]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Location</Text>
            <Text style={styles.value}>Sector 12, City Center</Text>
          </View>

          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Text style={styles.label}>Badge</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeTxt}>Approved</Text>
            </View>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.removeBtn}>
            <Text style={styles.removeTxt}>Remove</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.detailsBtn}>
            <Text style={styles.detailsTxt}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent/>
       <CustomHeader label="Favorite Institutions" /> 
       <SearchBar/>
       <View style={{ flex: 1, marginTop: 18 , marginHorizontal:16}}>
      <FlatList
        data={DATA}
        renderItem={renderCard}
        keyExtractor={(item) => item.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff",  },

  heading: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },

  /* Card exactly like screenshot */
  card: {
    borderWidth: 1.5,
    borderColor: "#FF007A", // PINK BORDER
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
    backgroundColor: "#fff",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  label: {
    fontSize: 15,
    color: "#0056B3",
    marginBottom: 4,
    fontWeight:"500"
  },

  value: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },

  badge: {
    backgroundColor: "#54C270",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 2,
  },

  badgeTxt: { color: "#fff", fontSize: 12, fontWeight: "600" },

  /* Buttons bottom */
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },

  removeBtn: {
    borderWidth: 2,
    borderColor: color.primary,
    paddingHorizontal: 35,
    paddingVertical: 11,
    borderRadius: 30,
        justifyContent:"center"

  },

  removeTxt: {
    color: color.primary,
    fontWeight: "600",
    fontSize: 15, 
    textAlign:"center"
  },

  detailsBtn: {
    backgroundColor: color.primary,
    paddingHorizontal: 35,
    paddingVertical: 10,
    borderRadius: 30,
    justifyContent:"center"
  },

  detailsTxt: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
        textAlign:"center"

  },
});
