<?php

namespace App\Http\Controllers;

use App\Models\Pointers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class PointController extends Controller
{
    public function getPointList()
    {
        $pointer_list = Pointers::select('*')->where("username_id", Auth::id())->get();

        return $pointer_list;
    }

    public function newPoint (Request $request) {
        Pointers::create([
            'name' => $request->input('namePoint'),
            'longitude' => $request->input('longitude'),
            'latitude' => $request->input('latitude'),
            'username_id' => Auth::id()
        ]);

        // username_id Должен передаваться с фронта...?
        // Передается api ключ, ищется в таблцие users юзер с этим ключом, возвращается id usera таким ключом и записывается в username_id

        return response('OK', 200);
    }

    public function deletePoint (Request $request) {
        Pointers::destroy($request->input('id'));

        return response('Deleted', 200);
    }
}

