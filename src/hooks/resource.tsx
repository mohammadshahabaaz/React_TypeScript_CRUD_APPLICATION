// useGetResource.ts
import { useState, useEffect } from 'react';
import { IResource } from '../models/IResourceModel';
import { fetchResources } from '../Utils/apiUtils';

interface UseGetResourceResult {
  data: IResource[] | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useGetResource(): UseGetResourceResult {
  const [data, setData] = useState<IResource[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const resources = await fetchResources();
      setData(resources);
      setError(null);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, error, refetch: fetchData };
}









// import React, { useState, useEffect } from 'react';
// // import { ReactQueryConstant } from '../enums/ReactQueryConstant'
// import { IResource } from '../models/IResourceModel' // Please ensure this path is correct
// import { fetchResources } from '../Utils/apiUtils';

// interface UseGetResourceResult {
//   data: IResource[] | null;
//   isLoading: boolean;
//   error: Error | null;
// }

// export function useGetResource(): UseGetResourceResult {
//   const [data, setData] = useState<IResource[] | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);

//   useEffect(() => {
//     const loadData = async () => {
//       setIsLoading(true);
//       try {
//         // Assuming fetchResources returns a promise that resolves with the data
//         const resources = await fetchResources();
//         setData(resources);
//         setError(null);
//       } catch (err) {
//         setError(err as Error);
//         setData(null);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadData();
//   }, []); // Empty dependency array means this effect runs once on mount

//   return { data, isLoading, error };
// }
