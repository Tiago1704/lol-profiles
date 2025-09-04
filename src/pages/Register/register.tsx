import React, { JSX, useState } from "react";
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    MenuItem,
    Select,
    SelectChangeEvent,
    FormControl,
    InputLabel,
    OutlinedInput,
    Chip,
    Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useChampionsOptions } from "../../hooks/useChampions";
import { Division, Elo, IUser, Lane } from "./interfaces";
import axios from "axios";
import { API_URL } from "../../services/config";

export function Register(): JSX.Element {
    const navigate = useNavigate();
    const { options: championsOptions } = useChampionsOptions();

    const [formData, setFormData] = useState<Partial<IUser>>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        lolNickname: "",
        tag: "",
        elo: undefined,
        division: undefined,
        preferredLane: undefined,
        mainChamps: [],
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (field: keyof IUser) => (
        e: SelectChangeEvent<any>
    ) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleMultiSelectChange = (e: SelectChangeEvent<string[]>) => {
        const value = e.target.value;
        // Aseguramos que sea siempre un array
        const selected = typeof value === 'string' ? value.split(',') : value;

        if (selected.length <= 3) {
            setFormData({ ...formData, mainChamps: selected });
        }
    };

    const validate = () => {
        const errs: { [key: string]: string } = {};
        if (!formData.username) errs.username = "Username required";
        if (!formData.email || !formData.email.includes("@"))
            errs.email = "Valid email required";
        if (!formData.password) errs.password = "Password required";
        if (formData.password !== formData.confirmPassword)
            errs.confirmPassword = "Passwords must match";
        if (!formData.lolNickname) errs.lolNickname = "LoL Nickname required";
        if (!formData.tag) errs.tag = "Tag required";
        if (!formData.elo) errs.elo = "Elo required";
        if (!formData.division) errs.division = "Division required";
        if (!formData.preferredLane) errs.preferredLane = "Lane required";
        if (!formData.mainChamps || formData.mainChamps.length === 0)
            errs.mainChamps = "Select at least one champion";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        try {
            // Aquí harías el POST a tu backend (puerto 3001)pruebauser@gmail.com prueba123
            await axios.post(`${API_URL}/profiles`, formData);
            console.log("Register data:", formData);
            alert("Usuario creado correctamente!");
            navigate("/login");
        } catch (err) {
            console.error(err);
            alert("Error creando usuario");
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: 40 }}>
            <Typography variant="h4" gutterBottom>
                Registrarse
            </Typography>
            <Grid container spacing={2}>
                <Grid>
                    <TextField
                        label="Username"
                        name="username"
                        fullWidth
                        value={formData.username}
                        onChange={handleChange}
                        error={!!errors.username}
                        helperText={errors.username}
                    />
                </Grid>

                <Grid>
                    <TextField
                        label="Email"
                        name="email"
                        fullWidth
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                </Grid>

                <Grid>
                    <TextField
                        label="Contraseña"
                        name="password"
                        type="password"
                        fullWidth
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                </Grid>

                <Grid>
                    <TextField
                        label="Confirmar Contraseña"
                        name="confirmPassword"
                        type="password"
                        fullWidth
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                    />
                </Grid>

                <Grid>
                    <TextField
                        label="LoL Nickname"
                        name="lolNickname"
                        fullWidth
                        value={formData.lolNickname}
                        onChange={handleChange}
                        error={!!errors.lolNickname}
                        helperText={errors.lolNickname}
                    />
                </Grid>

                <Grid>
                    <TextField
                        label="Tag"
                        name="tag"
                        fullWidth
                        value={formData.tag}
                        onChange={handleChange}
                        error={!!errors.tag}
                        helperText={errors.tag}
                    />
                </Grid>

                <Grid>
                    <FormControl fullWidth style={{width: 200}}>
                        <InputLabel>Elo</InputLabel>
                        <Select
                            value={formData.elo || ""}
                            onChange={handleSelectChange("elo")}
                            label="Elo"
                        >
                            {Object.values(Elo).map((e) => (
                                <MenuItem key={e} value={e}>
                                    {e}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid>
                    <FormControl fullWidth style={{width: 200}}>
                        <InputLabel>División</InputLabel>
                        <Select
                            value={formData.division || ""}
                            onChange={handleSelectChange("division")}
                            label="Division"
                        >
                            {Object.values(Division).map((d) => (
                                <MenuItem key={d} value={d}>
                                    {d}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid>
                    <FormControl fullWidth style={{width: 200}}>
                        <InputLabel>Linea preferida</InputLabel>
                        <Select
                            value={formData.preferredLane || ""}
                            onChange={handleSelectChange("preferredLane")}
                            label="Preferred Lane"
                        >
                            {Object.values(Lane).map((l) => (
                                <MenuItem key={l} value={l}>
                                    {l}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid>
                    <FormControl fullWidth style={{width: 200}}>
                        <InputLabel>Pool Champ (max 3)</InputLabel>
                        <Select
                            multiple
                            value={formData.mainChamps || []}
                            onChange={handleMultiSelectChange}
                            input={<OutlinedInput label="Main Champions (max 3)" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                    {(selected as string[]).map((id) => {
                                        const champ = championsOptions.find((c: any) => c.id === id);
                                        return <Chip key={id} label={champ?.name || id} />;
                                    })}
                                </Box>
                            )}
                        >
                            {championsOptions.map((champ: any) => (
                                <MenuItem key={champ.id} value={champ.id}>
                                    {champ.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid>
                    <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                        Registrar
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}
