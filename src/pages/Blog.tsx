
import React from 'react';
import PlaceholderPage from '@/components/common/PlaceholderPage';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Blog: React.FC = () => {
  const blogPosts = [
    {
      title: "The Future of AI in Education",
      date: "May 2, 2025",
      category: "AI Education",
      excerpt: "Explore how artificial intelligence is transforming the educational landscape, creating personalized learning experiences for students of all ages.",
      image: "/placeholder.svg",
    },
    {
      title: "Teaching Programming to Preschoolers: Is It Too Early?",
      date: "April 25, 2025",
      category: "Early Education",
      excerpt: "We discuss age-appropriate methods for introducing programming concepts to young children, focusing on play-based learning.",
      image: "/placeholder.svg",
    },
    {
      title: "5 Computer Science Projects for Elementary Students",
      date: "April 18, 2025",
      category: "Projects",
      excerpt: "Engaging project ideas that can help elementary school students develop computational thinking skills while having fun.",
      image: "/placeholder.svg",
    },
    {
      title: "Addressing the Gender Gap in Computer Science Education",
      date: "April 10, 2025",
      category: "Inclusion",
      excerpt: "Strategies for creating more inclusive computer science learning environments that encourage participation from all students.",
      image: "/placeholder.svg",
    },
    {
      title: "The Role of Gamification in Learning to Code",
      date: "April 3, 2025",
      category: "Learning Methods",
      excerpt: "How game-based learning can increase motivation and engagement in computer science education.",
      image: "/placeholder.svg",
    },
    {
      title: "Preparing Teens for the AI-Driven Workforce",
      date: "March 27, 2025",
      category: "Career Preparation",
      excerpt: "Essential skills high school students need to develop for success in an increasingly automated job market.",
      image: "/placeholder.svg",
    }
  ];

  return (
    <PlaceholderPage title="Blog" description="">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Latest Articles</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">All Posts</Button>
            <Button variant="ghost" size="sm">AI Education</Button>
            <Button variant="ghost" size="sm">Learning Methods</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <Card key={index} className="overflow-hidden flex flex-col">
              <div className="aspect-video bg-muted">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6 flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-muted-foreground">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button variant="link" className="p-0">Read More →</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-center mt-8">
          <Button variant="outline">Load More Articles</Button>
        </div>
      </div>
    </PlaceholderPage>
  );
};

export default Blog;
