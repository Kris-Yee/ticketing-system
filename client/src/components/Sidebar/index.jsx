 import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
  } from "@mui/material";
  import {
    Dashboard as DashboardIcon,
    Person as PersonIcon,
    Settings as SettingsIcon,
    Task as TaskIcon
  } from "@mui/icons-material";
  import { useNavigate } from "react-router";

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Tasks", icon: <TaskIcon />, path: "/task" },
    { text: "Profile", icon: <PersonIcon />, path: "/profile" },
    { text: "Settings", icon: <SettingsIcon />, path: "/settings" }
  ];

  function Sidebar() {
    const navigate = useNavigate();

    return (
      <Box>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );
  }

export default Sidebar;