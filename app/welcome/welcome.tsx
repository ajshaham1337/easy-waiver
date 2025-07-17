// @ts-nocheck
import { useEffect, useState } from "react";

const locations = [
  { label: "Hollywood", slug: "hollywood" },
  { label: "Venice", slug: "venice" },
  { label: "North Hollywood", slug: "north-hollywood" },
  { label: "Downtown LA", slug: "los-angeles-downtown" },
  { label: "Santa Barbara (Downtown)", slug: "santa-barbara-downtown" },
  { label: "Santa Barbara (Uptown)", slug: "santa-barbara-uptown" },
];

const fitnessJourneyOptions = [
  "It's my first time joining a gym",
  "When I think fitness, I think Gold's Gym!",
  "I want to stay fit, and look my best this year",
  "I want to escape to the gym for some 'Me Time'",
  "I'm ready for a lifestyle change, looking to work with a Personal Trainer or take Group Classes!",
  "I'm a former athlete, trying to get back in shape",
  "I'm proud of my fitness level, looking to maintain as I age",
];

const fitnessGoalOptions = [
  "Lose 15 or more Lbs. of Body Fat",
  "Gain Muscle/Weight",
  "Cardio/Heart health",
  "Injury Rehabilitation",
  "Other",
];

const genderOptions = ["Female", "Male", "Other"];

const initialForm = {
  location: locations[0],
  firstname: "",
  lastname: "",
  phone: "",
  email: "",
  birthdate: "",
  gender: "Female",
  address: "",
  city: "",
  state: "CA",
  zip: "",
  fitnessJourney: fitnessJourneyOptions[0],
  fitnessGoal: fitnessGoalOptions[0],
  waiver: false,
  receiveComms: false,
  receiveCommsGG: false,
};

const toFormUrlEncoded = (obj) => {
  return Object.entries(obj)
    .map(
      ([k, v]) =>
        encodeURIComponent(k) + "=" + encodeURIComponent(typeof v === "boolean" ? (v ? "true" : "false") : v)
    )
    .join("&");
};

