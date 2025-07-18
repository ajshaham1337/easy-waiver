import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      primary: { main: "#ffd600" },
    },
    shape: { borderRadius: 4 },
    typography: {
      fontFamily: [
        "Inter",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Oxygen",
        "Ubuntu",
        "Cantarell",
        "Fira Sans",
        "Droid Sans",
        "Helvetica Neue",
        "sans-serif",
      ].join(","),
    },
    components: {
      MuiPaper: {
        variants: [
          {
            props: { variant: 'goldCard' },
            style: ({ theme }) => ({
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: theme.shadows[3],
              borderRadius: theme.shape.borderRadius,
            }),
          },
        ],
      },
    },
  }); 