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

        return Pointers::select('*')->where("user_id", Auth::id())->get();
    }

    public function newPoint(Request $request)
    {
        /*     $credentials = $request->validate([
                 'name' => ['required'],
                 'longitude' => ['required'],
                 'latitude' => ['required']
             ]);*/

        Pointers::create([
            'name' => $request->input('namePoint'),
            'longitude' => $request->input('longitude'),
            'latitude' => $request->input('latitude'),
            'user_id' => Auth::id()
        ]);

        // username_id Должен передаваться с фронта...?
        // Передается api ключ, ищется в таблцие users юзер с этим ключом, возвращается id usera таким ключом и записывается в username_id

        return Pointers::select('*')->where("user_id", Auth::id())->get();
    }

    public function updatePoint($id, Request $request)
    {
        Pointers::where('id', $id)->update([
            'name' => $request->input('name'),
            'longitude' => $request->input('longitude'),
            'latitude' => $request->input('latitude')
        ]);

        return Pointers::select('*')->where("user_id", Auth::id())->get();
    }

    public function deletePoint($id)
    {
        Pointers::where('id', $id)->delete();

        return Pointers::select('*')->where("user_id", Auth::id())->get();
    }
}

