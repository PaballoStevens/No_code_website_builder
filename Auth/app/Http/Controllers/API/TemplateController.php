<?php

namespace App\Http\Controllers\API;

use App\Models\templates;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class TemplateController extends Controller
{

    public function index(){
        $template = templates::all();
        return response()->json([
            'status' =>200,
            'data' => $template,
        ]);
    }

    public function create(Request $request){
        $validator = Validator::make($request ->all(), [
            'html' => 'required',
            'css' => 'required',
            'name' => 'required',
         ]);
         if ($validator->fails()) {
            return response()->json([
            'validation_errors' => $validator ->messages(),
             ]);
              
         } else {
            $store = new templates;
            $store -> name =  $request->name;
            $store -> html = $request->html;
            $store -> css = $request->css;
            $store -> image = $request->image;
            $store -> identifier = Str::uuid();
            $store->save();
        return response()->json([
            'status'=>200,
            'message'=>'Saved' 
        ]);
         }
         
    }

    public function edit($id){
        $template = templates::find($id);
        if($template){
            return response()->json([
                'status'=>200,
                'data'=>$template,
            ]);
        }
        else {
            return response()->json([
                'status'=>404,
                'message'=>'ID not find',
            ]);
        }
    }

    
    public function show($identifier)
{
    $page = templates::where('identifier', $identifier)->firstOrFail();

    return response()->json(['content' => $page]);
}
}
