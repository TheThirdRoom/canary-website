'use client'
import styles from './globals.module.css'
import { useEffect, useState, useRef } from 'react'
import Script from 'next/script'

export default function Kontakte2() {
  const [displayedText, setDisplayedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [scrollY, setScrollY] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const fullText = 'If you go silent, Canary speaks for you.'

  const scrollToSection = (section: string) => {
    let targetScrollY = 0;
    
    switch(section) {
      case 'about':
        targetScrollY = 3500; // Position where About section is visible
        break;
      case 'features':
        targetScrollY = 5000; // Position where Features section is visible
        break;
      case 'newsletter':
        targetScrollY = 6500; // Position where Newsletter section is visible
        break;
      default:
        targetScrollY = 0;
    }
    
    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
      let index = 0
      const typeInterval = setInterval(() => {
        if (index <= fullText.length) {
          setDisplayedText(fullText.slice(0, index))
          index++
        } else {
          clearInterval(typeInterval)
        }
      }, 80)
      
      return () => clearInterval(typeInterval)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [])
  
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 600)
    
    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash) {
        // Small delay to ensure page is loaded
        setTimeout(() => {
          scrollToSection(hash)
        }, 100)
      }
    }

    // Handle initial load with hash
    handleHashChange()

    // Handle hash changes
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <div className={styles['kontakte-container']} ref={containerRef}>
      <div 
        className={styles['paint-background']}
        style={{
          transform: `translateY(${scrollY > 1000 ? (scrollY - 1000) * 0.5 : 0}px)`
        }}
      ></div>
              <div 
          className={styles['dark-paint-background']}
          style={{
            transform: `translateY(${
              scrollY < 2500 ? 100 : 
              scrollY < 3500 ? Math.max(0, 100 - ((scrollY - 2500) / 1000) * 100) :
              0
            }vh)`
          }}
        ></div>
      <div className={styles.header}>
        <div 
          className={styles['header-center']}
          style={{
            color: scrollY > 3000 && scrollY < 4500 ? 'white' : 'black',
            transition: 'color 0.3s ease'
          }}
        >
          <a href="https://github.com/linaventures/canary" target="_blank" rel="noopener noreferrer" className={styles['small-text']}>GitHub</a>
          <a href="https://docs.canaryapp.io/" target="_blank" rel="noopener noreferrer" className={styles['small-text']}>Docs</a>
          <a href="https://demo.canaryapp.io/" target="_blank" rel="noopener noreferrer" className={styles['small-text']}>Demo App</a>
          <div className={styles['small-text']} onClick={() => scrollToSection('about')} style={{ cursor: 'pointer' }}>About</div>
          <div className={styles['small-text']} onClick={() => scrollToSection('features')} style={{ cursor: 'pointer' }}>Features</div>
          <div className={styles['small-text']} onClick={() => scrollToSection('newsletter')} style={{ cursor: 'pointer' }}>Newsletter</div>
        </div>
        <div className={styles.title}>
          <img src="/canary.png" alt="Canary Logo" className={styles.logo} />
        </div>
      </div>
      
      <div className={styles['typewriter-container']}>
        <div className={styles['typewriter-text']}>
          <div className={styles['typewriter-line']}>
            If you go silent
          </div>
          <div className={styles['typewriter-line']}>
            <span>Canary</span> speaks for you.
            <span className={styles['cursor']} style={{opacity: showCursor ? 1 : 0}}>|</span>
          </div>
        </div>
      </div>


      
      <div 
        className={styles['hero-content-container']}
        style={{
          opacity: 1, // Always visible from start
          transform: scrollY > 1000 ? `translateY(${Math.max(-20, (scrollY - 1000) * 0.1)}px)` : 'translateY(0)',
          transition: 'opacity 0.4s ease-out, transform 0.3s ease-out'
        }}
      >
        <div className={styles['description-container']}>
          <p className={styles['description-text']}>
            Think of it like a safe for your most critical stories, truths, or instructions. If you can't personally unlock it—if you're detained, missing, or unable—Canary shares access to a predetermined party automatically.
          </p>
        </div>

        <div className={styles['cta-container']}>
          <a href="https://demo.canaryapp.io/" target="_blank" rel="noopener noreferrer" className={`${styles['cta-button']} ${styles['cta-primary']}`}>
            Try Demo
          </a>
          <a href="https://docs.canaryapp.io/" target="_blank" rel="noopener noreferrer" className={`${styles['cta-button']} ${styles['cta-secondary']}`}>
            Read Docs
          </a>
          <div className={`${styles['cta-button']} ${styles['cta-tertiary']}`} onClick={() => window.scrollTo({ top: 6500, behavior: 'smooth' })} style={{ cursor: 'pointer' }}>
            Join Newsletter
          </div>
        </div>
      </div>

                    <div 
        id="about"
        className={styles['feature-section']}
        style={{
          opacity: (() => {
            if (scrollY < 3200) return 0; // Hidden initially
            if (scrollY < 3600) return Math.min(1, (scrollY - 3200) / 400); // Fade in
            return 1; // Always visible once it appears
          })(),
          transition: 'opacity 0.6s ease-out'
        }}
      >
        <div className={styles['feature-header']}>
          <h2 className={styles['feature-title']}>Origin Story</h2>
          <p className={styles['feature-description']}>
            Canary originated as a winning hackathon project at the Web3 Privacy Now Hack in Berlin (<a href="#" className={styles['link']}>link</a>).
          </p>
          <p className={styles['feature-description']}>
            (<a href="#" className={styles['link']}>Read about our origin story</a>)
          </p>
          <p className={styles['feature-description']}>
            Canary was accepted as the first project in the Cypherpunk Launchpad program, a 3-month incubation program for early-stage privacy projects. We are now building an MVP of the app.
          </p>
          <div className={styles['centered-logo']}>
            <img src="/w3pn.png" alt="W3PN Sponsor" className={styles['inline-logo']} />
          </div>
        </div>
      </div>

      {/* White Slide */}
      <div 
        id="features"
        className={styles['white-slide']}
        style={{
          opacity: (() => {
            if (scrollY < 4500) return 0;
            if (scrollY < 5000) return Math.min(1, (scrollY - 4500) / 500);
            if (scrollY < 6000) return 1;
            if (scrollY < 6500) return Math.max(0, 1 - (scrollY - 6000) / 500);
            return 0;
          })(),
          transition: 'opacity 0.6s ease-out'
        }}
      >
        <div className={styles['white-slide-content']}>
          <div className={styles['content-left']}>
            <h2 className={styles['white-slide-title']}>At it's core, Canary is a dead man's switch (<a href="#" className={styles['link']}>link</a>)</h2>
            <p className={styles['white-slide-description']}>
              Canary is a trusted, secure space for journalists, activists, and everyday citizens to automatically release critical information if they're unable to speak for themselves. Think of it like a secure vault for your most critical stories, truths, or instructions. If you can't personally unlock it—if you're detained, missing, or unable—it shares access to a predetermined party automatically.
            </p>
            
            <div className={styles['feature-grid']}>
              <div className={styles['feature-item']}>
                <div className={styles['feature-icon']}>■</div>
                <div className={styles['feature-text']}>END-TO-END ENCRYPTION</div>
              </div>
              
              <div className={styles['feature-item']}>
                <div className={styles['feature-icon']}>▲</div>
                <div className={styles['feature-text']}>AUTOMATED CHECK-INS</div>
              </div>
              
              <div className={styles['feature-item']}>
                <div className={styles['feature-icon']}>●</div>
                <div className={styles['feature-text']}>TRUSTED CONTACT NETWORK</div>
              </div>
              
              <div className={styles['feature-item']}>
                <div className={styles['feature-icon']}>✓</div>
                <div className={styles['feature-text']}>TRUST MINIMIZED</div>
              </div>
            </div>
          </div>
          
          <div className={styles['content-right']}>
            <h2 className={styles['how-it-works-title']}>How it works</h2>
            <div className={styles['industrial-steps']}>
              <div className={styles['step-item']}>
                <div className={styles['step-marker']}>01</div>
                <div className={styles['step-content']}>
                  <div className={styles['step-label']}>ENCRYPT FILES</div>
                  <div className={styles['step-detail']}>Automatic encryption on upload</div>
                </div>
              </div>
              <div className={styles['step-item']}>
                <div className={styles['step-marker']}>02</div>
                <div className={styles['step-content']}>
                  <div className={styles['step-label']}>UPLOAD MESSAGE</div>
                  <div className={styles['step-detail']}>Share critical information securely</div>
                </div>
              </div>
              <div className={styles['step-item']}>
                <div className={styles['step-marker']}>03</div>
                <div className={styles['step-content']}>
                  <div className={styles['step-label']}>SET CHECK-IN SCHEDULE</div>
                  <div className={styles['step-detail']}>Define safety confirmation intervals</div>
                </div>
              </div>
              <div className={styles['step-item']}>
                <div className={styles['step-marker']}>04</div>
                <div className={styles['step-content']}>
                  <div className={styles['step-label']}>CHOOSE RELEASE METHOD</div>
                  <div className={styles['step-detail']}>Trusted Contacts / Public / Both</div>
                </div>
              </div>
              <div className={styles['step-item']}>
                <div className={styles['step-marker']}>05</div>
                <div className={styles['step-content']}>
                  <div className={styles['step-label']}>ACTIVATE VAULT</div>
                  <div className={styles['step-detail']}>Digital safety net operational</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div 
        id="newsletter"
        className={styles['newsletter-section']}
        style={{
          transform: `translateY(${
            scrollY < 5500 ? 100 : 
            scrollY < 6500 ? Math.max(0, 100 - ((scrollY - 5500) / 1000) * 100) :
            0
          }vh)`
        }}
      >
        <div className={styles['newsletter-container']}>
          <h2 className={styles['newsletter-title']}>Stay Updated</h2>
          <p className={styles['newsletter-description']}>
            Get the latest updates on Canary's development and security insights.
          </p>
          <div className={styles['newsletter-embed']}>
            <iframe 
              src="https://subscribe-forms.beehiiv.com/f355e04c-26d6-402f-9113-7e45e0b0faca" 
              className={styles['beehiiv-embed']} 
              data-test-id="beehiiv-embed" 
              frameBorder="0" 
              scrolling="no" 
              style={{
                width: '561px', 
                height: '280px', 
                margin: '0', 
                borderRadius: '0px', 
                backgroundColor: 'transparent', 
                boxShadow: '0 0 #0000', 
                maxWidth: '100%'
              }}
            />
          </div>
        </div>
      </div>

      {/* Add extra height to ensure scrolling space */}
      <div style={{ height: '8000px' }}></div>

      <Script async src="https://subscribe-forms.beehiiv.com/embed.js" />

    </div>
  )
} 