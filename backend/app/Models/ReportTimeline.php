<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class ReportTimeline extends Model
{
    use HasUuids;

    protected $fillable = ['report_id', 'label', 'notes', 'actor_id'];

    public function report() { return $this->belongsTo(Report::class); }
    public function actor()  { return $this->belongsTo(User::class, 'actor_id'); }
}
