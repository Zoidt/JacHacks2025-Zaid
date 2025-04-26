import { Authenticated, Unauthenticated } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { MasjidList } from "./components/MasjidList";
import { AddMasjidForm } from "./components/AddMasjidForm";
import { useState } from "react";

export default function App() {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm p-4 flex justify-between items-center border-b">
        <h2 className="text-xl font-semibold text-emerald-600">Prayer Times</h2>
        <SignOutButton />
      </header>
      <main className="flex-1 p-4">
        <div className="max-w-4xl mx-auto">
          <Authenticated>
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-900">Local Masjids</h1>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
                >
                  Add Masjid
                </button>
              </div>
              <MasjidList />
              {showAddForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-xl p-6 w-full max-w-lg">
                    <AddMasjidForm onClose={() => setShowAddForm(false)} />
                  </div>
                </div>
              )}
            </div>
          </Authenticated>
          <Unauthenticated>
            <div className="flex flex-col gap-8 items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-emerald-600 mb-4">Prayer Times</h1>
                <p className="text-xl text-slate-600">Sign in to view local masjids</p>
              </div>
              <SignInForm />
            </div>
          </Unauthenticated>
        </div>
      </main>
      <Toaster />
    </div>
  );
}
