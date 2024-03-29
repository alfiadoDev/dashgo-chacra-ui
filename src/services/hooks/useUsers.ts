import { UseQueryOptions, useQuery } from "react-query"
import { api } from "../api"

type User = {
  id: string
  name: string
  email: string
  created_at: string
}

type GetUserResponse = {
  totalCount: number
  users: User[]
}

export async function getUsers(page: number): Promise<GetUserResponse> {
  const { data, headers } = await api.get('/users', {
    params: {
      page,
    }
  })
  const totalCount = Number(headers['x-total-count'])

  const users = data.users.map(user => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }),
    }
  })


  return {
    users,
    totalCount
  }
}

export function useUsers(page: number, options: UseQueryOptions) {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 5, //quero dizer que esta query nos primeiros 5s ela sera fresh nao sera recarregada
    ...options
  })
}
