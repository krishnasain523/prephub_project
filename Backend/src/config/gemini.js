// Make sure you have node >= 18 for global fetch, otherwise install node-fetch
// npm install node-fetch

const { response } = require('express')

require('dotenv').config()

const GEMINI_API_KEY = process.env.API_KEY

const genratetext = async question => {
  const url =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'

  const body = {
    contents: [
      {
        parts: [
          {
            text: `${question} For the given question, extract only one short heading that clearly describes what the question is about.
`
          }
        ]
      }
    ]
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_API_KEY
      },
      body: JSON.stringify(body)
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Gemini API Error:', data)
      return null
    }

    console.log('Gemini Response:', JSON.stringify(data, null, 2))

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text

    if (!text) {
      console.error('Gemini returned empty response:', data)
      return null
    }
    return text
  } catch (error) {
    console.error('Error calling Gemini API:', error)
  }
}

const genrateanswer = async question => {
  const url =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'

  const body = {
    contents: [
      {
        parts: [
          {
            text: `${question}
`
          }
        ]
      }
    ]
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_API_KEY,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    console.log("Gemini Status:", response.status);

    // Quota exceeded
    if (data?.error?.code === 429) {
      console.error("Gemini quota exceeded");
      return { error: "quota" };
    }

    // Any other API error
    if (!response.ok) {
      console.error("Gemini API Error:", data);
      return { error: "api_error" };
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    // Empty response
    if (!text) {
      console.error("Gemini returned empty response:", data);
      return { error: "empty_response" };
    }

    return text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return { error: "server_error" };
  }
}
module.exports = { genratetext, genrateanswer }
