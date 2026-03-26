<?php

namespace App\Models;

class CategoryModel extends AbstractModel
{

    public function getAll()
    {
        $stmt = $this->db->query("SELECT name FROM categories");
        return $stmt->fetchAll();
    }
}
