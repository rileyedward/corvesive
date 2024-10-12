-- CreateTable
CREATE TABLE "paystubs" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "issuer" TEXT NOT NULL,
    "amount_in_cents" INTEGER NOT NULL,
    "recurrence_rate" TEXT NOT NULL,
    "recurrence_interval_one" INTEGER NOT NULL,
    "recurrence_interval_two" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "paystubs_pkey" PRIMARY KEY ("id")
);
