import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Calendar, Share2, Bookmark, MessageCircle, ThumbsUp, Facebook, Twitter, Linkedin, Copy, ArrowLeft, ArrowRight, User } from 'lucide-react';

// Mock article data (in a real app, this would come from an API)
const articles = [
  {
    id: "1",
    title: "10 Strategies to Double Your Freelance Income in 2023",
    content: `
      <p class="text-lg mb-6">As the gig economy continues to grow, freelancers face both exciting opportunities and fierce competition. Whether you're a seasoned freelancer or just starting out, strategically positioning yourself can lead to significant income growth.</p>
      
      <h2 class="text-2xl font-bold my-6">1. Specialize in High-Demand Niches</h2>
      <p class="mb-4">While being a generalist has its benefits, specializing in specific in-demand niches can command higher rates. Research market trends and identify areas where specialized skills are needed but supply is limited.</p>
      <p class="mb-6">For example, rather than marketing yourself as a "general web developer," position yourself as a "Shopify e-commerce optimization specialist" or "SaaS UX/UI expert." This specificity makes it easier for clients with particular needs to find you and justifies premium pricing.</p>
      
      <h2 class="text-2xl font-bold my-6">2. Develop a Value-Based Pricing Strategy</h2>
      <p class="mb-4">Move away from hourly rates, which cap your income at the number of hours you can work. Instead, price your services based on the value you provide to clients.</p>
      <p class="mb-6">Ask yourself: How much revenue or cost savings will your work generate for the client? What's the true business impact? When you can articulate this clearly, clients become less focused on your rates and more interested in the return on their investment.</p>
      
      <h2 class="text-2xl font-bold my-6">3. Create Productized Service Packages</h2>
      <p class="mb-4">Develop standardized service packages with clear deliverables, timelines, and pricing. This approach makes your offerings more tangible and easier for clients to understand and purchase.</p>
      <p class="mb-6">For instance, a content writer could offer packages like "Blog Launch Package: 5 SEO-optimized posts with topic research and social promotion" or "Monthly Content Retainer: 8 articles per month with strategy consultation."</p>
      
      <h2 class="text-2xl font-bold my-6">4. Build Recurring Revenue Streams</h2>
      <p class="mb-4">The feast-or-famine cycle is one of freelancing's biggest challenges. Counter this by establishing recurring revenue through retainer agreements, maintenance contracts, or subscription services.</p>
      <p class="mb-6">Pitch ongoing services that provide continuous value to clients, such as monthly website maintenance, regular content creation, or weekly data analysis. This stabilizes your income and reduces time spent constantly hunting for new projects.</p>
      
      <h2 class="text-2xl font-bold my-6">5. Leverage Strategic Partnerships</h2>
      <p class="mb-4">Form alliances with complementary service providers to create referral networks. For example, if you're a web designer, partner with copywriters, SEO specialists, and developers to offer comprehensive solutions.</p>
      <p class="mb-6">These partnerships can generate a steady stream of pre-qualified leads and allow you to earn referral fees or subcontracting opportunities without additional marketing effort.</p>
      
      <h2 class="text-2xl font-bold my-6">6. Develop Passive Income Sources</h2>
      <p class="mb-4">Use your expertise to create digital products, templates, courses, or e-books that you can sell repeatedly without additional time investment.</p>
      <p class="mb-6">For example, a graphic designer might create and sell logo templates, a copywriter could develop a course on email marketing, or a programmer could offer code snippets or plugins.</p>
      
      <h2 class="text-2xl font-bold my-6">7. Implement Strategic Upselling and Cross-Selling</h2>
      <p class="mb-4">It's much easier to sell additional services to existing clients than to acquire new ones. Analyze your clients' needs to identify opportunities for relevant upsells or complementary services.</p>
      <p class="mb-6">For instance, after designing a website, offer ongoing maintenance, SEO optimization, or regular content updates. Make these suggestions at strategic moments when clients can clearly see the value.</p>
      
      <h2 class="text-2xl font-bold my-6">8. Automate and Outsource</h2>
      <p class="mb-4">Identify tasks that aren't the best use of your time or expertise and consider automating or outsourcing them. This frees you to focus on high-value activities that directly generate revenue.</p>
      <p class="mb-6">Invest in tools that streamline your workflow, and consider hiring subcontractors for aspects of projects that aren't your strength or that consume disproportionate time.</p>
      
      <h2 class="text-2xl font-bold my-6">9. Enhance Your Online Presence</h2>
      <p class="mb-4">In today's digital marketplace, a strong online presence is crucial for attracting premium clients. Invest in a professional website that showcases your expertise and results you've achieved for clients.</p>
      <p class="mb-6">Regularly publish thought leadership content, case studies, and testimonials that position you as an authority in your field. Be strategic about which platforms you use based on where your ideal clients spend their time.</p>
      
      <h2 class="text-2xl font-bold my-6">10. Consistently Invest in Skill Development</h2>
      <p class="mb-4">The freelance marketplace evolves rapidly. Stay ahead by continuously developing high-value skills that are in demand and difficult to find.</p>
      <p class="mb-6">Allocate time and resources to learning emerging technologies, methodologies, or specialized knowledge that will make you more valuable to clients and justify higher rates.</p>
      
      <h2 class="text-2xl font-bold my-6">Conclusion</h2>
      <p class="mb-4">Doubling your freelance income requires strategic thinking and intentional action rather than simply working more hours. By implementing these strategies, you'll not only increase your earnings but also create a more sustainable and fulfilling freelance career.</p>
      <p class="mb-6">Remember that substantial income growth rarely happens overnight. Start by implementing two or three of these strategies, measure the results, and gradually incorporate more as you refine your approach.</p>
    `,
    excerpt: "Learn actionable techniques that can help you scale your freelance business and increase your revenue this year.",
    image: "https://via.placeholder.com/1200x630?text=Freelance+Income+Strategies",
    category: "Business Growth",
    author: "Alex Morgan",
    authorImage: "https://randomuser.me/api/portraits/men/32.jpg",
    authorBio: "Alex is a business coach for freelancers with over 10 years of experience helping independent professionals scale their businesses.",
    date: "August 15, 2023",
    readTime: "8 min",
    tags: ["Freelance Business", "Income Growth", "Pricing Strategy", "Passive Income", "Client Management"],
    relatedArticles: [7, 8, 10]
  },
  {
    id: "2",
    title: "The Future of Remote Work: Trends to Watch in 2024",
    content: `
      <p class="text-lg mb-6">The landscape of remote work continues to evolve rapidly, shaped by technological advancements, changing worker expectations, and lessons learned from global adoption. As we look ahead to 2024, several key trends are emerging that will define the next phase of distributed work.</p>
      
      <h2 class="text-2xl font-bold my-6">The Rise of Hybrid-First Models</h2>
      <p class="mb-4">While fully remote work surged during the pandemic, we're now seeing a more nuanced approach emerge. Organizations are increasingly adopting hybrid-first models that combine the flexibility of remote work with strategic in-person collaboration.</p>
      <p class="mb-6">These models are becoming increasingly sophisticated, moving beyond simple schedules (like "3 days remote, 2 days in-office") to purpose-driven approaches where the nature of the work determines the setting. Companies are designating specific days or events for collaborative work, team building, and innovation sessions, while reserving remote days for deep focus work and individual productivity.</p>
      
      <h2 class="text-2xl font-bold my-6">Digital Nomad Infrastructure Expansion</h2>
      <p class="mb-4">Countries and cities around the world are competing to attract digital nomads through specialized visa programs and purpose-built infrastructure. This trend is expected to accelerate in 2024, with more destinations offering tax incentives, simplified residency processes, and amenities specifically designed for remote workers.</p>
      <p class="mb-6">We're also seeing the rise of "nomad villages" and purpose-built remote work communities that offer high-speed internet, coworking spaces, accommodations, and built-in social networks. These developments are making location-independent work more accessible and appealing to a broader range of professionals.</p>
      
      <h2 class="text-2xl font-bold my-6">AI-Enhanced Remote Collaboration</h2>
      <p class="mb-4">Artificial intelligence is transforming remote collaboration in ways that go far beyond simple automation. AI tools are increasingly being integrated into virtual collaboration platforms to facilitate more natural and effective remote teamwork.</p>
      <p class="mb-6">From real-time translation that bridges language barriers in global teams to AI meeting assistants that generate actionable summaries and follow-up tasks, these technologies are addressing many of the friction points of distributed work. We're also seeing the emergence of AI tools that help combat "Zoom fatigue" by identifying when meetings could be more effectively handled asynchronously.</p>
      
      <h2 class="text-2xl font-bold my-6">Virtual Reality Workspaces Go Mainstream</h2>
      <p class="mb-4">While VR for remote work has been discussed for years, 2024 looks to be a turning point as the technology becomes more accessible, comfortable, and purposeful. Major tech companies are launching more affordable and user-friendly VR headsets specifically designed for professional use.</p>
      <p class="mb-6">These virtual workspaces go beyond novelty to address specific remote work challenges, such as spatial collaboration for design teams, immersive training environments, and virtual offices that recreate the spontaneous interactions of physical workplaces. As the hardware becomes lighter and more comfortable for extended use, adoption is expected to accelerate significantly.</p>
      
      <h2 class="text-2xl font-bold my-6">Asynchronous-First Communication</h2>
      <p class="mb-4">Organizations are increasingly recognizing that the default synchronous communication model borrowed from office environments isn't optimal for distributed teams, especially those spanning multiple time zones.</p>
      <p class="mb-6">In 2024, we'll see more companies adopting "asynchronous-first" communication protocols, where real-time meetings are the exception rather than the rule. This shift is supported by new tools designed specifically for rich asynchronous communication, including video messaging platforms that offer the expressiveness of video with the flexibility of asynchronous text.</p>
      
      <h2 class="text-2xl font-bold my-6">Wellness-Centered Remote Work Policies</h2>
      <p class="mb-4">As the initial excitement about remote work gives way to recognition of its challenges, organizations are developing more sophisticated approaches to supporting employee wellbeing in distributed environments.</p>
      <p class="mb-6">These include digital wellness programs, stipends for ergonomic home office equipment, virtual fitness classes, and mandatory disconnect policies that respect boundaries between work and personal time. Mental health support specifically designed for remote workers is also becoming a priority, with companies offering virtual therapy sessions, stress management resources, and tools to combat isolation.</p>
      
      <h2 class="text-2xl font-bold my-6">Four-Day Workweeks and Flexible Schedules</h2>
      <p class="mb-4">The success of four-day workweek pilots around the world is accelerating adoption of alternative work schedules, particularly in remote-first companies. These organizations are finding that when work is judged by outcomes rather than hours visible in an office, compressed schedules can maintain or even improve productivity while enhancing employee satisfaction.</p>
      <p class="mb-6">Beyond the four-day week, we're seeing increased adoption of truly flexible schedules where employees design their own work hours around core collaboration periods. This approach recognizes that different people have different energy patterns and life responsibilities, and enables them to work during their most productive hours.</p>
      
      <h2 class="text-2xl font-bold my-6">Remote Work Certification and Skills Training</h2>
      <p class="mb-4">As remote work becomes a permanent fixture in the professional landscape, formal training in remote work skills is emerging as a distinct educational category. Universities and online learning platforms are launching dedicated courses and certifications in virtual collaboration, remote team management, and distributed leadership.</p>
      <p class="mb-6">Companies are also investing in training programs to help employees master remote-specific skills such as digital communication, virtual presentation, and self-management. These initiatives recognize that effective remote work requires a distinct skill set that differs in important ways from traditional office-based work.</p>
      
      <h2 class="text-2xl font-bold my-6">Conclusion: The Continued Evolution of Work</h2>
      <p class="mb-4">The transition to remote and hybrid work represents one of the most significant shifts in how work is organized in generations. As we move into 2024, we're seeing this evolution continue with increasingly sophisticated approaches that aim to capture the benefits of flexibility while addressing the challenges of distributed teams.</p>
      <p class="mb-6">Organizations that stay ahead of these trends and thoughtfully design their remote work practices will have a significant advantage in attracting talent, fostering innovation, and building resilient, future-ready operations. For individual professionals, developing the skills and mindsets suited to this new landscape will be crucial for long-term career success.</p>
    `,
    excerpt: "Explore emerging trends in remote work and how they'll impact freelancers and independent professionals in the coming year.",
    image: "https://via.placeholder.com/1200x630?text=Future+of+Remote+Work",
    category: "Industry Insights",
    author: "Sophia Chen",
    authorImage: "https://randomuser.me/api/portraits/women/44.jpg",
    authorBio: "Sophia is a workplace strategist and researcher specializing in the future of work and distributed team dynamics.",
    date: "August 10, 2023",
    readTime: "10 min",
    tags: ["Remote Work", "Future of Work", "Digital Nomad", "Virtual Collaboration", "Work-Life Balance"],
    relatedArticles: [5, 11, 3]
  },
  {
    id: "3",
    title: "How to Create a Client Onboarding Process That Impresses",
    content: `
      <p class="text-lg mb-6">Your client onboarding process sets the tone for your entire working relationship. A smooth, thoughtful onboarding experience not only impresses clients but also lays the foundation for successful projects and long-term partnerships.</p>
      
      <h2 class="text-2xl font-bold my-6">Why Client Onboarding Matters</h2>
      <p class="mb-4">A well-designed onboarding process serves multiple crucial functions:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>It establishes clear expectations on both sides</li>
        <li>It demonstrates your professionalism and attention to detail</li>
        <li>It collects all necessary information upfront to avoid delays</li>
        <li>It creates a positive first impression that builds confidence</li>
        <li>It reduces confusion and prevents scope creep</li>
      </ul>
      <p class="mb-6">Research shows that clients form lasting impressions in the first few interactions, making this phase disproportionately important to your long-term success.</p>
      
      <h2 class="text-2xl font-bold my-6">Step 1: Create a Welcome Package</h2>
      <p class="mb-4">As soon as a client signs on, send them a comprehensive welcome package that includes:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>A personalized welcome message that expresses genuine appreciation</li>
        <li>An overview of your process and what they can expect</li>
        <li>Introduction to team members they'll be working with (if applicable)</li>
        <li>A clear timeline of next steps</li>
        <li>Your contact information and preferred communication channels</li>
        <li>Office hours and expected response times</li>
      </ul>
      <p class="mb-6">Consider creating this as a branded PDF or a dedicated client portal page. The polish and thoughtfulness of this package sets the tone for your service quality.</p>
      
      <h2 class="text-2xl font-bold my-6">Step 2: Design a Comprehensive Intake Form</h2>
      <p class="mb-4">Create a detailed but user-friendly intake questionnaire that gathers all the information you need to begin work. This might include:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Project goals and success metrics</li>
        <li>Target audience information</li>
        <li>Brand guidelines and assets</li>
        <li>Access to relevant accounts or platforms</li>
        <li>Inspiration examples or competitors to analyze</li>
        <li>Any specific preferences or requirements</li>
      </ul>
      <p class="mb-6">Use a tool like Typeform or Google Forms to make this process interactive and visually appealing. Include progress indicators so clients know how much time to allocate.</p>
      
      <h2 class="text-2xl font-bold my-6">Step 3: Schedule a Kickoff Meeting</h2>
      <p class="mb-4">Once you've reviewed the intake form responses, arrange a kickoff meeting to:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Build rapport and establish a personal connection</li>
        <li>Clarify any questions from the intake form</li>
        <li>Discuss project goals, scope, and timeline in detail</li>
        <li>Address any potential challenges or concerns</li>
        <li>Explain your working process and methodology</li>
        <li>Set communication expectations (frequency, channels, etc.)</li>
      </ul>
      <p class="mb-6">Send a detailed agenda before the meeting, and follow up with meeting notes and action items afterward. This demonstrates organization and ensures everyone is aligned from the start.</p>
      
      <h2 class="text-2xl font-bold my-6">Step 4: Create a Project Roadmap</h2>
      <p class="mb-4">Based on the kickoff meeting, develop and share a visual roadmap that includes:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Key project phases and milestones</li>
        <li>Deliverables for each phase</li>
        <li>Client review and feedback points</li>
        <li>Timeline with specific dates</li>
        <li>Dependencies and requirements from both sides</li>
      </ul>
      <p class="mb-6">This roadmap gives clients clarity about the process and helps manage expectations about when they'll see results and when their input is needed.</p>
      
      <h2 class="text-2xl font-bold my-6">Step 5: Establish a Communication System</h2>
      <p class="mb-4">Set up a streamlined communication system that might include:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>A project management tool for tracking progress (Asana, Trello, etc.)</li>
        <li>A shared folder for documents and assets (Google Drive, Dropbox)</li>
        <li>Regular check-in calls or emails (define frequency upfront)</li>
        <li>A designated point of contact on your team</li>
        <li>Clear guidelines for urgent requests or after-hours communication</li>
      </ul>
      <p class="mb-6">The goal is to make communication efficient while ensuring the client feels informed and connected throughout the project.</p>
      
      <h2 class="text-2xl font-bold my-6">Step 6: Deliver an Early Win</h2>
      <p class="mb-4">Plan your project timeline to include a small but meaningful deliverable early in the process. This might be:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>A strategic insights document that demonstrates your understanding</li>
        <li>A visual mood board or concept sketch</li>
        <li>A technical audit with initial recommendations</li>
        <li>An optimization of an existing asset</li>
      </ul>
      <p class="mb-6">This early win builds trust and excitement, showing clients they made the right choice in hiring you.</p>
      
      <h2 class="text-2xl font-bold my-6">Step 7: Request Initial Feedback</h2>
      <p class="mb-4">About two weeks into the project, specifically ask for feedback on the onboarding experience and initial work process:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Is the communication frequency meeting their needs?</li>
        <li>Do they feel their input is being incorporated?</li>
        <li>Is there anything they need that they're not getting?</li>
        <li>Are there any concerns about the direction or process?</li>
      </ul>
      <p class="mb-6">This demonstrates your commitment to their satisfaction and allows you to make adjustments before small issues grow into problems.</p>
      
      <h2 class="text-2xl font-bold my-6">Automating Your Onboarding Process</h2>
      <p class="mb-4">Once you've refined your onboarding process, consider automating elements of it:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Use client onboarding software to manage the workflow</li>
        <li>Set up email sequences that trigger at specific points</li>
        <li>Create templates for common documents and communications</li>
        <li>Use scheduling tools for automated meeting booking</li>
        <li>Implement digital signature services for contracts</li>
      </ul>
      <p class="mb-6">Automation saves time while ensuring consistency, but retain personalized elements to maintain the human touch.</p>
      
      <h2 class="text-2xl font-bold my-6">Conclusion: Onboarding as a Competitive Advantage</h2>
      <p class="mb-4">A thoughtful onboarding process isn't just a nicetyâ€”it's a powerful differentiator in a crowded market. Clients who experience a smooth, professional onboarding are more likely to:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Trust your expertise and follow your recommendations</li>
        <li>Be patient when challenges arise</li>
        <li>Refer you to others in their network</li>
        <li>Return for additional projects</li>
        <li>Accept your proposed rates without excessive negotiation</li>
      </ul>
      <p class="mb-6">Invest the time to design and refine your onboarding process, and you'll see returns in client satisfaction, project outcomes, and your professional reputation.</p>
    `,
    excerpt: "A smooth onboarding process sets the tone for successful client relationships. Learn how to create one that stands out.",
    image: "https://via.placeholder.com/1200x630?text=Client+Onboarding",
    category: "Client Management",
    author: "David Wilson",
    authorImage: "https://randomuser.me/api/portraits/men/45.jpg",
    authorBio: "David is a client success consultant who has helped hundreds of freelancers and agencies improve their client relationships and retention.",
    date: "August 5, 2023",
    readTime: "6 min",
    tags: ["Client Relationships", "Project Management", "Professional Services", "Client Communication", "Business Systems"],
    relatedArticles: [4, 8, 1]
  },
  // Additional articles would be defined here...
];

const BlogArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<any | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // In a real app, you'd fetch this from an API
    const foundArticle = articles.find(a => a.id === id);
    
    if (foundArticle) {
      setArticle(foundArticle);
      
      // Get related articles
      if (foundArticle.relatedArticles && foundArticle.relatedArticles.length > 0) {
        const related = articles.filter(a => foundArticle.relatedArticles.includes(Number(a.id)));
        setRelatedArticles(related);
      }
    }
    
    // Reset state when article changes
    setShowShareOptions(false);
    setCopiedLink(false);
    setBookmarked(false);
    
    // Scroll to top when article changes
    window.scrollTo(0, 0);
  }, [id]);

  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-[#ffeee3] pt-40 pb-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Article not found</h1>
          <p className="mb-8">The article you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/resources/blog" 
            className="inline-flex items-center text-primary-600 hover:text-primary-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Article Header */}
      <div className="pt-40 pb-10 bg-gradient-to-r from-primary-500 to-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-2/3">
              <Link 
                to="/resources/blog" 
                className="inline-flex items-center text-[#ffeee3] hover:text-white mb-6"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Articles
              </Link>
              <span className="bg-[#ffeee3] text-primary-600 text-xs font-medium px-2.5 py-0.5 rounded">
                {article.category}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6">{article.title}</h1>
              <div className="flex items-center gap-6 text-[#ffeee3]">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{article.readTime}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{article.date}</span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 order-first md:order-last">
              <img 
                src={article.authorImage} 
                alt={article.author}
                className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-white/20"
              />
              <div className="text-center mt-3">
                <h3 className="font-bold text-lg">{article.author}</h3>
                <p className="text-[#ffeee3] text-sm">Author</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Featured Image */}
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-auto object-cover rounded-xl shadow-md mb-10"
            />
            
            {/* Article Body */}
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-10">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {article.tags.map((tag: string) => (
                  <Link 
                    key={tag} 
                    to={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                    className="bg-[#ffeee3] hover:bg-[#ffeee3] transition-colors text-[#2E2E2E] text-xs font-medium px-2.5 py-1 rounded"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
              
              {/* Article Content */}
              <article className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              </article>
              
              {/* Article Footer */}
              <div className="mt-10 pt-6 border-t border-[#ffeee3]">
                {/* Author Bio */}
                <div className="flex items-start gap-4">
                  <img 
                    src={article.authorImage} 
                    alt={article.author}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{article.author}</h3>
                    <p className="text-[#2E2E2E] text-sm mb-3">{article.authorBio}</p>
                    <div className="flex gap-2">
                      <Link to="#" className="text-[#ffeee3] hover:text-[#2E2E2E]">
                        <Twitter className="w-5 h-5" />
                      </Link>
                      <Link to="#" className="text-[#ffeee3] hover:text-[#2E2E2E]">
                        <Linkedin className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* Article Actions */}
                <div className="flex justify-between items-center mt-8">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={handleLike}
                      className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                        liked 
                          ? 'bg-primary-50 text-primary-600' 
                          : 'bg-[#ffeee3] text-[#2E2E2E] hover:bg-[#ffeee3]'
                      }`}
                    >
                      <ThumbsUp className={`w-4 h-4 ${liked ? 'fill-primary-600' : ''}`} />
                      <span>{likeCount}</span>
                    </button>
                    <button 
                      onClick={handleBookmark}
                      className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                        bookmarked 
                          ? 'bg-primary-50 text-primary-600' 
                          : 'bg-[#ffeee3] text-[#2E2E2E] hover:bg-[#ffeee3]'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-primary-600' : ''}`} />
                      <span>{bookmarked ? 'Saved' : 'Save'}</span>
                    </button>
                    <div className="relative">
                      <button 
                        onClick={handleShare}
                        className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#ffeee3] text-[#2E2E2E] hover:bg-[#ffeee3]"
                      >
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                      
                      {/* Share Options Dropdown */}
                      {showShareOptions && (
                        <div className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg p-2 min-w-[180px]">
                          <button 
                            onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
                            className="flex items-center gap-2 w-full text-left p-2 hover:bg-[#ffeee3] rounded"
                          >
                            <Facebook className="w-4 h-4 text-[#FF6B00]" />
                            <span>Facebook</span>
                          </button>
                          <button 
                            onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}&text=${article.title}`, '_blank')}
                            className="flex items-center gap-2 w-full text-left p-2 hover:bg-[#ffeee3] rounded"
                          >
                            <Twitter className="w-4 h-4 text-[#FF6B00]" />
                            <span>Twitter</span>
                          </button>
                          <button 
                            onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`, '_blank')}
                            className="flex items-center gap-2 w-full text-left p-2 hover:bg-[#ffeee3] rounded"
                          >
                            <Linkedin className="w-4 h-4 text-[#FF6B00]" />
                            <span>LinkedIn</span>
                          </button>
                          <button 
                            onClick={handleCopyLink}
                            className="flex items-center gap-2 w-full text-left p-2 hover:bg-[#ffeee3] rounded"
                          >
                            <Copy className="w-4 h-4" />
                            <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Link 
                    to="/resources/blog" 
                    className="text-[#ffeee3] hover:text-[#2E2E2E]"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Comments Section - Placeholder */}
            <div className="mt-10 bg-white rounded-xl shadow-sm p-6 md:p-10">
              <div className="flex items-center gap-2 mb-6">
                <MessageCircle className="w-5 h-5 text-primary-600" />
                <h3 className="text-xl font-bold">Comments (12)</h3>
              </div>
              
              <div className="flex items-start gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-[#ffeee3]"></div>
                <div className="flex-1">
                  <textarea
                    placeholder="Leave a comment..."
                    className="w-full p-3 border border-[#ffeee3] rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    rows={3}
                  ></textarea>
                  <div className="mt-2 flex justify-end">
                    <button className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white font-medium py-2 px-4 rounded-lg transition-colors">
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                {/* This would be populated with actual comments in a real application */}
                <div className="p-4 text-center border border-dashed border-[#ffeee3] rounded-lg">
                  <p className="text-[#ffeee3]">Sign in to view and post comments</p>
                  <div className="mt-2">
                    <Link 
                      to="/login" 
                      className="text-primary-600 hover:text-primary-800 font-medium"
                    >
                      Log in
                    </Link>
                    <span className="mx-2 text-[#ffeee3]">|</span>
                    <Link 
                      to="/signup" 
                      className="text-primary-600 hover:text-primary-800 font-medium"
                    >
                      Sign up
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-4">
            {/* Related Articles */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h3 className="font-bold text-lg mb-4">Related Articles</h3>
              <div className="space-y-4">
                {relatedArticles.length > 0 ? (
                  relatedArticles.map((relatedArticle) => (
                    <Link 
                      key={relatedArticle.id} 
                      to={`/blog/article/${relatedArticle.id}`}
                      className="block"
                    >
                      <div className="group flex gap-3">
                        <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={relatedArticle.image} 
                            alt={relatedArticle.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary-600 transition-colors duration-200">
                            {relatedArticle.title}
                          </h4>
                          <div className="flex items-center text-[#ffeee3] text-xs mt-1">
                            <Clock className="w-3 h-3 mr-1" />
                            <span>{relatedArticle.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-[#ffeee3] text-sm">No related articles found</p>
                )}
              </div>
            </div>
            
            {/* Popular Tags */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h3 className="font-bold text-lg mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(articles.flatMap(a => a.tags || []))).slice(0, 12).map((tag: string) => (
                  <Link 
                    key={tag} 
                    to={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                    className="bg-[#ffeee3] hover:bg-[#ffeee3] transition-colors text-[#2E2E2E] text-xs font-medium px-2.5 py-1 rounded"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <div className="bg-primary-600 rounded-xl p-6 text-white">
              <div className="mb-4">
                <User className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-primary-100 mb-4">
                Get the latest articles and resources sent straight to your inbox
              </p>
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 rounded bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-primary-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button className="w-full bg-white text-primary-600 hover:bg-primary-50 font-medium py-2 rounded transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* More Articles Section */}
      <div className="bg-[#ffeee3] py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Continue Reading</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.filter(a => a.id !== id).slice(0, 3).map((article) => (
              <div key={article.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                <Link to={`/blog/article/${article.id}`} className="block">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-40 object-cover"
                  />
                </Link>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="bg-[#ffeee3] text-primary-600 text-xs font-medium px-2.5 py-0.5 rounded">
                      {article.category}
                    </span>
                    <div className="ml-auto flex items-center text-[#ffeee3] text-sm">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-3 line-clamp-2 hover:text-primary-600 transition-colors duration-200">
                    <Link to={`/blog/article/${article.id}`}>{article.title}</Link>
                  </h3>
                  <div className="flex items-center mt-4">
                    <img 
                      src={article.authorImage} 
                      alt={article.author}
                      className="w-8 h-8 rounded-full object-cover mr-2"
                    />
                    <span className="text-sm font-medium">{article.author}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link 
              to="/resources/blog" 
              className="inline-flex items-center bg-[#FF6B00] hover:bg-[#FF9F45] text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              View All Articles
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogArticlePage;














