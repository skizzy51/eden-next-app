import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: false,
    admin: false,
    username: "",
    favorites: [],
    favoritesList: [],
    loading: false,
}

export const signIn = createAsyncThunk("signIn", async (data, thunkAPI) => {
    try {
        let response = await fetch(
            "https://react-eden-backend-production.up.railway.app/shop/loginUser",
            {
                method: "post",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            }
        ).then((res) => res.json())
        return response
    } catch (error) {
        return thunkAPI.rejectWithValue(true)
    }
})

export const signUp = createAsyncThunk("signUp", async (data, thunkAPI) => {
    try {
        let response = await fetch(
            "https://react-eden-backend-production.up.railway.app/shop/user",
            {
                method: "post",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            }
        ).then((res) => res.json())
        return response
    } catch (error) {
        return thunkAPI.rejectWithValue(true)
    }
})

export const verifyUser = createAsyncThunk(
    "verifyUser",
    async (data, thunkAPI) => {
        try {
            let response = await fetch(
                "https://react-eden-backend-production.up.railway.app/shop/getUser",
                {
                    method: "get",
                    headers: { authorization: `Bearer ${data}` },
                }
            ).then((res) => res.json())
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue(true)
        }
    }
)

export const deleteUser = createAsyncThunk(
    "getUser",
    async (data, thunkAPI) => {
        try {
            let response = await fetch(
                "https://react-eden-backend-production.up.railway.app/shop/user",
                {
                    method: "delete",
                    headers: { authorization: `Bearer ${data}` },
                }
            ).then((res) => res.json())
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue(true)
        }
    }
)

export const markFavorites = createAsyncThunk(
    "markFavorite",
    async (data, thunkAPI) => {
        try {
            let response = await fetch(
                "https://react-eden-backend-production.up.railway.app/shop/markFavorite",
                {
                    method: "post",
                    body: JSON.stringify({ id: data.id }),
                    headers: {
                        authorization: `Bearer ${data.token}`,
                        "Content-Type": "application/json",
                    },
                }
            ).then((res) => res.json())
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue(true)
        }
    }
)

export const unmarkFavorites = createAsyncThunk(
    "unmarkFavorite",
    async (data, thunkAPI) => {
        try {
            let response = await fetch(
                "https://react-eden-backend-production.up.railway.app/shop/unmarkFavorite",
                {
                    method: "post",
                    body: JSON.stringify({ id: data.id }),
                    headers: {
                        authorization: `Bearer ${data.token}`,
                        "Content-Type": "application/json",
                    },
                }
            ).then((res) => res.json())
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue(true)
        }
    }
)

export const updateUsername = createAsyncThunk(
    "updateUsername",
    async (data, thunkAPI) => {
        try {
            let response = await fetch(
                "https://react-eden-backend-production.up.railway.app/shop/update/username",
                {
                    method: "post",
                    body: JSON.stringify({ username: data.newUsername }),
                    headers: {
                        authorization: `Bearer ${data.token}`,
                        "Content-Type": "application/json",
                    },
                }
            ).then((res) => res.json())
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue(true)
        }
    }
)

export const updatePassword = createAsyncThunk(
    "updatePassword",
    async (data, thunkAPI) => {
        try {
            let response = await fetch(
                "https://react-eden-backend-production.up.railway.app/shop/update/password",
                {
                    method: "post",
                    body: JSON.stringify(data.passwords),
                    headers: {
                        authorization: `Bearer ${data.token}`,
                        "Content-Type": "application/json",
                    },
                }
            ).then((res) => res.json())
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue(true)
        }
    }
)

export const getFavorites = createAsyncThunk(
    "getFavorites",
    async (data, thunkAPI) => {
        try {
            let response = await fetch(
                "https://react-eden-backend-production.up.railway.app/shop/allFavorites",
                {
                    method: "get",
                    headers: {
                        authorization: `Bearer ${data}`,
                    },
                }
            ).then((res) => res.json())
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue(true)
        }
    }
)

export const createCategory = createAsyncThunk(
    "createCategory",
    async (data, thunkAPI) => {
        try {
            let response = await fetch(
                "https://react-eden-backend-production.up.railway.app/shop/category",
                {
                    method: "post",
                    body: JSON.stringify(data.data),
                    headers: {
                        authorization: `Bearer ${data.token}`,
                        "Content-Type": "application/json",
                    },
                }
            ).then((res) => res.json())
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue(true)
        }
    }
)

