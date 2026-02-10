import { useTranslation } from 'react-i18next'

export default function HowItWorks() {
  const { t } = useTranslation()
  const steps = [
    { num: 1, title: t('howItWorks.step1Title'), desc: t('howItWorks.step1Desc') },
    { num: 2, title: t('howItWorks.step2Title'), desc: t('howItWorks.step2Desc') },
    { num: 3, title: t('howItWorks.step3Title'), desc: t('howItWorks.step3Desc') },
  ]

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-valentine-900 text-center mb-10">
        {t('landing.howItWorks')}
      </h2>
      <div className="space-y-8">
        {steps.map((step) => (
          <div
            key={step.num}
            className="flex gap-6 items-start"
          >
            <span className="flex-shrink-0 w-12 h-12 rounded-full bg-valentine-500 text-white font-bold text-lg flex items-center justify-center">
              {step.num}
            </span>
            <div>
              <h3 className="font-semibold text-valentine-800 text-lg mb-1">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
