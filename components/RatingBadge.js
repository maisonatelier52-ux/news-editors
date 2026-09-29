export default function RatingBadge({ rating, size = 'md', neutral = false }) {
  if (!rating) return null;

  const label = rating.type === 'percent' ? `${rating.value}%` : rating.value;
  const value = rating.type === 'percent' ? rating.value : parseFloat(rating.value) * 10;

  let colorClass = 'border-green-600 text-green-600';
  if (value < 80 && value >= 60) colorClass = 'border-lime-600 text-lime-600';
  if (value < 60) colorClass = 'border-orange-600 text-orange-600';
  if (neutral) colorClass = 'text-white';

  const sizeClass = size === 'lg' ? 'w-12 h-12 text-sm' : 'w-9 h-9 text-[11px]';

  return (
    <span
      className={`inline-flex items-center justify-center ${sizeClass} rounded-full font-extrabold shadow-sm shrink-0 ${
        neutral ? 'bg-white/20 border-2' : `bg-white border-2 ${colorClass}`
      }`}
      style={neutral ? { borderColor: 'rgba(40,38,36,0.6)' } : undefined}
      title="Rating"
    >
      <span className={neutral ? 'text-white' : colorClass}>{label}</span>
    </span>
  );
}
