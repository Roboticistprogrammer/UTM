import LoginForm from "@/components/login-form"
import AnimatedLogo from "@/components/animated-logo"
import FlyingDrone from "@/components/flying-drone"
import AnimatedBackground from "@/components/animated-background"

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100">
      <AnimatedBackground />
      <FlyingDrone />
      <div className="w-full max-w-md space-y-8 px-4 sm:px-0 z-10">
        <AnimatedLogo />
        <LoginForm />
      </div>
    </div>
  )
}

