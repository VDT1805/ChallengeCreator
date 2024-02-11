<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Laratrust\Middleware\LaratrustMiddleware;

class DynamicTeamPermission extends LaratrustMiddleware
{
    /**
     * Handle incoming request.
     */
    public function handle(
        Request $request,
        Closure $next,
        string|array $permissions,
        ?string $options = ''
    ) {
        $team_id = $request->route('qbID'); //Team id
        if (! $this->authorization('permissions', $permissions, $team_id, $options)) {
            return $this->unauthorized();
        }

        return $next($request);
    }
}
