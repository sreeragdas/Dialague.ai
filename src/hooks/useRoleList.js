import { useEffect, useState } from 'react';
import { client } from '../axios';

export const useRoleList = (addEmptyItem = false, dependencies = []) => {
  const [roleList, setRoleList] = useState([]);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await client.get('/groups/');
        const { data } = response;

        if (addEmptyItem) {
          data?.unshift({
            id: "",
            name: "- Select Role - "
          });
        }

        setRoleList(data);
      } catch (error) {
        console.error('Error fetching groups list:', error);
      }
    }
    fetchUserList();
  }, [...dependencies]);

  return [roleList];
};
export default useRoleList;