import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function LinearIndeterminate() {
    return (
        <Box sx={{ width: "98%" }}>
            <LinearProgress
                sx={{
                    backgroundColor: "gray",
                    "& .MuiLinearProgress-bar": {
                        backgroundColor: "white",
                    },
                }}
            />
        </Box>
    );
}
