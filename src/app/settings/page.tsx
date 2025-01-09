'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Camera, Mail, Phone, Building2, User, Lock, Bell, Globe, LogOut } from 'lucide-react'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Switch } from "../../components/ui/switch"
import { Separator } from "../../components/ui/separator"
import Header from '../../components/shared/Header'
import Sidebar from '../../components/shared/Sidebar'
import { useToast } from "../../components/ui/use-toast"

export default function Settings() {
  const router = useRouter()
  const { toast } = useToast()
  const [profileImage, setProfileImage] = useState('/placeholder.svg')
  const [formData, setFormData] = useState({
    name: 'Diego Delgado',
    email: 'diego.delgado@drummond.com',
    phone: '+57 300 123 4567',
    department: 'Drone Operations',
    role: 'Drone Pilot'
  })

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    })
  }

  const handleLogout = () => {
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-64 p-8">
        <Header 
          user={{
            name: formData.name,
            role: formData.role,
            avatar: profileImage,
            email: formData.email
          }}
          searchQuery=""
          setSearchQuery={() => {}}
          notificationCount={0}
        />

        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold">Settings</h1>

          {/* Profile Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6">Profile Information</h2>
            <div className="flex items-start gap-8">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <Image
                    src={profileImage}
                    alt="Profile"
                    width={120}
                    height={120}
                    className="rounded-full"
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute bottom-0 right-0 rounded-full bg-white"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="outline" className="w-full">
                  Change Photo
                </Button>
              </div>

              <div className="flex-1 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Department</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        value={formData.department}
                        onChange={(e) => setFormData({...formData, department: e.target.value})}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Password Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Password
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Input type="password" placeholder="Current Password" />
              <Input type="password" placeholder="New Password" />
            </div>
          </div>

          {/* Notifications Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive emails about your account activity</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Low Stock Alerts</p>
                  <p className="text-sm text-gray-500">Get notified when products are running low</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Order Updates</p>
                  <p className="text-sm text-gray-500">Receive updates about supplier orders</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          {/* System Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Globe className="h-5 w-5" />
              System
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Language</p>
                <p className="text-sm text-gray-500">Select your preferred language</p>
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                English
              </Button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-red-600 mb-6">Danger Zone</h2>
            <Button 
              variant="destructive" 
              className="bg-[#DC0032]"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <Button variant="outline">Cancel</Button>
            <Button 
              className="bg-[#DC0032] hover:bg-[#DC0032]/90"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

