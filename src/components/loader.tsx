import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Box sx={{ margin: "20px", display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  );
};

export default Loader;
