import React, { useEffect, useState } from 'react'
import Auth from './components/Auth'
import TodoList from './components/TodoList'

const APP_NAME = 'AstraTask'

export default function App(){
  const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || 'dark')

  useEffect(()=>{
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  },[theme])

  return (
    <div className="min-h-screen flex items-center justify-center p-6 text-slate-100">
      <div className="w-full max-w-4xl">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">{APP_NAME}</h1>
            <p className="text-sm text-slate-400">Futuristic cross-device Todo studio</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={()=>setTheme(theme==='dark'? 'light' : 'dark')}
              className="px-3 py-2 rounded-md bg-white/5 hover:bg-white/7 transition"
            >
              {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
            </button>
            <Auth />
          </div>
        </header>

        <main className="app-card p-6 rounded-2xl">
          <TodoList />
        </main>
      </div>
    </div>
  )
}
