import type { MutableRefObject } from 'react'
import arabellaLogo from '../assets/arabella-logo.png'
import DownloadButton from './DownloadButton'
import styles from './AppHeader.module.css'

interface AppHeaderProps {
  resumeRef: MutableRefObject<HTMLDivElement | null>
}

const AppHeader = ({ resumeRef }: AppHeaderProps) => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className={styles.appHeader} role="banner">
      <button
        type="button"
        className={styles.logoButton}
        onClick={handleScrollToTop}
        aria-label="Voltar ao início da página"
      >
        <img src={arabellaLogo} alt="Logotipo da Arabella Currículos Claros" className={styles.logo} />
      </button>
      <nav className={styles.navigation} aria-label="Ações principais">
        <a
          className={styles.contactLink}
          href="https://www.instagram.com/arabella.curriculos"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Abrir Instagram da Arabella em nova aba"
        >
          Entrar em contato
        </a>
        <DownloadButton targetRef={resumeRef} variant="compact" />
      </nav>
    </header>
  )
}

export default AppHeader
