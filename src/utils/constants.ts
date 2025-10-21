const ROLESOPTIONS = [
  'Frontend Developer',
  'Backend Developer',
  'Full-Stack Developer',
  'Mobile Developer (iOS/Android)',
  'DevOps Engineer',
  'Site Reliability Engineer (SRE)',
  'Data Engineer',
  'AI/ML Engineer',
  'Embedded Systems Developer',
  'Game Developer',
  'Security Engineer',
];

const GOALSOPTIONS = [
  'Learn AI skills',
  'Get a first job',
  'Get a new job',
  'Get a promotion',
  'Grow technical skills',
];

const POSITIVE_SCORE_MOTIVATION_BOOSTERS = [
  "You're on a roll! Keep committing greatness. 🚀",
  "Today's code could be tomorrow’s open-source masterpiece.",
  'Your flow state is enviable—keep shipping magic! ✨',
  'You’re coding like a senior dev on caffeine. 🔥',
  'No merge conflicts with your motivation today!',
  'You’ve leveled up today—Git history will remember this.',
  'Debugger? You don’t need it when you’re this sharp.',
  'You’re the hero we need in this legacy codebase.',
  'Every keystroke today is a line of progress. 🧠💻',
  'You’re writing code that even future you will thank you for.',
];

const NEUTRAL_SCORE_MOTIVATION_BOOSTERS = [
  'Every great feature starts with one small commit.',
  'Not every day is peak productivity—and that’s okay.',
  'Progress isn’t always linear—keep showing up.',
  'Ship small, iterate often. You got this.',
  'Remember: even clean code needs a messy draft first.',
  'Think of today as writing tests for tomorrow’s success.',
  'Some days you build features, others you build resilience.',
  'Just checking in—your breakpoint isn’t a breakdown. 💡',
  'A short sprint is still forward motion. 🐢💨',
  'Code today, conquer tomorrow.',
];

const NEGATIVE_SCORE_MOTIVATION_BOOSTERS = [
  'Even the best devs hit bugs—don’t let one day define you.',
  'Take a breath. You’re not a failed build. Just need a restart.',
  'Feeling stuck? Sometimes the best solution is a good break.',
  'Impostor syndrome is a liar—you belong in this repo.',
  'One bad day won’t undo all your great commits.',
  'Your worth isn’t defined by one broken deploy.',
  "It’s okay to not be 'productive'—rest is part of the sprint.",
  "Remember: semicolons can be missing, but you're still complete.",
  'The best devs know when to push and when to pause.',
  'Treat yourself with the same grace you give your code reviews.',
];

/* ********** BREAKPOINTS ********** */
const BREAKPOINTS = {
  '2xl': 1536,
  xl: 1280,
  lg: 1023,
  md: 768,
  sm: 640,
  xs: 0,
};

const MAX_AI_TOKENS = 100;

const XP_PER_LEVEL = 15;

export type Template = { id: string; label: string; model: string };
const TEMPLATES: Template[] = [
  { id: 'process_event', label: 'Process an event 🧩', model: 'bain_5r' },
  {
    id: 'learn_from_mistake_or_success',
    label: 'Learn from mistake/success 🧠',
    model: 'kolb',
  },
  {
    id: 'think_through',
    label: 'Think through project/decision 🧪',
    model: 'kolb',
  },
  { id: 'freestyle', label: 'Freestyle ✍', model: 'simple_prompt' },
  { id: 'understand_myself', label: 'Understand myself ❤️', model: 'boud' },
  { id: 'learn_from_content', label: 'Learn from content 📚', model: 'boud' },
];

export {
  BREAKPOINTS,
  MAX_AI_TOKENS,
  ROLESOPTIONS,
  GOALSOPTIONS,
  POSITIVE_SCORE_MOTIVATION_BOOSTERS,
  NEUTRAL_SCORE_MOTIVATION_BOOSTERS,
  NEGATIVE_SCORE_MOTIVATION_BOOSTERS,
  XP_PER_LEVEL,
  TEMPLATES,
};
