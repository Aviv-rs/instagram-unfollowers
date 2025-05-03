export interface InstagramUser {
  username: string;
  fullName?: string;
  profilePicUrl?: string;
  timestamp?: number;
}

export interface Unfollower extends InstagramUser {
  unfollowedTime: string;
  followDuration?: string;
}

export interface InstagramData {
  followersCount: number;
  followingCount: number;
  followers: InstagramUser[];
  following: InstagramUser[];
}

export interface ImportChange {
  gainedFollowers: InstagramUser[];
  lostFollowers: InstagramUser[];
  gainedFollowing: InstagramUser[];
  lostFollowing: InstagramUser[];
}

export interface ImportHistoryEntry {
  data: InstagramData;
  timestamp: string;
  changes?: ImportChange;
}

export type FileUploadState = 'idle' | 'uploading' | 'processing' | 'complete' | 'error'

export type UploadFileType = 'followers' | 'following' | 'zip';

export interface ParsedInstagramData {
  data: InstagramData;
  youDontFollowBack: Unfollower[];
  notFollowingBack: Unfollower[];
  changes?: ImportChange;
}

export interface InstagramStringListData {
  href: string;
  value: string;
  timestamp: number;
  full_name?: string;
  profile_picture?: string;
}

export interface InstagramRelationshipEntry {
  title: string;
  media_list_data: any[];
  string_list_data: InstagramStringListData[];
}