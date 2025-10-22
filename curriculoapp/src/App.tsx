import { useRef } from 'react'
import styles from './App.module.css'
import CustomizationControls from './components/CustomizationControls'
import DownloadButton from './components/DownloadButton'
import ResumeForm from './components/ResumeForm'
import ResumePreview from './components/ResumePreview'

const App = () => {
  const resumeRef = useRef<HTMLDivElement | null>(null)

  return (
    <div className={styles.app}>
      <header className={styles.hero}>
        <h1>Gerador de Currículo ATS</h1>
        <p>
          Preencha suas informações, visualize o currículo em tempo real e exporte um PDF otimizado
          para sistemas de triagem.
        </p>
      </header>
      <main className={styles.main}>
        <div className={styles.formColumn}>
          <CustomizationControls />
          <ResumeForm />
        </div>
        <div className={styles.previewColumn}>
          <div className={styles.previewWrapper}>
            <ResumePreview ref={resumeRef} />
          </div>
          <DownloadButton targetRef={resumeRef} />
        </div>
      </main>
    </div>
  )
}

export default App
