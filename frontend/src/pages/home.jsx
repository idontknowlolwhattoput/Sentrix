import Layout from "../layout/homeLayout.jsx";

export default function Home() {
  return (
    <Layout>
      <main className="flex flex-col items-center justify-center min-h-[85vh] bg-white text-black text-center px-6">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
          Empowering Healthcare <br className="hidden md:block" />
          Through Innovation
        </h1>
        <p className="text-gray-700 text-lg md:text-xl max-w-2xl mb-10">
          MedTrack Hospital System — simplifying patient care, optimizing hospital workflow, 
          and connecting doctors, staff, and patients under one digital platform.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <button className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
            Get Started
          </button>
          <button className="border border-black px-8 py-3 rounded-lg font-semibold hover:bg-black hover:text-white transition">
            Learn More
          </button>
        </div>
      </main>
    </Layout>
  );
}
