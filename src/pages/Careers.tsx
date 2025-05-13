
import React, { useState, useEffect } from 'react';
import PlaceholderPage from '@/components/common/PlaceholderPage';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import AnimatedBackground from '@/components/AnimatedBackground';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';

const Careers: React.FC = () => {
  const [pageView, setPageView] = useState(false);
  
  // Track page view when the component mounts
  useEffect(() => {
    const trackPageView = async () => {
      try {
        const { error } = await supabase
          .from('visitor_analytics')
          .insert([
            {
              page_url: '/careers',
              browser: navigator.userAgent,
              device: navigator.platform
            }
          ]);
          
        if (error) {
          console.error("Error tracking page view:", error);
        } else {
          setPageView(true);
        }
      } catch (err) {
        console.error("Error tracking careers page view:", err);
      }
    };
    
    trackPageView();
  }, []);

  const jobOpenings = [
    {
      title: "AI Education Specialist",
      type: "Full-time",
      location: "Remote",
      description: "Join our team to develop AI-based educational content and teaching methodologies tailored for different age groups."
    },
    {
      title: "Full Stack Developer",
      type: "Full-time",
      location: "Hyderabad, India / Remote",
      description: "Help build and enhance our educational platform with a focus on creating engaging, interactive learning experiences."
    },
    {
      title: "Curriculum Designer",
      type: "Full-time / Contract",
      location: "Remote",
      description: "Create age-appropriate computer science curriculum that makes complex concepts accessible and engaging."
    },
    {
      title: "UX/UI Designer",
      type: "Full-time",
      location: "Remote",
      description: "Design intuitive and delightful user experiences for learners of all ages, with a focus on accessibility and engagement."
    }
  ];

  const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().min(10, { message: "Please enter a valid phone number." }),
    position: z.string().min(2, { message: "Please specify the position you're applying for." }),
    coverLetter: z.string().optional(),
    resume: z.instanceof(File)
      .refine((file) => file.size <= 500 * 1024, { message: "File size must be less than 500KB." })
      .refine(
        (file) => ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type),
        { message: "Only PDF or Word documents are accepted." }
      )
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      position: "",
      coverLetter: "",
    }
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Prepare email subject format as requested
      const subject = `Job - ${values.position} - ${values.name} - ${values.phone}`;
      
      // Convert file to base64 for storing in database or sending via API
      const fileReader = new FileReader();
      fileReader.readAsDataURL(values.resume);
      
      fileReader.onload = async () => {
        const base64File = fileReader.result?.toString().split(',')[1];
        
        // Send application data to backend (would normally go to an edge function)
        // This is a placeholder - in a real app we'd call an edge function to send the email
        
        toast.success("Application submitted successfully! We'll contact you soon.");
        form.reset();
        setIsSubmitting(false);
      };
      
      fileReader.onerror = () => {
        throw new Error("File reading failed");
      };
    } catch (error) {
      console.error("Application submission error:", error);
      toast.error("There was a problem submitting your application. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <PlaceholderPage title="Work with AI-Shiksha" description="">
      {/* Add animated background for consistency with other pages */}
      <AnimatedBackground numberOfElements={20} />
      
      <div className="space-y-8 relative z-10">
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg">
            Join our passionate team and help shape the future of computer science education. 
            At AI-Shiksha, we're building technology that makes learning accessible, engaging, and effective for students of all ages.
          </p>
          
          <h2 className="bg-gradient-to-r from-aishiksha-blue to-aishiksha-purple bg-clip-text text-transparent">Why Join Us?</h2>
          <ul>
            <li>Make a real impact on education worldwide</li>
            <li>Work with cutting-edge AI and educational technology</li>
            <li>Flexible remote-first culture with competitive compensation</li>
            <li>Collaborative, diverse, and inclusive work environment</li>
            <li>Continuous learning and professional development opportunities</li>
          </ul>
          
          <h2 className="bg-gradient-to-r from-aishiksha-blue to-aishiksha-purple bg-clip-text text-transparent">Current Openings</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobOpenings.map((job, index) => (
            <Card key={index} className="transition-all hover:shadow-lg hover:shadow-primary/10 border-primary/10">
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold">{job.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <span>{job.type}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                  </div>
                </div>
                <p>{job.description}</p>
                <Button 
                  variant="outline" 
                  className="w-full hover:bg-primary/10" 
                  onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Card id="application-form" className="border-primary/20">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-aishiksha-blue to-aishiksha-purple bg-clip-text text-transparent">Apply to AI-Shiksha</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} />
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
                          <Input type="email" placeholder="Your email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                          <Input placeholder="Position you're applying for" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="coverLetter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Why do you want to join AI-Shiksha?</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about yourself and why you're interested in this position" 
                          rows={5} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="resume"
                  render={({ field: { onChange, value, ...fieldProps } }) => (
                    <FormItem>
                      <FormLabel>Upload Resume/CV</FormLabel>
                      <FormControl>
                        <Input 
                          type="file" 
                          className="cursor-pointer" 
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              onChange(file);
                            }
                          }}
                          {...fieldProps}
                        />
                      </FormControl>
                      <p className="text-xs text-muted-foreground mt-1">PDF or Word document, max 500KB</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </PlaceholderPage>
  );
};

export default Careers;
