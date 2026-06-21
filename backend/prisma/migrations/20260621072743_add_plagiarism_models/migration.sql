-- CreateTable
CREATE TABLE "plagiarism_matches" (
    "id" TEXT NOT NULL,
    "fileUploadId" TEXT NOT NULL,
    "file1Id" TEXT NOT NULL,
    "file2Id" TEXT NOT NULL,
    "similarityScore" DOUBLE PRECISION NOT NULL,
    "exactMatchPercentage" DOUBLE PRECISION NOT NULL,
    "paraphrasePercentage" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "plagiarism_matches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matched_sections" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "startCharFile1" INTEGER NOT NULL,
    "endCharFile1" INTEGER NOT NULL,
    "startCharFile2" INTEGER NOT NULL,
    "endCharFile2" INTEGER NOT NULL,
    "matchedText" TEXT NOT NULL,

    CONSTRAINT "matched_sections_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "plagiarism_matches" ADD CONSTRAINT "plagiarism_matches_fileUploadId_fkey" FOREIGN KEY ("fileUploadId") REFERENCES "FileUpload"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plagiarism_matches" ADD CONSTRAINT "plagiarism_matches_file1Id_fkey" FOREIGN KEY ("file1Id") REFERENCES "UploadedFile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plagiarism_matches" ADD CONSTRAINT "plagiarism_matches_file2Id_fkey" FOREIGN KEY ("file2Id") REFERENCES "UploadedFile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matched_sections" ADD CONSTRAINT "matched_sections_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "plagiarism_matches"("id") ON DELETE CASCADE ON UPDATE CASCADE;
