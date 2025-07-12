import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const featuredItems = [
  {
    id: 1,
    title: 'Vintage Denim Jacket',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
    desc: 'Classic blue denim, size M',
  },
  {
    id: 2,
    title: 'Floral Summer Dress',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    desc: 'Lightweight, perfect for summer, size S',
  },
  {
    id: 3,
    title: 'Cozy Knit Sweater',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
    desc: 'Warm and comfy, size L',
  },
]

const testimonials = [
  {
    name: "Aarav S.",
    text: "ReWear helped me declutter my closet and find unique pieces. Love the community spirit!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Priya K.",
    text: "I swapped my old dress for a cozy sweater. The process was smooth and fun!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Meera D.",
    text: "Great for the planet and my wardrobe. Highly recommend to all fashion lovers!",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  }
]

function LandingPage() {
  const [carouselIdx, setCarouselIdx] = useState(0)
  const [fade, setFade] = useState(true)
  const [heroVisible, setHeroVisible] = useState(false)
  const [carouselVisible, setCarouselVisible] = useState(false)
  const [metricsVisible, setMetricsVisible] = useState(false)
  const navigate = useNavigate()

  // Animate sections on mount
  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100)
    setTimeout(() => setCarouselVisible(true), 400)
    setTimeout(() => setMetricsVisible(true), 800)
  }, [])

  // Carousel auto-advance
  useEffect(() => {
    const timer = setTimeout(() => {
      setFade(false)
      setTimeout(() => {
        setCarouselIdx((carouselIdx + 1) % featuredItems.length)
        setFade(true)
      }, 300)
    }, 3500)
    return () => clearTimeout(timer)
  }, [carouselIdx])

  const nextItem = () => {
    setFade(false)
    setTimeout(() => {
      setCarouselIdx((carouselIdx + 1) % featuredItems.length)
      setFade(true)
    }, 300)
  }
  const prevItem = () => {
    setFade(false)
    setTimeout(() => {
      setCarouselIdx((carouselIdx - 1 + featuredItems.length) % featuredItems.length)
      setFade(true)
    }, 300)
  }

  const item = featuredItems[carouselIdx]

  return (
    <div style={{
      background: '#f8fafc',
      minHeight: '100vh',
      fontFamily: 'Segoe UI, Arial, sans-serif'
    }}>
      {/* Navbar */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.2rem 2.5rem 1.2rem 2.5rem',
        background: '#fff',
        boxShadow: '0 2px 8px 0 rgba(60,60,120,0.06)',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <img src="https://img.icons8.com/color/48/000000/t-shirt--v2.png" alt="ReWear Logo" style={{ width: 38, height: 38 }} />
          <span style={{ fontWeight: 700, fontSize: '1.5rem', color: '#6366f1', letterSpacing: '0.03em' }}>ReWear</span>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Link to="/" style={{ color: '#6366f1', fontWeight: 500, fontSize: '1.1rem', textDecoration: 'none' }}>Home</Link>
          <Link to="/dashboard" style={{ color: '#6366f1', fontWeight: 500, fontSize: '1.1rem', textDecoration: 'none' }}>Browse</Link>
          <Link to="/login" style={{ color: '#6366f1', fontWeight: 500, fontSize: '1.1rem', textDecoration: 'none' }}>Login</Link>
          <Link to="/signup" style={{
            color: '#fff',
            background: '#6366f1',
            borderRadius: 8,
            padding: '0.4em 1.1em',
            fontWeight: 600,
            fontSize: '1.1rem',
            textDecoration: 'none',
            boxShadow: '0 2px 8px 0 rgba(60,60,120,0.08)'
          }}>Sign Up</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header style={{
        padding: '3rem 1rem 2rem 1rem',
        background: 'linear-gradient(90deg, #e0e7ff 0%, #f8fafc 100%)',
        borderRadius: '0 0 2rem 2rem',
        boxShadow: '0 2px 16px 0 rgba(60,60,120,0.06)',
        textAlign: 'center',
        opacity: heroVisible ? 1 : 0,
        transform: heroVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.7s, transform 0.7s'
      }}>
        <h1 style={{
          fontSize: '3rem',
          color: '#3b3b5c',
          marginBottom: '0.2em',
          letterSpacing: '0.05em'
        }}>ReWear</h1>
        <p style={{
          fontSize: '1.5rem',
          color: '#6366f1',
          marginBottom: '0.5em'
        }}>
          Community Clothing Exchange
        </p>
        <p style={{
          color: '#475569',
          fontSize: '1.1rem',
          marginBottom: '2em'
        }}>
          Give your clothes a second life. Swap, earn points, and join a sustainable fashion movement!
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <Link to="/dashboard">
            <button style={{
              background: '#6366f1',
              color: '#fff',
              border: '2px solid #6366f1',
              borderRadius: '8px',
              padding: '0.9em 2em',
              fontSize: '1.15rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 8px 0 rgba(60,60,120,0.10)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
              className="rw-cta-animate"
            >Start Swapping</button>
          </Link>
          <Link to="/browse">
            <button style={{
              background: '#fff',
              color: '#6366f1',
              border: '2px solid #6366f1',
              borderRadius: '8px',
              padding: '0.9em 2em',
              fontSize: '1.15rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 8px 0 rgba(60,60,120,0.10)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
              className="rw-cta-animate"
            >Browse Items</button>
          </Link>
          <Link to="/add-item">
            <button style={{
              background: '#22c55e',
              color: '#fff',
              border: '2px solid #22c55e',
              borderRadius: '8px',
              padding: '0.9em 2em',
              fontSize: '1.15rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 8px 0 rgba(60,60,120,0.10)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
              className="rw-cta-animate"
            >Add New Item</button>
          </Link>
        </div>
      </header>

      {/* Featured Carousel */}
      <section style={{
        margin: '3rem auto 0 auto',
        maxWidth: 600,
        background: '#fff',
        borderRadius: '1.5rem',
        boxShadow: '0 2px 16px 0 rgba(60,60,120,0.08)',
        padding: '2rem 1rem',
        opacity: carouselVisible ? 1 : 0,
        transform: carouselVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.7s 0.2s, transform 0.7s 0.2s'
      }}>
        <h2 style={{
          color: '#3b3b5c',
          marginBottom: '1.5rem'
        }}>Featured Items</h2>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem'
        }}>
          <button onClick={prevItem} aria-label="Previous" style={{
            background: '#e0e7ff',
            border: 'none',
            color: '#6366f1',
            fontSize: '2rem',
            borderRadius: '50%',
            width: '2.5rem',
            height: '2.5rem',
            cursor: 'pointer',
            transition: 'background 0.2s, color 0.2s'
          }}>&#8592;</button>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 260,
            minHeight: 320,
            position: 'relative'
          }}>
            <div style={{
              opacity: fade ? 1 : 0,
              transition: 'opacity 0.3s'
            }}>
              <img src={item.image} alt={item.title} style={{
                width: 220,
                height: 220,
                objectFit: 'cover',
                borderRadius: '1rem',
                boxShadow: '0 2px 8px 0 rgba(60,60,120,0.10)',
                marginBottom: '1rem',
                transition: 'transform 0.4s cubic-bezier(.4,2,.6,1)'
              }} />
              <div>
                <h3 style={{
                  margin: '0.2em 0 0.1em 0',
                  color: '#3730a3',
                  fontSize: '1.2rem'
                }}>{item.title}</h3>
                <p style={{
                  color: '#64748b',
                  fontSize: '1rem',
                  margin: 0
                }}>{item.desc}</p>
              </div>
            </div>
          </div>
          <button onClick={nextItem} aria-label="Next" style={{
            background: '#e0e7ff',
            border: 'none',
            color: '#6366f1',
            fontSize: '2rem',
            borderRadius: '50%',
            width: '2.5rem',
            height: '2.5rem',
            cursor: 'pointer',
            transition: 'background 0.2s, color 0.2s'
          }}>&#8594;</button>
        </div>
      </section>

      {/* Impact Metrics & Testimonials */}
      <section style={{
        margin: '3rem auto 0 auto',
        maxWidth: 900,
        padding: '2rem 1rem',
        opacity: metricsVisible ? 1 : 0,
        transform: metricsVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.7s 0.4s, transform 0.7s 0.4s'
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2.5rem',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          {/* Metrics */}
          <div style={{
            flex: 1,
            minWidth: 220,
            background: '#fff',
            borderRadius: '1rem',
            boxShadow: '0 2px 8px 0 rgba(60,60,120,0.06)',
            padding: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            <h3 style={{ color: '#6366f1', margin: 0, fontSize: '1.2rem' }}>Our Impact</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: '1.2rem 0 0 0', color: '#475569', fontSize: '1.1rem' }}>
              <li><b>2,500+</b> clothing items swapped</li>
              <li><b>1,200+</b> active users</li>
              <li><b>8,000kg+</b> textile waste saved</li>
            </ul>
          </div>
          {/* Testimonials */}
          <div style={{
            flex: 2,
            minWidth: 320,
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem'
          }}>
            <h3 style={{ color: '#6366f1', margin: 0, fontSize: '1.2rem' }}>What Our Users Say</h3>
            <div style={{
              display: 'flex',
              gap: '1.2rem',
              flexWrap: 'wrap'
            }}>
              {testimonials.map((t, idx) => (
                <div key={idx} style={{
                  background: '#f1f5fd',
                  borderRadius: '1rem',
                  padding: '1.1rem 1rem 1rem 1rem',
                  boxShadow: '0 2px 8px 0 rgba(60,60,120,0.04)',
                  minWidth: 180,
                  maxWidth: 220,
                  flex: 1
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0.7rem' }}>
                    <img src={t.avatar} alt={t.name} style={{ width: 38, height: 38, borderRadius: '50%' }} />
                    <span style={{ fontWeight: 600, color: '#3730a3', fontSize: '1rem' }}>{t.name}</span>
                  </div>
                  <div style={{ color: '#475569', fontSize: '0.98rem', fontStyle: 'italic' }}>
                    "{t.text}"
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Animations for CTA */}
      <style>{`
        .rw-cta-animate {
          animation: cta-pop 1.1s cubic-bezier(.4,2,.6,1);
        }
        @keyframes cta-pop {
          0% { transform: scale(0.7); opacity: 0; }
          60% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  )
}

export default LandingPage
