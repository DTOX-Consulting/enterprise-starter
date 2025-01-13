export type ImageConfig = {
  name: string;
  width: number;
  height: number;
  directory: string;
  description: string;
};

export const SOCIAL_CONFIGS: ImageConfig[] = [
  // Facebook
  {
    name: 'facebook-profile',
    width: 170,
    height: 170,
    directory: 'facebook',
    description: 'Profile Picture'
  },
  {
    name: 'facebook-cover',
    width: 851,
    height: 315,
    directory: 'facebook',
    description: 'Cover Photo'
  },
  {
    name: 'facebook-post',
    width: 1200,
    height: 630,
    directory: 'facebook',
    description: 'Shared Post'
  },
  {
    name: 'facebook-story',
    width: 1080,
    height: 1920,
    directory: 'facebook',
    description: 'Story'
  },
  {
    name: 'facebook-event',
    width: 1920,
    height: 1080,
    directory: 'facebook',
    description: 'Event Cover'
  },

  // Instagram
  {
    name: 'instagram-profile',
    width: 320,
    height: 320,
    directory: 'instagram',
    description: 'Profile Picture'
  },
  {
    name: 'instagram-post-square',
    width: 1080,
    height: 1080,
    directory: 'instagram',
    description: 'Square Post'
  },
  {
    name: 'instagram-post-portrait',
    width: 1080,
    height: 1350,
    directory: 'instagram',
    description: 'Portrait Post'
  },
  {
    name: 'instagram-post-landscape',
    width: 1080,
    height: 608,
    directory: 'instagram',
    description: 'Landscape Post'
  },
  {
    name: 'instagram-story',
    width: 1080,
    height: 1920,
    directory: 'instagram',
    description: 'Story'
  },
  {
    name: 'instagram-reels',
    width: 1080,
    height: 1920,
    directory: 'instagram',
    description: 'Reels'
  },

  // Twitter
  {
    name: 'twitter-profile',
    width: 400,
    height: 400,
    directory: 'twitter',
    description: 'Profile Picture'
  },
  {
    name: 'twitter-header',
    width: 1500,
    height: 500,
    directory: 'twitter',
    description: 'Header Photo'
  },
  {
    name: 'twitter-post',
    width: 1600,
    height: 900,
    directory: 'twitter',
    description: 'Post with Image'
  },

  // LinkedIn
  {
    name: 'linkedin-profile',
    width: 400,
    height: 400,
    directory: 'linkedin',
    description: 'Profile Picture'
  },
  {
    name: 'linkedin-cover',
    width: 1584,
    height: 396,
    directory: 'linkedin',
    description: 'Cover Photo'
  },
  {
    name: 'linkedin-post',
    width: 1200,
    height: 627,
    directory: 'linkedin',
    description: 'Shared Post'
  },
  {
    name: 'linkedin-company-logo',
    width: 300,
    height: 300,
    directory: 'linkedin',
    description: 'Company Logo'
  },

  // YouTube
  {
    name: 'youtube-profile',
    width: 800,
    height: 800,
    directory: 'youtube',
    description: 'Channel Picture'
  },
  {
    name: 'youtube-cover',
    width: 2560,
    height: 1440,
    directory: 'youtube',
    description: 'Channel Cover'
  },
  {
    name: 'youtube-thumbnail',
    width: 1280,
    height: 720,
    directory: 'youtube',
    description: 'Video Thumbnail'
  },

  // Pinterest
  {
    name: 'pinterest-profile',
    width: 165,
    height: 165,
    directory: 'pinterest',
    description: 'Profile Picture'
  },
  { name: 'pinterest-pin', width: 1000, height: 1500, directory: 'pinterest', description: 'Pin' },
  {
    name: 'pinterest-board-cover',
    width: 800,
    height: 800,
    directory: 'pinterest',
    description: 'Board Cover'
  },

  // TikTok
  {
    name: 'tiktok-profile',
    width: 200,
    height: 200,
    directory: 'tiktok',
    description: 'Profile Picture'
  },
  { name: 'tiktok-video', width: 1080, height: 1920, directory: 'tiktok', description: 'Video' },

  // Website/General
  { name: 'favicon-32', width: 32, height: 32, directory: 'favicon', description: 'Favicon Large' },
  { name: 'favicon-16', width: 16, height: 16, directory: 'favicon', description: 'Favicon Small' },
  {
    name: 'apple-touch-icon',
    width: 180,
    height: 180,
    directory: 'favicon',
    description: 'Apple Touch Icon'
  },
  { name: 'og-default', width: 1200, height: 630, directory: 'og', description: 'Default OG Image' }
];
