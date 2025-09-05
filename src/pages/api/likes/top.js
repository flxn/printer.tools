// API endpoint for getting top liked tools

export const prerender = false;

import fs from 'fs/promises';
import path from 'path';

const LIKES_FILE = path.join(process.cwd(), 'data', 'likes.json');

async function loadLikes() {
  try {
    const data = await fs.readFile(LIKES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}

export async function GET({ url }) {
  try {
    const likes = await loadLikes();
    const searchParams = new URL(url).searchParams;
    const limit = parseInt(searchParams.get('limit') || '10');
    
    // Convert to array and sort by count
    const sortedLikes = Object.entries(likes)
      .map(([slug, data]) => ({
        slug,
        count: data.count,
        name: data.name,
        lastUpdated: data.lastUpdated
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
    
    return new Response(JSON.stringify({
      topLiked: sortedLikes,
      totalTools: Object.keys(likes).length
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error loading top liked tools:', error);
    return new Response(JSON.stringify({ error: 'Failed to load top liked tools' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}