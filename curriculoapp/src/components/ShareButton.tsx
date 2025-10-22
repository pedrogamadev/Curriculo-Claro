import { useState } from 'react'
import styles from './ShareButton.module.css'

const SITE_TITLE = 'Currículo Claro'
const SHARE_TEXT =
  'Monte um currículo objetivo em minutos com o Currículo Claro e impressione recrutadores.'

const ShareButton = () => {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const shareUrl = window.location.href

    if (navigator.share) {
      try {
        await navigator.share({
          title: SITE_TITLE,
          text: SHARE_TEXT,
          url: shareUrl
        })
        return
      } catch (error) {
        if ((error as { name?: string }).name === 'AbortError') {
          return
        }
      }
    }

    try {
      if ('clipboard' in navigator && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 2000)
      } else {
        window.prompt('Copie o link do Currículo Claro:', shareUrl)
      }
    } catch (clipboardError) {
      console.error('Não foi possível copiar o link para a área de transferência.', clipboardError)
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className={styles.button}
      aria-label="Compartilhar o Currículo Claro com outras pessoas"
    >
      {copied ? 'Link copiado!' : 'Compartilhar'}
    </button>
  )
}

export default ShareButton
