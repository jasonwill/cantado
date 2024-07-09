
export const dynamic = 'force-dynamic' // defaults to auto
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { id: string} }) {

  const searchParams = request.nextUrl.searchParams
  const limit = searchParams.get('limit') || 10
  
  const id = params.id

  let data;

  try {
    const res = await fetch(`https://${process.env.CANTO_BASE}/api/v1/album/${id}?approvalStatus=approved&sortBy=time&sortDirection=descending&start=0&limit=${limit}`, 
      {
        headers: {
            "Authorization": (`Bearer ${process.env.CANTO_TOKEN}`),
          },
      }
    );

    const env = process.env.NODE_ENV

    if(env == "development"){
      data = await res.json();
    }
    else {
      data = JSON.parse("{}");
    }

  } catch (err) { 
    console.log(err);
  }

  return Response.json({ data })
  
}