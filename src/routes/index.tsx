import { createFileRoute } from "@tanstack/react-router";
import { Atmosphere } from "@/components/wedding/Atmosphere";
import { Hero } from "@/components/wedding/Hero";
import { Countdown } from "@/components/wedding/Countdown";
import { Timeline } from "@/components/wedding/Timeline";
import { Locations } from "@/components/wedding/Locations";
import { Closing, Details } from "@/components/wedding/Closing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "George & Merna — The Wedding Film" },
      { name: "description", content: "You're invited to the wedding of George & Merna on November 10, 2026." },
      { property: "og:title", content: "George & Merna — The Wedding Film" },
      { property: "og:description", content: "Two stories become one. November 10, 2026." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative">
      <Atmosphere />
      <Hero />
      <Timeline />
      <Locations />
      <Countdown />
      <Details />
      <Closing />
    </main>
  );
}
