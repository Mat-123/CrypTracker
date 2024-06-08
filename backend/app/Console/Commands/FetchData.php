<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class FetchData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:fetch-data';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch data from an API and save it to the database';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
    }
}
