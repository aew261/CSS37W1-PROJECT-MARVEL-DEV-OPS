import { FaStar, FaLocationDot,  } from "react-icons/fa6";
import { IoCallSharp } from "react-icons/io5";

import residenceSt from '../../styles/components/residence_info.module.css'

function Residence_Info() {
  return (<>
    <div className={residenceSt.container}  >
        <section className={residenceSt.top_section} >
            <button>
                <p>Write a Review</p>
            </button>
        </section>

        <main>

            <section  className={residenceSt.info_section}  >
                <h2>The Goal</h2>
                <div className={residenceSt.info_wrapper}  >

                    <div className={residenceSt.rating_wrapper}  >
                        {[...Array(5)].map((_,ind)=>(
                            <FaStar key={ind} className={residenceSt.rating_icon} />
                        ))}
                    </div>

                    <p>4.5  (15 reviews)</p>
                </div>

                <div className={residenceSt.info_wrapper}>
                    <FaLocationDot className={residenceSt.info_icon} />
                    <p>123 Main Road</p>
                </div>

                <div className={residenceSt.info_wrapper}  >
                    <IoCallSharp className={residenceSt.info_icon} />
                    <p>Landlord: +27 123 4567</p>
                </div>
            </section>

            <section>

                <div>
                    <h2>Category Ratings</h2>
                    <div>
                        <div>
                            <p>Infrastucture</p>
                            {}
                        </div>
                    </div>
                </div>

                <div>
                    <h2>Photos</h2>
                    <div>
                        ``
                    </div
                    >
                </div>

            </section>

            <section>
                <h2>Student Reviews</h2>
                <p>Reviews Submitted by verified wsu students</p>
            </section>


        </main>
    </div>
  </>)
}

export default Residence_Info