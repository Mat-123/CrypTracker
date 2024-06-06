<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTransactionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'quantity' => 'sometimes|required|integer',
            'transaction_price' => 'sometimes|required|integer',
            'total_spent' => 'sometimes|required|integer',
            'transaction_date' => 'sometimes|required|date',
            'wallet' => 'nullable|string|max:255',
        ];
    }
}
