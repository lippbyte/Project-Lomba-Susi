<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Vote extends Model
{
    use HasUuids;

    protected $fillable = ['demos_id', 'user_id', 'choice'];

    public function demos() { return $this->belongsTo(Demos::class); }
    public function user()  { return $this->belongsTo(User::class); }
}
