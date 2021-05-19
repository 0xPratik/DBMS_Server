CREATE TABLE hostel(
    hostel_id INTEGER GENERATED ALWAYS AS IDENTITY,
    hosel_name VARCHAR(255) NOT NULL UNIQUE,
    no_of_rooms SMALLINT,
    no_of_students INTEGER,
    PRIMARY KEY(hostel_id)
);

CREATE TABLE admin_h(
    admin_id INTEGER GENERATED ALWAYS AS IDENTITY,
    fname VARCHAR(100) NOT NULL,
    lname VARCHAR(200) NOT NULL,
    mob_no VARCHAR(10) NOT NULL,
    hostel_id INTEGER REFERENCES hostel(hostel_id) ,
    PRIMARY KEY(admin_id)

);

CREATE TABLE room(
    hostel_id INTEGER REFERENCES hostel(hostel_id),
    room_id INTEGER GENERATED ALWAYS AS IDENTITY,
    PRIMARY KEY(room_id)
);

ALTER TABLE room DROP CONSTRAINT GENERATED ALWAYS AS IDENTITY

ALTER TABLE room
ADD COLUMN hostel_id INTEGER REFERENCES hostel(hostel_id);

UPDATE room SET room.room_id = 102 FROM hostel WHERE room.hostel_id = hostel.hostel_id;

INSERT INTO room(hostel_id,room_id) VALUES(5,501);

INSERT INTO room(hostel_id,room_id) VALUES(1,102);

DELETE FROM room WHERE room_id = 5;

CREATE TABLE student(
    student_id INTEGER GENERATED ALWAYS AS IDENTITY,
    fname VARCHAR(100) NOT NULL,
    lname VARCHAR(200) NOT NULL,
    mob_no VARCHAR(10) NOT NULL,
    dept VARCHAR(100) NOT NULL,
    year_of_study SMALLINT,
    hostel_id INTEGER REFERENCES hostel(hostel_id),
    room_id INTEGER REFERENCES room(room_id),
    password VARCHAR(100) NOT NULL,
    email VARCHAR(200) UNIQUE,
    PRIMARY KEY(student_id)
);

CREATE TABLE visitor(
    visitor_id INTEGER GENERATED ALWAYS AS IDENTITY,
    visitor_name VARCHAR(200),
    in_time TIMESTAMPTZ,
    out_time TIMESTAMPTZ,
    visit_date DATE NOT NULL DEFAULT CURRENT_DATE,
    PRIMARY KEY(Visitor_id),
    student_id INTEGER REFERENCES student(student_id)
);

CREATE TABLE furniture(
    hostel_id INTEGER REFERENCES hostel(hostel_id),
    room_id INTEGER REFERENCES room(room_id),
    furniture_id INTEGER GENERATED ALWAYS AS IDENTITY,
    furniture_type VARCHAR(200) NOT NULL,
    PRIMARY KEY(furniture_id)
);

CREATE TABLE queries(
    q_id INTEGER GENERATED ALWAYS AS IDENTITY,
    subject VARCHAR(400) NOT NULL,
    message VARCHAR(500) NOT NULL,
    email VARCHAR(200) REFERENCES student(email),
    hostel_id INTEGER REFERENCES hostel(hostel_id)
);

CREATE TABLE application(
    app_id INTEGER GENERATED ALWAYS AS IDENTITY,
    hostel_id INTEGER REFERENCES hostel(hostel_id),
    email VARCHAR(200) REFERENCES student(email),
    mob_no VARCHAR(10) REFERENCES student(mob_no),
    message VARCHAR(100),
    PRIMARY KEY(app_id)
);

ALTER TABLE student ADD COLUMN password VARCHAR(100) NOT NULL;
ALTER TABLE student DROP COLUMN password;

SHOW TIMEZOME;

-- INSERT INTO HOSTEL(Hostel_name) VALUES('Devta pg'); 
INSERT INTO room(Hostel_id) VALUES(4); 

ALTER TABLE student 


-- CREATE TABLE car(
--     id BIGSERIAL NOT NULL PRIMARY KEY,
--     make VARCHAR(100) NOT NULL,
--     model VARCHAR(100) NOT NULL,
--     price NUMERIC(19,2) NOT NULL
-- );


-- CREATE TABLE person (
--     id BIGSERIAL NOT NULL PRIMARY KEY,
--     first_name VARCHAR(50) NOT NULL,
--     last_name VARCHAR(50) NOT NULL,
--     gender VARCHAR(7) NOT NULL,
--     email VARCHAR(100),
--     date_of_birth DATE NOT NULL,
--     country_of_birth VARCHAR(50) NOT NULL,
--     car_id BIGINT REFERENCES car(id),
--     UNIQUE(car_id)
-- );

-- INSERT INTO person(first_name,last_name,gender,email,date_of_birth,country_of_birth) VALUES ('Fernanda','Beardon','Female','abc@gmaol.com','2000-04-02','Finland');
-- INSERT INTO person(first_name,last_name,gender,email,date_of_birth,country_of_birth) VALUES ('Rajesh','Saria','male','pssaria@gmail.com','1988-02-01','Nepal');

-- INSERT INTO car(make,model,price) VALUES('Land Rover','Gtx','1200000');
-- INSERT INTO car(make,model,price) VALUES('ISUZU','D-max','100000');
-- INSERT INTO car(make,model,price) VALUES('Eco-Sport','Top','2000000');
-- INSERT INTO car(make,model,price) VALUES('Eon','low','500000');

INSERT INTO hostel(hosel_name,no_of_rooms,no_of_students) VALUES('Bhaskaracharya Hostel',30,60);
INSERT INTO hostel(hosel_name,no_of_rooms,no_of_students) VALUES('Sir J.C. Bose Hostel',40,80);
INSERT INTO hostel(hosel_name,no_of_rooms,no_of_students) VALUES('Ramanujam Hostel',50,100);
INSERT INTO hostel(hosel_name,no_of_rooms,no_of_students) VALUES('Devta Pg',60,60);
INSERT INTO furniture(furniture_type) VALUES('Chair');
INSERT INTO furniture(furniture_type) VALUES('Table');
INSERT INTO furniture(furniture_type) VALUES('Bed');
INSERT INTO furniture(furniture_type) VALUES('Wardrobe');
INSERT INTO furniture(furniture_type) VALUES('Dustbin');
INSERT INTO furniture(furniture_type) VALUES('Bucket');

















