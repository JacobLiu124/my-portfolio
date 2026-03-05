import { useEffect, useRef, useState } from 'react'
import './Home.css'

/* ─── PLACEHOLDER DATA — replace with your own ─── */
const PROFILE = {
  name:     'Jacob Liu',
  role:     'Software Engineer',
  tagline:  'I build things for the web.',
  bio:      `I'm a passionate software engineer with experience in building web applications using React, Node.js, and Python. I enjoy solving complex problems and creating intuitive user experiences. When I'm not coding, you can find me exploring the outdoors or experimenting with new recipes in the kitchen.`,
  avatar:     'my-portfolio/public/profile.jpg',
  links: [
    { label: 'GitHub',   href: 'https://https://github.com/JacobLiu124/JacobLiu124.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jacob-liu-1a40a9269/' },
    { label: 'LeetCode',  href: 'https://leetcode.com/u/Yesoniichan/' },
  ],
}

const PROJECTS = [
  {
    id: 1,
    title:       'Project Alpha',
    description: 'A short description of what this project does, the problem it solves, and the tech stack you used. Be concise but compelling.',
    tags:        ['React', 'Node.js', 'PostgreSQL'],
    videoUrl:    '', 
  },
  {
    id: 2,
    title:       'Project Beta',
    description: 'Another project description. What did you build, why did you build it, and what were the interesting engineering challenges?',
    tags:        ['Python', 'FastAPI', 'Docker'],
    videoUrl:    '',
  },
  {
    id: 3,
    title:       'Project Gamma',
    description: 'Describe the scope and impact here. Numbers are great — users, performance gains, lines of code saved, anything concrete.',
    tags:        ['TypeScript', 'GraphQL', 'AWS'],
    videoUrl:    '',
  },
]

const CONTACT = {
  email:  'jacobliu2017@outlook.com',
  blurb:  `Think I might be a good fit for your team? I would to connect and learn more about how I can contribute. I'm currently open to new opportunities, so feel free to reach out!`,
}
/* ─────────────────────────────────────────────── */


/* ── Intersection-observer hook for fade-in ── */
function useFadeIn() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}


/* ── Project card ── */
function ProjectCard({ project, index }) {
  const ref = useFadeIn()
  return (
    <article ref={ref} className="project-card fade-block" style={{ '--delay': `${index * 120}ms` }}>
      <div className="project-meta">
        <span className="project-index">0{index + 1}</span>
        <div className="project-tags">
          {project.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
      </div>

      <div className="project-body">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>
      </div>

      <div className="project-video">
        {project.videoUrl ? (
          project.videoUrl.includes('youtube') || project.videoUrl.includes('youtu.be') ? (
            <iframe
              src={project.videoUrl}
              title={project.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video src={project.videoUrl} controls playsInline />
          )
        ) : (
          <div className="video-placeholder">
            <span className="video-placeholder-icon">▶</span>
            <p>Add a videoUrl to display your demo here</p>
          </div>
        )}
      </div>
    </article>
  )
}


/* ── Main page ── */
export default function Home() {
  const [showTop, setShowTop]   = useState(false)
  const heroRef                 = useRef(null)
  const projectsRef             = useFadeIn()
  const contactRef              = useFadeIn()

  /* show back-to-top after scrolling past hero */
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight * 0.8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <div className="page">

      {/* ── HERO ── */}
      <section id="hero" className="hero" ref={heroRef}>
        <div className="hero-noise" aria-hidden />

        <nav className="hero-nav">
          <span className="logo mono">{`<${PROFILE.name.split(' ')[0]} />`}</span>
          <div className="nav-links">
            <a href="#projects">Work</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-eyebrow mono">Hello, I'm</p>
            <h1 className="hero-name">{PROFILE.name}</h1>
            <h2 className="hero-role">{PROFILE.role}</h2>
            <p className="hero-bio">{PROFILE.bio}</p>

            <div className="hero-links">
              {PROFILE.links.map(l => (
                <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="hero-link">
                  {l.label} <span className="arrow">↗</span>
                </a>
              ))}
            </div>
          </div>

          <div className="hero-avatar-wrap">
            <div className="avatar-ring" />
            <img src={PROFILE.avatar} alt={PROFILE.name} className="avatar" />
            <div className="avatar-tag mono">
              <span className="dot" />available for work
            </div>
          </div>
        </div>

        <a href="#projects" className="scroll-hint" aria-label="Scroll to projects">
          <span className="scroll-line" />
          <span className="mono scroll-label">scroll</span>
        </a>
      </section>


      {/* ── DIVIDER ── */}
      <div className="section-divider">
        <span className="divider-label mono">// selected work</span>
        <span className="divider-line" />
      </div>


      {/* ── PROJECTS ── */}
      <section id="projects" className="projects">
        <div ref={projectsRef} className="projects-header fade-block">
          <h2 className="section-title">Projects</h2>
          <p className="section-sub">Things I've built that I'm proud of.</p>
        </div>

        <div className="projects-list">
          {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      </section>


      {/* ── DIVIDER ── */}
      <div className="section-divider">
        <span className="divider-line" />
        <span className="divider-label mono">// get in touch</span>
      </div>


      {/* ── CONTACT ── */}
      <section id="contact" className="contact">
        <div ref={contactRef} className="contact-inner fade-block">
          <p className="contact-eyebrow mono">What's next?</p>
          <h2 className="contact-heading">Let's work together.</h2>
          <p className="contact-blurb">{CONTACT.blurb}</p>

          <a href={`mailto:${CONTACT.email}`} className="contact-btn">
            Say hello <span className="arrow">→</span>
          </a>

          <div className="contact-links">
            {PROFILE.links.map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="contact-social">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </section>


      {/* ── FOOTER ── */}
      <footer className="footer">
        <span className="mono footer-copy">© {new Date().getFullYear()} {PROFILE.name}</span>
        <span className="mono footer-built">Built with React + Vite</span>
      </footer>


      {/* ── BACK TO TOP ── */}
      <button
        className={`back-top mono ${showTop ? 'visible' : ''}`}
        onClick={scrollTop}
        aria-label="Back to top"
      >
        ↑ top
      </button>

    </div>
  )
}
