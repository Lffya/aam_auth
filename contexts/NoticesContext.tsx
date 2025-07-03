"use client"

import { createContext, useContext, useReducer, type ReactNode } from "react"
import type { Notice } from "@/lib/types"

interface NoticesState {
  notices: Notice[]
  loading: boolean
  error: string | null
}

type NoticesAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "ADD_NOTICE"; payload: Notice }
  | { type: "UPDATE_NOTICE"; payload: { id: string; notice: Partial<Notice> } }
  | { type: "DELETE_NOTICE"; payload: string }
  | { type: "SET_NOTICES"; payload: Notice[] }

const initialState: NoticesState = {
  notices: [
    // Sample data for demonstration
    {
      id: "1",
      title: "Q3 Financial Results Released",
      description:
        "Our third quarter financial results have been published and are available for review. The company has shown strong growth across all sectors.",
      category: "Financial",
      priority: "high",
      date: new Date().toISOString(),
      regulatory: "SEC",
      fileUrl: "",
      fileName: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "New Compliance Guidelines",
      description:
        "Updated compliance guidelines have been issued following recent regulatory changes. All stakeholders are advised to review the new requirements.",
      category: "Regulatory",
      priority: "medium",
      date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      regulatory: "SEBI",
      fileUrl: "",
      fileName: "",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "3",
      title: "Board Meeting Minutes",
      description:
        "Minutes from the latest board meeting are now available. Key decisions regarding future strategy and investments have been documented.",
      category: "Corporate",
      priority: "low",
      date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      regulatory: "",
      fileUrl: "",
      fileName: "",
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      updatedAt: new Date(Date.now() - 172800000).toISOString(),
    },
  ],
  loading: false,
  error: null,
}

function noticesReducer(state: NoticesState, action: NoticesAction): NoticesState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "SET_ERROR":
      return { ...state, error: action.payload }
    case "ADD_NOTICE":
      return {
        ...state,
        notices: [action.payload, ...state.notices],
        error: null,
      }
    case "UPDATE_NOTICE":
      return {
        ...state,
        notices: state.notices.map((notice) =>
          notice.id === action.payload.id ? { ...notice, ...action.payload.notice } : notice,
        ),
        error: null,
      }
    case "DELETE_NOTICE":
      return {
        ...state,
        notices: state.notices.filter((notice) => notice.id !== action.payload),
        error: null,
      }
    case "SET_NOTICES":
      return { ...state, notices: action.payload }
    default:
      return state
  }
}

interface NoticesContextType {
  state: NoticesState
  createNotice: (notice: Omit<Notice, "id">) => Promise<string>
  getAllNotices: () => Promise<Notice[]>
  updateNotice: (id: string, notice: Partial<Notice>) => Promise<void>
  deleteNotice: (id: string) => Promise<void>
}

const NoticesContext = createContext<NoticesContextType | undefined>(undefined)

export function NoticesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(noticesReducer, initialState)

  const createNotice = async (notice: Omit<Notice, "id">): Promise<string> => {
    dispatch({ type: "SET_LOADING", payload: true })
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      const newNotice: Notice = {
        ...notice,
        id: Date.now().toString(), // Simple ID generation
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      dispatch({ type: "ADD_NOTICE", payload: newNotice })
      return newNotice.id
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to create notice" })
      throw error
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const getAllNotices = async (): Promise<Notice[]> => {
    dispatch({ type: "SET_LOADING", payload: true })
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300))

      // Sort by creation date (newest first)
      const sortedNotices = [...state.notices].sort(
        (a, b) => new Date(b.createdAt || b.date).getTime() - new Date(a.createdAt || a.date).getTime(),
      )

      return sortedNotices
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to fetch notices" })
      throw error
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const updateNotice = async (id: string, notice: Partial<Notice>): Promise<void> => {
    dispatch({ type: "SET_LOADING", payload: true })
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      dispatch({
        type: "UPDATE_NOTICE",
        payload: {
          id,
          notice: {
            ...notice,
            updatedAt: new Date().toISOString(),
          },
        },
      })
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to update notice" })
      throw error
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const deleteNotice = async (id: string): Promise<void> => {
    dispatch({ type: "SET_LOADING", payload: true })
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300))

      dispatch({ type: "DELETE_NOTICE", payload: id })
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to delete notice" })
      throw error
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const value: NoticesContextType = {
    state,
    createNotice,
    getAllNotices,
    updateNotice,
    deleteNotice,
  }

  return <NoticesContext.Provider value={value}>{children}</NoticesContext.Provider>
}

export function useNotices() {
  const context = useContext(NoticesContext)
  if (context === undefined) {
    throw new Error("useNotices must be used within a NoticesProvider")
  }
  return context
}
