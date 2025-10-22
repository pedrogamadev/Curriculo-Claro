import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useResume } from '../context/ResumeContext'
import type { EducationEntry, WorkExperience } from '../context/ResumeContext'
import styles from './ResumeForm.module.css'

const ResumeForm = () => {
  const {
    state,
    updateContact,
    setSummary,
    addExperience,
    updateExperience,
    updateAchievement,
    addAchievement,
    removeAchievement,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    removeSkill,
    addAdditional,
    updateAdditional,
    removeAdditional
  } = useResume()

  const [skillInput, setSkillInput] = useState('')

  const handleContactChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    updateContact({ [name]: value } as Partial<typeof state.contact>)
  }

  const handleSummaryChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setSummary(event.target.value)
  }

  const handleExperienceChange = (
    event: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const { name, value } = event.target
    if (name === 'achievements') return
    updateExperience(
      id,
      name as keyof Omit<WorkExperience, 'id' | 'achievements'>,
      value
    )
  }

  const handleEducationChange = (
    event: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const { name, value } = event.target
    updateEducation(id, name as keyof Omit<EducationEntry, 'id'>, value)
  }

  const handleSkillSubmit = (event: FormEvent) => {
    event.preventDefault()
    addSkill(skillInput)
    setSkillInput('')
  }

  return (
    <div className={styles.form}>
      <section className={styles.section} aria-labelledby="contato-heading">
        <h2 id="contato-heading">Informações de contato</h2>
        <div className={styles.grid}>
          <label className={styles.label} htmlFor="fullName">
            Nome completo
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={state.contact.fullName}
              onChange={handleContactChange}
              placeholder="Ex.: Ana Souza"
            />
          </label>
          <label className={styles.label} htmlFor="cityState">
            Cidade e estado
            <input
              id="cityState"
              name="cityState"
              type="text"
              value={state.contact.cityState}
              onChange={handleContactChange}
              placeholder="São Paulo, SP"
            />
          </label>
          <label className={styles.label} htmlFor="email">
            E-mail profissional
            <input
              id="email"
              name="email"
              type="email"
              value={state.contact.email}
              onChange={handleContactChange}
              placeholder="voce@empresa.com"
            />
          </label>
          <label className={styles.label} htmlFor="phone">
            Telefone
            <input
              id="phone"
              name="phone"
              type="tel"
              value={state.contact.phone}
              onChange={handleContactChange}
              placeholder="(11) 99999-9999"
            />
          </label>
          <label className={styles.label} htmlFor="linkedin">
            LinkedIn (opcional)
            <input
              id="linkedin"
              name="linkedin"
              type="url"
              value={state.contact.linkedin}
              onChange={handleContactChange}
              placeholder="https://linkedin.com/in/seu-perfil"
            />
          </label>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="resumo-heading">
        <h2 id="resumo-heading">Resumo profissional</h2>
        <label className={styles.label} htmlFor="summary">
          Descreva sua experiência e principais habilidades em 2 a 3 frases.
          <textarea
            id="summary"
            name="summary"
            value={state.summary}
            onChange={handleSummaryChange}
            rows={4}
            placeholder="Especialista em ..."
          />
        </label>
      </section>

      <section className={styles.section} aria-labelledby="experiencia-heading">
        <div className={styles.sectionTitle}>
          <h2 id="experiencia-heading">Experiência profissional</h2>
          <button type="button" onClick={addExperience} className={styles.secondaryButton}>
            Adicionar experiência
          </button>
        </div>
        {state.experiences.map((experience) => (
          <div key={experience.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>Posição</h3>
              <button
                type="button"
                onClick={() => removeExperience(experience.id)}
                className={styles.textButton}
                aria-label="Remover experiência"
              >
                Remover
              </button>
            </div>
            <div className={styles.grid}>
              <label className={styles.label} htmlFor={`title-${experience.id}`}>
                Cargo
                <input
                  id={`title-${experience.id}`}
                  name="title"
                  type="text"
                  value={experience.title}
                  onChange={(event) => handleExperienceChange(event, experience.id)}
                  placeholder="Analista de Dados"
                />
              </label>
              <label className={styles.label} htmlFor={`company-${experience.id}`}>
                Empresa
                <input
                  id={`company-${experience.id}`}
                  name="company"
                  type="text"
                  value={experience.company}
                  onChange={(event) => handleExperienceChange(event, experience.id)}
                  placeholder="Empresa XYZ"
                />
              </label>
              <label className={styles.label} htmlFor={`location-${experience.id}`}>
                Localidade
                <input
                  id={`location-${experience.id}`}
                  name="location"
                  type="text"
                  value={experience.location}
                  onChange={(event) => handleExperienceChange(event, experience.id)}
                  placeholder="Rio de Janeiro, RJ"
                />
              </label>
              <label className={styles.label} htmlFor={`startDate-${experience.id}`}>
                Data de início
                <input
                  id={`startDate-${experience.id}`}
                  name="startDate"
                  type="month"
                  value={experience.startDate}
                  onChange={(event) => handleExperienceChange(event, experience.id)}
                />
              </label>
              <label className={styles.label} htmlFor={`endDate-${experience.id}`}>
                Data de término
                <input
                  id={`endDate-${experience.id}`}
                  name="endDate"
                  type="month"
                  value={experience.endDate}
                  onChange={(event) => handleExperienceChange(event, experience.id)}
                />
              </label>
            </div>
            <div className={styles.achievementList}>
              <p className={styles.helperText}>
                Liste resultados usando verbos de ação e métricas sempre que possível.
              </p>
              {experience.achievements.map((achievement, index) => (
                <div key={`${experience.id}-achievement-${index}`} className={styles.achievementRow}>
                  <label className={styles.label} htmlFor={`achievement-${experience.id}-${index}`}>
                    Realização {index + 1}
                    <input
                      id={`achievement-${experience.id}-${index}`}
                      type="text"
                      value={achievement}
                      onChange={(event) =>
                        updateAchievement(experience.id, index, event.target.value)
                      }
                      placeholder="Impulsionei ..."
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => removeAchievement(experience.id, index)}
                    className={styles.textButton}
                    aria-label={`Remover realização ${index + 1}`}
                  >
                    Remover
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addAchievement(experience.id)}
                className={styles.secondaryButton}
              >
                Adicionar realização
              </button>
            </div>
          </div>
        ))}
      </section>

      <section className={styles.section} aria-labelledby="educacao-heading">
        <div className={styles.sectionTitle}>
          <h2 id="educacao-heading">Formação acadêmica</h2>
          <button type="button" onClick={addEducation} className={styles.secondaryButton}>
            Adicionar formação
          </button>
        </div>
        {state.education.map((entry) => (
          <div key={entry.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>Curso</h3>
              <button
                type="button"
                onClick={() => removeEducation(entry.id)}
                className={styles.textButton}
                aria-label="Remover formação"
              >
                Remover
              </button>
            </div>
            <div className={styles.grid}>
              <label className={styles.label} htmlFor={`degree-${entry.id}`}>
                Grau
                <input
                  id={`degree-${entry.id}`}
                  name="degree"
                  type="text"
                  value={entry.degree}
                  onChange={(event) => handleEducationChange(event, entry.id)}
                  placeholder="Bacharelado em Administração"
                />
              </label>
              <label className={styles.label} htmlFor={`institution-${entry.id}`}>
                Instituição
                <input
                  id={`institution-${entry.id}`}
                  name="institution"
                  type="text"
                  value={entry.institution}
                  onChange={(event) => handleEducationChange(event, entry.id)}
                  placeholder="Universidade Federal"
                />
              </label>
              <label className={styles.label} htmlFor={`locationEdu-${entry.id}`}>
                Localidade
                <input
                  id={`locationEdu-${entry.id}`}
                  name="location"
                  type="text"
                  value={entry.location}
                  onChange={(event) => handleEducationChange(event, entry.id)}
                  placeholder="Curitiba, PR"
                />
              </label>
              <label className={styles.label} htmlFor={`year-${entry.id}`}>
                Ano de conclusão
                <input
                  id={`year-${entry.id}`}
                  name="year"
                  type="text"
                  value={entry.year}
                  onChange={(event) => handleEducationChange(event, entry.id)}
                  placeholder="2023"
                />
              </label>
            </div>
          </div>
        ))}
      </section>

      <section className={styles.section} aria-labelledby="competencias-heading">
        <h2 id="competencias-heading">Competências</h2>
        <form className={styles.skillForm} onSubmit={handleSkillSubmit}>
          <label className={styles.label} htmlFor="new-skill">
            Inclua habilidades técnicas e comportamentais.
            <div className={styles.skillRow}>
              <input
                id="new-skill"
                type="text"
                value={skillInput}
                onChange={(event) => setSkillInput(event.target.value)}
                placeholder="Gestão de projetos"
              />
              <button type="submit" className={styles.secondaryButton}>
                Adicionar
              </button>
            </div>
          </label>
        </form>
        {state.skills.length > 0 && (
          <ul className={styles.skillList}>
            {state.skills.map((skill, index) => (
              <li key={`${skill}-${index}`} className={styles.skillItem}>
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className={styles.textButton}
                  aria-label={`Remover habilidade ${skill}`}
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className={styles.section} aria-labelledby="adicionais-heading">
        <div className={styles.sectionTitle}>
          <h2 id="adicionais-heading">Seções adicionais</h2>
          <button type="button" onClick={addAdditional} className={styles.secondaryButton}>
            Adicionar seção
          </button>
        </div>
        {state.additional.length === 0 && (
          <p className={styles.helperText}>
            Inclua projetos, certificações, prêmios ou participação em eventos.
          </p>
        )}
        {state.additional.map((entry) => (
          <div key={entry.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>Conteúdo adicional</h3>
              <button
                type="button"
                onClick={() => removeAdditional(entry.id)}
                className={styles.textButton}
                aria-label="Remover seção adicional"
              >
                Remover
              </button>
            </div>
            <label className={styles.label} htmlFor={`heading-${entry.id}`}>
              Título da seção
              <input
                id={`heading-${entry.id}`}
                name="heading"
                type="text"
                value={entry.heading}
                onChange={(event) => updateAdditional(entry.id, 'heading', event.target.value)}
                placeholder="Projetos"
              />
            </label>
            <label className={styles.label} htmlFor={`details-${entry.id}`}>
              Descrição
              <textarea
                id={`details-${entry.id}`}
                name="details"
                rows={3}
                value={entry.details}
                onChange={(event) => updateAdditional(entry.id, 'details', event.target.value)}
                placeholder="Projeto destaque ..."
              />
            </label>
          </div>
        ))}
      </section>
    </div>
  )
}

export default ResumeForm
