import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ValentineFlow from '../components/ValentineFlow'
import { supabase } from '../lib/supabase'
import type { ValentineData } from '../types'

export default function Valentine() {
  const { id } = useParams<{ id: string }>()
  const [data, setData] = useState<ValentineData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setError('Неверная ссылка')
      setLoading(false)
      return
    }

    async function fetchValentine() {
      if (!supabase) {
        setData({
          id: id!,
          target: 'for_her',
          photo1Url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=533&fit=crop',
          photo2Url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=533&fit=crop',
        })
        setLoading(false)
        return
      }

      try {
        const { data: row, error: fetchError } = await supabase
          .from('valentines')
          .select('id, target, photo1_path, photo2_path')
          .eq('id', id)
          .gt('expires_at', new Date().toISOString())
          .single()

        if (fetchError) throw fetchError

        if (!row) {
          setError('Валентинка не найдена')
          return
        }

        const photo1Url = supabase.storage.from('photos').getPublicUrl(row.photo1_path).data.publicUrl
        const photo2Url = supabase.storage.from('photos').getPublicUrl(row.photo2_path).data.publicUrl

        setData({
          id: row.id,
          target: row.target,
          photo1Url,
          photo2Url,
        })
      } catch (err) {
        setError('Не удалось загрузить валентинку')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchValentine()
  }, [id])

  const shareUrl = typeof window !== 'undefined' && id
    ? `${window.location.origin}/v/${id}`
    : ''

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-valentine-400 via-valentine-500 to-valentine-700 flex items-center justify-center">
        <div className="text-white text-xl">Загрузка...</div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-valentine-400 via-valentine-500 to-valentine-700 flex flex-col items-center justify-center p-4">
        <p className="text-white text-xl mb-4">{error || 'Что-то пошло не так'}</p>
        <Link to="/" className="text-white underline">На главную</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-valentine-400 via-valentine-500 to-valentine-700 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 25c-2-4-6-6-10-4s-6 6-4 10c2 4 6 6 10 4s6-6 4-10z\' fill=\'%23ffffff\' fill-opacity=\'0.05\'/%3E%3C/svg%3E')] opacity-50" />
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 py-12">
        <ValentineFlow
          target={data.target}
          photo1Url={data.photo1Url}
          photo2Url={data.photo2Url}
          shareUrl={shareUrl}
        />
      </div>
    </div>
  )
}
