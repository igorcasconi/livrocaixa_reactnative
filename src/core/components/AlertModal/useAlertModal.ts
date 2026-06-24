import { useState } from 'react'
import { AlertButton } from './AlertModal'

type AlertConfig = {
  title: string
  message: string
  buttons: AlertButton[]
}

export const useAlertModal = () => {
  const [visible, setVisible] = useState(false)
  const [config, setConfig] = useState<AlertConfig>({
    title: '',
    message: '',
    buttons: []
  })

  const showAlert = (alertConfig: AlertConfig) => {
    setConfig(alertConfig)
    setVisible(true)
  }

  const hideAlert = () => {
    setVisible(false)
  }

  return {
    visible,
    config,
    showAlert,
    hideAlert
  }
}
