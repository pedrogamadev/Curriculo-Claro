import { useRef } from 'react'
import styles from './App.module.css'
import CustomizationControls from './components/CustomizationControls'
import AppHeader from './components/AppHeader'
import DownloadButton from './components/DownloadButton'
import ResumeForm from './components/ResumeForm'
import ResumePreview from './components/ResumePreview'

const App = () => {
  const resumeRef = useRef<HTMLDivElement | null>(null)

  return (
    <div className={styles.app}>
      <AppHeader resumeRef={resumeRef} />
      <header className={styles.hero}>
        <h1>Currículo direto e compatível com ATS</h1>
        <p>
          Monte um currículo objetivo e profissional, sem ruídos visuais, pensado para leitura humana
          e para as IAs de triagem como LinkedIn, Gupy ou Greenhouse.
        </p>
        <p className={styles.heroNote}>
          Personalize detalhes finos, visualize em tempo real e exporte um PDF limpo que preserva a
          hierarquia de conteúdo valorizada por sistemas automatizados.
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
          <aside className={styles.atsNotice} aria-label="Informações sobre o PDF gerado">
            <h2>Por que o PDF é ATS-friendly?</h2>
            <ul>
              <li>Estrutura linear e sem elementos decorativos que atrapalham leitores automáticos.</li>
              <li>Tipografia configurável dentro de limites seguros para preservação da legibilidade.</li>
              <li>Dados salvos em texto puro, ideais para IAs de triagem identificarem palavras-chave.</li>
            </ul>
          </aside>
          <DownloadButton targetRef={resumeRef} />
        </div>
      </main>
    </div>
  )
}

export default App
