import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">KT Design</h3>
            <p className="text-gray-300">Creating beautiful designs that tell your story.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Site Map</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
              <li><Link href="/portfolio" className="hover:text-gray-300">Portfolio</Link></li>
              <li><Link href="/about" className="hover:text-gray-300">About</Link></li>
              <li><Link href="/contact" className="hover:text-gray-300">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Email: hello@ktdesign.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Location: San Francisco, CA</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} KT Design. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
