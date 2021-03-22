create table PERSON
(
    ID   INT auto_increment,
    NAME VARCHAR not null,
    AGE  INT     not null,
    constraint PERSON_PK
        primary key (ID)
);

create table DEPARTMENT
(
    ID   INT auto_increment,
    NAME VARCHAR NOT NULL,
    constraint DEPARTMENT_PK
        primary key (ID)
);

create table EMPLOYMENT_TYPE
(
    ID   INT auto_increment,
    NAME VARCHAR NOT NULL,
    constraint ROLE_PK
        primary key (ID)
);

create table EMPLOYEE
(
    PERSON_ID          INT       not null,
    START_DATE         TIMESTAMP not null,
    END_DATE           TIMESTAMP,
    EMPLOYMENT_TYPE_ID INT       not null,
    DEPARTMENT_ID      INT       not null,
    constraint EMPLOYEE_PK
        primary key (PERSON_ID, DEPARTMENT_ID),
    constraint EMPLOYEE_PERSON_ID_FK
        foreign key (PERSON_ID) references PERSON (ID),
    constraint EMPLOYMENT_TYPE_ID_FK
        foreign key (EMPLOYMENT_TYPE_ID) references EMPLOYMENT_TYPE (ID)
);

