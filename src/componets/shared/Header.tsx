'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Search, Bell, ChevronDown, Settings, LogOut } from 'lucide-react'
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

interface HeaderProps {
  user: {
    name: string;
    role: string;
    avatar: string;
    email: string;
  };
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  notificationCount: number;
}

export default function Header({ user, searchQuery, setSearchQuery, notificationCount }: HeaderProps) {
  const router = useRouter()

  const handleLogout = () => {
    router.push('/login')
  }

  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold">Hi, {user.name}</h1>
        <p className="text-gray-500">Let's check your Drones today</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-64"
          />
        </div>

        <Button variant="ghost" className="relative">
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-[#DC0032] rounded-full text-[10px] text-white flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 p-1 px-2 hover:bg-gray-100 rounded-full">
              <Image
                src={user.avatar}
                alt={user.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="text-left mr-2">
                <p className="font-medium text-sm">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[240px]">
            <DropdownMenuItem onClick={() => router.push('/settings')} className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-[#DC0032]">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

