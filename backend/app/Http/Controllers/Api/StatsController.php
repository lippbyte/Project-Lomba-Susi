<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Post;
use App\Models\Report;
use Illuminate\Http\Request;

class StatsController extends Controller
{
    public function index()
    {
        return response()->json([
            'total_users'   => User::count(),
            'total_posts'   => Post::count(),
            'total_reports' => Report::count(),
            'urgent_reports'=> Report::where('is_urgent', true)->count(),
        ]);
    }
}
