<?php

namespace App\Models;

class ProductModel extends AbstractModel
{


    public function getByCategory($categoryName)
    {
        $sql = "SELECT * FROM products";
        $params = [];

        if ($categoryName !== 'all') {
            $sql .= " WHERE category_name = :category";
            $params['category'] = $categoryName;
        }

        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }


    public function getGallery($productId)
    {
        $stmt = $this->db->prepare("SELECT image_url FROM product_gallery WHERE product_id = :id");
        $stmt->execute(['id' => $productId]);
        // We use FETCH_COLUMN because we want a simple array of strings: ["url1", "url2"]
        return $stmt->fetchAll(\PDO::FETCH_COLUMN);
    }


    public function getPrices($productId)
    {
        $stmt = $this->db->prepare("
            SELECT p.amount, c.label, c.symbol 
            FROM prices p
            JOIN currencies c ON p.currency_label = c.label
            WHERE p.product_id = :id
        ");
        $stmt->execute(['id' => $productId]);
        return $stmt->fetchAll();
    }

    public function getAttributes($productId)
    {
        $stmt = $this->db->prepare("
        SELECT 
            a.id AS attribute_id,
            a.name AS attribute_name,
            a.type AS attribute_type,
            ai.id AS item_id,
            ai.display_value,
            ai.value
        FROM product_attribute_values pav
        JOIN attribute_items ai ON pav.attribute_item_id = ai.id
        JOIN attributes a ON ai.attribute_id = a.id
        WHERE pav.product_id = :id
    ");

        $stmt->execute(['id' => $productId]);
        $rows = $stmt->fetchAll();

        $attributes = [];
        foreach ($rows as $row) {
            $attrId = $row['attribute_id'];

            if (!isset($attributes[$attrId])) {
                $attributes[$attrId] = [
                    'id' => $attrId,
                    'name' => $row['attribute_name'],
                    'type' => $row['attribute_type'],
                    'items' => []
                ];
            }

            $attributes[$attrId]['items'][] = [
                'id' => $row['item_id'],
                'displayValue' => $row['display_value'],
                'value' => $row['value']
            ];
        }

        return array_values($attributes);
    }
    public function getProduct($id)
    {
        $stmt = $this->db->prepare("SELECT * FROM products WHERE id = :id");
        $stmt->execute(['id' => $id]);

        return $stmt->fetch();
    }
}
