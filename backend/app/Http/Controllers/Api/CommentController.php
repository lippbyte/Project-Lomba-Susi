<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index(Post $post)
    {
        return response()->json($post->comments()->with('user')->latest()->get());
    }

    public function store(Request $request, Post $post)
    {
        $request->validate(['body' => 'required|string']);

        $comment = $post->comments()->create([
            'body'    => $request->body,
            'user_id' => auth()->id(),
        ]);

        return response()->json($comment->load('user'), 201);
    }

    public function destroy(Comment $comment)
    {
        if (auth()->id() !== $comment->user_id && auth()->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $comment->delete();
        return response()->noContent();
    }
}
