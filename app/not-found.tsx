import Link from "next/link";

export default function NotFound() {
  return (
    <main className="w-full min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="font-mono text-[80px] font-bold text-[#E8EDF4] leading-none mb-2">404</div>
        <h1 className="text-[28px] font-bold text-[#0B1628] mb-3">Page not found</h1>
        <p className="text-[15px] text-[#4A5568] leading-relaxed mb-8">
          The page you are looking for does not exist or has been moved.
          Specfin is under active development.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 rounded-md text-[14px] font-bold bg-[#0D3880] text-white hover:bg-[#1a4fa0] transition"
          >
            Back to homepage
          </Link>
          <Link
            href="/invest"
            className="inline-flex items-center px-6 py-3 rounded-md text-[14px] font-semibold border border-[#E8EDF4] text-[#0B1628] hover:border-[#0D3880]/40 transition"
          >
            Browse opportunities
          </Link>
        </div>
      </div>
    </main>
  );
}
