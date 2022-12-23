<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Pointers extends Model
{
    /**
     * Получить список маркеров у конкретного пользователя
     */
    public function pointers()
    {
        return $this->hasMany(User::class);
    }
}
