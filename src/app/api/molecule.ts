// src/app/api/molecule.ts

import axios from 'axios';

export async function POST(req: Request) {
  const API_KEY = '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'; // Replace with your NVIDIA API key
  const invokeUrl = 'https://health.api.nvidia.com/v1/biology/nvidia/molmim/generate';

  try {
    const body = await req.json(); // Parse the JSON body from the request

    const response = await axios.post(invokeUrl, body, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    return new Response(JSON.stringify(response.data), { status: 200 }); // Forward the response back to the client
  } catch (error) {
    console.error('Error generating molecules:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate molecules' }), { status: 500 });
  }
}
