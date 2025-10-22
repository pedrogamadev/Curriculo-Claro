import type { FormEvent } from 'react'
import { useResume } from '../context/ResumeContext'
import styles from './CustomizationControls.module.css'

const accentOptions = [
  { label: 'Azul profissional', value: '#1F497D' },
  { label: 'Verde elegante', value: '#0F766E' },
  { label: 'Roxo moderno', value: '#7C3AED' }
]

const fontOptions = ['Arial', 'Calibri', 'Times New Roman']

const CustomizationControls = () => {
  const {
    state: {
      preferences: { accentColor, fontFamily }
    },
    setAccentColor,
    setFontFamily
  } = useResume()

  const handleFontChange = (event: FormEvent<HTMLSelectElement>) => {
    setFontFamily(event.currentTarget.value)
  }

  const handleColorChange = (event: FormEvent<HTMLSelectElement>) => {
    setAccentColor(event.currentTarget.value)
  }

  return (
    <section className={styles.panel} aria-labelledby="personalizacao-heading">
      <h2 id="personalizacao-heading">Personalização</h2>
      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="accentColor">
          Cor de destaque
        </label>
        <select
          id="accentColor"
          value={accentColor}
          onChange={handleColorChange}
          className={styles.select}
        >
          {accentOptions.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="fontFamily">
          Fonte principal
        </label>
        <select
          id="fontFamily"
          value={fontFamily}
          onChange={handleFontChange}
          className={styles.select}
        >
          {fontOptions.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </section>
  )
}

export default CustomizationControls
