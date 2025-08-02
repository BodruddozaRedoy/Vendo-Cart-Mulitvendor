import { FiMail } from 'react-icons/fi';

export default function Subscription() {
  return (
    <section className="bg-primary text-white py-12">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center space-y-6">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold">
          Subscribe & Get <span className="text-yellow-300">10% Off</span>
        </h2>

        {/* Description */}
        <p className="max-w-xl text-sm md:text-base text-white/90">
          Join our newsletter and be the first to receive exclusive offers, updates, and discounts.
        </p>

        {/* Subscription Form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col sm:flex-row items-center w-full max-w-xl gap-4"
        >
          <div className="relative w-full">
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full px-4 py-3 pl-10 rounded-md text-black bg-background focus:outline-none"
            />
            <FiMail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 text-lg" />
          </div>
          <button
            type="submit"
            className="bg-yellow-300 text-primary font-semibold px-6 py-3 rounded-md hover:bg-yellow-400 transition duration-300 w-full sm:w-auto"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
