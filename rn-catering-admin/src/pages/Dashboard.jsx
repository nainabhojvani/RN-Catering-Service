function Dashboard({ totalEvents, totalInquiries }) {
  return (
    <div className="px-9 md:px-6 bg-[#fef8e0] min-h-screen ">
      <div className="mb-6 md:mb-8 text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-[#19522f]">Dashboard</h2>
      </div>

      <div className="flex flex-col md:flex-row flex-wrap justify-center gap-6 md:gap-8">
        <div className="bg-[#fffdf3] rounded-3xl p-4 md:p-6 w-full max-w-md md:w-[500px] shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 border border-[#d9e45a] flex flex-col items-center">
          <h3 className="text-xl md:text-3xl font-bold text-[#306344]">Total Events</h3>
          <p className="text-3xl md:text-4xl font-bold text-[#19522f] mt-2 md:mt-3">{totalEvents}</p>
        </div>

        <div className="bg-[#fffdf3] rounded-3xl p-4 md:p-6 w-full max-w-md md:w-[500px] shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 border border-[#759782] flex flex-col items-center">
          <h3 className="text-xl md:text-3xl font-bold text-[#306344]">Inquiries</h3>
          <p className="text-3xl md:text-4xl font-bold text-[#19522f] mt-2 md:mt-3">{totalInquiries}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
