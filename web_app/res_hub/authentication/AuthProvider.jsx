import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
    session:null,
    user:null,
    mounting:true
});

export function AuthProvider({children}){
    const [user, setUser]=useState(null)
    const [session, setSession]=useState(null)
    const [mounting, setMounting] = useState(true)
    

    useEffect(()=>{
      let mounted=true

      const loadProfile=async(user_id)=>{
        try{
            const {data, error}= await supabase.from("users_profiles")
                                          .select('*')
                                          .eq("user_id", user_id)
                                          .single()
            if (error) {
                console.log('Profile error:', error)
                return null
            }

            return data
        }catch(error){
          console.log(error)
          return null;
        }
      }

      const checkUser=async()=>{

        const {data} = await supabase.auth.getSession()
        if(!mounted) return;
        setSession(data.session)

        if (data.session) {
        
          if (data.session?.user?.id) { 
                const profile = await loadProfile(data.session.user.id)
                setUser(profile)
          }  
        }

        setMounting(false)

      }

      checkUser();

      const { data: sub } = supabase.auth.onAuthStateChange(async(_event, session) => {
      
              setSession(session)
              if(_event==="TOKEN_REFRESHED"){
                  console.log("refreshed") 
              }
      
              if(_event === "SIGNED_IN" && session?.user?.id  ){
                 await loadProfile(session.user.id)
                 .then(setUser) 
                 
              }

              if(_event === "SIGNED_OUT"){
                
              }
      
  
              if (!session){
                  setUser(null)
                  //dispatch(clearUserState())
              } 
            }
          )

      return () => {
        mounted = false
        sub.subscription.unsubscribe()
      }
    },[])


    return (
        <AuthContext.Provider value={{ session, user, mounting }}>
          {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)