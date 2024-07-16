CREATE EXTENSION IF NOT EXISTS moddatetime
SCHEMA "extensions";

CREATE TABLE notification (
  id VARCHAR(24) PRIMARY KEY,
  ownerId VARCHAR(255) NOT NULL,
  image VARCHAR(255),
  icon VARCHAR(255),
  content JSONB NOT NULL,
  readAt TIMESTAMP,
  removedAt TIMESTAMP,
  meta JSONB,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  _deleted BOOLEAN DEFAULT false NOT NULL,
  _modified TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Optional: You can also create an index on ownerId field if necessary
CREATE INDEX idx_notification_ownerId ON notification (ownerId);

-- Create trigger on the notification table
CREATE TRIGGER update_notification_modified_datetime
BEFORE UPDATE ON notification
FOR EACH ROW
EXECUTE FUNCTION extensions.moddatetime('_modified');
