import { $http } from '@/lib/http';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { PaginatedPapersResponse } from '../types';


const useGetPapers = ({ search }: { search?: string}) => {
    return useQuery({
        queryKey: ['papers', search],
        queryFn: async () => {
          const res = await $http.get<PaginatedPapersResponse>('/papers', { params: { search } });
          return res.data
        }
      })
}

export default useGetPapers