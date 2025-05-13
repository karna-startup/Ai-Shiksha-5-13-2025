
// Age group path to display name mapping
export const ageGroupNames: Record<string, string> = {
  'early-learners': '3-6 Years',
  'elementary': '7-10 Years',
  'middle-school': '11-14 Years',
  'high-school': '15-18 Years',
  'common': 'Common Resources'
};

// Get completed levels from localStorage
export const getCompletedLevels = (ageGroup: string): number[] => {
  try {
    const saved = localStorage.getItem(`${ageGroup}-completed-levels`);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error('Error reading completed levels from localStorage', e);
    return [];
  }
};

// Save completed level to localStorage
export const saveCompletedLevel = (ageGroup: string, level: number) => {
  try {
    const currentCompleted = getCompletedLevels(ageGroup);
    if (!currentCompleted.includes(level)) {
      const newCompleted = [...currentCompleted, level];
      localStorage.setItem(`${ageGroup}-completed-levels`, JSON.stringify(newCompleted));
    }
  } catch (e) {
    console.error('Error saving completed level to localStorage', e);
  }
};
