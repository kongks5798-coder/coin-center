export type FileType = 'folder' | 'doc' | 'image' | '3d'

export interface WorkspaceFile {
  id: string
  name: string
  type: FileType
  size?: string
  modified: string
  owner: string
  kTagId?: string
  status?: string
}

export interface HistoryLog {
  id: number
  user: string
  action: string
  time: string
}

