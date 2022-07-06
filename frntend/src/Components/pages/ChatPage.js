import { Box } from "@chakra-ui/react";
import { useState } from "react";
import ChatBox from "../ChatBox";
import { ChartState } from "../Context/ChartProvider";
import SideDrawer from "../miscellaneous/SideDrawer";
import MyChats from "../MyChats";

const ChatPage = () => {
  const { user } = ChartState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        d="flex"
        justifyContent="center"
        w={{ base: "100%", lg: "90%" }}
        h={{ base: "91.5vh", lg: "85vh" }}
        p="12px"
        margin="auto"
        marginTop={{ base: "0px", lg: "40px" }}
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatPage;
