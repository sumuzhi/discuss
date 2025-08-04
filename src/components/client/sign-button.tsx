"use client";

import { Button } from "@heroui/react";
import { signIn } from "next-auth/react";

export default function SignIn() {
  return <Button onPress={() => signIn("github")}>点击登录</Button>;
}
