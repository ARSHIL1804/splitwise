# Splitwise Database Schema

```mermaid


erDiagram

    CURRENCY {
        int currency_id PK
        string currency_name
        string currency_symbol
    }

    USERS {
        int user_id PK
        string email
        string password
        string first_name
        string last_name
        string profile_picture_url
        string phone_number
        int currency FK
        datetime created_at
        datetime updated_at
        datetime last_login_at
    }

    FRIENDSHIPS {
        int friendship_id PK
        int user_id_1 FK
        int user_id_2 FK
        string status
        datetime created_at
        datetime updated_at
    }

    GROUPS {
        int group_id PK
        string name
        string description
        string group_picture_url
        int created_by FK
        int currency_id FK
        datetime created_at
        datetime updated_at
    }

    GROUP_MEMBERS {
        int membership_id PK
        int group_id FK
        int user_id FK
        string role
        datetime joined_at
    }

    EXPENSE_CATEGORIES {
        int category_id PK
        string name
        string icon
        string color
        bool is_default
        int created_by FK
        datetime created_at
    }

    EXPENSES {
        int expense_id PK
        string title
        string description
        decimal amount
        string currency
        datetime date_incurred
        int created_by FK
        int group_id FK
        int category_id FK
        bool is_recurring
        string recurring_interval
        datetime recurring_end_date
        string split_type
        datetime created_at
        datetime updated_at
        bool is_deleted
    }

    EXPENSE_PARTICIPANTS {
        int participant_id PK
        int expense_id FK
        int user_id FK
        decimal paid_amount
        decimal owed_amount
        decimal owed_percentage
        int owed_shares
        bool settled
        datetime created_at
        datetime updated_at
    }

    EXPENSE_ATTACHMENTS {
        int attachment_id PK
        int expense_id FK
        string file_name
        string file_url
        string file_type
        int file_size
        int uploaded_by FK
        datetime uploaded_at
    }

    PAYMENTS {
        int payment_id PK
        int payer_id FK
        int payee_id FK
        decimal amount
        string currency
        string notes
        string payment_method
        datetime payment_date
        datetime created_at
        int group_id FK
    }

    BALANCES {
        int balance_id PK
        int user_id_1 FK
        int user_id_2 FK
        decimal amount
        string currency
        datetime last_updated
    }

    GROUP_BALANCES {
        int id PK
        int group_id FK
        int user_id FK
        decimal balance
        string currency
        datetime last_updated
    }

    ACTIVITY_LOG {
        int activity_id PK
        int user_id FK
        string activity_type
        int related_entity_id
        string related_entity_type
        string description
        datetime created_at
        bool is_read
    }

    EXPENSE_COMMENTS {
        int comment_id PK
        int expense_id FK
        int user_id FK
        string comment
        datetime created_at
        datetime updated_at
        bool is_deleted
    }

    USER_DEVICES {
        int device_id PK
        int user_id FK
        string device_token
        string device_type
        datetime created_at
        datetime last_used_at
        bool is_active
    }

    USERS ||--o{ FRIENDSHIPS : "has"
    USERS ||--o{ USER_NOTIFICATION_SETTINGS : "has"
    USERS ||--o{ GROUPS : "creates"
    USERS ||--o{ GROUP_MEMBERS : "belongs to"
    USERS ||--o{ EXPENSE_CATEGORIES : "creates"
    USERS ||--o{ EXPENSES : "creates"
    USERS ||--o{ EXPENSE_PARTICIPANTS : "participates in"
    USERS ||--o{ EXPENSE_ATTACHMENTS : "uploads"
    USERS ||--o{ PAYMENTS : "makes as payer"
    USERS ||--o{ PAYMENTS : "receives as payee"
    USERS ||--o{ BALANCES : "has with other users"
    USERS ||--o{ GROUP_BALANCES : "has in groups"
    USERS ||--o{ ACTIVITY_LOG : "generates"
    USERS ||--o{ EXPENSE_COMMENTS : "writes"
    USERS ||--o{ USER_DEVICES : "registers"

    GROUPS ||--o{ GROUP_MEMBERS : "contains"
    GROUPS ||--o{ EXPENSES : "contains"
    GROUPS ||--o{ GROUP_BALANCES : "has for members"
    GROUPS ||--o{ PAYMENTS : "associated with"

    EXPENSES ||--o{ EXPENSE_PARTICIPANTS : "has"
    EXPENSES ||--o{ EXPENSE_ATTACHMENTS : "has"
    EXPENSES ||--o{ EXPENSE_COMMENTS : "has"
    
    EXPENSE_CATEGORIES ||--o{ EXPENSES : "categorizes"