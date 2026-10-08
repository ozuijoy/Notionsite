import { createContext, useContext } from 'react'
import type * as types from '@/lib/context/types'

export interface AppContextType {
  siteMap: types.SiteMap | undefined
  pageInfo: types.PageInfo | null
}

export const AppContext = createContext<AppContextType | undefined>(undefined)

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
