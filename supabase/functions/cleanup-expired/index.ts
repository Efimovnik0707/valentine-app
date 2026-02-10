import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  try {
    const { data: expired, error: fetchError } = await supabase
      .from('valentines')
      .select('id, photo1_path, photo2_path')
      .lt('expires_at', new Date().toISOString())

    if (fetchError) {
      console.error('Fetch error:', fetchError)
      return new Response(
        JSON.stringify({ error: fetchError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!expired?.length) {
      return new Response(
        JSON.stringify({ deleted: 0, message: 'No expired valentines' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    let deleted = 0
    for (const row of expired) {
      try {
        if (row.photo1_path) {
          await supabase.storage.from('photos').remove([row.photo1_path])
        }
        if (row.photo2_path) {
          await supabase.storage.from('photos').remove([row.photo2_path])
        }
        const { error: deleteError } = await supabase
          .from('valentines')
          .delete()
          .eq('id', row.id)
        if (!deleteError) deleted++
      } catch (e) {
        console.error(`Failed to delete valentine ${row.id}:`, e)
      }
    }

    return new Response(
      JSON.stringify({ deleted, total: expired.length }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    console.error(err)
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
