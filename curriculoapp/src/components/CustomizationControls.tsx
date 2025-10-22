import type { ChangeEvent, FormEvent } from 'react'
import { useResume } from '../context/ResumeContext'
import type { BulletStyle, TemplateOption } from '../context/ResumeContext'
import styles from './CustomizationControls.module.css'

const accentOptions = [
  { label: 'Azul profissional', value: '#1F497D' },
  { label: 'Verde elegante', value: '#0F766E' },
  { label: 'Roxo moderno', value: '#7C3AED' }
]

const fontOptions = ['Arial', 'Calibri', 'Times New Roman']

const templateOptions = [
  { value: 'classic', label: 'Clássico direto' },
  { value: 'centered', label: 'Cabeçalho centralizado' },
  { value: 'spotlight', label: 'Faixa lateral sutil' }
]

const bulletOptions = [
  { value: 'disc', label: 'Padrão •' },
  { value: 'square', label: 'Quadrado ■' },
  { value: 'dash', label: 'Travessão –' }
]

const formatSpacing = (value: number) => `${value.toFixed(1)}x`
const formatFontSize = (value: number) =>
  Number.isInteger(value) ? `${value.toFixed(0)} pt` : `${value.toFixed(1)} pt`

const CustomizationControls = () => {
  const {
    state: {
      preferences: {
        accentColor,
        fontFamily,
        baseFontSize,
        lineHeight,
        sectionSpacing,
        bulletStyle,
        template
      }
    },
    setAccentColor,
    setFontFamily,
    setBaseFontSize,
    setLineHeight,
    setSectionSpacing,
    setBulletStyle,
    setTemplate
  } = useResume()

  const handleFontChange = (event: FormEvent<HTMLSelectElement>) => {
    setFontFamily(event.currentTarget.value)
  }

  const handleColorChange = (event: FormEvent<HTMLSelectElement>) => {
    setAccentColor(event.currentTarget.value)
  }

  const handleBaseSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBaseFontSize(Number(event.currentTarget.value))
  }

  const handleLineHeightChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLineHeight(Number(event.currentTarget.value))
  }

  const handleSectionSpacingChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSectionSpacing(Number(event.currentTarget.value))
  }

  const handleBulletStyleChange = (event: FormEvent<HTMLSelectElement>) => {
    setBulletStyle(event.currentTarget.value as BulletStyle)
  }

  const handleTemplateChange = (event: FormEvent<HTMLSelectElement>) => {
    setTemplate(event.currentTarget.value as TemplateOption)
  }

  return (
    <section className={styles.panel} aria-labelledby="personalizacao-heading">
      <h2 id="personalizacao-heading">Personalização</h2>
      <div className={styles.sectionGroup}>
        <h3 className={styles.groupTitle}>Identidade visual</h3>
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
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="template">
            Layout do PDF
          </label>
          <select
            id="template"
            value={template}
            onChange={handleTemplateChange}
            className={styles.select}
          >
            {templateOptions.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.sectionGroup}>
        <h3 className={styles.groupTitle}>Tipografia e espaçamento</h3>
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="baseFontSize">
            Tamanho base do texto
          </label>
          <div className={styles.rangeWrapper}>
            <input
              id="baseFontSize"
              type="range"
              min={11}
              max={13}
              step={0.5}
              value={baseFontSize}
              onChange={handleBaseSizeChange}
              className={styles.range}
            />
            <span aria-hidden="true" className={styles.rangeValue}>
              {formatFontSize(baseFontSize)}
            </span>
          </div>
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="lineHeight">
            Altura da linha
          </label>
          <div className={styles.rangeWrapper}>
            <input
              id="lineHeight"
              type="range"
              min={1.2}
              max={1.8}
              step={0.05}
              value={lineHeight}
              onChange={handleLineHeightChange}
              className={styles.range}
            />
            <span aria-hidden="true" className={styles.rangeValue}>
              {lineHeight.toFixed(2)}
            </span>
          </div>
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="sectionSpacing">
            Espaço entre seções
          </label>
          <div className={styles.rangeWrapper}>
            <input
              id="sectionSpacing"
              type="range"
              min={0.8}
              max={1.4}
              step={0.05}
              value={sectionSpacing}
              onChange={handleSectionSpacingChange}
              className={styles.range}
            />
            <span aria-hidden="true" className={styles.rangeValue}>
              {formatSpacing(sectionSpacing)}
            </span>
          </div>
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="bulletStyle">
            Marcadores das listas
          </label>
          <select
            id="bulletStyle"
            value={bulletStyle}
            onChange={handleBulletStyleChange}
            className={styles.select}
          >
            {bulletOptions.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  )
}

export default CustomizationControls
