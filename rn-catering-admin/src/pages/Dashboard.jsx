function Dashboard() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900">Dashboard</h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1">
          <h3 className="text-lg font-semibold text-gray-700">Total Events</h3>
          <p className="text-4xl font-bold text-yellow-600 mt-3">25</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1">
          <h3 className="text-lg font-semibold text-gray-700">Inquiries</h3>
          <p className="text-4xl font-bold text-green-600 mt-3">12</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1">
          <h3 className="text-lg font-semibold text-gray-700">Revenue</h3>
          <p className="text-4xl font-bold text-blue-600 mt-3">₹50,000</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
