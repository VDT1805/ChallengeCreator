<?php

namespace App\Providers;
use Illuminate\Support\Collection;
use Illuminate\Support\LazyCollection;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
        if ($this->app->environment('production')) {
            URL::forceScheme('https');
        }
        LazyCollection::macro('validate_violate', function (array $rules) {
            /** @var $this Collection */
            return $this->filter(function ($array) use ($rules) {
                return Validator::make($array, $rules)->failed();
            });
        });

        LazyCollection::macro('validate_valid', function (array $rules) {
            /** @var $this Collection */
            return $this->values()->filter(function ($array) use ($rules) {
                return Validator::make($array, $rules)->passes();
            });
        });
    }
}
