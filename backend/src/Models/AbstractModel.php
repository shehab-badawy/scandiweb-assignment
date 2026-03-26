<?php

namespace App\Models;

use App\Config\Database;

abstract class AbstractModel
{
    protected $db;

    public function __construct()
    {
        $this->db = Database::getConnection();
    }
}
