export function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-8 text-center mt-12">
      <p className="text-lg font-medium">
        © {new Date().getFullYear()} Santa Rosa Spas • Relax. Renew. Restore.
      </p>
      <p className="text-sm mt-3 opacity-90">
        1234 Sonoma Ave, Santa Rosa, CA • (707) 555-1234
      </p>
    </footer>
  );
}
