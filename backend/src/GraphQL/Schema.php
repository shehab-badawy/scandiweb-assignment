<?php

namespace App\GraphQL;

use GraphQL\Type\Schema as GraphQLSchema;
use GraphQL\Type\SchemaConfig;
use App\GraphQL\QueryType;
use App\GraphQL\MutationType;

class Schema
{
    public static function build()
    {
        $config = SchemaConfig::create()
            ->setQuery(new QueryType())
            ->setMutation(new MutationType());
        return new GraphQLSchema($config);
    }
}
