import { useList } from "@refinedev/core";
import { Box, Typography } from "@mui/material";

import { useGetIdentity, useOne, useActiveAuthProvider } from "@refinedev/core";

import { useNavigate } from "react-router-dom";

import { AgentCard } from "components";

const Profile = () => {

    //const { data, isLoading, isError } = useList({ resource: "users" });

    const authProvider = useActiveAuthProvider();
    const { data: user } = useGetIdentity({
      v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });

    const { data, isLoading, isError } = useOne({
        resource: "users",
        id: user?.userid,
    });


    const allAgents = data?.data ?? [];

    if (isLoading) return <div>loading...</div>;
    if (isError) return <div>error...</div>;

    /*return (
        <Box>
            <Typography fontSize={25} fontWeight={700} color="#11142d">
                Friend List
            </Typography>

            <Box
                mt="20px"
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    backgroundColor: "#fcfcfc",
                }}
            >
                {allAgents.map((agent) => (
                    <AgentCard
                        key={agent._id}
                        id={agent._id}
                        name={agent.name}
                        email={agent.email}
                        avatar={agent.avatar}
                        noOfLists={agent.allList.length}
                    />
                ))}
            </Box>
        </Box>
    );*/

    return (
        <Box>
            <Typography fontSize={25} fontWeight={700} color="#11142d">
                Friend List
            </Typography>

            <Box
                mt="20px"
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    backgroundColor: "#fcfcfc",
                }}
            >
                
                    <AgentCard
                        key={allAgents._id}
                        id={allAgents._id}
                        name={allAgents.name}
                        email={allAgents.email}
                        avatar={allAgents.avatar}
                        noOfLists={allAgents.allList.length}
                    />
                
            </Box>
        </Box>
    );
};

export default Profile;