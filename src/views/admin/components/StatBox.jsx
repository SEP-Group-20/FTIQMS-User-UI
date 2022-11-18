import {Box,Typography, useTheme} from "@mui/material";
import { tokens } from "../components/theme";

const StatBox = ({title,subtitle, icon, increase}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.colors);

    return (
        <Box width="100%" m="0 30px">
            <Box display="flex" justifyContent= "space-between">
                <Box>

                {icon}
                <Typography 
                    variant = "h5"
                    fontWeight= "bold"
                    sx = {{color : colors.grey[500]}}>
                    {title}
                </Typography>
                </Box>  
                <Box>
                </Box> 
            </Box> 
                <Box display="flex" justifyContent="space-between">
                <Typography 
                    variant = "h6"
                    fontWeight= "bold"
                    sx = {{color : colors.greenAccent[500]}}>
                    {subtitle}
                </Typography>
                <Typography 
                    variant = "h6"
                    fontWeight= "italic"
                    sx = {{color : colors.greenAccent[600]}}>
                    {increase}
                </Typography>
                </Box>
           
        </Box>
    )
}

export default StatBox;