<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class QuestionFormRequest extends FormRequest
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
            'question' => "required|string",
            // 'ans1' => "string",
            // 'ans2' => "string",
            // 'ans3' => "string",
            // 'ans4' => "string",
            // 'ans5' => "string",
            // 'ans6' => "string",
            'correct' => "required|numeric",
            'label_id' => "required|numeric",
            'testid' => "numeric",
        ];
    }
}
