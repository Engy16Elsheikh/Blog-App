import { ConnectDB } from "@/lib/config/db"
import BlogModel from "@/lib/models/BlogModel";
const { NextResponse } = require("next/server")
import { writeFile } from "fs/promises";
const fs =require("fs/promises")
import { title } from "process";
const LoadDB=async()=>{
   await ConnectDB()
}
LoadDB()
export async function GET(request) {
  const blogId = request.nextUrl.searchParams.get("id")
  if (blogId) {
    const blog = await BlogModel.findById(blogId)
    return NextResponse.json(blog);
  }
  else {
    const blogs = await BlogModel.find({})
    return NextResponse.json(blogs)
  }
}
export async function POST(request) {
   const formData=await request.formData()
   const timestamp=Date.now()
   const image =formData.get('image')
   const imageByteData=await image.arrayBuffer()
   const buffer=Buffer.from(imageByteData)
   const path = `./public/${timestamp}_${image.name}`
   await writeFile(path,buffer)
   const imageUrl=`/${timestamp}_${image.name}`
   const blogData={
    title:`${formData.get('title')}`,
    description:`${formData.get('description')}`,
    category:`${formData.get('category')}`,
    author:`${formData.get('author')}`,
    image:`${imageUrl}`,
    authorImg:`${formData.get('authorImg')}`
   }
   await BlogModel.create(blogData)
   return NextResponse.json({success:true,msg:"blog added"})
}
export async function DELETE(request) {
 const id = request.nextUrl.searchParams.get("id");
 if (!id) {
   return NextResponse.json({ msg: "ID not provided" }, { status: 400 });
 }
 
 const blog = await BlogModel.findById(id);
 if (!blog) {
   return NextResponse.json({ msg: "Blog not found" }, { status: 404 });
 }
 
 // Delete image associated with the blog
 await fs.unlink(`./public${blog.image}`).catch(() => {});
 
 // Delete blog from database
 await BlogModel.findByIdAndDelete(id);
 
 return NextResponse.json({ msg: "Blog deleted successfully" }, { status: 200 });
}
