import { type NextRequest } from 'next/server'
 
export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')

  console.log(query)
  
  const data = "gotcha"

  return Response.json({ data })

  // query is "hello" for /api/search?query=hello
}