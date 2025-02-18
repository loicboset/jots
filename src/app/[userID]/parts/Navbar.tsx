const DUMMY_CATEGORIES = [
  { label: 'Todo', color: '#FF0000' },
  { label: 'Work', color: '#00FF00' },
  { label: 'Side project', color: '#0000FF' },
]

const NavBar = () => {
  return (
    <div className="bg-gray-600/30 text-lg border-r border-white/10 text-white p-8">
      <ul className="space-y-4">
        {DUMMY_CATEGORIES.map((cat) => (
          <li key={cat.label} className="flex items-center space-x-2">
            <span style={{ backgroundColor: cat.color }} className="h-2 w-2 rounded-full" />
            <span className="whitespace-nowrap text-ellipsis">#{cat.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavBar;
