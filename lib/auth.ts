// This is a mock authentication service
// In a real application, this would connect to your authentication API

interface AuthResponse {
    success: boolean
    token?: string
    user?: {
      id: string
      name: string
      email: string
      company: string
    }
    message?: string
  }
  
  export async function authenticate(email: string, password: string): Promise<AuthResponse> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))
  
    // Mock authentication logic
    // In a real application, this would be an API call to your authentication service
    if (email === "demo@example.com" && password === "password123") {
      return {
        success: true,
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        user: {
          id: "1",
          name: "Demo User",
          email: "demo@example.com",
          company: "Cargo Express Ltd.",
        },
      }
    }
  
    // Failed authentication
    return {
      success: false,
      message: "Invalid email or password",
    }
  }
  
  export function isAuthenticated(): boolean {
    // Check if user is authenticated by verifying JWT token
    const token = localStorage.getItem("token")
    if (!token) return false
  
    // In a real application, you would verify the token's validity
    // This is a simplified check
    return true
  }
  
  export function logout(): void {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    sessionStorage.removeItem("user")
  }
  
  