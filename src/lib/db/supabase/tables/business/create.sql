CREATE EXTENSION IF NOT EXISTS moddatetime
SCHEMA "extensions";

CREATE TABLE business (
  id TEXT PRIMARY KEY,
  ownerId TEXT NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  organizationId TEXT NOT NULL,
  data JSONB NOT NULL,
  meta JSONB NOT NULL,
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
