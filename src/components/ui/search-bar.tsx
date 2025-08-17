import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  className?: string;
}

export function SearchBar({
  placeholder = "Search products...",
  value = "",
  onChange,
  onSearch,
  className,
}: SearchBarProps) {
  const [searchValue, setSearchValue] = useState(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    onChange?.(newValue);
  };

  const handleSearch = () => {
    onSearch?.(searchValue);
  };

  const handleClear = () => {
    setSearchValue("");
    onChange?.("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={cn("relative w-full max-w-lg", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="pl-10 pr-10 h-12 rounded-2xl border-2 bg-card/50 backdrop-blur-sm transition-all duration-200 focus:border-primary focus:shadow-lg"
        />
        {searchValue && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}