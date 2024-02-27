import { User } from '../../users/page'
import Image from 'next/image'

type PropsType = {
  user: User
}

const UserCard = ({ user }: PropsType) => {
  return (
    <div className="flex min-w-0 gap-x-4 w-full ml-5 mr-5">
      <Image
        className="h-12 w-12 flex-none rounded-full bg-gray-50"
        src={`https://gravatar.com/avatar/${user.id}?s=400&d=robohash&r=x`}
        alt="Profile picture"
        width={100}
        height={100}
      />
      <div className="min-w-0 flex-auto">
        <p className="text-sm font-semibold leading-6 text-gray-900">
          {user.firstname} {user.lastname}
        </p>
        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
          {user.email}
        </p>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="text-sm leading-6 text-gray-900">Co-Founder / CEO</p>
        <p className="mt-1 text-xs leading-5 text-gray-500">
          Last seen <time dateTime="2023-01-23T13:23Z">3h ago</time>
        </p>
      </div>
    </div>
  )
}

export default UserCard
