import { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Car Buying Tips & Auto News - Royal Drive Canada Blog",
  description: "Expert car buying advice, vehicle maintenance tips, and automotive news from Royal Drive Canada. Learn about financing, trade-ins, and finding the perfect pre-owned vehicle in Toronto.",
  keywords: ["car buying tips", "auto news Toronto", "vehicle maintenance", "financing advice", "trade-in tips"],
  path: "/blog",
  type: "article",
});

export default function BlogPage() {
  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Royal Drive Canada Blog",
    "description": "Expert car buying advice and automotive news from Toronto's premier used car dealership",
    "url": "https://royaldrivecanada.com/blog",
    "publisher": {
      "@type": "AutoDealer",
      "name": "Royal Drive Canada"
    },
    "inLanguage": "en-CA"
  };

  const blogPosts = [
    {
      title: "5 Essential Tips for First-Time Car Buyers in Toronto",
      excerpt: "Navigate the used car market with confidence. Learn what to look for, how to negotiate, and avoid common pitfalls.",
      date: "2024-08-25",
      category: "Buying Tips"
    },
    {
      title: "Understanding Car Financing: A Complete Guide",
      excerpt: "Everything you need to know about auto loans, interest rates, and getting approved for financing with any credit score.",
      date: "2024-08-20",
      category: "Financing"
    },
    {
      title: "How to Maximize Your Trade-In Value",
      excerpt: "Simple steps to prepare your current vehicle for trade-in and get the best possible value for your car.",
      date: "2024-08-15",
      category: "Trade-In Tips"
    },
    {
      title: "Winter Driving Preparation: Essential Vehicle Maintenance",
      excerpt: "Get your car ready for Canadian winters with our comprehensive maintenance checklist and safety tips.",
      date: "2024-08-10",
      category: "Maintenance"
    },
    {
      title: "Why Choose a Safety-Certified Used Car?",
      excerpt: "Learn about Ontario's safety certification process and why it matters when buying a pre-owned vehicle.",
      date: "2024-08-05",
      category: "Safety"
    },
    {
      title: "The Ultimate Pre-Purchase Inspection Checklist",
      excerpt: "What to inspect when viewing a used car, plus professional inspection services available in Toronto.",
      date: "2024-08-01",
      category: "Buying Tips"
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogStructuredData) }}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Car Buying Tips & Automotive News
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Expert advice from Toronto&apos;s trusted used car professionals at Royal Drive Canada
            </p>
          </div>
        </section>

        {/* Featured Article */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="h-64 md:h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <span className="text-6xl">🚗</span>
                  </div>
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="text-sm text-blue-600 font-medium mb-2">FEATURED ARTICLE</div>
                  <h2 className="text-2xl font-bold mb-4">Complete Guide to Buying Your First Used Car in Toronto</h2>
                  <p className="text-gray-600 mb-6">
                    {`From setting your budget to finalizing the paperwork, this comprehensive guide covers 
                    everything first-time buyers need to know about purchasing a quality pre-owned vehicle 
                    in the Greater Toronto Area.`}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Published: August 25, 2024</span>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Latest Articles</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <article key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-4xl">📝</span>
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-blue-600 font-medium mb-2">{post.category}</div>
                    <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</span>
                      <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
                        Read More →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { name: "Buying Tips", icon: "🛒", count: 12 },
                { name: "Financing", icon: "💰", count: 8 },
                { name: "Trade-In Tips", icon: "🔄", count: 6 },
                { name: "Maintenance", icon: "🔧", count: 10 },
                { name: "Safety", icon: "🛡️", count: 5 }
              ].map((category, index) => (
                <div key={index} className="text-center p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-bold mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.count} articles</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="bg-gray-900 text-white py-16">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
            <p className="text-xl mb-8">
              Get the latest car buying tips, automotive news, and exclusive deals delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
