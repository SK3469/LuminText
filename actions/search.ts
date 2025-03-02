"use server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const searchAction = async (formData:FormData) => {
const searchText = formData.get("search")
    if (typeof searchText!=="string" ||!searchText) {
        redirect(`/articles?search=${searchText}`)
    }
    revalidatePath(`/articles?search=${searchText}`)
    redirect(`/articles?search=${searchText}`)
}