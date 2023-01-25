<?php

namespace App\Http\Controllers;

use App\Models\Pointers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ApiController extends Controller
{
    //
    public function authStatus () {
        if (Auth::check()) {
            return 'You status: authorized';
        }
        return 'You status: not authorized';
    }

    public function register(Request $request)
    {
        //Validate data
        /*       $data = $request->only('name', 'password');
               $validator = Validator::make($data, [
                   'name' => 'required|string',
                   'password' => 'required|string|min:6|max:50'
               ]);

               //Send failed response if request is not valid
               if ($validator->fails()) {
                   return response()->json(['error' => $validator->messages()]);
               }*/


        User::create([
            'name' => $request->input('name'),
            'password' => Hash::make($request->input('password')),
            'email' => $request->input('email'),
            'is_admin' => 0
        ]);

        $credentials = $request->validate([
            'email' => ['required'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return response('SignIn OK. You authorized. Need redirect');
        }

        return 'SignIn OK. You not authorized';
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return 'Session logout delete id ok';
    }

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

