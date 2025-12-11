import { Box, Typography, Link } from "@mui/material";

const Banner = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 70,
        left: "50%",
        transform: "translateX(-50%)",
        bgcolor: "background.paper",
        color: "text.primary",
        px: 2,
        py: 1,
        borderRadius: 2,
        boxShadow: 3,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        width: {
            xs: "90%",
            sm: "auto",
    },
      }}
    >
      <Typography
        variant="body2"
        sx={{
          paddingLeft: 5,
          paddingRight: 5,
          width: "100%",
          textAlign: "center",
          fontSize: {
            xs: "0.75rem", // small screens
            sm: "0.875rem", // tablets
            md: "1rem",     // desktops
            lg: "1.2rem",     // desktops
          },
          fontWeight: 400,
        }}
      >
        Previous version available{" "}
        <Link
          href="https://ligify.streamlit.app"
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          color="primary"
          sx={{ ml: 0.5 }}
        >
          <i>here</i>
        </Link>
      </Typography>
    </Box>
  );
};

export default Banner;