<?php
// src/GraphQL/QueryType.php
namespace App\GraphQL;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\Models\CategoryModel;
use App\Models\ProductModel;
// Use the new class name
use App\GraphQL\TypeRegistry;

class QueryType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Query',
            'fields' => [
                'categories' => [
                    'type' => Type::listOf(TypeRegistry::category()),
                    'resolve' => fn() => (new CategoryModel())->getAll()
                ],
                'products' => [
                    'type' => Type::listOf(TypeRegistry::product()),
                    'args' => ['category' => ['type' => Type::string()]],
                    'resolve' => fn($root, $args) => (new ProductModel())->getByCategory($args['category'] ?? 'all')
                ],
                'product' => [
                    'type' => TypeRegistry::product(),
                    'args' => ['id' => ['type' => Type::nonNull(Type::string())]],
                    'resolve' => fn($root, $args) => (new ProductModel())->getProduct($args['id'])
                ],
            ]
        ]);
    }
}
