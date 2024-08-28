-- Define the trigger function to update _modified field
CREATE OR REPLACE FUNCTION update_modified_datetime()
RETURNS TRIGGER AS $$
BEGIN
    NEW._modified = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
