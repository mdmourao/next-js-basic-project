export async function GET() {
    const resp = await fetch(`https://opendata.emel.pt/cycling/gira/station/list`)
    const data = await resp.json()
    return Response.json({ data })
}