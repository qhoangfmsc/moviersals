// import { NextRequest, NextResponse } from 'next/server';
// import { requestApi } from '@/lib/requestApi';

// export async function POST(req: NextRequest) {
//   try {
//     const { videoName, folderName } = await req.json();

//     const body = { videoName, folderName };
//     const url = "/api/internal/cloudinary/getsignature";
//     const data = await requestApi(url, body);
//     const signature = data.signature;
//     console.log("signature: ", data);
//     return NextResponse.json({ signature });
//   } catch (error) {
//     console.error("Error generating Cloudinary signature:", error);
//     return NextResponse.json({ error: "Failed to generate signature" }, { status: 500 });
//   }
// }


import { v2 as cloudinary } from "cloudinary";
 
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
 
export async function POST(request: Request) {
  const body = await request.json();
  const { paramsToSign } = body;
 
  const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET);
  
  return Response.json({ signature });
}