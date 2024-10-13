-- CreateTable
CREATE TABLE "paystub_records" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "paystub_id" INTEGER NOT NULL,
    "pay_day" TIMESTAMP(3) NOT NULL,
    "amount_in_cents" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "paystub_records_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paystubs" ADD CONSTRAINT "paystubs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paystub_records" ADD CONSTRAINT "paystub_records_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paystub_records" ADD CONSTRAINT "paystub_records_paystub_id_fkey" FOREIGN KEY ("paystub_id") REFERENCES "paystubs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
