import React from "react";
import { auth } from "@/auth";
export default async function UserInfo() {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div>
      <p>{JSON.stringify(session.user)}</p>
      <img src={session.user.image || ""} alt='user avatar' />
    </div>
  );
}
