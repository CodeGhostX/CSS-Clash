import { type NextRequest } from 'next/server';
import { readPixels, takeScreenshot, meanSquaredError } from '@/helpers';
import wrapHtml from '@/helpers/wrapHtml';
import { existsSync } from 'fs';
import path from 'path';

// * types
type RequestBody = { html: string };

export const POST = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get('id');

  const errorResponse = { ok: false, status: 500 };
  const body: RequestBody = await req.json();
  const html = wrapHtml(body.html);

  if (id === null) return Response.json(errorResponse);

  console.log('here');

  const basePath = path.join(process.cwd(), 'public', 'base.png');
  const outputPath = path.join(process.cwd(), 'public', 'output.png');

  if (!existsSync(basePath)) {
    return Response.json({ ok: false, status: 404, error: 'Base image not found' });
  }

  await takeScreenshot(id, html, 'base', 'output');

  try {
    const basePixels = await readPixels(basePath);
    const outputPixels = await readPixels(outputPath);
    const similarityPercent = meanSquaredError(outputPixels, basePixels);

    return Response.json({ ok: true, status: 200, data: { similarity: similarityPercent } });
  } catch (err) {
    console.error(err);
    return Response.json(errorResponse);
  }
};
