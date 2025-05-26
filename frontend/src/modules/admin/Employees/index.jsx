import React from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Button, IconButton, Dialog, DialogTitle, DialogContent,
    DialogContentText, DialogActions,
    Grid,
    TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PasswordIcon from '@mui/icons-material/Password';
import EditEmployeeModal from './EmployeeFormModal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployeeApiCall, fetchEmployeesList } from '../action';
import usePagination from '../../../components/Pagination';
import Loader from '../../../components/Loader';
import ChangePasswordModal from './ChangePasswordModal';


const Employees = () => {

    const { data, loading, total } = useSelector(state => state.employees_admin);
    const dispatch = useDispatch();

    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [selectedEmployee, setSelectedEmployee] = React.useState(null);
    const [formDialogOpen, setFormDialogOpen] = React.useState(false);
    const [changePasswordDialogOpen, setChangePasswordDialogOpen] = React.useState(false);
    const [filters, setFilters] = React.useState({
        page: 0,
        limit: 10,
        search: '',
    });

    React.useEffect(() => {
        fetchEmployeesList(filters, dispatch);
    }, [dispatch, filters]);

    const [paging] = usePagination(total, filters, setFilters);

    const handleDeleteOpen = (employee) => {
        setSelectedEmployee(employee);
        setDeleteDialogOpen(true);
    };

    const handleDeleteClose = () => {
        setDeleteDialogOpen(false);
        setSelectedEmployee(null);
    };

    const confirmDelete = () => {
        deleteEmployeeApiCall(selectedEmployee.id, refetchEmployeesList);
    };

    const handleEdit = (employee) => {
        setSelectedEmployee(employee);
        setFormDialogOpen(true);
    };

    const refetchEmployeesList = () => {
        fetchEmployeesList(filters, dispatch);
        setDeleteDialogOpen(false);
        setSelectedEmployee(null);
        setFormDialogOpen(false);
        setChangePasswordDialogOpen(false);
    }

    const handleAddEmployee = () => {
        setSelectedEmployee(null);
        setFormDialogOpen(true);
    }

    const handleChangePassword = (employee) => {
        setSelectedEmployee(employee);
        setChangePasswordDialogOpen(true);
    };

    return (
        <div style={{ padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <h1 className="text-3xl font-bold text-gray-800">Employees</h1>
                <Button variant="contained" color="primary" onClick={handleAddEmployee}>
                    Add Employee
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

                {/* <Grid item xs={12} sm={4} md={3}>
                    <TextField
                        fullWidth
                        select
                        label="Status"
                        variant="outlined"
                        value={filters.status || ''}
                        onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value, page: 0 }))}
                    >
                        {StatusOption.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid> */}

                {/* <Grid item xs={12} sm={4} md={3}>
                    <TextField
                        fullWidth
                        select
                        label="Type"
                        variant="outlined"
                        value={filters.type || ''}
                        onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value, page: 0 }))}
                    >
                        {TypeOption.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid> */}

                {/* <Grid item xs={12} sm={4} md={3}>
                    <TextField
                        fullWidth
                        select
                        label="Subscription"
                        variant="outlined"
                        value={filters.subscription || ''}
                        onChange={(e) => setFilters(prev => ({ ...prev, subscription: e.target.value, page: 0 }))}
                    >
                        {SubscriptionOption.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid> */}

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
                                        <TableCell>Employee ID</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Phone Number</TableCell>
                                        <TableCell>Designation</TableCell>
                                        <TableCell>DOB</TableCell>
                                        <TableCell>Date Of Joing</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell align="center">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((employee) => (
                                        <TableRow key={employee.id}>
                                            <TableCell>{employee.employeeId}</TableCell>
                                            <TableCell>{employee.firstName} {employee.lastName}</TableCell>
                                            <TableCell>{employee.email}</TableCell>
                                            <TableCell>{employee.phoneNumber}</TableCell>
                                            <TableCell>{employee.designation}</TableCell>
                                            <TableCell>{employee.dateOfBirth ? new Date(employee.dateOfBirth).toLocaleDateString() : ""}</TableCell>
                                            <TableCell>{employee.joiningDate ? new Date(employee.joiningDate).toLocaleDateString() : ""}</TableCell>
                                            <TableCell>{employee.status}</TableCell>
                                            <TableCell align="center">
                                                <IconButton color="primary" onClick={() => handleEdit(employee)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton color="error" onClick={() => handleDeleteOpen(employee)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                                <IconButton color="info" title='Change Password' onClick={() => handleChangePassword(employee)}>
                                                    <PasswordIcon />
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
                <DialogTitle>Delete Employee</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete <strong>{selectedEmployee?.name}</strong>?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose}>Cancel</Button>
                    <Button onClick={confirmDelete} color="error" variant="contained">Delete</Button>
                </DialogActions>
            </Dialog>

            {formDialogOpen && <EditEmployeeModal
                open={formDialogOpen}
                onClose={() => setFormDialogOpen(false)}
                employee={selectedEmployee}
                refetch={refetchEmployeesList}
            />}

            {changePasswordDialogOpen && <ChangePasswordModal
                open={changePasswordDialogOpen}
                onClose={() => {
                    setChangePasswordDialogOpen(false);
                    setSelectedEmployee(null);
                }}
                employee={selectedEmployee}
                refetch={refetchEmployeesList}
            />}

        </div>
    );
};

export default Employees;
