<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\Admin;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function authenticate(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            
            $user = [
                'login' => Auth::user()->name,
                'isLogged' => true
            ];

            return response($user, 200);
        }

        return response('You not authorized');
    }

    public function authStatus()
    {
        return User::find(1)->pointers->count();
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

    public function status()
    {
        return Auth::check();
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
