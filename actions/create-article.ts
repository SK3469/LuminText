"use server";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});

const createArticleSchema = z.object({
    title: z.string().min(3).max(100),
    category: z.string().min(3).max(50),
    content: z.string().min(10)
});

type CreateArticlesFormState = {
    errors: {
        title?: string[];
        category?: string[];
        featuredImage?: string[];
        content?: string[];
        formErrors?: string[];
    };
};

export const createArticle = async (
    prevState: CreateArticlesFormState,
    formData: FormData
): Promise<CreateArticlesFormState> => {
    const result = createArticleSchema.safeParse({
        title: formData.get("title"),
        category: formData.get("category"),
        content: formData.get("content")
    });

    if (!result.success) {
        return { errors: result.error.flatten().fieldErrors };
    }

    const authUser = await auth();
    const userId = authUser?.userId;
    if (!userId) {
        return { errors: { formErrors: ["You have to login first "] } };
    }

    const existingUser = await prisma.user.findUnique({
        where: { clerkUserId: userId }
    });
    if (!existingUser) {
        return { errors: { formErrors: ["User not found!"] } };
    }

    // Validating images
    const imageFile = formData.get("featuredImage") as File | null;
    if (!imageFile) {
        return { errors: { featuredImage: ["Image file is required."] } };
    }

    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let imageUrl: string | undefined;
    try {
        const uploadResponse: UploadApiResponse = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: "auto" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result as UploadApiResponse);
                }
            );
            uploadStream.end(buffer);
        });
        imageUrl = uploadResponse.secure_url;
    } catch (error) {
        return { errors: { featuredImage: ["Failed to upload image, please try again"] } };
    }

    try {
        await prisma.articles.create({
            data: {
                title: result.data.title,
                category: result.data.category,
                content: result.data.content,
                featureImage: imageUrl,
                authorId: existingUser.id
            }
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { errors: { formErrors: [error.message] } };
        } else {
            return { errors: { formErrors: ["Internal server error"] } };
        }
    }
revalidatePath("/dashboard")
    redirect("/dashboard");
  
};
