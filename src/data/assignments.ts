import { Assignment } from '../types';

export const ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-1',
    courseId: 'course-1',
    courseTitle: 'Complete Modern Web Development',
    title: 'Cap-Stone Project: Responsive Landing Page with CSS Grid',
    description: 'Construct a responsive, fully accessible corporate showcase page for a clean-energy startup using pure semantic HTML5 and modern CSS Grid & Flexbox without third-party styling frameworks.',
    instructions: [
      'Implement an accessible navigation bar that collapses gracefully on viewport widths under 768px.',
      'Construct a 3-column feature grid using `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`.',
      'Include a validated contact form with appropriate input types (email, tel, textarea) and explicit <label> associations.',
      'Achieve a Lighthouse accessibility score of 95+ with no missing alt tags or low-contrast text.'
    ],
    dueDate: '2026-09-15',
    points: 100,
    rubric: [
      { criteria: 'Semantic HTML5 structure & WCAG AA contrast compliance', points: 30 },
      { criteria: 'Fluid CSS Grid and Flexbox responsiveness across 320px–1440px', points: 35 },
      { criteria: 'Code readability, commenting, and clean file organization', points: 20 },
      { criteria: 'Form validation and interactive hover/focus states', points: 15 }
    ]
  },
  {
    id: 'asg-2',
    courseId: 'course-2',
    courseTitle: 'UI/UX Design Fundamentals',
    title: 'Mobile Banking App Micro-Interactions & Case Study',
    description: 'Design high-fidelity mobile prototype frames in Figma showcasing a card-to-card peer payment flow with instant feedback states, micro-animations, and edge case handling.',
    instructions: [
      'Create at least 5 linked interactive frames (Send Screen, Amount Entry, Confirmation Bottom Sheet, Success Splash, Transaction Receipt).',
      'Use an 8pt spatial grid with consistent typographic hierarchy (Headline, Body, Caption).',
      'Provide a short 300-word design rationale explaining the friction-reducing choices you made in the transaction review flow.'
    ],
    dueDate: '2026-09-20',
    points: 100,
    rubric: [
      { criteria: 'Visual polish, hierarchy, and adherence to 8pt grid', points: 40 },
      { criteria: 'Prototyping interactivity and error state handling', points: 30 },
      { criteria: 'Depth of design rationale and user friction analysis', points: 30 }
    ]
  },
  {
    id: 'asg-3',
    courseId: 'course-3',
    courseTitle: 'Python for Beginners',
    title: 'Automated CSV Data Pipeline & Summary Generator',
    description: 'Write a Python script that reads an unformatted sales dataset in CSV format, cleanses invalid records, calculates total revenue per product category, and outputs a formatted summary report.',
    instructions: [
      'Read and parse input records safely, catching FileNotFoundError and ValueError exceptions.',
      'Filter out rows with negative price quantities or missing customer identifiers.',
      'Use dictionary comprehensions or the collections.defaultdict module to aggregate sales per category.',
      'Export the aggregated summary to a new `output_summary.json` file formatted with 2-space indentation.'
    ],
    dueDate: '2026-09-28',
    points: 100,
    rubric: [
      { criteria: 'Robust error handling and data validation logic', points: 35 },
      { criteria: 'Clean algorithmic aggregation and Pythonic style (PEP 8)', points: 35 },
      { criteria: 'Accurate JSON export formatting and unit test coverage', points: 30 }
    ]
  },
  {
    id: 'asg-4',
    courseId: 'course-5',
    courseTitle: 'React.js Masterclass',
    title: 'Custom Compound Component: Accessible Multi-Select Dropdown',
    description: 'Author a high-performance React component library item implementing an accessible multi-select dropdown using custom React context, keyboard navigation, and virtualization for 10,000 items.',
    instructions: [
      'Manage focus with keyboard arrows (Up/Down, Enter to toggle, Escape to dismiss, Home/End).',
      'Ensure complete ARIA 1.2 Combobox pattern compliance (role="combobox", aria-expanded, aria-activedescendant).',
      'Optimize re-renders using useCallback/useMemo so typing does not stutter with large option sets.'
    ],
    dueDate: '2026-10-05',
    points: 100,
    rubric: [
      { criteria: 'ARIA accessibility & complete keyboard navigability', points: 40 },
      { criteria: 'Compound component design pattern and developer DX', points: 30 },
      { criteria: 'Rendering performance with 1,000+ mock options', points: 30 }
    ]
  }
];
