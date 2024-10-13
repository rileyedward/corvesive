/*
  Warnings:

  - You are about to drop the column `pay_day` on the `paystub_records` table. All the data in the column will be lost.
  - Added the required column `pay_date` to the `paystub_records` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "paystub_records" DROP COLUMN "pay_day",
ADD COLUMN     "pay_date" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "expenses" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "issuer" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount_in_cents" INTEGER NOT NULL,
    "is_variable" BOOLEAN NOT NULL DEFAULT false,
    "due_day_of_month" INTEGER NOT NULL,

    CONSTRAINT "expenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expense_records" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "expense_id" INTEGER NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "amount_in_cents" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "expense_records_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense_records" ADD CONSTRAINT "expense_records_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense_records" ADD CONSTRAINT "expense_records_expense_id_fkey" FOREIGN KEY ("expense_id") REFERENCES "expenses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
