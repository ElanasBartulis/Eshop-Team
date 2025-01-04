import React, { useState } from 'react';
import {
  Collapse,
  IconButton,
  Paper,
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
import rootShouldForwardProp from '@mui/material/styles/rootShouldForwardProp';

export default function HistoryTable() {
  const [selectedHistoryId, setSelectedHistoryId] = useState(null);
  const [page, setPage] = useState(0); // dabartinis page 0
  const [itemsPerPage, setItemsPerPage] = useState(5); // kiek rodys vienam page

  const userHistory = [
    {
      id: 1,
      totalPrice: 100.5,
      createdAt: new Date('2025-01-01'),
      productList: ['Product A', 'Product B', 'Product C'],
    },
    {
      id: 2,
      totalPrice: 250.75,
      createdAt: new Date('2025-01-02'),
      productList: ['Product A', 'Product B', 'Product C'],
    },
    {
      id: 3,
      totalPrice: 175.2,
      createdAt: new Date('2025-01-03'),
      productList: ['Product A', 'Product B', 'Product C'],
    },
    {
      id: 4,
      totalPrice: 175.2,
      createdAt: new Date('2025-01-03'),
      productList: ['Product A', 'Product B', 'Product C'],
    },
    {
      id: 5,
      totalPrice: 175.2,
      createdAt: new Date('2025-01-03'),
      productList: ['Product A', 'Product B', 'Product C'],
    },
    {
      id: 6,
      totalPrice: 175.2,
      createdAt: new Date('2025-01-03'),
      productList: ['Product A', 'Product B', 'Product C'],
    },
    {
      id: 7,
      totalPrice: 175.2,
      createdAt: new Date('2025-01-03'),
      productList: ['Product A', 'Product B', 'Product C'],
    },
    {
      id: 8,
      totalPrice: 175.2,
      createdAt: new Date('2025-01-03'),
      productList: ['Product A', 'Product B', 'Product C'],
    },
    {
      id: 9,
      totalPrice: 175.2,
      createdAt: new Date('2025-01-03'),
      productList: ['Product A', 'Product B', 'Product C'],
    },
    {
      id: 10,
      totalPrice: 175.2,
      createdAt: new Date('2025-01-03'),
      productList: ['Product A', 'Product B', 'Product C'],
    },
    {
      id: 11,
      totalPrice: 175.2,
      createdAt: new Date('2025-01-03'),
      productList: ['Product A', 'Product B', 'Product C'],
    },
    {
      id: 12,
      totalPrice: 175.2,
      createdAt: new Date('2025-01-03'),
      productList: ['Product A', 'Product B', 'Product C'],
    },
    {
      id: 13,
      totalPrice: 175.2,
      createdAt: new Date('2025-01-03'),
      productList: ['Product A', 'Product B', 'Product C'],
    },
    {
      id: 14,
      totalPrice: 175.2,
      createdAt: new Date('2025-01-03'),
      productList: ['Product A', 'Product B', 'Product C'],
    },
  ];

  function handleListChange(e, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(e) {
    setItemsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  }

  const showingList = userHistory.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage
  );

  function selectOrClearHistory(id) {
    setSelectedHistoryId(selectedHistoryId === id ? null : id);
  }
  return (
    <>
      <h2 className="text-xl font-bold mb-4">Purchase history</h2>
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
            {showingList.map((data) => (
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
          count={userHistory.length}
          rowsPerPage={itemsPerPage}
          page={page}
          onPageChange={handleListChange}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );

  function showDate(date) {
    if (!date) return 'Date not found';
    return new Date(date).toLocaleDateString('lt-LT');
  }

  function Row({ data, isOpen, toggleRow }) {
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
          <TableCell align="center">{data.totalPrice} €</TableCell>
          <TableCell align="center">{showDate(data.createdAt)}</TableCell>
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
                  {data.productList.map((item, index) => (
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
