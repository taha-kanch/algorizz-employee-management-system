import { TablePagination, styled } from '@mui/material';
import React from 'react';

const DEFAULT_ROWS_PER_PAGE_OPTION = [5, 10, 25];

const PaginationWrapper = styled(TablePagination)(({ theme }) => ({
    'p.MuiTablePagination-selectLabel,p.MuiTablePagination-displayedRows,.MuiTablePagination-input': {
        'marginBottom': 0,
        'fontWeight': 600,
    }
}));

const usePagination = (total, filters, setFilters, pageSizeOption = DEFAULT_ROWS_PER_PAGE_OPTION) => {

    const handleChangeRowsPerPage = (evt) => {
        setFilters({
            ...filters,
            page: 0,
            limit: evt.target.value
        });
    };

    const handleChangePage = (evt, newPage) => {
        setFilters({
            ...filters,
            page: newPage
        });
    };

    return (
        [
            <PaginationWrapper
                rowsPerPageOptions={pageSizeOption}
                component="div"
                count={total}
                rowsPerPage={filters.limit}
                page={filters.page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        ]
    );

}

export default usePagination;