import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  userEmail: string | null;
  username: string | null;
  userId: string | null; // 👈 agregamos el id
}

const initialState: AuthState = {
  token: null,
  userEmail: null,
  username: null,
  userId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(
      state,
      action: PayloadAction<{ token: string; email: string; username: string; id: string }>
    ) {
      state.token = action.payload.token;
      state.userEmail = action.payload.email;
      state.username = action.payload.username;
      state.userId = action.payload.id; // 👈 guardamos el id
    },
    logout(state) {
      state.token = null;
      state.userEmail = null;
      state.username = null;
      state.userId = null; // 👈 limpiamos id
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;