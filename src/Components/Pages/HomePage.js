function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-900 text-white">
      <p className="mt-8 mb-2 text-4xl">Welcome to Pulse.</p>
      <p className="text-lg font-light mb-12">Check out todays trending topics:</p>
      <div className="w-full px-10 flex flex-col lg:flex-row lg:justify-center gap-8 lg:gap-40 text-center text-slate-100">
        <div className="pulse-card lg:text-2xl">
          <p className="mt-2">Lorum ipsum dolor sit amet?</p>
          <div className="w-[240px] h-[240px] mt-8 bg-purple-600 rounded-full mb-2"></div>
        </div>
        <div className="pulse-card lg:text-2xl">
          <p className="mt-2">Lorum ipsum dolor sit amet?</p>
          <div className="w-[240px] h-[240px] mt-8 bg-purple-600 rounded-full mb-2"></div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
