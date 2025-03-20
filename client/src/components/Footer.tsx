export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] w-6 h-6 rounded-lg"></div>
            <span className="font-bold">Unfollowgram</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-[#8E8E8E]">
            <a href="#" className="hover:text-[#262626]">Privacy Policy</a>
            <a href="#" className="hover:text-[#262626]">Terms of Service</a>
            <a href="#" className="hover:text-[#262626]">Contact Us</a>
            <a href="#" className="hover:text-[#262626]">FAQ</a>
          </div>
        </div>
        <div className="mt-6 text-center text-xs text-[#8E8E8E]">
          <p>Not affiliated with Instagram. For personal use only.</p>
          <p className="mt-1">© {new Date().getFullYear()} Unfollowgram. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
