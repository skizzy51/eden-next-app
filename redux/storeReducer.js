import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    items: [],
    categories: [],
    cart: Cart(),
    cartNumber: CartNumber(),
    totalPrice: CartTotal(),
    cartOpen: false,
    loading: false,
    error: false,
}

export const getAllItems = createAsyncThunk(
    "getItems",
    async (data, thunkAPI) => {
        try {
            let response = await fetch(
                "https://react-eden-backend-production.up.railway.app/shop/item",
                {
                    method: "get",
                }
            ).then((res) => res.json())
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue(true)
        }
    }
)

export const getAllCategories = createAsyncThunk(
    "getCategories",
    async (data, thunkAPI) => {
        try {
            let response = await fetch(
                "https://react-eden-backend-production.up.railway.app/shop/category",
                {
                    method: "get",
                }
            ).then((res) => res.json())
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue(true)
        }
    }
)

export const updateQuantity = createAsyncThunk(
    "updateQuantity",
    async (data, thunkAPI) => {
        try {
            let response = await fetch(
                "https://react-eden-backend-production.up.railway.app/shop/update/quantity",
                {
                    method: "post",
                    body: JSON.stringify(data.body),
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

export const deleteProduct = createAsyncThunk(
    "deleteProduct",
    async (data, thunkAPI) => {
        try {
            let response = await fetch(
                "https://react-eden-backend-production.up.railway.app/shop/item/delete",
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

function Cart() {
    if (typeof window !== "undefined") {
        const cart = localStorage.getItem("cart")
        if (!cart) return []
        const parseCart = JSON.parse(cart)
        let data = []
        for (const key in parseCart) {
            data.push(parseCart[key])
        }
        return data
    }
}

function CartNumber() {
    if (typeof window !== "undefined") {
        let cart = localStorage.getItem("cart") || null
        if (cart) {
            return Object.keys(JSON.parse(cart)).length
        } else {
            return 0
        }
    }
}

function CartTotal() {
    if (typeof window !== "undefined") {
        const cart = localStorage.getItem("cart")
        if (cart == null) return 0

        let total = 0
        const parseCart = JSON.parse(cart)
        for (const key in parseCart) {
            let price = parseCart[key].price
            price = price.toString()
            price = price.replace(",", "")
            price = Number(price)
            total += price * parseCart[key].productQuantity
        }
        return total
    }
}

const storeReducer = createSlice({
    name: "store",
    initialState,
    reducers: {
        reset: (state) => {
            state.serverError = false
            state.loading = false
        },
        updateCart: (state, { payload }) => {
            localStorage.setItem("cart", JSON.stringify(payload))
            state.cart = Cart()
            state.cartNumber = state.cart.length
            state.totalPrice = CartTotal()
        },
        openCart: (state) => {
            state.cartOpen = true
        },
        closeCart: (state) => {
            state.cartOpen = false
        },
        getCart: (state) => {
            state.cart = Cart()
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllItems.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllItems.fulfilled, (state, action) => {
                if (action.payload.data) {
                    state.items = action.payload.data
                    state.loading = false
                } else {
                    alert("Server error")
                }
            })
            .addCase(getAllItems.rejected, (state, action) => {
                state.loading = false
                alert("Server error")
            })
            .addCase(getAllCategories.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                if (action.payload.data) {
                    state.categories = action.payload.data
                    state.loading = false
                } else {
                    alert("Server error")
                }
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.loading = false
                alert("Server error")
            })
            .addCase(updateQuantity.fulfilled, (state, action) => {
                alert("Quantity successfully updated")
            })
            .addCase(updateQuantity.rejected, (state, action) => {
                state.error = true
                alert("Server error")
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                const filtered = state.items.filter((value, index) => {
                    return value._id !== action.payload.data._id
                })
                state.items = filtered
                alert(
                    `${action.payload.data.username} has been deleted from inventory`
                )
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                alert("Server error")
            })
    },
})

export const { reset, updateCart, openCart, closeCart, getCart } =
    storeReducer.actions

export default storeReducer.reducer
