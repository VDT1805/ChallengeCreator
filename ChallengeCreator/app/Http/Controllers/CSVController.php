<?php

namespace App\Http\Controllers;

use App\Http\Services\QuestionService;
use App\Http\Services\QuestionBankService;
use App\Models\Question;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationData;
use Illuminate\Validation\Validator;
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
    public function import($qbID, Request $request) {
        $errorRow = [];
        $QB = $this->qbService->findOrFail($qbID,"id");
        if ($request->hasFile('csv')) {
            $file = $request->file('csv');
            // Save the uploaded file with the correct file extension
            $fileName = $file->getClientOriginalName();
            $fileExtension = $file->getClientOriginalExtension();
            $newFileName = pathinfo($fileName, PATHINFO_FILENAME) . '.' . $fileExtension;
            $path = $request->file('csv')->store("public");
            $rows = SimpleExcelReader::create(storage_path('app/') . $path, 'csv')->getRows();

            return Inertia::render(
                "Import/Test",[
                    "QBank" => $QB,
                    "rows" => $rows
                ]
            );
        } else {
            return response()->json(['error' => 'No file uploaded']);
        }
        // $rows->each(function(array $row) use ($qbID) {
        // // in the first pass $rowProperties will contain
        // // ['email' => 'john@example.com', 'first_name' => 'john']
        //     $this->qService->create($row+["question_bank_id" => $qbID]);
        // });
        // $users = (new FastExcel)->import($path, function ($line) use ($qbid) {
        //     Validator::make
        //     try {
        //         return $this->qService->create(
        //             [
        //                 'question' => $line["question"],
        //                 'ans1' => $line["ans1"],
        //                 'ans2' => $line["ans2"],
        //                 'ans3' => $line["ans3"],
        //                 'ans4' => $line["ans4"],
        //                 'ans5' => $line["ans5"],
        //                 'ans5' => $line["ans6"],
        //                 'correct' => $line["correct"],
        //                 'question_bank_id' => $qbid
        //             ]
        //         );
        //     }
        //     catch (Exception $e) {

        //     }
        // });
    }
}
