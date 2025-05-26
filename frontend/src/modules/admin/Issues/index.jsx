import React from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Button, IconButton, Dialog, DialogTitle, DialogContent,
    DialogContentText, DialogActions,
    Grid,
    TextField,
    MenuItem
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { deleteIssueApiCall, fetchEmployeesList, fetchIssuesList } from '../action';
import usePagination from '../../../components/Pagination';
import Loader from '../../../components/Loader';
import IssueFormModal from './IssueFormModal';


const Issues = () => {

    const { data, loading, total } = useSelector(state => state.issues_admin);
    const { data: employeeData } = useSelector(state => state.employees_admin);
    const dispatch = useDispatch();

    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [selectedIssue, setSelectedIssue] = React.useState(null);
    const [formDialogOpen, setFormDialogOpen] = React.useState(false);
    const [filters, setFilters] = React.useState({
        page: 0,
        limit: 10,
        search: '',
        status: '',
        priority: '',
        assignedToId: ''
    });

    React.useEffect(() => {
        fetchIssuesList(filters, dispatch);
    }, [dispatch, filters]);


    React.useEffect(() => {
        fetchEmployeesList({}, dispatch);
    }, []);

    const [paging] = usePagination(total, filters, setFilters);

    const handleDeleteOpen = (issue) => {
        setSelectedIssue(issue);
        setDeleteDialogOpen(true);
    };

    const handleDeleteClose = () => {
        setDeleteDialogOpen(false);
        setSelectedIssue(null);
    };

    const confirmDelete = () => {
        deleteIssueApiCall(selectedIssue.id, refetchIssuesList);
    };

    const handleEdit = (issue) => {
        setSelectedIssue(issue);
        setFormDialogOpen(true);
    };


    const handleAddIssue = () => {
        setSelectedIssue(null);
        setFormDialogOpen(true);
    }

    const refetchIssuesList = () => {
        fetchIssuesList(filters, dispatch);
        setDeleteDialogOpen(false);
        setSelectedIssue(null);
        setFormDialogOpen(false);
    }


    return (
        <div style={{ padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <h1 className="text-3xl font-bold text-gray-800">Issues</h1>
                <Button variant="contained" color="primary" onClick={handleAddIssue}>
                    Add Issue
                </Button>
            </div>
            <Grid container spacing={2} style={{ marginBottom: 16 }}>
                <Grid item xs={12} sm={4} md={3}>
                    <TextField
                        fullWidth
                        label="Search"
                        variant="outlined"
                        value={filters.search || ''}
                        onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value, page: 0 }))}
                    />
                </Grid>

                <Grid item xs={12} sm={4} md={3}>
                    <TextField
                        fullWidth
                        select
                        label="Status"
                        variant="outlined"
                        value={filters.status || ''}
                        onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value, page: 0 }))}
                        style={{ minWidth: 200 }}
                    >
                        {["TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"].map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={4} md={3}>
                    <TextField
                        fullWidth
                        select
                        label="Priority"
                        variant="outlined"
                        value={filters.priority || ''}
                        onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value, page: 0 }))}
                        style={{ minWidth: 200 }}
                    >
                        {["LOW", "MEDIUM", "HIGH", "URGENT"].map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={4} md={3}>
                    <TextField
                        fullWidth
                        select
                        label="Assigned To"
                        variant="outlined"
                        value={filters.assignedToId || ''}
                        onChange={(e) => setFilters(prev => ({ ...prev, assignedToId: e.target.value, page: 0 }))}
                        style={{ minWidth: 200 }}
                    >
                        {employeeData?.length && employeeData.map(option => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.firstName +' '+ option.lastName}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={6} md={3} style={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => setFilters({ page: 0, limit: 10 })}
                        fullWidth
                    >
                        Reset Filters
                    </Button>
                </Grid>
            </Grid>
            {
                data && data.length && !loading ? (
                    <>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>IssueId</TableCell>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Assigned To</TableCell>
                                        <TableCell>Priority</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Due Date</TableCell>
                                        <TableCell align="center">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((issue) => (
                                        <TableRow key={issue.id}>
                                            <TableCell>{issue.issueId}</TableCell>
                                            <TableCell>{issue.title}</TableCell>
                                            <TableCell>{issue.description}</TableCell>
                                            <TableCell>{issue.assignedTo?.firstName} {issue.assignedTo?.lastName}</TableCell>
                                            <TableCell>{issue.priority}</TableCell>
                                            <TableCell>{issue.status}</TableCell>
                                            <TableCell>{issue.dueDate ? new Date(issue.dueDate).toLocaleDateString() : ""}</TableCell>
                                            <TableCell align="center">
                                                <IconButton color="primary" onClick={() => handleEdit(issue)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton color="error" onClick={() => handleDeleteOpen(issue)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {paging}
                        </TableContainer>
                    </>
                ) : loading ? (
                    <Loader />
                ) : (
                    <div className='record_not_found'>No Record Found</div>
                )
            }

            {/* Delete Dialog */}
            <Dialog open={deleteDialogOpen} onClose={handleDeleteClose}>
                <DialogTitle>Delete Issue</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete <strong>{selectedIssue?.name}</strong>?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose}>Cancel</Button>
                    <Button onClick={confirmDelete} color="error" variant="contained">Delete</Button>
                </DialogActions>
            </Dialog>

            {
                formDialogOpen && <IssueFormModal
                    open={formDialogOpen}
                    onClose={() => setFormDialogOpen(false)}
                    issue={selectedIssue}
                    refetch={refetchIssuesList}
                    employeeData={employeeData}
                />
            }

        </div >
    );
};

export default Issues;
