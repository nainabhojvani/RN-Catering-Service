import { useState, useEffect } from "react";
import axios from "axios";

function UserInquiry() {
  const [inquiries, setInquiries] = useState([]);
  const [editStatus, setEditStatus] = useState({});
  const [expanded, setExpanded] = useState({
    Pending: [],
    Reviewed: [],
  });

  // Toggle expand for inquiry cards
  const toggleExpand = (section, idx) => {
    setExpanded((prev) => {
      const sectionExpanded = prev[section] || [];
      const isAlreadyExpanded = sectionExpanded.includes(idx);

      return {
        ...prev,
        [section]: isAlreadyExpanded
          ? sectionExpanded.filter((i) => i !== idx)
          : [...sectionExpanded, idx],
      };
    });
  };

  const isExpanded = (section, idx) => expanded[section]?.includes(idx);

  const sections = ["Pending", "Reviewed"];

  // Fetch inquiries and initialize status
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/inquiries/contacts");
        setInquiries(res.data);

        // Initialize all inquiries as Pending
        const initialStatuses = {};
        res.data.forEach((inq) => {
          initialStatuses[inq._id] = "Pending";
        });
        setEditStatus(initialStatuses);
      } catch (err) {
        console.error("Error fetching inquiries:", err);
      }
    };
    fetchInquiries();
  }, []);

  // Group inquiries by current UI status
  const inquiriesByStatus = {
    Pending: inquiries.filter((inq) => editStatus[inq._id] === "Pending"),
    Reviewed: inquiries.filter((inq) => editStatus[inq._id] === "Reviewed"),
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">User Inquiries</h1>
      </div>

      <div className="flex flex-wrap gap-6 items-start justify-center">
        {sections.map((section) => {
          const sectionIcon = section === "Pending" ? "⏳" : "✅";
          const sectionBg = section === "Pending" ? "bg-yellow-50" : "bg-green-50";
          const filteredInquiries = inquiriesByStatus[section] || [];

          return (
            <div
              key={section}
              className={`flex-1 min-w-[280px] max-w-[400px] p-5 rounded-3xl ${sectionBg}`}
            >
              <div className="flex items-center justify-between p-4 rounded-xl bg-opacity-50 mb-5">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{sectionIcon}</span>
                  <h2 className="text-2xl font-semibold">{section}</h2>
                </div>
                <span className="px-4 py-1 rounded-full font-semibold text-sm bg-yellow-200 text-yellow-800">
                  {filteredInquiries.length}
                </span>
              </div>

              <div className="space-y-4">
                {filteredInquiries.length === 0 && (
                  <p className="text-center text-gray-600">No inquiries here.</p>
                )}

                {filteredInquiries.map((inq, idx) => (
                  <div
                    key={inq._id}
                    className="rounded-2xl shadow-md overflow-hidden border border-gray-200 transition-all transform hover:scale-105 hover:shadow-xl cursor-pointer bg-white"
                  >
                    <div
                      onClick={() => toggleExpand(section, idx)}
                      className={`p-5 flex justify-between items-center ${
                        section === "Pending" ? "bg-yellow-100" : "bg-green-100"
                      }`}
                    >
                      <span className="font-bold text-gray-900 text-lg md:text-xl">
                        {inq.name}
                      </span>

                      <select
                        value={editStatus[inq._id]}
                        onChange={(e) =>
                          setEditStatus((prev) => ({
                            ...prev,
                            [inq._id]: e.target.value,
                          }))
                        }
                        className="text-sm font-semibold px-3 py-1 rounded-full shadow-sm border bg-white cursor-pointer max-w-[120px]"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Reviewed">Reviewed</option>
                      </select>
                    </div>

                    <div
                      className={`overflow-hidden transition-all duration-500 px-5 border-t border-gray-200 ${
                        isExpanded(section, idx)
                          ? "max-h-96 opacity-100 py-4"
                          : "max-h-0 opacity-0 py-0"
                      }`}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                          <p className="text-gray-700 font-medium">Phone</p>
                          <p className="text-gray-900">{inq.phone || "-"}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                          <p className="text-gray-700 font-medium">Email</p>
                          <p className="text-blue-600 underline break-words w-full cursor-pointer">
                            {inq.email || "-"}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg shadow-sm col-span-full">
                          <p className="text-gray-700 font-medium">Event Name</p>
                          <p>{inq.eventName || "-"}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg shadow-sm col-span-full">
                          <p className="text-gray-700 font-medium">Message</p>
                          <p>{inq.message || "-"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserInquiry;
