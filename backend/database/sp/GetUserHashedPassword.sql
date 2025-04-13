CREATE OR REPLACE PROCEDURE GetUserHashedPassword(
    inUserNameOrEmail varchar(256)
)
BEGIN

    DECLARE _userId INT DEFAULT NULL;
    DECLARE _emailExists INT DEFAULT 0;
    DECLARE _userNameExists INT DEFAULT 0;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    SELECT id INTO _userId FROM User WHERE userName = inUserNameOrEmail;

    SELECT id INTO _userId FROM User WHERE email = inUserNameOrEmail;

    
    IF _userId = NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'USER_NOT_EXISTS';
    END IF;

    SELECT password from User where id = _userId;
END