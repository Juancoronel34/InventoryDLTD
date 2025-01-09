'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Checkbox } from "../../components/ui/checkbox"
import { useToast } from "../../components/ui/use-toast"

export default function SignUpPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!agreedToTerms) {
      toast({
        title: "Error",
        description: "Please agree to the Terms and Conditions",
        variant: "destructive",
      })
      return
    }

    try {
      // Simulate signup request
      await new Promise(resolve => setTimeout(resolve, 500))
      
      toast({
        title: "Account created",
        description: "Welcome to Drummond LTD!",
      })
      
      router.push('/login')
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create account",
        variant: "destructive",
      })
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

      {/* Sign Up Card */}
      <div className="w-full max-w-[400px] rounded-2xl bg-[#DC0032] p-8 text-white">
        <h1 className="text-2xl font-bold mb-6">Create your ID</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="First name"
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              required
            />
            <Input
              placeholder="Last name"
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              required
            />
          </div>

          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms" 
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
            />
            <label htmlFor="terms" className="text-sm">
              By proceeding, you agree to the{" "}
              <button 
                type="button"
                className="underline hover:text-gray-200"
                onClick={() => window.open('/terms', '_blank')}
              >
                Terms and Conditions
              </button>
            </label>
          </div>

          <Button type="submit" className="w-full bg-white text-[#DC0032] hover:bg-gray-100">
            Sign up with email
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-[#DC0032] px-2">Or Signup with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              className="bg-white text-black hover:bg-gray-100"
              onClick={() => {/* Implement Google sign up */}}
            >
              <Image
                src="/placeholder.svg"
                alt="Google"
                width={20}
                height={20}
                className="mr-2"
              />
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="bg-white text-black hover:bg-gray-100"
              onClick={() => {/* Implement Apple sign up */}}
            >
              <Image
                src="/placeholder.svg"
                alt="Apple"
                width={20}
                height={20}
                className="mr-2"
              />
              Apple
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <button 
            className="font-semibold hover:underline"
            onClick={() => router.push('/login')}
          >
            Login Now
          </button>
        </div>
      </div>
    </div>
  )
}

