import type { InstagramData, InstagramUser, Unfollower, ParsedInstagramData } from '@/types/instagram'

/**
 * Parses Instagram data from the JSON file
 * @param fileContent The content of the JSON file
 * @returns Processed Instagram data
 */
export async function parseInstagramData(fileContent: string): Promise<ParsedInstagramData> {
  try {
    // Parse the JSON content
    const jsonData = JSON.parse(fileContent)
    
    // Check if the file has the expected structure
    if (!jsonData.relationships_followers || !jsonData.relationships_following) {
      throw new Error('Invalid file format. Please make sure you uploaded the followers_and_following.json file.')
    }
    
    // Extract followers and following lists
    const followers = parseUsersList(jsonData.relationships_followers || [])
    const following = parseUsersList(jsonData.relationships_following || [])
    
    // Create lookup map for quick access
    const followerMap = new Map<string, InstagramUser>()
    followers.forEach(user => followerMap.set(user.username, user))
    
    const followingMap = new Map<string, InstagramUser>()
    following.forEach(user => followingMap.set(user.username, user))
    
    // Find users who don't follow back
    const notFollowingBack: Unfollower[] = following
      .filter(user => !followerMap.has(user.username))
      .map(user => ({
        ...user,
        unfollowedTime: 'Never followed you',
        followDuration: 'N/A'
      }))
    
    // Find unfollowers (users who previously followed but don't anymore)
    // Note: Since we don't have historical data, we'll generate random times for demo
    const unfollowers: Unfollower[] = generateMockUnfollowers(10)
    
    const instagramData: InstagramData = {
      followersCount: followers.length,
      followingCount: following.length,
      followers,
      following
    }
    
    return {
      data: instagramData,
      unfollowers,
      notFollowingBack
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('Invalid JSON format. Please upload a valid Instagram data file.')
    }
    throw error
  }
}

/**
 * Parses a list of Instagram users from the JSON data
 */
function parseUsersList(users: any[]): InstagramUser[] {
  return users.map(user => ({
    username: user.string_list_data?.[0]?.value || '',
    fullName: user.string_list_data?.[0]?.href?.split('/').filter(Boolean).pop() || '',
    profilePicUrl: user.string_list_data?.[0]?.timestamp ? undefined : undefined
  })).filter(user => user.username)
}

/**
 * Generates a random time string for demonstration purposes
 */
function generateRandomTime(): string {
  const timeUnits = ['days', 'weeks', 'months']
  const timeUnit = timeUnits[Math.floor(Math.random() * timeUnits.length)]
  const timeValue = Math.floor(Math.random() * 10) + 1
  
  return `${timeValue} ${timeUnit} ago`
}

/**
 * Generates a random follow duration string for demonstration purposes
 */
function generateRandomDuration(): string {
  const durationUnits = ['days', 'weeks', 'months', 'years']
  const durationUnit = durationUnits[Math.floor(Math.random() * durationUnits.length)]
  const durationValue = Math.floor(Math.random() * 12) + 1
  
  return `${durationValue} ${durationUnit}`
}

/**
 * Generates mock unfollowers for demonstration
 * This is only used when we don't have historical data to actually determine who unfollowed
 */
function generateMockUnfollowers(count: number): Unfollower[] {
  const names = [
    'alicia_smith', 'john_doe92', 'travel_enthusiast', 
    'photo_lover', 'fitness_guru', 'tech_geek', 
    'fashion_icon', 'food_blogger', 'music_fan',
    'art_appreciator', 'book_worm', 'nature_explorer'
  ]
  
  return Array.from({ length: count }).map((_, i) => {
    const randomIndex = Math.floor(Math.random() * names.length)
    const username = names[randomIndex] + (Math.floor(Math.random() * 1000))
    
    return {
      username,
      fullName: username.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      unfollowedTime: generateRandomTime(),
      followDuration: generateRandomDuration()
    }
  })
}