'use client';

import { useState, useCallback, useEffect, type JSX } from 'react';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { createCommand, COMMAND_PRIORITY_LOW, $insertNodes } from 'lexical';

import GitHubContextPopup from '@/components/features/GithubContextPopup';
import { GitHubPR } from '@/types/github';

import { $createGitHubChipNode } from '../../nodes/GitHubChipNode';

// Command triggered from ComponentPickerPlugin
export const FETCH_GITHUB_CONTEXT_COMMAND = createCommand('FETCH_GITHUB_CONTEXT_COMMAND');

const GitHubNodePlugin = (): JSX.Element | null => {
  const [editor] = useLexicalComposerContext();
  const [popupVisible, setPopupVisible] = useState(false);
  const [contextData, setContextData] = useState<GitHubPR[]>([]); // raw PRs

  // 1. Fetch GitHub context
  const fetchContext = useCallback(async () => {
    try {
      const resp = await fetch('/api/github/context');
      if (!resp.ok) throw new Error('Failed to fetch GitHub context');
      const data: GitHubPR[] = await resp.json();
      setContextData(data);
      setPopupVisible(true);
    } catch (err) {
      console.error('GitHub fetch error:', err);
    }
  }, []);

  // 2. Register FETCH_GITHUB_CONTEXT_COMMAND
  useEffect(
    () =>
      editor.registerCommand(
        FETCH_GITHUB_CONTEXT_COMMAND,
        () => {
          fetchContext();
          return true;
        },
        COMMAND_PRIORITY_LOW,
      ),
    [editor, fetchContext],
  );

  // 3. Flatten PRs → commits with PR info for grouped popup
  const flattenedContextData = contextData.flatMap((pr) =>
    pr.commits.nodes.map(({ commit }) => ({
      id: commit.oid,
      title: commit.messageHeadline,
      url: commit.url,
      label: pr.repository.nameWithOwner,
      prTitle: pr.title,
      prNumber: pr.number,
      description: pr.bodyText,
    })),
  );

  // 4. Handle confirmation from popup
  const handleConfirm = (selected: { url: string; title: string; label: string }[]): void => {
    editor.update(() => {
      selected.forEach((item) => {
        const chipNode = $createGitHubChipNode(item);
        $insertNodes([chipNode]);
      });
    });
    setPopupVisible(false);
  };

  return popupVisible ? (
    <GitHubContextPopup
      contextData={flattenedContextData} // pass commits with PR info
      onConfirm={handleConfirm}
      onCancel={() => setPopupVisible(false)}
    />
  ) : null;
};

export default GitHubNodePlugin;
