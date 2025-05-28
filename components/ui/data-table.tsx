'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Box,
  Typography,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Search } from '@mui/icons-material';

export interface Column<T = any> {
  id: keyof T;
  label: string;
  minWidth?: number;
  align?: 'left' | 'right' | 'center';
  sortable?: boolean;
  format?: (value: any) => React.ReactNode;
}

interface DataTableProps<T = any> {
  columns: Column<T>[];
  data: T[];
  title?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  emptyMessage?: string;
  maxHeight?: number;
}

type Order = 'asc' | 'desc';

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  title,
  searchable = true,
  searchPlaceholder = 'Search...',
  emptyMessage = 'No data available',
  maxHeight = 400,
}: DataTableProps<T>) {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof T | ''>('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleRequestSort = (property: keyof T) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredData = React.useMemo(() => {
    if (!searchTerm) return data;
    
    return data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  const sortedData = React.useMemo(() => {
    if (!orderBy) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];

      if (aValue < bValue) {
        return order === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, order, orderBy]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {/* Header */}
      {(title || searchable) && (
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            {title && (
              <Typography variant="h6" component="div">
                {title}
              </Typography>
            )}
            {searchable && (
              <TextField
                size="small"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                sx={{ minWidth: 250 }}
              />
            )}
          </Box>
        </Box>
      )}

      {/* Table */}
      <TableContainer sx={{ maxHeight }}>
        <Table stickyHeader aria-label={title || 'data table'}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={String(column.id)}
                  align={column.align || 'left'}
                  style={{ minWidth: column.minWidth }}
                  sortDirection={orderBy === column.id ? order : false}
                >
                  {column.sortable !== false ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => handleRequestSort(column.id)}
                    >
                      {column.label}
                      {orderBy === column.id ? (
                        <Box 
                          component="span" 
                          sx={{
                            border: 0,
                            clip: 'rect(0 0 0 0)',
                            height: 1,
                            margin: -1,
                            overflow: 'hidden',
                            padding: 0,
                            position: 'absolute',
                            top: 20,
                            width: 1,
                          }}
                        >
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">{emptyMessage}</Typography>
                </TableCell>
              </TableRow>
            ) : (
              sortedData.map((row, index) => (
                <TableRow hover key={index}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={String(column.id)} align={column.align || 'left'}>
                        {column.format ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer with row count */}
      {sortedData.length > 0 && (
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="caption" color="text.secondary">
            Showing {sortedData.length} of {data.length} rows
            {searchTerm && ` (filtered)`}
          </Typography>
        </Box>
      )}
    </Paper>
  );
} 