CREATE EXTENSION IF NOT EXISTS moddatetime
SCHEMA "extensions";

CREATE TABLE history (
  id VARCHAR(24) PRIMARY KEY,
  ownerId VARCHAR(255) NOT NULL,
  businessId VARCHAR(255) NOT NULL,
  organizationId VARCHAR(255) NOT NULL,
  key VARCHAR(255) NOT NULL,
  description TEXT,
  value JSONB NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  _deleted BOOLEAN DEFAULT false NOT NULL,
  _modified TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Optional: You can also create indexes if necessary
CREATE INDEX idx_history_ownerId ON history (ownerId);
CREATE INDEX idx_history_businessId ON history (businessId);
CREATE INDEX idx_history_organizationId ON history (organizationId);

-- Create trigger on the history table
CREATE TRIGGER update_history_modified_datetime
BEFORE UPDATE ON history
FOR EACH ROW
EXECUTE FUNCTION extensions.moddatetime('_modified');
