import type { WorkspaceFile, HistoryLog } from '@/lib/types/nexus-workspace'

export const mockFiles: WorkspaceFile[] = [
  { id: 'f1', name: '2025 S/S Collection', type: 'folder', modified: '2025. 10. 24', owner: 'Design Team' },
  { id: 'f2', name: 'Tech Packs - Outerwear', type: 'folder', modified: '2025. 10. 22', owner: 'Production' },
  { id: 'd1', name: 'Lookbook_Draft_v2.pdf', type: 'doc', size: '24.5 MB', modified: '10 min ago', owner: 'Kim MD', kTagId: 'KT-8821-X', status: 'Draft' },
  { id: 'i1', name: 'Hero_Jacket_Front.png', type: 'image', size: '4.2 MB', modified: '1 hr ago', owner: 'Lee Designer', kTagId: 'KT-9901-A', status: 'Sample' },
  { id: 'm1', name: '3D_Modeling_Pants.obj', type: '3d', size: '156 MB', modified: 'Yesterday', owner: 'Park 3D', kTagId: 'KT-7712-Z', status: 'Production' },
]

export const historyLog: HistoryLog[] = [
  { id: 1, user: 'Kim MD', action: 'Uploaded file', time: '10:42 AM' },
  { id: 2, user: 'Lee Designer', action: 'Verified K-Tag™', time: '10:30 AM' },
  { id: 3, user: 'System', action: 'Auto-saved version 3.2', time: '09:15 AM' },
]

