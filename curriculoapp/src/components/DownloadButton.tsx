import html2pdf from 'html2pdf.js'
import { useResume } from '../context/ResumeContext'
import styles from './DownloadButton.module.css'
import type { MutableRefObject } from 'react'

type DownloadButtonProps = {
  targetRef: MutableRefObject<HTMLDivElement | null>
  variant?: 'default' | 'compact'
}

const normalizeFileName = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[^a-z\s]/g, '')
    .trim()
    .replace(/\s+/g, '-')

const DownloadButton = ({ targetRef, variant = 'default' }: DownloadButtonProps) => {
  const { state } = useResume()
  const { contact, preferences } = state

  const handleDownload = async () => {
    if (!targetRef.current) return

    const baseName = contact.fullName ? normalizeFileName(contact.fullName) : 'curriculo-profissional'

    await html2pdf()
      .set({
        margin: 0.5,
        filename: `${baseName}.pdf`,
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
