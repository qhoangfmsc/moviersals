import { toast } from "react-toastify";

export function calculateTimeDifference(targetDate: string): {
    value: number;
    type: string;
} {
    const today = new Date().getTime();
    const givenDate = new Date(targetDate).getTime();

    // Tính số mili giây giữa hai ngày
    const diffInMilliseconds = today - givenDate;

    // Định nghĩa các mốc thời gian bằng mili giây
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30; // ước lượng 1 tháng là 30 ngày
    const year = day * 365;

    // Xác định loại thời gian và giá trị tương ứng
    let result: { value: number; type: string };

    if (diffInMilliseconds < hour) {
        result = { value: Math.floor(diffInMilliseconds / minute), type: "phút" };
    } else if (diffInMilliseconds < day) {
        result = { value: Math.floor(diffInMilliseconds / hour), type: "giờ" };
    } else if (diffInMilliseconds < week) {
        result = { value: Math.floor(diffInMilliseconds / day), type: "ngày" };
    } else if (diffInMilliseconds < month) {
        result = { value: Math.floor(diffInMilliseconds / week), type: "tuần" };
    } else if (diffInMilliseconds < year) {
        result = { value: Math.floor(diffInMilliseconds / month), type: "tháng" };
    } else {
        result = { value: Math.floor(diffInMilliseconds / year), type: "năm" };
    }

    return result;
}

export function preexecuteRequest(request: Object) {
    const keyValues = Object.entries(request);
    keyValues.forEach(([key, value]) => {
        if (Array.isArray(value)) {
            // CONVERT ARRAY OBJECT TO STRING ARRAY
            request[key] = JSON.stringify(value);
        } else if (typeof value === "string" && (value === "true" || value === "false")) {
            // CONVERT STRING TO BOOLEAN
            request[key] = value === "true";
        }
    });

    return request
}

export function convertRequestToFormData(request: Object) {
    const formData = new FormData();

    Object.entries(request).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            // Handle arrays (append each item with the same key)
            value.forEach((item) => {
                formData.append(key, item);
            });
        } else if (value instanceof File) {
            // Handle file inputs
            formData.append(key, value);
        } else if (typeof value === "object" && value !== null) {
            // Handle nested objects (convert to JSON string)
            formData.append(key, JSON.stringify(value));
        } else if (typeof value === "boolean") {
            // Convert boolean values to strings
            formData.append(key, value.toString());
        } else if (value !== null && value !== undefined) {
            // Handle strings, numbers, and other primitive types
            formData.append(key, value);
        }
    });

    return formData;
}

export function convertArrayToLowercaseArray(array: Array<string>) {
    const lowercaseDataArray = array.map(item => item.toLowerCase());
    return lowercaseDataArray;
}

export function isHostnameLocal() {
    const hostname = window.location.hostname;
    return (hostname === 'localhost')
        ? true
        : false
}

export function showResponseToast(response: Record<string, any>) {
    if (response.status == "error") {
        toast.error(response.content);
      } else {
        toast.success(response.content);
      }
}