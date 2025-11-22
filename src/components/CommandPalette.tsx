'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface Command {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  action: () => void;
  shortcut?: string;
  category: 'navigation' | 'task' | 'search' | 'action';
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Linear-inspired: All available commands
  const allCommands: Command[] = [
    // Navigation
    { id: 'nav-home', title: '홈', subtitle: '메인 페이지로 이동', icon: '🏠', action: () => router.push('/'), category: 'navigation', shortcut: 'G H' },
    { id: 'nav-workspace', title: 'Workspace', subtitle: '작업 공간', icon: '💼', action: () => router.push('/workspace'), category: 'navigation', shortcut: 'G W' },
    { id: 'nav-nexus', title: 'NEXUS OS', subtitle: 'AI 물류 자동화', icon: '🤖', action: () => router.push('/nexus'), category: 'navigation', shortcut: 'G N' },
    { id: 'nav-teams', title: '팀 관리', subtitle: '30명 조직 관리', icon: '👥', action: () => router.push('/workspace'), category: 'navigation' },
    { id: 'nav-data', title: 'Field Nine V2', subtitle: '데이터 관리', icon: '📊', action: () => router.push('/data-management'), category: 'navigation' },
    
    // Task Actions
    { id: 'task-create', title: '새 작업 생성', subtitle: '빠른 작업 추가', icon: '➕', action: () => console.log('Create task'), category: 'task', shortcut: 'C' },
    { id: 'task-my', title: '내 작업', subtitle: '할당된 작업 보기', icon: '✅', action: () => console.log('My tasks'), category: 'task', shortcut: 'M' },
    { id: 'task-urgent', title: '긴급 작업', subtitle: '우선순위 높음', icon: '🔥', action: () => console.log('Urgent tasks'), category: 'task' },
    
    // Search
    { id: 'search-tasks', title: '작업 검색', subtitle: '모든 작업 검색', icon: '🔍', action: () => console.log('Search tasks'), category: 'search', shortcut: '/' },
    { id: 'search-team', title: '팀원 검색', subtitle: '30명 중 검색', icon: '👤', action: () => console.log('Search team'), category: 'search' },
    
    // Actions
    { id: 'action-theme', title: '테마 전환', subtitle: '다크/라이트 모드', icon: '🌓', action: () => console.log('Toggle theme'), category: 'action', shortcut: 'T' },
    { id: 'action-logout', title: '로그아웃', subtitle: '세션 종료', icon: '🚪', action: () => router.push('/login'), category: 'action' },
  ];

  // Filter commands based on search
  const filteredCommands = search
    ? allCommands.filter(cmd => 
        cmd.title.toLowerCase().includes(search.toLowerCase()) ||
        cmd.subtitle?.toLowerCase().includes(search.toLowerCase())
      )
    : allCommands;

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to toggle
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
        setSearch('');
        setSelectedIndex(0);
      }

      // Escape to close
      if (e.key === 'Escape') {
        setIsOpen(false);
        setSearch('');
        setSelectedIndex(0);
      }

      // Navigate with arrow keys
      if (isOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < filteredCommands.length - 1 ? prev + 1 : 0
          );
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : filteredCommands.length - 1
          );
        }
        if (e.key === 'Enter') {
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action();
            setIsOpen(false);
            setSearch('');
            setSelectedIndex(0);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Execute command
  const executeCommand = (command: Command) => {
    command.action();
    setIsOpen(false);
    setSearch('');
    setSelectedIndex(0);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1300] animate-fade-in"
        onClick={() => setIsOpen(false)}
      />

      {/* Command Palette */}
      <div className="command-palette animate-fade-in">
        {/* Search Input */}
        <div className="relative">
          <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xl">
            🔍
          </span>
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="작업, 페이지, 팀원 검색... (Cmd+K)"
            className="command-input pl-14"
          />
        </div>

        {/* Command List */}
        <div className="command-list">
          {filteredCommands.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">결과 없음</p>
              <p className="text-sm mt-2">다른 검색어를 시도해보세요</p>
            </div>
          ) : (
            <>
              {/* Group by category */}
              {['navigation', 'task', 'search', 'action'].map(category => {
                const categoryCommands = filteredCommands.filter(c => c.category === category);
                if (categoryCommands.length === 0) return null;

                const categoryLabels = {
                  navigation: '🧭 네비게이션',
                  task: '✅ 작업',
                  search: '🔍 검색',
                  action: '⚡ 액션'
                };

                return (
                  <div key={category} className="mb-4">
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {categoryLabels[category as keyof typeof categoryLabels]}
                    </div>
                    {categoryCommands.map((command, index) => {
                      const globalIndex = filteredCommands.indexOf(command);
                      const isSelected = globalIndex === selectedIndex;

                      return (
                        <div
                          key={command.id}
                          data-selected={isSelected}
                          className="command-item"
                          onClick={() => executeCommand(command)}
                          onMouseEnter={() => setSelectedIndex(globalIndex)}
                        >
                          <span className="text-2xl">{command.icon}</span>
                          <div className="flex-1">
                            <div className="font-medium text-sm">{command.title}</div>
                            {command.subtitle && (
                              <div className="text-xs text-gray-500">{command.subtitle}</div>
                            )}
                          </div>
                          {command.shortcut && (
                            <div className="command-shortcut">
                              {command.shortcut.split(' ').map((key, i) => (
                                <kbd 
                                  key={i}
                                  className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs font-mono ml-1"
                                >
                                  {key}
                                </kbd>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded font-mono">↑↓</kbd>
              <span>이동</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded font-mono">Enter</kbd>
              <span>선택</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded font-mono">Esc</kbd>
              <span>닫기</span>
            </span>
          </div>
          <div className="text-gradient-primary font-semibold">
            Linear-inspired ⚡
          </div>
        </div>
      </div>
    </>
  );
}
