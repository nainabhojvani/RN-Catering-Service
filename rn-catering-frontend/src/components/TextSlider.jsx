

export default function TextSlider() {
  const text = 
    "At RN Catering, we don’t just serve food — we craft experiences. From grand weddings to intimate family gatherings, our menus are customized to suit your taste and style. Freshly prepared, beautifully served, and made with love — we make your celebrations truly unforgettable.";

  return (
    <div className="w-full bg-purple-800 text-white py-3 overflow-hidden relative">
      <div className="whitespace-nowrap animate-marquee text-lg md:text-xl font-medium">
        {text} &nbsp; • &nbsp; {text} &nbsp; • &nbsp; {text}
      </div>
    </div>
  );
}