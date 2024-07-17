import dbConnect from "@/lib/dbConnect";
import TaskModel from "@/model/tasks";
import { NextResponse } from "next/server";

export async function POST(request) {
    
    
    try {
        await dbConnect()
        
        const { taskTitle, taskDescription } = await request.json();
        
        const task = await TaskModel.findOne({ title: taskTitle });
        
        if(task){
            console.log(task);
            return NextResponse.json(
            {
                success: false,
                message: "Task already added"
                }, {status:300}
            )
        }
                    
        const newTask = new TaskModel({
            title: taskTitle,
            description: taskDescription
        });
        console.log("before post");

        await newTask.save();

        console.log(newTask);

        return NextResponse.json(
            {
            success: true,
            message: "task added"
            }, {status:200}
        )

    } catch (error) {
        return NextResponse.json(
            {
            success: false,
            message: "Error adding task"
            }, {status:500}
        )
    }

}