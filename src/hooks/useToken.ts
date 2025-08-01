import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export const useToken = async (req: NextRequest) => {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  return token; 
};
