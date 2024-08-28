CREATE EXTENSION IF NOT EXISTS moddatetime
SCHEMA "extensions";

CREATE TABLE user_meta (
  id TEXT PRIMARY KEY,
  ownerId TEXT NOT NULL,
  lastVisited JSONB,
  editingState JSONB NOT NULL DEFAULT '{}',
  journeyState JSONB NOT NULL DEFAULT '{}',
  hasAcceptedTerms BOOLEAN NOT NULL DEFAULT false,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  _deleted BOOLEAN DEFAULT false NOT NULL,
  _modified TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Optional: You can also create indexes if necessary
CREATE INDEX idx_usermeta_ownerId ON usermeta (ownerId);
CREATE INDEX idx_usermeta_state ON usermeta USING GIN (state);

-- Create trigger on the user meta table
CREATE TRIGGER update_usermeta_modified_datetime
BEFORE UPDATE ON usermeta
FOR EACH ROW
EXECUTE FUNCTION extensions.moddatetime('_modified');
