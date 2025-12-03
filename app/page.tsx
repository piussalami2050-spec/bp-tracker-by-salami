import NigeriaMap from "@/app/components/NigeriaMap";

export default function Home() {
  return (
    <div className="bg-green-50 min-h-screen">
      {/* Big red title */}
      <div className="text-center pt-12 px-4">
        <h1 className="text-5xl md:text-8xl font-black text-red-600 leading-tight">
          1 in 3 Nigerians&apos;<br />has High BP
        </h1>
        <p className="text-2xl md:text-4xl mt-6 text-gray-800">
          That&apos;s over 70 million people right now!
        </p>
      </div>

      {/* The colourful map */}
      <div className="mt-10 max-w-5xl mx-auto px-4">
        <NigeriaMap />
      </div>

      {/* Footer with your name */}
      <footer className="text-center py-12 text-green-800 font-bold text-lg">
        Built with love by [PUT YOUR NAME OR TWITTER HERE] • 2025
      </footer>
    </div>
  );
}
