import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Dashboard = () => {
    const {user} = useContext(AuthContext)
  return (
    <div>
        <h1 className='text-3xl font-semibold text-slate-900 text-center pb-4'>User Dashboard</h1>
        <h2 className='text-xl font-medium text-slate-700 pl-4'>Welcome {user?.name}</h2>
    </div>
  )
}

export default Dashboard