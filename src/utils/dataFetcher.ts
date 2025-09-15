import Papa from 'papaparse';
import matter from 'gray-matter';
import { BASE_PATH } from './constants';

// Type definitions
export interface Activity {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  features: string[];
  status: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  date: string;
  year: string;
  location: string;
  description: string;
  participants: string[];
  image_url: string;
  status: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Member {
  id: string;
  name: string;
  slug: string;
  role: string;
  type: 'leader' | 'member' | 'advisor';
  specialty?: string;
  affiliation?: string;
  twitter?: string;
  github?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  website?: string;
  email?: string;
  bio: string;
  image_url: string;
  status: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Sponsor {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo_url: string;
  website_url?: string;
  category: string;
  status: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface ContentDetail {
  id: string;
  content: string;
  data: {
    [key: string]: any;
  };
}

// CSV parsing utility
function parseCSVData<T>(csvText: string): T[] {
  const parsed = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(),
  });

  return parsed.data.map((row: any) => {
    const processedRow = { ...row };

    // Process pipe-separated values
    ['features', 'participants', 'tags'].forEach(field => {
      if (processedRow[field] && typeof processedRow[field] === 'string') {
        processedRow[field] = processedRow[field]
          .split('|')
          .map((item: string) => item.trim())
          .filter((item: string) => item.length > 0);
      }
    });

    // Process boolean values
    ['featured'].forEach(field => {
      if (processedRow[field]) {
        processedRow[field] = processedRow[field].toLowerCase() === 'true';
      }
    });

    // Process numeric values
    ['order'].forEach(field => {
      if (processedRow[field]) {
        processedRow[field] = parseInt(processedRow[field], 10);
      }
    });

    return processedRow;
  }) as T[];
}

// Generic fetch function
async function fetchData(url: string): Promise<string> {
  const target = url.startsWith('/') ? `${BASE_PATH}${url}` : url;
  try {
    const response = await fetch(target);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${target}: ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    console.error(`Error fetching data from ${target}:`, error);
    throw error;
  }
}

// CSV data fetchers
export async function fetchActivities(): Promise<Activity[]> {
  const csvText = await fetchData('/data/activities/activities.csv');
  return parseCSVData<Activity>(csvText);
}

export async function fetchEvents(): Promise<Event[]> {
  const csvText = await fetchData('/data/events/events.csv');
  return parseCSVData<Event>(csvText);
}

export async function fetchMembers(): Promise<Member[]> {
  const csvText = await fetchData('/data/team/members.csv');
  return parseCSVData<Member>(csvText);
}

export async function fetchSponsors(): Promise<Sponsor[]> {
  const csvText = await fetchData('/data/sponsors/sponsors.csv');
  return parseCSVData<Sponsor>(csvText);
}

// Markdown detail fetchers - 新しいディレクトリ構造に対応
export async function fetchActivityDetail(slug: string): Promise<ContentDetail> {
  const markdownText = await fetchData(`/data/activities/items/${slug}/index.md`);
  const parsed = matter(markdownText);

  return {
    id: slug,
    content: parsed.content,
    data: parsed.data,
  };
}

export async function fetchEventDetail(slug: string): Promise<ContentDetail> {
  const markdownText = await fetchData(`/data/events/items/${slug}/index.md`);
  const parsed = matter(markdownText);

  return {
    id: slug,
    content: parsed.content,
    data: parsed.data,
  };
}

export async function fetchMemberProfile(slug: string): Promise<ContentDetail> {
  const markdownText = await fetchData(`/data/team/items/${slug}/index.md`);
  const parsed = matter(markdownText);

  return {
    id: slug,
    content: parsed.content,
    data: parsed.data,
  };
}

// Helper functions for filtering and sorting
export function filterActiveItems<T extends { status: string }>(items: T[]): T[] {
  return items.filter(item => item.status === 'active' || item.status === 'published');
}

export function sortByOrder<T extends { order: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.order - b.order);
}

export function sortByDate<T extends { date: string }>(items: T[], descending = true): T[] {
  return [...items].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return descending ? dateB - dateA : dateA - dateB;
  });
}

export function groupEventsByYear(events: Event[]): { year: string; items: Event[] }[] {
  const grouped = events.reduce((acc, event) => {
    const year = event.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(event);
    return acc;
  }, {} as Record<string, Event[]>);

  return Object.keys(grouped)
    .sort((a, b) => parseInt(b) - parseInt(a)) // Sort years descending
    .map(year => ({
      year,
      items: sortByDate(grouped[year]),
    }));
}