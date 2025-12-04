import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const initialValues = {
  name: "",
  email: "",
  message: "",
  company: "",
};

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");
    setFieldErrors({});

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("message", values.message);
    formData.append("company", values.company);

    try {
      const response = await fetch("/api/contact.php", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data?.ok) {
        setSuccess(true);
        setValues(initialValues);
        return;
      }

      if (response.status === 400 && data?.errors) {
        setFieldErrors(data.errors);
        return;
      }

      setError(data?.error || "Something went wrong. Please try again later.");
    } catch (fetchError) {
      console.error("Contact form submission failed", fetchError);
      setError("Unable to send your message right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={2.5}>
        {success && (
          <Alert severity="success" onClose={() => setSuccess(false)}>
            Thanks for reaching out! I will get back to you shortly.
          </Alert>
        )}

        {error && (
          <Alert severity="error" onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        <TextField
          label="Name"
          name="name"
          value={values.name}
          onChange={handleChange}
          required
          error={Boolean(fieldErrors.name)}
          helperText={fieldErrors.name}
          fullWidth
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          required
          error={Boolean(fieldErrors.email)}
          helperText={fieldErrors.email}
          fullWidth
        />

        <TextField
          label="Message"
          name="message"
          value={values.message}
          onChange={handleChange}
          required
          multiline
          minRows={4}
          error={Boolean(fieldErrors.message)}
          helperText={fieldErrors.message}
          fullWidth
        />

        <Box sx={{ position: "absolute", left: "-9999px", width: 1, height: 0 }}>
          <label htmlFor="company">Company</label>
          <input
            id="company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.company}
            onChange={handleChange}
          />
        </Box>

        <Stack direction="row" spacing={1.5} alignItems="center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ minWidth: 140 }}
          >
            {loading ? (
              <Stack direction="row" spacing={1} alignItems="center">
                <CircularProgress size={20} color="inherit" />
                <Typography variant="button" component="span">
                  Sending
                </Typography>
              </Stack>
            ) : (
              "Send message"
            )}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
