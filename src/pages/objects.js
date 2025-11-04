// --- SVG Icons for Categories ---
export const categoryIcons = {
    all: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>,
    lessons: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m-9-5.747h18" /></svg>,
    exercises: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>,
    experiences: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
    more: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>,
};

// --- Data Structure for Resources ---
export const resourcesData = {
  'TC': {
    lessons: [
      { title: 'Introduction to Chemistry', description: 'A comprehensive overview of basic chemistry principles.', author: 'Prof. Ahmed', link: '#' },
      { title: 'Physics Fundamentals', description: 'Exploring the core concepts of motion and energy.', author: 'Mme. Fatima', link: '#' },
    ],
    exercises: [
      { title: 'Chemistry Practice Problems', description: 'A set of problems to test your knowledge.', author: 'Prof. Ahmed', link: '#' },
    ],
    experiences: [],
    more: [
        { title: 'Video: The World of Atoms', description: 'A short documentary on atomic structures.', author: 'Science Channel', link: '#' },
    ],
  },
  '1BAC': {
    lessons: [
        { title: 'Advanced Organic Chemistry', description: 'Delving into complex carbon compounds.', author: 'Prof. Youssef', link: '#' },
    ],
    exercises: [],
    experiences: [
        { title: 'Lab Simulation: Titration', description: 'An interactive lab to practice titration techniques.', author: 'ChemSims', link: '#' },
    ],
    more: [],
  },
  '2BAC': {
    lessons: [],
    exercises: [
      { title: "Correction d'exercices 1 et 2 de CH2", description: "Corrigé des exercices 1 et 2 de la lecon CH2 de la suivi temporel pour la 2BAC PC.", author: 'Prof. DRIHMIA', link: 'https://drive.google.com/file/d/1rh5kUnzMAat8LQGWIuWlmHhqeD-dgXae/view?usp=drivesdk' },
    ],
    experiences: [],
    more: [],
  },
};