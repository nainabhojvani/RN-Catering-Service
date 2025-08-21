function Dashboard({ totalEvents, totalInquiries }) {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900">Dashboard</h2>
      </div>

      {/* Only 2 Stats Cards, Centered */}
      <div className="flex flex-wrap justify-center gap-8">
        {/* Total Events */}
        <div className="bg-yellow-50 rounded-3xl p-6 w-[500px] shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 border border-yellow-300 flex flex-col items-center min-w-[250px] max-w-[500px]">
          <h3 className="text-3xl font-bold text-yellow-800">Total Events</h3>
          <p className="text-4xl font-bold text-yellow-900 mt-3">{totalEvents}</p>
        </div>

        {/* Inquiries */}
        <div className="bg-blue-50 rounded-3xl p-6 w-[500px] shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 border border-blue-300 flex flex-col items-center min-w-[250px] max-w-[500px]">
          <h3 className="text-3xl font-bold text-blue-800">Inquiries</h3>
          <p className="text-4xl font-bold text-blue-900 mt-3">{totalInquiries}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
