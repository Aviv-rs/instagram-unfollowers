import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Unfollower } from "@/lib/types";

interface UnfollowerCardProps {
  user: Unfollower;
}

export default function UnfollowerCard({ user }: UnfollowerCardProps) {
  // Generate Instagram profile URL
  const profileUrl = `https://instagram.com/${user.username}`;
  
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="bg-white rounded-xl border border-[var(--main-1)] overflow-hidden shadow-sm transition-all hover:shadow-md">
      <div className="p-4 flex items-center space-x-3">
        <Avatar className="w-12 h-12">
          <AvatarFallback className="bg-gradient-to-r from-[var(--main-3)] via-[var(--main-5)] to-[var(--main-6)] text-[var(--main-1)]">
            {getInitials(user.fullName || user.username)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="font-medium truncate text-[var(--main-0)]">{user.username}</p>
            <span className="text-xs text-[var(--main-2)]">{user.unfollowedTime}</span>
          </div>
          <p className="text-sm text-[var(--main-2)] truncate">{user.fullName}</p>
        </div>
      </div>
      <div className="px-4 pb-4 flex justify-between">
        <span className="text-xs text-[var(--main-2)]">
          {user.followDuration ? `Followed you for ${user.followDuration}` : "Former follower"}
        </span>
        <a 
          href={profileUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-[var(--main-5)] text-sm font-medium hover:underline hover:text-[var(--main-6)]"
        >
          View Profile
        </a>
      </div>
    </div>
  );
}
