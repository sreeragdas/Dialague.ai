import { useEffect, useState } from 'react';
import { client } from '../axios';

const useSubDomainFromDomain = (domainId="", addEmptyItem = false, dependencies = []) => {
  const [subDomainList, setSubDomainList] = useState([]);

  useEffect(() => {
    const fetchDomainList = async () => {
      try {
        const response = await client.get(`/domains/${domainId}/subdomains/`);

        const { data } = response;

        if (addEmptyItem) {
          data?.unshift({
            id: "",
            name: "- Select Subdomain - "
          });
        }

        setSubDomainList(data);
      } catch (error) {
        console.error('Error fetching domain list:', error);
      }
    };


    if (domainId) {
      fetchDomainList();
    }
  }, [...dependencies]);

  return [subDomainList];
};

export default useSubDomainFromDomain;