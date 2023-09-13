import { NextResponse } from "next/server";
import { parseCookies } from "nookies";
import { getToken } from "next-auth/jwt";

export default async function middleware(req) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  try {
    const userIpResponse = await fetch(
      "https://json.geoiplookup.io/",
      requestOptions
    );
    const userIpData = await userIpResponse?.json();
    const userCountry = userIpData?.country_name;
    // console.log(userCountry)
    // const token = req.cookies.get("token");
    let user = req?.cookies.get("user")?.value;
    console.log({ user });
    if (user) {
      user = JSON?.parse(user);
      console.log({ user });
    }
    let userDetail = {
      userStatus: user?.profile_status ?? "",
      userToken: user?.auth,
      userCountry: userCountry,
    };
    console.log("Cookie Result");
    console.log({ userDetail });

    // const sessions = await getToken({
    //   req,
    //   secret: process.env.JWT_SECRET,
    // });
    // console.log("asd " + sessions);

    if (userCountry === 'Pakistans' && req.url !== '/notallow') {
      return NextResponse.rewrite(new URL('/notallow', req.url))
    }
    if (userDetail?.userStatus != "" &&  userDetail?.userStatus == "incomplete") {
      return NextResponse.rewrite(new URL('/profile', req.url));
    }

    // Your other middleware logic here...
  } catch (error) {
    console.error("Error fetching user IP data:", error);
  }

  // Allow the request to continue processing
  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next|static|public|favicon.ico).*)",
};
