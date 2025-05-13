
import React, { useState } from 'react';
import PlaceholderPage from '@/components/common/PlaceholderPage';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import AnimatedBackground from '@/components/AnimatedBackground';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';

const PartnerWithUs: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    organization: z.string().min(2, { message: "Organization name is required." }),
    phone: z.string().min(10, { message: "Please enter a valid phone number." }),
    partnershipType: z.string({ required_error: "Please select a partnership type." }),
    message: z.string().min(10, { message: "Please provide details about your partnership proposal." })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      organization: "",
      phone: "",
      partnershipType: "",
      message: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Store the data in Supabase
      const { error } = await supabase
        .from('partner_enquiries')
        .insert([
          {
            name: values.name,
            email: values.email,
            organization: values.organization,
            phone: values.phone,
            partnership_type: values.partnershipType,
            message: values.message
          }
        ]);
      
      if (error) throw error;
      
      toast.success("Thank you for your interest! We'll contact you shortly to discuss partnership opportunities.");
      form.reset();
    } catch (error) {
      console.error("Error submitting partnership inquiry:", error);
      toast.error("There was a problem submitting your inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PlaceholderPage title="Partner with AI-Shiksha" description="">
      <AnimatedBackground numberOfElements={20} />
      
      <div className="space-y-8 relative z-10">
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg">
            AI-Shiksha collaborates with educational institutions, technology companies, 
            content creators, and non-profit organizations to expand our reach and enhance our platform.
          </p>
          
          <h2 className="bg-gradient-to-r from-aishiksha-blue to-aishiksha-purple bg-clip-text text-transparent">
            Partnership Opportunities
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-6">
            <Card className="border-primary/20 transition-all hover:shadow-lg hover:shadow-primary/10">
              <CardContent className="p-6 space-y-3">
                <h3 className="text-xl font-bold">Educational Institutions</h3>
                <p>Integrate AI-Shiksha into your curriculum or offer it as a supplementary resource.</p>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 transition-all hover:shadow-lg hover:shadow-primary/10">
              <CardContent className="p-6 space-y-3">
                <h3 className="text-xl font-bold">Content Creators</h3>
                <p>Collaborate on developing engaging computer science educational content.</p>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 transition-all hover:shadow-lg hover:shadow-primary/10">
              <CardContent className="p-6 space-y-3">
                <h3 className="text-xl font-bold">Technology Companies</h3>
                <p>Sponsor educational initiatives or integrate our platform with your products.</p>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 transition-all hover:shadow-lg hover:shadow-primary/10">
              <CardContent className="p-6 space-y-3">
                <h3 className="text-xl font-bold">Non-Profits</h3>
                <p>Work together to bring computer science education to underserved communities.</p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Card className="border-primary/20">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-aishiksha-blue to-aishiksha-purple bg-clip-text text-transparent">
              Partnership Inquiry Form
            </h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="organization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organization</FormLabel>
                        <FormControl>
                          <Input placeholder="Your organization" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
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
                </div>
                
                <FormField
                  control={form.control}
                  name="partnershipType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Partnership Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select partnership type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="educational">Educational Institution</SelectItem>
                          <SelectItem value="content">Content Creator</SelectItem>
                          <SelectItem value="technology">Technology Company</SelectItem>
                          <SelectItem value="nonprofit">Non-Profit Organization</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Partnership Proposal</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your partnership idea and how we can collaborate" 
                          rows={5} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Partnership Inquiry"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </PlaceholderPage>
  );
};

export default PartnerWithUs;
