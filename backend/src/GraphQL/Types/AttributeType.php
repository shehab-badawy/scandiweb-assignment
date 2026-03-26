<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\GraphQL\TypeRegistry;

class AttributeType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Attribute',
            'fields' => fn() => [
                'id' => ['type' => Type::string()],
                'name' => ['type' => Type::string()],
                'type' => ['type' => Type::string()],
                'items' => ['type' => Type::listOf(TypeRegistry::attributeItem())],
            ]
        ]);
    }
}
