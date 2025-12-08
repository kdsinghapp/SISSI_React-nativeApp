import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import imageIndex from "../../../assets/imageIndex";
import PostSuccessfull from "../../../compoent/PostSuccessfull";
import CustomHeader from "../../../compoent/CustomHeader";
import ScreenNameEnum from "../../../routes/screenName.enum";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "../../../compoent/SearchBar";
import { color } from "../../../constant";
  
const PostedShifts = () => {
 
    const navigatorv = useNavigation()
    
  const data = [ 
    {
      id: 1,
      name: "Wed, 12 February 2025",
      date: "14 Feb 2025",
      time: "08:00 AM – 04:00 PM",
      section: "Child Care – Section B",
    },
    
    {
      id: 2,
      name: "Wed, 12 February 2025",
      date: "14 Feb 2025",
      time: "08:00 AM – 04:00 PM",
      section: "Child Care – Section B",
    },
  ];

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      {/* NAME ROW */}
      <View style={styles.headerRow}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={[styles.statusChip,{
            flexDirection:"row" ,
            alignItems:"center"
        }]}>
            <Image source={imageIndex.eye} 
            style={{
                height:22,
                width:22,
                resizeMode:"contain"
            }}
            />
          <Text style={[styles.statusText,{
            marginLeft:8
          }]}>2</Text>
        </View>
      </View>

      {/* DATE */}
      <View style={styles.row}>
        
        <Text style={styles.value}>10:00 AM – 4:00 PM
</Text>
      </View>
      <View style={ {
        backgroundColor:"#31CFF0" ,
        width:"45%" ,
        borderRadius:20 ,
        height:28,
        justifyContent:"center"
       }}>
        
        <Text style={[styles.value,{
            color:"white"
        }]}>No bookings yet
</Text>
      </View>

      {/* TIME */}
   

      {/* SECTION */}
     

      {/* BUTTONS */}
      <View style={styles.btnRow}>
        <TouchableOpacity style={styles.approveBtn}
        
        
        onPress={()=>{
            //   setvisible(true);
        }}
        >
          <Text style={styles.btnTextWhite}>Remove  </Text>
             <Image source={imageIndex.REMOVE} 
          style={{
            height:22,
            width:22
          }}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.declineBtn} 
                onPress={()=>{
 navigatorv.navigate(ScreenNameEnum.CreateNewShift,{
    type: "Edit"
 })
        }}
           
        > 
          <Text style={styles.btnTextWhite}>Edit </Text> 
          <Image source={imageIndex.editp} 
          style={{
            height:22,
            width:22
          }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}> 
    <StatusBarComponent/>
    <CustomHeader label="Posted Shifts"/> 

    <SearchBar/>
      <FlatList data={data}   

      showsVerticalScrollIndicator={false}
style={{
    marginTop:11 ,
    marginHorizontal:15
}}
renderItem={renderCard} keyExtractor={item => item.id.toString()} />
     </SafeAreaView>
  );
};

export default PostedShifts;

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

  // Android shadow
 
  // iOS shadow
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4, 
  borderWidth:1.5 ,
  borderColor:color.borderColor
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
     paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 20,
  },

  statusText: {
    fontSize: 12,
    color: "black",
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
    backgroundColor: "#FF383C",
    paddingVertical: 10,
     borderRadius: 25,
        justifyContent:"space-evenly",
            flexDirection:"row" ,
    alignItems:"center" ,
    width:
    "40%"

  },

  declineBtn: {
    backgroundColor: "#F3178B",
    paddingVertical: 10,
    width:
    "40%",    borderRadius: 25,
        justifyContent:"space-evenly",
    flexDirection:"row" ,
    alignItems:"center"
  },

  btnTextWhite: {
    color: "#FFF",
    fontWeight: "600",
  },
});
