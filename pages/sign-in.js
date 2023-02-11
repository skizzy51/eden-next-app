import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { LoadingSpinner } from "../components/Loading"
import { signIn, signUp, verifyUser } from "../redux/userReducer"
import styles from "../styles/css/Sign-in.module.css"

export default function SignIn() {
    const { loading, user, admin } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const router = useRouter()
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [createUsername, setCreateUsername] = useState("")
    const [createPassword1, setCreatePassword1] = useState("")
    const [createPassword2, setCreatePassword2] = useState("")
    const signInCont = useRef()
    const signUpCont = useRef()

    useEffect(() => {
        const token = localStorage.getItem("token")
        dispatch(verifyUser(token))
    }, [])

    useEffect(() => {
        if (user) {
            router.push("/")
        } else if (admin) {
            router.push("/admin")
        }
    }, [user, admin])

    function goToSignUp() {
        signInCont.current.style.display = "none"
        signUpCont.current.style.display = "block"
        let form1 = document.getElementById("form1")
        form1.reset()
        let form2 = document.getElementById("form2")
        form2.reset()
    }
    function goToSignIn() {
        signInCont.current.style.display = "block"
        signUpCont.current.style.display = "none"
        let form1 = document.getElementById("form1")
        form1.reset()
        let form2 = document.getElementById("form2")
        form2.reset()
    }

    function SignIn() {
        if (username.length < 1 || password.length < 1) {
            return alert("Username field and password field must be filled")
        }
        let data = {
            username: username,
            password: password,
        }

        dispatch(signIn(data))
    }

    function SignUp() {
        if (
            createUsername.length < 1 ||
            createPassword1.length < 1 ||
            createPassword2.length < 1
        ) {
            return alert("Username field and password field must be filled")
        }
        if (createUsername.length < 4) {
            return alert("Username must be at least 4 characters long")
        }
        if (createPassword1 === createPassword2) {
            let data = {
                username: createUsername,
                password: createPassword1,
            }

            dispatch(signUp(data))
        } else {
            return alert("First and second passwords do not match")
        }
    }

    return (
        <>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className={styles["sign-container"]}>
                    <div className={styles["sign-in-cont"]} ref={signInCont}>
                        <h1>Sign In</h1>
                        <form className={styles["sign-in"]} id="form1">
                            <div className={styles["sign-input"]}>
                                <b>Enter username :</b>
                                <input
                                    onChange={(e) =>
                                        setUserName(e.target.value)
                                    }
                                    type="text"
                                    placeholder="Username"
                                />
                            </div>
                            <div className={styles["sign-input"]}>
                                <b>Enter password :</b>
                                <input
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    type="password"
                                    placeholder="Password"
                                />
                            </div>
                            <button
                                onClick={SignIn}
                                type="button"
                                className={styles["sign-button"]}
                            >
                                Sign In
                            </button>
                            <p>
                                Don't have an account?&nbsp;
                                <span onClick={goToSignUp}>Sign up</span>
                            </p>
                        </form>
                    </div>

                    <div className={styles["sign-up-cont"]} ref={signUpCont}>
                        <h1>Sign Up</h1>
                        <form className={styles["sign-in"]} id="form2">
                            <div className={styles["sign-input"]}>
                                <b>Enter valid username :</b>
                                <input
                                    onChange={(e) =>
                                        setCreateUsername(e.target.value)
                                    }
                                    type="text"
                                    placeholder="Username"
                                />
                            </div>
                            <div className={styles["sign-input"]}>
                                <b>Enter password :</b>
                                <input
                                    onChange={(e) =>
                                        setCreatePassword1(e.target.value)
                                    }
                                    type="password"
                                    placeholder="Password"
                                />
                            </div>
                            <div className={styles["sign-input"]}>
                                <b>Re-enter password :</b>
                                <input
                                    onChange={(e) =>
                                        setCreatePassword2(e.target.value)
                                    }
                                    type="password"
                                    placeholder="Re-enter password"
                                />
                            </div>
                            <button
                                onClick={SignUp}
                                type="button"
                                className={styles["sign-button"]}
                            >
                                Sign Up
                            </button>
                            <p>
                                Already have an account?&nbsp;
                                <span onClick={goToSignIn}>Sign in</span>
                            </p>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}
