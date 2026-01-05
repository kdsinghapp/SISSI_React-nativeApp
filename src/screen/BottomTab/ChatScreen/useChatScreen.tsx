import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
// import {   SendMessage } from '../../../redux/Api/AuthApi';
import { useSelector } from 'react-redux';
import { getApiByID } from '../../../api/getApi/getApi';
import { PostApi } from '../../../api/apiRequest';
const useChatScreen = () => {
  const routes: any = useRoute();
  const { item } = routes.params || ""
  const navigation = useNavigation();
  const [isLoading, setisLoading] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const isLogin = useSelector((state: any) => state?.auth);
 
  let userName = item;
  //  console.log(userName, 'this is user')
  const sendMessage = async () => {
    const trimmedMessage = messageText.trim();
    if (!trimmedMessage) return;
    const param = {
      data: {
        sender_id: isLogin?.userData?.id,
        receiver_id: item?.id,
        chat_message: messageText
      },
      url:'chat/insert_chat',
      isFormData:true
      //   senderId: isLogin?.userData?.id,   
      // receiverId:item?.id,
      // chatMessage: messageText,
    };
    setMessages((prevMessages) => [
       {
        id: Date.now().toString(),
        chat_message: trimmedMessage,
        chat_created_at: new Date(),
        sentByUser: true,
      },
      ...prevMessages,
     
    ]);
    try {

      const response = await PostApi(param, setisLoading);
      console.log(response, 'response')
      setMessageText(""),
        GetAbout();
    } catch (error) {
      console.error("Message send failed:", error);
    } finally {
    }
  };


  //   const GetAbout = async () => {
  //      try {
  //       const param = {

  //         senderId: item.id,   
  //         receiverId: isLogin?.userData?.id,
  //        };
  //          const state = await getApiByID('', setisLoading, );  // navigation object pass karein
  //         if (state) {
  //               setMessages(state?.result)
  //         } else {
  //          }
  //     } catch (error) {
  //      }
  // };
  const GetAbout = async () => {
    try {
      setisLoading(true);
      // const userId =  isLogin?.userData?.id
      const param = {
        url: 'chat/get_chat',
        data: {
          sender_id: isLogin?.userData?.id,
          receiver_id: item.id ,
        },
         isFormData:true

      };
      const response = await PostApi(param, setisLoading);
      console.log(response?.data, 'chat')

      if (response && response?.data.length > 0) {
        setMessages(response?.data);
        setMessages(response?.data);
      } else {
        setMessages([]);
        // setMessages([]);
      }
    } catch (error) {
      setMessages([]);
      // setChatMess([]);
      // setFilteredMessages([]);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    GetAbout();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      GetAbout();
    }, 3000);

    return () => clearInterval(interval); // Clean up interval when component unmounts
  }, []);


  return {

    isLoading,
    navigation,
    userName,
    messageText, setMessageText,
    messages, setMessages,
    sendMessage,
    isLogin
  };
};

export default useChatScreen;
