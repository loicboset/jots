import type { JSX } from 'react';
import * as React from 'react';

import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';

import { PLAYGROUND_TRANSFORMERS } from '../MarkdownTransformers';

export default function MarkdownPlugin(): JSX.Element {
  return <MarkdownShortcutPlugin transformers={PLAYGROUND_TRANSFORMERS} />;
}
