export const CATEGORIES = [
  { value: 'General', color: 'var(--color-cat-general)' },
  { value: 'Tech', color: 'var(--color-cat-tech)' },
  { value: 'Travel', color: 'var(--color-cat-travel)' },
  { value: 'Lifestyle', color: 'var(--color-cat-lifestyle)' },
  { value: 'Education', color: 'var(--color-cat-education)' },
];

export function categoryColor(category) {
  const match = CATEGORIES.find((c) => c.value === category);
  return match ? match.color : 'var(--color-cat-general)';
}
