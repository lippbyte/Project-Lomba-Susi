<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasApiTokens, HasUuids, SoftDeletes, Notifiable;

    protected $fillable = ['nis', 'name', 'password', 'role', 'kelas', 'jurusan', 'avatar'];

    protected $hidden = ['password', 'remember_token'];

    protected $casts = ['password' => 'hashed'];

    // Relasi
    public function posts()        { return $this->hasMany(Post::class); }
    public function reports()      { return $this->hasMany(Report::class, 'reporter_id'); }
    public function votes()        { return $this->hasMany(Vote::class); }
    public function musyawarahs()  { return $this->hasMany(Musyawarah::class, 'created_by'); }

    // Role helpers
    public function isSiswa(): bool  { return $this->role === 'siswa'; }
    public function isOsis(): bool   { return $this->role === 'osis'; }
    public function isGuru(): bool   { return $this->role === 'guru'; }
    public function isAdmin(): bool  { return $this->role === 'admin'; }

    // Accessor
    public function getAvatarUrlAttribute(): string
    {
        return $this->avatar
            ? asset('storage/' . $this->avatar)
            : 'https://ui-avatars.com/api/?name=' . urlencode($this->name);
    }
}
