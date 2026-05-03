<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\SoftDeletes;

class Demos extends Model
{
    use HasUuids, SoftDeletes;

    protected $fillable = [
        'created_by', 'title', 'description', 'status',
        'choice_a', 'choice_b', 'deadline', 'total_eligible'
    ];

    public function creator() { return $this->belongsTo(User::class, 'created_by'); }
    public function votes()   { return $this->hasMany(Vote::class); }
}
