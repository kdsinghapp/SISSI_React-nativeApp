// import React, { useMemo, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   TextInput,
//   TouchableOpacity,
// } from "react-native";
// import StatusBarComponent from "../../../compoent/StatusBarCompoent";
// import { SafeAreaView } from "react-native-safe-area-context";
// import font from "../../../theme/font";
// import { useNavigation } from "@react-navigation/native";
// import ScreenNameEnum from "../../../routes/screenName.enum";
// import imageIndex from "../../../assets/imageIndex";

// type ChatItem = {
//   id: string;
//   name: string;
//   lastMessage: string;
//   time: string;        // e.g., "3:40 PM"
//   avatar: string;      // image url
//   isOnline?: boolean;
//   unreadCount?: number;
// };

// const SAMPLE_DATA: ChatItem[] = [
//   {
//     id: "1",
//     name: "Jenny Wilson",
//     lastMessage: "Of course, we just added that to yo…",
//     time: "3:40 PM",
//     avatar: "https://i.pravatar.cc/100?img=5",
//     isOnline: true,
//     unreadCount: 2,
//   },

// ];

// export default function ChatInboxScreen({
//   onPressChat,
// }: {
//   onPressChat?: (item: ChatItem) => void;
// }) {
//   const [query, setQuery] = useState("");

//   const data = useMemo(() => {
//     const q = query.trim().toLowerCase();
//     if (!q) return SAMPLE_DATA;
//     return SAMPLE_DATA.filter(
//       (i) =>
//         i.name.toLowerCase().includes(q) ||
//         i.lastMessage.toLowerCase().includes(q)
//     );
//   }, [query]);
// const navagtaion = useNavigation()
//   const renderItem = ({ item }: { item: ChatItem }) => (
//     <TouchableOpacity
//       style={styles.row}
//       activeOpacity={0.7}
//       onPress={() =>navagtaion.navigate(ScreenNameEnum.ChatScreen) }
//       // onPress={() => onPressChat?.(item)}
//     >
//       <View style={styles.avatarWrap}>
//         <Image source={{ uri: item.avatar }} style={styles.avatar} />
//         {item.isOnline && <View style={styles.onlineDot} />}
//       </View>

//       <View style={styles.textCol}>
//         <View style={styles.nameTimeRow}>
//           <Text style={styles.name} numberOfLines={1}>
//             {item.name}
//           </Text>
//           <Text style={styles.time}>{item.time}</Text>
//         </View>

//         <View style={styles.messageRow}>
//           <Text
//             style={[styles.lastMessage, item.unreadCount ? styles.unread : null]}
//             numberOfLines={1}
//           >
//             {item.lastMessage}
//           </Text>

//           {!!item.unreadCount && (
//             <View style={styles.badge}>
//               <Text style={styles.badgeText}>{item.unreadCount}</Text>
//             </View>
//           )}
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBarComponent/>
//       <Text style={styles.header}>Inbox</Text>

//       <View style={styles.searchBox}>
//         <TextInput
//           placeholder="Search"
//           placeholderTextColor="#9aa0a6"
//           value={query}
//           onChangeText={setQuery}
//           style={styles.input}
//           returnKeyType="search"
//         />
//       </View>

//       <FlatList
//         data={data} 
//         style={{
//           marginTop:15
//         }}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//         ItemSeparatorComponent={() => <View style={styles.separator} />}
//         contentContainerStyle={{ paddingBottom: 16 }}
//         showsVerticalScrollIndicator={false}
//       /> 
//  <View style ={{
//    justifyContent:"center" ,
//   flex:1,
//   flexDirection:"row"
//  }}>
//       <Image source={imageIndex.chatMt}

//       style={{
//         height:200,
//         width:300 ,
//         bottom:100 ,
//         resizeMode:"cover"
//       }}
//       />
//      </View>z
//     </SafeAreaView>
//   );
// }

// const AVATAR_SIZE = 48;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//     paddingHorizontal: 16,
//     paddingTop: 12,
//   },
//   header: {
//     fontSize: 28,
//      marginBottom: 12,
//     color: "#0f172a",
//     // fontFamily:font.MonolithRegular
//     fontWeight:'bold'
//   },
//   searchBox: {
//     backgroundColor: "#FAFAFA",
//     borderRadius: 20,
//     paddingHorizontal: 14,
//     paddingVertical: 0,  // better alignment with TextInput
//     marginBottom: 8,
//     height: 48,
//     justifyContent: "center",

//     // iOS shadow
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,


//   },
//   input: {
//     fontSize: 16,
//     color: "black",
//      paddingVertical: 0,   // remove extra padding in Android 
//      fontWeight:"500"

