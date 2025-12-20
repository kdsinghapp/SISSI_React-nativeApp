import { base_url } from './index';
import ScreenNameEnum from '../routes/screenName.enum';
import { loginSuccess } from '../redux/feature/authSlice';
import { errorToast, successToast } from '../utils/customToast';
import axios from 'axios';



// const GetApi = (param: any, setLoading: (loading: boolean) => void) => {
//     console.log("param", param);
//     try {
//         setLoading(true);
//         const myHeaders = new Headers();

//         myHeaders.append("Accept", "application/json");
//         myHeaders.append("Authorization", `Bearer ${param.token}`);

//         const requestOptions = {
//             method: param?.method || "POST",
//             headers: myHeaders,
//         };

//         const respons = fetch(`${base_url + param?.url}`, requestOptions)
//             .then((response) => response.text())
//             .then((res) => {
//                 const response = JSON.parse(res);
//                 console.log("---- ----ddv response", response);
//                 if (response.status == "1") {
//                     setLoading(false);
//                     return response;
//                 } else {
//                     setLoading(false);
//                     // errorToast(
//                     //     response.error,
//                     // );
//                     return response;
//                 }
//             })
//             .catch((error) => console.error(error));
//         return respons;
//     } catch (error) {
//         setLoading(false);
//         errorToast("Network error");
//     }
// };

