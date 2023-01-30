import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

const MenuBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            <Link href="/">Poke-challenge</Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MenuBar;
