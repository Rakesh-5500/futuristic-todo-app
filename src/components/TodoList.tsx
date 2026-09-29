import React, { useEffect, useState } from 'react'
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db, auth, storage } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import dayjs from 'dayjs'

type Todo = {
  id: string
  text: string
  done?: boolean
  createdAt?: any
}

export default function TodoList(){
  const [user] = useAuthState(auth)
  const [todos, setTodos] = useState<Todo[]>([])
  const [text, setText] = useState('')

  useEffect(()=>{
    if(!user) return
    const q = query(collection(db, 'users', user.uid, 'todos'), orderBy('createdAt', 'desc'))
    const unsub = onSnapshot(q, (snap)=>{
      const items: Todo[] = snap.docs.map(d=>({ id: d.id, ...(d.data() as any) }))
      setTodos(items)
    })
    return ()=>unsub()
  },[user])

  const add = async ()=>{
    if(!user || !text.trim()) return
    await addDoc(collection(db, 'users', user.uid, 'todos'), {
      text: text.trim(),
      done: false,
      createdAt: serverTimestamp()
    })
    setText('')
  }

  const toggle = async (t: Todo)=>{
    await updateDoc(doc(db, 'users', user!.uid, 'todos', t.id), { done: !t.done })
  }

  const remove = async (t: Todo)=>{
    await deleteDoc(doc(db, 'users', user!.uid, 'todos', t.id))
  }

  const exportJSON = ()=>{
    const data = JSON.stringify(todos, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `astra-tasks-${dayjs().format('YYYYMMDD_HHmm')}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportCSV = ()=>{
    const header = 'id,text,done,createdAt\n'
    const rows = todos.map(t=>`${t.id},"${(t.text||'').replace(/\"/g,'"')} ,",${t.done},${t.createdAt ? t.createdAt.seconds : ''}`).join('\n')
    const blob = new Blob([header+rows], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `astra-tasks-${dayjs().format('YYYYMMDD_HHmm')}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Placeholder: Upload to Google Drive using gapi client. Requires configuration in README.
  const uploadToDrive = async ()=>{
    const data = new Blob([JSON.stringify(todos, null, 2)], { type: 'application/json' })
    // The real implementation should call Google Drive REST API with OAuth token and multipart upload
    alert('Drive upload helper called — see README to configure Google API and put client ID in .env')
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="Add new task..." className="flex-1 px-4 py-2 rounded-md bg-white/3 focus:outline-none" />
        <button onClick={add} className="px-4 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-purple-600">Add</button>
      </div>

      <div className="flex gap-3">
        <button onClick={exportJSON} className="px-3 py-2 rounded-md bg-white/5">Export JSON</button>
        <button onClick={exportCSV} className="px-3 py-2 rounded-md bg-white/5">Export CSV</button>
        <button onClick={uploadToDrive} className="px-3 py-2 rounded-md bg-white/5">Save to Google Drive</button>
      </div>

      <ul className="space-y-3">
        {todos.map(t=> (
          <li key={t.id} className="p-3 rounded-lg bg-white/3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={!!t.done} onChange={()=>toggle(t)} />
              <div className={`text-sm ${t.done ? 'line-through text-slate-400' : ''}`}>{t.text}</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-xs text-slate-400">{t.createdAt ? dayjs.unix(t.createdAt.seconds).format('HH:mm DD MMM') : '-'}</div>
              <button onClick={()=>remove(t)} className="text-xs text-red-400">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
