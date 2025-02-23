import Header from "./Header";

export default function Layout({children}) {
  return (
    <main className="p-6 container mx-auto space-y-6">
    
    <Header/>
    {children}
    </main>
  );
}