import html2pdf from 'html2pdf.js'
import { useResume } from '../context/ResumeContext'
import styles from './DownloadButton.module.css'
import type { MutableRefObject } from 'react'

type DownloadButtonProps = {
  targetRef: MutableRefObject<HTMLDivElement | null>
  variant?: 'default' | 'compact'
}

const buildFileName = (fullName?: string | null) => {
  const defaultFileName = 'curriculo-profissional'

  if (!fullName) return defaultFileName

  const sanitizedName = fullName
    .trim()
    .replace(/[\\/:*?"<>|]/g, '')
    .replace(/\s+/g, ' ')

  if (!sanitizedName) return defaultFileName

  return `curriculo de ${sanitizedName}`
}

const DownloadButton = ({ targetRef, variant = 'default' }: DownloadButtonProps) => {
  const { state } = useResume()
  const { contact, preferences } = state

  const handleDownload = async () => {
    if (!targetRef.current) return

    const fileName = `${buildFileName(contact.fullName)}.pdf`

    await html2pdf()
      .set({
        margin: 0.5,
        filename: fileName,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      })
      .from(targetRef.current)
      .save()
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      className={variant === 'compact' ? `${styles.button} ${styles.compact}` : styles.button}
      style={{ backgroundColor: preferences.accentColor }}
      title="Baixar PDF profissional e compatível com sistemas ATS"
      aria-label="Baixar PDF profissional e compatível com sistemas ATS"
    >
      Baixar PDF
    </button>
  )
}

export default DownloadButton
