import { FiMail, FiMapPin } from "react-icons/fi";

const Contact = () => {
  return (
    <section className=" bg-heavyMetal py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 dark:text-white">
          <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent underline">
            Get in Touch
          </span>
        </h2>

        <div className="flex flex-row justify-evenly gap-12">
          {/* Contact Information */}
          <div className="flex items-start space-x-4">
            <FiMail className="w-6 h-6 text-blue-400 mt-1" />
            <div>
              <h3 className="text-xl font-semibold dark:text-gray-100 mb-2">
                Email
              </h3>
              <a
                href="mailto:your.email@example.com"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors"
              >
                henrypunnoose@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <FiMapPin className="w-6 h-6 text-blue-400 mt-1" />
            <div>
              <h3 className="text-xl font-semibold dark:text-gray-100 mb-2">
                Location
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Bangalore, India
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-600 dark:text-gray-400 mt-12">
          Prefer email? Just drop me a message at{" "}
          <a
            href="mailto:your.email@example.com"
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            henrypunnoose@gmail.com
          </a>
        </p>
      </div>
    </section>
  );
};

export default Contact;
