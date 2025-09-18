import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function UserInquiry({ setInquiriesCount }) {
  const sections = ["Pending", "Reviewed"];

  const [localStatusMap, setLocalStatusMap] = useState(() => {
    const saved = localStorage.getItem("inquiryStatusMap");
    return saved ? JSON.parse(saved) : {};
  });

  const [inquiries, setInquiries] = useState([]);
  const [expanded, setExpanded] = useState({
    Pending: [],
    Reviewed: [],
  });

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

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/inquiries/contacts`);
        const mergedInquiries = res.data.map((inq) => ({
          ...inq,
          status: localStatusMap[inq._id] || "Pending",
        }));
        setInquiries(mergedInquiries);
      } catch (err) {
        console.error("Error fetching inquiries:", err);
      }
    };
    fetchInquiries();
  }, []);

  useEffect(() => {
    const pendingCount = inquiries.filter((i) => (i.status || "Pending") === "Pending").length;
    setInquiriesCount(pendingCount);
  }, [inquiries, setInquiriesCount]);

  const inquiriesByStatus = {
    Pending: inquiries.filter((inq) => (inq.status || "Pending") === "Pending"),
    Reviewed: inquiries.filter((inq) => (inq.status || "Pending") === "Reviewed"),
  };

  return (
    <div className="p-6 bg-[#fef8e0] min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#19522f]">User Inquiries</h1>
      </div>

      <div className="flex flex-wrap gap-6 items-start justify-center">
        {sections.map((section) => {
          const sectionIcon = section === "Pending" ? "⏳" : "✅";
          const sectionBg = section === "Pending" ? "bg-[#fffdf3]" : "bg-[#d1dcd5]";
          const filteredInquiries = inquiriesByStatus[section] || [];

          return (
            <div
              key={section}
              className={`flex-1 min-w-[280px] max-w-[400px] p-5 rounded-3xl shadow-lg ${sectionBg}`}
            >
              <div className="flex items-center justify-between p-4 rounded-xl mb-5 bg-[#fef8e0]">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{sectionIcon}</span>
                  <h2 className="text-2xl font-semibold text-[#19522f]">{section}</h2>
                </div>
                <span className="px-4 py-1 rounded-full font-semibold text-sm bg-[#d9e45a] text-[#19522f]">
                  {filteredInquiries.length}
                </span>
              </div>

              <div className="space-y-4">
                {filteredInquiries.length === 0 && (
                  <p className="text-center text-[#759782]">No inquiries here.</p>
                )}

                {filteredInquiries.map((inq, idx) => (
                  <div
                    key={inq._id}
                    className="rounded-2xl shadow-md overflow-hidden border border-[#d1dcd5] transition-all transform hover:scale-105 hover:shadow-xl cursor-pointer bg-[#fffdf3]"
                  >
                    <div
                      onClick={() => toggleExpand(section, idx)}
                      className={`p-5 flex justify-between items-center ${section === "Pending" ? "bg-[#d9e45a]/40" : "bg-[#759782]/40"
                        }`}
                    >
                      <span className="font-bold text-[#19522f] text-lg md:text-xl">
                        {inq.name}
                      </span>

                      {(localStatusMap[inq._id] || "Pending") === "Pending" ? (
                        <select
                          value={localStatusMap[inq._id] || "Pending"}
                          onChange={(e) => {
                            const newStatus = e.target.value;
                            setLocalStatusMap((prev) => {
                              const updated = { ...prev, [inq._id]: newStatus };
                              localStorage.setItem("inquiryStatusMap", JSON.stringify(updated));
                              return updated;
                            });
                            setInquiries((prev) =>
                              prev.map((i) =>
                                i._id === inq._id ? { ...i, status: newStatus } : i
                              )
                            );
                            setExpanded((prev) => {
                              const sectionExpanded = prev[section] || [];
                              return {
                                ...prev,
                                [section]: sectionExpanded.filter((i) => i !== idx),
                              };
                            });
                          }}
                          className="text-sm font-semibold px-3 py-1 rounded-full shadow-sm border border-[#d1dcd5] bg-[#fffdf3] cursor-pointer max-w-[120px]"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Reviewed">Reviewed</option>
                        </select>
                      ) : (
                        <span className="text-[#19522f] font-semibold px-3 py-1 rounded-full bg-[#759782]/30 border border-[#759782] max-w-[120px] inline-block text-center cursor-default">
                          Reviewed
                        </span>
                      )}
                    </div>

                    <div
                      className={`overflow-hidden transition-all duration-500 px-5 border-t border-[#d1dcd5] ${isExpanded(section, idx)
                          ? "max-h-96 py-4 opacity-100"
                          : "max-h-0 py-0 opacity-0"
                        }`}
                    >
                      <div className="grid grid-cols-2 gap-4">
                        {["email", "phone"].map((field) => (
                          <div
                            key={field}
                            className="bg-[#fef8e0] p-3 rounded-lg shadow-sm"
                          >
                            <p className="text-[#19522f] font-medium break-all capitalize">{field}</p>
                            <p className="text-[#306344] break-all">{inq[field]}</p>
                          </div>
                        ))}
                        <div className="bg-[#fef8e0] p-3 rounded-lg shadow-sm col-span-2">
                          <p className="text-[#19522f] font-medium">Message</p>
                          <p className="text-[#306344] break-all">{inq.message}</p>
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
