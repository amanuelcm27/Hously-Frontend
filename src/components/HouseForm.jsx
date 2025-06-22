import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Slider,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import axios from "axios";

const HouseForm = ({ onPredict }) => {
  const [formData, setFormData] = useState({
    bedrooms: 3,
    bathrooms: 1,
    sqft_living: 1180,
    sqft_lot: 5650,
    floors: 1,
    waterfront: false, // 0 -> false
    view: 0,
    condition: 3,
    grade: 7,
    sqft_above: 1180,
    sqft_basement: 0,
    yr_built: 1955,
    yr_renovated: 0,
    zipcode: "98178",
    lat: 47.5112,
    long: -122.257,
    sqft_living15: 1340,
    sqft_lot15: 5650,
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSliderChange = (name) => (e, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePredict = async () => {
    setLoading(true);
    try {
      const payload = {
        ...formData,
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        sqft_living: Number(formData.sqft_living),
        sqft_lot: Number(formData.sqft_lot),
        floors: Number(formData.floors),
        waterfront: Boolean(formData.waterfront),
        view: Number(formData.view),
        condition: Number(formData.condition),
        grade: Number(formData.grade),
        sqft_above: Number(formData.sqft_above),
        sqft_basement: Number(formData.sqft_basement),
        yr_built: Number(formData.yr_built),
        yr_renovated: Number(formData.yr_renovated),
        lat: Number(formData.lat),
        long: Number(formData.long),
        sqft_living15: Number(formData.sqft_living15),
        sqft_lot15: Number(formData.sqft_lot15),
        zipcode: formData.zipcode,
      };
      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        payload
      );
      if (response.data && response.data.predicted_price) {
        if (typeof onPredict === "function")
          onPredict(response.data.predicted_price);
      } else {
        setError("No price returned from server.");
        setOpen(true);
        if (typeof onPredict === "function")
          onPredict("Error: No price returned");
      }
    } catch (err) {
      setError("Could not connect to server.");
      setOpen(true);
      if (typeof onPredict === "function")
        onPredict("Error: Could not connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{ p: 1, height: "100%", display: "flex", flexDirection: "column" }}
    >
      {/* Error Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>{error}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Header with logo, subtitle, and button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            flex: 1,
          }}
        >
          <Box
            sx={{
              fontWeight: 900,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              letterSpacing: "0.05em",
              background: "linear-gradient(90deg, #1DB954 30%, #1ed760 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textFillColor: "transparent",
              textShadow: "0 2px 16px rgba(29,185,84,0.15)",
              fontFamily:
                "Montserrat, Circular, Helvetica Neue, Arial, sans-serif",
              lineHeight: 1.1,
              userSelect: "none",
            }}
          >
            Hously
          </Box>
          <Box sx={{ mt: 0.5 }}>
            <Typography
              variant="subtitle2"
              sx={{
                color: "#b3b3b3",
                fontWeight: 400,
                fontSize: { xs: "0.95rem", sm: "1.05rem" },
                letterSpacing: 0.1,
              }}
            >
              Discover house prices based on your preference
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          size="medium"
          onClick={handlePredict}
          sx={{ px: 3, py: 1 }}
          disabled={loading}
        >
          {loading ? "Predicting..." : "Predict Price"}
        </Button>
      </Box>

      {/* Main form grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 1,
          flex: 1,
          overflow: "hidden",
        }}
      >
        {/* Basic Features */}
        <Box>
          <Typography
            variant="subtitle1"
            sx={{ color: "white", mb: 1, fontSize: "0.9rem" }}
          >
            Basic Features
          </Typography>
          <TextField
            fullWidth
            label="Bedrooms"
            name="bedrooms"
            type="number"
            value={formData.bedrooms}
            onChange={handleChange}
            size="small"
            sx={{ mb: 1 }}
          />
          <TextField
            fullWidth
            label="Bathrooms"
            name="bathrooms"
            type="number"
            value={formData.bathrooms}
            onChange={handleChange}
            size="small"
            sx={{ mb: 1 }}
          />
          <TextField
            fullWidth
            label="Floors"
            name="floors"
            type="number"
            value={formData.floors}
            onChange={handleChange}
            size="small"
          />
        </Box>

        {/* Square Footage */}
        <Box>
          <Typography
            variant="subtitle1"
            sx={{ color: "white", mb: 1, fontSize: "0.9rem" }}
          >
            Square Footage
          </Typography>
          <TextField
            fullWidth
            label="Living Space"
            name="sqft_living"
            type="number"
            value={formData.sqft_living}
            onChange={handleChange}
            size="small"
            sx={{ mb: 1 }}
          />
          <TextField
            fullWidth
            label="Lot Size"
            name="sqft_lot"
            type="number"
            value={formData.sqft_lot}
            onChange={handleChange}
            size="small"
            sx={{ mb: 1 }}
          />
          <TextField
            fullWidth
            label="Above Ground"
            name="sqft_above"
            type="number"
            value={formData.sqft_above}
            onChange={handleChange}
            size="small"
            sx={{ mb: 1 }}
          />
          <TextField
            fullWidth
            label="Basement"
            name="sqft_basement"
            type="number"
            value={formData.sqft_basement}
            onChange={handleChange}
            size="small"
          />
        </Box>

        {/* Quality & Condition */}
        <Box>
          <Typography
            variant="subtitle1"
            sx={{ color: "white", mb: 1, fontSize: "0.9rem" }}
          >
            Quality & Condition
          </Typography>

          <Typography
            variant="caption"
            sx={{ color: "white", display: "block" }}
          >
            Grade: {formData.grade}
          </Typography>
          <Slider
            name="grade"
            value={formData.grade}
            onChange={handleSliderChange("grade")}
            min={1}
            max={13}
            step={1}
            sx={{
              mb: 1,
              height: 30,
              "& .MuiSlider-thumb": {
                width: 20,
                height: 20,
                backgroundColor: "#1DB954",
                border: "2px solid #fff",
              },
              "& .MuiSlider-track": {
                backgroundColor: "#1DB954",
                height: 6,
              },
              "& .MuiSlider-rail": {
                backgroundColor: "#666",
                height: 6,
              },
            }}
          />

          <Typography
            variant="caption"
            sx={{ color: "white", display: "block" }}
          >
            Condition: {formData.condition}
          </Typography>
          <Slider
            name="condition"
            value={formData.condition}
            onChange={handleSliderChange("condition")}
            min={1}
            max={5}
            step={1}
            sx={{
              mb: 1,
              height: 30,
              "& .MuiSlider-thumb": {
                width: 20,
                height: 20,
                backgroundColor: "#1DB954",
                border: "2px solid #fff",
              },
              "& .MuiSlider-track": {
                backgroundColor: "#1DB954",
                height: 6,
              },
              "& .MuiSlider-rail": {
                backgroundColor: "#666",
                height: 6,
              },
            }}
          />

          <Typography
            variant="caption"
            sx={{ color: "white", display: "block" }}
          >
            View: {formData.view}
          </Typography>
          <Slider
            name="view"
            value={formData.view}
            onChange={handleSliderChange("view")}
            min={0}
            max={4}
            step={1}
            sx={{
              mb: 1,
              height: 30,
              "& .MuiSlider-thumb": {
                width: 20,
                height: 20,
                backgroundColor: "#1DB954",
                border: "2px solid #fff",
              },
              "& .MuiSlider-track": {
                backgroundColor: "#1DB954",
                height: 6,
              },
              "& .MuiSlider-rail": {
                backgroundColor: "#666",
                height: 6,
              },
            }}
          />

          <FormControlLabel
            control={
              <Switch
                name="waterfront"
                checked={formData.waterfront}
                onChange={handleChange}
                size="small"
              />
            }
            label="Waterfront"
            sx={{ color: "white", fontSize: "0.8rem" }}
          />
        </Box>

        {/* Location & History */}
        <Box>
          <Typography
            variant="subtitle1"
            sx={{ color: "white", mb: 1, fontSize: "0.9rem" }}
          >
            Location & History
          </Typography>

          <TextField
            fullWidth
            label="Zipcode"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleChange}
            size="small"
            sx={{ mb: 1 }}
          />

          <TextField
            fullWidth
            label="Latitude"
            name="lat"
            type="number"
            value={formData.lat}
            onChange={handleChange}
            size="small"
            sx={{ mb: 1 }}
          />
          <TextField
            fullWidth
            label="Longitude"
            name="long"
            type="number"
            value={formData.long}
            onChange={handleChange}
            size="small"
            sx={{ mb: 1 }}
          />

          <TextField
            fullWidth
            label="Year Built"
            name="yr_built"
            type="number"
            value={formData.yr_built}
            onChange={handleChange}
            size="small"
            sx={{ mb: 1 }}
          />
          <TextField
            fullWidth
            label="Year Renovated"
            name="yr_renovated"
            type="number"
            value={formData.yr_renovated}
            onChange={handleChange}
            size="small"
          />
        </Box>

        {/* Neighborhood Data */}
        <Box>
          <Typography
            variant="subtitle1"
            sx={{ color: "white", mb: 1, fontSize: "0.9rem" }}
          >
            Neighborhood Data
          </Typography>
          <TextField
            fullWidth
            label="Avg. Living Space (15 neighbors)"
            name="sqft_living15"
            type="number"
            value={formData.sqft_living15}
            onChange={handleChange}
            size="small"
            sx={{ mb: 1 }}
          />
          <TextField
            fullWidth
            label="Avg. Lot Size (15 neighbors)"
            name="sqft_lot15"
            type="number"
            value={formData.sqft_lot15}
            onChange={handleChange}
            size="small"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default HouseForm;
