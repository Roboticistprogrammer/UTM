import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DroneXLogo } from "@/components/dronex-logo"

export default function ForgotPassword() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50">
      <div className="w-full max-w-md space-y-8 px-4 sm:px-0">
        <div className="flex flex-col items-center space-y-2">
          <DroneXLogo className="h-16 w-16 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Reset Password</h1>
          <p className="text-sm text-gray-500">Enter your email to receive a password reset link</p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" autoComplete="email" required />
          </div>

          <Button type="submit" className="w-full">
            Send Reset Link
          </Button>

          <div className="text-center">
            <Link href="/" className="text-sm font-medium text-primary hover:underline">
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

