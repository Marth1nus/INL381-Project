import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import PowerAppsEmbed from './components/PowerAppsEmbed'
import Footer from './components/Footer'
import './App.css'

export default function App() {
  const [user, setUser] = useState(null)
  const [toast, setToast] = useState(null)
  const [headerHidden, setHeaderHidden] = useState(false)

  const handleScroll = () => {
    const iframe = document.getElementById('powerapps-app')
    const header = document.querySelector('header')
    if (iframe && header) {
      const rect = iframe.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.2) {
        setHeaderHidden(true)
      } else {
        setHeaderHidden(false)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToReport = () => {
    const form = document.getElementById('powerapps-app')
    if (form) {
      form.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const showToast = (title, message) => {
    setToast({ title, message })
    setTimeout(() => setToast(null), 3000)
  }


  const handleMicrosoftLogin = async () => {
    try {
      // This would be configured with your Entra ID credentials
      // const response = await fetch('/api/auth/microsoft', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      // })
      // const data = await response.json()
      // setUser(data.user)
      // showToast('Welcome!', `Logged in as ${data.user.name}`)
      showToast('Coming Soon', 'Microsoft authentication is being configured.')
    } catch (error) {
      showToast('Error', 'Failed to authenticate with Microsoft')
      console.error(error)
    }
  }
 

  const handleLogout = () => {
    setUser(null)
    showToast('Logged Out', 'You have been signed out.')
  }

  return (
    <div className="page-shell">
      <Header
        user={user}
        onLogout={handleLogout}
        onReportClick={scrollToReport}
        hidden={headerHidden}
      />
      <main>
        <Hero
          user={user}
          onReportClick={scrollToReport}
        />
        <PowerAppsEmbed />
      </main>
      <Footer />
      {toast && <Toast title={toast.title} message={toast.message} />}
    </div>
  )
}
