import React, { useState } from "react";
import { Button, TextField, Card, CardContent } from "@mui/material";
const ExamClock = () => {
  
   const [examTime, setExamTime] = useState("");

  const handleSave = () => {
    alert(`Exam time saved: ${examTime} minutes`);
    // later: is time ko backend / student page pe bhejenge
  };
  return (
    <>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 60 }}>
      <Card sx={{ width: 380 }}>
        <CardContent>
          <h2 style={{ textAlign: "center" }}>Teacher Panel</h2>

          <TextField
            fullWidth
            type="number"
            label="Exam Time (Minutes)"
            value={examTime}
            onChange={(e) => setExamTime(e.target.value)}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={handleSave}
            disabled={!examTime}
          >
            Save Exam Time
          </Button>

         
        </CardContent>
      </Card>
    </div>
    </>
  )
}

export default ExamClock
