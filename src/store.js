
import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cupon from "./Cupon";
import api from "./axiosconfig";
import { getNonVegItemsFromLocal, getVegItemsFromLocal, saveNonVegItemsToLocal, saveVegItemsToLocal } from "./storage";

// -------------------- COUPON SLICE --------------------
const cuponSlice = createSlice({
  name: "cupon",
  initialState: { code: "", discount: 0, applied: false, message: "" },
  reducers: {
    applyCupon: (state, action) => {
      const enterCode = action.payload.toUpperCase();
      if (Cupon[enterCode]) {
        state.code = enterCode;
        state.discount = Cupon[enterCode];
        state.applied = true;
        state.message = `Congratulations! You got ${Cupon[enterCode]}% OFF 🎉`;
      } else {
        state.message = "Invalid coupon code ❌";
      }
    },
  },
});

// -------------------- CART SLICE --------------------
const cartSlice = createSlice({
  name: "cart",
  initialState: { items: JSON.parse(localStorage.getItem("cart")) || [] },
  reducers: {
    loadUserCart: (state, action) => {
      const userId = action.payload;
      const saved = JSON.parse(localStorage.getItem(`cart_${userId}`));
      state.items = saved || [];
    },
    addToCart: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) item.quantity++;
      else state.items.push({ ...action.payload, quantity: 1 });
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload.id);
    },
    incCart: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) item.quantity++;
    },
    decCart: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (!item) return;
      if (item.quantity === 1) state.items = state.items.filter((i) => i.id !== action.payload.id);
      else item.quantity--;
    },
    clearCart: (state) => { state.items = []; },
  },
});

// -------------------- VEG THUNK & SLICE --------------------
export const fetchVegProducts = createAsyncThunk("veg/fetchVegProducts", async () => {
  const localData = getVegItemsFromLocal();
  if (localData) return localData;
  const res = await api.get("api/v1/products/veg");
  console.log("🌱 Veg Items fetched from DB or cache:", res.data);
  saveVegItemsToLocal(res.data);
  return res.data;
});

const vegSlice = createSlice({
  name: "veg",
  initialState: { vegItems: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVegProducts.pending, (state) => { state.loading = true; })
      .addCase(fetchVegProducts.fulfilled, (state, action) => {
        state.vegItems = action.payload;
        state.loading = false;
      })
      .addCase(fetchVegProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

// -------------------- NON-VEG THUNK & SLICE --------------------
export const fetchNonVegProducts = createAsyncThunk("nonveg/fetchNonVegProducts", async () => {
    const localData = getNonVegItemsFromLocal();
  if (localData) return localData;
  const res = await api.get("api/v1/products/nonveg");
  saveNonVegItemsToLocal(res.data);
  return res.data;
});

const nonVegSlice = createSlice({
  name: "nonveg",
  initialState: { nonVegItems: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNonVegProducts.pending, (state) => { state.loading = true; })
      .addCase(fetchNonVegProducts.fulfilled, (state, action) => {
        state.nonVegItems = action.payload;
        state.loading = false;
      })
      .addCase(fetchNonVegProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});


// -------------------- DRINKS THUNK & SLICE --------------------
export const fetchDrinksProducts = createAsyncThunk(
  "drinks/fetchDrinksProducts",
  async () => {
    // Try to get drinks from local storage first (if you implement it)
    const localData = JSON.parse(localStorage.getItem("drinks")) || null;
    if (localData) return localData;

    // Otherwise, fetch from API
    const res = await api.get("api/v1/products/getdrinks");
    console.log("🥤 Drinks Items fetched from DB or cache:", res.data);

    // Save to local storage for caching
    localStorage.setItem("drinks", JSON.stringify(res.data));

    return res.data;
  }
);

const drinksSlice = createSlice({
  name: "drinks",
  initialState: { drinksItems: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrinksProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDrinksProducts.fulfilled, (state, action) => {
        state.drinksItems = action.payload;
        state.loading = false;
      })
      .addCase(fetchDrinksProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});




// -------------------- ORDERS THUNKS & SLICE --------------------
export const placeOrder = createAsyncThunk("orders/placeOrder", async (orderData, { getState }) => {
  const token = getState().userlogin.token;
  const res = await api.post("api/v1/products/orders", orderData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
});

export const fetchAllOrders = createAsyncThunk("orders/fetchAllOrders", async (userId, { getState }) => {
  const token = getState().userlogin.token;
  const res = await api.get(`/api/v1/products/allorders/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
});

const orderSlice = createSlice({
  name: "order",
  initialState: { list: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchAllOrders.fulfilled, (state, action) => { state.list = action.payload; state.loading = false; })
      .addCase(fetchAllOrders.rejected, (state, action) => { state.loading = false; state.error = action.error.message; });
  },
});

// -------------------- USER REGISTER & LOGIN --------------------
export const registerUser = createAsyncThunk("user/registerUser", async (userData) => {
  const res = await api.post("api/v1/products/register", userData);
  return res.data;
});

export const loginUser = createAsyncThunk("userlogin/loginUser", async (userData) => {
  const res = await api.post("api/v1/products/login", userData);
  return res.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: { user: null, loading: false, error: null, success: false },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => { state.loading = true; })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.success = true;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => { state.error = action.error.message; state.loading = false; });
  },
});

// const userLoginSlice = createSlice({
//   name: "userlogin",
//   initialState: { user: null, token: localStorage.getItem("token") || null, loading: false, error: null },
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.loading = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => { state.loading = true; })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.loading = false;
//         localStorage.setItem("token", action.payload.token);
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.error = action.error.message || "Login failed";
//         state.loading = false;
//       });
//   },
// });

const userLoginSlice = createSlice({
  name: "userlogin",
  initialState: { 
    user: (() => {
      try {
        const data = localStorage.getItem("user");
        if (!data || data === "undefined") return null;   // ⚡ FIX
        return JSON.parse(data);
      } catch {
        return null;
      }
    })(),
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null 
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => { 
        state.loading = true; 
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loading = false;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message || "Login failed";
        state.loading = false;
      });
  },
});



const searchSlice = createSlice({
  name: "search",
  initialState: {
    term: ""
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.term = action.payload;
    }
  }
});




// -------------------- STORE --------------------
const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    cupon: cuponSlice.reducer,
    veg: vegSlice.reducer,
    nonveg: nonVegSlice.reducer,
    order: orderSlice.reducer,
    user: userSlice.reducer,
    userlogin: userLoginSlice.reducer,
    search:searchSlice.reducer,
    drinks:drinksSlice.reducer
  },
});

store.subscribe(() => {
  const state = store.getState();
  const user = state.userlogin.user;
  if (user) localStorage.setItem(`cart_${user._id}`, JSON.stringify(state.cart.items));
});

export const { addToCart, removeFromCart, incCart, decCart,clearCart } = cartSlice.actions;
export const { applyCupon } = cuponSlice.actions;
export const { logout } = userLoginSlice.actions;
export const { setSearchTerm } = searchSlice.actions;


export default store;
