
export default function DownloadSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-purple-light/50 via-white to-purple-soft/60">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
        <div>
          <h3 className="text-2xl md:text-3xl font-headline font-bold text-gray-900 mb-3">Get the SwiftRide App</h3>
          <p className="text-gray-600 mb-6 max-w-xs">Book, track, and manage rides on your favorite device for effortless travel.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:scale-105 transition">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Available_on_the_App_Store_(black)_SVG.svg" alt="Download on App Store" className="h-12" />
            </a>
            <a href="#" className="hover:scale-105 transition">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-12" />
            </a>
          </div>
        </div>
        <div className="flex gap-4">
          <img src="https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&w=300&q=80"
            alt="Camels on travel" className="w-36 h-36 object-cover rounded-2xl shadow-xl border-2 border-purple-soft" />
          <img src="https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=300&q=80"
            alt="Deer at scenic field" className="w-36 h-36 object-cover rounded-2xl shadow-xl border-2 border-purple-soft" />
        </div>
      </div>
    </section>
  );
}
