<?php

namespace App\Http\Controllers;

use App\Http\Services\QuestionService;
use App\Http\Services\QuestionBankService;
use App\Models\Question;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Spatie\SimpleExcel\SimpleExcelReader;



class CSVController extends Controller
{
    private QuestionService $qService;
    private QuestionBankService $qbService;
    public function __construct(QuestionService $qService, QuestionBankService $qbService)
    {
        $this->qService = $qService;
        $this->qbService = $qbService;
    }
    public function importForm($qbID)
    {
        $QB = $this->qbService->findOrFail($qbID,"id");
        $template_url = Storage::get("template.csv");
        // Storage::download("template.csv");
        return Inertia::render("Import/ImportPage",[
            "QBank"=>$QB,
            // "template_url"=> $template_url
        ]);
    }

    public function downloadTemplate($qbID)
    {
        // $template_url = public_path('csv/').'questions_csv_template.csv';
        // dd($template_url);
        //return Storage::download('template.csv');
        $template_url = Storage::get("template.csv");
        return response()->download($template_url);
    }

    public function import($qbID, Request $request) {
        // dd($request->all());
        $errorRow = [];
        $QB = $this->qbService->findOrFail($qbID,"id");
        if ($request->hasFile('csv')) {
            $file = $request->file('csv');
            // Save the uploaded file with the correct file extension
            $fileName = $file->getClientOriginalName();
            $fileExtension = $file->getClientOriginalExtension();
            $path = $request->file('csv')->store("public");
            $rules = [
                'id' => 'string',
                'question' => 'required|string',
                'ans1' => 'string',
                'ans2' => 'string',
                'ans3' => 'string',
                'ans4' => 'string',
                'ans5' => 'string',
                'ans6' => 'string',
                'correct' => 'required|numeric',
                'sublabel' => 'string'
            ];
            $filtered = [];
            $violators = [];
            $rows = SimpleExcelReader::create(storage_path('app/') . $path, 'csv')->getRows()->
            each(function($row) use ($rules, &$filtered, &$violators) {
                $validator = Validator::make($row, $rules);
                if ($validator->passes()) {
                    $filtered[] = $row;
                } else {
                    $violators[] = $row;
                }
            });

            return Inertia::render(
                "Import/ImportPage",[
                    "QBank" => $QB,
                    "rows" => $filtered,
                    "violators" => $violators
                ]
            );
            // return redirect()->back()->with([
            //             "QBank" => $QB,
            //             "rows" => $filtered,
            //             "violators" => $violators
            // ]);
        } else {
            return response()->json(['error' => 'No file uploaded']);
        }
    //     // $rows->each(function(array $row) use ($qbID) {
    //     // // in the first pass $rowProperties will contain
    //     // // ['email' => 'john@example.com', 'first_name' => 'john']
    //     //     $this->qService->create($row+["question_bank_id" => $qbID]);
    //     // });
    //     // $users = (new FastExcel)->import($path, function ($line) use ($qbid) {
    //     //     Validator::make
    //     //     try {
    //     //         return $this->qService->create(
    //     //             [
    //     //                 'question' => $line["question"],
    //     //                 'ans1' => $line["ans1"],
    //     //                 'ans2' => $line["ans2"],
    //     //                 'ans3' => $line["ans3"],
    //     //                 'ans4' => $line["ans4"],
    //     //                 'ans5' => $line["ans5"],
    //     //                 'ans5' => $line["ans6"],
    //     //                 'correct' => $line["correct"],
    //     //                 'question_bank_id' => $qbid
    //     //             ]
    //     //         );
    //     //     }
    //     //     catch (Exception $e) {

    //     //     }
    //     // });
    }
}
