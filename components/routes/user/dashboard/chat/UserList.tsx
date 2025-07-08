import Image from 'next/image'
import { User } from './type'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserListProps {
  users: User[]
  onUserSelect: (user: User) => void
  selectedUser: User | null
}

export default function UserList({ users, onUserSelect, selectedUser }: UserListProps) {
  return (
    <div className="w-1/4 border-r border-border">
      <h2 className="text-xl font-semibold p-4 border-b border-border">Users</h2>
      <ScrollArea className="h-[calc(100vh-5rem)]">
        {users.map((user) => (
          <div
            key={user.id}
            className={`flex items-center p-4 cursor-pointer hover:bg-accent ${
              selectedUser?.id === user.id ? 'bg-accent' : ''
            }`}
            onClick={() => onUserSelect(user)}
          >
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="text-foreground">{user.name}</span>
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}

