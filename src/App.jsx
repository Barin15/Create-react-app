import { Component } from 'react'
import profileImage from './assets/profile.svg'
import './App.css'

class App extends Component {
  state = {
    person: {
      fullName: 'Alex Morgan',
      bio: 'Curious by nature and passionate about building thoughtful digital experiences. I enjoy turning complex ideas into simple, useful products.',
      imgSrc: profileImage,
      profession: 'Frontend Developer',
    },
    shows: true,
    elapsedSeconds: 0,
  }

  mountedAt = 0

  intervalId = null

  componentDidMount() {
    this.mountedAt = Date.now()
    this.intervalId = window.setInterval(() => {
      this.setState({
        elapsedSeconds: Math.floor((Date.now() - this.mountedAt) / 1000),
      })
    }, 1000)
  }

  componentWillUnmount() {
    window.clearInterval(this.intervalId)
  }

  toggleProfile = () => {
    this.setState(({ shows }) => ({ shows: !shows }))
  }

  render() {
    const { person, shows, elapsedSeconds } = this.state
    const minutes = Math.floor(elapsedSeconds / 60)
      .toString()
      .padStart(2, '0')
    const seconds = (elapsedSeconds % 60).toString().padStart(2, '0')

    return (
      <main className="page">
        <header className="page-header">
          <p className="eyebrow">A little introduction</p>
          <h1>Meet the person behind the pixels.</h1>
          <p className="intro">
            A simple profile, powered by a class component and its state.
          </p>
        </header>

        <section className="profile-section" aria-label="Personal profile">
          <button
            className="toggle-button"
            type="button"
            onClick={this.toggleProfile}
            aria-expanded={shows}
            aria-controls="profile-card"
          >
            {shows ? 'Hide profile' : 'Show profile'}
            <span aria-hidden="true">{shows ? '−' : '+'}</span>
          </button>

          {shows && (
            <article className="profile-card" id="profile-card">
              <div className="portrait-wrap">
                <img
                  className="portrait"
                  src={person.imgSrc}
                  alt={`Portrait of ${person.fullName}`}
                />
                <span className="status-dot" aria-label="Available" />
              </div>
              <div className="profile-copy">
                <p className="profession">{person.profession}</p>
                <h2>{person.fullName}</h2>
                <p className="bio">{person.bio}</p>
                <div className="profile-footer">
                  <span className="footer-mark" aria-hidden="true">
                    AM
                  </span>
                  <span>Making good ideas happen</span>
                </div>
              </div>
            </article>
          )}
        </section>

        <aside className="timer" aria-label="Component mount timer">
          <span className="timer-indicator" aria-hidden="true" />
          <span className="timer-label">Time since this page mounted</span>
          <time className="timer-value" dateTime={`PT${elapsedSeconds}S`}>
            {minutes}:{seconds}
          </time>
        </aside>
      </main>
    )
  }
}

export default App
