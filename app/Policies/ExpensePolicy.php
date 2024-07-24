<?php

namespace App\Policies;

use App\Models\Expense;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ExpensePolicy
{
    use HandlesAuthorization;

    /**
     * Determines whether the user is the owner
     * of the given Expense.
     */
    public function isOwner(User $user, Expense $expense): bool
    {
        return $user->id === $expense->user_id;
    }
}
