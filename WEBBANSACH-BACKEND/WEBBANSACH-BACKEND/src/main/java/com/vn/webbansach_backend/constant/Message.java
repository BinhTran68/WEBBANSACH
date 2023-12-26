package com.vn.webbansach_backend.constant;

/**
 * @author thangncph26123
 */

public enum Message {

    SUCCESS("Success"),
    ERROR_UNKNOWN("Error Unknown"),
    NOT_FOUND("Không tồn tại"),
    INVALID_TOKEN("Token không hợp lệ"),
    ROLE_USER_CHANGE("Quyền của người dùng bị thay đổi");

    private String message;

    Message(String message) {
        this.message = message;
    }



    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
