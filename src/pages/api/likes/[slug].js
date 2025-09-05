// API endpoint for handling likes
// This stores data in a simple JSON file - for production, consider using a database

export const prerender = false;

import fs from 'fs/promises';
import path from 'path';

const LIKES_FILE = path.join(process.cwd(), 'data', 'likes.json');

// Ensure the data directory exists
async function ensureDataDir() {
  const dataDir = path.dirname(LIKES_FILE);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Load likes data
async function loadLikes() {
  try {
    await ensureDataDir();
    const data = await fs.readFile(LIKES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}

// Save likes data
async function saveLikes(likes) {
  await ensureDataDir();
  await fs.writeFile(LIKES_FILE, JSON.stringify(likes, null, 2));
}

export async function GET({ params }) {
  const { slug } = params;
  
  try {
    const likes = await loadLikes();
    const count = likes[slug]?.count || 0;
    
    return new Response(JSON.stringify({ count }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error loading likes:', error);
    return new Response(JSON.stringify({ error: 'Failed to load likes' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}

export async function POST({ params, request }) {
  const { slug } = params;
  
  try {
    const body = await request.json();
    const { action, resourceName } = body;
    
    const likes = await loadLikes();
    
    if (!likes[slug]) {
      likes[slug] = {
        count: 0,
        name: resourceName,
        lastUpdated: new Date().toISOString(),
      };
    }
    
    if (action === 'like') {
      likes[slug].count += 1;
    } else if (action === 'unlike') {
      likes[slug].count = Math.max(0, likes[slug].count - 1);
    }
    
    likes[slug].lastUpdated = new Date().toISOString();
    
    await saveLikes(likes);
    
    return new Response(JSON.stringify({ 
      count: likes[slug].count,
      message: `Successfully ${action}d ${resourceName}` 
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error updating likes:', error);
    return new Response(JSON.stringify({ error: 'Failed to update likes' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}