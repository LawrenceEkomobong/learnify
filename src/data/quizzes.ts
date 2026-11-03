import { Quiz } from '../types';

export const QUIZZES: Record<string, Quiz> = {
  'quiz-course-1': {
    id: 'quiz-course-1',
    courseId: 'course-1',
    title: 'Web Development Mastery Assessment',
    description: 'Test your understanding of modern JavaScript, the browser DOM, asynchronous handling, and React component concepts.',
    passingScore: 75,
    questions: [
      {
        id: 'q-1-1',
        question: 'Which JavaScript keyword declares a block-scoped variable that cannot be re-assigned?',
        options: ['var', 'let', 'const', 'define'],
        correctIndex: 2,
        explanation: 'const creates a block-scoped binding that cannot be reassigned (though objects bound to const can have their internal properties mutated).'
      },
      {
        id: 'q-1-2',
        question: 'What is the primary role of the JavaScript Event Loop?',
        options: [
          'To compile JavaScript code into native machine assembly',
          'To monitor the Call Stack and task queue, moving callbacks to the stack when it is empty',
          'To perform multithreaded database transactions',
          'To automatically cache HTTP requests'
        ],
        correctIndex: 1,
        explanation: 'The event loop continuously checks if the call stack is empty. When it is, it picks pending tasks from the microtask/macrotask queues and pushes them onto the call stack.'
      },
      {
        id: 'q-1-3',
        question: 'Which semantic HTML5 tag should be used to encapsulate the primary content unique to that document?',
        options: ['<section>', '<main>', '<article>', '<content>'],
        correctIndex: 1,
        explanation: 'The <main> element represents the dominant content of the <body> of a document. A document must not have more than one <main> element without the hidden attribute.'
      },
      {
        id: 'q-1-4',
        question: 'In CSS Flexbox, what property controls alignment along the cross-axis?',
        options: ['justify-content', 'align-items', 'flex-direction', 'place-content'],
        correctIndex: 1,
        explanation: 'align-items defines how flex items are laid out along the cross axis on the current flex line, while justify-content controls the main axis.'
      },
      {
        id: 'q-1-5',
        question: 'In React, what happens when you pass an empty dependency array `[]` to `useEffect`?',
        options: [
          'The effect runs on every single render and update',
          'The effect never executes at all',
          'The effect runs only once after the initial mount',
          'The component throws a runtime compilation error'
        ],
        correctIndex: 2,
        explanation: 'An empty dependency array informs React that your effect doesn’t depend on any values from props or state, so it only executes once after the component mounts.'
      },
      {
        id: 'q-1-6',
        question: 'Which method returns a Promise that resolves when all input promises have resolved, or rejects if any rejects?',
        options: ['Promise.race()', 'Promise.any()', 'Promise.all()', 'Promise.allSettled()'],
        correctIndex: 2,
        explanation: 'Promise.all() takes an iterable of promises and fulfills when all promises fulfill, or immediately rejects as soon as the first promise rejects.'
      }
    ]
  },
  'quiz-course-2': {
    id: 'quiz-course-2',
    courseId: 'course-2',
    title: 'UI/UX Design Principles & Figma Quiz',
    description: 'Demonstrate your grasp of visual hierarchy, accessibility standards, user research methods, and design system components.',
    passingScore: 70,
    questions: [
      {
        id: 'q-2-1',
        question: 'What is the minimum WCAG AA contrast ratio required for standard body text?',
        options: ['3.0:1', '4.5:1', '7.0:1', '10.0:1'],
        correctIndex: 1,
        explanation: 'WCAG 2.1 Level AA requires a contrast ratio of at least 4.5:1 for normal text (under 18pt or under 14pt bold) and 3:1 for large text.'
      },
      {
        id: 'q-2-2',
        question: 'Why is the 8-point spacing grid widely favored across modern product design?',
        options: [
          'Computers only render pixel coordinates that are multiples of 8',
          'It provides visual rhythm and scales cleanly across common screen pixel densities without sub-pixel rounding artifacts',
          'It is an arbitrary standard enforced by Google Material design',
          'It reduces file size in Figma by 50%'
        ],
        correctIndex: 1,
        explanation: '8 is easily divisible by 2 and 4, creating harmonious spatial rhythms that translate cleanly into standard display scales (1x, 2x, 3x) without fuzzy sub-pixel edges.'
      },
      {
        id: 'q-2-3',
        question: 'In Figma, what feature allows elements to adapt automatically in height or width as content changes?',
        options: ['Constraints', 'Auto Layout', 'Smart Animate', 'Vector Networks'],
        correctIndex: 1,
        explanation: 'Auto Layout is Figma’s implementation of flexbox, allowing frames to adjust padding, gap, and dimension dynamically based on their child elements.'
      },
      {
        id: 'q-2-4',
        question: 'Which phase of Design Thinking involves observing and interviewing users to understand their lived experiences and frustrations?',
        options: ['Define', 'Ideate', 'Empathize', 'Prototype'],
        correctIndex: 2,
        explanation: 'Empathize is the initial stage where researchers uncover latent user needs, motivations, and pain points without premature judgment.'
      }
    ]
  },
  'quiz-course-3': {
    id: 'quiz-course-3',
    courseId: 'course-3',
    title: 'Python Syntax & Logic Challenge',
    description: 'Verify your understanding of Python data types, list comprehensions, dictionary operations, and object-oriented fundamentals.',
    passingScore: 75,
    questions: [
      {
        id: 'q-3-1',
        question: 'What is the output of `[x * 2 for x in range(4) if x % 2 == 0]` in Python?',
        options: ['[0, 2, 4, 6]', '[0, 4]', '[2, 4]', '[0, 2]'],
        correctIndex: 1,
        explanation: 'range(4) produces 0, 1, 2, 3. The condition filters for even numbers (0, 2). Multiplying each by 2 yields [0, 4].'
      },
      {
        id: 'q-3-2',
        question: 'Which Python built-in data type is immutable and defined using parentheses `()`?',
        options: ['List', 'Dictionary', 'Set', 'Tuple'],
        correctIndex: 3,
        explanation: 'Tuples are immutable sequences in Python, meaning their elements cannot be changed, added, or removed once initialized.'
      },
      {
        id: 'q-3-3',
        question: 'In Python class definitions, what does the `__init__` method represent?',
        options: [
          'A destructor called when memory is freed',
          'The class constructor that initializes an instance’s attributes',
          'A decorator for class methods',
          'A static method that cannot access self'
        ],
        correctIndex: 1,
        explanation: '`__init__` is the initializer method automatically invoked whenever a new instance of the class is instantiated.'
      }
    ]
  },
  'quiz-course-4': {
    id: 'quiz-course-4',
    courseId: 'course-4',
    title: 'Data Analytics & SQL Proficiency',
    description: 'Assess relational database querying, window functions, and data aggregation mechanics.',
    passingScore: 70,
    questions: [
      {
        id: 'q-4-1',
        question: 'Which SQL clause is used to filter groups created by a `GROUP BY` clause?',
        options: ['WHERE', 'HAVING', 'ORDER BY', 'PARTITION BY'],
        correctIndex: 1,
        explanation: 'WHERE filters rows before aggregation occurs, whereas HAVING filters the grouped and aggregated results.'
      },
      {
        id: 'q-4-2',
        question: 'What does a `LEFT JOIN` return when a matching record does not exist in the right-hand table?',
        options: [
          'It drops the row from the final result set',
          'It fills all columns from the right-hand table with NULL values',
          'It throws an SQL execution syntax error',
          'It duplicates the left table row with default zeros'
        ],
        correctIndex: 1,
        explanation: 'LEFT JOIN returns all rows from the left table; if no match exists on the right, NULL is produced for all right-hand columns.'
      }
    ]
  },
  'quiz-course-5': {
    id: 'quiz-course-5',
    courseId: 'course-5',
    title: 'React.js Architecture & Performance Quiz',
    description: 'Evaluate your knowledge of React Fiber, reconciliation, memoization strategies, and state patterns.',
    passingScore: 80,
    questions: [
      {
        id: 'q-5-1',
        question: 'What is the primary distinction between `useMemo` and `useCallback`?',
        options: [
          'useMemo runs asynchronously while useCallback runs synchronously',
          'useMemo caches the result of calling a function, while useCallback caches the function definition itself',
          'useCallback can only be used inside custom hooks',
          'There is no difference; they are aliases'
        ],
        correctIndex: 1,
        explanation: 'useMemo(() => fn(), deps) returns the computed value of fn(), whereas useCallback(fn, deps) returns the memoized callback function instance.'
      },
      {
        id: 'q-5-2',
        question: 'What happens if you mutate state directly in React instead of calling the setter function?',
        options: [
          'React re-renders immediately with the new value',
          'React will not detect the change, leading to stale UI and skipped reconciliation cycles',
          'The browser throws an uncaught TypeError',
          'The component is permanently removed from the DOM'
        ],
        correctIndex: 1,
        explanation: 'React compares object references (Object.is) to determine if state has changed. Mutating an existing object retains the same memory address, so React skips re-rendering.'
      }
    ]
  },
  'quiz-course-9': {
    id: 'quiz-course-9',
    courseId: 'course-9',
    title: 'Cybersecurity Principles & Web Defense',
    description: 'Test your understanding of the OWASP top vulnerabilities, asymmetric encryption, and network defense.',
    passingScore: 75,
    questions: [
      {
        id: 'q-9-1',
        question: 'What security header helps mitigate Cross-Site Scripting (XSS) by restricting where scripts can be loaded from?',
        options: [
          'Strict-Transport-Security',
          'X-Frame-Options',
          'Content-Security-Policy (CSP)',
          'Access-Control-Allow-Origin'
        ],
        correctIndex: 2,
        explanation: 'Content-Security-Policy (CSP) allows server administrators to specify trusted domains from which scripts, styles, and other assets may be executed.'
      },
      {
        id: 'q-9-2',
        question: 'How does asymmetric encryption (public/private key pairs) ensure confidentiality when sending data to a recipient?',
        options: [
          'The sender encrypts using their own private key',
          'The sender encrypts using the recipient’s public key, which only the recipient’s private key can decrypt',
          'Both parties share a single secret passphrase beforehand',
          'The data is scrambled using a base64 encoding scheme'
        ],
        correctIndex: 1,
        explanation: 'Anyone can use the recipient’s publicly shared key to encrypt a payload, but mathematically only the recipient possessing the corresponding private key can decrypt it.'
      }
    ]
  }
};
