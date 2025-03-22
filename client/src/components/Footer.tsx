export default function Footer() {
  const scrollToFAQ = () => {
    const faqSection = document.getElementById('faq');
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <footer className="bg-[var(--main-0)] border-t border-[var(--main-1)] mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="bg-gradient-to-r from-[var(--main-3)] via-[var(--main-5)] to-[var(--main-6)] w-6 h-6 rounded-lg"></div>
            <span className="font-bold text-[var(--main-1)]">Unfollowgram</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-[var(--main-1)]">
            <a href="#" className="hover:text-[var(--main-6)]">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--main-6)]">Terms of Service</a>
            <a href="#" className="hover:text-[var(--main-6)]">Contact Us</a>
            <a href="#" className="hover:text-[var(--main-6)]" onClick={(e) => { e.preventDefault(); scrollToFAQ(); }}>FAQ</a>
          </div>
        </div>
        <div className="mt-6 text-center text-xs text-[var(--main-1)]/80">
          <p>Not affiliated with Instagram. For personal use only.</p>
          <p className="mt-1">© {new Date().getFullYear()} Unfollowgram. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
