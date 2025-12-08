import React from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import CustomHeader from '../../../compoent/CustomHeader';
import SearchBar from '../../../compoent/SearchBar';
import imageIndex from '../../../assets/imageIndex';
 
const DATA = [
  {
    date: "Monday, 29 January 2025",
    shifts: [
      { id: "1", time: "8:30 AM – 2:30 PM", name: "Ayesha Khan", status: "Complete" },
      { id: "2", time: "8:30 AM – 2:30 PM", name: "Kaiya Workman", status: "Complete" },
      { id: "3", time: "8:30 AM – 2:30 PM", name: "Jocelyn Vaccaro", status: "Complete" },
      { id: "4", time: "8:30 AM – 2:30 PM", name: "Gustavo Baptista", status: "Complete" },
    ]
  }
];

export default function PastShifts() {

  const renderShiftCard = ({ item }) => (
    <View style={styles.card}>
                  <Text style={[styles.statusText,{
                    color:"black"
                  }]}>Monday, 29 January 2025
</Text>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        
        {/* TIME */}
        <View style={{ flexDirection: "row", alignItems: "center" , marginTop:5 }}>
            <Image source={imageIndex.time2} 
            
            style={{
                height:22,
                width:22,
            }}
            />
           <Text style={styles.timeText}>{item.time}</Text>
        </View>

        {/* STATUS */}
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>Complete</Text>
        </View>
      </View>

      {/* NAME */}
      <View style={{ flexDirection: "row", marginTop: 8 }}>
          <Image source={imageIndex.prfile} 
            
            style={{
                height:24,
                width:24, 
             }}
            />
         <Text style={styles.nameText}>{item.name}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
<StatusBarComponent/>

<CustomHeader label='Past Shifts'/>
       <SearchBar/>
      
      <FlatList
        data={DATA} 
        style={{
                paddingHorizontal: 16,

        }}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={{
         
          }}>
            
            {item.shifts.map(shift => (
              <View key={shift.id}>{renderShiftCard({ item: shift })}</View>
            ))}
          </View>
        )}
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    marginTop: 10,
  },

  headerText: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },

  searchBox: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 3,
    marginBottom: 15,
  },

  dateHeader: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 5,
  },

  card: {
 backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,

    // Android shadow
    elevation: 3,

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,

    borderWidth: 1,
    borderColor: "#e6e6e6",
   },

  timeText: {
    marginLeft: 8,
    fontSize: 14,
  },

  nameText: {
    marginLeft: 8,
    fontSize: 15,
    marginTop: 2,
  },

  statusBadge: {
    backgroundColor: "#12C06A",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },

  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});
