import { initializeApp } from "firebase-admin"

const initializeFirebase = () => {
    let firebase
    try {
        firebase = initializeApp()
    } catch (error) {
        console.error("ERROR: Could not initialize Firebase", error)
        process.exit(1)
    }

    return firebase
}

export default initializeFirebase