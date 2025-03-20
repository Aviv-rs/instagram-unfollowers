import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] w-8 h-8 rounded-lg"></div>
          <h1 className="text-xl font-bold tracking-tight">Unfollowgram</h1>
        </div>
        <div>
          <Button variant="outline" className="bg-[#EFEFEF] hover:bg-gray-200 text-[#262626] border-0">
            Help
          </Button>
        </div>
      </div>
    </nav>
  );
}
