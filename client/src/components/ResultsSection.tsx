import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InstagramData, Unfollower } from "@/lib/types";
import UnfollowerCard from "./UnfollowerCard";

interface ResultsSectionProps {
  instagramData: InstagramData;
  unfollowers: Unfollower[];
  notFollowingBack: Unfollower[];
  activeTab: "unfollowers" | "notFollowingBack" | "newFollowers";
  setActiveTab: (tab: "unfollowers" | "notFollowingBack" | "newFollowers") => void;
}

export default function ResultsSection({
  instagramData,
  unfollowers,
  notFollowingBack,
  activeTab,
  setActiveTab
}: ResultsSectionProps) {
  const [visibleItems, setVisibleItems] = useState(6);

  const loadMore = () => {
    setVisibleItems((prev) => prev + 6);
  };

  // Determine which list to display based on active tab
  const displayList = activeTab === "unfollowers" 
    ? unfollowers 
    : activeTab === "notFollowingBack" 
      ? notFollowingBack 
      : [];

  const currentItems = displayList.slice(0, visibleItems);

  return (
    <div id="results" className="mt-8 animate-fadeIn">
      <div className="bg-white rounded-xl border border-[var(--main-1)] overflow-hidden shadow-sm mb-8">
        <div className="p-4 sm:p-6 border-b border-[var(--main-1)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-lg text-[var(--main-0)]">Results Summary</h3>
              <p className="text-[var(--main-2)]">Analysis of your Instagram followers</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="bg-[var(--main-1)]/20 px-4 py-2 rounded-lg text-center">
                <p className="text-sm text-[var(--main-2)]">Followers</p>
                <p className="font-bold text-[var(--main-0)]">{instagramData.followersCount}</p>
              </div>
              <div className="bg-[var(--main-1)]/20 px-4 py-2 rounded-lg text-center">
                <p className="text-sm text-[var(--main-2)]">Following</p>
                <p className="font-bold text-[var(--main-0)]">{instagramData.followingCount}</p>
              </div>
              <div className="bg-[var(--main-1)]/20 px-4 py-2 rounded-lg text-center">
                <p className="text-sm text-[var(--main-2)]">Unfollowers</p>
                <p className="font-bold text-[var(--main-7)]">{unfollowers.length}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <div className="flex gap-3 border-b border-[var(--main-1)] pb-3 overflow-x-auto">
            <Button 
              className={activeTab === "unfollowers" 
                ? "bg-gradient-to-r from-[var(--main-3)] via-[var(--main-5)] to-[var(--main-6)] text-[var(--main-1)] px-4 py-1.5 rounded-full text-sm font-medium"
                : "bg-[var(--main-1)]/20 hover:bg-[var(--main-1)]/40 text-[var(--main-0)] px-4 py-1.5 rounded-full text-sm font-medium"
              }
              onClick={() => setActiveTab("unfollowers")}
            >
              Unfollowers
            </Button>
            <Button 
              className={activeTab === "notFollowingBack" 
                ? "bg-gradient-to-r from-[var(--main-3)] via-[var(--main-5)] to-[var(--main-6)] text-[var(--main-1)] px-4 py-1.5 rounded-full text-sm font-medium"
                : "bg-[var(--main-1)]/20 hover:bg-[var(--main-1)]/40 text-[var(--main-0)] px-4 py-1.5 rounded-full text-sm font-medium"
              }
              onClick={() => setActiveTab("notFollowingBack")}
            >
              Not Following Back
            </Button>
            <Button 
              className={activeTab === "newFollowers" 
                ? "bg-gradient-to-r from-[var(--main-3)] via-[var(--main-5)] to-[var(--main-6)] text-[var(--main-1)] px-4 py-1.5 rounded-full text-sm font-medium"
                : "bg-[var(--main-1)]/20 hover:bg-[var(--main-1)]/40 text-[var(--main-0)] px-4 py-1.5 rounded-full text-sm font-medium"
              }
              onClick={() => setActiveTab("newFollowers")}
            >
              New Followers
            </Button>
          </div>
        </div>
      </div>

      {/* Display cards in a grid */}
      {currentItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentItems.map((user) => (
            <UnfollowerCard key={user.username} user={user} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-white rounded-xl border border-[var(--main-1)]">
          <p className="text-[var(--main-2)]">No data to display for this category.</p>
        </div>
      )}

      {/* Load more button */}
      {displayList.length > visibleItems && (
        <div className="mt-8 text-center">
          <Button 
            className="bg-[var(--main-5)] hover:bg-[var(--main-3)] text-[var(--main-1)] px-6 py-2.5 rounded-md font-medium"
            onClick={loadMore}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
