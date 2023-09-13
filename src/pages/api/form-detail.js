import axios from "axios";
import nookies, { setCookie } from "nookies";

export default async function handler(req, res) {
  try {
    const cookies = nookies.get({ req });
    let {name,age,phone,location,email,email_status} = req?.body;

    const userIdCookie = cookies["user"];
    let userToken;
    if (userIdCookie) {
      let user = JSON?.parse(userIdCookie);
      userToken = user?.auth?.slice(0, -3);
      


      // Destroy the "user" cookie by setting it to an empty string and providing options
      nookies.destroy({ res }, "user", { path: "/" });

      nookies.set({ res }, 'user', `{\"auth\":\"${user?.auth}\",\"profile_status\":\"complete\", \"name\":\"${name}\",\"email\":\"${email}\",\"email_status\":\"${email_status}\", \"age\":\"${age}\", \"phone\":\"${phone}\", \"location\":\"${location}\"}`, {
        path: '/',    // Cookie path
      });
    }

    const responseVal = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_API_URL}update-profile`,
      data: req.body, // No need to stringify the request body
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Connection": "Keep-Alive",
        "Content-Type": "application/json",
        // Remove unnecessary headers
      },
    });

    if (responseVal.status === 200) {
      const serverMsg = responseVal.data.msg;
      res.status(200).json({
        message: [serverMsg],
      });
    } else {
      res.status(responseVal.status).json({
        message: [responseVal.statusText],
      });
    }
  } catch (error) {
    res.status(error.response?.status ?? 500).json({
      message: [error.response?.statusText ?? "Internal Server Error"],
    });
  }
}
