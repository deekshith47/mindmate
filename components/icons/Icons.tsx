import React from 'react';

// Props for all icons
interface IconProps {
  className?: string;
}

export const ChatBubbleIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

export const ChartIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

export const BookOpenIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

export const HeartIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 20.25l-7.364-7.368a4.5 4.5 0 010-6.364z" />
  </svg>
);

export const CalendarIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

export const AcademicCapIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20M1 12v7a2 2 0 002 2h18a2 2 0 002-2v-7" />
    </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const ArrowUpIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/>
    </svg>
);

export const MicrophoneIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
    </svg>
);

export const WaveformIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8v8m4-10v12m4-14v16m4-12v8m4-6v4" />
    </svg>
);

export const MusicNoteIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-13c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 6l12 3" />
    </svg>
);

export const LogoIcon: React.FC<IconProps> = (props) => (
    <svg {...props} viewBox="0 0 84 82" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="brain-gradient-logo" x1="42" y1="0" x2="42" y2="82" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6EE7B7"/>
          <stop offset="0.5" stopColor="#3B82F6"/>
          <stop offset="1" stopColor="#2563EB"/>
        </linearGradient>
      </defs>
      <path d="M37.8 7.5C36.8 4 33.5 1.5 29.5 1.5C24.8 1.5 20.9 5.3 20.9 10C20.9 11.1 21.1 12.1 21.4 13C19.7 12.4 17.9 12.3 16.2 12.8C13.2 13.7 11.2 16.5 11.2 19.7C11.2 23.4 14.1 26.3 17.8 26.3C18.1 26.3 18.4 26.3 18.8 26.2C19.1 28.1 20.2 29.8 21.7 30.9C20.5 32.3 19.8 34 19.8 35.9C19.8 39.9 23.1 43.2 27.1 43.2C27.8 43.2 28.4 43.1 29.1 42.9C30 45.9 32.5 48.1 35.5 48.6C35.1 50.7 34.7 52.9 34.7 55.2C34.7 64.4 41.5 71.7 50.4 72.7V80.5H55.4V72.7C64.3 71.7 71.1 64.4 71.1 55.2C71.1 52.9 70.8 50.7 70.3 48.6C73.4 48.1 75.8 45.9 76.8 42.9C77.4 43.1 78.1 43.2 78.7 43.2C82.7 43.2 86 39.9 86 35.9C86 34 85.3 32.3 84.1 30.9C85.6 29.8 86.7 28.1 87 26.2C87.4 26.3 87.7 26.3 88.1 26.3C91.7 26.3 94.6 23.4 94.6 19.7C94.6 16.5 92.6 13.7 89.7 12.8C88 12.3 86.1 12.4 84.5 13C84.8 12.1 85 11.1 85 10C85 5.3 81.1 1.5 76.4 1.5C72.4 1.5 69.1 4.1 68.3 7.6C67 6.4 65.2 5.6 63.2 5.6C58.9 5.6 55.4 9.1 55.4 13.4C55.4 17.5 58.1 20.6 62 21.1C61.5 23.2 59.9 24.9 58.1 25.8C58.3 26.9 58.5 28.1 58.5 29.4C58.5 32.8 57.2 35.8 55.1 38.1C56.7 39.3 57.9 40.8 58.6 42.6C56.9 43.3 55.4 44.3 54.1 45.6C53.2 44.4 52.1 43.4 50.7 42.6C50.6 40.5 49.6 38.6 48.1 37.3C45.9 39.6 44.8 42.8 44.8 46.1C44.8 46.7 44.9 47.4 45 48C42.8 47.4 40.9 46.1 39.7 44.2C40.4 42.3 40.7 40.3 40.7 38.2C40.7 35.4 39.9 32.9 38.4 30.8C36.8 29.7 35.7 28 35.4 26.1C37.3 24.7 38.6 22.6 38.9 20.3C39.4 19.3 39.7 18.3 39.7 17.2C39.7 14.7 38.5 12.4 36.5 11.3C34.8 13.5 32.2 15 29.3 15C27 15 24.8 13.9 23.3 12.3C24.5 11 25.4 9.4 25.9 7.7C27.5 8 29 9.3 29.5 11C32.1 10.8 34.3 8.9 35 6.5C33.2 5.5 31.1 5.4 29.4 6.4C29 4.5 27.3 3.1 25.2 3.1C24 3.1 22.8 3.7 22 4.5C23.1 -0.5 28.4 -2.8 35 -2.8C41.5 -2.8 46.9 -0.5 47.9 4.5C47.1 3.7 46 3.1 44.7 3.1C42.6 3.1 40.9 4.5 40.5 6.4C38.8 5.4 36.7 5.5 35 6.5C35.6 8.9 37.8 10.8 40.5 11C40.9 9.3 42.4 8 44.1 7.7C44.5 9.4 45.5 11 46.7 12.3C45.1 13.9 43 15 40.6 15C37.7 15 35.2 13.5 33.5 11.3C31.5 12.4 30.2 14.7 30.2 17.2C30.2 18.3 30.5 19.3 31 20.3C31.3 22.6 32.6 24.7 34.5 26.1C34.2 28 33.1 29.7 31.6 30.8C30.1 32.9 29.3 35.4 29.3 38.2C29.3 40.3 29.5 42.3 30.2 44.2C29 46.1 27.1 47.4 25 48C25 47.4 25.1 46.7 25.1 46.1C25.1 42.8 24 39.6 21.8 37.3C20.3 38.6 19.3 40.5 19.2 42.6C17.9 43.4 16.7 44.4 15.8 45.6C14.5 44.3 13 43.3 11.3 42.6C12 40.8 12.9 39.3 14.4 38.1C12.3 35.8 11 32.8 11 29.4C11 28.1 11.2 26.9 11.5 25.8C9.6 24.9 8 23.2 7.5 21.1C11.5 21.6 14.1 24.7 14.1 28.8C14.1 30.5 13.5 32.1 12.5 33.3C13.6 34.9 14.1 36.8 14.1 38.9C14.1 42.6 11.7 45.7 8.3 46.7C12.9 52.6 20.6 56.6 29.5 56.6C30.3 56.6 31.2 56.5 32 56.4C31.5 54.2 31.2 51.9 31.2 49.6C31.2 45.8 32.2 42.3 33.9 39.2C35.8 40.8 38.2 41.8 40.9 41.8C44.7 41.8 48.1 39.6 49.6 36.4C51.1 39.6 54.5 41.8 58.4 41.8C61 41.8 63.4 40.8 65.3 39.2C67 42.3 68 45.8 68 49.6C68 51.9 67.7 54.2 67.2 56.4C68.1 56.5 68.9 56.6 69.8 56.6C78.6 56.6 86.3 52.6 90.9 46.7C87.5 45.7 85.1 42.6 85.1 38.9C85.1 36.8 85.7 34.9 86.7 33.3C85.7 32.1 85.1 30.5 85.1 28.8C85.1 24.7 87.8 21.6 91.7 21.1C91.2 19 89.6 17.3 87.8 16.4C87.5 15.2 87.3 14.1 87.3 12.8C87.3 9.4 88.6 6.3 90.7 4.1C89.1 2.9 87.9 1.5 87.2 0.3C89 -0.5 91 -0.5 92.7 0.4C93.1 2.2 94.8 3.6 96.9 3.6C98.2 3.6 99.3 3 100.1 2.2C99.1 -0.7 94.6 -2.8 90.7 -2.8C87.2 -2.8 84.1 -1.7 81.8 0.2C81 1.1 79.9 1.6 78.6 1.6C76.6 1.6 74.8 0.2 74.4 -1.6C72.7 -2.6 70.7 -2.5 69 -1.8C68.3 0 66.4 1.2 64.3 1.2C63 1.2 61.9 0.7 61.1 -0.2C65 -0.7 67.6 2.4 67.6 6.5C67.6 10.8 64.1 14.3 59.8 14.3C57.5 14.3 55.3 13.2 53.8 11.7C52.6 13 51.6 14.6 51.1 16.4C52.8 16.7 54.3 18 54.8 19.7C57.4 19.5 59.6 17.6 60.2 15.1C62 14.1 64.1 14.1 65.8 15C66.2 16.9 67.9 18.2 70 18.2C71.3 18.2 72.4 17.7 73.2 16.9C72.2 21.9 67.6 25.3 61.1 25.3C54.6 25.3 49.2 21.9 48.2 16.9C49 17.7 50.1 18.2 51.4 18.2C53.4 18.2 55.2 16.9 55.6 15C57.3 14.1 59.4 14.1 61.1 15.1C60.5 17.6 58.3 19.5 55.6 19.7C55.2 18 53.7 16.7 52 16.4C51.4 14.6 50.5 13 49.3 11.7C47.8 13.2 45.6 14.3 43.2 14.3C38.9 14.3 35.5 10.8 35.5 6.5C35.5 2.4 38.1 -0.7 42 -1.2C41.2 -0.3 40.1 0.2 38.8 0.2C36.8 0.2 35 -1.2 34.6 -3C32.9 -2.1 30.9 -2.1 29.2 -2.8C28.5 -1.1 26.6 0.3 24.5 0.3C23.3 0.3 22.1 -0.3 21.3 -1.1C17.5 -0.6 14.9 2.5 14.9 6.5C14.9 8.2 15.4 9.8 16.4 11.1C15.4 12.3 14.9 13.8 14.9 15.5C14.9 18.4 16.9 20.9 19.5 21.7C19.4 22.4 19.3 23.1 19.3 23.8C19.3 27 20.3 29.9 22 32.4C23.4 31.1 25 30.1 26.8 29.5C26.2 27.4 26.4 25.1 27.4 23.2C28.5 25.1 30 26.6 31.9 27.5C31.3 29.2 30.9 31.2 30.9 33.2C30.9 37.5 33.7 41.1 37.6 41.7C37.1 43.8 35.5 45.5 33.6 46.4C36.1 50.4 40.8 53 46.1 53C49.1 53 51.9 52.2 54.4 51C52.7 49.9 51.3 48.5 50.4 46.7C52.1 46 53.6 45 54.8 43.7C55.7 44.9 56.9 45.9 58.3 46.7C58.4 48.8 59.4 50.7 60.8 52C63.1 49.7 64.2 46.5 64.2 43.2C64.2 42.6 64.1 41.9 64 41.3C66.1 41.9 68 43.2 69.3 45.1C68.6 47 68.3 49.1 68.3 51.2C68.3 53.9 69.1 56.5 70.6 58.6C72.2 59.7 73.2 61.3 73.6 63.2C71.7 64.6 70.3 66.7 70.1 69.1C69.6 70 69.2 71.1 69.2 72.2C69.2 74.7 70.5 76.9 72.5 78.1C74.2 75.8 76.6 74.4 79.5 74.4C81.9 74.4 84.1 75.4 85.6 77" 
        stroke="#0F172A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="url(#brain-gradient-logo)"/>
    </svg>
);

// FIX: Add missing GoogleIcon component.
export const GoogleIcon: React.FC<IconProps> = (props) => (
  <svg {...props} viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
    <path d="M1 1h22v22H1z" fill="none" />
  </svg>
);

export const BadgeCheckIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
);

