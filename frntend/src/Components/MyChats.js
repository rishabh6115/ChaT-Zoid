import { AddIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { getSender } from "../Config/ChatLogic";
import ChatLoading from "./ChatLoading";
import { ChartState } from "./Context/ChartProvider";
import GroupChatModal from "./miscellaneous/GroupChatModal";

const MyChats = ({ fetchAgain }) => {
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChartState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const fetchChats = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    fetchChats();
  }, [fetchAgain]);

  const namefn = (users) => {
    return user._id === users[0]._id ? users[1].name : users[0].name;
  };

  const getSenderPic = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1].pic : users[0].pic;
  };
  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
      bg="#F8F8F8"
      borderRightRadius="0"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "18px", lg: "25px" }}
        fontWeight="bold"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        borderBottom="1px"
        borderColor="gray.200"
      >
        <Box className="flex">
          <Text className="chats">Messages</Text>
          <Box className="chats-length" bg="facebook.300">
            <Text color="black"> {chats.length}</Text>
          </Box>
        </Box>
        <GroupChatModal>
          <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "15px" }}
            rightIcon={<AddIcon />}
            size={{ lg: "sm" }}
            py="10px"
            px="8px"
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
        marginTop="3px"
        padding="0"
      >
        {loading ? (
          <ChatLoading />
        ) : (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                px={3}
                py={2}
                key={chat._id}
                marginTop="5px"
                bg={selectedChat === chat ? "facebook.200" : "#white"}
                display="flex"
                borderRadius="lg"
              >
                <Box>
                  {
                    <Avatar
                      size="md"
                      marginRight="10px"
                      bg="facebook.100"
                      name={
                        !chat.isGroupChat ? namefn(chat.users) : chat.chatName
                      }
                      src={
                        !chat.isGroupChat ? getSenderPic(user, chat.users) : ""
                      }
                    />
                  }
                </Box>
                <span>
                  <Text fontWeight="bold" color="#4e7ef0">
                    {!chat.isGroupChat ? namefn(chat.users) : chat.chatName}
                  </Text>
                  <Text
                    marginTop="-4px"
                    color="black"
                    fontWeight="bold"
                    fontSize="small"
                  >
                    {chat.latestMessage ? (
                      chat.latestMessage.content.length > 50 ? (
                        <span>
                          {chat.latestMessage.content.slice(0, 51)}...{" "}
                        </span>
                      ) : (
                        chat.latestMessage.content
                      )
                    ) : (
                      ""
                    )}
                  </Text>
                </span>
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
