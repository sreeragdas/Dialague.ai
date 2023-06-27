import { useEffect, useState } from 'react';
import { client } from '../axios';

const useUploadList = (dependencies = []) => {
  const [uploadList, setUploadList] = useState([]);

  useEffect(() => {
    const fetchUploadList = async () => {
      try {
        const response = await client.get('/upload/');
        setUploadList(response.data);
      } catch (error) {
        console.error('Error fetching upload list:', error);
      }
    };

    fetchUploadList();
  }, [...dependencies]);

  return [uploadList];
};

export default useUploadList;