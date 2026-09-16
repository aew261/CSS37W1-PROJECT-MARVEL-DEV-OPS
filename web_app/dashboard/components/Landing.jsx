import { BsSearch } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";

import landingSt from '../styles/components/landing.module.css'

function Landing() {
  return (<>
    <div className={landingSt.container}>
         <nav >

            <section className={landingSt.logo_section} >
                <div className={landingSt.logo} >
                    <img/>
                </div>
                <p>Res Hub</p>
            </section>

            <section className={landingSt.search_section}  >

                <div className={landingSt.search_wrapper}  >
                    <div className={landingSt.search_icon_wrapper} >
                        <BsSearch className={landingSt.search_icon} />
                    </div>

                    <div className={landingSt.search_input} >
                        <input type="text" placeholder="Search" />
                    </div>

                </div>

            </section>

            <section className={landingSt.profile_section} >

                <div className={landingSt.notification_section}  >
                    <div className={landingSt.notification_icon_wrapper}  >
                        <IoNotificationsOutline className={landingSt.notification_icon} />
                    </div>
                    <div className={landingSt.notification_count}  >
                        <p>0</p>
                    </div>
                </div>

                <div className={landingSt.profile_wrapper}  >
                    <div className={landingSt.profile_image}   >
                        <img/>
                    </div>
                    <p>John Doe</p>
                </div>

            </section>

         </nav>
         <section className={landingSt.spacer}  > </section>

         <main   className={landingSt.main}  >

            <section className={landingSt.sidebar}  >

            </section>
            <section className={landingSt.content}  >

            </section>

         </main>


    </div>
  </>)
}

export default Landing