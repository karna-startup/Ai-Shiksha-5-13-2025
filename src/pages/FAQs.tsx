
import React from 'react';
import PlaceholderPage from '@/components/common/PlaceholderPage';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQs: React.FC = () => {
  const faqs = [
    {
      question: "What is Ai-Shiksha?",
      answer: "Ai-Shiksha is a platform dedicated to teaching children Computer Science from the basics to advanced levels. Using AI-driven, personalized learning experiences, we empower children to understand and apply key computer science concepts, preparing them for the future of innovation and technology."
    },
    {
      question: "Who can use Ai-Shiksha?",
      answer: "Ai-Shiksha is designed for children aged 3-18, offering a progressive curriculum in Computer Science. Whether they're just starting to explore computers or looking to master coding, our platform provides the tools they need to build their skills at their own pace."
    },
    {
      question: "What makes Ai-Shiksha different from other educational platforms?",
      answer: "Unlike traditional platforms, Ai-Shiksha is focused entirely on Computer Science education, from basic concepts like computer hardware to advanced topics such as coding, algorithms, and data structures. We aim to build a strong foundation in tech, which is becoming increasingly essential in today's world."
    },
    {
      question: "How does Ai-Shiksha adapt to a child's learning style?",
      answer: "Ai-Shiksha uses AI to track and adapt to each child's learning pace and preferences. The platform customizes lessons and exercises based on progress, ensuring that each child's learning journey is unique and optimized for success."
    },
    {
      question: "How does Ai-Shiksha complement traditional education?",
      answer: "Ai-Shiksha works in harmony with traditional schooling by offering a complementary learning experience. Instead of replacing teachers, it enhances classroom education by providing additional resources, interactive tools, and personalized computer science lessons that students can access at their own pace."
    },
    {
      question: "What subjects are covered in Ai-Shiksha's curriculum?",
      answer: "Our curriculum focuses entirely on Computer Science, covering everything from the basics (like computer operations) to advanced topics such as coding, robotics, algorithms, machine learning, and artificial intelligence. Ai-Shiksha empowers children with a comprehensive understanding of the digital world."
    },
    {
      question: "How does Ai-Shiksha work for schools?",
      answer: "Ai-Shiksha can be integrated into schools to supplement their existing curriculum, providing an easy-to-use tool for teaching Computer Science. It's not intended to replace teachers but to provide additional learning material, activities, and real-time support for students."
    },
    {
      question: "How does the AI tutor (SARAS) assist students?",
      answer: "SARAS, our AI-powered voice tutor, guides students through their learning journey, answering questions, explaining concepts, and providing feedback on coding exercises. It ensures that students are never alone in their learning process and can receive help at any time."
    },
    {
      question: "Is Ai-Shiksha suitable for beginners?",
      answer: "Yes! Ai-Shiksha is designed to support learners at all levels. Whether your child is new to computers or already has a foundation in coding, Ai-Shiksha tailors lessons to match their current knowledge, helping them grow progressively."
    },
    {
      question: "Can children learn coding and programming with Ai-Shiksha?",
      answer: "Absolutely! Ai-Shiksha offers coding courses for all levels, from beginner-friendly introductions to programming languages to advanced topics such as app development and machine learning. Students can start learning to code as early as 6 years old."
    },
    {
      question: "How does Ai-Shiksha ensure safety and privacy for children?",
      answer: "We take the privacy and security of our users seriously. Ai-Shiksha complies with all necessary privacy laws and regulations to protect the personal information of children. All data is encrypted, and no personal information is shared with third parties without consent."
    },
    {
      question: "Can parents track their child's progress?",
      answer: "Yes! Parents can easily monitor their child's learning progress through a dashboard, which provides insights into milestones, achievements, and areas for improvement. This allows parents to be involved and provide additional support when necessary."
    },
    {
      question: "Is Ai-Shiksha free or paid?",
      answer: "Ai-Shiksha offers both free and paid content. Basic courses and resources are available for free, while premium features offer advanced learning materials, deeper exercises, and personalized learning experiences. We aim to make quality computer science education accessible to all."
    },
    {
      question: "How can schools and educational institutions integrate Ai-Shiksha into their curriculum?",
      answer: "Ai-Shiksha can be seamlessly integrated into school curriculums to enhance the teaching of Computer Science. Our platform offers tools for educators to complement their lessons, provide extra practice, and support students outside the classroom. We offer customizable solutions for schools and educators."
    },
    {
      question: "What role does the founder of Ai-Shiksha play?",
      answer: "The founder of Ai-Shiksha, Karunakar, is deeply involved in the development of the platform, ensuring that its vision remains focused on empowering the next generation of learners in Computer Science. His passion for technology and education drives the mission of Ai-Shiksha, which is to prepare children for the future."
    },
    {
      question: "Can children use Ai-Shiksha independently?",
      answer: "Yes! Ai-Shiksha is designed to be intuitive and user-friendly. Children can use the platform independently, with SARAS, the AI tutor, providing guidance, explanations, and feedback along the way. The platform empowers children to take control of their learning while offering support whenever needed."
    },
    {
      question: "How does Ai-Shiksha help build emotional intelligence?",
      answer: "Along with teaching Computer Science, Ai-Shiksha also promotes emotional growth. SARAS offers motivation, shares stories, and encourages positive behavior and resilience, ensuring that students not only develop technical skills but also strong emotional intelligence."
    },
    {
      question: "How can Ai-Shiksha help students in their future careers?",
      answer: "Ai-Shiksha prepares students for careers in technology by giving them foundational skills in coding, problem-solving, and digital literacy. By equipping children with knowledge in Computer Science, Ai-Shiksha empowers them to explore a wide range of career opportunities in tech and beyond."
    },
    {
      question: "How is Ai-Shiksha's curriculum structured?",
      answer: "The curriculum is structured in progressive levels, starting with beginner concepts like basic computing, and gradually advancing to topics such as coding, machine learning, and AI. The AI tutor ensures that each student's learning journey is personalized, guiding them through each step as they master new skills."
    },
    {
      question: "How can I contact Ai-Shiksha for partnership opportunities?",
      answer: "If you're interested in collaborating with Ai-Shiksha, please visit our Contact Us page. We're open to partnerships with educational institutions, startups, and tech companies that align with our mission to revolutionize education."
    }
  ];

  return (
    <PlaceholderPage title="Frequently Asked Questions" description="">
      <div className="space-y-6">
        <p className="text-lg mb-8">
          Have questions about AI-Shiksha? Find answers to our most commonly asked questions below.
          If you don't see what you're looking for, please <a href="/contact" className="text-primary hover:underline">contact us</a>.
        </p>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg font-medium">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-base">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </PlaceholderPage>
  );
};

export default FAQs;
