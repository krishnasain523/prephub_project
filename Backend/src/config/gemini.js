// Make sure you have node >= 18 for global fetch, otherwise install node-fetch
// npm install node-fetch

const { response } = require('express');

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
            text:`${question} For the given question, extract only one short heading that clearly describes what the question is about.
`
          }
        ]
      }
    ]
  };

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
    // console.log('Gemini Response:',data.candidates[0].content.parts[0].text)
    const text= data?.candidates[0]?.content.parts[0]?.text;
     if(!text)
    {
      console.error("grmini empty response");
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
            text:`${question}
`
          }
        ]
      }
    ]
  };

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
    
       if(data?.error?.code===429)
       {
        console.error("gemini quoto exceed");
        return{error:"quota"}
       }
    // console.log('Gemini Response:',data.candidates[0].content.parts[0].text)
    const text= data?.candidates[0]?.content.parts[0]?.text;
    if(!text)
    {
      console.error("grmini empty response");
      return null
    }
    return text
  } catch (error) {
    console.error('Error calling Gemini API:', error)
  }
}
const genrateimage=async(resultext)=>
{
  const url="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent"
 const body = {
    contents: [
      {
        parts: [
          {
            text: ` create a flowchart type image using this details:\n${resultext}`
          }
        ]
      }
    ]
  };

  try{
    const response=await fetch(`${url}?key=${GEMINI_API_KEY}`,{
      method:"POST",
      headers:{
        'content-type':"application/json",
      }
      ,
       body: JSON.stringify(body)
    })
    const image=await response.json();
    console.log(image);
    
    return image;
  }catch (error) {
    console.error('Error calling Gemini API:', error)
  }
}


// Example usage
module.exports = {genratetext,genrateimage,genrateanswer}
