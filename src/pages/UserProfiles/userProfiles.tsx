import React, { JSX, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
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

export function UserProfile(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [userData, setUserData] = useState<ProfileData | null>(null);

  const { champions } = useChampionsFull();

  useEffect(() => {
    if (!id) return;

    const fetchProfile = async () => {
      try {
        const response = await axios.get<ProfileData>(
          `${API_URL}/profiles/${id}`
        );
        setUserData(response.data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    fetchProfile();
  }, [id]);

  if (!userData) {
    return (
      <Container style={{ padding: 10, maxWidth: 600 }}>
        <Typography variant="h6" color="error">
          User not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container style={{ padding: 10, maxWidth: 600 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid>
          <Avatar
            src="/default.png"
            alt="Foto de perfil"
            sx={{ width: 80, height: 80 }}
          />
        </Grid>
        <Grid>
          <Typography variant="h4" fontWeight="bold">
            {userData.lolNickname}
          </Typography>
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
              src={
                champ
                  ? `https://ddragon.leagueoflegends.com/cdn/13.16.1/img/champion/${champ.id}.png`
                  : "/default.png"
              }
              alt={champ?.name || champId}
            />
          );
        })}
      </Box>
    </Container>
  );
}
