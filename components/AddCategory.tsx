"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Upload } from "lucide-react"
import { createClient } from '@/utils/supabase/client';
import { useDispatch} from "react-redux";
import { AppDispatch } from "../app/Redux/store";
import Image from "next/image"
export default function AddCategory() {
      const dispatch = useDispatch<AppDispatch>();
      const [uploadedImage, setUploadedImage] = useState<string | null>(null)
      const [newCategory, setNewCategory] = useState({ name: "", mass:-1})
      const [fileLoading,setFileLoading]=useState(false)
      const [file, setFile] = useState<File | null>(null);
      
  const handleImageUpload =async(e: React.ChangeEvent<HTMLInputElement>) => {
     const file = e.target.files?.[0]
     if (file) {
       const reader = new FileReader()
       reader.onload =async(event) => {
         setUploadedImage(event.target?.result as string)
         setFile(file)
       }
       reader.readAsDataURL(file)
     }
   }  
     const uploadImage = async (file:File) => {
    setFileLoading(true)
    const supabase = await createClient();
    const filePath = `youcan-${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from('youcan') // Your bucket name
      .upload(filePath, file);
  
    if (error) {
      console.error('Upload error:', error.message);
      return null;
    }
  
    const { data: publicUrlData } = supabase.storage
      .from('youcan')
      .getPublicUrl(filePath);
  
    return publicUrlData.publicUrl;
  }; 
   const handleCreate = async () => {
    if (!file) return;
     const publicUrl=await uploadImage(file)
    if (publicUrl) {
      const categoryToSave = {
        ...newCategory,
        image:publicUrl,
      };
      dispatch({ type:"category/create", payload:categoryToSave});  
      setFileLoading(false) 
    } else {
      console.error('Image upload failed:');
    }
  };
  return (
      <Card>
         <CardHeader>
                  <CardTitle>Add New Waste Category</CardTitle>
                  <CardDescription>Create a custom waste category with specific weight information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="category-name">Category Name</Label>
                        <Input
                          id="category-name"
                          placeholder="e.g., Plastic Yogurt Container"
                          value={newCategory.name}
                          onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                        />
                      </div>
    
                      <div className="space-y-2">
                        <Label htmlFor="category-weight">Weight per Item (g)</Label>
                        <Input
                          id="category-weight"
                          type="number"
                          step={0.00001} // ✅ allows 3 decimal places
                           min={0}
                          placeholder="e.g., 0.025"
                          value={newCategory.mass !== -1 ? newCategory.mass : ""}
                              onChange={(e) => {
                            const value = Number.parseFloat(e.target.value);
                        setNewCategory({
                               ...newCategory,
                                 mass: isNaN(value) ? 0 : Math.round(value * 100000) / 100000, // ✅ round to 3 decimals
                              });
                                    }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category-image">Category Image</Label>
                        <div className="border-2 border-dashed rounded-lg p-4 text-center">
                          <Label htmlFor="category-image-upload" className="cursor-pointer">
                            <div className="flex flex-col items-center justify-center">
                              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                              <span className="text-sm text-muted-foreground">Click to upload an image</span>
                              {uploadedImage && (
                                        <div>
                                          <Image
                                            src={uploadedImage || "/placeholder.svg"}
                                            alt="Uploaded waste"

                                            width={200}
                                            height={200}
                                            className="object-contain"
                                          />
                                        </div>
                                      )}
                            </div>
                            <Input onChange={handleImageUpload}    id="category-image-upload" type="file" accept="image/*" className="hidden" />
                          </Label>
                        </div>
                      </div>
                      <Button
                        className="w-full mt-4 flex items-center bg-green-600 hover:bg-green-700"
                        onClick={handleCreate}
                        disabled={!newCategory.name || newCategory.mass <= 0}
                      >
                     {fileLoading?(<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600  "></div>
                           ):(<Plus className="mr-2 h-4 w-4" />)}    Add New Category
                      </Button>
                    </div>
    
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-medium mb-4">Why Add Custom Categories?</h3>
                      <p className="text-muted-foreground mb-4">Adding custom waste categories helps you:</p>
                      <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                        <li>Track specific types of plastic waste unique to your household or business</li>
                        <li>Get more accurate weight measurements for unusual items</li>
                        <li>Contribute to our growing database of plastic waste types</li>
                        <li>Better organize your recycling efforts</li>
                      </ul>
    
                      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100">
                        <p className="text-sm text-green-800">
                          Your custom categories will be saved to your account and available for future measurements.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
  )
}
