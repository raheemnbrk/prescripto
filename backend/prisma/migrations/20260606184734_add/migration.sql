-- CreateEnum
CREATE TYPE "DoctorStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "Doctor" (
    "userId" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "experience" INTEGER NOT NULL,
    "fees" DOUBLE PRECISION NOT NULL,
    "about" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "status" "DoctorStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Doctor_pkey" main KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
