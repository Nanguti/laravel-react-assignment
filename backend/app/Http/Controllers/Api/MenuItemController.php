<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MenuItem;
use Illuminate\Http\Request;

class MenuItemController extends Controller
{
    public function index()
    {
        $menus = MenuItem::whereNull('parent_id')
            ->with('descendants')
            ->get();

        return response()->json($menus);
    }

    public function show($id)
    {
        $menuItem = MenuItem::findOrFail($id);
        $descendants = $menuItem->descendantsWithDepth();

        $ancestors = $menuItem->ancestors();
        $menuItem->depth = 0;
        return response()->json([
            'menu_item' => $menuItem,
            'descendants' => $descendants,
            'ancestors' => $ancestors,
        ]);
    }

    public function store(Request $request)
    {

        $request->validate([
            'title' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:menu_items,id',
        ]);

        $menuItem = MenuItem::create([
            'title' => $request->input('title'),
            'parent_id' => $request->input('parent_id'),
        ]);

        return response()->json([
            'message' => 'Menu item created successfully',
            'menu_item' => $menuItem,
        ], 201);
    }

    public function update(Request $request, $id)
    {

        $request->validate([
            'title' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:menu_items,id',

        ]);
        $menuItem = MenuItem::findOrFail($id);

        $menuItem->update([
            'title' => $request->input('title'),
            'parent_id' => $request->input('parent_id'),
        ]);

        return response()->json([
            'message' => 'Menu item updated successfully',
            'menu_item' => $menuItem,
        ]);
    }

    public function destroy($id)
    {
        $menu = MenuItem::findOrFail($id);
        $menu->delete();
        return response()->json(null, 204);
    }
}
