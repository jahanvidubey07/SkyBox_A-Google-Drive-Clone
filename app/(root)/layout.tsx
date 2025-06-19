import React from 'react';
import Sidebar from "@/components/Sidebar";
import MobileNavigation from '@/components/MobileNavigation';
import Header from '@/components/Header';
import { getCurrentUser } from '@/lib/actions/users.actions';
import { redirect } from 'next/navigation';
import { Toaster } from "@/components/ui/toaster";

export const dynamic = "force-dynamic";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return redirect("/sign-in");

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage: "url('/assets/images/background.jpg')",
      }}
    >
      <main className="flex h-screen bg-black/70">
        <Sidebar {...currentUser} />
        <section className="flex h-full flex-1 flex-col">
          <MobileNavigation {...currentUser} />
          <Header userId={currentUser.$id} accountId={currentUser.accountId} />
          <div className="main-content">{children}</div>
        </section>
        <Toaster />
      </main>
    </div>
  );
};

export default layout;
