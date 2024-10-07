import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

const formSchema = z.object({
    topic: z.string().min(1, {
        message: "Topic is required."
    }),
    startTime: z.string().nonempty({ message: "Start time is required." }),
    duration: z.string().min(1, { message: "Duration must be at least 1 minute." }),
});

export const ScheduleMeetingModal = () => {

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            topic: "",
            startTime: "",
            duration: "1",
        },
    });

    const isLoading = form.formState.isSubmitting;

    
    

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const token = localStorage.getItem('token');

        const response = await fetch("http://localhost:8080/api/zoom/createMeeting", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(values),
        });
    
        if (response.ok) {
            const result = await response.json();
            console.log("Meeting created:", result);
        } else {
            console.error("Error creating meeting");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-6">
                <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Meeting Topic</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isLoading}
                                    placeholder="Enter meeting topic"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Start Time</FormLabel>
                            <FormControl>
                                <Input
                                    type="datetime-local"
                                    disabled={isLoading}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Duration (minutes)</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isLoading}
                                    placeholder="Enter duration"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
                    Submit
                </Button>
            </form>
        </Form>
    );
};









