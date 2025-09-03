import { $http } from '@/lib/http'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Field } from '../types'

const useGetFields = () => {
  return useQuery({
    queryKey: ['fields'],
    queryFn: async () => {
      const res = await $http.get<Field[]>('/fields');
      return res.data
    }
  })
}

export default useGetFields