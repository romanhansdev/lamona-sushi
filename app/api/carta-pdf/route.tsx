import { renderToStream } from '@react-pdf/renderer';
import { CartaPDF } from '@/lib/pdf/CartaPDF';

export const runtime = 'nodejs';

export async function GET() {
  const stream = await renderToStream(<CartaPDF />);
  const chunks: Buffer[] = [];

  for await (const chunk of stream) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  const buffer = Buffer.concat(chunks);

  return new Response(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="carta-la-mona-sushi.pdf"'
    }
  });
}
