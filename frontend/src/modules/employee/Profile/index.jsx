import React from 'react';
import {
    Box,
    Paper,
    Typography,
    Grid,
    Chip,
    Divider,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileDetail } from '../action';
import Loader from '../../../components/Loader';

const Profile = () => {


    const { data: authData } = useSelector(state => state.auth);
    const { data, loading } = useSelector(state => state.profile_employee);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (authData && authData.user) {
            fetchProfileDetail(authData.user.id, dispatch);
        }
    }, [authData]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <Loader />
            </Box>
        );
    }

    return (
        <>
            <Box>
                <Typography variant="h4" gutterBottom>
                    Profile Details
                </Typography>

                <Paper elevation={3} sx={{ p: 4 }}>
                    {/* Header: Name + Status */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 3,
                        }}
                    >
                        <Typography variant="h5" fontWeight="bold">
                            {data?.firstName} {data?.lastName}
                        </Typography>
                        <Chip
                            label={data?.status}
                            color={data?.status === 'ACTIVE' ? 'success' : 'error'}
                            sx={{ fontWeight: 'bold', px: 2 }}
                        />
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Profile Fields */}
                    <Grid container spacing={3}>
                        <ProfileField label="Employee ID" value={data?.employeeId} />
                        <ProfileField label="Email" value={data?.email} />
                        <ProfileField label="Phone Number" value={data?.phoneNumber} />
                        <ProfileField label="Date of Birth" value={new Date(data?.dateOfBirth).toLocaleDateString()} />
                        <ProfileField label="Designation" value={data?.designation} />
                        <ProfileField label="Joining Date" value={data?.joiningDate ? new Date(data?.joiningDate).toLocaleDateString() : ''} />
                        <ProfileField label="Current Salary" value={`₹ ${data?.salary ? data?.salary.toLocaleString() : 0}`} />
                        <ProfileField label="Address" value={data?.address} fullWidth />
                    </Grid>
                </Paper>
            </Box>
        </>

    );

}

const ProfileField = ({ label, value, fullWidth = false }) => (
    <Grid item xs={12} md={fullWidth ? 12 : 6}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {label}
        </Typography>
        <Typography variant="body1" fontWeight={500}>
            {value || "-"}
        </Typography>
    </Grid>
);

export default Profile;