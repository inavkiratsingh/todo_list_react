"use client"
import { Checkbox } from '@/components/ui/checkbox'
import {  Edit2, Plus, Trash2, User, UserCheck, Users, Users2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'



const page = () => {
  const [title, settitle] = useState("")
  const [desc, setdesc] = useState("")
  const [dialogueOpen, setdialogueOpen] = useState(Boolean)
  const [tasks, settasks] = useState([]) 
  
  const get_tasks = async() => {
    const response = await axios.get('/api/get-task')
    settasks(response.data.task);
  }

  const convert = (str) => {
    let myDate = new Date(str).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false});
    return myDate
  }

  useEffect(() => {
    get_tasks()
  },[])
  
  const edit = async(id) => {
    const updatetask = {
      taskId: id,
      taskTitle: title,
      taskDescription: desc,
    }
    const updatedTask = await axios.post('/api/edit-task', updatetask);
    console.log(updatedTask);
    get_tasks();
  }

  const submithandler = async (e) => {
    setdialogueOpen(false)
    const newTask = {
      taskTitle: title,
      taskDescription: desc
    }
    try {
      const addTask = await axios.post('/api/add-task', newTask);
      console.log(addTask);
    } catch (error) {
      console.log("not added");
    }
    settitle("")
    setdesc("")
    get_tasks()
  }

  const deletehandler = async(e) => {
    const response = await axios.get(`/api/delete-task/${e}`)
    console.log(response);
    get_tasks()
  }

  let rendertask = <h2>No Task available</h2>
  if(tasks.length>0){
    rendertask = tasks.map((t,i) => {
      return <li className='border-[1px] border-zinc-300 rounded-2xl h-full p-5 mb-5'>
      <div className=''>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-lg"
          >
            {t.title}
            <span className='text-zinc-500 font-normal text-sm ml-2'>
             ({convert(t.createdAt)})
            </span>
          </label>
        </div>
      </div>
      <div className='flex justify-between items-center'>
        <p className='ml-6 mt-2 text-lg font-medium text-zinc-600 w-3/4'>{t.description}</p>
        <div className='text-zinc-600 flex gap-5'>
          

          <Dialog>
            <DialogTrigger asChild>
              <Edit2 
              className='cursor-pointer'
              size={20}
              />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
              <DialogHeader>
                <DialogTitle>Edit task</DialogTitle>
                <DialogDescription>
                  Make your day perfect by adding more task and complete them.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="name"
                    onChange={(e) => settitle(e.target.value)}
                    value={title}
                    className="col-span-3"
                    placeholder="write new title here"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="username"
                    onChange={(e) => setdesc(e.target.value)}
                    value={desc}
                    className="col-span-3"
                    placeholder="write new description"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                onClick={() => edit(t._id)}
                type="submit"
                >
                  Edit Task
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>


          <Trash2 
          className='cursor-pointer'
          size={20}
          onClick={() => deletehandler(t._id)}
          />
        </div>
      </div>
    </li>
    })
  } 
  return (
    <div className='w-full px-5 md:w-[400px]'>
      <div className='flex justify-between py-5'>
        <div className='w-14 h-14 bg-black rounded-full text-zinc-200 flex items-center justify-center'>
          <UserCheck />
        </div>
        <div className='w-14 h-14 bg-black rounded-full flex items-center justify-center text-white'>


          <Dialog open={dialogueOpen}>
            <DialogTrigger asChild>
              <Plus 
              className='cursor-pointer'
              size={30}
              onClick={() => setdialogueOpen(true)}
              />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
                <DialogDescription>
                  Make your day perfect by adding more task and complete them.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="name"
                    onChange={(e) => settitle(e.target.value)}
                    value={title}
                    className="col-span-3"
                    placeholder="write title here"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="username"
                    onChange={(e) => setdesc(e.target.value)}
                    value={desc}
                    className="col-span-3"
                    placeholder="write description"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                onClick={submithandler}
                type="submit"
                >
                  Add Task
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </div>
      </div>
      <hr />
      <div className='mt-10'>
          <ul>
            {/* {rendertask} */}
            {rendertask}
          </ul>
      </div>
    </div>
  )
}

export default page