const GoldsGymForm = () => {

  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("golds-gym-form");
    if (saved) setForm(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("golds-gym-form", JSON.stringify(form));
  }, [form]);

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: checked }));
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (e) => {
    const selectedLocation = locations.find(loc => loc.label === e.target.value);
    setForm((prev) => ({ ...prev, location: selectedLocation }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const slug = form.location?.slug || "hollywood";
      const endpoint = `https://offers-socal.goldsgym.com/${slug}-guest-vip`;
      const data = {
        guest_source: "Referral / Word of Mouth",
        registration_type: "VIP Guest",
        choose_location: form.location.label,
        firstname: form.firstname,
        lastname: form.lastname,
        phone: form.phone,
        email: form.email,
        birthdate: form.birthdate,
        gender: form.gender,
        address: form.address,
        city: form.city,
        state: form.state,
        zip: form.zip,
        persona_identification_qs: form.fitnessJourney,
        guest_reg__fitness_goal: form.fitnessGoal,
        guest_waiver_consent: form.waiver,
        tci_consent: true,
        LEGAL_CONSENT_subscription_type_5097478: form.receiveCommsGG,
      };
      const body = toFormUrlEncoded(data);
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      });
      if (!res.ok) throw new Error("Submission failed");
      setMessage("Form submitted successfully!");
    } catch (err) {
      setMessage("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-5 font-sans">
      <h1 className="text-2xl font-bold mb-5 text-center">Gold's Gym Guest Pass Registration</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Location */}
        <div className="flex flex-col gap-1">
          <label htmlFor="location" className="font-bold text-sm">Location *</label>
          <select
            id="location"
            name="location"
            value={form.location.label}
            onChange={handleLocationChange}
            className="p-2 border border-gray-300 rounded text-base"
          >
            {locations.map((loc) => (
              <option key={loc.slug} value={loc.label}>
                {loc.label}
              </option>
            ))}
          </select>
        </div>

        {/* Name fields */}
        <div className="flex gap-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="firstname" className="font-bold text-sm">First name *</label>
            <input
              id="firstname"
              name="firstname"
              type="text"
              value={form.firstname}
              onChange={handleTextChange}
              className="p-2 border border-gray-300 rounded text-base"
              required
              autoComplete="given-name"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="lastname" className="font-bold text-sm">Last name *</label>
            <input
              id="lastname"
              name="lastname"
              type="text"
              value={form.lastname}
              onChange={handleTextChange}
              className="p-2 border border-gray-300 rounded text-base"
              required
              autoComplete="family-name"
            />
          </div>
        </div>

        {/* Contact info */}
        <div className="flex flex-col gap-1">
          <label htmlFor="phone" className="font-bold text-sm">Phone number *</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleTextChange}
            className="p-2 border border-gray-300 rounded text-base"
            required
            autoComplete="tel"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-bold text-sm">Email *</label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleTextChange}
            className="p-2 border border-gray-300 rounded text-base"
            required
            autoComplete="email"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="birthdate" className="font-bold text-sm">Date of Birth *</label>
          <input
            id="birthdate"
            name="birthdate"
            type="date"
            value={form.birthdate}
            onChange={handleTextChange}
            className="p-2 border border-gray-300 rounded text-base"
            required
            autoComplete="bday"
          />
        </div>

        {/* Gender */}
        <div className="flex flex-col gap-1">
          <span className="font-bold text-sm">Gender *</span>
          <div className="flex gap-5">
            {genderOptions.map((gender) => (
              <label key={gender} htmlFor={`gender-${gender}`} className="flex items-center gap-2 cursor-pointer">
                <input
                  id={`gender-${gender}`}
                  type="radio"
                  name="gender"
                  value={gender}
                  checked={form.gender === gender}
                  onChange={handleRadioChange}
                  autoComplete="sex"
                />
                {gender}
              </label>
            ))}
          </div>
        </div>

        {/* Address */}
        <div className="flex flex-col gap-1">
          <label htmlFor="address" className="font-bold text-sm">Street address *</label>
          <input
            id="address"
            type="text"
            name="address"
            value={form.address}
            onChange={handleTextChange}
            className="p-2 border border-gray-300 rounded text-base"
            required
            autoComplete="street-address"
          />
        </div>

        <div className="flex gap-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="city" className="font-bold text-sm">City *</label>
            <input
              id="city"
              type="text"
              name="city"
              value={form.city}
              onChange={handleTextChange}
              className="p-2 border border-gray-300 rounded text-base"
              required
              autoComplete="address-level2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="state" className="font-bold text-sm">State *</label>
            <input
              id="state"
              type="text"
              name="state"
              value={form.state}
              onChange={handleTextChange}
              className="p-2 border border-gray-300 rounded text-base"
              readOnly
              autoComplete="address-level1"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="zip" className="font-bold text-sm">Postal code *</label>
            <input
              id="zip"
              type="text"
              name="zip"
              value={form.zip}
              onChange={handleTextChange}
              className="p-2 border border-gray-300 rounded text-base"
              required
              autoComplete="postal-code"
            />
          </div>
        </div>

        {/* Fitness Journey */}
        <div className="flex flex-col gap-1">
          <span className="font-bold text-sm">What best describes your fitness journey? *</span>
          <div className="flex gap-5">
            {fitnessJourneyOptions.map((option) => (
              <label key={option} htmlFor={`fitnessJourney-${option}`} className="flex items-center gap-2 cursor-pointer">
                <input
                  id={`fitnessJourney-${option}`}
                  type="radio"
                  name="fitnessJourney"
                  value={option}
                  checked={form.fitnessJourney === option}
                  onChange={handleRadioChange}
                  autoComplete="off"
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        {/* Fitness Goal */}
        <div className="flex flex-col gap-1">
          <span className="font-bold text-sm">What is your current fitness goal? *</span>
          <div className="flex gap-5">
            {fitnessGoalOptions.map((option) => (
              <label key={option} htmlFor={`fitnessGoal-${option}`} className="flex items-center gap-2 cursor-pointer">
                <input
                  id={`fitnessGoal-${option}`}
                  type="radio"
                  name="fitnessGoal"
                  value={option}
                  checked={form.fitnessGoal === option}
                  onChange={handleRadioChange}
                  autoComplete="off"
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        {/* Release Language */}
        <div className="border border-gray-300 rounded p-4 mt-5">
          <h3 className="text-lg font-bold mb-2">Release Language</h3>
          <p>
            I assume all risk, known and unknown, associated with my presence on the premises or my use of any apparatus, appliance, facility, premises, or services whatsoever, owned or operated by club, and I release club (including its related or affiliated entities, and their owners, employees, agents, and assigns) from any and all claims or causes of action (known and unknown) arising out of the negligence of the club, whether active or passive (exclusive of gross negligence), or of any of its related or affiliated entities, and their owners, employees, agents, and assigns. This release and express assumption of risk applies forever, regardless of whether I am at or on the premises as a guest, a member, or otherwise.
          </p>
          <label htmlFor="waiver" className="flex items-start gap-2 cursor-pointer">
            <input
              id="waiver"
              type="checkbox"
              name="waiver"
              checked={form.waiver}
              onChange={handleCheckboxChange}
              required
              autoComplete="off"
            />
            <span>I acknowledge that I have carefully read this Waiver and Release and fully understand that it is a waiver and release of liability.*</span>
          </label>
        </div>

        {/* Communication Consent */}
        <div className="border border-gray-300 rounded p-4 mt-5">
          <h3 className="text-lg font-bold mb-2">Telephone Consumer Protection Act</h3>
          <p>
            By providing my contact information on this Guest Registration, I hereby expressly consent to the club and its related or affiliated entities, employees, agents, and assigns contacting me for marketing purposes by email, text, calling my cell phone or calling my residential land line, whether such contact be by direct or automated dialing, and whether such contact be in the form of direct human communication or automated or prerecorded message.
          </p>
          <label htmlFor="receiveComms" className="flex items-start gap-2 cursor-pointer">
            <input
              id="receiveComms"
              type="checkbox"
              name="receiveComms"
              checked={form.receiveComms}
              onChange={handleCheckboxChange}
              autoComplete="off"
            />
            <span>I agree to receive communication(s) from Gold's Gym</span>
          </label>
          <label htmlFor="receiveCommsGG" className="flex items-start gap-2 cursor-pointer">
            <input
              id="receiveCommsGG"
              type="checkbox"
              name="receiveCommsGG"
              checked={form.receiveCommsGG}
              onChange={handleCheckboxChange}
              autoComplete="off"
            />
            <span>I agree to receive communications from Gold's Gym SoCal.</span>
          </label>
          <p className="text-xs text-gray-600 mt-2">
            By submitting my mobile phone number and checking the box, I am consenting to receiving promotional updates from Gold's Gym regarding available subscriptions and gym services. Message frequency varies. Message and Data Rates may apply. Reply HELP for help. Reply STOP to OPT Out. No mobile information will be sold or shared with third parties/affiliates for marketing/promotional purposes. All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties. You can unsubscribe from email and text messaging communications at any time.
          </p>
        </div>

        {/* Submit */}
        <p className="text-sm text-gray-600">
          By clicking "Submit", you consent to allow Gold's Gym SoCal to store & process the personal information submitted above in order to provide you with the requested content.
        </p>

        <button
          type="submit"
          className={`py-3 px-6 rounded font-bold text-base ${
            submitting ? "bg-gray-300 cursor-not-allowed" : "bg-yellow-700 text-white cursor-pointer"
          }`}
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>

        {message && (
          <div
            className={`p-2 rounded mt-2 ${
              message.includes("successfully")
                ? "bg-green-100 text-green-800 border border-green-300"
                : "bg-red-100 text-red-800 border border-red-300"
            }`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default GoldsGymForm;
