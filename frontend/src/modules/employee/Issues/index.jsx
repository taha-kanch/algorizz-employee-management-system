import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Select,
    MenuItem,
    Box,
    Chip,
    InputLabel,
    FormControl,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { fetchIssuesList, updateIssueApiCall } from "../action";

const statusOptions = ["TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"];
const priorityColors = {
    LOW: "default",
    MEDIUM: "info",
    HIGH: "warning",
    URGENT: "error"
};

const Issues = () => {

    const { data, loading } = useSelector(state => state.issues_employee);
    const dispatch = useDispatch();

    const [issues, setIssues] = React.useState([]);
    const [groupedIssues, setGroupedIssues] = React.useState({});

    React.useEffect(() => {
        fetchIssuesList(dispatch);
    }, [dispatch]);

    React.useEffect(() => {
        if (data?.length > 0) {
            setIssues(data);
        }
    }, [data]);

    React.useEffect(() => {
        if (issues.length) {
            const groupedIssues = {
                TODO: [],
                IN_PROGRESS: [],
                IN_REVIEW: [],
                DONE: [],
            };

            issues.forEach((issue) => {
                if (groupedIssues[issue.status]) {
                    groupedIssues[issue.status].push(issue);
                }
            });

            setGroupedIssues(groupedIssues);
        }
    }, [issues]);

    const handleStatusChange = (id, newStatus) => {
        updateIssueApiCall({ status: newStatus }, id, () => {
            const updated = issues.map((issue) =>
                issue.id === id ? { ...issue, status: newStatus } : issue
            );
            setIssues(updated);
        });
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <Loader />
            </Box>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
            {statusOptions.map((status) => (
                <div key={status}>
                    <Typography variant="h6" gutterBottom>
                        {status.replace("_", " ")}
                    </Typography>

                    {groupedIssues[status]?.map((issue) => (
                        <Card key={issue.id} variant="outlined" className="mb-4 shadow-md">
                            <CardContent>
                                <Box className="flex justify-between items-center mb-2">
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        {issue.title}
                                    </Typography>
                                    <Chip label={issue.priority} color={priorityColors[issue.priority]} size="small" />
                                </Box>

                                <Typography variant="body2" className="mb-2 text-gray-600">
                                    {issue.description}
                                </Typography>

                                <Typography variant="caption" color="text.secondary">
                                    Due:{" "}
                                    {issue.dueDate
                                        ? new Date(issue.dueDate).toLocaleDateString()
                                        : "N/A"}
                                </Typography>

                                <Box className="mt-3">
                                    <FormControl fullWidth size="small">
                                        <InputLabel>Status</InputLabel>
                                        <Select
                                            value={issue.status}
                                            label="Status"
                                            onChange={(e) =>
                                                handleStatusChange(issue.id, e.target.value)
                                            }
                                        >
                                            {statusOptions.map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    {option.replace("_", " ")}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>

                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    className="block mt-2"
                                >
                                    Assigned by:{" "}
                                    <strong>
                                        {issue.createdBy.firstName} {issue.createdBy.lastName}
                                    </strong>
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Issues;
