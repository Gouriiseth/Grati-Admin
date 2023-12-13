import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  Sidebar,
  ConversationList,
  Conversation,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  ConversationHeader,
  Button,
  MessageListContent,
  MessageTextContent,
} from "@chatscope/chat-ui-kit-react";
import React, { useEffect, useState } from "react";
import "./support.css";
import User from "../../../../Assets/images/icons/user.png";
import Arrow from "../../../../Assets/images/icons/arrow_down_green.png";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "../../../../Assets/images/icons/search.png";
import InputBase from "@mui/material/InputBase";
import { MenuItem, Select } from "@mui/material";
import { queriedUsers, queryStatus } from "../../../API/gratiSupportApi";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "310px",
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    // marginLeft: theme.spacing(3),
    // width: 'auto',
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  width: "[331px]",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  zIndex: "1",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: "30px",
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Support = () => {
  const [userData, setUserData] = useState([]);
  const [isChat, setIsChat] = useState(false);
  const [userName, setUserName] = useState("")
  const [queryId, setQueryId] = useState("")
  const [avatar, setAvatar] = useState("")
  const [isMessage, setIsMessage] = useState("")
  const [isClose, setIsClose] = useState(false)
  const [userId, setuserId] = useState("")

  
  const sendMsg = () => {
    console.log("send msg");
  };

  const queryUsers = async () => {
    try {
      const response = await queriedUsers();
      setUserData(response?.data?.data);
      console.log(response?.data?.data[0].isClosed);
      // setIsClose(isClose)
    } catch (error) {
      console.error(error);
    }
  };

  console.log(userData);
  useEffect(() => {
    queryUsers();
  }, []);

  const handleChat = async (name,id,avatar,msg,userId,) => {
    console.log(`i am clicked ${id}`);
    setIsChat(true)
    // const response = await queriedUsers();
    setUserName(name)
    setQueryId(id)
    setAvatar(avatar)
    setIsMessage(msg)
    setuserId(userId)
    // setIsClose(isClose)

  };
  console.log(isClose,"byee");
  // const handleIsClosed=(event)=>{
  //   setIsClose(event.target.value)
    
  // }
  const handleIsClosed=async(event)=>{
    setIsClose(event.target.value)
    const data={
      _id:userId,
      isClosed:!isClose
    }
    console.log(isClose);
      const res = await queryStatus(data)
    if(res){
      if(res.status===200){
        console.log(res?.data?.data);
        queryUsers()
        console.log(isClose,"hiii");
      }
    }
  }
console.log(isClose);

  return (
    <>
      <div className="chatPage">
        <MainContainer>
          <Sidebar position="left" >
            <Search className="flex h-11 w-[inherit] m-auto justify-between" styles={{width:"fit-content"}}>
              <SearchIconWrapper>
                <img src={SearchIcon} alt="" className="w-[22px] h-[22px]" />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search User, Query ID"
                inputProps={{ "aria-label": "search" }}
                className="flex w-full rounded-[6px] gap-1 border-[1px] p-[10px] bg-[#EEEEEE]"
              />
            </Search>
            <ConversationList>
              {userData.map((data) => (
                <Conversation
                  onClick={() => handleChat(data?.name,data?.queryID,data?.userDetails?.profilePicture,data?.message,data?.userId)}
                  key={data?._id}
                  name={data?.name}
                  // styles={data?.isClosed && { background: "pink" } }
                  styles={{background:"red"}}
                  info={`Query ID:#${data?.queryID.slice(-4)}`}
                  // active={true}
                  lastActivityTime="3 mins"
                  unreadDot

                >
                  <Avatar
                    src={data?.userDetails?.profilePicture}
                    style={{ height: "44px", width: "44px" }}
                    // className="border-2 border-black"
                    alt="img"
                  />
                </Conversation>
              ))}
            </ConversationList>
          </Sidebar>
          <ChatContainer className="gap-7 p-6">
           
            { isChat ? ( <MessageList>
            <ConversationHeader style={{ paddingBottom: "31px" }}>
              <Avatar
                src={avatar}
                style={{ height: "52px", width: "52px" }}
                // className="border-2 border-black"
                alt=""
              />
              <ConversationHeader.Content
                userName={userName}
                  info={`Query ID:#${queryId.slice(-4)}`}
              ></ConversationHeader.Content>
              <ConversationHeader.Actions>
                
                <Select
                  labelId="pagination-limit-select-label"
                  // id="pagination-limit-select"
                  // value={filter}
                  value={isClose}
                  // defaultValue="Open"
                  displayEmpty
                  onChange={handleIsClosed}
                  className=" bg-[#E1FFD7] w-[95px] h-11 rounded-[6px] gap-1 py-2 px-[14px]"
                  style={{
                    fontFamily: "Inter",
                    lineHeight: "20px",
                    fontWeight: "700",
                    textSize: "14px",
                    padding: "0",
                    color: "#42751B",
                  }}
                >
                  <MenuItem
                    style={{
                      "&:hover": {
                        background: "none",
                      },
                    }}
                    value={false}
                  >
                    Open
                  </MenuItem>
                  <MenuItem
                    style={{
                      "&:hover": {
                        backgroundColor: "#EEEEEE",
                      },
                    }}
                    value={true}
                  >
                    Close
                  </MenuItem>
                </Select>
              </ConversationHeader.Actions>
            </ConversationHeader>

            <MessageList>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <Avatar
                    src={avatar}
                    style={{ height: "33px", width: "33px" }}
                    // className="border-2 border-black"
                    alt=""
                  />
                  <span
                    className="self-center text-black text-[18px] font-semibold"
                    style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}
                  >
                    {userName}
                  </span>
                  <span
                    className="self-center mt-2 text-[#888888] font-normal"
                    style={{
                      fontFamily: " Plus Jakarta Sans,sans-serif",
                      fontSize: "small",
                    }}
                  >
                    2 mins
                  </span>
                </div>

                <Message
                  model={{
                    message:isMessage,
                    sentTime: "just now",
                    sender: "Joe",
                    direction: "incoming",
                  }}
                ></Message>
              </div>

              <div className=" flex flex-col gap-2">
                <div className="flex gap-2  self-end">
                  <span
                    className="self-center   mt-2 text-[#888888] font-normal"
                    style={{
                      fontFamily: " Plus Jakarta Sans,sans-serif",
                      fontSize: "small",
                    }}
                  >
                    2 mins
                  </span>
                  <span
                    className="self-center  text-black text-[18px] font-semibold"
                    style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}
                  >
                    You{" "}
                  </span>
                  <Avatar
                    src={User}
                    className="h-[34px] w-[34px]  border-2 border-black right ml-auto"
                    alt=""
                  />
                </div>
                <Message
                  model={{
                    message:
                      "Hii,  I'm doing great, thanks for asking! I have a few questions about cleaning. ",
                    sentTime: "just now",
                    sender: "you",
                    direction: "outgoing",
                  }}
                />
              </div>
            </MessageList>
            <MessageInput
              placeholder="Type Something..."
              onClick={sendMsg}
              sendButton={true}
              attachButton={false}
            ></MessageInput>
              {/* <button className="h-10 w-fit right">send</button>  */}
             
              </MessageList>)
              : <MessageList className="onload">Provide Support to others</MessageList> }
          </ChatContainer>
        </MainContainer>
      </div>
    </>
  );
};
export default Support;
