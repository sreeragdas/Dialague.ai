import { useEffect, useState } from 'react';
import { client } from '../axios';

const usePermissionList = (addEmptyItem = false, dependencies = []) => {
  const [permissionList, setPermissionList] = useState([]);

  useEffect(() => {
    const fetchPermissionList= async () => {
      try {
        const response = await client.get('/permission/');

        const { data } = response;

        if (addEmptyItem) {
          data?.unshift({
            id: "",
            name: "- Select Permission - "
          });
        }
        setPermissionList(data);
      } catch (error) {
        console.error('Error fetching Permission list:', error);
      }
    };

    fetchPermissionList();
  }, [...dependencies]);

  return [permissionList];
};

export default usePermissionList;