interface YoutubeShortEmbedProps {
  /** YouTube Short video ID (из URL youtube.com/shorts/VIDEO_ID). Или задай VITE_YOUTUBE_SHORT_ID в .env */
  videoId?: string
}

export default function YoutubeShortEmbed({ videoId }: YoutubeShortEmbedProps) {
  const id = videoId || import.meta.env.VITE_YOUTUBE_SHORT_ID

  if (!id) {
    return (
      <div className="max-w-sm mx-auto p-8 rounded-2xl border-2 border-dashed border-valentine-300 bg-valentine-50/50 text-center">
        <p className="text-valentine-700 font-medium">Скоро здесь будет твоё видео</p>
        <p className="text-sm text-gray-500 mt-2">
          Загрузи Reels как YouTube Short и добавь в .env:<br />
          <code className="text-xs bg-white px-2 py-1 rounded mt-1 inline-block">VITE_YOUTUBE_SHORT_ID=твой_id</code>
        </p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-sm mx-auto flex justify-center">
      <div className="aspect-[9/16] max-h-[500px] rounded-2xl overflow-hidden shadow-xl border-2 border-valentine-200 bg-gray-900">
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          title="YouTube Short"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </div>
  )
}
