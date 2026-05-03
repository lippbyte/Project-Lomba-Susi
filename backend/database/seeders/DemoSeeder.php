<?php

namespace Database\Seeders;

use App\Models\Demos;
use App\Models\User;
use Illuminate\Database\Seeder;

class DemoSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::where('role', 'admin')->first();

        Demos::create([
            'created_by' => $admin->id,
            'title'      => 'Pemilihan Ketua OSIS 2026',
            'description'=> 'Pilih pemimpin OSIS terbaik untuk periode 2026/2027.',
            'status'     => 'aktif',
            'choice_a'   => 'Paslon 01: Andi & Budi',
            'choice_b'   => 'Paslon 02: Citra & Dino',
            'deadline'   => now()->addDays(7),
            'total_eligible' => User::count(),
        ]);
    }
}