export const createProduct = createAsyncThunk(
    "createProduct",
    async (data, thunkAPI) => {
        try {
            let response = await fetch(
                "https://react-eden-backend-production.up.railway.app/shop/item",
                {
                    method: "post",
                    body: data.formData,
                    headers: {
                        authorization: `Bearer ${data.token}`,
                    },
                }
            ).then((res) => res.json())
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue(true)
        }
    }
)

export const createSplitCategory = createAsyncThunk(
    "createSplitCategory",
    async (data, thunkAPI) => {
        try {
            let response = await fetch(
                "https://react-eden-backend-production.up.railway.app/shop/split-category-tab",
                {
                    method: "post",
                    body: data.formData,
                    headers: {
                        authorization: `Bearer ${data.token}`,
                    },
                }
            ).then((res) => res.json())
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue(true)
        }
    }
)

export const addNormalProductTab = createAsyncThunk(
    "addNormalProductTab",
    async (data, thunkAPI) => {
        try {
            let response = await fetch(
                "https://react-eden-backend-production.up.railway.app/shop/normal-product-tab",
                {
                    method: "post",
                    body: JSON.stringify(data.data),
                    headers: {
                        authorization: `Bearer ${data.token}`,
                        "Content-Type": "application/json",
                    },
                }
            ).then((res) => res.json())
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue(true)
        }
    }
)

export const addSplitProductTab = createAsyncThunk(
    "addSplitProductTab",
    async (data, thunkAPI) => {
        try {
            let response = await fetch(
                "https://react-eden-backend-production.up.railway.app/shop/split-product-tab",
                {
                    method: "post",
                    body: JSON.stringify(data.data),
                    headers: {
                        authorization: `Bearer ${data.token}`,
                        "Content-Type": "application/json",
                    },
                }
            ).then((res) => res.json())
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue(true)
        }
    }
)

export const addNormalCategoryTab = createAsyncThunk(
    "addNormalCategoryTab",
    async (data, thunkAPI) => {
        try {
            let response = await fetch(
                "https://react-eden-backend-production.up.railway.app/shop/normal-category-tab",
                {
                    method: "post",
                    body: JSON.stringify({ category: data.id }),
                    headers: {
                        authorization: `Bearer ${data.token}`,
                        "Content-Type": "application/json",
                    },
                }
            ).then((res) => res.json())
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue(true)
        }
    }
)

