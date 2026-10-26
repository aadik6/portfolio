import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get('file');

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const mimeType = file.type || '';
    if (!mimeType.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image files are allowed.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Limit to 8MB
    if (buffer.length > 8 * 1024 * 1024) {
      return NextResponse.json({ error: 'Image exceeds 8MB size limit.' }, { status: 400 });
    }

    // Sanitize extension and filename
    const ext = path.extname(file.name).toLowerCase() || '.png';
    const baseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `${Date.now()}-${baseName}${ext}`;

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), buffer);

    const publicUrl = `/uploads/${filename}`;
    return NextResponse.json({ url: publicUrl, success: true });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message || 'File upload failed' }, { status: 500 });
  }
}
