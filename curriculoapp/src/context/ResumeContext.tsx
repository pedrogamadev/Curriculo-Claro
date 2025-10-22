import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

type ContactInfo = {
  fullName: string
  cityState: string
  email: string
  phone: string
  linkedin?: string
}

type WorkExperience = {
  id: string
  company: string
  location: string
  title: string
  startDate: string
  endDate: string
  achievements: string[]
}

type EducationEntry = {
  id: string
  degree: string
  institution: string
  location: string
  year: string
}

type AdditionalEntry = {
  id: string
  heading: string
  details: string
}

type BulletStyle = 'disc' | 'square' | 'dash'
type TemplateOption = 'classic' | 'centered' | 'spotlight'

type Preferences = {
  accentColor: string
  fontFamily: string
  baseFontSize: number
  lineHeight: number
  sectionSpacing: number
  bulletStyle: BulletStyle
  template: TemplateOption
}

type ResumeState = {
  contact: ContactInfo
  summary: string
  experiences: WorkExperience[]
  education: EducationEntry[]
  skills: string[]
  additional: AdditionalEntry[]
  preferences: Preferences
}

type ResumeContextValue = {
  state: ResumeState
  updateContact: (changes: Partial<ContactInfo>) => void
  setSummary: (value: string) => void
  addExperience: () => void
  updateExperience: (id: string, field: keyof Omit<WorkExperience, 'id' | 'achievements'>, value: string) => void
  updateAchievement: (id: string, index: number, value: string) => void
  addAchievement: (id: string) => void
  removeAchievement: (id: string, index: number) => void
  removeExperience: (id: string) => void
  addEducation: () => void
  updateEducation: (id: string, field: keyof Omit<EducationEntry, 'id'>, value: string) => void
  removeEducation: (id: string) => void
  addSkill: (skill: string) => void
  removeSkill: (index: number) => void
  addAdditional: () => void
  updateAdditional: (id: string, field: keyof Omit<AdditionalEntry, 'id'>, value: string) => void
  removeAdditional: (id: string) => void
  setAccentColor: (color: string) => void
  setFontFamily: (font: string) => void
  setBaseFontSize: (size: number) => void
  setLineHeight: (value: number) => void
  setSectionSpacing: (value: number) => void
  setBulletStyle: (style: BulletStyle) => void
  setTemplate: (template: TemplateOption) => void
}

const ResumeContext = createContext<ResumeContextValue | undefined>(undefined)

const createId = () => Math.random().toString(36).slice(2, 9)

const emptyExperience = (): WorkExperience => ({
  id: createId(),
  company: '',
  location: '',
  title: '',
  startDate: '',
  endDate: '',
  achievements: ['']
})

const emptyEducation = (): EducationEntry => ({
  id: createId(),
  degree: '',
  institution: '',
  location: '',
  year: ''
})

const emptyAdditional = (): AdditionalEntry => ({
  id: createId(),
  heading: '',
  details: ''
})

const defaultState: ResumeState = {
  contact: {
    fullName: '',
    cityState: '',
    email: '',
    phone: '',
    linkedin: ''
  },
  summary: '',
  experiences: [emptyExperience()],
  education: [emptyEducation()],
  skills: [],
  additional: [],
  preferences: {
    accentColor: '#1F497D',
    fontFamily: 'Arial',
    baseFontSize: 12,
    lineHeight: 1.5,
    sectionSpacing: 1,
    bulletStyle: 'disc',
    template: 'classic'
  }
}

type ResumeProviderProps = { children: ReactNode }

