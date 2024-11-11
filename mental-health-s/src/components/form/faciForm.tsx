"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Zod schema for form validation
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
});


interface Application {
  id: number; // Assuming you have an id for each application
  name: string;
  email: string;
  description: string;
  createdAt: string;
  status: string;
}

export function FacilitatorApplicationForm() {
  // Initialize form with react-hook-form and Zod resolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      description: "",
    },
  });

  const [supportingDocument, setSupportingDocument] = useState<File | null>(null); // State to hold the uploaded file
  const [message, setMessage] = useState<string>(''); // State for messages
  const [loading, setLoading] = useState<boolean>(false); // State for loading status
  
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`http://localhost:8080/api/applications/user/${JSON.parse(localStorage.getItem('user_z')!).userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setApplications(data); // Assuming data is an array of applications
        } else {
          const errorText = await response.text();
          setMessage(`Error fetching applications: ${errorText}`);
        }
      } catch (error) {
        setMessage(`Error: ${(error as Error).message}`);
      }
    };

    fetchApplications();
  }, []);
  // Submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const token = localStorage.getItem('token'); // Assuming you need a token for the API call
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('description', values.description);
    formData.append('createdAt', new Date().toISOString());
    formData.append('status', 'pending');

    formData.append('userId', JSON.parse(localStorage.getItem('user_z')!).userId);
    // Check if there is a supporting document
    if (supportingDocument) {
      const formData0 = new FormData();
      formData0.append('file', supportingDocument); // Append the file if it's uploaded

      try {
        setLoading(true); // Set loading state to true
        const response = await fetch('http://localhost:8080/api/files/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData0,
        });

        if (response.ok) {
          const data = await response.text(); 
          const fileUrl = data.replace("File uploaded successfully: ", "").trim(); 
          formData.append('supportingDocument', fileUrl);
          setMessage(`File uploaded successfully`);
        } else {
          //const errorText = await response.text();
          setMessage(`Error uploading file`);
          return; 
        }
      } catch (error) {
        setMessage(`Error: ${(error as Error).message}`);
        return; 
      }
    }

    try {
      const response = await fetch('http://localhost:8080/api/applications', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
       // const data = await response.json(); 
        setMessage(`Application submitted successfully`);
        form.reset(); // Reset the form after successful submission
        setSupportingDocument(null); // Reset file input
      } else {
        //const errorText = await response.text();
        setMessage(`Error submitting application`);
      }
    } catch (error) {
      setMessage(`Error: ${(error as Error).message}`);
    } finally {
      setLoading(false); // Set loading state to false
    }
  }

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Why do you want to be a facilitator?</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your motivation and experience..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel>Upload Supporting Document (optional)</FormLabel>
          <FormControl>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                  setSupportingDocument(files[0]); // Set the uploaded file
                } else {
                  setSupportingDocument(null); // Clear the file if no file is selected
                }
              }}
              className="border border-gray-300 rounded-md p-2 bg-white hover:border-blue-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
        <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Application'}
        </Button>
        {message && <p className="mt-4 text-center text-amber-500">{message}</p>}
      </form>
    </Form>











    <h2 className="mt-8 text-xl font-semibold">Previous Applications</h2>
      {applications.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {applications.map((app) => (
            <li key={app.id} className="p-4 border border-gray-300 rounded-md">
              <h3 className="font-bold">{app.name}</h3>
              <p>Email: {app.email}</p>
              <p>Description: {app.description}</p>
              <p>Date: {new Date(app.createdAt).toLocaleDateString()}</p>
              <p>Status: <span className="font-semibold">{app.status}</span></p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-center text-gray-600">No previous applications found.</p>
      )}
    </div>
  );
}









