// components/SearchBar.tsx
import { Input, Button } from '@mantine/core';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }
  return (
    <div className="p-4 flex flex-col">
      <Input
        placeholder="Search Tenants"
        value={searchQuery}
        onChange={(e) => {setSearchQuery(e.target.value)
        }}
        onKeyDown={handleKeyPress}
        classNames={{ wrapper: 'mb-2', input: 'p-2' }}
      />
      <Button onClick={handleSearch} className="bg-blue-500 text-white">
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
