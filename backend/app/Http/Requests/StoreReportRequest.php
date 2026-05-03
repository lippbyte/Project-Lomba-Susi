<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReportRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title'        => 'required|string|max:255',
            'description'  => 'required|string',
            'category'     => 'required|in:perundungan,fasilitas,keamanan,akademik,lainnya',
            'is_anonymous' => 'sometimes|boolean',
            'is_urgent'    => 'sometimes|boolean',
        ];
    }
}
