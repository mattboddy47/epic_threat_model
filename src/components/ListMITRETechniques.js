import {React} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#2D6E7E',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
      cursor: 'pointer',
    }
  }));

  
  
export default function ThreatList(props) {
  const techniquesAffectingUser = props.techniquesAffectingUser;

  
    return (
    <TableContainer component={Paper}  sx={{ marginBottom: 5 }}  >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <StyledTableRow >
              <StyledTableCell>Technique name</StyledTableCell>
              <StyledTableCell align="right">Tactic</StyledTableCell>
              <StyledTableCell align="right">Description</StyledTableCell>
            </StyledTableRow >
          </TableHead>
          <TableBody>
            {techniquesAffectingUser.map((technique) => (
              <StyledTableRow 
              
              onClick={() => window.location.href = technique.url}
                key={technique.name}
                sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 }
                }}
              >
                <StyledTableCell component="th" scope="row">
                  {technique.name}
                </StyledTableCell>
                <StyledTableCell align="right">{technique.tactics}</StyledTableCell>
                <StyledTableCell align="right">{technique.description}</StyledTableCell>

              </StyledTableRow >
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
    
}


