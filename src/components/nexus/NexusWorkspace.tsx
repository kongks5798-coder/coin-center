"use client"

import { useState } from "react"
import {
  HardDrive,
  Users,
  Clock,
  Star,
  Cloud,
  Tag,
  Plus,
  Search,
  Settings,
  LogOut,
  Grid,
  List,
  ChevronRight,
  Folder,
  FileText,
  ImageIcon,
  Box,
  MoreVertical,
  X,
} from "lucide-react"
import { mockFiles, historyLog } from "@/lib/data/mock-workspace"
import type { WorkspaceFile } from "@/lib/types/nexus-workspace"

interface NexusWorkspaceProps {
  onLogout: () => void
}

interface SidebarItemProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  active: boolean
  onClick: () => void
}

const SidebarItem = ({ icon: Icon, label, active, onClick }: SidebarItemProps) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-r-full text-sm font-medium transition-colors mb-1 ${
      active
        ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
        : 'text-slate-600 hover:bg-slate-100 border-l-4 border-transparent'
    }`}
  >
    <Icon className="w-5 h-5" />
    {label}
  </button>
)

interface FileCardProps {
  file: WorkspaceFile
  onSelect: () => void
  selected: boolean
}

const FileCard = ({ file, onSelect, selected }: FileCardProps) => {
  const getIcon = () => {
    switch (file.type) {
      case 'folder':
        return <Folder className="w-6 h-6 text-slate-400" />
      case 'image':
        return <ImageIcon className="w-6 h-6" />
      case 'doc':
        return <FileText className="w-6 h-6" />
      case '3d':
        return <Box className="w-6 h-6" />
    }
  }

  const getIconBg = () => {
    switch (file.type) {
      case 'folder':
        return 'bg-slate-100 text-slate-500'
      case 'image':
        return 'bg-purple-50 text-purple-500'
      case 'doc':
        return 'bg-red-50 text-red-500'
      case '3d':
        return 'bg-orange-50 text-orange-500'
    }
  }

  return (
    <div
      onClick={onSelect}
      className={`group relative p-4 rounded-xl border transition-all cursor-pointer flex flex-col gap-3 ${
        selected
          ? 'bg-blue-50 border-blue-200 ring-1 ring-blue-300 shadow-sm'
          : 'bg-white border-slate-200 hover:border-blue-200 hover:shadow-md'
      }`}
    >
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-lg ${getIconBg()}`}>{getIcon()}</div>
        <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-100 rounded-full transition-opacity">
          <MoreVertical className="w-4 h-4 text-slate-400" />
        </button>
      </div>
      <div>
        <h3 className="font-medium text-slate-700 truncate text-sm" title={file.name}>
          {file.name}
        </h3>
        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
          {file.type === 'folder' ? file.modified : file.size}
          {file.kTagId && (
            <span className="w-2 h-2 rounded-full bg-green-500 ml-1" title="K-Tag Active" />
          )}
        </p>
      </div>
      {file.kTagId && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-white/90 backdrop-blur border border-slate-200 shadow-sm px-2 py-0.5 rounded text-[10px] font-mono text-slate-500">
            K-TAG
          </div>
        </div>
      )}
    </div>
  )
}

