CREATE OR REPLACE PROCEDURE CreateUser(
    inUserName varchar(256),
    inEmail varchar(256),
    inPassword varchar(256),
    inPhone varchar(45),
    inProfileImage MEDIUMTEXT,
    inCurrency int(11)
)
BEGIN

    DECLARE _userId int(11);
    DECLARE _userGUID varchar(36);
    DECLARE _emailExists INT DEFAULT 0;
    DECLARE _userNameExists INT DEFAULT 0;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    -- Check if username already exists
    SELECT COUNT(*) INTO _userNameExists FROM User WHERE userName = inUserName;

    
    IF _userNameExists > 0 THEN
        SIGNAL SQLSTATE '12323'
        SET MESSAGE_TEXT = inUserName;
    END IF;


    -- Check if email already exists
    SELECT COUNT(*) INTO _emailExists FROM User WHERE email = inEmail;

    IF _emailExists > 0 THEN
        SIGNAL SQLSTATE '43923'
        SET MESSAGE_TEXT = 'EMAIL_DUPLICATE';
    END IF;
    
    START TRANSACTION;
        Select 1 into _emailExists;

        INSERT INTO User (GUID, email, userName, password, phone, profileImage, currency, createdAt, updatedAt)
        VALUES (uuid(), inEmail, inUserName, inPassword, inPhone, inProfileImage, inCurrency, utc_timestamp(), utc_timestamp());

        SELECT LAST_INSERT_ID() INTO _userId;

        SELECT GUID, _userId, _userNameExists from User where id = _userId;

    COMMIT;
END