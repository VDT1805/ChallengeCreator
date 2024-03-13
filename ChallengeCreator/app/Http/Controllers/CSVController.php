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
        return Inertia::render("Import/ImportPage",[
            "QBank"=>$QB,
        ]);
    }

    // public function importRules($qbID, Request $request) {
    //     $rules = ['email' => 'required|email'];
    //     $filtered = [];
    //     $violators = [];
    //     $rows = SimpleExcelReader::create(storage_path('app/') . $path, 'csv')->getRows()->
    //     each(function($row) use ($rules, &$filtered, &$violators) {
    //         $validator = Validator::make($row, $rules);
    //         if ($validator->passes()) {
    //                 $filtered[] = $row;
    //             } else {
    //                 $violators[] = $row;
    //             }
    //         });
    //     return response()->json(['filter' => $filtered]);
    // }

    // public function import($qbID, Request $request)
    // {
    // $errorRow = [];
    // $QB = $this->qbService->findOrFail($qbID, "id");
    // if ($request->hasFile('csv')) {
    //     $file = $request->file('csv');
    //     $fileName = $file->getClientOriginalName();
    //     $fileExtension = $file->getClientOriginalExtension();
    //     $newFileName = pathinfo($fileName, PATHINFO_FILENAME) . '.' . $fileExtension;

    //     $path = $request->file('csv')->store("public");

    //     // Use Laravel-Excel or similar library to read CSV
    //     $reader = Excel::reader($path, 'csv');

    //     $filtered = [];
    //     $violators = [];

    //     $reader->each(function ($row) use ($rules, &$filtered, &$violators) {
    //     $validator = Validator::make($row, $this->importRules($qbID, $request));
    //     if ($validator->passes()) {
    //         $filtered[] = $row;
    //     } else {
    //         $violators[] = $row->toArray() + ['errors' => $validator->errors()->messages()];
    //     }
    //     });

    //     return response()->json(['filter' => $filtered, 'violators' => $violators]);
    // } else {
    //     return response()->json(['error' => 'No file uploaded']);
    // }
    // }

    public function import($qbID, Request $request) {
        // dd($request);
        $errorRow = [];
        $QB = $this->qbService->findOrFail($qbID,"id");
        if ($request->hasFile('csv')) {
            $file = $request->file('csv');
            // Save the uploaded file with the correct file extension
            $fileName = $file->getClientOriginalName();
            $fileExtension = $file->getClientOriginalExtension();
            $newFileName = pathinfo($fileName, PATHINFO_FILENAME) . '.' . $fileExtension;
            $path = $request->file('csv')->store("public");
            $rules = ['email' => 'required|email'];
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
                "Import/Test",[
                    "QBank" => $QB,
                    "rows" => $filtered,
                    "violators" => $violators
                ]
            );
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
