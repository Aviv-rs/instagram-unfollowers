import { InstagramData, Unfollower, InstagramUser } from "./types";

interface ParsedInstagramData {
  data: InstagramData;
  unfollowers: Unfollower[];
  notFollowingBack: Unfollower[];
}

export async function parseInstagramData(fileContent: string): Promise<ParsedInstagramData> {
  try {
    // Parse the JSON data
    const jsonData = JSON.parse(fileContent);
    
    let followers: InstagramUser[] = [];
    let following: InstagramUser[] = [];
    
    // Check different possible formats of Instagram data exports
    if (jsonData.followers_and_following) {
      // Handle the case where data is in followers_and_following format
      followers = parseUsersList(jsonData.followers_and_following.followers);
      following = parseUsersList(jsonData.followers_and_following.following);
    } else if (jsonData.followers && jsonData.following) {
      // Handle the case where followers and following are separate root properties
      followers = parseUsersList(jsonData.followers);
      following = parseUsersList(jsonData.following);
    } else if (Array.isArray(jsonData)) {
      // Handle the case where the file is just an array of users
      // We'll need to determine if it's followers or following
      throw new Error("Please upload a file containing both followers and following data");
    } else {
      throw new Error("Unsupported Instagram data format");
    }
    
    // Create maps for quick lookup
    const followersMap = new Map<string, InstagramUser>();
    followers.forEach(user => {
      followersMap.set(user.username.toLowerCase(), user);
    });
    
    const followingMap = new Map<string, InstagramUser>();
    following.forEach(user => {
      followingMap.set(user.username.toLowerCase(), user);
    });
    
    // Find unfollowers (people who you follow but don't follow you back)
    const unfollowers: Unfollower[] = following
      .filter(user => !followersMap.has(user.username.toLowerCase()))
      .map(user => ({
        ...user,
        unfollowedTime: generateRandomTime(),
        followDuration: generateRandomDuration()
      }));
    
    // Find people not following back (people who follow you but you don't follow)
    const notFollowingBack: Unfollower[] = followers
      .filter(user => !followingMap.has(user.username.toLowerCase()))
      .map(user => ({
        ...user,
        unfollowedTime: 'N/A',
        followDuration: generateRandomDuration()
      }));
    
    return {
      data: {
        followersCount: followers.length,
        followingCount: following.length,
        followers,
        following
      },
      unfollowers,
      notFollowingBack
    };
  } catch (error) {
    console.error("Error parsing Instagram data:", error);
    throw new Error("Failed to parse Instagram data. Please check the file format.");
  }
}

// Helper function to parse users list based on different possible formats
function parseUsersList(users: any[]): InstagramUser[] {
  if (!Array.isArray(users)) {
    return [];
  }
  
  return users.map(user => {
    // Handle different possible user object structures
    if (typeof user === 'string') {
      return { username: user };
    }
    
    if (user.string_list_data) {
      // Handle the "string_list_data" format
      const userData = user.string_list_data[0];
      return {
        username: userData.value || userData.href || '',
        fullName: userData.timestamp ? '' : userData.href || '',
      };
    }
    
    if (user.value || user.href) {
      // Handle simple value/href format
      return {
        username: user.value || user.href || '',
        fullName: user.title || user.name || '',
      };
    }
    
    // Fallback for other formats
    return {
      username: user.username || user.name || 'unknown_user',
      fullName: user.full_name || user.name || '',
    };
  });
}

// Helper function to generate random time for demo purposes
function generateRandomTime(): string {
  const timeUnits = ['d', 'w'];
  const randomNumber = Math.floor(Math.random() * 14) + 1;
  const randomUnit = timeUnits[Math.floor(Math.random() * timeUnits.length)];
  return `${randomNumber}${randomUnit} ago`;
}

// Helper function to generate random duration for demo purposes
function generateRandomDuration(): string {
  const durations = [
    '1 month', '2 months', '3 months', '6 months', 
    '1 year', '2 years', '3 years'
  ];
  return durations[Math.floor(Math.random() * durations.length)];
}
