import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="py-10 md:py-16">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Out Who Unfollowed You on Instagram</h1>
          <p className="text-[#8E8E8E] text-lg mb-6">
            Upload your Instagram data file and instantly discover who unfollowed you, who's not following back, and more.
          </p>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] rounded-full p-1 mt-1">
                <div className="bg-white rounded-full w-4 h-4 flex items-center justify-center">
                  <span className="text-[#833AB4] text-xs font-bold">1</span>
                </div>
              </div>
              <div>
                <h3 className="font-medium">Request your data from Instagram</h3>
                <p className="text-[#8E8E8E] text-sm">Go to Settings → Privacy → Data Download and request a JSON file</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] rounded-full p-1 mt-1">
                <div className="bg-white rounded-full w-4 h-4 flex items-center justify-center">
                  <span className="text-[#833AB4] text-xs font-bold">2</span>
                </div>
              </div>
              <div>
                <h3 className="font-medium">Upload your data</h3>
                <p className="text-[#8E8E8E] text-sm">Drag and drop your Instagram data file below</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] rounded-full p-1 mt-1">
                <div className="bg-white rounded-full w-4 h-4 flex items-center justify-center">
                  <span className="text-[#833AB4] text-xs font-bold">3</span>
                </div>
              </div>
              <div>
                <h3 className="font-medium">See who unfollowed you</h3>
                <p className="text-[#8E8E8E] text-sm">Get a detailed list of unfollowers and non-followers</p>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <Button className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-white font-medium transition-transform hover:scale-105">
              How it works
            </Button>
          </div>
        </div>
        <Card className="border border-gray-200 rounded-xl overflow-hidden shadow-lg bg-white">
          <div className="relative aspect-video w-full bg-black">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <div className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] w-16 h-16 rounded-full flex items-center justify-center mb-3">
                <Play className="h-6 w-6 text-white" />
              </div>
              <p className="text-sm">Watch how Unfollowgram works</p>
            </div>
            <div className="w-full h-full bg-gradient-to-br from-black/20 to-black/60 opacity-50"></div>
          </div>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] w-8 h-8 rounded-full"></div>
                <div>
                  <p className="font-medium text-sm">Unfollowgram Tutorial</p>
                  <p className="text-[#8E8E8E] text-xs">4:21</p>
                </div>
              </div>
              <button className="text-[#8E8E8E] hover:text-[#262626]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                  <polyline points="16 6 12 2 8 6"></polyline>
                  <line x1="12" y1="2" x2="12" y2="15"></line>
                </svg>
              </button>
            </div>
            <div className="bg-gray-200 h-1 rounded-full">
              <div className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] w-3/4 h-1 rounded-full"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
