import { useEffect, useState } from 'react';
import { client } from '../axios';


export const useUserList = (addEmptyItem = false, dependencies = []) => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await client.get('/user/');
        const { data } = response;

        if (addEmptyItem) {
          data?.unshift({
            id: "",
            name: "- Select Domain - "
          });
        }

        setUserList(data);
      } catch (error) {
        console.error('Error fetching user list:', error);
      }
    }
    fetchUserList();
  }, [...dependencies]);

  return [userList];
};

export default useUserList;