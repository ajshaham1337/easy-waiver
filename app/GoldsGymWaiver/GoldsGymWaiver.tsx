// @ts-nocheck
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Button,
  Divider,
  Select,
  MenuItem,
  InputLabel,
  Link,
} from "@mui/material";

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

const toFormUrlEncoded = (obj) =>
  Object.entries(obj)
    .map(
      ([k, v]) =>
        encodeURIComponent(k) + "=" + encodeURIComponent(typeof v === "boolean" ? (v ? "true" : "false") : v)
    )
    .join("&");

const GoldsGymWaiver = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const slug = form.location?.slug || "hollywood";
      const endpoint = `https://offers-socal.goldsgym.com/${slug}-guest-vip`;
      const body = toFormUrlEncoded({ ...form, location: form.location.label });
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      if (!res.ok) throw new Error("Submission failed");
      setMessage("Form submitted successfully!");
    } catch {
      setMessage("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        justifyContent: "center",
        pt: 6,
        pb: 8,
        px: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: 550,
          bgcolor: "background.paper",
          border: 1,
          borderColor: "divider",
          boxShadow: 3,
          borderRadius: 2,
          p: { xs: 3, sm: 4 },
        }}
      >
        {/* Heading */}
        <Typography
          variant="h4"
          component="h1"
          fontWeight={700}
          align="center"
          sx={{ mb: 1, lineHeight: 1.2 }}
        >
          {`Welcome to Gold's Gym ${form.location.label}!`}<br />Let's get started...
        </Typography>
        <Box
          sx={{ width: 64, height: 4, bgcolor: "primary.main", mx: "auto", mb: 4 }}
        />

        {/* Location Select */}
        <FormControl fullWidth size="small" sx={{ mb: 3 }}>
          <InputLabel id="loc-label">Location</InputLabel>
          <Select
            labelId="loc-label"
            label="Location"
            name="location"
            value={form.location.label}
            onChange={(e) => {
              const loc = locations.find((l) => l.label === e.target.value) || locations[0];
              setForm((prev) => ({ ...prev, location: loc }));
            }}
          >
            {locations.map((loc) => (
              <MenuItem key={loc.slug} value={loc.label}>
                {loc.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Name Row */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            mb: 2,
          }}
        >
          <TextField
            label="First name"
            name="firstname"
            value={form.firstname}
            onChange={handleChange}
            size="small"
            fullWidth
            required
          />
          <TextField
            label="Last name"
            name="lastname"
            value={form.lastname}
            onChange={handleChange}
            size="small"
            fullWidth
            required
          />
        </Box>

        <TextField
          label="Phone number"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          size="small"
          fullWidth
          required
          sx={{ mb: 2 }}
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          size="small"
          fullWidth
          required
          sx={{ mb: 2 }}
        />

        <TextField
          label="Date of Birth"
          name="birthdate"
          type="date"
          value={form.birthdate}
          onChange={handleChange}
          size="small"
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 3 }}
        />

        {/* Gender */}
        <FormControl component="fieldset" sx={{ mb: 3 }}>
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            row
            name="gender"
            value={form.gender}
            onChange={handleChange}
          >
            {genderOptions.map((g) => (
              <FormControlLabel
                key={g}
                value={g}
                control={<Radio color="primary" />}
                label={g}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <TextField
          label="Street address"
          name="address"
          value={form.address}
          onChange={handleChange}
          size="small"
          fullWidth
          required
          sx={{ mb: 2 }}
        />

        <TextField
          label="City"
          name="city"
          value={form.city}
          onChange={handleChange}
          size="small"
          fullWidth
          required
          sx={{ mb: 2 }}
        />

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6}>
            <TextField
              label="State"
              name="state"
              value={form.state}
              onChange={handleChange}
              size="small"
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Postal code"
              name="zip"
              value={form.zip}
              onChange={handleChange}
              size="small"
              fullWidth
              required
            />
          </Grid>
        </Grid>

        {/* Fitness Journey */}
        <FormControl component="fieldset" sx={{ mb: 3 }}>
          <FormLabel component="legend">
            What best describes your fitness journey?
          </FormLabel>
          <RadioGroup
            name="fitnessJourney"
            value={form.fitnessJourney}
            onChange={handleChange}
          >
            {fitnessJourneyOptions.map((opt) => (
              <FormControlLabel
                key={opt}
                value={opt}
                control={<Radio color="primary" />}
                label={<Typography variant="body2">{opt}</Typography>}
              />
            ))}
          </RadioGroup>
        </FormControl>

        {/* Fitness Goal */}
        <FormControl component="fieldset" sx={{ mb: 3 }}>
          <FormLabel component="legend">
            What is your current fitness goal?
          </FormLabel>
          <RadioGroup
            name="fitnessGoal"
            value={form.fitnessGoal}
            onChange={handleChange}
          >
            {fitnessGoalOptions.map((opt) => (
              <FormControlLabel
                key={opt}
                value={opt}
                control={<Radio color="primary" />}
                label={<Typography variant="body2">{opt}</Typography>}
              />
            ))}
          </RadioGroup>
        </FormControl>

        {/* Release Language */}
        <Box
          sx={(theme) => ({
            bgcolor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[50],
            p: 2,
            borderRadius: 1,
            mb: 3,
          })}
        >
          <Typography variant="subtitle2" fontWeight={700} gutterBottom>
            Release Language
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            I assume all risk, known and unknown, associated with my presence on the premises or my use of any apparatus, appliance, facility, premises, or services whatsoever, owned or operated by club, and I release club (including its related or affiliated entities, and their owners, employees, agents, and assigns) from any and all claims or causes of action (known and unknown) arising out of the negligence of the club, whether active or passive (exclusive of gross negligence), or any of its related or affiliated entities, and their owners, employees, agents, and assigns.  This release and express assumption of risk applies forever, regardless of whether I am at or on the premises as a guest, a member, or otherwise.
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                name="waiver"
                checked={form.waiver}
                onChange={handleCheckboxChange}
                required
              />
            }
            label={
              <Typography variant="caption">
                I acknowledge that I have carefully read this Waiver and Release and fully understand that it is a waiver and release of liability.*
              </Typography>
            }
          />
        </Box>

        {/* Communication Consent */}
        <Box
          sx={(theme) => ({
            bgcolor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[50],
            p: 2,
            borderRadius: 1,
            mb: 3,
          })}
        >
          <Typography variant="subtitle2" fontWeight={700} gutterBottom>
            Telephone Consumer Protection Act
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            By providing my contact information on this Guest Registration, I hereby expressly consent to the club and its related or affiliated entities, employees, agents, and assigns contacting me for marketing purposes by email, text, calling my cell phone or calling my residential land line, whether such contact be by direct or automated dialing, and whether such contact be in the form of direct human communication or automated or prerecorded message.
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                name="receiveComms"
                checked={form.receiveComms}
                onChange={handleCheckboxChange}
              />
            }
            label={<Typography variant="caption">I agree to receive communication(s) from Gold's Gym</Typography>}
          />
        </Box>

        {/* Submit */}
        <Typography variant="caption" align="center" color="text.secondary" sx={{ mb: 2 }}>
          View our{' '}
          <Link
            href="https://join.goldsgymsocal.com/privacy-policy/?__hstc=74114509.3eb0df6fd0b2e7e7ce266100ea9dbc48.1750874448960.1752769690464.1752778984704.14&__hssc=74114509.1.1752778984704&__hsfp=532530906&_gl=1*nx593j*_gcl_au*MjA2MzYwNjE3My4xNzUwODc0NDQ4"
            target="_blank"
            underline="hover"
            color="primary"
          >
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link
            href="http://join.goldsgymsocal.com/agreement-terms/?__hstc=74114509.3eb0df6fd0b2e7e7ce266100ea9dbc48.1750874448960.1752769690464.1752778984704.14&__hssc=74114509.1.1752778984704&__hsfp=532530906&_gl=1*nx593j*_gcl_au*MjA2MzYwNjE3My4xNzUwODc0NDQ4"
            target="_blank"
            underline="hover"
            color="primary"
          >
            Terms and Conditions
          </Link>
          . Offer only valid at open Gold's Gym SoCal locations. Other restrictions may apply.
          <br />
          Message frequency varies. Reply HELP for help, STOP to cancel.
        </Typography>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={submitting}
          sx={{
            width: { xs: "100%", sm: 200 },
            alignSelf: "center",
            fontWeight: 700,
          }}
        >
          {submitting ? "Submitting..." : "SUBMIT"}
        </Button>

        {message && (
          <Box
            sx={{
              mt: 2,
              p: 2,
              bgcolor: message.includes("successfully") ? "success.light" : "error.light",
              color: message.includes("successfully") ? "success.contrastText" : "error.contrastText",
              borderRadius: 1,
              textAlign: "center",
            }}
          >
            <Typography variant="caption">{message}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default GoldsGymWaiver;
