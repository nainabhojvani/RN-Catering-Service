import MenuBanner from '../assets/images/ourservice.jpg';
import TextSlider from "./TextSlider";
function MenuHero() {
    return (
        <div className="relative w-full h-[500px]">
            <img
                src={MenuBanner}
                alt="Select Menu"
                className="w-full h-full object-cover"
            />

            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
            {/* Centered Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 z-20">
                <p className="text-white text-4xl font-semibold font-[Dancing_Script]">
                    Select Menu
                </p>
                <h1 className="text-4xl md:text-5xl font-bold mt-2">
                    RN CATERING FOR YOUR SPECIAL DAY.
                </h1>

                {/* Button */}

                <button className="mt-6 px-6 py-2 bg-purple-800 text-white font-semibold z-10 rounded-md hover:bg-white hover:text-purple-800 transition ">
                    View Full Menu
                </button>
            </div>
            {/* Bottom text slider */}
            <div className="absolute bottom-0 left-0 w-full z-30">
                <TextSlider />
            </div>
        </div>
    );
}

// const menuItems = [
//   {
//     title: "Lunch or Dinner",
//     desc: "Your Event, Our Passion – RN Catering Excellence.",
//   },
//   {
//     title: "Break Fast or Evening Snacks",
//     desc: "Your Event, Our Passion – RN Catering Excellence.",
//   },
// ];

// const Menu = () => {
// return (
//     <section className="w-full bg-white py-12">
//       <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10">
//         {menuItems.map((item, index) => (
//           <div
//             key={index}
//             className="bg-purple-800 text-white rounded-xl shadow-2xl p-8 hover:scale-105 transition duration-300 group"
//           >
//             <div className="flex justify-center mb-4 py-3">
//               <div className="w-20 h-20 rounded-full bg-transparent group-hover:bg-white flex items-center justify-center transition-all duration-300">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="50"
//                   height="50"
//                   fill="currentColor"
//                   className="bi bi-fork-knife text-white group-hover:text-purple-800 transition-all duration-300"
//                   viewBox="0 0 16 16"
//                 >
//                   <path d="M13 .5c0-.276-.226-.506-.498-.465-1.703.257-2.94 2.012-3 8.462a.5.5 0 0 0 .498.5c.56.01 1 .13 1 1.003v5.5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5zM4.25 0a.25.25 0 0 1 .25.25v5.122a.128.128 0 0 0 .256.006l.233-5.14A.25.25 0 0 1 5.24 0h.522a.25.25 0 0 1 .25.238l.233 5.14a.128.128 0 0 0 .256-.006V.25A.25.25 0 0 1 6.75 0h.29a.5.5 0 0 1 .498.458l.423 5.07a1.69 1.69 0 0 1-1.059 1.711l-.053.022a.92.92 0 0 0-.58.884L6.47 15a.971.971 0 1 1-1.942 0l.202-6.855a.92.92 0 0 0-.58-.884l-.053-.022a1.69 1.69 0 0 1-1.059-1.712L3.462.458A.5.5 0 0 1 3.96 0z"/>
//                 </svg>
//               </div>
//             </div>
//             <h2 className="text-4xl font-bold text-center font-[Dancing_Script] mb-4 ">
//               {item.title}
//             </h2>
//             <p className="text-center text-lg">{item.desc}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };
const menuItems = [
    {
        title: "Lunch or Dinner",
        desc: "Indulge in carefully curated multi-course meals, perfect for grand events or intimate dinners.",
        color: "bg-gradient-to-r from-purple-700 to-purple-500",
        icon: "🍽️",
    },
    {
        title: "Breakfast",
        desc: "Start your day with delightful, energizing breakfast options that are both healthy and delicious.",
        color: "bg-gradient-to-r from-yellow-500 to-orange-400",
        icon: "🥞",
    },
];

const Menu = () => {
    return (
        <section className="w-full bg-white py-16">
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
                {menuItems.map((item, index) => (
                    <div key={index}>
                        <div className="flex items-center mb-10 bg-gradient-to-r from-purple-700 to-pink-500 rounded-full shadow-xl w-full h-40 p-4 hover:scale-105 transition duration-500">
                            <div className="w-24 h-24 bg-white rounded-full flex justify-center items-center text-purple-700 text-5xl mr-6">
                                {item.icon}
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold font-[Dancing_Script] text-white">{item.title}</h2>
                                <p className="text-sm text-white mt-1">{item.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};



export default function MenuPage() {
    return (
        <>
            <MenuHero />
            <Menu />
        </>
    );
};