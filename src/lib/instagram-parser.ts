import { 
  InstagramData, 
  InstagramUser, 
  Unfollower, 
  ParsedInstagramData,
  InstagramRelationshipEntry,
  ImportChange
} from '../types/instagram'
import i18n from '../i18n'
import JSZip from 'jszip'
import { computed } from 'vue'

/**
 * Calculates changes between two sets of users
 */
function calculateUserChanges(oldUsers: InstagramUser[], newUsers: InstagramUser[]): {
  gained: InstagramUser[];
  lost: InstagramUser[];
} {
  const oldUsernames = new Set(oldUsers.map(user => user.username))
  const newUsernames = new Set(newUsers.map(user => user.username))
  
  const gained = newUsers.filter(user => !oldUsernames.has(user.username))
  const lost = oldUsers.filter(user => !newUsernames.has(user.username))
  
  return { gained, lost }
}

/**
 * Parses Instagram data from separate followers and following JSON files
 * @param followersContent The content of the followers JSON file
 * @param followingContent The content of the following JSON file
 * @param existingData Optional existing data to merge with
 * @returns Processed Instagram data
 */
export async function parseInstagramData(
  followersContent: string, 
  followingContent: string,
  existingData?: InstagramData
): Promise<ParsedInstagramData> {
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
    
    // Calculate changes if we have existing data
    let changes: ImportChange | undefined
    
    if (existingData) {
      // Calculate changes before replacing
      const followerChanges = calculateUserChanges(existingData.followers, parsedFollowers)
      const followingChanges = calculateUserChanges(existingData.following, parsedFollowing)
      
      changes = {
        gainedFollowers: followerChanges.gained,
        lostFollowers: followerChanges.lost,
        gainedFollowing: followingChanges.gained,
        lostFollowing: followingChanges.lost
      }
    }
    
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
    
    // Calculate users you don't follow back (people who follow you but you don't follow)
    const youDontFollowBack = parsedFollowers
      .filter(follower => 
        !parsedFollowing.some(followingUser => followingUser.username === follower.username)
      )
      .map(user => convertToUnfollower(user))
    
    return {
      data: instagramData,
      notFollowingBack,
      youDontFollowBack,
      changes
    }
  } catch (err) {
    console.error('Error parsing Instagram data:', err)
    throw new Error('Failed to parse Instagram data')
  }
}

/**
 * Merges two arrays of users, keeping the most recent data for each user
 */
function mergeUsers(existingUsers: InstagramUser[], newUsers: InstagramUser[]): InstagramUser[] {
  const userMap = new Map<string, InstagramUser>()
  
  // Add existing users to map
  existingUsers.forEach(user => {
    userMap.set(user.username, user)
  })
  
  // Update or add new users
  newUsers.forEach(user => {
    const existingUser = userMap.get(user.username)
    
    // If user doesn't exist in map or new user has more recent data, update the map
    if (!existingUser || (user.timestamp && existingUser.timestamp && user.timestamp > existingUser.timestamp)) {
      userMap.set(user.username, user)
    }
  })
  
  return Array.from(userMap.values())
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
    unfollowedTime: user.timestamp,
    followDuration: user.timestamp
  }
}

/**
 * Formats a timestamp into a readable date string
 */
export function formatTimestamp(timestamp?: number): string {
  if (!timestamp) {
    return i18n.global.t('results.card.unknownDate')
  }
  
  // Instagram timestamps are in seconds, not milliseconds
  const date = new Date(timestamp * 1000)
  
  // Create a computed property for the formatted date that updates when locale changes
  const formattedDate = computed(() => {
    const locale = i18n.global.locale.value || 'en'
    return new Intl.DateTimeFormat(locale, {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date)
  })
  
  return formattedDate.value
}

/**
 * Calculates how long the user was followed based on timestamp
 */
export function calculateFollowDuration(timestamp?: number): string {
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

/**
 * Processes a ZIP file containing Instagram data
 * @param zipFile The ZIP file to process
 * @returns The contents of the followers and following JSON files
 */
export async function processZipFile(zipFile: File): Promise<{ followersContent: string, followingContent: string }> {
  try {
    const zip = new JSZip()
    const zipContent = await zip.loadAsync(zipFile)
    
    // Find the followers and following files
    const followersFile = Object.values(zipContent.files).find(file => 
      file.name.includes('followers_1.json')
    )
    
    const followingFile = Object.values(zipContent.files).find(file => 
      file.name.includes('following.json')
    )
    
    if (!followersFile || !followingFile) {
      throw new Error('Could not find required JSON files in the ZIP archive')
    }
    
    // Read the file contents
    const followersContent = await followersFile.async('string')
    const followingContent = await followingFile.async('string')
    
    return { followersContent, followingContent }
  } catch (err) {
    console.error('Error processing ZIP file:', err)
    throw new Error('Failed to process ZIP file')
  }
}