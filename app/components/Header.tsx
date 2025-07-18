import { AppBar, Toolbar, Typography, IconButton, Tabs, Tab } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useState } from "react";
import { useColorModeStore } from "../store/useColorModeStore";
import { useTheme } from "@mui/material";

export default function Header() {
  const toggle = useColorModeStore((s) => s.toggle);
  const theme = useTheme();
  const [value, setValue] = useState(0);
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={(theme) => ({
        bgcolor:
          theme.palette.mode === 'dark'
            ? theme.palette.grey[900]
            : theme.palette.grey[100],
        borderBottom: `1px solid ${theme.palette.divider}`,
      })}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Tabs value={value} onChange={(_, v) => setValue(v)} textColor="inherit">
          <Tab label="Gold's Gym Waiver" />
        </Tabs>
        <IconButton onClick={toggle} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}       
