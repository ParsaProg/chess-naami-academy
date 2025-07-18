"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ScrollToContact() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const contactUs: string | null = searchParams?.get("contact-us") ?? null;
    const comments: string | null = searchParams?.get("comments") ?? null;
    if (contactUs === "true") {
      const contactSection = document.querySelector(".contact-us");
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const targetPosition = rect.top + scrollTop - 100;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    }else if(comments === "true") {
      const commentsSection = document.querySelector(".comments-section");
      if (commentsSection) {
        const rect = commentsSection.getBoundingClientRect();
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const targetPosition = rect.top + scrollTop - 100;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    }
  }, [searchParams]);

  return null;
}
