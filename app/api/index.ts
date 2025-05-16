"use server"
import { createClient } from '@/utils/supabase/server';


const getCategory=async()=>{
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("category").select("*")
    if (error) {
      console.error("Failed to get category:", error.message);
      return error;
    }
    return data;
}



 const createCategory= async (name:string,mass:number,image:string) => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("category").insert({name:name,mass:mass,image:image}).select();
  if (error) {
    console.error("Failed to insert category:", error.message);
    return error;
  }
  return data;
};




export {createCategory,getCategory}