//   },
//   separator: {
//     height: 1,
//     backgroundColor: "#eef2f7",
//     marginLeft: AVATAR_SIZE + 16, // align with text column
//   },
//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 12,
//   },
//   avatarWrap: {
//     width: AVATAR_SIZE,
//     height: AVATAR_SIZE,
//     marginRight: 16,
//   },
//   avatar: {
//     width: "100%",
//     height: "100%",
//     borderRadius: AVATAR_SIZE / 2,
//   },
//   onlineDot: {
//     position: "absolute",
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "#22c55e",
//     borderWidth: 2,
//     borderColor: "#FFFFFF",
//   },
//   textCol: {
//     flex: 1,
//   },
//   nameTimeRow: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   name: {
//     flex: 1,
//     fontSize: 16,
//     fontFamily:font.MonolithRegular,
//     color: "#0f172a",
//   },
//   time: {
//     fontSize: 12,
//     color: "#ED8936",
//     marginLeft: 8,
//     fontFamily:font.MonolithRegular

//   },
//   messageRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 4,
//     gap: 8,
//   },
//   lastMessage: {
//     flex: 1,
//     fontSize: 13,
//     color: "#1E1E1E",
//     fontFamily:font.MonolithRegular

//   },
//   unread: {
//     color: "black",
//     fontFamily:font.MonolithRegular ,
//     fontSize:12

//    },
//   badge: {
//     backgroundColor: "#ED8936",
//     borderRadius: 20,
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//      alignItems: "center",
//   },
//   badgeText: {
//     color: "white",
//     fontSize: 11,
//     fontFamily:font.MonolithRegular
//   },
// });


import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import imageIndex from "../../../assets/imageIndex";
import CustomHeader from "../../../compoent/CustomHeader";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import SearchBar from "../../../compoent/SearchBar";
import ScreenNameEnum from "../../../routes/screenName.enum";
import styles from "./style";
import useMessageList from "./useMessageList";
// import EmptyListComponent from "../../../compoent/EmptyListComponent";
import moment from "moment";
import LoadingModal from "../../../utils/Loader";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLanguage } from "../../../LanguageContext";
// import localizationStrings from "../../../compoent/Localization/Localization";


const Messages = () => {
    const {
        isLoading,
        navigation,
        filteredMessages,
        searchData,
        setSearchData,
    } = useMessageList()
const { labels} = useLanguage();
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: "white"
        }}>      {isLoading ? <LoadingModal /> : null}

            <StatusBarComponent />
            <View style={{
                marginTop: 15,
                marginHorizontal: 12
            }}>
                <CustomHeader leftIcon={imageIndex.back} label={labels.inbox} />
            </View>
             <SearchBar
                placeholder={labels.search}
                    value={searchData}
                    onSearchChange={setSearchData}
                />
            <View style={styles.container}>
               
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={filteredMessages}
                    // ListEmptyComponent={<EmptyListComponent message={localizationStrings?.Nochat} />}
                    keyExtractor={(item: any) => item.id}
                    renderItem={({ item }: any) => (
                        <TouchableOpacity style={styles.messageContainer}
                            onPress={() =>
                                navigation.navigate(ScreenNameEnum.ChatScreen, {
                                    item: {
                                        user_name: item?.conversation_user_name,
                                        id: item?.conversation_user_id,
                                        image: item?.conversation_image
                                    }
                                }
                                )
                            }
                        >
                            <Image source={{
                                uri: item.conversation_image == "https://server-php-8-3.technorizen.com/sissi/public/uploads/users/default.png" ? 'https://server-php-8-3.technorizen.com/sissi/public/uploads/users/1765357766_logo.jpg' : item.conversation_image

                            }}
                                style={styles.profileImage} />
                            <View style={styles.textContainer}>
                                <Text style={styles.name}>{item.conversation_user_name}</Text>
                                <Text style={{
                                    color: "#797C7B",
                                    fontSize: 12,
                                    lineHeight: 12,
                                }}>{item?.chat_message}</Text>
                            </View>
                            <View style={styles.timeContainer}>
                                <Text style={styles.time}>
                                    {item?.time_ago}
                                      {/* {item?.chat_updated_at
                                    ? moment(item.chat_updated_at).isBefore(moment().subtract(24, 'hours'))
                                        ? moment(item.chat_updated_at).format("MMMM Do YYYY")
                                        : moment(item.chat_updated_at).fromNow()
                                    : "N/A"}  */}
                                    </Text>
                                {item.unread && <View style={styles.unreadBadge} >
                                    <Text style={{ color: "white", fontSize: 11 }}>4</Text>
                                </View>}
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};



export default Messages;
