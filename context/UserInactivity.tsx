import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React, { useRef } from "react"
import { AppState } from "react-native"

export const UserInactivityProvider = ({ children }: any) => {
    const appState = useRef(AppState.currentState);
    const router = useRouter();
    const {isSignedIn} = useAuth();
    
    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}