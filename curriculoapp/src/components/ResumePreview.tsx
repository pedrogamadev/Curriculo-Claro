import { forwardRef } from 'react'
import type { CSSProperties } from 'react'
import { useResume } from '../context/ResumeContext'
import styles from './ResumePreview.module.css'

const ResumePreview = forwardRef<HTMLDivElement>((_, ref) => {
  const { state } = useResume()
  const { contact, summary, experiences, education, skills, additional, preferences } = state

  const templateClass =
    {
      classic: styles.templateClassic,
      centered: styles.templateCentered,
      spotlight: styles.templateSpotlight
    }[preferences.template] ?? styles.templateClassic

  const formatMonth = (value: string) => {
    if (!value) return ''
    const [year, month] = value.split('-')
    if (!year || !month) return value
    return `${month}/${year}`
  }

  const experienceToDisplay = experiences.filter((experience) =>
    [experience.title, experience.company, experience.location, experience.startDate, experience.endDate].some(
      (value) => value && value.trim().length > 0
    )
  )

  const educationToDisplay = education.filter((entry) =>
    [entry.degree, entry.institution, entry.location, entry.year].some(
      (value) => value && value.trim().length > 0
    )
  )

  const additionalToDisplay = additional.filter((entry) =>
    (entry.heading && entry.heading.trim().length > 0) ||
    (entry.details && entry.details.trim().length > 0)
  )

  const skillsToDisplay = skills.filter((skill) => skill.trim().length > 0)

  const markerSymbol =
    preferences.bulletStyle === 'square'
      ? '■'
      : preferences.bulletStyle === 'dash'
        ? '–'
        : '•'

  const markerContent = JSON.stringify(markerSymbol)
  const listStyle = preferences.bulletStyle === 'dash' ? 'none' : preferences.bulletStyle

  const previewStyle = {
    '--accent-color': preferences.accentColor,
    '--resume-font': preferences.fontFamily,
    '--resume-font-size': `${preferences.baseFontSize}pt`,
    '--resume-line-height': `${preferences.lineHeight}`,
    '--resume-section-gap': `${preferences.sectionSpacing}rem`,
    '--resume-list-style': listStyle,
    '--resume-marker-symbol': markerContent,
    '--resume-inline-marker': markerContent
  } as CSSProperties

  return (
    <div ref={ref} className={`${styles.resume} ${templateClass}`} style={previewStyle}>
      <header className={styles.header}>
        <h1>{contact.fullName || 'Seu nome completo'}</h1>
        <div className={styles.contactLine}>
          {contact.cityState && <span>{contact.cityState}</span>}
          {contact.email && (
            <span>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </span>
          )}
          {contact.phone && <span>{contact.phone}</span>}
          {contact.linkedin && (
            <span>
              <a href={contact.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </span>
          )}
        </div>
      </header>

      <section className={styles.section} aria-labelledby="resumo-preview">
        <h2 id="resumo-preview">Resumo Profissional</h2>
        <p>{summary || 'Apresente um panorama conciso da sua experiência e impacto.'}</p>
      </section>

      <section className={styles.section} aria-labelledby="experiencia-preview">
        <h2 id="experiencia-preview">Experiência Profissional</h2>
        {experienceToDisplay.length === 0 ? (
          <p className={styles.placeholder}>Inclua empresas, cargos e resultados alcançados.</p>
        ) : (
          experienceToDisplay.map((experience) => {
            const achievements = experience.achievements.filter((item) => item.trim().length > 0)
            const start = formatMonth(experience.startDate)
            const end = formatMonth(experience.endDate)

            return (
              <article key={experience.id} className={styles.entry}>
                <header className={styles.entryHeader}>
                  <div>
                    <h3>{experience.title}</h3>
                    <p className={styles.subheading}>{experience.company}</p>
                  </div>
                  <div className={styles.meta}>
                    {(start || end) && (
                      <span>{start && end ? `${start} — ${end}` : start || end}</span>
                    )}
                    {experience.location && <span>{experience.location}</span>}
                  </div>
                </header>
                {achievements.length > 0 && (
                  <ul
                    className={`${styles.list} ${
                      preferences.bulletStyle === 'dash' ? styles.listDash : ''
                    }`}
                  >
                    {achievements.map((item, index) => (
                      <li key={`${experience.id}-achievement-${index}`}>{item}</li>
                    ))}
                  </ul>
                )}
              </article>
            )
          })
        )}
      </section>

      <section className={styles.section} aria-labelledby="educacao-preview">
        <h2 id="educacao-preview">Formação Acadêmica</h2>
        {educationToDisplay.length === 0 ? (
          <p className={styles.placeholder}>Adicione seus cursos, instituições e anos de conclusão.</p>
        ) : (
          educationToDisplay.map((entry) => (
            <article key={entry.id} className={styles.entry}>
              <header className={styles.entryHeader}>
                <div>
                  <h3>{entry.degree}</h3>
                  <p className={styles.subheading}>{entry.institution}</p>
                </div>
                <div className={styles.meta}>
                  {entry.year && <span>{entry.year}</span>}
                  {entry.location && <span>{entry.location}</span>}
                </div>
              </header>
              {entry.location && !entry.year && <p className={styles.subheading}>{entry.location}</p>}
            </article>
          ))
        )}
      </section>

      <section className={styles.section} aria-labelledby="competencias-preview">
        <h2 id="competencias-preview">Competências</h2>
        {skillsToDisplay.length === 0 ? (
          <p className={styles.placeholder}>Liste habilidades técnicas, ferramentas e competências comportamentais.</p>
        ) : (
          <ul className={styles.inlineList}>
            {skillsToDisplay.map((skill, index) => (
              <li key={`${skill}-${index}`}>{skill}</li>
            ))}
          </ul>
        )}
      </section>

      {additionalToDisplay.length > 0 && (
        <section className={styles.section} aria-labelledby="adicionais-preview">
          <h2 id="adicionais-preview">Seções Adicionais</h2>
          {additionalToDisplay.map((entry) => (
            <article key={entry.id} className={styles.entry}>
              <h3>{entry.heading}</h3>
              <p>{entry.details}</p>
            </article>
          ))}
        </section>
      )}
    </div>
  )
})

ResumePreview.displayName = 'ResumePreview'

export default ResumePreview
