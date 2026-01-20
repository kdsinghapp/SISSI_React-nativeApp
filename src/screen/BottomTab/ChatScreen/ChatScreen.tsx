// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   Image,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import StatusBarComponent from "../../../compoent/StatusBarCompoent";
// import imageIndex from "../../../assets/imageIndex";
// import { useNavigation } from "@react-navigation/native"; 
// import font from "../../../theme/font";
// import { color } from "../../../constant";

// interface Message {
//   id: string;
//   text: string;
//   sender: "me" | "other";
//   time: string;
// }

// const ChatScreen = () => {
//   const [messages, setMessages] = useState<Message[]>([
//     { id: "1", text: "Hey there! 👋", sender: "other", time: "10:10" },
//     {
//       id: "2",
//       text: "This is your delivery driver from Speedy Chow. I'm just around the corner.",
//       sender: "other",
//       time: "10:10",
//     },
//     { id: "3", text: "Hi!", sender: "me", time: "10:12" },
//     {
//       id: "4",
//       text: "Awesome, thanks for letting me know! Can’t wait for my delivery. 🎉",
//       sender: "me",
//       time: "10:12",
//     },
//     { id: "5", text: "No problem at all! I’ll be there in about 15 minutes.", sender: "other", time: "10:13" },
//     { id: "6", text: "I’ll text you when I arrive.", sender: "other", time: "10:14" },
//     { id: "7", text: "Great! 😊", sender: "me", time: "10:15" },
//   ]);

//   const [inputText, setInputText] = useState("");

//   const sendMessage = () => {
//     if (inputText.trim().length === 0) return;
//     const newMsg: Message = {
//       id: Date.now().toString(),
//       text: inputText,
//       sender: "me",
//       time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//     };
//     setMessages([...messages, newMsg]);
//     setInputText("");
//   };

//   const renderMessage = ({ item }: { item: Message }) => (
//     <View
//       style={[
//         styles.messageBubble,
//         item.sender === "me" ? styles.myMessage : styles.otherMessage,
//       ]}
//     >
//       <Text style={item.sender === "me" ? styles.myMessageText : styles.otherMessageText}>
//         {item.text}
//       </Text>
//       <Text style={styles.timeText}>{item.time}</Text>
//     </View>
//   );
// const navgtaion = useNavigation()
//   return (
//     <SafeAreaView style={styles.container}>
//         <StatusBarComponent  barStyle="light-content"/>
//        <View style={styles.header}>
//         <TouchableOpacity onPress={()=>{
//             navgtaion.goBack()
//         }}>
//         <Image
//           source={imageIndex.back}
//           style={{
//             height:30,
//             width:30,
//           }}
//         />
//         </TouchableOpacity>
//         <Image
//           source={{ uri: "https://i.pravatar.cc/100" }}
//           style={[styles.avatar,{
//             marginLeft:11
//           }]}
//         />
//         <View>
//           <Text style={styles.name}>Jenny Wilson</Text>
//           <Text style={styles.status}>Online</Text>
//         </View>
//       </View>

//       {/* Chat messages */}

//       <FlatList
//         data={messages}
//         renderItem={renderMessage}
//         keyExtractor={(item) => item.id}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.chatContainer}
//         style={{
//           backgroundColor:'#fff',
//           borderTopLeftRadius:30,
//           borderTopRightRadius:30,
//           borderTopColor:'#000'
//         }}
//       />
// <View style={{backgroundColor:'#fff'}}>
//       {/* Input box */}
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : undefined}
//         keyboardVerticalOffset={80}
//       >
//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Type a message..."
//             value={inputText}
//             onChangeText={setInputText} 
//             placeholderTextColor={"black"}
//           />
//           <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
//             <Image source={imageIndex.send} 

