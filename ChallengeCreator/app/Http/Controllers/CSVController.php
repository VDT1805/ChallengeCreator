<?php

namespace App\Http\Controllers;

use App\Http\Services\LabelService;
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
    private LabelService $lService;
    public function __construct(QuestionService $qService, QuestionBankService $qbService, LabelService $lService)
    {
        $this->qService = $qService;
        $this->qbService = $qbService;
        $this->lService = $lService;
    }
    public function importForm($qbID)
    {
        // dd($this->lService->find(["questionbanks" => $qbID])[0]->sublabels);
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
                // 'id' => 'required|string',
                'question' => 'required|string',
                'ans1' => 'string',
                'ans2' => 'string',
                'ans3' => 'string',
                'ans4' => 'string',
                'ans5' => 'string',
                'ans6' => 'string',
                'correct' => 'required|numeric|between:1,6',
                'label' => 'string|required',
                'sublabel' => 'string|required'
            ];
            $filtered = [];
            $violators = [];
            // $labels = $this->lService->find(["questionbanks" => $qbID]);
            SimpleExcelReader::create(storage_path('app/') . $path, 'csv')->getRows()->
            each(function($row) use ($rules, &$filtered, &$violators, $qbID) {
                $validator = Validator::make($row, $rules);
                if ($validator->passes()) {
                    $label = $this->lService->find(["sublabel" => [$row["label"],$row["sublabel"],$qbID]])->first();
                    if (!$label) {
                        $violators[] = $row;
                        return;
                    }
                    $row["label_id"] = $label->id;
                    $row["question_bank_id"] = $qbID;
                    unset($row["label"],$row["sublabel"]);
                    $filtered[] = $row;
                } else {
                    $violators[] = $row;
                }
            });
            // dd($filtered);
            $this->qService->createMany($filtered);

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
