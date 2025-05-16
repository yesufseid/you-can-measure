import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Mail, Phone } from "lucide-react"
import logo from "../public/Image/youcan-white.svg"

export default function AboutPage() {
  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About You-can Measure</h1>

        <div className="prose dark:prose-invert max-w-none">
          <h2>Introduction</h2>
          <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
            <Image
              src={logo}
              alt="Seid Yesuf"
              width={200}
              height={200}
              className="rounded-full object-cover"
            />
            <div>
              <p>
               Youcan Company is an Ethiopian startup that focuses on sustainable waste management 
               and recycling. The company is known for its innovative approach to turning solid 
               waste into valuable resources, promoting environmental protection and circular economy principles.
                Youcan actively works with communities, schools, and local businesses to raise awareness about waste
                 segregation and proper disposal practices..
              </p>
            </div>
          </div>

          <p>
            In addition to recycling, Youcan develops solutions that make waste
             handling more efficient, including educational programs and technology-based tools. 
             Their goal is to reduce pollution, create green jobs, and contribute to a cleaner, 
             healthier environment in Ethiopia. Youcan’s initiatives reflect a strong 
            commitment to social impact, environmental responsibility, and sustainable development.
          </p>


          <h2 className="my-2  ">How the You-can Measure Website Works</h2>

          <p>
            The You-can Measure platform is designed to help waste generators measure and report segregated solid waste
            easily. The website offers a user-friendly interface where individuals or organizations can calculate the
            estimated weight of their waste based on the type and volume.
          </p>

          <h3>How Users Can Use the Website</h3>

          <Card className="my-6">
            <CardHeader>
              <CardTitle>Simple 4-Step Process</CardTitle>
              <CardDescription>Our platform makes waste measurement easy</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4 list-decimal pl-5">
                <li>
                  <strong>Select Waste Type:</strong> Users select the category of waste (e.g., africa2l, yes1l).
                </li>
                <li>
                  <strong>Add Quantity:</strong> The user will add the quantity for each category that selected and the
                  total and category weight will be calculated.
                </li>
                <li>
                  <strong>Use AI:</strong> By uploading photo we can calculate the weight using AI.
                </li>
                <li>
                  <strong>Add New Waste Category (Optional):</strong> Users can create a new waste category by
                  specifying name, weight, and photo.
                </li>
              </ol>
            </CardContent>
          </Card>

          <h3>Use Case Example</h3>

          <p>
            A household or small office generates plastic bottles on a daily basis. Instead of guessing the amount of
            waste they produce, users can visit the You-can Measure website and select the waste type—for example,
            'Plastic Bottles'. By entering the quantity (e.g., 100 bottles), the system instantly provides an estimated
            total weight, such as 12kg. This simple process helps households understand how much waste they are
            generating, making it easier to prepare for recycling, schedule pickups, or contribute to better waste
            tracking and reporting.
          </p>

          <h2>Contact and Collaboration</h2>


          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Card className="flex-1">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="mr-2 h-5 w-5 text-green-600" /> Phone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>0960417946</p>
              </CardContent>
            </Card>

            <Card className="flex-1">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="mr-2 h-5 w-5 text-green-600" /> Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>seidyesuf750@gmail.com</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Link href="/measure">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Start Measuring Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
