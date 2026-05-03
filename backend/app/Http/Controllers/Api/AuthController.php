<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'nis'      => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::where('nis', $request->nis)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'nis' => ['NIS atau password salah.'],
            ]);
        }

        // Hapus token lama, buat yang baru
        $user->tokens()->delete();
        $token = $user->createToken('auth_token', [$user->role])->plainTextToken;

        return response()->json([
            'token' => $token,
            'user'  => [
                'id'    => $user->id,
                'name'  => $user->name,
                'nis'   => $user->nis,
                'role'  => $user->role,
                'kelas' => $user->kelas,
            ],
        ]);
    }

    public function register(Request $request)
    {
        $data = $request->validate([
            'nis'      => 'required|string|unique:users,nis',
            'name'     => 'required|string',
            'password' => 'required|string|min:6',
            'role'     => 'sometimes|string|in:siswa,osis,guru,admin',
            'kelas'    => 'nullable|string',
            'jurusan'  => 'nullable|string',
        ]);

        $user = User::create([
            ...$data,
            'password' => Hash::make($data['password']),
        ]);

        $token = $user->createToken('auth_token', [$user->role])->plainTextToken;

        return response()->json([
            'token' => $token,
            'user'  => $user,
        ], 201);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out']);
    }

    public function me(Request $request)
    {
        return response()->json($request->user());
    }
}
