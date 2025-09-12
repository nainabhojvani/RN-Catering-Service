function Dashboard({ totalEvents, totalInquiries }) {
  return (
   <div className="p-8 bg-[#fef8e0] min-h-screen">
  <div className="mb-8 text-center">
    <h2 className="text-4xl font-bold text-[#19522f]">Dashboard</h2>
  </div>

  <div className="flex flex-wrap justify-center gap-8">
    <div className="bg-[#fffdf3] rounded-3xl p-6 w-[500px] shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 border border-[#d9e45a] flex flex-col items-center">
      <h3 className="text-3xl font-bold text-[#306344]">Total Events</h3>
      <p className="text-4xl font-bold text-[#19522f] mt-3">{totalEvents}</p>
    </div>

    <div className="bg-[#fffdf3] rounded-3xl p-6 w-[500px] shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 border border-[#759782] flex flex-col items-center">
      <h3 className="text-3xl font-bold text-[#306344]">Inquiries</h3>
      <p className="text-4xl font-bold text-[#19522f] mt-3">{totalInquiries}</p>
    </div>
  </div>
</div>
  );
}

export default Dashboard;
