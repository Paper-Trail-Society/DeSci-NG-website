'use client'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { Button } from '@/components/ui/button';

const Nav = () => {
  return (
    <nav className="w-full 2xl:p-container-md pt-10 sm:pt-4">
        <div className="w-full md:w-[70%] px-4 md:px-2 md:mx-auto flex justify-between items-center">
          <span>
            <Link href="/">
              <Image
                src="/assets/desci-ng-logo.png"
                alt="logo"
                width={100}
                height={100}
              />
            </Link>
          </span>
          <div className="flex gap-4 items-center">
            <Link href="/upload-paper">
              <Button
                variant={"link"}
                style={{
                  backgroundImage: "linear-gradient(to right, transparent, currentColor)",
                  backgroundSize: "0% 1px",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "left bottom",
                  transitionProperty: "background-size",
                  transitionDuration: "150ms",
                }}
                onMouseEnter={(event) => {
                  const button = event.currentTarget as HTMLButtonElement;
                  button.style.backgroundSize = "100% 1px";
                }}
                onMouseLeave={(event) => {
                  const button = event.currentTarget as HTMLButtonElement;
                  button.style.backgroundSize = "0% 1px";
                }}
              >
                Upload paper
              </Button>
            </Link>
            <Link href="#">
              <Button variant={"destructive"} className="px-4">
                LOGIN
              </Button>
            </Link>
          </div>
        </div>
      </nav>
  )
}

export default Nav