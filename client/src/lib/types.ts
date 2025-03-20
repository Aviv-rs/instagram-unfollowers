export type FileUploadState = "idle" | "uploading" | "processing" | "complete" | "error";

export interface InstagramUser {
  username: string;
  fullName?: string;
  profilePicUrl?: string;
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