export function NexusWorkspace({ onLogout }: NexusWorkspaceProps) {
  const [activeMenu, setActiveMenu] = useState('drive')
  const [selectedFile, setSelectedFile] = useState<WorkspaceFile | null>(null)

  const folders = mockFiles.filter((f) => f.type === 'folder')
  const files = mockFiles.filter((f) => f.type !== 'folder')

  return (
    <div className="flex h-screen bg-white font-sans text-slate-900 overflow-hidden">
      <aside className="w-64 flex flex-col py-4 pr-4 bg-white border-r border-slate-100">
        <div className="px-6 mb-6 flex items-center gap-2 cursor-pointer" onClick={onLogout}>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            N
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">NEXUS</span>
        </div>
        <div className="px-4 mb-6">
          <button className="w-full flex items-center gap-2 bg-white border border-slate-200 hover:shadow-md transition-shadow px-4 py-3 rounded-2xl text-slate-700 font-medium shadow-sm">
            <Plus className="w-5 h-5 text-blue-600" />
            <span>New Upload</span>
          </button>
        </div>
        <nav className="flex-1 space-y-1">
          <SidebarItem
            icon={HardDrive}
            label="My Workspace"
            active={activeMenu === 'drive'}
            onClick={() => setActiveMenu('drive')}
          />
          <SidebarItem
            icon={Users}
            label="Team Drives"
            active={activeMenu === 'team'}
            onClick={() => setActiveMenu('team')}
          />
          <SidebarItem
            icon={Clock}
            label="Recent"
            active={activeMenu === 'recent'}
            onClick={() => setActiveMenu('recent')}
          />
          <SidebarItem
            icon={Star}
            label="Starred"
            active={activeMenu === 'starred'}
            onClick={() => setActiveMenu('starred')}
          />
          <div className="my-4 border-t border-slate-100 mx-4"></div>
          <SidebarItem
            icon={Cloud}
            label="Asset Cloud"
            active={activeMenu === 'storage'}
            onClick={() => setActiveMenu('storage')}
          />
          <SidebarItem
            icon={Tag}
            label="K-Tag™ Manager"
            active={activeMenu === 'ktag'}
            onClick={() => setActiveMenu('ktag')}
          />
        </nav>
        <div className="px-6 mt-auto">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-2 text-sm">
              <span className="font-medium text-slate-600">Storage</span>
              <span className="text-blue-600">82%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mb-2">
              <div className="w-[82%] h-full bg-blue-600 rounded-full"></div>
            </div>
            <p className="text-xs text-slate-400">8.2 TB of 10 TB used</p>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col bg-white">
        <header className="h-16 border-b border-slate-100 flex items-center justify-between px-6 bg-white">
          <div className="flex-1 max-w-2xl">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                type="text"
                placeholder="Search assets, K-Tags, or design files..."
                className="w-full bg-slate-100 hover:bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:outline-none border border-transparent focus:border-blue-200 rounded-full py-2.5 pl-10 pr-4 transition-all text-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 ml-4">
            <button className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
              <Settings className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 text-white flex items-center justify-center text-sm font-bold shadow-sm">
              C
            </div>
            <button
              onClick={onLogout}
              className="ml-2 p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span className="hover:bg-slate-100 px-2 py-1 rounded cursor-pointer">My Workspace</span>
                <ChevronRight className="w-4 h-4" />
                <span className="font-medium text-slate-900 bg-slate-100 px-2 py-1 rounded">
                  2025 S/S Collection
                </span>
              </div>
              <div className="flex gap-1 border border-slate-200 rounded-lg p-1">
                <button className="p-1.5 bg-slate-100 rounded text-slate-700">
                  <Grid className="w-4 h-4" />
                </button>
                <button className="p-1.5 hover:bg-slate-50 rounded text-slate-400">
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-sm font-medium text-slate-500 mb-4 px-1">Folders</h2>
              <div className="grid grid-cols-4 gap-4">
                {folders.map((file) => (
                  <FileCard
                    key={file.id}
                    file={file}
                    onSelect={() => setSelectedFile(file)}
                    selected={selectedFile?.id === file.id}
                  />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-medium text-slate-500 mb-4 px-1">Assets & Files</h2>
              <div className="grid grid-cols-4 gap-4">
                {files.map((file) => (
                  <FileCard
                    key={file.id}
                    file={file}
                    onSelect={() => setSelectedFile(file)}
                    selected={selectedFile?.id === file.id}
                  />
                ))}
              </div>
            </div>
          </div>

          {selectedFile && selectedFile.type !== 'folder' && (
            <aside className="w-80 border-l border-slate-200 bg-white p-6 overflow-y-auto shadow-[-5px_0_15px_rgba(0,0,0,0.02)]">
              <div className="flex items-start justify-between mb-6">
                <h3 className="font-bold text-lg text-slate-800 leading-tight">{selectedFile.name}</h3>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5 rotate-45" />
                </button>
              </div>

              <div className="aspect-video bg-slate-50 rounded-lg border border-slate-100 mb-6 flex items-center justify-center text-slate-400">
                {selectedFile.type === 'image' && <ImageIcon className="w-12 h-12 opacity-20" />}
                {selectedFile.type === 'doc' && <FileText className="w-12 h-12 opacity-20" />}
                {selectedFile.type === '3d' && <Box className="w-12 h-12 opacity-20" />}
              </div>

              {selectedFile.kTagId && (
                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-blue-600" />
                    <span className="font-bold text-sm text-blue-900">K-Tag™ (RFID)</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Digital ID</span>
                      <span className="font-mono text-slate-700 bg-white px-2 py-0.5 rounded border border-blue-100">
                        {selectedFile.kTagId}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Status</span>
                      <span className="font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                        {selectedFile.status}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Location</span>
                      <span className="text-slate-700">Zone A-1 (Warehouse)</span>
                    </div>
                  </div>
                  <button className="w-full mt-3 py-2 bg-white border border-blue-200 text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-sm">
                    View Asset History
                  </button>
                </div>
              )}

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Owner</span>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-slate-200" />
                    <span className="text-slate-700 font-medium">{selectedFile.owner}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Size</span>
                  <span className="text-slate-700 font-mono">{selectedFile.size}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Modified</span>
                  <span className="text-slate-700">{selectedFile.modified}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-sm text-slate-800 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  Activity History
                </h4>
                <div className="space-y-4 relative before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-px before:bg-slate-100">
                  {historyLog.map((log) => (
                    <div key={log.id} className="relative pl-6 text-sm">
                      <div className="absolute left-0 top-1.5 w-3 h-3 bg-white border-2 border-slate-200 rounded-full"></div>
                      <p className="text-slate-700 font-medium">{log.action}</p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {log.user} • {log.time}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          )}
        </div>
      </main>
    </div>
  )
}

