'use client'

import Loader from '../components/Loader'
import AddUser from '../components/users/AddUser'
import UserCard from '../components/users/UserCard'
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

const CREATE_USER = `
  mutation createUser($firstname: String!, $lastname: String!, $email: String!) {
  createUser(firstname: $firstname, lastname: $lastname, email: $email) {
    id
    firstname
    lastname
    email
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
  const [isDialogVisile, setIsDialogVisible] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = () => {
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
  }

  const createUser = (firstname: String, lastname: String, email: String) => {
    fetch('http://localhost:4000/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: CREATE_USER,
        variables: {
          firstname: firstname,
          lastname: lastname,
          email: email,
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          console.log(res)
          throw new Error('Network response was not ok')
        }
        return res.json()
      })
      .then((data) => {
        console.log(data)
        fetchUsers()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  if (isLoading)
    return (
      <>
        <h1>Users List</h1>
        <Loader />
      </>
    )

  if (isError) return <p>Error : {error}</p>
  return (
    <>
      <div className="flex justify-between mt-5 mr-5 pl-5">
        <h1>Users List</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsDialogVisible(true)}
        >
          Ajouter
        </button>
      </div>
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
      <AddUser
        isDialogVisible={isDialogVisile}
        setIsDialogVisible={setIsDialogVisible}
        createUser={createUser}
      />
    </>
  )
}

export default UsersPage
