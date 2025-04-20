CREATE OR REPLACE PROCEDURE  GetUserDetailsForSignin(
    inUserNameOrEmail varchar(256)
)
BEGIN

    DECLARE _userId INT DEFAULT NULL;
    DECLARE _emailExists INT DEFAULT 0;
    DECLARE _userNameExists INT DEFAULT 0;

    SELECT id INTO _userId FROM User WHERE userName = inUserNameOrEmail;

    SELECT id INTO _userId FROM User WHERE email = inUserNameOrEmail;

    
    IF _userId is NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'USER_NOT_EXISTS';
    END IF;

    SELECT password from User where id = _userId;
    SELECT id, GUID, email, userName from User where id = _userId;
END