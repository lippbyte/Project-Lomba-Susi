<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Demos;
use App\Models\Vote;
use Illuminate\Http\Request;

class DemosController extends Controller
{
    public function index()
    {
        $demos = Demos::withCount([
            'votes as votes_a_count' => fn($q) => $q->where('choice', 'A'),
            'votes as votes_b_count' => fn($q) => $q->where('choice', 'B'),
        ])
        ->latest()->get();

        return response()->json($demos->map(fn($d) => [
            ...$d->toArray(),
            'has_voted'     => $d->votes()->where('user_id', auth()->id())->exists(),
            'user_choice'   => $d->votes()->where('user_id', auth()->id())->value('choice'),
        ]));
    }

    public function store(Request $request)
    {
        if (auth()->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $data = $request->validate([
            'title'       => 'required|string',
            'description' => 'required|string',
            'choice_a'    => 'required|string',
            'choice_b'    => 'required|string',
            'deadline'    => 'required|date',
        ]);

        $demo = Demos::create([
            ...$data,
            'created_by' => auth()->id(),
        ]);

        return response()->json($demo, 201);
    }

    public function vote(Request $request, Demos $demos)
    {
        if ($demos->status !== 'aktif') {
            return response()->json(['message' => 'Voting sudah berakhir.'], 422);
        }

        $request->validate(['choice' => 'required|in:A,B']);

        // Cek apakah sudah vote
        $exists = Vote::where('demos_id', $demos->id)
            ->where('user_id', auth()->id())
            ->exists();

        if ($exists) {
            return response()->json(['message' => 'Kamu sudah memberikan suara.'], 422);
        }

        Vote::create([
            'demos_id' => $demos->id,
            'user_id'  => auth()->id(),
            'choice'   => $request->choice,
        ]);

        return response()->json([
            'message' => 'Suara berhasil dicatat.',
            'votes_a' => $demos->votes()->where('choice', 'A')->count(),
            'votes_b' => $demos->votes()->where('choice', 'B')->count(),
        ]);
    }
}
