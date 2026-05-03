<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class MusyawarahAgenda extends Model
{
    use HasUuids;

    protected $fillable = ['musyawarah_id', 'title', 'description', 'is_completed'];

    protected $casts = ['is_completed' => 'boolean'];

    public function musyawarah() { return $this->belongsTo(Musyawarah::class); }
}
