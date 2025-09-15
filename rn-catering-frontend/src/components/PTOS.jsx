import React from "react";

export default function PTOS() {
  const friendlyContent = (
    <div className="space-y-8 text-lg text-gray-800">
      <h3 className="text-xl font-semibold text-[#19522f]">Privacy Policy</h3>
      <ul className="list-disc list-inside space-y-3">
        <li>
          <strong>Information We Collect:</strong> We collect only the necessary
          details such as your name, contact information, delivery address, and
          payment details to fulfill your catering orders efficiently.
        </li>
        <li>
          <strong>How We Use Your Information:</strong> Your data helps us
          process orders, communicate with you about your bookings, and improve
          our services.
        </li>
        <li>
          <strong>Cookies:</strong> We use cookies to personalize your
          experience and understand site utilization. You can manage or disable
          cookies through your browser settings.
        </li>
        <li>
          <strong>Security:</strong> We prioritize safeguarding your data and
          utilize industry standard measures to protect your information.
        </li>
        <li>
          <strong>Your Rights:</strong> You can review, correct, or delete your
          personal data by contacting us anytime.
        </li>
      </ul>

      <h3 className="text-xl font-semibold text-[#19522f]">Terms of Service</h3>
      <ul className="list-disc list-inside space-y-3">
        <li>
          <strong>Ordering:</strong> Ensure all details provided during ordering
          are accurate for smooth service delivery.
        </li>
        <li>
          <strong>Payments:</strong> Payments must be completed at booking time.
          We support multiple secure payment methods.
        </li>
        <li>
          <strong>Cancellation Policy:</strong> Cancellations made at least 48
          hours prior to the event are eligible for refunds. Late cancellations
          may be subject to a fee.
        </li>
        <li>
          <strong>Delivery & Timing:</strong> While we strive for punctual
          delivery, delays can occur due to unforeseen circumstances like
          traffic or weather.
        </li>
        <li>
          <strong>Allergies & Dietary Restrictions:</strong> Please inform us in
          advance so we can accommodate your specific needs.
        </li>
        <li>
          <strong>Changes to Terms:</strong> We reserve the right to update
          these terms and policies. Updates will be posted on this page with a
          new effective date.
        </li>
      </ul>

      <h3 className="text-xl font-semibold text-[#19522f]">Contact Us</h3>
      <p>
        If you have questions or requests about your privacy or our services,
        please reach out:
        <br />
        <strong>Email:</strong>{" "}
        <a
          href="mailto:contact@yourcatering.com"
          className="text-[#19522f] underline"
        >
          contact@yourcatering.com
        </a>
        <br />
        <strong>Phone:</strong> +91 1234567890
        <br />
        <strong>Address:</strong> B-405, Maple Trade Centre, Near Surdhara
        Circle, Thaltej, SG Road, Ahmedabad, Gujarat 380059
      </p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-10 font-sans bg-[#FFFDF3] rounded-lg shadow-lg mt-16 mb-20">
      <h1 className="text-4xl font-bold mb-8 text-center text-[#19522f]">
        Privacy Policy & Terms of Service
      </h1>

      <div className="bg-[#FFFDF3] p-10 rounded-3xl shadow-inner">
        {friendlyContent}
      </div>
    </div>
  );
}