import "../styles/globals.css"
import { Provider } from "react-redux"
import { persistor, store } from "../redux/store"
import "../styles/css/App.module.css"
import Layout from "../components/Layout"
import { PersistGate } from "redux-persist/integration/react"

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </PersistGate>
        </Provider>
    )
}

export default MyApp
