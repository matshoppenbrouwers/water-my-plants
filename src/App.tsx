import React from 'react'
import { AuthProvider } from './context/AuthContext'
import { PlantProvider } from './context/PlantContext'
import { AuthenticatedApp } from './AuthenticatedApp.tsx'
import { AuthForm } from './components/auth/AuthForm'
import { useAuth } from './context/AuthContext'

function AppContent() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  return user ? <AuthenticatedApp /> : <AuthForm />
}

function App() {
  return (
    <AuthProvider>
      <PlantProvider>
        <AppContent />
      </PlantProvider>
    </AuthProvider>
  )
}

export default App 