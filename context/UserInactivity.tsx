import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react"
import { AppState, AppStateStatus } from "react-native"
import { MMKV } from "react-native-mmkv";

const storage = new MMKV({
    id: "inactivity-storage"
})

export const UserInactivityProvider = ({ children }: any) => {
    const appState = useRef(AppState.currentState);
    const router = useRouter();
    const { isSignedIn } = useAuth();

    useEffect(() => {
        const subscribe = AppState.addEventListener("change", handleAppStateChange);

        return () => {
            subscribe.remove();
        }
    }, [])

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
        console.log("app state changed", nextAppState);
        if (nextAppState === "background") {
            recordStartTime();
        } else if (nextAppState === "active" && appState.current.match(/background/)) {
            const elapsed = Date.now() - (storage.getNumber("startTime") || 0);
            console.log("app was inactive for " + elapsed + "ms");
            if (elapsed > 3000) {
                router.replace('/(authenticated)/(modals)/lock')
            }
        }

        appState.current = nextAppState;
    }

    const recordStartTime = () => {
        storage.set("startTime", Date.now())
    }

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}