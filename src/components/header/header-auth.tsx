"use client";
import React from "react";
import * as actions from "@/actions";
import { useSession } from "next-auth/react";
import { Avatar, Button, NavbarItem, Tooltip } from "@heroui/react";

export default function HeaderAuth() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Avatar className='cursor-pointer' />;
  } else if (session?.user) {
    return (
      <Tooltip
        closeDelay={100}
        placement='bottom-end'
        content={
          <div className='px-1 py-2'>
            <form action={actions.signOut}>
              <Button type='submit' variant='light'>
                Sign Out
              </Button>
            </form>
          </div>
        }
      >
        <Avatar src={session.user.image || ""} className='cursor-pointer' />
      </Tooltip>
    );
  } else {
    return (
      <>
        <NavbarItem className='hidden lg:flex'>
          <form action={actions.signIn}>
            <Button type='submit' color='secondary' href='#' variant='bordered'>
              Sign In
            </Button>
          </form>
        </NavbarItem>
        <NavbarItem>
          <Button color='secondary' href='#'>
            Sign Up
          </Button>
        </NavbarItem>
      </>
    );
  }
}
