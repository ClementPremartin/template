'use client'

import UserCard from '../components/UserCard'
import { useEffect, useState } from 'react'

const USERS = `
  query getUsers {
    getUsers {
      email
      firstname
      id
      lastname
    }
  }
`
export type User = {
  email: string
  firstname: string
  id: number
  lastname: string
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[] | null | undefined>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)
  const [error, setError] = useState<String>('')

  useEffect(() => {
    fetch('http://localhost:4000/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: USERS }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok')
        }
        return res.json()
      })
      .then((res: any) => {
        const users: User[] = res.data.getUsers
        if (users && users !== null) {
          setUsers(users)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        setIsError(true)
        setError(`Error fetching data: ${error}`)
      })
  }, [])
  if (isLoading)
    return (
      <>
        <div className="animate-pulse bg-red-600 w-52 flex flex-col rounded-md p-3">
          <h1 className="flex justify-center">User Card</h1>
        </div>
      </>
    )

  if (isError) return <p>Error : {error}</p>
  return (
    <>
      <h1>Users List</h1>
      <ul role="list" className="divide-y divide-gray-100">
        {users &&
          users?.map((user) => {
            return (
              <li className="flex justify-between gap-x-6 py-5" key={user.id}>
                <UserCard user={user} />
              </li>
            )
          })}
      </ul>
    </>
  )
}

export default UsersPage
