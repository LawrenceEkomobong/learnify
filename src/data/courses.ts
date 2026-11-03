import { Course } from '../types';

export const COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'Complete Modern Web Development: Zero to Mastery',
    shortDescription: 'Master HTML5, CSS3, modern JavaScript, React 19, responsive layouts, and modern web APIs.',
    description: 'A comprehensive, industry-aligned pathway designed to take you from foundational syntax to building production-ready web apps. Learn real-world development workflows, accessibility best practices, and performant user experiences.',
    category: 'Web Development',
    instructor: {
      name: 'Sarah Drasner-Cole',
      role: 'Staff Principal Engineer & Author',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      bio: 'Former VP of Developer Experience, internationally recognized educator and author with 14+ years building high-traffic web applications.'
    },
    rating: 4.9,
    reviewsCount: 3420,
    students: 18450,
    difficulty: 'Beginner',
    duration: '24 hours',
    totalMinutes: 1440,
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80',
    badge: 'Bestseller',
    featured: true,
    quizId: 'quiz-course-1',
    overview: [
      'Understand the modern browser rendering engine and DOM manipulation.',
      'Write semantic HTML5, modern flexbox, CSS grid, and responsive layouts without bloated libraries.',
      'Master modern ES6+ JavaScript, asynchronous operations, Promises, and fetch APIs.',
      'Build scalable single page applications using modern React architecture and hooks.'
    ],
    learningOutcomes: [
      'Ship clean, accessible, and performant web interfaces',
      'Confidently structure component state and side-effects in React',
      'Debug client-side issues using browser dev tools like a senior engineer',
      'Deploy modern web projects to cloud platforms with continuous integration'
    ],
    requirements: [
      'A computer with Chrome, Firefox, or Safari installed',
      'No prior programming experience required; we start from zero',
      'Desire to build practical projects from day one'
    ],
    modules: [
      {
        id: 'mod-1-1',
        title: 'Module 1: Foundations of the Modern Web',
        description: 'Understand the underlying protocol of the internet, HTTP, DOM, and semantic HTML structure.',
        lessons: [
          {
            id: 'les-1-1-1',
            title: 'How the Web Works & Development Setup',
            duration: '14 min',
            durationMinutes: 14,
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            summary: 'Explore client-server communication, DNS resolution, and configuring modern developer tooling.',
            content: `In this introductory lesson, we dissect what happens when you type a URL into your browser address bar. We trace the request through DNS lookup, TCP/TLS handshakes, HTTP request-response cycles, and finally browser parsing of HTML, CSS, and JavaScript.

Key takeaways:
- The role of HTTP status codes (200, 301, 404, 500)
- How modern browsers construct the DOM (Document Object Model) and CSSOM
- Setting up VS Code, essential extensions, and local development servers.`
          },
          {
            id: 'les-1-1-2',
            title: 'Semantic HTML5 & Accessibility (a11y)',
            duration: '18 min',
            durationMinutes: 18,
            type: 'video',
            summary: 'Learn why semantic elements like <main>, <article>, and <nav> matter for screen readers and search engines.',
            content: `Semantic markup is the bedrock of professional web engineering. We cover heading hierarchies, landmarks, ARIA labels, form accessibility, keyboard navigability, and color contrast guidelines.

Best practices:
- Always pair form inputs with explicit <label> elements
- Use buttons for actions and anchor tags for navigation
- Avoid redundant div nesting (div-soup)`
          },
          {
            id: 'les-1-1-3',
            title: 'CSS Architecture, Flexbox & Grid Systems',
            duration: '22 min',
            durationMinutes: 22,
            type: 'video',
            summary: 'Master multi-dimensional responsive layouts with Flexbox and CSS Grid.',
            content: `Modern CSS eliminates the need for heavyweight grid frameworks. Learn the mental model behind CSS Grid for 2D page layouts and Flexbox for 1D component alignments.

Key concepts:
- align-items vs justify-content
- grid-template-columns with minmax() and auto-fit
- Creating fluid typography with clamp()`
          }
        ]
      },
      {
        id: 'mod-1-2',
        title: 'Module 2: JavaScript Mastery & Asynchronous Execution',
        description: 'Dive deep into execution context, event loop, arrays, objects, and modern async/await syntax.',
        lessons: [
          {
            id: 'les-1-2-1',
            title: 'Modern JS Fundamentals: Scope, Closures & ES Modules',
            duration: '25 min',
            durationMinutes: 25,
            type: 'video',
            summary: 'Understand block scoping with let/const, lexical scoping, and module imports/exports.',
            content: `Master JavaScript's memory model, lexical environments, closures, and the difference between primitives and reference types. Learn how module bundling works under the hood.`
          },
          {
            id: 'les-1-2-2',
            title: 'The Event Loop, Promises & Async/Await',
            duration: '28 min',
            durationMinutes: 28,
            type: 'video',
            summary: 'Unravel how JavaScript handles non-blocking I/O using microtasks and macrotasks.',
            content: `Explore how single-threaded JavaScript orchestrates timers, network requests, and DOM events without freezing the user interface. Write clean, error-handled async/await patterns.`
          },
          {
            id: 'les-1-2-3',
            title: 'Interactive DOM & State Handling Project',
            duration: '32 min',
            durationMinutes: 32,
            type: 'interactive',
            summary: 'Build an interactive interactive task manager with local storage persistence.',
            content: `Hands-on project synthesizing everything learned so far: DOM event delegation, custom events, sanitizing user inputs, and syncing state to browser storage.`
          }
        ]
      },
      {
        id: 'mod-1-3',
        title: 'Module 3: Production React & Component Systems',
        description: 'Learn React declarative UI, hooks lifecycle, custom hooks, and state management.',
        lessons: [
          {
            id: 'les-1-3-1',
            title: 'React Mental Model: Declarative UI & Props',
            duration: '20 min',
            durationMinutes: 20,
            type: 'video',
            summary: 'Think in React components, one-way data flow, and immutable state updates.',
            content: `Learn why React replaced imperative DOM manipulation. Understand pure components, JSX compilation, and passing callbacks as props.`
          },
          {
            id: 'les-1-3-2',
            title: 'Deep Dive into useState, useEffect & useRef',
            duration: '35 min',
            durationMinutes: 35,
            type: 'video',
            summary: 'Avoid common useEffect pitfalls, infinite re-renders, and memory leaks.',
            content: `Master React hook rules, dependency arrays, cleanup functions, and accessing DOM nodes imperatively when necessary with useRef.`
          }
        ]
      }
    ]
  },
  {
    id: 'course-2',
    title: 'UI/UX Design Fundamentals: From Wireframe to High-Fidelity',
    shortDescription: 'Master user research, wireframing, Figma design systems, visual hierarchy, and micro-interactions.',
    description: 'Learn to design user-centered digital interfaces that solve genuine user problems while delivering aesthetic delight. From empathetic user research to component-driven design systems in Figma.',
    category: 'UI/UX Design',
    instructor: {
      name: 'Marcus Vance',
      role: 'Principal Product Designer at Stripe',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      bio: 'Design lead with 12+ years shaping fintech and SaaS product experiences used by millions.'
    },
    rating: 4.8,
    reviewsCount: 2190,
    students: 12300,
    difficulty: 'Beginner',
    duration: '16 hours',
    totalMinutes: 960,
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=80',
    badge: 'Popular',
    featured: true,
    quizId: 'quiz-course-2',
    overview: [
      'Understand the Design Thinking framework: Empathize, Define, Ideate, Prototype, Test.',
      'Master typographic scale, color psychology, and mathematical spacing systems.',
      'Build reusable, variant-rich component libraries in Figma with auto-layout.',
      'Conduct usability tests and iterate designs based on quantitative metrics.'
    ],
    learningOutcomes: [
      'Create polished Figma prototypes ready for developer handoff',
      'Establish robust design tokens (color, spacing, elevation, type)',
      'Conduct effective user interviews and map user journeys',
      'Build a portfolio-worthy case study from scratch'
    ],
    requirements: [
      'A free Figma account',
      'No design background needed; basic familiarity with digital products is helpful'
    ],
    modules: [
      {
        id: 'mod-2-1',
        title: 'Module 1: Principles of Visual Design',
        description: 'Typographic hierarchy, contrast ratios, and structural grid rules.',
        lessons: [
          {
            id: 'les-2-1-1',
            title: 'Visual Hierarchy & The 8pt Spacing Grid',
            duration: '18 min',
            durationMinutes: 18,
            type: 'video',
            summary: 'How spacing rules establish order, rhythm, and clarity across screens.',
            content: `Explore how human eyes scan digital pages (F-patterns and Z-patterns), optical alignment vs mathematical alignment, and why the 8pt grid standardizes cross-platform UI.`
          },
          {
            id: 'les-2-1-2',
            title: 'Typography Pairing & Accessible Color Palettes',
            duration: '22 min',
            durationMinutes: 22,
            type: 'video',
            summary: 'Selecting font pairs, establishing step ratios, and meeting WCAG AA contrast standards.',
            content: `Learn how font weight, x-height, and line-height influence reading speed. Build accessible light and dark palettes with designated functional roles.`
          }
        ]
      },
      {
        id: 'mod-2-2',
        title: 'Module 2: Figma Mastery & Design Systems',
        description: 'Auto-layout, nested components, interactive variants, and tokens.',
        lessons: [
          {
            id: 'les-2-2-1',
            title: 'Figma Auto-Layout & Responsive Constraints',
            duration: '26 min',
            durationMinutes: 26,
            type: 'video',
            summary: 'Build adaptive UI cards and navigation bars that flex gracefully on mobile and desktop.',
            content: `Learn fill container, hug contents, fixed widths, gap spacing, and padding overrides in Figma to produce realistic layouts.`
          },
          {
            id: 'les-2-2-2',
            title: 'Component Variants & Interactive Micro-states',
            duration: '30 min',
            durationMinutes: 30,
            type: 'interactive',
            summary: 'Design button states (default, hover, focus, disabled, loading) and dynamic modals.',
            content: `Create comprehensive design system tokens that make handoff to frontend engineers seamless and error-free.`
          }
        ]
      }
    ]
  },
  {
    id: 'course-3',
    title: 'Python for Beginners: From Syntax to Real Projects',
    shortDescription: 'Learn programming fundamentals, object-oriented programming, data structures, and automation with Python 3.',
    description: 'Python is the world’s most versatile language. This course teaches clean, idiomatic Python code through hands-on scripting, file manipulation, web scraping, and data processing projects.',
    category: 'Programming',
    instructor: {
      name: 'Dr. Elena Rostova',
      role: 'Senior Data Scientist & Python Core Contributor',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      bio: 'PhD in Computational Linguistics, veteran Python educator and consultant to Fortune 500 engineering teams.'
    },
    rating: 4.9,
    reviewsCount: 4120,
    students: 22100,
    difficulty: 'Beginner',
    duration: '20 hours',
    totalMinutes: 1200,
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    badge: 'Top Rated',
    featured: true,
    quizId: 'quiz-course-3',
    overview: [
      'Learn core syntax: variables, control flow, loops, functions, and error handling.',
      'Master built-in data structures: lists, dictionaries, tuples, sets, and list comprehensions.',
      'Write modular code using Object-Oriented Programming (Classes, Inheritance, Polymorphism).',
      'Automate real-world tasks like file parsing, JSON manipulation, and CSV analysis.'
    ],
    learningOutcomes: [
      'Write idiomatic, PEP8 compliant Python code',
      'Build automated desktop scripts and data extractors',
      'Work with external libraries using pip and virtual environments',
      'Confidently tackle algorithmic problem-solving'
    ],
    requirements: [
      'Any computer running Windows, macOS, or Linux',
      'No previous coding experience required'
    ],
    modules: [
      {
        id: 'mod-3-1',
        title: 'Module 1: Python Core Foundations',
        description: 'Variables, types, logical operators, conditional branching, and loops.',
        lessons: [
          {
            id: 'les-3-1-1',
            title: 'Setting Up Python 3 & The Interactive REPL',
            duration: '15 min',
            durationMinutes: 15,
            type: 'video',
            summary: 'Install Python, set up virtual environments, and explore the interactive shell.',
            content: `Learn the fundamentals of interpreted languages, running scripts from the terminal, and working with Python data types.`
          },
          {
            id: 'les-3-1-2',
            title: 'Control Flow, Conditionals & Loops',
            duration: '22 min',
            durationMinutes: 22,
            type: 'video',
            summary: 'Harness if-elif-else statements, for loops, while loops, and break/continue clauses.',
            content: `Write robust algorithms that process iterative data sequences efficiently.`
          }
        ]
      },
      {
        id: 'mod-3-2',
        title: 'Module 2: Data Structures & OOP',
        description: 'Lists, dictionaries, functions, classes, and file I/O.',
        lessons: [
          {
            id: 'les-3-2-1',
            title: 'Dictionaries, Sets & List Comprehensions',
            duration: '24 min',
            durationMinutes: 24,
            type: 'video',
            summary: 'High-performance data storage and concise Pythonic transformations.',
            content: `Discover hash maps in Python, key lookups, nested structures, and writing one-line list comprehensions.`
          },
          {
            id: 'les-3-2-2',
            title: 'Object-Oriented Programming in Python',
            duration: '28 min',
            durationMinutes: 28,
            type: 'interactive',
            summary: 'Design reusable classes with dunder methods (__init__, __str__, __repr__).',
            content: `Model real-world entities, encapsulate state, and implement class inheritance hierarchies.`
          }
        ]
      }
    ]
  },
  {
    id: 'course-4',
    title: 'Data Analytics with SQL & PowerBI',
    shortDescription: 'Extract business insights from raw data using relational SQL queries, data modeling, and interactive dashboards.',
    description: 'Transform raw company data into compelling visual narratives. Learn SQL joins, window functions, statistical aggregation, star schema data modeling, and executive dashboard design in PowerBI.',
    category: 'Data Science',
    instructor: {
      name: 'James Thorpe',
      role: 'Head of Business Intelligence at Monzo',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      bio: 'Analytics executive with 15+ years advising fintech and retail giants on data-driven decision architectures.'
    },
    rating: 4.8,
    reviewsCount: 1850,
    students: 9400,
    difficulty: 'Intermediate',
    duration: '18 hours',
    totalMinutes: 1080,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    badge: 'High Demand',
    featured: false,
    quizId: 'quiz-course-4',
    overview: [
      'Write complex SQL queries with multi-table JOINs, subqueries, and CTEs.',
      'Compute running totals, rankings, and moving averages using SQL window functions.',
      'Design clean dimensional data models (fact and dimension tables).',
      'Build executive PowerBI dashboards with KPI cards, trend lines, and interactive slicers.'
    ],
    learningOutcomes: [
      'Query any relational database with confidence',
      'Calculate key SaaS metrics: CAC, LTV, Churn, and Cohort retention',
      'Cleanse dirty messy data with structured ETL scripts',
      'Present data insights to executive stakeholders clearly'
    ],
    requirements: [
      'Basic spreadsheet experience (Excel or Google Sheets)',
      'A computer capable of installing database tools'
    ],
    modules: [
      {
        id: 'mod-4-1',
        title: 'Module 1: Advanced SQL for Analytics',
        description: 'Filtering, grouping, joins, and window analytical functions.',
        lessons: [
          {
            id: 'les-4-1-1',
            title: 'Mastering Relational JOINs & Aggregations',
            duration: '25 min',
            durationMinutes: 25,
            type: 'video',
            summary: 'Inner, Left, Right, and Full Outer joins explained visually with set theory.',
            content: `Learn how database optimizers execute joins and how to prevent costly Cartesian products.`
          },
          {
            id: 'les-4-1-2',
            title: 'Window Functions: ROW_NUMBER, RANK & LAG/LEAD',
            duration: '30 min',
            durationMinutes: 30,
            type: 'video',
            summary: 'Calculate month-over-month growth, rolling 7-day averages, and customer rankings.',
            content: `Understand the OVER() clause, PARTITION BY, and ORDER BY within analytical partitions.`
          }
        ]
      }
    ]
  },
  {
    id: 'course-5',
    title: 'React.js Masterclass: Architecture, State & Performance',
    shortDescription: 'Deep dive into advanced React patterns, custom hooks, context optimization, suspense, and server-side concepts.',
    description: 'Level up from basic React to senior frontend architecture. Master state machines, performance profiling, memoization, reusable compound component patterns, and modern state management.',
    category: 'Web Development',
    instructor: {
      name: 'David Chen',
      role: 'Staff UI Architect & Open Source Maintainer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      bio: 'Created popular UI open-source libraries with 500k+ downloads. Technical conference keynote speaker.'
    },
    rating: 4.9,
    reviewsCount: 3100,
    students: 15800,
    difficulty: 'Advanced',
    duration: '22 hours',
    totalMinutes: 1320,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80',
    badge: 'Advanced',
    featured: true,
    quizId: 'quiz-course-5',
    overview: [
      'Master the React Fiber reconciliation engine and rendering phases.',
      'Optimize re-renders with useMemo, useCallback, and React.memo without premature optimization.',
      'Build compound components with custom contexts and controlled/uncontrolled state patterns.',
      'Integrate accessible animations, error boundaries, and optimistic UI updates.'
    ],
    learningOutcomes: [
      'Architect enterprise-grade React codebases',
      'Diagnose and fix performance bottlenecks using React DevTools profiler',
      'Design headless component libraries with zero accessibility defects',
      'Write reliable custom hooks that isolate complex business logic'
    ],
    requirements: [
      'Solid working knowledge of JavaScript (ES6+) and basic React concepts'
    ],
    modules: [
      {
        id: 'mod-5-1',
        title: 'Module 1: Rendering Engine & Performance Optimization',
        description: 'How React renders, reconciles, and optimizes the virtual DOM tree.',
        lessons: [
          {
            id: 'les-5-1-1',
            title: 'How React Fiber Reconciles Components',
            duration: '24 min',
            durationMinutes: 24,
            type: 'video',
            summary: 'Understanding the render phase versus the commit phase, and fiber nodes.',
            content: `Peek under the hood of React. Learn why components re-render, how state batches, and how priority scheduling functions.`
          },
          {
            id: 'les-5-1-2',
            title: 'Eliminating Costly Re-renders with Profiling',
            duration: '28 min',
            durationMinutes: 28,
            type: 'video',
            summary: 'Profile real web applications and identify expensive renders using React DevTools.',
            content: `Learn when to use useMemo and useCallback, and when the overhead of memoization exceeds the benefits.`
          }
        ]
      }
    ]
  },
  {
    id: 'course-6',
    title: 'Digital Marketing & Growth Hacking Mastery',
    shortDescription: 'Drive sustainable customer acquisition with SEO, performance advertising, email marketing funnels, and viral loops.',
    description: 'Learn modern marketing strategies that generate measurable ROI. Master search engine optimization, Google Ads, Meta ad campaigns, copywriting for conversion, and retention analytics.',
    category: 'Marketing',
    instructor: {
      name: 'Chloe Lin',
      role: 'Chief Growth Officer & Angel Investor',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      bio: 'Scaled multiple consumer apps from zero to 10M+ users. Featured on Forbes 30 under 30.'
    },
    rating: 4.7,
    reviewsCount: 1420,
    students: 8900,
    difficulty: 'Beginner',
    duration: '14 hours',
    totalMinutes: 840,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    badge: 'Career Track',
    featured: false,
    quizId: 'quiz-course-6',
    overview: [
      'Comprehensive keyword research, technical SEO, and link-building frameworks.',
      'Run profitable Meta and Google Search campaigns with high click-through rates.',
      'Design automated email drip campaigns that nurture leads into loyal buyers.',
      'Analyze customer acquisition cost (CAC) and customer lifetime value (LTV).'
    ],
    learningOutcomes: [
      'Build an omni-channel digital acquisition engine',
      'Optimize landing page conversion rates using A/B split testing',
      'Write persuasive ad copy and value propositions that sell',
      'Calculate marketing attribution and optimize campaign ROAS'
    ],
    requirements: [
      'No marketing background required; curiosity for consumer psychology is ideal'
    ],
    modules: [
      {
        id: 'mod-6-1',
        title: 'Module 1: Search Engine Optimization & Content',
        description: 'Ranking on page 1 of Google through technical and content excellence.',
        lessons: [
          {
            id: 'les-6-1-1',
            title: 'Keyword Intent & The Topical Authority Map',
            duration: '16 min',
            durationMinutes: 16,
            type: 'video',
            summary: 'Identify high-intent keywords that bring qualified traffic ready to convert.',
            content: `Learn the differences between informational, navigational, commercial, and transactional search queries.`
          }
        ]
      }
    ]
  },
  {
    id: 'course-7',
    title: 'Mobile App Development with React Native & Expo',
    shortDescription: 'Build native iOS and Android apps using a single TypeScript codebase with native animations and offline storage.',
    description: 'Ship native mobile apps for App Store and Google Play using React Native. Master native device sensors, gestures, camera access, push notifications, and local SQLite data caching.',
    category: 'Mobile Development',
    instructor: {
      name: 'Julian Alvarez',
      role: 'Principal Mobile Architect at Uber',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      bio: 'Mobile platform leader specializing in high-performance cross-platform frameworks and bridge optimization.'
    },
    rating: 4.8,
    reviewsCount: 1980,
    students: 11200,
    difficulty: 'Intermediate',
    duration: '20 hours',
    totalMinutes: 1200,
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80',
    badge: 'Popular',
    featured: false,
    quizId: 'quiz-course-7',
    overview: [
      'Develop cross-platform apps with Expo and React Native Paper.',
      'Implement smooth 60fps animations using React Native Reanimated and Gesture Handler.',
      'Access native device features: Geolocation, Camera, Biometrics, and Push Notifications.',
      'Deploy to Apple TestFlight and Google Play Internal Testing tracks.'
    ],
    learningOutcomes: [
      'Build and publish production iOS and Android applications',
      'Manage offline-first app architecture with local persistence',
      'Create custom native transitions and gesture-driven UI components',
      'Debug native performance issues with Flipper and Chrome debugger'
    ],
    requirements: [
      'Basic knowledge of JavaScript/TypeScript and React'
    ],
    modules: [
      {
        id: 'mod-7-1',
        title: 'Module 1: React Native Architecture',
        description: 'Native bridges, Fabric renderer, and core mobile primitives.',
        lessons: [
          {
            id: 'les-7-1-1',
            title: 'Core Components: View, Text, ScrollView & FlatList',
            duration: '22 min',
            durationMinutes: 22,
            type: 'video',
            summary: 'Understanding mobile viewport mechanics and virtualized list optimization.',
            content: `Learn how React Native translates React elements directly into native UIKit and Android View widgets.`
          }
        ]
      }
    ]
  },
  {
    id: 'course-8',
    title: 'Graphic Design Essentials: Brand Identity & Vector Craft',
    shortDescription: 'Learn color theory, composition, logo design, brand guidelines, and vector illustration techniques.',
    description: 'Become a skilled visual designer. Learn to develop memorable brand identities, custom logotypes, iconography, editorial print layouts, and digital branding assets.',
    category: 'Graphic Design',
    instructor: {
      name: 'Maya Henderson',
      role: 'Creative Director at Pentagram',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
      bio: 'Award-winning identity designer who has crafted visual languages for global cultural institutions and tech brands.'
    },
    rating: 4.9,
    reviewsCount: 1650,
    students: 7800,
    difficulty: 'Beginner',
    duration: '15 hours',
    totalMinutes: 900,
    thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=80',
    badge: 'Creative',
    featured: false,
    quizId: 'quiz-course-8',
    overview: [
      'Master the golden ratio, rule of thirds, balance, and visual rhythm.',
      'Craft vector logos that scale flawlessly from 16px favicons to billboard prints.',
      'Develop comprehensive brand guideline stylebooks with color, type, and usage rules.',
      'Prepare print-ready CMYK files with bleed, slug, and trim specifications.'
    ],
    learningOutcomes: [
      'Design cohesive, distinctive brand identities from scratch',
      'Create bespoke vector iconography and vector illustrations',
      'Format professional PDF presentations and brand books for clients',
      'Critique and refine visual designs with professional objectivity'
    ],
    requirements: [
      'Vector editing software (Illustrator, Inkscape, or Figma)',
      'No drawing skills required'
    ],
    modules: [
      {
        id: 'mod-8-1',
        title: 'Module 1: Foundations of Visual Identity',
        description: 'Symbolism, geometry, and brand semiotics.',
        lessons: [
          {
            id: 'les-8-1-1',
            title: 'The Anatomy of Memorable Logos',
            duration: '20 min',
            durationMinutes: 20,
            type: 'video',
            summary: 'Dissecting wordmarks, lettermarks, pictorial marks, and abstract emblems.',
            content: `Learn why the best corporate logos are simple, distinct, versatile, and timeless.`
          }
        ]
      }
    ]
  },
  {
    id: 'course-9',
    title: 'Cybersecurity Fundamentals & Ethical Hacking',
    shortDescription: 'Learn network defense, threat modeling, cryptography, vulnerability assessment, and web security best practices.',
    description: 'Step into the critical field of cybersecurity. Understand how attackers exploit web vulnerabilities (OWASP Top 10), learn defensive hardening, network packet analysis with Wireshark, and encryption algorithms.',
    category: 'Cybersecurity',
    instructor: {
      name: 'Nolan Briggs',
      role: 'Chief Information Security Officer & Ethical Hacker',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      bio: 'Former military intelligence cyber specialist, certified CISSP/OSCP with 16+ years in digital forensics and defensive architecture.'
    },
    rating: 4.9,
    reviewsCount: 2890,
    students: 14500,
    difficulty: 'Intermediate',
    duration: '21 hours',
    totalMinutes: 1260,
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
    badge: 'Crucial Skill',
    featured: true,
    quizId: 'quiz-course-9',
    overview: [
      'Understand the CIA Triad: Confidentiality, Integrity, and Availability.',
      'Identify and remediate OWASP Top 10 vulnerabilities (SQLi, XSS, CSRF, SSRF).',
      'Analyze network traffic and protocols using Wireshark and Nmap.',
      'Implement asymmetric (RSA) and symmetric (AES) cryptography and TLS certificates.'
    ],
    learningOutcomes: [
      'Audit web applications for critical security vulnerabilities',
      'Configure secure authentication, session management, and password hashing',
      'Formulate incident response plans for security breaches',
      'Adopt defense-in-depth engineering principles'
    ],
    requirements: [
      'Basic understanding of networking (IP, ports, DNS) and web concepts'
    ],
    modules: [
      {
        id: 'mod-9-1',
        title: 'Module 1: Web Security & The OWASP Top 10',
        description: 'Vulnerability mechanics and prevention strategies.',
        lessons: [
          {
            id: 'les-9-1-1',
            title: 'Preventing Cross-Site Scripting (XSS) & SQL Injection',
            duration: '26 min',
            durationMinutes: 26,
            type: 'video',
            summary: 'How input sanitization, parameterized queries, and Content Security Policies stop attacks.',
            content: `Dissect reflected, stored, and DOM-based XSS attacks. Learn how attackers siphon cookies and tokens, and how modern frameworks prevent this.`
          }
        ]
      }
    ]
  },
  {
    id: 'course-10',
    title: 'Product Management: Leading from Idea to Launch',
    shortDescription: 'Master product discovery, customer interviews, roadmapping, agile sprints, unit economics, and data-driven prioritization.',
    description: 'Learn the core disciplines of high-impact product managers. From identifying unmet market opportunities to orchestrating cross-functional teams of engineers and designers to shipping market-winning products.',
    category: 'Business',
    instructor: {
      name: 'Priya Sharma',
      role: 'VP of Product at Loom (Atlassian)',
      avatar: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=150&auto=format&fit=crop&q=80',
      bio: 'Scaled SaaS products from seed to multi-billion dollar acquisition. Top mentor on Reforge and ProductSchool.'
    },
    rating: 4.8,
    reviewsCount: 1540,
    students: 8200,
    difficulty: 'Intermediate',
    duration: '16 hours',
    totalMinutes: 960,
    thumbnail: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80',
    badge: 'Leadership',
    featured: false,
    quizId: 'quiz-course-10',
    overview: [
      'Conduct rigorous customer discovery interviews without leading the witness.',
      'Prioritize features using RICE, Kano, and Opportunity Scoring models.',
      'Write razor-sharp Product Requirement Documents (PRDs) that engineers love.',
      'Define North Star metrics, retention cohorts, and feature adoption funnels.'
    ],
    learningOutcomes: [
      'Lead cross-functional teams with authority and empathy',
      'Create strategic product roadmaps aligned with business objectives',
      'Run high-velocity agile sprints and backlog grooming sessions',
      'Ace modern product management case interviews'
    ],
    requirements: [
      'Interest in business, technology, and user behavior'
    ],
    modules: [
      {
        id: 'mod-10-1',
        title: 'Module 1: Product Discovery & Strategy',
        description: 'Finding product-market fit and validating hypotheses.',
        lessons: [
          {
            id: 'les-10-1-1',
            title: 'The Mom Test: Uncovering Real Customer Pain',
            duration: '21 min',
            durationMinutes: 21,
            type: 'video',
            summary: 'How to ask questions that reveal truth instead of polite encouragement.',
            content: `Learn why talking to users is the highest leverage activity for any product manager, and how to filter out feature requests from genuine underlying pain points.`
          }
        ]
      }
    ]
  },
  {
    id: 'course-11',
    title: 'Business & Startup Fundamentals: Launching Your Venture',
    shortDescription: 'Learn business models, financial forecasting, go-to-market strategies, venture funding, and unit economics.',
    description: 'Turn your ideas into sustainable, profitable businesses. Learn how to structure pricing, analyze market size (TAM/SAM/SOM), write a pitch deck that raises capital, and manage burn rate and cash flow.',
    category: 'Business',
    instructor: {
      name: 'Alexander Sterling',
      role: 'Managing Partner at Apex Ventures',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
      bio: 'Serial founder with two successful exits. Early-stage investor in 40+ high-growth tech startups.'
    },
    rating: 4.8,
    reviewsCount: 1220,
    students: 6900,
    difficulty: 'Beginner',
    duration: '14 hours',
    totalMinutes: 840,
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
    badge: 'Entrepreneurship',
    featured: false,
    quizId: 'quiz-course-11',
    overview: [
      'Evaluate business ideas with the Lean Canvas framework.',
      'Understand unit economics: Gross margins, contribution margins, and payback periods.',
      'Construct a 10-slide pitch deck tailored for angel investors and venture capitalists.',
      'Navigate legal structures, cap tables, equity splits, and SAFE notes.'
    ],
    learningOutcomes: [
      'Evaluate the commercial viability of any startup idea',
      'Build a dynamic 3-statement financial forecasting model',
      'Negotiate term sheets and understand valuation mechanics',
      'Execute a disciplined go-to-market launch strategy'
    ],
    requirements: [
      'No prior business education required; curiosity to build something new is all you need'
    ],
    modules: [
      {
        id: 'mod-11-1',
        title: 'Module 1: Business Models & Economics',
        description: 'Revenue models, pricing psychology, and margins.',
        lessons: [
          {
            id: 'les-11-1-1',
            title: 'Dissecting Modern Business Models (SaaS, Marketplace, Usage)',
            duration: '20 min',
            durationMinutes: 20,
            type: 'video',
            summary: 'Comparing recurrent subscriptions, transactional take-rates, and enterprise licensing.',
            content: `Learn what makes business models defensible, how network effects work, and how switching costs create lasting competitive moats.`
          }
        ]
      }
    ]
  },
  {
    id: 'course-12',
    title: 'Photography Masterclass: Camera Craft & Visual Storytelling',
    shortDescription: 'Master manual exposure, composition rules, natural and studio lighting, portraiture, and Lightroom editing.',
    description: 'Unlock your creative eye and master manual camera controls. Learn the exposure triangle (Aperture, Shutter Speed, ISO), dynamic lighting, color grading in Adobe Lightroom, and framing emotional photographs.',
    category: 'Photography',
    instructor: {
      name: 'Claire Beauchamp',
      role: 'National Geographic Contributing Photographer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      bio: 'Award-winning photojournalist whose documentary work has been exhibited in galleries across 20 countries.'
    },
    rating: 4.9,
    reviewsCount: 2280,
    students: 10400,
    difficulty: 'Beginner',
    duration: '15 hours',
    totalMinutes: 900,
    thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80',
    badge: 'Artistic',
    featured: false,
    quizId: 'quiz-course-12',
    overview: [
      'Master the exposure triangle: Aperture (f-stop), Shutter Speed, and ISO sensitivity.',
      'Harness golden hour, blue hour, and directional window lighting for evocative portraits.',
      'Apply framing rules: Leading lines, framing within a frame, negative space, and depth of field.',
      'Professional RAW post-processing, tone curves, and split toning in Lightroom.'
    ],
    learningOutcomes: [
      'Shoot in full manual mode with total confidence under any lighting condition',
      'Direct subjects naturally for authentic and expressive portraits',
      'Establish a signature visual aesthetic and color palette',
      'Produce print-quality high-resolution photographs'
    ],
    requirements: [
      'Any DSLR, mirrorless camera, or modern smartphone with manual camera controls'
    ],
    modules: [
      {
        id: 'mod-12-1',
        title: 'Module 1: The Exposure Triangle & Camera Mechanics',
        description: 'Taking full creative control over light and time.',
        lessons: [
          {
            id: 'les-12-1-1',
            title: 'Aperture, Depth of Field & Bokeh',
            duration: '18 min',
            durationMinutes: 18,
            type: 'video',
            summary: 'How f-stops control light intake and isolate subjects with creamy background blur.',
            content: `Understand optical physics of camera lenses, chromatic aberration, hyperfocal distance, and picking the right focal length for every scene.`
          }
        ]
      }
    ]
  }
];

export const CATEGORIES = [
  'All',
  'Web Development',
  'UI/UX Design',
  'Programming',
  'Data Science',
  'Marketing',
  'Mobile Development',
  'Graphic Design',
  'Cybersecurity',
  'Business',
  'Photography'
];

export const POPULAR_TAGS = [
  'React 19',
  'Figma',
  'Python',
  'SQL',
  'SEO',
  'App Development',
  'Branding',
  'Ethical Hacking',
  'Product Strategy',
  'Lightroom'
];
