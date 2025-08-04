"use client"
import { Button } from "@heroui/react"
import { signOut } from "next-auth/react"
 
export default function SignOut() {
  return <Button onPress={() => signOut()}>Sign Out</Button>
}