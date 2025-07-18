import { Box, Link, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={(theme) => ({
        mt: 8,
        py: 3,
        textAlign: "center",
        borderTop: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
      })}
    >
      <Typography variant="body2" color="text.secondary">
        <Link href="https://github.com/ajshaham1337" target="_blank" underline="hover" sx={{ mx: 1 }}>
          GitHub
        </Link>
        |
        <Link
          href="https://docs.google.com/document/d/1yij0VwsXpFGhGTId90FHd0vrNi34CK9f_7rsJymSwh8/edit?usp=sharing"
          target="_blank"
          underline="hover"
          sx={{ mx: 1 }}
        >
          Résumé
        </Link>
        |
        <Link href="mailto:ajshaham@gmail.com" underline="hover" sx={{ mx: 1 }}>
          ajshaham@gmail.com
        </Link>
      </Typography>
    </Box>
  );
} 
