import axios from "axios";
import { useEffect } from "react"; // Add this line
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { setCookie } from 'nookies';

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const nextAuthOptions = (req, res) => {
  return {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),
      FacebookProvider({
        clientId: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        scope:"email",
      }),
    ],
    // pages: {
    //   signIn: "/login",
    // },
    // debug: process.env.NODE_ENV === "development",
    session: {
      strategy: "jwt",
    },
    secret: process.env.JWT_SECRET,
    callbacks: {
      async signIn(user, account, profile) {
        console.log({user})
        try {
          const apiUrl =  `${process.env.NEXT_PUBLIC_API_URL}verify-user`;
          const requestData = {
            id: user?.user?.id,
            name: user?.user?.name,
            image: user?.user?.image,
            email: user?.user?.email,
            source: user?.account?.provider,
          };

          console.log({ requestData });
          const response = await axios.post(apiUrl, requestData);
          let auth = response?.data?.token+makeid(3);
          let profile_status = response?.data?.profile_status;
          let userDetail = response?.data?.data;
          // console.log({userDetail})

          // Use the useEffect hook to set the cookie on the client side
          // useEffect(() => {
            // setCookie({ res }, 'user', `{\"token\":\"${token}\",\"profile_status\":\"${profile_status}\"}` , {
            setCookie({ res }, 'user', `{\"auth\":\"${auth}\",\"profile_status\":\"${profile_status}\", \"name\":\"${userDetail?.name}\",\"email_status\":\"${userDetail?.email_status}\",\"email\":\"${userDetail?.email}\", \"age\":\"${userDetail?.age ?? ""}\", \"phone\":\"${userDetail?.phone ?? ""}\", \"location\":\"${userDetail?.location ?? ""}\"}`, {
              maxAge: 3600, // Cookie expiration time in seconds (e.g., 1 hour)
              path: '/',    // Cookie path
            });

          console.log("Third-party API response:", response?.data);
        } catch (error) {
          console.error("API Error:", error);
        }
        return true;
      },
      // async jwt({ token, user, account }) {
      //   // console.log("jwt");
      //   // console.log({ token });

      //   if (token || user) {
      //     token.userRole = "admin";
      //     return { ...token };
      //   }
      // },
      async jwt({ token, user, account, profile, isNewUser }) {
        return token
      },
      async redirect({url, baseUrl}) {
        // console.log('url', url);
        // console.log('baseUrl', baseUrl);
        
        return url.startsWith(baseUrl) ? "/dashboard" : baseUrl + '/dashboard';
      }
    },
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res) => {
  return NextAuth(req, res, nextAuthOptions(req, res));
};
