import React, { useState } from "react";
import {
  Button,
  TextField,
  Card,
  CardContent,
  Grid,
  Typography,
  InputAdornment,
  Stack,
  Box,
} from "@mui/material";

const clamp = (value, min = 0, max = Infinity) => {
  const n = Number(value);
  if (Number.isNaN(n)) return "";
  return String(Math.max(min, Math.min(max, Math.floor(n))));
};

const ExamClock = () => {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  const minutesValid = minutes === "" || (Number(minutes) >= 0 && Number(minutes) <= 59);
  const secondsValid = seconds === "" || (Number(seconds) >= 0 && Number(seconds) <= 59);

  const handleSave = () => {
    const h = Number(hours || 0);
    const m = Number(minutes || 0);
    const s = Number(seconds || 0);

    const totalSeconds = h * 3600 + m * 60 + s;

    alert(
      `Exam Time Saved: ${h}h ${m}m ${s}s\nTotal Seconds: ${totalSeconds}`
    );

    // TODO: send totalSeconds to backend
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 8, px: 2 }}>
      <Card sx={{ width: "100%", maxWidth: 520 }}>
        <CardContent>
          <Typography variant="h6" align="center" gutterBottom>
            Teacher Panel — Set Exam Time
          </Typography>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="number"
                label="Hours"
                value={hours}
                onChange={(e) => setHours(clamp(e.target.value, 0, 99))}
                InputProps={{ endAdornment: <InputAdornment position="end">h</InputAdornment> }}
                helperText="Enter hours (0-99)"
              />
            </Grid>

            <Grid item xs={6} sm={4}>
              <TextField
                fullWidth
                type="number"
                label="Minutes"
                value={minutes}
                onChange={(e) => setMinutes(clamp(e.target.value, 0, 59))}
                error={!minutesValid}
                helperText={!minutesValid ? "Must be 0–59" : "Enter minutes (0-59)"}
                InputProps={{ endAdornment: <InputAdornment position="end">m</InputAdornment> }}
              />
            </Grid>

            <Grid item xs={6} sm={4}>
              <TextField
                fullWidth
                type="number"
                label="Seconds"
                value={seconds}
                onChange={(e) => setSeconds(clamp(e.target.value, 0, 59))}
                error={!secondsValid}
                helperText={!secondsValid ? "Must be 0–59" : "Enter seconds (0-59)"}
                InputProps={{ endAdornment: <InputAdornment position="end">s</InputAdornment> }}
              />
            </Grid>

            <Grid item xs={12}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
                <Button
                  variant="contained"
                  onClick={handleSave}
                  disabled={(hours === "" && minutes === "" && seconds === "") || !minutesValid || !secondsValid}
                >
                  Save Exam Time
                </Button>

                <Typography variant="body2" color="text.secondary">
                  Preview: {hours || 0}h {minutes || 0}m {seconds || 0}s
                </Typography>

                <Typography variant="caption" color="text.secondary" sx={{ ml: "auto" }}>
                  Note: Minutes and seconds must be 0–59
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ExamClock;
