<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Http\Resources\PostResource;
use App\Http\Requests\StorePostRequest;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $posts = Post::with(['user', 'category'])
            ->withCount(['votes', 'comments'])
            ->when($request->category, fn($q, $cat) => $q->whereHas('category', fn($q) => $q->where('slug', $cat)))
            ->when($request->search,   fn($q, $s)   => $q->where('title', 'like', "%{$s}%"))
            ->when($request->type,     fn($q, $t)   => $q->where('type', $t))
            ->orderByDesc('is_pinned')
            ->orderByDesc('created_at')
            ->paginate(15);

        return PostResource::collection($posts);
    }

    public function store(StorePostRequest $request)
    {
        $post = Post::create([
            ...$request->validated(),
            'user_id' => auth()->id(),
        ]);

        return new PostResource($post->load(['user', 'category']));
    }

    public function show(Post $post)
    {
        $post->increment('view_count');
        return new PostResource($post->load(['user', 'category', 'comments.user'])->loadCount(['votes', 'comments']));
    }

    public function vote(Post $post)
    {
        $post->votes()->firstOrCreate(['user_id' => auth()->id()]);
        return response()->json(['votes_count' => $post->votes()->count()]);
    }

    public function unvote(Post $post)
    {
        $post->votes()->where('user_id', auth()->id())->delete();
        return response()->json(['votes_count' => $post->votes()->count()]);
    }

    public function destroy(Post $post)
    {
        // $this->authorize('delete', $post);
        if (auth()->id() !== $post->user_id && auth()->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $post->delete();
        return response()->noContent();
    }
}
