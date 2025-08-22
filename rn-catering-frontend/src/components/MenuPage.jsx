const API_URL = import.meta.env.VITE_API_URL;

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState, useEffect } from "react";
import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import initialMenuData from "./MenuData"; // renamed import
import axios from "axios";
import useAuth from "../context/useAuth";

const events = [
  "Wedding Catering",
  "Birthday Party Catering",
  "Engagement Catering",
  "Social Function Catering",
  "School College Event Catering",
  "Indoor Catering",
  "Outdoor Gathering",
  "Event Catering",
  "Party Catering",
  "Home Catering",
];
const mealSections = {
  Breakfast: ["Breakfast Items", "Hot Beverages"],
  Lunch: ["Starters", "Main Course", "Rice & Breads", "Desserts"],
  "Evening Snacks": ["Snacks", "Drinks"],
  Dinner: ["Starters", "Main Course", "Rice & Breads", "Desserts"],
};

function EventDropdown({ selectedEvent, setSelectedEvent }) {
  return (
    <div className="w-full mb-6">
      <Listbox value={selectedEvent} onChange={setSelectedEvent}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-3 pl-3 pr-10 text-left shadow-md border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 sm:text-sm">
            <span className="block truncate text-gray-700">
              {selectedEvent || "Select Event"}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {events.map((event, idx) => (
              <Listbox.Option
                key={idx}
                value={event}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-purple-100 text-purple-900" : "text-gray-900"
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {event}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}

function Menu() {
  const location = useLocation();
  const [selectedEvent, setSelectedEvent] = useState("");
  const [menuDataState, setMenuData] = useState(initialMenuData);
  const [region, setRegion] = useState("North");
  const [mealPlan, setMealPlan] = useState(
    Object.fromEntries(
      Object.keys(mealSections).map((meal) => [
        meal,
        Object.fromEntries(mealSections[meal].map((sub) => [sub, []])),
      ]),
    ),
  );
  const [openSubCategories, setOpenSubCategories] = useState({});
  const [hiddenItems, setHiddenItems] = useState({});
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    date: "",
    venue: "",
  });
  const { user } = useAuth();

  useEffect(() => {
    if (location.state?.eventName) {
      setSelectedEvent(location.state.eventName);
    }
  }, [location]);

  const toggleSubCategory = (key) => {
    setOpenSubCategories((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const destinationObj = destination.droppableId.split("|");

    if (destinationObj.length === 2) {
      const [meal, subCategory] = destinationObj;
      const {
        region: srcRegion,
        category,
        subCategory: srcSubCategory,
      } = JSON.parse(source.droppableId);
      const draggedDish =
        menuDataState[srcRegion][category][srcSubCategory][source.index];

      const newDish = { id: `${Date.now()}`, name: draggedDish };

      setMealPlan((prev) => ({
        ...prev,
        [meal]: {
          ...prev[meal],
          [subCategory]: [...prev[meal][subCategory], newDish],
        },
      }));

      setHiddenItems((prev) => ({
        ...prev,
        [draggedDish]: true,
      }));

      setTimeout(() => {
        setMenuData((prevMenu) => {
          const updatedMenu = { ...prevMenu };
          updatedMenu[srcRegion] = {
            ...updatedMenu[srcRegion],
            [category]: {
              ...updatedMenu[srcRegion][category],
              [srcSubCategory]: updatedMenu[srcRegion][category][
                srcSubCategory
              ].filter((dish) => dish !== draggedDish),
            },
          };
          return updatedMenu;
        });

        setHiddenItems((prev) => {
          const copy = { ...prev };
          delete copy[draggedDish];
          return copy;
        });
      }, 200);
    }
  };

  const handleRemoveDish = (meal, subCategory, dish) => {
    setMealPlan((prev) => ({
      ...prev,
      [meal]: {
        ...prev[meal],
        [subCategory]: prev[meal][subCategory].filter((d) => d.id !== dish.id),
      },
    }));

    // Restore the dish to menu
    setMenuData((prev) => {
      const updated = { ...prev };
      // Find where to put it back
      for (let reg in updated) {
        for (let cat in updated[reg]) {
          for (let sub in updated[reg][cat]) {
            if (!updated[reg][cat][sub].includes(dish.name)) {
              updated[reg][cat][sub] = [...updated[reg][cat][sub], dish.name];
            }
          }
        }
      }
      return updated;
    });
  };
  const navigate = useNavigate();

  const handleBookingSubmit = async () => {
    try {
      await axios.post(
        `${API_URL}/api/bookings`,
        {
          ...formData,
          event: selectedEvent,
          mealPlan,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // 👈 Add token
          },
        },
      );

      setShowBookingForm(false);
      navigate(`/profile/${user.username}`);
    } catch (err) {
      alert("Failed to submit booking");
      console.log(err);
    }
  };

  return (
    <div className="p-8">
      <label className="block text-lg font-semibold mb-2 text-purple-800">
        Select Event
      </label>
      <EventDropdown
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
      />

      <div className="grid grid-cols-4 gap-6">
        <DragDropContext onDragEnd={onDragEnd}>
          {/* Region Selector */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Select Region</h2>
            {Object.keys(menuDataState).map((r) => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                className={`w-full text-left px-3 py-2 mb-2 rounded-md ${
                  region === r ? "bg-purple-700 text-white" : "bg-gray-100"
                }`}
              >
                {r} Indian
              </button>
            ))}
          </div>

          {/* Region Dishes */}
          <div className="col-span-2 bg-white p-4 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6 text-purple-800">
              {selectedEvent
                ? `${selectedEvent} – ${region} Indian`
                : `${region} Indian`}
            </h2>
            {Object.keys(menuDataState[region]).map((category) => (
              <div key={category} className="mb-6">
                <h3 className="text-xl font-semibold text-purple-700 border-b pb-2 mb-3">
                  {category}
                </h3>
                {Object.keys(menuDataState[region][category]).map(
                  (subCategory) => {
                    const key = `${category}-${subCategory}`;
                    const open = openSubCategories[key] || false;
                    return (
                      <div
                        key={subCategory}
                        className="mb-3 rounded-lg border border-purple-200 shadow-sm overflow-hidden"
                      >
                        <button
                          onClick={() => toggleSubCategory(key)}
                          className="w-full flex justify-between items-center px-4 py-3 bg-purple-50 hover:bg-purple-100 transition-colors text-gray-800 font-medium"
                        >
                          <span>{subCategory}</span>
                          <span
                            className={`transform transition-transform text-purple-700 ${
                              open ? "rotate-180" : "rotate-0"
                            }`}
                          >
                            ▼
                          </span>
                        </button>
                        <div
                          className={`transition-all duration-300 ease-in-out ${
                            open
                              ? "max-h-[500px] opacity-100 p-3"
                              : "max-h-0 opacity-0 p-0"
                          } overflow-hidden`}
                        >
                          <Droppable
                            droppableId={JSON.stringify({
                              region,
                              category,
                              subCategory,
                            })}
                            isDropDisabled
                          >
                            {(provided) => (
                              <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="flex flex-wrap gap-2"
                              >
                                {menuDataState[region][category][
                                  subCategory
                                ].map((dish, index) => (
                                  <Draggable
                                    key={dish}
                                    draggableId={dish}
                                    index={index}
                                  >
                                    {(provided) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="bg-purple-100 border border-purple-300 rounded-full px-3 py-1 text-sm shadow-sm cursor-move hover:bg-purple-200 hover:shadow transition-all duration-200 inline-block whitespace-nowrap"
                                        style={{
                                          ...provided.draggableProps.style,
                                          display: hiddenItems[dish]
                                            ? "none"
                                            : "block",
                                        }}
                                      >
                                        {dish}
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            ))}
          </div>

          {/* Meal Plan */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Your Meal Plan</h2>
            <div className="grid gap-4">
              {Object.keys(mealSections).map((meal) => (
                <div
                  key={meal}
                  className="border rounded-lg shadow-sm overflow-hidden"
                >
                  <h3 className="bg-purple-100 px-3 py-2 text-lg font-semibold text-purple-800">
                    {meal}
                  </h3>
                  {mealSections[meal].map((sub) => (
                    <Droppable
                      droppableId={`${meal}|${sub}`}
                      key={`${meal}-${sub}`}
                    >
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="bg-purple-50 p-3 min-h-[80px] border-b border-purple-200"
                        >
                          <h4 className="text-purple-700 font-medium mb-2">
                            {sub}
                          </h4>
                          {mealPlan[meal][sub].map((dish, index) => (
                            <Draggable
                              key={dish.id}
                              draggableId={dish.id}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                  className="flex items-center gap-2 bg-purple-100 border border-purple-300 rounded-full px-3 py-1 text-sm shadow-sm whitespace-nowrap w-fit hover:bg-purple-200 transition-all duration-200"
                                >
                                  <span>{dish.name}</span>
                                  <button
                                    onClick={() =>
                                      handleRemoveDish(meal, sub, dish)
                                    }
                                    className="ml-1 text-red-500 hover:text-red-700 font-bold text-sm"
                                  >
                                    ✕
                                  </button>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </DragDropContext>
        {showBookingForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Booking Details</h2>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border p-2 mb-2"
                value={formData.customerName}
                onChange={(e) =>
                  setFormData({ ...formData, customerName: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full border p-2 mb-2"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border p-2 mb-2"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <input
                type="date"
                className="w-full border p-2 mb-2"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Venue"
                className="w-full border p-2 mb-4"
                value={formData.venue}
                onChange={(e) =>
                  setFormData({ ...formData, venue: e.target.value })
                }
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBookingSubmit}
                  className="px-4 py-2 bg-purple-600 text-white rounded"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-10 flex justify-center">
        <button
          onClick={() => setShowBookingForm(true)}
          className="px-8 py-4 bg-gradient-to-r from-purple-700 via-purple-600 to-pink-600 text-white text-lg font-bold rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Proceed to Book
        </button>
      </div>
    </div>
  );
}

export default function MenuPage() {
  return (
    <>
      <Menu />
    </>
  );
}
