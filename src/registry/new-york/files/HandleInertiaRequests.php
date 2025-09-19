<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            //
            'route' => [
                'name' => $request->route()->getName(),
                'params' => $request->route()->originalParameters() ?: null,
                'query' => $request->query() ?: null
            ],
        ];
    }
}