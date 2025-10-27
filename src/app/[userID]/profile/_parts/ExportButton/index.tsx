'use client';
import { useState } from 'react';

import Select from 'react-select';

import Button from '@/components/ui/buttons/Button';
import useToast from '@/utils/hooks/useToast';

const ExportButton = (): React.ReactElement => {
  const [format, setFormat] = useState({ label: 'JSON', value: 'json' });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useToast();

  const options = [
    { label: 'JSON', value: 'json' },
    { label: 'Markdown', value: 'md' },
    { label: 'PDF', value: 'pdf' },
  ];

  const handleExport = async (): Promise<void> => {
    try {
      setLoading(true);
      const res = await fetch(`/api/export?format=${format.value}`);

      if (!res.ok) {
        const { error } = await res.json();
        alert(error || 'Failed to export entries.');
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');

      const today = new Date();
      const dateStr = today.toISOString().split('T')[0];
      const filename = `jots-export-${dateStr}.${format.value}`;

      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      setToast({ message: 'Entries successfully exported!' });
    } catch (err) {
      setToast({ type: 'error', message: 'Something went wrong' });
      console.error('Export failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {toast}
      <div>
        <h2 className="text-base/7 font-semibold text-white">Export</h2>
        <p className="mt-1 text-sm/6 text-gray-400">
          Export your journal entries to always keep your progress!
        </p>
      </div>
      <div className="flex gap-2 items-center">
        <Select
          className="w-48"
          options={options}
          value={format}
          onChange={(e) => e && setFormat({ label: e.label, value: e.value })}
          isDisabled={loading}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: 'black',
            }),
            input: (baseStyles) => ({
              ...baseStyles,
              color: 'white',
            }),
            singleValue: (baseStyles) => ({
              ...baseStyles,
              color: 'white',
            }),
            valueContainer: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: 'black',
              color: 'white',
            }),
            menu: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: 'black',
              border: '1px solid #4B5563',
            }),
            option: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: state.isFocused ? '#99a1af' : 'black',
            }),
          }}
        />
        <Button onClick={handleExport} disabled={loading}>
          Export
        </Button>
      </div>
    </div>
  );
};

export default ExportButton;
