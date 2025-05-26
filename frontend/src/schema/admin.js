import * as Yup from "yup";

export const employeeSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    dateOfBirth: Yup.string().required("DOB is required"),
    address: Yup.string(),
    designation: Yup.string(),
    salary: Yup.number(),
    joiningDate: Yup.string(),
});

export const issueSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    priority: Yup.string().oneOf(["LOW", "MEDIUM", "HIGH", "URGENT"]).required(),
    status: Yup.string().oneOf(["TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"]).required(),
    assignedToId: Yup.number().required("Assignee is required"),
    dueDate: Yup.string(),
});

export const changePasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("New Password is required"),
    confirmNewPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Please confirm your new password"),
});
