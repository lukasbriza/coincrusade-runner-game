/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react/jsx-props-no-spreading */

'use client'

import { Modal } from '@lukasbriza/components'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, type FC } from 'react'
import type { Control, FieldValues } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'

import type { Generators } from '@/shared'
import type { GameConfiguration } from '@/shared/components'
import { defaultConfig, useGameConfiguration } from '@/shared/components'

import { fadeInModal, fadeOffModal } from './animation'
import { EngineSettingsModalForm } from './engine-settings-modal-form'
import { ButtonWrapper, Cross, FormRoot, GeneratorText, Header, ModalButton, WarningText } from './styles'
import type { EngineSettingsFormValues, EngineSettingsProps } from './types'

const getConfigValues = (fullConfig: GameConfiguration) => ({
  healRate: fullConfig.healRate,
  immortalityDuration: fullConfig.immortalityDuration,
  maxPlayerLifes: fullConfig.maxPlayerLifes,
  addTimeEveryNumberOfCoins: fullConfig.addTimeEveryNumberOfCoins,
  timeAdditionInSeconds: fullConfig.timeAdditionInSeconds,
  baseTimeInSeconds: fullConfig.baseTimeInSeconds,
})

export const EngineSettingsModal: FC<EngineSettingsProps> = ({ open, onClose }) => {
  const t = useTranslations('home')
  const modal = useRef<HTMLDivElement>(null)
  const { config, resetConfiguration, changeConfiguration } = useGameConfiguration()
  const methods = useForm<EngineSettingsFormValues>({
    reValidateMode: 'onChange',
    defaultValues: getConfigValues(config),
  })

  const { reset } = methods

  const closeModal = async () => {
    await fadeOffModal(modal.current)
    onClose()
  }

  const onReset = () => {
    methods.reset(getConfigValues(defaultConfig))
    resetConfiguration()
  }

  const onSubmit = (data: EngineSettingsFormValues) => {
    changeConfiguration((state) => ({ ...state, ...data }))
    closeModal()
  }

  useEffect(() => {
    const showModal = async () => {
      await fadeInModal(modal.current)
      reset(getConfigValues(config))
    }
    if (open) {
      showModal()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <Modal ref={modal} open={open} onClose={closeModal}>
      <FormProvider {...methods}>
        <FormRoot onSubmit={methods.handleSubmit(onSubmit)}>
          <Cross onClick={closeModal} />
          <Header variant="h2">{t('settings.header')}</Header>
          <GeneratorText variant="h4">{t(`engines.${config.currentGenerator as Generators}.header`)}</GeneratorText>
          <WarningText variant="M">{t('settings.warning')}</WarningText>
          <EngineSettingsModalForm control={methods.control as unknown as Control<FieldValues>} />
          <ButtonWrapper>
            <ModalButton text="Confirm" type="submit" />
            <ModalButton text="Reset" type="button" onClick={onReset} />
          </ButtonWrapper>
        </FormRoot>
      </FormProvider>
    </Modal>
  )
}
