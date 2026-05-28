/*
  Warnings:

  - You are about to drop the column `role` on the `TeaDrinker` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TeaDrinker" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hexColor" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_TeaDrinker" ("createdAt", "email", "hexColor", "id", "name", "note") SELECT "createdAt", "email", "hexColor", "id", "name", "note" FROM "TeaDrinker";
DROP TABLE "TeaDrinker";
ALTER TABLE "new_TeaDrinker" RENAME TO "TeaDrinker";
CREATE UNIQUE INDEX "TeaDrinker_email_key" ON "TeaDrinker"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
