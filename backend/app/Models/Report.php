<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\SoftDeletes;

class Report extends Model
{
    use HasUuids, SoftDeletes;

    protected $fillable = [
        'reporter_id', 'code', 'title', 'description',
        'category', 'status', 'is_anonymous', 'is_urgent', 'assigned_to'
    ];

    protected $casts = ['is_anonymous' => 'boolean', 'is_urgent' => 'boolean'];

    public function reporter()  { return $this->belongsTo(User::class, 'reporter_id'); }
    public function assignee()  { return $this->belongsTo(User::class, 'assigned_to'); }
    public function timelines() { return $this->hasMany(ReportTimeline::class)->latest(); }

    // Auto-generate kode RPT-001
    protected static function boot()
    {
        parent::boot();
        static::creating(function ($report) {
            $count = static::count() + 1;
            $report->code = 'RPT-' . str_pad($count, 3, '0', STR_PAD_LEFT);
        });
    }
}
