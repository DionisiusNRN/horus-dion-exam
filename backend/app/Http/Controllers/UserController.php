<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // POST /users/register
    public function register(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|string|max:50|unique:users,username',
            'password' => 'required|string|min:6',
            'email'    => 'required|email|max:100|unique:users,email',
            'nama'     => 'required|string|max:100',
        ]);

        User::create([
            'username' => $validated['username'],
            'password' => Hash::make($validated['password']),
            'email'    => $validated['email'],
            'nama'     => $validated['nama'],
        ]);

        return response()->json([
            'message' => 'Registrasi berhasil'
        ], 201);
    }

    // POST /users/login
    public function login(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        $user = User::where('username', $validated['username'])->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            return response()->json([
                'message' => 'Username atau password salah'
            ], 401);
        }

        return response()->json([
            'message' => 'Login berhasil',
            'token'   => base64_encode($user->id)
        ]);
    }

    // GET /users
    public function index()
    {
        $users = User::select('id', 'username', 'email', 'nama')->get();

        return response()->json($users);
    }

    public function show($id)
    {
        return User::findOrFail($id);
    }

    // PUT /users/{id}
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'username' => 'required|string|max:50|unique:users,username,' . $id,
            'email'    => 'required|email|max:100|unique:users,email,' . $id,
            'nama'     => 'required|string|max:100',
        ]);

        $user->update($validated);

        return response()->json([
            'message' => 'Data user berhasil diperbarui'
        ]);
    }

    // DELETE /users/{id}
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json([
            'message' => 'User berhasil dihapus'
        ]);
    }
}
