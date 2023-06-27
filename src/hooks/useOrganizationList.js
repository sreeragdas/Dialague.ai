import { useEffect, useState } from 'react';
import { client } from '../axios';

const useOrganizationList = (addEmptyItem = false, dependencies = []) => {
  const [orgList, setOrganizationList] = useState([]);

  useEffect(() => {
    const fetchOraganizationList = async () => {
      try {
        const response = await client.get('/organization/');

        const { data } = response;

        if (addEmptyItem) {
          data?.unshift({
            id: "",
            company_name: "- Select Organization - "
          });
        }

        setOrganizationList(data);
      } catch (error) {
        console.error('Error fetching organization list:', error);
      }
    };

    fetchOraganizationList();
  }, [...dependencies]);

  return [orgList];
};

export default useOrganizationList;