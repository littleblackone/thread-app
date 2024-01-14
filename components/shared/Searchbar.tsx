"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

interface Props {
  routeType: string;
}

export default function Searchbar({ routeType }: Props) {
  const router = useRouter();

  const [search, setSearch] = useState("");

  //延迟0.3s搜索防抖
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        router.push(`/${routeType}?q=` + search);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, routeType]);

  return (
    <div className="searchbar">
      <Image
        src="/assets/search-gray.svg"
        alt="search"
        width={24}
        height={24}
        className=" object-contain"
      ></Image>
      <Input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={`${
          routeType === "communities" ? "Search communities" : "Search creators"
        }`}
        className=" no-focus searchbar_input"
      ></Input>
    </div>
  );
}
