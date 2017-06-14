export enum StatusCode {
    BEGIN_LOGIN,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    DECRYPT_FAILED,
    DECRYPT_SUCCESS,
    ENCRYPT_FAILED,
    ENCRYPT_SUCCESS,
    FILE_EXIST,
    FILE_NOT_EXIST,
    CHEKC_FILE_EXIST_FAILED,
    GET_FILE_CONTENT_SUCCESS,
    GET_FILE_CONTENT_FAILED,
    SAVE_FILE_SUCCESS,
    SAVE_FILE_FAILED,
    BEGIN_LOAD_LOCAL_INFO,
    LOAD_LOCAL_INFO_SUCCESS,
    BACKUP_INFO_BEGIN,
    BACKUP_INFO_SUCCESS,
    BACKUP_INFO_FAILED,
    RESTORE_INFO_BEGIN,
    RESTORE_INFO_SUCCESS,
    RESTORE_INFO_FAILED,
    SAVE_INTO_TO_LOCAL_BEGIN,
    SAVE_INTO_TO_LOCAL_FAILED,
    SAVE_INTO_TO_LOCAL_SUCCESS,
    DELETE_INFO_BEGIN,
    DELETE_INFO_FAILED,
    DELETE_INFO_SUCCESS,
    DELETE_INFO_FINISH,
    ADD_INFO_FINISH,
    UPLOAD_FILE_FAILED,
    UPLOAD_FILE_SUCCESS,
    DOWNLOAD_FILE_FAILED,
    DOWNLOAD_FILE_SUCCESS
};