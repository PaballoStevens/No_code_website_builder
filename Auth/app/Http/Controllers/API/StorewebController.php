<?php

namespace App\Http\Controllers\API;

use DB;
use Auth;
use App\Models\User;
use App\Models\Storeweb;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class StorewebController extends Controller
{

    public function index(){
        $user = Auth::user();
        $user_id = $user->id;
        $store = DB::table('users')
        ->join('storewebs', 'users.id', '=', 'storewebs.userid')
        ->where('storewebs.userid', '=', $user->id)
        ->get();
      return response()->json([
            'status'=>200,
             'data' => $store,
       ]);
    }

    public function show($identifier)
{
    $page = Storeweb::where('identifier', $identifier)->firstOrFail();

    return response()->json(['content' => $page]);
}

    public function edit($id){
        $store = Storeweb::find($id);
        if($store){
            return response()->json([
                'status'=>200,
                'data'=>$store,
            ]);
        }
        else {
            return response()->json([
                'status'=>404,
                'message'=>'ID not find',
            ]);
        }
    }

    public function storeweb(Request $request){
        $validator = Validator::make($request ->all(), [
            'projectName' => 'required',
            'html' => 'required',
            'css' => 'required',
         ]);
         if ($validator->fails()) {
            return response()->json([
            'validation_errors' => $validator ->messages(),
             ]);
              
         } else {
            $user = Auth::user();
            $user_id = $user->id;
            $store = new Storeweb;
            $store -> userid =  $user->id;
            $store -> projectName = $request->projectName;
            $store -> html = $request->html;
            $store -> css = $request->css;
            $store -> identifier = Str::uuid();
            $store->save();
        return response()->json([
            'status'=>200,
            'message'=>'Saved Successfully' 
        ]);
         }
         
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request ->all(), [
            'html' => 'required',
            'css' => 'required',
         ]);
         if ($validator->fails()) {
            return response()->json([
            'validation_errors' => $validator ->messages(),
             ]);
              
         } else {
            $store = Storeweb::find($id);
            $store -> html = $request->html;
            $store -> css = $request->css;
            $store->save();
        return response()->json([
            'status'=>200,
            'message'=>'Successfully Updated' 
        ]);
         }
    }
}
