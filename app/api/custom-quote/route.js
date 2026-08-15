/**
 * Next.js API Route: POST /api/custom-quote
 *
 * Proxies the guest inquiry submission to the box-engine backend.
 * Running server-side bypasses SameSite=Lax CSRF cookie restrictions.
 *
 * Browser → /api/custom-quote (same origin) → BE /api/v1/custom-packaging/inquiries
 */

const API_BASE = process.env.API_BASE_URL || 'http://localhost:3005/api/v1';
const INTERNAL_SECRET = process.env.INTERNAL_API_SECRET || '';

export async function POST(request) {
  try {
    const body = await request.json();

    const beRes = await fetch(`${API_BASE}/custom-packaging/inquiries`, {
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
    console.error('[/api/custom-quote] Proxy error:', error.message);
    return Response.json(
      {
        success: false,
        error: {
          code: 'PROXY_ERROR',
          message: 'Failed to submit your inquiry. Please try again.',
        },
      },
      { status: 502 }
    );
  }
}