const userReducer = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("token")
            state.username = ""
            state.user = false
            state.admin = false
            location.reload()
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state) => {
                state.loading = true
            })
            .addCase(signIn.fulfilled, (state, action) => {
                if (action.payload.token) {
                    localStorage.setItem("token", action.payload.token)
                    state.username = action.payload.user.username
                    state.loading = false
                    state.token = action.payload.token
                    if (action.payload.user.role === "user") {
                        state.user = true
                        state.admin = false
                        state.favorites = action.payload.user.favorites
                    } else if (action.payload.user.role === "admin") {
                        state.user = false
                        state.admin = true
                    }
                } else {
                    alert("Wrong username or password error")
                }
            })
            .addCase(signIn.rejected, (state) => {
                state.user = false
                state.admin = false
                state.loading = false
                alert("Server error")
            })
            .addCase(signUp.pending, (state) => {
                state.loading = true
            })
            .addCase(signUp.fulfilled, (state, action) => {
                localStorage.setItem("token", action.payload.token)
                state.user = true
                state.admin = false
                state.username = action.payload.user.username
                state.loading = false
                state.token = action.payload.token
            })
            .addCase(signUp.rejected, (state) => {
                state.user = false
                state.admin = false
                state.loading = false
                alert("Server error")
            })
            .addCase(verifyUser.pending, (state) => {
                state.loading = true
            })
            .addCase(verifyUser.fulfilled, (state, action) => {
                state.loading = false
                if (!action.payload.user) {
                    console.clear()
                    state.loading = false
                    state.user = false
                    state.admin = false
                } else if (action.payload.user.role === "admin") {
                    state.admin = true
                    state.user = false
                } else if (action.payload.user.role === "user") {
                    state.user = true
                    state.username = action.payload.user.username
                    state.favorites = action.payload.user.favorites
                    state.admin = false
                }
            })
            .addCase(verifyUser.rejected, (state) => {
                state.loading = false
                state.user = false
                state.username = ""
                state.favorites = []
                state.admin = false
            })
            .addCase(markFavorites.pending, (state) => {
                state.loading = true
            })
            .addCase(markFavorites.fulfilled, (state, action) => {
                state.loading = false
                state.favorites = [...state.favorites, action.payload.data]
                alert("Item added to favorites")
            })
            .addCase(markFavorites.rejected, (state) => {
                state.loading = false
                alert("Server error")
            })
            .addCase(unmarkFavorites.pending, (state) => {
                state.loading = true
            })
            .addCase(unmarkFavorites.fulfilled, (state, action) => {
                state.loading = false
                const newArray = state.favorites.filter(
                    (id) => id != action.payload.data
                )
                state.favorites = newArray
                alert("Item removed from favorites")
                location.reload()
            })
            .addCase(unmarkFavorites.rejected, (state, action) => {
                state.loading = false
                alert("Server error")
            })
            .addCase(updateUsername.pending, (state) => {
                state.loading = true
            })
            .addCase(updateUsername.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload.message === "Username already exists") {
                    return alert("Username already exists")
                } else if (action.payload.message !== "Username updated") {
                    return alert("Error updating username")
                }
                window.location.reload()
                alert("Username updated")
            })
            .addCase(updateUsername.rejected, (state) => {
                state.loading = false
                alert("Server error")
            })
            .addCase(updatePassword.pending, (state) => {
                state.loading = true
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload.message === "Invalid Password") {
                    return alert("Old password is invalid")
                } else if (action.payload.message !== "Password updated") {
                    return alert("Error updating password")
                }
                window.location.reload()
                alert("Password successfully updated")
            })
            .addCase(updatePassword.rejected, (state) => {
                state.loading = false
                alert("Server error")
            })
            .addCase(getFavorites.pending, (state) => {
                state.loading = true
                state.favoritesList = []
            })
            .addCase(getFavorites.fulfilled, (state, action) => {
                state.loading = false
                state.favoritesList = action.payload.data.favorites
            })
            .addCase(getFavorites.rejected, (state) => {
                state.loading = false
                state.favoritesList = []
                alert("Server error")
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                alert("Category has been created")
                window.location.reload()
            })
            .addCase(createCategory.rejected, (state) => {
                alert("Server error")
                window.location.reload()
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                if (action.payload.message !== "Successfully Created") {
                    alert("Server error")
                    return window.location.reload()
                }
                alert("Product has been added to the inventory")
                window.location.reload()
            })
            .addCase(createProduct.rejected, (state, action) => {
                alert("Server error")
                window.location.reload()
            })
            .addCase(createSplitCategory.fulfilled, (state, action) => {
                if (
                    action.payload === "You cannot add more split category tabs"
                ) {
                    alert("You cannot add more split category tabs")
                    return window.location.reload()
                }
                alert("Tabs have successfully been added to online store")
                window.location.reload()
            })
            .addCase(createSplitCategory.rejected, (state, action) => {
                alert("Server error")
                window.location.reload()
            })
            .addCase(addNormalProductTab.fulfilled, (state, action) => {
                alert("Tab has successfully been added to online store")
                window.location.reload()
            })
            .addCase(addNormalProductTab.rejected, (state, action) => {
                alert("Error creating Tab")
                window.location.reload()
            })
            .addCase(addSplitProductTab.fulfilled, (state, action) => {
                if (action.payload.status === 405) {
                    alert("You cannot add more split product tabs")
                    return window.location.reload
                }
                alert("Tabs has successfully been added to online store")
                window.location.reload()
            })
            .addCase(addSplitProductTab.rejected, (state, action) => {
                alert("Error creating Tab")
                window.location.reload()
            })
            .addCase(addNormalCategoryTab.fulfilled, (state, action) => {
                alert("Tab has successfully been added to online store")
                window.location.reload()
            })
            .addCase(addNormalCategoryTab.rejected, (state, action) => {
                alert("Error creating Tab")
                window.location.reload()
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload.message !== "User deleted") {
                    return alert("Error deleting account")
                } else {
                    localStorage.removeItem("token")
                    state.user = false
                    window.location.assign("/")
                    return alert("Account successfully deleted")
                }
            })
            .addCase(deleteUser.rejected, (state) => {
                state.loading = false
                alert("Server error")
            })
    },
})

export const { reset, logout } = userReducer.actions

export default userReducer.reducer
