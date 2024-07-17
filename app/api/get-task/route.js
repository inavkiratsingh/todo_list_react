import dbConnect from "@/lib/dbConnect";
import TaskModel from "@/model/tasks";
import { NextResponse } from "next/server";

export async function GET(request) {
    
    
    try {
        await dbConnect()
        
        const task = await TaskModel.find()

        return NextResponse.json(
            {
            success: true,
            task: task
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