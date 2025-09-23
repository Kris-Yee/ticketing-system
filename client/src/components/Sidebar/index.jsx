import {
   Box,
   List,
   ListItem,
   ListItemButton,
   ListItemIcon,
   ListItemText,
   Collapse,
   IconButton,
   Divider,
   useTheme
 } from "@mui/material";
import {
  Dashboard,
  Person,
  Settings as SettingsIcon,
  Task,
  ChevronRight,
  AccountCircle,
  ArrowRightRounded,
} from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useState } from "react";

  const menuConfig = [
    { text: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
    { text: "Tasks", icon: <Task />, path: "/task" },
    { text: "Profile", icon: <Person />, path: "/profile" },
    {
      text: "Settings",
      icon: <SettingsIcon />,
      isGroup: true,
      children: [
        { text: "Roles", path: "/roles", icon: <ArrowRightRounded /> },
       
      ]
    }
  ];

  function Sidebar() {
    const navigate = useNavigate();
    const theme = useTheme();
    const [openGroups, setOpenGroups] = useState({});

    const toggleGroup = (groupText) => {
      setOpenGroups(prev => ({
        ...prev,
        [groupText]: !prev[groupText]
      }));
    };

    const MenuItem = ({ item, isChild = false }) => (
      <ListItem disablePadding sx={{ mb: isChild ? 0.25 : 0.5, px: isChild ? 0 : 2 }}>
        <ListItemButton 
          onClick={() => navigate(item.path)}
          sx={{
            borderRadius: 2,
            py: isChild ? 1 : 1.5,
            px: 2,
            ml: isChild ? 1 : 0,
            '&:hover': {
              backgroundColor: theme.palette.grey[50],
            }
          }}
        >
          <ListItemIcon 
            sx={{ 
              minWidth: isChild ? 40 : 44,
              color: theme.palette.text.secondary,
              '& svg': { fontSize: isChild ? 20 : 22 }
            }}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText 
            primary={item.text} 
            slotProps={{
              primary: {
                fontSize: isChild ? '0.875rem' : '0.95rem',
                fontWeight: isChild ? 400 : 500,
                color: isChild ? theme.palette.text.secondary : theme.palette.text.primary
              }
            }}
          />
        </ListItemButton>
      </ListItem>
    );

    const MenuGroup = ({ item }) => (
      <Box sx={{ px: 2 }}>
        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton 
            onClick={() => toggleGroup(item.text)}
            sx={{
              borderRadius: 2,
              py: 1.5,
              px: 2,
              '&:hover': {
                backgroundColor: theme.palette.grey[50]
              }
            }}
          >
            <ListItemIcon 
              sx={{ 
                minWidth: 44,
                color: theme.palette.text.secondary,
                '& svg': { fontSize: 22 }
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              slotProps={{
                primary: {
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  color: theme.palette.text.primary
                }
              }}
            />
            <IconButton 
              size="small" 
              sx={{ 
                p: 0.5,
                transform: openGroups[item.text] ? 'rotate(90deg)' : 'rotate(0deg)',
                color: theme.palette.text.secondary
              }}
            >
              <ChevronRight fontSize="small" />
            </IconButton>
          </ListItemButton>
        </ListItem>
        
        <Collapse in={openGroups[item.text]} timeout={300}>
          <List disablePadding sx={{ pl: 1 }}>
            {item.children.map((child) => (
              <MenuItem key={child.text} item={child} isChild />
            ))}
          </List>
        </Collapse>
      </Box>
    );

    return (
      <Box 
        sx={{
          width: 280,
          height: '100vh',
          backgroundColor: theme.palette.background.paper,
          borderRight: `1px solid ${theme.palette.grey[200]}`,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ flex: 1, overflowY: 'auto' }}>
          <List sx={{ py: 2 }}>
            {menuConfig.map((item) => (
              item.isGroup ? (
                <Box key={item.text}>
                  <Divider sx={{ mx: 2, my: 1 }} />
                  <MenuGroup item={item} />
                </Box>
              ) : (
                <MenuItem key={item.text} item={item} />
              )
            ))}
          </List>
        </Box>
      </Box>
    );
  }

export default Sidebar;