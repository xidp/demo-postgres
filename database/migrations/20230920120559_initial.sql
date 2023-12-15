-- Create "todo" table
CREATE TABLE "public"."todo" (
  "id" serial NOT NULL,
  "name" character varying NOT NULL,
  "description" character varying NOT NULL,
  "createdAt" character varying NOT NULL,
  "itsDone" boolean NOT NULL DEFAULT false,
  PRIMARY KEY ("id")
);