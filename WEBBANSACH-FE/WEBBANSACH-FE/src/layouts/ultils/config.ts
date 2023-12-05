import {useEffect, useState} from "react";

export const baseUrl = "http://localhost:8080";

export default function usePercentDiscount(giaNiemYet: number , giaBan: number) {

        // Tính toán phần trăm giảm giá
        let percentDiscount = ((giaNiemYet - giaBan) / giaNiemYet) * 100;

        // Nếu phần trăm giảm giá không phải là số hoặc không xác định, gán bằng 0
        if (isNaN(percentDiscount) || percentDiscount == undefined) {
            percentDiscount = 0;
        } else {
            // Làm tròn phần trăm giảm giá về số nguyên
            percentDiscount = parseInt(percentDiscount.toString());
        }

        // Trả về giá trị của percentDiscount
        return percentDiscount;

}