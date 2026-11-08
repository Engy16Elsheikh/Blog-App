import { NextResponse } from "next/server";
import { put, del } from "@vercel/blob";
import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";

// GET: one blog by ?id=... or all blogs
export async function GET(request) {
  try {
    await ConnectDB();
    const blogId = request.nextUrl.searchParams.get("id");

    if (blogId) {
      const blog = await BlogModel.findById(blogId);
      return NextResponse.json(blog);
    }

    const blogs = await BlogModel.find({});
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("GET /api/blog failed:", error);
    return NextResponse.json({ msg: "Server error" }, { status: 500 });
  }
}

// POST: add a blog and upload its image to Vercel Blob
export async function POST(request) {
  try {
    await ConnectDB();
    const formData = await request.formData();
    const image = formData.get("image");

    if (!image || typeof image === "string") {
      return NextResponse.json({ msg: "Image is required" }, { status: 400 });
    }

    const blob = await put(`${Date.now()}_${image.name}`, image, {
      access: "public",
    });

    await BlogModel.create({
      title: `${formData.get("title")}`,
      description: `${formData.get("description")}`,
      category: `${formData.get("category")}`,
      author: `${formData.get("author")}`,
      image: blob.url, // full https URL from Vercel Blob
      authorImg: `${formData.get("authorImg")}`,
    });

    return NextResponse.json({ success: true, msg: "blog added" });
  } catch (error) {
    console.error("POST /api/blog failed:", error);
    return NextResponse.json({ success: false, msg: "Server error" }, { status: 500 });
  }
}

// DELETE: remove the blog and its image
export async function DELETE(request) {
  try {
    await ConnectDB();
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ msg: "ID not provided" }, { status: 400 });
    }

    const blog = await BlogModel.findById(id);
    if (!blog) {
      return NextResponse.json({ msg: "Blog not found" }, { status: 404 });
    }

    // Only Blob URLs can be deleted from Blob; old local paths are skipped
    if (blog.image?.startsWith("http")) {
      await del(blog.image).catch(() => {});
    }

    await BlogModel.findByIdAndDelete(id);

    return NextResponse.json({ msg: "Blog deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/blog failed:", error);
    return NextResponse.json({ msg: "Server error" }, { status: 500 });
  }
}