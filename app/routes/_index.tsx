// @ts-nocheck
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

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

function toFormUrlEncoded(obj) {
  return Object.entries(obj)
    .map(
      ([k, v]) =>
        encodeURIComponent(k) + "=" + encodeURIComponent(typeof v === "boolean" ? (v ? "true" : "false") : v)
    )
    .join("&");
}

export default function GoldsGymForm() {
  const [form, setForm] = useState(initialForm);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("golds-gym-form");
    if (saved) setForm(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("golds-gym-form", JSON.stringify(form));
  }, [form]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleLocationChange = (_, value) => {
    setForm((prev) => ({ ...prev, location: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Build endpoint
      const slug = form.location?.slug || "hollywood";
      const endpoint = `https://offers-socal.goldsgym.com/${slug}-guest-vip`;
      // Build form data
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
      setSnackbar({ open: true, message: "Form submitted successfully!", severity: "success" });
    } catch (err) {
      setSnackbar({ open: true, message: "Submission failed. Please try again.", severity: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} autoComplete="off" sx={{ width: "100%" }}>
      <Typography variant="h4" fontWeight={700} mb={2}>
        Gold's Gym Guest Pass Registration
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            options={locations}
            getOptionLabel={(option) => option.label}
            value={form.location}
            onChange={handleLocationChange}
            renderInput={(params) => <TextField {...params} label="Location" required name="location" />} />
        </Grid>
        <Grid item xs={12} sm={6} />
        <Grid item xs={12} sm={6}>
          <TextField label="First name" name="firstname" required fullWidth value={form.firstname} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Last name" name="lastname" required fullWidth value={form.lastname} onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Phone number" name="phone" required fullWidth value={form.phone} onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Email" name="email" type="email" required fullWidth value={form.email} onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Date of Birth" name="birthdate" type="date" required fullWidth value={form.birthdate} onChange={handleChange} InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset" required>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup row name="gender" value={form.gender} onChange={handleChange}>
              {genderOptions.map((g) => (
                <FormControlLabel key={g} value={g} control={<Radio />} label={g} />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField label="Street address" name="address" required fullWidth value={form.address} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="City" name="city" required fullWidth value={form.city} onChange={handleChange} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField label="State" name="state" required fullWidth value={form.state} onChange={handleChange} inputProps={{ readOnly: true }} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField label="Postal code" name="zip" required fullWidth value={form.zip} onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset" required sx={{ mt: 2 }}>
            <FormLabel component="legend">What best describes your fitness journey?</FormLabel>
            <RadioGroup name="fitnessJourney" value={form.fitnessJourney} onChange={handleChange}>
              {fitnessJourneyOptions.map((opt) => (
                <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset" required sx={{ mt: 2 }}>
            <FormLabel component="legend">What is your current fitness goal?</FormLabel>
            <RadioGroup name="fitnessGoal" value={form.fitnessGoal} onChange={handleChange} row>
              {fitnessGoalOptions.map((opt) => (
                <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
        {/* --- Release Language Section --- */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 3 }}>
            Release Language
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            I assume all risk, known and unknown, associated with my presence on the premises or my use of any apparatus, appliance, facility, premises, or services whatsoever, owned or operated by club, and I release club (including its related or affiliated entities, and their owners, employees, agents, and assigns) from any and all claims or causes of action (known and unknown) arising out of the negligence of the club, whether active or passive (exclusive of gross negligence), or of any of its related or affiliated entities, and their owners, employees, agents, and assigns. This release and express assumption of risk applies forever, regardless of whether I am at or on the premises as a guest, a member, or otherwise.
          </Typography>
        </Grid>
        {/* --- Waiver Checkbox --- */}
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox name="waiver" checked={form.waiver} onChange={handleChange} required />}
            label={<Typography variant="body2" fontWeight="bold">I acknowledge that I have carefully read this Waiver and Release and fully understand that it is a waiver and release of liability.*</Typography>}
          />
        </Grid>
        {/* --- Telephone Consumer Protection Act Section --- */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 3 }}>
            Telephone Consumer Protection Act
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            By providing my contact information on this Guest Registration, I hereby expressly consent to the club and its related or affiliated entities, employees, agents, and assigns contacting me for marketing purposes by email, text, calling my cell phone or calling my residential land line, whether such contact be by direct or automated dialing, and whether such contact be in the form of direct human communication or automated or prerecorded message.
          </Typography>
        </Grid>
        {/* --- Communication Consent Checkboxes --- */}
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox name="receiveComms" checked={form.receiveComms} onChange={handleChange} />}
            label={<Typography variant="body2" fontWeight="bold">I agree to receive communication(s) from Gold's Gym</Typography>}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox name="receiveCommsGG" checked={form.receiveCommsGG} onChange={handleChange} />}
            label={<Typography variant="body2" fontWeight="bold">I agree to receive communications from Gold's Gym SoCal.</Typography>}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            By submitting my mobile phone number and checking the box, I am consenting to receiving promotional updates from Gold's Gym regarding available subscriptions and gym services. Message frequency varies. Message and Data Rates may apply. Reply HELP for help. Reply STOP to OPT Out. No mobile information will be sold or shared with third parties/affiliates for marketing/promotional purposes. All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties. You can unsubscribe from email and text messaging communications at any time.
          </Typography>
        </Grid>
        {/* --- Submit Consent --- */}
        <Grid item xs={12}>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            By clicking “Submit”, you consent to allow Gold’s Gym SoCal to store & process the personal information submitted above in order to provide you with the requested content.
          </Typography>
        </Grid>
        {/* --- Policy Links and Disclaimer --- */}
        <Grid item xs={12}>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2, mb: 0 }}>
            View our{' '}
            <a href="https://join.goldsgymsocal.com/privacy-policy/?__hstc=74114509.3eb0df6fd0b2e7e7ce266100ea9dbc48.1750874448960.1751306463941.1752617160569.10&__hssc=74114509.1.1752617160569&__hsfp=532530906&_gl=1*4bupmr*_gcl_au*MjA2MzYwNjE3My4xNzUwODc0NDQ4" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
              Privacy Policy
            </a>{' '}and{' '}
            <a href="https://join.goldsgymsocal.com/agreement-terms/?__hstc=74114509.3eb0df6fd0b2e7e7ce266100ea9dbc48.1750874448960.1751306463941.1752617160569.10&__hssc=74114509.1.1752617160569&__hsfp=532530906&_gl=1*4bupmr*_gcl_au*MjA2MzYwNjE3My4xNzUwODc0NDQ4" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
              Terms and Conditions
            </a>. Offer only valid at open Gold's Gym SoCal locations. Other restrictions may apply.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Message frequency varies. Reply HELP for help, STOP to cancel.
          </Typography>
        </Grid>
        {/* --- Submit Button --- */}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 2, bgcolor: '#bfa23a', color: '#fff', fontWeight: 'bold', '&:hover': { bgcolor: '#a68d2a' } }} disabled={submitting}>
            {submitting ? "Submitting..." : "SUBMIT"}
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

