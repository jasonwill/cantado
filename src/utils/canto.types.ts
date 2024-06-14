export interface CantoItem {
  height: string
  ownerName: string
  dpi: string
  idPath: string
  namePath: string
  created: string
  url: {
    preview?: string
    detail: string
  }
  time: string
  width: string
  name: string
  id: string
  size: string
  scheme: string
  owner: string
  children?: CantoItem[]
}

export interface TreeNodeProps {
  items: CantoItem[]
}

export interface CantoFullTree {
  sortBy: string
  sortDirection: string
  results: CantoAlbumResult[]
}

export interface CantoAlbumResult {
  time: string
  name: string
  id: string
  size: string
  scheme: string
  owner: string
  children?: CantoAlbumChildren[]
  url: CantoUrl
  created: string
  width: string
  height: string
  dpi: string
  idPath: string
  namePath: string
  ownerName: string
}

export interface CantoAlbumChildren {
  time: string
  name: string
  id: string
  size: string
  scheme: string
  owner: string
  url: CantoUrl
  created: string
  width: string
  height: string
  dpi: string
  idPath: string
  namePath: string
  ownerName: string
  children?: CantoAlbumChildren[]
}

export interface CantoUrl {
  preview?: string
  detail: string
}