export const FireIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.657 7.343A8 8 0 0117.657 18.657z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
    </svg>
);

export const PlusIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
);

export const ExternalLinkIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);

export const ThumbsUpIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.085a2 2 0 00-1.736.97l-2.714 4.224a2 2 0 01-1.458.97h-1.05a2 2 0 00-2 2v2a2 2 0 002 2h1.536a2 2 0 011.458.97l2.714 4.224a2 2 0 001.736.97h.085a2 2 0 002-2v-5" />
    </svg>
);

export const ThumbsDownIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.738 3h4.017c.163 0 .326.02.485.06L17 4m-7 10v5a2 2 0 002 2h.085a2 2 0 001.736-.97l2.714-4.224a2 2 0 011.458-.97h1.05a2 2 0 002-2v-2a2 2 0 00-2-2h-1.536a2 2 0 01-1.458-.97l-2.714-4.224A2 2 0 0012.085 3H12a2 2 0 00-2 2v5" />
    </svg>
);

export const ThinkingIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 21.75l-.648-1.188a2.25 2.25 0 00-1.423-1.423L13.25 18.75l1.188-.648a2.25 2.25 0 001.423-1.423L16.25 15l.648 1.188a2.25 2.25 0 001.423 1.423L19.5 18.75l-1.188.648a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
);

export const SpinnerIcon: React.FC<IconProps> = (props) => (
    <svg {...props} className={`animate-spin ${props.className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

export const FaceSmileIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9 9.75h.008v.008H9V9.75zm6 0h.008v.008H15V9.75z" />
    </svg>
);

export const CameraIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);