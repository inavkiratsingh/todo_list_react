"use client"
import { Main } from 'next/document'
import React, { useState } from 'react'

const page = () => {
  const [title, settitle] = useState("")
  const [desc, setdesc] = useState("")
  const [MainTask, setMainTask] = useState([])
  const submithandler = (e) => {
    e.preventDefault();
    settitle("")
    setdesc("")
    setMainTask([...MainTask, { title, desc }])
    console.log(MainTask)
  }

  const deletehandler = (i) => {
    let copytask = [...MainTask]
    copytask.splice(i,1)
    setMainTask(copytask)
  }

  let rendertask = <h2>No Task available</h2>
  if(MainTask.length>0){
    rendertask = MainTask.map((t,i) => {
      return <li key={i} className='flex item-center justify-between mb-4'>
        <div className='flex justify-between mb-5 w-2/3  '>
          <h5 className='text-2xl font-semibold'>{t.title}</h5>
          <h6 className='text-lg font-medium'>{t.desc}</h6>
        </div>
        <button onClick={() => {
          deletehandler(i)
        }}
        className='bg-red-400 text-white px-4 py-2 rounded font-bold'>
          Delete
        </button>
      </li>
    })
  } 
  return (
    <>
      <h1 className='bg-black text-white p-5 text-5xl font-bold text-center'>Navkirat's Todo List</h1>
      <form onSubmit={submithandler}>
        {/* two way binding */}
        <input 
          type="text" 
          className='text-2xl border-zinc-800 border-4 m-5 px-4 py-1' placeholder='Enter Task here' 
          value={title}
          onChange={(e) => {
            settitle(e.target.value)
          }}
        />
        <input 
          type="text" 
          className='text-2xl border-zinc-800 border-4 m-5 px-4 py-1' placeholder='Enter Discription here' 
          value={desc}
          onChange={(e) => {
            setdesc(e.target.value)
          }}
        />
        <button className='bg-black text-white px-4 py-2 text-2xl font-bold rounded m-5'>
          Add Task
        </button>
      </form>
      <hr />
      <div className='bg-slate-200 p-8'>
          <ul>{rendertask}</ul>
      </div>
    </>
  )
}

export default page