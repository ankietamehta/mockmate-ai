export default function Footer() {
  return (
    <footer className="bg-black py-10">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-gray-400">
        
        {/* Left */}
        <div className="text-lg font-semibold text-white">
          © {new Date().getFullYear()} Mockmate
          <span className="text-indigo-400">AI</span>
        </div>

        {/* Right */}
        <div className="text-sm hover:text-white cursor-default">
          All rights reserved.
        </div>

      </div>
    </footer>
  );
}
