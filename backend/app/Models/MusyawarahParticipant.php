<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class MusyawarahParticipant extends Model
{
    use HasUuids;

    protected $fillable = ['musyawarah_id', 'user_id', 'is_present'];

    protected $casts = ['is_present' => 'boolean'];

    public function musyawarah() { return $this->belongsTo(Musyawarah::class); }
    public function user()       { return $this->belongsTo(User::class); }
}
