import { useNavigate, useLocation } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState, useEffect } from "react";
import initialMenuData from "./MenuData";

const mealOrder = ["Breakfast", "Lunch", "Evening Snacks", "Dinner"];

function Menu() {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedEvent, setSelectedEvent] = useState("");
  const [menuDataState, setMenuData] = useState(initialMenuData);
  const [hiddenItems, setHiddenItems] = useState({});
  const [step, setStep] = useState(0); // current step index

  const [mealPlan, setMealPlan] = useState(
    Object.fromEntries(
      mealOrder.map((meal) => [
        meal,
        Object.fromEntries(
          Object.keys(initialMenuData[meal]).map((cat) => [cat, []]),
        ),
      ]),
    ),
  );

  useEffect(() => {
    if (location.state?.eventName) setSelectedEvent(location.state.eventName);
  }, [location]);

  const currentMeal = mealOrder[step]; // current step meal

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const [meal, category] = destination.droppableId.split("|");
    const { meal: srcMeal, category: srcCategory } = JSON.parse(
      source.droppableId,
    );
    const draggedDish = menuDataState[srcMeal][srcCategory][source.index];
    const newDish = { id: `${Date.now()}`, name: draggedDish };

    setMealPlan((prev) => ({
      ...prev,
      [meal]: {
        ...prev[meal],
        [category]: [...(prev[meal][category] || []), newDish],
      },
    }));

    setHiddenItems((prev) => ({ ...prev, [draggedDish]: true }));

    setTimeout(() => {
      setMenuData((prev) => {
        const updated = { ...prev };
        updated[srcMeal][srcCategory] = updated[srcMeal][srcCategory].filter(
          (dish) => dish !== draggedDish,
        );
        return updated;
      });

      setHiddenItems((prev) => {
        const copy = { ...prev };
        delete copy[draggedDish];
        return copy;
      });
    }, 200);
  };

  const handleRemoveDish = (meal, category, dish) => {
    setMealPlan((prev) => ({
      ...prev,
      [meal]: {
        ...prev[meal],
        [category]: prev[meal][category].filter((d) => d.id !== dish.id),
      },
    }));

    setMenuData((prev) => {
      const updated = { ...prev };
      if (!updated[meal][category].includes(dish.name)) {
        updated[meal][category] = [...updated[meal][category], dish.name];
      }
      return updated;
    });
  };
  useEffect(() => {
    if (location.state?.eventName) setSelectedEvent(location.state.eventName);
  }, [location]);

  // ⬇️ Add this
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  return (
    <div className="p-8 min-h-screen bg-[#fffdf3]">
      <h1 className="text-2xl font-bold mb-6 text-[#195237]">
        {selectedEvent || "Select Your Event"}
      </h1>

      {/* Progress Bar */}
      <div className="flex justify-between text-[#19522f] mb-6">
        {mealOrder.map((meal, i) => (
          <div
            key={meal}
            className={`flex-1 text-center py-2 rounded mx-1 ${
              i === step
                ? "bg-[#19522f] text-[#fef8e0] font-bold"
                : "bg-gray-200"
            }`}
          >
            {meal}
          </div>
        ))}
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-2 md:grid-cols-3 text-[#19522f] gap-6 h-[100vh]">
          {/* Left: Current Meal Menu */}
          <div className="bg-white p-4 rounded-lg shadow overflow-y-auto md:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-[#306344]">
              {currentMeal}
            </h2>

            {Object.keys(menuDataState[currentMeal]).map((category) => (
              <div key={category} className="mb-3">
                <h3 className="font-medium text-[#195237] mb-2">{category}</h3>
                <Droppable
                  droppableId={JSON.stringify({ meal: currentMeal, category })}
                  isDropDisabled
                >
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="flex flex-wrap gap-2"
                    >
                      {menuDataState[currentMeal][category].map(
                        (dish, index) => (
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
                                className="bg-[#fef8e0] border border-[#759782] rounded-full px-3 py-1 text-sm shadow-sm cursor-move hover:bg-[#306344] hover:text-[#fef8e0]"
                                style={{
                                  ...provided.draggableProps.style,
                                  display: hiddenItems[dish] ? "none" : "block",
                                }}
                              >
                                {dish}
                              </div>
                            )}
                          </Draggable>
                        ),
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>

          {/* Right: Meal Plan for current meal */}
          <div className="bg-white p-4 rounded-lg  shadow overflow-y-autoshadow">
            <h2 className="text-xl font-bold mb-4 text-[#306344]">
              Your {currentMeal} Plan
            </h2>
            {Object.keys(mealPlan[currentMeal]).map((category) => (
              <Droppable
                droppableId={`${currentMeal}|${category}`}
                key={category}
              >
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="bg-[#fef8e0] p-3 min-h-[80px] border-b border-[#d1dcd5] mb-3"
                  >
                    <h4 className="mb-2 text-[#306344] font-medium">
                      {category}
                    </h4>
                    {mealPlan[currentMeal][category].map((dish, index) => (
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
                            className="flex items-center gap-2 bg-[#d9e45a] border border-[#759782] rounded-full px-3 py-1 text-sm shadow-sm w-fit hover:bg-[#306344] hover:text-white"
                          >
                            <span>{dish.name}</span>
                            <button
                              onClick={() =>
                                handleRemoveDish(currentMeal, category, dish)
                              }
                              className="ml-1 text-red-500 hover:text-red-300 font-bold"
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
        </div>
      </DragDropContext>

      {/* Navigation */}
      <div className="mt-8 flex justify-between">
        <button
          disabled={step === 0}
          onClick={() => setStep((s) => s - 1)}
          className="px-6 py-3 bg-[#195237] text-white cursor-pointer rounded-lg disabled:opacity-50"
        >
          Previous
        </button>

        {step < mealOrder.length - 1 && (
          <button
            onClick={() => setStep((s) => s + 1)}
            className="px-6 py-3 bg-[#195237] cursor-pointer text-white rounded-lg"
          >
            Next
          </button>
        )}
      </div>
      {step === mealOrder.length - 1 && (
        <div className="bg-white p-6 mt-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-[#195237] mb-4">Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.keys(mealPlan).map((meal) => (
              <div key={meal} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-[#306344] mb-2">
                  {meal}
                </h3>
                {Object.keys(mealPlan[meal]).map((category) => (
                  <div key={category} className="mb-2">
                    <p className="font-medium text-[#195237]">{category}:</p>
                    <ul className="list-disc list-inside ml-4 text-gray-700 text-sm">
                      {mealPlan[meal][category].length > 0 ? (
                        mealPlan[meal][category].map((dish) => (
                          <li key={dish.id}>{dish.name}</li>
                        ))
                      ) : (
                        <li className="text-gray-400">No items selected</li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={() =>
                navigate("/bookingform", { state: { selectedEvent, mealPlan } })
              }
              className="px-6 py-3 bg-[#195237] text-white rounded-lg shadow hover:bg-[#14472f]"
            >
              Confirm & Book
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MenuPage() {
  return <Menu />;
}
