"use client";

import React, { Suspense } from "react";
import { Input } from "./ui/input";
import { useSearchParams } from "next/navigation";
import { search } from "@/actions/search";

// Ye content wala component suspense ke andar chalega
function SearchInputContent() {
  const searchParams = useSearchParams();

  return (
    <form action={search}>
      <Input
        defaultValue={searchParams.get("term") || ""}
        type="text"
        name="term"
        placeholder="Search post..."
      />
    </form>
  );
}

// Exported component jo suspense use karega
export default function SearchInput() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchInputContent />
    </Suspense>
  );
}
