<?php

namespace App\Http\Controllers;

use App\Models\Pointers;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    //

    public function getPointList () {
        // Получение списка координат маркеров для каждого пользователя отдельно

        $pointer_list = Pointers::find(2);

        dd($pointer_list);
    }
}
