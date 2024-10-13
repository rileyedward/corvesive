import prisma from "$lib/server/database/db"
import type { users } from "@prisma/client"

export const load = async ({ locals, depends }) => {
  depends('expenses');

  const user: users = locals.user;

  const expenses = await prisma.expenses.findMany({
    where: {
      user_id: user.id
    }
  });

  const upcomingExpenses = await prisma.expense_records.findMany({
    include: {
      expense: true
    },
    where: {
      user_id: user.id,
      due_date: {
        gte: new Date()
      }
    },
    orderBy: {
      due_date: 'asc'
    },
    take: 5
  });

  return {
    expenses,
    upcomingExpenses
  };
};