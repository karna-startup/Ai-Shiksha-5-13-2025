
import React from 'react';
import PlaceholderPage from '@/components/common/PlaceholderPage';
import ContactForm from '@/components/ContactForm';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, MapPin } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';

const Contact: React.FC = () => {
  return (
    <PlaceholderPage title="Contact Us" description="">
      <AnimatedBackground numberOfElements={15} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <Card className="border-primary/20 transition-all hover:shadow-lg hover:shadow-primary/10">
          <CardContent className="p-6 space-y-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-aishiksha-blue to-aishiksha-purple bg-clip-text text-transparent">
              Get in Touch
            </h2>
            <p className="mb-6">
              We'd love to hear from you! Whether you have a question about our platform, 
              need technical support, or want to explore partnership opportunities, our team is here to help.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground">contact@aishiksha.io</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-muted-foreground">
                    AI-Shiksha Educational Technologies Pvt. Ltd.<br />
                    Warangal,<br />
                    Hyderabad, Telangana 506132<br />
                    India
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-primary/20">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-aishiksha-blue to-aishiksha-purple bg-clip-text text-transparent">
              Send Us a Message
            </h2>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </PlaceholderPage>
  );
};

export default Contact;
