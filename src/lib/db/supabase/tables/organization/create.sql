CREATE EXTENSION IF NOT EXISTS moddatetime
SCHEMA "extensions";

CREATE TABLE organization (
  id TEXT PRIMARY KEY,
  ownerId TEXT NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
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
