import React from 'react';
import { Users, Heart, Shield, Leaf } from 'lucide-react';

const CommunityValues = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Our Story & Values
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Handcrafted Haven began with a simple belief: every handmade item tells a story worth sharing.
          </p>
        </div>

        {/* Company Story */}
        <div className="mb-20 bg-white rounded-3xl p-8 md:p-12 shadow-lg">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">The Handcrafted Haven Story</h3>
            
            <div className="space-y-6 text-lg text-gray-700">
              <p>
                In 2018, three friends—Elara, a potter from Vermont; Marco, a woodworker from Oregon; and 
                Priya, a textile artist from New Mexico—found themselves struggling to share their crafts 
                beyond local markets. Despite their talent and dedication, reaching a wider audience felt 
                impossible.
              </p>
              
              <p>
                They met at a national crafts fair and bonded over their shared challenges: high platform fees, 
                lack of community support, and the difficulty of telling their products' stories online. 
                That night, over cups of herbal tea in a convention center lobby, Handcrafted Haven was born.
              </p>
              
              <div className="bg-amber-50 p-6 rounded-xl border-l-4 border-amber-500 my-8">
                <p className="italic text-gray-800">
                  "We realized the internet was full of mass-produced items, but there was no true home 
                  for handmade quality. We wanted to create a space where artisans aren't just sellers—they're 
                  celebrated artists with stories worth hearing."
                </p>
                <p className="mt-4 font-semibold text-amber-700">— Elara, Co-founder</p>
              </div>
              
              <p>
                Starting with just 12 artisans in a beta program, Handcrafted Haven has grown into a 
                community of over 500 creators across North America. What started as a simple marketplace 
                has evolved into a movement supporting sustainable consumption, artistic expression, and 
                meaningful human connection.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
              <Heart className="text-amber-600" size={28} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Artisan First</h3>
            <p className="text-gray-600">
              We champion fair pricing, transparent fees, and tools that help artisans thrive, not just survive.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Leaf className="text-green-600" size={28} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Sustainable Craft</h3>
            <p className="text-gray-600">
              We prioritize eco-friendly materials and processes, promoting mindful consumption and reducing waste.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Users className="text-blue-600" size={28} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Inclusive Community</h3>
            <p className="text-gray-600">
              We foster connections between makers and buyers, creating spaces for learning, sharing, and growing together.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <Shield className="text-purple-600" size={28} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Quality & Authenticity</h3>
            <p className="text-gray-600">
              Every item is verified for quality, and every story is authentic. No algorithms, just human connection.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-2xl text-gray-700 mb-8">
            Ready to be part of our story?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-amber-500 text-white rounded-full font-semibold hover:bg-amber-600 transition-colors">
              Join as Artisan
            </button>
            <button className="px-8 py-3 bg-white text-gray-800 border-2 border-amber-200 rounded-full font-semibold hover:border-amber-300 transition-colors">
              Explore Community Stories
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityValues;