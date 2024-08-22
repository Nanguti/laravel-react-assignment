<?php

namespace Database\Seeders;

use App\Models\MenuItem;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MenuItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $systemManagement = MenuItem::create(['title' => 'System Management']);

        $systems = $systemManagement->children()->create(['title' => 'Systems']);
        $systemCode = $systems->children()->create(['title' => 'System Code']);
        $systemCode->children()->create(['title' => 'Code Registration']);
        $systemCode->children()->create(['title' => 'Code Registration - 2']);
        $systems->children()->create(['title' => 'Properties']);

        $menus = $systemManagement->children()->create(['title' => 'Menus']);
        $menus->children()->create(['title' => 'Menu Registration']);
        $apiList = $menus->children()->create(['title' => 'API List']);
        $apiList->children()->create(['title' => 'API Registration']);
        $apiList->children()->create(['title' => 'API Edit']);

        $usersGroups = $systemManagement->children()->create(['title' => 'Users & Groups']);
        $users = $usersGroups->children()->create(['title' => 'Users']);
        $users->children()->create(['title' => 'User Account Registration']);
        $groups = $usersGroups->children()->create(['title' => 'Groups']);
        $groups->children()->create(['title' => 'User Group Registration']);
    }
}
