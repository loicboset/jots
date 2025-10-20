'use client'
import { useState } from 'react'

const ExportButton = (): React.ReactElement => {
  const [format, setFormat] = useState('json')
  const [loading, setLoading] = useState(false)

  const handleExport = async (): Promise<void> => {
    try {
      setLoading(true)
      const res = await fetch(`/api/export?format=${format}`)

      if (!res.ok) {
        const { error } = await res.json()
        alert(error || 'Failed to export entries.')
        return
      }

      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')

      const today = new Date()
      const dateStr = today.toISOString().split('T')[0]
      const filename = `jots-export-${dateStr}.${format}`

      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Export failed:', err)
      alert('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <h2 className="text-base/7 font-semibold text-white">Export</h2>
        <p className="mt-1 text-sm/6 text-gray-400">
          Export your journal entries to always keep your progress!
        </p>
      </div>
      <div className="flex gap-2 items-center">
        <select
          className="border rounded p-2"
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          disabled={loading}
        >
          <option value="json">JSON</option>
          <option value="md">Markdown</option>
          <option value="pdf">PDF</option>
        </select>
        <button
          onClick={handleExport}
          className={`rounded p-2 text-white transition ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
          disabled={loading}
        >
          {loading ? 'Exporting...' : 'Export'}
        </button>
      </div>
    </div>
  )
}

export default ExportButton;
