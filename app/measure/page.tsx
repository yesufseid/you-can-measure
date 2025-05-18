"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Camera, Plus, Trash, Upload } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../Redux/store";
import { detectObjects, loadModel } from "../../utils/tensorflow";
import AddCategory from "@/components/AddCategory"


interface CategoryProps {
  name: string;
  mass: number;
  image?: string;
  id: string;
}
// Sample waste types data
const wasteTypes = [
  { id: 1, name: "Africa 2L", weight: 0.05, image: "/placeholder.svg?height=100&width=100" },
  { id: 2, name: "Yes 1L", weight: 0.03, image: "/placeholder.svg?height=100&width=100" },
  { id: 3, name: "Coca-Cola 500ml", weight: 0.02, image: "/placeholder.svg?height=100&width=100" },
  { id: 4, name: "Water Bottle 330ml", weight: 0.015, image: "/placeholder.svg?height=100&width=100" },
  { id: 5, name: "Plastic Container", weight: 0.04, image: "/placeholder.svg?height=100&width=100" },
]

export default function MeasurePage() {
 const dispatch = useDispatch<AppDispatch>();
 const {loading,category} = useSelector((state: RootState) => state.category);
  const [selectedItems, setSelectedItems] = useState<
    Array<{ id:string; name: string; mass: number; quantity: number }>
  >([])
  const [totalWeight, setTotalWeight] = useState(0)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [aiResult, setAiResult] = useState<{weight: number } | null>(null)
  const [newCategory, setNewCategory] = useState({ name: "", weight: 0 })
  useEffect(()=>{
     dispatch({type:"category/fetchCategory"}); 
  },[])

  const handleAddItem = (item: { id:string; name: string; mass: number,}) => {
    const existingItem = selectedItems.find((i) => i.id === item.id)

    if (existingItem) {
      const updatedItems = selectedItems.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
      setSelectedItems(updatedItems)
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }])
    }

    calculateTotalWeight([...selectedItems, { ...item, quantity: 1 }])
  }

  const handleQuantityChange = (id:string, quantity: number) => {
    const updatedItems = selectedItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    setSelectedItems(updatedItems)
    calculateTotalWeight(updatedItems)
  }

  const handleRemoveItem = (id:string) => {
    const updatedItems = selectedItems.filter((item) => item.id !== id)
    setSelectedItems(updatedItems)
    calculateTotalWeight(updatedItems)
  }

  const calculateTotalWeight = (items: Array<{ mass: number; quantity: number }>) => {
    const total = items.reduce((sum, item) => sum + item.mass * item.quantity, 0)
    setTotalWeight(Number.parseFloat(total.toFixed(2)))
  }

  const handleImageUpload =async(e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const reader = new FileReader()
      reader.onload =async(event) => {
        setUploadedImage(event.target?.result as string)
            await loadModel();
                const img = new window.Image();
                 img.src = imageUrl;
                img.onload = async () => {
                   const detected = await detectObjects(img)
                   setAiResult({weight:detected})
                  }
        setTimeout(() => {
          setAiResult({
            weight: Number.parseFloat((Math.random() * 0.5).toFixed(2)),
          })
        }, 1500)
      }
      reader.readAsDataURL(file)
    }
  }

 

  return (
    <div className="container py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Measure Your Plastic Waste</h1>

      <Tabs defaultValue="manual" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="manual">Manual Count</TabsTrigger>
          <TabsTrigger value="ai">Use AI</TabsTrigger>
          <TabsTrigger value="add">Add Category</TabsTrigger>
        </TabsList>

        {/* Manual Count Tab */}
        <TabsContent value="manual" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Select Waste Types</CardTitle>
                <CardDescription>Choose the types of plastic waste you want to measure</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {category.map((item:CategoryProps) => (
                      <Card key={item.id} className="overflow-hidden">
                        <div className="flex items-center p-4">
                          <div className="h-16 w-16 relative rounded overflow-hidden mr-4">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.mass} g per item</p>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => handleAddItem(item)} className="ml-auto">
                            <Plus className="h-4 w-4 mr-1" /> Add
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Selection</CardTitle>
                <CardDescription>Items you've selected to measure</CardDescription>
              </CardHeader>
              <CardContent>
                {selectedItems.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No items selected yet. Add items from the list.
                  </div>
                ) : (
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-4">
                      {selectedItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between border-b pb-3">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">{item.mass} g each</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.id, Number.parseInt(e.target.value) || 0)}
                              className="w-20"
                            />
                            <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)}>
                              <Trash className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
              <Separator />
              <CardFooter className="flex flex-col items-start pt-4">
                <div className="flex justify-between w-full mb-2">
                  <span className="font-medium">Total Items:</span>
                  <span>{selectedItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <div className="flex justify-between w-full">
                  <span className="font-bold text-lg">Total Weight:</span>
                  <Badge className="text-lg bg-green-600">{totalWeight} g</Badge>
                </div>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* AI Measurement Tab */}
        <TabsContent value="ai">
          <Card>
            <CardHeader>
              <CardTitle>AI Measurement</CardTitle>
              <CardDescription>Upload a photo of your plastic waste for automatic measurement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 h-[400px]">
                  {uploadedImage ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={uploadedImage || "/placeholder.svg"}
                        alt="Uploaded waste"
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center">
                      <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="font-medium text-lg mb-2">Upload an image</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Take a photo of your plastic waste collection
                      </p>
                      <Label htmlFor="image-upload" className="cursor-pointer">
                        <div className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md flex items-center">
                          <Camera className="mr-2 h-4 w-4" /> Choose Image
                        </div>
                        <Input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </Label>
                    </div>
                  )}
                </div>

                <div className="flex flex-col">
                  <h3 className="text-xl font-bold mb-4">AI Analysis Results</h3>

                  {!uploadedImage && (
                    <div className="flex-1 flex items-center justify-center">
                      <p className="text-muted-foreground text-center">Upload an image to see AI measurement results</p>
                    </div>
                  )}

                  {uploadedImage && !aiResult && (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                        <p>Analyzing your image...</p>
                      </div>
                    </div>
                  )}

                  {aiResult && (
                    <div className="space-y-6">
                      <Alert className="bg-green-50 border-green-200">
                        <AlertTitle className="text-green-800">Analysis Complete</AlertTitle>
                        <AlertDescription className="text-green-700">
                          Our AI has successfully analyzed your plastic waste image.
                        </AlertDescription>
                      </Alert>

                      <div className="space-y-4 mt-4">
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                          <span className="font-medium">Detected Items:</span>
                          {/* <span className="font-bold">{aiResult.count} items</span> */}
                        </div>

                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                          <span className="font-medium">Estimated Weight:</span>
                          <Badge className="text-lg bg-green-600">{aiResult.weight}g</Badge>
                        </div>
                      </div>

                      <Button
                        className="w-full mt-4"
                        onClick={() => {
                          setUploadedImage(null)
                          setAiResult(null)
                        }}
                      >
                        Analyze Another Image
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Add New Category Tab */}
        <TabsContent value="add">
         <AddCategory />
        </TabsContent>
      </Tabs>
    </div>
  )
}
