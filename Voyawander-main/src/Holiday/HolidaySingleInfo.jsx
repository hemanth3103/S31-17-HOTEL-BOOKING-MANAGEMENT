import { useEffect, useState } from "react";
import styles from "./HolidaySingleInfo.module.css";
import Carousel from "./Carousel";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { updateSingleProduct } from "../Redux/payment/action-creator";
import { IoLocationOutline } from "react-icons/io5";

const HolidaySingleInfo = () => {
  const [inDate, setInDate] = useState(null);
  const [outDate, setOutDate] = useState(null);
  const [people, setPeople] = useState(0);
  const [isBookVisible, setIsBookVisible] = useState(false);

  const handleBookShow = () => {
    setIsBookVisible(true);
  };

  const hotelSingleData = useSelector((state) => state.singleproduct);

  console.log(hotelSingleData);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const carousel = [
    // Your carousel image URLs here
  ];

  const isAvailable = () => {
    // e.preventDefault();
    handleBookShow();
    alert("Room available !");
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.hotel_info}>
        <div className={styles.carousel}>
          <Carousel images={carousel} />
        </div>
        <div className={styles.hotel_data}>
          <p className={styles.headline}>{hotelSingleData.title}</p>
          <div className={styles.location}>
            <IoLocationOutline size={"25px"} />
            <p>Location: {hotelSingleData.location}</p>
          </div>
          <h2>₹ {hotelSingleData.price_per_day}</h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}>
            <label htmlFor="">Check-In</label>
            <input
              required={true}
              onChange={(e) => setInDate(e.target.value)}
              type="date"
              name=""
              id=""
              min="2023-09-18"
            />
            <br />
            <label htmlFor="">Check-Out</label>
            <input
              required={true}
              onChange={(e) => setOutDate(e.target.value)}
              type="date"
              name=""
              id=""
              min="2023-09-18"
            />
            <br />
            <label htmlFor="">Guests</label>
            <input
              onChange={(e) => setPeople(e.target.value)}
              type="number"
              name="guests"
              placeholder="1"
            />
            <br />
            {!isBookVisible && (
              <button onClick={isAvailable}>Check Availability</button>
            )}
            {isBookVisible && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(
                    updateSingleProduct({
                      title: hotelSingleData.title,
                      price_per_day: hotelSingleData.price_per_day || 0,
                      group_size: +people || 1,
                      act_price: hotelSingleData.price_per_day || 0,
                      tour_length: 10,
                      start_date: inDate,
                      end_date: outDate,
                      save_price:
                        hotelSingleData.price_per_day -
                        hotelSingleData.price_per_day ||
                        0,
                    })
                  );
                  navigate("/payment");
                }}>
                Book Now
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Additional content for hotel amenities, reviews, highlights, etc. goes here */}
    </div>
  );
};

export default HolidaySingleInfo;