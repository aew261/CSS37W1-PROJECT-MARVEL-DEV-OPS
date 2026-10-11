import { useEffect, useState } from 'react'
import toastSt from '../../styles/components/Toast.module.css'

function Toast({ title, content,type }) {

    const [showToast, setShowToast]=useState(false)
    
    useEffect(()=>{
        if(content && (type==="success" || type==="error")){
            setShowToast(true)
        }
    },[type, content])

    useEffect(() => {
        if (!showToast) return;

        const timer = setTimeout(() => {
            setShowToast(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [showToast]);


  return (<>
    {showToast &&
        (<div  className={toastSt.container} >

            <section  className={toastSt.toast}  >
                
                <div className={`${toastSt.toastIndicator} ${type === "success" ? toastSt.success : toastSt.error}`}>

                </div>

                <div  className={toastSt.toastContent} >
                    <p className={toastSt.toastTitle} >{title}</p>
                    <p  className={toastSt.content} >{content}</p>
                </div>
            </section>

        </div>)}
  </>)
}

export default Toast