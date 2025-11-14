import { FiSearch } from 'react-icons/fi';

const SearchBar = () => {
  return (
    <div className="flex-1 max-w-2xl mx-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for restaurants or dishes"
          className="w-full px-4 py-3 pl-12 rounded-full bg-doordash-light-gray text-doordash-dark placeholder-doordash-gray focus:outline-none focus:ring-2 focus:ring-doordash-red transition-all"
        />
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-doordash-gray text-xl" />
      </div>
    </div>
  );
};

export default SearchBar;
