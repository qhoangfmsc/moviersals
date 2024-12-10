import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // let isLoggedIn = req.cookies.get('isLoggedIn');

  // // console.log("isLoggedIn: ", isLoggedIn + ", ", new Date())
  // console.log("cookie: ", req.cookies)
  // const nonPermissionArray = ['/profile', '/favourite', '/admin', '/order/history'];

  // if (nonPermissionArray.some((path) => req.nextUrl.pathname.startsWith(path))) {
  //   if (!isLoggedIn) {
  //     const url = req.nextUrl.clone();
  //     url.pathname = '/login'; // Redirect to login page
  //     url.searchParams.set('next', req.nextUrl.pathname); // Optionally include the current path
  //     return NextResponse.redirect(url);
  //   }
  // }

  return NextResponse.next(); 
}