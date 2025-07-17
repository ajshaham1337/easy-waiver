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
  debugger; // This will pause on every render
  console.log('GoldsGymForm component rendering');
  
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
    debugger; // This will pause execution here
    console.trace('Text change called'); // Shows call stack
    const { name, value } = e.target;
    console.log('Text change:', name, value);
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    debugger; // This will pause execution here
    const { name, checked } = e.target;
    console.log('Checkbox change:', name, checked);
    setForm((prev) => ({ ...prev, [name]: checked }));
  };

  const handleRadioChange = (e) => {
    debugger; // This will pause execution here
    const { name, value } = e.target;
    console.log('Radio change:', name, value);
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (e) => {
    const selectedLocation = locations.find(loc => loc.label === e.target.value);
    console.log('Location change:', selectedLocation);
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

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    row: {
      display: 'flex',
      gap: '20px'
    },
    field: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5px'
    },
    label: {
      fontWeight: 'bold',
      fontSize: '14px'
    },
    input: {
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '16px'
    },
    select: {
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '16px'
    },
    radioGroup: {
      display: 'flex',
      gap: '20px',
      flexWrap: 'wrap'
    },
    radioLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      cursor: 'pointer'
    },
    checkboxLabel: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '10px',
      cursor: 'pointer'
    },
    button: {
      padding: '15px 30px',
      backgroundColor: '#bfa23a',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer'
    },
    buttonDisabled: {
      padding: '15px 30px',
      backgroundColor: '#ccc',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'not-allowed'
    },
    message: {
      padding: '10px',
      borderRadius: '4px',
      marginTop: '10px'
    },
    success: {
      backgroundColor: '#d4edda',
      color: '#155724',
      border: '1px solid #c3e6cb'
    },
    error: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
      border: '1px solid #f5c6cb'
    },
    section: {
      border: '1px solid #ddd',
      padding: '20px',
      borderRadius: '4px',
      marginTop: '20px'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
      textAlign: 'center'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Gold's Gym Guest Pass Registration</h1>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Location */}
        <div style={styles.field}>
          <label htmlFor="location" style={styles.label}>Location *</label>
          <select 
            id="location"
            name="location"
            value={form.location?.label || ""} 
            onChange={handleLocationChange}
            style={styles.select}
            required
            autoComplete="organization"
          >
            {locations.map((location) => (
              <option key={location.slug} value={location.label}>
                {location.label}
              </option>
            ))}
          </select>
        </div>

        {/* Name fields */}
        <div style={styles.row}>
          <div style={{...styles.field, flex: 1}}>
            <label htmlFor="firstname" style={styles.label}>First name *</label>
            <input
              id="firstname"
              name="firstname"
              type="text"
              value={form.firstname}
              onChange={handleTextChange}
              style={styles.input}
              required
              autoComplete="given-name"
            />
          </div>
          <div style={{...styles.field, flex: 1}}>
            <label htmlFor="lastname" style={styles.label}>Last name *</label>
            <input
              id="lastname"
              name="lastname"
              type="text"
              value={form.lastname}
              onChange={handleTextChange}
              style={styles.input}
              required
              autoComplete="family-name"
            />
          </div>
        </div>

        {/* Contact info */}
        <div style={styles.field}>
          <label htmlFor="phone" style={styles.label}>Phone number *</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleTextChange}
            style={styles.input}
            required
            autoComplete="tel"
          />
        </div>

        <div style={styles.field}>
          <label htmlFor="email" style={styles.label}>Email *</label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleTextChange}
            style={styles.input}
            required
            autoComplete="email"
          />
        </div>

        <div style={styles.field}>
          <label htmlFor="birthdate" style={styles.label}>Date of Birth *</label>
          <input
            id="birthdate"
            name="birthdate"
            type="date"
            value={form.birthdate}
            onChange={handleTextChange}
            style={styles.input}
            required
            autoComplete="bday"
          />
        </div>

        {/* Gender */}
        <div style={styles.field}>
          <span style={styles.label}>Gender *</span>
          <div style={styles.radioGroup}>
            {genderOptions.map((gender) => (
              <label key={gender} htmlFor={`gender-${gender}`} style={styles.radioLabel}>
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
        <div style={styles.field}>
          <label htmlFor="address" style={styles.label}>Street address *</label>
          <input
            id="address"
            type="text"
            name="address"
            value={form.address}
            onChange={handleTextChange}
            style={styles.input}
            required
            autoComplete="street-address"
          />
        </div>

        <div style={styles.row}>
          <div style={{...styles.field, flex: 1}}>
            <label htmlFor="city" style={styles.label}>City *</label>
            <input
              id="city"
              type="text"
              name="city"
              value={form.city}
              onChange={handleTextChange}
              style={styles.input}
              required
              autoComplete="address-level2"
            />
          </div>
          <div style={{...styles.field, flex: 1}}>
            <label htmlFor="state" style={styles.label}>State *</label>
            <input
              id="state"
              type="text"
              name="state"
              value={form.state}
              onChange={handleTextChange}
              style={styles.input}
              readOnly
              autoComplete="address-level1"
            />
          </div>
          <div style={{...styles.field, flex: 1}}>
            <label htmlFor="zip" style={styles.label}>Postal code *</label>
            <input
              id="zip"
              type="text"
              name="zip"
              value={form.zip}
              onChange={handleTextChange}
              style={styles.input}
              required
              autoComplete="postal-code"
            />
          </div>
        </div>

        {/* Fitness Journey */}
        <div style={styles.field}>
          <span style={styles.label}>What best describes your fitness journey? *</span>
          <div style={styles.radioGroup}>
            {fitnessJourneyOptions.map((option) => (
              <label key={option} htmlFor={`fitnessJourney-${option}`} style={styles.radioLabel}>
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
        <div style={styles.field}>
          <span style={styles.label}>What is your current fitness goal? *</span>
          <div style={styles.radioGroup}>
            {fitnessGoalOptions.map((option) => (
              <label key={option} htmlFor={`fitnessGoal-${option}`} style={styles.radioLabel}>
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
        <div style={styles.section}>
          <h3>Release Language</h3>
          <p>
            I assume all risk, known and unknown, associated with my presence on the premises or my use of any apparatus, appliance, facility, premises, or services whatsoever, owned or operated by club, and I release club (including its related or affiliated entities, and their owners, employees, agents, and assigns) from any and all claims or causes of action (known and unknown) arising out of the negligence of the club, whether active or passive (exclusive of gross negligence), or of any of its related or affiliated entities, and their owners, employees, agents, and assigns. This release and express assumption of risk applies forever, regardless of whether I am at or on the premises as a guest, a member, or otherwise.
          </p>
          <label htmlFor="waiver" style={styles.checkboxLabel}>
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
        <div style={styles.section}>
          <h3>Telephone Consumer Protection Act</h3>
          <p>
            By providing my contact information on this Guest Registration, I hereby expressly consent to the club and its related or affiliated entities, employees, agents, and assigns contacting me for marketing purposes by email, text, calling my cell phone or calling my residential land line, whether such contact be by direct or automated dialing, and whether such contact be in the form of direct human communication or automated or prerecorded message.
          </p>
          <label htmlFor="receiveComms" style={styles.checkboxLabel}>
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
          <label htmlFor="receiveCommsGG" style={styles.checkboxLabel}>
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
          <p style={{fontSize: '12px', color: '#666', marginTop: '10px'}}>
            By submitting my mobile phone number and checking the box, I am consenting to receiving promotional updates from Gold's Gym regarding available subscriptions and gym services. Message frequency varies. Message and Data Rates may apply. Reply HELP for help. Reply STOP to OPT Out. No mobile information will be sold or shared with third parties/affiliates for marketing/promotional purposes. All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties. You can unsubscribe from email and text messaging communications at any time.
          </p>
        </div>

        {/* Submit */}
        <p style={{fontSize: '14px', color: '#666'}}>
          By clicking "Submit", you consent to allow Gold's Gym SoCal to store & process the personal information submitted above in order to provide you with the requested content.
        </p>

        <button
          type="submit"
          disabled={submitting}
          style={submitting ? styles.buttonDisabled : styles.button}
        >
          {submitting ? "Submitting..." : "SUBMIT"}
        </button>

        {message && (
          <div style={{
            ...styles.message,
            ...(message.includes('successfully') ? styles.success : styles.error)
          }}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default GoldsGymForm;
