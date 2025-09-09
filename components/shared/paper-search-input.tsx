'use client';

import { SearchIcon } from "lucide-react";
import React, { FormEvent } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils/css";

const PaperSearchInput = ({ className }: { className?: string }) => {
  const onSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const searchQuery = new FormData(form).get("search") as string;
    window.location.href = `/search?query=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <div className={cn("relative", className)}>
      <form onSubmit={onSearch}>
        <Input
          type="text"
          placeholder="Search papers by topic, author, or affiliated institution"
          className="md:p-6 py-6 px-4 bg-[#F3E7E780] placeholder:text-xs"
          name="search"
        />

        <SearchIcon className="hidden md:block absolute w-3 h-3 md:w-4 md:h-4 top-4.5 right-2 md:right-3 text-[#0B0B0B]" />
      </form>
    </div>
  );
};

export default PaperSearchInput;
