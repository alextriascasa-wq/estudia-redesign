import type { Metadata } from "next";
import { Sidebar } from "@/components/app/sidebar";
import { Topbar } from "@/components/app/topbar";
import { BottomNav } from "@/components/app/bottom-nav";

export const metadata: Metadata = {
  title: { default: "Panel", template: "%s · EstudIA" },
};

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-dvh w-full bg-muted/40">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main
          id="contenido"
          className="flex-1 px-4 pb-24 pt-6 sm:px-6 md:pb-10"
        >
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
