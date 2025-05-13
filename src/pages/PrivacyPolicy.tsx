
import React from 'react';
import PlaceholderPage from '@/components/common/PlaceholderPage';

const PrivacyPolicy: React.FC = () => {
  return (
    <PlaceholderPage title="Privacy Policy" description="">
      <div className="prose dark:prose-invert max-w-none">
        <p>Last Updated: May 5, 2025</p>
        
        <h2>Introduction</h2>
        <p>
          AI-Shiksha ("we", "our", or "us") is committed to protecting the privacy of all users of our platform, 
          especially children. This Privacy Policy explains how we collect, use, disclose, and safeguard your 
          information when you use our website and services.
        </p>
        
        <h2>Information We Collect</h2>
        <p>We collect information in the following ways:</p>
        
        <h3>Information You Provide to Us</h3>
        <ul>
          <li><strong>Account Information:</strong> When you create an account, we collect your name, email address, and password.</li>
          <li><strong>Profile Information:</strong> Age range, learning preferences, and educational goals.</li>
          <li><strong>Content:</strong> Information you provide in your communications with us.</li>
        </ul>
        
        <h3>Information We Collect Automatically</h3>
        <ul>
          <li><strong>Usage Data:</strong> Learning progress, lesson completion, quiz results, and interaction with the platform.</li>
          <li><strong>Device Information:</strong> Device type, operating system, and browser type.</li>
          <li><strong>Log Data:</strong> IP address, access times, and pages viewed.</li>
        </ul>
        
        <h2>How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide, maintain, and improve our services</li>
          <li>Personalize your learning experience</li>
          <li>Communicate with you about our services, updates, and promotions</li>
          <li>Monitor and analyze usage patterns and trends</li>
          <li>Detect, investigate, and prevent fraud and security issues</li>
        </ul>
        
        <h2>Special Protections for Children</h2>
        <p>
          AI-Shiksha complies with all applicable laws regarding children's privacy. For users under the age 
          of 13, we take additional steps to protect their privacy:
        </p>
        <ul>
          <li>We require verifiable parental consent before collecting personal information</li>
          <li>We limit the information collected to what is reasonably necessary for participation</li>
          <li>We provide parents with the ability to review their child's information, request deletion, and refuse further collection</li>
          <li>We do not condition a child's participation on providing more information than is reasonably necessary</li>
        </ul>
        
        <h2>Data Sharing and Disclosure</h2>
        <p>We do not sell your personal information. We may share your information with:</p>
        <ul>
          <li><strong>Service Providers:</strong> Third-party vendors who help us provide our services</li>
          <li><strong>Educational Institutions:</strong> If you access our platform through a school or educational program, we may share information with that institution</li>
          <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
        </ul>
        
        <h2>Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal information 
          against unauthorized access, disclosure, alteration, and destruction.
        </p>
        
        <h2>Your Rights</h2>
        <p>Depending on your location, you may have the right to:</p>
        <ul>
          <li>Access the personal information we hold about you</li>
          <li>Correct inaccurate information</li>
          <li>Delete your personal information</li>
          <li>Restrict or object to certain processing of your information</li>
          <li>Data portability</li>
        </ul>
        
        <h2>Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
          the new Privacy Policy on this page and updating the "Last Updated" date.
        </p>
        
        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at privacy@ai-shiksha.edu.
        </p>
      </div>
    </PlaceholderPage>
  );
};

export default PrivacyPolicy;
