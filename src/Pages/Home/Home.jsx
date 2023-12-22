import { useEffect, useState } from "react";
import Banner from "../../Components/Banner/Banner";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';


const Home = () => {
    const [userType, setUserType] = useState([]);
    useEffect(() => {
        fetch('./userTypw.json')
            .then(res => res.json())
            .then(data => setUserType(data))
    }, [])
    //console.log(userType);

    return (
        <div>
            <Banner></Banner>
            <div className="p-8">
                <h2 className="text-2xl text-center font-bold py-4">Some benefit for different professionals</h2>

                <Swiper
                    slidesPerView={1}   // Default for mobile
                    spaceBetween={30}
                    pagination={{ clickable: true }}
                    modules={[Pagination]}
                    className="mySwiper max-w-7xl mx-auto"
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 4 },
                    }}
                >
                    {userType?.map(item => (
                        <SwiperSlide key={item._id}>

                            <div className="text-center bg-third text-first rounded-lg py-8 px-4 h-[400px]">

                                <h3 className="text-xl font-bold mb-2">{item.type}</h3>
                                <p className="">{item.description}</p>
                                <ul className="text-left">
                                    {
                                        item?.benefits?.map((it, idx) => <li key={idx}><span className="font-bold">{idx + 1}. </span>{it}</li>)
                                    }
                                </ul>

                            </div>

                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Home;