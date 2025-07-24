import { useLocation } from "react-router-dom";
import MenuBanner from "../assets/images/ourservice.jpg";
import TextSlider from "./TextSlider";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState, useEffect } from "react";
import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import menuData from "./MenuData";

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

function MenuHero() {
  return (
    <div className="relative w-full h-[500px]">
      <img src={MenuBanner} alt="Select Menu" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 z-20">
        <p className="text-white text-4xl font-semibold font-[Dancing_Script]">Select Menu</p>
        <h1 className="text-4xl md:text-5xl font-bold mt-2">RN CATERING FOR YOUR SPECIAL DAY.</h1>
      </div>
      <div className="absolute bottom-0 left-0 w-full z-30">
        <TextSlider />
      </div>
    </div>
  );
}

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
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {events.map((event, idx) => (
              <Listbox.Option
                key={idx}
                value={event}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-purple-100 text-purple-900" : "text-gray-900"
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
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

  useEffect(() => {
    if (location.state?.eventName) {
      setSelectedEvent(location.state.eventName);
    }
  }, [location]);

  const [region, setRegion] = useState("North");
  const [mealPlan, setMealPlan] = useState(
    Object.fromEntries(
      Object.keys(mealSections).map((meal) => [
        meal,
        Object.fromEntries(mealSections[meal].map((sub) => [sub, []])),
      ])
    )
  );

  const [openSubCategories, setOpenSubCategories] = useState({});
  const toggleSubCategory = (key) => {
    setOpenSubCategories((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const destinationObj = destination.droppableId.split("|");
    if (destinationObj.length === 2) {
      const [meal, subCategory] = destinationObj;
      const { region: srcRegion, category, subCategory: srcSubCategory } = JSON.parse(source.droppableId);
      const draggedDish = menuData[srcRegion][category][srcSubCategory][source.index];
      const newDish = { id: `${Date.now()}`, name: draggedDish };

      setMealPlan((prev) => ({
        ...prev,
        [meal]: {
          ...prev[meal],
          [subCategory]: [...prev[meal][subCategory], newDish],
        },
      }));
    }
  };

  return (
    <div className="p-8">
      {/* Event Dropdown */}
      <label className="block text-lg font-semibold mb-2 text-purple-800">Select Event</label>
      <EventDropdown selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} />

      {/* Menu Section */}
      <div className="grid grid-cols-4 gap-6">
        <DragDropContext onDragEnd={onDragEnd}>
          {/* Region Selector */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Select Region</h2>
            {Object.keys(menuData).map((r) => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                className={`w-full text-left px-3 py-2 mb-2 rounded-md ${region === r ? "bg-purple-700 text-white" : "bg-gray-100"
                  }`}
              >
                {r} Indian
              </button>
            ))}
          </div>

          {/* Region Dishes */}
          <div className="col-span-2 bg-white p-4 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6 text-purple-800">
              {selectedEvent ? `${selectedEvent} – ${region} Indian` : `${region} Indian`}
            </h2>
            {Object.keys(menuData[region]).map((category) => (
              <div key={category} className="mb-6">
                <h3 className="text-xl font-semibold text-purple-700 border-b pb-2 mb-3">
                  {category}
                </h3>
                {Object.keys(menuData[region][category]).map((subCategory) => {
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
                        <span className={`transform transition-transform text-purple-700 ${open ? "rotate-180" : "rotate-0"}`}>▼</span>
                      </button>
                      <div
                        className={`transition-all duration-300 ease-in-out ${open ? "max-h-[500px] opacity-100 p-3" : "max-h-0 opacity-0 p-0"
                          } overflow-hidden`}
                      >
                        <Droppable droppableId={JSON.stringify({ region, category, subCategory })} isDropDisabled>
                          {(provided) => (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              className="flex flex-wrap gap-2"
                            >
                              {menuData[region][category][subCategory].map((dish, index) => (
                                <Draggable key={`${region}-${category}-${subCategory}-${index}`} draggableId={`${region}-${category}-${subCategory}-${index}`} index={index}>
                                  {(provided) => (
                                    <div
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      ref={provided.innerRef}
                                      className="bg-purple-100 border border-purple-300 rounded-full px-3 py-1 text-sm shadow-sm cursor-move hover:bg-purple-200 hover:shadow transition-all duration-200 inline-block whitespace-nowrap"
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
                })}
              </div>
            ))}
          </div>

          {/* Meal Plan */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Your Meal Plan</h2>
            <div className="grid gap-4">
              {Object.keys(mealSections).map((meal) => (
                <div key={meal} className="border rounded-lg shadow-sm overflow-hidden">
                  <h3 className="bg-purple-100 px-3 py-2 text-lg font-semibold text-purple-800">
                    {meal}
                  </h3>
                  {mealSections[meal].map((sub) => (
                    <Droppable droppableId={`${meal}|${sub}`} key={`${meal}-${sub}`}>
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="bg-purple-50 p-3 min-h-[80px] border-b border-purple-200"
                        >
                          <h4 className="text-purple-700 font-medium mb-2">{sub}</h4>
                          {mealPlan[meal][sub].map((dish, index) => (
                            <Draggable key={dish.id} draggableId={dish.id} index={index}>
                              {(provided) => (
                                <div
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                  className=" items-center justify-between bg-purple-100 border border-purple-300 rounded-full px-2 py-0.5 text-xs shadow-sm hover:bg-purple-200 transition-all duration-200 inline-block whitespace-nowrap"
                                >
                                  <span>{dish.name}</span>
                                  <button
                                    onClick={() => {
                                      setMealPlan((prev) => ({
                                        ...prev,
                                        [meal]: {
                                          ...prev[meal],
                                          [sub]: prev[meal][sub].filter((_, i) => i !== index),
                                        },
                                      }));
                                    }}
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
      </div>

      {/* Proceed Button */}
      <div className="mt-10 flex justify-center">
        <button
          onClick={() => alert(`Proceeding to booking for ${selectedEvent || "selected event"}`)}
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
      <MenuHero />
      <Menu />
    </>
  );
}
