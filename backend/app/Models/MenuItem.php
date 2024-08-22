<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    protected $fillable = ['title', 'parent_id'];

    // Relationship to get child menu items
    public function children()
    {
        return $this->hasMany(MenuItem::class, 'parent_id');
    }

    // Recursive relationship to get all descendants with depth
    public function descendantsWithDepth($depth = 0)
    {
        // Retrieve all children
        $descendants = $this->children()->get();

        foreach ($descendants as $descendant) {
            // Assign depth
            $descendant->depth = $depth + 1;

            // Recursively get descendants of this child
            $descendant->descendants = $descendant->descendantsWithDepth($descendant->depth);
        }

        return $descendants;
    }

    // Recursive relationship to get all ancestors (root item)
    public function ancestors()
    {
        $ancestors = collect([]);
        $parent = $this->parent;

        while ($parent) {
            $ancestors->prepend($parent);
            $parent = $parent->parent;
        }

        return $ancestors;
    }

    public function parent()
    {
        return $this->belongsTo(MenuItem::class, 'parent_id');
    }

    public function descendants()
    {
        return $this->children()->with('descendants');
    }
}
