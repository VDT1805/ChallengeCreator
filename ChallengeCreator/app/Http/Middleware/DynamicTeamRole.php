<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laratrust\Middleware\LaratrustMiddleware;
use Laratrust\Middleware\Role;
use Symfony\Component\HttpFoundation\Response;

class DynamicTeamRole extends LaratrustMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(
    Request $request,
    Closure $next,
    string|array $roles,
    ?string $options = ''): Response
    {
        $team_id = $request->route('qbID'); //Team id
        if (! $this->authorization('roles', $roles, $team_id, $options)) {
            return $this->unauthorized();
        }

        return $next($request);
    }
}
