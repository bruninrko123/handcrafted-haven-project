import React from "react";
import { Users, Heart, Shield, Leaf } from "lucide-react";

const CommunityValues = () => {
  return (
    <section>
      <div>
        <div>
          <h2>Our Story & Values</h2>
          <p>
            Handcrafted Haven began with a simple belief: every handmade item
            tells a story worth sharing.
          </p>
        </div>

        <div>
          <div>
            <h3>The Handcrafted Haven Story</h3>

            <div>
              <p>
                In 2018, three friends—Elara, a potter from Vermont; Marco, a
                woodworker from Oregon; and Priya, a textile artist from New
                Mexico—found themselves struggling to share their crafts beyond
                local markets. Despite their talent and dedication, reaching a
                wider audience felt impossible.
              </p>

              <p>
                {
                  "They met at a national crafts fair and bonded over their shared challenges: high platform fees, lack of community support, and the difficulty of telling their products' stories online. That night, over cups of herbal tea in a convention center lobby, Handcrafted Haven was born."
                }
              </p>

              <div>
                <p>
                  {"We realized the internet was full of mass-produced items, butthere was no true home for handmade quality. We wanted tocreate a space where artisans aren't just sellers—they're celebrated artists with stories worth hearing."}
                </p>
                <p>— Elara, Co-founder</p>
              </div>

              <p>
                Starting with just 12 artisans in a beta program, Handcrafted
                Haven has grown into a community of over 500 creators across
                North America. What started as a simple marketplace has evolved
                into a movement supporting sustainable consumption, artistic
                expression, and meaningful human connection.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div>
            <div>
              <Heart size={28} />
            </div>
            <h3>Artisan First</h3>
            <p>
              We champion fair pricing, transparent fees, and tools that help
              artisans thrive, not just survive.
            </p>
          </div>

          <div>
            <div>
              <Leaf size={28} />
            </div>
            <h3>Sustainable Craft</h3>
            <p>
              We prioritize eco-friendly materials and processes, promoting
              mindful consumption and reducing waste.
            </p>
          </div>

          <div>
            <div>
              <Users size={28} />
            </div>
            <h3>Inclusive Community</h3>
            <p>
              We foster connections between makers and buyers, creating spaces
              for learning, sharing, and growing together.
            </p>
          </div>

          <div>
            <div>
              <Shield size={28} />
            </div>
            <h3>Quality & Authenticity</h3>
            <p>
              Every item is verified for quality, and every story is authentic.
              No algorithms, just human connection.
            </p>
          </div>
        </div>

        <div>
          <p>Ready to be part of our story?</p>
          <div>
            <button>Join as Artisan</button>
            <button>Explore Community Stories</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityValues;
