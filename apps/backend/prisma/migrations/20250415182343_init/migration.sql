-- CreateTable
CREATE TABLE "GameSession" (
    "id" TEXT NOT NULL,
    "gameEngine" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Log" (
    "id" TEXT NOT NULL,
    "chunkLostLives" INTEGER NOT NULL,
    "chunkElapsedSeconds" INTEGER NOT NULL,
    "chunkGainedSeconds" INTEGER NOT NULL,
    "chunkPickedCoins" INTEGER NOT NULL,
    "chunkGeneratedCoins" INTEGER NOT NULL,
    "chunkMapDifficulties" INTEGER[],
    "chunkPlatformSpeed" INTEGER NOT NULL,
    "chunkDifficultySkore" INTEGER NOT NULL,
    "gameTotalElapsedSeconds" INTEGER NOT NULL,
    "gameTotalGainedSeconds" INTEGER NOT NULL,
    "engineSuggestedAction" TEXT,
    "chunkCreated" TIMESTAMP(3) NOT NULL,
    "sessionId" TEXT NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "GameSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
