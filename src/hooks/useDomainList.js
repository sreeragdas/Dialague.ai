import { useEffect, useState } from 'react';
import { client } from '../axios';

const useDomainList = (addEmptyItem = false, dependencies = []) => {
  const [domainList, setDomainList] = useState([]);

  useEffect(() => {
    const fetchDomainList = async () => {
      try {
        const response = await client.get('/domains/');

        const { data } = response;

        if (addEmptyItem) {
          data?.unshift({
            id: "",
            name: "- Select Domain - "
          });
        }
        setDomainList(data);
      } catch (error) {
        console.error('Error fetching domain list:', error);
      }
    };

    fetchDomainList();
  }, [...dependencies]);

  return [domainList];
};

export default useDomainList;