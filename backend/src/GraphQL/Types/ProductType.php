<?php

// src/GraphQL/Types/ProductType.php
namespace App\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;
use App\Models\ProductModel;
// Import the registry explicitly
use App\GraphQL\TypeRegistry;

class ProductType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Product',
            'fields' => fn() => [
                'id' => ['type' => Type::string()],
                'name' => ['type' => Type::string()],
                'inStock' => [
                    'type' => Type::boolean(),
                    'resolve' => fn($p) => (bool)$p['in_stock']
                ],
                'description' => ['type' => Type::string()],
                'category' => [
                    'type' => Type::string(),
                    'resolve' => fn($p) => $p['category_name']
                ],
                'brand' => ['type' => Type::string()],
                'gallery' => [
                    'type' => Type::listOf(Type::string()),
                    'resolve' => fn($p) => (new ProductModel())->getGallery($p['id'])
                ],
                'prices' => [
                    'type' => Type::listOf(TypeRegistry::price()),
                    'resolve' => fn($p) => (new ProductModel())->getPrices($p['id'])
                ],
                'attributes' => [
                    'type' => Type::listOf(TypeRegistry::attribute()),
                    'resolve' => fn($p) => (new ProductModel())->getAttributes($p['id'])
                ],
            ]
        ]);
    }
}
