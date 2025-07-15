import { useState } from "react";
import { Outlet } from "@remix-run/react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function App() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Easy Waiver</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" />
      </head>
      <body style={{ minHeight: "100vh", background: "#f5f5f5" }}>
        <AppBar position="sticky" color="default" elevation={1}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Easy Waiver
            </Typography>
            <Tabs
              value={activeTab}
              onChange={(_, v) => setActiveTab(v)}
              textColor="primary"
              indicatorColor="primary"
              aria-label="tabs"
            >
              <Tab label="Gold's Gym" />
              <Tab label="Other (Coming Soon)" disabled />
            </Tabs>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md" sx={{ py: 6 }}>
          <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 2 }}>
            {activeTab === 0 && <Outlet />}
            {activeTab !== 0 && (
              <Box textAlign="center" color="text.secondary" py={8}>
                Other integrations coming soon.
              </Box>
            )}
          </Paper>
        </Container>
      </body>
    </html>
  );
}
