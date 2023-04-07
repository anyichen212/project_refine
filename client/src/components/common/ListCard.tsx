import { Place } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {
    Typography,
    Box,
    Card,
    CardMedia,
    CardContent,
    Stack,
} from "@mui/material";

import { ListCardProps } from "interfaces/list";

const ListCard = ({
    id,
    title,
    image,
}: ListCardProps) => {
    return (
        <Card
            component={Link}
            to={`/lists/show/${id}`}
            sx={{
                maxWidth: "250px",
                //marginLeft: "5px",
                padding: "10px",
                "&:hover": {
                    boxShadow: "0 22px 45px 2px rgba(176, 176, 176, 0.1)",
                },
                '@media screen and (max-width: 600px)':{
                    margin:"auto"
                },
                cursor: "pointer",
            }}
            elevation={0} //no additional
        >
            <CardMedia
                component="img"
                width="100%"
                height={210}
                image={image}
                alt="card image"
                sx={{ borderRadius: "10px" }}
            />
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: "10px",
                    paddingX: "5px",
                }}
            >
                <Stack direction="column" gap={1}>
                    <Typography fontSize={16} fontWeight={500} color="#11142d">
                        {title}
                    </Typography>
                    <Stack direction="row" gap={0.5} alignItems="flex-start">
                        <Place
                            sx={{
                                fontSize: 18,
                                color: "#11142d",
                                marginTop: 0.5,
                            }}
                        />
                    </Stack>
                </Stack>
                <Box
                    px={1.5}
                    py={0.5}
                    borderRadius={1}
                    bgcolor="#dadefa"
                    height="fit-content"
                >
                </Box>
            </CardContent>
        </Card>
    );
};

export default ListCard;