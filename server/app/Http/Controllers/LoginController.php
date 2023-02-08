<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\Admin;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    public function authenticate(Request $request)
    {
        $data = $request->only( 'email', 'password');

        $validator = Validator::make($data, [
            'email' => 'required|email:rfc,dns',
            'password' => 'required|string',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()]);
        }

        $credentials = $request->validate([
            'email' => ['required'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return Auth::user();
        }

        $errLogin = [
            'error' => [
                'loginErr' => ["Invalid email or password"]
            ]
        ];

        return response()->json($errLogin);
    }

    public function register(Request $request)
    {
        //Validate data
        $data = $request->only('name', 'email', 'password');

        $validator = Validator::make($data, [
            'name' => 'required|string',
            'email' => 'required|email:rfc,dns',
            'password' => 'required|string|min:6|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()]);
        }

        User::create([
            'name' => $request->input('name'),
            'password' => Hash::make($request->input('password')),
            'email' => $request->input('email'),
        ]);

        return response('You registered successfully');
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return 'Session logout delete id ok';
    }

    public function status()
    {
        if (Auth::check()) {
            return Auth::user();
        }

        return response(null, 401);
    }

    public function createAdmin()
    {
        Admin::create([
            'name' => 'admin1',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('admin')
        ]);

        return 'OK';
    }

    public function getCurrentUsername()
    {
        return Auth::user()->name;
    }

}
