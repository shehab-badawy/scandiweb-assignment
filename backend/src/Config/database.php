<?php

namespace App\Config;

use PDO;
use PDOException;

class Database
{
    private static $instance = null;

    public static function getConnection()
    {
        if (self::$instance === null) {
            try {
                // Fetching variables from $_ENV
                $host = $_ENV['DB_HOST'];
                $db   = $_ENV['DB_NAME'];
                $user = $_ENV['DB_USER'];
                $pass = $_ENV['DB_PASS'];
                $port = $_ENV['DB_PORT'];

                $dsn = "mysql:host=$host;port=$port;dbname=$db;charset=utf8mb4";

                self::$instance = new PDO($dsn, $user, $pass, [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                ]);
            } catch (PDOException $e) {
                die("Connection failed: " . $e->getMessage());
            }
        }
        return self::$instance;
    }
}
