CREATE TABLE IF NOT EXISTS vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    owner VARCHAR(50) NOT NULL,
    make VARCHAR(50),
    model VARCHAR(50) NOT NULL,
    year INT,
    color VARCHAR(20),
    type ENUM('sports', 'suv', 'sedan', 'motorcycle', 'exotic', 'offroad'),
    licensePlate VARCHAR(10) UNIQUE NOT NULL,
    topSpeed FLOAT,
    acceleration FLOAT,
    handling FLOAT,
    braking FLOAT,
    customizations JSON,
    imageUrl VARCHAR(255)
);