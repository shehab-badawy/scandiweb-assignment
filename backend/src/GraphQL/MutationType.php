<?php

namespace App\GraphQL;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\GraphQL\Types\OrderItemInput;
use App\Models\OrderModel;

class MutationType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Mutation',
            'fields' => [
                'placeOrder' => [
                    'type' => Type::int(),
                    'args' => [
                        'total_amount' => ['type' => Type::nonNull(Type::float())],
                        'currency_label' => ['type' => Type::nonNull(Type::string())],
                        'items' => ['type' => Type::nonNull(Type::listOf(new OrderItemInput()))],
                    ],
                    'resolve' => function ($root, $args) {
                        $model = new OrderModel();
                        return $model->createOrder(
                            [
                                'total_amount' => $args['total_amount'],
                                'currency_label' => $args['currency_label']
                            ],
                            $args['items']
                        );
                    }
                ]
            ]
        ]);
    }
}
