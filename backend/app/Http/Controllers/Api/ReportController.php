<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Report;
use App\Models\ReportTimeline;
use App\Http\Requests\StoreReportRequest;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function index()
    {
        $reports = Report::with(['reporter', 'assignee'])
            ->when(auth()->user()->role === 'siswa', fn($q) => $q->where('reporter_id', auth()->id()))
            ->latest()
            ->paginate(15);
        
        return response()->json($reports);
    }

    public function store(StoreReportRequest $request)
    {
        $report = Report::create([
            ...$request->validated(),
            'reporter_id' => auth()->id(),
        ]);

        // Tambah entry timeline awal
        $report->timelines()->create([
            'label' => 'Laporan Diterima',
            'actor_id' => auth()->id(),
        ]);

        return response()->json([
            'code'    => $report->code,
            'message' => 'Laporan berhasil dikirim.',
            'report'  => $report->load('timelines'),
        ], 201);
    }

    public function track(string $code)
    {
        $report = Report::where('code', $code)
            ->with('timelines')
            ->firstOrFail();

        // Sembunyikan identitas jika anonim dan bukan admin/guru
        if ($report->is_anonymous && !in_array(auth()->user()->role, ['admin', 'guru'])) {
            $report->makeHidden(['reporter_id']);
        }

        return response()->json($report);
    }

    public function updateStatus(Request $request, Report $report)
    {
        $request->validate([
            'status' => 'required|in:diterima,diverifikasi,dalam_proses,selesai',
            'notes'  => 'nullable|string|max:500',
        ]);

        $report->update(['status' => $request->status]);

        $report->timelines()->create([
            'label'    => match($request->status) {
                'diverifikasi' => 'Diverifikasi',
                'dalam_proses' => 'Dalam Penanganan',
                'selesai'      => 'Diselesaikan',
                default        => 'Status diperbarui',
            },
            'notes'    => $request->notes,
            'actor_id' => auth()->id(),
        ]);

        return response()->json($report->fresh(['timelines']));
    }
}
