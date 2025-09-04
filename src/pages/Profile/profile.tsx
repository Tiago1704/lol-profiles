import React, { JSX, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ChampionFull, useChampionsFull } from "../../hooks/useChampions";
import { API_URL } from "../../services/config";

// Tipos
interface ProfileData {
  id: string;
  username: string;
  email: string;
  lolNickname: string;
  tag: string;
  elo?: string;
  division?: string;
  mainChamps?: string[];
  preferredLane?: string;
}

// Componente
export function Profile(): JSX.Element {
  const token = useSelector((state: RootState) => state.auth.token);
  const [userData, setUserData] = useState<ProfileData | null>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState<Partial<ProfileData>>({});
  const [selectedChamp, setSelectedChamp] = useState<string>("");

  // Campeones
  const { champions } = useChampionsFull();
  console.log(champions)
  // Traer perfil
  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const response = await axios.get<ProfileData>(
          `${API_URL}/auth/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserData(response.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [token]);

  const handleOpenEdit = () => {
    if (!userData) return;
    setEditData({
      lolNickname: userData.lolNickname,
      preferredLane: userData.preferredLane,
      mainChamps: userData.mainChamps,
      elo: userData.elo,
      division: userData.division,
    });
    setSelectedChamp(userData.mainChamps?.[0] || "");
    setOpenEdit(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSelectChamp = (e: SelectChangeEvent) => {
    setSelectedChamp(e.target.value);
  };

  const handleSave = async () => {
    if (!userData || !token) return;

    try {
      const updatedData = {
        ...editData,
        mainChamps: selectedChamp ? [selectedChamp] : [],
      };

      await axios.put(`${API_URL}/profiles/${userData.id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Perfil actualizado correctamente");
      setUserData((prev) => (prev ? { ...prev, ...updatedData } : prev));
      setOpenEdit(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <Container style={{ padding: 10, maxWidth: 600 }}>
      {userData ? (
        <>
          <Grid container spacing={2} alignItems="center">
            <Grid>
              <Avatar
                src="/default.png"
                alt="Foto de perfil"
                sx={{ width: 80, height: 80 }}
              />
            </Grid>
            <Grid>
              <Grid container alignItems="center" spacing={1}>
                <Grid>
                  <Typography variant="h4" fontWeight="bold">
                    {userData.lolNickname}
                  </Typography>
                </Grid>
                <Grid>
                  <IconButton size="small" onClick={handleOpenEdit}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Grid>
              </Grid>
              <Typography variant="subtitle1" color="textSecondary">
                ({userData.username})
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {userData.email}
              </Typography>
            </Grid>
          </Grid>

          <Box mt={3}>
            <Grid container spacing={2}>
              <Grid>
                <Box p={2} bgcolor="#f5f5f5" borderRadius={2}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Main Role
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {userData.preferredLane || "Not specified"}
                  </Typography>
                </Box>
              </Grid>
              <Grid>
                <Box p={2} bgcolor="#f5f5f5" borderRadius={2}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Elo / Division
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {userData.elo || "Not set"} / {userData.division || "-"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Divider style={{ margin: "24px 0" }} />

          <Typography variant="h6" gutterBottom>
            Main Champions
          </Typography>
          <Box display="flex" gap={1}>
            {userData.mainChamps?.map((champId) => {
              const champ = champions.find((c: ChampionFull) => c.id === champId);
              return (
                <Avatar
                  key={champId}
                  src={champ ? `https://ddragon.leagueoflegends.com/cdn/13.16.1/img/champion/${champ.id}.png` : "/default.png"}
                  alt={champ?.name || champId}
                />
              );
            })}
          </Box>
        </>
      ) : (
        <Typography variant="h6" color="error">
          User not found
        </Typography>
      )}

      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="LoL Nickname"
            name="lolNickname"
            value={editData.lolNickname || ""}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Preferred Lane"
            name="preferredLane"
            value={editData.preferredLane || ""}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Elo"
            name="elo"
            value={editData.elo || ""}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Division"
            name="division"
            value={editData.division || ""}
            onChange={handleChange}
            fullWidth
          />

          {/* Select para campeones */}
          <Select
            value={selectedChamp}
            onChange={handleSelectChamp}
            fullWidth
            displayEmpty
            sx={{ mt: 2 }}
          >
            <MenuItem value="">-- Select Champion --</MenuItem>
            {champions.map((champ) => (
              <MenuItem key={champ.id} value={champ.id}>
                {champ.name}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
