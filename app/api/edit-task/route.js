import dbConnect from "@/lib/dbConnect";
import TaskModel from "@/model/tasks";
import { NextResponse } from "next/server";

export async function POST(request) {
    
    
    try {
        await dbConnect()
        
        
        
        const { taskId, taskTitle, taskDescription } = await request.json();
        console.log(taskId);
        const task = await TaskModel.findOne({ _id: taskId });
        
        if(!task){
            console.log("empty",task);
            return NextResponse.json(
            {
                success: false,
                message: "Task not found"
                }, {status:400}
            )
        }
        const updatedTask = await TaskModel.findOneAndUpdate({ _id: taskId, title: taskTitle, description: taskDescription });
        


        await updatedTask.save();

        console.log(updatedTask);

        return NextResponse.json(
            {
            success: true,
            message: "task updated"
            }, {status:200}
        )

    } catch (error) {
        return NextResponse.json(
            {
            success: false,
            message: "Error updating task"
            }, {status:500}
        )
    }

}