import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shadcn/ui/card"
import { Input } from "@/shadcn/ui/input"
import { Label } from "@/shadcn/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select"
import { Button } from '@/shadcn/ui/button';
import { Textarea } from '@/shadcn/ui/textarea';
import { Checkbox } from '@/shadcn/ui/checkbox';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/shadcn/ui/dialog"



import React from 'react';
import { Menu } from '../Menu';


export default function Dashboard({ auth }: PageProps) {
  const [position, setPosition] = React.useState("bottom")
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">NEW TEST</h2>}>
      <Head title="Dashboard" />
      <div className="mt-10 mb-10 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <Menu></Menu>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Add Test</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name" className="text-xl font-bold">Test name</Label>
                  <Input id="name" placeholder="Name of your test" />
                </div>
                <div className="flex flex-col space-y-1.5 mb-5">
                  <Label htmlFor="name" className="text-xl font-bold">Enter test's description</Label>
                  <Textarea placeholder="Description of your test" />
                </div>
              </div>
              <Link href={route('testdetail')}>
                <Button className='mt-5'>
                  Add test
                </Button>
              </Link>
            </form>
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  );
}
