import React, { useEffect, useState } from "react";
import "./dashboard.css";
import Cards from "../dashboardHome/cards";
import Tablee from "../dashboardHome/table";
import { useSelector } from "react-redux";
import { dashboardData } from "../../../API/dashboardApi";

const Dashboard = () => {
  const auth = useSelector((state)=> state.auth);
  console.log(auth , "token auth")
const [regUser, setRegUser] = useState(0);
const [gratiCount, setGratiCount] = useState(0);
const [giveThanksUser, setGiveThaksUser] = useState(0);
const [getThanksUser, setGetThanksUser] = useState(0);
const [totalTrans, setTotalTrans] = useState(0);
const [transAmt, setTransAmt] = useState(0);
const [dailySignUp, setDailySignUp] = useState(0);

  useEffect(() => {
    const cardDetails = async () => {
      try {
        const res = await dashboardData();
        console.log(res, "resssssss");
        setGratiCount (res?.data?.data?.gratitudeCount);
        setGetThanksUser(res?.data?.data?.totalGetThanksUser);
        setGiveThaksUser(res?.data?.data?.totalGiveThanksUser);
        setRegUser(res?.data?.data?.totalRegisteredUser);
        setDailySignUp(res?.data?.data?.totalUsersRegisteredToday);
        
        
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    
    cardDetails();
  }, []);
  
  console.log(gratiCount);
  const colors = ['#F1426D', '#7239EA', '#22C1AE', '#DE6F4C', '#4192F1', '#39CC7C','#C657C8'];
  const colors1 = ['#E21F4F', '#5D1EE2', '#009583', '#CA5D3B', '#3485E4', '#23B666','#B42BB8'];
  const cardData = [regUser, gratiCount,giveThanksUser,getThanksUser,totalTrans,transAmt,dailySignUp]
  console.log(cardData[0]);
  return (
    <>
        <div className="w-full randomClass1">
        <div className="flex flex-col gap-8 ">
          <div className="conta">
            {colors.map((backgroundColor, index) => (
              <div className="box" key={index}><Cards cardData={cardData[index]} imgIndex={index} backgroundColor={colors[index]} darkColor={colors1[index]} /></div>
            ))}
          </div>
          <div className='h-full'>
            <Tablee />
            </div>
        </div>
        </div>
    </>
  );
};

export default Dashboard;
