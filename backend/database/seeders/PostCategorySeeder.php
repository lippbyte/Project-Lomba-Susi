<?php

namespace Database\Seeders;

use App\Models\PostCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PostCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Aspirasi', 'color' => '#3b82f6'],
            ['name' => 'Event',    'color' => '#10b981'],
            ['name' => 'Berita',   'color' => '#f59e0b'],
            ['name' => 'Diskusi',  'color' => '#8b5cf6'],
        ];

        foreach ($categories as $cat) {
            PostCategory::create([
                ...$cat,
                'slug' => Str::slug($cat['name']),
            ]);
        }
    }
}
