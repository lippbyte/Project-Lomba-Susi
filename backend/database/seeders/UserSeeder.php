<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            ['nis'=>'12345','name'=>'Hasby Wira',      'role'=>'siswa', 'kelas'=>'XII RPL 1'],
            ['nis'=>'67890','name'=>'Muhammad Khalifa', 'role'=>'osis',  'kelas'=>'OSIS'],
            ['nis'=>'11111','name'=>'Bu Susi',         'role'=>'guru',  'kelas'=>'Guru BK'],
            ['nis'=>'22222','name'=>'Rakan Shaka',      'role'=>'admin', 'kelas'=>'Admin'],
        ];

        foreach ($users as $data) {
            User::create([...$data, 'password' => Hash::make('susi123')]);
        }
    }
}
