//import React from 'react';

import { Typography, Box, Stack } from "@mui/material";
import { useDelete, useGetIdentity, useShow, useActiveAuthProvider } from "@refinedev/core";
import { useParams, useNavigate } from "react-router-dom";
import {
    ChatBubble,
    Delete,
    Edit,
    Phone,
} from "@mui/icons-material";

import { CustomButton } from "components";

function checkImage(url: any) {
    const img = new Image();
    img.src = url;
    return img.width !== 0 && img.height !== 0;
}

const ListShow = () => {
  const navigate = useNavigate();
  const authProvider = useActiveAuthProvider();
  const { data: user } = useGetIdentity({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });
  const { queryResult } = useShow();
  const { mutate } = useDelete();
  const { id } = useParams();

  const { data, isLoading, isError } = queryResult;

  const listDetails = data?.data ?? {};

  if (isLoading) {
      return <div>Loading...</div>;
  }

  if (isError) {
      return <div>Something went wrong!</div>;
  }

  const isCurrentUser = user.email === listDetails.creator.email;

  const handleDeleteList = () => {
      const response = window.confirm(
          "Are you sure you want to delete this list?",
      );
      if (response) {
          mutate(
              {
                  resource: "lists",
                  id: id as string,
              },
              {
                  onSuccess: () => {
                      navigate("/lists");
                  },
              },
          );
      }
  };

  return (
      <Box
          borderRadius="15px"
          padding="20px"
          bgcolor="#FCFCFC"
          width="fit"
      >
          <Typography fontSize={25} fontWeight={700} color="#11142D">
              Details
          </Typography>

          <Box
              mt="20px"
              display="flex"
              flexDirection={{ xs: "column", lg: "row" }}
              gap={4}
          >
              <Box flex={1} maxWidth={764}>
                  <img
                      src={listDetails.image}
                      alt="list_details-img"
                      height={546}
                      style={{ objectFit: "cover", borderRadius: "10px" }}
                      className="list_details-img"
                  />

                  <Box mt="15px">

                      <Stack
                          direction="row"
                          flexWrap="wrap"
                          justifyContent="space-between"
                          alignItems="center"
                          gap={2}
                      >
                          <Box>
                              <Typography
                                  fontSize={22}
                                  fontWeight={600}
                                  mt="10px"
                                  color="#11142D"
                              >
                                  {listDetails.title}
                              </Typography>
                          </Box>

                      </Stack>

                      <Stack mt="25px" direction="column" gap="10px">
                          <Typography fontSize={18} color="#11142D">
                              Description
                          </Typography>
                          <Typography fontSize={14} color="#808191">
                              {listDetails.description}
                          </Typography>
                      </Stack>
                  </Box>
              </Box>

              <Box
                  width="100%"
                  flex={1}
                  maxWidth={326}
                  display="flex"
                  flexDirection="column"
                  gap="20px"
              >
                  <Stack
                      width="100%"
                      p={2}
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      border="1px solid #E4E4E4"
                      borderRadius={2}
                  >
                      <Stack
                          mt={2}
                          justifyContent="center"
                          alignItems="center"
                          textAlign="center"
                      >
                          <img
                              src={
                                  checkImage(listDetails.creator.avatar)
                                      ? listDetails.creator.avatar
                                      : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                              }
                              alt="avatar"
                              width={90}
                              height={90}
                              style={{
                                  borderRadius: "100%",
                                  objectFit: "cover",
                              }}
                          />

                          <Box mt="15px">
                              <Typography
                                  fontSize={18}
                                  fontWeight={600}
                                  color="#11142D"
                              >
                                  {listDetails.creator.name}
                              </Typography>
                              <Typography
                                  mt="5px"
                                  fontSize={14}
                                  fontWeight={400}
                                  color="#808191"
                              >
                                  Agent
                              </Typography>
                          </Box>

                          <Typography
                              mt={1}
                              fontSize={16}
                              fontWeight={600}
                              color="#11142D"
                          >
                              {listDetails.creator.allList.length}{" "}
                              Lists
                          </Typography>
                      </Stack>

                      <Stack
                          width="100%"
                          mt="25px"
                          direction="row"
                          flexWrap="wrap"
                          gap={2}
                      >
                          <CustomButton
                              title={!isCurrentUser ? "Message" : "Edit"}
                              backgroundColor="#475BE8"
                              color="#FCFCFC"
                              fullWidth
                              icon={
                                  !isCurrentUser ? <ChatBubble /> : <Edit />
                              }
                              handleClick={() => {
                                  if (isCurrentUser) {
                                      navigate(
                                          `/lists/edit/${listDetails._id}`,
                                      );
                                  }
                              }}
                          />
                          <CustomButton
                              title={!isCurrentUser ? "Call" : "Delete"}
                              backgroundColor={
                                  !isCurrentUser ? "#2ED480" : "#d42e2e"
                              }
                              color="#FCFCFC"
                              fullWidth
                              icon={!isCurrentUser ? <Phone /> : <Delete />}
                              handleClick={() => {
                                  if (isCurrentUser) handleDeleteList();
                              }}
                          />
                      </Stack>
                  </Stack>

              </Box>
          </Box>
      </Box>
  ); 

  //return (
    //<div>details</div>
  //);
};

export default ListShow;
