'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SearchResult {
  id: string;
  type: 'page' | 'task' | 'team' | 'document';
  title: string;
  subtitle?: string;
  url: string;
}

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Mock search results - replace with actual API call
  const searchData: SearchResult[] = [
    { id: '1', type: 'page', title: 'NEXUS OS', subtitle: 'AI 물류 자동화 시스템', url: '/nexus' },
    { id: '2', type: 'page', title: 'Workspace', subtitle: '팀 협업 공간', url: '/workspace' },
    { id: '3', type: 'page', title: 'Field Nine V2', subtitle: '데이터 관리 센터', url: '/data-management' },
    { id: '4', type: 'task', title: 'RFID 시스템 통합', subtitle: '진행 중인 작업', url: '/workspace' },
    { id: '5', type: 'team', title: 'FILLUMINATE 팀', subtitle: '데이터 분석 팀', url: '/workspace' },
  ];

  useEffect(() => {
    if (query.trim()) {
      const filtered = searchData.filter(
        item =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle?.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : results.length - 1));
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        router.push(results[selectedIndex].url);
        setQuery('');
        setIsOpen(false);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, router]);

  const handleSelect = (result: SearchResult) => {
    router.push(result.url);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setSelectedIndex(0);
          }}
          onFocus={() => query.trim() && setIsOpen(true)}
          placeholder="검색... (작업, 페이지, 팀원)"
          className="w-full pl-10 pr-10 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-accent/10 rounded"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-background border border-border rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
          {results.map((result, index) => (
            <button
              key={result.id}
              onClick={() => handleSelect(result)}
              className={`w-full px-4 py-3 text-left hover:bg-accent/10 transition-colors ${
                index === selectedIndex ? 'bg-accent/10' : ''
              } ${index !== results.length - 1 ? 'border-b border-border' : ''}`}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <div className="flex items-start gap-3">
                <span className="text-lg">
                  {result.type === 'page' && '📄'}
                  {result.type === 'task' && '✅'}
                  {result.type === 'team' && '👥'}
                  {result.type === 'document' && '📝'}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-foreground truncate">{result.title}</div>
                  {result.subtitle && (
                    <div className="text-xs text-muted-foreground mt-0.5 truncate">{result.subtitle}</div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {isOpen && query.trim() && results.length === 0 && (
        <div className="absolute top-full mt-2 w-full bg-background border border-border rounded-lg shadow-lg p-4 text-center text-sm text-muted-foreground z-50">
          검색 결과가 없습니다
        </div>
      )}
    </div>
  );
}
