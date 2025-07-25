import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#202027] text-white px-5 lg:px-20 py-10 mt-28">
      <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">MyTicket<span className='text-[#5AE3A8] text-[28px] italic'>X</span></h2>
          <p className="text-sm">
            Discover and book tickets for the best events around you. Sports, concerts, and more — all in one place.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white/70">Home</a></li>
            <li><a href="#" className="hover:text-white/70">Events</a></li>
            <li><a href="#" className="hover:text-white/70">Categories</a></li>
            <li><a href="#" className="hover:text-white/70">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white/70">Help Center</a></li>
            <li><a href="#" className="hover:text-white/70">FAQ</a></li>
            <li><a href="#" className="hover:text-white/70">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-white/70">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#"><FaFacebookF className="hover:text-white/70" /></a>
            <a href="#"><FaTwitter className="hover:text-white/70" /></a>
            <a href="#"><FaInstagram className="hover:text-white/70" /></a>
            <a href="#"><FaYoutube className="hover:text-white/70" /></a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-300">
        &copy; {new Date().getFullYear()} MyTicketX. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;