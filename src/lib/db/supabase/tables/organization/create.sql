CREATE EXTENSION IF NOT EXISTS moddatetime
SCHEMA "extensions";

CREATE TABLE organization (
  id VARCHAR(24) PRIMARY KEY,
  ownerId VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  _deleted BOOLEAN DEFAULT false NOT NULL,
  _modified TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Optional: You can also create an index on ownerId field if necessary
CREATE INDEX idx_organization_ownerId ON organization (ownerId);

CREATE TRIGGER update_organization_modified_datetime
BEFORE UPDATE ON organization
FOR EACH ROW
EXECUTE FUNCTION extensions.moddatetime('_modified');
