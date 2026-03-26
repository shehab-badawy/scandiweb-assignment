<?php

namespace App\GraphQL;

use App\GraphQL\Types\ProductType;
use App\GraphQL\Types\CategoryType;
use App\GraphQL\Types\PriceType;
use App\GraphQL\Types\AttributeType;
use App\GraphQL\Types\AttributeItemType;

class TypeRegistry
{
    private static $product;
    private static $category;
    private static $price;
    private static $attribute;
    private static $attributeItem;

    public static function product()
    {
        return self::$product ?: (self::$product = new ProductType());
    }

    public static function category()
    {
        return self::$category ?: (self::$category = new CategoryType());
    }

    public static function price()
    {
        return self::$price ?: (self::$price = new PriceType());
    }

    public static function attribute()
    {
        return self::$attribute ?: (self::$attribute = new AttributeType());
    }

    public static function attributeItem()
    {
        return self::$attributeItem ?: (self::$attributeItem = new AttributeItemType());
    }
}
