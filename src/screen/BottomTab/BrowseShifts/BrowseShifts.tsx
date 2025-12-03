import React from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
 
export default function App() {
  return (
    <View style={styles.container}>

      {/* Top Header */}
      <View style={styles.header}>
        {/* <Icon name="arrow-back" size={26} color="#000" /> */}
        <Text style={styles.headerText}>Browse Shifts</Text>
      </View>

      {/* Search Box */}
      <View style={styles.search}>
        {/* <Icon name="search-outline" size={20} color="#999" /> */}
        <TextInput placeholder="Search" style={styles.searchInput} />
      </View>

      {/* All Cards List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <ShiftCard />
   
      </ScrollView>

    </View>
  );
}

function ShiftCard() {
  return (
    <View style={styles.card}>

      {/* <Icon name="business" size={48} color="#F3178B" style={{ alignSelf: "center", marginBottom: 10 }} /> */}

      {/* Row 1 */}
      <View style={styles.row}>
        <Text style={styles.title}>Institution Name</Text>
        <Text style={styles.title}>Unit Name</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.value}>BrightCare Child Protection Unit</Text>
        <Text style={[styles.value,{
          left:20
        }]}>Early Development Wing</Text>
      </View>

      {/* Row 2 */}
      <View style={styles.row}>
        <Text style={styles.title}>Date & Time</Text>
        <Text style={styles.title}>Location</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.value}>Wednesday, 12 Feb 2025{"\n"}10:00 AM – 4:00 PM</Text>
        <Text  style={[styles.value,{
          left:20
        }]}>Sector 12, City Center</Text>
      </View>



   <View style={styles.row}>
        <Text style={styles.title}>Short Description</Text>
        <Text style={styles.title}>Badge</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.value}>Assist staff with daily care routines, supervision & meal support.</Text>
 <View style={{ marginTop: 10 }}>
        <Text style={styles.badge}>Available</Text>
      </View>
            </View>
      {/* Description */}
      

      {/* Badge */}
     

      {/* Buttons */}
      <View style={styles.btnRow}>
        <TouchableOpacity style={styles.btnFavorite}>
          <Text style={styles.btnFavoriteText}>Favorite</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnBook}>
          <Text style={styles.btnBookText}>Book Now</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    paddingTop: 50
  },

  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  headerText: { fontSize: 20, marginLeft: 12, fontWeight: "600" },

  search: {
    flexDirection: "row",
    backgroundColor: "#f1f1f1",
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 20
  },
  searchInput: { marginLeft: 10, flex: 1, fontSize: 15 },

  card: {
    borderWidth: 1.5,
    borderColor: "#F3178B",
    borderRadius: 14,
    padding: 18,
    marginBottom: 25
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12
  },

  title: { fontWeight: "700", color: "#0056B3", fontSize: 15 },
  value: { width: "40%",   color: "#555", fontSize: 14 },

  desc: {
    marginTop: 6,
    color: "#555",
    fontSize: 14,
    lineHeight: 18
  },

  badge: {
    backgroundColor: "#16C172",
    color: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: "flex-start",
    fontWeight: "700",
    fontSize: 13
  },

  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20
  },

  btnFavorite: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#F3178B",
    padding: 14,
    borderRadius: 30,
    marginRight: 8
  },
  btnFavoriteText: {
    color: "#F3178B",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "700"
  },

  btnBook: {
    flex: 1,
    backgroundColor: "#F3178B",
    padding: 14,
    borderRadius: 30,
    marginLeft: 8
  },
  btnBookText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "700"
  }
});