export const ResumeProvider = ({ children }: ResumeProviderProps) => {
  const [state, setState] = useState<ResumeState>(defaultState)

  const updateContact = (changes: Partial<ContactInfo>) => {
    setState((prev) => ({
      ...prev,
      contact: { ...prev.contact, ...changes }
    }))
  }

  const setSummary = (value: string) => {
    setState((prev) => ({ ...prev, summary: value }))
  }

  const addExperience = () => {
    setState((prev) => ({
      ...prev,
      experiences: [...prev.experiences, emptyExperience()]
    }))
  }

  const updateExperience = (
    id: string,
    field: keyof Omit<WorkExperience, 'id' | 'achievements'>,
    value: string
  ) => {
    setState((prev) => ({
      ...prev,
      experiences: prev.experiences.map((experience) =>
        experience.id === id ? { ...experience, [field]: value } : experience
      )
    }))
  }

  const updateAchievement = (id: string, index: number, value: string) => {
    setState((prev) => ({
      ...prev,
      experiences: prev.experiences.map((experience) => {
        if (experience.id !== id) return experience
        const achievements = experience.achievements.map((item, i) =>
          i === index ? value : item
        )
        return { ...experience, achievements }
      })
    }))
  }

  const addAchievement = (id: string) => {
    setState((prev) => ({
      ...prev,
      experiences: prev.experiences.map((experience) =>
        experience.id === id
          ? { ...experience, achievements: [...experience.achievements, ''] }
          : experience
      )
    }))
  }

  const removeAchievement = (id: string, index: number) => {
    setState((prev) => ({
      ...prev,
      experiences: prev.experiences.map((experience) => {
        if (experience.id !== id) return experience
        const achievements = experience.achievements.filter((_, i) => i !== index)
        return { ...experience, achievements: achievements.length ? achievements : [''] }
      })
    }))
  }

  const removeExperience = (id: string) => {
    setState((prev) => ({
      ...prev,
      experiences:
        prev.experiences.length > 1
          ? prev.experiences.filter((experience) => experience.id !== id)
          : prev.experiences
    }))
  }

  const addEducation = () => {
    setState((prev) => ({
      ...prev,
      education: [...prev.education, emptyEducation()]
    }))
  }

  const updateEducation = (
    id: string,
    field: keyof Omit<EducationEntry, 'id'>,
    value: string
  ) => {
    setState((prev) => ({
      ...prev,
      education: prev.education.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    }))
  }

  const removeEducation = (id: string) => {
    setState((prev) => ({
      ...prev,
      education:
        prev.education.length > 1
          ? prev.education.filter((entry) => entry.id !== id)
          : prev.education
    }))
  }

  const addSkill = (skill: string) => {
    const cleaned = skill.trim()
    if (!cleaned) return
    setState((prev) => ({
      ...prev,
      skills: [...prev.skills, cleaned]
    }))
  }

  const removeSkill = (index: number) => {
    setState((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }))
  }

  const addAdditional = () => {
    setState((prev) => ({
      ...prev,
      additional: [...prev.additional, emptyAdditional()]
    }))
  }

  const updateAdditional = (
    id: string,
    field: keyof Omit<AdditionalEntry, 'id'>,
    value: string
  ) => {
    setState((prev) => ({
      ...prev,
      additional: prev.additional.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    }))
  }

  const removeAdditional = (id: string) => {
    setState((prev) => ({
      ...prev,
      additional: prev.additional.filter((entry) => entry.id !== id)
    }))
  }

  const setAccentColor = (color: string) => {
    setState((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, accentColor: color }
    }))
  }

  const setFontFamily = (font: string) => {
    setState((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, fontFamily: font }
    }))
  }

  const setBaseFontSize = (size: number) => {
    setState((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, baseFontSize: size }
    }))
  }

  const setLineHeight = (value: number) => {
    setState((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, lineHeight: value }
    }))
  }

  const setSectionSpacing = (value: number) => {
    setState((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, sectionSpacing: value }
    }))
  }

  const setBulletStyle = (style: BulletStyle) => {
    setState((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, bulletStyle: style }
    }))
  }

  const setTemplate = (template: TemplateOption) => {
    setState((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, template }
    }))
  }

  return (
    <ResumeContext.Provider
      value={{
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
        removeAdditional,
        setAccentColor,
        setFontFamily,
        setBaseFontSize,
        setLineHeight,
        setSectionSpacing,
        setBulletStyle,
        setTemplate
      }}
    >
      {children}
    </ResumeContext.Provider>
  )
}

export const useResume = () => {
  const context = useContext(ResumeContext)
  if (!context) {
    throw new Error('useResume deve ser usado dentro de ResumeProvider')
  }
  return context
}

export type {
  ResumeState,
  WorkExperience,
  EducationEntry,
  AdditionalEntry,
  BulletStyle,
  TemplateOption
}
