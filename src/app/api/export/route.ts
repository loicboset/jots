import { jsPDF } from 'jspdf';
import { NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';

import lexicalToPlainText from '../_utils/lexicalToPlainText';

export async function GET(req: Request): Promise<Response> {
  const supabase = await createClient();
  const { searchParams } = new URL(req.url);
  const format = searchParams.get('format') || 'json';

  const { data: entries, error } = await supabase
    .from('journal_entries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase error:', error);
    return NextResponse.json({ error: 'Error fetching entries' }, { status: 500 });
  }

  if (!entries || entries.length === 0) {
    return NextResponse.json({ error: 'No entries found' }, { status: 404 });
  }

  switch (format) {
    case 'json': {
      const entriesWithPlainText = entries.map((e) => ({
        ...e,
        content: lexicalToPlainText(e.content),
      }));

      const json = JSON.stringify(entriesWithPlainText, null, 2);

      return new NextResponse(json, {
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': 'attachment; filename="jots-export.json"',
        },
      });
    }

    case 'md': {
      const md = entries
        .map(
          (e) =>
            `## _${new Date(e.created_at).toLocaleDateString()}_ ${
              lexicalToPlainText(e.content) || ''
            }\n\n---\n`,
        )
        .join('\n');

      return new NextResponse(md, {
        headers: {
          'Content-Type': 'text/markdown',
          'Content-Disposition': 'attachment; filename="jots-export.md"',
        },
      });
    }

    case 'pdf': {
      const doc = new jsPDF();
      const pageHeight = doc.internal.pageSize.getHeight();
      const leftMargin = 10;
      const rightMargin = 10;
      const topMargin = 15;
      const bottomMargin = 15;
      const lineHeight = 6;
      const usableWidth = doc.internal.pageSize.getWidth() - leftMargin - rightMargin;
      let y = topMargin;

      entries.forEach((e, i) => {
        const title = `Entry ${i + 1}`;
        const date = new Date(e.created_at).toLocaleDateString();
        const content = lexicalToPlainText(e.content);

        const splitTitle = doc.splitTextToSize(title, usableWidth);
        const splitContent = doc.splitTextToSize(content, usableWidth);

        const requiredHeight = (splitTitle.length + splitContent.length + 4) * lineHeight;

        if (y + requiredHeight > pageHeight - bottomMargin) {
          doc.addPage();
          y = topMargin;
        }

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.text(splitTitle, leftMargin, y);
        y += splitTitle.length * lineHeight + 2;

        doc.setFont('helvetica', 'italic');
        doc.setFontSize(10);
        doc.text(date, leftMargin, y);
        y += lineHeight * 1.5;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        for (const line of splitContent) {
          if (y + lineHeight > pageHeight - bottomMargin) {
            doc.addPage();
            y = topMargin;
          }
          doc.text(line, leftMargin, y);
          y += lineHeight;
        }

        y += lineHeight * 2;
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pageCount = (doc.internal as any).getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        const footerY = pageHeight - 10;
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(10);

        doc.text('Exported from Jots', leftMargin, footerY);

        const pageLabel = `Page ${i} of ${pageCount}`;
        const pageLabelWidth = doc.getTextWidth(pageLabel);
        doc.text(
          pageLabel,
          doc.internal.pageSize.getWidth() - rightMargin - pageLabelWidth,
          footerY,
        );
      }

      const pdfBytes = doc.output('arraybuffer');

      return new NextResponse(pdfBytes, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="jots-export.pdf"',
        },
      });
    }

    default:
      return NextResponse.json({ error: 'Unsupported format' }, { status: 400 });
  }
}
