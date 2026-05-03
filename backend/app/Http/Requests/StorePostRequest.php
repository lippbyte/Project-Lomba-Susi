<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'category_id'  => 'required|exists:post_categories,id',
            'title'        => 'required|string|max:255',
            'body'         => 'required|string',
            'type'         => 'required|in:diskusi,voting,musyawarah',
            'is_pinned'    => 'sometimes|boolean',
            'is_anonymous' => 'sometimes|boolean',
        ];
    }
}
