import { useState } from 'react'

function AuthPage() {
  const [mode, setMode] = useState('login')
  const [fade, setFade] = useState(true)

  const switchMode = (newMode) => {
    setFade(false)
    setTimeout(() => {
      setMode(newMode)
      setFade(true)
    }, 200)
  }

  return (
    <div style={{
      minHeight: '100vh',
      fontFamily: 'Segoe UI, Arial, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(120deg, #e0e7ff 0%, #f8fafc 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Glassmorphism background shapes */}
      <div style={{
        position: 'absolute',
        top: '-80px',
        left: '-80px',
        width: '300px',
        height: '300px',
        background: 'rgba(99,102,241,0.18)',
        filter: 'blur(40px)',
        borderRadius: '50%',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-100px',
        right: '-100px',
        width: '350px',
        height: '350px',
        background: 'rgba(99,102,241,0.13)',
        filter: 'blur(50px)',
        borderRadius: '50%',
        zIndex: 0
      }} />
      <div style={{
        width: 390,
        background: 'rgba(255,255,255,0.75)',
        borderRadius: '2rem',
        boxShadow: '0 8px 32px 0 rgba(60,60,120,0.18)',
        padding: '2.7rem 2.2rem 2.2rem 2.2rem',
        margin: '2rem 0',
        backdropFilter: 'blur(16px) saturate(180%)',
        border: '1.5px solid rgba(99,102,241,0.10)',
        position: 'relative',
        zIndex: 1,
        transition: 'box-shadow 0.3s'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '1.2rem'
        }}>
          <img
            src="https://img.icons8.com/color/48/000000/t-shirt--v2.png"
            alt="ReWear Logo"
            style={{ width: 48, height: 48, marginBottom: '0.5rem' }}
          />
          <h2 style={{
            color: '#6366f1',
            fontSize: '2rem',
            margin: 0,
            letterSpacing: '0.02em',
            fontWeight: 700,
            textShadow: '0 2px 8px rgba(99,102,241,0.08)'
          }}>
            {mode === 'login' ? 'Login to ReWear' : 'Sign Up for ReWear'}
          </h2>
        </div>
        <div style={{
          opacity: fade ? 1 : 0,
          transition: 'opacity 0.2s'
        }}>
          <form>
            {mode === 'signup' && (
              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ color: '#475569', fontWeight: 500 }}>
                  Name:
                  <input type="text" style={{
                    display: 'block',
                    width: '100%',
                    marginTop: '0.5em',
                    padding: '0.5em',
                    borderRadius: '8px',
                    border: '1.5px solid #e0e7ff',
                    background: 'rgba(255,255,255,0.7)',
                    fontSize: '1rem',
                    outline: 'none'
                  }} />
                </label>
              </div>
            )}
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ color: '#475569', fontWeight: 500 }}>
                Email:
                <input type="email" style={{
                  display: 'block',
                  width: '100%',
                  marginTop: '0.5em',
                  padding: '0.5em',
                  borderRadius: '8px',
                  border: '1.5px solid #e0e7ff',
                  background: 'rgba(255,255,255,0.7)',
                  fontSize: '1rem',
                  outline: 'none'
                }} />
              </label>
            </div>
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ color: '#475569', fontWeight: 500 }}>
                Password:
                <input type="password" style={{
                  display: 'block',
                  width: '100%',
                  marginTop: '0.5em',
                  padding: '0.5em',
                  borderRadius: '8px',
                  border: '1.5px solid #e0e7ff',
                  background: 'rgba(255,255,255,0.7)',
                  fontSize: '1rem',
                  outline: 'none'
                }} />
              </label>
            </div>
            <button type="submit" style={{
              background: 'linear-gradient(90deg, #6366f1 0%, #818cf8 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '0.8em 1.5em',
              fontSize: '1.08rem',
              fontWeight: 700,
              cursor: 'pointer',
              width: '100%',
              marginTop: '1rem',
              boxShadow: '0 2px 8px 0 rgba(99,102,241,0.10)',
              letterSpacing: '0.01em',
              transition: 'background 0.2s, box-shadow 0.2s'
            }}>
              {mode === 'login' ? 'Login' : 'Sign Up'}
            </button>
          </form>
        </div>
        <div style={{
          marginTop: '1.5rem',
          textAlign: 'center',
          color: '#475569',
          fontSize: '1rem'
        }}>
          {mode === 'login' ? (
            <>
              Don't have an account?{' '}
              <button
                onClick={() => switchMode('signup')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#6366f1',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontSize: '1rem'
                }}
              >Sign Up</button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                onClick={() => switchMode('login')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#6366f1',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontSize: '1rem'
                }}
              >Login</button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthPage
