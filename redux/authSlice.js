import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const authLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("auth", JSON.stringify({ user: res.data }));
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const authRegister = createAsyncThunk(
  "register",
  async (
    { household, email, password, passwordVerify, name },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post("/api/auth/register", {
        household,
        email,
        password,
        passwordVerify,
        name,
      });
      localStorage.setItem("auth", JSON.stringify({ user: res.data }));
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addUser = createAsyncThunk(
  "add-user",
  async ({ email, password, passwordVerify, name }, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/auth/add-user", {
        email,
        password,
        passwordVerify,
        name,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUsers = createAsyncThunk(
  "get-users",
  async ({}, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/auth/get-users");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "delete-user",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`/api/auth/${id}/delete-user`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const toggleAdmin = createAsyncThunk(
  "toggle-admin",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/api/auth/${id}/toggle-admin`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const authLogout = createAsyncThunk("logout", async () => {
  const res = await axios.get("/api/auth/logout");
  localStorage.removeItem("auth");
  return null;
});

const initialState =
  typeof window !== "undefined" && localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

export const auth = createSlice({
  name: "auth",
  initialState,
  pending: false,
  reducers: {},
  extraReducers: {
    [authLogin.pending]: (state) => {
      state.pending = true;
      state.error = false;
      state.errorMessage = false;
    },
    [authLogin.fulfilled]: (state, action) => {
      state.pending = false;
      state.user = action.payload;
      state.error = false;
      state.errorMessage = false;
    },
    [authLogin.rejected]: (state, action) => {
      state.error = true;
      state.pending = false;
      state.errorMessage = action.payload.message;
    },
    [authLogout.pending]: (state) => {
      state.pending = true;
    },
    [authLogout.fulfilled]: (state, action) => {
      state.pending = false;
      state.user = action.payload;
    },
    [authLogout.rejected]: (state) => {
      state.error = true;
    },
    [authRegister.pending]: (state) => {
      state.pending = true;
      state.error = false;
      state.errorMessage = false;
    },
    [authRegister.fulfilled]: (state, action) => {
      state.pending = false;
      state.user = action.payload;
      state.error = false;
      state.errorMessage = false;
    },
    [authRegister.rejected]: (state, action) => {
      state.error = true;
      state.pending = false;
      state.errorMessage = action.payload.message;
    },
    [addUser.pending]: (state) => {
      state.pending = true;
      state.error = false;
      state.errorMessage = false;
    },
    [addUser.fulfilled]: (state, action) => {
      state.pending = false;
      state.userAdded = action.payload;
      state.error = false;
      state.errorMessage = false;
    },
    [addUser.rejected]: (state, action) => {
      state.error = true;
      state.pending = false;
      state.errorMessage = action.payload.message;
    },
    [deleteUser.pending]: (state) => {
      state.pending = true;
      state.error = false;
      state.errorMessage = false;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.pending = false;
      state.userDeleted = action.payload;
      state.error = false;
      state.errorMessage = false;
    },
    [deleteUser.rejected]: (state, action) => {
      state.error = true;
      state.pending = false;
      state.errorMessage = action.payload.message;
    },
    [toggleAdmin.pending]: (state) => {
      state.pending = true;
      state.error = false;
      state.errorMessage = false;
    },
    [toggleAdmin.fulfilled]: (state, action) => {
      state.pending = false;
      state.userAdminStatus = action.payload;
      state.error = false;
      state.errorMessage = false;
    },
    [toggleAdmin.rejected]: (state, action) => {
      state.error = true;
      state.pending = false;
      state.errorMessage = action.payload.message;
    },
    [getUsers.pending]: (state) => {
      state.pending = true;
      state.error = false;
      state.errorMessage = false;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.pending = false;
      state.users = action.payload;
      state.error = false;
      state.errorMessage = false;
    },
    [getUsers.rejected]: (state, action) => {
      state.error = true;
      state.pending = false;
      state.errorMessage = action.payload.message;
    },
  },
});

export default auth.reducer;
