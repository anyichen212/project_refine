import ReactApexChart from "react-apexcharts";
import { Box, Typography, Stack } from "@mui/material";

import { PieChartProps } from "interfaces/home";

const PieChart = ({ title, value, series, colors, labels }: PieChartProps) => {
    return (
        <Box
            id="chart"
            flex={1}
            display="flex"
            bgcolor="#fcfcfc"
            flexDirection="column"
            justifyContent="space-evenly"
            alignItems="left"
            pl={3.5}
            py={2}
            gap={2}
            borderRadius="15px"
            minHeight="110px"
            width="fit-content"
        >
            <Stack direction="column">
                <Typography fontSize={18} color="#808191">
                    {title}
                </Typography>
                <Typography
                    fontSize={24}
                    color="#11142d"
                    fontWeight={700}
                    mt={1}
                >
                    {value}
                </Typography>
            </Stack>

            <ReactApexChart
                options={{
                    chart: { type: "donut" },
                    colors,
                    legend: { show: true },
                    dataLabels: { enabled: false },
                    labels,
                }}
                series={series}
                type="donut"
                width="320px"
            />
        </Box>
    );
};

export default PieChart;