"use client"

import { getMe } from "@/api";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    getMe();
  }, []);

  return (
      <>
        <div></div>
      </>
  );
}
