<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Musyawarah;
use Illuminate\Http\Request;

class MusyawarahController extends Controller
{
    public function index()
    {
        return response()->json(Musyawarah::with(['creator', 'agendas', 'participants'])->latest()->paginate(15));
    }

    public function store(Request $request)
    {
        if (!in_array(auth()->user()->role, ['osis', 'guru', 'admin'])) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $data = $request->validate([
            'title'       => 'required|string',
            'description' => 'nullable|string',
            'scheduled_at'=> 'nullable|date',
            'quorum'      => 'integer',
        ]);

        $musyawarah = Musyawarah::create([
            ...$data,
            'created_by' => auth()->id(),
        ]);

        return response()->json($musyawarah, 201);
    }

    public function attend(Musyawarah $musyawarah)
    {
        $musyawarah->participants()->updateOrCreate(
            ['user_id' => auth()->id()],
            ['is_present' => true]
        );

        return response()->json(['message' => 'Kehadiran dicatat.']);
    }

    public function setResult(Request $request, Musyawarah $musyawarah)
    {
        $request->validate(['result' => 'required|string']);
        $musyawarah->update(['result' => $request->result, 'status' => 'selesai']);

        return response()->json($musyawarah);
    }
}
