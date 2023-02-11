import { faCircleUser, faPencilAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { LoadingSpinner } from "../components/Loading"
import {
    deleteUser,
    updatePassword,
    updateUsername,
    verifyUser,
} from "../redux/userReducer"
import styles from "../styles/css/Account-page.module.css"

export default function AccountPage() {
    const { user, username } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const router = useRouter()
    const [newUsername, setNewUsername] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword1, setNewPassword1] = useState("")
    const [newPassword2, setNewPassword2] = useState("")
    const [usernameInputClass, setUsernameInputClass] = useState(
        "username-input-hidden"
    )
    const [passwordInputClass, setPasswordInputClass] = useState(
        "password-input-hidden"
    )
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token")
        dispatch(verifyUser(token))
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])

    useEffect(() => {
        if (!user) {
            router.push("/")
        }
    }, [user])

    function openUsernameInput() {
        if (usernameInputClass === "username-input-shown") {
            setUsernameInputClass("username-input-hidden")
        } else if (usernameInputClass === "username-input-hidden") {
            setUsernameInputClass("username-input-shown")
        }
    }

    function openPasswordInput() {
        if (passwordInputClass === "password-input-shown") {
            setPasswordInputClass("password-input-hidden")
        } else if (passwordInputClass === "password-input-hidden") {
            setPasswordInputClass("password-input-shown")
        }
    }

    function changeUsername() {
        const token = localStorage.getItem("token")
        dispatch(verifyUser(token))
        if (!user) return router.push("/")

        if (newUsername.length < 4) {
            return alert("Username must be at least 4 characters long")
        }

        dispatch(updateUsername({ newUsername, token }))
    }

    function changePassword() {
        const token = localStorage.getItem("token")
        dispatch(verifyUser(token))
        if (!user) return router.push("/")

        if (
            oldPassword.length < 1 ||
            newPassword1.length < 1 ||
            newPassword2.length < 1
        ) {
            return alert("All password fields must be filled")
        }
        if (newPassword1 !== newPassword2) {
            return alert("Passwords do not match")
        }
        let passwords = {
            oldPassword: oldPassword,
            newPassword: newPassword1,
        }

        dispatch(updatePassword({ passwords, token }))
    }

    function DeleteUser() {
        const token = localStorage.getItem("token")
        dispatch(verifyUser(token))
        if (!user) return router.push()
        dispatch(deleteUser(token))
    }

    return (
        <>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className={styles["account"]}>
                    <div className={styles["account-user"]}>
                        <FontAwesomeIcon
                            className={styles["user-icon"]}
                            icon={faCircleUser}
                        />
                        <h2 className={styles["username"]}>{username}</h2>
                        <div className={styles["change-detail"]}>
                            <div className={styles["change-username"]}>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <h4>
                                        <u>Change Username</u>
                                    </h4>
                                    <FontAwesomeIcon
                                        onClick={openUsernameInput}
                                        className={styles["edit-btn"]}
                                        icon={faPencilAlt}
                                    />
                                </div>
                                <div className={styles[usernameInputClass]}>
                                    <input
                                        onChange={(e) =>
                                            setNewUsername(e.target.value)
                                        }
                                        className={styles["input"]}
                                        autoComplete="off"
                                        type="text"
                                        placeholder=" "
                                    />
                                    <label className={styles["label"]}>
                                        Username
                                    </label>
                                    <button
                                        onClick={changeUsername}
                                        type="button"
                                    >
                                        Change Username
                                    </button>
                                </div>
                            </div>
                            <div className={styles["change-password"]}>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <h4>
                                        <u>Change Password</u>
                                    </h4>
                                    <FontAwesomeIcon
                                        onClick={openPasswordInput}
                                        className={styles["edit-btn"]}
                                        icon={faPencilAlt}
                                    />
                                </div>
                                <div className={styles[passwordInputClass]}>
                                    <label htmlFor="previous-password">
                                        Enter previous Password :
                                    </label>
                                    <input
                                        onChange={(e) =>
                                            setOldPassword(e.target.value)
                                        }
                                        type="password"
                                        placeholder="Previous password"
                                        id="previous-password"
                                    />

                                    <label htmlFor="new-password1">
                                        Enter New Password :
                                    </label>
                                    <input
                                        onChange={(e) =>
                                            setNewPassword1(e.target.value)
                                        }
                                        type="password"
                                        placeholder="New-password"
                                        id="new-password1"
                                    />

                                    <label htmlFor="new-password2">
                                        Confirm New Password :
                                    </label>
                                    <input
                                        onChange={(e) =>
                                            setNewPassword2(e.target.value)
                                        }
                                        type="password"
                                        placeholder="New-password"
                                        id="new-password2"
                                    />

                                    <button
                                        onClick={changePassword}
                                        type="button"
                                    >
                                        Change password
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button
                            className={styles["delete-account"]}
                            onClick={DeleteUser}
                        >
                            Delete account
                        </button>
                    </div>
                    <div className={styles["account-menu"]}>
                        <Link href={{ pathname: "/account" }}>
                            <button>account information</button>
                        </Link>
                        <Link href={{ pathname: "/favorites" }}>
                            <button>favorites</button>
                        </Link>
                    </div>
                </div>
            )}
        </>
    )
}
