'use client'

import { SetStateAction, useState } from 'react'
import Image from 'next/image'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { Button } from "/home/codespace/Drummond-Inventory/InventoryDLTD/src/componets/shared/ui/button.tsx"
import { Input } from "/home/codespace/Drummond-Inventory/InventoryDLTD/src/componets/shared/ui/input.tsx"
import { Checkbox } from "/home/codespace/Drummond-Inventory/InventoryDLTD/src/componets/shared/ui/checkbox.tsx"
import { useToast } from "/home/codespace/Drummond-Inventory/InventoryDLTD/src/main.tsx"
import { useRouter } from 'next/navigation'

const App: React.FC = () => {
  const toast = useToast();

  const mostrarToast = () => {
    toast.success('¡Operación exitosa!', {
      duration: 3000, // Duración en milisegundos
      position: 'top-right', // Posición del toast
    });
  };

  return (
    <div>
      <h1>Ejemplo de Toast</h1>
      <button onClick={mostrarToast}>Mostrar Toast</button>
    </div>
  );
};

// export default App;
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Test credentials validation
    if (email === '1234' && password === '1234') {
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido al sistema",
      })
    } else {
      toast({
        title: "Error de autenticación",
        description: "Credenciales incorrectas",
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

      {/* Login Card */}
      <div className="w-full max-w-[400px] rounded-2xl bg-[#DC0032] p-8 text-white">
        <h1 className="text-2xl font-bold mb-6">Login to your account</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e: { target: { value: SetStateAction<string> } }) => setEmail(e.target.value)}
              className="bg-white text-black"
            />
          </div>

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e: { target: { value: SetStateAction<string> } }) => setPassword(e.target.value)}
              className="bg-white text-black pr-10"
            />
            <Button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              )}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
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
        </form>

        <div className="mt-6 text-center text-sm">
          Don&apos;t have an account?{" "}
          <button className="font-semibold hover:underline">
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}

