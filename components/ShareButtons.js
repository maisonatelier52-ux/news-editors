import Icon from '@/components/Icon';

const networks = [
  { icon: 'facebook', label: 'Facebook', color: 'bg-[#1877f2]' },
  { icon: 'x', label: 'X', color: 'bg-black' },
  { icon: 'linkedin', label: 'LinkedIn', color: 'bg-[#0a66c2]' },
  { icon: 'pinterest', label: 'Pinterest', color: 'bg-[#e60023]' },
];

export default function ShareButtons({ vertical = false }) {
  return (
    <div className={`flex ${vertical ? 'flex-col' : 'flex-row'} gap-2`}>
      {networks.map((n) => (
        <a
          key={n.label}
          href="#"
          aria-label={`Share on ${n.label}`}
          className={`flex items-center justify-center w-9 h-9 rounded-full text-white ${n.color} hover:opacity-90 transition-opacity`}
        >
          <Icon name={n.icon} className="w-4 h-4" />
        </a>
      ))}
    </div>
  );
}
