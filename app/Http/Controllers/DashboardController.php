<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\DeshboardResource;

class DashboardController extends Controller
{
    public function index()
    {
        $users = User::query()
            // ->latest()
            ->when(request('search'), fn ($query) => $query->where('name','LIKE', '%'. request('search') .'%'))
            ->paginate(request()->perpage ?? 10);

        return inertia('Dashboard', [
            'users'=> DeshboardResource::collection($users),
        ]);
    }
}
