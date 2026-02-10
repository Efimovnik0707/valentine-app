import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { nanoid } from 'nanoid'
import { supabase } from '../lib/supabase'
import type { ValentineTarget } from '../types'

type Step = 1 | 2 | 3 | 4

const MAX_FILE_SIZE_MB = 4
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024

export default function Create() {
  const { t } = useTranslation()
  const [step, setStep] = useState<Step>(1)
  const [target, setTarget] = useState<ValentineTarget>('for_her')
  const [photo1, setPhoto1] = useState<File | null>(null)
  const [photo2, setPhoto2] = useState<File | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [generatedId, setGeneratedId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const photo1Preview = photo1 ? URL.createObjectURL(photo1) : null
  const photo2Preview = photo2 ? URL.createObjectURL(photo2) : null

  const handlePhotoChange = (
    setter: (f: File | null) => void,
    file: File | undefined,
    input: HTMLInputElement | null
  ) => {
    setUploadError(null)
    if (!file) {
      setter(null)
      return
    }
    if (file.size > MAX_FILE_SIZE) {
      setUploadError(t('create.uploadError', { mb: MAX_FILE_SIZE_MB }))
      setter(null)
      if (input) input.value = ''
      return
    }
    setter(file)
  }

  const handleCreate = async () => {
    if (!photo1 || !photo2) return
    setLoading(true)
    setError(null)

    try {
      const id = nanoid(10)

      if (!supabase) {
        setError(t('create.supabaseError'))
        setLoading(false)
        return
      }

      const ext1 = photo1.name.split('.').pop() || 'jpg'
      const ext2 = photo2.name.split('.').pop() || 'jpg'
      const path1 = `${id}/photo1.${ext1}`
      const path2 = `${id}/photo2.${ext2}`

      const { error: upload1Error } = await supabase.storage
        .from('photos')
        .upload(path1, photo1, { upsert: true })

      if (upload1Error) throw upload1Error

      const { error: upload2Error } = await supabase.storage
        .from('photos')
        .upload(path2, photo2, { upsert: true })

      if (upload2Error) throw upload2Error

      const { error: insertError } = await supabase.from('valentines').insert({
        id,
        target,
        photo1_path: path1,
        photo2_path: path2,
      })

      if (insertError) throw insertError

      setGeneratedId(id)
      setStep(4)
    } catch (err: unknown) {
      const msg = typeof err === 'object' && err !== null && 'message' in err
        ? String((err as { message: string }).message)
        : t('create.checkSupabase')
      setError(t('create.createError', { msg }))
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const shareUrl = generatedId && typeof window !== 'undefined'
    ? `${window.location.origin}/v/${generatedId}`
    : ''

  const shareText = t('share.creatorText')
  const telegramShareUrl = shareUrl
    ? `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`
    : ''
  const whatsappShareUrl = shareUrl
    ? `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`
    : ''

  const handleCopyLink = async () => {
    if (!shareUrl) return
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-valentine-50 via-cream-50 to-valentine-100">
      <header className="p-4 border-b border-valentine-200/50 flex justify-between items-center">
        <Link to="/" className="text-valentine-700 hover:text-valentine-900 font-medium">
          {t('common.backToHome')}
        </Link>
        <LanguageSwitcher variant="minimal" className="text-valentine-700" />
      </header>

      <main className="max-w-xl mx-auto p-6 py-12">
        {step === 1 && (
          <div className="space-y-6">
            <h1 className="font-display text-2xl font-bold text-valentine-900">
              {t('create.forWhom')}
            </h1>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => { setTarget('for_her'); setStep(2) }}
                className="p-6 rounded-2xl border-2 border-valentine-200 bg-white hover:border-valentine-400 hover:bg-valentine-50 transition-colors text-left"
              >
                <span className="text-3xl block mb-2">👩</span>
                <span className="font-semibold text-valentine-800">{t('create.forHer')}</span>
              </button>
              <button
                type="button"
                onClick={() => { setTarget('for_him'); setStep(2) }}
                className="p-6 rounded-2xl border-2 border-valentine-200 bg-white hover:border-valentine-400 hover:bg-valentine-50 transition-colors text-left"
              >
                <span className="text-3xl block mb-2">👨</span>
                <span className="font-semibold text-valentine-800">{t('create.forHim')}</span>
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h1 className="font-display text-2xl font-bold text-valentine-900">
              {t('create.uploadPhotos')}
            </h1>
            <p className="text-sm text-gray-500">{t('create.maxSize', { mb: MAX_FILE_SIZE_MB })}</p>
            {uploadError && (
              <p className="text-red-600 text-sm">{uploadError}</p>
            )}
            <div className="grid grid-cols-2 gap-4">
              <label className="aspect-[3/4] rounded-2xl border-2 border-dashed border-valentine-300 flex items-center justify-center cursor-pointer hover:border-valentine-500 hover:bg-valentine-50/50 transition-colors overflow-hidden">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    const input = e.target
                    handlePhotoChange(setPhoto1, input.files?.[0], input)
                  }}
                />
                {photo1Preview ? (
                  <img src={photo1Preview} alt={t('create.photo1')} className="w-full h-full object-cover rounded-2xl" />
                ) : (
                  <span className="text-valentine-500 text-4xl">📷</span>
                )}
              </label>
              <label className="aspect-[3/4] rounded-2xl border-2 border-dashed border-valentine-300 flex items-center justify-center cursor-pointer hover:border-valentine-500 hover:bg-valentine-50/50 transition-colors overflow-hidden">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    const input = e.target
                    handlePhotoChange(setPhoto2, input.files?.[0], input)
                  }}
                />
                {photo2Preview ? (
                  <img src={photo2Preview} alt={t('create.photo2')} className="w-full h-full object-cover rounded-2xl" />
                ) : (
                  <span className="text-valentine-500 text-4xl">📷</span>
                )}
              </label>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 text-valentine-600 hover:text-valentine-800"
              >
                {t('common.back')}
              </button>
              <button
                type="button"
                onClick={() => photo1 && photo2 && setStep(3)}
                disabled={!photo1 || !photo2}
                className="flex-1 py-3 rounded-xl bg-valentine-500 text-white font-semibold disabled:opacity-50"
              >
                {t('common.next')}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h1 className="font-display text-2xl font-bold text-valentine-900">
              {t('create.allCorrect')}
            </h1>
            <div className="grid grid-cols-2 gap-4">
              {photo1Preview && (
                <img src={photo1Preview} alt={t('create.photo1')} className="aspect-[3/4] object-cover rounded-2xl border-2 border-valentine-200" />
              )}
              {photo2Preview && (
                <img src={photo2Preview} alt={t('create.photo2')} className="aspect-[3/4] object-cover rounded-2xl border-2 border-valentine-200" />
              )}
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 text-valentine-600 hover:text-valentine-800"
              >
                {t('common.back')}
              </button>
              <button
                type="button"
                onClick={handleCreate}
                disabled={loading}
                className="flex-1 py-3 rounded-xl bg-valentine-500 text-white font-semibold disabled:opacity-50"
              >
                {loading ? t('create.creating') : t('create.createLink')}
              </button>
            </div>
          </div>
        )}

        {step === 4 && generatedId && (
          <div className="space-y-6 text-center">
            <p className="text-4xl">🎉</p>
            <h1 className="font-display text-2xl font-bold text-valentine-900">
              {t('create.done')}
            </h1>
            <p className="text-gray-600">
              {t('create.sendLink')}
            </p>
            <div className="flex items-center gap-2 p-4 rounded-xl bg-white border border-valentine-200">
              <span className="flex-1 break-all text-valentine-700 font-mono text-sm min-w-0">{shareUrl}</span>
              <button
                type="button"
                onClick={handleCopyLink}
                className="shrink-0 p-2 rounded-lg bg-valentine-100 hover:bg-valentine-200 text-valentine-700 transition-colors"
                title={t('common.copy')}
              >
                {copied ? '✓' : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href={telegramShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0088cc] text-white font-semibold"
              >
                Telegram
              </a>
              <a
                href={whatsappShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white font-semibold"
              >
                WhatsApp
              </a>
            </div>
            <button
              type="button"
              onClick={() => {
                setStep(1)
                setPhoto1(null)
                setPhoto2(null)
                setGeneratedId(null)
                setError(null)
              }}
              className="block w-full py-2 text-valentine-600 hover:text-valentine-800"
            >
              {t('create.createAnother')}
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
