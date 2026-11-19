import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API = 'https://campusjugaad-server.onrender.com'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const saveAndGo = (data) => {
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    navigate('/')
  }

  const handleLogin = async () => {
    try {
      setLoading(true)
      const res = await axios.post(`${API}/api/auth/login`, { email, password })
      saveAndGo(res.data)
    } catch (err) {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  const handleDemo = async () => {
    try {
      setLoading(true)
      setError('')
      const res = await axios.post(`${API}/api/auth/demo-login`)
      saveAndGo(res.data)
    } catch (err) {
      setError('Demo login failed. The server may be waking up, wait 30 seconds and try again.')
    } finally {
      setLoading(false)
    }
  }

  const input = { width: '100%', border: '1.5px solid #E8DCC8', borderRadius: 12, padding: '12px 16px', fontFamily: 'Sora, sans-serif', fontSize: 14, outline: 'none', boxSizing: 'border-box', background: '#FDFAF5', color: '#1A0C00' }

  return (
    <div style={{ fontFamily: 'Sora, sans-serif', minHeight: '100vh', background: '#F5ECD8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      <div style={{ width: '100%', maxWidth: 420 }}>
        <div onClick={() => navigate('/')} style={{ textAlign: 'center', marginBottom: 32, cursor: 'pointer' }}>
          <div style={{ width: 52, height: 52, borderRadius: 16, background: 'linear-gradient(135deg, #8B6914, #C9A84C)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, margin: '0 auto 12px' }}>🎓</div>
          <span style={{ fontSize: 22, fontWeight: 700, color: '#8B6914' }}>CampusJugaad</span>
        </div>

        <div style={{ background: '#fff', borderRadius: 24, padding: 36, border: '1.5px solid #E8DCC8' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1A0C00', marginBottom: 6 }}>Welcome back 👋</h2>
          <p style={{ color: '#8A6A50', marginBottom: 24, fontSize: 14 }}>Login to your CampusJugaad account</p>

          {error && (
            <div style={{ background: '#fff0f0', border: '1px solid #ffb3b3', borderRadius: 10, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#c00' }}>
              {error}
            </div>
          )}

          <button onClick={handleDemo} disabled={loading}
            style={{ width: '100%', background: 'linear-gradient(135deg, #8B6914, #C9A84C)', color: '#fff', border: 'none', borderRadius: 14, padding: 14, fontSize: 15, fontFamily: 'Sora, sans-serif', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', marginBottom: 12, opacity: loading ? 0.7 : 1 }}>
            {loading ? '⏳ Please wait...' : '🚀 Try Demo Account'}
          </button>

          <button onClick={() => window.location.href = `${API}/api/auth/google`}
            style={{ width: '100%', background: '#fff', color: '#1A0C00', border: '1.5px solid #E8DCC8', borderRadius: 14, padding: 14, fontSize: 15, fontFamily: 'Sora, sans-serif', fontWeight: 600, cursor: 'pointer', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <img src="https://www.google.com/favicon.ico" alt="Google" style={{ width: 18, height: 18 }} />
            Continue with Google
          </button>

          <div style={{ textAlign: 'center', marginBottom: 16, color: '#8A6A50', fontSize: 13 }}>— or login with email —</div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#8A6A50', display: 'block', marginBottom: 6 }}>Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="ravi@glbajaj.ac.in" style={input} />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#8A6A50', display: 'block', marginBottom: 6 }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={input} />
          </div>

          <button onClick={handleLogin} disabled={loading}
            style={{ width: '100%', background: '#1A0C00', color: '#fff', border: 'none', borderRadius: 14, padding: 14, fontSize: 15, fontFamily: 'Sora, sans-serif', fontWeight: 600, cursor: 'pointer', marginBottom: 16 }}>
            Login →
          </button>

          <p style={{ textAlign: 'center', fontSize: 14, color: '#8A6A50' }}>
            Don't have an account?{' '}
            <span onClick={() => navigate('/register')} style={{ color: '#8B6914', fontWeight: 600, cursor: 'pointer' }}>Register</span>
          </p>
        </div>
      </div>
    </div>
  )
}