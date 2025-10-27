import { ChatWidget } from "./ChatWidget";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-sky-100 text-gray-800">
      <NavBar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
