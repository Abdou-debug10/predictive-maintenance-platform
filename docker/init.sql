-- Drop old table if it exists
DROP TABLE IF EXISTS predictions;

-- Create Predictions Table
CREATE TABLE predictions (

    id SERIAL PRIMARY KEY,

    machine_type INTEGER,

    air_temp DOUBLE PRECISION,

    process_temp DOUBLE PRECISION,

    rotational_speed DOUBLE PRECISION,

    torque DOUBLE PRECISION,

    tool_wear DOUBLE PRECISION,

    prediction VARCHAR(100) NOT NULL,

    confidence NUMERIC(5,2) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);