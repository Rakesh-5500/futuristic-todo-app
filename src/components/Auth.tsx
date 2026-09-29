import React from 'react'
import { auth, provider } from '../firebase'
import { signInWithPopup, signOut } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function Auth(){
  const [user] = useAuthState(auth)

  const login = async () => {
    await signInWithPopup(auth, provider)
  }
  const logout = async () => {
    await signOut(auth)
  }

  if(!user) return (
    <button onClick={login} className="px-3 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-purple-600">Sign in</button>
  )

  return (
    <div className="flex items-center gap-3">
      <img src={user.photoURL || ''} alt="avatar" className="w-8 h-8 rounded-full" />
      <div className="text-sm">
        <div className="font-medium">{user.displayName}</div>
        <div className="text-xs text-slate-400">{user.email}</div>
      </div>
      <button onClick={logout} className="px-2 py-1 rounded-md bg-white/5">Sign out</button>
    </div>
  )
}
