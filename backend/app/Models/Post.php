<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use HasUuids, SoftDeletes;

    protected $fillable = [
        'user_id', 'category_id', 'title', 'body',
        'type', 'is_pinned', 'is_anonymous', 'view_count'
    ];

    protected $casts = ['is_pinned' => 'boolean', 'is_anonymous' => 'boolean'];

    public function user()     { return $this->belongsTo(User::class); }
    public function category() { return $this->belongsTo(PostCategory::class); }
    public function comments() { return $this->hasMany(Comment::class); }
    public function votes()    { return $this->hasMany(PostVote::class); }

    // Accessor untuk cek apakah user sudah upvote
    public function hasVotedBy(?User $user): bool
    {
        if (!$user) return false;
        return $this->votes()->where('user_id', $user->id)->exists();
    }

    // Scope
    public function scopeTrending($query)
    {
        return $query->withCount('votes')->orderBy('votes_count', 'desc');
    }
}
