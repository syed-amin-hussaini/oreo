// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const requestData = req.body;

    // Process the requestData as needed
  console.log("Received data:", requestData);
  
  res.status(200).json({ name: requestData })
}
