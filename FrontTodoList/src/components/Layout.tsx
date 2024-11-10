import Navbar from './NavBar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow items-center justify-center gap-2 dark:bg-gray-800">
        {children}
      </main>
    </div>
  );
}

