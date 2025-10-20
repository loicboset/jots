import { jsPDF } from 'jspdf'
import { NextResponse } from 'next/server'

import { createClient } from "@/lib/supabase/server";

import lexicalToPlainText from "../_utils/lexicalToPlainText";

export async function GET(req: Request): Promise<Response> {
  const supabase = await createClient();
  const { searchParams } = new URL(req.url)
  const format = searchParams.get('format') || 'json'

  const { data: entries, error } = await supabase
    .from('journal_entries')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Supabase error:', error)
    return NextResponse.json({ error: 'Error fetching entries' }, { status: 500 })
  }

  if (!entries || entries.length === 0) {
    return NextResponse.json({ error: 'No entries found' }, { status: 404 })
  }

  switch (format) {
    case 'json': {
      const entriesWithPlainText = entries.map((e) => ({
        ...e,
        content: lexicalToPlainText(e.content),
      }))

      const json = JSON.stringify(entriesWithPlainText, null, 2)

      return new NextResponse(json, {
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': 'attachment; filename="jots-export.json"',
        },
      })
    }

    case 'md': {
      const md = entries
        .map(
          (e) => `## _${new Date(e.created_at).toLocaleDateString()}_ ${lexicalToPlainText(e.content) || ''}\n\n---\n`
        ).join('\n')

      return new NextResponse(md, {
        headers: {
          'Content-Type': 'text/markdown',
          'Content-Disposition': 'attachment; filename="jots-export.md"',
        },
      })
    }

    case 'pdf': {
      const doc = new jsPDF()
      let y = 10
      entries.forEach((e, i) => {
        doc.text(`Entry ${i + 1}`, 10, y)
        y += 8
        doc.text(new Date(e.created_at).toLocaleDateString(), 10, y)
        y += 8
        const splitContent = doc.splitTextToSize(lexicalToPlainText(e.content) || '', 180)
        doc.text(splitContent, 10, y)
        y += splitContent.length * 6 + 10
        if (y > 270) {
          doc.addPage()
          y = 10
        }
      })
      const pdfBytes = doc.output('arraybuffer')
      return new NextResponse(pdfBytes, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="jots-export.pdf"',
        },
      })
    }

    default:
      return NextResponse.json({ error: 'Unsupported format' }, { status: 400 })
  }
}
