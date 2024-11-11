import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
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
import { Textarea } from "../ui/textarea";

// Step 1: Update the form schema to include the category
const formSchema = z.object({
    topic: z.string().min(1, { message: "Topic is required." }),
    startTime: z.string().nonempty({ message: "Start time is required." }),
    duration: z.string().min(1, { message: "Duration must be at least 1 minute." }),
    locationType: z.string().min(1, { message: "Please select a location type." }),
    category: z.string().min(1, { message: "Please select a category." }), // New category field
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().refine(value => value === "" || /^\d{5}(-\d{4})?$/.test(value), {
        message: "Invalid zip code format.",
    }).optional(),
    description: z.string().optional(),
    contactName: z.string().min(1, { message: "Contact name is required." }),
    contactEmail: z.string().email({ message: "Valid contact email is required." }),
    image: z.string().optional(),
});

export const ScheduleMeetingModal = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            topic: "",
            startTime: "",
            duration: "1",
            locationType: "online",
            category: "", // Initialize category field
            street: "",
            city: "",
            state: "",
            zipCode: "",
            description: "",
            contactName: "",
            contactEmail: "",
            image: "",
        },
    });

    const isLoading = form.formState.isSubmitting;
    const navigate = useNavigate();
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const token = localStorage.getItem('token');
        const userId = JSON.parse(localStorage.getItem('user_z')!).userId 


        if (values.locationType === "online") {
            const req_z = {
                topic: values.topic,
                startTime: values.startTime,
                duration: values.duration,
            }
            const response = await fetch("http://localhost:8080/api/zoom/createMeeting", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(req_z),
            });
        
            if (response.ok) {
                const result = await response.json();
                console.log("Meeting created:", result);
                try {
                    const detailsResponse = await fetch(`http://localhost:8080/api/meetings`, {
                        method: "POST",
                        headers: {         
                            "Content-Type": "application/json",
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({...values, meetingUrl:result.join_url, startUrl:result.start_url, 
                        startTime: new Date(values.startTime).toISOString(), userId, category: values.category}),
                    });

                    if (detailsResponse.ok) {
                        const meetingDetails = await detailsResponse.json();
                        console.log("Meeting details fetched:", meetingDetails);
                        navigate(0)

                    } else {
                        console.error("Error fetching meeting details:", await detailsResponse.json());
                    }
                } catch (fetchDetailsError) {
                    console.error("Error fetching meeting details:", fetchDetailsError);
                }
            } else {
                console.error("Error creating meeting");
            }  
        } else if (values.locationType === "in-person")  {
            const response = await fetch("http://localhost:8080/api/meetings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({...values, startTime: new Date(values.startTime).toISOString(), userId, category: values.category}),
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log("In-person meeting created:", result);
                form.reset();
                navigate(0)
            } else {
                const errorData = await response.json();
                console.error("Error creating in-person meeting:", errorData);
            }
        } 
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-6 pb-4">
                {/* Topic and Start Time in one row */}
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="topic"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Event Topic</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isLoading}
                                        placeholder="Enter topic"
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
                </div>

                {/* Duration and Location Type */}
                <div className="grid grid-cols-2 gap-4">
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
                    <FormField
                        control={form.control}
                        name="locationType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location Type</FormLabel>
                                <FormControl>
                                    <select
                                        {...field}
                                        className="w-full rounded-md border border-gray-300 p-2"
                                    >
                                        <option value="online">Online (Zoom)</option>
                                        <option value="in-person">In-person</option>
                                    </select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Step 2: Add Category Dropdown */}
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mental Health Topic</FormLabel>
                            <FormControl>
                                <select
                                    {...field}
                                    className="w-full rounded-md border border-gray-300 p-2"
                                >
                                    <option value="">Select a mental health topic</option>
                                    <option value="anxiety">Anxiety</option>
                                    <option value="depression">Depression</option>
                                    <option value="stress_management">Stress Management</option>
                                    <option value="mindfulness">Mindfulness</option>
                                    <option value="self_care">Self-Care</option>
                                    <option value="therapy">Therapy</option>
                                    <option value="coping_strategies">Coping Strategies</option>
                                    <option value="other">Other</option>
                                </select>
                            </FormControl>
                            <FormMessage />
        </FormItem>
    )}
/>

                {/* Conditionally render address fields if 'in-person' */}
                {form.watch("locationType") === "in-person" && (
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="street"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Street</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Street" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input placeholder="City" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>State</FormLabel>
                                    <FormControl>
                                        <Input placeholder="State" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="zipCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Zip Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Zip Code" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                )}

                {/* Description, Contact Name, Contact Email, and Image */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contact Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Contact Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contact Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="Contact Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                

                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Scheduling..." : "Schedule Meeting"}
                </Button>
            </form>
        </Form>
    );
};







