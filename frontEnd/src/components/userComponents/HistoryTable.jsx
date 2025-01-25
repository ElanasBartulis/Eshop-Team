import React, { useState, useContext, useEffect } from 'react';
import SessionContext from '../../context/SessionContext';
import {
  CircularProgress,
  Collapse,
  colors,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function HistoryTable() {
  const [selectedHistoryId, setSelectedHistoryId] = useState(null);
  const [page, setPage] = useState(0); // dabartinis page 0
  const [itemsPerPage, setItemsPerPage] = useState(5); // kiek rodys vienam page
  const [userHistories, setUserHistories] = useState([]);
  const { userData } = useContext(SessionContext);
  const [totalHistoriesCount, setTotalHistoriesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getHistoryData() {
      setIsLoading(true);
      try {
        const promise = await fetch(
          `/server/api/history/${userData.id}?page=${page}&rowsPerPage=${itemsPerPage}`
        );
        if (promise.ok) {
          const response = await promise.json();

          setTotalHistoriesCount(+response.totalHistoriesCount);
          setUserHistories(response.user.userHistories);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getHistoryData();
  }, [page, itemsPerPage, userData.id]);

  function handleListChange(e, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(e) {
    setItemsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  }

  function selectOrClearHistory(id) {
    setSelectedHistoryId(selectedHistoryId === id ? null : id);
  }
  return (
    <>
      <h2 className="text-xl font-bold mb-4">Purchase history</h2>
      {isLoading ? (
        <div>
          <Stack
            sx={{
              color: 'grey.500',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '200px',
              gap: '20px',
            }}
            spacing={2}
            direction="row"
          >
            <CircularProgress sx={{ color: 'rgb(153 27 27)' }} />
            Loading...
          </Stack>
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table arial-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="center">Nr.</TableCell>
                <TableCell align="center">Total Price</TableCell>
                <TableCell align="center">Purchase Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userHistories.map((data) => (
                <Row
                  key={data.id}
                  data={data}
                  isOpen={selectedHistoryId === data.id}
                  toggleRow={() => selectOrClearHistory(data.id)}
                />
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalHistoriesCount}
            rowsPerPage={itemsPerPage}
            page={page}
            onPageChange={handleListChange}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}
    </>
  );

  function showDate(date) {
    if (!date) return 'Date not found';
    return new Date(date).toLocaleDateString('lt-LT');
  }

  function Row({ data, isOpen, toggleRow }) {
    const { productList, totalPrice, createdAt } = data;
    return (
      <>
        <TableRow>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={toggleRow}
            >
              {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell align="center">{data.id}</TableCell>
          <TableCell align="center">{totalPrice} €</TableCell>
          <TableCell align="center">{showDate(createdAt)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            style={{ paddingBottom: 0, paddingTop: 0 }}
            colSpan={4}
          >
            <Collapse
              in={isOpen}
              timeout="auto"
              unmountOnExit
            >
              <Typography
                variant="h6"
                gutterBottom
                align="center"
              >
                Purchased Items
              </Typography>
              <div>
                <ul>
                  {productList.map((item, index) => (
                    <li key={`item-${index}`}>{item}</li>
                  ))}
                </ul>
              </div>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  }
}
