export default function HowItWorks() {
  const steps = [
    {
      num: 1,
      title: 'Выбери и загрузи',
      desc: 'Выбери «для парня» или «для девушки», загрузи 2 фото — они появятся в конце.',
    },
    {
      num: 2,
      title: 'Получи ссылку',
      desc: 'Скопируй ссылку и отправь своей второй половинке в Telegram, WhatsApp или мессенджере.',
    },
    {
      num: 3,
      title: 'Партнёр открывает',
      desc: 'Он увидит вопрос «Будешь моей валентинкой?», кнопку «Нет» (которая убегает!), и при «Да» — твои фото и поздравление.',
    },
  ]

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-valentine-900 text-center mb-10">
        Как это работает
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
