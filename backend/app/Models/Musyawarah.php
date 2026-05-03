<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\SoftDeletes;

class Musyawarah extends Model
{
    use HasUuids, SoftDeletes;

    protected $table = 'musyawarahs';

    protected $fillable = [
        'created_by', 'title', 'description', 'status',
        'scheduled_at', 'quorum', 'result'
    ];

    public function creator()      { return $this->belongsTo(User::class, 'created_by'); }
    public function agendas()      { return $this->hasMany(MusyawarahAgenda::class); }
    public function participants() { return $this->hasMany(MusyawarahParticipant::class); }
}
