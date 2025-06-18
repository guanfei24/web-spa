export default function page() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      {/* 主标题 */}
      <section className="text-center">
        <h1 className="text-4xl font-bold text-yellow-700 mb-4">
          About Healing Harmony Spa
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          A sanctuary where peace, beauty, and healing meet.
        </p>
      </section>

      {/* 品牌介绍 */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Who We Are
        </h2>
        <p className="text-gray-600 leading-relaxed">
          At Healing Harmony Spa, we believe in the power of holistic care. With
          over 10 years of experience, our licensed professionals provide
          personalized treatments that rejuvenate your body, calm your mind, and
          elevate your spirit. Whether you&apos;re looking to relax, recover, or
          simply indulge, our spa offers a tailored experience to suit your
          needs.
        </p>
      </section>

      {/* 使命 */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Our Mission
        </h2>
        <p className="text-gray-600 leading-relaxed">
          To deliver natural, nurturing therapies that promote balance and
          wellness through time-tested techniques and heartfelt service.
        </p>
      </section>

      {/* 我们的优势 */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Why Choose Us?
        </h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>🌸 Certified therapists with years of experience</li>
          <li>🌿 Organic, high-quality oils and materials</li>
          <li>🕯️ Calming, luxurious spa environment</li>
          <li>💬 Multilingual staff for personalized care</li>
          <li>🧖 Tailored treatments for every individual</li>
        </ul>
      </section>

      {/* 可选 - 团队展示 */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="text-center">
            <img
              src="/images/therapist1.jpg"
              alt="Sophie"
              className="rounded-full w-24 h-24 mx-auto object-cover mb-2"
            />
            <h3 className="text-lg font-medium">Sophie Liu</h3>
            <p className="text-sm text-gray-500">Senior Massage Therapist</p>
          </div>
        </div>
      </section>

      {/* 背景图或氛围图 */}
      <section>
        <img
          src="/images/spa-interior.jpg"
          alt="Spa Interior"
          className="rounded-lg shadow w-full object-cover max-h-[400px] mx-auto"
        />
      </section>
    </div>
  );
}
