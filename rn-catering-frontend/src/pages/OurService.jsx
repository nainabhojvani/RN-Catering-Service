import servicesBanner from '../assets/images/ourservice.jpg'; 
import ServicesCard from '../components/ServicesCard';
function OurServicesHero() {
  return (
   <div className="relative w-full h-[500px]">
      {/* Background Image */}
       <img
        src={servicesBanner}
        alt="Our Services"
        className="w-full h-full object-cover"
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      {/* Centered Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 z-20">
        <h1 className="font-['Dancing_Script',cursive] text-[50px] md:text-[42px]">Our Services</h1>
        <p className="text-4xl md:text-2xl mt-3 max-w-xl font-['Dancing_Script',cursive]">
          “We don’t just serve food, we create moments worth remembering.”
        </p>

        {/* Button */}
        <button className="mt-6 px-6 py-2 bg-purple-800 text-white font-semibold z-10 rounded-md hover:bg-white hover:text-purple-800 transition ">
          View Full Menu
        </button>
      </div>
    </div>
  );
}
export default function OurServicesPage() {
  return (
    <>
    <OurServicesHero />
    <ServicesCard />
    </>
  )
}