function Dashboard() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900">Dashboard</h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Events */}
        <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 border border-yellow-300">
          <h3 className="text-lg font-semibold text-yellow-800">Total Events</h3>
          <p className="text-4xl font-bold text-yellow-900 mt-3">25</p>
        </div>

        {/* Inquiries */}
        <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 border border-blue-300">
          <h3 className="text-lg font-semibold text-blue-800">Inquiries</h3>
          <p className="text-4xl font-bold text-blue-900 mt-3">12</p>
        </div>

        {/* Revenue */}
        <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 border border-green-300">
          <h3 className="text-lg font-semibold text-green-800">Revenue</h3>
          <p className="text-4xl font-bold text-green-900 mt-3">₹50,000</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
