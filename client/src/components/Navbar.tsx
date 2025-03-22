import { Button } from "@/components/ui/button";

export default function Navbar() {
  const scrollToFAQ = () => {
    const faqSection = document.getElementById('faq');
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="border-b border-[var(--main-1)] bg-[var(--main-0)] shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-[var(--main-3)] via-[var(--main-5)] to-[var(--main-6)] w-8 h-8 rounded-lg"></div>
          <h1 className="text-xl font-bold tracking-tight text-[var(--main-1)]">Unfollowgram</h1>
        </div>
        <div className="space-x-2">
          <Button 
            variant="outline" 
            className="bg-[var(--main-5)] hover:bg-[var(--main-3)] text-[var(--main-1)] border-0"
            onClick={scrollToFAQ}
          >
            FAQ
          </Button>
        </div>
      </div>
    </nav>
  );
}
