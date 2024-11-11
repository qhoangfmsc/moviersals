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
