import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import imageIndex from "../../../assets/imageIndex";
import PostSuccessfull from "../../../compoent/PostSuccessfull";
import ScreenNameEnum from "../../../routes/screenName.enum";
import { color } from "../../../constant";
 
const ShiftBooking = () => {
    const [visible,setvisible] = useState(false) 
    const [Decline,setDecline] = useState(false) 
    
  const data = [ 
    {
      id: 1,
      name: "Davis Bergson",
      date: "14 Feb 2025",
      time: "08:00 AM – 04:00 PM",
      section: "Child Care – Section B",
    },
    {
      id: 2,
      name: "Jaydon Bergson",
      date: "14 Feb 2025",
      time: "08:00 AM – 04:00 PM",
      section: "Child Care – Section B",
    },
    {
      id: 3,
      name: "Ann Workman",
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
        <View style={styles.statusChip}>
          <Text style={styles.statusText}>Waiting For Approval</Text>
        </View>
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
                 <Image source={imageIndex.time2} 
         style={[styles.image,{
            tintColor:"#F3178B"
         }]}
         
         />
         <Text style={styles.value}>{item.time}</Text>
      </View>

      {/* SECTION */}
      <View style={styles.row}>
         <Image source={imageIndex.Health} 
         style={[styles.image,{
            tintColor:"#F3178B"
         }]}
         
         />
        <Text style={styles.value}>{item.section}</Text>
      </View>

      {/* BUTTONS */}
      <View style={styles.btnRow}>
        <TouchableOpacity style={styles.approveBtn}
        
        
        onPress={()=>{
              setvisible(true);
        }}
        >
          <Text style={styles.btnTextWhite}>Approve</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.declineBtn} 
                onPress={()=>{
            setDecline(true);

        }}
           
        >
          <Text style={styles.btnTextWhite}>Decline</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}> 
    <StatusBarComponent/> 

    <Text style={{
      fontWeight:"600" ,
      color:"black" ,
      fontSize:16
    }}>Shift Booking Request</Text>
      <FlatList data={data}   

      showsVerticalScrollIndicator={false}
style={{
    marginTop:4
}}
renderItem={renderCard} keyExtractor={item => item.id.toString()} />
<PostSuccessfull  
userImage={imageIndex.post1}
          visible={visible}
          title={"Shift Approved Successfully"}
          subTitle={"Worker has been notified and the shift is confirmed."}
          butt={"Done"}
onOpenChat={() => {
    setvisible(false);
    // navgation.navigate(ScreenNameEnum.Tab2Navigator);
}}
        
  onClose={()=>{
    setvisible(false)
  }}
          />
<PostSuccessfull  
userImage={imageIndex.Decline}
          visible={Decline}
          title={"Shift Request Declined"}
          subTitle={"Worker will see the decline reason and can apply for other shifts."}
          butt={"Done"}
onOpenChat={() => {
    setDecline(false);
    // navgation.navigate(ScreenNameEnum.Tab2Navigator);
}}
        
  onClose={()=>{
    setDecline(false);
  }}
          />
    </SafeAreaView>
  );
};

export default ShiftBooking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
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
 
  // iOS shadow
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 4, 
  borderWidth:1.5,
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
        justifyContent:"center"

  },

  declineBtn: {
    backgroundColor: "#FF383C",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    justifyContent:"center"
  },

  btnTextWhite: {
    color: "#FFF",
    fontWeight: "600",
  },
});
