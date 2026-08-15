/**
 * Next.js API Route: /api/box-finder
 *
 * Proxies the box-finder recommend request to the box-engine backend.
 * Runs server-side, so it bypasses browser CSRF restrictions (SameSite cookies)
 * by using the INTERNAL_API_SECRET header trusted by the BE.
 *
 * Browser → Next.js /api/box-finder (same origin, no CSRF) → BE (internal secret)
 */

const API_BASE = process.env.API_BASE_URL || 'http://localhost:3005/api/v1';
const INTERNAL_SECRET = process.env.INTERNAL_API_SECRET || '';

export async function POST(request) {
  try {
    const body = await request.json();

    const beRes = await fetch(`${API_BASE}/box-finder/recommend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Internal-Secret': INTERNAL_SECRET,
      },
      body: JSON.stringify(body),
    });

    const data = await beRes.json();

    return Response.json(data, { status: beRes.status });
  } catch (error) {
    console.error('[/api/box-finder] Proxy error:', error.message);
    return Response.json(
      {
        success: false,
        error: {
          code: 'PROXY_ERROR',
          message: 'Failed to reach recommendation service',
        },
      },
      { status: 502 }
    );
  }
}
