import { Layout } from "@/components/Layout";

export default function About() {
  return (
    <Layout>
      <section className="max-w-3xl mx-auto py-20 px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-800">
            Our Story
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
        </div>

        <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
          <p>
            Founded by a lifelong spa professional, Santa Rosa Spas brings warmth and
            expertise to every backyard. Our mission is simple: to help you relax in
            style, with dependable products and honest service.
          </p>

          <p>
            With years of experience in the hot tub industry, we understand what makes
            a truly exceptional spa experience. From the moment you step into one of our
            hot tubs, you'll feel the difference that quality craftsmanship and thoughtful
            design can make.
          </p>

          <p>
            We're passionate about creating spaces where families and friends can gather,
            unwind, and create lasting memories. Whether you're looking to soothe tired
            muscles after a long day or create an outdoor oasis for entertaining, we're
            here to help you find the perfect hot tub for your lifestyle.
          </p>

          <div className="bg-blue-50 p-8 rounded-xl mt-10">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              Why Choose Santa Rosa Spas?
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">✓</span>
                <span>Expert guidance from spa professionals</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">✓</span>
                <span>Premium quality hot tubs from trusted brands</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">✓</span>
                <span>Honest, transparent pricing</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">✓</span>
                <span>Dedicated customer support</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}
