<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    public function toArray($request): array
    {
        $user = $request->user();

        return [
            'id'          => $this->id,
            'title'       => $this->title,
            'body'        => $this->body,
            'type'        => $this->type,
            'is_pinned'   => $this->is_pinned,
            'is_anonymous'=> $this->is_anonymous,
            'view_count'  => $this->view_count,
            'votes_count' => $this->votes_count ?? $this->votes()->count(),
            'comments_count' => $this->comments_count ?? $this->comments()->count(),
            'has_voted'   => $user ? $this->hasVotedBy($user) : false,
            'category'    => [
                'id'    => $this->category->id,
                'name'  => $this->category->name,
                'color' => $this->category->color,
            ],
            // Sembunyikan identitas jika anonim
            'author' => $this->is_anonymous ? null : [
                'id'    => $this->user->id,
                'name'  => $this->user->name,
                'kelas' => $this->user->kelas,
                'avatar'=> $this->user->avatar_url,
            ],
            'created_at'  => $this->created_at->diffForHumans(),
            'time'        => $this->created_at->format('d M Y'),
        ];
    }
}
