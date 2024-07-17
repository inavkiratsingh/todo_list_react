import dbConnect from "@/lib/dbConnect";
import TaskModel from "@/model/tasks";
import mongoose, { Mongoose } from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, {params}) {
    
    await dbConnect()
    const {taskId} = params
    console.log(taskId);
    
    try {
        const ntaskId = new mongoose.Types.ObjectId(taskId)
        console.log(ntaskId);
        // const deletedTask = await TaskModel.findOneAndDelete({ _id:ntaskId });

        // const updateResult = await TaskModel.findOneAndDelete({ _id:ntaskId })
        const updateResult = await TaskModel.findOneAndDelete({ _id:ntaskId })

        
        // if(updateResult.modifiedCount == 0){
        //     return NextResponse.json(
        //         {
        //         success: false,
        //         message: "Message not found or already deleted"
        //         }, {status:500}
        //     )
        // }

        return NextResponse.json(
            {
                success: true,
                task: "deleted"
            }, {status:200}
        )

    } catch (error) {
        return NextResponse.json(
            {
            success: false,
            message: "Error deleting task"
            }, {status:500}
        )
    }

}
