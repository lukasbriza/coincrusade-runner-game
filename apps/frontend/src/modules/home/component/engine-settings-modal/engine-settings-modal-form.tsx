'use client'

/* eslint-disable react/jsx-fragments */
import { useTranslations } from 'next-intl'
import type { FC } from 'react'
import type { Control, FieldValues } from 'react-hook-form'

import { FormContent, FormInput, FormItem, FormText } from './styles'

export const EngineSettingsModalForm: FC<{ control: Control<FieldValues, unknown> }> = ({ control }) => {
  const t = useTranslations('home')
  return (
    <FormContent>
      <FormItem>
        <FormText variant="M">{t('settings.healRate.text')}</FormText>
        <FormInput control={control} label={t('settings.healRate.label')} name="healRate" />
      </FormItem>
      <FormItem>
        <FormText variant="M">{t('settings.baseTimeInSeconds.text')}</FormText>
        <FormInput control={control} label={t('settings.baseTimeInSeconds.label')} name="baseTimeInSeconds" />
      </FormItem>
      <FormItem>
        <FormText variant="M">{t('settings.maxPlayerLifes.text')}</FormText>
        <FormInput control={control} label={t('settings.maxPlayerLifes.label')} name="maxPlayerLifes" />
      </FormItem>
      <FormItem>
        <FormText variant="M">{t('settings.immortalityDuration.text')}</FormText>
        <FormInput control={control} label={t('settings.immortalityDuration.label')} name="immortalityDuration" />
      </FormItem>
      <FormItem>
        <FormText variant="M">{t('settings.addTimeEveryNumberOfCoins.text')}</FormText>
        <FormInput
          control={control}
          label={t('settings.addTimeEveryNumberOfCoins.label')}
          name="addTimeEveryNumberOfCoins"
        />
      </FormItem>
      <FormItem>
        <FormText variant="M">{t('settings.timeAdditionInSeconds.text')}</FormText>
        <FormInput control={control} label={t('settings.timeAdditionInSeconds.label')} name="timeAdditionInSeconds" />
      </FormItem>
    </FormContent>
  )
}
