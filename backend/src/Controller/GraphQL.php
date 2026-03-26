<?php

namespace App\Controller;

use GraphQL\GraphQL as GraphQLBase;
use GraphQL\Error\DebugFlag;
use App\GraphQL\Schema;
use RuntimeException;
use Throwable;

class GraphQL
{
    static public function handle()
    {
        try {
            $rawInput = file_get_contents('php://input');
            if ($rawInput === false) {
                throw new RuntimeException('Failed to get php://input');
            }

            $input = json_encode(json_decode($rawInput, true));
            $data = json_decode($input, true);
            $query = $data['query'] ?? null;
            $variableValues = $data['variables'] ?? null;

            $schema = Schema::build();
            $debug = DebugFlag::INCLUDE_DEBUG_MESSAGE | DebugFlag::INCLUDE_TRACE;

            $result = GraphQLBase::executeQuery(
                $schema,
                $query,
                null,
                null,
                $variableValues
            );

            // This transforms the result into a standard format
            $output = $result->toArray($debug);
        } catch (Throwable $e) {
            $output = [
                'errors' => [
                    [
                        'message' => $e->getMessage()
                    ]
                ]
            ];
        }

        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode($output);
    }
}
