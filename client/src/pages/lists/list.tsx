import { Add } from "@mui/icons-material";
import { useTable } from "@refinedev/core";
import {
    Box,
    Stack,
    Typography,
    TextField,
    Select,
    MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

import {CustomButton, ListCard } from "components";
import { alignProperty } from "@mui/material/styles/cssUtils";

const AllLists = () => {

  const navigate = useNavigate();

  const {
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    setPageSize,
    pageCount,
    sorter,
    setSorter,
    filters,
    setFilters,
} = useTable();

  const allLists = data?.data ?? [];

  const currentTitle = sorter.find((item) => item.field === "title")?.order;

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error...</Typography>;

  return (
    <Box>
      <Box mt="20px" sx={{display: 'flex', flexWrap: 'wrap', gap: 3}} >

        <Stack direction="column" width="100%">
        <Typography
            fontSize={35} //{{xs:35, md:25}}
            fontWeight={700}
            color = "#11142d"
            textAlign={{xs:"center", sm:"left"}}
          >
            {!allLists.length ? 'This Page Is Empty' : 'Your Lists'}
        </Typography>

        <Box mb={2} mt={2} display = "flex" width="100%" justifyContent={{xs:"center", sm:"space-between"}} flexWrap="wrap" >

          <Stack 
            direction ="row"
            justifyContent= "space-between"
            alignItems= "center"
          >
          <CustomButton
          title="New List"
          handleClick={() => navigate('/lists/create')}
          backgroundColor="#475be8"
          color= "#fcfcfc"
          icon={<Add />}
          />
        </Stack>

            <Box display={{xs:"none", sm:"flex"}} ml={2} mt={2} gap={2} flexWrap="wrap" mb={{ xs:'20px', sm:0}}>
                <CustomButton
                  title = {`Sort A-Z`}
                  //handleClick={() => toggleSort("title")}
                  backgroundColor="#475be8"
                  color="#fcfcfc"
            />
                <TextField
                  variant="outlined"
                  color="info"
                  placeholder="Search by title"
                  //value={currentFilterValues.title}
                  onChange={(e) => {
                    setFilters([
                      {
                        field: "title",
                        operator: "contains",
                        value: e.currentTarget.value
                            ? e.currentTarget.value
                            : undefined,
                        },
                      ]);
                    }}
                  />

            </Box>
      </Box>
    </Stack>

  </Box>

        <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "center"}}>
                {allLists?.map((list) => (
                    <ListCard
                        key={list._id}
                        id={list._id}
                        title={list.title}
                        image={list.image}
                    />
                ))}
            </Box>

        <div>{/* pagination */}</div>
        {allLists.length > 0 && (
            <Box display="flex" gap={2} mt={3} flexWrap="wrap" justifyContent="center">
                <CustomButton
                    title="Previous"
                    handleClick={() => setCurrent((prev) => prev - 1)}
                    backgroundColor="#475be8"
                    color="#fcfcfc"
                    disabled={!(current > 1)}
                />
                <Box
                    display={{ xs: "none", sm: "flex" }}
                    alignItems="center"
                    gap="5px"
                >
                    Page{" "}
                    <strong>
                        {current} of {pageCount}
                    </strong>
                </Box>
                <CustomButton
                    title="Next"
                    handleClick={() => setCurrent((prev) => prev + 1)}
                    backgroundColor="#475be8"
                    color="#fcfcfc"
                    disabled={current === pageCount}
                />

                <Box  display={{ xs: "none", sm: "flex" }}>
                <Select
                    variant="outlined"
                    color="info"
                    displayEmpty
                    required
                    inputProps={{ "aria-label": "Without label" }}
                    defaultValue={10}
                    onChange={(e) =>
                        setPageSize(
                            e.target.value ? Number(e.target.value) : 10,
                        )
                    }
                >
                    {[10, 20, 30, 40, 50].map((size) => (
                        <MenuItem key={size} value={size}>
                            Show {size}
                        </MenuItem>
                    ))}
                </Select>
                </Box>
              </Box>

          )}
    </Box>
  )
};

export default AllLists;
