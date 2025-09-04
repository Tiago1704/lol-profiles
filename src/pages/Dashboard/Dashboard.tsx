import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../services/config";

interface UserListItem {
  id: string;
  username: string;
  lolNickname: string;
  tag: string;
  mainChamps?: string[];
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserListItem[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserListItem[]>([]);
  const [search, setSearch] = useState("");

  // Traer todos los usuarios
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<UserListItem[]>(
          `${API_URL}/profiles`
        );
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  // Filtrar por username o lolNickname
  useEffect(() => {
    const filtered = users.filter(
      (u) =>
        u.username.toLowerCase().includes(search.toLowerCase()) ||
        u.lolNickname.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [search, users]);

  const handleClickUser = (id: string) => {
    navigate(`/user/${id}`);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={3}>
        Todos los usuarios
      </Typography>

      <TextField
        label="Buscar por username o nickname"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Grid container spacing={2}>
        {filteredUsers.map((user) => (
          <Grid>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                gap: 2,
                cursor: "pointer",
                "&:hover": { bgcolor: "#f5f5f5" },
              }}
              onClick={() => handleClickUser(user.id)}
            >
              <Box>
                <Typography fontWeight="bold">{user.lolNickname}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {user.username}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
