import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { supabase } from "../lib/supabase";
import { checkIsAdmin, getDisplayName } from "./authUtils";

const AuthContext = createContext({
    session: null,
    user: null,
    mounting: true,
    loading: true,
    isAuthenticated: false,
    isAdmin: false,
    displayName: 'Account',
    signOut: async () => {},
});

// Always resolves (never throws) so a failed profile fetch can't hang the app.
const fetchProfile = async (userId) => {
    try {
        const { data, error } = await supabase
            .from("users_profiles")
            .select('*')
            .eq("user_id", userId)
            .single()

        if (error) {
            console.log('Profile error:', error)
            return null
        }
        return data
    } catch (error) {
        console.log(error)
        return null
    }
}

export function AuthProvider({ children }) {
    const dispatch = useDispatch()
    const [session, setSession] = useState(null)
    const [mounting, setMounting] = useState(true)
    // The profile is stored together with the user id it belongs to, so we can
    // tell "still loading" apart from "loaded" without any timing tricks.
    const [profileState, setProfileState] = useState({ userId: null, profile: null })

    const userId = session?.user?.id ?? null

    // 1) Session: read it once, then listen for sign-in / sign-out / refresh.
    useEffect(() => {
        let active = true

        supabase.auth.getSession().then(({ data }) => {
            if (!active) return
            setSession(data.session)
            setMounting(false)
        })

        // Keep this callback synchronous: calling Supabase from inside it can deadlock.
        const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
            setSession(newSession)
        })

        return () => {
            active = false
            sub.subscription.unsubscribe()
        }
    }, [])

    // 2) Profile: runs only when the signed-in user id actually changes
    //    (Supabase re-fires SIGNED_IN on tab focus - that must NOT refetch).
    useEffect(() => {
        if (!userId) return
        let cancelled = false

        fetchProfile(userId).then((profile) => {
            if (!cancelled) setProfileState({ userId, profile })
        })

        return () => { cancelled = true }
    }, [userId])

    const profileLoading = Boolean(userId) && profileState.userId !== userId
    const user = profileState.userId === userId ? profileState.profile : null

    const signOut = useCallback(async () => {
        const { error } = await supabase.auth.signOut()
        if (error) console.error('Sign out error:', error)
        dispatch({ type: 'RESET_STORE' }) // clears cached RTK Query data
    }, [dispatch])

    const value = useMemo(() => ({
        session,
        user,
        mounting,
        loading: mounting || profileLoading,
        isAuthenticated: Boolean(session),
        isAdmin: checkIsAdmin(user, session),
        displayName: getDisplayName(user, session),
        signOut,
    }), [session, user, mounting, profileLoading, signOut])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)