const GetApi = async (param: any, setLoading: (loading: boolean) => void) => {
  console.log("API PARAM:", param);

  try {
    setLoading(true);

    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${param.token}`);

    const requestOptions: any = {
      method: param.method || "POST",
      headers: myHeaders,
    };

    // ✅ ADD BODY ONLY IF EXISTS
    if (param.data && Object.keys(param.data).length > 0) {
      requestOptions.body = JSON.stringify(param.data);
    }

    const response = await fetch(base_url + param.url, requestOptions);
    const resText = await response.text();
    const result = JSON.parse(resText);

    console.log("API RESPONSE:", result);

    setLoading(false);
    return result;

  } catch (error) {
    console.log("API ERROR:", error);
    setLoading(false);
    errorToast("Network error");
    return null;
  }
};

export const PostApi = async (param, setLoading) => {
  try {
    setLoading && setLoading(true);

    const headers = {
      Accept: "application/json",
      ...(param?.isFormData
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" }),
      ...(param?.token && { Authorization: `Bearer ${param.token}` }),
    };

    const response = await axios.post(
      base_url + param.url,
      param.data,
      { headers }
    );

    return response.data;
  } catch (error) {
    console.log("POST API ERROR 👉", error?.response || error);

    return {
      status: false,
      message:
        error?.response?.data?.message ||
        "Something went wrong. Please try again.",
    };
  } finally {
    setLoading && setLoading(false);
  }
};


const LoginCustomer = (
    param: any,
    setLoading: (loading: boolean) => void,
    dispatch: any) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formdata = new FormData();
        formdata.append("email", param?.email);
        formdata.append("password", param?.password);
        formdata.append("type", param?.roleType);
        formdata.append("device_id", param?.token);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };
        console.log(param)
        const respons = fetch(`${base_url}auth/login`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res)
                if (response.status == '1') {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    console.log(response, 'response=========')
                    dispatch(loginSuccess({ userData: response?.data?.user_data, token: response?.data?.token, }));
                    if (param?.roleType == "User") {

                        param?.navigation.replace(ScreenNameEnum.TabNavigator);
                    } else {
                        param?.navigation.navigate(ScreenNameEnum.Tab2Navigator);
                    }


                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};
const SinupCustomer = (params: any,
    setLoading: (loading: boolean) => void,) => {
    try {
        console.log('first')
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formdata = new FormData();
        formdata.append("user_name", params?.full_name ?? "");
        formdata.append("mobile_number", params?.mobile ?? "");
        formdata.append("password", params?.password ?? "");
        formdata.append("email", params?.email ?? "");
        formdata.append("dob", params?.year_of_birth ?? "");
        formdata.append("address", params?.address ?? "");
        formdata.append("education", params?.education_level ?? "");
        formdata.append("degree", params?.degree ?? "");
        formdata.append("school_name", params?.school_name ?? "");
        formdata.append("year_of_graduation", params?.year_of_graduation ?? "");
        formdata.append("unit_name", params?.unit_name ?? "");
        formdata.append("unit_manager_name", params?.unit_manager_name ?? "");


        formdata.append("type", params?.roleType);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };
        console.log(formdata)
        const respons = fetch(`${base_url}auth/signup`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res)
                if (response.status == '1') {
                    successToast(
                        response?.message
                    );
                    console.log(response)
                    params.navigation.navigate(ScreenNameEnum.Login);
                    return response
                } else {
                    errorToast(
                        response.message,
                    );
                    console.log(response)

                    return response
                }
            })
            .catch((error) => console.error(error));
        return respons
    } catch (error) {
        errorToast(
            'Network error',
        );
    }
};


const restEmailOtp = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formdata = new FormData();
        formdata.append("identity", param?.email || param?.mobile);
        // formdata.append("type", param?.type);
        console.log(formdata)
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };
        const respons = fetch(`${base_url}auth/password-reset`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res)
                if (response.status == '1') {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    param.navigation.navigate(ScreenNameEnum.OtpScreen, {
                        id: response?.result?.id,
                        email: param?.email,
                        type: param?.type
                    })
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    console.log(response)
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};
const otp_Verify = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formdata = new FormData();
        formdata.append("identity", param?.email);
        formdata.append("otp", param?.otp);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };
        const respons = fetch(`${base_url}auth/verify-otp`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res)
                if (response.status == '1') {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    console.log(response)
                    param.navigation.navigate(ScreenNameEnum.CreateNewPassword, {
                        userId: response?.data?.user_id
                    })
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};
const updatePassword = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formdata = new FormData();
        formdata.append("user_id", param?.userId);
        formdata.append("password", param?.password);
        formdata.append("c_password", param?.confirm_password);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };
        const respons = fetch(`${base_url}auth/create-new-password`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res)
                if (response.status == '1') {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    console.log(response)
                    param.navigation.navigate(ScreenNameEnum.Login)
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response?.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};
const AddPatientApi = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    console.log("param", param)
    try {

        setLoading(true)
        const myHeaders = new Headers();

        myHeaders.append("Accept", "application/json");
        const formData = new FormData();
        formData.append("user_id", param?.id ?? '');
        formData.append("first_name", param?.name ?? '');
        formData.append("last_name", param?.surname ?? '');
        formData.append("nir", param?.nir ?? '');
        formData.append("insurance_address_lat", param?.insurance_address_lat ?? '');
        formData.append("insurance_address_lon", param?.insurance_address_lon ?? '');
        formData.append("lat", param?.lat ?? '');
        formData.append("lon", param?.lon ?? '');
        formData.append("organization_code", param?.call ?? "");
        formData.append("date", param?.date ?? ""); //insurance_address_lat
        formData.append("address", param?.address);
        formData.append("mobile_number", param?.phone);
        formData.append("insurance", param?.mutuelle);
        formData.append("amc_number", param?.amcNumber);
        formData.append("insurance_address", param?.mutuelleAddress);
        formData.append("notes", param?.notes);
        // formData.append("", param?.);
        // formData.append("", param?.);

        const requestOptions = {

            method: "POST",
            headers: myHeaders,
            body: formData,
        };
        console.log("formData", formData)
        const respons = fetch(`${base_url}/add_patient`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response", response)
                if (response.status == '1') {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    // param.navigation.navigate(ScreenNameEnum.LoginScreen)
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.error,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};

const BookShiftByUserApi = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    console.log("param", param)
    try {

        setLoading(true)
        const myHeaders = new Headers();

        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);
        const formData = new FormData();
        formData.append("shift_id", param?.shift_id ?? '');
        // formData.append("status", param?.status ?? '');

        // formData.append("", param?.);
        // formData.append("", param?.);

        const requestOptions = {

            method: "POST",
            headers: myHeaders,
            body: formData,
        };
        console.log("formData", formData)
        const respons = fetch(`${base_url}shift/ShiftRequest`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response", response)
                if (response.status == '1') {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    // param.navigation.navigate(ScreenNameEnum.LoginScreen)
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};

const add_shift_API = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    console.log("param", param)
    try {

        setLoading(true)
        const myHeaders = new Headers();

        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param?.token}`);

        const formData = new FormData();
        formData.append("shift_date", param?.date ?? '');
        formData.append("time_start", param?.startTime ?? '');
        formData.append("time_end", param?.endTime ?? '');
        formData.append("location", param?.location ?? '');
        formData.append("unit", param?.unit ?? "");
        formData.append("description", param?.description ?? "");
        // formData.append("image", param?.address);

        const requestOptions = {

            method: "POST",
            headers: myHeaders,
            body: formData,
        };
        console.log("formData", myHeaders)
        const respons = fetch(`${base_url}shift/add_shift`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response", response)
                if (response.status == '1') {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    // param.navigation.navigate(ScreenNameEnum.LoginScreen)
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};

const update_shift_API = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    console.log("param", param)
    try {

        setLoading(true)
        const myHeaders = new Headers();

        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param?.token}`);

        const formData = new FormData();
        formData.append("shift_date", param?.date ?? '');
        formData.append("time_start", param?.startTime ?? '');
        formData.append("time_end", param?.endTime ?? '');
        formData.append("location", param?.location ?? '');
        formData.append("unit", param?.unit ?? "");
        formData.append("description", param?.description ?? "");
        formData.append("shift_id", param?.shift_id ?? "");
        // formData.append("image", param?.address);

        const requestOptions = {

            method: "POST",
            headers: myHeaders,
            body: formData,
        };
        console.log("formData", myHeaders)
        const respons = fetch(`${base_url}shift/update_shift`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response", response)
                if (response.status == '1') {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    // param.navigation.navigate(ScreenNameEnum.LoginScreen)
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};

const deleteShiftApi = (
    param: any,
    setLoading: (loading: boolean) => void
) => {
    console.log("param", param);
    try {
        setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);

        const formdata = new FormData();
        formdata.append("shift_id", param?.shift_id);
        // formdata.append("child_id", param?.child_id ?? "1");
        // formdata.append("milestone_id", param?.milestone_id);
        // formdata.append("notes", param?.notes ?? 'test');
        // formdata.append("milestone_date", param?.milestone_date);

        console.log(formdata, "this is formdaata");
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };
        console.log("formData", formdata);
        const respons = fetch(`${base_url}shift/delete_shift`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response", response);
                if (response.status == "1") {
                    setLoading(false);
                    successToast(response?.message);
                    // param.navigation.goBack();
                    return response;
                } else {
                    setLoading(false);
                    errorToast(response.error);
                    return response;
                }
            })
            .catch((error) => console.error(error));
        return respons;
    } catch (error) {
        setLoading(false);
        errorToast("Network error");
    }
};

const AcceptRequest = (
    param: any,
    setLoading: (loading: boolean) => void
) => {
    console.log("param", param);
    try {
        setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);

        const formdata = new FormData();
        formdata.append("request_id", param?.request_id);
        // formdata.append("child_id", param?.child_id ?? "1");
        // formdata.append("milestone_id", param?.milestone_id);
        // formdata.append("notes", param?.notes ?? 'test');
        // formdata.append("milestone_date", param?.milestone_date);

        console.log(formdata, "this is formdaata");
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };
        console.log("formData", formdata);
        const respons = fetch(`${base_url}shift/approveShiftRequest`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response", response);
                if (response.status == "1") {
                    setLoading(false);
                    successToast(response?.message);
                    // param.navigation.goBack();
                    return response;
                } else {
                    setLoading(false);
                    errorToast(response.message);
                    return response;
                }
            })
            .catch((error) => console.error(error));
        return respons;
    } catch (error) {
        setLoading(false);
        errorToast("Network error");
    }
};


const onFavoriteShift = (
    param: any,
    setLoading: (loading: boolean) => void
) => {
    console.log("param", param);
    try {
        // setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);

        const formdata = new FormData();
        formdata.append("shift_id", param?.shift_id);
        // formdata.append("child_id", param?.child_id ?? "1");
        // formdata.append("milestone_id", param?.milestone_id);
        // formdata.append("notes", param?.notes ?? 'test');
        // formdata.append("milestone_date", param?.milestone_date);

        console.log(formdata, "this is formdaata");
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };
        console.log("formData", formdata);
        const respons = fetch(`${base_url}shift/FavoriteShift`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response", response);
                if (response.status == "1") {
                    setLoading(false);
                    successToast(response?.message);
                    // param.navigation.goBack();
                    return response;
                } else {
                    setLoading(false);
                    errorToast(response.message);
                    return response;
                }
            })
            .catch((error) => console.error(error));
        return respons;
    } catch (error) {
        setLoading(false);
        errorToast("Network error");
    }
};


const CompleteBooking = (
    param: any,
    setLoading: (loading: boolean) => void
) => {
    console.log("param", param);
    try {
        setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);

        const formdata = new FormData();
        formdata.append("shift_id", param?.shift_id);
        // formdata.append("child_id", param?.child_id ?? "1");
        // formdata.append("milestone_id", param?.milestone_id);
        // formdata.append("notes", param?.notes ?? 'test');
        // formdata.append("milestone_date", param?.milestone_date);

        console.log(formdata, "this is formdaata");
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };
        console.log("formData", formdata);
        const respons = fetch(`${base_url}shift/completeShift`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response", response);
                if (response.status == "1") {
                    setLoading(false);
                    successToast(response?.message);
                    // param.navigation.goBack();
                    return response;
                } else {
                    setLoading(false);
                    errorToast(response.message);
                    return response;
                }
            })
            .catch((error) => console.error(error));
        return respons;
    } catch (error) {
        setLoading(false);
        errorToast("Network error");
    }
};

const DeclineRequest = (
    param: any,
    setLoading: (loading: boolean) => void
) => {
    console.log("param", param);
    try {
        setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);

        const formdata = new FormData();
        formdata.append("request_id", param?.request_id);
        // formdata.append("child_id", param?.child_id ?? "1");
        // formdata.append("milestone_id", param?.milestone_id);
        // formdata.append("notes", param?.notes ?? 'test');
        // formdata.append("milestone_date", param?.milestone_date);

        console.log(formdata, "this is formdaata");
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };
        console.log("formData", formdata);
        const respons = fetch(`${base_url}shift/declineShiftRequest`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response", response);
                if (response.status == "1") {
                    setLoading(false);
                    successToast(response?.message);
                    // param.navigation.goBack();
                    return response;
                } else {
                    setLoading(false);
                    errorToast(response.message);
                    return response;
                }
            })
            .catch((error) => console.error(error));
        return respons;
    } catch (error) {
        setLoading(false);
        errorToast("Network error");
    }
};
const Policies_Api = (
    setLoading: (loading: boolean) => void,
) => {
    try {
        setLoading(true)

        const requestOptions = {
            method: "GET",
        };
        const respons = fetch(`${base_url}common/get_privacy_policy`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("----response", res)
                // return res
                if (response.status == '1') {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.error,
                    );
                    return response
                }
                setLoading(false)
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};


const AboutUs_Api = (
    setLoading: (loading: boolean) => void,
) => {
    try {
        setLoading(true)

        const requestOptions = {
            method: "GET",
        };
        const respons = fetch(`${base_url}common/get_about_us`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("----response", res)
                // return res
                if (response.status == '1') {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.error,
                    );
                    return response
                }
                setLoading(false)
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};
const EditProfile_Api = (
    param: any,
    setLoading: (loading: boolean) => void,
    navigation: any
) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formData = new FormData();
        if (param.images) {
            formData.append("image", {
                uri: param.images.path,          // Make sure param.image.path is a valid file URI
                type: 'image/jpeg',
                name: 'image.jpg'
            });
        }
        formData.append("first_name", param?.first_name);
        formData.append("last_name", param?.last_name);
        formData.append("user_id", param?.userId);
        formData.append("license_date", param?.date ?? null);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formData,
        };
        console.log(formData)
        const respons = fetch(`${base_url}/update_profile`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                if (response.status == '1') {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    // getSuccess({
                    //     userGetData: response.result,
                    // })
                    console.log(response)

                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};




const Support_Api = (
    supportHelp: any,
    setLoading: (loading: boolean) => void,
    id: any,
    navigation: any
) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formData = new FormData();
        formData.append("user_id", id);
        formData.append("message", supportHelp);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formData,
        };
        const respons = fetch(`${base_url}/create-support-inquiries`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                if (response.status == '1') {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    navigation.goBack();
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};
const ChangePass_Api = (
    data: any,
    id: any,
    setLoading: (loading: boolean) => void,
) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formData = new FormData();
        formData.append("old_password", data?.oldpassw);
        formData.append("password", data?.password);
        formData.append("confirm_password", data?.confirmPassword);
        formData.append("user_id", id);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formData,
        };
        const respons = fetch(`${base_url}change_password`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res)
                if (response?.status === "0") {
                    errorToast(
                        response.error,
                    );
                }
                if (response?.status == '1') {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    return response
                } else {
                    setLoading(false);
                    errorToast(
                        response.error,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};

const Get_Notification_Api = async (
    setLoading: (loading: boolean) => void,
    id: string
) => {
    setLoading(true); // Start loading
    try {
        const requestOptions = {
            method: "GET",
        };
        const response = await fetch(`${base_url}/get_post?user_id=${id}`, requestOptions);
        const resText = await response.text();
        const responseData = JSON.parse(resText);
        setLoading(false);
        // Check API response status
        if (responseData.status === "1") {
        } else {
            errorToast(responseData.error);
        }
        return responseData; // ✅ Return correct response object
    } catch (error) {
        errorToast("Network error");
        return null; // Return null in case of failure
    } finally {
        setLoading(false); // Stop loading regardless of success or failure
    }
};
export {
    AddPatientApi,
    BookShiftByUserApi,
    Get_Notification_Api, SinupCustomer,
    Support_Api, Policies_Api,
    ChangePass_Api, EditProfile_Api, updatePassword,
    restEmailOtp, LoginCustomer, otp_Verify,
    AboutUs_Api,
    add_shift_API,
    GetApi,
    deleteShiftApi,
    update_shift_API,
    AcceptRequest,
    DeclineRequest,
    CompleteBooking,
    onFavoriteShift
}  