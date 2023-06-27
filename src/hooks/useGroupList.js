import { useEffect, useState } from 'react';
import { client } from '../axios';

const useGroupList = (addEmptyItem = false, dependencies = []) => {
  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
    const fetchGroupList = async () => {
      try {
        const response = await client.get('/groups/');
        const { data } = response;

        if (addEmptyItem) {
          data?.unshift({
            id: "",
            name: "- Select Role - "
          });
        }

        setGroupList(response.data);
      } catch (error) {
        console.error('Error fetching group list:', error);
      }
    };

    fetchGroupList();
  }, [...dependencies]);

  return [groupList];
};

export default useGroupList;