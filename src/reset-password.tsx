'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { EyeIcon, EyeOffIcon, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent } from "@/components/ui/dialog"

export default function ResetPassword() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === confirmPassword && password.length > 0) {
      setShowSuccess(true)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      {/* Logo */}
      <div className="mb-8 w-full max-w-[300px]">
        <Image
          src="/placeholder.svg"
          alt="Drummond LTD. Colombia"
          width={300}
          height={80}
          className="w-full"
          priority
        />
      </div>

      {/* Reset Password Card */}
      <div className="w-full max-w-[400px] rounded-2xl bg-[#DC0032] p-8 text-white">
        <h1 className="text-2xl font-bold mb-4">Create new password</h1>
        <p className="text-sm mb-6">
          Please enter a new password. Your new password must be different from previous password.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>

          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>

          <Button type="submit" className="w-full bg-white text-[#DC0032] hover:bg-gray-100">
            Reset Password
          </Button>
        </form>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="bg-[#DC0032] text-white p-8 rounded-2xl max-w-[400px]">
          <button 
            onClick={() => setShowSuccess(false)}
            className="absolute right-4 top-4 text-white hover:text-gray-200"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="flex flex-col items-center text-center">
            <div className="bg-white/10 p-4 rounded-full mb-6">
              {/* You can replace this with your actual success icon */}
              <div className="w-16 h-16 flex items-center justify-center">
                <Image
                  src="/placeholder.svg"
                  alt="Success"
                  width={64}
                  height={64}
                  className="w-full"
                />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-4">
              Your successfully changed your password
            </h2>
            
            <p className="text-sm mb-6">
              Commodo gravida eget ultricies sed in lacus. Commodo, tellus duis eros pellentesque.
            </p>
            
            <Button 
              onClick={() => router.push('/login')}
              className="w-full bg-white text-[#DC0032] hover:bg-gray-100"
            >
              Back to Login
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
