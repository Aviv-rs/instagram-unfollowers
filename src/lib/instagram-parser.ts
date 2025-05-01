import { 
  InstagramData, 
  InstagramUser, 
  Unfollower, 
  ParsedInstagramData,
  InstagramRelationshipEntry 
} from '../types/instagram'
import i18n from '../i18n'

/**
 * Parses Instagram data from separate followers and following JSON files
 * @param followersContent The content of the followers JSON file
 * @param followingContent The content of the following JSON file
 * @returns Processed Instagram data
 */
export async function parseInstagramData(followersContent: string, followingContent: string): Promise<ParsedInstagramData> {
  try {
    // Parse the JSON content
    const followersData = JSON.parse(followersContent)
    const followingData = JSON.parse(followingContent)
    
    // Extract follower and following data based on the structure
    let followers: InstagramRelationshipEntry[] = []
    let following: InstagramRelationshipEntry[] = []
    
    // Extract followers
    if (followersData.relationships_followers) {
      followers = followersData.relationships_followers
    } else if (Array.isArray(followersData)) {
      followers = followersData
    }
    
    // Extract following
    if (followingData.relationships_following) {
      following = followingData.relationships_following
    } else if (Array.isArray(followingData)) {
      following = followingData
    }
    
    // Format the data into our structure
    const parsedFollowers = parseUsersList(followers)
    const parsedFollowing = parseUsersList(following)
    
    const instagramData: InstagramData = {
      followersCount: parsedFollowers.length,
      followingCount: parsedFollowing.length,
      followers: parsedFollowers,
      following: parsedFollowing
    }
    
    // Calculate users who don't follow you back (people you follow but who don't follow you)
    const notFollowingBack = parsedFollowing
      .filter(followingUser => 
        !parsedFollowers.some(follower => follower.username === followingUser.username)
      )
      .map(user => convertToUnfollower(user))
    
    // Calculate users who you don't follow back (people who follow you but you don't follow them)
    const youDontFollowBack = parsedFollowers
      .filter(follower => 
        !parsedFollowing.some(following => following.username === follower.username)
      )
      .map(user => convertToUnfollower(user))
    
    return {
      data: instagramData,
      youDontFollowBack,
      notFollowingBack
    }
  } catch (error) {
    console.error('Error parsing Instagram data:', error)
    throw new Error('Failed to parse Instagram data. Please check the file format.')
  }
}

/**
 * Parses a list of Instagram users from the relationships data
 */
function parseUsersList(relationships: InstagramRelationshipEntry[]): InstagramUser[] {
  return relationships
    .filter(entry => entry.string_list_data && entry.string_list_data.length > 0)
    .map(entry => {
      const userData = entry.string_list_data[0]
      
      return {
        username: userData.value,
        fullName: userData.full_name,
        profilePicUrl: userData.profile_picture,
        timestamp: userData.timestamp
      }
    })
    .filter(user => user.username) // Filter out any users with empty usernames
}

/**
 * Converts an InstagramUser to an Unfollower by adding additional fields
 */
function convertToUnfollower(user: InstagramUser): Unfollower {
  return {
    ...user,
    unfollowedTime: formatTimestamp(user.timestamp),
    followDuration: calculateFollowDuration(user.timestamp)
  }
}

/**
 * Formats a timestamp into a readable date string
 */
function formatTimestamp(timestamp?: number): string {
  if (!timestamp) {
    return i18n.global.t('results.card.unknownDate')
  }
  
  // Instagram timestamps are in seconds, not milliseconds
  const date = new Date(timestamp * 1000)
  
  // Ensure we're using the correct locale and format
  const locale = i18n.global.locale.value || 'en'
  console.log(locale)
  return new Intl.DateTimeFormat(locale, {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(date)
}

/**
 * Calculates how long the user was followed based on timestamp
 */
function calculateFollowDuration(timestamp?: number): string {
  if (!timestamp) {
    return i18n.global.t('results.card.unknownDuration');
  }
  
  const now = new Date();
  const followDate = new Date(timestamp * 1000);
  const diffTime = Math.abs(now.getTime() - followDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 1) {
    return i18n.global.t('results.card.lessThanDay');
  }

  if (diffDays < 7) {
    return diffDays === 1 
      ? i18n.global.t('results.card.day')
      : i18n.global.t('results.card.days', { count: diffDays });
  }

  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return weeks === 1 
      ? i18n.global.t('results.card.week')
      : i18n.global.t('results.card.weeks', { count: weeks });
  }

  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return months === 1 
      ? i18n.global.t('results.card.month')
      : i18n.global.t('results.card.months', { count: months });
  }

  const years = Math.floor(diffDays / 365);
  return years === 1 
    ? i18n.global.t('results.card.year')
    : i18n.global.t('results.card.years', { count: years });
}