//             style={{
//                 height:30,
//                 width:30,
//                 alignSelf:'center'
//             }}
//             />
//            </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#000" },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 15,
//     // backgroundColor: "#fff",
//     // borderBottomWidth: 1,
//     // borderBottomColor: "#eee",
//   },
//   avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
//   name: {  fontFamily:font.TrialBold, fontSize: 16, color:color.white },
//   status: { fontSize: 12, color: color.white,fontFamily:font.MonolithRegular, },
//   chatContainer: { padding: 10 },
//   messageBubble: {
//     maxWidth: "75%",
//     padding: 10,
//     borderRadius: 15,
//     marginVertical: 5,
//   },
//   myMessage: {
//     alignSelf: "flex-end",
//     backgroundColor: color.primary,
//     borderBottomRightRadius: 0,
//   },
//   otherMessage: {
//     alignSelf: "flex-start",
//     backgroundColor: "#F6F6F6",
//     borderBottomLeftRadius: 0,
//   },
//   myMessageText: { color: "white",fontFamily:font.MonolithRegular, fontSize:14 },
//   otherMessageText: { color: "#2C2D3A",fontFamily:font.MonolithRegular,fontSize:14 },
//   timeText: { fontSize: 10, fontFamily:font.MonolithRegular, marginTop: 5, textAlign: "right" },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//      borderTopWidth: 1,
//     borderTopColor: "#eee",
//     height:55 ,
//     justifyContent:"center" ,
//     marginHorizontal:10 ,
//     marginBottom:30,
//     backgroundColor:'#fff'
//   },
//   input: {
//     flex: 1,
//     backgroundColor: "#f7f7f7",
//     borderRadius: 20,
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     marginRight: 10,
//     height:60 ,
//     justifyContent:"center" ,
//     marginTop:15


//   },
//   sendButton: {
//  justifyContent:"center",
//  alignItems:"center" ,
//  height:55,
// //  backgroundColor:'blue',
//     marginTop:15

// //  marginTop:30

//   },
// });
import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
import imageIndex from "../../../assets/imageIndex";
import useChatScreen from "./useChatScreen";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import { color } from "../../../constant";
import { useLanguage } from "../../../LanguageContext";

const ChatScreen = () => {
  const {
    isLoading,
    navigation,
    userName,
    messageText,
    setMessageText,
    messages,
    sendMessage,
  } = useChatScreen();
const { labels} = useLanguage();
  const currentUserId = userName?.id;

  const renderMessage = ({ item }: any) => {
    const isMe = item.chat_sender_id != currentUserId;

    return (
      <View
        style={[
          styles.messageBubble,
          isMe ? styles.myMessage : styles.otherMessage,
        ]}
      >
        <Text style={isMe ? styles.myText : styles.otherText}>
          {item.chat_message}
        </Text>

        <Text style={[styles.timeText, { color: isMe ? '#f2f2f2' : '#666' }]}>
          {item?.chat_created_at
            ? moment(item.chat_created_at).fromNow()
            : ""}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <StatusBarComponent barStyle="light-content" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "android" ? 0 : 0}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={imageIndex.back} style={styles.backIcon} />
          </TouchableOpacity>

          <Image
            source={{
              uri:
                userName?.image ===
                  "https://server-php-8-3.technorizen.com/sissi/public/uploads/users/default.png"
                  ? "https://server-php-8-3.technorizen.com/sissi/public/uploads/users/1765357766_logo.jpg"
                  : userName?.image,
            }}
            style={styles.avatar}
          />

          <View>
            <Text style={styles.name}>{userName?.user_name}</Text>
            <Text style={styles.status}>{labels.online}</Text>
          </View>
        </View>

        {/* CHAT */}
        <View style={styles.chatWrapper}>
          <FlatList
            data={messages}
            renderItem={renderMessage}
            inverted
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ padding: 15 }}
          />
        </View>

        {/* INPUT */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={labels.typemsg}
            value={messageText}
            onChangeText={setMessageText}
            placeholderTextColor={'grey'}
          />

          <TouchableOpacity onPress={sendMessage}>
            <Image source={imageIndex.send} style={styles.sendIcon} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>

  );
};

export default ChatScreen;
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#000",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },

  backIcon: {
    height: 32,
    width: 32,
    // tintColor: "#fff",
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 12,
  },

  name: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  status: {
    color: "#fff",
    fontSize: 12,
    opacity: 0.7,
  },

  chatWrapper: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  messageBubble: {
    maxWidth: "75%",
    padding: 12,
    borderRadius: 15,
    marginVertical: 6,
  },

  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: color.primary,
    borderBottomRightRadius: 0,
  },

  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#F6F6F6",
    borderBottomLeftRadius: 0,
  },

  myText: {
    color: "#fff",
    fontSize: 14,
  },

  otherText: {
    color: "#000",
    fontSize: 14,
  },

  timeText: {
    fontSize: 10,
    color: "#666",
    marginTop: 4,
    alignSelf: "flex-end",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },

  input: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 45,
    marginRight: 10,
    color: "#000",
  },

  sendIcon: {
    width: 26,
    height: 26,
    tintColor: color.primary,
  },
});
