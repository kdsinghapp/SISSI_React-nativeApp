import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import imageIndex from "../../../assets/imageIndex";
import PostSuccessfull from "../../../compoent/PostSuccessfull";
import ScreenNameEnum from "../../../routes/screenName.enum";
import CustomHeader from "../../../compoent/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "../../../compoent/SearchBar";
 
const BookedShifts = () => {
    const [visible,setvisible] = useState(false) 
    const [Decline,setDecline] = useState(false) 
 
 const navigator = useNavigation()
    const data = [ 
    {
      id: 1,
      name: "Saturday, 15 February 2025",
      date: "18:30 AM – 2:30 PM",
      time: "Ayesha Khan ",
      section: "+91 98765 44321",
    },
    {
      id: 2,
      name: "Tuesday, 18 February 2025",
      date: "1:00 PM – 7:00 PM",
      time: "Salman Ahmed ",
      section: "+91 98765 44321",
    },
    
  ];

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      {/* NAME ROW */}
      <View style={styles.headerRow}>
        <Text style={styles.name}>{item.name}</Text>
        
      </View>

      {/* DATE */}
      <View style={styles.row}>
         <Image source={imageIndex.calneder} 
         style={styles.image}
         
         />
        <Text style={styles.value}>{item.date}</Text>
      </View>

      {/* TIME */}
      <View style={styles.row}>
                 <Image source={imageIndex.pfioel12} 
         style={[styles.image,{
            tintColor:"#F3178B"
         }]}
         
         />
         <Text style={styles.value}>{item.time}</Text>
      </View>

      {/* SECTION */}
      <View style={styles.row}>
         <Image source={imageIndex.call} 
         style={[styles.image,{
            tintColor:"#F3178B"
         }]}
         
         />
        <Text style={styles.value}>{item.section}</Text>
      </View>

      {/* BUTTONS */}
      <View style={styles.btnRow}>
        <TouchableOpacity style={styles.approveBtn}
        
        
       
        >
          <Text style={styles.btnTextWhite}>Complete </Text>
           <Image  
          style={{
            height:22,

            width:22, 
            marginLeft:11
          }}
          source={imageIndex.post1}
          
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.declineBtn} 
                onPress={()=>{
           navigator.navigate(ScreenNameEnum.ChatScreen)

        }}
           
        >
          <Text style={styles.btnTextWhite}>Open Chat</Text> 
          <Image  
          style={{
            height:22,

            width:22, 
            marginLeft:11
          }}
          source={imageIndex.mess1}
          
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}> 
    <StatusBarComponent/> 
    <CustomHeader label="Booked Shifts"/> 
    <SearchBar/>
      <FlatList data={data}   

      showsVerticalScrollIndicator={false}
style={{
    marginTop:11 ,
        padding: 16,

}}
renderItem={renderCard} keyExtractor={item => item.id.toString()} />
     </SafeAreaView>
  );
};

export default BookedShifts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
image:{
    height:21,
    width:21, 
    resizeMode:"contain"

} ,
  card: {
  backgroundColor: '#FFFFFF',
  padding: 15,
  borderRadius: 15,
  marginBottom: 16,

  // ANDROID shadow
  elevation: 3,

  // iOS shadow
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 4,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  name: {
    fontSize: 17,
    fontWeight: "700",
    color: "#222",
  },

  statusChip: {
    backgroundColor: "#FF8D28",
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 20,
  },

  statusText: {
    fontSize: 12,
    color: "white",
    fontWeight: "600",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  value: {
    marginLeft: 8,
    fontSize: 14,
    color: "#444",  
    fontWeight:"500"
  },

  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },

  approveBtn: {
    backgroundColor: "#34C759",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
         justifyContent:"center" ,
    flexDirection:"row" ,
    alignItems:"center"

  },

  declineBtn: {
    backgroundColor: "#F3178B",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    justifyContent:"center" ,
    flexDirection:"row" ,
    alignItems:"center"
  },

  btnTextWhite: {
    color: "#FFF",
    fontWeight: "600",
  },
});
