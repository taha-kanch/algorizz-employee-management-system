import { buildQueryString } from "../../../helpers/commonFunction";
import Utils from "../../../utils";
import { failedEmployeeProfileReducer, loaderListener, successEmployeeProfileReducer } from "../slice/profileSlice";
import { failedEmployeeIssuesReducer, loaderListener as issueLoaderListener, successEmployeeIssuesReducer } from "../slice/issuesSlice";

// Profile

export const fetchProfileDetail = (employeeId, dispatch) => {

    dispatch(
        loaderListener({
            loading: true
        })
    );
    
    Utils.api.getApiCall(
        `/users/${employeeId}`,
        '',
        (respData) => {
            const { data } = respData;
            dispatch(
                loaderListener({
                    loading: false
                })
            );

            dispatch(
                successEmployeeProfileReducer({
                    data: data.data,
                    loading: false
                })
            );
        },
        (error) => {
            Utils.showAlert(2, error.message);
            dispatch(failedEmployeeProfileReducer(error.detail));
        }
    );

}

// Issues

export const fetchIssuesList = (dispatch) => {

    dispatch(
        loaderListener({
            loading: true
        })
    );
    
    Utils.api.getApiCall(
        `/issues/assigned`,
        '',
        (respData) => {
            const { data } = respData;
            dispatch(
                issueLoaderListener({
                    loading: false
                })
            );

            dispatch(
                successEmployeeIssuesReducer({
                    data: data.data,
                    loading: false
                })
            );
        },
        (error) => {
            Utils.showAlert(2, error.message);
            dispatch(failedEmployeeIssuesReducer(error.detail));
        }
    );

}

export const updateIssueApiCall = (values, issueId, refetch) => {
    const dataToSend = values
    Utils.api.patchApiCall(
        `/issues/${issueId}`,
        dataToSend,
        (respData) => {
            refetch();
        },
        (error) => {
            console.log(error);
            const { data } = error
            Utils.showAlert(2, data.message || data?.non_field_errors[0])
        }
    )
}