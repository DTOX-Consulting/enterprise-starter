CREATE EXTENSION IF NOT EXISTS moddatetime
SCHEMA "extensions";

CREATE TABLE business (
  id VARCHAR(24) PRIMARY KEY,
  ownerId VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  organizationId VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  data JSONB NOT NULL,
  meta JSONB,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  _deleted BOOLEAN DEFAULT false NOT NULL,
  _modified TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Optional: You can also create an index on JSONB fields if necessary
CREATE INDEX idx_business_ownerId ON business (ownerId);
CREATE INDEX idx_business_organizationId ON business (organizationId);
CREATE INDEX idx_business_data ON business USING GIN (data);
CREATE INDEX idx_business_meta ON business USING GIN (meta);

-- Create trigger on the business table
CREATE TRIGGER update_business_modified_datetime
BEFORE UPDATE ON business
FOR EACH ROW
EXECUTE FUNCTION extensions.moddatetime('_modified');
