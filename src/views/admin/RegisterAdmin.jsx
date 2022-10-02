import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Body from "./components/Body";
import { Box, Stack } from "@mui/system";
import AdminRegisterForm from "./components/AdminRegisterForm";

const RegisterAdmin = () => {
  return (
    <Box display="flex" flexDirection="column" sx={{ minHeight: "100vh" }}>
      <Navbar />
      <Stack
        direction="row"
        justifyContent="space-between"
        flex={1}
        overflow="auto"
      >
        <Sidebar />
        <AdminRegisterForm />
      </Stack>
    </Box>
  );
};

export default RegisterAdmin;
