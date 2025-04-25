import { Grid2, styled, Typography } from "@mui/material";

export const FooterBox = styled(Grid2)({
    padding: '40px',
    justifyContent: 'space-evenly',
    backgroundColor: '#232F3E',
})

export const FooterItem = styled(Grid2)({
    color: 'white'
})

export const FooterTypo = styled(Typography)({
    '&:hover':{textDecoration: 'underline'},
    cursor: 'pointer',
    fontSize: '13.5px',
    marginBottom: '6px'
})

export const TextHeader = styled(Typography)({
    fontSize: '17px',
    color: '#DDDDDD',
    fontWeight: 'bold',
    marginBottom: '6px'
})