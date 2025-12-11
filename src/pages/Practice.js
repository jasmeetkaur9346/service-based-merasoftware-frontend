import React from "react";

function StickyLayout() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-gray-900 text-white py-4 text-center text-xl font-semibold">
        Demo Header (Scroll Down)
      </header>

      {/* Main section */}
      <main className="max-w-5xl mx-auto px-4 py-10">
        <section className="flex gap-6">
          {/* Left long content */}
          <div className="flex-1 bg-white rounded-lg p-5 shadow">
            <h2 className="text-2xl font-semibold mb-3">
              Left Content Section
            </h2>
            <p className="mb-4">
              Scroll down the page. Notice the right box follows your scroll but
              stops when this entire section ends.
            </p>

            {/* Fake long content to force scroll */}
            {Array.from({ length: 30 }).map((_, index) => (
              <p key={index} className="mb-3 text-sm leading-relaxed">
                Line {index + 1} of long content. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Suspendisse varius justo eget
                turpis pulvinar, eget porttitor mi placerat.
              </p>
            ))}
          </div>

          {/* Right sticky box */}
          <aside className="w-72 bg-white rounded-lg p-5 shadow h-56 sticky top-24">
            <h3 className="text-lg font-semibold mb-2">Sticky Box</h3>
            <p className="text-sm mb-2">
              Scroll and see how I stay under the header and move with the page.
            </p>
            <p className="text-sm">
              When the left content finishes, I stop and do not go into the
              footer area.
            </p>
          </aside>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6 mt-20">
        Demo Footer (End of Page)
      </footer>
    </div>
  );
}

export default StickyLayout;
