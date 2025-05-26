import { buildQueryString } from "../../../helpers/commonFunction";
import Utils from "../../../utils";
import { failedAdminEmployeesReducer, loaderListener, successAdminEmployeesReducer } from "../slice/employeeSlice";
import { failedAdminIssuesReducer, loaderListener as issuesLoaderListener, successAdminIssuesReducer } from "../slice/issueSlice";

// Employee

export const fetchEmployeesList = (values, dispatch) => {

    const {
        page,
        limit,
        search,
    } = values;

    let dataToSend = {
        page: page + 1,
        limit,
        search,
    }

    const keysToDelete = ['page', 'limit', 'search'];

    // Iterate through the keys and delete them if they are falsy in dataToSend
    keysToDelete.forEach(key => {
        if (!dataToSend[key]) {
            delete dataToSend[key];
        }
    });

    dispatch(
        loaderListener({
            loading: true
        })
    );

    const result = buildQueryString(dataToSend);
    Utils.api.getApiCall(
        `/users`,
        Object.keys(dataToSend).length == 0 ? '' : `?${result}`,
        (respData) => {
            const { data } = respData;
            dispatch(
                loaderListener({
                    loading: false
                })
            );

            dispatch(
                successAdminEmployeesReducer({
                    data: data.data,
                    total: data.meta.total,
                    loading: false
                })
            );
        },
        (error) => {
            Utils.showAlert(2, error.message);
            dispatch(failedAdminEmployeesReducer(error.detail));
        }
    );

}

export const addEmployeeApiCall = (values, setSubmitting, refetch) => {
    const dataToSend = { ...values }
    Utils.api.postApiCall(
        `/users`,
        dataToSend,
        (respData) => {
            Utils.showAlert(1, "Employee Added")
            setSubmitting(false);
            refetch();
        },
        (error) => {
            console.log(error);
            const { data } = error
            Utils.showAlert(2, data.message || data?.non_field_errors[0])
            setSubmitting(false);
        }
    )
}

export const updateEmployeeApiCall = (values, employeeId, setSubmitting, refetch) => {
    const dataToSend = values
    Utils.api.patchApiCall(
        `/users/${employeeId}`,
        dataToSend,
        (respData) => {
            Utils.showAlert(1, "Employee Updated")
            setSubmitting(false);
            refetch();
        },
        (error) => {
            console.log(error);
            const { data } = error
            Utils.showAlert(2, data.message || data?.non_field_errors[0])
            setSubmitting(false);
        }
    )
}

export const deleteEmployeeApiCall = (employeeId, refetch) => {
    Utils.api.deleteApiCall(
        `/users/${employeeId}`,
        '',
        () => {
            Utils.showAlert(1, "Employee Deleted")
            refetch();
        },
        (error) => {
            console.log(error);
            const { data } = error
            Utils.showAlert(2, data.message || data?.non_field_errors[0])
        }
    )
}

export const changePasswordApiCall = (values, employeeId, setSubmitting, refetch) => {
    const dataToSend = values
    Utils.api.patchApiCall(
        `/users/${employeeId}/password`,
        dataToSend,
        (respData) => {
            Utils.showAlert(1, "Employee Password Changed")
            setSubmitting(false);
            refetch();
        },
        (error) => {
            console.log(error);
            const { data } = error
            Utils.showAlert(2, data.message || data?.non_field_errors[0])
            setSubmitting(false);
        }
    )
}


// Issues
export const fetchIssuesList = (values, dispatch) => {

    const {
        page,
        limit,
        search,
        status,
        priority,
        assignedToId
    } = values;

    let dataToSend = {
        page: page + 1,
        limit,
        search,
        priority,
        status,
        assignedToId
    }

    const keysToDelete = ['page', 'limit', 'search', 'status', 'priority', 'assignedToId'];

    // Iterate through the keys and delete them if they are falsy in dataToSend
    keysToDelete.forEach(key => {
        if (!dataToSend[key]) {
            delete dataToSend[key];
        }
    });

    dispatch(
        loaderListener({
            loading: true
        })
    );

    const result = buildQueryString(dataToSend);
    Utils.api.getApiCall(
        `/issues`,
        Object.keys(dataToSend).length == 0 ? '' : `?${result}`,
        (respData) => {
            const { data } = respData;
            dispatch(
                issuesLoaderListener({
                    loading: false
                })
            );

            dispatch(
                successAdminIssuesReducer({
                    data: data.data,
                    total: data.meta.total,
                    loading: false
                })
            );
        },
        (error) => {
            Utils.showAlert(2, error.message);
            dispatch(failedAdminIssuesReducer(error.detail));
        }
    );

}

export const addIssuesApiCall = (values, setSubmitting, refetch) => {
    const dataToSend = { ...values }
    Utils.api.postApiCall(
        `/issues`,
        dataToSend,
        (respData) => {
            Utils.showAlert(1, "Issue Added")
            setSubmitting(false);
            refetch();
        },
        (error) => {
            console.log(error);
            const { data } = error
            Utils.showAlert(2, data.message || data?.non_field_errors[0])
            setSubmitting(false);
        }
    )
}

export const updateIssueApiCall = (values, issueId, setSubmitting, refetch) => {
    const dataToSend = values
    Utils.api.patchApiCall(
        `/issues/${issueId}`,
        dataToSend,
        (respData) => {
            Utils.showAlert(1, "Issue Updated")
            setSubmitting(false);
            refetch();
        },
        (error) => {
            console.log(error);
            const { data } = error
            Utils.showAlert(2, data.message || data?.non_field_errors[0])
            setSubmitting(false);
        }
    )
}

export const deleteIssueApiCall = (issueId, refetch) => {
    Utils.api.deleteApiCall(
        `/issues/${issueId}`,
        '',
        () => {
            Utils.showAlert(1, "Issue Deleted")
            refetch();
        },
        (error) => {
            console.log(error);
            const { data } = error
            Utils.showAlert(2, data.message || data?.non_field_errors[0])
        }
    )
}