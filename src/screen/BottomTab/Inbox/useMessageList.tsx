 
import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { getApiByID } from '../../../api/getApi/getApi';
import { PostApi } from '../../../api/apiRequest';

const useMessageList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<any>();
  const [chatMess, setChatMess] = useState<any[]>([]);
  const isLogin = useSelector((state: any) => state?.auth);
  const [searchData, setSearchData] = useState('');
  const [filteredMessages, setFilteredMessages] = useState<any[]>([]);

  
  const GetAbout = async () => {
    try {
      setIsLoading(true);
      // const userId =  isLogin?.userData?.id
      console.log(isLogin?.userData)
      const param ={
        url:'chat/get_last_messages',
        data:{
// type:isLogin?.userData?.type == 'User' ? 'Institution':'User',
user_id:isLogin?.userData?.id
        }
        

      }
      const response = await PostApi(param,  setIsLoading );
        console.log(response?.data,'chat')

      if (response && response?.data.length > 0) {
        setChatMess(response?.data);
        setFilteredMessages(response?.data);
      } else {
        setChatMess([]);
        setFilteredMessages([]);
      }
    } catch (error) {
      setChatMess([]);
      setFilteredMessages([]);
    } finally {
      setIsLoading(false);
    }
  };

 useFocusEffect(
  useCallback(() => {
    GetAbout();

    return () => {
      // optional: cleanup when screen goes out of focus
    };
  }, [])
);

  useEffect(() => {
    if (searchData?.trim() === '') {
      setFilteredMessages(chatMess);
    } else {
      const filtered = chatMess?.filter((msg) =>
        msg?.conversation_user_name?.toLowerCase().includes(searchData?.toLowerCase())
      );
      setFilteredMessages(filtered);
    }
  }, [searchData, chatMess]);

  return {
    chatMess,
    setChatMess,
    isLoading,
    navigation,
    filteredMessages,
    setFilteredMessages,
    searchData,
    setSearchData,
  };
};

export default useMessageList;
