'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Checkbox } from "../../components/ui/checkbox"
import { useToast } from "../../components/ui/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState('juan.coronel34@hotmail.com')
  const [password, setPassword] = useState('coronel34$')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (email === "juan.coronel34@hotmail.com" && password === "coronel34$") {
      toast({
        title: 'Login successful',
        description: 'Welcome back, Juan!',
      })
      router.push('/dashboard')
    } else {
      toast({
        title: 'Error',
        description: 'Invalid credentials',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
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

      <div className="w-full max-w-[400px] rounded-2xl bg-[#DC0032] p-8 text-white">
        <h1 className="text-2xl font-bold mb-6">Login to your account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white text-black"
          />
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-white text-black pr-10"
            />
            <button
              type="button"
              className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={remember}
                onCheckedChange={(checked) => setRemember(checked as boolean)}
              />
              <label htmlFor="remember" className="text-sm">
                Remember me
              </label>
            </div>
            <button 
              type="button" 
              onClick={() => router.push('/reset-password')}
              className="text-sm hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <Button type="submit" className="w-full bg-white text-[#DC0032] hover:bg-gray-100">
            Sign in with email
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-[#DC0032] px-2">Or login with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              className="bg-white text-black hover:bg-gray-100"
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

          <div className="mt-6 text-center text-sm">
            Don&apos;t have an account?{" "}
            <button 
              type="button"
              onClick={() => router.push('/signup')}
              className="font-semibold hover:underline"
            >
              Get Started
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

