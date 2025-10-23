"use client";

import { useState, useEffect, useRef, type JSX } from "react";

type CommitItem = {
  id: string;
  title: string;
  url: string;
  label: string; // repo name
  prNumber: number;
  prTitle: string;
  description?: string;
};

type Props = {
  contextData: CommitItem[];
  onConfirm: (selected: { url: string; title: string; label: string, description?: string }[]) => void;
  onCancel: () => void;
};

const GitHubContextPopup = ({ contextData, onConfirm, onCancel }: Props): JSX.Element => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const groupedByPR = contextData.reduce<Record<string, CommitItem[]>>((acc, commit) => {
    const key = `${commit.prNumber}-${commit.label}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(commit);
    return acc;
  }, {});

  const toggleSelect = (id: string): void => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const toggleSelectPR = (commits: CommitItem[]): void => {
    const allSelected = commits.every((c) => selectedIds.includes(c.id));
    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !commits.some((c) => c.id === id)));
    } else {
      setSelectedIds((prev) => [...prev, ...commits.filter((c) => !prev.includes(c.id)).map((c) => c.id)]);
    }
  };

  const confirmSelection = (): void => {
    const selected = contextData.filter((item) => selectedIds.includes(item.id));
    onConfirm(selected);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent): void => {
      if (!scrollRef.current) return;
      const items = Array.from(scrollRef.current.querySelectorAll<HTMLLIElement>("[data-commit]"));
      if (!items.length) return;
      const currentIndex = items.findIndex((el) => el === document.activeElement);

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        items[nextIndex].focus();
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        items[prevIndex].focus();
      }
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        if (document.activeElement?.hasAttribute("data-commit-id")) {
          const id = document.activeElement.getAttribute("data-commit-id")!;
          toggleSelect(id);
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return (): void => window.removeEventListener("keydown", handleKey);
  }, [selectedIds]);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        ref={containerRef}
        className="bg-white rounded-2xl shadow-xl w-[520px] max-h-[80vh] flex flex-col relative animate-fadeIn overflow-hidden"
      >
        <h2 className="text-xl font-bold px-6 pt-6 pb-3 text-gray-900">Select GitHub Commits</h2>
        <p className="font-semibold px-6 pt-2 pb-3 text-gray-400">This information will be used as context to offer targeted reflections based on your work.</p>

        {/* Scrollable list */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 relative">
          <ul className="space-y-5 pb-4">
            {Object.entries(groupedByPR).map(([prKey, commits]) => {
              const allSelected = commits.every((c) => selectedIds.includes(c.id));
              return (
                <li key={prKey}>
                  <div
                    /* eslint-disable-next-line max-len */
                    className="flex justify-between items-center bg-gray-100 rounded-lg px-4 py-2 mb-2 cursor-pointer transition-transform transform hover:scale-[1.01]"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">{commits[0].prTitle}</p>
                      <p className="text-sm text-gray-500">{commits[0].label} — PR #{commits[0].prNumber}</p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{commits[0].description}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleSelectPR(commits)}
                      className="text-sm text-indigo-500 hover:underline font-semibold"
                    >
                      {allSelected ? "Deselect All" : "Select All"}
                    </button>
                  </div>
                  <ul className="space-y-1 pl-2">
                    {commits.map((commit) => (
                      <li
                        key={commit.id}
                        tabIndex={0}
                        data-commit
                        data-commit-id={commit.id}
                        className={`flex justify-between items-center p-2 rounded-lg border transition-all duration-200 transform cursor-pointer
                          ${
                            selectedIds.includes(commit.id)
                              ? "bg-indigo-50 border-indigo-400 shadow-sm scale-[1.01]"
                              : "border-gray-200 hover:bg-gray-50 hover:scale-[1.01]"
                          }`}
                        onClick={() => toggleSelect(commit.id)}
                      >
                        <div>
                          <p className="font-medium text-gray-900">{commit.title}</p>
                          <a
                            href={commit.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-indigo-500 hover:underline mt-0.5 block"
                          >
                            View on GitHub
                          </a>
                        </div>
                        <span
                          className={`text-indigo-500 font-bold select-none transition-opacity duration-200 ${
                            selectedIds.includes(commit.id) ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          ✓
                        </span>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Sticky action buttons */}
        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-6 sticky bottom-0 bg-white z-10">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={confirmSelection}
            disabled={selectedIds.length === 0}
            className={`px-4 py-2 rounded-lg text-white font-semibold transition-colors ${
              selectedIds.length === 0
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default GitHubContextPopup;